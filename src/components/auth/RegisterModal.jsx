import { forwardRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../ui/Modal.jsx';
import { Button } from '../ui/Button.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import { ROUTES } from '../../config/constants.js';
const INITIAL = { nombre: '', email: '', password: '', confirmPassword: '' };
export const RegisterModal = forwardRef(function RegisterModal({ onClose }, ref) {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const change = (e) => setForm((current) => ({ ...current, [e.target.name]: e.target.value }));
  async function submit(e) {
    e.preventDefault(); setError(''); setSubmitting(true);
    try {
      await register(form); setSuccess(true);
      setTimeout(() => { onClose?.(); setForm(INITIAL); setSuccess(false); navigate(ROUTES.perfil); }, 900);
    } catch (err) { setError(err.message); } finally { setSubmitting(false); }
  }
  return (
    <Modal ref={ref} onClose={onClose}>
      <h3>Crear cuenta</h3>
      <form onSubmit={submit} noValidate>
        <label>Nombre completo<input name="nombre" autoComplete="name" required maxLength={80} value={form.nombre} onChange={change} placeholder="Ej: María González" /></label>
        <label>Correo electrónico<input type="email" name="email" autoComplete="email" required value={form.email} onChange={change} placeholder="tú@correo.com" /></label>
        <label>Contraseña<input type="password" name="password" autoComplete="new-password" required minLength={6} value={form.password} onChange={change} placeholder="Mínimo 6 caracteres" /></label>
        <label>Repetir contraseña<input type="password" name="confirmPassword" autoComplete="new-password" required minLength={6} value={form.confirmPassword} onChange={change} placeholder="Repite tu contraseña" /></label>
        <p className="form__error" style={{ color: success ? 'var(--green)' : undefined }}>{success ? 'Cuenta creada. Ingresando a tu banca…' : error}</p>
        <Button type="submit" full disabled={submitting}>{submitting ? 'Creando cuenta…' : 'Crear cuenta'}</Button>
      </form>
    </Modal>
  );
});
