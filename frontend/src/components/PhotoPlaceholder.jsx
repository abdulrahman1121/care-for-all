/*
  Stand-in for real photography. Swap this for an <img> once you have
  free-licence photos (or your own) with proper alt text.
*/
export default function PhotoPlaceholder({ label, className = "" }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative grid aspect-[4/3] place-items-center overflow-hidden rounded-[28px] bg-accent-tint ${className}`}
    >
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
        <circle cx="140" cy="170" r="90" fill="var(--color-child)" opacity="0.35" />
        <circle cx="230" cy="140" r="80" fill="var(--color-senior)" opacity="0.3" />
        <circle cx="290" cy="200" r="70" fill="var(--color-ability)" opacity="0.25" />
      </svg>
      <p className="relative max-w-[26ch] rounded-xl bg-white/85 px-4 py-3 text-center text-sm text-ink-soft">{label}</p>
    </div>
  );
}
