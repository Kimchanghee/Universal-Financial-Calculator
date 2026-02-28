# ADS_OPTIMIZATION.md

## 1) Goals

- Maximize ad revenue: increase estimated earnings per session.
- Protect UX: avoid major CLS/LCP regressions.
- Reduce policy risk: avoid prohibited patterns (forced refresh, aggressive overlays).

## 2) Implemented Ad Revenue Settings

### Applied in code

1. Priority loading
- Top slot (`top`) loads immediately (`priority=high`, `lazy=false`).
- Reason: protect above-the-fold monetization opportunity.

2. Lazy loading
- Body/footer/sidebar slots use `IntersectionObserver` lazy loading.
- Default margin: `VITE_AD_LAZY_MARGIN=300px`.
- Reason: reduce wasted requests and improve performance.

3. Responsive ad format
- Top/body/footer use `data-ad-format=auto` and `data-full-width-responsive=true`.
- Controlled by `VITE_AD_ENABLE_RESPONSIVE=true`.

4. Auto ads in parallel
- Page-level Auto ads initialization is enabled when `VITE_AD_ENABLE_AUTO_ADS=true`.
- Manual slots and Auto ads can run together.

5. Per-slot channel tracking
- Supported envs:
  - `VITE_AD_CHANNEL_TOP`
  - `VITE_AD_CHANNEL_BODY`
  - `VITE_AD_CHANNEL_FOOTER`
  - `VITE_AD_CHANNEL_SIDEBAR_LEFT`
  - `VITE_AD_CHANNEL_SIDEBAR_RIGHT`
- Reason: compare RPM/viewability by placement.

6. GA event hooks for ad flow
- When GA is enabled, ad events are emitted:
  - `ad_slot_viewport_entry`
  - `ad_slot_request`
- Purpose: combine traffic funnel + ad telemetry.

7. Local ad test mode
- `VITE_AD_TEST_MODE=on` injects `data-adtest=on`.
- Purpose: prevent test traffic from polluting production ad data.

## 3) Environment Model

Required:
- `VITE_ADSENSE_ID`
- `VITE_AD_SLOT_TOP`
- `VITE_AD_SLOT_BODY`
- `VITE_AD_SLOT_FOOTER`
- `VITE_AD_SLOT_SIDEBAR_LEFT`
- `VITE_AD_SLOT_SIDEBAR_RIGHT`

Recommended:
- `VITE_AD_ENABLE_AUTO_ADS=true`
- `VITE_AD_ENABLE_RESPONSIVE=true`
- `VITE_AD_LAZY_MARGIN=300px`
- all `VITE_AD_CHANNEL_*` values set

Test only:
- `VITE_AD_TEST_MODE=on` (do not keep enabled in production)

## 4) Placement Strategy

1. Top slot
- Goal: first-screen revenue capture.
- Config: eager load + responsive.
- Watch: viewable impressions, CTR, RPM.

2. Body slot
- Goal: monetize high-intent calculator usage.
- Config: lazy + responsive.
- Watch: scroll reach vs request rate, CTR.

3. Footer slot
- Goal: monetize long sessions.
- Config: lazy + responsive.
- Watch: bottom-reach sessions and RPM.

4. Left/Right sidebars (desktop XL)
- Goal: high desktop viewability.
- Config: lazy + fixed `160x600`.
- Watch: desktop-only RPM and impressions per session.

## 5) 4-Week Experiment Plan

### Week 1: Baseline
- Auto ads ON, responsive ON, lazy margin 300px.
- Capture baseline for CTR, RPM, page RPM, revenue/session.

### Week 2: Lazy margin test
- Variant A: `300px`
- Variant B: `600px`
- Decision:
  - Keep B only if revenue gain is meaningful and web vitals remain stable.

### Week 3: Body density test
- Variant A: current single body slot.
- Variant B: add one extra body slot below results.
- Run only with policy and UX review.

### Week 4: Auto ads impact
- Variant A: Auto ads ON
- Variant B: Auto ads OFF
- Decision: combine RPM, engagement, and bounce impact.

## 6) KPI and Acceptance Thresholds

Primary KPIs:
- Page RPM
- Impression RPM
- Viewability
- CTR
- Revenue per 1,000 sessions

Secondary KPIs:
- LCP, CLS, INP
- Bounce rate
- Avg engagement time

Recommended adoption threshold:
- Revenue KPI: +5% or higher
- Performance guardrails:
  - LCP regression <= 100ms
  - CLS regression <= 0.02

## 7) Policy Guardrails

Do not:
- implement forced periodic ad refresh.
- use click-bait labels around ad units.
- block core content with intrusive overlays.

Do:
- keep privacy/cookie notice current.
- separate test vs production ad traffic.
- keep robots/sitemap domain values correct.

## 8) Deployment Runbook

1. Set env vars in Lovable.
2. Publish production build.
3. Observe first 24-72h learning window.
4. Review per-channel performance.
5. Run weekly experiments and retain winners.

## 9) Official References (checked on 2026-03-01)

- Auto ads overview: https://support.google.com/adsense/answer/9261307
- Manual ad units (responsive setup): https://support.google.com/adsense/answer/9183363
- AdSense optimization guide: https://support.google.com/adsense/answer/6023058
- AdSense experiments: https://support.google.com/adsense/answer/160525
- Mobile side-rail update: https://support.google.com/adsense/answer/16531918
