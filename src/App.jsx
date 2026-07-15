import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage.jsx';
import { ProfilePage } from './pages/ProfilePage.jsx';
import { ProtectedRoute } from './components/auth/ProtectedRoute.jsx';
import { AccountProvider } from './context/AccountContext.jsx';
import { ROUTES } from './config/constants.js';

/**
 * Árbol de rutas de la app. Agregar una vista nueva (panel admin,
 * reportes, configuración) es agregar una línea acá — no toca nada más.
 */
export default function App() {
  return (
    <Routes>
      <Route path={ROUTES.home} element={<HomePage />} />
      <Route
        path={ROUTES.perfil}
        element={
          <ProtectedRoute>
            <AccountProvider>
              <ProfilePage />
            </AccountProvider>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
