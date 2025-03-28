// import type { NextConfig } from 'next';
// import createNextIntlPlugin from 'next-intl/plugin';

// const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// const withNextIntl = createNextIntlPlugin();
// export default withNextIntl(nextConfig);

import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: './messages/en.json',
  },
});

const config: NextConfig = {};

export default withNextIntl(config);
