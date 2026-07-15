import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase.js';
import { ACCOUNT_CONFIG } from '../config/constants.js';
import { createSession } from '../models/Session.js';
import { accountService } from './AccountService.js';
function readableError(error) {
  const messages = {
    'auth/email-already-in-use': 'Este correo ya tiene una cuenta registrada.',
    'auth/invalid-credential': 'Correo o contraseña incorrectos.',
    'auth/invalid-email': 'Ingresa un correo electrónico válido.',
    'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
    'auth/too-many-requests': 'Demasiados intentos. Espera unos minutos e inténtalo nuevamente.',
    'auth/network-request-failed': 'No fue posible conectar con Firebase.',
  };
  return new Error(messages[error?.code] || error?.message || 'No fue posible completar la operación.');
}
async function sessionFromUser(user) {
  if (!user) return null;
  const snapshot = await getDoc(doc(db, 'users', user.uid));
  return createSession(user, snapshot.exists() ? snapshot.data() : {});
}
class AuthService {
  async register({ nombre, email, password, confirmPassword }) {
    if (!nombre?.trim() || !email?.trim() || !password) throw new Error('Completa nombre, correo y contraseña.');
    if (password.length < 6) throw new Error('La contraseña debe tener al menos 6 caracteres.');
    if (password !== confirmPassword) throw new Error('Las contraseñas no coinciden.');
    try {
      const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      await updateProfile(credential.user, { displayName: nombre.trim() });
      await setDoc(doc(db, 'users', credential.user.uid), {
        nombre: nombre.trim(),
        email: credential.user.email,
        roles: ['cliente'],
        saldo: ACCOUNT_CONFIG.saldoInicial,
        createdAt: serverTimestamp(),
      });
      await accountService.ensureAccount(credential.user.uid);
      return sessionFromUser(credential.user);
    } catch (error) { throw readableError(error); }
  }
  async login({ email, password }) {
    if (!email?.trim() || !password) throw new Error('Completa ambos campos para continuar.');
    try {
      const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
      await accountService.ensureAccount(credential.user.uid);
      return sessionFromUser(credential.user);
    } catch (error) { throw readableError(error); }
  }
  async logout() { await signOut(auth); }
  subscribe(callback) {
    return onAuthStateChanged(auth, async (user) => {
      try { callback(await sessionFromUser(user)); } catch { callback(createSession(user)); }
    });
  }
}
export const authService = new AuthService();
