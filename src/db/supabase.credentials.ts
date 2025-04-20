export const urlSupabase = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
export const keySupabase = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

if (!urlSupabase || !keySupabase) {
  throw new Error(
    'Missing Supabase credentials, rename ._env.local to .env.local!'
  );
}
