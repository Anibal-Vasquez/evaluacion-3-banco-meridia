import { useAnimatedCounter } from '../../hooks/useAnimatedCounter.js';
import { useOnScreen } from '../../hooks/useOnScreen.js';
import { formatNumber } from '../../utils/formatNumber.js';

const CIFRAS = [
  { target: 180000, label: 'Clientes activos' },
  { target: 98, label: '% de satisfacción' },
  { target: 12, label: 'Años operando' },
];

function StatItem({ target, label, active }) {
  const value = useAnimatedCounter(active ? target : 0, 1800);
  return (
    <>
      <dt>{label}</dt>
      <dd>{formatNumber(value)}</dd>
    </>
  );
}

export function StatsSection() {
  const [ref, isVisible] = useOnScreen(0.4);

  return (
    <section className="section" id="cifras">
      <p className="section__eyebrow">Cifras</p>
      <h2 className="section__title">Confianza que se mide</h2>
      <dl className="stats" ref={ref}>
        {CIFRAS.map((c) => (
          <StatItem key={c.label} {...c} active={isVisible} />
        ))}
      </dl>
    </section>
  );
}
