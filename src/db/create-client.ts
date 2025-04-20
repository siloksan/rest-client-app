import { createBrowserClient } from '@supabase/ssr';
import { keySupabase, urlSupabase } from './supabase.credentials';

export function createBrowserSupabase() {
  return createBrowserClient(urlSupabase, keySupabase);
}
