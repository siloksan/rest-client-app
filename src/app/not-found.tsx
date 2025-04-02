import { NextIntlClientProvider } from 'next-intl';
import Custom404 from './[locale]/[...wrong-path]/not-found';

export default function NotFoundPage() {
  return (
    <NextIntlClientProvider>
      <Custom404 />
    </NextIntlClientProvider>
  );
}
