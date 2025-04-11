import { useEffect } from 'react';

export default function useDebounce(callback: () => void, delay: number) {
  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [callback, delay]);
}
