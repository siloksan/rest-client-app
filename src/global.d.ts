import en from './i18n/dictionary/en.json';

type Messages = typeof en;

declare global {
  type IntlMessages = Messages;
}
