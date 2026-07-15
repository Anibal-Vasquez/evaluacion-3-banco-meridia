import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { authService } from '../services/AuthService.js';
export const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => authService.subscribe((current) => { setSession(current); setLoading(false); }), []);
  const login = useCallback(async (data) => { const current = await authService.login(data); setSession(current); return current; }, []);
  const register = useCallback(async (data) => { const current = await authService.register(data); setSession(current); return current; }, []);
  const logout = useCallback(async () => { await authService.logout(); setSession(null); }, []);
  const value = useMemo(() => ({ session, loading, isAuthenticated: !!session, login, register, logout }), [session, loading, login, register, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
