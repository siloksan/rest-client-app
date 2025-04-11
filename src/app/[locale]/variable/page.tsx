'use client'

import { redirect } from '@/i18n/navigation';
import { userAuthStore } from '@/store/userAuth/userAuth-store';
import { useLocale } from 'next-intl';
import dynamic from 'next/dynamic';

const VariablePage = dynamic(() => import('../../../components/pages/variable-page'),   {
  loading: () => <p>Loading...</p>,
});

export default function Page() {
  const locale = useLocale();
  const username = userAuthStore(state => state.userName);

  return username ? <VariablePage /> : redirect({
    href: '/',
    locale
  })
}
