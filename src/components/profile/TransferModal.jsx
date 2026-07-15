import { forwardRef, useState } from 'react';
import { Modal } from '../ui/Modal.jsx';
import { Button } from '../ui/Button.jsx';
import { useAccount } from '../../hooks/useAccount.js';

const FORM_INICIAL = { destinatario: '', cuenta: '', monto: '', mensaje: '' };

export const TransferModal = forwardRef(function TransferModal({ onClose }, ref) {
  const { transferir } = useAccount();
  const [form, setForm] = useState(FORM_INICIAL);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function resetAndClose() {
    setForm(FORM_INICIAL);
    setError('');
    setSuccess(false);
    onClose?.();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await transferir({ ...form, monto: parseInt(form.monto, 10) });
      setSuccess(true);
      setTimeout(resetAndClose, 1100);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <Modal ref={ref} onClose={resetAndClose}>
      <h3>Transferir dinero</h3>
      <form onSubmit={handleSubmit} noValidate>
        <label>
          Nombre del destinatario
          <input
            type="text"
            name="destinatario"
            required
            placeholder="Ej: María González"
            value={form.destinatario}
            onChange={handleChange}
          />
        </label>
        <label>
          Cuenta destino
          <input
            type="text"
            name="cuenta"
            required
            inputMode="numeric"
            placeholder="Ej: 000123456789"
            value={form.cuenta}
            onChange={handleChange}
          />
        </label>
        <label>
          Monto (CLP)
          <input
            type="number"
            name="monto"
            required
            min="1"
            step="1"
            placeholder="Ej: 15000"
            value={form.monto}
            onChange={handleChange}
          />
        </label>
        <label>
          Mensaje (opcional)
          <input
            type="text"
            name="mensaje"
            placeholder="Ej: Arriendo julio"
            value={form.mensaje}
            onChange={handleChange}
          />
        </label>
        <p className="form__error" style={{ color: success ? 'var(--green)' : undefined }}>
          {success ? 'Transferencia enviada correctamente ✓' : error}
        </p>
        <Button type="submit" full>Confirmar transferencia</Button>
      </form>
    </Modal>
  );
});
