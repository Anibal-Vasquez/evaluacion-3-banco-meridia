import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { accountService } from '../services/AccountService.js';
import { useAuth } from '../hooks/useAuth.js';
export const AccountContext = createContext(null);
export function AccountProvider({ children }) {
  const { session } = useAuth();
  const [saldo, setSaldo] = useState(0);
  const [movimientos, setMovimientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const cargarCuenta = useCallback(async () => {
    if (!session?.uid) return;
    setLoading(true); setError('');
    try { const cuenta = await accountService.getAccount(session.uid); setSaldo(cuenta.saldo); setMovimientos(cuenta.movimientos); }
    catch (err) { setError(err.message); } finally { setLoading(false); }
  }, [session?.uid]);
  useEffect(() => { cargarCuenta(); }, [cargarCuenta]);
  const transferir = useCallback(async (datos) => {
    const result = await accountService.transfer(session.uid, datos);
    setSaldo(result.saldo); setMovimientos(result.movimientos); return result.saldo;
  }, [session?.uid]);
  const value = useMemo(() => ({ saldo, movimientos, loading, error, transferir, recargar: cargarCuenta }), [saldo, movimientos, loading, error, transferir, cargarCuenta]);
  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}
