import { describe, it, expect, vi, Mock } from 'vitest';
import { createServerSupabase } from './create-server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

vi.mock('@supabase/ssr', () => ({
  createServerClient: vi.fn(),
}));

vi.mock('next/headers', () => ({
  cookies: vi.fn(),
}));

vi.mock('./supabase.credentials', () => ({
  keySupabase: 'test-key',
  urlSupabase: 'test-url',
}));

describe('createServerSupabase', () => {
  it('should create a server client with the correct configuration', async () => {
    const mockName = 'Test Name';
    const mockValue = 'Test Value';
    const newValue = 'newValue';
    const mockCookieStore = {
      getAll: vi.fn().mockReturnValue([{ name: mockName, value: mockValue }]),
      set: vi.fn(),
    };

    const mockCookies = vi.fn().mockResolvedValue(mockCookieStore);
    (cookies as unknown as Mock).mockImplementation(mockCookies);

    const mockCreateServerClient = vi.fn();
    (createServerClient as unknown as Mock).mockImplementation(
      mockCreateServerClient
    );

    await createServerSupabase();

    expect(mockCookies).toHaveBeenCalled();
    expect(mockCreateServerClient).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      {
        cookies: {
          getAll: expect.any(Function),
          setAll: expect.any(Function),
        },
      }
    );

    const { cookies: cookieHandlers } = mockCreateServerClient.mock.calls[0][2];
    expect(cookieHandlers.getAll()).toEqual([
      { name: mockName, value: mockValue },
    ]);

    const cookiesToSet = [{ name: mockName, value: newValue, options: {} }];
    cookieHandlers.setAll(cookiesToSet);

    expect(mockCookieStore.set).toHaveBeenCalledWith(mockName, newValue, {});
  });
});
