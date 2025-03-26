export const urlSupabase = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
export const keySupabase = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

if (!urlSupabase || !keySupabase) {
  console.error('Do not forget to rename ._env.local to .env.local!');
  throw new Error('Missing Supabase credentials');
}
