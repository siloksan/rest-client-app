import { Mock } from 'vitest';
import { NextRequest, NextFetchEvent, NextResponse } from 'next/server';
import { withAuth } from './middleware';
import { ROUTES } from '@/constants';
import { createServerClient } from '@supabase/ssr';

vi.mock('@supabase/ssr', () => ({
  createServerClient: vi.fn(),
}));

vi.mock('./supabase.credentials', () => ({
  keySupabase: 'test-key',
  urlSupabase: 'test-url',
}));

describe('withAuth middleware', () => {
  const mockGetUser = vi.fn();
  const mockNextMiddleware = vi.fn();
  const pathName = `/en${ROUTES.REST_CLIENT}`;
  const base = 'http://localhost';
  const url = `${base}${pathName}`;
  const mockRequest = new NextRequest(url);
  const mockEvent = {} as NextFetchEvent;
  const mockSupabase = {
    auth: {
      getUser: mockGetUser,
    },
  };
  (createServerClient as Mock).mockReturnValue(mockSupabase);

  it('should redirect to sign-in if user is not authenticated and route is protected', async () => {
    mockGetUser.mockResolvedValueOnce({
      data: { user: null },
      error: null,
    });

    const middleware = withAuth(mockNextMiddleware);
    const response = await middleware(mockRequest, mockEvent);

    expect(response).toBeInstanceOf(NextResponse);
    expect(response.headers.get('location')).toContain(ROUTES.SIGNIN);
  });

  it('should redirect to / if authenticated and path is /signin without locale', async () => {
    mockGetUser.mockResolvedValueOnce({
      data: { user: { id: '123' } },
      error: null,
    });

    const request = new NextRequest(`http://localhost${ROUTES.SIGNIN}`);

    const middleware = withAuth(mockNextMiddleware);
    const response = await middleware(request, mockEvent);

    expect(response).toBeInstanceOf(NextResponse);
    expect(response.headers.get('location')).toBe(`${base}/`);
  });

  it('should redirect to home if user is authenticated and route is auth-related', async () => {
    mockGetUser.mockResolvedValueOnce({
      data: { user: { id: '123' } },
      error: null,
    });

    mockRequest.nextUrl.pathname = '/en/signin';

    const middleware = withAuth(mockNextMiddleware);
    const response = await middleware(mockRequest, mockEvent);

    expect(response).toBeInstanceOf(NextResponse);
    expect(response.headers.get('location')).toBe(`${base}/en`);
  });

  it('should call next middleware if route is not protected', async () => {
    mockGetUser.mockResolvedValueOnce({
      data: { user: null },
      error: null,
    });

    mockRequest.nextUrl.pathname = '/en/public-route';

    const middleware = withAuth(mockNextMiddleware);
    await middleware(mockRequest, mockEvent);

    expect(mockNextMiddleware).toHaveBeenCalled();
  });

  it('should call next middleware if user is authenticated and route is not auth-related', async () => {
    mockGetUser.mockResolvedValueOnce({
      data: { user: { id: '123' } },
      error: null,
    });

    mockRequest.nextUrl.pathname = '/en/rest-client';

    const middleware = withAuth(mockNextMiddleware);
    await middleware(mockRequest, mockEvent);

    expect(mockNextMiddleware).toHaveBeenCalled();
  });
});
