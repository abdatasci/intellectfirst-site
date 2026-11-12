/* IF Academy · Russian flashcards add-on. Loads flashcards.json next to the page and adds a "Flashcards · RU" button. */
(function(){
"use strict";
if(document.getElementById("ifc-root"))return;
var CSS=".ifc-fab{all:unset;position:fixed;left:12px;bottom:calc(12px + env(safe-area-inset-bottom,0px));z-index:2147482990;cursor:pointer;background:#C9A227;color:#14213D;border:2px solid #14213D;border-radius:999px;padding:8px 14px;font:700 13px/1 Calibri,Carlito,'Segoe UI',system-ui,Arial,sans-serif;letter-spacing:.04em;box-shadow:0 4px 14px rgba(0,0,0,.25)}"+
".ifc-fab:focus-visible,.ifc-b:focus-visible,.ifc-chip:focus-visible,.ifc-card:focus-visible,.ifc-x:focus-visible{outline:3px solid #C9A227;outline-offset:2px}"+
".ifc-scrim{position:fixed;inset:0;z-index:2147482995;background:rgba(10,16,29,.6);display:flex;align-items:center;justify-content:center;padding:12px;padding-top:calc(12px + env(safe-area-inset-top,0px));padding-bottom:calc(12px + env(safe-area-inset-bottom,0px))}"+
".ifc-scrim[hidden]{display:none!important}"+
".ifc-sheet{box-sizing:border-box;width:100%;max-width:640px;max-height:100%;overflow:auto;background:#14213D;color:#FFFFFF;border-radius:18px;border:3px solid #C9A227;box-shadow:0 14px 44px rgba(0,0,0,.45);font-family:Calibri,Carlito,'Segoe UI',system-ui,Arial,sans-serif;padding:14px 16px 16px;display:flex;flex-direction:column;gap:10px}"+
".ifc-sheet *{box-sizing:border-box}"+
".ifc-head{display:flex;align-items:center;gap:10px}"+
".ifc-logo{width:36px;height:36px;border-radius:9px;background:#C9A227;color:#14213D;display:grid;place-items:center;font:700 17px Cambria,Georgia,serif;flex:none}"+
".ifc-head h2{margin:0;font:700 19px/1.15 Cambria,Georgia,serif;flex:1;min-width:0}"+
".ifc-head small{display:block;font:700 11px Calibri,Carlito,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:#C9A227}"+
".ifc-x{all:unset;cursor:pointer;font-size:26px;line-height:1;padding:2px 8px;border-radius:8px;color:#AFC2DD}"+
".ifc-chips{display:flex;gap:6px;overflow-x:auto;padding-bottom:4px;scrollbar-width:thin}"+
".ifc-chip{all:unset;cursor:pointer;flex:none;border:1.5px solid #AFC2DD;color:#FFFFFF;border-radius:999px;padding:5px 11px;font-weight:700;font-size:13px;white-space:nowrap}"+
".ifc-chip[aria-pressed=true]{background:#C9A227;border-color:#C9A227;color:#14213D}"+
".ifc-bar{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;font-size:14px;color:#AFC2DD}"+
".ifc-prog{height:8px;background:#2A3D6B;border-radius:6px;overflow:hidden}.ifc-prog i{display:block;height:100%;background:#1B8A5A}"+
".ifc-card{all:unset;box-sizing:border-box;cursor:pointer;display:grid;place-items:center;text-align:center;min-height:230px;border-radius:16px;padding:18px;background:#FFFFFF;color:#14213D;border:4px solid #C9A227;width:100%}"+
".ifc-card.ifc-back{background:#FFF7DB}"+
".ifc-w{font:700 clamp(30px,7vw,48px)/1.1 Cambria,Georgia,serif;overflow-wrap:anywhere}"+
".ifc-r{font:700 clamp(24px,5.5vw,36px)/1.15 Calibri,Carlito,'Segoe UI',sans-serif;color:#8A6A00;overflow-wrap:anywhere}"+
".ifc-h{margin-top:10px;font-size:15px;color:#5B6B82}"+
".ifc-row{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}"+
".ifc-b{all:unset;cursor:pointer;border-radius:12px;padding:10px 14px;font-weight:700;font-size:15px;background:#1E2F55;color:#FFFFFF;border:1.5px solid #3A507F;text-align:center}"+
".ifc-b.ifc-gold{background:#C9A227;color:#14213D;border-color:#C9A227}.ifc-b.ifc-green{background:#1B8A5A;border-color:#1B8A5A}.ifc-b.ifc-red{background:#B8433A;border-color:#B8433A}"+
".ifc-list{list-style:none;margin:0;padding:0;display:grid;gap:6px}.ifc-list li{background:#1E2F55;border-radius:10px;padding:8px 10px;font-size:15px}.ifc-list b{color:#FFFFFF}.ifc-list span{color:#F3D77A}"+
".ifc-note{font-size:12px;color:#AFC2DD;text-align:center;margin:0}"+
"@media (max-width:420px){.ifc-card{min-height:190px}.ifc-b{padding:9px 10px;font-size:14px}}";
var st=document.createElement("style");st.id="ifc-style";st.textContent=CSS;document.head.appendChild(st);

var root=document.createElement("div");root.id="ifc-root";
root.innerHTML='<button class="ifc-fab" id="ifc-fab" type="button" aria-haspopup="dialog">🃏 FLASHCARDS · RU</button>'+
 '<div class="ifc-scrim" id="ifc-scrim" hidden><div class="ifc-sheet" role="dialog" aria-modal="true" aria-labelledby="ifc-title">'+
 '<div class="ifc-head"><div class="ifc-logo">IF</div><h2 id="ifc-title"><small id="ifc-sub">Flashcards · English – Russian</small><span id="ifc-name">Flashcards</span></h2><button class="ifc-x" id="ifc-close" type="button" aria-label="Close">×</button></div>'+
 '<div class="ifc-chips" id="ifc-chips" role="group" aria-label="Choose a unit"></div>'+
 '<div id="ifc-body"></div></div></div>';
document.body.appendChild(root);

var $=function(id){return document.getElementById(id)};
var DATA=null,U=0,deck=[],i=0,flipped=false,ruFirst=false,known=0,miss=[],lastFocus=null;
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function shuffle(a){a=a.slice();for(var k=a.length-1;k>0;k--){var j=Math.floor(Math.random()*(k+1)),t=a[k];a[k]=a[j];a[j]=t}return a}
function sget(k,d){try{var v=localStorage.getItem("ifc_"+k);return v==null?d:JSON.parse(v)}catch(e){return d}}
function sset(k,v){try{localStorage.setItem("ifc_"+k,JSON.stringify(v))}catch(e){}}

function chips(){var c=$("ifc-chips");c.innerHTML="";DATA.units.forEach(function(u,k){var b=document.createElement("button");b.type="button";b.className="ifc-chip";b.textContent=u.label||u.code;b.title=u.name||"";b.setAttribute("aria-pressed",k===U?"true":"false");b.onclick=function(){U=k;sset("unit_"+DATA.key,U);start()};c.appendChild(b)});
  var on=c.children[U];if(on&&on.scrollIntoView)try{on.scrollIntoView({block:"nearest",inline:"center"})}catch(e){}}
function start(){var u=DATA.units[U];deck=shuffle(u.words);i=0;flipped=false;known=0;miss=[];$("ifc-name").textContent=u.name||u.label;chips();draw()}
function draw(){
  var body=$("ifc-body");
  if(i>=deck.length){var pc=Math.round(known/deck.length*100);
    body.innerHTML='<div class="ifc-card ifc-back" style="cursor:default"><div><div class="ifc-w">'+known+' / '+deck.length+'</div><div class="ifc-h">You know '+pc+'% of these words</div></div></div>'+
     (miss.length?'<p class="ifc-note">Study these again:</p><ul class="ifc-list">'+miss.map(function(w){return'<li><b>'+esc(w[0])+'</b> · <span lang="ru">'+esc(w[1])+'</span></li>'}).join("")+'</ul>':'')+
     '<div class="ifc-row">'+(miss.length?'<button class="ifc-b ifc-gold" id="ifc-again" type="button">Study missed words</button>':'')+'<button class="ifc-b" id="ifc-restart" type="button">Start again</button></div>';
    if($("ifc-again"))$("ifc-again").onclick=function(){deck=shuffle(miss);i=0;known=0;miss=[];draw()};
    $("ifc-restart").onclick=start;return}
  var w=deck[i],front=ruFirst?'<div class="ifc-r" lang="ru">'+esc(w[1])+'</div>':'<div class="ifc-w">'+esc(w[0])+'</div>';
  var back='<div class="ifc-w">'+esc(w[0])+'</div><div class="ifc-r" lang="ru" style="margin-top:6px">'+esc(w[1])+'</div>'+(w[2]?'<div class="ifc-h">'+esc(w[2])+'</div>':'');
  body.innerHTML='<div class="ifc-prog"><i style="width:'+(i/deck.length*100)+'%"></i></div>'+
   '<div class="ifc-bar"><span>Card '+(i+1)+' of '+deck.length+' · tap the card to flip</span><button class="ifc-b" id="ifc-dir" type="button" style="padding:6px 10px;font-size:13px">'+(ruFirst?'RU → EN':'EN → RU')+'</button></div>'+
   '<button class="ifc-card'+(flipped?' ifc-back':'')+'" id="ifc-card" type="button" aria-label="Flip the card"><div>'+(flipped?back:front+'<div class="ifc-h">'+(ruFirst?'Say it in English, then flip':'Say it in Russian, then flip')+'</div>')+'</div></button>'+
   '<div class="ifc-row"><button class="ifc-b" id="ifc-prev" type="button">◀ Back</button><button class="ifc-b ifc-red" id="ifc-no" type="button">Still learning</button><button class="ifc-b ifc-green" id="ifc-yes" type="button">I know it ✓</button><button class="ifc-b" id="ifc-shuf" type="button">🔀</button></div>'+
   '<p class="ifc-note">Keys: Space flips · → I know it · ← back</p>';
  $("ifc-card").onclick=function(){flipped=!flipped;draw();var c=$("ifc-card");if(c)c.focus()};
  $("ifc-dir").onclick=function(){ruFirst=!ruFirst;sset("rufirst",ruFirst);flipped=false;draw()};
  $("ifc-prev").onclick=function(){if(i>0){i--;flipped=false;draw()}};
  $("ifc-no").onclick=function(){miss.push(w);i++;flipped=false;draw()};
  $("ifc-yes").onclick=function(){known++;i++;flipped=false;draw()};
  $("ifc-shuf").onclick=function(){deck=shuffle(deck);i=0;known=0;miss=[];flipped=false;draw()};
}
function open(){lastFocus=document.activeElement;$("ifc-scrim").hidden=false;
  if(DATA){start();setTimeout(function(){var c=$("ifc-card");if(c)c.focus()},30);return}
  $("ifc-body").innerHTML='<p class="ifc-note">Loading words…</p>';
  fetch("flashcards.json").then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(d){DATA=d;DATA.key=DATA.key||"x";$("ifc-sub").textContent=(d.title||"Flashcards")+" · English – Russian";ruFirst=sget("rufirst",false);U=Math.min(sget("unit_"+DATA.key,0),d.units.length-1);start()})
  .catch(function(){$("ifc-body").innerHTML='<p class="ifc-note">The flashcards could not load. Close this window and try again.</p>'})}
function close(){$("ifc-scrim").hidden=true;if(lastFocus&&lastFocus.focus)lastFocus.focus()}
$("ifc-fab").onclick=open;$("ifc-close").onclick=close;
$("ifc-scrim").addEventListener("click",function(e){if(e.target===this)close()});
document.addEventListener("keydown",function(e){if($("ifc-scrim").hidden)return;
  if(e.key==="Escape"){close();return}
  var t=e.target&&e.target.tagName;if(t==="INPUT"||t==="TEXTAREA")return;
  if(e.key===" "&&e.target.id!=="ifc-card"&&$("ifc-card")){e.preventDefault();$("ifc-card").click()}
  else if(e.key==="ArrowRight"&&$("ifc-yes")){e.preventDefault();$("ifc-yes").click()}
  else if(e.key==="ArrowLeft"&&$("ifc-prev")){e.preventDefault();$("ifc-prev").click()}
},true);
})();
