import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: 'src/i18n/dictionary/en.json',
  },
});

const config: NextConfig = {};

export default withNextIntl(config);
