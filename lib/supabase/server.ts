import "./ws-polyfill";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Server-side Supabase client (Server Components, Route Handlers, Server Actions).
 * Reads/writes the auth session cookie. The cookie `set` calls are wrapped in
 * try/catch because Server Components cannot write cookies — the middleware
 * (lib/supabase/middleware.ts) is what actually refreshes the session.
 */
export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
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
              cookieStore.set(name, value, options),
            );
          } catch {
            // Called from a Server Component — ignore; middleware handles refresh.
          }
        },
      },
    },
  );
}
