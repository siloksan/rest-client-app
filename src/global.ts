import messages from './i18n/dictionary/en.json';

declare module 'next-intl' {
  interface AppConfig {
    Messages: typeof messages;
  }
}

// Removed augmentation of 'postman-code-generators' from this file.
