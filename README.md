# Justiniano Tagarda | Portfolio

Production portfolio and products site for Justiniano Tagarda, a senior .NET backend and full-stack developer. The site presents shipped products, selected client work, career experience, technical capabilities, and a downloadable resume.

## Production

- Primary site: <https://justintagarda.com>
- Firebase Hosting: <https://justintagarda-portfolio.web.app>

## Implemented features

- Responsive single-page portfolio with smooth anchor navigation.
- Hero section with positioning, availability, social links, and resume actions.
- Product showcase with project descriptions, technology tags, live links, and screenshot counts.
- Separate experience timeline sourced from the career content model.
- Other Work section for client and company delivery.
- Screenshot gallery modal with thumbnail selection, previous/next controls, `Escape`, and left/right arrow navigation.
- Body-scroll locking while gallery and resume dialogs are open.
- In-browser resume PDF preview and download using the same generated PDF blob.
- A4 resume generation with `@react-pdf/renderer`, including a browser-compatible profile image conversion path.
- Contact form submission through Formspree with loading, success, and error states.
- Hidden `_gotcha` honeypot field for basic spam mitigation.
- Custom `JT` SVG favicon and basic page metadata.

## Featured products and work

The project catalog is defined in `src/content/portfolio.json` and currently includes:

- **Cognify: Focus & Study** - Flutter/Dart study application with SQLite, Google Drive, Google Sign-In, and OCR capabilities.
- **RightSpeak** - WPF/.NET desktop text-to-speech application using Win32 interop, UI Automation, and local neural TTS.
- **AudioScript** - WPF/.NET transcription and audio workflow application using NAudio, Whisper.net, pyannote, and xUnit.
- **MemoCards** - Next.js/React learning application backed by Supabase/PostgreSQL and Google Cloud AI services.
- **Product Costing** - Next.js/React costing application using TypeScript, Tailwind CSS, Supabase, and PostgreSQL.
- **GEDAC Company Website** - ASP.NET Framework company website using jQuery, JavaScript, CSS, and HTML.

The first five projects appear under **Products**. GEDAC appears under **Other Work**.

## Technology stack

### Portfolio application

- React 19 and React DOM
- TypeScript 5.9
- Vite 7
- Tailwind CSS 4 through `@tailwindcss/vite`
- `@react-pdf/renderer` for client-side resume PDF generation
- ESLint 9 with TypeScript, React Hooks, and React Refresh plugins

### Portfolio integrations and delivery

- Formspree for the contact form endpoint
- Firebase Hosting for static hosting
- GitHub Actions for deployment on pushes to `main`
- Node.js 20 in the deployment workflow
- SPA fallback rewrite from all hosting routes to `/index.html`

### Technologies represented in the portfolio content

- Backend: C#, .NET, ASP.NET Core, ASP.NET Framework, REST APIs, Entity Framework Core
- Frontend: React, Next.js, TypeScript, JavaScript, Tailwind CSS
- Data: SQL Server, PostgreSQL, Supabase, MySQL, NoSQL
- Infrastructure: IIS, Windows Server, Docker, Azure DevOps, Firebase Hosting
- Desktop and cross-platform: WPF, Windows Forms, Flutter, Dart
- Testing and quality: xUnit, automated regression testing, build/test validation

## Architecture and data flow

This repository contains a static React SPA. It has no backend service or database layer in the repo, and no application API calls were found beyond the browser-side Formspree submission.

```text
src/main.tsx
  -> React StrictMode / createRoot
  -> src/App.tsx
      -> src/content/portfolio.ts
          -> parse and validate src/content/portfolio.json
          -> resolve imported project image assets
      -> page sections and interactive modals
      -> dynamic resume renderer import
          -> @react-pdf/renderer
      -> Formspree fetch on contact submission
```

The site content is data-driven but the page composition remains centralized in `src/App.tsx`. Project images are imported and resolved by the bundler rather than loaded from arbitrary runtime paths.

## Repository structure

```text
portfolio/
  .github/workflows/
    firebase-hosting-production.yml
  public/
    favicon.svg
    legal/
    projects/
  src/
    App.tsx
    index.css
    main.tsx
    assets/
      images/
      projects/
    components/
      ResumePdfDocument.tsx
      renderResumePdf.tsx
    content/
      portfolio.json
      portfolio.ts
  .env.example
  .firebaserc
  firebase.json
  index.html
  package.json
  package-lock.json
  tsconfig*.json
  vite.config.ts
```

## Local development

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Run linting:

```bash
npm run lint
```

Build the production bundle:

```bash
npm run build
```

Preview the production bundle locally:

```bash
npm run preview
```

For local Formspree configuration, copy `.env.example` to an environment file supported by Vite and set `VITE_FORMSPREE_ENDPOINT` as needed. The application also has a default endpoint fallback in `src/App.tsx`.

## Deployment

Firebase Hosting serves the `dist` directory using the configuration in `firebase.json`. The SPA rewrite sends unknown routes to `/index.html`.

The GitHub Actions workflow at `.github/workflows/firebase-hosting-production.yml` runs on pushes to `main`, installs dependencies with `npm ci`, builds with `npm run build`, and deploys the `live` Firebase Hosting channel. The workflow supplies `VITE_FORMSPREE_ENDPOINT` from a GitHub repository variable.

## Content sources

- Website copy, navigation, contact details, project catalog, and default UI data: `src/content/portfolio.json`
- Typed content definitions, runtime validation, and project image resolution: `src/content/portfolio.ts`
- Resume PDF document layout: `src/components/ResumePdfDocument.tsx`
- Lazy PDF rendering helper: `src/components/renderResumePdf.tsx`
- Page composition and interaction logic: `src/App.tsx`
- HTML title, description, and favicon reference: `index.html`

## Editing content safely

- Edit portfolio copy, career data, resume data, links, and project metadata in `src/content/portfolio.json`.
- Edit `src/content/portfolio.ts` only when adding or changing a project image key, updating the content schema, or changing runtime validation.
- For a new project image, add the file under `src/assets/projects/`, add its static import and key to `portfolio.ts`, then reference that key from `portfolio.json`.
- Do not recreate the retired `profile.json`, `career-profile.json`, or `career-content.json` files, and do not place active content defaults or project records in `App.tsx`.
- After a content migration, validate the JSON, check project asset-key coverage, confirm no retired imports remain, run a non-emitting TypeScript check and lint, and build only when explicitly requested.

## Testing and known gaps

- `npm run lint` is the available static quality check.
- `npm run build` validates TypeScript compilation and the Vite production bundle.
- No automated test or spec files were found in the repository.
- The deployment workflow currently runs the build but does not run lint or automated tests.
- Gallery screenshots are bundled as static assets; larger images may affect initial load and gallery performance.
- The main UI remains concentrated in `src/App.tsx`, which increases maintenance and change-collision risk as the site grows.

## Contact

- Email: <mailto:justintagarda@gmail.com>
- LinkedIn: <https://www.linkedin.com/in/justintagarda>
- GitHub: <https://github.com/JustinTagarda>
