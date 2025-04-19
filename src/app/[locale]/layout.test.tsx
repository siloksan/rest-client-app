import { render, screen } from '@testing-library/react';
import RootLayout from './layout';
import { notFound } from 'next/navigation';

vi.mock('@/db/create-server', () => ({
  createServerSupabase: vi.fn().mockResolvedValue({
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: { user: { id: '123', name: 'Test User' } },
      }),
    },
  }),
}));

vi.mock(import('next-intl'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
  };
});

vi.mock('next-intl/server', () => ({
  getMessages: vi.fn().mockResolvedValue({ greeting: 'Test message' }),
  setRequestLocale: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
}));

vi.mock('@/i18n/routing', () => ({
  routing: { locales: ['en', 'fr'] },
}));

vi.mock('@/components/header/header', () => ({
  Header: ({ initialUser }: { initialUser: { id: string; name: string } }) => (
    <div data-testid="header">{initialUser?.name}</div>
  ),
}));

vi.mock('@/components/footer/footer', () => ({
  Footer: () => <div data-testid="footer">Footer</div>,
}));

vi.mock('@/components/snackbar/snackbar', () => ({
  SnackbarContainer: () => <div data-testid="snackbar">Snackbar</div>,
}));

describe('RootLayout', () => {
  const children = <div data-testid="child" />;

  it('should render layout with children and user data', async () => {
    const element = await RootLayout({
      params: Promise.resolve({ locale: 'en' }),
      children,
    });

    render(element);

    expect(await screen.findByTestId('header')).toHaveTextContent('Test User');
  });

  it('calls notFound if locale is invalid', async () => {
    const element = await RootLayout({
      params: Promise.resolve({ locale: 'invalid-locale' }),
      children,
    });

    render(element);

    expect(vi.mocked(notFound)).toHaveBeenCalled();
  });
});
