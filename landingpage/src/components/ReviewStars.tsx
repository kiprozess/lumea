import { Icon } from './Icon'

export function ReviewStars({ className = '' }: { className?: string }) {
  return <span className={`review-stars ${className}`} role="img" aria-label="5 von 5 Sternen, fiktive Bewertung">{Array.from({ length: 5 }, (_, index) => <Icon name="star" key={index} />)}</span>
}
