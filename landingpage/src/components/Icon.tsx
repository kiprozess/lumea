import type { ReactNode } from 'react'

type IconName = 'truck' | 'shield' | 'lock' | 'search' | 'user' | 'bag' | 'cart' | 'check' | 'arrow' | 'close' | 'menu' | 'plus' | 'pause' | 'play' | 'star' | 'leaf' | 'balance' | 'lotus' | 'diamond' | 'chevron' | 'package' | 'calendar'
const paths: Record<IconName, ReactNode> = {
  truck: <><path d="M3 6h11v12H3zM14 10h4l3 4v4h-7" /><circle cx="7" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></>,
  shield: <><path d="M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6z" /><path d="m8.5 12 2.3 2.3 4.7-5" /></>,
  lock: <><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" /></>,
  search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></>,
  user: <><circle cx="12" cy="7" r="4" /><path d="M4 21v-2a8 8 0 0 1 16 0v2z" /></>,
  bag: <><path d="M5 8h14l1 13H4zM9 9V6a3 3 0 0 1 6 0v3" /></>,
  package: <><path d="m12 2 9 5v10l-9 5-9-5V7l9-5Zm0 10L3 7m9 5 9-5m-9 5v10M7.5 4.5l9 5v5" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 2v6m10-6v6M3 10h18M7 14h.01M12 14h.01M17 14h.01M7 18h.01M12 18h.01M17 18h.01" /></>,
  cart: <><path d="M2 3h3l3 13h11l3-10H6" /><circle cx="9" cy="20" r="1" /><circle cx="18" cy="20" r="1" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
  chevron: <path d="m9 5 7 7-7 7" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  plus: <path d="M12 5v14M5 12h14" />,
  pause: <path d="M9 5v14M15 5v14" />,
  play: <path d="m8 5 11 7-11 7z" />,
  star: <path d="m12 3 2.8 5.7 6.3.9-4.6 4.4 1.1 6.3-5.6-3-5.6 3 1.1-6.3L2.9 9.6l6.3-.9z" />,
  leaf: <><path d="M5 21C2 11 7 5 20 2c1 12-3 20-15 19Z" /><path d="M5 21c2-5 5-10 9-13" /></>,
  balance: <><path d="M12 2v20M7 22h10M3 5h18M6 5l-3 8h6L6 5Zm12 0-3 8h6l-3-8Z" /><path d="M3 13a3 3 0 0 0 6 0m6 0a3 3 0 0 0 6 0" /></>,
  lotus: <><path d="M12 3c-5 5-5 10 0 17 5-7 5-12 0-17Z" /><path d="M8.5 8C6.7 6.8 5.5 6.2 4 6c-.7 6 1 11 8 14M15.5 8c1.8-1.2 3-1.8 4.5-2 .7 6-1 11-8 14M4 11l-3-1c.8 7 4.2 10 11 10 6.8 0 10.2-3 11-10l-3 1" /></>,
  diamond: <><path d="m2 9 5-6h10l5 6-10 13L2 9Zm0 0h20M7 3l5 19 5-19M7 3l5 6 5-6" /></>,
}
export function Icon({ name, className = '' }: { name: IconName; className?: string }) {
  return <svg className={`icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}
