from pathlib import Path
from io import BytesIO
import json
from PIL import Image
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from pypdf import PdfReader, PdfWriter
from pypdf.annotations import Link
import pypdfium2

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT/'docs/Lumea_Gesamtabgabe.pdf'
QA = Path('C:/Users/Flo/.codex/visualizations/lumea-complete-pdf-qa')
QA.mkdir(parents=True, exist_ok=True)
W, H = 595.276, 841.89
for name, file in [('Body','inter-400.ttf'), ('Bold','inter-600.ttf'), ('Title','playfair-display-400.ttf')]:
    pdfmetrics.registerFont(TTFont(name, str(ROOT/'public/fonts'/file)))
INK, SAGE, MUTED = map(HexColor, ['#30372C','#68715A','#697060'])
chapters = [
    ('A','Positionierung','Zielgruppe, Nutzenversprechen und Abgrenzung','Teil_A_Positionierung.pdf'),
    ('B','Markenwelt und Design','Logo, Farbwelt, Typografie und Produkt','Teil_B_Markenwelt_und_Design.pdf'),
    ('C','Landingpage und Umsetzung','Öffentliche Demo und geprüfte Bestellstrecke','Teil_C_Landingpage_und_Pruefung.pdf'),
    ('D','Tracking-Konzept','Events, Einwilligung und Kaufmessung','Teil_D_Tracking.pdf'),
    ('E','Kampagnenplan','Funnel, Budget, Wirtschaftlichkeit und Tests','Teil_E_Kampagnenplan.pdf'),
    ('F','Creatives und Anzeigentexte','Vier Ansätze mit Feed- und Story-Versionen','Teil_F_Creatives_und_Anzeigentexte.pdf'),
    ('G','KI-Reflexion','Drei Entscheidungen aus dem Arbeitsprozess','Teil_G_KI_Reflexion.pdf'),
]
starts, readers = [], []
offset = 2
for _,_,_,file in chapters:
    reader = PdfReader(ROOT/'docs'/file)
    readers.append(reader)
    starts.append(offset)
    offset += len(reader.pages)
total = offset

def text(c, x,y, value, size=11, font='Body', color=INK):
    c.setFillColor(color); c.setFont(font,size); c.drawString(x,y,value)

def asset(c, file, x,y,w,h):
    im = Image.open(ROOT/'public/images'/file).convert('RGBA')
    if im.getbbox(): im=im.crop(im.getbbox())
    c.drawImage(ImageReader(im),x,y,w,h,mask='auto',preserveAspectRatio=True,anchor='c')

front = BytesIO()
c = canvas.Canvas(front,pagesize=(W,H))
asset(c,'lumea-logo.png',44,743,178,61)
c.setFillColor(SAGE);c.setFont('Bold',10)
c.drawRightString(551,792,'TECHNICAL MARKETING EXPERT')
c.setFillColor(MUTED);c.setFont('Body',10)
c.drawRightString(551,771,'Florian Albert')
c.drawRightString(551,750,'Probearbeit · 23. Oktober 2026')
text(c,44,586,'Strategie trifft',43,'Title')
text(c,44,531,'Umsetzung.',43,'Title')
text(c,44,482,'Positionierung, Marke und Performance-Marketing',12)
c.setStrokeColor(HexColor('#DFE3DB'));c.line(44,450,551,450)
text(c,44,409,'Eine Marke. Ein durchgängiger Auftritt.',14,'Bold')
for i,line in enumerate(['Von der Positionierung über die Landingpage', 'bis zum Kampagnenplan und den fertigen Anzeigen.', 'Die Teile A bis G in einem Dokument.']):
    text(c,44,378-i*20,line,11,color=MUTED)
asset(c,'lumea-packshot.png',355,105,170,275)
text(c,44,212,'DIE LIVE-DEMO',9,'Bold',SAGE)
text(c,44,185,'lumea-projektarbeit.up.railway.app/',12,'Bold')
c.linkURL('https://lumea-projektarbeit.up.railway.app/',(44,179,310,201),relative=0)
text(c,44,154,'Fiktives Projekt für die Probearbeit.',9,color=MUTED)
text(c,44,138,'Bestellstrecke ohne echte Zahlung.',9,color=MUTED)
text(c,44,44,'Lumea · Weiter du.',10,color=SAGE)
c.showPage()

text(c,44,790,'DIE ABGABE IM ÜBERBLICK',10,'Bold',SAGE)
text(c,44,740,'Inhalt',34,'Title')
toc_rects=[]
for i,((letter,title,desc,_),start,reader) in enumerate(zip(chapters,starts,readers)):
    y=685-i*66
    text(c,44,y,letter,14,'Bold',SAGE)
    text(c,80,y,title,13,'Bold')
    text(c,80,y-20,desc,9,color=MUTED)
    c.setFillColor(INK);c.setFont('Body',11)
    page_label=str(start+1) if len(reader.pages)==1 else f'{start+1}-{start+len(reader.pages)}'
    c.drawRightString(550,y,page_label)
    c.setStrokeColor(HexColor('#E4E7E0'));c.line(80,y-32,550,y-32)
    toc_rects.append((44,y-31,551,y+19))
text(c,44,190,'WEITERFÜHRENDE DATEIEN UND LINKS',9,'Bold',SAGE)
for label,url,y in [
    ('Landingpage und Demo-Bestellung','https://lumea-projektarbeit.up.railway.app/',167),
    ('Ratgeber / Advertorial','https://lumea-projektarbeit.up.railway.app/ratgeber/deine-routine-in-der-lebensmitte/',147),
    ('KI-Unterhaltung mit Bildausgaben (Freigabe-Snapshot)','https://chatgpt.com/s/cx_6ada8cb3c4f481919437afb62436c66d',127),
]:
    text(c,44,y,label,9,color=SAGE)
    c.linkURL(url,(44,y-3,550,y+12),relative=0)
for i,line in enumerate([
    'Zusätzlich im ZIP: acht Anzeigen-PNGs, Logo-Dateien, Tracking-Konfiguration',
    'und der verfügbare Gesprächsexport. Originalnachweis des älteren Chats',
    '„Probearbeit Strategieentwickeln“ noch offen; die Mitschrift ist rekonstruiert.',
]): text(c,44,91-i*14,line,8,color=MUTED)
c.save();front.seek(0)

writer=PdfWriter()
writer.append(PdfReader(front),import_outline=False)
writer.add_outline_item('Deckblatt',0)
writer.add_outline_item('Inhaltsverzeichnis',1)
for (letter,title,_,_),reader,start,rect in zip(chapters,readers,starts,toc_rects):
    writer.append(reader,import_outline=False)
    writer.add_outline_item(f'{letter} · {title}',start)
    writer.add_annotation(1,Link(rect=rect,target_page_index=start))

# Replace only the lower-right local footer number with a document-wide page number.
for idx,page in enumerate(writer.pages):
    if idx==0: continue
    overlay=BytesIO();f=canvas.Canvas(overlay,pagesize=(float(page.mediabox.width),float(page.mediabox.height)))
    f.setFillColor(white);f.rect(510,12,75,25,fill=1,stroke=0)
    f.setFillColor(MUTED);f.setFont('Body',8)
    f.drawRightString(551,24,f'{idx+1} / {total}')
    f.save();overlay.seek(0)
    page.merge_page(PdfReader(overlay).pages[0])
writer.add_metadata({'/Title':'Lumea - Gesamtabgabe Technical Marketing Expert','/Subject':'Positionierung, Marke, Landingpage, Tracking, Kampagnenplan, Creatives und KI-Reflexion','/Author':'Florian Albert','/Lang':'de-DE'})
writer.write(OUT)
result=PdfReader(OUT)
assert len(result.pages)==total==16
assert len(result.outline)==9
assert len(result.pages[1].get('/Annots',[]))>=10
for original,start in zip(readers,starts):
    for i,p in enumerate(original.pages):
        assert (p.extract_text() or '').strip() in (result.pages[start+i].extract_text() or '')
doc=pypdfium2.PdfDocument(OUT)
for i,page in enumerate(doc): page.render(scale=1.15).to_pil().save(QA/f'page-{i+1:02d}.png')
(QA/'checks.json').write_text(json.dumps(dict(pages=total,bookmarks=len(result.outline),content_preserved=True,output=str(OUT)),indent=2),encoding='utf-8')
print(f'Created {OUT.name}: {total} pages, 9 bookmarks, chapter text preserved; all pages rendered.')
