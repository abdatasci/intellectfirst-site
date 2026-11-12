/* IF Academy live game: the teacher runs a quiz from the board; students answer on their phones in teams.
   Shared by the IF Vocabulary Arenas. Needs a global DATA = {lessonKey:{title, words:[[word, definition], ...]}}
   and (optionally) a global `lesson`. Capabilities: db (live, liveq, liveans rules), user, room. */
(function(){
/* In-page dialogs: browser alert/confirm boxes are blocked inside claude.ai pages on phones */
function uiAsk(msg,ok,cancel){return new Promise(res=>{
  if(!document.getElementById('ifdlg-css')){const s=document.createElement('style');s.id='ifdlg-css';s.textContent='.ifdlg{position:fixed;inset:0;z-index:2147483000;background:rgba(10,16,32,.55);display:flex;align-items:center;justify-content:center;padding:16px}.ifdlg-box{background:var(--card,var(--paper,#fff));color:var(--fg,var(--ink,#1F2937));border-top:4px solid var(--gold,#C9A227);border-radius:14px;max-width:440px;width:100%;padding:20px 20px 16px;box-shadow:0 18px 50px rgba(0,0,0,.35);font:inherit}.ifdlg-box p{margin:0 0 16px;font-size:17px;line-height:1.45}.ifdlg-row{display:flex;gap:10px;justify-content:flex-end;flex-wrap:wrap}.ifdlg-row button{font:inherit;font-weight:800;font-size:16px;border-radius:999px;padding:11px 20px;border:2px solid var(--line,#D8E1EE);background:transparent;color:inherit;cursor:pointer;min-height:44px}.ifdlg-row .ifdlg-ok{background:var(--navy,#14213D);border-color:var(--navy,#14213D);color:#fff}@media (prefers-color-scheme:dark){.ifdlg-row .ifdlg-ok{background:var(--gold,#C9A227);border-color:var(--gold,#C9A227);color:#14213D}}';document.head.appendChild(s)}
  const d=document.createElement('div');d.className='ifdlg';d.setAttribute('role','dialog');d.setAttribute('aria-modal','true');
  d.innerHTML='<div class="ifdlg-box"><p></p><div class="ifdlg-row">'+(cancel?'<button type="button" class="ifdlg-no"></button>':'')+'<button type="button" class="ifdlg-ok"></button></div></div>';
  d.querySelector('p').textContent=msg;const o=d.querySelector('.ifdlg-ok'),n=d.querySelector('.ifdlg-no');o.textContent=ok||'OK';if(n)n.textContent=cancel;
  const kd=e=>{if(e.key==='Escape')done(false)};const done=v=>{d.remove();document.removeEventListener('keydown',kd);res(v)};
  o.onclick=()=>done(true);if(n)n.onclick=()=>done(false);d.addEventListener('click',e=>{if(e.target===d)done(false)});document.addEventListener('keydown',kd);
  document.body.appendChild(d);o.focus()})}
const uiConfirm=(m,ok)=>uiAsk(m,ok||'Yes','Cancel'),uiAlert=m=>uiAsk(m,'OK',null);
window.IFDialog = window.IFDialog || { confirm: uiConfirm, alert: uiAlert };
/* QR code generator (qrcode-generator 1.4.4, MIT) */
const qrLib = (function(){ var qrcode=function(){var t=function(t,r){var e=t,n=g[r],o=null,i=0,a=null,u=[],f={},c=function(t,r){o=function(t){for(var r=new Array(t),e=0;e<t;e+=1){r[e]=new Array(t);for(var n=0;n<t;n+=1)r[e][n]=null}return r}(i=4*e+17),l(0,0),l(i-7,0),l(0,i-7),s(),h(),d(t,r),e>=7&&v(t),null==a&&(a=p(e,n,u)),w(a,r)},l=function(t,r){for(var e=-1;e<=7;e+=1)if(!(t+e<=-1||i<=t+e))for(var n=-1;n<=7;n+=1)r+n<=-1||i<=r+n||(o[t+e][r+n]=0<=e&&e<=6&&(0==n||6==n)||0<=n&&n<=6&&(0==e||6==e)||2<=e&&e<=4&&2<=n&&n<=4)},h=function(){for(var t=8;t<i-8;t+=1)null==o[t][6]&&(o[t][6]=t%2==0);for(var r=8;r<i-8;r+=1)null==o[6][r]&&(o[6][r]=r%2==0)},s=function(){for(var t=B.getPatternPosition(e),r=0;r<t.length;r+=1)for(var n=0;n<t.length;n+=1){var i=t[r],a=t[n];if(null==o[i][a])for(var u=-2;u<=2;u+=1)for(var f=-2;f<=2;f+=1)o[i+u][a+f]=-2==u||2==u||-2==f||2==f||0==u&&0==f}},v=function(t){for(var r=B.getBCHTypeNumber(e),n=0;n<18;n+=1){var a=!t&&1==(r>>n&1);o[Math.floor(n/3)][n%3+i-8-3]=a}for(n=0;n<18;n+=1){a=!t&&1==(r>>n&1);o[n%3+i-8-3][Math.floor(n/3)]=a}},d=function(t,r){for(var e=n<<3|r,a=B.getBCHTypeInfo(e),u=0;u<15;u+=1){var f=!t&&1==(a>>u&1);u<6?o[u][8]=f:u<8?o[u+1][8]=f:o[i-15+u][8]=f}for(u=0;u<15;u+=1){f=!t&&1==(a>>u&1);u<8?o[8][i-u-1]=f:u<9?o[8][15-u-1+1]=f:o[8][15-u-1]=f}o[i-8][8]=!t},w=function(t,r){for(var e=-1,n=i-1,a=7,u=0,f=B.getMaskFunction(r),c=i-1;c>0;c-=2)for(6==c&&(c-=1);;){for(var g=0;g<2;g+=1)if(null==o[n][c-g]){var l=!1;u<t.length&&(l=1==(t[u]>>>a&1)),f(n,c-g)&&(l=!l),o[n][c-g]=l,-1==(a-=1)&&(u+=1,a=7)}if((n+=e)<0||i<=n){n-=e,e=-e;break}}},p=function(t,r,e){for(var n=A.getRSBlocks(t,r),o=b(),i=0;i<e.length;i+=1){var a=e[i];o.put(a.getMode(),4),o.put(a.getLength(),B.getLengthInBits(a.getMode(),t)),a.write(o)}var u=0;for(i=0;i<n.length;i+=1)u+=n[i].dataCount;if(o.getLengthInBits()>8*u)throw"code length overflow. ("+o.getLengthInBits()+">"+8*u+")";for(o.getLengthInBits()+4<=8*u&&o.put(0,4);o.getLengthInBits()%8!=0;)o.putBit(!1);for(;!(o.getLengthInBits()>=8*u||(o.put(236,8),o.getLengthInBits()>=8*u));)o.put(17,8);return function(t,r){for(var e=0,n=0,o=0,i=new Array(r.length),a=new Array(r.length),u=0;u<r.length;u+=1){var f=r[u].dataCount,c=r[u].totalCount-f;n=Math.max(n,f),o=Math.max(o,c),i[u]=new Array(f);for(var g=0;g<i[u].length;g+=1)i[u][g]=255&t.getBuffer()[g+e];e+=f;var l=B.getErrorCorrectPolynomial(c),h=k(i[u],l.getLength()-1).mod(l);for(a[u]=new Array(l.getLength()-1),g=0;g<a[u].length;g+=1){var s=g+h.getLength()-a[u].length;a[u][g]=s>=0?h.getAt(s):0}}var v=0;for(g=0;g<r.length;g+=1)v+=r[g].totalCount;var d=new Array(v),w=0;for(g=0;g<n;g+=1)for(u=0;u<r.length;u+=1)g<i[u].length&&(d[w]=i[u][g],w+=1);for(g=0;g<o;g+=1)for(u=0;u<r.length;u+=1)g<a[u].length&&(d[w]=a[u][g],w+=1);return d}(o,n)};f.addData=function(t,r){var e=null;switch(r=r||"Byte"){case"Numeric":e=M(t);break;case"Alphanumeric":e=x(t);break;case"Byte":e=m(t);break;case"Kanji":e=L(t);break;default:throw"mode:"+r}u.push(e),a=null},f.isDark=function(t,r){if(t<0||i<=t||r<0||i<=r)throw t+","+r;return o[t][r]},f.getModuleCount=function(){return i},f.make=function(){if(e<1){for(var t=1;t<40;t++){for(var r=A.getRSBlocks(t,n),o=b(),i=0;i<u.length;i++){var a=u[i];o.put(a.getMode(),4),o.put(a.getLength(),B.getLengthInBits(a.getMode(),t)),a.write(o)}var g=0;for(i=0;i<r.length;i++)g+=r[i].dataCount;if(o.getLengthInBits()<=8*g)break}e=t}c(!1,function(){for(var t=0,r=0,e=0;e<8;e+=1){c(!0,e);var n=B.getLostPoint(f);(0==e||t>n)&&(t=n,r=e)}return r}())},f.createTableTag=function(t,r){t=t||2;var e="";e+='<table style="',e+=" border-width: 0px; border-style: none;",e+=" border-collapse: collapse;",e+=" padding: 0px; margin: "+(r=void 0===r?4*t:r)+"px;",e+='">',e+="<tbody>";for(var n=0;n<f.getModuleCount();n+=1){e+="<tr>";for(var o=0;o<f.getModuleCount();o+=1)e+='<td style="',e+=" border-width: 0px; border-style: none;",e+=" border-collapse: collapse;",e+=" padding: 0px; margin: 0px;",e+=" width: "+t+"px;",e+=" height: "+t+"px;",e+=" background-color: ",e+=f.isDark(n,o)?"#000000":"#ffffff",e+=";",e+='"/>';e+="</tr>"}return e+="</tbody>",e+="</table>"},f.createSvgTag=function(t,r,e,n){var o={};"object"==typeof arguments[0]&&(t=(o=arguments[0]).cellSize,r=o.margin,e=o.alt,n=o.title),t=t||2,r=void 0===r?4*t:r,(e="string"==typeof e?{text:e}:e||{}).text=e.text||null,e.id=e.text?e.id||"qrcode-description":null,(n="string"==typeof n?{text:n}:n||{}).text=n.text||null,n.id=n.text?n.id||"qrcode-title":null;var i,a,u,c,g=f.getModuleCount()*t+2*r,l="";for(c="l"+t+",0 0,"+t+" -"+t+",0 0,-"+t+"z ",l+='<svg version="1.1" xmlns="http://www.w3.org/2000/svg"',l+=o.scalable?"":' width="'+g+'px" height="'+g+'px"',l+=' viewBox="0 0 '+g+" "+g+'" ',l+=' preserveAspectRatio="xMinYMin meet"',l+=n.text||e.text?' role="img" aria-labelledby="'+y([n.id,e.id].join(" ").trim())+'"':"",l+=">",l+=n.text?'<title id="'+y(n.id)+'">'+y(n.text)+"</title>":"",l+=e.text?'<description id="'+y(e.id)+'">'+y(e.text)+"</description>":"",l+='<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>',l+='<path d="',a=0;a<f.getModuleCount();a+=1)for(u=a*t+r,i=0;i<f.getModuleCount();i+=1)f.isDark(a,i)&&(l+="M"+(i*t+r)+","+u+c);return l+='" stroke="transparent" fill="black"/>',l+="</svg>"},f.createDataURL=function(t,r){t=t||2,r=void 0===r?4*t:r;var e=f.getModuleCount()*t+2*r,n=r,o=e-r;return I(e,e,function(r,e){if(n<=r&&r<o&&n<=e&&e<o){var i=Math.floor((r-n)/t),a=Math.floor((e-n)/t);return f.isDark(a,i)?0:1}return 1})},f.createImgTag=function(t,r,e){t=t||2,r=void 0===r?4*t:r;var n=f.getModuleCount()*t+2*r,o="";return o+="<img",o+=' src="',o+=f.createDataURL(t,r),o+='"',o+=' width="',o+=n,o+='"',o+=' height="',o+=n,o+='"',e&&(o+=' alt="',o+=y(e),o+='"'),o+="/>"};var y=function(t){for(var r="",e=0;e<t.length;e+=1){var n=t.charAt(e);switch(n){case"<":r+="&lt;";break;case">":r+="&gt;";break;case"&":r+="&amp;";break;case'"':r+="&quot;";break;default:r+=n}}return r};return f.createASCII=function(t,r){if((t=t||1)<2)return function(t){t=void 0===t?2:t;var r,e,n,o,i,a=1*f.getModuleCount()+2*t,u=t,c=a-t,g={"██":"█","█ ":"▀"," █":"▄","  ":" "},l={"██":"▀","█ ":"▀"," █":" ","  ":" "},h="";for(r=0;r<a;r+=2){for(n=Math.floor((r-u)/1),o=Math.floor((r+1-u)/1),e=0;e<a;e+=1)i="█",u<=e&&e<c&&u<=r&&r<c&&f.isDark(n,Math.floor((e-u)/1))&&(i=" "),u<=e&&e<c&&u<=r+1&&r+1<c&&f.isDark(o,Math.floor((e-u)/1))?i+=" ":i+="█",h+=t<1&&r+1>=c?l[i]:g[i];h+="\n"}return a%2&&t>0?h.substring(0,h.length-a-1)+Array(a+1).join("▀"):h.substring(0,h.length-1)}(r);t-=1,r=void 0===r?2*t:r;var e,n,o,i,a=f.getModuleCount()*t+2*r,u=r,c=a-r,g=Array(t+1).join("██"),l=Array(t+1).join("  "),h="",s="";for(e=0;e<a;e+=1){for(o=Math.floor((e-u)/t),s="",n=0;n<a;n+=1)i=1,u<=n&&n<c&&u<=e&&e<c&&f.isDark(o,Math.floor((n-u)/t))&&(i=0),s+=i?g:l;for(o=0;o<t;o+=1)h+=s+"\n"}return h.substring(0,h.length-1)},f.renderTo2dContext=function(t,r){r=r||2;for(var e=f.getModuleCount(),n=0;n<e;n++)for(var o=0;o<e;o++)t.fillStyle=f.isDark(n,o)?"black":"white",t.fillRect(n*r,o*r,r,r)},f};t.stringToBytes=(t.stringToBytesFuncs={default:function(t){for(var r=[],e=0;e<t.length;e+=1){var n=t.charCodeAt(e);r.push(255&n)}return r}}).default,t.createStringToBytes=function(t,r){var e=function(){for(var e=S(t),n=function(){var t=e.read();if(-1==t)throw"eof";return t},o=0,i={};;){var a=e.read();if(-1==a)break;var u=n(),f=n()<<8|n();i[String.fromCharCode(a<<8|u)]=f,o+=1}if(o!=r)throw o+" != "+r;return i}(),n="?".charCodeAt(0);return function(t){for(var r=[],o=0;o<t.length;o+=1){var i=t.charCodeAt(o);if(i<128)r.push(i);else{var a=e[t.charAt(o)];"number"==typeof a?(255&a)==a?r.push(a):(r.push(a>>>8),r.push(255&a)):r.push(n)}}return r}};var r,e,n,o,i,a=1,u=2,f=4,c=8,g={L:1,M:0,Q:3,H:2},l=0,h=1,s=2,v=3,d=4,w=5,p=6,y=7,B=(r=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],e=1335,n=7973,i=function(t){for(var r=0;0!=t;)r+=1,t>>>=1;return r},(o={}).getBCHTypeInfo=function(t){for(var r=t<<10;i(r)-i(e)>=0;)r^=e<<i(r)-i(e);return 21522^(t<<10|r)},o.getBCHTypeNumber=function(t){for(var r=t<<12;i(r)-i(n)>=0;)r^=n<<i(r)-i(n);return t<<12|r},o.getPatternPosition=function(t){return r[t-1]},o.getMaskFunction=function(t){switch(t){case l:return function(t,r){return(t+r)%2==0};case h:return function(t,r){return t%2==0};case s:return function(t,r){return r%3==0};case v:return function(t,r){return(t+r)%3==0};case d:return function(t,r){return(Math.floor(t/2)+Math.floor(r/3))%2==0};case w:return function(t,r){return t*r%2+t*r%3==0};case p:return function(t,r){return(t*r%2+t*r%3)%2==0};case y:return function(t,r){return(t*r%3+(t+r)%2)%2==0};default:throw"bad maskPattern:"+t}},o.getErrorCorrectPolynomial=function(t){for(var r=k([1],0),e=0;e<t;e+=1)r=r.multiply(k([1,C.gexp(e)],0));return r},o.getLengthInBits=function(t,r){if(1<=r&&r<10)switch(t){case a:return 10;case u:return 9;case f:case c:return 8;default:throw"mode:"+t}else if(r<27)switch(t){case a:return 12;case u:return 11;case f:return 16;case c:return 10;default:throw"mode:"+t}else{if(!(r<41))throw"type:"+r;switch(t){case a:return 14;case u:return 13;case f:return 16;case c:return 12;default:throw"mode:"+t}}},o.getLostPoint=function(t){for(var r=t.getModuleCount(),e=0,n=0;n<r;n+=1)for(var o=0;o<r;o+=1){for(var i=0,a=t.isDark(n,o),u=-1;u<=1;u+=1)if(!(n+u<0||r<=n+u))for(var f=-1;f<=1;f+=1)o+f<0||r<=o+f||0==u&&0==f||a==t.isDark(n+u,o+f)&&(i+=1);i>5&&(e+=3+i-5)}for(n=0;n<r-1;n+=1)for(o=0;o<r-1;o+=1){var c=0;t.isDark(n,o)&&(c+=1),t.isDark(n+1,o)&&(c+=1),t.isDark(n,o+1)&&(c+=1),t.isDark(n+1,o+1)&&(c+=1),0!=c&&4!=c||(e+=3)}for(n=0;n<r;n+=1)for(o=0;o<r-6;o+=1)t.isDark(n,o)&&!t.isDark(n,o+1)&&t.isDark(n,o+2)&&t.isDark(n,o+3)&&t.isDark(n,o+4)&&!t.isDark(n,o+5)&&t.isDark(n,o+6)&&(e+=40);for(o=0;o<r;o+=1)for(n=0;n<r-6;n+=1)t.isDark(n,o)&&!t.isDark(n+1,o)&&t.isDark(n+2,o)&&t.isDark(n+3,o)&&t.isDark(n+4,o)&&!t.isDark(n+5,o)&&t.isDark(n+6,o)&&(e+=40);var g=0;for(o=0;o<r;o+=1)for(n=0;n<r;n+=1)t.isDark(n,o)&&(g+=1);return e+=Math.abs(100*g/r/r-50)/5*10},o),C=function(){for(var t=new Array(256),r=new Array(256),e=0;e<8;e+=1)t[e]=1<<e;for(e=8;e<256;e+=1)t[e]=t[e-4]^t[e-5]^t[e-6]^t[e-8];for(e=0;e<255;e+=1)r[t[e]]=e;var n={glog:function(t){if(t<1)throw"glog("+t+")";return r[t]},gexp:function(r){for(;r<0;)r+=255;for(;r>=256;)r-=255;return t[r]}};return n}();function k(t,r){if(void 0===t.length)throw t.length+"/"+r;var e=function(){for(var e=0;e<t.length&&0==t[e];)e+=1;for(var n=new Array(t.length-e+r),o=0;o<t.length-e;o+=1)n[o]=t[o+e];return n}(),n={getAt:function(t){return e[t]},getLength:function(){return e.length},multiply:function(t){for(var r=new Array(n.getLength()+t.getLength()-1),e=0;e<n.getLength();e+=1)for(var o=0;o<t.getLength();o+=1)r[e+o]^=C.gexp(C.glog(n.getAt(e))+C.glog(t.getAt(o)));return k(r,0)},mod:function(t){if(n.getLength()-t.getLength()<0)return n;for(var r=C.glog(n.getAt(0))-C.glog(t.getAt(0)),e=new Array(n.getLength()),o=0;o<n.getLength();o+=1)e[o]=n.getAt(o);for(o=0;o<t.getLength();o+=1)e[o]^=C.gexp(C.glog(t.getAt(o))+r);return k(e,0).mod(t)}};return n}var A=function(){var t=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],r=function(t,r){var e={};return e.totalCount=t,e.dataCount=r,e},e={};return e.getRSBlocks=function(e,n){var o=function(r,e){switch(e){case g.L:return t[4*(r-1)+0];case g.M:return t[4*(r-1)+1];case g.Q:return t[4*(r-1)+2];case g.H:return t[4*(r-1)+3];default:return}}(e,n);if(void 0===o)throw"bad rs block @ typeNumber:"+e+"/errorCorrectionLevel:"+n;for(var i=o.length/3,a=[],u=0;u<i;u+=1)for(var f=o[3*u+0],c=o[3*u+1],l=o[3*u+2],h=0;h<f;h+=1)a.push(r(c,l));return a},e}(),b=function(){var t=[],r=0,e={getBuffer:function(){return t},getAt:function(r){var e=Math.floor(r/8);return 1==(t[e]>>>7-r%8&1)},put:function(t,r){for(var n=0;n<r;n+=1)e.putBit(1==(t>>>r-n-1&1))},getLengthInBits:function(){return r},putBit:function(e){var n=Math.floor(r/8);t.length<=n&&t.push(0),e&&(t[n]|=128>>>r%8),r+=1}};return e},M=function(t){var r=a,e=t,n={getMode:function(){return r},getLength:function(t){return e.length},write:function(t){for(var r=e,n=0;n+2<r.length;)t.put(o(r.substring(n,n+3)),10),n+=3;n<r.length&&(r.length-n==1?t.put(o(r.substring(n,n+1)),4):r.length-n==2&&t.put(o(r.substring(n,n+2)),7))}},o=function(t){for(var r=0,e=0;e<t.length;e+=1)r=10*r+i(t.charAt(e));return r},i=function(t){if("0"<=t&&t<="9")return t.charCodeAt(0)-"0".charCodeAt(0);throw"illegal char :"+t};return n},x=function(t){var r=u,e=t,n={getMode:function(){return r},getLength:function(t){return e.length},write:function(t){for(var r=e,n=0;n+1<r.length;)t.put(45*o(r.charAt(n))+o(r.charAt(n+1)),11),n+=2;n<r.length&&t.put(o(r.charAt(n)),6)}},o=function(t){if("0"<=t&&t<="9")return t.charCodeAt(0)-"0".charCodeAt(0);if("A"<=t&&t<="Z")return t.charCodeAt(0)-"A".charCodeAt(0)+10;switch(t){case" ":return 36;case"$":return 37;case"%":return 38;case"*":return 39;case"+":return 40;case"-":return 41;case".":return 42;case"/":return 43;case":":return 44;default:throw"illegal char :"+t}};return n},m=function(r){var e=f,n=t.stringToBytes(r),o={getMode:function(){return e},getLength:function(t){return n.length},write:function(t){for(var r=0;r<n.length;r+=1)t.put(n[r],8)}};return o},L=function(r){var e=c,n=t.stringToBytesFuncs.SJIS;if(!n)throw"sjis not supported.";!function(){var t=n("友");if(2!=t.length||38726!=(t[0]<<8|t[1]))throw"sjis not supported."}();var o=n(r),i={getMode:function(){return e},getLength:function(t){return~~(o.length/2)},write:function(t){for(var r=o,e=0;e+1<r.length;){var n=(255&r[e])<<8|255&r[e+1];if(33088<=n&&n<=40956)n-=33088;else{if(!(57408<=n&&n<=60351))throw"illegal char at "+(e+1)+"/"+n;n-=49472}n=192*(n>>>8&255)+(255&n),t.put(n,13),e+=2}if(e<r.length)throw"illegal char at "+(e+1)}};return i},D=function(){var t=[],r={writeByte:function(r){t.push(255&r)},writeShort:function(t){r.writeByte(t),r.writeByte(t>>>8)},writeBytes:function(t,e,n){e=e||0,n=n||t.length;for(var o=0;o<n;o+=1)r.writeByte(t[o+e])},writeString:function(t){for(var e=0;e<t.length;e+=1)r.writeByte(t.charCodeAt(e))},toByteArray:function(){return t},toString:function(){var r="";r+="[";for(var e=0;e<t.length;e+=1)e>0&&(r+=","),r+=t[e];return r+="]"}};return r},S=function(t){var r=t,e=0,n=0,o=0,i={read:function(){for(;o<8;){if(e>=r.length){if(0==o)return-1;throw"unexpected end of file./"+o}var t=r.charAt(e);if(e+=1,"="==t)return o=0,-1;t.match(/^\s$/)||(n=n<<6|a(t.charCodeAt(0)),o+=6)}var i=n>>>o-8&255;return o-=8,i}},a=function(t){if(65<=t&&t<=90)return t-65;if(97<=t&&t<=122)return t-97+26;if(48<=t&&t<=57)return t-48+52;if(43==t)return 62;if(47==t)return 63;throw"c:"+t};return i},I=function(t,r,e){for(var n=function(t,r){var e=t,n=r,o=new Array(t*r),i={setPixel:function(t,r,n){o[r*e+t]=n},write:function(t){t.writeString("GIF87a"),t.writeShort(e),t.writeShort(n),t.writeByte(128),t.writeByte(0),t.writeByte(0),t.writeByte(0),t.writeByte(0),t.writeByte(0),t.writeByte(255),t.writeByte(255),t.writeByte(255),t.writeString(","),t.writeShort(0),t.writeShort(0),t.writeShort(e),t.writeShort(n),t.writeByte(0);var r=a(2);t.writeByte(2);for(var o=0;r.length-o>255;)t.writeByte(255),t.writeBytes(r,o,255),o+=255;t.writeByte(r.length-o),t.writeBytes(r,o,r.length-o),t.writeByte(0),t.writeString(";")}},a=function(t){for(var r=1<<t,e=1+(1<<t),n=t+1,i=u(),a=0;a<r;a+=1)i.add(String.fromCharCode(a));i.add(String.fromCharCode(r)),i.add(String.fromCharCode(e));var f,c,g,l=D(),h=(f=l,c=0,g=0,{write:function(t,r){if(t>>>r!=0)throw"length over";for(;c+r>=8;)f.writeByte(255&(t<<c|g)),r-=8-c,t>>>=8-c,g=0,c=0;g|=t<<c,c+=r},flush:function(){c>0&&f.writeByte(g)}});h.write(r,n);var s=0,v=String.fromCharCode(o[s]);for(s+=1;s<o.length;){var d=String.fromCharCode(o[s]);s+=1,i.contains(v+d)?v+=d:(h.write(i.indexOf(v),n),i.size()<4095&&(i.size()==1<<n&&(n+=1),i.add(v+d)),v=d)}return h.write(i.indexOf(v),n),h.write(e,n),h.flush(),l.toByteArray()},u=function(){var t={},r=0,e={add:function(n){if(e.contains(n))throw"dup key:"+n;t[n]=r,r+=1},size:function(){return r},indexOf:function(r){return t[r]},contains:function(r){return void 0!==t[r]}};return e};return i}(t,r),o=0;o<r;o+=1)for(var i=0;i<t;i+=1)n.setPixel(i,o,e(i,o));var a=D();n.write(a);for(var u=function(){var t=0,r=0,e=0,n="",o={},i=function(t){n+=String.fromCharCode(a(63&t))},a=function(t){if(t<0);else{if(t<26)return 65+t;if(t<52)return t-26+97;if(t<62)return t-52+48;if(62==t)return 43;if(63==t)return 47}throw"n:"+t};return o.writeByte=function(n){for(t=t<<8|255&n,r+=8,e+=1;r>=6;)i(t>>>r-6),r-=6},o.flush=function(){if(r>0&&(i(t<<6-r),t=0,r=0),e%3!=0)for(var o=3-e%3,a=0;a<o;a+=1)n+="="},o.toString=function(){return n},o}(),f=a.toByteArray(),c=0;c<f.length;c+=1)u.writeByte(f[c]);return u.flush(),"data:image/gif;base64,"+u};return t}();qrcode.stringToBytesFuncs["UTF-8"]=function(t){return function(t){for(var r=[],e=0;e<t.length;e++){var n=t.charCodeAt(e);n<128?r.push(n):n<2048?r.push(192|n>>6,128|63&n):n<55296||n>=57344?r.push(224|n>>12,128|n>>6&63,128|63&n):(e++,n=65536+((1023&n)<<10|1023&t.charCodeAt(e)),r.push(240|n>>18,128|n>>12&63,128|n>>6&63,128|63&n))}return r}(t)},function(t){"function"==typeof define&&define.amd?define([],t):"object"==typeof exports&&(module.exports=t())}(function(){return qrcode});
 return qrcode; })();
if (window.IFLive || typeof DATA === 'undefined') return;
window.IFLive = { debug: () => ({ S, T, me }) };
const GAME = (document.title || 'Arena').trim();
const $ = s => document.querySelector(s);
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const shuf = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const curLesson = () => { try { if (typeof lesson !== 'undefined' && DATA[lesson]) return lesson; } catch(e){} return Object.keys(DATA)[0]; };
const wordsOf = k => ((DATA[k] && DATA[k].words) || []).filter(w => w && w[0] && w[1]);
const titleOf = k => (DATA[k] && DATA[k].title) || '';
const ls = (k, v) => { try { if (v === undefined) return localStorage.getItem('ifl:' + k); localStorage.setItem('ifl:' + k, v); } catch(e){ return null; } };
const norm = s => String(s || '').toLowerCase().replace(/[’‘`´]/g, "'").replace(/[^a-z0-9' -]/g, '').replace(/[-\s]+/g, ' ').trim();
const COLORS = ['#2F6FDB', '#D9822B', '#2F8F6B', '#B4447C'];

/* ---------- styles ---------- */
const css = document.createElement('style');
css.textContent = `
.ifl-bar{display:flex;gap:0;margin:0 0 12px;border:2px solid var(--line,#D8E1EE);border-radius:14px;overflow:hidden;background:var(--card,#fff)}
.ifl-bar button{flex:1;border:0;border-radius:0;background:transparent;color:var(--fg,#1F2937);padding:12px 10px;font:inherit;font-weight:800;display:flex;flex-direction:column;align-items:center;gap:2px;line-height:1.15;cursor:pointer}
.ifl-bar button+button{border-left:2px solid var(--line,#D8E1EE)}
.ifl-bar button[aria-pressed="true"]{background:var(--navy,#14213D);color:#fff}
.ifl-bar small{font-weight:600;font-size:12px;opacity:.8}
.ifl-banner{display:flex;gap:12px;align-items:center;justify-content:space-between;flex-wrap:wrap;background:var(--navy,#14213D);color:#fff;border-radius:14px;padding:14px 18px;margin:0 0 12px;border:2px solid var(--gold,#C9A227)}
.ifl-banner b{color:var(--gold2,#E7CF7A)}
.ifl-panel{background:var(--card,#fff);border:1px solid var(--line,#D8E1EE);border-radius:18px;padding:22px;min-height:420px;color:var(--fg,#1F2937)}
.ifl-panel h2{font-family:var(--display,Georgia,serif);margin:0 0 6px;font-size:clamp(24px,3vw,32px)}
.ifl-muted{color:var(--muted,#5B6B82)}
.ifl-row{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin:12px 0}
.ifl-row .lbl{font-weight:800;color:var(--muted,#5B6B82);min-width:150px}
.ifl-chip{border-radius:999px;border:2px solid var(--line,#D8E1EE);background:var(--card,#fff);color:var(--fg,#1F2937);padding:8px 14px;font:inherit;font-weight:700;cursor:pointer}
.ifl-chip[aria-pressed="true"]{background:var(--navy,#14213D);border-color:var(--navy,#14213D);color:#fff}
.ifl-in{font:inherit;font-size:16px;padding:9px 12px;border-radius:10px;border:2px solid var(--line,#D8E1EE);background:var(--bg,#F6F4EE);color:var(--fg,#1F2937);min-width:0}
.ifl-btn{font:inherit;font-weight:800;font-size:18px;border-radius:999px;padding:14px 26px;border:2px solid var(--line,#D8E1EE);background:var(--card,#fff);color:var(--fg,#1F2937);cursor:pointer}
.ifl-btn.go{background:var(--good,#2F8F6B);border-color:var(--good,#2F8F6B);color:#fff}
.ifl-btn.gold{background:var(--gold,#C9A227);border-color:var(--gold,#C9A227);color:var(--navy,#14213D)}
.ifl-btn:disabled{opacity:.5;cursor:default}
.ifl-note{background:var(--bg,#F6F4EE);border-left:4px solid var(--gold,#C9A227);border-radius:0 10px 10px 0;padding:10px 14px;margin:10px 0;font-size:15px}
.ifl-big{font-family:var(--display,Georgia,serif);font-weight:800;font-size:clamp(26px,4.4vw,46px);line-height:1.15;text-align:center;margin:18px 0 10px;text-wrap:balance}
.ifl-word{font-family:var(--display,Georgia,serif);font-weight:800;font-size:clamp(34px,7vw,72px);text-align:center;margin:10px 0;overflow-wrap:anywhere}
.ifl-top{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;font-weight:800;color:var(--muted,#5B6B82)}
.ifl-timer{font-family:var(--display,Georgia,serif);font-size:48px;font-weight:800;color:var(--fg,#1F2937);font-variant-numeric:tabular-nums}
.ifl-timer.low{color:var(--bad,#B4533C)}
.ifl-opts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;max-width:820px;margin:16px auto}
.ifl-opt{display:flex;gap:12px;align-items:center;border-radius:14px;padding:16px 18px;font:inherit;font-size:20px;font-weight:700;color:#fff;border:0;text-align:left;cursor:pointer;min-height:64px}
.ifl-opt b{font-family:var(--display,Georgia,serif);font-size:24px;opacity:.85}
.ifl-opt.dim{opacity:.35}
.ifl-opt.right{outline:4px solid var(--gold,#C9A227);outline-offset:2px}
.ifl-qr{display:flex;gap:18px;align-items:center;justify-content:center;flex-wrap:wrap;margin:14px 0}.ifl-qrimg{width:200px;height:200px;background:#fff;border:3px solid var(--navy,#14213D);border-radius:14px;padding:6px;display:grid;place-items:center;text-align:center}.ifl-qrimg svg{width:100%;height:100%}.ifl-qrtxt{flex:1;min-width:220px;max-width:420px}
.ifl-kick{border:0;background:transparent;color:var(--bad,#B4533C);font-size:16px;font-weight:800;cursor:pointer;padding:0 6px}.ifl-teams{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:12px;margin:14px 0}
.ifl-team{border-radius:14px;padding:12px 14px;border:3px solid;background:var(--bg,#F6F4EE)}
.ifl-team h3{margin:0 0 6px;font-size:18px}
.ifl-team .pts{font-family:var(--display,Georgia,serif);font-size:38px;font-weight:800;line-height:1;font-variant-numeric:tabular-nums}
.ifl-team ul{list-style:none;margin:8px 0 0;padding:0;font-size:15px;max-height:220px;overflow:auto}
.ifl-team li{padding:2px 0;display:flex;justify-content:space-between;gap:8px}
.ifl-team li.ok::after{content:"✓";color:var(--good,#2F8F6B);font-weight:800}
.ifl-bars{display:grid;gap:8px;margin:12px 0}
.ifl-barrow{display:grid;grid-template-columns:minmax(90px,160px) 1fr auto;gap:10px;align-items:center;font-weight:800}
.ifl-barrow .tr{height:22px;border-radius:11px;background:var(--bg,#F6F4EE);overflow:hidden}
.ifl-barrow .tr i{display:block;height:100%;border-radius:11px;transition:width .4s}
.ifl-lb{width:100%;border-collapse:collapse;font-size:16px;margin-top:8px}
.ifl-lb td,.ifl-lb th{padding:7px 8px;border-bottom:1px solid var(--line,#D8E1EE);text-align:left}
.ifl-lb td.n{text-align:right;font-variant-numeric:tabular-nums;font-weight:800}
.ifl-dots{display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:6px;vertical-align:middle}
.ifl-phone{max-width:520px;margin:0 auto}
.ifl-teampick{display:grid;gap:10px;margin:12px 0}
.ifl-teampick button{font:inherit;font-size:20px;font-weight:800;color:#fff;border:0;border-radius:14px;padding:16px;cursor:pointer}
.ifl-teampick button[aria-pressed="true"]{outline:4px solid var(--gold,#C9A227);outline-offset:2px}
.ifl-res{text-align:center;font-family:var(--display,Georgia,serif);font-weight:800;font-size:34px;margin:16px 0 4px}
.ifl-res.ok{color:var(--good,#2F8F6B)}.ifl-res.no{color:var(--bad,#B4533C)}
@media (max-width:640px){.ifl-opts{grid-template-columns:1fr}.ifl-panel{padding:16px}.ifl-row .lbl{min-width:100%}.ifl-btn{width:100%}}
@media (prefers-reduced-motion:reduce){.ifl-barrow .tr i{transition:none}}
`;
document.head.appendChild(css);

/* ---------- layout hooks ---------- */
const wrap = document.querySelector('.wrap') || document.body;
const stage = window.IFLIVE_NOSTAGE ? null : $('#stage');
const bar = document.createElement('div'); bar.id = 'ifl-top';
wrap.insertBefore(bar, wrap.firstChild);
const panel = document.createElement('div'); panel.id = 'ifl-panel'; panel.className = 'ifl-panel'; panel.hidden = true;
if (stage && stage.parentNode) stage.parentNode.insertBefore(panel, stage.nextSibling); else wrap.appendChild(panel);
const hideGame = on => { if (window.IFLIVE_NOSTAGE) return; ['#modes', '#stage'].forEach(s => { const e = $(s); if (e) e.hidden = on; }); };
const hideLessons = on => { const e = $('#lessons'); if (e) e.hidden = on; };

/* ---------- runtime ---------- */
const R = { db:null, room:null, user:null, owner:false, uid:null, canWrite:null, myPeer:null, ready:false };
let S = null;            // the live game state (teacher: authoritative copy; student: latest snapshot)
let teacherView = 'board';
/* join link + QR for the lobby */
let joinMode = /^#join/i.test(location.hash || '');
const withJoin = u => !u ? '' : (u.indexOf('#') >= 0 ? u : u + '#join');
const joinUrl = () => withJoin(ls('url') || window.IFLIVE_URL || '');
function qrSvg(u){ try { const q = qrLib(0, 'M'); q.addData(u); q.make(); return q.createSvgTag({ cellSize:6, margin:2, scalable:true }); } catch(e){ return ''; } }
function qrBox(){
  const u = joinUrl();
  return `<div class="ifl-qr"><div class="ifl-qrimg" id="ifl-qrimg" role="img" aria-label="QR code to join the game">${u ? qrSvg(u) : '<span class="ifl-muted">Paste the arena link below to show a QR code.</span>'}</div>
    <div class="ifl-qrtxt"><b>Scan to join</b><div class="ifl-muted">or open this link on your phone:</div>
    <input class="ifl-in" id="ifl-url" value="${esc(u)}" placeholder="Paste the arena link here" style="width:100%;margin:6px 0" aria-label="Link to share">
    <div class="ifl-row"><button class="ifl-btn" id="ifl-copy" type="button">Copy link</button><button class="ifl-btn" id="ifl-qrbig" type="button">Big QR</button></div></div></div>`;
}
function wireQr(){
  const inp = $('#ifl-url'); if (!inp) return;
  inp.oninput = () => { const v = withJoin(inp.value.trim()); ls('url', v); const el = $('#ifl-qrimg'); if (el) el.innerHTML = v ? qrSvg(v) : ''; };
  const cp = $('#ifl-copy'); if (cp) cp.onclick = async () => { const v = withJoin(inp.value.trim()); try { await navigator.clipboard.writeText(v); cp.textContent = 'Copied ✓'; } catch(e){ inp.select(); cp.textContent = 'Select and copy'; } setTimeout(() => { cp.textContent = 'Copy link'; }, 2000); };
  const bg = $('#ifl-qrbig'); if (bg) bg.onclick = () => { const v = withJoin(inp.value.trim()); if (!v) return; const d = document.createElement('div'); d.className = 'ifdlg'; d.style.cssText = 'position:fixed;inset:0;z-index:2147483000;background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:16px;cursor:pointer;color:#14213D'; d.innerHTML = '<div style="width:min(80vmin,560px)">' + qrSvg(v) + '</div><div style="font:700 20px system-ui;text-align:center;word-break:break-all;max-width:90vw">Scan to join · ' + esc(S && S.cls ? S.cls : GAME) + '</div><div style="font:14px system-ui;opacity:.7">Tap anywhere to close</div>'; d.onclick = () => d.remove(); document.body.appendChild(d); };
}
let T = { qs:null, ans:{}, timer:null, gid:null };   // teacher-only: questions with answers, answers this round
let me = null;           // student: {gid,n,t,qi,a,ms}
let recvAt = 0, lastQKey = '', tick = null, lastPres = '';

const teamScore = i => Object.values((S && S.players) || {}).filter(p => p.t === i).reduce((a, p) => a + (p.s || 0), 0);
const teamCount = i => Object.values((S && S.players) || {}).filter(p => p.t === i).length;
const active = () => S && S.gid && ['lobby','q','reveal','over'].includes(S.status) && !(S.status === 'over' && Date.now() - (S.ts || 0) > 3 * 3600e3);

/* writes: one at a time */
let writing = false, again = false;
async function writeState(){
  if ((!R.db && !R.room) || !R.owner || !S) return;
  if (writing){ again = true; return; }
  writing = true;
  try { S.ts = Date.now(); if (R.db) await R.db.doc('live/state').set(JSON.parse(JSON.stringify(S))); }
  catch(e){ note('Couldn’t update the live game. Check the connection.'); }
  pushPresence();
  writing = false; if (again){ again = false; writeState(); }
}
/* Second channel for students with no account: the teacher's phone/screen shares the game state through room presence (about 4 KB max), which newcomers receive automatically. */
function pushPresence(st){
  if (!R.room || !R.owner) return;
  try {
    let c = st || (S && JSON.parse(JSON.stringify(S)));
    if (!c) return;
    delete c.ts; delete c.saved;
    if (JSON.stringify(c).length > 3600){ delete c.last; const top = Object.entries(c.players || {}).sort((a, b) => (b[1].s || 0) - (a[1].s || 0)).slice(0, 14); c.players = Object.fromEntries(top); }
    if (JSON.stringify(c).length > 3900) return;
    R.room.presence({ ifs: c });
  } catch(e){}
}
setInterval(() => { if (R.owner && S && active() && S.status !== 'closed') pushPresence(); }, 4000);
let regTimer = null; const writeSoon = () => { clearTimeout(regTimer); regTimer = setTimeout(writeState, 1200); };
let noteMsg = ''; const note = m => { noteMsg = m; render(); };

/* ---------- teacher ---------- */
const setup = (() => { let s = {}; try { s = JSON.parse(ls('setup') || '{}') || {}; } catch(e){} return Object.assign({ cls:'', fmt:'team', mode:'choose', n:10, secs:20, nt:2, teams:['Team A','Team B','Team C','Team D'] }, s); })();
const saveSetup = () => ls('setup', JSON.stringify(setup));

async function openLobby(){
  const k = curLesson(), all = wordsOf(k);
  if (all.length < 4){ note('This lesson needs at least four words for a live game.'); return; }
  const pool = shuf(all).slice(0, setup.n === 'all' ? all.length : Math.min(+setup.n, all.length));
  const qs = pool.map(w => ({ w:w[0], d:w[1], o: setup.mode === 'choose' ? shuf([w[0]].concat(shuf(all.filter(x => x[0] !== w[0]).map(x => x[0])).slice(0, 3))) : null }));
  const gid = Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
  T = { qs, ans:{}, timer:null, gid };
  S = { gid, status:'lobby', lesson:k, ltitle:titleOf(k), mode:setup.mode, secs:+setup.secs, n:qs.length, solo:setup.fmt === 'solo', teams:setup.fmt === 'solo' ? ['Players'] : setup.teams.slice(0, setup.nt).map((t, i) => (t || 'Team ' + 'ABCD'[i]).slice(0, 24)), cls:(setup.cls || '').slice(0, 40), qi:-1, q:null, ans:null, players:{}, last:null, saved:false };
  try { await R.db.doc('liveq/' + gid).set({ qs }); } catch(e){}
  ls('gid', gid);
  await writeState(); render();
}
function qPublic(i){
  const q = T.qs[i];
  if (S.mode === 'choose') return { d:q.d, o:q.o };
  const hint = q.w.split('').map((c, j) => j === 0 ? c : (c === ' ' ? '  ' : (/[a-z]/i.test(c) ? '_' : c))).join(' ');
  return { d:q.d, h:hint, len:q.w.replace(/[^a-z]/gi, '').length };
}
function startQ(i){
  clearInterval(T.timer); T.ans = {};
  S.status = 'q'; S.qi = i; S.q = qPublic(i); S.ans = null; S.last = null; S.qAt = Date.now();
  writeState(); runTimer(); render();
}
function runTimer(){
  clearInterval(T.timer);
  T.timer = setInterval(() => {
    if (!S || S.status !== 'q'){ clearInterval(T.timer); return; }
    const left = Math.max(0, Math.ceil(S.secs - (Date.now() - S.qAt) / 1000));
    const el = $('#ifl-tm'); if (el){ el.textContent = left; el.classList.toggle('low', left <= 5); }
    if (left <= 0) reveal();
  }, 250);
}
function isRight(i, a){
  const q = T.qs[i]; if (!q || a == null) return false;
  return S.mode === 'choose' ? q.o[+a] === q.w : norm(a) === norm(q.w);
}
function reveal(){
  if (!S || S.status !== 'q') return;
  clearInterval(T.timer);
  const i = S.qi, q = T.qs[i], last = {};
  Object.keys(S.players).forEach(key => {
    const r = T.ans[key]; let pts = 0;
    if (r && isRight(i, r.a)) pts = 100 + Math.round(50 * Math.max(0, 1 - (r.ms || 0) / (S.secs * 1000)));
    last[key] = r ? pts : -1;
    if (pts){ S.players[key].s = (S.players[key].s || 0) + pts; S.players[key].c = (S.players[key].c || 0) + 1; }
  });
  S.status = 'reveal'; S.last = last; S.ans = { w:q.w, i: q.o ? q.o.indexOf(q.w) : -1 };
  writeState(); render();
}
async function finish(){
  clearInterval(T.timer); S.status = 'over'; S.q = null; await writeState(); render();
  if (!S.saved && R.db){
    const rows = (S.solo ? [] : S.teams.map((t, i) => ({ name:t + ' (team)', score:teamScore(i) })))
      .concat(Object.values(S.players).sort((a, b) => b.s - a.s).map(p => ({ name:S.solo ? p.n : p.n + ' · ' + (S.teams[p.t] || ''), score:p.s || 0 })));
    try { await R.db.collection('sessions').add({ group:S.cls || 'Live game', note:'Live game · ' + S.lesson + ' ' + S.ltitle + ' · ' + (S.mode === 'choose' ? 'Choose the word' : 'Spell the word'), rows, activity:GAME + ' · Live game', at:new Date().toISOString() });
      S.saved = true; writeState(); render(); } catch(e){ note('The result couldn’t be saved to Results. Use Download from the Results panel later.'); }
  }
}
function closeGame(){ clearInterval(T.timer); if (S){ S.status = 'closed'; writeState(); pushPresence({ status:'closed', gid:S.gid }); } S = null; T = { qs:null, ans:{}, timer:null, gid:null }; render(); }

/* answers arrive from two channels: room presence and the liveans collection */
function collect(key, rec){
  if (!R.owner || !S || !rec || rec.gid !== S.gid || !key || (S.kicked || []).includes(key)) return;
  const t = Math.max(0, Math.min(S.teams.length - 1, +rec.t || 0)), n = String(rec.n || 'Student').slice(0, 30);
  const p = S.players[key];
  if (!p){ S.players[key] = { n, t, s:0, c:0 }; writeSoon(); render(); }
  else if ((p.n !== n || p.t !== t) && S.status === 'lobby'){ p.n = n; p.t = t; writeSoon(); render(); }
  if (S.status === 'q' && rec.qi === S.qi && rec.a != null && rec.a !== '' && !T.ans[key]){
    T.ans[key] = { a:rec.a, ms:+rec.ms || 0 }; render();
    const total = Object.keys(S.players).length, done = Object.keys(T.ans).length;
    if (total && done >= total) setTimeout(() => { if (S && S.status === 'q' && Object.keys(T.ans).length >= Object.keys(S.players).length) reveal(); }, 900);
  }
}

/* ---------- student ---------- */
function myKey(){ return R.uid || (R.myPeer ? 'p-' + R.myPeer : null); }
async function send(){
  if (!me) return;
  let ok = false;
  if (R.room){ try { await R.room.presence({ lv: me }); ok = true; } catch(e){} }
  if (R.db && R.uid && R.canWrite !== false){ try { await R.db.doc('liveans/' + R.uid).set(me); ok = true; } catch(e){} }
  return ok;
}
async function join(name, team){
  name = String(name || '').trim().slice(0, 30); if (!name) return;
  ls('name', name);
  me = { gid:S.gid, n:name, t:team, qi:-1, a:null, ms:null };
  ls('me', JSON.stringify(me));
  const ok = await send();
  if (!ok){ me = null; note('Your phone couldn’t connect to the game. Ask your teacher to give you access to this page.'); return; }
  render();
}
function answer(a){
  if (!me || !S || S.status !== 'q' || (me.qi === S.qi && me.a != null)) return;
  me.qi = S.qi; me.a = a; me.ms = Date.now() - recvAt; ls('me', JSON.stringify(me)); send(); render();
}

/* ---------- rendering ---------- */
function teamColor(i){ return COLORS[i % COLORS.length]; }
function barsHtml(){
  if (S.solo) return '';
  const max = Math.max(1, ...S.teams.map((t, i) => teamScore(i)));
  return '<div class="ifl-bars">' + S.teams.map((t, i) => `<div class="ifl-barrow"><span><span class="ifl-dots" style="background:${teamColor(i)}"></span>${esc(t)}</span><span class="tr"><i style="width:${teamScore(i) / max * 100}%;background:${teamColor(i)}"></i></span><span>${teamScore(i)}</span></div>`).join('') + '</div>';
}
function teamsHtml(mark){
  if (S.solo) return soloHtml(mark);
  return '<div class="ifl-teams">' + S.teams.map((t, i) => {
    const ps = Object.entries(S.players).filter(([k, p]) => p.t === i).sort((a, b) => a[1].n.localeCompare(b[1].n));
    return `<div class="ifl-team" style="border-color:${teamColor(i)}"><h3>${esc(t)} <span class="ifl-muted">(${ps.length})</span></h3><div class="pts">${teamScore(i)}</div><ul>${ps.map(([k, p]) => `<li class="${mark && T.ans[k] ? 'ok' : ''}"><span>${esc(p.n)}</span>${mark ? '' : kickBtn(k, p.n)}</li>`).join('') || '<li class="ifl-muted">No one yet</li>'}</ul></div>`;
  }).join('') + '</div>';
}
const kickBtn = (k, n) => `<button class="ifl-kick" type="button" data-kick="${esc(k)}" aria-label="Remove ${esc(n)}" title="Remove from the game">✕</button>`;
function soloHtml(mark){
  const ps = Object.entries(S.players || {}).sort((a, b) => (b[1].s || 0) - (a[1].s || 0));
  return '<div class="ifl-teams">' + (ps.map(([k, p], i) => `<div class="ifl-team" style="border-color:${teamColor(i)}${mark && T.ans[k] ? ';box-shadow:0 0 0 3px var(--good,#2F8F6B) inset' : ''}"><h3>${i + 1}. ${esc(p.n)}${mark && T.ans[k] ? ' ✓' : ''}</h3><div class="pts">${p.s || 0}</div>${mark ? '' : kickBtn(k, p.n)}</div>`).join('') || '<p class="ifl-muted">No one has joined yet</p>') + '</div>';
}
function leaderboard(lim){
  const ps = Object.values(S.players).sort((a, b) => (b.s || 0) - (a.s || 0)).slice(0, lim || 999);
  if (!ps.length) return '<p class="ifl-muted">No players.</p>';
  return '<table class="ifl-lb"><tbody>' + ps.map((p, i) => `<tr><td>${i + 1}</td><td><span class="ifl-dots" style="background:${teamColor(p.t)}"></span>${esc(p.n)}</td><td class="ifl-muted">${esc(S.teams[p.t] || '')}</td><td class="n">${p.s || 0}</td></tr>`).join('') + '</tbody></table>';
}
function optsHtml(q, revealIdx, clickable){
  return '<div class="ifl-opts">' + q.o.map((o, j) => `<button class="ifl-opt${revealIdx != null && revealIdx >= 0 ? (j === revealIdx ? ' right' : ' dim') : ''}" style="background:${COLORS[j]}" ${clickable ? 'data-a="' + j + '"' : 'tabindex="-1"'}><b>${'ABCD'[j]}</b>${esc(o)}</button>`).join('') + '</div>';
}

function render(){
  renderBar();
  if (R.owner) renderTeacher(); else renderStudent();
}
function renderBar(){
  if (!R.ready){ bar.innerHTML = ''; return; }
  if (R.owner){
    const live = active() ? (S.status === 'lobby' ? 'lobby open' : S.status === 'over' ? 'finished' : 'in progress') : 'phones in teams';
    bar.innerHTML = `<div class="ifl-bar" role="group" aria-label="Teacher view"><button data-v="board" aria-pressed="${teacherView === 'board'}">Board games<small>what the class sees</small></button><button data-v="live" aria-pressed="${teacherView === 'live'}">Live game<small>${esc(live)}</small></button><button data-v="results">Results &amp; teams<small>saved scores</small></button></div>`;
    bar.querySelectorAll('[data-v]').forEach(b => b.onclick = () => {
      if (b.dataset.v === 'results'){ const f = $('#ifr-fab'); if (f){ f.click(); setTimeout(() => { const t = document.querySelector('#ifr-tabs [data-t="results"]'); if (t) t.click(); }, 60); } return; }
      teacherView = b.dataset.v; render(); window.scrollTo(0, 0);
    });
    return;
  }
  if (active() && !me){
    bar.innerHTML = `<div class="ifl-banner"><span>Live game now: <b>${esc(S.lesson + ' · ' + S.ltitle)}</b></span><button class="ifl-btn gold" id="ifl-joinbtn">Join the live game</button></div>`;
    $('#ifl-joinbtn').onclick = () => { me = null; showJoin = true; render(); };
  } else bar.innerHTML = '';
}

/* teacher panel */
function renderTeacher(){
  const on = teacherView === 'live';
  panel.hidden = !on; hideGame(on); hideLessons(on && active());
  if (!on) return;
  let h = '';
  if (noteMsg) h += `<div class="ifl-note">${esc(noteMsg)}</div>`;
  if (!R.db) h += '<div class="ifl-note">Live games need the class record, which isn’t available in this view. Open the arena from its claude.ai link.</div>';
  if (!active()){
    const k = curLesson();
    h += `<h2>Live game on phones</h2><p class="ifl-muted">Students open this page on their own phones and answer in teams or head to head. Your screen shows the questions, the timer and the scores. Students need to be signed in to claude.ai with access to this page.</p>
    <div class="ifl-row"><span class="lbl">Lesson</span><b>${esc(k + ' · ' + titleOf(k))}</b><span class="ifl-muted">(${wordsOf(k).length} words · change it with the Lesson buttons above)</span></div>
    <div class="ifl-row"><span class="lbl">Class or group</span><input class="ifl-in" id="ifl-cls" value="${esc(setup.cls)}" placeholder="e.g. C1 Teens Mon/Wed" maxlength="40"></div>
    <div class="ifl-row"><span class="lbl">Game</span>${[['choose','Choose the word'],['spell','Spell the word']].map(([v, l]) => `<button class="ifl-chip" data-mode="${v}" aria-pressed="${setup.mode === v}">${l}</button>`).join('')}</div>
    <div class="ifl-row"><span class="lbl">Questions</span>${[5,10,15,20,'all'].map(v => `<button class="ifl-chip" data-n="${v}" aria-pressed="${String(setup.n) === String(v)}">${v === 'all' ? 'All' : v}</button>`).join('')}</div>
    <div class="ifl-row"><span class="lbl">Seconds per question</span>${[15,20,30,45].map(v => `<button class="ifl-chip" data-secs="${v}" aria-pressed="${+setup.secs === v}">${v}</button>`).join('')}</div>
    <div class="ifl-row"><span class="lbl">Format</span>${[['team','Teams'],['solo','Player vs player']].map(([v, l]) => `<button class="ifl-chip" data-fmt="${v}" aria-pressed="${setup.fmt === v}">${l}</button>`).join('')}</div>
    ${setup.fmt === 'solo' ? '' : `<div class="ifl-row"><span class="lbl">Teams</span>${[2,3,4].map(v => `<button class="ifl-chip" data-nt="${v}" aria-pressed="${+setup.nt === v}">${v}</button>`).join('')}</div>
    <div class="ifl-row"><span class="lbl">Team names</span>${setup.teams.slice(0, setup.nt).map((t, i) => `<input class="ifl-in" data-tn="${i}" value="${esc(t)}" maxlength="24" style="border-color:${teamColor(i)};max-width:180px">`).join('')}</div>`}
    <div class="ifl-row"><button class="ifl-btn gold" id="ifl-open" ${R.db ? '' : 'disabled'}>Open the lobby</button></div>
    <div class="ifl-note"><b>How it works.</b> 1. Open the lobby. 2. Share this page’s link in your class chat (Share menu, top right). 3. Students tap <b>Join the live game</b>, type their name (and pick a team in team mode). 4. Press Start. Fast correct answers score up to 150 points; a team total is the sum of its players. In Player vs player every student plays for themselves.</div>`;
    panel.innerHTML = h;
    const cls = $('#ifl-cls'); cls.oninput = () => { setup.cls = cls.value; saveSetup(); };
    panel.querySelectorAll('[data-mode]').forEach(b => b.onclick = () => { setup.mode = b.dataset.mode; saveSetup(); render(); });
    panel.querySelectorAll('[data-n]').forEach(b => b.onclick = () => { setup.n = b.dataset.n === 'all' ? 'all' : +b.dataset.n; saveSetup(); render(); });
    panel.querySelectorAll('[data-secs]').forEach(b => b.onclick = () => { setup.secs = +b.dataset.secs; saveSetup(); render(); });
    panel.querySelectorAll('[data-fmt]').forEach(b => b.onclick = () => { setup.fmt = b.dataset.fmt; saveSetup(); render(); });
    panel.querySelectorAll('[data-nt]').forEach(b => b.onclick = () => { setup.nt = +b.dataset.nt; saveSetup(); render(); });
    panel.querySelectorAll('[data-tn]').forEach(inp => inp.oninput = () => { setup.teams[+inp.dataset.tn] = inp.value; saveSetup(); });
    $('#ifl-open').onclick = () => { noteMsg = ''; openLobby(); };
    return;
  }
  const nP = Object.keys(S.players).length;
  const head = `<div class="ifl-top"><span>${esc(S.lesson + ' · ' + S.ltitle)} · ${S.mode === 'choose' ? 'Choose the word' : 'Spell the word'}${S.cls ? ' · ' + esc(S.cls) : ''}</span><span>${nP} player${nP === 1 ? '' : 's'}</span></div>`;
  if (S.status === 'lobby'){
    h += head + `<div class="ifl-big">Join on your phone: open this page and tap <span style="color:var(--gold,#C9A227)">Join the live game</span></div><p class="ifl-muted" style="text-align:center">Students scan the QR and land straight on the join page. Names appear below as they join. Tap ✕ to remove a name, then press Start when everyone is in.</p>` + qrBox() + teamsHtml(false) +
      `<div class="ifl-row" style="justify-content:center"><button class="ifl-btn go" id="ifl-start" ${T.qs ? '' : 'disabled'}>Start the game (${S.n} questions)</button><button class="ifl-btn" id="ifl-cancel">Cancel</button></div>`;
    panel.innerHTML = h; wireQr();
    panel.querySelectorAll('[data-kick]').forEach(b => b.onclick = () => { const k = b.dataset.kick; delete S.players[k]; (S.kicked = S.kicked || []).push(k); writeState(); render(); });
    $('#ifl-start').onclick = () => startQ(0);
    $('#ifl-cancel').onclick = async () => { if (await uiConfirm('Cancel this live game?')) closeGame(); };
    return;
  }
  if (!T.qs){ panel.innerHTML = head + '<p class="ifl-note">Loading the questions…</p>'; return; }
  if (S.status === 'q'){
    const q = T.qs[S.qi], left = Math.max(0, Math.ceil(S.secs - (Date.now() - S.qAt) / 1000)), done = Object.keys(T.ans).length;
    h += head + `<div class="ifl-top"><span>Question ${S.qi + 1} / ${S.n}</span><span class="ifl-timer ${left <= 5 ? 'low' : ''}" id="ifl-tm">${left}</span><span>${done} / ${nP} answered</span></div>
      <div class="ifl-big">${esc(q.d)}</div>` + (S.mode === 'choose' ? optsHtml(q, null, false) : `<div class="ifl-word" style="letter-spacing:.08em">${esc(S.q.h)}</div><p class="ifl-muted" style="text-align:center">${S.q.len} letters · type it on your phone</p>`) +
      teamsHtml(true) + `<div class="ifl-row" style="justify-content:center"><button class="ifl-btn gold" id="ifl-reveal">Show the answer now</button><button class="ifl-btn" id="ifl-end">End game</button></div>`;
    panel.innerHTML = h;
    $('#ifl-reveal').onclick = reveal; $('#ifl-end').onclick = async () => { if (await uiConfirm('End the game now and show the final scores?')) finish(); };
    return;
  }
  if (S.status === 'reveal'){
    const q = T.qs[S.qi], right = Object.values(S.last || {}).filter(v => v > 0).length, answered = Object.values(S.last || {}).filter(v => v >= 0).length;
    h += head + `<div class="ifl-top"><span>Question ${S.qi + 1} / ${S.n}</span><span>${right} of ${answered} answered correctly</span></div>
      <div class="ifl-muted" style="text-align:center;margin-top:10px">${esc(q.d)}</div><div class="ifl-word" style="color:var(--good,#2F8F6B)">${esc(q.w)}</div>` + (S.mode === 'choose' ? optsHtml(q, S.ans.i, false) : '') + barsHtml() +
      `<h3>Top players</h3>${leaderboard(5)}<div class="ifl-row" style="justify-content:center">${S.qi + 1 < S.n ? '<button class="ifl-btn go" id="ifl-next">Next question</button>' : '<button class="ifl-btn gold" id="ifl-fin">Final results</button>'}<button class="ifl-btn" id="ifl-end">End game</button></div>`;
    panel.innerHTML = h;
    const nx = $('#ifl-next'); if (nx) nx.onclick = () => startQ(S.qi + 1);
    const fn = $('#ifl-fin'); if (fn) fn.onclick = finish;
    $('#ifl-end').onclick = async () => { if (await uiConfirm('End the game now and show the final scores?')) finish(); };
    return;
  }
  if (S.status === 'over'){
    const order = S.teams.map((t, i) => [i, teamScore(i)]).sort((a, b) => b[1] - a[1]);
    const sp = Object.values(S.players || {}).sort((a, b) => (b.s || 0) - (a.s || 0));
    const win = S.solo ? (sp.length ? (sp.length > 1 && sp[0].s === sp[1].s ? 'It’s a tie at the top!' : '🏆 ' + sp[0].n + ' wins!') : 'Game over') : (order.length > 1 && order[0][1] === order[1][1] ? 'It’s a draw!' : S.teams[order[0][0]] + ' wins!');
    h += head + `<div class="ifl-word">${esc(win)}</div>` + barsHtml() + `<h3>All players</h3>${leaderboard()}
      <p class="ifl-muted">${S.saved ? 'Saved to Results &amp; teams.' : 'Saving to Results…'}</p>
      <div class="ifl-row" style="justify-content:center"><button class="ifl-btn gold" id="ifl-new">New live game</button><button class="ifl-btn" id="ifl-close">Close the live game</button></div>`;
    panel.innerHTML = h;
    $('#ifl-new').onclick = () => { closeGame(); teacherView = 'live'; render(); };
    $('#ifl-close').onclick = () => { closeGame(); teacherView = window.IFLIVE_ONLY ? 'live' : 'board'; render(); };
  }
}

/* student panel */
let showJoin = false;
function renderStudent(){
  if (me && S && me.gid !== S.gid) me = null;
  const on = joinMode || (active() && (me || showJoin));
  panel.hidden = !on; hideGame(on); hideLessons(on);
  [...wrap.children].forEach(e => { if (e !== panel && e !== bar && joinMode) e.hidden = true; });
  bar.hidden = joinMode;
  if (!on){ showJoin = false; return; }
  let h = '<div class="ifl-phone">';
  if (noteMsg) h += `<div class="ifl-note">${esc(noteMsg)}</div>`;
  if (joinMode && !active()){
    const can = !!R.room || (R.db && R.uid && R.canWrite !== false);
    h += `<h2>${esc(GAME)}</h2><div class="ifl-big" style="font-size:24px">${!R.ready ? 'Connecting…' : can ? 'Waiting for your teacher to open the game…' : 'Can’t connect from this phone'}</div>`;
    h += R.ready && !can ? '<div class="ifl-note">This phone isn’t connected to the live game. Sign in to claude.ai (top right of this page) and open the link again.</div>' : '<p class="ifl-muted" style="text-align:center">Keep this page open. The join screen appears here when the game starts.</p>';
    h += '<p style="text-align:center"><button class="ifl-chip" id="ifl-leavejoin">Open the arena instead</button></p></div>';
    panel.innerHTML = h;
    $('#ifl-leavejoin').onclick = () => { joinMode = false; try { history.replaceState(null, '', location.pathname + location.search); } catch(e){} wrap.querySelectorAll(':scope > *').forEach(e => { if (e !== panel && e !== bar) e.hidden = false; }); render(); };
    return;
  }
  if (!me){
    const can = !!R.room || (R.db && R.uid && R.canWrite !== false);
    h += `<h2>Join the live game</h2><p class="ifl-muted">${esc(S.lesson + ' · ' + S.ltitle)}</p>`;
    if (!can){ h += '<div class="ifl-note">Your phone can’t join from this view. Sign in to claude.ai and ask your teacher to give you access to this page.</div>'; }
    else {
      const pick = +(ls('team') || 0);
      h += `<label class="ifl-muted" for="ifl-name">Your name</label><input class="ifl-in" id="ifl-name" style="width:100%;font-size:20px;margin:6px 0 10px" maxlength="30" value="${esc(ls('name') || '')}" autocomplete="name">
        ${S.solo ? '' : `<div class="ifl-muted">Your team</div><div class="ifl-teampick">${S.teams.map((t, i) => `<button data-team="${i}" style="background:${teamColor(i)}" aria-pressed="${i === pick}">${esc(t)}</button>`).join('')}</div>`}
        <button class="ifl-btn go" id="ifl-go" style="width:100%">Join</button>`;
    }
    h += joinMode ? '</div>' : '<p style="text-align:center"><button class="ifl-chip" id="ifl-back">Back to the arena</button></p></div>';
    panel.innerHTML = h;
    let team = S.solo ? 0 : Math.min(S.teams.length - 1, +(ls('team') || 0));
    panel.querySelectorAll('[data-team]').forEach(b => b.onclick = () => { team = +b.dataset.team; ls('team', team); panel.querySelectorAll('[data-team]').forEach(x => x.setAttribute('aria-pressed', String(x === b))); });
    const go = $('#ifl-go'); if (go) go.onclick = () => { noteMsg = ''; join($('#ifl-name').value, team); };
    const bk = $('#ifl-back'); if (bk) bk.onclick = () => { showJoin = false; render(); };
    return;
  }
  const key = myKey(), mine = (S.players || {})[key], tn = S.teams[me.t] || '';
  if ((S.kicked || []).includes(key)){ panel.innerHTML = '<div class="ifl-phone"><div class="ifl-big" style="font-size:24px">Your teacher removed you from this game.</div></div>'; return; }
  h += `<div class="ifl-top"><span><span class="ifl-dots" style="background:${teamColor(me.t)}"></span>${esc(me.n)}${S.solo ? '' : ' · ' + esc(tn)}</span><span>${mine ? (mine.s || 0) + ' pts' : ''}</span></div>`;
  if (S.status === 'lobby'){
    h += `<div class="ifl-big">You’re in!</div><p style="text-align:center" class="ifl-muted">${mine ? 'Your name is on the board.' : 'Waiting for the board to show your name…'} The game starts when your teacher presses Start.</p>`;
  } else if (S.status === 'q' && S.q){
    const answered = me.qi === S.qi && me.a != null;
    const left = Math.max(0, Math.ceil(S.secs - (Date.now() - recvAt) / 1000));
    h += `<div class="ifl-top"><span>Question ${S.qi + 1} / ${S.n}</span><span class="ifl-timer ${left <= 5 ? 'low' : ''}" id="ifl-stm" style="font-size:36px">${left}</span></div><div class="ifl-big" style="font-size:22px">${esc(S.q.d)}</div>`;
    if (answered) h += `<div class="ifl-res">Answer sent ✓</div><p style="text-align:center" class="ifl-muted">${S.mode === 'choose' ? 'You chose: ' + esc(S.q.o[me.a]) : 'You wrote: ' + esc(me.a)}. Look at the board.</p>`;
    else if (left <= 0) h += '<p class="ifl-res no">Time’s up</p>';
    else if (S.mode === 'choose') h += optsHtml(S.q, null, true);
    else h += `<div class="ifl-word" style="font-size:28px;letter-spacing:.08em">${esc(S.q.h)}</div><input class="ifl-in" id="ifl-sp" style="width:100%;font-size:22px;text-align:center" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Type the word"><button class="ifl-btn go" id="ifl-spgo" style="width:100%;margin-top:10px">Send</button>`;
  } else if (S.status === 'reveal'){
    const pts = (S.last || {})[key];
    h += pts > 0 ? `<div class="ifl-res ok">Correct! +${pts}</div>` : pts === 0 ? '<div class="ifl-res no">Not this time</div>' : '<div class="ifl-res no">No answer</div>';
    h += `<p style="text-align:center">The answer: <b>${esc(S.ans && S.ans.w)}</b></p>` + barsHtml() + '<p class="ifl-muted" style="text-align:center">Next question coming…</p>';
  } else if (S.status === 'over'){
    const ps = Object.entries(S.players || {}).sort((a, b) => (b[1].s || 0) - (a[1].s || 0)), rank = ps.findIndex(([k]) => k === key) + 1;
    const order = S.teams.map((t, i) => [i, teamScore(i)]).sort((a, b) => b[1] - a[1]);
    const spo = ps.map(x => x[1]);
    h += `<div class="ifl-res">${esc(S.solo ? (spo.length ? (spo.length > 1 && spo[0].s === spo[1].s ? 'It’s a tie at the top!' : spo[0].n + ' wins!') : 'Game over') : (order.length > 1 && order[0][1] === order[1][1] ? 'It’s a draw!' : S.teams[order[0][0]] + ' wins!'))}</div>` + barsHtml() + (rank ? `<p style="text-align:center;font-size:20px">You finished <b>${rank}</b> of ${ps.length} with <b>${(mine && mine.s) || 0}</b> points.</p>` : '');
    h += '<p style="text-align:center"><button class="ifl-chip" id="ifl-leave">Back to the arena</button></p>';
  }
  h += '</div>';
  panel.innerHTML = h;
  panel.querySelectorAll('[data-a]').forEach(b => b.onclick = () => answer(+b.dataset.a));
  const sp = $('#ifl-sp'); if (sp){ const go = () => { if (sp.value.trim()) answer(sp.value.trim().slice(0, 60)); }; $('#ifl-spgo').onclick = go; sp.onkeydown = e => { if (e.key === 'Enter') go(); }; setTimeout(() => sp.focus(), 50); }
  const lv = $('#ifl-leave'); if (lv) lv.onclick = () => { me = null; showJoin = false; render(); };
}

/* student countdown + new-question detection */
function onState(d){
  S = d || null;
  if (!R.owner){
    if (S && S.status === 'q'){
      const qk = S.gid + ':' + S.qi;
      if (qk !== lastQKey){ lastQKey = qk; recvAt = Date.now() - Math.max(0, Math.min(5000, Date.now() - (S.qAt || Date.now()))); }
    }
    if (me && S && me.gid === S.gid && S.status === 'q' && !(me.qi === S.qi && me.a != null)){
      // keep presence current so the teacher sees us after a reconnect
    }
    clearInterval(tick);
    if (S && S.status === 'q') tick = setInterval(() => {
      const el = $('#ifl-stm'); if (!el) return; const left = Math.max(0, Math.ceil(S.secs - (Date.now() - recvAt) / 1000));
      el.textContent = left; el.classList.toggle('low', left <= 5); if (left <= 0){ clearInterval(tick); render(); }
    }, 300);
  }
  render();
}

/* ---------- start ---------- */
async function init(){
  if (!window.claude || !claude.use) return;
  let user = null, db = null, room = null;
  try { [user, db, room] = await Promise.all([claude.use('user'), claude.use('db'), claude.use('room')]); } catch(e){}
  R.user = user; R.db = db; R.room = room;
  if (user){ try { R.owner = await user.isOwner(); R.uid = await user.id(); R.canWrite = await user.can('data.write'); } catch(e){} }
  R.ready = true;
  if (room){
    try { room.onPeers(ch => {
      const mine = ch.peers.find(p => p.isMe && p.sameTab); if (mine) R.myPeer = mine.peer;
      if (R.owner) ch.peers.forEach(p => { if (!p.isMe && p.kind === 'viewer' && p.presence && p.presence.lv) collect(p.by || ('p-' + p.peer), p.presence.lv); });
      else if (!R.db){ const t = ch.peers.find(p => !p.isMe && p.presence && p.presence.ifs); { const js = t ? JSON.stringify(t.presence.ifs) : ''; if (js !== lastPres){ lastPres = js; onState(t ? JSON.parse(js) : null); } } }
    }, () => {}); } catch(e){}
  }
  if (db){
    if (R.owner){
      try {
        const g = await db.doc('live/state').get();
        if (g.exists){ S = JSON.parse(JSON.stringify(g.data())); if (active() && S.status !== 'over'){ const q = await db.doc('liveq/' + S.gid).get(); if (q.exists){ T.qs = JSON.parse(JSON.stringify(q.data().qs)); T.gid = S.gid; } if (S.status === 'q') runTimer(); } }
      } catch(e){}
      try { db.collection('liveans').onSnapshot(s => { s.docs.forEach(d => collect(d.id, JSON.parse(JSON.stringify(d.data() || {})))); }, () => {}); } catch(e){}
    } else {
      try { const saved = JSON.parse(ls('me') || 'null'); if (saved) me = saved; } catch(e){}
      try { db.doc('live/state').onSnapshot(s => onState(s.exists ? JSON.parse(JSON.stringify(s.data() || {})) : null), () => {}); } catch(e){}
    }
  }
  if (!R.owner && !db){ try { const saved = JSON.parse(ls('me') || 'null'); if (saved) me = saved; } catch(e){} }
  if (me && (!S || me.gid !== S.gid)) { /* kept until the state arrives */ }
  render();
  if (me && S && me.gid === S.gid) send();
}
if (window.IFLIVE_ONLY){
  const st = document.createElement('style'); st.textContent = '.ifl-bar button[data-v="board"]' + (window.IFLIVE_NORES ? ',.ifl-bar button[data-v="results"]' : '') + '{display:none}'; document.head.appendChild(st);
  teacherView = 'live';
}
render();
init();
})();
