import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { keySupabase, urlSupabase } from './supabase.credentials';

export async function createServerSupabase() {
  const cookieStore = await cookies();

  return createServerClient(urlSupabase, keySupabase, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch (error) {
          throw new Error('Failed to set cookies', { cause: error });
        }
      },
    },
  });
}
