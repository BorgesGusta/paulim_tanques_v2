import { About } from '@/components/About';
import { ContactCta } from '@/components/ContactCta';
import { Differentials } from '@/components/Differentials';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Process } from '@/components/Process';
import { Services } from '@/components/Services';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Differentials />
        <Process />
        <About />
        <FAQ />
        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
