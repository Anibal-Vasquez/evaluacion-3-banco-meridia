import { IStorageService } from './IStorageService.js';

/**
 * Adaptador de persistencia sobre `window.localStorage`.
 *
 * Es intercambiable: cuando exista `FirebaseStorageService` o
 * `ApiStorageService`, solo se cambia qué clase se instancia en
 * `storageProvider.js`. El resto de la app no se entera del cambio.
 *
 * Los valores se guardan serializados en JSON para soportar objetos/arrays
 * sin que cada llamador tenga que hacer JSON.stringify/parse.
 */
export class LocalStorageService extends IStorageService {
  async get(key) {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return raw; // valor plano no-JSON, se devuelve tal cual
    }
  }

  async set(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  async remove(key) {
    window.localStorage.removeItem(key);
  }

  async list(prefix = '') {
    const keys = [];
    for (let i = 0; i < window.localStorage.length; i += 1) {
      const key = window.localStorage.key(i);
      if (key && key.startsWith(prefix)) keys.push(key);
    }
    return keys;
  }
}
