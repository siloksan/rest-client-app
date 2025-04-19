import messages from '@/i18n/dictionary/en.json';
import { render, screen, waitFor } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { Registration } from './registration';
import { createBrowserSupabase } from '@/db/create-client';
import { Mock } from 'vitest';
import userEvent from '@testing-library/user-event';

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

describe('Registration', () => {
  const localeMock = 'en';

  const mockSupabase = {
    auth: {
      signUp: vi.fn().mockResolvedValue({ error: null, data: '' }),
    },
  };

  beforeEach(() => {
    (createBrowserSupabase as Mock).mockReturnValue(mockSupabase);
  });

  it('should render the registration form', () => {
    render(
      <NextIntlClientProvider locale={localeMock} messages={messages}>
        <Registration />
      </NextIntlClientProvider>
    );

    expect(
      screen.getByRole('heading', { level: 4, name: 'Registration' })
    ).toBeInTheDocument();
  });

  it('should call signUp with valid data', async () => {
    const mockUser = {
      email: 'test@example.com',
      password: 'TestPassword123!',
      username: 'Testuser',
    };

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Registration />
      </NextIntlClientProvider>
    );
    const emailInput = screen.getByLabelText(/email/i);
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByTestId('password');
    const button = screen.getByRole('button', { name: /sign up/i });

    await userEvent.type(emailInput, mockUser.email);
    await userEvent.type(usernameInput, mockUser.username);
    await userEvent.type(passwordInput, mockUser.password);
    await waitFor(() => {
      expect(button).toBeEnabled();
    });
    await userEvent.click(button);

    expect(mockSupabase.auth.signUp).toHaveBeenCalledWith({
      email: mockUser.email,
      password: mockUser.password,
      options: {
        data: {
          username: mockUser.username,
        },
      },
    });
  });
});
