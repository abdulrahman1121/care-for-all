# CLAUDE.md — agent handoff

Read this first. It tells any AI agent (or teammate) where the project stands and how we work.

## Project overview

CareForAll is a web app for care organizations to replace manual, paper-based logging: attendance, daily activities and each person's needs. It starts as a personal learning project built by the owner and a peer, and may become a business later.

- **First users:** childcare organizations. Then senior care, then adult disability support.
- **Org-type selection:** users pick their organization type and the experience is tailored to it.
- **Signature features (planned, not built):** offline-first kiosk check-in, hands-free voice logging, and pattern-change alerts (observations, never diagnoses).

## Stack

| Layer | Choice | Status |
| --- | --- | --- |
| Frontend | React 19 + TypeScript 7 + Vite 8 + React Router 8 (SPA) | In use |
| Styling | Tailwind CSS 4 (tokens in `frontend/src/index.css`) | In use |
| Backend | Java Spring Boot | Not started |
| Cloud | AWS | Not started |
| "New and unique" tool | Undecided (candidates: AWS CDK, Playwright, Spring Modulith, Storybook, TanStack Query, Testcontainers) | Open decision |

Dependency versions are pinned exactly (no `^`), each chosen to be at least two weeks old at install time. Keep that habit when adding packages.

## Repository

- Layout: `frontend/` holds the React app. A `backend/` folder will hold Spring Boot later. Keep them cleanly separated.
- Git: repo at the root, default branch `main`. `.gitignore` is at the root (`node_modules/`, `dist/`, `.env*` except `.env.example`, OS/editor files, logs). Merge pull requests into `main` with **squash** (PR #1 landed as one squash commit).
- Remote: `https://github.com/abdulrahman1121/care-for-all`. The repo is **public for now**; the owner plans to make it private in a few weeks (see Decisions log for the email caveat).
- Hosting: Vercel, see "Hosting and deploys" below.
- Current branch for the deploy fix: `feat/vercel-deploy` (see the progress log).

## Current state

Two static pages are built and verified (production build passes; desktop and mobile screenshots reviewed):

- **Home (`/`)**: sticky header with nav to the three care types, a text-size control (A / A+ / A++), and a "Sign in" placeholder. The hero asks "Who do you care for?" with three choices; hovering or focusing one shifts the page accent colour to that org. A voice-log preview card types out a sample spoken note and turns it into structured entries. Then a 3-step "how it works", a "made for real care settings" section with a photo placeholder, a closing call to action, and a multi-column footer.
- **Org landing template (`/:orgSlug`)**: one component serves `/childcare`, `/senior-care` and `/disability-support`, reading content and colours from `frontend/src/data/orgTypes.ts`. Sections: hero, three tailored features, a sample-day timeline, links to the other care types.
- **Catch-all (`*`)**: "This page isn't built yet" page, used by footer links (About, Contact, Privacy, Accessibility, Security).

### Hosting and deploys

- **Live site:** https://frontend-pink-eight-29.vercel.app (Vercel, free Hobby plan; served from the root, no sub-path). The Vercel project is connected to this GitHub repo: pushing or merging to `main` redeploys it (the owner confirmed it on the project page, and the live bundle changed right after PR #2 merged on 2026-11-22). Vercel runs `npm run build`, which now includes the type check, so a type error blocks a deploy.
- GitHub Pages and a GitHub Actions workflow were considered and dropped (see Decisions log).
- **Deep links:** React Router needs every path to serve `index.html`, so `frontend/vercel.json` holds Vercel's documented rewrite (`/(.*)` to `/index.html`). **Verified live on 2026-11-22 after PR #2:** `/senior-care`, `/childcare`, `/disability-support` and `/about` all return 200 with the app. Side effect: a missing file such as `/assets/nope.js` also returns the HTML page with a 200, because the rewrite catches everything.
- `frontend/src/main.tsx` passes `basename: import.meta.env.BASE_URL` to the router. At the root this is just `/`, so it changes nothing today, but the base path is configurable in one place (Vite's `base`). This line was a human todo typed by the owner.
- Not verified on the live site: how it renders in a browser (checked with HTTP requests only), mobile, keyboard use, whether the font loads.

### Key files

- `frontend/src/main.tsx` — router setup (layout route + child routes) and the `#root` guard.
- `frontend/src/data/orgTypes.ts` — the `OrgType` interface plus all org-type content and colours; `accentStyle(org)` returns the CSS variables that recolour a section.
- `frontend/src/index.css` — Tailwind import, design tokens (`@theme`), text-size scaling, focus ring, reduced-motion rules.
- `frontend/src/components/` — `Layout`, `Header`, `Footer`, `Logo`, `TextSizeControl`, `VoiceLogPreview`, `PhotoPlaceholder`.
- `frontend/src/pages/` — `Home`, `OrgPage`, `NotFound`.
- Photos: `frontend/src/data/photos.ts` (typed `OrgPhoto` records: file, alt text, credit, credit URL), `frontend/src/components/Photo.tsx` (shows the photo with its credit and falls back to `PhotoPlaceholder` if the image fails to load), image files and `CREDITS.md` (licence checks) in `frontend/src/assets/photos/`. `OrgType` has an optional `photo`; only childcare has one.
- TypeScript: `frontend/tsconfig.json` points at `tsconfig.app.json` (the app, `strict: true`) and `tsconfig.node.json` (`vite.config.ts`). `npm run typecheck` runs `tsc -b`; `npm run build` runs `tsc -b && vite build`, so type errors fail the build. Imports keep their `.tsx`/`.ts` extensions, as in Vite's own template.

### Design system

- Inspiration: brightwheel (identify-yourself-first hero, organised footer) and Papa (short nav, skip link, warm human photography, plain language).
- Typeface: Atkinson Hyperlegible Next via Google Fonts, with fallbacks. Not yet visually confirmed in a browser with internet access.
- Colours: ink `#1F2A44`, paper `#FAFAF7`, line `#E3E4DF`. Per org (fill / text-safe deep / tint): childcare `#E8A317 / #7A4F00 / #FDF3DC`, senior care `#2F7D6D / #1F5A4E / #E3F1ED`, disability support `#5B4BB7 / #43358F / #ECEBF8`.
- Accent mechanism: utilities `bg-accent`, `text-accent-deep`, `bg-accent-tint`, `text-accent-on` read `--color-accent*` variables; a wrapper overrides them with `style={accentStyle(org)}`.
- Quality floor: skip link, visible focus ring, `prefers-reduced-motion` respected, keyboard-friendly, responsive to mobile.

### Placeholders to replace later

Sign in, Request early access (buttons do nothing), the senior care and disability support photos (childcare and the home page now have real photos), footer info pages, the logo (the name is now CareForAll, but the logo is still a placeholder).

## Next steps

1. ~~Finish the deploy fix~~ Done 2026-11-22 (PR #2 merged, deep links verified live).
2. ~~Convert the frontend to TypeScript~~ Done on `refactor/convert-to-typescript` (see the progress log for the PR state).
3. **Next deliverable (childcare only; the owner said the deadline is 2 hours, on 2026-11-22):** (a) a complete sign-up and sign-in flow with Firebase, (b) real photos in place of the placeholders for childcare and the home page (done on `feat/real-photos`, see the progress log). **Request early access was dropped from this deliverable** (owner's call). Sign-in decisions (2026-11-22): email and password or Google; no email verification required; after sign-in the header changes and there is a minimal `/account` page; sign-up collects an organization name stored in Firestore; "Forgot password?" is shown but does nothing yet. Not built yet.
4. Interviews with childcare operators, then the org-type architecture decision.
5. Create the `architecture/` folder once there is enough backend work to diagram (owner's call, 2026-11-22).

## Open decisions (owner decides; present options neutrally first)

- **"New and unique" tool** from the candidate list above.
- **Backend hosting.** Vercel serves the static frontend. How the Spring Boot backend is hosted (AWS is the plan) is not decided.
- **Vercel free plan fit.** Whether the Hobby plan's terms allow a commercial product was not confirmed (Vercel's docs I could read did not say). Read the Terms of Service before any commercial launch. Hobby deploys may also block commits from anyone who is not the Hobby team owner; test this when the peer starts pushing.
- **Offline-first in Phase 1** or later (open comment in the brainstorm summary doc).
- **Org-type architecture:** separate apps, one shared app with a type setting, or a shared core with pluggable modules.

## Decisions log

| Date | Decision | Reasoning |
| --- | --- | --- |
| 2026-11-15 | Childcare first; senior care and adult disability support later | Owner knows childcare operators and saw manual logging there |
| 2026-11-15 | Differentiators: offline kiosk, voice logging, pattern alerts | All target busy, hands-full staff; alerts build on logged data |
| 2026-11-15 | React + Vite + React Router (SPA) | Clean split from a Spring Boot API; cheap static hosting on AWS; SEO not a priority |
| 2026-11-15 | Tailwind CSS 4 | Fast styling with central design tokens; suits per-org accent colours |
| 2026-11-15 | Design: brightwheel + Papa inspiration, "three doors" with shifting accent, voice preview, text-size control, Atkinson Hyperlegible | Warmth plus accessibility for all three audiences |
| 2026-11-15 | Product name is **CareForAll** (replaces the working name "Carelog"); GitHub repo is `care-for-all` | Owner's call. The package name `care-app-frontend` was left unchanged for now |
| 2026-11-15 | Router `basename` read from Vite's `BASE_URL`, typed by the owner as a human todo | Keeps the base path in one place. Needed for GitHub Pages, harmless on Vercel |
| 2026-11-15 | Host on **Vercel** (replaces GitHub Pages, and the GitHub Actions and manual `gh-pages` options) | Owner chose it after Pages turned out to need a public repo on a free GitHub account (checked in GitHub's plans page). Vercel's docs: free plan deploys private repos from a personal account, serves from the root (no `/care-for-all/` prefix), deploys every push and gives each PR a preview URL, and fixes refresh on sub-pages with one `vercel.json` rewrite. Costs: commercial-use terms for the free plan unconfirmed; Hobby may block commits from non-owners; the Vercel GitHub app asks for broad permissions (limit it to this repo); no CI of our own yet |
| 2026-11-22 | Keep the commit author email as is, and make the repo private in a few weeks | Owner's call. The first commit (`f44ac1c`) shows his real email, readable by anyone while the repo is public. Going private later does not remove copies or cached views. The squash-merge commit already uses GitHub's noreply address |
| 2026-11-22 | Use **TypeScript** (7.0.2, with `@types/react` and `@types/react-dom` 19.3.0 and `@types/node` 24.19.2, all pinned exactly and over two weeks old) | Owner's call. The app is small (about 840 lines), so converting now is cheap, and typed data catches misspelled or missing fields before they ship. Costs: more to learn, and type errors are now build errors |
| 2026-11-22 | Turn on `strict` mode, and make type errors fail `npm run build` (so they block a Vercel deploy) | Owner chose both options. Strict catches missing-value mistakes (TypeScript 7 enables it by default, which was tested; the tsconfig also sets it explicitly). Verified: a type error stops the build before Vite runs and no `dist` folder is made. Cost: a type error on `main` blocks a quick fix from deploying; the previous deploy stays live and Vercel can roll back |
| 2026-11-22 | The next deliverable is three things, childcare only: complete sign-up and sign-in, Request early access end to end (to be trimmed), real photos. Deadline: 2 hours | Owner's call. The short deadline means the Spring Boot backend, AWS and the other roadmap items stay out of this deliverable unless the owner decides otherwise after seeing the options |
| 2026-11-22 | The next deliverable focuses on **childcare** only | Owner's call. Senior care and disability support pages stay as they are |
| 2026-11-22 | Drop "Request early access" from this deliverable | Owner's call, because the deadline is 2 hours. The button stays a placeholder |
| 2026-11-22 | Accounts with **Firebase Authentication** (email and password, plus Google sign-in) and **Firestore** for the organization name, not a hand-built backend | Owner's call: he does not want to build accounts from scratch. Costs: user data lives with Google, vendor dependency, Spring Boot is deferred (a Java backend can later verify Firebase's tokens; to be checked then), and storing children's records later needs a privacy review. Not confirmed from Firebase's pricing page that email and password sign-in is free |
| 2026-11-22 | Sign-in details: no email verification required; "Forgot password?" shown but inactive; minimal `/account` page and header change after sign-in | Owner's call, to fit the deadline |
| 2026-11-22 | Photos come from Unsplash's free licence, for childcare and the home page only; each photo's licence field is checked before use | Owner chose stock photos and picked `kPkRpy6pIIg` (childcare page) and `sQcFcFImSg8` (home page). The check found that 3 of 8 search results looked free but were Unsplash+ (paid, different licence). The licence is silent on model releases, and both photos show children, so they must not imply endorsement and need a second look before a commercial launch. See `frontend/src/assets/photos/CREDITS.md` |
| 2026-11-22 | The agent finished the owner's two photo todos (`orgTypes.ts` edits and `Photo.tsx`) at his request | He wanted to focus on Firebase. He created `photos.ts` himself (typed from the tested snippet; saved as `photo.ts`, renamed) |
| 2026-11-22 | Defer the `architecture/` folder until there is enough backend work (exception to the global rule, at the owner's request) | Owner's call. Today the app is a static frontend with no backend or stored data to diagram |

## Progress log

- 2026-11-15 — Brainstorm, competitor research, feature selection, roadmap draft.
- 2026-11-15 — Static home page and org landing template built; production build passes; screenshots reviewed. Fixed a bug where per-org colours didn't apply (CSS variables referenced via `var()` inside `@theme` resolve at `:root`, so overrides now set `--color-accent*` directly).
- 2026-11-15 — Code moved into `~/Desktop/CareForAll` and re-verified: `npm ci` (0 vulnerabilities), production build, `/`, `/senior-care` and `/about` render, hover colour shift and text-size control work, no console errors. Renamed the product from "Carelog" to CareForAll in code and docs (header, footer, title, aria-label, copy); mobile header still fits at 375px with no horizontal scroll. Added `.gitignore` and ran `git init -b main`. Not verified: mobile menu, keyboard use, font loading.
- 2026-11-15 — Committed the scaffold on `main` and the home page on `feat/static-home-page`; the owner pushed, opened PR #1 and squash-merged it. Looked at GitHub Pages: it needs a public repo on a free plan, serves under `/care-for-all/`, and has no server routing. The owner typed the router `basename` line himself (a human todo, tested first in a scratch copy). Then he deployed to Vercel (the live bundle matches a build of `main`). Live site checked by HTTP: home page 200 with the right title, sub-pages 404 on refresh because `vercel.json` was not deployed yet. Wrote `frontend/vercel.json` and removed the `/care-for-all/` base on `feat/vercel-deploy`.
- 2026-11-22 — Catch-up: nothing new on GitHub since PR #1; repo is public; live site unchanged (sub-pages still 404). Owner decisions: TypeScript, childcare focus for the next deliverable, keep the commit email, architecture folder later. Committed the deploy fix (`main.jsx` basename line was the owner's todo). Not verified: the rewrite on a real deploy, the live site in a browser.
- 2026-11-22 — Merged the deploy fix (PR #2) and confirmed on the live site that sub-pages now load on refresh. Converted the frontend to TypeScript on `refactor/convert-to-typescript`: pinned dependencies, tsconfig files, renamed files with `git mv`, typed props. Everything was proven in a scratch copy first. **Human todos typed by the owner:** the `OrgType` interface and typed helpers in `orgTypes.ts`, the `#root` null guard in `main.tsx`, and the localStorage validation in `TextSizeControl.tsx`. Reviewed against the tested versions: identical apart from whitespace (one double space fixed). Verified: `npx tsc -b` exits 0, `npm run build` passes, a missing data field and a missing `#root` guard each fail the type check, a type error blocks the build and creates no `dist`, six storage cases for the text size pass, and in a browser a junk stored text size falls back to normal, A++ persists across a reload, the hover colour shift works, an unknown URL shows the not-built page, and the console is clean. Not verified: mobile, keyboard use, font loading.
- 2026-11-22 — Photos on `feat/real-photos`. Searched Unsplash and verified each candidate's licence field (3 of 8 were paid Unsplash+); owner picked two and approved the downloads; both are real 1200x800 JPEGs with no GPS data. Built `photos.ts`, `Photo.tsx` and the wiring, proved in a scratch copy first: a misspelt image filename fails the build, both photos load on desktop and a 375px phone with no overflow, a broken image swaps to the placeholder, senior care and disability support keep their placeholders, console clean. Owner created `photos.ts`; the agent did the rest at his request. Not verified: other browsers, keyboard use.

## Working agreement (the owner's mentor rules)

The owner is building this to learn. Teach as you go: explain concepts in plain language with a concrete example, define terms the first time they appear, and prefer visuals for design topics. For any meaningful technical choice, lay out the options and tradeoffs neutrally with no recommendation, wait for the owner's decision, then give your honest take and let them confirm or switch before implementing. Work in small steps on one branch per big addition (`type/short-description`). **Never commit, merge, push or rewrite history without explicit approval:** show the branch, changed files and diff summary, propose a Conventional Commit message, and wait. Keep this file and `LOG.md` updated in the same commit as the work they describe. Never commit secrets.
