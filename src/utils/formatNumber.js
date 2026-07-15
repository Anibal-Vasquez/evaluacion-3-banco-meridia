import { ACCOUNT_CONFIG } from '../config/constants.js';

/**
 * Formatea un número como moneda local (sin símbolo, ya que la UI antepone
 * el "$" manualmente en el diseño actual). Centralizado acá para no repetir
 * `.toLocaleString(...)` en cada componente.
 *
 * @param {number} valor
 * @returns {string}
 */
export function formatNumber(valor) {
  return valor.toLocaleString(ACCOUNT_CONFIG.locale);
}
