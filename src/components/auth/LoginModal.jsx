import { forwardRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../ui/Modal.jsx';
import { Button } from '../ui/Button.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import { ROUTES } from '../../config/constants.js';

/**
 * Modal de inicio de sesión. Al loguearse correctamente, AuthService ya
 * reinicia saldo/movimientos (ver AuthService.login), así que este
 * componente solo se preocupa de la UI del formulario y de navegar.
 */
export const LoginModal = forwardRef(function LoginModal({ onClose }, ref) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await login(form);
      setSuccess(true);
      setTimeout(() => {
        onClose?.();
        setSuccess(false);
        setForm({ email: '', password: '' });
        navigate(ROUTES.perfil);
      }, 900);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <Modal ref={ref} onClose={onClose}>
      <h3>Iniciar sesión</h3>
      <form onSubmit={handleSubmit} noValidate>
        <label>
          Correo electrónico
          <input
            type="email"
            name="email"
            required
            placeholder="tú@correo.com"
            value={form.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Contraseña
          <input
            type="password"
            name="password"
            required
            minLength={6}
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
          />
        </label>
        <p className="form__error" style={{ color: success ? 'var(--green)' : undefined }}>
          {success ? 'Inicio de sesión correcto, redirigiendo…' : error}
        </p>
        <Button type="submit" full>Entrar</Button>
      </form>
    </Modal>
  );
});
