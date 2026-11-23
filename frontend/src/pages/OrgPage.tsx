import { Link, useParams } from "react-router";
import { orgTypes, findOrgType, accentStyle } from "../data/orgTypes.ts";
import PhotoPlaceholder from "../components/PhotoPlaceholder.tsx";
import NotFound from "./NotFound.tsx";

/*
  One template for every care type. useParams() reads ":orgSlug" from the URL,
  e.g. /senior-care gives { orgSlug: "senior-care" }, and we look up that org's data.
*/
export default function OrgPage() {
  const { orgSlug } = useParams();
  const org = findOrgType(orgSlug);

  if (!org) return <NotFound />;

  const others = orgTypes.filter((o) => o.slug !== org.slug);

  return (
    <div style={accentStyle(org)}>
      {/* HERO */}
      <section className="border-b border-line bg-accent-tint">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 font-bold text-accent-deep">
              <span aria-hidden="true" className="size-3 rounded-full bg-accent" />
              {org.name}
            </p>
            <h1 className="mt-5 max-w-[18ch] text-4xl leading-[1.05] font-extrabold tracking-tight sm:text-5xl">
              {org.headline}
            </h1>
            <p className="mt-6 max-w-[52ch] text-lg text-ink-soft sm:text-xl">{org.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button type="button" className="rounded-full bg-accent px-6 py-3 text-lg font-bold text-accent-on" title="Coming soon">
                Request early access
              </button>
              <a href="#day" className="rounded-full border-2 border-ink px-6 py-3 text-lg font-bold">
                See a sample day
              </a>
            </div>
          </div>
          <PhotoPlaceholder label={`Photo: ${org.who.toLowerCase()} and staff during a normal day`} />
        </div>
      </section>

      {/* FEATURES tailored to this org type */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">What your team can do</h2>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {org.features.map((f) => (
            <div key={f.title}>
              <span aria-hidden="true" className="block h-1.5 w-12 rounded-full bg-accent" />
              <h3 className="mt-4 text-xl font-bold">{f.title}</h3>
              <p className="mt-2 text-ink-soft">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SAMPLE DAY: what a family or next-shift staff member would see */}
      <section id="day" className="scroll-mt-24 border-y border-line bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">A day, at a glance</h2>
            <p className="mt-4 max-w-[44ch] text-lg text-ink-soft">
              Everything logged during the day lines up into one clear timeline, for families and for the next shift.
            </p>
          </div>
          <ol className="relative space-y-6 border-l-4 border-line pl-6">
            {org.day.map((item) => (
              <li key={item.time} className="relative">
                <span aria-hidden="true" className="absolute top-1.5 -left-[34px] size-4 rounded-full border-4 border-white bg-accent" />
                <p className="font-bold text-accent-deep">{item.time}</p>
                <p className="text-lg">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* OTHER CARE TYPES */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-xl font-bold">Other care settings</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {others.map((o) => (
            <Link
              key={o.slug}
              to={`/${o.slug}`}
              className="inline-flex items-center gap-2 rounded-full border-2 border-line bg-white px-5 py-2.5 font-bold hover:border-ink"
            >
              <span aria-hidden="true" className="size-3 rounded-full" style={{ background: o.colors.accent }} />
              {o.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
