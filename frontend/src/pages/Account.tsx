import { useState, type FormEvent } from "react";
import { Navigate, useLocation } from "react-router";
import { ORG_NAME_MAX, useAuth } from "../auth/AuthContext.tsx";
import { authErrorMessage } from "../lib/authErrors.ts";
import { AuthCard, FormError, inputClass } from "../components/AuthBits.tsx";

export default function Account() {
  const { status, user, profile, profileStatus, profileError, saveOrgName, retryProfile, signOut } = useAuth();
  const location = useLocation();
  const [orgName, setOrgName] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (status === "loading") return <AuthCard title="Your account"><p>Loading…</p></AuthCard>;
  if (status !== "signed-in" || !user) return <Navigate to="/sign-in" replace />;

  const notice = (location.state as { notice?: string } | null)?.notice ?? "";

  async function onSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      await saveOrgName(orgName);
    } catch (err) {
      setError(authErrorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthCard title="Your account">
      {notice && <p className="rounded-xl border-2 border-line bg-white px-4 py-3">{notice}</p>}
      <dl className="space-y-4">
        <div>
          <dt className="font-bold">Email</dt>
          <dd className="text-ink-soft">{user.email ?? "Signed in with Google"}</dd>
        </div>
        <div>
          <dt className="font-bold">Organization</dt>
          <dd className="text-ink-soft">
            {profileStatus === "loading" && "Loading…"}
            {profileStatus === "ready" && profile?.orgName}
            {profileStatus === "missing" && "Not set yet"}
            {profileStatus === "error" && "Couldn't load"}
          </dd>
        </div>
      </dl>

      {profileStatus === "error" && (
        <div className="space-y-3">
          <FormError message={profileError} />
          <button type="button" onClick={retryProfile} className="rounded-full border-2 border-ink px-5 py-2.5 font-bold">
            Try again
          </button>
        </div>
      )}

      {(profileStatus === "missing" || profileStatus === "ready") && (
        <form onSubmit={(e) => void onSave(e)} className="space-y-4">
          <label className="block font-bold">
            {profileStatus === "missing" ? "Name your organization" : "Change organization name"}
            <input type="text" required maxLength={ORG_NAME_MAX} value={orgName} onChange={(e) => setOrgName(e.target.value)} className={inputClass} />
          </label>
          <FormError message={error} />
          <button type="submit" disabled={busy} className="rounded-full bg-ink px-6 py-3 font-bold text-paper disabled:opacity-60">
            {busy ? "Saving…" : "Save"}
          </button>
        </form>
      )}

      <button type="button" onClick={() => void signOut().catch(() => undefined)} className="rounded-full border-2 border-ink px-6 py-3 font-bold">
        Sign out
      </button>
    </AuthCard>
  );
}
