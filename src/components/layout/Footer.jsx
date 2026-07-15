/**
 * Footer único de la app (antes duplicado a mano en cada HTML).
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <section className="footer__inner">
        <span className="nav__logo">MERIDIA</span>
        <p>© {year} MERIDIA Banco Digital. Todos los derechos reservados.</p>
      </section>
    </footer>
  );
}
