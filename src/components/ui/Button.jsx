/**
 * Botón base de la app. Centraliza las variantes visuales (brass, ghost,
 * text) para no repetir clases sueltas en cada página.
 *
 * @param {{variant?: 'brass'|'ghost'|'ghost-dark'|'text', full?: boolean}} props
 */
export function Button({ variant = 'brass', full = false, className = '', children, ...rest }) {
  const variantClass = {
    brass: 'btn--brass',
    ghost: 'btn--ghost',
    'ghost-dark': 'btn--ghost-dark',
    text: 'btn--text',
  }[variant];

  const classes = ['btn', variantClass, full ? 'btn--full' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
