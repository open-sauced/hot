/// <reference types="vite/client" />
type ImportMetaEnv = {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_API_KEY: string;
  readonly VITE_POSTHOG_ID: string;
};

type ImportMeta = {
  readonly env: ImportMetaEnv;
};
