import { useState } from 'react'
import { Icon } from './Icon'
import { Modal } from './Modal'

const questions = [
  { question: 'Wie funktioniert das Lumea Monatsabo?', answer: 'Du erhältst jeden Monat ein Glas mit 30 Kapseln. Der erste Monat kostet 14,50 €, danach 29 € monatlich. Der Versand innerhalb Deutschlands ist inklusive. Die Abbuchung erfolgt automatisch per Kreditkarte oder PayPal.' },
  { question: 'Kann ich mein Abo jederzeit kündigen?', answer: 'Ja, das Monatsabo ist jederzeit kündbar und hat keine Mindestlaufzeit. Du entscheidest, wie lange du Lumea nutzen möchtest. Im Designprototyp werden keine aktiven Abonnements abgeschlossen.' },
  { question: 'Wie nehme ich Lumea ein?', answer: 'Die vorgesehene Tagesportion ist eine Kapsel. Ein Glas enthält 30 Kapseln für 30 Tage. Bitte beachte die Verzehrempfehlung auf der Verpackung; die empfohlene Tagesportion darf nicht überschritten werden. Bei Fragen zur persönlichen Einnahme hilft deine Arztpraxis oder Apotheke.' },
  { question: 'Welche Inhaltsstoffe sind in Lumea enthalten?', answer: 'Eine Kapsel enthält 6,5 mg Traubensilberkerzen-Extrakt, 1,4 mg Vitamin B6, 20 µg Vitamin D3 und 150 mg Magnesium.', link: { href: '#inhaltsstoffe', label: 'Alle Inhaltsstoffe entdecken' } },
  { question: 'Ist Lumea vegan und ohne zugesetzte Hormone?', answer: 'Ja, die Lumea-Rezeptur ist vegan und enthält keine zugesetzten Hormone. Die vier ausgewählten Inhaltsstoffe und ihre Mengen findest du in unserer Inhaltsstoffübersicht.' },
  { question: 'Ab wann kann ich eine Veränderung spüren?', answer: 'Ein bestimmtes Ergebnis oder ein fester Zeitpunkt lässt sich nicht zusagen. Lumea ist ein Nahrungsergänzungsmittel und kein Arzneimittel. Bei Beschwerden oder Fragen zu deiner individuellen Situation wende dich an deine Ärztin oder deinen Arzt.' },
  { question: 'Kann ich Lumea zusammen mit Medikamenten einnehmen?', answer: 'Bitte kläre die gemeinsame Einnahme vorher mit deiner Ärztin, deinem Arzt oder deiner Apotheke. Nahrungsergänzungsmittel können Wechselwirkungen mit Medikamenten haben.', link: { href: 'https://www.bfr.bund.de/veroeffentlichung/fragen-und-antworten-zu-nahrungsergaenzungsmitteln/', label: 'Mehr Informationen beim BfR' } },
  { question: 'Wird Lumea in Deutschland hergestellt?', answer: 'Ja, für das Lumea-Produktkonzept ist die Herstellung in Deutschland vorgesehen. Ein Glas enthält 30 Kapseln für deine tägliche Routine.' },
]

const moreQuestions = [
  { question: 'Was enthält eine Lieferung?', answer: 'Deine monatliche Lieferung umfasst ein Lumea-Glas mit 30 Kapseln. Der Versand innerhalb Deutschlands ist im monatlichen Preis enthalten.' },
  { question: 'Welche Zahlungsmöglichkeiten gibt es?', answer: 'Für das Monatsabo sind Kreditkarte und PayPal vorgesehen. Die Abrechnung erfolgt monatlich automatisch: 14,50 € im ersten Monat, danach 29 € pro Monat.' },
  { question: 'Kann ich hier schon bestellen?', answer: 'Die Website ist ein Design- und Bestellprototyp für ein fiktives Produkt. Die Abo-Buttons öffnen eine Bestellvorschau. Es wird keine Zahlung ausgelöst und kein Abonnement abgeschlossen.' },
]

export function FaqSection() {
  const [showMore, setShowMore] = useState(false)
  return <>
    <section className="faq-section" id="faq" aria-labelledby="faq-heading">
      <div className="faq-layout">
        <div className="faq-intro">
          <div className="faq-copy">
            <p className="faq-eyebrow">HÄUFIGE FRAGEN</p>
            <h2 id="faq-heading">Alles, was du<br />wissen möchtest.</h2>
            <p className="faq-description">Hier findest du Antworten auf die häufigsten Fragen zu Lumea, unseren Inhaltsstoffen und dem Monatsabo.</p>
            <button className="button button-outline faq-more" onClick={() => setShowMore(true)}>Weitere Fragen<Icon name="arrow" /></button>
          </div>
        </div>
        <div className="faq-questions">{questions.map(item => <details className="faq-item" name="lumea-faq" key={item.question}>
          <summary><span>{item.question}</span><Icon name="chevron" /></summary>
          <div className="faq-answer"><p>{item.answer}</p>{item.link ? <a href={item.link.href}>{item.link.label}<Icon name="arrow" /></a> : null}</div>
        </details>)}</div>
      </div>
    </section>
    {showMore ? <Modal title="Weitere Fragen zu Lumea" onClose={() => setShowMore(false)}>
      <p className="modal-kicker">GUT ZU WISSEN</p>
      <h2>Weitere Fragen zu Lumea.</h2>
      {moreQuestions.map(item => <div className="faq-extra" key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></div>)}
    </Modal> : null}
  </>
}
