import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

// generateStaticParams など、cookies() が使えないビルド時専用クライアント
export function createStaticClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
