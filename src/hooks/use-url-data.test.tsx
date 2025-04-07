import { renderHook } from '@testing-library/react';
import useUrlData from './use-url-data';
import * as nextNavigation from 'next/navigation';
import { Mock } from 'vitest';

vi.mock('next/navigation', () => ({
  useParams: vi.fn(),
  useSearchParams: vi.fn(),
}));

describe('useUrlData', () => {
  const url = 'aHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3Bvc3Rz';
  const body = 'eyJ0aXRsZSI6ImZha2VUaXRsZSIsInVzZXJJZCI6MSwiYm9keSI6ImZha2VNZXNzYWdlIn0=';
  const searchParams = new Map([
    ['Content-Type', 'application%2Fjson'],
  ]);

  it('should decode url, body and map headers correctly', () => {
    (nextNavigation.useParams as Mock).mockReturnValue({
      slug: ['POST', url, body],
    });

    (nextNavigation.useSearchParams as Mock).mockReturnValue({
      entries: () => searchParams.entries(),
    });

    const { result } = renderHook(() => useUrlData());

    expect(result.current.method).toBe('POST');
    expect(result.current.url).toBe('https://jsonplaceholder.typicode.com/posts');
    expect(result.current.body).toBe('{"title":"fakeTitle","userId":1,"body":"fakeMessage"}');
    expect(result.current.headers).toEqual([
      {
        id: 0,
        isActive: true,
        fieldKey: 'Content-Type',
        value: 'application/json',
      },
    ]);
  });

  it('invalid and empty values from the url', () => {
    (nextNavigation.useParams as Mock).mockReturnValue({
      slug: ['GET', '', ''],
    });

    (nextNavigation.useSearchParams as Mock).mockReturnValue({
      entries: () => [].entries(),
    });

    const { result } = renderHook(() => useUrlData());

    expect(result.current.headers).toEqual([
      {
        id: 0,
        isActive: false,
        fieldKey: '',
        value: '',
      },
    ]);
  })
});
