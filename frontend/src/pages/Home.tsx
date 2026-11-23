import { useState } from "react";
import { Link } from "react-router";
import { orgTypes, accentStyle } from "../data/orgTypes.ts";
import VoiceLogPreview from "../components/VoiceLogPreview.tsx";
import Photo from "../components/Photo.tsx";
import { photos } from "../data/photos.ts";

const steps = [
  {
    title: "Check in at the door",
    body: "A shared tablet by the entrance records who arrived and who picked them up. No Wi-Fi? It saves now and syncs later.",
  },
  {
    title: "Say what happened",
    body: "Staff speak a quick note during the day. It's sorted into the right person's log automatically.",
  },
  {
    title: "See what's changing",
    body: "Over weeks, CareForAll notices shifts in routines, meals or attendance, and points them out for a human to check.",
  },
];

export default function Home() {
  // Which care type the hero is currently "showing". Hover or focus on a choice to change it.
  const [active, setActive] = useState(orgTypes[0]);

  return (
    <>
      {/* HERO: the accent CSS variables are set here, so everything inside follows the chosen care type */}
      <section style={accentStyle(active)} className="accent-transition border-b border-line bg-accent-tint">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.1fr_1fr] lg:py-24">
          <div>
            <h1 className="max-w-[16ch] text-4xl leading-[1.05] font-extrabold tracking-tight sm:text-6xl">
              Less paperwork. More time with the people you care for.
            </h1>
            <p className="mt-6 max-w-[52ch] text-lg text-ink-soft sm:text-xl">
              CareForAll handles attendance and daily notes for care teams, so staff can keep their hands, and their
              attention, on people.
            </p>

            <h2 className="mt-10 text-lg font-bold">Who do you care for?</h2>
            <ul className="mt-3 space-y-3">
              {orgTypes.map((org) => {
                const isActive = org.slug === active.slug;
                return (
                  <li key={org.slug}>
                    <Link
                      to={`/${org.slug}`}
                      onMouseEnter={() => setActive(org)}
                      onFocus={() => setActive(org)}
                      className={`flex items-center gap-4 rounded-2xl border-2 bg-white px-5 py-4 transition-colors ${
                        isActive ? "border-ink" : "border-transparent hover:border-line"
                      }`}
                    >
                      <span aria-hidden="true" className="size-4 shrink-0 rounded-full" style={{ background: org.colors.accent }} />
                      <span className="flex-1">
                        <span className="block text-lg font-bold">{org.who}</span>
                        <span className="block text-ink-soft">{org.tagline}</span>
                      </span>
                      <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 6l6 6-6 6" />
                      </svg>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <VoiceLogPreview org={active} />
        </div>
      </section>

      {/* HOW IT WORKS: a real sequence, so numbered steps make sense here */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="max-w-[24ch] text-3xl font-extrabold tracking-tight sm:text-4xl">
          From the front door to the end of the day
        </h2>
        <ol className="mt-12 grid gap-10 md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="border-t-4 border-ink pt-5">
              <span className="text-5xl font-extrabold text-ink-soft">{i + 1}</span>
              <h3 className="mt-2 text-xl font-bold">{step.title}</h3>
              <p className="mt-2 text-ink-soft">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* COMMITMENTS: warm, human photo (Papa-inspired) beside what we promise */}
      <section className="border-y border-line bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2">
          <Photo photo={photos.home} fallbackLabel="Photo: a teacher and young children in a classroom" />
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Made for real care settings</h2>
            <dl className="mt-8 space-y-6">
              <div>
                <dt className="text-lg font-bold">Works when the Wi-Fi doesn't</dt>
                <dd className="mt-1 text-ink-soft">Check-ins and notes save on the device first, then sync.</dd>
              </div>
              <div>
                <dt className="text-lg font-bold">Readable for everyone</dt>
                <dd className="mt-1 text-ink-soft">
                  A typeface designed for low vision, adjustable text size, and full keyboard support.
                </dd>
              </div>
              <div>
                <dt className="text-lg font-bold">Observations, never diagnoses</dt>
                <dd className="mt-1 text-ink-soft">
                  Alerts describe what changed and leave the judgment to people who know the person.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="mx-auto max-w-6xl px-5 py-20 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Pick your care setting to see how it fits</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {orgTypes.map((org) => (
            <Link
              key={org.slug}
              to={`/${org.slug}`}
              className="rounded-full px-6 py-3 text-lg font-bold"
              style={{ background: org.colors.accent, color: org.colors.on }}
            >
              {org.name}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
