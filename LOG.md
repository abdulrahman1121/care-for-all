# Build journal

## Planned (not implemented yet)

- [ ] Decide JavaScript vs TypeScript for the frontend
- [ ] Pick my "new and unique" tool
- [ ] Interview the childcare operators I know (questions are in the brainstorm summary)
- [ ] Decide the org-type architecture
- [ ] Phase 1: org signup with type selection, child profiles, classrooms, staff accounts, kiosk check-in/out, manual activity logging
- [ ] Phase 2: voice logging and a daily summary for parents
- [ ] Phase 3: pattern-change alerts
- [ ] Replace photo placeholders and the placeholder logo

## In Progress

- Static home page and org landing template, on `feat/static-home-page` (built, waiting for me to review and approve the first commits)

## Changelog (done)

- **2026-11-15** — Renamed the app from "Carelog" to CareForAll, added a `.gitignore`, and set up git on `main` (GitHub repo `care-for-all` comes next). I wanted a real name and a safe place for the code before building more.
- **2026-11-15** — Built the home page (hero with "Who do you care for?", colour-shifting accent, voice-log preview, how it works, footer) and one landing page template for all three care types. I wanted something I could see before deciding on core features.

## Decisions & Open Questions

- **Childcare first.** I know people who run childcare and saw them logging by hand.
- **My three differentiators:** offline kiosk check-in, hands-free voice logging, pattern-change alerts.
- **React + Vite + React Router, styled with Tailwind.** A plain frontend keeps a clean split from my Spring Boot backend, and Tailwind keeps design tokens in one place.
- **Design inspired by brightwheel and Papa**, plus my own touches: colours that follow the chosen care type, a voice-log preview and a text-size control.
- Open: JavaScript or TypeScript? Which unique tool? Offline-first in Phase 1 or later?

## Reflections & Lessons Learned

- **A single-page application (SPA)** loads one HTML page and React swaps the content as you move around, like a stage crew changing sets without the audience leaving.
- **CSS variables resolve where they're declared.** Our per-org colours first didn't work because the theme variable pointed at another variable from `:root`. Overriding the theme variable itself on a wrapper fixed it.
- **Pinning dependency versions** (and avoiding brand-new releases) protects against a package update quietly breaking things or carrying malicious code.
