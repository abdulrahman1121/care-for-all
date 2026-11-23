import { useEffect, useState } from "react";
import type { OrgType } from "../data/orgTypes.ts";

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/*
  A static preview of the voice-logging idea: a spoken note "types" itself out,
  then turns into structured log entries. No real speech recognition yet; it's a demo.

  How it works: `typed` counts how many characters are visible. A timer bumps it
  every 35ms until the whole note shows, then the entries appear.
  When the org changes, the effect restarts with the new note.
*/
export default function VoiceLogPreview({ org }: { org: OrgType }) {
  const note = org.sampleNote;
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setTyped(note.length);
      return;
    }
    setTyped(0);
    const timer = setInterval(() => {
      setTyped((count) => {
        if (count >= note.length) {
          clearInterval(timer);
          return count;
        }
        return count + 1;
      });
    }, 35);
    // Cleanup: stop the old timer if the org changes mid-animation
    return () => clearInterval(timer);
  }, [note]);

  const done = typed >= note.length;

  return (
    <figure className="accent-transition rounded-[28px] border-2 border-accent bg-white p-6 shadow-[8px_8px_0_0_var(--color-accent)] sm:p-8">
      {/* Screen readers get the finished example in one go instead of the animation */}
      <figcaption className="sr-only">
        Example: a staff member says “{note}” and it is saved as{" "}
        {org.sampleEntries.map((e) => `${e.label}: ${e.value}`).join(", ")}.
      </figcaption>

      <div aria-hidden="true">
        <div className="flex items-center gap-3">
          <span className="accent-transition grid size-10 place-items-center rounded-full bg-accent text-accent-on">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <rect x="9" y="3" width="6" height="11" rx="3" />
              <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
            </svg>
          </span>
          <span className="font-bold">{done ? "Saved to today's log" : "Listening…"}</span>
        </div>

        <p className="mt-5 min-h-[4.5em] text-xl leading-snug sm:text-2xl">
          “{note.slice(0, typed)}
          {!done && <span className="caret">|</span>}
          {done && "”"}
        </p>

        <ul className="mt-6 space-y-2.5">
          {org.sampleEntries.map((entry, i) => (
            <li
              key={entry.label}
              className="accent-transition flex items-baseline justify-between gap-4 rounded-xl bg-accent-tint px-4 py-3 transition-opacity duration-300"
              style={{ opacity: done ? 1 : 0, transitionDelay: done ? `${i * 150}ms` : "0ms" }}
            >
              <span className="font-bold text-accent-deep">{entry.label}</span>
              <span className="text-right">{entry.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}
