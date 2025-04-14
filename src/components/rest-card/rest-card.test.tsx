import { render, screen } from '@testing-library/react';
import { RestCard } from './rest-card';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/i18n/dictionary/en.json';

vi.mock(import('next-intl'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useLocale: vi.fn(() => 'en'),
  };
});

describe('RestCard Component', () => {
  it('renders the title and description', () => {
    const title = 'Test Title';
    const description = 'Test Description';
    const href = '/test-link';

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <RestCard title={title} description={description} href={href} />
      </NextIntlClientProvider>
    );

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
  });
});
