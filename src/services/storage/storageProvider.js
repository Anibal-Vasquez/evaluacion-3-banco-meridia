import { LocalStorageService } from './LocalStorageService.js';
import { STORAGE_PROVIDER } from '../../config/constants.js';

/**
 * Punto ÚNICO donde se decide qué adaptador de persistencia está activo.
 *
 * Para migrar a Firebase el día de mañana:
 *   1. Crear `FirebaseStorageService.js` que extienda `IStorageService`.
 *   2. Agregar el `case 'firebase'` acá abajo.
 *   3. Cambiar `STORAGE_PROVIDER` en `config/constants.js`.
 *
 * Ningún componente, hook, ni AuthService/AccountService cambia.
 */
function buildStorageService(provider) {
  switch (provider) {
    case 'local':
      return new LocalStorageService();

    // case 'firebase':
    //   return new FirebaseStorageService();
    // case 'api':
    //   return new ApiStorageService();

    default:
      throw new Error(`Proveedor de almacenamiento desconocido: "${provider}"`);
  }
}

export const storageService = buildStorageService(STORAGE_PROVIDER);
