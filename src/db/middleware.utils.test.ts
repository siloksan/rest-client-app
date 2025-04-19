import {
  createServerClientMiddleware,
  setAllCookies,
} from './middleware.utils';
import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

vi.mock('./supabase.credentials', () => ({
  keySupabase: 'test-key',
  urlSupabase: 'test-url',
}));

vi.mock('@supabase/ssr', () => ({
  createServerClient: vi.fn(),
}));

describe('setAllCookies', () => {
  const mockRequest = {
    cookies: {
      set: vi.fn(),
    },
  } as unknown as NextRequest;
  const mockResponse = {
    cookies: {
      set: vi.fn(),
    },
  } as unknown as NextResponse;
  it('should set cookies on the request and response objects', () => {
    const cookiesToSet = [
      { name: 'cookie1', value: 'value1' },
      { name: 'cookie2', value: 'value2', options: { httpOnly: true } },
    ];

    setAllCookies(mockRequest, cookiesToSet, mockResponse);

    expect(mockRequest.cookies.set).toHaveBeenCalledWith('cookie1', 'value1');
    expect(mockRequest.cookies.set).toHaveBeenCalledWith('cookie2', 'value2');
  });
});

describe('createServerClientMiddleware', () => {
  const mockRequest = {
    cookies: {
      getAll: vi.fn().mockReturnValue([{ name: 'cookie1', value: 'value1' }]),
    },
  } as unknown as NextRequest;

  const mockResponse = {
    cookies: {
      set: vi.fn(),
    },
  } as unknown as NextResponse;

  it('should call createServerClient with correct parameters', () => {
    createServerClientMiddleware(mockRequest, mockResponse);

    expect(createServerClient).toHaveBeenCalledWith('test-url', 'test-key', {
      cookies: {
        getAll: expect.any(Function),
        setAll: expect.any(Function),
      },
    });
  });
});
