import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "./types";

function isConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  return url.startsWith("http");
}

// Supabase未設定時に全クエリが空データを返すスタブ
// Promise.resolve を継承してどこで await しても動く
class StubQuery {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  then(onfulfilled?: ((v: any) => any) | null) {
    return Promise.resolve({ data: null, error: null }).then(onfulfilled);
  }
  from()   { return this; }
  select() { return this; }
  insert() { return this; }
  update() { return this; }
  delete() { return this; }
  eq()     { return this; }
  neq()    { return this; }
  ilike()  { return this; }
  contains() { return this; }
  order()  { return this; }
  limit()  { return this; }
  single() { return Promise.resolve({ data: null, error: null }); }
}

const stubQuery = new StubQuery();
const stubClient = { from: () => stubQuery };

export async function createClient() {
  if (!isConfigured()) return stubClient;

  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {}
        },
      },
    }
  );
}
