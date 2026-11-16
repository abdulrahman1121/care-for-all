import { Link } from "react-router";

/* Placeholder brand: three overlapping circles, one per care type. The logo is still a placeholder. */
export default function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 font-extrabold text-ink" aria-label="CareForAll home">
      <svg width="34" height="22" viewBox="0 0 34 22" aria-hidden="true">
        <circle cx="11" cy="11" r="9" fill="var(--color-child)" />
        <circle cx="17" cy="11" r="9" fill="var(--color-senior)" opacity="0.9" />
        <circle cx="23" cy="11" r="9" fill="var(--color-ability)" opacity="0.9" />
      </svg>
      <span className="text-xl tracking-tight">CareForAll</span>
    </Link>
  );
}
