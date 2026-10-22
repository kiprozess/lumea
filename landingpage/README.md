# Lumea Landingpage

React-Projekt mit TypeScript und Vite. Der Produkt-Hero ist anhand der gelieferten Lumea-Referenz umgesetzt.

## Lokal starten

```sh
npm install
npm run dev
```

## Prüfen und bauen

```sh
npm run lint
npm run build
npm run preview
```

Öffentliche Demo: https://kiprozess.github.io/lumea/

Der Produktionsbuild wird in `dist/` erstellt. Die GitHub-Pages-Pipeline setzt GITHUB_PAGES=true und erzeugt statische Einstiege für alle Seitenrouten.

## Advertorial

Die eigene Ratgeberseite ist unter `/ratgeber/deine-routine-in-der-lebensmitte` direkt erreichbar. Der erste Journalartikel auf der Startseite verlinkt dorthin. Sie enthält Anzeige-Kennzeichnung, Quellenverweise, Kapitelnavigation und die bestehende Bestellvorschau. Produktlinks führen zur Hauptseite zurück. Direkte Aufrufe und Reload funktionieren mit Vite. Für einen späteren statischen Host muss dessen SPA-Fallback alle Seitenpfade auf `index.html` abbilden.

Der recherchierte Text behandelt Müdigkeit und Schlafbelastung in den Wechseljahren, die Funktionen der enthaltenen Nährstoffe, die Einordnung von Lumea und konkrete Leserfragen. Quellen und Aussagegrenzen stehen in `ADVERTORIAL_RESEARCH.md`; der Artikeltext ist in `src/components/AdvertorialArticle.tsx` von der Seitengestaltung getrennt.

Die Seite ist Teil der öffentlichen Demo auf GitHub Pages. Tatsächliche Anzeigenschaltung ist nicht Bestandteil der Probearbeit. Layout und Inhalte stehen in `src/pages/AdvertorialPage.tsx` und `src/advertorial.css`.

## Struktur

- `src/App.tsx`: Seitenaufbau und Dialogzustand
- `src/components/`: Header mit USP-Slider, Produktgalerie mit Lightbox, Abo-Box, kompakte Demo-Bewertungen, Produktvorteilsleiste, Lebensphase-Einführung, großes Bewertungskarussell, Inhaltsstoffsektion, Monatsabo-Sektion und Informationsdialoge
- `src/data/ingredients.ts`: gemeinsame Inhaltsstoffe, Mengen und Beschreibungen für die Einführungssektion, Detailsektion und den Informationsdialog
- `src/data/reviews.ts`: vier ausdrücklich fiktive Beispielbewertungen; die ersten drei werden zusätzlich in der kompakten Abo-Ansicht gezeigt
- Neue Bewertungsbilder (`lumea-review-*-v2.png`) zeigen vier unterschiedliche Alltagsporträts entsprechend den hinterlegten Altersgruppen: Claudia 51, Anna 48, Sabine 54, Miriam 50.
- `src/components/FoundersSection.tsx` und `src/data/founders.ts`: fiktive Gründerinnen Katharina Berg (49) und Miriam Seidel (46), gemeinsame Geschichte und GPT-Image-Foto; erreichbar unter `#ueber-uns`
- Das Gründerinnenfoto zeigt das Produkt auf dem gemeinsamen Tisch. In der Lebensphase-Sektion steht auf Mobile das Porträt vor dem Text, auf Desktop weiterhin rechts daneben.
- `src/index.css`: globale Basisstyles
- `src/components/FaqSection.tsx`: FAQ unter dem Monatsabo, acht per Maus und Tastatur bedienbare Akkordeon-Fragen und Dialog mit weiteren Antworten
- `src/components/JournalSection.tsx` und `src/data/journal.ts`: drei Blogbeiträge unter `#journal` nach FAQ, mit Leseansicht im Dialog; Header-Ratgeber und Footer verlinken auf die Sektion
- `src/components/Footer.tsx`: olivgrüner Footer mit Markenlogo, Vorteilen, Abschnittslinks und Abo-Informationsdialogen; auf Mobile untereinander angeordnete, zunächst geschlossene Akkordeons mit Trennlinien und Plus-/Minus-Symbolen
- `public/images/`: vier mit GPT Image erzeugte Galeriemotive, ein sauberes Produkt-Studiomotiv, drei zusätzliche fiktive Bewertungsprofilbilder und drei symbolische Nährstoffmotive sowie bereitgestelltes Logo, Icon und Packshot
- `public/fonts/`: lokal eingebundene Schriftdateien für Inter, Playfair Display und Caveat

Die Galerie, Suche, mobile Navigation und Bestellvorschau funktionieren lokal. Die Reihenfolge ist Produkt-Hero → Vorteilsleiste → Lebensphase → Inhaltsstoffe → Gründerinnen → Beispielbewertungen → Monatsabo → FAQ → Journal → Footer. Die Lebensphase-Sektion konzentriert sich auf Alltag und Routine; die detaillierte Inhaltsstoffliste steht ausschließlich im anschließenden Inhaltsstoffbereich. Weiße Grundflächen, großzügige Abschnittsabstände und eingerückte Bildflächen geben der Seite mehr Ruhe. Die Vorteilsleiste nutzt einen sehr hellen Salbeiton, die Bewertungskarten einen zurückhaltenden Naturton; der Footer bleibt olivgrün.

Das Karussell zeigt drei Karten auf Desktop, zwei auf Tablet und eine auf Mobile; Pfeile, Punkte und Pfeiltasten blättern durch vier fiktive Beispiele. „Alle Beispiele ansehen“ öffnet eine Gesamtübersicht. „Lumea kennenlernen“ in der Lebensphase scrollt zu `#inhaltsstoffe`. Beide Abo-Buttons öffnen die Bestellvorschau. Sie löst keine Bestellung oder Zahlung aus. Die Bestellvorschau führt jetzt zur vollständigen Demo-Bestellstrecke unter /bestellung und anschließend zur Dankeseite /danke. Das einwilligungsabhängige Tracking ist implementiert und mit dem Original-Meta-SDK im Browser geprüft.

Bildherkunft und Generierungsprompts stehen in `ASSETS.md`.

## Bestellstrecke und Tracking

- Produktseite / → CTA → Warenkorb → /bestellung → Lieferangaben und Zahlungsart → Prüfung → /danke.
- Beispieldaten per Knopfdruck; keine echten Zahlungen, keine Formulardaten auf einem Server.
- Meta-Pixel 1234567890 ausschließlich nach Marketing-Einwilligung. Events: PageView, ViewContent, AddToCart, InitiateCheckout, AddPaymentInfo, Purchase.
- Purchase-Wert: 14.5 EUR für den ersten Monat. Keine erfundenen Folgemonats-Events und kein zweiter Purchase bei Reload.
- Cookie-Einstellungen und Datenschutzdetails sind auf jeder Seite erreichbar. Der Ratgeber lädt keinen Meta-Pixel.
- Implementierung: src/lib/tracking.ts, src/components/PrivacyControls.tsx und src/pages/CheckoutPage.tsx.
- Abgabedokument: docs/Teil_D_Tracking.pdf (zwei Seiten). Prüf- und Bereitstellungsstand: docs/LP_READINESS.md.
- Öffentliche URL: https://kiprozess.github.io/lumea/ · Direkte Bestell-, Danke- und Ratgeberaufrufe funktionieren ohne Login. GitHub Pages bleibt mindestens vier Wochen ab Einreichung aktiv; keine automatische Abschaltung eingerichtet.

## GA4 und Google Tag Manager

GA4 G-LUMEA0000 und ein Ecommerce-Data-Layer sind integriert. Statistik (GA4) und Marketing (Meta) werden getrennt eingewilligt. Consent Mode v2 läuft in Basic Mode ohne Requests vor Zustimmung. GTM-LUMEA0000 ist der gewünschte Demo-Platzhalter, kein veröffentlichter Container. Bis eine echte ID konfiguriert ist, sendet GA4 direkt über gtag.js. Mit echter GTM-ID wird der Direktmodus deaktiviert. Setup und Importvorlage: docs/GOOGLE_TRACKING.md und docs/gtm-container.json. IDs lassen sich über die Vite-Variablen aus .env.example konfigurieren.

## Abgabedokumente und Creatives

`docs/` enthält die PDFs für Teile A, B, D, E, F und G. `creatives/final/` enthält drei eigenständige Anzeigenansätze jeweils als 4:5- und 9:16-Motiv; Texte, CTA und Hypothesen stehen in `creatives/anzeigen.json` und Teil F. Die Bilder wurden mit GPT Image erzeugt; Herkunft und Prompts stehen in `creatives/GENERIERUNG.json`. Die Dateien sind keine live geschalteten Anzeigen. Der vollständige Gesprächsexport und das finale Abgabe-ZIP bleiben lokal und werden separat ausgehändigt.
