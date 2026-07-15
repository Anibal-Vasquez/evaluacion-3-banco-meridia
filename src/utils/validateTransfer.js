/**
 * Valida y normaliza los datos de una transferencia antes de acceder a Firebase.
 * Al mantenerse como función pura puede probarse sin conexión ni credenciales.
 */
export function validateTransfer({ destinatario, cuenta, monto, mensaje } = {}) {
  const normalizedRecipient = destinatario?.trim();
  const normalizedAccount = cuenta?.trim();
  const amount = Number(monto);

  if (!normalizedRecipient || !normalizedAccount || !Number.isInteger(amount)) {
    throw new Error('Completa destinatario, cuenta y un monto entero válido.');
  }
  if (!/^\d{6,20}$/.test(normalizedAccount)) {
    throw new Error('La cuenta destino debe contener entre 6 y 20 dígitos.');
  }
  if (amount <= 0) {
    throw new Error('El monto debe ser mayor a $0.');
  }

  return {
    destinatario: normalizedRecipient,
    cuenta: normalizedAccount,
    monto: amount,
    mensaje: mensaje?.trim() || '',
  };
}
