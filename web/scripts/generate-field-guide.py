import json, subprocess
from pathlib import Path
root=Path(__file__).resolve().parents[1]
sheets=json.loads(subprocess.check_output(["node","--input-type=module","-e","import {sheets} from './public/superpower-kits.mjs'; console.log(JSON.stringify(sheets))"],cwd=root,text=True))
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
p=str(root/'public/downloads/superpowers-field-guide.pdf')
c=canvas.Canvas(p,pagesize=(612,792));c.setTitle('Superpowers Field Guide | Waymaker');c.setAuthor('Waymaker')
for i,s in enumerate(sheets):
 c.setFillColor(HexColor('#202020'));c.setFont('Helvetica-Bold',11);c.drawString(44,748,'SUPERPOWERS / WAYMAKER')
 c.setFont('Helvetica',9);c.drawRightString(568,748,f'FIELD GUIDE  {i+1} / 8')
 c.setLineWidth(2);c.line(44,733,568,733)
 c.setFont('Helvetica-Bold',25);c.drawString(44,691,s['title'])
 c.setFont('Helvetica',11);c.drawString(44,666,s['intro'])
 for j,f in enumerate(s['fields']):
  y=618-j*131;c.setFont('Helvetica-Bold',11);c.drawString(44,y,f'{j+1:02}  {f}')
  c.setStrokeColor(HexColor('#aaaaaa'));c.setLineWidth(.5)
  for d in [27,51,75,99]:c.line(44,y-d,568,y-d)
 c.setFillColor(HexColor('#444444'));c.setFont('Helvetica',8)
 c.drawString(44,65,'Use approved or synthetic information. Keep sensitive details out of shared worksheets.')
 c.drawString(44,49,'Free editable worksheets: superpowers-complete-production.up.railway.app/field-guide')
 c.showPage()
c.save()
