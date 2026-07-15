import { useEffect, useRef, useState } from 'react';

/**
 * Anima un número desde su valor anterior hasta `target` con easeOutCubic.
 *
 * Reemplaza la función `animateCounter()` que antes estaba duplicada en
 * `script.js` y `perfil.js`. Cualquier componente que necesite un número
 * animado (saldo, estadísticas, etc.) usa este único hook.
 *
 * @param {number} target - valor final a mostrar
 * @param {number} duration - duración en ms
 * @returns {number} valor actual animado, listo para renderizar
 */
export function useAnimatedCounter(target, duration = 1200) {
  const [value, setValue] = useState(0);
  const fromRef = useRef(0);

  useEffect(() => {
    const from = fromRef.current;
    const start = performance.now();
    let frameId;

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(from + (target - from) * eased);
      setValue(current);

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        fromRef.current = target;
      }
    }

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]);

  return value;
}
