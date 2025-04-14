import { render, screen } from '@testing-library/react';
import { Mock } from 'vitest';
import { Login } from './login';
import { createBrowserSupabase } from '@/db/create-client';
import messages from '../../i18n/dictionary/en.json';
import { NextIntlClientProvider } from 'next-intl';

vi.mock('@/db/create-client', () => ({
  createBrowserSupabase: vi.fn(),
}));

vi.mock('@/i18n/navigation', () => ({
  redirect: vi.fn(),
}));

vi.mock(import('next-intl'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useLocale: vi.fn(() => 'en'),
  };
});

describe('Login Component', () => {
  const localeMock = 'en';
  const mockSupabase = {
    auth: {
      signInWithPassword: vi.fn(),
    },
  };

  beforeEach(() => {
    (createBrowserSupabase as Mock).mockReturnValue(mockSupabase);
  });

  it('should render the login form', () => {
    render(
      <NextIntlClientProvider locale={localeMock} messages={messages}>
        <Login />
      </NextIntlClientProvider>
    );

    expect(
      screen.getByRole('heading', { level: 4, name: 'Log in' })
    ).toBeInTheDocument();
  });
});
