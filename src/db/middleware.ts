import { createServerClient } from '@supabase/ssr';
import { NextFetchEvent, NextResponse, type NextRequest } from 'next/server';
import { keySupabase, urlSupabase } from './supabase.credentials';
import { locales, ROUTES } from '@/constants';
import { MiddlewareFactory } from '@/middleware';

const protectedRoutes = [ROUTES.REST_CLIENT, ROUTES.HISTORY, ROUTES.VARIABLE];

export const withAuth: MiddlewareFactory = (nextMiddleware) => {
  return async (request: NextRequest, event: NextFetchEvent) => {
    let supabaseResponse = await nextMiddleware(request, event);

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

    const firstPathFragment = request.nextUrl.pathname.split('/')[1];
    const currentLocale = locales.includes(firstPathFragment)
      ? firstPathFragment
      : '';
    const isProtectedRoute = protectedRoutes.some((route) => {
      return new RegExp(`^(/(${locales.join('|')}))?(${route})(/.*)?$`).test(
        request.nextUrl.pathname
      );
    });

    if (!isAuthenticated && isProtectedRoute) {
      const url = request.nextUrl.clone();
      url.pathname = currentLocale
        ? `/${currentLocale + ROUTES.SIGNIN}`
        : ROUTES.SIGNIN;

      return NextResponse.redirect(url);
    }

    return supabaseResponse;
  };
};
