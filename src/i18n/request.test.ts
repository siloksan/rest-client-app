import { vi, describe, it, expect, Mock } from 'vitest';
import { hasLocale } from 'next-intl';
import { routing } from './routing';
import getRequestConfig from './request';

vi.mock('next-intl/server', () => ({
  getRequestConfig: vi.fn((fn) => fn),
}));

vi.mock('next-intl', () => ({
  hasLocale: vi.fn(),
}));

vi.mock('./routing', () => ({
  routing: {
    locales: ['en', 'ru'],
    defaultLocale: 'en',
  },
}));

vi.mock('./dictionary/en.json', () => ({ default: { greeting: 'Hello' } }));
vi.mock('./dictionary/es.json', () => ({ default: { greeting: 'Привет' } }));

describe('requestConfig', () => {
  it('should return the requested locale and messages if the locale is supported', async () => {
    const localeValue = 'en';

    const requestLocale = Promise.resolve(localeValue);
    (hasLocale as unknown as Mock).mockReturnValue(true);

    const config = await getRequestConfig({ requestLocale });

    expect(hasLocale).toHaveBeenCalledWith(routing.locales, localeValue);
    expect(config.locale).toBe(localeValue);
    expect(config.messages).toEqual({ greeting: 'Hello' });
  });

  it('should return the default locale and messages if the locale is not supported', async () => {
    const localeValue = 'invalid-locale';
    const requestLocale = Promise.resolve(localeValue);
    (hasLocale as unknown as Mock).mockReturnValue(false);

    const config = await getRequestConfig({ requestLocale });

    expect(hasLocale).toHaveBeenCalledWith(routing.locales, localeValue);
    expect(config.locale).toBe('en');
    expect(config.messages).toEqual({ greeting: 'Hello' });
  });
});
