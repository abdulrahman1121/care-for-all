# Build journal

## Planned (not implemented yet)

- [x] Convert the frontend to TypeScript (2026-11-22)
- [ ] Finish the sign-in deliverable: publish the Firestore rules, set the Firebase variables on Vercel, authorize the Vercel domain, then test email and Google sign-in on the real project (early access was dropped; photos are done)
- [x] Merge the Vercel deploy fix and check that refreshing /senior-care works on the live site (2026-11-22)
- [ ] Pick my "new and unique" tool
- [ ] Interview the childcare operators I know (questions are in the brainstorm summary)
- [ ] Decide the org-type architecture
- [ ] Phase 1: org signup with type selection, child profiles, classrooms, staff accounts, kiosk check-in/out, manual activity logging
- [ ] Phase 2: voice logging and a daily summary for parents
- [ ] Phase 3: pattern-change alerts
- [ ] Replace photo placeholders and the placeholder logo

## In Progress

- Real photos for the childcare page and the home page, on `feat/real-photos` (built and checked; waiting on my approval to commit)
- Firebase sign-in with email and password or Google, and the organization name in Firestore, on `feat/firebase-auth` (built and tested against the emulators; waiting on my approval to commit)

## Changelog (done)

- **2026-11-22** — Built sign-in, sign-up and an account page with Firebase (email and password, or Google), with the organization name stored in Firestore. I typed the security rules and the friendly error messages myself. It was tested against Firebase's local emulators, not my real project: the Google sign-in round trip and the real project still need a manual test.

- **2026-11-22** — Added real photos to the home page and the childcare page (Unsplash, licence checked, credits shown on the page and in `CREDITS.md`). If a photo fails to load, the placeholder shows instead. I created the photo data file, and the agent finished the rest of my todos so I could focus on Firebase.

- **2026-11-22** — Converted the frontend to TypeScript with strict mode, and type errors now fail the build. I typed three pieces myself: the `OrgType` data types, the check that the `#root` element exists, and the check on the saved text size. The deploy fix is merged and refreshing a sub-page now works on the live site.

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
- **TypeScript, strict, and type errors block the build.** I chose all three (2026-11-22). A type error can now stop a deploy, but the old version stays live.
- **Childcare only for the next deliverable.** Senior care and disability support keep their landing pages but get no new work.
- **The deliverable has a 2-hour deadline,** so I dropped Request early access from it. Sign-in uses Firebase (email and password or Google) with Firestore for the organization name, and the Spring Boot backend comes later.
- **Photos from Unsplash.** I picked two, and the agent checked each one's licence page first, because some "free" search results are actually paid Unsplash+ photos.
- **Vercel for hosting.** Free GitHub accounts can't use Pages on a private repo, and Vercel serves the site from the root.
- Open: Which unique tool? Offline-first in Phase 1 or later? What the next deliverable has to show, and by when?

## Reflections & Lessons Learned

- **A single-page application (SPA)** loads one HTML page and React swaps the content as you move around, like a stage crew changing sets without the audience leaving.
- **CSS variables resolve where they're declared.** Our per-org colours first didn't work because the theme variable pointed at another variable from `:root`. Overriding the theme variable itself on a wrapper fixed it.
- **A 200 response doesn't mean it's my site.** The URL the agent guessed answered, but it was someone else's project (its title said "Vite + React"). Check the title and file names against my own build.
- **GitHub Pages and React Router.** Pages has no server routing, so refreshing `/senior-care` is a 404 unless a fix is added. Vercel needs one small `vercel.json` rewrite for the same reason.
- **Types are documentation the computer checks.** Deleting one field from the org data, or the check that `#root` exists, now turns into a red error instead of a blank page. A type error also stops `npm run build`, so it can't reach the live site.
- **Saved values can't be trusted.** localStorage can hold anything, so the text-size setting now checks the saved value and falls back to normal.
- **"Free" in a search result isn't proof.** Three of the eight "free" Unsplash results were paid Unsplash+ photos. The licence field on each photo's own page is what settles it. And a free licence still doesn't mean the people in the photo agreed to appear in a commercial product.
- **Security rules are the real lock.** Anyone can open the browser tools and send their own requests, so the Firestore rules decide who can read or write, not the app's code. I tested mine with 16 allow-and-deny cases before publishing.
- **A test only proves something about what it ran against.** The emulator can't complete a Google popup in this browser, so Google sign-in is still unverified, and nothing was tested against my real Firebase project yet.
- **Plan for the half-finished case.** A person can be signed in without a saved organization name (Google, or a failed save), so the account page handles "no name yet" as a normal state.
- **Pinning dependency versions** (and avoiding brand-new releases) protects against a package update quietly breaking things or carrying malicious code.
