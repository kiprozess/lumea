import { founders, founderQuote, founderStory } from '../data/founders'

export function FoundersSection() {
  return <section className="founders-section" id="ueber-uns" aria-labelledby="founders-heading">
    <div className="founders-layout">
      <div className="founders-copy">
        <p className="founders-eyebrow">DIE FRAUEN HINTER LUMEA</p>
        <h2 id="founders-heading">Zwei Frauen.<br />Eine gemeinsame Idee.</h2>
        <div className="founders-story">{founderStory.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
        <blockquote>„{founderQuote}“</blockquote>
        <p className="founders-signature" aria-hidden="true">Katharina & Miriam</p>
      </div>
      <figure className="founders-portrait">
        <img src="/images/lumea-founders-product.png" alt="Katharina, links, und Miriam sitzen gemeinsam an einem Holztisch mit einem Lumea-Glas vor ihnen" width="1448" height="1086" loading="lazy" />
        <figcaption>{founders.map(founder => <div key={founder.name}><p>{founder.name}<span> · {founder.age} Jahre</span></p><span>{founder.role}</span></div>)}</figcaption>
      </figure>
    </div>
  </section>
}
