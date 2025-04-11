export const LOCAL_KEYS = {
  VARIABLES: 'VARIABLES',
  HISTORY: 'HISTORY',
} as const;

export type LocalKeys = (typeof LOCAL_KEYS)[keyof typeof LOCAL_KEYS];
