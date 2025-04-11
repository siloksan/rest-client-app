'user client';

import { locales } from '@/constants';
import { redirect } from '@/i18n/navigation';

export default function Page() {
  return redirect({ href: '/', locale: locales[0] });
}
