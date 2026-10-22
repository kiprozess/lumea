import { appPath } from './siteUrl'
export const GA4_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID || 'G-LUMEA0000'
export const GTM_ID = import.meta.env.VITE_GTM_CONTAINER_ID || 'GTM-LUMEA0000'
// The requested demo ID does not refer to a published container. Keep GA4 functional without it.
export const USE_GTM = /^GTM-[A-Z0-9]+$/.test(GTM_ID) && GTM_ID !== 'GTM-LUMEA0000'
declare global {
  interface Window { dataLayer: unknown[]; gtag?: (...args: unknown[]) => void }
}
let defaultsSet = false
let googleLoaded = false
let gtmLoaded = false
const denied = { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' }
const eventNames = { PageView: 'page_view', ViewContent: 'view_item', AddToCart: 'add_to_cart', InitiateCheckout: 'begin_checkout', AddPaymentInfo: 'add_payment_info', Purchase: 'purchase' } as const
type MetaEvent = keyof typeof eventNames

export function initializeGoogleConsent() {
  window.dataLayer = window.dataLayer || []
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments) }
  if (!defaultsSet) {
    window.gtag('consent', 'default', { ...denied, functionality_storage: 'granted', security_storage: 'granted' })
    window.gtag('set', 'ads_data_redaction', true)
    window.gtag('set', 'url_passthrough', false)
    defaultsSet = true
  }
}
export function updateGoogleConsent(analytics: boolean) {
  initializeGoogleConsent()
  Object.assign(window, { ['ga-disable-' + GA4_ID]: !analytics })
  window.gtag?.('consent', 'update', { ...denied, analytics_storage: analytics ? 'granted' : 'denied' })
}
export function loadGoogleTracking() {
  if (USE_GTM) {
    if (gtmLoaded) return
    gtmLoaded = true
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
    const script = document.createElement('script')
    script.async = true
    script.id = 'lumea-google-tag-manager'
    script.src = 'https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(GTM_ID)
    document.head.appendChild(script)
    window.dataLayer.push({ event: 'lumea_consent_ready' })
  } else {
    if (googleLoaded) return
    googleLoaded = true
    window.gtag?.('js', new Date())
    window.gtag?.('config', GA4_ID, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false, page_referrer: '', page_location: location.origin + location.pathname })
    const script = document.createElement('script')
    script.async = true
    script.id = 'lumea-ga4'
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA4_ID)
    document.head.appendChild(script)
  }
}
export function trackGoogleEvent(name: MetaEvent, eventId: string) {
  const event = eventNames[name]
  const page = { page_location: location.origin + location.pathname, page_referrer: '', page_title: appPath() === '/bestellung' ? 'Lumea | Bestellung' : appPath() === '/danke' ? 'Lumea | Bestätigung' : 'Lumea | Produkt' }
  const ecommerce = name === 'PageView' ? undefined : {
    currency: 'EUR', value: 14.5,
    items: [{ item_id: 'LUMEA-30', item_name: 'Lumea Monatsabo', item_brand: 'Lumea', item_variant: 'Monatsabo', price: 14.5, quantity: 1 }],
    ...(name === 'Purchase' ? { transaction_id: eventId.replace(/^purchase-/, ''), shipping: 0 } : {}),
  }
  // These plain objects are the GTM interface; gtag commands remain separate Arguments entries.
  window.dataLayer.push({ ecommerce: null })
  window.dataLayer.push({ event, event_id: eventId, ...page, ...(ecommerce ? { ecommerce } : {}) })
  if (!USE_GTM) window.gtag?.('event', event, { ...page, ...ecommerce, send_to: GA4_ID })
}
