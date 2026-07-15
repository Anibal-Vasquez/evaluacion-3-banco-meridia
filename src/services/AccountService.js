import { doc, getDoc, runTransaction, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase.js';
import { ACCOUNT_CONFIG, SEED_MOVEMENTS } from '../config/constants.js';
import { createTransferMovement } from '../models/Movement.js';
import { validateTransfer } from '../utils/validateTransfer.js';
class AccountService {
  accountRef(uid) {
    if (!uid) throw new Error('No existe una sesión activa.');
    return doc(db, 'accounts', uid);
  }
  async ensureAccount(uid) {
    const ref = this.accountRef(uid);
    const snapshot = await getDoc(ref);
    if (!snapshot.exists()) {
      await setDoc(ref, {
        ownerUid: uid,
        balance: ACCOUNT_CONFIG.saldoInicial,
        currency: ACCOUNT_CONFIG.moneda,
        movements: SEED_MOVEMENTS,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return;
    }

    // Repara cuentas creadas antes de incorporar el saldo inicial.
    const data = snapshot.data();
    if (!Number.isFinite(data.balance)) {
      await setDoc(ref, {
        ownerUid: uid,
        balance: ACCOUNT_CONFIG.saldoInicial,
        currency: data.currency || ACCOUNT_CONFIG.moneda,
        movements: Array.isArray(data.movements) ? data.movements : SEED_MOVEMENTS,
        updatedAt: serverTimestamp(),
      }, { merge: true });
    }
  }

  async getAccount(uid) {
    await this.ensureAccount(uid);
    const data = (await getDoc(this.accountRef(uid))).data();
    return { saldo: data.balance ?? 0, movimientos: data.movements ?? [] };
  }
  async transfer(uid, { destinatario, cuenta, monto, mensaje }) {
    const transferData = validateTransfer({ destinatario, cuenta, monto, mensaje });
    const amount = transferData.monto;
    const fecha = new Date().toLocaleDateString(ACCOUNT_CONFIG.locale, { day: '2-digit', month: 'short' }).replace('.', '');
    const movimiento = createTransferMovement({ ...transferData, fecha });
    return runTransaction(db, async (transaction) => {
      const ref = this.accountRef(uid);
      const snapshot = await transaction.get(ref);
      if (!snapshot.exists()) throw new Error('La cuenta bancaria no existe.');
      const data = snapshot.data();
      const saldoActual = data.balance ?? 0;
      if (amount > saldoActual) throw new Error('No tienes saldo suficiente para esta transferencia.');
      const movimientos = [movimiento, ...(data.movements ?? [])].slice(0, 100);
      const saldo = saldoActual - amount;
      transaction.update(ref, { balance: saldo, movements: movimientos, updatedAt: serverTimestamp() });
      return { saldo, movimientos };
    });
  }
}
export const accountService = new AccountService();
