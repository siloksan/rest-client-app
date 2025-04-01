import { withAuth } from './db/middleware';
import { withI18nMiddleware } from './i18n/middleware';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export type ChainableMiddleware = (
  request: NextRequest,
  event: NextFetchEvent
) => Promise<NextResponse>;

export type MiddlewareFactory = (
  middleware: ChainableMiddleware
) => ChainableMiddleware;

export function combineMiddlewares(
  functions: MiddlewareFactory[] = [],
  index = 0
): ChainableMiddleware {
  const current = functions[index];
  if (current) {
    const next = combineMiddlewares(functions, index + 1);
    return current(next);
  }

  return async (request: NextRequest) => NextResponse.next({ request });
}

export default combineMiddlewares([withAuth, withI18nMiddleware]);

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)'],
};
