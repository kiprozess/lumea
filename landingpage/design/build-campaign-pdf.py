from pathlib import Path
from reportlab.platypus import SimpleDocTemplate, Paragraph, Table, TableStyle, Spacer, PageBreak
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

ROOT = Path(__file__).resolve().parents[1]
for name, file in [('Inter', 'inter-400.ttf'), ('InterBold', 'inter-600.ttf'), ('Playfair', 'playfair-display-400.ttf')]:
    pdfmetrics.registerFont(TTFont(name, str(ROOT / 'public/fonts' / file)))
pdfmetrics.registerFontFamily('Inter', normal='Inter', bold='InterBold')
styles = {
    'title': ParagraphStyle('title', fontName='Playfair', fontSize=25, leading=30, spaceAfter=8),
    'intro': ParagraphStyle('intro', fontName='Inter', fontSize=10, leading=15, spaceAfter=12),
    'h': ParagraphStyle('h', fontName='InterBold', fontSize=12, leading=16, spaceBefore=12, spaceAfter=7, keepWithNext=True),
    'body': ParagraphStyle('body', fontName='Inter', fontSize=9.3, leading=13.2, spaceAfter=7),
    'cell': ParagraphStyle('cell', fontName='Inter', fontSize=9, leading=12.3),
    'header': ParagraphStyle('header', fontName='InterBold', fontSize=9, leading=12.3, textColor=colors.white),
}
def p(text, style='body'):
    return Paragraph(text, styles[style])

flow = [
    p('Lumea Kampagnenplan', 'title'),
    p('Meta führt vom ersten Interesse zum Kauf. Google ergänzt den Funnel mit einer Ratgeber-Suchkampagne und einer Produktkampagne über Performance Max.', 'intro'),
    p('01  Zielgruppe und Kanalrollen', 'h'),
    p('<b>Zielgruppe:</b> Berufstätige Frauen zwischen 45 und 55 Jahren, die erste Beschwerden in den Wechseljahren bemerken und noch keine Hormontherapie wollen oder bekommen.'),
    p('<b>Meta:</b> Informieren, Bedürfnisse vertiefen, Bedenken beantworten und das Produkt präsentieren.<br/><b>Google:</b> Mit Search aktive Informationssuchen erreichen; mit Performance Max produktbezogene Anzeigen kanalübergreifend ausspielen.'),
    p('02  Meta Funnel vom Erstkontakt bis zum Kauf', 'h'),
    p('Drei separate Kampagnen: Meta 1 ist offen. Meta 2 erreicht nur Besucherinnen aus Meta 1, Meta 3 nur Besucherinnen aus Meta 2. Meta 1 und 2 optimieren auf Landingpage-Aufrufe, Meta 3 auf Kauf (Purchase).'),
]
rows = [[p('Kampagne und Ziel', 'header'), p('Zielgruppe', 'header'), p('Inhalt und nächster Schritt', 'header')]]
data = [
    ('<b>1  Informieren</b><br/>Ziel: Landingpage-Aufrufe<br/>Kein Geldwert', 'Offene Ansprache innerhalb der definierten Zielgruppe; kein vorheriger Kontakt erforderlich.', 'Die Lebensphase verständlich erklären und auf einen Ratgeber führen. Nur nachweisliche Besuche über Meta 1 qualifizieren für Meta 2.'),
    ('<b>2  Problem und<br/>Bedenken</b><br/>Ziel: Landingpage-Aufrufe<br/>Kein Geldwert', 'Nur Besucherinnen aus Meta 1: letzte 14 Tage, optional 7 Tage. Meta-3-Gruppe und Käuferinnen ausschließen.', 'Alltagssituationen und veränderte Bedürfnisse vertiefen, ohne Beschwerden zu dramatisieren. Gleichzeitig Bedenken zu Zusammensetzung, hormonfreier Rezeptur, Qualität und Anwendung beantworten. Nur nachweisliche Besuche über Meta 2 qualifizieren für Meta 3.'),
    ('<b>3  Produkt<br/>und Kauf</b><br/>Ziel: Kauf<br/>Purchase<br/>Wert: 14,50 EUR', 'Nur Besucherinnen aus Meta 2: letzte 30 Tage. Käuferinnen ausschließen.', 'Lumea, tägliche Einnahme, Einstiegsangebot und Abo-Bedingungen präsentieren. Auf Erstbestellungen optimieren: Purchase mit value: 14.50 und currency: EUR. Kein direkter Einstieg allein über einen Produkt- oder Checkout-Besuch.'),
]
rows.extend([[p(a, 'cell'), p(b, 'cell'), p(c, 'cell')] for a, b, c in data])
table = Table(rows, colWidths=[100, 132, A4[0]-88-232], repeatRows=1, hAlign='LEFT')
table.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#3F4A3F')),
    ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor('#F5F6F3')]),
    ('GRID', (0,0), (-1,-1), .45, colors.HexColor('#D9D9D9')),
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ('LEFTPADDING', (0,0), (-1,-1), 6), ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ('TOPPADDING', (0,0), (-1,-1), 6), ('BOTTOMPADDING', (0,0), (-1,-1), 6),
]))
flow += [table,
    p('03  Google mit Ratgeber und Produktkampagne', 'h'),
    p('<b>Ratgeber Search:</b> Suchkampagne auf Klicks: aktive Informationssuchen führen auf den Ratgeber. Kontextbezogene Keywords statt Gesundheitsprofile; negative Keywords für Jobs, Studium und fachfremde Treffer. Interesse bedeutet noch keine Kaufabsicht.'),
    p('<b>Produkt Performance Max:</b> Produktanzeigen führen auf die Produktseite und optimieren auf Kauf (14,50 EUR). PMax umfasst mehrere Google-Kanäle. Keine Zielgruppensignale aus Gesundheitsinteressen oder gesundheitsbezogenes Remarketing. Wirtschaftlichkeit im Test prüfen.'),
    p('04  Umsetzung und Kommunikation', 'h'),
    p('<b>Anzeigengruppen und Platzierungen:</b> Je Kampagne eine Gruppe; Deutschland, Frauen 45–55, ohne gesundheitsbezogene Interessenfilter. Facebook und Instagram: Feed (4:5), Stories und Reels (9:16). Der erste Format-Test läuft nur im Feed mit 4:5. Besucherfenster beziehen sich auf den letzten passenden Besuch.'),
    p('<b>Retargeting:</b> Plan unter Vorbehalt zulässiger Zielgruppen und Purchase-Freigabe durch Meta. Bei Health-Datenrestriktionen betroffene Stufen pausieren, nicht über Ersatz-Events umgehen. Meta 2 schließt Meta 3 aus; Käuferinnen überall ausschließen. Nur einwilligungsbasierte, zulässige Zuordnung. Kleine Gruppen: Budget begrenzen.'),
]
flow += [
    PageBreak(),
    p('Wirtschaftlichkeit', 'title'),
    p('Planungsziel: maximal 35 EUR Media-Kosten je neu gewonnenem Abo. Der Wert bezieht alle bezahlten Funnel-Stufen und Kanäle ein.', 'intro'),
    p('05  Rechenweg aus dem Briefing', 'h'),
    p('Grundlage: 14,50 EUR im ersten Monat, danach 29 EUR monatlich; durchschnittlich fünf bezahlte Monatspackungen je Abo. Kosten je Packung: 5,80 + 3,90 + 1,20 = <b>10,90 EUR</b>.'),
]
economics = [
    ('Kennzahl je gewonnenem Abo', 'Rechenweg', 'Ergebnis'),
    ('Erwarteter Umsatz über die Abo-Laufzeit', '14,50 + 4 × 29,00', '130,50 EUR'),
    ('Variable Kosten über die Abo-Laufzeit', '5 × 10,90', '54,50 EUR'),
    ('Beitrag vor Werbung und weiteren Kosten', '130,50 − 54,50', '76,00 EUR'),
    ('Verbleibender Beitrag bei Ziel-CPA', '76,00 − 35,00', '41,00 EUR'),
]
e = Table([[p(v, 'header' if i == 0 else 'cell') for v in row] for i, row in enumerate(economics)], colWidths=[242, 160, A4[0]-88-402], repeatRows=1)
e.setStyle(TableStyle([
    ('BACKGROUND',(0,0),(-1,0),colors.HexColor('#3F4A3F')),
    ('ROWBACKGROUNDS',(0,1),(-1,-1),[colors.white,colors.HexColor('#F5F6F3')]),
    ('GRID',(0,0),(-1,-1),.45,colors.HexColor('#D9D9D9')),
    ('VALIGN',(0,0),(-1,-1),'MIDDLE'),
    ('LEFTPADDING',(0,0),(-1,-1),9),('RIGHTPADDING',(0,0),(-1,-1),9),
    ('TOPPADDING',(0,0),(-1,-1),9),('BOTTOMPADDING',(0,0),(-1,-1),9),
]))
flow += [e,
    p('06  Ziel-CPA und wirtschaftliche Grenze', 'h'),
    p('<b>Ziel-CPA: höchstens 35 EUR.</b> Dieser von uns gesetzte Testwert verbraucht rund 46 % des erwarteten Beitrags vor Werbung. Rechnerisch bleiben 41 EUR für weitere Kosten und Ergebnis. Er ist ein Planungsziel, kein belegter Marktwert.'),
    p('<b>Rechnerische Obergrenze: 76 EUR.</b> Bei diesem Akquisitionspreis wäre der gesamte erwartete Beitrag vor weiteren Kosten aufgebraucht. Dieser Wert ist keine Freigabe für profitables Skalieren.'),
    p('<b>Messung:</b> CPA = gesamte zurechenbare Media-Ausgaben von Meta und Google ÷ eindeutig neu gewonnene Abos. Die Ausgaben der beiden Traffic-Kampagnen zählen mit. Abschlüsse werden kanalübergreifend dedupliziert; reine Kampagne-3-CPAs reichen zur Bewertung des Funnels nicht aus.'),
    p('07  ROAS und zeitlicher Umsatzbezug', 'h'),
    p('<b>ROAS auf die erste Zahlung:</b> 14,50 ÷ 35 = <b>0,41</b>. Ein anfänglicher ROAS unter 1 ist bei diesem Abo-Modell möglich. Im Purchase-Event bleiben ausschließlich die tatsächlich gezahlten 14,50 EUR hinterlegt.'),
    p('<b>Erwarteter Umsatz-ROAS über die Abo-Laufzeit:</b> 130,50 ÷ 35 = <b>3,73</b>. Das ist eine Prognose und kein bereits erzielter Plattform-ROAS. Die rechnerische Break-even-Marke auf derselben Basis liegt bei 130,50 ÷ 76 = <b>1,72</b>, jeweils vor weiteren Kosten.'),
    p('08  Annahmen und Sensitivität', 'h'),
    p('<b>Bindungsrisiko:</b> 30 % kündigen nach Monat eins; der Median liegt bei drei Monaten. Bei nur drei bezahlten Monaten wären es 72,50 EUR Umsatz minus 32,70 EUR variable Kosten = 39,80 EUR vor Werbung; nach 35 EUR CPA bleiben nur 4,80 EUR. Bei einem Monat entsteht nach Werbung ein Minus von 31,40 EUR.'),
    p('<b>Keine doppelte Kürzung:</b> Die durchschnittliche Laufzeit von fünf Monaten berücksichtigt die bestehenden Kündigungen bereits. Die 30 % werden deshalb nicht erneut vom errechneten Umsatz abgezogen. Die weitere Bindung ab Monat drei ist ein Kohortensignal, kein zusätzlicher pauschaler Umsatzaufschlag.'),
    p('<b>Rechenbasis:</b> Die Briefing-Beträge werden mangels Steuerangaben unverändert und als vergleichbar behandelt. Umsatzsteuer, Fixkosten, Creative-Produktion und weitere nicht genannte Kosten sind nicht bereinigt. Vor einer realen Skalierung sind Netto-Basis, tatsächliche Kohortenbindung und Liquidität zu prüfen. Quelle: Aufgabenblatt, Briefing auf Seiten 1 und 2.'),
]
flow += [
    PageBreak(),
    p('Budget und Tests', 'title'),
    p('10.000 EUR pro Monat: 8.000 EUR Meta und 2.000 EUR Google. Die Kanalverteilung gilt als Startplan für beide Monate.', 'intro'),
    p('09  Budget je Kampagne und Monat', 'h'),
]
def campaign_table(data):
    t = Table([[p(v, 'header' if i == 0 else 'cell') for v in row] for i,row in enumerate(data)], colWidths=[204,101,101,A4[0]-88-406], repeatRows=1)
    t.setStyle(TableStyle([
        ('BACKGROUND',(0,0),(-1,0),colors.HexColor('#3F4A3F')),
        ('ROWBACKGROUNDS',(0,1),(-1,-1),[colors.white,colors.HexColor('#F5F6F3')]),
        ('GRID',(0,0),(-1,-1),.45,colors.HexColor('#D9D9D9')),
        ('VALIGN',(0,0),(-1,-1),'MIDDLE'),
        ('LEFTPADDING',(0,0),(-1,-1),9),('RIGHTPADDING',(0,0),(-1,-1),9),
        ('TOPPADDING',(0,0),(-1,-1),5),('BOTTOMPADDING',(0,0),(-1,-1),5),
    ]))
    return t
flow += [campaign_table([
    ('Kampagne', 'Monat 1', 'Monat 2', 'Gesamt'),
    ('Meta 1 · Informieren (60 %)', '4.800 EUR', '4.800 EUR', '9.600 EUR'),
    ('Meta 2 · Problem und Bedenken (20 %)', '1.600 EUR', '1.600 EUR', '3.200 EUR'),
    ('Meta 3 · Produkt und Kauf (20 %)', '1.600 EUR', '1.600 EUR', '3.200 EUR'),
    ('Google · Ratgeber Search (40 %)', '800 EUR', '800 EUR', '1.600 EUR'),
    ('Google · Produkt PMax (60 %)', '1.200 EUR', '1.200 EUR', '2.400 EUR'),
    ('Gesamt', '10.000 EUR', '10.000 EUR', '20.000 EUR'),
]), Spacer(1,8),
    p('<b>Verteilung:</b> Anteile gelten je Kanal. Meta baut überwiegend neue Besuchergruppen auf. PMax optimiert auf Purchase mit 14,50 EUR; Ratgeberbesuche sind kein Kaufziel.'),
    p('<b>Steuerung:</b> Bei zu kleinen Retargeting-Gruppen Budget zunächst an Meta 1 geben. Maßstab ist der Gesamt-CPA von 35 EUR. Budgets sind Obergrenzen, keine Ausgabepflicht.'),
    p('10  A B Test ab Woche eins', 'h'),
    p('<b>Hypothese:</b> Ein kurzes Erklärvideo gewinnt bei gleicher Botschaft günstigere Landingpage-Aufrufe als ein statisches Bild.'),
    p('<b>Varianten:</b> A = Video, B = Bild zum selben Thema. Hook, Kernaussage, Text, CTA, Zielseite, Zielgruppe, Platzierungen und Seitenverhältnis bleiben gleich. Zufällige, überschneidungsfreie Gruppen; gleiches Budget.'),
    p('<b>Budget und Messung:</b> Sieben Tage, je 560 EUR pro Variante aus Meta 1 (30 Tage Planungsmonat). Hauptkennzahl: Kosten je Landingpage-Aufruf; ergänzend CTR und geladene Seiten je Linkklick. Traffic-Erfolg belegt noch keinen Kauf-Erfolg.'),
    p('<b>Entscheidung:</b> Tag 8: Gewinner bei mindestens 15 % Kostenvorteil und 95 % Konfidenzniveau. Sonst bis Tag 14 verlängern, maximal weitere 1.120 EUR aus Meta 1. Bei unklarem Ergebnis kein Gewinner. 15 % sind eine vorab gesetzte praktische Schwelle.'),
    p('<b>Danach:</b> Themen, Hooks und Seitenverhältnisse nacheinander gegen den bisherigen Gewinner testen. Jeweils einen Faktor ändern; Übertragbarkeit auf andere Funnel-Stufen prüfen.'),
    p('11  Reaktion in Woche drei bei 70 EUR CPA', 'h'),
    p('<b>Einordnen:</b> 70 EUR sind das Doppelte des Ziels von 35 EUR. Vom erwarteten Beitrag von 76 EUR bleiben nur 6 EUR vor weiteren Kosten. Keine Skalierung; Budgetobergrenzen müssen nicht ausgeschöpft werden.'),
    p('<b>1 · Messung prüfen:</b> Purchase-Duplikate, fehlende Abschlüsse, Einwilligung, Zuordnung und Abschlussverzögerung kontrollieren. Plattformmeldungen mit Bestellungen abgleichen; ausreichend gereifte Akquisitionskohorten und sämtliche Funnel-Kosten vergleichen.'),
    p('<b>2 · Engpass lokalisieren:</b> Je Kanal und Stufe die Strecke von Anzeige über Landingpage und Produkt bis Checkout und Kauf prüfen. Hohe Klickkosten, schwache Folgequoten und Checkout-Abbrüche getrennt behandeln; auch Suchbegriffe und Retargeting-Frequenz auswerten.'),
    p('<b>3 · Gezielt eingreifen:</b> Belegte Budgetverluste pausieren oder reduzieren. Nur in nachweislich effizientere Bereiche umschichten. Am größten Engpass eine Änderung testen: Creative oder Hook bei schwacher Ansprache, Inhalt und CTA bei fehlenden Folgeklicks, Checkout bei Kaufabbrüchen.'),
    p('<b>4 · Neu entscheiden:</b> Erste technische Kontrolle nach 48 bis 72 Stunden; Wirkung erst nach ausreichender Abschlusszeit und Datenmenge bewerten. Bleibt der gereifte Gesamt-CPA bei etwa 70 EUR, Ausgaben weiter reduzieren oder pausieren. Erst bei belastbarer Annäherung an 35 EUR wieder schrittweise erhöhen.'),
    p('PMax-Kanalumfang: <link href="https://business.google.com/us/ad-solutions/performance-max/" color="#3F4A3F">Google Ads · Performance Max</link>.'),
]
from copy import copy
last_break = max(i for i, item in enumerate(flow) if isinstance(item, PageBreak))
for item in flow[last_break+1:]:
    if isinstance(item, Paragraph):
        st = copy(item.style)
        if st.name == 'body':
            st.fontSize, st.leading, st.spaceAfter = 9, 12.2, 5
        elif st.name == 'h':
            st.spaceBefore, st.spaceAfter = 9, 6
        item.style = st
out = ROOT / 'docs/Teil_E_Kampagnenplan.pdf'
SimpleDocTemplate(str(out), pagesize=A4, leftMargin=44, rightMargin=44, topMargin=34, bottomMargin=30,
                  title='Lumea Kampagnenplan', author='').build(flow)
print(out)
