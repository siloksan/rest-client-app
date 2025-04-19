import { render, screen } from '@testing-library/react';
import { LanguageSwitcher } from './language-switcher';
import { useRouter } from '@/i18n/navigation';
import { NextIntlClientProvider, useLocale } from 'next-intl';
import messages from '@/i18n/dictionary/en.json';
import userEvent from '@testing-library/user-event';
import { Mock } from 'vitest';

vi.mock('@/i18n/navigation', () => ({
  usePathname: vi.fn(() => '/test-path'),
  useRouter: vi.fn(() => ({
    replace: vi.fn(),
  })),
}));

vi.mock(import('next-intl'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useLocale: vi.fn(() => 'en'),
  };
});

vi.mock('next/navigation', () => ({
  useParams: vi.fn(() => ({})),
  useSearchParams: vi.fn(() => new URLSearchParams()),
}));

vi.mock('@mui/material/Select', () => {
  return {
    default: ({
      children,
      onChange,
    }: {
      children: React.ReactNode;
      onChange: React.ChangeEventHandler<HTMLSelectElement>;
    }) => (
      <select data-testid="select" onChange={onChange}>
        {children}
      </select>
    ),
  };
});

vi.mock('@mui/material/MenuItem', () => {
  return {
    default: ({ value }: { value: string; key: string }) => (
      <option key={value}>{value}</option>
    ),
  };
});

describe('LanguageSwitcher', () => {
  const localeMock = 'en';
  it('renders the language switcher', () => {
    render(
      <NextIntlClientProvider locale={localeMock} messages={messages}>
        <LanguageSwitcher />
      </NextIntlClientProvider>
    );

    expect(screen.getByTestId('select')).toBeInTheDocument();
  });

  it('calls router.replace with the correct arguments when a new locale is selected', async () => {
    const mockReplace = vi.fn();
    (useRouter as Mock).mockReturnValue({ replace: mockReplace });
    const mockLocale = 'ru';
    (useLocale as Mock).mockReturnValue('en');

    render(
      <NextIntlClientProvider locale={localeMock} messages={messages}>
        <LanguageSwitcher />
      </NextIntlClientProvider>
    );

    const select = screen.getByTestId('select');
    await userEvent.selectOptions(select, mockLocale);

    expect(mockReplace).toHaveBeenCalledWith(
      { pathname: '/test-path', params: {}, query: {} },
      { locale: mockLocale }
    );
  });
});
