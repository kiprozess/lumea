import { Icon } from './Icon'
import { ProductReviews } from './ProductReviews'

const benefits = ['Mit Traubensilberkerze, Vitamin B6, Vitamin D3 und Magnesium', 'Vegan und ohne zugesetzte Hormone', 'In Deutschland hergestellt', 'Eine Kapsel am Tag. Einfach deine Routine.']

export function PurchasePanel({ onSubscribe }: { onSubscribe: () => void }) {
  return <section className="product-info" aria-labelledby="product-title">
    <span className="recommendation">UNSERE EMPFEHLUNG</span>
    <h1 id="product-title">Deine Routine.<br />Deine Lebensmitte.</h1>
    <p className="product-subtitle">Für deine nächste Lebensphase.</p>
    <p className="product-description">Für Frauen in den Wechseljahren, die bewusst für sich sorgen möchten. Mit Vitamin B6 zur Regulierung der Hormontätigkeit und Magnesium zur Verringerung von Müdigkeit und Ermüdung – vereint mit Vitamin D3 und Traubensilberkerzen-Extrakt in einer täglichen Kapsel.</p>
    <ul className="benefits">{benefits.map(benefit => <li key={benefit}><span className="benefit-check"><Icon name="check" /></span><span>{benefit}</span></li>)}</ul>
    <div className="subscription-card" id="monatsabo">
      <div className="subscription-top">
        <div className="subscription-name"><span className="selected-radio" aria-hidden="true" /><div><h2>Monatsabo</h2><p>30 Kapseln pro Lieferung</p><p>Jederzeit kündbar</p></div></div>
        <div className="price"><strong>14,50 €</strong><span>im ersten Monat</span><small>danach 29 € monatlich</small></div>
      </div>
      <button className="button subscribe-button" onClick={onSubscribe}><Icon name="cart" />Jetzt abonnieren<Icon name="arrow" /></button>
      <p className="billing-note">Monatliche automatische Abbuchung · inkl. MwSt. & Versand</p>
    </div>
    <div className="purchase-assurances"><span><Icon name="truck" />Versand inklusive</span><span><Icon name="shield" />Jederzeit kündbar</span><span><Icon name="lock" />Sichere Zahlung</span></div>
    <ProductReviews />
    <p className="product-footnote">Nahrungsergänzungsmittel · 30 Kapseln · 30 Tage</p>
  </section>
}
