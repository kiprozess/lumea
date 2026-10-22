import { appPath } from './lib/siteUrl'
import { useEffect } from 'react'
import App from './App'
import AdvertorialPage, { advertorialPath } from './pages/AdvertorialPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { PrivacyControls } from './components/PrivacyControls'
import { startTracking } from './lib/tracking'

export default function Site() {
  const path = appPath()
  useEffect(() => { startTracking() }, [])
  return <>{path === advertorialPath ? <AdvertorialPage /> : path === '/bestellung' || path === '/danke' ? <CheckoutPage thankYou={path === '/danke'} /> : <App />}<PrivacyControls /></>
}
