import { useRef } from 'react';
import { Layout } from '../components/layout/Layout.jsx';
import { BalanceCard } from '../components/profile/BalanceCard.jsx';
import { TransferModal } from '../components/profile/TransferModal.jsx';
import { MovementsList } from '../components/profile/MovementsList.jsx';
import { useAuth } from '../hooks/useAuth.js';
import { useAccount } from '../hooks/useAccount.js';

export function ProfilePage() {
  const { session } = useAuth();
  const { saldo, movimientos, loading, error } = useAccount();
  const transferRef = useRef(null);

  const openTransfer = () => transferRef.current?.showModal();
  const closeTransfer = () => transferRef.current?.close();

  if (loading) {
    return <Layout><section className="profile"><p>Cargando tu cuenta...</p></section></Layout>;
  }

  if (error) {
    return (
      <Layout>
        <section className="profile">
          <p role="alert">No fue posible cargar tu saldo: {error}</p>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="profile">
        <section className="profile__hero">
          <article>
            <p className="eyebrow">Cuenta corriente · Titular</p>
            <h1>Hola de nuevo, {session?.nombre}</h1>
            <p className="hero__sub">Este es el resumen de tu cuenta MERIDIA.</p>
          </article>
        </section>

        <BalanceCard saldo={saldo} onTransferir={openTransfer} />
        <MovementsList movimientos={movimientos} />
      </section>

      <TransferModal ref={transferRef} onClose={closeTransfer} />
    </Layout>
  );
}
