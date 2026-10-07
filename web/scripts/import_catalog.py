"""Refresh the source catalog from a locally supplied upstream README. No server code is executed."""
import json,re,html,pathlib
ROOT=pathlib.Path(__file__).resolve().parents[1]
source=(ROOT/'scripts/source-readme.md').read_text()
mapping={'Architecture & Design':['Designers'],'Browser Automation':['Developers','Designers'],'Developer Tools':['Developers'],'Marketing':['Marketers'],'Product Management':['Product managers'],'Research':['Product managers','Designers','Marketers'],'Security':['Developers'],'Social Media':['Marketers'],'Workplace & Productivity':['Product managers','Marketers'],'Knowledge & Memory':['Product managers','Designers'],'Data Visualization':['Designers','Marketers'],'Version Control':['Developers']}
groups={k:[] for k in mapping}
category=''
for line in source.splitlines():
 if line.startswith('### '):
  category=re.sub(r'<[^>]+>','',line[4:]); category=re.sub(r'^[^A-Za-z]+','',category).strip()
 if category not in groups:continue
 m=re.match(r'\s*[-*]\s+\[([^\]]+)\]\((https://github.com/[^)]+)\)',line)
 if not m:continue
 name,url=m.groups()
 desc=re.split(r'\s[-–]\s',line,maxsplit=1)
 if len(desc)<2:continue
 text=desc[1]
 text=re.sub(r'!\[[^\]]*\]\([^)]*\)','',text)
 text=re.sub(r'\[([^\]]+)\]\([^)]*\)',r'\1',text)
 text=html.unescape(re.sub(r'<[^>]+>','',text)).replace('`','').strip()
 # Keep upstream descriptions intact but make their unreviewed status explicit in the UI.
 slug=re.sub('[^a-z0-9]+','-',name.lower()).strip('-')
 groups[category].append({'id':'catalog-'+slug,'name':name.split('/')[-1],'publisher':name.split('/')[0],'type':'MCP servers','category':category,'roles':mapping[category],'description':text,'url':url,'sourceUrl':'https://github.com/ashleyrabbitt/awesome-mcp-servers/blob/main/README.md','status':'Community listing','date':'2026-10-06','hosting':'Local + remote (listed)' if '🏠' in line and '☁' in line else ('Local (listed)' if '🏠' in line else ('Remote (listed)' if '☁' in line else 'Check documentation')),'level':'Check documentation','pricing':'Check provider','permissions':'Not assessed. Review the publisher’s current documentation before connecting.','tested':False})
items=[];seen=set()
for i in range(50):
 for category,rows in groups.items():
  if i<len(rows):
   r=rows[i]
   if r['url'].lower() not in seen:
    seen.add(r['url'].lower());items.append(r)
  if len(items)==87:break
 if len(items)==87:break
(ROOT/'public/imported.json').write_text(json.dumps(items,ensure_ascii=False,indent=2))
print(f'Imported {len(items)} source-attributed listings across {len(groups)} categories.')
