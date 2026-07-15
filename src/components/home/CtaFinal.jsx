import { Button } from '../ui/Button.jsx';

/**
 * @param {{onOpenAccount: () => void}} props
 */
export function CtaFinal({ onOpenAccount }) {
  return (
    <section className="cta-final" id="contacto">
      <h2>Abre tu cuenta hoy.<br />Sin filas, sin papeleo.</h2>
      <Button onClick={onOpenAccount}>Abrir cuenta gratis</Button>
    </section>
  );
}
