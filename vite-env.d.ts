/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA_ID: string
  readonly VITE_APP_ENV: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
