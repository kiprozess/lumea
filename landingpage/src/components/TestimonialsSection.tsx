import { useEffect, useRef, useState } from 'react'
import { reviews } from '../data/reviews'
import { Icon } from './Icon'
import { Modal } from './Modal'
import { ReviewStars } from './ReviewStars'

function visibleCardCount() {
  return window.innerWidth <= 800 ? 1 : window.innerWidth <= 1200 ? 2 : 3
}

export function TestimonialsSection() {
  const track = useRef<HTMLUListElement>(null)
  const [visible, setVisible] = useState(visibleCardCount)
  const [active, setActive] = useState(0)
  const [showAll, setShowAll] = useState(false)
  const lastPage = reviews.length - visible

  useEffect(() => {
    const update = () => {
      const count = visibleCardCount()
      setVisible(count)
      setActive(current => Math.min(current, reviews.length - count))
    }
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  function goTo(index: number) {
    const list = track.current
    const card = list?.children[index] as HTMLElement | undefined
    const first = list?.children[0] as HTMLElement | undefined
    if (!list || !card || !first) return
    list.scrollTo({ left: card.offsetLeft - first.offsetLeft, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  }

  function updateActive() {
    const list = track.current
    const first = list?.children[0] as HTMLElement | undefined
    const second = list?.children[1] as HTMLElement | undefined
    if (!list || !first || !second) return
    setActive(Math.min(lastPage, Math.round(list.scrollLeft / (second.offsetLeft - first.offsetLeft))))
  }

  return <section className="testimonials-section" id="bewertungen" aria-labelledby="testimonials-heading">
    <div className="testimonials-layout">
      <div className="testimonials-carousel" role="region" aria-label="Fiktive Bewertungsbeispiele" aria-roledescription="Karussell">
        <ul className="testimonial-track" ref={track} onScroll={updateActive} onKeyDown={event => {
          if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault()
            goTo(Math.max(0, Math.min(lastPage, active + (event.key === 'ArrowRight' ? 1 : -1))))
          }
        }} id="testimonial-cards" tabIndex={0} aria-label="Bewertungskarten, mit den Pfeiltasten blättern">
          {reviews.map(review => <li className="testimonial-card" key={review.name}>
            <img className="testimonial-photo" src={review.image} alt={`KI-generiertes Porträt für das fiktive Beispiel von ${review.name}`} loading="lazy" />
            <div className="testimonial-card-body"><ReviewStars className="testimonial-stars" /><blockquote>„{review.story}“</blockquote><p className="testimonial-author">{review.name}<span>· {review.age} Jahre</span></p></div>
          </li>)}
        </ul>
        <div className="testimonial-controls">
          <button className="testimonial-arrow previous" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Vorherige Bewertungen" aria-controls="testimonial-cards"><Icon name="chevron" /></button>
          <div className="testimonial-dots" aria-label="Bewertungsauswahl">{Array.from({ length: lastPage + 1 }, (_, index) => <button key={index} className={active === index ? 'is-active' : ''} onClick={() => goTo(index)} aria-label={`Bewertungsgruppe ${index + 1} anzeigen`} aria-current={active === index ? 'true' : undefined} aria-controls="testimonial-cards" />)}</div>
          <button className="testimonial-arrow" onClick={() => goTo(active + 1)} disabled={active === lastPage} aria-label="Weitere Bewertungen" aria-controls="testimonial-cards"><Icon name="chevron" /></button>
        </div>
        <p className="sr-only" role="status" aria-atomic="true">Beispiele {active + 1} bis {active + visible} von {reviews.length}</p>
      </div>
      <div className="testimonials-copy">
        <p className="testimonials-eyebrow">BEISPIELBEWERTUNGEN · FIKTIV</p>
        <h2 id="testimonials-heading">Was unsere<br />Kundinnen sagen.</h2>
        <p className="testimonials-description">Von einer Kapsel am Tag bis zum flexiblen Abo: vier fiktive Perspektiven auf eine kleine Routine im Alltag.</p>
        <div className="testimonial-rating"><ReviewStars className="rating-stars" /><strong>5 von 5</strong></div>
        <p className="testimonials-disclaimer">Fiktive Beispielwertung. Bilder, Namen und Aussagen sind erfunden.</p>
        <button className="button button-outline testimonials-all" onClick={() => setShowAll(true)}>Alle Beispiele ansehen<Icon name="arrow" /></button>
      </div>
    </div>
    {showAll ? <Modal title="Alle fiktiven Beispielbewertungen" onClose={() => setShowAll(false)} className="all-testimonials"><p className="modal-kicker">BEISPIELBEWERTUNGEN · FIKTIV</p><h2>Vier Stimmen.<br />Eine kleine Routine.</h2><p>Die folgenden Bilder, Namen, Sterne und Aussagen sind fiktive Designbeispiele.</p><ul className="all-testimonials-list">{reviews.map(review => <li key={review.name}><img src={review.image} alt="" loading="lazy" /><div><ReviewStars /><h3>{review.name} · {review.age} Jahre</h3><blockquote>„{review.story}“</blockquote></div></li>)}</ul></Modal> : null}
  </section>
}
