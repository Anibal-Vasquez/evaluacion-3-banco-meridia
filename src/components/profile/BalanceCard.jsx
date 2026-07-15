import { Button } from '../ui/Button.jsx';
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter.js';
import { formatNumber } from '../../utils/formatNumber.js';

/**
 * @param {{saldo: number, onTransferir: () => void}} props
 */
export function BalanceCard({ saldo, onTransferir }) {
  const counter = useAnimatedCounter(saldo, 900);

  return (
    <section className="balance-card">
      <span className="ledger__label">Saldo disponible</span>
      <span className="balance-card__value">
        ${formatNumber(counter)} <small>CLP</small>
      </span>
      <p className="balance-card__actions">
        <Button onClick={onTransferir}>Transferir</Button>
        <Button variant="ghost-dark">Depositar</Button>
      </p>
    </section>
  );
}
