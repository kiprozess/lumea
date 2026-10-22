import { useState } from 'react'
import { Icon } from './Icon'

const usps = [
  { icon: 'truck', text: 'Kostenloser Versand in Deutschland' },
  { icon: 'shield', text: 'Jederzeit kündbar' },
  { icon: 'lock', text: 'Sichere Zahlung' },
] as const

export function UspSlider() {
  const [paused, setPaused] = useState(false)
  return <div className="announcement-bar">
    <span className="sr-only">{usps.map(usp => usp.text).join('. ')}.</span>
    <div className={`usp-slider ${paused ? 'is-paused' : ''}`} aria-hidden="true">
      <div className="usp-track">
        {[...usps, usps[0]].map((usp, index) => <span className="usp-slide" key={`${usp.icon}-${index}`}><Icon name={usp.icon} />{usp.text}</span>)}
      </div>
    </div>
    <button className="icon-button usp-pause" onClick={() => setPaused(!paused)} aria-label={paused ? 'USP-Wechsel fortsetzen' : 'USP-Wechsel pausieren'} aria-pressed={paused}><Icon name={paused ? 'play' : 'pause'} /></button>
  </div>
}
