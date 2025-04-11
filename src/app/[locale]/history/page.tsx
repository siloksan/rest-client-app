'use client'

import { redirect } from '@/i18n/navigation';
import { userAuthStore } from '@/store/userAuth/userAuth-store';
import { useLocale } from 'next-intl';
import dynamic from 'next/dynamic';

const HistoryPage = dynamic(() => import('../../../components/pages/history-page'),   {
  loading: () => <p>Loading...</p>,
});

export default function Page() {
  const locale = useLocale();
  const user = userAuthStore(state => state.userData);

  return user ? <HistoryPage /> : redirect({
    href: '/',
    locale
  })
}
