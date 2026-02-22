# APPINFO.md (Session Handoff Cache)

This file is the persistent quick-context cache for this repo.  
Every new session should read this file first before re-scanning the project.

## Session Metadata

- `last_updated`: `2026-02-22`
- `updated_by`: `GPT-5 coding agent`
- `source_scope`: `quick know-the-app analysis + local build/lint verification`
- `workspace`: `d:\Projects\portfolio`
- `shell`: `powershell`

## Usage Contract (for future sessions)

- Read this file first.
- Trust line/path references as initial map, then spot-check changed files.
- After any meaningful change, update:
  - `Current State`
  - `Risks / Debt`
  - `Validation Results`
  - `Recent Change Notes`
- Keep references precise (`path:line`).
- Do not delete older notes unless obsolete; mark as superseded.

## Current State

- App type: static SPA portfolio.
- Architecture: single React app, no backend code in this repo, no API calls observed.
- Main implementation is centralized in `src/App.tsx:4` (large in-file `data` object + full UI rendering).
- Work Experience section is implemented and rendered from `resume.json` data.
- Featured project gallery images are now loaded via `src/assets` imports (bundler-managed paths).
- Contact form is wired to Formspree via frontend POST, with env override support and default endpoint fallback.
- Build/deploy pipeline is configured and working (lint/build passed, Firebase deploy workflow present).
- Working tree state during analysis: clean (`git status --short` returned no changes).

## Project Identity

- Name: `portfolio` (`package.json`).
- Positioning/content: professional portfolio for Justiniano Tagarda.
- Public URLs documented in `README.md:7` and `README.md:8`:
  - `https://justintagarda.com`
  - `https://justintagarda-portfolio.web.app`

## File System Snapshot (from analysis)

Top-level entries observed:

- `.firebase/`
- `.git/`
- `.github/`
- `dist/`
- `node_modules/`
- `public/`
- `src/`
- `.firebaserc`
- `.env.example`
- `.gitignore`
- `eslint.config.js`
- `firebase.json`
- `index.html`
- `package-lock.json`
- `package.json`
- `README.md`
- `resume.json`
- `tsconfig.app.json`
- `tsconfig.json`
- `tsconfig.node.json`
- `vite.config.ts`

Tracked file list (via `rg --files` during scan):

```text
vite.config.ts
tsconfig.node.json
tsconfig.json
tsconfig.app.json
package-lock.json
index.html
firebase.json
eslint.config.js
src/main.tsx
src/index.css
src/assets/images/profile-photo.webp
src/assets/images/profile-photo.png
src/App.tsx
resume.json
README.md
package.json
public/vite.svg
public/projects/product-costing/Screenshot-08.png
public/projects/product-costing/Screenshot-07.png
public/projects/product-costing/Screenshot-06.png
public/projects/product-costing/Screenshot-05.png
public/projects/product-costing/Screenshot-04.png
public/projects/product-costing/Screenshot-03.png
public/projects/product-costing/Screenshot-02.png
public/projects/product-costing/Screenshot-01.png
public/projects/product-costing/cover.webp
public/favicon.svg
```

## Tech Stack + Tooling

From `package.json`:

- Scripts:
  - `dev`: `vite` (`package.json:7`)
  - `build`: `tsc -b && vite build` (`package.json:8`)
  - `lint`: `eslint .` (`package.json:9`)
  - `preview`: `vite preview` (`package.json:10`)
- Runtime deps:
  - `react` `^19.2.0` (`package.json:13`)
  - `react-dom` `^19.2.0` (`package.json:14`)
- Key dev deps:
  - `vite` `^7.3.1` (`package.json:30`)
  - `tailwindcss` `^4.1.17` (`package.json:27`)
  - `@tailwindcss/vite` `^4.1.17` (`package.json:17`)
  - `typescript` `~5.9.3`
  - ESLint + TS ESLint + React hooks/refresh plugins

Config highlights:

- Vite plugins: React + Tailwind (`vite.config.ts`).
- TypeScript strictness enabled in both app and node configs:
  - `tsconfig.app.json:20`
  - `tsconfig.node.json:18`
- `noUnusedLocals` and `noUnusedParameters` enabled:
  - `tsconfig.app.json:21`, `tsconfig.app.json:22`
  - `tsconfig.node.json:19`, `tsconfig.node.json:20`

## Runtime Entry + Styling

- App mount:
  - React `StrictMode` used (`src/main.tsx:1`, `src/main.tsx:7`)
  - Root render via `createRoot` (`src/main.tsx:2`, `src/main.tsx:6`)
- Styling:
  - Tailwind imported in CSS (`src/index.css:1`)
  - Smooth scroll enabled (`src/index.css:5`)
  - Base font stack is system/UI sans (`src/index.css:20`)

## Application Structure (src/App.tsx)

Primary anchors:

- Central data model starts at `src/App.tsx:18`
- `SectionDivider` component at `src/App.tsx:161`
- Main app component at `src/App.tsx:169`

Rendered sections:

- About section: `src/App.tsx:433`
- Experience section: `src/App.tsx:462`
- Work section: `src/App.tsx:537`
- Skills section: `src/App.tsx:630`
- Contact section: `src/App.tsx:685`

Navigation:

- Nav data array at `src/App.tsx:146` (includes `#experience`)
- Header nav links + CTA render near top of component.

### Work Experience Section

- Resume data source:
  - imported raw JSON: `src/App.tsx:3`
  - parsed resume object: `src/App.tsx:157`
  - mapped timeline items: `src/App.tsx:158`
- Section renders in timeline/card layout with dark-theme styling:
  - section root: `src/App.tsx:462`
  - timeline map: `src/App.tsx:498`
  - sticky-style snapshot card metrics: `src/App.tsx:475`

## Key Feature Behavior

### Featured Project + Gallery Modal

- Project list exists in data (`src/App.tsx:27`) with `featured: true` (`src/App.tsx:54`).
- Featured cover + gallery images use imported assets from:
  - `src/assets/projects/product-costing/`
  - image imports begin at `src/App.tsx:4`
- Gallery images array in project data at `src/App.tsx:60`.
- Cover click opens modal at selected image (`src/App.tsx:565`).
- Screenshot count shown (`src/App.tsx:579`).
- Modal state uses:
  - `activeProjectIndex`
  - `activeImageIndex`
  - `activeGallery`
- Keyboard/UX behavior in `useEffect` (`src/App.tsx:290`):
  - Locks body scroll on open (`src/App.tsx:294`)
  - Restores previous overflow on cleanup (`src/App.tsx:316`)
  - `Escape` closes
  - `ArrowLeft` previous (`src/App.tsx:304`)
  - `ArrowRight` next (`src/App.tsx:308`)

### Contact Form

- Form submits via Formspree endpoint from client-side handler:
  - endpoint resolution (env override + default): `src/App.tsx:164`
  - current default endpoint: `https://formspree.io/f/mpqjyoov`
  - submit handler: `src/App.tsx:213`
  - request send via `fetch`: `src/App.tsx:244`
  - success message state: `src/App.tsx:279`
- Configuration:
  - `VITE_FORMSPREE_ENDPOINT` defined in `.env.example:1`
  - local runtime value set in `.env.local:1`
- Spam mitigation:
  - hidden `_gotcha` honeypot field at `src/App.tsx:748`
- UX states:
  - button disabled while sending (`src/App.tsx:792`)
  - sending label toggle (`src/App.tsx:799`)

### Social Links Consistency

- Hero social links include placeholders (`#`) for GitHub/LinkedIn:
  - `src/App.tsx:10`
  - `src/App.tsx:11`
- Footer and contact channel links use real URLs/mailto:
  - `src/App.tsx:127`
  - `src/App.tsx:128`
  - `src/App.tsx:111`
  - `src/App.tsx:118`

## Hosting + Deployment

Firebase hosting config (`firebase.json`):

- Site: `justintagarda-portfolio` (`firebase.json:3`)
- Public dir: `dist` (`firebase.json:4`)
- SPA rewrite: `** -> /index.html` (`firebase.json:12`, `firebase.json:13`)

Firebase project alias (`.firebaserc`):

- default project: `justintagarda-portfolio`

GitHub Actions workflow (`.github/workflows/firebase-hosting-production.yml`):

- Trigger: push to `main` (`.github/workflows/firebase-hosting-production.yml:4`, `:6`)
- Node: 20 (`.github/workflows/firebase-hosting-production.yml:21`)
- Steps:
  - `npm ci` (`.github/workflows/firebase-hosting-production.yml:25`)
  - `npm run build` (`.github/workflows/firebase-hosting-production.yml:28`)
  - Build injects `VITE_FORMSPREE_ENDPOINT` from repo variable (`.github/workflows/firebase-hosting-production.yml:30`)
  - Firebase deploy action (`.github/workflows/firebase-hosting-production.yml:32`)
  - `channelId: live` (`.github/workflows/firebase-hosting-production.yml:37`)
  - `projectId: justintagarda-portfolio` (`.github/workflows/firebase-hosting-production.yml:38`)

## SEO / HTML Shell

From `index.html`:

- Favicon path: `/favicon.svg` (`index.html:5`)
- Meta description present (`index.html:8`)
- Title: `Justiniano Tagarda | Portfolio` (`index.html:11`)

## Asset Notes

`src/assets/projects/product-costing` (active source used by gallery/cover):

- `cover.webp` 39,494 B
- `Screenshot-01.png` 94,719 B
- `Screenshot-02.png` 542,834 B
- `Screenshot-03.png` 248,912 B
- `Screenshot-04.png` 409,593 B
- `Screenshot-05.png` 969,518 B
- `Screenshot-06.png` 497,779 B
- `Screenshot-07.png` 338,205 B
- `Screenshot-08.png` 92,383 B

`public/projects/product-costing` sizes observed:

- `.gitkeep` 1 B
- `cover.webp` 39,494 B
- `Screenshot-01.png` 94,719 B
- `Screenshot-02.png` 542,834 B
- `Screenshot-03.png` 248,912 B
- `Screenshot-04.png` 409,593 B
- `Screenshot-05.png` 969,518 B
- `Screenshot-06.png` 497,779 B
- `Screenshot-07.png` 338,205 B
- `Screenshot-08.png` 92,383 B

Potentially unused artifacts from grep checks:

- `src/assets/images/profile-photo.png` (no references found; `.webp` is used)
- `public/projects/product-costing/cover.webp` (no references found)

## Validation Results (2026-02-22 scan)

Commands executed:

- `npm run lint` -> passed.
- `npm run build` -> passed.
- Re-ran after Formspree integration:
  - `npm run lint` -> passed.
  - `npm run build` -> passed.
- Re-ran after Experience section integration:
  - `npm run lint` -> passed.
  - `npm run build` -> passed.
- Re-ran after featured gallery image source migration (`public` paths -> imported assets):
  - `npm run lint` -> passed.
  - `npm run build` -> passed.

Build output summary:

- `dist/index.html` ~0.68 kB (gzip ~0.41 kB)
- `dist/assets/profile-photo-*.webp` ~20.12 kB
- `dist/assets/index-*.css` ~35.03 kB (gzip ~6.47 kB)
- `dist/assets/index-*.js` ~222.37 kB (gzip ~67.22 kB)
- Vite build completed successfully.

## Quality / Risk Notes

- No tests were found (`rg --files -g "*test*" -g "*spec*"` returned none).
- CI deploy workflow does not run lint/tests before deploy (build only).
- Hero social links are partially placeholder links (`#`), potential UX credibility issue.
- Large screenshot assets may impact load/perf over slower networks.
- Core app content and layout are heavily centralized in one large file (`src/App.tsx`, ~875 lines), increasing merge and maintenance friction.

## Git Snapshot (during analysis)

- `git status --short` -> clean.
- Recent commits (`git log --oneline -n 5` at scan time):
  - `49e6490` Refine README with features, stack, and production URLs
  - `e1a0231` Replace default favicon with JT monogram icon
  - `52a348b` Trigger Firebase auto-deploy with configured secret
  - `fe1f9ab` Fix workflow parsing issue in Firebase deploy action
  - `aff5cf3` Improve Firebase deploy workflow credential handling

## Ignore Rules Snapshot

From `.gitignore` key entries:

- `node_modules` (`.gitignore:10`)
- `dist` (`.gitignore:11`)
- `.firebase` (`.gitignore:14`)

## README Cross-Check

README claims aligned with repo state:

- Production URLs present (`README.md:7`, `README.md:8`)
- Stack references include React 19 and Tailwind v4 (`README.md:45`, `README.md:48`)
- Auto-deploy to Firebase on push to `main` documented (`README.md:51`, `README.md:108`)

## Fast Start Commands (for next session)

```bash
npm install
npm run dev
npm run lint
npm run build
npm run preview
```

## Recent Change Notes (append-only, newest first)

- `2026-02-22`: Fixed featured project image reliability in local/dev rendering.
  - Migrated gallery + cover image source from `/public/projects/...` string paths to imported assets under `src/assets/projects/product-costing/`.
  - This ensures Vite-managed URLs and avoids base/path inconsistencies.
  - Verified with lint + production build passes.
- `2026-02-22`: Added initial Work Experience section design.
  - Added `#experience` navigation entry and section between About and Work.
  - Wired section content to `resume.json` (`work_experience`) and rendered as timeline cards.
  - Kept existing theme direction (dark glass cards, blue/amber accents, rounded panels).
  - Verified with lint + production build passes.
- `2026-02-22`: Contact form implementation added with Formspree integration.
  - Added frontend submit handler, loading/success/error states, and response parsing in `src/App.tsx`.
  - Added hidden `_gotcha` honeypot field for basic bot filtering.
  - Set `VITE_FORMSPREE_ENDPOINT` to `https://formspree.io/f/mpqjyoov` in `.env.example` and `.env.local`.
  - Added default Formspree endpoint fallback in `src/App.tsx` while keeping env override.
  - Updated deploy workflow to pass `VITE_FORMSPREE_ENDPOINT` from GitHub repository variable.
  - Verified with lint + production build passes.
- `2026-02-22`: Initial app reconnaissance completed and persisted to `appinfo.md`.
  - Confirmed runtime/deploy health with lint + build passes.
  - Documented architecture, line references, risks, and likely dead assets.
