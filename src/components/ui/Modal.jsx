import { forwardRef } from 'react';

/**
 * Modal reutilizable construido sobre el elemento `<dialog>` nativo.
 *
 * Reemplaza el patrón que antes se repetía a mano (login y transferencia)
 * en `script.js`/`perfil.js`. Cualquier modal nuevo de la app (ej. "olvidé
 * mi contraseña", "confirmar depósito") se arma reutilizando este
 * componente en vez de duplicar la lógica de apertura/cierre.
 *
 * El control de abrir/cerrar vive en el padre (vía `ref`), siguiendo la
 * API nativa: `ref.current.showModal()` / `ref.current.close()`.
 */
export const Modal = forwardRef(function Modal({ onClose, children }, ref) {
  function handleBackdropClick(e) {
    if (e.target === ref.current) onClose?.();
  }

  return (
    <dialog className="modal" ref={ref} onClick={handleBackdropClick} onClose={onClose}>
      <button className="modal__close" aria-label="Cerrar" onClick={onClose}>
        ×
      </button>
      {children}
    </dialog>
  );
});
