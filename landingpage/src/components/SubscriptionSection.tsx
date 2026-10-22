import { Icon } from './Icon'

const steps = [
  { icon: 'package', title: 'Erster Monat nur 14,50 €', text: 'Danach 29 € monatlich. Dein Abo wird monatlich automatisch abgerechnet.' },
  { icon: 'truck', title: 'Monatliche Lieferung', text: '30 Kapseln pro Lieferung – Versand innerhalb Deutschlands inklusive.' },
  { icon: 'calendar', title: 'Jederzeit kündbar', text: 'Keine Mindestlaufzeit. Du entscheidest, wie lange du Lumea nutzen möchtest.' },
] as const

export function SubscriptionSection({ onSubscribe }: { onSubscribe: () => void }) {
  return <section className="subscription-section" id="abo" aria-labelledby="subscription-heading">
    <div className="subscription-layout">
      <div className="subscription-copy">
        <p className="subscription-eyebrow">DEIN LUMEA ABO</p>
        <h2 id="subscription-heading">Einfach starten.<br />Flexibel bleiben.</h2>
        <p className="subscription-description">Lumea im Monatsabo – bequem zu dir nach Hause, mit voller Flexibilität.</p>
        <ul className="subscription-steps">{steps.map(step => <li key={step.icon}>
          <span className="subscription-step-icon"><Icon name={step.icon} /></span>
          <div><h3>{step.title}</h3><p>{step.text}</p></div>
        </li>)}</ul>
        <button className="button subscription-start" onClick={onSubscribe}>Jetzt mit 14,50 € starten<Icon name="arrow" /></button>
        <p className="subscription-payment-note">Inkl. MwSt. & Versand. Monatliche Abbuchung per Kreditkarte oder PayPal.</p>
        <div className="purchase-assurances subscription-trust"><span><Icon name="truck" />Versand inklusive</span><span><Icon name="shield" />Jederzeit kündbar</span><span><Icon name="lock" />Sichere Zahlung</span></div>
      </div>
      <div className="subscription-product">
        <img src="/images/lumea-subscription-stone.png" alt="Lumea Monatsglas mit goldenem Deckel und zwei Kapseln auf hellem Travertin vor weißem Hintergrund" loading="lazy" />
      </div>
    </div>
  </section>
}
