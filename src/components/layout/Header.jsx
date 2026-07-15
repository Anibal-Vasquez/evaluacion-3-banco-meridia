import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import { ROUTES } from '../../config/constants.js';
export function Header({ onOpenLogin, onOpenRegister }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, session, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const isProfile = pathname === ROUTES.perfil;
  async function handleLogout() { await logout(); navigate(ROUTES.home); }
  return (
    <header className="nav"><section className="nav__inner">
      <Link to={ROUTES.home} className="nav__logo">MERIDIA</Link>
      {isProfile ? <nav className="nav__links"><span>Hola, {session?.nombre ?? 'cliente'}</span></nav> :
        <nav className={`nav__links${menuOpen ? ' is-open' : ''}`}>
          <a href="#servicios" onClick={() => setMenuOpen(false)}>Servicios</a><a href="#seguridad" onClick={() => setMenuOpen(false)}>Seguridad</a><a href="#cifras" onClick={() => setMenuOpen(false)}>Cifras</a><a href="#contacto" onClick={() => setMenuOpen(false)}>Contacto</a>
        </nav>}
      <span className="nav__actions">
        {isProfile ? <Button variant="ghost" onClick={handleLogout}>Cerrar sesión</Button> :
          isAuthenticated ? <Button variant="ghost" onClick={() => navigate(ROUTES.perfil)}>Ir a mi perfil</Button> :
          <><Button variant="ghost" onClick={onOpenLogin}>Iniciar sesión</Button><Button onClick={onOpenRegister}>Crear cuenta</Button></>}
        {!isProfile && <button className="nav__burger" aria-label="Abrir menú" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><span></span><span></span><span></span></button>}
      </span>
    </section></header>
  );
}
