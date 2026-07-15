import { Header } from './Header.jsx';
import { Footer } from './Footer.jsx';
export function Layout({ children, onOpenLogin, onOpenRegister }) {
  return <><Header onOpenLogin={onOpenLogin} onOpenRegister={onOpenRegister} /><main>{children}</main><Footer /></>;
}
