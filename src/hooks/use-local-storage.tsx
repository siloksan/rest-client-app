'use client';

import { LocalKeys } from '@/constants/local-keys';
import { useCallback, useEffect, useState } from 'react';

export function useLocalStorage<T>(key: LocalKeys, defaultValue: T) {
  const [value, setValue] = useState(defaultValue);
  const [initialized, setInitialized] = useState(false);

  const setStoredValue = useCallback(
    (value: T) => {
      setValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    },
    [key]
  );

  useEffect(() => {
    const storedValue = localStorage.getItem(key);

    if (storedValue) {
      setValue(JSON.parse(storedValue));
    }

    setInitialized(true);
  }, [key]);

  return { storedValue: value, setStoredValue, initialized };
}
