# Landingpage / Stand der Probearbeit

Stand: 22. Oktober 2026. Lokale Produktseite: http://localhost:5173/

## Implementiert

- Produktseite und Ratgeber mit vorhandener Gestaltung, neuen Produktgrafiken und responsiver Galerie.
- Warenkorb aus den Produkt-CTAs führt nach `/bestellung`.
- Bestellseite: Beispieldaten, native Pflichtfeld-/E-Mail-/PLZ-Prüfung, Auswahl Kreditkarte/PayPal, Prüfschritt mit Korrekturmöglichkeit, unverbindlicher Abschluss.
- `/danke`: Bestätigung nur bei vorhandener Demo-Bestellung. Kein Zahlungsanbieter, kein echtes Abo, keine Speicherung oder Übertragung der Lieferangaben.
- Meta-Pixel 1234567890: Original-SDK erst nach Einwilligung, ausschließlich auf den drei Commerce-Routen. Sechs Standardereignisse, dokumentiert in `Teil_D_Tracking.pdf`.
- Cookie-Auswahl, Widerruf, Datenschutzdetails, ausdrücklich fiktive Projektangaben entsprechend dem Nutzerwunsch. GA4 G-LUMEA0000 mit separater Statistik-Zustimmung und Data Layer; kein CAPI. GTM-Anbindung vorbereitet, GTM-LUMEA0000 ist nur ein Demo-Platzhalter.
- Briefingkorrektur: Berlin / 2025 / Ärztin Miriam und Produktmanagerin Katharina; Namen und Alter sind ergänzende Annahmen.
- Preis: 14,50 EUR erster Monat, danach 29 EUR monatlich, Deutschland-Versand inklusive, keine Mindestlaufzeit, jederzeit kündbar.

## Prüfung

Headless Chromium, Desktop 1440 × 1050 und Mobile 390 × 844. Original-Meta-SDK geladen; tatsächliche ausgehende `/tr`-Requests geprüft.

| Fall | Ergebnis |
| --- | --- |
| Frischer Browser ohne Einwilligung | Keine Meta-Anfragen |
| Ablehnen und Seite neu laden | Keine Meta-Anfragen |
| Einwilligung erteilen | PageView und ViewContent |
| CTA / Warenkorb / Bestellstrecke | AddToCart, InitiateCheckout, AddPaymentInfo |
| Bestellabschluss | Ein Purchase, value 14.5, currency EUR, Pixel 1234567890 |
| Dankeseite neu laden | Kein zweiter Purchase |
| Dankeseite ohne Bestellung | Keine falsche Bestätigung, kein Purchase |
| Einwilligung widerrufen / weiter navigieren | Keine weiteren Meta-Anfragen |
| Bestellung ohne Marketing | Funktioniert bis zur Dankeseite, ohne Meta-Anfragen |
| Leere Pflichtfelder | Kein Weitergehen zur Bestellprüfung |
| Sitzungsdatensatz | Keine Namen, E-Mails oder Adressen |
| Mobile | Keine horizontale Seitenüberbreite |

Die Platzhalter-ID ist kein erreichbares echtes Werbekonto. Meta Events Manager und reale Attribution lassen sich deshalb nicht bestätigen; im Browser sind aber SDK und Ereignisrequests live prüfbar. Werbeblocker können die Requests unterbinden.

## Bereitstellung

Noch nicht öffentlich veröffentlicht. Für die Aufgabenabgabe ist eine öffentliche URL erforderlich, die mindestens vier Wochen online bleibt. Das ist ein eigener, noch offener Abgabeschritt.

- Build: `npm run build`, Ausgabe `dist/`.
- Vercel: Root Directory `landingpage`, Build Command `npm run build`, Output Directory `dist`. SPA-Rewrites und Sicherheitsheader: `vercel.json`.
- Netlify: gleicher Build, Publish Directory `landingpage/dist` aus Repo-Root. SPA-Fallback in `public/_redirects`.
- Trackingprüfung nach Deployment auf der endgültigen Domain wiederholen. Besonders direkte Aufrufe von `/bestellung`, `/danke` und dem Ratgeber prüfen.
- Keine Live-Zahlungsdaten oder echten Kundenkonten anbinden; der Auftrag verlangt nur eine simulierte Bestellstrecke.

Die dokumentierte lokale Prüfung ersetzt nicht die Prüfung der noch ausstehenden öffentlichen URL. Die gesamte Probearbeit ist damit ebenfalls noch nicht vollständig (Teile A, E, F und G separat).

## Ergänzung Google

Der ursprüngliche Meta-Test wurde um Google erweitert: getrennte Statistik-/Marketing-Auswahl, Consent Mode v2 Basic, GA4-Ecommerce und transaktionsbezogene Deduplizierung. Beide SDKs werden nur mit der jeweils passenden Zustimmung geladen. Die vorherige Meta-Einwilligung wird nicht automatisch als Google-Einwilligung übernommen. Echte GA4-Realtime-Berichte und ein echter GTM-Import sind ohne existierende Konten/Container nicht verifiziert. Details: GOOGLE_TRACKING.md.
