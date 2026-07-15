const SERVICIOS = [
  {
    icono: '↗',
    titulo: 'Cuenta de ahorro',
    texto: 'Rendimiento diario calculado sobre tu saldo, pagado cada mes sin condiciones ocultas.',
  },
  {
    icono: '▤',
    titulo: 'Tarjeta débito',
    texto: 'Retiros sin costo en más de 30,000 cajeros y pagos internacionales sin recargo.',
  },
  {
    icono: '⇄',
    titulo: 'Transferencias',
    texto: 'Envía dinero al instante a cualquier banco, disponible los 365 días del año.',
  },
];

export function ServiceCards() {
  return (
    <section className="section" id="servicios">
      <p className="section__eyebrow">Servicios</p>
      <h2 className="section__title">Todo lo que necesita<br />tu dinero, en un solo lugar</h2>

      <ul className="cards">
        {SERVICIOS.map((s) => (
          <li className="card" key={s.titulo}>
            <span className="card__icon">{s.icono}</span>
            <h3>{s.titulo}</h3>
            <p>{s.texto}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
