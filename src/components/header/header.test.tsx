import { render, screen } from '@testing-library/react';
import { Header } from './header';
import { Mock } from 'vitest';
import messages from '../../i18n/dictionary/en.json';
import { useScrollState } from '@/hooks';
import { createBrowserSupabase } from '@/db/create-client';
import { ROUTES } from '@/constants';
import { NextIntlClientProvider } from 'next-intl';
import userEvent from '@testing-library/user-event';
import { redirect } from '@/i18n/navigation';

vi.mock('../language-switcher/language-switcher', () => ({
  LanguageSwitcher: () => <div>LanguageSwitcher</div>,
}));

vi.mock('@/hooks', () => ({
  useScrollState: vi.fn(),
}));

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

describe('Header', () => {
  const localeMock = 'en';
  const mockSupabase = {
    auth: {
      signOut: vi.fn(),
      getUser: vi.fn(),
      onAuthStateChange: vi.fn(() => ({
        data: { subscription: { unsubscribe: vi.fn() } },
      })),
    },
  };

  beforeEach(() => {
    (useScrollState as Mock).mockReturnValue({ scrolled: false });
    (createBrowserSupabase as Mock).mockReturnValue(mockSupabase);
  });

  it('should render the header without error', () => {
    render(
      <NextIntlClientProvider locale={localeMock} messages={messages}>
        <Header initialUserName={null} />
      </NextIntlClientProvider>
    );

    expect(screen.getByLabelText('sign in')).toBeInTheDocument();
    expect(screen.getByLabelText('sign up')).toBeInTheDocument();
  });

  it('should render sign out button when user is logged in', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Header initialUserName="test" />
      </NextIntlClientProvider>
    );

    expect(screen.getByLabelText('sign out')).toBeInTheDocument();
  });

  it('should call signOutAction when sign out button is clicked', async () => {
    mockSupabase.auth.signOut.mockResolvedValue({ error: null });
    render(
      <NextIntlClientProvider locale={localeMock} messages={messages}>
        <Header initialUserName="test" />
      </NextIntlClientProvider>
    );

    const signOutButton = screen.getByLabelText('sign out');
    await userEvent.click(signOutButton);

    expect(mockSupabase.auth.signOut).toHaveBeenCalled();
    expect(redirect).toHaveBeenCalledWith({
      href: ROUTES.MAIN,
      locale: localeMock,
    });
  });

  it('should redirect on error page when error occurs', async () => {
    mockSupabase.auth.signOut.mockResolvedValue({
      error: { message: 'Error' },
    });

    render(
      <NextIntlClientProvider locale={localeMock} messages={messages}>
        <Header initialUserName="test" />
      </NextIntlClientProvider>
    );

    const signOutButton = screen.getByLabelText('sign out');
    await userEvent.click(signOutButton);

    expect(mockSupabase.auth.signOut).toHaveBeenCalled();
    expect(redirect).toHaveBeenCalledWith({
      href: ROUTES.ERROR,
      locale: localeMock,
    });
  });

  it('should update username on auth state change', () => {
    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: { user_metadata: { username: 'newuser' } } },
    });

    render(
      <NextIntlClientProvider locale={localeMock} messages={messages}>
        <Header initialUserName={null} />
      </NextIntlClientProvider>
    );

    expect(mockSupabase.auth.onAuthStateChange).toHaveBeenCalled();
  });
});
