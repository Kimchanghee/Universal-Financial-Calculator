# Finora - Universal Financial Calculator

A multilingual financial calculator web app built with React + TypeScript + Vite.

## Tech Stack

- React 19
- TypeScript
- Vite

## Local Development

1. Install dependencies
```bash
npm install
```

2. Configure environment variables
```bash
cp .env.example .env.local
```

3. Start dev server
```bash
npm run dev
```

4. Build and preview production bundle
```bash
npm run build
npm run preview
```

## Lovable Deployment (Single Source of Deployment)

This repository is configured to deploy through Lovable only.

1. Connect this GitHub repository in Lovable.
2. Set environment variables in Lovable Project Settings > Environment Variables.
3. Publish from Lovable.
4. If environment variables change, publish again.

## Environment Variables

- `VITE_GA_ID` (optional)
- `VITE_ADSENSE_ID` (optional)
- `GEMINI_API_KEY` (optional)
- `VITE_APP_ENV` (optional, defaults to `development` locally)

## SEO Notes

Before final production publish, update the domain references in:

- `public/robots.txt`
- `public/sitemap.xml`

Use your published Lovable domain (`https://<your-project>.lovable.app`) or your custom domain.

## Project Scripts

- `npm run dev` - start local dev server
- `npm run build` - build production bundle
- `npm run preview` - preview production bundle locally
