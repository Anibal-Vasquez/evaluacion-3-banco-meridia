import { useEffect, useRef, useState } from 'react';

/**
 * Devuelve `true` la primera vez que el elemento referenciado entra en el
 * viewport, y se mantiene en `true` después (útil para disparar animaciones
 * de entrada una sola vez, como los contadores del home).
 *
 * @param {number} threshold - fracción visible necesaria para disparar (0–1)
 * @returns {[React.RefObject, boolean]}
 */
export function useOnScreen(threshold = 0.4) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || isVisible) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, isVisible]);

  return [ref, isVisible];
}
