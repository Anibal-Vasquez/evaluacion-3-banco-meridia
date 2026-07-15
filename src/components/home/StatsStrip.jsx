const ITEMS = [
  { valor: '4.2%', label: 'Rendimiento anual' },
  { valor: '$0', label: 'Comisión de mantenimiento' },
  { valor: '24/7', label: 'Soporte humano' },
  { valor: '3 min', label: 'Apertura de cuenta' },
];

/**
 * Franja de cifras destacadas del home. Datos como constante local porque
 * hoy son fijos; si en el futuro vienen de un endpoint de "estadísticas
 * públicas", basta con reemplazar ITEMS por el resultado de un servicio.
 */
export function StatsStrip() {
  return (
    <ul className="strip">
      {ITEMS.map((item) => (
        <li className="strip__item" key={item.label}>
          <strong>{item.valor}</strong>
          <span>{item.label}</span>
        </li>
      ))}
    </ul>
  );
}
