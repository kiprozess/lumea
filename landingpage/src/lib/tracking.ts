import { appPath } from './siteUrl'
import { initializeGoogleConsent, loadGoogleTracking, trackGoogleEvent, updateGoogleConsent } from './googleTracking'

export const PIXEL_ID = '1234567890'
const CONSENT_KEY = 'lumea-consent-v2'
const ORDER_KEY = 'lumea-demo-order-v1'
export type Consent = 'accepted' | 'rejected' | 'analytics' | 'marketing'
type Pixel = ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void; queue: unknown[][]; push?: Pixel; loaded: boolean; version: string }
declare global { interface Window { fbq?: Pixel; _fbq?: Pixel } }
export type DemoOrder = { id: string; createdAt: string; payment: 'card' | 'paypal'; marketing: boolean; purchaseSent: boolean; analytics: boolean; analyticsPurchaseSent: boolean }
let initialized = false
const sent = new Set<string>()
const googleSent = new Set<string>()
const commerceRoutes = ['/', '/bestellung', '/danke']
const product = { content_ids: ['LUMEA-30'], content_type: 'product', value: 14.5, currency: 'EUR' }
function cleanTrackingUrl() {
  const clickId = new URLSearchParams(location.search).get('fbclid')
  const query = clickId && /^[A-Za-z0-9_-]{10,512}$/.test(clickId) ? '?fbclid=' + encodeURIComponent(clickId) : ''
  const clean = location.pathname + query
  if (location.pathname + location.search + location.hash !== clean) history.replaceState(history.state, '', clean)
}

export function getConsent(): Consent | null {
  try {
    const value = JSON.parse(localStorage.getItem(CONSENT_KEY) || 'null')
    return value?.version === 2 && value.expires > Date.now() && ['accepted', 'rejected', 'analytics', 'marketing'].includes(value.choice) ? value.choice : null
  } catch { return null }
}
export function saveConsent(choice: Consent) {
  try { localStorage.setItem(CONSENT_KEY, JSON.stringify({ version: 2, choice, expires: Date.now() + 180 * 86400000 })) } catch { /* Preference remains in memory for this page. */ }
  consentInMemory = choice
  if (!hasMarketingConsent()) {
    window.fbq?.('consent', 'revoke')
    // Discard queued pre-load calls if consent is withdrawn during the SDK download.
    if (window.fbq && !window.fbq.callMethod) window.fbq.queue = [['consent', 'revoke']]
    deleteCookies(['_fbp', '_fbc'])
  }
  if (!hasAnalyticsConsent()) {
    updateGoogleConsent(false)
    deleteCookies(document.cookie.split(';').map(cookie => cookie.trim().split('=')[0]).filter(name => name === '_ga' || name.startsWith('_ga_')))
  }
  startTracking()
  window.dispatchEvent(new Event('lumea-consent-change'))
}
function deleteCookies(names: string[]) {
    for (const name of names) {
      const labels = window.location.hostname.split('.')
      const domains = ['', ...labels.map((_, index) => labels.slice(index).join('.')).filter(domain => domain.includes('.')).flatMap(domain => [domain, '.' + domain])]
      for (const domain of domains) document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax${domain ? '; domain=' + domain : ''}`
    }
}
let consentInMemory: Consent | null = getConsent()
export function hasMarketingConsent() { return ['accepted', 'marketing'].includes(consentInMemory || '') && ['accepted', 'marketing'].includes(getConsent() || '') }
export function hasAnalyticsConsent() { return ['accepted', 'analytics'].includes(consentInMemory || '') && ['accepted', 'analytics'].includes(getConsent() || '') }

export function trackEvent(name: 'AddToCart' | 'InitiateCheckout' | 'AddPaymentInfo' | 'Purchase' | 'ViewContent' | 'PageView', key?: string, extra: Record<string, unknown> = {}, destination: 'all' | 'meta' | 'google' = 'all') {
  const path = appPath()
  if (!commerceRoutes.includes(path)) return false
  const metaAllowed = destination !== 'google' && hasMarketingConsent() && !!window.fbq && (!key || !sent.has(key))
  const googleAllowed = destination !== 'meta' && hasAnalyticsConsent() && (!key || !googleSent.has(key))
  if (!metaAllowed && !googleAllowed) return false
  const eventId = name === 'Purchase' && key ? key : crypto.randomUUID()
  cleanTrackingUrl()
  if (metaAllowed) {
    window.fbq?.('trackSingle', PIXEL_ID, name, name === 'PageView' ? {} : { ...product, ...extra }, { eventID: eventId })
    if (key) sent.add(key)
  }
  if (googleAllowed) {
    trackGoogleEvent(name, eventId)
    if (key) googleSent.add(key)
  }
  return true
}
export function readOrder(): DemoOrder | null {
  try {
    const order = JSON.parse(sessionStorage.getItem(ORDER_KEY) || 'null')
    return order && typeof order.id === 'string' && /^demo-[\w-]+$/.test(order.id) && typeof order.createdAt === 'string' && ['card', 'paypal'].includes(order.payment) && typeof order.marketing === 'boolean' && typeof order.purchaseSent === 'boolean' ? { ...order, analytics: order.analytics === true, analyticsPurchaseSent: order.analyticsPurchaseSent === true } : null
  } catch { return null }
}
export function storeOrder(order: DemoOrder) { sessionStorage.setItem(ORDER_KEY, JSON.stringify(order)) }
function trackCurrentPage() {
  trackEvent('PageView', 'page-' + window.location.pathname)
  const path = appPath()
  if (path === '/') trackEvent('ViewContent', 'product-view')
  if (path === '/bestellung') trackEvent('InitiateCheckout', 'checkout-start', { num_items: 1 })
  if (path === '/danke') {
    const order = readOrder()
    if (order) {
      if (order.marketing && !order.purchaseSent && trackEvent('Purchase', 'purchase-' + order.id, { num_items: 1 }, 'meta')) order.purchaseSent = true
      if (order.analytics && !order.analyticsPurchaseSent && trackEvent('Purchase', 'purchase-' + order.id, {}, 'google')) order.analyticsPurchaseSent = true
      storeOrder(order)
    }
  }
}
export function startTracking() {
  const path = appPath()
  initializeGoogleConsent()
  if (!commerceRoutes.includes(path)) return
  if (!hasMarketingConsent() && !hasAnalyticsConsent()) { updateGoogleConsent(false); return }
  // Retain only a validated Meta click ID for attribution; never arbitrary form/query data.
  const anchor = location.hash ? document.getElementById(location.hash.slice(1)) : null
  cleanTrackingUrl()
  anchor?.scrollIntoView({ behavior: 'instant' })
  updateGoogleConsent(hasAnalyticsConsent())
  if (hasAnalyticsConsent()) loadGoogleTracking()
  if (hasMarketingConsent() && !initialized) {
    const fbq: Pixel = Object.assign(function (...args: unknown[]) {
      if (fbq.callMethod) fbq.callMethod(...args)
      else fbq.queue.push(args)
    }, { queue: [] as unknown[][], loaded: true, version: '2.0' })
    fbq.push = fbq
    window.fbq = fbq
    window._fbq = fbq
    fbq('consent', 'grant')
    fbq('set', 'autoConfig', false, PIXEL_ID)
    fbq('init', PIXEL_ID) // No advanced matching or form fields.
    initialized = true
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://connect.facebook.net/en_US/fbevents.js'
    script.id = 'lumea-meta-pixel'
    document.head.appendChild(script)
  } else if (hasMarketingConsent()) window.fbq?.('consent', 'grant')
  trackCurrentPage()
}
