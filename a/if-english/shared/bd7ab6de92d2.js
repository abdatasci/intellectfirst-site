/* IF Arcade (ifr-plus.js): dashboard, IF Coins, daily streaks, timed vocabulary + grammar challenges, classic solo games.
   Shared by the IF Vocabulary Arenas. Needs globals DATA = {key:{title,words:[[word,definition],...]}} and `lesson`.
   Capabilities used: db (plog/{self}, plog, board/{self}, board), user, downloads. Works without them (this device only). */
(function(){
if(window.IFPlus)return;
var ARENA=(document.title||'Arena').trim();
var $=function(s,e){return(e||document).querySelector(s)};
var esc=function(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
var shuf=function(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a};
var rnd=function(n){return Math.floor(Math.random()*n)};
function lsGet(k){try{return localStorage.getItem(k)}catch(e){return null}}
function lsSet(k,v){try{localStorage.setItem(k,v)}catch(e){}}
var norm=function(s){return String(s||'').toLowerCase().replace(/[’‘`´]/g,"'").replace(/[^a-z0-9' -]/g,'').replace(/[-\s]+/g,' ').trim()};
function today(d){d=d||new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function dayAgo(n){var d=new Date();d.setDate(d.getDate()-n);return today(d)}

/* ---------- level + data ---------- */
function level(){
  if(window.IFP_LEVEL)return window.IFP_LEVEL;
  var t=ARENA;if(/C1/.test(t))return'C1';if(/B2/.test(t))return'B2';if(/KET|A2|Pre-?int/i.test(t))return'A2';return'B1';
}
function dataKeys(){try{return Object.keys(DATA).filter(function(k){return !window.IFEN_GATE||IFEN_GATE.unlocked(k)})}catch(e){return[]}}
function curLesson(){try{if(typeof lesson!=='undefined'&&DATA[lesson]&&(!window.IFEN_GATE||IFEN_GATE.unlocked(lesson)))return lesson}catch(e){}return dataKeys()[0]}
var scope=lsGet('ifp:scope')==='all'?'all':'unit';
function pairs(sc){
  var out=[];sc=sc||scope;
  try{
    var ks=sc==='all'?dataKeys():[curLesson()];
    ks.forEach(function(k){((DATA[k]&&DATA[k].words)||[]).forEach(function(w){if(w&&w[0]&&w[1])out.push([String(w[0]),String(w[1])])})});
  }catch(e){}
  return out;
}
function pool(){return pairs().map(function(w){return{w:w[0],d:w[1]}})}
function unitLabel(){try{var k=curLesson();return scope==='all'?'All units':k+' · '+(DATA[k].title||'')}catch(e){return''}}

/* ---------- profile ---------- */
var RANKS=[['Bronze',0],['Silver',100],['Gold',300],['Platinum',700],['Diamond',1500]];
function rankOf(c){var r=RANKS[0],n=null;for(var i=0;i<RANKS.length;i++){if(c>=RANKS[i][1]){r=RANKS[i];n=RANKS[i+1]||null}}return{name:r[0],from:r[1],next:n}}
var BADGES=[
 ['first','🌱','First steps','Play your first game',function(p){return p.plays>=1}],
 ['s3','🔥','3-day streak','Play 3 days in a row',function(p){return p.best>=3}],
 ['s7','🔥','7-day streak','Play 7 days in a row',function(p){return p.best>=7}],
 ['s30','🏔️','30-day streak','Play 30 days in a row',function(p){return p.best>=30}],
 ['c100','🪙','100 coins','Earn 100 IF Coins',function(p){return p.total>=100}],
 ['c500','💰','500 coins','Earn 500 IF Coins',function(p){return p.total>=500}],
 ['c1000','💎','1000 coins','Earn 1000 IF Coins',function(p){return p.total>=1000}],
 ['combo','⚡','Combo ×10','Answer 10 in a row',function(p){return p.combo>=10}],
 ['perfect','🎯','Perfect daily','Score 10/10 in the Daily Challenge',function(p){return p.perfect>=1}],
 ['v100','📚','Word hunter','100 correct vocabulary answers',function(p){return p.vok>=100}],
 ['g50','📘','Grammar guru','50 correct grammar answers',function(p){return p.gok>=50}],
 ['all','🎮','All-rounder','Play 6 different games',function(p){return Object.keys(p.games||{}).length>=6}]
];
function blank(){return{v:0,name:'',group:'',coins:0,total:0,xp:0,streak:0,best:0,last:'',days:{},plays:0,vok:0,gok:0,combo:0,perfect:0,daily:'',games:{},badges:[],log:[],wallet:'',arena:ARENA}}
var key='ifp:p:'+ARENA;
var P=(function(){var b=blank();try{var s=JSON.parse(lsGet(key)||'null');if(s&&typeof s==='object')for(var k in s)b[k]=s[k]}catch(e){}
  b.name=b.name||lsGet('ifr_name')||'';b.group=b.group||lsGet('ifr_group')||'';return b})();
var R={db:null,uid:null,owner:false,ready:false,online:false,students:[],board:[],subs:false};
function wallet(){var s=(R.uid||P.wallet||'');if(!s){s='L'+Math.random().toString(36).slice(2,10)}P.wallet=P.wallet||s;var h=0,t=String(P.wallet);for(var i=0;i<t.length;i++)h=(h*31+t.charCodeAt(i))>>>0;return'IFC-'+h.toString(16).toUpperCase().padStart(8,'0')}
var saveT=null;
function persist(){P.v=(P.v||0)+1;lsSet(key,JSON.stringify(P));clearTimeout(saveT);saveT=setTimeout(pushRemote,900)}
async function pushRemote(){
  if(!R.db||!R.uid)return;
  try{
    var rk=rankOf(P.total);
    await R.db.doc('plog/'+R.uid).set(JSON.parse(JSON.stringify(P)));
    await R.db.doc('board/'+R.uid).set({name:P.name||'Student',group:P.group||'',coins:P.coins,total:P.total,streak:P.streak,best:P.best,rank:rk.name,plays:P.plays,updatedAt:new Date().toISOString()});
    R.online=true;
  }catch(e){R.online=false}
  paintPill();
}
async function pullRemote(){
  if(!R.db||!R.uid)return;
  try{
    var snap=await R.db.doc('plog/'+R.uid).get();
    if(snap.exists){var r=snap.data()||{};if((r.v||0)>(P.v||0)||(r.total||0)>(P.total||0)){var keep={name:P.name,group:P.group};for(var k in r)P[k]=r[k];P.name=P.name||keep.name;P.group=P.group||keep.group;lsSet(key,JSON.stringify(P))}}
    R.online=true;
    if(P.name||P.coins)pushRemote();
  }catch(e){R.online=false}
  paintPill();if(open)render();
}

/* ---------- awarding ---------- */
function award(o){
  var pts=Math.max(0,Math.round(+o.points||0)),coins=pts>0?Math.min(o.cap||60,Math.max(1,Math.round(pts/10))):0;
  var t=today(),res={coins:coins,streakBonus:0,bonus:0,newBadges:[],streak:P.streak,first:false};
  if(P.last!==t){
    res.first=true;
    if(P.last===dayAgo(1))P.streak=(P.streak||0)+1;else P.streak=1;
    P.last=t;P.best=Math.max(P.best||0,P.streak);
    res.streakBonus=Math.min(20,2*P.streak);
  }
  if(o.daily&&P.daily!==t){P.daily=t;res.bonus=25}
  res.streak=P.streak;
  var add=coins+res.streakBonus+res.bonus;
  P.coins+=add;P.total+=add;P.xp+=pts;P.plays++;
  P.days[t]=(P.days[t]||0)+1;
  var ks=Object.keys(P.days).sort();while(ks.length>70){delete P.days[ks.shift()]}
  var g=P.games[o.game]||{plays:0,best:0,coins:0};g.plays++;g.best=Math.max(g.best,pts);g.coins+=add;g.name=o.label||o.game;P.games[o.game]=g;
  if(o.vok)P.vok+=o.vok;if(o.gok)P.gok+=o.gok;if(o.combo)P.combo=Math.max(P.combo||0,o.combo);if(o.perfect)P.perfect=(P.perfect||0)+1;
  P.log.unshift({at:new Date().toISOString(),game:o.game,label:o.label||o.game,pts:pts,coins:add,unit:o.unit||unitLabel()});if(P.log.length>120)P.log.length=120;
  BADGES.forEach(function(b){if(P.badges.indexOf(b[0])<0&&b[4](P)){P.badges.push(b[0]);res.newBadges.push(b)}});
  res.total=add;persist();paintPill();
  /* keep the teacher's existing Results list in step */
  if(P.name&&P.group&&R.db&&R.uid&&pts>0)mirrorResult(o,pts);
  return res;
}
async function mirrorResult(o,pts){
  try{
    var ref=R.db.doc('results/'+R.uid),snap=await ref.get(),cur=snap.exists?snap.data():{},att=Array.isArray(cur.attempts)?cur.attempts.slice(-99):[];
    att.push({score:pts,total:null,activity:ARENA+' · '+(o.label||o.game),group:P.group,at:new Date().toISOString(),source:'game'});
    await ref.set({name:P.name,group:P.group,updatedAt:new Date().toISOString(),attempts:att});
  }catch(e){}
}
function awardHtml(r){
  if(!r)return'';
  var s='<div class="ifp-award"><div class="ifp-big">+'+r.total+' 🪙</div><div class="ifp-muted">';
  var parts=['game '+r.coins];if(r.streakBonus)parts.push('streak bonus '+r.streakBonus);if(r.bonus)parts.push('daily bonus '+r.bonus);
  s+=parts.join(' · ')+'</div>';
  s+='<div>🔥 '+r.streak+' day streak</div>';
  r.newBadges.forEach(function(b){s+='<div class="ifp-newbadge">'+b[1]+' New badge: <b>'+esc(b[2])+'</b></div>'});
  return s+'</div>';
}

/* ---------- styles ---------- */
var css=document.createElement('style');css.id='ifp-css';
css.textContent="\
.ifp{--bg:#fff;--ink:#14213D;--muted:#5B6B82;--line:#D8E1EE;--soft:#F4F7FB;--navy:#14213D;--gold:#C9A227;--ok:#1F7A4D;--bad:#B4533C;--okbg:#DDF3E8;--badbg:#F7DEDB;font-family:Calibri,'Segoe UI',system-ui,Arial,sans-serif;color:var(--ink)}\
@media (prefers-color-scheme:dark){:root:not([data-theme=light]) .ifp{--bg:#17233B;--ink:#E8EDF6;--muted:#9AA9C2;--line:#2A3A59;--soft:#0E1626;--navy:#0A101D;--gold:#E0B93C;--ok:#5CC28E;--bad:#F08A5D;--okbg:#17382C;--badbg:#44251C}}\
:root[data-theme=dark] .ifp{--bg:#17233B;--ink:#E8EDF6;--muted:#9AA9C2;--line:#2A3A59;--soft:#0E1626;--navy:#0A101D;--gold:#E0B93C;--ok:#5CC28E;--bad:#F08A5D;--okbg:#17382C;--badbg:#44251C}\
.ifp *{box-sizing:border-box}\
.ifp-pill{all:unset;position:fixed;left:12px;bottom:calc(12px + env(safe-area-inset-bottom,0px));z-index:2147482990;cursor:pointer;background:#14213D;color:#fff;border:2px solid #C9A227;border-radius:999px;padding:8px 14px;font:700 13px/1 Calibri,'Segoe UI',system-ui,Arial,sans-serif;box-shadow:0 4px 14px rgba(0,0,0,.25);display:flex;gap:8px;align-items:center;max-width:calc(100vw - 130px)}\
.ifp-pill:focus-visible,.ifp button:focus-visible,.ifp input:focus-visible{outline:3px solid #C9A227;outline-offset:2px}\
.ifp-scrim{position:fixed;inset:0;z-index:2147483002;background:rgba(10,16,29,.6);display:flex;align-items:center;justify-content:center}\
.ifp-scrim[hidden]{display:none!important}\
.ifp-sheet{background:var(--bg);width:100%;height:100%;display:flex;flex-direction:column;overflow:hidden}\
@media (min-width:700px){.ifp-sheet{width:min(780px,94vw);height:min(92vh,860px);border-radius:16px;border-top:5px solid var(--gold);box-shadow:0 16px 50px rgba(0,0,0,.4)}}\
.ifp-head{display:flex;align-items:center;gap:10px;padding:12px 16px;padding-top:calc(12px + env(safe-area-inset-top,0px));background:var(--navy);color:#fff}\
.ifp-head h2{margin:0;font:700 1.15rem/1.1 Cambria,Georgia,serif;flex:1;min-width:0}\
.ifp-coins{font-weight:800;background:rgba(255,255,255,.12);border-radius:999px;padding:4px 10px;white-space:nowrap}\
.ifp-x{all:unset;cursor:pointer;color:#fff;font-size:1.6rem;line-height:1;padding:2px 8px}\
.ifp-tabs{display:flex;gap:6px;padding:10px 16px;overflow-x:auto;border-bottom:1px solid var(--line);background:var(--bg)}\
.ifp-tab{all:unset;cursor:pointer;white-space:nowrap;padding:7px 13px;border-radius:999px;border:1px solid var(--line);font-weight:700;font-size:.9rem;color:var(--muted)}\
.ifp-tab[aria-selected=true]{background:var(--navy);color:#fff;border-color:var(--navy)}\
.ifp-body{flex:1;min-height:0;overflow:auto;padding:16px;padding-bottom:calc(20px + env(safe-area-inset-bottom,0px));display:flex;flex-direction:column;gap:14px}\
.ifp-body.frame{padding:0;overflow:hidden}\
.ifp-frame{flex:1;width:100%;border:0;min-height:0;background:#14213D}\
.ifp-h{font:700 1.05rem Cambria,Georgia,serif;margin:0}\
.ifp-muted{color:var(--muted);font-size:.9rem}\
.ifp-card{border:1px solid var(--line);border-radius:14px;padding:14px;background:var(--soft)}\
.ifp-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:10px}\
.ifp-game{all:unset;cursor:pointer;display:flex;flex-direction:column;gap:3px;border:1px solid var(--line);border-radius:14px;padding:12px;background:var(--soft);min-width:0}\
.ifp-game:active,.ifp-game:hover{border-color:var(--gold)}\
.ifp-game b{font:700 1.05rem Cambria,Georgia,serif}\
.ifp-game .ic{font-size:1.7rem}.ifp-game .tg{font-size:.75rem;color:var(--gold);font-weight:800;letter-spacing:.06em;text-transform:uppercase}\
.ifp-btn{all:unset;cursor:pointer;text-align:center;background:var(--gold);color:#14213D;font-weight:800;padding:11px 18px;border-radius:12px}\
.ifp-btn.ghost{background:transparent;color:var(--ink);border:1px solid var(--line)}\
.ifp-btn[disabled]{opacity:.5;cursor:default}\
.ifp-row{display:flex;gap:10px;flex-wrap:wrap;align-items:center}\
.ifp-row>*{min-width:0}\
.ifp-seg{display:inline-flex;border:1px solid var(--line);border-radius:999px;overflow:hidden}\
.ifp-seg button{all:unset;cursor:pointer;padding:6px 14px;font-weight:700;font-size:.88rem;color:var(--muted)}\
.ifp-seg button[aria-pressed=true]{background:var(--navy);color:#fff}\
.ifp-in{font:inherit;font-size:1rem;padding:9px 10px;border:1px solid var(--line);border-radius:10px;background:var(--soft);color:var(--ink);min-width:0;width:100%}\
.ifp-f{display:flex;flex-direction:column;gap:4px;flex:1;min-width:140px}\
.ifp-f label{font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);font-weight:700}\
.ifp-wallet{background:linear-gradient(135deg,#14213D,#26407A);color:#fff;border-radius:16px;padding:16px;display:flex;flex-direction:column;gap:6px;border:2px solid var(--gold)}\
.ifp-wallet .bal{font:800 2.4rem/1 Cambria,Georgia,serif;font-variant-numeric:tabular-nums;color:#F3DD8A}\
.ifp-wallet small{opacity:.8;letter-spacing:.08em}\
.ifp-prog{height:10px;border-radius:6px;background:rgba(255,255,255,.2);overflow:hidden}.ifp-prog i{display:block;height:100%;background:#C9A227}\
.ifp-days{display:flex;gap:4px;flex-wrap:wrap}\
.ifp-day{width:22px;height:22px;border-radius:6px;background:var(--line)}.ifp-day.on{background:var(--gold)}.ifp-day.today{outline:2px solid var(--navy)}\
.ifp-badges{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:8px}\
.ifp-badge{border:1px solid var(--line);border-radius:12px;padding:8px;text-align:center;font-size:.82rem;background:var(--soft)}\
.ifp-badge .e{font-size:1.6rem;display:block}.ifp-badge.off{opacity:.4;filter:grayscale(1)}\
.ifp-tbl{overflow-x:auto;border:1px solid var(--line);border-radius:10px}\
.ifp-tbl table{border-collapse:collapse;width:100%;font-size:.88rem}\
.ifp-tbl th,.ifp-tbl td{text-align:left;padding:7px 9px;border-bottom:1px solid var(--line);white-space:nowrap}\
.ifp-tbl th{font-size:.7rem;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);background:var(--soft)}\
.ifp-tbl td.n{text-align:right;font-variant-numeric:tabular-nums}\
.ifp-tbl tr.me td{background:rgba(201,162,39,.18);font-weight:700}\
.ifp-hud{display:flex;justify-content:space-between;align-items:center;gap:8px;font-weight:800;flex-wrap:wrap}\
.ifp-chip{background:var(--navy);color:#fff;border-radius:999px;padding:3px 11px;font-size:.88rem;font-variant-numeric:tabular-nums}\
.ifp-time{height:10px;border-radius:6px;background:var(--line);overflow:hidden}.ifp-time i{display:block;height:100%;background:var(--gold);width:100%;transition:width .25s linear}\
.ifp-time.low i{background:var(--bad)}\
.ifp-q{font:700 clamp(1.15rem,4.4vw,1.6rem)/1.3 Cambria,Georgia,serif;text-align:center;padding:10px 6px;text-wrap:balance;overflow-wrap:anywhere}\
.ifp-q mark{background:rgba(201,162,39,.35);color:inherit;border-radius:6px;padding:0 8px}\
.ifp-opts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}\
.ifp-opts.tf{grid-template-columns:1fr 1fr}\
@media (max-width:480px){.ifp-opts:not(.tf){grid-template-columns:1fr}}\
.ifp-opt{all:unset;cursor:pointer;text-align:center;border:2px solid var(--line);border-radius:14px;padding:14px 10px;font-weight:700;font-size:1.05rem;background:var(--soft);overflow-wrap:anywhere;min-width:0}\
.ifp-opt.right{background:var(--okbg);border-color:var(--ok)}.ifp-opt.wrong{background:var(--badbg);border-color:var(--bad)}\
.ifp-fb{min-height:2.6em;text-align:center;font-weight:700}.ifp-fb.ok{color:var(--ok)}.ifp-fb.no{color:var(--bad)}\
.ifp-big{font:800 2.2rem/1 Cambria,Georgia,serif;text-align:center;font-variant-numeric:tabular-nums}\
.ifp-award{text-align:center;border:2px dashed var(--gold);border-radius:14px;padding:14px;display:flex;flex-direction:column;gap:4px}\
.ifp-newbadge{background:rgba(201,162,39,.2);border-radius:10px;padding:6px}\
.ifp-slots{display:flex;flex-wrap:wrap;gap:6px;min-height:52px;border:2px dashed var(--line);border-radius:12px;padding:8px;justify-content:center;align-items:center}\
.ifp-tok{all:unset;cursor:pointer;background:var(--navy);color:#fff;border-radius:10px;padding:9px 12px;font-weight:700}\
.ifp-tok.used{opacity:.25;pointer-events:none}\
.ifp-slots .ifp-tok{background:var(--gold);color:#14213D}\
.ifp-toast{position:absolute;left:50%;transform:translateX(-50%);bottom:18px;background:#14213D;color:#fff;border:2px solid #C9A227;border-radius:12px;padding:10px 16px;font-weight:700;z-index:3;max-width:90%;text-align:center}\
.ifp-shake{animation:ifpsh .3s}@keyframes ifpsh{25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}\
";
css.textContent+="body{padding-bottom:calc(70px + env(safe-area-inset-bottom,0px))!important}";
document.head.appendChild(css);

/* ---------- shell ---------- */
var root=document.createElement('div');root.className='ifp';
root.innerHTML='<button class="ifp-pill" id="ifp-pill" type="button" aria-haspopup="dialog"></button><div class="ifp-scrim" id="ifp-scrim" hidden><div class="ifp-sheet" role="dialog" aria-modal="true" aria-label="IF Arcade"><div class="ifp-head"><h2 id="ifp-title">IF Arcade</h2><span class="ifp-coins" id="ifp-hc"></span><button class="ifp-x" id="ifp-x" type="button" aria-label="Close">×</button></div><div class="ifp-tabs" id="ifp-tabs" role="tablist"></div><div class="ifp-body" id="ifp-body"></div></div></div>';
document.body.appendChild(root);
var pill=$('#ifp-pill'),scrim=$('#ifp-scrim'),body=$('#ifp-body'),tabsEl=$('#ifp-tabs');
var open=false,view='arcade',G=null,toastT=null;
function paintPill(){
  var t=today(),done=P.last===t;
  pill.innerHTML='<span>🪙 '+P.coins+'</span><span>'+(P.streak?'🔥 '+(done||P.last===dayAgo(1)?P.streak:0):'🔥 0')+'</span><span>▶ Arcade</span>';
  var hc=$('#ifp-hc');if(hc)hc.textContent='🪙 '+P.coins;
}
function toast(msg){
  var s=$('.ifp-sheet',root);if(!s)return;var t=document.createElement('div');t.className='ifp-toast';t.innerHTML=msg;s.appendChild(t);
  clearTimeout(toastT);toastT=setTimeout(function(){t.remove()},3600);
}
function tabsList(){var t=[['arcade','Arcade'],['me','My dashboard'],['board','Leaderboard']];if(R.owner)t.push(['class','Class progress']);return t}
function renderTabs(){
  tabsEl.innerHTML='';
  tabsList().forEach(function(t){var b=document.createElement('button');b.type='button';b.className='ifp-tab';b.textContent=t[1];b.setAttribute('role','tab');b.setAttribute('aria-selected',view===t[0]);b.onclick=function(){go(t[0])};tabsEl.appendChild(b)});
}
function go(v){stopGame();view=v;if(v==='board'||v==='class')subscribe();render()}
function openSheet(v){open=true;if(v)view=v;scrim.hidden=false;document.documentElement.style.overflow='hidden';render();var x=$('#ifp-x');try{x.focus()}catch(e){}}
function closeSheet(){stopGame();open=false;scrim.hidden=true;document.documentElement.style.overflow='';try{pill.focus()}catch(e){}}
pill.onclick=function(){openSheet('arcade')};$('#ifp-x').onclick=closeSheet;
scrim.addEventListener('click',function(e){if(e.target===scrim)closeSheet()});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&open)closeSheet()});
function render(){
  if(!open)return;renderTabs();if(view==='play')return;body.className='ifp-body';
  var f={arcade:viewArcade,me:viewMe,board:viewBoard,class:viewClass}[view]||viewArcade;f();
}

/* ---------- Arcade ---------- */
var GAMES=[
 {id:'lightning',ic:'⚡',n:'Lightning Quiz',d:'60 seconds. Read the definition, tap the word. Build a combo!',tag:'Vocabulary · timed',f:function(){startMCQ(mcqVocab())}},
 {id:'spell',ic:'⌨️',n:'Spell Rush',d:'60 seconds. Type the word from its definition and first letter.',tag:'Vocabulary · timed',f:startSpell},
 {id:'tfv',ic:'🎯',n:'True or False Blitz',d:'45 seconds. Does the word match the meaning?',tag:'Vocabulary · timed',f:function(){startMCQ(tfVocab())}},
 {id:'daily',ic:'🔥',n:'Daily Challenge',d:'10 mixed questions. Finish today for a streak boost and +25 bonus coins.',tag:'Daily · vocab + grammar',f:function(){startMCQ(dailyCfg())}},
 {id:'gsprint',ic:'📘',n:'Grammar Sprint',d:'60 seconds. Choose the correct word or phrase to complete the sentence.',tag:'Grammar · timed',f:function(){startMCQ(gramSprint())}},
 {id:'gerror',ic:'🕵️',n:'Spot the Error',d:'60 seconds. Is the sentence correct or not?',tag:'Grammar · timed',f:function(){startMCQ(gramError())}},
 {id:'gorder',ic:'🧩',n:'Word Order Builder',d:'90 seconds. Tap the words to build the correct sentence.',tag:'Grammar · timed',f:startOrder}
];
var CLASSIC=[['blocks','🧱','Block Drop','Tap the falling word block that fits the clue.'],['bb','🟨','Block Blast Words','Place blocks to clear lines. Answer bonus questions.'],['hang','🪢','Word Rescue','Guess the hidden word letter by letter.'],['scr','🔀','Letter Shuffle','Put the jumbled letters in order.'],['mem','🃏','Memory Pairs','Match each word with its meaning.'],['ws','🔎','Word Search','Find the words from the clues.'],['spell','🎧','Listen & Spell','Hear the word, then spell it.']];
function viewArcade(){
  var n=pairs().length,lv=level();
  var h='<div class="ifp-row"><div class="ifp-seg" role="group" aria-label="Vocabulary scope"><button data-sc="unit" aria-pressed="'+(scope==='unit')+'">This lesson</button><button data-sc="all" aria-pressed="'+(scope==='all')+'">All lessons</button></div><span class="ifp-muted">'+esc(unitLabel())+' · '+n+' words · grammar level '+lv+'</span></div>';
  h+='<div class="ifp-card ifp-muted">Earn <b>IF Coins</b> 🪙 in every game. Play every day to grow your 🔥 streak and earn bonus coins. Sign in and save your name in <b>My dashboard</b> to keep your progress.</div>';
  h+='<h3 class="ifp-h">Time challenges</h3><div class="ifp-grid">';
  GAMES.forEach(function(g){h+='<button class="ifp-game" data-g="'+g.id+'"><span class="ic">'+g.ic+'</span><span class="tg">'+esc(g.tag)+'</span><b>'+esc(g.n)+'</b><span class="ifp-muted">'+esc(g.d)+'</span></button>'});
  h+='</div><h3 class="ifp-h">Classic solo games</h3><div class="ifp-grid">';
  CLASSIC.forEach(function(c){h+='<button class="ifp-game" data-c="'+c[0]+'"><span class="ic">'+c[1]+'</span><span class="tg">Vocabulary · solo</span><b>'+esc(c[2])+'</b><span class="ifp-muted">'+esc(c[3])+'</span></button>'});
  h+='</div><p class="ifp-muted">The built-in solo games on the main page (Quick Quiz, Blocks, Match, Gravity and more) also pay coins when you finish them.</p>';
  body.innerHTML=h;
  Array.prototype.forEach.call(body.querySelectorAll('[data-sc]'),function(b){b.onclick=function(){scope=b.dataset.sc;lsSet('ifp:scope',scope);render()}});
  Array.prototype.forEach.call(body.querySelectorAll('[data-g]'),function(b){b.onclick=function(){var g=GAMES.filter(function(x){return x.id===b.dataset.g})[0];if(needWords(g))return;g.f()}});
  Array.prototype.forEach.call(body.querySelectorAll('[data-c]'),function(b){b.onclick=function(){if(pairs().length<6){toast('This lesson needs at least 6 words. Choose All lessons.');return}classic(b.dataset.c)}});
}
function needWords(g){
  var gram=/^g/.test(g.id);if(gram)return false;
  if(pairs().length<4){toast('Not enough words in this lesson. Choose All lessons.');return true}return false;
}

/* ---------- question engines ---------- */
function vocabQ(){var p=pairs(),w=p[rnd(p.length)],others=shuf(p.filter(function(x){return x[0]!==w[0]})).slice(0,3);
  var o=shuf([w].concat(others));return{p:'<span class="ifp-muted">Which word matches?</span><br>“'+esc(w[1])+'”',o:o.map(function(x){return x[0]}),a:o.indexOf(w),why:'“'+w[0]+'”: '+w[1],kind:'v'}}
var gbag=[];
function gItem(){var b=(window.IFP_GRAMMAR||{})[level()]||[];if(!b.length)return null;if(!gbag.length)gbag=shuf(b);return gbag.pop()}
function gramQ(){var it=gItem();if(!it)return vocabQ();var o=shuf(it[1].map(function(t,i){return[t,i]}));
  return{p:esc(it[0]).replace('___','<mark>&nbsp;&nbsp;&nbsp;?&nbsp;&nbsp;&nbsp;</mark>'),o:o.map(function(x){return x[0]}),a:o.findIndex(function(x){return x[1]===it[2]}),why:it[1][it[2]]+' — '+it[3]+'. '+it[4],kind:'g'}}
function mcqVocab(){return{id:'lightning',name:'Lightning Quiz',secs:60,gen:vocabQ,pen:3}}
function tfVocab(){return{id:'tfv',name:'True or False Blitz',secs:45,tf:true,pen:3,gen:function(){var p=pairs(),w=p[rnd(p.length)],t=Math.random()<.5,d=w[1];if(!t){var o;do{o=p[rnd(p.length)]}while(o[0]===w[0]&&p.length>1);d=o[1]}
  return{p:'<b>'+esc(w[0])+'</b><br><span class="ifp-muted">means</span><br>“'+esc(d)+'”',o:['True','False'],a:t?0:1,why:'“'+w[0]+'” means: '+w[1],kind:'v'}}}}
function gramSprint(){return{id:'gsprint',name:'Grammar Sprint',secs:60,gen:gramQ,pen:3}}
function gramError(){return{id:'gerror',name:'Spot the Error',secs:60,tf:true,pen:3,gen:function(){var it=gItem();if(!it)return vocabQ();var t=Math.random()<.5,wrong=shuf(it[1].filter(function(x,i){return i!==it[2]}))[0],ans=t?it[1][it[2]]:wrong;
  return{p:'<span class="ifp-muted">Is this sentence correct?</span><br>'+esc(it[0].replace('___',ans)),o:['Correct','Wrong'],a:t?0:1,why:'Correct: '+it[0].replace('___',it[1][it[2]])+' — '+it[3]+'. '+it[4],kind:'g'}}}}
function dailyCfg(){var n=0;return{id:'daily',name:'Daily Challenge',secs:180,limit:10,pen:0,daily:true,gen:function(){n++;return(n%3===0)?gramQ():vocabQ()}}}

function stopGame(){if(G){clearInterval(G.t);if(G.cleanup)G.cleanup();G=null}}
function startMCQ(cfg){
  stopGame();view='play';renderTabs();
  var g=G={cfg:cfg,score:0,combo:0,max:0,ok:0,bad:0,vok:0,gok:0,n:0,left:cfg.secs,q:null,lock:false,done:false};
  body.className='ifp-body';
  body.innerHTML='<div class="ifp-hud"><span class="ifp-chip" id="g-sc">0 pts</span><span class="ifp-chip" id="g-cb">combo ×1</span><span class="ifp-chip" id="g-tm">'+cfg.secs+'s</span></div><div class="ifp-time" id="g-bar"><i></i></div><div id="g-q"></div><div class="ifp-fb" id="g-fb"></div><div><button class="ifp-btn ghost" id="g-q2" type="button">Quit</button></div>';
  $('#g-q2').onclick=function(){stopGame();go('arcade')};
  function mult(){return Math.min(3,1+Math.floor(g.combo/5))}
  function hud(){$('#g-sc').textContent=g.score+' pts';$('#g-cb').textContent='combo ×'+mult()+(g.combo?' · '+g.combo+' in a row':'');var t=Math.max(0,Math.ceil(g.left));$('#g-tm').textContent=t+'s';var b=$('#g-bar');b.firstChild.style.width=Math.max(0,g.left/cfg.secs*100)+'%';b.classList.toggle('low',g.left<=10)}
  function next(){
    if(g.done)return;if(cfg.limit&&g.n>=cfg.limit)return end();
    g.q=cfg.gen();g.lock=false;g.n++;var q=g.q;
    $('#g-q').innerHTML='<div class="ifp-q">'+q.p+'</div><div class="ifp-opts'+(cfg.tf?' tf':'')+'">'+q.o.map(function(o,i){return'<button class="ifp-opt" data-i="'+i+'" type="button">'+esc(o)+'</button>'}).join('')+'</div>';
    $('#g-fb').textContent='';$('#g-fb').className='ifp-fb';
    Array.prototype.forEach.call($('#g-q').querySelectorAll('.ifp-opt'),function(b){b.onclick=function(){pick(+b.dataset.i,b)}});
  }
  function pick(i,btn){
    if(g.lock||g.done)return;g.lock=true;var q=g.q,ok=i===q.a,opts=$('#g-q').querySelectorAll('.ifp-opt'),fb=$('#g-fb');
    opts[q.a].classList.add('right');
    if(ok){g.combo++;g.max=Math.max(g.max,g.combo);g.ok++;if(q.kind==='g')g.gok++;else g.vok++;g.score+=10*mult();fb.textContent='✔ Correct!';fb.className='ifp-fb ok'}
    else{btn.classList.add('wrong');g.combo=0;g.bad++;g.left=Math.max(0,g.left-(cfg.pen||0));fb.textContent='✘ '+(q.why||'');fb.className='ifp-fb no'}
    hud();setTimeout(next,ok?420:1500);
  }
  function end(){
    if(g.done)return;g.done=true;clearInterval(g.t);
    var perfect=cfg.daily&&g.ok===cfg.limit;
    var r=award({game:cfg.id,label:cfg.name,points:g.score,vok:g.vok,gok:g.gok,combo:g.max,daily:cfg.daily&&g.n>=Math.min(cfg.limit||0,g.n)&&g.ok>=5,perfect:perfect,cap:cfg.daily?40:60});
    body.innerHTML='<div class="ifp-big">'+g.score+' pts</div><div class="ifp-muted" style="text-align:center">'+g.ok+' correct · '+g.bad+' wrong · best combo '+g.max+' · '+esc(cfg.name)+'</div>'+awardHtml(r)+'<div class="ifp-row"><button class="ifp-btn" id="g-again" type="button">Play again</button><button class="ifp-btn ghost" id="g-back" type="button">All games</button></div>';
    $('#g-again').onclick=function(){startMCQ(rebuild(cfg.id))};$('#g-back').onclick=function(){go('arcade')};
    G=null;
  }
  g.t=setInterval(function(){g.left-=.25;hud();if(g.left<=0)end()},250);
  hud();next();
}
function rebuild(id){return({lightning:mcqVocab,tfv:tfVocab,gsprint:gramSprint,gerror:gramError,daily:dailyCfg})[id]()}

/* Spell Rush */
function startSpell(){
  stopGame();view='play';renderTabs();
  var secs=60,g=G={score:0,ok:0,bad:0,left:secs,w:null,done:false,streak:0,max:0};
  body.className='ifp-body';
  body.innerHTML='<div class="ifp-hud"><span class="ifp-chip" id="g-sc">0 pts</span><span class="ifp-chip" id="g-cb"></span><span class="ifp-chip" id="g-tm">'+secs+'s</span></div><div class="ifp-time" id="g-bar"><i></i></div><div class="ifp-q" id="s-d"></div><div class="ifp-big" id="s-h" style="letter-spacing:.12em;font-size:1.7rem;overflow-wrap:anywhere"></div><form id="s-f" autocomplete="off" class="ifp-row"><input class="ifp-in" id="s-i" placeholder="Type the word…" autocapitalize="off" autocorrect="off" spellcheck="false" style="flex:1;min-width:160px"><button class="ifp-btn" type="submit">Enter</button><button class="ifp-btn ghost" id="s-sk" type="button">Skip −3s</button></form><div class="ifp-fb" id="g-fb"></div><div><button class="ifp-btn ghost" id="g-q2" type="button">Quit</button></div>';
  $('#g-q2').onclick=function(){stopGame();go('arcade')};
  function hud(){$('#g-sc').textContent=g.score+' pts';$('#g-cb').textContent=g.streak?g.streak+' in a row':'';$('#g-tm').textContent=Math.max(0,Math.ceil(g.left))+'s';var b=$('#g-bar');b.firstChild.style.width=Math.max(0,g.left/secs*100)+'%';b.classList.toggle('low',g.left<=10)}
  var bag=[];
  function next(){var p=pairs();if(!bag.length)bag=shuf(p);g.w=bag.pop();var w=g.w[0];
    $('#s-d').innerHTML='“'+esc(g.w[1])+'”';
    $('#s-h').textContent=w.split('').map(function(c,i){return i===0?c:(/[A-Za-z0-9]/.test(c)?'_':(c===' '?'  ':c))}).join(' ');
    var i=$('#s-i');i.value='';try{i.focus()}catch(e){}}
  $('#s-f').onsubmit=function(e){e.preventDefault();if(g.done)return;var v=norm($('#s-i').value);if(!v)return;
    if(v===norm(g.w[0])){g.ok++;g.streak++;g.max=Math.max(g.max,g.streak);g.score+=15+Math.min(10,g.w[0].length-4>0?g.w[0].length-4:0)+Math.min(10,g.streak);$('#g-fb').textContent='✔ '+g.w[0];$('#g-fb').className='ifp-fb ok';hud();next()}
    else{g.bad++;g.streak=0;$('#g-fb').textContent='Not quite. Try again or skip.';$('#g-fb').className='ifp-fb no';$('#s-i').classList.add('ifp-shake');setTimeout(function(){$('#s-i').classList.remove('ifp-shake')},350);hud()}};
  $('#s-sk').onclick=function(){if(g.done)return;g.left-=3;g.streak=0;$('#g-fb').textContent='It was: '+g.w[0];$('#g-fb').className='ifp-fb no';hud();next()};
  function end(){if(g.done)return;g.done=true;clearInterval(g.t);var r=award({game:'spell',label:'Spell Rush',points:g.score,vok:g.ok,combo:g.max});
    body.innerHTML='<div class="ifp-big">'+g.score+' pts</div><div class="ifp-muted" style="text-align:center">'+g.ok+' words spelled · best run '+g.max+'</div>'+awardHtml(r)+'<div class="ifp-row"><button class="ifp-btn" id="g-again" type="button">Play again</button><button class="ifp-btn ghost" id="g-back" type="button">All games</button></div>';
    $('#g-again').onclick=startSpell;$('#g-back').onclick=function(){go('arcade')};G=null}
  g.t=setInterval(function(){g.left-=.25;hud();if(g.left<=0)end()},250);
  hud();next();
}

/* Word Order Builder */
function startOrder(){
  stopGame();view='play';renderTabs();
  var secs=90,g=G={score:0,ok:0,bad:0,left:secs,done:false,max:0,streak:0,it:null,picked:[],toks:[]};
  body.className='ifp-body';
  body.innerHTML='<div class="ifp-hud"><span class="ifp-chip" id="g-sc">0 pts</span><span class="ifp-chip" id="g-cb"></span><span class="ifp-chip" id="g-tm">'+secs+'s</span></div><div class="ifp-time" id="g-bar"><i></i></div><div class="ifp-muted" style="text-align:center">Tap the words in the right order.</div><div class="ifp-slots" id="o-ans"></div><div class="ifp-slots" id="o-bank" style="border-style:solid"></div><div class="ifp-fb" id="g-fb"></div><div class="ifp-row"><button class="ifp-btn ghost" id="o-clr" type="button">Clear</button><button class="ifp-btn ghost" id="o-sk" type="button">Skip −5s</button><button class="ifp-btn ghost" id="g-q2" type="button">Quit</button></div>';
  $('#g-q2').onclick=function(){stopGame();go('arcade')};
  function hud(){$('#g-sc').textContent=g.score+' pts';$('#g-cb').textContent=g.streak?g.streak+' in a row':'';$('#g-tm').textContent=Math.max(0,Math.ceil(g.left))+'s';var b=$('#g-bar');b.firstChild.style.width=Math.max(0,g.left/secs*100)+'%';b.classList.toggle('low',g.left<=10)}
  function paint(){
    var a=$('#o-ans'),b=$('#o-bank');a.innerHTML='';b.innerHTML='';
    g.picked.forEach(function(i){var t=document.createElement('button');t.type='button';t.className='ifp-tok';t.textContent=g.toks[i];t.onclick=function(){g.picked.splice(g.picked.indexOf(i),1);paint()};a.appendChild(t)});
    g.toks.forEach(function(w,i){var t=document.createElement('button');t.type='button';t.className='ifp-tok'+(g.picked.indexOf(i)>=0?' used':'');t.textContent=w;t.onclick=function(){g.picked.push(i);paint();if(g.picked.length===g.toks.length)check()};b.appendChild(t)});
  }
  function next(){
    var it=gItem();if(!it){end();return}
    var s=it[0].replace('___',it[1][it[2]]);g.it=s;var toks=s.split(' ');g.picked=[];
    var order=toks.map(function(_,i){return i}),tries=0;do{order=shuf(order)}while(order.join()===toks.map(function(_,i){return i}).join()&&tries++<10&&toks.length>2);
    g.toks=order.map(function(i){return toks[i]});g.topic=it[3];g.tip=it[4];paint();$('#g-fb').textContent='';
  }
  function check(){
    var s=g.picked.map(function(i){return g.toks[i]}).join(' ');
    if(s===g.it){g.ok++;g.streak++;g.max=Math.max(g.max,g.streak);g.score+=20+Math.min(15,g.streak*3);$('#g-fb').textContent='✔ '+g.topic;$('#g-fb').className='ifp-fb ok';hud();setTimeout(next,600)}
    else{g.bad++;g.streak=0;g.left=Math.max(0,g.left-2);$('#g-fb').textContent='✘ Not yet. '+g.tip;$('#g-fb').className='ifp-fb no';$('#o-ans').classList.add('ifp-shake');setTimeout(function(){$('#o-ans').classList.remove('ifp-shake');g.picked=[];paint()},700);hud()}
  }
  $('#o-clr').onclick=function(){g.picked=[];paint()};
  $('#o-sk').onclick=function(){g.left-=5;g.streak=0;$('#g-fb').textContent='Answer: '+g.it;$('#g-fb').className='ifp-fb no';hud();setTimeout(next,1300)};
  function end(){if(g.done)return;g.done=true;clearInterval(g.t);var r=award({game:'gorder',label:'Word Order Builder',points:g.score,gok:g.ok,combo:g.max});
    body.innerHTML='<div class="ifp-big">'+g.score+' pts</div><div class="ifp-muted" style="text-align:center">'+g.ok+' sentences built</div>'+awardHtml(r)+'<div class="ifp-row"><button class="ifp-btn" id="g-again" type="button">Play again</button><button class="ifp-btn ghost" id="g-back" type="button">All games</button></div>';
    $('#g-again').onclick=startOrder;$('#g-back').onclick=function(){go('arcade')};G=null}
  g.t=setInterval(function(){g.left-=.25;hud();if(g.left<=0)end()},250);
  hud();next();
}

/* Classic solo games (separate page, same words) */
function classic(id){
  stopGame();view='play';renderTabs();body.className='ifp-body frame';
  body.innerHTML='<div class="ifp-row" style="padding:8px 12px;background:var(--soft)"><button class="ifp-btn ghost" id="c-back" type="button">← Arcade</button><span class="ifp-muted">'+esc(unitLabel())+'</span></div><iframe class="ifp-frame" id="c-fr" title="Solo game" src="../../shared/solo.html#'+id+'"></iframe>';
  $('#c-back').onclick=function(){go('arcade')};
}
window.addEventListener('message',function(e){
  var d=e.data;if(!d||d.type!=='if-solo'||e.origin!==location.origin)return;
  var r=award({game:'c-'+d.game,label:d.name||d.game,points:+d.score||0,vok:d.vok||0});
  toast(r.total?'+'+r.total+' 🪙 earned'+(r.streakBonus?' · streak bonus '+r.streakBonus:'')+(r.newBadges.length?' · '+r.newBadges[0][1]+' '+esc(r.newBadges[0][2]):''):'Play a little longer to earn coins');
});

/* ---------- Dashboard ---------- */
function viewMe(){
  var rk=rankOf(P.total),pct=rk.next?Math.min(100,Math.round((P.total-rk.from)/(rk.next[1]-rk.from)*100)):100;
  var h='<div class="ifp-wallet"><small>IF COIN WALLET · '+esc(wallet())+'</small><div class="bal">🪙 '+P.coins+'</div><div>'+esc(rk.name)+' rank · '+P.total+' coins earned'+(rk.next?' · '+(rk.next[1]-P.total)+' to '+rk.next[0]:'')+'</div><div class="ifp-prog"><i style="width:'+pct+'%"></i></div></div>';
  h+='<div class="ifp-card"><div class="ifp-row"><div class="ifp-f"><label for="p-n">Your name</label><input class="ifp-in" id="p-n" maxlength="40" value="'+esc(P.name)+'" placeholder="e.g. Aruzhan K."></div><div class="ifp-f"><label for="p-g">Group</label><input class="ifp-in" id="p-g" maxlength="40" value="'+esc(P.group)+'" placeholder="e.g. B1 Mon/Wed"></div></div><div class="ifp-row" style="margin-top:10px"><button class="ifp-btn" id="p-save" type="button">'+(P.name?'Update':'Register')+'</button><span class="ifp-muted" id="p-st">'+(R.online?'✔ Signed in. Your progress is saved online and you can see it on any device.':(R.db?'Saving…':'Not signed in: progress is saved on this device only.'))+'</span></div></div>';
  var days='';for(var i=27;i>=0;i--){var dk=dayAgo(i);days+='<span class="ifp-day'+(P.days[dk]?' on':'')+(i===0?' today':'')+'" title="'+dk+'"></span>'}
  h+='<div class="ifp-card"><h3 class="ifp-h">🔥 '+(P.last===today()||P.last===dayAgo(1)?P.streak:0)+' day streak <span class="ifp-muted">· best '+(P.best||0)+'</span></h3><p class="ifp-muted" style="margin:4px 0 8px">Play any game each day. Longer streaks pay a bigger daily bonus (up to 20 coins).</p><div class="ifp-days">'+days+'</div></div>';
  h+='<div><h3 class="ifp-h">Badges ('+P.badges.length+'/'+BADGES.length+')</h3><div class="ifp-badges" style="margin-top:8px">'+BADGES.map(function(b){var on=P.badges.indexOf(b[0])>=0;return'<div class="ifp-badge'+(on?'':' off')+'"><span class="e">'+b[1]+'</span><b>'+esc(b[2])+'</b><div class="ifp-muted">'+esc(b[3])+'</div></div>'}).join('')+'</div></div>';
  var gs=Object.keys(P.games||{}).map(function(k){return[k,P.games[k]]}).sort(function(a,b){return b[1].coins-a[1].coins});
  h+='<div><h3 class="ifp-h">My games</h3>'+(gs.length?'<div class="ifp-tbl" style="margin-top:8px"><table><thead><tr><th>Game</th><th>Plays</th><th>Best</th><th>Coins</th></tr></thead><tbody>'+gs.map(function(x){return'<tr><td>'+esc(x[1].name||x[0])+'</td><td class="n">'+x[1].plays+'</td><td class="n">'+x[1].best+'</td><td class="n">'+x[1].coins+'</td></tr>'}).join('')+'</tbody></table></div>':'<p class="ifp-muted">No games yet. Play one from the Arcade.</p>')+'</div>';
  h+='<div><h3 class="ifp-h">Recent activity</h3>'+(P.log.length?'<div class="ifp-tbl" style="margin-top:8px"><table><thead><tr><th>When</th><th>Game</th><th>Lesson</th><th>Points</th><th>Coins</th></tr></thead><tbody>'+P.log.slice(0,40).map(function(l){return'<tr><td>'+esc(fmt(l.at))+'</td><td>'+esc(l.label)+'</td><td>'+esc(l.unit||'')+'</td><td class="n">'+l.pts+'</td><td class="n">+'+l.coins+'</td></tr>'}).join('')+'</tbody></table></div>':'<p class="ifp-muted">Your history will appear here.</p>')+'</div>';
  body.innerHTML=h;
  $('#p-save').onclick=function(){var n=$('#p-n').value.trim(),g=$('#p-g').value.trim();if(!n||!g){$('#p-st').textContent='Add your name and group.';return}P.name=n;P.group=g;lsSet('ifr_name',n);lsSet('ifr_group',g);persist();paintPill();$('#p-st').textContent=R.db?'✔ Saved.':'Saved on this device.';render()};
}
function fmt(iso){try{var d=new Date(iso);return d.toLocaleDateString(undefined,{day:'2-digit',month:'short'})+' '+d.toLocaleTimeString(undefined,{hour:'2-digit',minute:'2-digit'})}catch(e){return iso}}

/* ---------- Leaderboard + class ---------- */
function subscribe(){
  if(R.subs||!R.db)return;R.subs=true;
  try{R.db.collection('board').onSnapshot(function(s){R.board=s.docs.map(function(d){var x=d.data();x._id=d.id;return x});if(open&&view==='board')viewBoard()},function(){})}catch(e){}
  if(R.owner){try{R.db.collection('plog').onSnapshot(function(s){R.students=s.docs.map(function(d){return d.data()});if(open&&view==='class')viewClass()},function(){})}catch(e){}}
}
function viewBoard(){
  body.className='ifp-body';
  var rows=R.board.slice();
  if(!rows.length&&P.name)rows=[{name:P.name,group:P.group,coins:P.coins,total:P.total,streak:P.streak,rank:rankOf(P.total).name,_id:R.uid||'me'}];
  rows.sort(function(a,b){return(b.total||0)-(a.total||0)});
  var groups={};rows.forEach(function(r){if(r.group)groups[r.group]=1});
  var f=window.__ifpGroup||'';if(f&&!groups[f])f='';
  var shown=rows.filter(function(r){return!f||r.group===f}).slice(0,50);
  var h='<div class="ifp-row"><div class="ifp-f"><label for="b-g">Group</label><select class="ifp-in" id="b-g"><option value="">All groups</option>'+Object.keys(groups).sort().map(function(g){return'<option'+(g===f?' selected':'')+'>'+esc(g)+'</option>'}).join('')+'</select></div></div>';
  h+=R.db?'':'<p class="ifp-muted">Sign in to see your classmates here. This list shows only you on this device.</p>';
  h+='<div class="ifp-tbl"><table><thead><tr><th>#</th><th>Student</th><th>Group</th><th>Rank</th><th>🔥</th><th>Coins earned</th></tr></thead><tbody>'+(shown.length?shown.map(function(r,i){var me=r._id&&r._id===R.uid;return'<tr class="'+(me?'me':'')+'"><td class="n">'+(i+1)+'</td><td>'+esc(r.name||'Student')+(me?' (you)':'')+'</td><td>'+esc(r.group||'')+'</td><td>'+esc(r.rank||'')+'</td><td class="n">'+(r.streak||0)+'</td><td class="n">'+(r.total||0)+'</td></tr>'}).join(''):'<tr><td colspan="6" class="ifp-muted">No players yet. Register in My dashboard and play a game.</td></tr>')+'</tbody></table></div>';
  body.innerHTML=h;var s=$('#b-g');if(s)s.onchange=function(){window.__ifpGroup=s.value;viewBoard()};
}
function viewClass(){
  body.className='ifp-body';
  var rows=R.students.slice().sort(function(a,b){return(b.total||0)-(a.total||0)});
  var groups={};rows.forEach(function(r){if(r.group)groups[r.group]=1});
  var f=window.__ifpCG||'';if(f&&!groups[f])f='';
  var shown=rows.filter(function(r){return!f||r.group===f});
  var h='<div class="ifp-row"><div class="ifp-f"><label for="k-g">Group</label><select class="ifp-in" id="k-g"><option value="">All groups</option>'+Object.keys(groups).sort().map(function(g){return'<option'+(g===f?' selected':'')+'>'+esc(g)+'</option>'}).join('')+'</select></div><button class="ifp-btn ghost" id="k-csv" type="button">Download CSV</button></div>';
  h+='<div class="ifp-tbl"><table><thead><tr><th>Student</th><th>Group</th><th>Coins</th><th>Streak</th><th>Best streak</th><th>Plays</th><th>Vocab ✓</th><th>Grammar ✓</th><th>Last played</th></tr></thead><tbody>'+(shown.length?shown.map(function(r){return'<tr><td>'+esc(r.name||'Student')+'</td><td>'+esc(r.group||'')+'</td><td class="n">'+(r.total||0)+'</td><td class="n">'+((r.last===today()||r.last===dayAgo(1))?r.streak||0:0)+'</td><td class="n">'+(r.best||0)+'</td><td class="n">'+(r.plays||0)+'</td><td class="n">'+(r.vok||0)+'</td><td class="n">'+(r.gok||0)+'</td><td>'+esc(r.last||'')+'</td></tr>'}).join(''):'<tr><td colspan="9" class="ifp-muted">No registered students yet. Students appear here after they register in My dashboard and play.</td></tr>')+'</tbody></table></div><p class="ifp-muted">Open a student’s full history by downloading the CSV. Coins and streaks are classroom rewards: they are not real money.</p>';
  body.innerHTML=h;
  var s=$('#k-g');if(s)s.onchange=function(){window.__ifpCG=s.value;viewClass()};
  $('#k-csv').onclick=async function(){
    var q=function(v){v=v==null?'':String(v);return/[",\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v};
    var lines=['Student,Group,Coins earned,Coins balance,Streak,Best streak,Plays,Vocab correct,Grammar correct,Last played'].concat(shown.map(function(r){return[r.name,r.group,r.total,r.coins,r.streak,r.best,r.plays,r.vok,r.gok,r.last].map(q).join(',')}));
    try{var dl=await claude.use('downloads');if(!dl)throw 0;await dl.save({filename:(ARENA.replace(/[^\w\- ]+/g,'').trim().slice(0,40)||'arena')+' progress.csv',data:lines.join('\n')})}catch(e){if(!e||e.code!=='declined')toast('Download is not available here.')}
  };
}

/* ---------- built-in solo modes: award coins when an end screen appears ---------- */
(function watch(){
  var st=document.getElementById('stage');if(!st||!window.MutationObserver)return;
  var armed=true,t=null,lastSig='';
  function modeName(){try{if(typeof mode==='undefined')return['solo','Solo game'];var m=mode;var l=(typeof MODES!=='undefined'?MODES:[]).filter(function(x){return x[0]===m})[0];return[m,l?l[1]:m]}catch(e){return['solo','Solo game']}}
  function check(){
    var mn=modeName();var sig=mn[0]+'|'+curLesson();if(sig!==lastSig){lastSig=sig;armed=true}if(mn[0]==='alias'||mn[0]==='charades'||mn[0]==='taboo'){armed=true;return}
    var tag=((st.querySelector('.mode-tag')||{}).textContent||'').trim(),big=((st.querySelector('.word')||{}).textContent||'').trim(),btns=Array.prototype.map.call(st.querySelectorAll('button'),function(b){return b.textContent}).join('|');
    var again=/again|new game|restart/i.test(btns);
    var isEnd=/GAME OVER|DECK COMPLETE|ALL MATCHED|NEW RECORD|COMPLETE|FINISHED|TIME/i.test(tag)||(/^\d+\s*points?$/i.test(big)&&again)||(/^\d+(\.\d+)?\s*s$/.test(big)&&again);
    if(!isEnd){armed=true;return}
    if(!armed)return;armed=false;
    var pts=0,m;
    if((m=big.match(/^(\d+)\s*\/\s*(\d+)/)))pts=(+m[1])*10;
    else if((m=big.match(/^(\d+(?:\.\d+)?)\s*s$/)))pts=Math.max(0,Math.round((120-parseFloat(m[1]))*5));
    else if((m=big.match(/-?\d+/)))pts=Math.max(0,parseInt(m[0],10));
    else{var any=(st.innerText||'').match(/(\d+)\s*(?:points?|pts)/i);if(any)pts=+any[1]}
    if(!pts)return;
    var r=award({game:'b-'+mn[0],label:mn[1],points:pts,cap:50});
    if(r.total){var b=document.createElement('div');b.className='ifp-toast';b.style.position='fixed';b.innerHTML='+'+r.total+' 🪙 earned'+(r.streakBonus?' · streak bonus '+r.streakBonus:'')+(r.newBadges.length?' · '+r.newBadges[0][1]+' '+esc(r.newBadges[0][2]):'');root.appendChild(b);setTimeout(function(){b.remove()},3800)}
  }
  new MutationObserver(function(){clearTimeout(t);t=setTimeout(check,350)}).observe(st,{childList:true,subtree:true,characterData:true});
})();

/* ---------- identity ---------- */
window.IFPlus={pool:pool,award:award,level:level,state:function(){return P},debug:function(){return{R:R,P:P}}};
paintPill();
if(window.claude&&claude.use){
  claude.use('user').then(async function(u){if(!u)return;try{R.owner=await u.isOwner()}catch(e){}try{R.uid=await u.id()}catch(e){}if(R.owner)paintPill();if(R.db)pullRemote()}).catch(function(){});
  claude.use('db').then(function(d){R.db=d;if(R.uid)pullRemote()}).catch(function(){});
}
setInterval(function(){if(R.db&&R.uid&&!R.online)pullRemote()},30000);
})();
