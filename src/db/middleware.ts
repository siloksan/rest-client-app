import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { keySupabase, urlSupabase } from './supabase.credentials';
import { ROUTES } from '@/constants';

const protectedRoutes = [ROUTES.REST_CLIENT];

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(urlSupabase, keySupabase, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  const isAuthenticated = !error && user;

  // const isProtectedRoute = protectedRoutes.some((route) =>
  //   request.nextUrl.pathname.startsWith(route)
  // );

  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.includes(route)
  );
  console.log('isProtectedRoute: ', isProtectedRoute);
  console.log('request.nextUrl.pathname: ', request.nextUrl.pathname);
  console.log('isAuthenticated: ', isAuthenticated);

  if (!isAuthenticated && isProtectedRoute) {
    const url = request.nextUrl.clone();

    console.log('url: ', url);
    url.pathname = ROUTES.SIGNIN;

    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
