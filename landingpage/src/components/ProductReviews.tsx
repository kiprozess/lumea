import { useId } from 'react'
import { reviews } from '../data/reviews'
import { ReviewStars } from './ReviewStars'

export function ProductReviews() {
  const headingId = useId()
  return <section className="product-reviews" aria-labelledby={headingId}>
    <h2 id={headingId}>Beispielbewertungen <span>· fiktiv</span></h2>
    <ul className="review-list">{reviews.slice(0, 3).map(review => <li className="review" key={review.name}>
      <img className="review-avatar" src={review.image} alt="" width="38" height="38" loading="lazy" />
      <div className="review-content">
        <div className="review-meta"><ReviewStars /><span className="review-name">{review.name}</span></div>
        <blockquote>„{review.text}“</blockquote>
      </div>
    </li>)}</ul>
  </section>
}
