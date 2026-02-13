import { useEffect, useState, RefObject } from 'react';

export function useRevealOnScroll(ref: RefObject<HTMLElement | null>, threshold = 0.1): boolean {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, isVisible]);

  return isVisible;
}
