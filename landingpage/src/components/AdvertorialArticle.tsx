import { siteUrl } from '../lib/siteUrl'
import { Icon } from './Icon'
import { ingredients } from '../data/ingredients'

const benefits = [
  { id: 'magnesium', heading: 'Magnesium: Müdigkeit & Muskelfunktion', text: 'Magnesium trägt zur Verringerung von Müdigkeit und Ermüdung sowie zu einer normalen Muskelfunktion bei.' },
  { id: 'b6', heading: 'Vitamin B6: Hormontätigkeit', text: 'Vitamin B6 trägt zur Regulierung der Hormontätigkeit bei.' },
  { id: 'd3', heading: 'Vitamin D3: normale Knochen', text: 'Vitamin D unterstützt den Erhalt normaler Knochen.' },
]
const sources = [
  { title: 'IQWiG: Wechseljahrsbeschwerden – Symptome, Verlauf und Behandlung', url: 'https://www.gesundheitsinformation.de/wechseljahrsbeschwerden.html' },
  { title: 'IQWiG: Wohlbefinden in den Wechseljahren – Schlaf, Müdigkeit und Alltag', url: 'https://www.gesundheitsinformation.de/wohlbefinden-in-den-wechseljahren.html' },
  { title: 'HWR Berlin: MenoSupport – Befragung von 2.119 berufstätigen Frauen, 2023', url: 'https://www.hwr-berlin.de/aktuelles/neuigkeit/detail/3731-menosupport-wechseljahresbeschwerden-am-arbeitsplatz' },
  { title: 'Verordnung (EU) Nr. 432/2012: zugelassene gesundheitsbezogene Angaben zu Nährstoffen', url: 'https://www.verbrauchergesundheit.gv.at/dam/jcr:3a4f95a9-7a36-4987-8f1b-bfda1dc8798c/VO_EU_2012_432.pdf' },
  { title: 'EMA: Cimicifugae rhizoma – Bewertung bestimmter Traubensilberkerzen-Arzneimittel', url: 'https://www.ema.europa.eu/en/medicines/herbal/cimicifugae-rhizoma' },
  { title: 'BfR: Fragen und Antworten zu Nahrungsergänzungsmitteln', url: 'https://www.bfr.bund.de/veroeffentlichung/fragen-und-antworten-zu-nahrungsergaenzungsmitteln/' },
]

function SourceRef({ number }: { number: number }) {
  return <a className="adv-source-ref" href={'#quelle-' + number} aria-label={'Quelle ' + number}>[{number}]</a>
}

export function AdvertorialArticle() {
  return <article className="adv-article" aria-label="Wechseljahre, Müdigkeit und die Rolle von Nährstoffen">
    <section id="lebensphase" className="adv-chapter">
      <p className="adv-eyebrow">KAPITEL 01 · DEINE NÄCHSTE LEBENSPHASE</p>
      <h2>Vieles verändert sich. Du darfst an dich denken.</h2>
      <p>Nachts wachliegen, morgens schon müde sein und trotzdem im Beruf oder für die Familie funktionieren: Die Belastung endet nicht immer mit dem Aufstehen. Nächtliche Hitzewallungen und Schweißausbrüche können den Schlaf unterbrechen. Weniger Erholung kann sich am nächsten Tag als Müdigkeit oder als Schwierigkeit bemerkbar machen, sich zu konzentrieren. <SourceRef number={2} /></p>
      <p>In den Wechseljahren verändert sich das Zusammenspiel der Hormone. Hitzewallungen, Schlafprobleme und veränderte Blutungen können dazugehören. Wie stark diese Zeit belastet, ist von Frau zu Frau verschieden. Die letzte Regelblutung liegt im Durchschnitt etwa im Alter von 51 Jahren. <SourceRef number={1} /></p>
      <div className="adv-research-note"><p className="adv-eyebrow">DU BIST MIT DEINEN FRAGEN NICHT ALLEIN</p><p>Auch die deutsche MenoSupport-Befragung von <strong>2.119 berufstätigen Frauen</strong> zeigt, wie präsent Themen wie Erschöpfung und Schlaf in dieser Lebensphase sein können. Die Erfahrungen der Teilnehmerinnen machen deutlich: Die eigenen Bedürfnisse verdienen Aufmerksamkeit. <SourceRef number={3} /></p><small>Die Befragung beschreibt die Erfahrungen der Teilnehmerinnen.</small></div>
      <p>Genau hier beginnt ein bewusster Umgang mit der neuen Lebensphase: den eigenen Körper besser verstehen, sich Raum für Erholung nehmen und die Nährstoffversorgung im Blick behalten. Lumea macht den letzten Schritt mit einer übersichtlichen Rezeptur besonders unkompliziert.</p>
    </section>

    <section id="routine" className="adv-chapter">
      <p className="adv-eyebrow">KAPITEL 02 · DER SINNVOLLE ERSTE SCHRITT</p>
      <h2>Gut für dich sorgen darf einfach sein.</h2>
      <p>Zwischen Beruf, Familie und den eigenen Plänen bleibt oft wenig Zeit, sich ausführlich mit Nährstoffen zu beschäftigen. Umso hilfreicher sind klare Informationen und eine Routine, die sich gut in deinen Tag einfügt.</p>
      <p>Drei Dinge helfen dir dabei, deine persönliche Unterstützung bewusst zu gestalten:</p>
      <ol className="adv-routine-list">
        <li><span>01</span><div><h3>Deine Bedürfnisse ernst nehmen.</h3><p>Was tut dir gut, wann brauchst du eine Pause und welche Veränderungen beschäftigen dich? Bewusst hinzuschauen ist ein guter Ausgangspunkt für Entscheidungen, die zu dir passen.</p></div></li>
        <li><span>02</span><div><h3>Eine gute Grundlage schaffen.</h3><p>Eine abwechslungsreiche Ernährung, Bewegung und Erholung gehören zusammen. Eine gezielte Nährstoffergänzung kann diese Grundlage je nach persönlicher Versorgung ergänzen. <SourceRef number={6} /></p></div></li>
        <li><span>03</span><div><h3>Auf eine verständliche Rezeptur setzen.</h3><p>Wenige klar benannte Inhaltsstoffe, transparente Mengen und eine einfache Tagesportion: So weißt du, wofür du dich entscheidest. Diese Übersicht steht bei Lumea im Mittelpunkt.</p></div></li>
      </ol>
    </section>

    <section id="bewusst-waehlen" className="adv-chapter">
      <p className="adv-eyebrow">KAPITEL 03 · DIE ROLLE DER NÄHRSTOFFE</p>
      <h2>Drei Nährstoffe, die deinen Körper unterstützen.</h2>
      <p>Lumea kombiniert Magnesium, Vitamin B6 und Vitamin D3. Jeder dieser Nährstoffe übernimmt wichtige Aufgaben im Körper – von der Verringerung von Müdigkeit bis zum Erhalt normaler Knochen. Die folgenden Funktionen sind durch zugelassene EU-Nährstoffangaben beschrieben: <SourceRef number={4} /></p>
      <div className="adv-nutrient-benefits">{benefits.map(benefit => {
        const ingredient = ingredients.find(item => item.id === benefit.id)!
        return <section key={benefit.id}><img src={ingredient.image} alt="" width="64" height="64" loading="lazy" /><div><h3>{benefit.heading}</h3><p>{benefit.text}</p><span>{ingredient.amount} pro Kapsel</span></div></section>
      })}</div>
      <div className="adv-editorial-note"><Icon name="leaf" /><p>Besonders interessant für deinen Alltag: Magnesium trägt zur Verringerung von Müdigkeit und Ermüdung bei, während Vitamin B6 die Regulierung der Hormontätigkeit unterstützt.</p></div>
      <p>Mit Lumea findest du diese Nährstoffe in einer gemeinsamen Tagesportion. Das macht deine Ergänzung übersichtlich und lässt dir mehr Zeit für die Dinge, die dir wichtig sind.</p>
    </section>

    <section id="lumea-entdecken" className="adv-chapter">
      <p className="adv-eyebrow">KAPITEL 04 · DIE LÖSUNG VON LUMEA</p>
      <h2>Deine Nährstoffroutine. In einer Kapsel.</h2>
      <p>Lumea wurde als unkomplizierte Ergänzung für Frauen in der Lebensmitte konzipiert: Vitamin B6, Vitamin D3 und Magnesium treffen auf Traubensilberkerzen-Extrakt. Vier ausgewählte Inhaltsstoffe, vereint in einer Kapsel am Tag.</p>
      <p>Vegan, ohne zugesetzte Hormone und mit transparenten Mengen pro Tagesportion. Jedes Glas enthält 30 Kapseln – für eine Routine, die sich einfach planen lässt.</p>
      <dl className="adv-ingredients">{ingredients.map(item => <div key={item.id}><dt>{item.label}</dt><dd>{item.amount}</dd></div>)}</dl>
      <p>Du musst dir keine einzelnen Nährstoffprodukte zusammenstellen und behältst Zusammensetzung und Kosten im Blick. Lumea verbindet eine einfache Einnahme mit einer klaren Idee: bewusst für dich sorgen, jeden Tag.</p>
      <details className="adv-evidence-detail"><summary>Mehr zur Traubensilberkerze und zur Einordnung der Rezeptur<Icon name="chevron" /></summary><div><p>Traubensilberkerze ist eine Pflanze mit langer Verwendung im Bereich der Frauengesundheit. Die EMA bewertet bestimmte standardisierte Arzneimittel aus ihrer Wurzel für Wechseljahrsbeschwerden. Diese Bewertung ist an die jeweiligen Extrakte gebunden und lässt sich nicht auf jede Rezeptur übertragen. <SourceRef number={5} /></p><p>Lumea ist eine Nahrungsergänzung. Die hier beschriebenen Nährstofffunktionen beziehen sich auf Magnesium, Vitamin B6 und Vitamin D3; ein produktspezifischer Nachweis zur Behandlung von Hitzewallungen oder Schlafstörungen liegt für Lumea nicht vor.</p></div></details>
      <a className="adv-text-link" href={siteUrl('/#inhaltsstoffe')}>Die Lumea-Inhaltsstoffe im Detail ansehen<Icon name="arrow" /></a>
    </section>

    <section id="fragen-zur-einnahme" className="adv-chapter">
      <p className="adv-eyebrow">KAPITEL 05 · DEIN EINSTIEG MIT LUMEA</p>
      <h2>Einfach starten. Flexibel bleiben.</h2>
      <div className="adv-reader-questions">
        <section><h3>Was macht Lumea im Alltag praktisch?</h3><p>Eine Kapsel am Tag kombiniert vier Inhaltsstoffe. Mit 30 Kapseln pro Glas und der monatlichen Lieferung lässt sich deine Nährstoffroutine unkompliziert organisieren.</p></section>
        <section><h3>Passt Lumea zu einer veganen Ernährung?</h3><p>Ja, die Rezeptur ist vegan und enthält keine zugesetzten Hormone. Die enthaltenen Nährstoffe und ihre Mengen findest du transparent in der Übersicht.</p></section>
        <section><h3>Wie starte ich mit dem Monatsabo?</h3><p>Der erste Monat kostet 14,50 €, danach 29 € monatlich. Der Versand innerhalb Deutschlands ist inklusive. Es gibt keine Mindestlaufzeit, und du kannst jederzeit kündigen.</p></section>
        <section><h3>Wie bleibe ich flexibel?</h3><p>Du entscheidest selbst, wie lange du Lumea nutzen möchtest. Das kündbare Monatsabo macht deine regelmäßige Ergänzung planbar, ohne dich langfristig zu binden.</p></section>
      </div>
      <p>Entdecke Lumea als bewusste Ergänzung für deine nächste Lebensphase: mit ausgewählten Nährstoffen, einer einfachen Tagesportion und einem Einstieg zum Vorteilspreis.</p>
      <details className="adv-evidence-detail"><summary>Hinweise zur persönlichen Einnahme<Icon name="chevron" /></summary><div><p>Eine Ergänzung richtet sich nach deiner individuellen Versorgung und ersetzt keine ausgewogene Ernährung. Neue, starke oder anhaltende Beschwerden solltest du ärztlich abklären. Wenn du Medikamente einnimmst oder eine Lebererkrankung hast, besprich die Einnahme vorher mit deiner Arztpraxis oder Apotheke. Lumea ist kein Ersatz für eine medizinische Behandlung oder Hormontherapie. <SourceRef number={5} /> <SourceRef number={6} /></p></div></details>
    </section>
  </article>
}

export function AdvertorialSources() {
  return <section className="adv-sources" aria-labelledby="adv-sources-heading"><h2 id="adv-sources-heading">Quellen & Einordnung</h2><ol>{sources.map((source, index) => <li key={source.url} id={'quelle-' + (index + 1)}><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a></li>)}</ol><p>Recherchestand: 22. Oktober 2026. Die Quellen belegen die jeweils zugeordneten Informationen zu Beschwerden, Nährstofffunktionen oder Arzneimitteln; sie stellen keine Empfehlung oder Prüfung von Lumea dar. Dieser Beitrag ist Werbung für Lumea und ersetzt keine medizinische Beratung. Lumea ist ein fiktives Produkt im Design- und Bestellprototyp. Es wird keine Zahlung ausgelöst und kein Abo abgeschlossen.</p></section>
}
