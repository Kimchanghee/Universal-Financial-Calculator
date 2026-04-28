# Adsterra Monetization

## Placements

- Left sidebar: 160x600 desktop
- Top banner: 728x90 desktop, 320x50 mobile
- Body rectangle: 300x250
- Footer banner: 728x90 desktop, 320x50 mobile
- Right sidebar: 160x600 desktop

## Implementation

- Third-party ad code is loaded inside iframe `srcdoc` blocks.
- Public Adsterra zone keys are safe to ship in the client bundle.
- The private Adsterra Publisher API key must stay server-side and is not used by this app.
- Lazy loading is enabled for body, footer, and sidebar placements.

## SEO Guardrails

- Ads use fixed dimensions to reduce CLS.
- Main calculator controls remain the primary above-the-fold content.
- No legacy Google ad script or publisher ID remains in this project.
