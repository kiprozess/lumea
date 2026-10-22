import { useEffect, useRef, useState } from 'react'
import { Modal } from './Modal'
import { Icon } from './Icon'
import { ingredients } from '../data/ingredients'
import { founders, founderStory } from '../data/founders'
import { trackEvent } from '../lib/tracking'

export type DialogView = 'cart' | 'ingredients' | 'about' | 'guide' | 'search' | 'account'
const titles: Record<DialogView, string> = { cart: 'Dein Lumea Monatsabo', ingredients: 'Vier Inhaltsstoffe. Eine Routine.', about: 'Weiter du.', guide: 'Deine nächste Lebensphase.', search: 'Was möchtest du wissen?', account: 'Dein Abo. Deine Entscheidung.' }
const information = [
  { title: 'Lumea Monatsabo', text: '30 Kapseln. 14,50 € im ersten Monat, danach 29 € monatlich. Versand in Deutschland inklusive.' },
  { title: 'Inhaltsstoffe', text: 'Pro Tagesportion: Traubensilberkerzen-Extrakt 6,5 mg, Vitamin B6 1,4 mg, Vitamin D3 20 µg und Magnesium 150 mg.' },
  { title: 'Anwendung', text: 'Eine Kapsel am Tag. Nahrungsergänzungsmittel sind kein Ersatz für eine ausgewogene und abwechslungsreiche Ernährung und eine gesunde Lebensweise.' },
  { title: 'Kündigung', text: 'Das Monatsabo ist jederzeit kündbar. Die Abrechnung erfolgt automatisch jeden Monat per Kreditkarte oder PayPal.' },
]
export function ProductDialog({ view, onClose }: { view: DialogView | null; onClose: () => void }) {
  const cartOpen = useRef(false)
  useEffect(() => {
    if (view === 'cart' && !cartOpen.current) trackEvent('AddToCart', undefined, { num_items: 1 })
    cartOpen.current = view === 'cart'
  }, [view])
  return view ? <Modal title={titles[view]} onClose={onClose}><DialogContent key={view} view={view} /></Modal> : null
}
function DialogContent({ view }: { view: DialogView }) {
  const [query, setQuery] = useState('')
  const results = information.filter(item => `${item.title} ${item.text}`.toLocaleLowerCase('de').includes(query.toLocaleLowerCase('de')))
  return <>
    <p className="modal-kicker">LUMEA · WEITER DU</p><h2>{titles[view]}</h2>
    {view === 'cart' ? <><div className="cart-product"><img src="/images/lumea-packshot.png" alt="Lumea mit 30 Kapseln" /><div><h3>Lumea Monatsabo</h3><p>30 Kapseln · eine Lieferung pro Monat</p><strong>14,50 €</strong><p>im ersten Monat, danach 29 € monatlich</p></div></div><div className="order-summary"><p><span>Versand in Deutschland</span><span>Inklusive</span></p><p><strong>Heute gesamt</strong><strong>14,50 €</strong></p></div><p>Jederzeit kündbar. Monatliche automatische Abbuchung per Kreditkarte oder PayPal.</p><p className="prototype-message">Dies ist eine Bestellvorschau für ein fiktives Produkt. Es wird kein Abo abgeschlossen und keine Zahlung ausgelöst.</p><a className="button modal-primary" href="/bestellung">Zur Bestellvorschau<Icon name="arrow" /></a></> : null}
    {view === 'ingredients' ? <><p>Ausgewählte Inhaltsstoffe in einer Kapsel pro Tag.</p><dl className="ingredients-list">{ingredients.map(ingredient => <div key={ingredient.id}><dt>{ingredient.label}</dt><dd>{ingredient.amount}</dd></div>)}</dl><p className="small-copy">Mengen pro Tagesportion (1 Kapsel). Nahrungsergänzungsmittel ersetzen keine ausgewogene und abwechslungsreiche Ernährung und gesunde Lebensweise.</p></> : null}
    {view === 'about' ? <><p>{founders.map(founder => `${founder.name}, ${founder.age}`).join(' & ')} – die fiktiven Gründerinnen von Lumea.</p>{founderStory.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</> : null}
    {view === 'guide' ? <><p>Die Wechseljahre sind eine individuelle Lebensphase. Informierte Entscheidungen und eine Routine, die zu deinem Alltag passt, können ein guter Ausgangspunkt sein.</p><h3>Raum für deine Fragen</h3><p>Bei Fragen zu Beschwerden, Medikamenten oder zur Einnahme von Nahrungsergänzungsmitteln wende dich an deine Ärztin, deinen Arzt oder deine Apotheke.</p></> : null}
    {view === 'account' ? <><p>Der erste Monat kostet 14,50 €. Danach erhältst du monatlich 30 Kapseln für 29 € inklusive Versand innerhalb Deutschlands.</p><p>Dein Abo ist jederzeit kündbar. Die Abbuchung erfolgt monatlich automatisch per Kreditkarte oder PayPal.</p><p className="prototype-message">Im Designprototyp gibt es noch kein Kundenkonto und keine aktiven Abonnements.</p></> : null}
    {view === 'search' ? <><label className="search-label" htmlFor="product-search">Produkt, Inhaltsstoffe oder Abo durchsuchen</label><div className="search-field"><Icon name="search" /><input id="product-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Zum Beispiel: Magnesium" autoFocus /></div><div className="search-results" aria-live="polite">{results.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}{results.length === 0 ? <p>Keine Ergebnisse. Versuche es mit „Abo“ oder „Inhaltsstoffe“.</p> : null}</div></> : null}
  </>
}
