import { renderHook, act } from '@testing-library/react';
import { useScrollState } from './use-scroll-state';

describe('useScrollState', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 0,
    });
  });

  it('should return false initially', () => {
    const { result } = renderHook(() => useScrollState(20));
    expect(result.current.scrolled).toBe(false);
  });

  it('should set scrolled to true when scrollY exceeds threshold', () => {
    const { result } = renderHook(() => useScrollState(20));

    act(() => {
      window.scrollY = 25;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.scrolled).toBe(true);
  });

  it('should set scrolled to false when scrollY goes below threshold - offset', () => {
    const { result } = renderHook(() => useScrollState(20));

    act(() => {
      window.scrollY = 25;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.scrolled).toBe(true);

    act(() => {
      window.scrollY = 5;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.scrolled).toBe(false);
  });
});
