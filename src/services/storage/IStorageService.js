/**
 * Contrato que debe cumplir cualquier adaptador de persistencia.
 *
 * Esta es la pieza clave para que la aplicación pueda cambiar entre
 * LocalStorage, Firebase, Supabase, MySQL/PostgreSQL/SQL Server (vía API
 * propia) SIN modificar componentes, hooks ni páginas: todos ellos hablan
 * contra esta interfaz, nunca contra el motor de persistencia concreto.
 *
 * Cualquier adaptador nuevo (ej. `FirebaseStorageService.js`) debe
 * implementar exactamente estos cuatro métodos.
 *
 * @interface IStorageService
 */
export class IStorageService {
  /**
   * @param {string} key
   * @returns {Promise<any|null>}
   */
  async get(key) {
    throw new Error('IStorageService.get() no implementado');
  }

  /**
   * @param {string} key
   * @param {any} value
   * @returns {Promise<void>}
   */
  async set(key, value) {
    throw new Error('IStorageService.set() no implementado');
  }

  /**
   * @param {string} key
   * @returns {Promise<void>}
   */
  async remove(key) {
    throw new Error('IStorageService.remove() no implementado');
  }

  /**
   * @param {string} prefix
   * @returns {Promise<string[]>}
   */
  async list(prefix) {
    throw new Error('IStorageService.list() no implementado');
  }
}
