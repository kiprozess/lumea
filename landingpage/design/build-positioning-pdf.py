from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'docs'
OUT.mkdir(exist_ok=True)
for name, filename in [('Body','arial.ttf'),('Bold','arialbd.ttf'),('Serif','georgia.ttf')]:
    pdfmetrics.registerFont(TTFont(name, 'C:/Windows/Fonts/' + filename))
pdfmetrics.registerFontFamily('Body', normal='Body', bold='Bold', italic='Body', boldItalic='Bold')
olive = colors.HexColor('#414d3c')
ink = colors.HexColor('#39372e')
styles = {
 'kicker': ParagraphStyle('kicker', fontName='Bold',fontSize=8,leading=11,textColor=olive,spaceAfter=8),
 'title': ParagraphStyle('title',fontName='Serif',fontSize=29,leading=35,textColor=ink,spaceAfter=10),
 'heading': ParagraphStyle('heading',fontName='Bold',fontSize=10,leading=13,textColor=olive,spaceBefore=9,spaceAfter=5),
 'body': ParagraphStyle('body',fontName='Body',fontSize=9,leading=12.4,textColor=ink,spaceAfter=5),
 'quote': ParagraphStyle('quote',fontName='Serif',fontSize=14,leading=18,textColor=olive,spaceAfter=0),
 'cell': ParagraphStyle('cell',fontName='Body',fontSize=8.3,leading=11.2,textColor=ink),
 'small': ParagraphStyle('small',fontName='Body',fontSize=7.2,leading=9.3,textColor=colors.HexColor('#6d7566'),spaceBefore=6),
}
def p(text, style='body'): return Paragraph(text, styles[style])
story = [p('LUMEA  /  TEIL A · POSITIONIERUNG', 'kicker'), p('Weiter du.', 'title')]
quote = Table([[p('Eine bewusste Ergänzung für deine nächste Lebensphase.<br/>Klar in der Rezeptur. Einfach im Alltag.', 'quote')]], colWidths=[507])
quote.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),colors.HexColor('#f1f3ec')),('BOX',(0,0),(-1,-1),.4,colors.HexColor('#e3e7dc')),('LEFTPADDING',(0,0),(-1,-1),13),('RIGHTPADDING',(0,0),(-1,-1),13),('TOPPADDING',(0,0),(-1,-1),11),('BOTTOMPADDING',(0,0),(-1,-1),11)]))
story += [quote,
 p('01 · Wen wir ansprechen', 'heading'),
 p('Berufstätige Frauen von <b>45 bis 55 Jahren</b>, die erste Wechseljahrsbeschwerden bemerken und noch keine Hormontherapie möchten oder bekommen. Sie suchen Orientierung und möchten selbstbestimmt entscheiden. Der Wunsch nach einer übersichtlichen Ergänzung ist unsere Positionierungshypothese, keine gemessene Kundinnenpräferenz.'),
 p('02 · Kernbotschaft und konkreter Nutzen', 'heading'),
 p('Lumea verbindet Traubensilberkerzen-Extrakt, Vitamin B6, Vitamin D3 und Magnesium in <b>einer Kapsel am Tag</b>. Vegan, ohne zugesetzte Hormone, hergestellt in Deutschland. „Weiter du.“ steht für Kontinuität und Eigenständigkeit. Den Nutzen erklären wir konkret: <b>Vitamin B6 trägt zur Regulierung der Hormontätigkeit bei; Magnesium trägt zur Verringerung von Müdigkeit und Ermüdung bei.</b> Diese Funktionen beziehen sich auf die Nährstoffe, nicht auf eine nachgewiesene Behandlung von Wechseljahrsbeschwerden durch Lumea. [1]'),
 p('03 · Warum Lumea statt Konkurrenz oder Nichtstun?', 'heading'),
 p('Lumea differenziert sich über <b>klare Rezeptur, transparente Information und einfache Einnahme</b>, getragen von einer Ärztin und einer Produktmanagerin. Die kombinierte Tagesportion erspart eine eigene Zusammenstellung einzelner Präparate. Das kündbare Abo macht Kosten und Nachbestellung planbar: <b>14,50 € im ersten Monat, danach 29 € monatlich</b>, Versand in Deutschland inklusive. Gegenüber Nichtstun bieten wir Orientierung für eine gezielte Ergänzung, sofern sie zur individuellen Versorgung passt. Keine behauptete Überlegenheit gegenüber Wettbewerbern und kein Ersatz für ärztliche Behandlung.'),
 p('04 · Welche Aussagen wir verwenden und bewusst ändern', 'heading')]
rows = [
 ['Entscheidung', 'Umsetzung und Begründung'],
 ['Übernehmen', 'Produktdaten, eine Kapsel täglich, vegan, ohne zugesetzte Hormone, Deutschland-Herstellung und Abo-Konditionen aus dem fiktiven Briefing. Die 300 bisherigen Kundinnen sind eine Briefing-Annahme, kein Beleg für Wirksamkeit oder Bewertungen.'],
 ['Konkret belegen', 'Nährstofffunktionen gemäß EU-Liste und unter deren Verwendungsbedingungen. „Wissenschaftlich fundiert“ aus dem Markenboard wird über diese Funktionen erklärt; keine Behauptung einer klinisch geprüften Gesamtwirkung. „Natürlich“ beschreibt die Pflanzenkomponente, nicht pauschal alle Zutaten. [1]'],
 ['40-%-Aussage weglassen', '„Lumea reduziert Hitzewallungen nachweislich um 40 Prozent“ ist für die konkrete Rezeptur nicht belegt. Das Briefing nennt keine prüfbare Studienreferenz. Befunde zu bestimmten Traubensilberkerzen-Arzneimitteln sind nicht pauschal auf dieses Nahrungsergänzungsmittel übertragbar. Keine Heil- oder Erfolgsgarantie. [2, 3]'],
 ['Ansprache ändern', 'Statt „Leidest du unter Hitzewallungen?“: „Eine bewusste Ergänzung für die Wechseljahre.“ So bleibt das Thema erkennbar, ohne der Betrachterin einen persönlichen Gesundheitszustand zuzuschreiben. Keine Angstbilder oder Vorher-nachher-Versprechen. [4]'],
]
table = Table([[p(cell, 'cell') for cell in row] for row in rows], colWidths=[109,398])
table.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),colors.HexColor('#eef1e9')),('VALIGN',(0,0),(-1,-1),'TOP'),('LINEBELOW',(0,0),(-1,-1),.35,colors.HexColor('#dce1d5')),('LEFTPADDING',(0,0),(-1,-1),8),('RIGHTPADDING',(0,0),(-1,-1),8),('TOPPADDING',(0,0),(-1,-1),7),('BOTTOMPADDING',(0,0),(-1,-1),7)]))
story += [table,
 p('05 · Tonalität und visuelle Übersetzung', 'heading'),
 p('Ruhig, wertschätzend und positiv. Das Markenboard übersetzt dies in Salbeigrün, warme Naturtöne, Playfair Display und Inter sowie natürliche Bildwelten mit Frauen in der Lebensmitte. Premium entsteht durch Klarheit und Sorgfalt. Marke und Produkt sind fiktiv; Namen und Alter der Gründerinnen sind gestalterische Annahmen.'),
 p('Grundlage: bereitgestelltes Aufgabenblatt und Markenboard. Quellen: [1] <link href="https://www.verbrauchergesundheit.gv.at/dam/jcr:3a4f95a9-7a36-4987-8f1b-bfda1dc8798c/VO_EU_2012_432.pdf">VO (EU) 432/2012</link>; allgemeine Gesundheitsbezüge nur mit passender spezifischer Angabe, <link href="https://eur-lex.europa.eu/legal-content/DE/TXT/PDF/?uri=CELEX%3A32013D0063">Leitlinien zu Art. 10 HCVO</link>. [2] <link href="https://www.ema.europa.eu/en/medicines/herbal/cimicifugae-rhizoma">EMA: Cimicifugae rhizoma</link>. [3] <link href="https://www.gesetze-im-internet.de/heilmwerbg/__3.html">§ 3 HWG: Irreführung</link>, soweit einschlägig. [4] <link href="https://transparency.meta.com/policies/ad-standards/objectionable-content/privacy-violations-personal-attributes/">Meta: Privacy Violations and Personal Attributes</link>. Stand: 22.10.2026; Meta-Direktabruf eingeschränkt. Kein aus der Studie abgeleitetes Lumea-Wirkungsversprechen.', 'small')]
def footer(c, doc):
    c.setStrokeColor(colors.HexColor('#dce1d5')); c.line(44,31,551,31)
    c.setFont('Body',7.3);c.setFillColor(olive);c.drawString(44,20,'Lumea · Markteinführung · Technical Marketing Expert');c.drawRightString(551,20,'Teil A / '+str(doc.page))
SimpleDocTemplate(str(OUT/'Teil_A_Positionierung.pdf'),pagesize=(595.28,841.89),leftMargin=44,rightMargin=44,topMargin=31,bottomMargin=42,title='Lumea - Positionierung: Weiter du.',author='Lumea Probearbeit').build(story,onFirstPage=footer,onLaterPages=footer)
print(OUT/'Teil_A_Positionierung.pdf')
