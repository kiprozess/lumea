# Landingpage / Stand der Probearbeit

Stand: 23. Oktober 2026. Öffentlich: https://lumea-projektarbeit.up.railway.app/ · Lokal: http://localhost:5173/

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

Veröffentlicht über Railway ohne Login: https://lumea-projektarbeit.up.railway.app/. Veröffentlichung ohne Ablaufdatum; Repository und Pages-Deployment mindestens bis 20. November 2026 unverändert erreichbar halten (vier Wochen ab 23. Oktober). Es ist keine Abschaltung geplant. Die zukünftige Verfügbarkeit hängt vom Hostinganbieter und dem Fortbestand des Repositorys ab.

- Build: `npm run build`, Ausgabe `dist/`.
- Vercel: Root Directory `landingpage`, Build Command `npm run build`, Output Directory `dist`. SPA-Rewrites und Sicherheitsheader: `vercel.json`.
- Netlify: gleicher Build, Publish Directory `landingpage/dist` aus Repo-Root. SPA-Fallback in `public/_redirects`.
- Öffentliche Prüfung am 23.10.2026: alle vier Routen HTTP 200; Meta- und GA4-Netzwerkanfragen, getrennte Einwilligung, einmaliger Purchase und Widerruf geprüft. Desktop 1440 × 1000 und Mobile 390 × 844. GitHub-Pages-Deployment erfolgreich.
- Keine Live-Zahlungsdaten oder echten Kundenkonten anbinden; der Auftrag verlangt nur eine simulierte Bestellstrecke.

Die öffentliche Bestellstrecke ist geprüft. Die PDFs für A, B, D, E, F und G sowie die sechs finalen Creatives werden im lokalen Abgabeordner zusammengeführt. Vollständiger sichtbarer Gesprächsexport wird separat übergeben und nicht zusätzlich im öffentlichen Repository veröffentlicht.

## Ergänzung Google

Der ursprüngliche Meta-Test wurde um Google erweitert: getrennte Statistik-/Marketing-Auswahl, Consent Mode v2 Basic, GA4-Ecommerce und transaktionsbezogene Deduplizierung. Beide SDKs werden nur mit der jeweils passenden Zustimmung geladen. Die vorherige Meta-Einwilligung wird nicht automatisch als Google-Einwilligung übernommen. Echte GA4-Realtime-Berichte und ein echter GTM-Import sind ohne existierende Konten/Container nicht verifiziert. Details: GOOGLE_TRACKING.md.

## Hosting auf GitHub Pages

Workflow: `.github/workflows/pages.yml`; Build mit GITHUB_PAGES=true. `siteUrl` und `appPath` unterstützen das Unterverzeichnis `/lumea/`. Für Bestell-, Danke- und Ratgeberroute werden physische index.html-Dateien erzeugt. Direkte Einstiege und Reloads benötigen daher keinen Server.

## Abgrenzung Kampagnenplan

Teil E beschreibt geplante Kampagnen, keine geschalteten Anzeigen. Der gesundheitsbezogene Ratgeber lädt im Prototyp keine Meta- oder GA4-SDKs. Die geplanten Retargeting-Gruppen sind daher nicht live eingerichtet; ihre Zulässigkeit und Verfügbarkeit müsste im echten Konto geprüft werden. Beschränkte Gesundheitsereignisse dürfen nicht mit Ersatznamen oder URL-Tricks umgangen werden. Google-Ads-Conversion-Tags sind kein Pflichtteil der Aufgabe und nicht aktiviert; GA4 und Meta sind mit den verlangten Test-IDs umgesetzt.
