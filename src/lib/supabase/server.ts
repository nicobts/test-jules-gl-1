import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createClient() {
  const cookieStore = cookies();

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL");
  }
  // For server-side client, you might use ANON_KEY or SERVICE_ROLE_KEY
  // depending on the operations you intend to perform.
  // Service role key allows bypassing RLS.
  // Using ANON_KEY here would be for operations on behalf of the user,
  // relying on the users session being passed via cookies.
  // The subtask specified SERVICE_ROLE_KEY.
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    // If you intend to use this server client for user-specific, RLS-protected data access
    // primarily relying on the users JWT, you might fall back to ANON_KEY
    // or throw an error if SERVICE_ROLE_KEY is strictly for admin tasks.
    // However, createServerClient with SERVICE_ROLE_KEY is typical for admin-like tasks
    // or when interacting with auth/users table directly.
    // If you only have NEXT_PUBLIC_SUPABASE_ANON_KEY for server client, adjust accordingly.
    throw new Error("Missing env.SUPABASE_SERVICE_ROLE_KEY");
  }

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.delete({ name, ...options });
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}
