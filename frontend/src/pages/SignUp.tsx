import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { ORG_NAME_MAX, useAuth } from "../auth/AuthContext.tsx";
import { authErrorMessage } from "../lib/authErrors.ts";
import { AuthCard, FormError, GoogleButton, inputClass } from "../components/AuthBits.tsx";

export default function SignUp() {
  const { status, signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [orgName, setOrgName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  // Not while we are mid-submit: signing up makes us "signed in" a moment before the name is saved,
  // and we want our own redirect below (which can carry a notice) to be the one that runs.
  if (status === "signed-in" && !busy) return <Navigate to="/account" replace />;
  if (status === "unavailable") {
    return (
      <AuthCard title="Create your account">
        <FormError message="Sign-up isn't available right now. Please try again later." />
      </AuthCard>
    );
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const { profileSaved } = await signUp(email.trim(), password, orgName);
      // If only the name failed to save, the account page asks for it again.
      // On success we stay "busy" (we are leaving this page), so the redirect above can't replace the state we pass here.
      navigate("/account", { state: profileSaved ? null : { notice: "Your account was created, but we couldn't save your organization name. Please add it below." } });
    } catch (err) {
      setError(authErrorMessage(err));
      setBusy(false);
    }
  }

  async function onGoogle() {
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      await signInWithGoogle();
      navigate("/account"); // no name yet for Google sign-ups: the account page asks for it
    } catch (err) {
      setError(authErrorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthCard title="Create your account">
      <form onSubmit={(e) => void onSubmit(e)} className="space-y-5">
        <label className="block font-bold">
          Organization name
          <input type="text" required maxLength={ORG_NAME_MAX} autoComplete="organization" value={orgName} onChange={(e) => setOrgName(e.target.value)} className={inputClass} />
        </label>
        <label className="block font-bold">
          Email
          <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
        </label>
        <label className="block font-bold">
          Password
          <input type="password" required minLength={6} autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} />
          <span className="mt-1 block text-sm font-normal text-ink-soft">At least 6 characters.</span>
        </label>
        <FormError message={error} />
        <button type="submit" disabled={busy} className="w-full rounded-full bg-ink px-6 py-3 text-lg font-bold text-paper disabled:opacity-60">
          {busy ? "Creating account…" : "Create account"}
        </button>
      </form>
      <p className="text-center text-ink-soft">or</p>
      <GoogleButton disabled={busy} onClick={() => void onGoogle()} />
      <p className="text-center">
        Already have an account?{" "}
        <Link to="/sign-in" className="font-bold underline underline-offset-4">
          Sign in
        </Link>
      </p>
    </AuthCard>
  );
}
