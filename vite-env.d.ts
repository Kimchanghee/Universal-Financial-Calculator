/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA_ID: string
  readonly VITE_ADSENSE_ID: string
  readonly VITE_AD_SLOT_TOP: string
  readonly VITE_AD_SLOT_BODY: string
  readonly VITE_AD_SLOT_FOOTER: string
  readonly VITE_AD_SLOT_SIDEBAR_LEFT: string
  readonly VITE_AD_SLOT_SIDEBAR_RIGHT: string
  readonly VITE_AD_CHANNEL_TOP: string
  readonly VITE_AD_CHANNEL_BODY: string
  readonly VITE_AD_CHANNEL_FOOTER: string
  readonly VITE_AD_CHANNEL_SIDEBAR_LEFT: string
  readonly VITE_AD_CHANNEL_SIDEBAR_RIGHT: string
  readonly VITE_AD_ENABLE_AUTO_ADS: string
  readonly VITE_AD_ENABLE_RESPONSIVE: string
  readonly VITE_AD_LAZY_MARGIN: string
  readonly VITE_AD_TEST_MODE: string
  readonly VITE_APP_ENV: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
