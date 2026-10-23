from pathlib import Path
import hashlib, json, shutil, zipfile
from PIL import Image
from pypdf import PdfReader

root = Path(__file__).resolve().parents[1]
package = root.parent / 'Abgabe_Lumea_2026-10-23'
for source, target in [
    (root/'docs/Teil_B_Markenwelt_und_Design.pdf', package/'01_Dokumente/Teil_B_Markenwelt_und_Design.pdf'),
    (root/'docs/Teil_C_Landingpage_und_Pruefung.pdf', package/'01_Dokumente/Teil_C_Landingpage_und_Pruefung.pdf'),
    (root/'docs/Teil_F_Creatives_und_Anzeigentexte.pdf', package/'01_Dokumente/Teil_F_Creatives_und_Anzeigentexte.pdf'),
    (root/'creatives/anzeigen.json', package/'05_Technik/anzeigen.json'),
    (root/'creatives/GENERIERUNG.json', package/'05_Technik/GENERIERUNG.json'),
]:
    shutil.copy2(source, target)
for file in (root/'creatives/exports').glob('*.png'):
    shutil.copy2(file, package/'02_Creatives'/file.name)
shop_images = list((root/'public/images').glob('lumea-info-*-v4.png'))
if shop_images:
    (package/'06_Produktbilder').mkdir(exist_ok=True)
    for file in shop_images:
        shutil.copy2(file, package/'06_Produktbilder'/file.name)
    shutil.copy2(root/'design/product-infographic-v4-prompts.md', package/'05_Technik/product-infographic-v4-prompts.md')
combined = root/'docs/Lumea_Gesamtabgabe.pdf'
if combined.exists():
    shutil.copy2(combined, package/'00_Lumea_Gesamtabgabe.pdf')
manifest = json.loads((package/'MANIFEST.json').read_text(encoding='utf-8'))
manifest['public_url'] = 'https://lumea-projektarbeit.up.railway.app/'
manifest['author'] = 'Florian Albert'
manifest['creative_revision'] = '4: four Feed/Story pairs; Feed crops adjusted for at least 108px headline/subline top and side margins'
known = {check['file'] for check in manifest['checks']}
if combined.exists() and '00_Lumea_Gesamtabgabe.pdf' not in known:
    manifest['checks'].append(dict(file='00_Lumea_Gesamtabgabe.pdf', pages=len(PdfReader(combined).pages), passed=True))
for file in list((package/'02_Creatives').glob('*.png')) + list((package/'06_Produktbilder').glob('*.png')):
    name = file.relative_to(package).as_posix()
    if name not in known:
        manifest['checks'].append(dict(file=name, dimensions=list(Image.open(file).size), passed=True))
for check in manifest['checks']:
    file = package/check['file']
    if file.suffix == '.png':
        check['dimensions'] = list(Image.open(file).size)
    elif file.suffix == '.pdf':
        check['pages'] = len(PdfReader(file).pages)
manifest['files'] = [dict(file=str(p.relative_to(package)).replace('\\','/'), bytes=p.stat().st_size, sha256=hashlib.sha256(p.read_bytes()).hexdigest()) for p in sorted(package.rglob('*')) if p.is_file() and p.name != 'MANIFEST.json']
(package/'MANIFEST.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf-8')
archive = package.with_suffix('.zip')
with zipfile.ZipFile(archive, 'w', zipfile.ZIP_DEFLATED) as z:
    for file in sorted(package.rglob('*')):
        if file.is_file(): z.write(file, file.relative_to(package))
print(f'Updated delivery: {archive.name} ({archive.stat().st_size:,} bytes)')
