import { siteUrl } from '../lib/siteUrl'
import { Icon } from './Icon'

export function LifePhaseIntro() {
  return <section className="life-phase" aria-labelledby="life-phase-heading">
    <div className="life-phase-copy">
      <p className="life-phase-eyebrow">WEITER DU</p>
      <h2 id="life-phase-heading">Für deine nächste<br />Lebensphase.</h2>
      <p className="life-phase-description">Dein Alltag verändert sich. Deine Bedürfnisse auch. In deiner nächsten Lebensphase darf Raum sein für das, was zu dir passt.</p>
      <p className="life-phase-description">Lumea ist für eine kleine, unkomplizierte Routine gedacht: eine Kapsel am Tag, mit klar benannten Inhaltsstoffen.</p>
      <a className="button button-outline" href="#inhaltsstoffe">Lumea kennenlernen<Icon name="arrow" /></a>
      <p className="life-phase-note">Eine ausgewogene, abwechslungsreiche Ernährung und eine gesunde Lebensweise sind wichtig. Nahrungsergänzungsmittel sind dafür kein Ersatz.</p>
    </div>
    <div className="life-phase-portrait">
      <img src={siteUrl('/images/lumea-portrait.png')} alt="Frau im cremefarbenen Strickpullover blickt entspannt in das warme Abendlicht" loading="lazy" />
      <span className="life-phase-signature" aria-hidden="true">Weiter du.</span>
    </div>
  </section>
}
