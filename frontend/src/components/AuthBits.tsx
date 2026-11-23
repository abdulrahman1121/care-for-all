import type { ReactNode } from "react";

export const inputClass =
  "mt-1 block w-full rounded-xl border-2 border-line bg-white px-4 py-3 text-lg focus:border-ink";

export function FormError({ message }: { message: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="rounded-xl border-2 border-red-300 bg-red-50 px-4 py-3 text-red-900">
      {message}
    </p>
  );
}

export function GoogleButton({ onClick, disabled }: { onClick: () => void; disabled: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex w-full items-center justify-center gap-3 rounded-full border-2 border-ink bg-white px-6 py-3 text-lg font-bold disabled:opacity-60"
    >
      <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.5 12.2c0-.8-.1-1.5-.2-2.2H12v4.2h5.9a5 5 0 0 1-2.2 3.3v2.7h3.5c2-1.9 3.3-4.7 3.3-8z" />
        <path fill="#34A853" d="M12 23c3 0 5.4-1 7.2-2.7l-3.5-2.7c-1 .7-2.2 1-3.7 1-2.8 0-5.2-1.9-6-4.5H2.4v2.8A11 11 0 0 0 12 23z" />
        <path fill="#FBBC05" d="M6 14.1a6.6 6.6 0 0 1 0-4.2V7.1H2.4a11 11 0 0 0 0 9.8L6 14.1z" />
        <path fill="#EA4335" d="M12 5.4c1.6 0 3 .6 4.2 1.6l3.1-3.1A11 11 0 0 0 2.4 7.1L6 9.9c.8-2.6 3.2-4.5 6-4.5z" />
      </svg>
      Continue with Google
    </button>
  );
}

export function AuthCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mx-auto max-w-md px-5 py-16">
      <h1 className="text-3xl font-extrabold tracking-tight">{title}</h1>
      <div className="mt-8 space-y-5">{children}</div>
    </section>
  );
}
