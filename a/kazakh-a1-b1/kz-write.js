/* Қазақша A1–A2 · Writing hub, timed challenges, study games bridge and navigation.
   Loaded before the main script; uses the main script's globals only at run time. */

/* ---------- Claude feedback (sample capability) ---------- */
let KZ_SAMPLE=null;
(async()=>{try{if(window.claude&&claude.use)KZ_SAMPLE=await claude.use('sample')}catch(e){KZ_SAMPLE=null}
 document.querySelectorAll('[data-needs-claude]').forEach(el=>el.hidden=!KZ_SAMPLE)})();
const KZ_SAMPLE_ERR={not_granted:'Claude feedback is turned off for this page.',sampling_disabled:'Claude is not available on this account.',rate_limited:'Too many requests just now. Try again in a minute.',session_expired:'Please sign in again to get feedback.',refused:'Claude could not check this text.'};

/* ---------- helpers ---------- */
const kzNorm=s=>String(s||'').toLowerCase().replace(/ё/g,'е').replace(/[.,!?«»"“”—–:;()…\-]/g,' ').replace(/\s+/g,' ').trim();
const kzWords=s=>String(s||'').trim().split(/\s+/).filter(w=>/[A-Za-zА-Яа-яЁёӘәҒғҚқҢңӨөҰұҮүҺһІі0-9]/.test(w)).length;
const kzMeaning=r=>LANG==='ru'?(r[2]||r[1]):r[1];
function kzKeys(id){return `<div class="keys kzkeys" aria-label="Kazakh letters">${KEYS.map(k=>`<button type="button" class="key" onmousedown="event.preventDefault()" onclick="kzIns('${id}','${k}')">${k}</button>`).join('')}</div>`}
function kzIns(id,ch){const f=document.getElementById(id);if(!f)return;const s=f.selectionStart??f.value.length,e=f.selectionEnd??s;f.value=f.value.slice(0,s)+ch+f.value.slice(e);f.focus();try{f.setSelectionRange(s+ch.length,s+ch.length)}catch(_){}f.dispatchEvent(new Event('input'))}
function kzLessonOpts(sel,withAll){const o=[];if(withAll){o.push(['A1','Бүкіл A1 · All A1 (lessons 1–20)'],['A2','Бүкіл A2 · All A2 (lessons 21–36)'],['B1','Бүкіл B1 · All B1 (lessons 37–52)'],['all','Бүкіл курс · Whole course'])}
 ORDER.forEach(i=>o.push([String(i),`${num(i)}. ${L[i].kk} · ${L[i].en}`]));return o.map(([k,n])=>`<option value="${k}"${String(sel)===k?' selected':''}>${esc(n)}</option>`).join('')}
function kzIds(sel){return /^(A1|A2|B1)$/.test(sel)?ORDER.filter(i=>LV(i)===sel):sel==='all'?ORDER:[+sel]}
function kzSentences(sel){const out=[];kzIds(sel).forEach(i=>{(window.KZ_SB[i]||[]).forEach(r=>out.push({kk:r[0],en:r[1],ru:r[2],li:i}));
  (L[i].ex||[]).filter(e=>e.t==='order').forEach(e=>{const kk=e.w.join(' ');if(!out.some(x=>kzNorm(x.kk)===kzNorm(kk)))out.push({kk,en:e.en,ru:e.ru||e.en,li:i,order:e.w})})});return out}
function kzToks(s){return s.replace(/[.!?]+$/,'').split(/\s+/).filter(w=>w&&!/^[—–-]+$/.test(w))}
function kzEnd(s){const m=s.match(/[.!?]+$/);return m?m[0]:''}
function kzXP(n){addXP(n);checkBadges();save()}

/* ---------- navigation: bottom bar, back gesture, reopen where you left off ---------- */
let KZ_FROMPOP=false;
function kzNav(st){try{localStorage.setItem('kz-last',JSON.stringify(st))}catch(e){}if(KZ_FROMPOP)return;try{history.pushState(st,'')}catch(e){}kzBar(st.v)}
function kzRoute(st){st=st||{v:'home'};KZ_FROMPOP=true;try{if(st.v==='arena')arena();else if(st.v==='write')writeHub(st.m,st.sel);else if(st.v==='lesson'&&L[st.i])openLesson(st.i,st.step);else home()}finally{KZ_FROMPOP=false}kzBar(st.v)}
window.addEventListener('popstate',e=>kzRoute(e.state));
function kzBar(v){let b=document.getElementById('bnav');if(!b){b=document.createElement('nav');b.id='bnav';b.className='bnav';b.setAttribute('aria-label','Main');document.body.appendChild(b)}
 const nx=typeof nextIdx==='function'?nextIdx():0;
 const it=[['home','🏠','Курс','Course','home()'],['lesson','📖','Сабақ','Lesson',`openLesson(${S&&S.view==='lesson'?S.i:nx})`],['arena','🎮','Ойындар','Games','arena()'],['write','✍️','Жазу','Writing','writeHub()']];
 b.innerHTML=it.map(([k,ic,kk,en,f])=>`<button type="button" class="${k===v?'on':''}" aria-current="${k===v?'page':'false'}" onclick="${f}"><span class="ic">${ic}</span><span>${kk}</span><small>${en}</small></button>`).join('')}
function kzStart(){let st=null;try{st=JSON.parse(localStorage.getItem('kz-last')||'null')}catch(e){}
 if(st&&(st.v==='arena'||st.v==='write'))kzRoute(st);else{KZ_FROMPOP=true;home();KZ_FROMPOP=false}
 try{history.replaceState(st&&(st.v==='arena'||st.v==='write')?st:{v:'home'},'')}catch(e){}kzBar(st&&(st.v==='arena'||st.v==='write')?st.v:'home')}

/* ---------- WRITING HUB ---------- */
const WMODES=[['task','📝','Шығарма','Writing task','Write a short text on the lesson topic. Get feedback from Claude.'],
 ['build','🧩','Сөйлем құра','Build sentences','Tap the words in the right order.'],
 ['trans','🔤','Аудар да жаз','Translate & write','Read the meaning, type the Kazakh sentence.'],
 ['dict','🎧','Диктант','Dictation','Listen and write what you hear.']];
let W={m:'task',sel:null};
try{Object.assign(W,JSON.parse(localStorage.getItem('kz-write')||'{}'))}catch(e){}
function wSave(){try{localStorage.setItem('kz-write',JSON.stringify({m:W.m,sel:W.sel}))}catch(e){}}
function writeHub(m,sel){if(typeof arStop==='function')arStop();if(window.IFStudy)IFStudy.stop();
 if(m)W.m=m;if(sel!=null)W.sel=String(sel);if(W.sel==null||(!/^(A1|A2|B1|all)$/.test(W.sel)&&!L[+W.sel]))W.sel=String(typeof nextIdx==='function'?nextIdx():0);
 if(W.m==='task'&&/^(A1|A2|B1|all)$/.test(W.sel))W.sel=String(ORDER.find(i=>LV(i)===(W.sel==='all'?'A1':W.sel)));
 S={view:'write'};wSave();kzNav({v:'write',m:W.m,sel:W.sel});
 const done=Object.keys(P.writing||{}).length;
 app.innerHTML=topbar('✍️ Жазылым · Writing')+`</div>
 <p class="lead" style="margin:4px 0 10px">Write in Kazakh every day. ${done?`You have written ${done} text${done>1?'s':''} so far.`:'Start with the writing task for your lesson.'}</p>
 <div class="wmodes">${WMODES.map(([k,ic,kk,en,d])=>`<button class="wmode${k===W.m?' on':''}" aria-pressed="${k===W.m}" onclick="writeHub('${k}')"><span class="ic">${ic}</span><b>${kk}</b><small>${en}</small></button>`).join('')}</div>
 <div class="arbar"><label class="eyebrow" for="wsel">Lesson</label><select id="wsel" onchange="writeHub(null,this.value)">${kzLessonOpts(W.sel,W.m!=='task')}</select>${langToggle()}</div>
 <div class="stage" id="stage"></div>`;
 ({task:wTask,build:wBuild,trans:wTrans,dict:wDict})[W.m]();window.scrollTo(0,0)}

/* --- Writing task (free writing + Claude feedback) --- */
function wTaskHTML(i,inLesson){const t=window.KZ_WT[i],l=L[i];if(!t)return '<p class="lead">No writing task for this lesson yet.</p>';
 const d=(P.writing||{})[i]||{},fb=d.fb;let txt=d.text||'';try{const dr=localStorage.getItem('kz-wdraft-'+i);if(dr!=null&&dr.trim())txt=dr}catch(e){}
 const bank=l.vocab.map(v=>v[0]).filter(w=>!/[.!?…]$/.test(w)||w.length<14).slice(0,16);
 return `<div class="wtask"><div class="mode-tag" style="text-align:left">${num(i)}. ${esc(l.kk)} · WRITING TASK</div>
 <p class="wprompt">${esc(LANG==='ru'?t.ru:t.en)}</p>
 <div class="eyebrow">Sentence starters · tap to add</div><div class="bank">${t.st.map(s=>`<button type="button" class="chip" onclick="wAdd(${JSON.stringify(s).replace(/"/g,'&quot;')})">${esc(s.trim())}</button>`).join('')}</div>
 <div class="eyebrow">Word bank</div><div class="bank">${bank.map(w=>`<button type="button" class="chip sm" onclick="wAdd(${JSON.stringify(w+' ').replace(/"/g,'&quot;')})">${esc(w)}</button>`).join('')}</div>
 <textarea id="wtxt" class="wtxt" rows="7" lang="kk" spellcheck="false" placeholder="Мұнда қазақша жазыңыз… Write here in Kazakh" oninput="wCount(${i})">${esc(txt)}</textarea>
 ${kzKeys('wtxt')}
 <div class="wmeta"><span id="wcount"></span><span id="wused"></span></div>
 <div class="arrow"><button class="btn ok" onclick="wSubmit(${i})">✓ Save my text</button><button class="btn sun" data-needs-claude ${KZ_SAMPLE?'':'hidden'} onclick="wFeedback(${i})">✨ Check with Claude</button><button class="btn ghost" onclick="wModel(${i})">Show a model answer</button></div>
 <div id="wmodel"></div><div id="wfb">${fb?wFbHTML(fb):''}</div>
 ${KZ_SAMPLE?'':'<p class="hint" data-needs-claude-off>Tip: open this page in the Claude app and sign in to get feedback from Claude on your writing.</p>'}
 ${inLesson?'':`<p class="hint">More practice: <button class="linkbtn" onclick="writeHub('build','${i}')">Build sentences</button> · <button class="linkbtn" onclick="writeHub('trans','${i}')">Translate &amp; write</button> · <button class="linkbtn" onclick="writeHub('dict','${i}')">Dictation</button></p>`}</div>`}
function wTask(){const i=+W.sel;$st().innerHTML=wTaskHTML(i);wCount(i)}
function wAdd(s){const f=document.getElementById('wtxt');if(!f)return;const v=f.value;const sep=v&&!/\s$/.test(v)?' ':'';const s0=f.selectionStart??v.length;
 if(s0>=v.length){f.value=v+sep+s}else{f.value=v.slice(0,s0)+s+v.slice(s0)}f.focus();f.dispatchEvent(new Event('input'))}
function wUsed(i,txt){const n=kzNorm(txt);return L[i].vocab.map(v=>v[0]).filter(w=>{const k=kzNorm(w).split(' ')[0];const stem=k.length>4?k.slice(0,Math.max(3,k.length-2)):k;return k&&new RegExp('(^|\\s)'+stem.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).test(n)})}
function wCount(i){const f=document.getElementById('wtxt');if(!f)return;const t=window.KZ_WT[i],n=kzWords(f.value),u=wUsed(i,f.value);
 const c=document.getElementById('wcount');if(c)c.innerHTML=`<b class="${n>=t.n?'okc':''}">${n}</b> / ${t.n}+ words`;
 const w=document.getElementById('wused');if(w)w.innerHTML=u.length?`Lesson words used: <b>${u.length}</b> (${u.slice(0,6).map(esc).join(', ')}${u.length>6?'…':''})`:'Use words from this lesson ↑';
 clearTimeout(wCount.t);wCount.t=setTimeout(()=>{try{localStorage.setItem('kz-wdraft-'+i,f.value)}catch(e){}},400)}
function wSubmit(i){const f=document.getElementById('wtxt'),t=window.KZ_WT[i];const txt=f.value.trim(),n=kzWords(txt);
 if(n<3){toast('Write a little more first','At least one or two sentences.');return}
 P.writing=P.writing||{};const prev=P.writing[i]||{};const first=!prev.text;
 P.writing[i]=Object.assign({},prev,{text:txt,ts:Date.now(),words:n});
 const xp=(first?10:3)+(n>=t.n?5:0)+Math.min(5,wUsed(i,txt).length);kzXP(xp);sfx('ok');if(first&&n>=t.n)confetti();
 toast(`✍️ Saved · +${xp} XP`,n>=t.n?'Керемет! You reached the word target.':`Try to reach ${t.n} words.`)}
function wModel(i){const t=window.KZ_WT[i],el=document.getElementById('wmodel');if(!el)return;
 el.innerHTML=el.innerHTML?'':`<div class="wbox"><div class="eyebrow">Model answer</div><p class="wmodel" lang="kk">${esc(t.m)}</p><p class="hint">Use it for ideas. Your own text can be different.</p></div>`}
function wFbHTML(fb){if(!fb)return '';const sc=Math.max(0,Math.min(10,+fb.score||0));
 return `<div class="wbox fb"><div class="row" style="justify-content:space-between"><div class="eyebrow">Claude’s feedback</div><b class="wscore">${sc}/10</b></div>
 ${fb.praise?`<p>👍 ${esc(fb.praise)}</p>`:''}
 ${(fb.mistakes||[]).length?`<div class="eyebrow">Corrections</div><ul class="wmist">${fb.mistakes.slice(0,8).map(m=>`<li><s>${esc(m.wrong||'')}</s> → <b>${esc(m.right||'')}</b>${m.why?`<br><small>${esc(m.why)}</small>`:''}</li>`).join('')}</ul>`:'<p><b>No mistakes found. Жарайсың!</b></p>'}
 ${fb.corrected?`<div class="eyebrow">Corrected text</div><p class="wmodel" lang="kk">${esc(fb.corrected)}</p>`:''}
 ${fb.tip?`<p class="hint">💡 ${esc(fb.tip)}</p>`:''}</div>`}
async function wFeedback(i){const f=document.getElementById('wtxt'),out=document.getElementById('wfb'),t=window.KZ_WT[i];const txt=(f&&f.value||'').trim();
 if(kzWords(txt)<3){toast('Write a little more first','Then ask Claude to check it.');return}
 if(!KZ_SAMPLE){out.innerHTML='<p class="hint">Claude feedback works when this page is open in the Claude app.</p>';return}
 const btn=document.querySelector('[data-needs-claude]');if(btn)btn.disabled=true;out.innerHTML='<div class="wbox"><p class="hint">✨ Claude is reading your text… (this can take up to a minute)</p></div>';
 const lang=LANG==='ru'?'Russian':'English';
 const prompt=`You are a warm, encouraging Kazakh language teacher. Your student is an adult learner at ${LV(i)} level (beginner). Check the student's Kazakh text.
Lesson topic: ${L[i].kk} (${L[i].en}).
Writing task: ${t.en}
Student's text:
"""
${txt.slice(0,3000)}
"""
Correct real mistakes in spelling (including Kazakh letters ә ғ қ ң ө ұ ү һ і), endings, vowel harmony, word order and word choice. Keep the student's meaning and simple style; do not rewrite good sentences. If the student wrote Russian or English words, give the Kazakh word.
Reply with only a JSON object:
{"score": integer 0-10 for an A1-A2 learner (task done, accuracy, range),
 "praise": "one short encouraging sentence in ${lang}",
 "mistakes": [{"wrong": "the wrong word or phrase as written", "right": "correct Kazakh", "why": "very short reason in ${lang}"}] (at most 8, empty if none),
 "corrected": "the whole text corrected, in Kazakh",
 "tip": "one practical tip for next time in ${lang}"}`;
 try{const fb=await KZ_SAMPLE.json(prompt,{modelTier:'default'});
  if(!fb||typeof fb!=='object')throw {code:'invalid_json'};
  P.writing=P.writing||{};const prev=P.writing[i]||{};const firstFb=!prev.fb;
  P.writing[i]=Object.assign({},prev,{text:txt,ts:Date.now(),words:kzWords(txt),fb:{score:+fb.score||0,praise:String(fb.praise||''),mistakes:Array.isArray(fb.mistakes)?fb.mistakes.slice(0,8).map(m=>({wrong:String(m.wrong||''),right:String(m.right||''),why:String(m.why||'')})):[],corrected:String(fb.corrected||''),tip:String(fb.tip||'')}});
  const sc=P.writing[i].fb.score;const xp=(firstFb?8:2)+sc;kzXP(xp);if(sc>=8){confetti();sfx('level')}else sfx('ok');
  out.innerHTML=wFbHTML(P.writing[i].fb);toast(`✨ Feedback ready · +${xp} XP`,`Score ${sc}/10`)}
 catch(e){const c=e&&e.code;out.innerHTML=`<div class="wbox"><p class="hint">${esc(KZ_SAMPLE_ERR[c]||(c==='cancelled'?'Stopped.':'Feedback could not load. Try again.'))}</p></div>`;if(c==='not_granted'||c==='sampling_disabled'){KZ_SAMPLE=null;document.querySelectorAll('[data-needs-claude]').forEach(b=>b.hidden=true)}}
 finally{if(btn)btn.disabled=false}}

/* --- Build sentences (word order) --- */
let WB=null;
function wBuild(){if(!WB||WB.sel!==W.sel){const d=shuffle(kzSentences(W.sel)).slice(0,10);WB={sel:W.sel,deck:d,i:0,score:0,first:0,picked:[],bank:null,state:'',tries:0}}
 const S2=$st();if(!WB.deck.length){S2.innerHTML='<p class="lead">No sentences for this lesson yet.</p>';return}
 if(WB.i>=WB.deck.length){const n=WB.deck.length;const xp=Math.round(WB.first*2);if(!WB.paid){WB.paid=1;kzXP(xp);if(WB.first===n)confetti()}
  S2.innerHTML=`<div class="mode-tag">СӨЙЛЕМ ҚҰРА · DONE</div><div class="aword">${WB.first} / ${n}</div><div class="ahint">sentences right on the first try · +${xp} XP</div><div class="arrow"><button class="btn sun" onclick="WB=null;wBuild()">Play again</button><button class="btn ghost" onclick="writeHub('trans')">Next: Translate &amp; write →</button></div>`;return}
 const it=WB.deck[WB.i];if(!WB.bank){const t=kzToks(it.kk);WB.bank=shuffle(t.map((w,k)=>({w,k})));if(WB.bank.map(x=>x.w).join(' ')===t.join(' ')&&t.length>1)WB.bank.reverse();WB.picked=[];WB.state='';WB.tries=0}
 S2.innerHTML=`<div class="astats"><span>Sentence ${WB.i+1} / ${WB.deck.length}</span><span>First-try right: ${WB.first}</span></div>
 <p class="wprompt" style="text-align:center">${esc(kzMeaning([it.kk,it.en,it.ru]))}</p>
 <div class="line wline">${WB.picked.map((x,k)=>`<button type="button" class="chip" onclick="wbUnpick(${k})">${esc(x.w)}</button>`).join('')}</div>
 <div class="bank" style="justify-content:center;margin-top:12px">${WB.bank.map((x,k)=>`<button type="button" class="chip${x.used?' used':''}" onclick="wbPick(${k})">${esc(x.w)}</button>`).join('')}</div>
 <div class="wfeed" id="wbf">${WB.state==='ok'?`<b class="okc">✓ Дұрыс!</b> <span lang="kk">${esc(it.kk)}</span>`:WB.state==='no'?`<b class="noc">Not yet.</b> Try again.`:WB.state==='show'?`Answer: <b lang="kk">${esc(it.kk)}</b>`:''}</div>
 <div class="arrow">${WB.state==='ok'||WB.state==='show'?`<button class="btn sun" onclick="wbNext()">Next →</button>${hasAud(it.li,it.kk)?`<button class="btn ghost" onclick="play(${it.li},${JSON.stringify(it.kk).replace(/"/g,'&quot;')})">🔊 Listen</button>`:''}`:`<button class="btn ok" onclick="wbCheck()">Check</button><button class="btn ghost" onclick="wbClear()">Clear</button><button class="btn ghost" onclick="wbShow()">Show answer</button>`}</div>`}
function wbPick(k){const x=WB.bank[k];if(x.used||WB.state==='ok')return;x.used=1;WB.picked.push(x);WB.state='';wBuild()}
function wbUnpick(k){if(WB.state==='ok')return;const x=WB.picked.splice(k,1)[0];x.used=0;WB.state='';wBuild()}
function wbClear(){WB.bank.forEach(x=>x.used=0);WB.picked=[];WB.state='';wBuild()}
function wbCheck(){const it=WB.deck[WB.i];if(WB.picked.length<WB.bank.length){toast('Use all the words','Tap every word to build the sentence.');return}
 const ok=kzNorm(WB.picked.map(x=>x.w).join(' '))===kzNorm(kzToks(it.kk).join(' '));WB.tries++;
 if(ok){WB.state='ok';if(WB.tries===1){WB.first++;sfx('ok')}else sfx('ok')}else{WB.state='no';sfx('no')}wBuild()}
function wbShow(){WB.state='show';WB.tries=9;wBuild()}
function wbNext(){WB.i++;WB.bank=null;wBuild()}

/* --- Translate & write --- */
let WT2=null;
function wTrans(){if(!WT2||WT2.sel!==W.sel){WT2={sel:W.sel,deck:shuffle(kzSentences(W.sel)).slice(0,10),i:0,right:0,state:'',ans:''}}
 const S2=$st();if(!WT2.deck.length){S2.innerHTML='<p class="lead">No sentences for this lesson yet.</p>';return}
 if(WT2.i>=WT2.deck.length){const n=WT2.deck.length,xp=WT2.right*3;if(!WT2.paid){WT2.paid=1;kzXP(xp);if(WT2.right===n)confetti()}
  S2.innerHTML=`<div class="mode-tag">АУДАР ДА ЖАЗ · DONE</div><div class="aword">${WT2.right} / ${n}</div><div class="ahint">sentences written correctly · +${xp} XP</div><div class="arrow"><button class="btn sun" onclick="WT2=null;wTrans()">Play again</button><button class="btn ghost" onclick="writeHub('task')">Next: Writing task →</button></div>`;return}
 const it=WT2.deck[WT2.i];
 S2.innerHTML=`<div class="astats"><span>Sentence ${WT2.i+1} / ${WT2.deck.length}</span><span>Correct: ${WT2.right}</span></div>
 <p class="wprompt" style="text-align:center">${esc(kzMeaning([it.kk,it.en,it.ru]))}</p>
 <p class="hint" style="text-align:center">Write this in Kazakh. Words to use: ${shuffle(kzToks(it.kk)).map(w=>`<span class="pill">${esc(w.replace(/[,]/g,''))}</span>`).join(' ')}</p>
 <textarea id="wtin" class="wtxt" rows="2" lang="kk" spellcheck="false" placeholder="Қазақша жазыңыз…" ${WT2.state?'readonly':''}>${esc(WT2.ans)}</textarea>${WT2.state?'':kzKeys('wtin')}
 <div class="wfeed" id="wtf">${WT2.state==='ok'?`<b class="okc">✓ Дұрыс! Жарайсың!</b>`:WT2.state==='no'?`<b class="noc">Not quite.</b> Model answer: <b lang="kk">${esc(it.kk)}</b><div id="wtc"></div>`:''}</div>
 <div class="arrow">${WT2.state?`<button class="btn sun" onclick="WT2.i++;WT2.state='';WT2.ans='';wTrans()">Next →</button>${WT2.state==='no'?`<button class="btn ghost" onclick="wtMine()">I think mine is right</button>`:''}`:`<button class="btn ok" onclick="wtCheck()">Check</button><button class="btn ghost" onclick="WT2.ans='';WT2.state='no';sfx('no');wTrans()">Show answer</button>`}</div>`;
 const f=document.getElementById('wtin');if(f&&!WT2.state){f.focus();f.onkeydown=e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();wtCheck()}}}}
function wtCheck(){const f=document.getElementById('wtin'),it=WT2.deck[WT2.i];const a=(f.value||'').trim();if(!a)return;WT2.ans=a;
 const ok=kzNorm(a)===kzNorm(it.kk);WT2.state=ok?'ok':'no';if(ok){WT2.right++;sfx('ok')}else sfx('no');wTrans()}
async function wtMine(){const it=WT2.deck[WT2.i],box=document.getElementById('wtc');if(!box)return;
 if(!KZ_SAMPLE){box.innerHTML=`<p class="hint">Compare with the model above. If yours means the same and only the word order is different, count it as right: <button class="linkbtn" onclick="WT2.right++;WT2.i++;WT2.state='';WT2.ans='';wTrans()">Count it ✓</button></p>`;return}
 box.innerHTML='<p class="hint">✨ Asking Claude…</p>';
 try{const r=await KZ_SAMPLE.json(`A beginner learner of Kazakh translated this sentence. Meaning: "${it.en}". Model answer: "${it.kk}". Learner's answer: "${WT2.ans}". Is the learner's answer correct Kazakh with the same meaning (small differences in word order or synonyms are fine; ignore punctuation and capital letters)? Reply with only JSON: {"ok": true|false, "note": "one short sentence in ${LANG==='ru'?'Russian':'English'} explaining the main problem, or praise"}`,{modelTier:'quick'});
  if(r&&r.ok){WT2.right++;sfx('ok');box.innerHTML=`<p><b class="okc">✓ Claude says yours is correct too.</b> ${esc(r.note||'')}</p>`}else box.innerHTML=`<p class="hint">${esc((r&&r.note)||'Compare it with the model answer.')}</p>`}
 catch(e){box.innerHTML=`<p class="hint">${esc(KZ_SAMPLE_ERR[e&&e.code]||'Could not check right now.')}</p>`}}

/* --- Dictation --- */
let WD=null;
function wDictItems(sel){const out=[];kzIds(sel).forEach(i=>{const a=AUD[i]||{};const l=L[i];
  const lines=[...((l.listen&&l.listen.text)||[]),...((l.reading&&l.reading.text)||[])].filter(t=>a[t]&&kzWords(t)<=12);
  lines.forEach(t=>out.push({kk:t,li:i,sent:1}));l.vocab.forEach(v=>{if(a[v[0]])out.push({kk:v[0],li:i,en:v[1],ru:v[2]})})});return out}
function wDict(){if(!WD||WD.sel!==W.sel){const all=wDictItems(W.sel);const s=shuffle(all.filter(x=>x.sent)).slice(0,4),w=shuffle(all.filter(x=>!x.sent)).slice(0,10-s.length);WD={sel:W.sel,deck:shuffle([...w,...s]),i:0,right:0,state:'',ans:'',said:-1}}
 const S2=$st();if(!WD.deck.length){S2.innerHTML='<p class="lead">This lesson has no audio yet. Choose another lesson.</p>';return}
 if(WD.i>=WD.deck.length){const n=WD.deck.length,xp=WD.right*3;if(!WD.paid){WD.paid=1;kzXP(xp);if(WD.right===n)confetti()}
  S2.innerHTML=`<div class="mode-tag">ДИКТАНТ · DONE</div><div class="aword">${WD.right} / ${n}</div><div class="ahint">written correctly · +${xp} XP</div><div class="arrow"><button class="btn sun" onclick="WD=null;wDict()">Play again</button><button class="btn ghost" onclick="writeHub('task')">Next: Writing task →</button></div>`;return}
 const it=WD.deck[WD.i];
 S2.innerHTML=`<div class="astats"><span>${it.sent?'Sentence':'Word'} ${WD.i+1} / ${WD.deck.length}</span><span>Correct: ${WD.right}</span></div>
 <div class="arrow"><button class="btn sun big" onclick="wdSay(1)">🔊 Listen</button><button class="btn ghost" onclick="wdSay(.7)">🐢 Slowly</button></div>
 <textarea id="wdin" class="wtxt" rows="2" lang="kk" spellcheck="false" placeholder="Естігеніңізді жазыңыз… Write what you hear" ${WD.state?'readonly':''}>${esc(WD.ans)}</textarea>${WD.state?'':kzKeys('wdin')}
 <div class="wfeed">${WD.state==='ok'?`<b class="okc">✓ Дұрыс!</b> <span lang="kk">${esc(it.kk)}</span>`:WD.state==='no'?`<b class="noc">Not quite.</b> It was: <b lang="kk">${esc(it.kk)}</b>`:''}${WD.state&&it.en?` · ${esc(LANG==='ru'?it.ru:it.en)}`:''}</div>
 <div class="arrow">${WD.state?`<button class="btn sun" onclick="WD.i++;WD.state='';WD.ans='';wDict()">Next →</button>`:`<button class="btn ok" onclick="wdCheck()">Check</button><button class="btn ghost" onclick="WD.ans='';WD.state='no';sfx('no');wDict()">Show answer</button>`}</div>`;
 const f=document.getElementById('wdin');if(f&&!WD.state){f.onkeydown=e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();wdCheck()}}}
 if(!WD.state&&WD.said!==WD.i){WD.said=WD.i;setTimeout(()=>wdSay(1,true),300)}}
function wdSay(r,quiet){const it=WD.deck[WD.i];play(it.li,it.kk,r,quiet)}
function wdCheck(){const f=document.getElementById('wdin'),it=WD.deck[WD.i];const a=(f.value||'').trim();if(!a)return;WD.ans=a;const ok=kzNorm(a)===kzNorm(it.kk);WD.state=ok?'ok':'no';if(ok){WD.right++;sfx('ok')}else sfx('no');wDict()}

/* ---------- STUDY GAMES (Learn, Write, Spell, Test, Scramble, Speed, Game Room) ---------- */
const AR_STUDY=[['learn','Learn'],['write','Write'],['spell','Тыңда да жаз'],['test','Test'],['scramble','Scramble'],['speed','Speed Quiz'],['room','🎪 Game Room']];
const AR_CHAL=[['tf','✔︎✘ True / False'],['gram','📘 Grammar Sprint'],['order','🧩 Word Order'],['daily','🔥 Daily Challenge']];
const STUDY_ROOM=['blast','treasure','fishing','race','factory','cafe','defense','boss','memory','balloon','search'];
let KZ_AUDIX=null;
window.KZSAY=function(t,rate){if(!KZ_AUDIX){KZ_AUDIX={};Object.keys(AUD).forEach(i=>Object.keys(AUD[i]).forEach(k=>{if(KZ_AUDIX[k]===undefined)KZ_AUDIX[k]=+i}))}
 const i=KZ_AUDIX[t];if(i===undefined)return false;play(i,t,rate&&rate<0.8?0.7:1,true);return true};
window.KZSTOP=function(){try{stopAud()}catch(e){}};
let KZ_REP=0;
window.IFResults={report({score,total,label}){const now=Date.now();if(now-KZ_REP<1500)return;KZ_REP=now;
 const xp=Math.max(2,Math.min(25,Math.round(((+score||0)/Math.max(1,+total||1))*15)+3));addXP(xp);P.flags=P.flags||{};P.flags.study=(P.flags.study||0)+1;checkBadges();save();toast(`🎮 ${label} · +${xp} XP`,`${score} / ${total}`)}};
function arStudy(){const S2=$st();S2.classList.add('ifsroom');if(!window.IFStudy){S2.innerHTML='<p class="lead">Loading games…</p>';return}
 const ws=arDeck().map(w=>({w:w.kk,d:mean(w),ru:'',dr:''}));
 const sel=AR.sel;const title=/^(A1|A2|B1)$/.test(sel)?'All '+sel:sel==='all'?'Whole course':`${num(+sel)}. ${L[+sel].kk}`;
 IFStudy.mount(S2,{words:ws,key:'kz:'+sel+':'+LANG,ru:false,mode:AR.mode,title,onMode:n=>{if(AR_STUDY.some(m=>m[0]===n)||n==='cards'){AR.mode=n==='cards'?'learn':n;arSave();document.querySelectorAll('.archip').forEach(b=>{const on=b.dataset.k===AR.mode;b.classList.toggle('on',on);b.setAttribute('aria-pressed',on)})}}})}

/* ---------- TIMED CHALLENGES ---------- */
let CH=null;
function chGramPool(){const out=[];kzIds(AR.sel).forEach(i=>{const ex=L[i].ex||[];const fills=ex.filter(e=>e.t==='fill');
  ex.forEach(e=>{if(e.t==='mc'&&e.o&&e.o.length>1)out.push({q:e.q,o:e.o,a:e.a});
   else if(e.t==='fill'){const a=e.a[0];const others=[...new Set(fills.flatMap(f=>f.a).filter(x=>x!==a))];if(others.length>=2)out.push({q:e.q,o:shuffle([a,...shuffle(others).slice(0,3)]),a})}})});return out}
function chStart(mode){arStop();if(window.IFStudy)IFStudy.stop();
 const secs={tf:45,gram:60,order:90,daily:600}[mode];
 CH={mode,secs,left:secs,score:0,combo:0,ok:0,bad:0,n:0,q:null,lock:false,done:false,bag:[],limit:mode==='daily'?10:0};
 if(mode==='gram'&&!chGramPool().length){$st().innerHTML='<p class="lead">No grammar questions for this choice. Pick a level or another lesson.</p>';return}
 if(mode==='order'&&!kzSentences(AR.sel).length){$st().innerHTML='<p class="lead">No sentences here. Pick a level or another lesson.</p>';return}
 chNext();if(mode!=='daily'){arLoop.iv=setInterval(()=>{if(!CH||CH.done)return;CH.left-=.25;const t=document.getElementById('chtm'),b=document.getElementById('chbar');if(t)t.textContent=Math.ceil(Math.max(0,CH.left))+'s';if(b)b.style.width=Math.max(0,CH.left/CH.secs*100)+'%';if(CH.left<=0)chEnd()},250)}}
function chIntro(mode){const d={tf:['✔︎✘ True / False Blitz','45 seconds. Does the Kazakh word match the meaning? Tap True or False.'],gram:['📘 Grammar Sprint','60 seconds. Choose the right ending or word to complete each sentence.'],order:['🧩 Word Order Builder','90 seconds. Tap the words to build each Kazakh sentence.'],daily:['🔥 Daily Challenge','10 mixed questions: words, grammar and word order. Finish today for +25 bonus XP and keep your streak.']}[mode];
 const best=arBest('ch'+mode,0),doneToday=mode==='daily'&&P.daily===today();
 $st().innerHTML=`<div class="mode-tag">${esc(d[0].toUpperCase())}</div><div class="aword" style="font-size:clamp(26px,5vw,40px)">${esc(d[0])}</div><div class="ahint">${esc(d[1])}</div><div class="astats" style="margin-top:12px"><span>Best: ${best}</span>${doneToday?'<span>✓ Done today</span>':''}<span>Combo ×2 after 5 in a row, ×3 after 10</span></div><div class="arrow"><button class="btn sun" onclick="chStart('${mode}')">Start ▶</button></div>`}
function chQ(){const m=CH.mode==='daily'?['tf','gram','order','vocab'][CH.n%4]:CH.mode;
 if(m==='order'){if(!CH.sbag||!CH.sbag.length)CH.sbag=shuffle(kzSentences(AR.sel));const it=CH.sbag.pop();if(!it)return chQv();const t=kzToks(it.kk);let b=shuffle(t.map((w,k)=>({w,k})));if(t.length>1&&b.map(x=>x.w).join(' ')===t.join(' '))b.reverse();return{k:'order',it,bank:b,picked:[]}}
 if(m==='gram'){if(!CH.gbag||!CH.gbag.length)CH.gbag=shuffle(chGramPool());const g=CH.gbag.pop();if(!g)return chQv();return{k:'mc',p:`<span class="qtext">${esc(g.q)}</span>`,o:shuffle(g.o),a:g.a}}
 if(m==='tf'){const W2=arWords();const w=W2[Math.random()*W2.length|0];const t=Math.random()<.5;let d=mean(w);if(!t){let o;let g=0;do{o=W2[Math.random()*W2.length|0];g++}while((mean(o)===mean(w))&&g<20);d=mean(o)}
  return{k:'mc',tf:1,p:`<span class="qtext" lang="kk">${esc(w.kk)}</span><br><span class="hint">means</span><br><b>“${esc(d)}”</b>`,o:['True ✔︎','False ✘'],a:t?'True ✔︎':'False ✘',why:`${w.kk} = ${mean(w)}`,w}}
 return chQv()}
function chQv(){const W2=arWords();const w=W2[Math.random()*W2.length|0];return{k:'mc',p:`<span class="hint">Which word means</span><br><b class="qtext">“${esc(mean(w))}”</b>`,o:arMcq(w).map(x=>x.kk),a:w.kk,w}}
function chHud(){return `<div class="astats"><span>Score: <b>${CH.score}</b></span><span>Combo ×${chMult()}${CH.combo?' · '+CH.combo+' in a row':''}</span>${CH.mode==='daily'?`<span>Question ${CH.n}/${CH.limit}</span>`:`<span id="chtm">${Math.ceil(CH.left)}s</span>`}</div>${CH.mode==='daily'?'':`<div class="chbarw"><i id="chbar" style="width:${CH.left/CH.secs*100}%"></i></div>`}`}
const chMult=()=>Math.min(3,1+Math.floor(CH.combo/5));
function chNext(){if(!CH||CH.done)return;if(CH.limit&&CH.n>=CH.limit)return chEnd();CH.q=chQ();CH.n++;CH.lock=false;chDraw()}
function chDraw(fb){const q=CH.q,S2=$st();
 if(q.k==='order'){S2.innerHTML=chHud()+`<p class="wprompt" style="text-align:center">${esc(kzMeaning([q.it.kk,q.it.en,q.it.ru]))}</p><div class="line wline">${q.picked.map((x,k)=>`<button type="button" class="chip" onclick="chUn(${k})">${esc(x.w)}</button>`).join('')}</div>
  <div class="bank" style="justify-content:center;margin-top:12px">${q.bank.map((x,k)=>`<button type="button" class="chip${x.used?' used':''}" onclick="chPick(${k})">${esc(x.w)}</button>`).join('')}</div><div class="wfeed">${fb||''}</div><div class="arrow"><button class="btn ghost" onclick="chSkip()">Skip</button><button class="btn ghost" onclick="chQuit()">Quit</button></div>`;return}
 S2.innerHTML=chHud()+`<div class="chq">${q.p}</div><div class="opts ${q.tf?'tf2':''}" id="cho">${q.o.map((o,k)=>`<button class="opt" onclick="chAns(${k})">${esc(o)}</button>`).join('')}</div><div class="wfeed" id="chfb">${fb||''}</div><div class="arrow"><button class="btn ghost" onclick="chQuit()">Quit</button></div>`}
function chScore(ok){if(ok){CH.combo++;CH.ok++;const p=10*chMult();CH.score+=p;sfx(CH.combo%5===0?'combo':'ok')}else{CH.combo=0;CH.bad++;if(CH.mode!=='daily')CH.left=Math.max(0,CH.left-3);sfx('no')}}
function chAns(k){if(CH.lock||CH.done)return;CH.lock=true;const q=CH.q,ok=q.o[k]===q.a;chScore(ok);const bs=document.querySelectorAll('#cho .opt');bs.forEach((b,j)=>{if(q.o[j]===q.a)b.classList.add('ok');else if(j===k)b.classList.add('no')});
 const fb=document.getElementById('chfb');if(fb)fb.innerHTML=ok?'<b class="okc">✓</b>':`<b class="noc">✘</b> ${esc(q.why||q.a)}`;setTimeout(chNext,ok?450:1200)}
function chPick(k){const q=CH.q,x=q.bank[k];if(x.used||CH.lock)return;x.used=1;q.picked.push(x);
 if(q.picked.length===q.bank.length){const ok=kzNorm(q.picked.map(y=>y.w).join(' '))===kzNorm(kzToks(q.it.kk).join(' '));CH.lock=true;chScore(ok);chDraw(ok?`<b class="okc">✓ ${esc(q.it.kk)}</b>`:`<b class="noc">✘</b> ${esc(q.it.kk)}`);setTimeout(chNext,ok?700:1600)}else chDraw()}
function chUn(k){const q=CH.q;if(CH.lock)return;const x=q.picked.splice(k,1)[0];x.used=0;chDraw()}
function chSkip(){chScore(false);chNext()}
function chQuit(){CH.done=true;clearInterval(arLoop.iv);chIntro(CH.mode)}
function chEnd(){if(!CH||CH.done)return;CH.done=true;clearInterval(arLoop.iv);const mode=CH.mode;let bonus=0;
 if(mode==='daily'&&P.daily!==today()){P.daily=today();bonus=25}
 const rec=arSetBest('ch'+mode,CH.score);const xp=Math.round(CH.score/10)+bonus;addXP(xp);P.flags=P.flags||{};P.flags.chal=(P.flags.chal||0)+1;checkBadges();save();
 arOver(rec?'ЖАҢА РЕКОРД · NEW RECORD':'УАҚЫТ БІТТІ · TIME UP',`${CH.score} points`,`${CH.ok} right · ${CH.bad} wrong · +${xp} XP${bonus?' (includes +25 daily bonus 🔥)':''}<br>Best: ${arBest('ch'+mode,0)}`,()=>chStart(mode))}
