from pathlib import Path
from PIL import Image
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.lib.utils import ImageReader
from pypdf import PdfReader, PdfWriter

ROOT = Path(__file__).resolve().parents[1]
IMG = ROOT / 'public/images'
FONTS = ROOT / 'public/fonts'
OUT = ROOT / 'docs'
OUT.mkdir(exist_ok=True)
for name, file in [('Inter','inter-400.ttf'), ('InterBold','inter-600.ttf'), ('Playfair','playfair-display-400.ttf')]:
    pdfmetrics.registerFont(TTFont(name, str(FONTS/file)))
pdfmetrics.registerFontFamily('Inter', normal='Inter', bold='InterBold', italic='Inter', boldItalic='InterBold')
W,H = 595.28,841.89
INK = '#39372E'
OLIVE = '#414D3C'
MUTED = '#77766B'
RULE = '#E9E4DC'
c = canvas.Canvas(str(OUT/'Teil_B_Markenwelt_und_Design.pdf'), pagesize=(W,H))
c.setTitle('Lumea - Markenwelt, Design und Produkt')
c.setAuthor('Lumea Probearbeit')

def fill(color): c.setFillColor(colors.HexColor(color))
def txt(text,x,top,width,font='Inter',size=9,leading=13,color=INK):
    style=ParagraphStyle('p',fontName=font,fontSize=size,leading=leading,textColor=colors.HexColor(color))
    p=Paragraph(text,style)
    _,height=p.wrap(width,1000)
    assert x>=40 and x+width<=556, (text,x,width)
    assert top-height>41, (text,top,height)
    p.drawOn(c,x,top-height)
    return top-height

def image(name,x,y,w,h,trim_alpha=False):
    path=IMG/name
    im=Image.open(path)
    iw,ih=im.size
    if trim_alpha:
        left,top,right,bottom=im.getchannel('A').getbbox()
        scale=min(w/(right-left),h/(bottom-top))
        actualw=(right-left)*scale;actualh=(bottom-top)*scale
        dx=x+(w-actualw)/2-left*scale
        dy=y+(h-actualh)/2-(ih-bottom)*scale
        c.saveState();clip=c.beginPath();clip.rect(x,y,w,h);c.clipPath(clip,stroke=0,fill=0)
        c.drawImage(ImageReader(im),dx,dy,width=iw*scale,height=ih*scale,mask='auto')
        c.restoreState()
    else:
        scale=min(w/iw,h/ih)
        c.drawImage(ImageReader(im),x+(w-iw*scale)/2,y+(h-ih*scale)/2,width=iw*scale,height=ih*scale,mask='auto')

def line(y):
    c.setStrokeColor(colors.HexColor(RULE));c.setLineWidth(.5);c.line(42,y,553,y)

def footer(page,subtitle):
    line(33)
    c.setFont('Inter',7);fill(MUTED)
    c.drawString(42,21,'Lumea · '+subtitle)
    c.drawRightString(553,21,'Teil B / '+str(page))

# Page B1: identity and design system.
txt('TEIL B  /  LOGO · FARBWELT · DESIGN',42,805,511,'InterBold',8,11,OLIVE)
txt('Natürlich klar.<br/>Unverkennbar Lumea.',42,779,511,'Playfair',25,29)
txt('Die visuelle Übersetzung von „Weiter du.“: ruhig, persönlich und selbstbestimmt.',42,709,511,size=9,leading=13,color=MUTED)
fill('#FAF9F6');c.roundRect(42,564,511,123,5,stroke=0,fill=1)
image('lumea-logo.png',58,592,292,79,True)
image('lumea-leaf.png',419,600,66,65,True)
txt('WORTMARKE · ELEGANZ & KONTINUITÄT',58,583,292,'InterBold',7,10,OLIVE)
txt('BLATTSYMBOL · BALANCE',393,583,150,'InterBold',7,10,OLIVE)
txt('01 · Die Farbwelt aus dem Markenboard',42,544,511,'InterBold',10,13,OLIVE)
palette=[('Salbeigrün','#6B7F6B','Natur & Balance'),('Warm Beige','#EAE3D9','Ruhe & Wärme'),('Soft Rose','#D8B4B0','Nähe & Weiblichkeit'),('Taupe','#8C7F76','Wertigkeit & Stabilität'),('Deep Olive','#3F4A3F','Vertrauen & Tiefe')]
for i,(name,code,meaning) in enumerate(palette):
    x=42+i*104
    fill(code);c.roundRect(x,478,95,42,3,stroke=0,fill=1)
    txt(name,x,469,95,'InterBold',8,10)
    txt(code,x,456,95,size=7.5,leading=10,color=MUTED)
    txt(meaning,x,443,95,size=7,leading=9,color=MUTED)
txt('Webadaption: Weiß #FFFFFF als Hauptfläche · CTA #68715A · Fließtext #39372E.<br/>Beige und Rosé bleiben ruhige Akzente; sie dominieren die Produktseite nicht.',42,418,511,size=8,leading=11,color=MUTED)
line(384)
txt('02 · Typografie mit klarer Rollenverteilung',42,369,511,'InterBold',10,13,OLIVE)
txt('Playfair Display',42,345,240,'Playfair',20,25)
txt('Für deine nächste Lebensphase.',42,313,240,'Playfair',12,16)
txt('Headlines · emotional, ruhig, editorial.<br/>Großzügige Größen und kurze Zeilen.',42,289,240,size=8,leading=12,color=MUTED)
txt('Inter',310,345,240,'InterBold',20,25)
txt('Klare Informationen. Gute Lesbarkeit.',310,313,240,'Inter',10,16)
txt('Fließtext, Navigation, Preise und CTAs.<br/>Sachlich, zugänglich und mobil lesbar.',310,289,240,size=8,leading=12,color=MUTED)
line(250)
txt('03 · Designprinzipien für die Landingpage',42,234,511,'InterBold',10,13,OLIVE)
principles=[('Weißraum','Weiße Grundflächen, klare Abstände und viel Raum zwischen den Themen.'),('Visuelle Hierarchie','Große Serifentitel, präzise Informationen und ein klar erkennbarer nächster Schritt.'),('Interaktion','Salbeigrüne CTAs, feine Linien und ruhige Akkordeons statt visueller Überladung.')]
for i,(title,body) in enumerate(principles):
    x=42+i*176
    txt(title,x,210,159,'InterBold',9,12)
    txt(body,x,192,159,size=8,leading=12,color=MUTED)
fill('#F5F7F2');c.roundRect(42,71,511,62,4,stroke=0,fill=1)
fill('#68715A');c.roundRect(57,87,160,31,15.5,stroke=0,fill=1)
txt('Lumea kennenlernen',76,108,131,'InterBold',9,13,'#FFFFFF')
txt('Die Gestaltung führt zur Entscheidung:<br/>verständlich informieren, Vertrauen aufbauen<br/>und das Angebot transparent erklären.',240,120,293,size=8,leading=12,color=OLIVE)
footer(1,'Markenwelt und visuelle Linie')
c.showPage()

# Page B2: product presentation and applied imagery.
txt('TEIL B  /  PRODUKT & BILDSPRACHE',42,805,511,'InterBold',8,11,OLIVE)
txt('Die Marke wird greifbar.',42,779,511,'Playfair',25,31)
txt('Ein wiedererkennbares Produktdesign und informative Bilder aus einem Guss.',42,737,511,size=9,leading=13,color=MUTED)
image('lumea-hero.png',42,385,260,325)
txt('DAS LUMEA MONATSGLAS',326,710,227,'InterBold',7.5,11,OLIVE)
txt('Eine Kapsel.<br/>Vier Inhaltsstoffe.',326,688,227,'Playfair',21,26)
txt('Braunglas, champagnerfarbener Deckel und ein cremefarbenes Etikett mit botanischem Salbeigrün. Das Produkt verbindet die warme Markenwelt mit einer klaren Mengenübersicht.',326,624,227,size=8.5,leading=12.5,color=MUTED)
ingredients=[('Traubensilberkerzen-Extrakt','6,5 mg'),('Vitamin B6','1,4 mg'),('Vitamin D3','20 µg'),('Magnesium','150 mg')]
for i,(name,amount) in enumerate(ingredients):
    top=548-i*27
    txt(name,326,top,167,size=8,leading=12)
    txt(amount,496,top,57,'InterBold',8,12,OLIVE)
    c.setStrokeColor(colors.HexColor(RULE));c.line(326,top-18,553,top-18)
txt('Mengen pro Kapsel · 30 Kapseln pro Glas.<br/>Vegan · ohne zugesetzte Hormone.<br/>Herstellung in Deutschland laut Briefing.',326,431,227,size=8,leading=12,color=MUTED)
txt('04 · Produktgrafiken für eine informierte Entscheidung',42,358,511,'InterBold',10,13,OLIVE)
for i,(name,label) in enumerate([('ingredients','Vier Inhaltsstoffe'),('routine','Tägliche Einnahme'),('subscription','Flexibles Monatsabo')]):
    x=42+i*178
    image('lumea-info-'+name+'-v4.png',x,139,155,194)
    txt(label,x,129,155,'InterBold',8,11,OLIVE)
txt('Bildsprache: warme Natursteinflächen, weiches Tageslicht, echte Materialwirkung und dezente Botanik.<br/>Produktgrafiken kombinieren das Glas mit kurzen Fakten; Preise und Folgekosten bleiben klar erkennbar.',42,102,511,size=8,leading=12,color=MUTED)
txt('Assets: bereitgestellte Wort-/Bildmarke; Produktmotive und Infografiken mit GPT Image erzeugt. Alle Produkte und Personen gehören zum fiktiven Konzept der Probearbeit.',42,65,511,size=7,leading=10,color=MUTED)
footer(2,'Produktgestaltung und Bildwelt')
c.save()

writer=PdfWriter()
for name in ['Teil_A_Positionierung.pdf','Teil_B_Markenwelt_und_Design.pdf']:
    for page in PdfReader(OUT/name).pages: writer.add_page(page)
writer.add_metadata({'/Title':'Lumea - Positionierung und Markenwelt','/Author':'Lumea Probearbeit'})
with open(OUT/'Lumea_Positionierung_und_Markenwelt.pdf','wb') as f: writer.write(f)
print('Teil A bleibt einseitig; Teil B: 2 Seiten; Gesamtdokument: 3 Seiten.')
