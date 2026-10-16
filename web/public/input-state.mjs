// Preserve browser edits across the one-time catalog refresh.
export function captureInputs(root){
  // URL-backed filters are rendered from the current URL, not stale static HTML.
  return [...root.querySelectorAll('input,textarea,select')].map((el,index)=>el.hasAttribute?.('data-filter')?null:({
    index,id:el.id,name:el.name,type:el.type,value:el.value,
    checked:el.checked,focused:el===el.ownerDocument.activeElement,
    start:el.selectionStart,end:el.selectionEnd
  })).filter(Boolean);
}
export function restoreInputs(root,draft){
  const controls=[...root.querySelectorAll('input,textarea,select')];
  for(const entry of draft){
    const el=entry.id?controls.find(x=>x.id===entry.id):controls[entry.index];
    if(!el||el.name!==entry.name||el.type!==entry.type)continue;
    el.value=entry.value;
    if(entry.type==='checkbox'||entry.type==='radio')el.checked=entry.checked;
    if(entry.focused){el.focus({preventScroll:true});if(entry.start!==null&&typeof el.setSelectionRange==='function')el.setSelectionRange(entry.start,entry.end)}
  }
}
