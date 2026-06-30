import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { TrustBar } from '@/components/TrustBar'
import { Solutions } from '@/components/Solutions'
import { Sectors } from '@/components/Sectors'
import { Process } from '@/components/Process'
import { About } from '@/components/About'
import { FAQ } from '@/components/FAQ'
import { ContactCta } from '@/components/ContactCta'
import { Footer } from '@/components/Footer'
import { QuoteProvider } from '@/context/QuoteContext'
import { QuoteWizard } from '@/components/QuoteWizard'

export default function App() {
  return (
    <QuoteProvider>
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
      <QuoteWizard />
    </QuoteProvider>
  )
}
