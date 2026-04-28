/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA_ID: string
  readonly VITE_ADSTERRA_728_KEY: string
  readonly VITE_ADSTERRA_300_KEY: string
  readonly VITE_ADSTERRA_160_KEY: string
  readonly VITE_ADSTERRA_320_KEY: string
  readonly VITE_ADSTERRA_LAZY_MARGIN: string
  readonly VITE_APP_ENV: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
