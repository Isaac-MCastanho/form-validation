import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://uhivxvhmjacbelnutpin.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoaXZ4dmhtamFjYmVsbnV0cGluIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MTMzOTY5NSwiZXhwIjoxOTk2OTE1Njk1fQ.ajxs42UZHIV3TnfkTXY9AiczG75AbDLacDTEgdLRy7Q"
);
