import { ROUTES } from '@/constants';
import { createServerSupabase } from '@/db/create-server';
import { redirect } from 'next/navigation';
import { JSX } from 'react';

export function CheckAuth<
  T extends Readonly<{
    params: Promise<{ locale: string }>;
  }>,
>(
  protectedPage: () => Promise<JSX.Element>,
  redirectRoute: string = ROUTES.SIGNIN
) {
  return async ({ params }: T) => {
    const { locale } = await params;
    const supabase = await createServerSupabase();
    const { data } = await supabase.auth.getUser();

    if (!data?.user) {
      return redirect(`/${locale}${redirectRoute}`);
    }

    return protectedPage();
  };
}

export function CheckUserLoggedIn<
  T extends Readonly<{ params: Promise<{ locale: string }> }>,
>(
  protectedPage: () => Promise<JSX.Element>,
  redirectRoute: string = ROUTES.MAIN
) {
  return async ({ params }: T) => {
    const { locale } = await params;
    const supabase = await createServerSupabase();
    const { data } = await supabase.auth.getUser();

    if (data?.user) {
      return redirect(`/${locale}${redirectRoute}`);
    }

    return protectedPage();
  };
}
