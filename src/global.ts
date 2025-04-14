import messages from './i18n/dictionary/en.json';

declare module 'next-intl' {
  interface AppConfig {
    Messages: typeof messages;
  }
}
