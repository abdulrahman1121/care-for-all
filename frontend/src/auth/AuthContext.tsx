import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  type User,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { firebase } from "../lib/firebase.ts";
import { authErrorMessage } from "../lib/authErrors.ts";

export const ORG_NAME_MAX = 80; // keep in sync with firestore.rules

export interface Profile {
  orgName: string;
}

export type AuthStatus = "unavailable" | "loading" | "signed-out" | "signed-in";
export type ProfileStatus = "loading" | "error" | "missing" | "ready";

interface AuthValue {
  status: AuthStatus;
  user: User | null;
  profile: Profile | null;
  profileStatus: ProfileStatus;
  profileError: string;
  signUp(email: string, password: string, orgName: string): Promise<{ profileSaved: boolean }>;
  signIn(email: string, password: string): Promise<void>;
  signInWithGoogle(): Promise<void>;
  signOut(): Promise<void>;
  saveOrgName(orgName: string): Promise<void>;
  retryProfile(): void;
}

const AuthContext = createContext<AuthValue | null>(null);

function requireFirebase() {
  if (!firebase) throw Object.assign(new Error("Firebase is not configured"), { code: "app/unavailable" });
  return firebase;
}

/*
  Holds "who is signed in" for the whole app. Two jobs:
  1. Follow Firebase's sign-in state (onAuthStateChanged).
  2. Load that person's profile (their organization name) from Firestore.
  A person can be signed in WITHOUT a profile (Google sign-in, or a failed save at sign-up),
  so "missing profile" is a normal state the account page knows how to fix.
*/
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(!firebase); // with no Firebase there is nothing to wait for
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [attempt, setAttempt] = useState(0);
  // Remembers a profile we just saved, so a slower "load" that started earlier can't overwrite it with "missing".
  const savedRef = useRef<{ uid: string; orgName: string } | null>(null);

  useEffect(() => {
    if (!firebase) return;
    return onAuthStateChanged(firebase.auth, (next) => {
      setUser(next);
      setAuthReady(true);
      if (!next) {
        savedRef.current = null;
        setProfile(null);
        setProfileLoaded(false);
        setProfileError("");
      }
    });
  }, []);

  const uid = user?.uid;
  useEffect(() => {
    if (!firebase || !uid) return;
    const db = firebase.db;
    let cancelled = false;
    setProfileLoaded(false);
    setProfileError("");
    getDoc(doc(db, "users", uid))
      .then((snap) => {
        if (cancelled) return;
        const saved = savedRef.current?.uid === uid ? savedRef.current : null;
        const orgName: unknown = saved ? saved.orgName : snap.data()?.orgName;
        setProfile(typeof orgName === "string" ? { orgName } : null);
        setProfileLoaded(true);
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        setProfileError(authErrorMessage(error));
        setProfileLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, [uid, attempt]);

  const writeProfile = useCallback(async (forUid: string, orgName: string) => {
    const fb = requireFirebase();
    const name = orgName.trim();
    if (name.length === 0 || name.length > ORG_NAME_MAX) {
      throw Object.assign(new Error("Invalid organization name"), { code: "app/invalid-org-name" });
    }
    await setDoc(doc(fb.db, "users", forUid), { orgName: name, updatedAt: serverTimestamp() }, { merge: true });
    savedRef.current = { uid: forUid, orgName: name };
    setProfile({ orgName: name });
    setProfileError("");
    setProfileLoaded(true);
  }, []);

  const value = useMemo<AuthValue>(() => {
    const status: AuthStatus = !firebase ? "unavailable" : !authReady ? "loading" : user ? "signed-in" : "signed-out";
    const profileStatus: ProfileStatus = !profileLoaded ? "loading" : profileError ? "error" : profile ? "ready" : "missing";
    return {
      status,
      user,
      profile,
      profileStatus,
      profileError,
      async signUp(email, password, orgName) {
        const fb = requireFirebase();
        const cred = await createUserWithEmailAndPassword(fb.auth, email, password);
        // The account now exists. If saving the name fails we do NOT undo the account: the account page
        // asks for the name again. We just report it so the screen can say so.
        try {
          await writeProfile(cred.user.uid, orgName);
          return { profileSaved: true };
        } catch {
          return { profileSaved: false };
        }
      },
      async signIn(email, password) {
        await signInWithEmailAndPassword(requireFirebase().auth, email, password);
      },
      async signInWithGoogle() {
        await signInWithPopup(requireFirebase().auth, new GoogleAuthProvider());
      },
      async signOut() {
        await firebaseSignOut(requireFirebase().auth);
      },
      async saveOrgName(orgName) {
        if (!user) throw Object.assign(new Error("Not signed in"), { code: "auth/requires-recent-login" });
        await writeProfile(user.uid, orgName);
      },
      retryProfile() {
        setAttempt((n) => n + 1);
      },
    };
  }, [authReady, user, profile, profileLoaded, profileError, writeProfile]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside <AuthProvider>");
  return value;
}
