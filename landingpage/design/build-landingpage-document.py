from pathlib import Path
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor

ROOT=Path(__file__).resolve().parents[1]
for name,file in [('Body','inter-400.ttf'),('Bold','inter-600.ttf'),('Title','playfair-display-400.ttf')]:
    pdfmetrics.registerFont(TTFont(name,str(ROOT/'public/fonts'/file)))
pdfmetrics.registerFontFamily('Body',normal='Body',bold='Bold')
styles={
 'title':ParagraphStyle('title',fontName='Title',fontSize=25,leading=30,spaceAfter=12),
 'body':ParagraphStyle('body',fontName='Body',fontSize=10,leading=14,spaceAfter=9),
 'h':ParagraphStyle('h',fontName='Bold',fontSize=11,leading=15,spaceBefore=10,spaceAfter=6),
 'small':ParagraphStyle('small',fontName='Body',fontSize=9,leading=13,spaceAfter=8,textColor=HexColor('#697060')),
}
def p(s,style='body'):return Paragraph(s,styles[style])
base='https://lumea-projektarbeit.up.railway.app/'
def link(label,path=''):
    url=base+path
    return p(f'<b>{label}</b><br/><link href="{url}" color="#3F4A3F">{url}</link>','small')
flow=[p('Lumea öffentlich erleben','title'),p('Teil C · Mobile Produktseite und Demo-Bestellstrecke','small'),link('Öffentliche Projekt-Domain'),
 p('Von der Produktseite bis zur Bestätigung','h'),
 p('Produktseite → Jetzt abonnieren → Warenkorb → Bestellformular → Prüfschritt → Dankeseite. Beispieldaten können per Knopfdruck eingesetzt werden. Kreditkarte oder PayPal werden nur simuliert: keine echte Zahlung, kein echtes Abo.'),
 p('Direkte Einstiege','h'),link('Bestellformular','bestellung/'),link('Dankeseite','danke/'),link('Ratgeber / Advertorial','ratgeber/deine-routine-in-der-lebensmitte/'),
 p('Prüfung und technische Umsetzung','h'),
 p('Die vier öffentlichen Railway-Routen liefern HTTP 200, auch bei direktem Aufruf. Die aktuelle Oberfläche wurde lokal in Chromium mit Desktop 1440 × 1000 und Mobile 390 × 844 geprüft: keine fehlenden Bilder, keine App-Fehler, keine horizontale Überbreite. Galerie, Bildvergrößerung, mobiler Footer und Demo-Bestellstrecke wurden geprüft.'),
 p('Alle 22 verwendeten Website-Bilder laden als WebP. Die Dateigröße ist zusammen rund 80 % kleiner als bei den Ausgangsdateien. Logos, Produktgrafiken und Zahlungslogos sind verlustfrei konvertiert; Originaldateien bleiben für die Dokumentation erhalten.'),
 p('Meta-Pixel 1234567890 und GA4 G-LUMEA0000 sind mit getrennter Einwilligung integriert. SDK- und Ereignisprüfung im Prototyp: keine optionalen SDKs vor Zustimmung; Purchase 14,50 EUR einmalig, kein zweiter Kauf nach Reload; Widerruf unterbindet weitere Anfragen. Die Test-IDs ersetzen kein echtes Werbekonto. Details in Teil D.'),
 p('Hosting und Verfügbarkeit','h'),
 p('Die primäre öffentliche Domain liegt bei Railway. Als zusätzliche Veröffentlichung besteht GitHub Pages. Im Projektcode ist keine zeitliche Abschaltung vorgesehen. Für die geforderten vier Wochen muss das Hosting nach Einreichung aktiv bleiben; bei Einreichung am 23. Oktober 2026 mindestens bis zum 20. November 2026.'),
 p('Projektquelle: github.com/kiprozess/lumea · Florian Albert · Prüfstand: 23. Oktober 2026.','small')]
SimpleDocTemplate(str(ROOT/'docs/Teil_C_Landingpage_und_Pruefung.pdf'),leftMargin=44,rightMargin=44,topMargin=35,bottomMargin=38,title='Lumea Landingpage und Prüfung',author='Florian Albert').build(flow)
print('Teil C aktualisiert')
