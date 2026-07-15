import test from 'node:test';
import assert from 'node:assert/strict';
import { createMovement, createTransferMovement } from '../src/models/Movement.js';

test('createMovement crea un ingreso con identificador único', () => {
  const first = createMovement({ desc: 'Depósito', fecha: '15 jul', monto: 25000 });
  const second = createMovement({ desc: 'Depósito', fecha: '15 jul', monto: 25000 });

  assert.equal(first.tipo, 'in');
  assert.equal(first.monto, 25000);
  assert.notEqual(first.id, second.id);
});

test('createMovement infiere una salida para montos negativos', () => {
  const movement = createMovement({ desc: 'Compra', fecha: '15 jul', monto: -5000 });

  assert.equal(movement.tipo, 'out');
});

test('createMovement rechaza datos incompletos', () => {
  assert.throws(
    () => createMovement({ desc: '', fecha: '15 jul', monto: 1000 }),
    /datos de movimiento inválidos/,
  );
});

test('createTransferMovement registra una salida y conserva su detalle', () => {
  const movement = createTransferMovement({
    destinatario: 'María Pérez',
    cuenta: '0012345678',
    monto: 15000,
    mensaje: 'Arriendo',
    fecha: '15 jul',
  });

  assert.equal(movement.monto, -15000);
  assert.equal(movement.tipo, 'out');
  assert.match(movement.desc, /María Pérez/);
  assert.match(movement.desc, /Arriendo/);
});
