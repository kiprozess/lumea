import { useState } from 'react'
import { Icon } from './Icon'
import { Modal } from './Modal'

const images = [
  { src: '/images/lumea-hero.png', alt: 'Lumea Monatsglas auf hellem Naturstein im warmen Sonnenlicht', label: 'Produkt ansehen', type: 'photo' },
  { src: '/images/lumea-info-ingredients-v3.png', alt: 'Vier Inhaltsstoffe pro Kapsel: Traubensilberkerzen-Extrakt 6,5 mg, Vitamin B6 1,4 mg, Vitamin D3 20 µg und Magnesium 150 mg', label: 'Grafik zu den Inhaltsstoffen ansehen', type: 'infographic' },
  { src: '/images/lumea-info-routine-v3.png', alt: 'Deine Routine: eine Kapsel am Tag, vier ausgewählte Inhaltsstoffe, 30 Kapseln pro Glas, vegan und ohne zugesetzte Hormone', label: 'Grafik zur täglichen Routine ansehen', type: 'infographic' },
  { src: '/images/lumea-info-subscription-v3.png', alt: 'Lumea Monatsabo: erster Monat 14,50 Euro, danach 29 Euro monatlich, Versand in Deutschland inklusive, jederzeit kündbar und keine Mindestlaufzeit', label: 'Grafik zum Monatsabo ansehen', type: 'infographic' },
  { src: '/images/lumea-capsule.png', alt: 'Detailaufnahme einer hellbeigen Lumea Kapsel auf Naturstein', label: 'Kapsel ansehen', type: 'photo' },
  { src: '/images/lumea-botanical.png', alt: 'Zarte weiße Blüten der Traubensilberkerze im Sonnenlicht', label: 'Pflanzenmotiv ansehen', type: 'photo' },
  { src: '/images/lumea-portrait.png', alt: 'Frau in der Lebensmitte mit dunkelblondem Haar und cremefarbenem Pullover im warmen Abendlicht', label: 'Frauenporträt ansehen', type: 'photo' },
  { src: '/images/lumea-packshot.png', alt: 'Lumea Braunglas mit 30 Kapseln, cremefarbenem Etikett und goldenem Deckel', label: 'Verpackung ansehen', type: 'packshot' },
]

export function ProductGallery() {
  const [selected, setSelected] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const current = images[selected]
  return <section className="gallery" aria-label="Produktbilder">
    <div className="thumbnail-rail" aria-label="Bildauswahl">
      {images.map((image, index) => <button className={`thumbnail ${image.type} ${selected === index ? 'is-selected' : ''}`} key={image.src} onClick={() => setSelected(index)} aria-label={image.label} aria-pressed={selected === index}><img src={image.src} alt="" loading={index ? 'lazy' : 'eager'} /></button>)}
    </div>
    <div className={`gallery-main ${current.type}`}>
      <button className="gallery-image-button" onClick={() => setExpanded(true)} aria-label="Aktuelles Produktbild vergrößern"><img key={current.src} src={current.src} alt={current.alt} fetchPriority="high" /></button>
      <button className="image-zoom" aria-label="Aktuelles Produktbild vergrößern" onClick={() => setExpanded(true)}><Icon name="plus" /></button>
    </div>
    {expanded ? <ImageLightbox image={current} onClose={() => setExpanded(false)} onNext={() => setSelected((selected + 1) % images.length)} /> : null}
  </section>
}

function ImageLightbox({ image, onClose, onNext }: { image: typeof images[number]; onClose: () => void; onNext: () => void }) {
  return <Modal onClose={onClose} title="Produktbild" className="lightbox"><img className={`lightbox-image ${image.type}`} src={image.src} alt={image.alt} /><button className="lightbox-next button" onClick={onNext}>Nächstes Bild<Icon name="arrow" /></button></Modal>
}
