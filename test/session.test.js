import test from 'node:test';
import assert from 'node:assert/strict';
import { createSession } from '../src/models/Session.js';

test('createSession devuelve null cuando no existe un usuario', () => {
  assert.equal(createSession(null), null);
});

test('createSession combina el usuario autenticado con su perfil', () => {
  const session = createSession(
    { uid: 'user-1', email: 'cliente@meridia.cl', displayName: 'Nombre Firebase' },
    { nombre: 'Cliente Meridia', roles: ['cliente'] },
  );

  assert.deepEqual(session, {
    uid: 'user-1',
    nombre: 'Cliente Meridia',
    email: 'cliente@meridia.cl',
    roles: ['cliente'],
  });
});

test('createSession usa el correo como nombre alternativo', () => {
  const session = createSession({ uid: 'user-2', email: 'anibal@example.com' });

  assert.equal(session.nombre, 'anibal');
  assert.deepEqual(session.roles, ['cliente']);
});
