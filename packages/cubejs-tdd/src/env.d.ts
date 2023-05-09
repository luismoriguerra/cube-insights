/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CUBE_API: string;
  readonly VITE_CUBE_TOKEN: string;
  readonly VITE_CUBE_PLAYGROUND_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
