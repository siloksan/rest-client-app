import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './use-local-storage';
import { LOCAL_KEYS } from '@/constants';

describe('useLocalStorage', () => {
  const defaultValue = 'testValue';

  it('should initialize with the default value if no value is in localStorage', () => {
    const { result } = renderHook(() =>
      useLocalStorage(LOCAL_KEYS.VARIABLES, defaultValue)
    );

    expect(result.current.storedValue).toBe(defaultValue);
    expect(result.current.initialized).toBe(true);
  });

  it('should initialize with the value from localStorage if it exists', () => {
    const storedValue = 'storedValue';
    localStorage.setItem(LOCAL_KEYS.VARIABLES, JSON.stringify(storedValue));

    const { result } = renderHook(() =>
      useLocalStorage(LOCAL_KEYS.VARIABLES, defaultValue)
    );

    expect(result.current.storedValue).toBe(storedValue);
    expect(result.current.initialized).toBe(true);
  });

  it('should update localStorage and state when setStoredValue is called', () => {
    const { result } = renderHook(() =>
      useLocalStorage(LOCAL_KEYS.VARIABLES, defaultValue)
    );

    const newValue = 'newValue';
    act(() => {
      result.current.setStoredValue(newValue);
    });

    expect(result.current.storedValue).toBe(newValue);
    expect(localStorage.getItem(LOCAL_KEYS.VARIABLES)).toBe(
      JSON.stringify(newValue)
    );
  });
});
