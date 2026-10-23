import { siteUrl } from '../lib/siteUrl'
import { ingredients } from '../data/ingredients'

export function IngredientsSection() {
  return <section id="inhaltsstoffe" className="ingredients-section" aria-labelledby="ingredients-heading">
    <div className="ingredients-botanical">
      <img src={siteUrl('/images/lumea-botanical.webp')} alt="Weiße Blütenstände der Traubensilberkerze im warmen Sonnenlicht" loading="lazy" />
    </div>
    <div className="ingredients-copy">
      <p className="ingredients-eyebrow">PFLANZE TRIFFT NÄHRSTOFFE</p>
      <h2 id="ingredients-heading">Sorgfältig ausgewählte<br />Inhaltsstoffe.</h2>
      <p className="ingredients-description">Lumea vereint Traubensilberkerzen-Extrakt und drei ausgewählte Nährstoffe in einer täglichen Kapsel – für deine nächste Lebensphase.</p>
      <ul className="ingredient-details" aria-label="Inhaltsstoffe und Mengen pro Kapsel">
        {ingredients.map(ingredient => <li className="ingredient-detail" key={ingredient.id}>
          <img src={ingredient.image} alt="" width="88" height="88" loading="lazy" />
          <div className="ingredient-detail-text"><h3>{ingredient.name}</h3><p>{ingredient.description}</p></div>
          <div className="ingredient-amount"><strong>{ingredient.amount}</strong><span>pro Kapsel</span></div>
        </li>)}
      </ul>
      <p className="ingredients-note">Angaben pro Tagesportion (1 Kapsel). Nahrungsergänzungsmittel ersetzen keine ausgewogene, abwechslungsreiche Ernährung und gesunde Lebensweise.</p>
    </div>
  </section>
}
