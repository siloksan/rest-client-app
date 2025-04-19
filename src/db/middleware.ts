import { NextFetchEvent, NextResponse, type NextRequest } from 'next/server';
import { locales, ROUTES } from '@/constants';
import { MiddlewareFactory } from '@/middleware';
import { createServerClientMiddleware } from './middleware.utils';

const protectedRoutes = [ROUTES.REST_CLIENT, ROUTES.HISTORY, ROUTES.VARIABLE];

export const withAuth: MiddlewareFactory = (nextMiddleware) => {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const supabaseResponse = await nextMiddleware(request, event);

    const supabase = createServerClientMiddleware(request, supabaseResponse);

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

    const isAuthRoute = new RegExp(
      `^(/(${locales.join('|')}))?(${ROUTES.SIGNIN}|${ROUTES.SIGNUP})(/.*)?$`
    ).test(request.nextUrl.pathname);

    if (isAuthenticated && isAuthRoute) {
      const url = request.nextUrl.clone();
      url.pathname = currentLocale ? `/${currentLocale}` : '/';

      return NextResponse.redirect(url);
    }

    return supabaseResponse;
  };
};
