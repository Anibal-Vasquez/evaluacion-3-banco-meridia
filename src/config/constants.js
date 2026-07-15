/**
 * Configuración centralizada de la aplicación.
 *
 * Cualquier valor que hoy es "mágico" en el código (saldo inicial, nombre de
 * las claves de persistencia, proveedor de almacenamiento activo) vive aquí.
 * Cambiar de LocalStorage a Firebase/Supabase/API propia en el futuro
 * significa tocar `services/storage/storageProvider.js` y esta constante,
 * nunca los componentes.
 */

// Proveedor de persistencia activo. Valores futuros: 'firebase' | 'supabase' | 'api'
export const STORAGE_PROVIDER = 'local';

// Prefijo de todas las claves que la app guarda, para evitar colisiones
// con otras apps que compartan el mismo origen/localStorage.
export const STORAGE_NAMESPACE = 'meridia';

export const ACCOUNT_CONFIG = {
  saldoInicial: 100000, // CLP — se asigna una sola vez al crear la cuenta
  moneda: 'CLP',
  locale: 'es-CL',
};

export const SEED_MOVEMENTS = [
  { desc: 'Transferencia recibida — J. Pérez', fecha: '03 jul', monto: 45000, tipo: 'in' },
  { desc: 'Pago servicio — Electricidad', fecha: '01 jul', monto: -18500, tipo: 'out' },
  { desc: 'Compra — Supermercado Lider', fecha: '29 jun', monto: -22300, tipo: 'out' },
  { desc: 'Depósito en cuenta', fecha: '25 jun', monto: 60000, tipo: 'in' },
  { desc: 'Suscripción — Streaming', fecha: '20 jun', monto: -6900, tipo: 'out' },
];

export const ROUTES = {
  home: '/',
  perfil: '/perfil',
};
