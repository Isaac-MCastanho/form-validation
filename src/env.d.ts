/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPA_BASE_KEY: string;
  readonly VITE_SUPA_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
