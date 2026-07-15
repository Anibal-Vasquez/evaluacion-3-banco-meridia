const PUNTOS = [
  'Cifrado de extremo a extremo en cada transacción',
  'Autenticación de dos factores en cada inicio de sesión',
  'Fondos respaldados hasta el límite legal de garantía de depósitos',
  'Monitoreo antifraude activo las 24 horas',
];

export function SecuritySection() {
  return (
    <section className="section section--dark" id="seguridad">
      <p className="section__eyebrow">Seguridad</p>
      <h2 className="section__title">Protegido como<br />una bóveda, simple como una app</h2>
      <ul className="checklist">
        {PUNTOS.map((punto) => (
          <li key={punto}>{punto}</li>
        ))}
      </ul>
    </section>
  );
}
