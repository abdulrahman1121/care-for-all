import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext.tsx";
import { authErrorMessage } from "../lib/authErrors.ts";
import { AuthCard, FormError, GoogleButton, inputClass } from "../components/AuthBits.tsx";

export default function SignIn() {
  const { status, signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (status === "signed-in") return <Navigate to="/account" replace />;
  if (status === "unavailable") {
    return (
      <AuthCard title="Sign in">
        <FormError message="Sign-in isn't available right now. Please try again later." />
      </AuthCard>
    );
  }

  async function run(action: () => Promise<void>) {
    if (busy) return; // ignore double clicks while a request is running
    setBusy(true);
    setError("");
    try {
      await action();
      navigate("/account");
    } catch (err) {
      setError(authErrorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void run(() => signIn(email.trim(), password));
  }

  return (
    <AuthCard title="Sign in">
      <form onSubmit={onSubmit} className="space-y-5" noValidate={false}>
        <label className="block font-bold">
          Email
          <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
        </label>
        <label className="block font-bold">
          Password
          <input type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} />
        </label>
        <FormError message={error} />
        <button type="submit" disabled={busy} className="w-full rounded-full bg-ink px-6 py-3 text-lg font-bold text-paper disabled:opacity-60">
          {busy ? "Signing in…" : "Sign in"}
        </button>
        {/* Shown on purpose but not wired up yet: password reset is coming later. */}
        <button type="button" aria-disabled="true" title="Coming soon" className="block cursor-not-allowed text-ink-soft underline underline-offset-4">
          Forgot password?
        </button>
      </form>
      <p className="text-center text-ink-soft">or</p>
      <GoogleButton disabled={busy} onClick={() => void run(signInWithGoogle)} />
      <p className="text-center">
        New here?{" "}
        <Link to="/sign-up" className="font-bold underline underline-offset-4">
          Create an account
        </Link>
      </p>
    </AuthCard>
  );
}
