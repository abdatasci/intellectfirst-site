/* Русский A1–B1 · Real Russian (slang & idioms with animated scenes) and the Grammar Atlas.
   Loaded before the main script; uses its globals (app, P, L, play, startQuiz…) only at run time. */

/* ---------- animated scene renderer ----------
   sc = {bg:'street', it:[[emoji, x%, y%, scale, anim, delay, duration], …], say:[text, x%, y%, 'th'?]} */
function sceneHTML(sc,cls){if(!sc)return '';const it=(sc.it||[]).map(a=>{const [e,x,y,s,an,dl,du]=a;
  return `<span class="sc-it" style="left:${x}%;top:${y}%;--s:${s||1}"><span class="a-${an||'still'}" style="${dl?`--dl:${dl}s;`:''}${du?`--d:${du}s;`:''}">${e}</span></span>`}).join('');
 const says=(sc.say?(Array.isArray(sc.say[0])?sc.say:[sc.say]):[]).map(s=>`<div class="sc-say${s[3]==='th'?' th':''}" style="left:${s[1]}%;top:${s[2]}%">${esc(s[0])}</div>`).join('');
 return `<div class="scene bg-${sc.bg||'sky'}${cls?' '+cls:''}" role="img" aria-label="Animated scene">${it}${says}${cls&&cls.includes('cover')?'':'<button class="sc-replay" type="button" onclick="scReplay(this)" aria-label="Replay animation">↻</button>'}</div>`}
function scReplay(b){const s=b.closest('.scene');if(!s)return;const h=s.outerHTML;s.outerHTML=h}

/* ---------- Real Russian hub ---------- */
const SLANG_DONE=()=>typeof SLANG==='undefined'?0:SLANG.packs.filter(p=>(P.slang||{})[p.id]).length;
const REGN={neutral:['нейтр.','neutral — fine anywhere','r-neutral'],coll:['разг.','colloquial — friends & family','r-coll'],slang:['сленг','slang — friends only','r-slang'],youth:['молодёжное','youth slang — under-30s, online','r-youth'],idiom:['идиома','idiom','r-idiom'],rude:['грубо','rude — strong, but not мат','r-rude'],mat:['мат','obscene — strongest taboo','r-mat']};
function slReg(r){const x=REGN[r]||REGN.coll;return `<span class="sl-reg ${x[2]}" title="${esc(x[1])}">${x[0]} · ${esc(x[1].split(' — ')[0])}</span>`}
const slMean=x=>LANG==='ru'?(x.kk||x.en):x.en;
function slangWords(sel){if(typeof SLANG==='undefined')return [];const id=String(sel).split(':')[1]||'all';
 return SLANG.packs.filter(p=>id==='all'||p.id===id).flatMap(p=>p.items.map(x=>({kk:x.ru,en:x.en,ru:x.kk||x.en,li:-1})))}
function SLANGOPTS(){if(typeof SLANG==='undefined')return [];return [['slang:all','🔥 Живой русский · All Real Russian'],...SLANG.packs.map(p=>['slang:'+p.id,`🔥 ${p.ru} · ${p.en}`])]}
let SL={p:null,i:0,tab:'scenes'};
function slangHub(pid){if(typeof arStop==='function')arStop();stopAud();
 if(pid&&typeof SLANG!=='undefined'&&SLANG.packs.some(p=>p.id===pid))return slangPack(pid);
 S={view:'slang'};kzNav({v:'slang'});
 const packs=SLANG.packs;
 app.innerHTML=topbar('🔥 Живой русский · Real Russian')+`</div>
 <div class="sec"><p class="lead">${esc(SLANG.intro)}</p><div class="row">${langToggle()}</div>
 <div class="sl-warn">${SLANG.warn}</div>
 <div class="sl-packs">${packs.map(p=>{const d=(P.slang||{})[p.id];return `<button class="sl-pack${d?' done':''}" onclick="slangPack('${p.id}')">${sceneHTML(p.cover,'cover')}<span class="in"><span class="eyebrow">${esc(p.lv)} · ${p.items.length} expressions${d?' · '+starStr(d):''}</span><h3>${p.icon} ${esc(p.ru)}</h3><span class="en">${esc(p.en)}</span></span></button>`}).join('')}</div>
 <div class="row" style="margin-top:16px"><button class="btn sun" onclick="AR.sel='slang:all';AR.mode='room';arSave();arena()">🎪 Play all slang in the Game Room</button></div></div>`;window.scrollTo(0,0)}
function slangPack(pid,tab){const p=SLANG.packs.find(x=>x.id===pid);if(!p)return slangHub();if(SL.p!==pid)SL={p:pid,i:0,tab:'scenes'};if(tab)SL.tab=tab;
 S={view:'slang'};kzNav({v:'slang',p:pid});stopAud();
 const tabs=[['scenes','🎬 Сцены · Scenes'],['list','📋 Список · All'],['quiz','✅ Квиз · Quiz'],['games','🎮 Игры · Games']];
 let h=topbar(`${p.icon} ${esc(p.ru)}`)+`<div class="tabs">${tabs.map(([k,n])=>`<button class="tab${SL.tab===k?' on':''}" onclick="slangPack('${pid}','${k}')">${n}</button>`).join('')}</div></div><div class="sec">`;
 if(SL.tab==='scenes'){const x=p.items[SL.i];
  h+=`<p class="lead">${esc(p.note||p.en)}</p>${sceneHTML(x.sc)}
  <div class="sl-card"><div class="sl-expr">${esc(x.ru)} <button class="say" style="display:inline-block" onclick="say('${esc(x.ru).replace(/'/g,"\\'")}',event)" aria-label="Listen">🔊</button></div>
   <div>${slReg(x.reg)}</div>
   ${x.lit?`<div class="sl-lit">Literally: “${esc(x.lit)}”</div>`:''}
   <div class="sl-mean">= ${esc(slMean(x))}</div>
   ${x.use?`<div class="hint">💡 ${esc(x.use)}</div>`:''}
   <div class="sl-ex">${x.ex.map((e,k)=>`<p><button class="say" style="display:inline-block" onclick="say(this.dataset.t,event)" data-t="${esc(e)}" aria-label="Listen">▶</button> ${esc(e)}</p>`).join('')}<p class="en">${esc(x.exen||'')}</p></div>
  </div>
  <div class="sl-nav"><button class="btn ghost" onclick="slStep(-1)" ${SL.i?'':'disabled'}>← Back</button><div class="sl-dots">${p.items.map((_,k)=>`<i class="${k===SL.i?'on':''}"></i>`).join('')}</div>${SL.i<p.items.length-1?'<button class="btn" onclick="slStep(1)">Next →</button>':`<button class="btn sun" onclick="slangPack('${pid}','quiz')">Quiz →</button>`}</div>`}
 else if(SL.tab==='list'){h+=`<div class="row">${langToggle()}</div><div class="sl-list">${p.items.map((x,k)=>`<button class="sl-li" onclick="SL.i=${k};slangPack('${pid}','scenes')"><b>${esc(x.ru)}</b><span>${esc(slMean(x))}</span><small>${(REGN[x.reg]||REGN.coll)[0]}${x.lit?' · lit. “'+esc(x.lit)+'”':''}</small></button>`).join('')}</div>`}
 else if(SL.tab==='games'){h+=`<p class="lead">Play this pack’s ${p.items.length} expressions in every Arena game: Alias, Charades, Blocks, Gravity, the Game Room and more.</p><div class="row"><button class="btn sun" onclick="AR.sel='slang:${pid}';AR.mode='room';arSave();arena()">🎪 Game Room</button><button class="btn" onclick="AR.sel='slang:${pid}';AR.mode='alias';arSave();arena()">🗣 Alias (teams)</button><button class="btn" onclick="AR.sel='slang:${pid}';AR.mode='charades';arSave();arena()">🎭 Charades</button><button class="btn ghost" onclick="AR.sel='slang:${pid}';AR.mode='match';arSave();arena()">⏱ Match</button></div>`}
 else if(SL.tab==='quiz'){return slangQuiz(p)}
 h+=`</div>`;app.innerHTML=h;window.scrollTo(0,0);
 if(SL.tab==='scenes'&&P.slang&&!P.slangSeen)P.slangSeen=1}
function slStep(d){const p=SLANG.packs.find(x=>x.id===SL.p);SL.i=Math.max(0,Math.min(p.items.length-1,SL.i+d));slangPack(SL.p,'scenes')}
function slangQuiz(p){const its=p.items,pool=[];
 const others=x=>shuffle(its.filter(y=>y!==x)).slice(0,3);
 shuffle(its).forEach((x,k)=>{const o=others(x);
  if(k%3===0)pool.push({t:'scene',sc:x.sc,q:'Which expression does this scene show?',o:[x.ru,...o.map(y=>y.ru)],a:x.ru,say:x.ru});
  else if(k%3===1)pool.push({t:'mc',kind:'Что это значит? · What does it mean?',q:x.ru,say:x.ru,o:[slMean(x),...o.map(slMean)],a:slMean(x)});
  else pool.push({t:'mc',kind:'Как сказать? · Say it like a local',q:`“${slMean(x)}”`,o:[x.ru,...o.map(y=>y.ru)],a:x.ru});
  if(x.sit)pool.push({t:'mc',kind:'Ситуация · What would you say?',q:x.sit,o:[x.ru,...o.map(y=>y.ru)],a:x.ru})});
 (p.quiz||[]).forEach(q=>pool.push(Object.assign({},q)));
 S={view:'slangquiz',p:p.id};startQuiz(shuffle(pool).slice(0,Math.min(14,pool.length)),'slang');Q.title=p.ru;Q.pid=p.id;renderQ()}
function slangResults(){const r=Q.correct/Q.base,s=r>=.9?3:r>=.7?2:1;P.slang=P.slang||{};if(!P.slang[Q.pid]||P.slang[Q.pid]<s)P.slang[Q.pid]=s;markDay();checkBadges();save();confetti();sfx('level');
 const i=SLANG.packs.findIndex(x=>x.id===Q.pid),nx=SLANG.packs[i+1];
 app.innerHTML=topbar('🔥 '+esc(Q.title))+`</div><div class="result"><div class="big">${starStr(s)}</div><h2>${s===3?'Ты говоришь как местный!':s===2?'Неплохо!':'Хорошее начало!'}</h2><p class="lead">${Q.correct} of ${Q.base} right first time (${Math.round(r*100)}%)</p>${earnedHTML()}<div class="row" style="justify-content:center">${nx?`<button class="btn" onclick="SL.p=null;slangPack('${nx.id}')">Next: ${nx.icon} ${esc(nx.ru)} →</button>`:''}<button class="btn ghost" onclick="slangPack('${Q.pid}','quiz')">Try again</button><button class="btn ghost" onclick="slangHub()">All packs</button></div></div>`;window.scrollTo(0,0)}

/* ---------- Grammar Atlas ---------- */
function atlasHub(id){if(typeof arStop==='function')arStop();stopAud();if(typeof ATLAS==='undefined')return home();
 if(id&&ATLAS.cards.some(c=>c.id===id))return atlasCard(id);
 S={view:'atlas'};kzNav({v:'atlas'});const seen=P.atlasSeen||{};
 app.innerHTML=topbar('🗺 Атлас грамматики · Grammar Atlas')+`</div><div class="sec"><p class="lead">${esc(ATLAS.intro)}</p>
 ${ATLAS.chapters.map(ch=>`<section class="at-ch"><div class="unit-head"><span class="eyebrow">${esc(ch.en)}</span><h2>${ch.icon} ${esc(ch.ru)}</h2></div><div class="at-cards">${ATLAS.cards.filter(c=>c.ch===ch.id).map(c=>`<button class="at-card${seen[c.id]?' seen':''}" onclick="atlasCard('${c.id}')"><i>${c.icon}</i><b>${esc(c.ru)}</b><small>${esc(c.en)} · ${c.lv}${seen[c.id]?' · ✓':''}</small></button>`).join('')}</div></section>`).join('')}</div>`;window.scrollTo(0,0)}
function atlasCard(id){const c=ATLAS.cards.find(x=>x.id===id);if(!c)return atlasHub();S={view:'atlas'};kzNav({v:'atlas',p:id});
 P.atlasSeen=P.atlasSeen||{};if(!P.atlasSeen[id]){P.atlasSeen[id]=today();P.flags=P.flags||{};P.flags.atlas=(P.flags.atlas||0)+1;addXP(3)}
 const k=ATLAS.cards.indexOf(c),nx=ATLAS.cards[k+1],pv=ATLAS.cards[k-1];
 app.innerHTML=topbar(`${c.icon} ${esc(c.ru)}`)+`</div><div class="sec"><p class="lead">${esc(c.en)} · ${c.lv}${c.lessons?` · practised in lessons ${esc(c.lessons)}`:''}</p>${c.html()}
 <div class="at-quiz"><h3>Check yourself · Проверь себя</h3>${(c.qs||[]).map((q,j)=>`<div class="rq"><div class="q">${esc(q.q)}</div><div class="opts" id="atq${j}">${shuffle(q.o).map(o=>`<button class="opt" onclick="atAns('${id}',${j},this,${o===q.a})">${esc(o)}</button>`).join('')}</div></div>`).join('')}</div>
 <div class="sl-nav">${pv?`<button class="btn ghost" onclick="atlasCard('${pv.id}')">← ${esc(pv.ru)}</button>`:'<span></span>'}<button class="btn ghost" onclick="atlasHub()">Atlas</button>${nx?`<button class="btn" onclick="atlasCard('${nx.id}')">${esc(nx.ru)} →</button>`:'<span></span>'}</div></div>`;
 window.scrollTo(0,0);atSpeakable()}
function atAns(id,j,btn,ok){const box=document.getElementById('atq'+j);if(box.classList.contains('done'))return;box.classList.add('done');btn.classList.add(ok?'ok':'no');sfx(ok?'ok':'no');if(ok)addXP(2);else{const c=ATLAS.cards.find(x=>x.id===id);[...box.children].forEach(b=>{if(b.textContent===c.qs[j].a)b.classList.add('ok')})}}
/* tap any Russian example in grammar/atlas infographics to hear it */
function atSpeakable(){if(!TTS_OK)return;document.querySelectorAll('.gram .ig-chip,.gram .ig-card b,.gram .ig-vs p,.gram .ig-do,.gram .ig-dont,.gram td,.gram .ig-time>span').forEach(el=>{const t=el.cloneNode(true);t.querySelectorAll('small').forEach(s=>s.remove());const tx=t.textContent.trim();if(!/[а-яё]/i.test(tx)||el.dataset.spk)return;el.dataset.spk=1;el.style.cursor='pointer';el.title='Tap to listen';el.addEventListener('click',e=>{e.stopPropagation();play(0,tx.replace(/[✓✗]/g,''),1,true)})})}
document.addEventListener('click',()=>{},{passive:true});
