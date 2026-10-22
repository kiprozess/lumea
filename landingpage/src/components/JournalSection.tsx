import { useState } from 'react'
import { journalArticles } from '../data/journal'
import { Icon } from './Icon'
import { Modal } from './Modal'

export function JournalSection() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const activeArticle = journalArticles.find(article => article.id === activeId)
  return <>
    <section className="journal-section" id="journal" aria-labelledby="journal-heading">
      <div className="journal-inner">
        <div className="journal-heading">
          <div><p className="journal-eyebrow">DAS LUMEA JOURNAL</p><h2 id="journal-heading">Raum für dich.<br />Und neue Gedanken.</h2></div>
          <p>Impulse für deinen Alltag, ein Blick hinter die Kulissen und Wissen rund um deine Routine.</p>
        </div>
        <div className="journal-grid">{journalArticles.map(article => <article className={`journal-card journal-card-${article.id}`} key={article.id}>
          <div className="journal-image"><img src={article.image} alt={article.imageAlt} loading="lazy" /></div>
          <p className="journal-category">{article.category}</p>
          <h3>{'href' in article ? <a href={article.href}>{article.title}</a> : <button onClick={() => setActiveId(article.id)} aria-haspopup="dialog">{article.title}</button>}</h3>
          <p className="journal-excerpt">{article.excerpt}</p>
          <span className="journal-read" aria-hidden="true">Artikel lesen<Icon name="arrow" /></span>
        </article>)}</div>
      </div>
    </section>
    {activeArticle ? <Modal title={activeArticle.title} onClose={() => setActiveId(null)} className="journal-modal">
      <p className="modal-kicker">LUMEA JOURNAL · {activeArticle.category}</p>
      <h2>{activeArticle.title}</h2>
      <img className="journal-article-image" src={activeArticle.image} alt={activeArticle.imageAlt} />
      <p className="journal-article-intro">{activeArticle.introduction}</p>
      {activeArticle.sections.map(section => <section className="journal-article-section" key={section.title}><h3>{section.title}</h3><p>{section.text}</p></section>)}
      <button className="button button-outline journal-back" onClick={() => setActiveId(null)}>Zurück zum Journal<Icon name="arrow" /></button>
    </Modal> : null}
  </>
}
