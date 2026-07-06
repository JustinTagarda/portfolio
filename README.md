# Justiniano Tagarda | Portfolio

Modern single-page portfolio focused on enterprise-grade full-stack delivery, AI-augmented development, and long-term production systems.

## Production

- Primary: https://justintagarda.com
- Firebase Hosting: https://justintagarda-portfolio.web.app

## Overview

This portfolio presents Justiniano Tagarda as a Senior Full Stack .NET Developer | AI-Augmented Builder with 15+ years of hands-on delivery across:

- High-availability APIs
- React/Next.js interfaces
- ERP and internal operations systems
- Production support and reliability work
- Client-facing and business-critical web platforms
- AI-assisted and AI-augmented delivery workflows

The goal of this site is clear positioning for hiring teams and clients looking for dependable, production-ready engineering execution.

## Key Features

- Enterprise-style landing page with strong visual hierarchy
- Sticky top navigation with smooth section anchor scrolling
- Hero section with credibility highlights, availability status, and AI-assisted delivery positioning
- About section with concise delivery-focused narrative
- Featured project case-study cards with:
  - architecture and capability highlights
  - stack tags
  - external live demo and GitHub links
  - screenshot gallery modal
- Image gallery viewer with keyboard navigation (`Esc`, left/right arrows)
- Skills and delivery capabilities grouped by domain:
  - Backend
  - Business Systems
  - Databases
  - DevOps & Infrastructure
  - Frontend
  - Testing & Quality
  - AI-Assisted Development
  - Desktop & Legacy Systems
- Contact section with engagement details and communication channels
- Resume PDF output that uses dedicated PDF header content from `src/content/career-content.json` and shared about/contact data from the website profile
- Custom `JT` favicon

## Featured Projects

- Cognify: Focus & Study
- RightSpeak
- AudioScript
- MemoCards
- Product Costing
- GEDAC Company Website

## Tech Stack

- React 19
- TypeScript
- Vite 7
- Tailwind CSS v4
- React PDF
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
    components/
    App.tsx
    index.css
    main.tsx
    content/
      career-content.json
      career-profile.json
      profile.json
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

## Content Sources

- Website hero/about/footer copy: `src/content/profile.json`
- Website timeline/experience extensions: `src/content/career-profile.json`
- Resume PDF body content: `src/content/career-content.json`
- Resume PDF title/header content: sourced from `src/content/career-content.json`
- Resume PDF shared about/contact content: sourced from `src/content/profile.json`

## Contact

- Email: justintagarda@gmail.com
- LinkedIn: https://www.linkedin.com/in/justintagarda
- GitHub: https://github.com/JustinTagarda
