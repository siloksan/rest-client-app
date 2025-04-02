import createMiddleware from 'next-intl/middleware';
import { routing } from './routing';
import { NextFetchEvent, NextRequest } from 'next/server';
import { MiddlewareFactory } from '@/middleware';

const i18nMiddleware = createMiddleware(routing);

export const withI18nMiddleware: MiddlewareFactory = (nextMiddleware) => {
  return async (request: NextRequest, event: NextFetchEvent) => {
    await nextMiddleware(request, event);
    return i18nMiddleware(request);
  };
};
