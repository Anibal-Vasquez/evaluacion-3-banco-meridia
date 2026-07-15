import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

/**
 * Punto único de acceso al estado de sesión. Ningún componente importa
 * AuthContext directamente ni AuthService: siempre pasan por este hook.
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
}
