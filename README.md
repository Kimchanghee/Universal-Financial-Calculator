# Finora - Universal Financial Calculator

A multilingual financial calculator web app built with React, TypeScript, and Vite.

## Tech Stack

- React 19
- TypeScript
- Vite

## Local Development

```bash
npm install
npm run dev
```

Build and preview:

```bash
npm run build
npm run preview
```

## Lovable Deployment

This repository is configured to deploy through Lovable.

1. Connect this GitHub repository in Lovable.
2. Set optional environment variables in Lovable Project Settings.
3. Publish from Lovable.
4. If environment variables change, publish again.

## Environment Variables

- `VITE_GA_ID` optional Google Analytics measurement ID
- `VITE_ADSTERRA_728_KEY` optional Adsterra 728x90 override
- `VITE_ADSTERRA_300_KEY` optional Adsterra 300x250 override
- `VITE_ADSTERRA_160_KEY` optional Adsterra 160x600 override
- `VITE_ADSTERRA_320_KEY` optional Adsterra 320x50 override
- `VITE_ADSTERRA_LAZY_MARGIN` optional IntersectionObserver margin
- `GEMINI_API_KEY` optional
- `VITE_APP_ENV` optional

Do not put the private Adsterra Publisher API key in this frontend project.

## SEO, GEO, and AEO

- `index.html` includes clean canonical, Open Graph, Twitter, WebApplication, FAQPage, and BreadcrumbList metadata.
- `public/sitemap.xml` includes calculator URLs and hreflang alternates.
- `public/robots.txt` allows search and AI crawlers.
- `public/llms.txt` summarizes the site for answer engines.

## Monetization

- Adsterra display placements are configured for side rails, top, body, and footer.
- Ads use isolated iframes and fixed dimensions.
- Legacy Google ad code and configuration have been removed.

## Project Scripts

- `npm run dev` - start local dev server
- `npm run build` - build production bundle
- `npm run preview` - preview production bundle locally
