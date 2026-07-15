/**
 * Modelo de dominio: Movimiento de cuenta.
 *
 * Centraliza la forma de un movimiento para que servicios, componentes y
 * (en el futuro) la API/DB usen siempre la misma estructura.
 *
 * @typedef {Object} Movement
 * @property {string} id
 * @property {string} desc
 * @property {string} fecha  - formato corto de despliegue, ej. "03 jul"
 * @property {number} monto  - negativo si es salida, positivo si es entrada
 * @property {'in'|'out'} tipo
 */

let contador = 0;

/**
 * Crea un Movement validado a partir de datos crudos.
 * @param {{desc: string, fecha: string, monto: number, tipo: 'in'|'out'}} data
 * @returns {Movement}
 */
export function createMovement({ desc, fecha, monto, tipo }) {
  if (!desc || !fecha || typeof monto !== 'number' || Number.isNaN(monto)) {
    throw new Error('createMovement: datos de movimiento inválidos');
  }
  contador += 1;
  return {
    id: `mov_${Date.now()}_${contador}`,
    desc,
    fecha,
    monto,
    tipo: tipo ?? (monto >= 0 ? 'in' : 'out'),
  };
}

/**
 * Fábrica específica para una transferencia saliente (caso de uso más común
 * hoy en la app). Evita duplicar la lógica de armado del texto/monto.
 */
export function createTransferMovement({ destinatario, cuenta, monto, mensaje, fecha }) {
  const desc = mensaje
    ? `Transferencia a ${destinatario} (${cuenta}) — ${mensaje}`
    : `Transferencia a ${destinatario} (${cuenta})`;

  return createMovement({ desc, fecha, monto: -Math.abs(monto), tipo: 'out' });
}
