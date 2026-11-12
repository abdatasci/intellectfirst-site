(function(){if(document.getElementById('ifr-root'))return;var s=document.createElement('style');s.id='ifr-style';s.textContent="\n.ifr-root{--ifr-bg:#FFFFFF;--ifr-ink:#14213D;--ifr-muted:#5B6B82;--ifr-line:#D8E1EE;--ifr-soft:#F4F7FB;--ifr-navy:#14213D;--ifr-gold:#C9A227;--ifr-ok:#1F7A4D;--ifr-warn:#A3471B;font-family:Calibri,\"Segoe UI\",system-ui,Arial,sans-serif;color:var(--ifr-ink)}\n@media (prefers-color-scheme:dark){:root:not([data-theme=\"light\"]) .ifr-root{--ifr-bg:#17233B;--ifr-ink:#E8EDF6;--ifr-muted:#9AA9C2;--ifr-line:#2A3A59;--ifr-soft:#0E1626;--ifr-navy:#0A101D;--ifr-gold:#E0B93C;--ifr-ok:#5CC28E;--ifr-warn:#F08A5D}}\n:root[data-theme=\"dark\"] .ifr-root{--ifr-bg:#17233B;--ifr-ink:#E8EDF6;--ifr-muted:#9AA9C2;--ifr-line:#2A3A59;--ifr-soft:#0E1626;--ifr-navy:#0A101D;--ifr-gold:#E0B93C;--ifr-ok:#5CC28E;--ifr-warn:#F08A5D}\n.ifr-root *{box-sizing:border-box}\n.ifr-fab{position:fixed;right:12px;bottom:calc(12px + env(safe-area-inset-bottom,0px));z-index:2147483000;all:unset;position:fixed;right:12px;bottom:calc(12px + env(safe-area-inset-bottom,0px));z-index:2147483000;cursor:pointer;background:#14213D;color:#FFFFFF;border:2px solid #C9A227;border-radius:999px;padding:8px 14px;font:700 13px/1 Calibri,\"Segoe UI\",system-ui,Arial,sans-serif;letter-spacing:.04em;box-shadow:0 4px 14px rgba(0,0,0,.25)}\n.ifr-fab:focus-visible{outline:3px solid #C9A227;outline-offset:2px}\n.ifr-scrim{position:fixed;inset:0;z-index:2147483001;background:rgba(10,16,29,.55);display:flex;align-items:flex-end;justify-content:center;padding:16px;padding-bottom:calc(16px + env(safe-area-inset-bottom,0px))}\n.ifr-scrim[hidden]{display:none!important}\n.ifr-sheet{background:var(--ifr-bg);color:var(--ifr-ink);width:100%;max-width:560px;max-height:min(86vh,720px);overflow:auto;border-radius:14px;border-top:4px solid var(--ifr-gold);box-shadow:0 12px 40px rgba(0,0,0,.35);display:flex;flex-direction:column}\n@media (min-width:640px){.ifr-scrim{align-items:center}}\n.ifr-head{display:flex;align-items:center;gap:10px;padding:14px 16px 8px}\n.ifr-head h2{margin:0;font:700 1.15rem/1.2 Cambria,Georgia,serif;flex:1;min-width:0}\n.ifr-x{all:unset;cursor:pointer;color:var(--ifr-muted);font-size:1.4rem;line-height:1;padding:4px 8px;border-radius:6px}\n.ifr-x:focus-visible,.ifr-tab:focus-visible,.ifr-btn:focus-visible{outline:2px solid var(--ifr-gold);outline-offset:2px}\n.ifr-tabs{display:flex;gap:6px;padding:0 16px 10px;flex-wrap:wrap}\n.ifr-tab{all:unset;cursor:pointer;padding:6px 12px;border-radius:999px;border:1px solid var(--ifr-line);font-size:.85rem;font-weight:600;color:var(--ifr-muted)}\n.ifr-tab[aria-selected=\"true\"]{background:var(--ifr-navy);color:#FFFFFF;border-color:var(--ifr-navy)}\n.ifr-body{padding:4px 16px 16px;display:flex;flex-direction:column;gap:12px}\n.ifr-row{display:grid;grid-template-columns:1fr 1fr;gap:10px}\n@media (max-width:420px){.ifr-row{grid-template-columns:1fr}}\n.ifr-f{display:flex;flex-direction:column;gap:4px;min-width:0}\n.ifr-f label{font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;color:var(--ifr-muted);font-weight:700}\n.ifr-f input,.ifr-f select{font:inherit;font-size:1rem;padding:9px 10px;border:1px solid var(--ifr-line);border-radius:8px;background:var(--ifr-soft);color:var(--ifr-ink);width:100%;min-width:0}\n.ifr-f input[readonly]{opacity:.85}\n.ifr-hint{font-size:.82rem;color:var(--ifr-muted);margin:0}\n.ifr-btn{all:unset;cursor:pointer;text-align:center;background:var(--ifr-gold);color:#14213D;font-weight:700;padding:10px 16px;border-radius:8px}\n.ifr-btn.ghost{background:transparent;color:var(--ifr-ink);border:1px solid var(--ifr-line)}\n.ifr-btn[disabled]{opacity:.5;cursor:default}\n.ifr-acts{display:flex;gap:8px;flex-wrap:wrap}\n.ifr-msg{font-size:.9rem;padding:10px 12px;border-radius:8px;background:var(--ifr-soft);border-left:4px solid var(--ifr-ok)}\n.ifr-msg.warn{border-left-color:var(--ifr-warn)}\n.ifr-card{border:2px dashed var(--ifr-gold);border-radius:12px;padding:14px;text-align:center;display:flex;flex-direction:column;gap:4px}\n.ifr-card b{font:700 2rem/1 Cambria,Georgia,serif;color:var(--ifr-gold);font-variant-numeric:tabular-nums}\n.ifr-teams{display:flex;flex-direction:column;gap:6px}\n.ifr-team{display:grid;grid-template-columns:1fr 90px 32px;gap:6px}\n.ifr-team input{font:inherit;padding:8px 10px;border:1px solid var(--ifr-line);border-radius:8px;background:var(--ifr-soft);color:var(--ifr-ink);min-width:0}\n.ifr-team input[type=number]{font-variant-numeric:tabular-nums}\n.ifr-tbl{overflow-x:auto;border:1px solid var(--ifr-line);border-radius:8px}\n.ifr-tbl table{border-collapse:collapse;width:100%;font-size:.85rem}\n.ifr-tbl th,.ifr-tbl td{text-align:left;padding:7px 9px;border-bottom:1px solid var(--ifr-line);white-space:nowrap}\n.ifr-tbl th{font-size:.7rem;letter-spacing:.08em;text-transform:uppercase;color:var(--ifr-muted);background:var(--ifr-soft)}\n.ifr-tbl td.n{font-variant-numeric:tabular-nums;text-align:right}\n.ifr-empty{color:var(--ifr-muted);font-size:.9rem;text-align:center;padding:14px}\n@media (prefers-reduced-motion:no-preference){.ifr-sheet{animation:ifr-up .18s ease-out}@keyframes ifr-up{from{transform:translateY(12px);opacity:.6}to{transform:none;opacity:1}}}\n";document.head.appendChild(s);var w=document.createElement('div');w.innerHTML="<div class=\"ifr-root\" id=\"ifr-root\">\n<button class=\"ifr-fab\" id=\"ifr-fab\" type=\"button\" aria-haspopup=\"dialog\">SCORES</button>\n<div class=\"ifr-scrim\" id=\"ifr-scrim\" hidden>\n<div class=\"ifr-sheet\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"ifr-title\">\n<div class=\"ifr-head\"><h2 id=\"ifr-title\">Save your score</h2><button class=\"ifr-x\" id=\"ifr-close\" type=\"button\" aria-label=\"Close\">\u00d7</button></div>\n<div class=\"ifr-tabs\" id=\"ifr-tabs\" hidden>\n<button class=\"ifr-tab\" type=\"button\" data-t=\"class\" aria-selected=\"true\">Save class result</button>\n<button class=\"ifr-tab\" type=\"button\" data-t=\"results\" aria-selected=\"false\">Results</button>\n<button class=\"ifr-tab\" type=\"button\" data-t=\"me\" aria-selected=\"false\">Single student</button>\n</div>\n<div class=\"ifr-body\" id=\"ifr-p-me\">\n<div class=\"ifr-row\"><div class=\"ifr-f\"><label for=\"ifr-name\">Your name</label><input id=\"ifr-name\" autocomplete=\"name\" maxlength=\"60\" placeholder=\"e.g. Aruzhan K.\"></div><div class=\"ifr-f\"><label for=\"ifr-group\">Group</label><input id=\"ifr-group\" maxlength=\"40\" placeholder=\"e.g. A1 Mon/Wed\"></div></div>\n<div class=\"ifr-row\"><div class=\"ifr-f\"><label for=\"ifr-score\">Score</label><select id=\"ifr-pick\" hidden></select><input id=\"ifr-score\" type=\"number\" inputmode=\"numeric\" step=\"any\"></div><div class=\"ifr-f\"><label for=\"ifr-total\">Out of (optional)</label><input id=\"ifr-total\" type=\"number\" inputmode=\"numeric\" step=\"any\"></div></div>\n<p class=\"ifr-hint\" id=\"ifr-src\"></p>\n<div class=\"ifr-acts\"><button class=\"ifr-btn\" id=\"ifr-save\" type=\"button\">Save score</button></div>\n<div id=\"ifr-out\"></div>\n</div>\n<div class=\"ifr-body\" id=\"ifr-p-class\" hidden>\n<div class=\"ifr-row\"><div class=\"ifr-f\"><label for=\"ifr-cgroup\">Group</label><input id=\"ifr-cgroup\" maxlength=\"40\" placeholder=\"e.g. Teens C1\"></div><div class=\"ifr-f\"><label for=\"ifr-cnote\">Round / note (optional)</label><input id=\"ifr-cnote\" maxlength=\"80\" placeholder=\"e.g. Unit 6B review\"></div></div>\n<div class=\"ifr-f\"><label>Teams or students and their scores</label><div class=\"ifr-teams\" id=\"ifr-teams\"></div></div>\n<p class=\"ifr-hint\" id=\"ifr-csrc\"></p>\n<div class=\"ifr-acts\"><button class=\"ifr-btn ghost\" id=\"ifr-add\" type=\"button\">Add row</button><button class=\"ifr-btn ghost\" id=\"ifr-refill\" type=\"button\">Read scores from game</button><button class=\"ifr-btn\" id=\"ifr-csave\" type=\"button\">Save result</button></div>\n<div id=\"ifr-cout\"></div>\n</div>\n<div class=\"ifr-body\" id=\"ifr-p-results\" hidden>\n<div class=\"ifr-row\"><div class=\"ifr-f\"><label for=\"ifr-filter\">Group</label><select id=\"ifr-filter\"><option value=\"\">All groups</option></select></div><div class=\"ifr-f\"><label>&nbsp;</label><button class=\"ifr-btn ghost\" id=\"ifr-csv\" type=\"button\">Download CSV</button></div></div>\n<div class=\"ifr-tbl\"><table><thead><tr><th>Date</th><th>Group</th><th>Name / team</th><th>Score</th><th>Activity</th><th>Saved by</th></tr></thead><tbody id=\"ifr-rows\"></tbody></table></div>\n<div id=\"ifr-rout\"></div>\n</div>\n</div>\n</div>\n</div>";document.body.appendChild(w.firstElementChild);})();
(function(){
if(window.IFResults)return;
var $=function(i){return document.getElementById(i)};
var GAME=(document.title||'Game').trim();
var state={db:null,user:null,uid:null,owner:false,reported:null,students:[],sessions:[],subs:false};
function ls(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}}
function num(t){var m=String(t||'').replace(/ /g,' ').match(/-?\d+(?:[.,]\d+)?/);return m?parseFloat(m[0].replace(',','.')):null}
function activity(){
  var t=GAME,fr=document.querySelectorAll('iframe');
  for(var i=0;i<fr.length;i++){try{var d=fr[i].contentDocument;if(d&&fr[i].offsetParent!==null&&d.title&&d.title.trim())t=GAME+' · '+d.title.trim()}catch(e){}}
  var pt=document.getElementById('ptitle');if(pt&&pt.offsetParent!==null&&pt.textContent.trim())t=GAME+' · '+pt.textContent.trim();
  return t.slice(0,140);
}
/* Find visible score readouts in this page and any same-origin game frames */
function detect(){
  var out=[],seen=[];
  function scan(doc,depth){
    if(!doc||depth>3)return;
    var els;try{els=doc.querySelectorAll('[id*="score" i],[class*="score" i],[id*="point" i],[class*="point" i],[id*="pts" i],[class*="pts" i]')}catch(e){return}
    for(var i=0;i<els.length;i++){
      var el=els[i];if(el.closest&&el.closest('#ifr-root'))continue;
      var kids=Array.prototype.filter.call(el.children,function(c){return num(c.textContent)!==null&&c.getClientRects().length});
      if(kids.length>=2&&kids.length<=8){kids.forEach(function(c){if(seen.indexOf(c)>=0)return;seen.push(c);var n=c.querySelector('b,strong,span');var v=num(n?n.textContent:c.textContent);var l=(c.textContent||'').replace(/-?\d+(?:[.,]\d+)?/g,'').replace(/[\s:·|\/]+/g,' ').trim();out.push({label:(l||'Team').slice(0,40),score:v,total:null})});seen.push(el);continue}
      if(el.childElementCount>3)continue;
      var vis=el.getClientRects&&el.getClientRects().length>0;if(!vis)continue;
      var v=num(el.textContent);if(v===null)continue;
      if(seen.indexOf(el)>=0)continue;
      var skip=false;for(var j=0;j<seen.length;j++){if(seen[j].contains(el)||el.contains(seen[j])){skip=true;break}}
      if(skip)continue;seen.push(el);
      var lab=el.getAttribute('aria-label')||'';
      if(!lab){var p=el.parentElement,hops=0;while(p&&hops<3){var txt=(p.textContent||'').replace(/-?\d+(?:[.,]\d+)?/g,'').replace(/[\s:·|\/]+/g,' ').trim();if(txt&&txt.length<=40){lab=txt;break}p=p.parentElement;hops++}}
      if(!lab)lab=(el.id||'Score').replace(/[-_]/g,' ');
      var tot=null,m=String(el.textContent).match(/(\d+)\s*(?:\/|of|из)\s*(\d+)/i);if(m){v=parseFloat(m[1]);tot=parseFloat(m[2])}
      out.push({label:lab.slice(0,40),score:v,total:tot});
    }
    var fr=doc.querySelectorAll('iframe');
    for(var k=0;k<fr.length;k++){try{scan(fr[k].contentDocument,depth+1)}catch(e){}}
  }
  scan(document,0);
  if(!out.length){
    /* End screens often print the result in a heading: "740 points", "8 / 10 correct", "Score: 12" */
    var rx=/(-?\d+(?:[.,]\d+)?)\s*(?:points|pts|очк\S*|ұпай)|(\d+)\s*(?:\/|of|из)\s*(\d+)|(?:score|счёт|счет)\s*[:\-]?\s*(-?\d+)/i;
    (function txt(doc,depth){
      if(!doc||depth>3||out.length)return;
      var hs;try{hs=doc.querySelectorAll('h1,h2,h3,.big,.result,.final,[class*="result" i],[class*="final" i]')}catch(e){return}
      for(var i=0;i<hs.length&&out.length<4;i++){var h=hs[i];if(h.closest&&h.closest('#ifr-root'))continue;if(!h.getClientRects().length)continue;var m=String(h.textContent).match(rx);if(!m)continue;
        if(m[1]!=null)out.push({label:'Score',score:parseFloat(m[1].replace(',','.')),total:null});
        else if(m[2]!=null)out.push({label:'Correct',score:+m[2],total:+m[3]});
        else out.push({label:'Score',score:+m[4],total:null});}
      var fr=doc.querySelectorAll('iframe');for(var k=0;k<fr.length;k++){try{txt(fr[k].contentDocument,depth+1)}catch(e){}}
    })(document,0);
  }
  return out.slice(0,12);
}
function fmtDate(iso){try{var d=new Date(iso);return d.toLocaleDateString(undefined,{day:'2-digit',month:'short'})+' '+d.toLocaleTimeString(undefined,{hour:'2-digit',minute:'2-digit'})}catch(e){return iso}}
function msg(box,text,warn){var d=document.createElement('div');d.className='ifr-msg'+(warn?' warn':'');d.textContent=text;$(box).innerHTML='';$(box).appendChild(d)}

/* ---------- single student ---------- */
var picks=[];
function fillMe(){
  $('ifr-name').value=ls('ifr_name')||$('ifr-name').value||'';
  $('ifr-group').value=ls('ifr_group')||$('ifr-group').value||'';
  $('ifr-out').innerHTML='';
  var sel=$('ifr-pick'),sc=$('ifr-score'),tt=$('ifr-total');
  picks=state.reported?[state.reported]:detect();
  sel.innerHTML='';
  if(picks.length){
    picks.forEach(function(p,i){var o=document.createElement('option');o.value=i;o.textContent=p.label+': '+p.score+(p.total!=null?' / '+p.total:'');sel.appendChild(o)});
    sel.hidden=picks.length<2;sc.readOnly=!state.owner;
    var apply=function(){var p=picks[+sel.value||0];sc.value=p.score;tt.value=p.total!=null?p.total:'';};sel.onchange=apply;apply();
    $('ifr-src').textContent=state.owner?'Score read from the game. You can change it.':'Score read from the game.';
  }else{
    sel.hidden=true;sc.readOnly=false;sc.value='';tt.value='';
    $('ifr-src').textContent='No score found on screen. Type the score shown at the end of the game.';
  }
}
function card(rec,note){
  var c=document.createElement('div');c.className='ifr-card';
  var a=document.createElement('div');a.textContent=rec.name+' · '+rec.group;
  var b=document.createElement('b');b.textContent=rec.score+(rec.total!=null?' / '+rec.total:'');
  var s=document.createElement('div');s.className='ifr-hint';s.textContent=rec.activity+' · '+fmtDate(rec.at);
  var n=document.createElement('div');n.className='ifr-hint';n.textContent=note;
  c.appendChild(a);c.appendChild(b);c.appendChild(s);c.appendChild(n);return c;
}
async function saveMe(){
  var name=$('ifr-name').value.trim(),group=$('ifr-group').value.trim(),score=parseFloat($('ifr-score').value),total=$('ifr-total').value===''?null:parseFloat($('ifr-total').value);
  if(!name||!group){msg('ifr-out','Add your name and group, then save.',true);return}
  if(isNaN(score)){msg('ifr-out','Add your score, then save.',true);return}
  ls('ifr_name',name);ls('ifr_group',group);
  var rec={name:name,group:group,score:score,total:total,activity:activity(),at:new Date().toISOString(),source:picks.length&&!state.owner?'game':'typed'};
  var btn=$('ifr-save');btn.disabled=true;
  try{
    if(state.owner){await saveSession(group,'',[{name:name,score:score,total:total}],rec.activity);msg('ifr-out','Saved to Results.');return}
    if(!state.db||!state.uid)throw {code:'no_identity'};
    var ref=state.db.doc('results/'+state.uid),snap=await ref.get(),cur=snap.exists?snap.data():{};
    var att=Array.isArray(cur.attempts)?cur.attempts.slice(-99):[];att.push({score:score,total:total,activity:rec.activity,group:group,at:rec.at,source:rec.source});
    await ref.set({name:name,group:group,updatedAt:rec.at,attempts:att});
    $('ifr-out').innerHTML='';$('ifr-out').appendChild(card(rec,'Saved. Your teacher can see this score.'));
  }catch(e){
    $('ifr-out').innerHTML='';$('ifr-out').appendChild(card(rec,'Not saved online on this device. Show this card or a screenshot to your teacher.'));
  }finally{btn.disabled=false}
}

/* ---------- teacher: class result ---------- */
function teamRow(name,score){
  var r=document.createElement('div');r.className='ifr-team';
  var a=document.createElement('input');a.placeholder='Team or student';a.maxLength=40;a.value=name||'';a.setAttribute('aria-label','Team or student name');
  var b=document.createElement('input');b.type='number';b.step='any';b.inputMode='numeric';b.placeholder='Score';b.value=score!=null?score:'';b.setAttribute('aria-label','Score');
  var x=document.createElement('button');x.type='button';x.className='ifr-x';x.textContent='×';x.setAttribute('aria-label','Remove row');x.onclick=function(){r.remove()};
  r.appendChild(a);r.appendChild(b);r.appendChild(x);return r;
}
function fillClass(fromGame){
  var box=$('ifr-teams');
  if(fromGame||!box.children.length){
    var d=state.reported?[state.reported]:detect();box.innerHTML='';
    if(d.length){d.forEach(function(p){box.appendChild(teamRow(p.label,p.score))});$('ifr-csrc').textContent='Rows read from the scores on screen. Rename the teams and fix any numbers before saving.'}
    else{box.appendChild(teamRow('Team A',''));box.appendChild(teamRow('Team B',''));$('ifr-csrc').textContent='No scores found on screen. Type each team’s points.'}
  }
  if(!$('ifr-cgroup').value)$('ifr-cgroup').value=ls('ifr_cgroup')||'';
  $('ifr-cout').innerHTML='';
}
async function saveSession(group,note,rows,act){
  if(!state.db)throw {code:'no_db'};
  await state.db.collection('sessions').add({group:group,note:note,rows:rows,activity:act||activity(),at:new Date().toISOString()});
}
async function saveClass(){
  var group=$('ifr-cgroup').value.trim(),note=$('ifr-cnote').value.trim(),rows=[];
  Array.prototype.forEach.call($('ifr-teams').children,function(r){var i=r.querySelectorAll('input'),n=i[0].value.trim(),s=parseFloat(i[1].value);if(n&&!isNaN(s))rows.push({name:n,score:s})});
  if(!group){msg('ifr-cout','Add the group name, then save.',true);return}
  if(!rows.length){msg('ifr-cout','Add at least one team or student with a score.',true);return}
  ls('ifr_cgroup',group);var btn=$('ifr-csave');btn.disabled=true;
  try{await saveSession(group,note,rows);msg('ifr-cout','Saved '+rows.length+' score'+(rows.length>1?'s':'')+' for '+group+'.')}
  catch(e){msg('ifr-cout','Could not save right now. Check your connection and try again.',true)}
  finally{btn.disabled=false}
}

/* ---------- teacher: results ---------- */
function allRows(){
  var rows=[];
  state.students.forEach(function(s){(s.attempts||[]).forEach(function(a){rows.push({at:a.at,group:a.group||s.group||'',name:s.name||'',score:a.score,total:a.total,activity:a.activity||'',by:a.source==='typed'?'Student (typed)':'Student'})})});
  state.sessions.forEach(function(s){(s.rows||[]).forEach(function(r){rows.push({at:s.at,group:s.group||'',name:r.name,score:r.score,total:r.total!=null?r.total:null,activity:(s.activity||'')+(s.note?' · '+s.note:''),by:'Teacher'})})});
  rows.sort(function(a,b){return String(b.at).localeCompare(String(a.at))});return rows;
}
function renderResults(){
  var rows=allRows(),f=$('ifr-filter'),cur=f.value,groups={};
  rows.forEach(function(r){if(r.group)groups[r.group]=1});
  f.innerHTML='<option value="">All groups</option>';Object.keys(groups).sort().forEach(function(g){var o=document.createElement('option');o.value=g;o.textContent=g;f.appendChild(o)});f.value=groups[cur]?cur:'';
  var shown=rows.filter(function(r){return !f.value||r.group===f.value}),tb=$('ifr-rows');tb.innerHTML='';
  if(!shown.length){var tr=document.createElement('tr'),td=document.createElement('td');td.colSpan=6;td.className='ifr-empty';td.textContent='No results yet. Scores appear here when students save them or you save a class result.';tr.appendChild(td);tb.appendChild(tr);return}
  shown.forEach(function(r){var tr=document.createElement('tr');[fmtDate(r.at),r.group,r.name,r.score+(r.total!=null?' / '+r.total:''),r.activity,r.by].forEach(function(v,i){var td=document.createElement('td');td.textContent=v;if(i===3)td.className='n';tr.appendChild(td)});tb.appendChild(tr)});
}
function subscribe(){
  if(state.subs||!state.db)return;state.subs=true;
  state.db.collection('results').onSnapshot(function(s){state.students=s.docs.map(function(d){return d.data()});renderResults()},function(){});
  state.db.collection('sessions').orderBy('at','desc').limit(500).onSnapshot(function(s){state.sessions=s.docs.map(function(d){return d.data()});renderResults()},function(){});
}
async function csv(){
  var f=$('ifr-filter').value,rows=allRows().filter(function(r){return !f||r.group===f});
  var q=function(v){v=v==null?'':String(v);return /[",\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v};
  var lines=['Date,Group,Name/Team,Score,Out of,Activity,Saved by'].concat(rows.map(function(r){return [r.at,r.group,r.name,r.score,r.total,r.activity,r.by].map(q).join(',')}));
  try{var dl=await claude.use('downloads');if(!dl)throw 0;await dl.save({filename:(GAME.replace(/[^\w\- ]+/g,'').trim().slice(0,50)||'results')+' results.csv',data:lines.join('\n')})}
  catch(e){if(!e||e.code!=='declined')msg('ifr-rout','Download is not available here.',true)}
}

/* ---------- shell ---------- */
function tab(t){
  ['me','class','results'].forEach(function(k){$('ifr-p-'+k).hidden=k!==t});
  Array.prototype.forEach.call(document.querySelectorAll('#ifr-tabs .ifr-tab'),function(b){b.setAttribute('aria-selected',b.dataset.t===t?'true':'false')});
  $('ifr-title').textContent=t==='results'?'Results':t==='class'?'Save class result':'Save a score';
  if(t==='me')fillMe();if(t==='class')fillClass(false);if(t==='results'){subscribe();renderResults()}
}
function open(){
  $('ifr-scrim').hidden=false;
  if(state.owner){$('ifr-tabs').hidden=false;tab('class')}else{$('ifr-tabs').hidden=true;tab('me');$('ifr-title').textContent='Save your score'}
  setTimeout(function(){var f=state.owner?$('ifr-cgroup'):$('ifr-name');try{f.focus()}catch(e){}},30);
}
function close(){$('ifr-scrim').hidden=true;try{$('ifr-fab').focus()}catch(e){}}
$('ifr-fab').onclick=open;$('ifr-close').onclick=close;
$('ifr-scrim').addEventListener('click',function(e){if(e.target===this)close()});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!$('ifr-scrim').hidden)close()});
Array.prototype.forEach.call(document.querySelectorAll('#ifr-tabs .ifr-tab'),function(b){b.onclick=function(){tab(b.dataset.t)}});
$('ifr-save').onclick=saveMe;$('ifr-csave').onclick=saveClass;$('ifr-add').onclick=function(){$('ifr-teams').appendChild(teamRow('',''))};
$('ifr-refill').onclick=function(){fillClass(true)};$('ifr-filter').onchange=renderResults;$('ifr-csv').onclick=csv;

/* Games can report a final score directly: IFResults.report({score, total, label}) or postMessage({type:'if-score', ...}) */
window.IFResults={report:function(o){if(o&&o.score!=null)state.reported={label:String(o.label||'Score').slice(0,40),score:+o.score,total:o.total!=null?+o.total:null}},clear:function(){state.reported=null}};
window.addEventListener('message',function(e){var d=e.data;if(d&&d.type==='if-score'&&e.origin===location.origin)window.IFResults.report(d)});

if(window.claude&&claude.use){
  claude.use('user').then(async function(u){state.user=u;if(!u)return;state.owner=await u.isOwner();state.uid=await u.id();if(state.owner)$('ifr-fab').textContent='RESULTS'}).catch(function(){});
  claude.use('db').then(function(d){state.db=d}).catch(function(){});
}
})();
