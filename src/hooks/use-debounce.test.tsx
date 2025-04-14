import { renderHook } from '@testing-library/react';
import useDebounce from './use-debounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.resetAllMocks();
  });

  it('The function is called after the required time has elapsed.', () => {
    const callback = vi.fn();
    const delay = 500;

    renderHook(() => useDebounce(callback, delay));

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(600);
    expect(callback).toBeCalledTimes(1);
  });
});
