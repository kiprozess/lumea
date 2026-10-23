import { siteUrl } from '../lib/siteUrl'
import { useState } from 'react'
import { Icon } from './Icon'
import type { DialogView } from './ProductDialog'
import { UspSlider } from './UspSlider'

export function Header({ onOpen }: { onOpen: (view: DialogView) => void }) {
  const [menuOpen, setMenuOpen] = useState(false)
  return <header>
    <UspSlider />
    <div className="header-main">
      <button className="icon-button mobile-menu-toggle" aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? 'close' : 'menu'} /></button>
      <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Hauptnavigation">
        <a href="#produkt" onClick={() => setMenuOpen(false)}>Produkte</a>
        <button onClick={() => { onOpen('ingredients'); setMenuOpen(false) }}>Wissen</button>
        <a href="#ueber-uns" onClick={() => setMenuOpen(false)}>Über uns</a>
        <a href="#journal" onClick={() => setMenuOpen(false)}>Ratgeber</a>
      </nav>
      <a className="wordmark" href="#produkt" aria-label="Lumea – Weiter du, zur Startseite"><img src={siteUrl('/images/lumea-logo.webp')} alt="Lumea – Weiter du" /></a>
      <div className="header-actions">
        <button className="icon-button search-toggle" aria-label="Suche öffnen" onClick={() => onOpen('search')}><Icon name="search" /></button>
        <button className="icon-button account-toggle" aria-label="Informationen zu deinem Abo" onClick={() => onOpen('account')}><Icon name="user" /></button>
        <button className="icon-button" aria-label="Bestellübersicht öffnen" onClick={() => onOpen('cart')}><Icon name="bag" /></button>
      </div>
    </div>
  </header>
}
