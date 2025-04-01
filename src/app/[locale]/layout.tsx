import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './_theme';
import './globals.css';
import { Header } from '@/components/header/header';
import { SnackbarContainer } from '@/components/snackbar/snackbar';
import { createServerSupabase } from '@/db/create-server';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getMessages, setRequestLocale } from 'next-intl/server';

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const supabase = await createServerSupabase();

  const { data } = await supabase.auth.getUser();
  const userName = data?.user?.user_metadata.username;

  // Enable static rendering
  setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages}>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <Header initialUserName={userName} />
          {children}
          <SnackbarContainer />
        </ThemeProvider>
      </AppRouterCacheProvider>
    </NextIntlClientProvider>
  );
}
