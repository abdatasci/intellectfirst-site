
// === IF mobile layer ===
(function(){
  var center=function(){ ['#lessons','#glessons','#modes'].forEach(function(sel){ var box=document.querySelector(sel); if(!box||box.scrollWidth<=box.clientWidth)return; var on=box.querySelector('button.on'); if(!on)return; box.scrollLeft=Math.max(0,on.offsetLeft-box.offsetLeft-(box.clientWidth-on.offsetWidth)/2); }); };
  if (typeof window.chips==='function'){ var oc=window.chips; window.chips=function(){ var r=oc.apply(this,arguments); try{center();}catch(e){} return r; }; }
  try{center();}catch(e){}
  // keep typed-answer boxes above the on-screen keyboard and the floating score pills
  document.addEventListener('focusin',function(e){ var t=e.target; if(!t||!t.matches||!t.matches('#stage input,#stage textarea'))return; if(!matchMedia('(pointer:coarse)').matches)return; setTimeout(function(){ try{t.scrollIntoView({block:'center',behavior:'smooth'});}catch(x){} },300); });
  window.addEventListener('resize',function(){ try{center();}catch(e){} });
})();
