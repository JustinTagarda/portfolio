# Justiniano Tagarda | Portfolio

Modern single-page portfolio focused on enterprise-grade full-stack delivery and backend-first engineering.

## Production

- Primary: https://justintagarda.com
- Firebase Hosting: https://justintagarda-portfolio.web.app

## Overview

This portfolio presents Justiniano Tagarda as a Full-Stack .NET Developer with 15+ years of hands-on delivery across:

- High-availability APIs
- ERP and internal operations systems
- Production support and reliability work
- Client-facing and business-critical web platforms

The goal of this site is clear positioning for hiring teams and clients looking for dependable, production-ready engineering execution.

## Key Features

- Enterprise-style landing page with strong visual hierarchy
- Sticky top navigation with smooth section anchor scrolling
- Hero section with credibility highlights and availability status
- About section with concise delivery-focused narrative
- Featured project case-study card with:
  - architecture and capability highlights
  - stack tags
  - external live demo and GitHub links
  - screenshot gallery modal
- Image gallery viewer with keyboard navigation (`Esc`, left/right arrows)
- Skills and tools grouped by domain:
  - Backend
  - Frontend
  - Databases
  - DevOps
  - Tools
  - Collaboration
- Contact section with engagement details and communication channels
- Custom `JT` favicon

## Tech Stack

- React 19
- TypeScript
- Vite 7
- Tailwind CSS v4
- ESLint (JS/TS + React hooks)
- Firebase Hosting (Classic)
- GitHub Actions (auto-deploy on push to `main`)

## Project Structure

```text
portfolio/
  .github/
    workflows/
      firebase-hosting-production.yml
  public/
    favicon.svg
    projects/
      product-costing/
  src/
    assets/
      images/
    App.tsx
    index.css
    main.tsx
  firebase.json
  .firebaserc
```

## Local Development

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deployment

This repository is configured for Firebase Hosting static deployment:

- Build output directory: `dist`
- SPA rewrite rule to `index.html`
- Auto-deploy workflow: `.github/workflows/firebase-hosting-production.yml`

Every push to `main` triggers build and production deployment through GitHub Actions.

## Contact

- Email: justintagarda@gmail.com
- LinkedIn: https://www.linkedin.com/in/justintagarda
- GitHub: https://github.com/JustinTagarda
