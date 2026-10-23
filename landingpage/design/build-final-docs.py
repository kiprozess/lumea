from pathlib import Path
import json
import sys
from io import BytesIO
from PIL import Image as RasterImage
from xml.sax.saxutils import escape
from reportlab.platypus import SimpleDocTemplate, Paragraph, Table, TableStyle, Image, Spacer, PageBreak
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

ROOT = Path(__file__).resolve().parents[1]
for name, file in [('Body','inter-400.ttf'),('Bold','inter-600.ttf'),('Title','playfair-display-400.ttf')]:
    pdfmetrics.registerFont(TTFont(name, str(ROOT/'public/fonts'/file)))
pdfmetrics.registerFontFamily('Body', normal='Body', bold='Bold')
styles = {
    'title': ParagraphStyle('title', fontName='Title', fontSize=24, leading=29, spaceAfter=12),
    'h': ParagraphStyle('h', fontName='Bold', fontSize=10.5, leading=14, spaceBefore=10, spaceAfter=5, keepWithNext=True),
    'body': ParagraphStyle('body', fontName='Body', fontSize=9.5, leading=14, spaceAfter=7),
    'small': ParagraphStyle('small', fontName='Body', fontSize=8, leading=11, spaceAfter=7, textColor=colors.HexColor('#596151')),
}
def p(text, style='body'): return Paragraph(text, styles[style])
def footer(c,d):
    c.setFont('Body',8);c.setFillColor(colors.HexColor('#697060'))
    c.drawString(44,24,'Lumea · Probearbeit · 23. Oktober 2026')
    c.drawRightString(A4[0]-44,24,str(d.page))

ads = json.loads((ROOT/'creatives/anzeigen.json').read_text(encoding='utf-8'))
flow=[]
for i, ad in enumerate(ads):
    if i: flow.append(PageBreak())
    flow += [p(f'{i+1:02d}  {escape(ad["title"])}','title'),p(escape(ad['campaign'])+' · KI-generierte Bildanzeige · 4:5 und 9:16','small')]
    images=[]
    for fmt,w in [('4x5',192),('9x16',135)]:
        # Embed a print-size preview; the separate submission PNGs retain their full resolution.
        raster=RasterImage.open(ROOT/'creatives/exports'/f'{ad["id"]}-{fmt}.png').convert('RGB')
        raster.thumbnail((720,960))
        preview=BytesIO()
        raster.save(preview,format='JPEG',quality=94)
        preview.seek(0)
        im=Image(preview)
        im.drawWidth=w;im.drawHeight=240
        images.append(im)
    layout=Table([images],colWidths=[260,247],hAlign='LEFT')
    layout.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('ALIGN',(0,0),(-1,-1),'CENTER'),('LEFTPADDING',(0,0),(-1,-1),0),('RIGHTPADDING',(0,0),(-1,-1),0)]))
    flow += [layout,Spacer(1,8),p('Primärtext','h'),p(escape(ad['primary'])),p('Überschrift und Call to Action','h'),p('<b>'+escape(ad['headline'])+'</b><br/>Meta-Button: '+escape(ad['cta'])),p('Zielseite','h'),p('<link href="'+ad['destination']+'" color="#3F4A3F">'+ad['destination']+'</link>','small'),p('Hypothese','h'),p(escape(ad['hypothesis'])),p(escape(ad['note']),'small')]
    if i==len(ads)-1: flow += [p('Bildsprache: warmes Tageslicht, Produktshots und natürliche Hände, zentrierte Headline mit Subline. Feed und Story zeigen jeweils dasselbe Motiv; das Feed-Format entsteht als mittiger Ausschnitt des Story-Masters. Sunday dient als gestalterische Inspiration. Generiert mit GPT Image. Drei Ansätze plus eine zusätzliche Routine-Variante. Das Video für den geplanten A/B-Test ist eine spätere Testproduktion.','small')]
SimpleDocTemplate(str(ROOT/'docs/Teil_F_Creatives_und_Anzeigentexte.pdf'),pagesize=A4,leftMargin=44,rightMargin=44,topMargin=35,bottomMargin=38,title='Lumea Meta Creatives und Anzeigentexte',author='').build(flow,onFirstPage=footer,onLaterPages=footer)

if '--only-f' in sys.argv:
    print('Teil F aktualisiert')
    sys.exit(0)

reflection=[
 p('KI gezielt steuern','title'),
 p('Drei Entscheidungen aus meinem Arbeitsprozess','small'),
 p('1  Funnel statt einzelner Anzeigenwinkel','h'),
 p('Das Modell schlug zunächst vier Anzeigenwinkel innerhalb einer gemeinsamen Meta-Kampagne vor. Das entsprach nicht meinem gewünschten Ablauf. Ich habe einen aufeinander aufbauenden Funnel vorgegeben und Problemvertiefung mit Bedenken zusammengeführt: drei Kampagnen, erst Information, dann Vertiefung, schließlich Kauf. Meta 2 erreicht nur Besucherinnen aus Meta 1, Meta 3 nur aus Meta 2.'),
 p('2  Produktgrafiken tatsächlich neu erzeugen','h'),
 p('Die zusätzlichen Galeriegrafiken hatten zunächst ein anderes Format als die bestehenden Produktbilder. Eine angepasste Darstellung löste das Problem für mich nicht. Ich habe die Neugenerierung im passenden Hochformat verlangt und anschließend die Galerie erneut geprüft. Die Gestaltung sollte zur bestehenden Bildserie passen, ohne sichtbare Formatbrüche.'),
 p('3  Produktpositiv schreiben und Aussagen belegen','h'),
 p('Der recherchierte Advertorial-Entwurf klang mir zu negativ. Ich habe eine positive, informative Überarbeitung verlangt. Das Ergebnis erklärt Rezeptur, Nährstofffunktionen und Alltagstauglichkeit, ohne Lumea eine belegte Behandlung von Beschwerden zuzuschreiben. Das unbelegte 40-Prozent-Versprechen aus dem Briefing wurde nicht zur Produktbotschaft.'),
 p('Nachvollziehbarkeit: Der beigefügte Gesprächsexport enthält die sichtbaren Nutzer- und Assistenznachrichten. Der Freigabe-Link ergänzt die Bildausgaben. Ein früherer rekonstruierter Austausch liegt als separate Quelldatei bei.','small'),
]
SimpleDocTemplate(str(ROOT/'docs/Teil_G_KI_Reflexion.pdf'),pagesize=A4,leftMargin=44,rightMargin=44,topMargin=35,bottomMargin=38,title='Lumea Arbeitsprozess mit KI',author='').build(reflection)
print('Teil F und G erstellt')
