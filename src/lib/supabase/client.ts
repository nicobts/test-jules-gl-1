import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  // The commented-out cookie functions are not strictly needed for basic
  // client-side usage with createBrowserClient if you are not implementing
  // advanced auth flows that require manual cookie manipulation outside of
  // what @supabase/ssr handles by default with server components/actions.
  // For many client-component use cases, simply calling createBrowserClient
  // is sufficient as it manages auth state internally and uses browser storage.

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL");
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
