import { createClient } from "@supabase/supabase-js";

/**
 * Service-role Supabase client. Bypasses Row-Level Security.
 *
 * SERVER-ONLY — never import this into a Client Component or expose the
 * service-role key to the browser. Use only inside Server Actions / Route
 * Handlers for privileged admin operations (e.g. listing auth users,
 * deleting a user) after you have already verified the caller is an admin.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}
