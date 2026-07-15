import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuración estándar de Vite + React.
// Si más adelante se necesita un proxy hacia una API propia (services/http),
// se agrega aquí en `server.proxy` sin tocar el resto del proyecto.
export default defineConfig({
  plugins: [react()],
});
