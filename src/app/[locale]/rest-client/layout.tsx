'use client'

import { redirect } from '@/i18n/navigation';
import { userAuthStore } from '@/store/userAuth/userAuth-store';
import { useLocale } from 'next-intl';
import dynamic from 'next/dynamic';

const RestClient = dynamic(() => import('../../../components/pages/rest-client'),   {
  loading: () => <p>Loading...</p>,
});

export default function Layout() {
  const locale = useLocale();
  const user = userAuthStore(state => state.userData);

  return user ? <RestClient /> : redirect({
    href: '/',
    locale
  })
}
