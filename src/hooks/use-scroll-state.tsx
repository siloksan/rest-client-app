import { useState, useEffect } from 'react';

export function useScrollState(scrollThreshold: number = 20) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollOffset = 10;

      if (scrolled && scrollY < scrollThreshold - scrollOffset) {
        setScrolled(false);
      } else if (!scrolled && scrollY >= scrollThreshold) {
        setScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollThreshold, scrolled]);

  return { scrolled };
}
