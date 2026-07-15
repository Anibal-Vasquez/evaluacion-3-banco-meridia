import test from 'node:test';
import assert from 'node:assert/strict';
import { LocalStorageService } from '../src/services/storage/LocalStorageService.js';

function createLocalStorageMock() {
  const values = new Map();
  return {
    get length() { return values.size; },
    getItem(key) { return values.has(key) ? values.get(key) : null; },
    setItem(key, value) { values.set(key, String(value)); },
    removeItem(key) { values.delete(key); },
    key(index) { return [...values.keys()][index] ?? null; },
  };
}

test('LocalStorageService guarda y recupera objetos JSON', async () => {
  globalThis.window = { localStorage: createLocalStorageMock() };
  const storage = new LocalStorageService();

  await storage.set('meridia:session', { uid: 'user-1' });

  assert.deepEqual(await storage.get('meridia:session'), { uid: 'user-1' });
});

test('LocalStorageService elimina valores y devuelve null', async () => {
  globalThis.window = { localStorage: createLocalStorageMock() };
  const storage = new LocalStorageService();
  await storage.set('meridia:session', { uid: 'user-1' });

  await storage.remove('meridia:session');

  assert.equal(await storage.get('meridia:session'), null);
});

test('LocalStorageService lista únicamente las claves del prefijo solicitado', async () => {
  globalThis.window = { localStorage: createLocalStorageMock() };
  const storage = new LocalStorageService();
  await storage.set('meridia:session', { uid: 'user-1' });
  await storage.set('meridia:account', { saldo: 100000 });
  await storage.set('otra:clave', true);

  assert.deepEqual((await storage.list('meridia:')).sort(), [
    'meridia:account',
    'meridia:session',
  ]);
});
