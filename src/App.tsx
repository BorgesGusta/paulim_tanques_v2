import { About } from '@/components/About'
import { ContactCta } from '@/components/ContactCta'
import { FAQ } from '@/components/FAQ'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Process } from '@/components/Process'
import { Sectors } from '@/components/Sectors'
import { Solutions } from '@/components/Solutions'
import { TrustBar } from '@/components/TrustBar'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Solutions />
        <Sectors />
        <Process />
        <About />
        <FAQ />
        <ContactCta />
      </main>
      <Footer />
    </>
  )
}
