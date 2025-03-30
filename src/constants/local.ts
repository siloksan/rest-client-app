export const LOCALE_KEYS = { VARIABLES: 'VARIABLES' } as const;

export type LocaleKey = (typeof LOCALE_KEYS)[keyof typeof LOCALE_KEYS];
