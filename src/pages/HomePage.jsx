import { useRef } from 'react';
import { Layout } from '../components/layout/Layout.jsx';
import { Hero } from '../components/home/Hero.jsx';
import { StatsStrip } from '../components/home/StatsStrip.jsx';
import { ServiceCards } from '../components/home/ServiceCards.jsx';
import { SecuritySection } from '../components/home/SecuritySection.jsx';
import { StatsSection } from '../components/home/StatsSection.jsx';
import { CtaFinal } from '../components/home/CtaFinal.jsx';
import { LoginModal } from '../components/auth/LoginModal.jsx';
import { RegisterModal } from '../components/auth/RegisterModal.jsx';
export function HomePage() {
  const loginRef = useRef(null);
  const registerRef = useRef(null);
  const openLogin = () => loginRef.current?.showModal();
  const closeLogin = () => loginRef.current?.close();
  const openRegister = () => registerRef.current?.showModal();
  const closeRegister = () => registerRef.current?.close();
  return (
    <Layout onOpenLogin={openLogin} onOpenRegister={openRegister}>
      <Hero onOpenAccount={openRegister} /><StatsStrip /><ServiceCards /><SecuritySection /><StatsSection />
      <CtaFinal onOpenAccount={openRegister} />
      <LoginModal ref={loginRef} onClose={closeLogin} />
      <RegisterModal ref={registerRef} onClose={closeRegister} />
    </Layout>
  );
}
