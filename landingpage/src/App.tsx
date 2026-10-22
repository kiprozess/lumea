import { useState } from 'react'
import { Header } from './components/Header'
import { ProductGallery } from './components/ProductGallery'
import { PurchasePanel } from './components/PurchasePanel'
import { ProductAdvantages } from './components/ProductAdvantages'
import { LifePhaseIntro } from './components/LifePhaseIntro'
import { IngredientsSection } from './components/IngredientsSection'
import { TestimonialsSection } from './components/TestimonialsSection'
import { FoundersSection } from './components/FoundersSection'
import { SubscriptionSection } from './components/SubscriptionSection'
import { FaqSection } from './components/FaqSection'
import { JournalSection } from './components/JournalSection'
import { Footer } from './components/Footer'
import { ProductDialog, type DialogView } from './components/ProductDialog'

function App() {
  const [dialog, setDialog] = useState<DialogView | null>(null)
  return <>
    <a className="skip-link" href="#produkt">Zum Produkt</a>
    <Header onOpen={setDialog} />
    <main id="produkt">
      <section className="product-layout" aria-label="Lumea Produktübersicht">
        <ProductGallery />
        <PurchasePanel onSubscribe={() => setDialog('cart')} />
      </section>
      <ProductAdvantages />
      <LifePhaseIntro />
      <IngredientsSection />
      <FoundersSection />
      <TestimonialsSection />
      <SubscriptionSection onSubscribe={() => setDialog('cart')} />
      <FaqSection />
      <JournalSection />
    </main>
    <Footer onOpen={setDialog} />
    <ProductDialog view={dialog} onClose={() => setDialog(null)} />
  </>
}

export default App
