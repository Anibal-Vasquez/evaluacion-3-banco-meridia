# MERIDIA — Banco Digital (React + Firebase)

Aplicación React/Vite con registro de clientes, inicio de sesión mediante
Firebase Authentication y cuentas persistentes en Cloud Firestore.

## Configuración

1. Crea un proyecto en Firebase.
2. En **Authentication > Sign-in method**, habilita **Email/Password**.
3. Crea una base de datos **Cloud Firestore**.
4. Registra una aplicación web y copia su configuración.
5. Copia `.env.example` como `.env` y reemplaza sus valores.
6. Publica el contenido de `firestore.rules` en **Firestore > Rules**.
7. Ejecuta:

```bash
npm install
npm run dev
```

## Flujo implementado

- **Crear cuenta** registra el correo y la contraseña en Firebase Auth.
- El perfil básico se guarda en `users/{uid}`.
- La cuenta bancaria se crea en `accounts/{uid}`, con saldo y movimientos
  independientes para cada cliente.
- **Iniciar sesión** restaura la sesión y carga la cuenta del usuario.
- Las transferencias se ejecutan con una transacción de Firestore para evitar
  descuentos concurrentes inconsistentes.

## Importante

Este proyecto sigue siendo una simulación académica. Para una banca real,
las transferencias y modificaciones de saldo deben ejecutarse en un backend
confiable (por ejemplo Cloud Functions/Admin SDK), no directamente desde el
navegador.

Las credenciales privadas o cuentas de servicio nunca deben guardarse en
`.env` ni subirse al repositorio. La configuración web de Firebase usa
identificadores públicos y la seguridad depende de Authentication y de las
reglas de Firestore.
