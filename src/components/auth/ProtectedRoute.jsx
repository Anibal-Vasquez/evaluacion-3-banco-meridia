import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import { ROUTES } from '../../config/constants.js';

/**
 * Protege rutas que requieren sesión activa (hoy: /perfil).
 *
 * Cuando existan roles/permisos reales, este mismo componente se extiende
 * con una prop `requiredRole` y compara contra `session.roles`, sin
 * cambiar cómo se usa en App.jsx.
 */
export function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;
  if (!isAuthenticated) return <Navigate to={ROUTES.home} replace />;

  return children;
}
