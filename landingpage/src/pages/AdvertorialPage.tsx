import { siteUrl } from '../lib/siteUrl'
import { useEffect, useState } from 'react'
import { Icon } from '../components/Icon'
import { ProductDialog, type DialogView } from '../components/ProductDialog'
import { AdvertorialArticle, AdvertorialSources } from '../components/AdvertorialArticle'
import { TestimonialsSection } from '../components/TestimonialsSection'
import '../advertorial.css'

export const advertorialPath = '/ratgeber/deine-routine-in-der-lebensmitte'
const chapters = [
  { id: 'lebensphase', label: 'Deine nächste Lebensphase' },
  { id: 'routine', label: 'Bewusst für dich sorgen' },
  { id: 'bewusst-waehlen', label: 'Was Nährstoffe beitragen' },
  { id: 'lumea-entdecken', label: 'Die Lösung von Lumea' },
  { id: 'fragen-zur-einnahme', label: 'Einfach mit Lumea starten' },
]

export default function AdvertorialPage() {
  const [dialog, setDialog] = useState<DialogView | null>(null)
  useEffect(() => {
    document.title = 'Wechseljahre: Bewusst für dich sorgen mit Lumea'
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Entdecke, wie Magnesium, Vitamin B6 und Vitamin D3 deinen Körper unterstützen und wie Lumea deine tägliche Nährstoffergänzung einfach macht. Vegan, ohne zugesetzte Hormone und flexibel im Monatsabo.')
  }, [])
  return <div className="advertorial-page">
    <a className="skip-link" href="#artikel">Zum Artikel</a>
    <header className="adv-header">
      <p className="adv-disclosure">ANZEIGE · EIN BEITRAG VON LUMEA</p>
      <div className="adv-header-inner">
        <a className="adv-journal-link" href={siteUrl('/#journal')}>Lumea Journal</a>
        <a className="wordmark adv-wordmark" href={siteUrl('/')} aria-label="Lumea Startseite"><img src={siteUrl('/images/lumea-logo.png')} alt="Lumea – Weiter du" /></a>
        <a className="adv-product-link" href={siteUrl('/#produkt')}>Zum Produkt<Icon name="arrow" /></a>
      </div>
    </header>
    <main id="artikel">
      <section className="adv-hero" aria-labelledby="adv-title">
        <div className="adv-hero-copy">
          <p className="adv-eyebrow">WECHSELJAHRE & NÄHRSTOFFE</p>
          <h1 id="adv-title">Deine nächste Lebensphase. Zeit, bewusst für dich zu sorgen.</h1>
          <p className="adv-lead">Wenn dein Körper sich verändert, verdienen deine Bedürfnisse mehr Aufmerksamkeit. Entdecke, wie ausgewählte Nährstoffe deinen Körper unterstützen – und wie Lumea daraus eine einfache tägliche Routine macht.</p>
          <p className="adv-byline">Von Lumea · Recherchierter Markenbeitrag</p>
          <a className="adv-read-link" href="#lebensphase">Entdecke die Idee hinter Lumea<Icon name="arrow" /></a>
        </div>
        <figure className="adv-hero-figure"><img src={siteUrl('/images/lumea-portrait.png')} alt="Frau in einem cremefarbenen Strickpullover im natürlichen Abendlicht" width="1122" height="1402" /><figcaption>Dein Leben verändert sich. Du bleibst du.</figcaption></figure>
      </section>

      <div className="adv-reading-layout">
        <AdvertorialArticle />

        <aside className="adv-sidebar" aria-label="Artikelübersicht und Lumea Monatsabo">
          <div className="adv-sidebar-sticky">
            <nav className="adv-toc" aria-label="In diesem Artikel"><h2>IN DIESEM ARTIKEL</h2>{chapters.map((chapter, index) => <a key={chapter.id} href={`#${chapter.id}`}><span>0{index + 1}</span>{chapter.label}</a>)}</nav>
            <div className="adv-sidebar-product"><img src={siteUrl('/images/lumea-subscription-stone.png')} alt="Lumea Monatsglas auf hellem Naturstein" loading="lazy" /><p className="adv-eyebrow">VIER INHALTSSTOFFE · EINE KAPSEL</p><h2>Lumea kennenlernen.</h2><p>30 Kapseln pro Lieferung.<br />Jederzeit kündbar.</p><a className="button" href="#angebot">Zum Monatsabo<Icon name="arrow" /></a></div>
          </div>
        </aside>
      </div>

      <section className="adv-offer" id="angebot" aria-labelledby="adv-offer-title">
        <div className="adv-offer-image"><img src={siteUrl('/images/lumea-subscription-stone.png')} alt="Lumea-Glas mit zwei Kapseln auf hellem Travertin" loading="lazy" /></div>
        <div className="adv-offer-copy"><p className="adv-eyebrow">DEINE GEZIELTE NÄHRSTOFFERGÄNZUNG</p><h2 id="adv-offer-title">Vier Inhaltsstoffe.<br />Eine Kapsel am Tag.</h2><p>Vitamin B6, Vitamin D3, Magnesium und Traubensilberkerzen-Extrakt. 30 Kapseln pro Lieferung.</p><div className="adv-offer-price"><strong>14,50 €</strong><div>im ersten Monat<span>danach 29 € monatlich</span></div></div><ul><li><Icon name="check" />Versand innerhalb Deutschlands inklusive</li><li><Icon name="check" />Jederzeit kündbar, keine Mindestlaufzeit</li><li><Icon name="check" />Monatliche automatische Abbuchung</li></ul><button className="button adv-offer-button" onClick={() => setDialog('cart')}>Lumea Monatsabo kennenlernen<Icon name="arrow" /></button><p className="adv-offer-terms">Inkl. MwSt. & Versand. Zahlung per Kreditkarte oder PayPal. Der erste Monat kostet 14,50 €, danach 29 € je Monat.</p><p className="adv-offer-terms">Nahrungsergänzungsmittel sind kein Ersatz für eine ausgewogene, abwechslungsreiche Ernährung und eine gesunde Lebensweise.</p></div>
      </section>

      <TestimonialsSection />

      <AdvertorialSources />
    </main>
    <footer className="adv-footer"><a href={siteUrl('/#journal')}>Zurück zum Lumea Journal<Icon name="arrow" /></a><p>Lumea · Weiter du.</p><a href={siteUrl('/#faq')}>Fragen zum Produkt</a></footer>
    <ProductDialog view={dialog} onClose={() => setDialog(null)} />
  </div>
}
