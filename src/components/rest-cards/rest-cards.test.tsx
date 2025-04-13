import { render, screen } from '@testing-library/react';
import { RestCards } from './rest-cards';
import { NextIntlClientProvider } from 'next-intl';
import { ROUTES } from '@/constants';
import messages from '@/i18n/dictionary/en.json';

vi.mock(import('next-intl'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useLocale: vi.fn(() => 'en'),
  };
});

describe('RestCards', () => {
  it('renders all RestCard components with correct props', () => {
    const mockLocale = 'en';
    render(
      <NextIntlClientProvider locale={mockLocale} messages={messages}>
        <RestCards />
      </NextIntlClientProvider>
    );

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
    expect(links[0]).toHaveAttribute(
      'href',
      `/${mockLocale}${ROUTES.REST_CLIENT}`
    );
    expect(links[1]).toHaveAttribute('href', `/${mockLocale}${ROUTES.HISTORY}`);
    expect(links[2]).toHaveAttribute(
      'href',
      `/${mockLocale}${ROUTES.VARIABLE}`
    );
  });
});
