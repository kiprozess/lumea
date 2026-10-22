# GA4, Google Tag Manager und Data Layer

## IDs und Betriebsarten

- GA4: `G-LUMEA0000`, vorgegebenes Beispiel aus der Aufgabe. Original-Google-Tag lädt erst nach Statistik-Zustimmung.
- GTM: `GTM-LUMEA0000`, vom Nutzer gewünschter Demo-Platzhalter mit derselben Endung. Das ist **kein erstellter oder veröffentlichter Google-Container**. Diese fiktive ID wird nicht als funktionierender Remote-Container angefragt.
- Solange diese Demo-GTM-ID eingestellt ist, sendet die Website GA4 über `gtag.js` direkt. Der Data Layer ist bereits vorhanden und enthält alle Ereignisse.
- Sobald `VITE_GTM_CONTAINER_ID` eine echte veröffentlichte GTM-ID enthält, wird nur GTM geladen und die direkte GA4-Auslieferung deaktiviert. Ein leerer realer Container sendet nichts; er muss zuerst eingerichtet und veröffentlicht werden.
- Meta bleibt direkt im bestehenden Modul. Keine zusätzlichen Meta-Tags im GTM anlegen, sonst drohen doppelte Ereignisse.
- IDs in `.env.local` aus `.env.example` übernehmen. Nach Änderungen neu bauen. Echte GA4-ID ebenfalls über `VITE_GA4_MEASUREMENT_ID` setzen; die GA4-ID im GTM-Container getrennt aktualisieren.

## Consent Mode v2 / Basic

Der Consent-State wird vor Tags lokal auf denied gesetzt: analytics_storage, ad_storage, ad_user_data und ad_personalization. Es gibt keine Requests oder cookieless Pings vor Einwilligung. Google lädt nur nach Statistik-Zustimmung; Meta nur nach Marketing-Zustimmung. Beide Optionen sind unabhängig. Die drei Google-Werbe-Zustände bleiben auch nach Zustimmung denied, da keine Google-Ads-/Remarketing-Kampagne implementiert wird. Google Signals und Anzeigenpersonalisierung sind deaktiviert.

Der neue Dialog nutzt eine versionierte Auswahl `lumea-consent-v2`; die frühere reine Meta-Zustimmung wird nicht als Google-Zustimmung weiterverwendet. Beim Widerruf werden die zugehörigen Dienste gesperrt und zugängliche Cookies (_ga, _ga_*, _fbp, _fbc) entfernt. Bereits gesendete Daten können dadurch nicht zurückgeholt werden. Im direkten GA4-Modus wird zusätzlich `ga-disable-G-LUMEA0000` gesetzt.

Keine Messung auf dem Ratgeber. Keine Formularfelder, E-Mails, Namen, Gesundheitsangaben oder Zahlungsdaten. Google bekommt eine neutrale Seitenbezeichnung, nur origin+pathname und einen leeren page_referrer; keine freien Query-Parameter. Vorhandene Meta-Klick-ID wird nur nach formaler Prüfung für die Meta-Zuordnung behalten.

## Ereignisse

| Auslöser | Meta | GA4 / Data Layer |
| --- | --- | --- |
| Seitenaufruf | PageView | page_view |
| Produktseite | ViewContent | view_item |
| Warenkorb öffnen | AddToCart | add_to_cart |
| Bestellseite | InitiateCheckout | begin_checkout |
| Gültige Angaben / zur Prüfung | AddPaymentInfo | add_payment_info |
| Bestätigte Demo-Bestellung | Purchase | purchase |

GA4-Ecommerce-Daten: currency EUR, value 14.5, items mit item_id LUMEA-30, item_name Lumea Monatsabo, item_brand Lumea, item_variant Monatsabo, quantity 1 und price 14.5. Purchase zusätzlich transaction_id (zufällige Demo-Bestell-ID) und shipping 0. Kein erfundener Umsatz für spätere Monate.

Vor Ecommerce-Ereignissen wird `ecommerce: null` gepusht, damit GTM keine Werte aus vorherigen Ereignissen übernimmt. PageView hat keine Ecommerce-Daten. Die `event_id` dient der Nachvollziehbarkeit im Data Layer; die Kauf-Deduplizierung nutzt zusätzlich pro Empfänger einen Sitzungsmarker und die stabile GA4-transaction_id. Jede Empfänger-Einwilligung wird beim Abschluss festgehalten. Ohne zugehörige Einwilligung abgeschlossene Käufe werden nicht nachträglich versendet.

Beispiel:

```json
{"event":"purchase","event_id":"purchase-demo-UUID","page_location":"https://host.example/danke","page_title":"Lumea | Bestätigung","page_referrer":"","ecommerce":{"transaction_id":"demo-UUID","currency":"EUR","value":14.5,"shipping":0,"items":[{"item_id":"LUMEA-30","item_name":"Lumea Monatsabo","item_brand":"Lumea","item_variant":"Monatsabo","price":14.5,"quantity":1}]}}
```

## GTM einrichten

1. Einen echten Web-Container anlegen. `gtm-container.json` im GTM-Workspace als neue Konfiguration importieren und Variablen/Tags prüfen. Die Vorlage enthält einen Google-Tag, ein GA4-Ereignistag und zwei Custom-Event-Trigger. Kein serverseitiger Container, kein Tracking-Endpunkt und keine Google-Ads-Tags.
2. GA4-Mess-ID in der Konstante ersetzen. Google-Tag: `send_page_view=false`; sonst zählt ein manuell gesendeter page_view doppelt. Werbesignale und Personalisierung deaktiviert lassen.
3. Consent-Voraussetzung beider Tags: analytics_storage. Initialisierung bei `lumea_consent_ready`; Ereignistag für genau die sechs oben genannten Ereignisnamen.
4. Auf der tatsächlichen GA4-Property Enhanced Measurement deaktivieren, insbesondere Formularinteraktionen, History-Pageviews und site search. Die Demo besitzt keinen Zugriff auf eine echte Property und kann diese Kontoeinstellung nicht setzen.
5. Echte GTM-ID in VITE_GTM_CONTAINER_ID setzen, bauen, mit GTM Preview / Tag Assistant prüfen und Container veröffentlichen. Der direkte gtag-Fallback ist dann automatisch aus. GTM und Direktmodus dürfen nie parallel GA4-Events senden.

Die JSON-Vorlage ist strukturell geprüft. Ein echter Import, GTM Preview und Veröffentlichung können ohne echten Container/Kontozugriff nicht bestätigt werden. Auch GA4-Realtime/DebugView sind mit der Platzhalter-ID kein verifizierbares echtes Reporting. Netzwerk-Requests und Data-Layer-Payloads sind lokal prüfbar.

## Quellen

- https://developers.google.com/tag-platform/security/guides/consent
- https://developers.google.com/tag-platform/tag-manager/datalayer
- https://developers.google.com/analytics/devguides/collection/ga4/ecommerce

Abruf: 22.10.2026. Keine GA4 Measurement Protocol Secrets oder serverseitigen Schlüssel im Frontend.
