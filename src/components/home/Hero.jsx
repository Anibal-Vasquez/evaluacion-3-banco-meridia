import { Button } from '../ui/Button.jsx';
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter.js';
import { useOnScreen } from '../../hooks/useOnScreen.js';
import { formatNumber } from '../../utils/formatNumber.js';

const SALDO_SIMULADO = 2820;

/**
 * @param {{onOpenAccount: () => void}} props
 */
export function Hero({ onOpenAccount }) {
  const [panelRef, isVisible] = useOnScreen(0.4);
  const counter = useAnimatedCounter(isVisible ? SALDO_SIMULADO : 0, 1600);

  return (
    <section className="hero">
      <article className="hero__text">
        <p className="eyebrow">Cuenta remunerada · Sin comisiones</p>
        <h1>
          Tu dinero,<br />trabajando<br /><em>mientras tú vives.</em>
        </h1>
        <p className="hero__sub">
          Abre una cuenta en menos de tres minutos y empieza a generar rendimiento desde el primer día.
        </p>
        <p className="hero__cta">
          <Button onClick={onOpenAccount}>Abrir cuenta gratis</Button>
          <a href="#servicios" className="btn btn--text">Ver cómo funciona ↓</a>
        </p>
      </article>

      <aside className="hero__panel" aria-hidden="true" ref={panelRef}>
        <figure className="ledger">
          <figcaption className="ledger__label">Saldo estimado tras 12 meses</figcaption>
          <p className="ledger__value">${formatNumber(counter)}</p>
          <p className="ledger__sub">
            Simulación con depósito inicial de $1,000 y aporte mensual de $150
          </p>
          <svg className="ledger__line" viewBox="0 0 300 80" preserveAspectRatio="none">
            <polyline points="0,70 40,64 80,58 120,50 160,40 200,30 240,18 300,4" />
          </svg>
        </figure>
      </aside>
    </section>
  );
}
