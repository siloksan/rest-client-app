import { Roboto } from 'next/font/google';
import './[locale]/globals.css';
import { getTranslations } from 'next-intl/server';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const translate = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: translate('title'),
    description: translate('description'),
  };
}

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body
        // className={`${inter.variable} ${jetBrainsMono.variable} ${roboto.variable}`}
        className={`${roboto.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
