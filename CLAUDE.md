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
| Frontend | React 19 + Vite 8 + React Router 8 (SPA) | In use |
| Styling | Tailwind CSS 4 (tokens in `frontend/src/index.css`) | In use |
| Backend | Java Spring Boot | Not started |
| Cloud | AWS | Not started |
| "New and unique" tool | Undecided (candidates: AWS CDK, Playwright, Spring Modulith, Storybook, TanStack Query, Testcontainers) | Open decision |

Dependency versions are pinned exactly (no `^`), each chosen to be at least two weeks old at install time. Keep that habit when adding packages.

## Repository

- Layout: `frontend/` holds the React app. A `backend/` folder will hold Spring Boot later. Keep them cleanly separated.
- Git: initialized at the repo root on `main` (2026-11-15), no commits yet. `.gitignore` is at the root (`node_modules/`, `dist/`, `.env*` except `.env.example`, OS/editor files, logs). See "Next steps" for the agreed first commits.
- Remote: the owner creates an empty GitHub repo named `care-for-all`; nothing is pushed until he approves. Hosting on GitHub (Pages) is planned, not built: see "Open decisions".
- Planned branch for current work: `feat/static-home-page`.

## Current state

Two static pages are built and verified (production build passes; desktop and mobile screenshots reviewed):

- **Home (`/`)**: sticky header with nav to the three care types, a text-size control (A / A+ / A++), and a "Sign in" placeholder. The hero asks "Who do you care for?" with three choices; hovering or focusing one shifts the page accent colour to that org. A voice-log preview card types out a sample spoken note and turns it into structured entries. Then a 3-step "how it works", a "made for real care settings" section with a photo placeholder, a closing call to action, and a multi-column footer.
- **Org landing template (`/:orgSlug`)**: one component serves `/childcare`, `/senior-care` and `/disability-support`, reading content and colours from `frontend/src/data/orgTypes.js`. Sections: hero, three tailored features, a sample-day timeline, links to the other care types.
- **Catch-all (`*`)**: "This page isn't built yet" page, used by footer links (About, Contact, Privacy, Accessibility, Security).

### Key files

- `frontend/src/main.jsx` — router setup (layout route + child routes).
- `frontend/src/data/orgTypes.js` — all org-type content and colours; `accentStyle(org)` returns the CSS variables that recolour a section.
- `frontend/src/index.css` — Tailwind import, design tokens (`@theme`), text-size scaling, focus ring, reduced-motion rules.
- `frontend/src/components/` — `Layout`, `Header`, `Footer`, `Logo`, `TextSizeControl`, `VoiceLogPreview`, `PhotoPlaceholder`.
- `frontend/src/pages/` — `Home`, `OrgPage`, `NotFound`.

### Design system

- Inspiration: brightwheel (identify-yourself-first hero, organised footer) and Papa (short nav, skip link, warm human photography, plain language).
- Typeface: Atkinson Hyperlegible Next via Google Fonts, with fallbacks. Not yet visually confirmed in a browser with internet access.
- Colours: ink `#1F2A44`, paper `#FAFAF7`, line `#E3E4DF`. Per org (fill / text-safe deep / tint): childcare `#E8A317 / #7A4F00 / #FDF3DC`, senior care `#2F7D6D / #1F5A4E / #E3F1ED`, disability support `#5B4BB7 / #43358F / #ECEBF8`.
- Accent mechanism: utilities `bg-accent`, `text-accent-deep`, `bg-accent-tint`, `text-accent-on` read `--color-accent*` variables; a wrapper overrides them with `style={accentStyle(org)}`.
- Quality floor: skip link, visible focus ring, `prefers-reduced-motion` respected, keyboard-friendly, responsive to mobile.

### Placeholders to replace later

Sign in, Request early access (buttons do nothing), photo placeholders, footer info pages, the logo (the name is now CareForAll, but the logo is still a placeholder).

## Next steps

1. **Confirm open decisions with the owner** (see below) before building further.
2. **Initialize git** at the repo root, then propose two commits for the owner to approve:
   - On `main`: `chore: scaffold Vite + React + Tailwind frontend` (package files, Vite config, `index.html`, `.gitignore`, `README.md`, `CLAUDE.md`, `LOG.md`).
   - On `feat/static-home-page`: `feat: add home page, org landing template, header and footer` (everything in `frontend/src/`).
   Ask the owner whether to merge by GitHub pull request or local merge.
3. Have the owner run `npm install && npm run dev` in `frontend/` and check both pages, including the hover colour shift, text-size control and mobile menu.
4. Then: interviews with childcare operators, followed by the org-type architecture decision and Phase 1 planning.

## Open decisions (owner decides; present options neutrally first)

- **JavaScript vs TypeScript.** The pages were written in plain JavaScript (JSX) without asking. Raise this explicitly; converting now is cheap.
- **"New and unique" tool** from the candidate list above.
- **GitHub Pages hosting details.** The owner wants to host on GitHub. A Pages site lives under `/care-for-all/` and has no server-side routing, so a deep link like `/senior-care` would 404 on refresh unless we add a fix (options: a `404.html` redirect trick, hash routing, or a custom domain at the root). Lay out the options neutrally before building. Also decide deploy method (GitHub Actions vs manual) and how the later Spring Boot backend is hosted, since Pages is static only.
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

## Progress log

- 2026-11-15 — Brainstorm, competitor research, feature selection, roadmap draft.
- 2026-11-15 — Static home page and org landing template built; production build passes; screenshots reviewed. Fixed a bug where per-org colours didn't apply (CSS variables referenced via `var()` inside `@theme` resolve at `:root`, so overrides now set `--color-accent*` directly).
- 2026-11-15 — Code moved into `~/Desktop/CareForAll` and re-verified: `npm ci` (0 vulnerabilities), production build, `/`, `/senior-care` and `/about` render, hover colour shift and text-size control work, no console errors. Renamed the product from "Carelog" to CareForAll in code and docs (header, footer, title, aria-label, copy); mobile header still fits at 375px with no horizontal scroll. Added `.gitignore` and ran `git init -b main`. Not verified: mobile menu, keyboard use, font loading.

## Working agreement (the owner's mentor rules)

The owner is building this to learn. Teach as you go: explain concepts in plain language with a concrete example, define terms the first time they appear, and prefer visuals for design topics. For any meaningful technical choice, lay out the options and tradeoffs neutrally with no recommendation, wait for the owner's decision, then give your honest take and let them confirm or switch before implementing. Work in small steps on one branch per big addition (`type/short-description`). **Never commit, merge, push or rewrite history without explicit approval:** show the branch, changed files and diff summary, propose a Conventional Commit message, and wait. Keep this file and `LOG.md` updated in the same commit as the work they describe. Never commit secrets.
