import { useContext } from 'react';
import { AccountContext } from '../context/AccountContext.jsx';

/**
 * Punto único de acceso al estado de cuenta (saldo/movimientos).
 */
export function useAccount() {
  const ctx = useContext(AccountContext);
  if (!ctx) throw new Error('useAccount debe usarse dentro de <AccountProvider>');
  return ctx;
}
