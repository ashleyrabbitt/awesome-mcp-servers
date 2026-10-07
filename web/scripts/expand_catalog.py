"""Import attributed community entries from a supplied MIT catalog snapshot.
Usage: python3 scripts/expand_catalog.py PATH [TOTAL=500]
No listed server code is downloaded or executed. Existing IDs are preserved.
"""
import json,re,html,sys,hashlib
from pathlib import Path
root=Path(__file__).resolve().parents[1]
source=Path(sys.argv[1] if len(sys.argv)>1 else root/'scripts/source-readme.md')
target=int(sys.argv[2]) if len(sys.argv)>2 else 500
rows=json.loads((root/'public/imported.json').read_text()); seen={r['url'].rstrip('/').lower() for r in rows}
seen.update(re.findall(r"https://[^'\s]+",(root/'public/catalog.mjs').read_text()))
roles={'Marketing':['Marketers'],'Social Media':['Marketers'],'Architecture & Design':['Designers','Developers'],'Browser Automation':['Developers','Designers'],'Product Management':['Product managers'],'Research':['Product managers','Designers','Marketers'],'Data Visualization':['Designers','Marketers'],'Workplace & Productivity':['Product managers','Marketers'],'Knowledge & Memory':['Product managers','Designers'],'Communication':['Product managers','Marketers'],'E-Commerce':['Marketers'],'Multimedia Process':['Designers','Marketers'],'Education':['Designers','Marketers','Product managers'],'Search & Data Extraction':['Product managers','Marketers','Developers']}
groups={};category=''
for line in source.read_text().splitlines():
 if line.startswith('### '):
  category=re.sub(r'^[^A-Za-z]+','',re.sub(r'<[^>]+>','',line[4:])).strip()
 m=re.match(r'\s*[-*]\s+\[([^\]]+)\]\((https://github.com/[^)]+)\)',line)
 if not m or not category:continue
 name,url=m.groups(); desc=re.split(r'\s[-–]\s',line,maxsplit=1)
 if len(desc)<2 or url.rstrip('/').lower() in seen:continue
 text=html.unescape(re.sub(r'<[^>]+>','',re.sub(r'\[([^\]]+)\]\([^)]*\)',r'\1',desc[1]))).replace('`','').strip()
 if not text:continue
 slug=re.sub('[^a-z0-9]+','-',name.lower()).strip('-')
 groups.setdefault(category,[]).append({'id':'catalog-'+slug,'name':name.split('/')[-1],'publisher':name.split('/')[0],'type':'MCP servers','category':category,'roles':roles.get(category,['Developers']),'description':text,'url':url,'sourceUrl':'https://github.com/ashleyrabbitt/awesome-mcp-servers/blob/main/README.md','status':'Community listing','date':'2026-10-06','hosting':'Check documentation','level':'Check documentation','pricing':'Check provider','permissions':'Not assessed. Review current publisher permissions and scope before connecting.','tested':False})
ids={r['id'] for r in rows};added=[]
for i in range(max(map(len,groups.values()),default=0)):
 for group in groups.values():
  if len(rows)+13>=target:break
  if i>=len(group):continue
  r=group[i];key=r['url'].rstrip('/').lower()
  if key in seen:continue
  if r['id'] in ids:r['id']+='-'+hashlib.sha256(key.encode()).hexdigest()[:8]
  rows.append(r);added.append(r['id']);seen.add(key);ids.add(r['id'])
 if len(rows)+13>=target:break
(root/'public/imported.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2))
(root/'scripts/catalog-review-queue.json').write_text(json.dumps({'note':'Offline editorial queue; entries are published as unverified community listings, never security endorsements.','source':str(source.name),'added':added,'reviewStages':['publisher identity','current documentation','task fit','permissions','pricing date','optional bounded live test']},indent=2))
print(f'{len(rows)+13} total tools; {len(added)} new community entries; {len(groups)} source categories.')
