import test from 'node:test';
import assert from 'node:assert/strict';
import { validateTransfer } from '../src/utils/validateTransfer.js';

test('validateTransfer normaliza una transferencia válida', () => {
  const transfer = validateTransfer({
    destinatario: '  María González  ',
    cuenta: ' 000123456789 ',
    monto: '15000',
    mensaje: '  Pago mensual  ',
  });

  assert.deepEqual(transfer, {
    destinatario: 'María González',
    cuenta: '000123456789',
    monto: 15000,
    mensaje: 'Pago mensual',
  });
});

test('validateTransfer rechaza campos obligatorios vacíos', () => {
  assert.throws(() => validateTransfer({}), /Completa destinatario/);
});

test('validateTransfer exige una cuenta de 6 a 20 dígitos', () => {
  assert.throws(
    () => validateTransfer({ destinatario: 'María', cuenta: 'ABC123', monto: 1000 }),
    /entre 6 y 20 dígitos/,
  );
});

test('validateTransfer rechaza montos decimales', () => {
  assert.throws(
    () => validateTransfer({ destinatario: 'María', cuenta: '123456', monto: 10.5 }),
    /monto entero válido/,
  );
});

test('validateTransfer rechaza montos iguales o menores que cero', () => {
  assert.throws(
    () => validateTransfer({ destinatario: 'María', cuenta: '123456', monto: 0 }),
    /mayor a \$0/,
  );
});
