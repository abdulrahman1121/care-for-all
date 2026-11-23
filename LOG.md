# Build journal

## Planned (not implemented yet)

- [ ] Convert the frontend to TypeScript (I chose TypeScript on 2026-11-22)
- [ ] Next deliverable: focus on childcare only
- [ ] Merge the Vercel deploy fix and check that refreshing /senior-care works on the live site
- [ ] Pick my "new and unique" tool
- [ ] Interview the childcare operators I know (questions are in the brainstorm summary)
- [ ] Decide the org-type architecture
- [ ] Phase 1: org signup with type selection, child profiles, classrooms, staff accounts, kiosk check-in/out, manual activity logging
- [ ] Phase 2: voice logging and a daily summary for parents
- [ ] Phase 3: pattern-change alerts
- [ ] Replace photo placeholders and the placeholder logo

## In Progress

- Vercel deploy fix (vercel.json so refreshing a sub-page works), on `feat/vercel-deploy`

## Changelog (done)

- **2026-11-22** — Decided: use TypeScript, focus on childcare for the next deliverable, keep my commit email (I'll make the repo private in a few weeks), and make the `architecture/` folder once we have enough backend work. Committed the deploy fix.
- **2026-11-15** — Put the site online on Vercel. GitHub Pages needs a public repo on a free account and a `/care-for-all/` prefix, so I switched. I typed the router `basename` line myself. The live site works, but refreshing a sub-page gave a 404 until the `vercel.json` fix is merged.
- **2026-11-15** — Committed the scaffold and the home page, pushed, and squash-merged PR #1.

- **2026-11-15** — Renamed the app from "Carelog" to CareForAll, added a `.gitignore`, and set up git on `main` (GitHub repo `care-for-all` comes next). I wanted a real name and a safe place for the code before building more.
- **2026-11-15** — Built the home page (hero with "Who do you care for?", colour-shifting accent, voice-log preview, how it works, footer) and one landing page template for all three care types. I wanted something I could see before deciding on core features.

## Decisions & Open Questions

- **Childcare first.** I know people who run childcare and saw them logging by hand.
- **My three differentiators:** offline kiosk check-in, hands-free voice logging, pattern-change alerts.
- **React + Vite + React Router, styled with Tailwind.** A plain frontend keeps a clean split from my Spring Boot backend, and Tailwind keeps design tokens in one place.
- **Design inspired by brightwheel and Papa**, plus my own touches: colours that follow the chosen care type, a voice-log preview and a text-size control.
- **TypeScript.** I chose it for the frontend (2026-11-22); the conversion comes next.
- **Childcare only for the next deliverable.** Senior care and disability support keep their landing pages but get no new work.
- **Vercel for hosting.** Free GitHub accounts can't use Pages on a private repo, and Vercel serves the site from the root.
- Open: Which unique tool? Offline-first in Phase 1 or later? What the next deliverable has to show, and by when?

## Reflections & Lessons Learned

- **A single-page application (SPA)** loads one HTML page and React swaps the content as you move around, like a stage crew changing sets without the audience leaving.
- **CSS variables resolve where they're declared.** Our per-org colours first didn't work because the theme variable pointed at another variable from `:root`. Overriding the theme variable itself on a wrapper fixed it.
- **A 200 response doesn't mean it's my site.** The URL the agent guessed answered, but it was someone else's project (its title said "Vite + React"). Check the title and file names against my own build.
- **GitHub Pages and React Router.** Pages has no server routing, so refreshing `/senior-care` is a 404 unless a fix is added. Vercel needs one small `vercel.json` rewrite for the same reason.
- **Pinning dependency versions** (and avoiding brand-new releases) protects against a package update quietly breaking things or carrying malicious code.
