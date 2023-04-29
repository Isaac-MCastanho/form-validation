import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPA_BASE_URL,
  import.meta.env.VITE_SUPA_BASE_KEY
);
