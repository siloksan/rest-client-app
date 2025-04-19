import { createServerClient } from '@supabase/ssr';
import { CookieOptions } from '@supabase/ssr/dist/main/types';
import { NextRequest, NextResponse } from 'next/server';
import { keySupabase, urlSupabase } from './supabase.credentials';

type CookiesToSet = {
  name: string;
  value: string;
  options?: CookieOptions;
}[];
export function createServerClientMiddleware(
  request: NextRequest,
  supabaseResponse: NextResponse<unknown>
) {
  return createServerClient(urlSupabase, keySupabase, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        setAllCookies(request, cookiesToSet, supabaseResponse);
      },
    },
  });
}

export function setAllCookies(
  request: NextRequest,
  cookiesToSet: CookiesToSet,
  supabaseResponse: NextResponse<unknown>
) {
  cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
  supabaseResponse = NextResponse.next({
    request,
  });
  cookiesToSet.forEach(({ name, value, options }) =>
    supabaseResponse.cookies.set(name, value, options)
  );
}
