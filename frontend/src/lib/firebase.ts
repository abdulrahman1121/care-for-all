import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

/*
  The Firebase web config is not a secret (it only identifies the project; the security rules decide
  who can do what), but we still keep it in environment variables so each environment can differ.
*/
const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const missing = Object.entries(config)
  .filter(([, value]) => !value)
  .map(([name]) => name);

function start() {
  const app = initializeApp(config);
  const auth = getAuth(app);
  const db = getFirestore(app);

  // Dev only: talk to the local emulators instead of the real project. Never active in a production build.
  if (import.meta.env.DEV && import.meta.env.VITE_USE_FIREBASE_EMULATORS === "true") {
    connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
    connectFirestoreEmulator(db, "127.0.0.1", 8080);
  }
  return { auth, db };
}

/*
  null means "not configured" (for example the environment variables were not set on the host).
  We do NOT throw here: the marketing pages must keep working, and the sign-in pages say
  "not available right now" instead of crashing the whole site.
*/
export const firebase = missing.length === 0 ? start() : null;

if (!firebase) {
  console.warn(`Firebase is not configured; sign-in is disabled. Missing: ${missing.join(", ")}`);
}
