"""Export visible conversation messages, excluding reasoning and privileged instructions."""
import json
import re
from pathlib import Path
from datetime import datetime, timezone

ROOT = Path(__file__).resolve().parents[1]
session_id = '01a15f35-ff35-7e70-86e4-2e437ab1a434'
records, seen = [], set()
for file in sorted((Path.home()/'.codex/sessions').rglob(f'*{session_id}*.jsonl')):
    for line in file.open(encoding='utf-8'):
        obj = json.loads(line)
        item = obj.get('payload', {})
        if obj['type'] != 'response_item' or item.get('type') != 'message' or item.get('role') not in ['user','assistant']:
            continue
        if item['role'] == 'assistant' and item.get('phase') not in ['commentary','final','final_answer']:
            continue
        text = '\n'.join(part.get('text','') for part in item.get('content',[]) if part.get('type') in ['input_text','output_text']).strip()
        if not text or text.startswith(('<environment_context>','<external_codex_apps_open_page>','<codex_internal_context')):
            continue
        text = re.sub(r'<in-app-browser-context[\s\S]*?</in-app-browser-context>', '', text).strip()
        key = item.get('id') or (item['role'], text, obj.get('timestamp'))
        if key in seen:
            continue
        seen.add(key)
        records.append({'timestamp':obj.get('timestamp'), 'role':item['role'], 'text':text})
records.sort(key=lambda record:record.get('timestamp') or '')
header = '# Lumea Gesprächsverlauf\n\n'
header += 'Exportzeitpunkt: '+datetime.now(timezone.utc).isoformat()+'\n\n'
header += 'Export aller sichtbaren Nutzer- und Assistenznachrichten dieser Codex-Unterhaltung aus den lokalen Sitzungsprotokollen bis zum Exportzeitpunkt. Fortschrittsmeldungen sind enthalten. Interne Modellüberlegungen, Systemvorgaben, technische App-Kontextblöcke und Werkzeug-Rohdaten sind nicht Bestandteil des Gesprächsexports. Bildausgaben und Werkzeugansichten sind im Freigabe-Link einsehbar; die ausgewählten finalen Creatives liegen zusätzlich als PNG-Dateien bei. Ein früherer rekonstruierter Austausch liegt separat in Probearbeit_Lumea_Chatverlauf.md vor.\n\n'
header += 'Freigabe-Link: siehe FREIGABE_UND_ABGABE.md.\n\n'
text = header + '\n\n'.join(f'## {i+1} · '+('Nutzer' if r['role']=='user' else 'Assistenz')+' · '+str(r['timestamp'])+'\n\n'+r['text'] for i,r in enumerate(records))
(ROOT/'docs/Teil_G_Gespraechsverlauf.md').write_text(text,encoding='utf-8')
print(f'{len(records)} visible messages exported')
