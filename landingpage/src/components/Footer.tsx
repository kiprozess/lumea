import { siteUrl } from '../lib/siteUrl'
import { useId, useState, type ReactNode } from 'react'
import { Icon } from './Icon'
import type { DialogView } from './ProductDialog'

const copyrightYear = new Date().getFullYear()

function FooterGroup({ title, label, children }: { title: string; label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const linksId = useId()
  return <nav className={`footer-column${open ? ' is-open' : ''}`} aria-label={label}>
    <h2><span className="footer-desktop-title">{title}</span><button className="footer-toggle" aria-expanded={open} aria-controls={linksId} onClick={() => setOpen(current => !current)}>{title}<span className="footer-toggle-symbol" aria-hidden="true" /></button></h2>
    <div className="footer-links" id={linksId}>{children}</div>
  </nav>
}

export function Footer({ onOpen }: { onOpen: (view: DialogView) => void }) {
  return <footer className="site-footer">
    <div className="footer-inner">
      <div className="footer-assurances" aria-label="Deine Vorteile">
        <span><Icon name="truck" />Versand in Deutschland inklusive</span>
        <span><Icon name="calendar" />Dein Abo. Jederzeit kündbar.</span>
        <span><Icon name="lock" />Kreditkarte oder PayPal</span>
      </div>
      <div className="footer-main">
        <div className="footer-brand">
          <a className="footer-wordmark" href="#produkt" aria-label="Lumea – zurück zum Produkt"><img src={siteUrl('/images/lumea-logo.png')} alt="Lumea – Weiter du" loading="lazy" /></a>
          <p>Für deine nächste Lebensphase.<br />Für eine Routine, die zu dir passt.</p>
        </div>
        <FooterGroup title="Entdecken" label="Lumea entdecken">
          <a href="#produkt">Unser Produkt</a>
          <a href="#inhaltsstoffe">Die Inhaltsstoffe</a>
          <a href="#bewertungen">Kundinnenstimmen</a>
          <a href="#abo">Das Monatsabo</a>
        </FooterGroup>
        <FooterGroup title="Gut zu wissen" label="Wissen über Lumea">
          <a href="#ueber-uns">Über Lumea</a>
          <button onClick={() => onOpen('guide')}>Deine Lebensphase</button>
          <a href="#faq">Häufige Fragen</a>
          <a href="#journal">Lumea Journal</a>
        </FooterGroup>
        <FooterGroup title="Dein Lumea Abo" label="Informationen zum Monatsabo">
          <button onClick={() => onOpen('account')}>Lieferung & Zahlung</button>
          <button onClick={() => onOpen('account')}>Abo & Kündigung</button>
          <a className="footer-start" href="#abo">Lumea kennenlernen<Icon name="arrow" /></a>
        </FooterGroup>
      </div>
      <div className="footer-payments">
        <p>Zahlungsmöglichkeiten</p>
        <ul aria-label="Kreditkarte und PayPal">
          <li><img src={siteUrl('/images/payments/visa.svg')} alt="Visa" width="44" height="28" loading="lazy" /></li>
          <li><img src={siteUrl('/images/payments/mastercard.svg')} alt="Mastercard" width="44" height="28" loading="lazy" /></li>
          <li><img src={siteUrl('/images/payments/paypal.svg')} alt="PayPal" width="44" height="28" loading="lazy" /></li>
        </ul>
      </div>
      <div className="footer-bottom">
        <p>© {copyrightYear} Lumea. Weiter du.</p>
        <p>Lumea ist ein fiktives Produkt. Design- und Bestellprototyp.</p>
        <a href="#produkt">Nach oben<Icon name="arrow" /></a>
      </div>
    </div>
  </footer>
}
