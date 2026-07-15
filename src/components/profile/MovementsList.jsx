import { formatNumber } from '../../utils/formatNumber.js';

/**
 * @param {{movimientos: import('../../models/Movement.js').Movement[]}} props
 */
export function MovementsList({ movimientos }) {
  return (
    <section className="section section--movs">
      <p className="section__eyebrow">Movimientos</p>
      <h2 className="section__title section__title--movs">Últimos movimientos</h2>

      <ul className="movs">
        {movimientos.map((mov) => (
          <li className="movs__item" key={mov.id}>
            <span className="movs__desc">{mov.desc}</span>
            <span className="movs__fecha">{mov.fecha}</span>
            <span className={`movs__monto movs__monto--${mov.tipo}`}>
              {mov.tipo === 'in' ? '+' : '−'} ${formatNumber(Math.abs(mov.monto))}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
