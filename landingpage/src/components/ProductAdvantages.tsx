import { Icon } from './Icon'

const advantages = [
  { icon: 'leaf', title: <>Vier ausgewählte<br />Inhaltsstoffe</>, text: <>Traubensilberkerze, Vitamin B6,<br />Vitamin D3 und Magnesium.</> },
  { icon: 'balance', title: <>Einfach in deinem<br />Alltag</>, text: <>Eine Kapsel am Tag.<br />Deine tägliche Routine.</> },
  { icon: 'lotus', title: <>Vegan & ohne<br />zugesetzte Hormone</>, text: <>Pflanzlicher Extrakt kombiniert<br />mit ausgewählten Nährstoffen.</> },
  { icon: 'diamond', title: <>Hergestellt in<br />Deutschland</>, text: <>Entwickelt von Lumea<br />in Berlin.</> },
] as const

export function ProductAdvantages() {
  return <section className="product-advantages" aria-label="Lumea auf einen Blick">
    <ul className="advantages-grid">{advantages.map(advantage => <li className="advantage" key={advantage.icon}>
      <Icon name={advantage.icon} />
      <h2>{advantage.title}</h2>
      <p>{advantage.text}</p>
    </li>)}</ul>
  </section>
}
