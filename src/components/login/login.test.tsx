import { render, screen, waitFor } from '@testing-library/react';
import { Mock } from 'vitest';
import { Login } from './login';
import { createBrowserSupabase } from '@/db/create-client';
import messages from '../../i18n/dictionary/en.json';
import { NextIntlClientProvider } from 'next-intl';
import { redirect } from '@/i18n/navigation';
import userEvent from '@testing-library/user-event';
import { ROUTES } from '@/constants';

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
      signInWithPassword: vi.fn().mockResolvedValue({ error: null, data: '' }),
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

  it('should call signInWithPassword with valid data', async () => {
    const mockUser = {
      email: 'test@example.com',
      password: 'TestPassword123!',
    };

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Login />
      </NextIntlClientProvider>
    );
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByTestId('password');
    const button = screen.getByRole('button', { name: /sign in/i });

    await userEvent.type(emailInput, mockUser.email);
    await userEvent.type(passwordInput, mockUser.password);
    await waitFor(() => {
      expect(button).toBeEnabled();
    });
    await userEvent.click(button);

    expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: mockUser.email,
      password: mockUser.password,
    });
    expect(redirect).toHaveBeenCalledWith({ href: ROUTES.MAIN, locale: 'en' });
  });
});
