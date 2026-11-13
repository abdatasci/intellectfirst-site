/* Presentation and directory filters only; original app state and access checks stay in their apps. */
(function () {
  'use strict';
  var text = {
    en:{search:'Search learning apps',placeholder:'Search apps, books, levels…',category:'Category',all:'All categories',level:'Level',all_levels:'All levels',vocabulary:'Vocabulary',grammar:'Grammar',games:'Games & practice',tests:'Tests',languages:'Kazakh & Russian',materials:'Materials',staff:'Staff & information',other:'More apps',language_practice:'Learn & practise',open:'Open app',code:'Access code required',empty:'No apps match. Try another search or filter.',count:'apps',close:'Close photo',photo:'View full-resolution photo'},
    ru:{search:'Поиск учебных приложений',placeholder:'Поиск: приложения, учебники, уровни…',category:'Категория',all:'Все категории',level:'Уровень',all_levels:'Все уровни',vocabulary:'Лексика',grammar:'Грамматика',games:'Игры и практика',tests:'Тесты',languages:'Казахский и русский',materials:'Материалы',staff:'Учителям и информация',other:'Другие приложения',language_practice:'Учитесь и практикуйтесь',open:'Открыть приложение',code:'Нужен код доступа',empty:'Ничего не найдено. Измените запрос или фильтр.',count:'приложений',close:'Закрыть фото',photo:'Открыть фото в полном разрешении'},
    kk:{search:'Оқу қосымшаларын іздеу',placeholder:'Іздеу: қосымшалар, оқулықтар, деңгейлер…',category:'Санат',all:'Барлық санаттар',level:'Деңгей',all_levels:'Барлық деңгейлер',vocabulary:'Сөздік',grammar:'Грамматика',games:'Ойындар мен жаттығулар',tests:'Тесттер',languages:'Қазақ және орыс тілі',materials:'Материалдар',staff:'Мұғалімдерге және ақпарат',other:'Басқа қосымшалар',language_practice:'Үйреніңіз және жаттығыңыз',open:'Қосымшаны ашу',code:'Рұқсат коды қажет',empty:'Ештеңе табылмады. Іздеуді немесе сүзгіні өзгертіңіз.',count:'қосымша',close:'Фотоны жабу',photo:'Фотоны толық ажыратымдылықта ашу'}
  };
  var search=document.getElementById('directory-search'), category=document.getElementById('directory-category'), level=document.getElementById('directory-level'), grid=document.getElementById('academy-directory');
  function copy(){return text[document.documentElement.lang]||text.en;}
  function group(item){if(item.mode==='test')return 'test'; if(['staff','info'].includes(item.skill))return 'staff';if(item.skill==='ielts')return 'mixed'; return item.skill;}
  function element(tag,cls,value){var e=document.createElement(tag);e.className=cls;if(value)e.textContent=value;return e;}
  function render(){
    var t=copy(),query=search.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    var list=(window.IF_ACADEMY_DIRECTORY||[]).filter(function(item){var haystack=[item.title,item.blurb,item.level,item.book,item.skill].join(' ').toLocaleLowerCase();return query.every(function(q){return haystack.includes(q);})&&(category.value==='all'||group(item)===category.value)&&(level.value==='all'||new RegExp('\\b'+level.value+'\\b').test(item.level));});
    grid.replaceChildren();
    list.forEach(function(item){var a=element('a','directory-card');a.href=item.href;var meta=element('span','directory-meta');meta.appendChild(element('span','',((item.translations||{})[document.documentElement.lang]||item).level||item.level||'IF Academy'));if(item.access!=='public')meta.appendChild(element('span','',t.code));a.appendChild(meta);var localized=(item.translations||{})[document.documentElement.lang]||item;a.appendChild(element('h3','',localized.title));if(item.blurb)a.appendChild(element('p','',localized.blurb));a.appendChild(element('span','open',item.slug==='young-learners'?({en:'Open ↗',ru:'Открыть ↗',kk:'Ашу ↗'}[document.documentElement.lang]||'Open ↗'):item.slug==='if-english'?'Open app ↗':t.open+' ↗'));grid.appendChild(a);});
    if(!list.length)grid.appendChild(element('p','directory-empty',t.empty));
    document.getElementById('directory-status').textContent=list.length+' / '+window.IF_ACADEMY_DIRECTORY.length+' '+t.count;
  }
  function translate(){var t=copy();document.querySelectorAll('[data-design]').forEach(function(e){e.textContent=t[e.dataset.design]||e.textContent;});search.placeholder=t.placeholder;render();document.querySelectorAll('.photo-open').forEach(function(e){e.setAttribute('aria-label',t.photo);});}
  if(grid&&search){search.addEventListener('input',render);category.addEventListener('change',render);level.addEventListener('change',render);
  new MutationObserver(translate).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});translate();}
  // Complete menu keyboard cycle, including Escape and focus return.
  var menu=document.getElementById('menuBtn'), links=document.getElementById('navLinks');
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&links.classList.contains('open')){menu.click();menu.focus();}});
  document.addEventListener('click',function(e){if(links.classList.contains('open')&&!e.target.closest('header.site'))menu.click();});
  // Full original image files, available with mouse, touch, or keyboard.
  var viewer=element('dialog','media-viewer'),close=element('button','',copy().close),photo=element('img','');close.type='button';viewer.append(close,photo);document.body.append(viewer);close.onclick=function(){viewer.close();};viewer.addEventListener('click',function(e){if(e.target===viewer)viewer.close();});
  document.querySelectorAll('.shot img').forEach(function(img){var link=element('a','photo-open');link.href=img.getAttribute('src');link.setAttribute('aria-label',copy().photo);img.parentNode.insertBefore(link,img);link.appendChild(img);img.decoding='async';link.addEventListener('click',function(e){if(!viewer.showModal)return;e.preventDefault();photo.src=img.src;photo.alt=img.alt;close.textContent=copy().close;viewer.showModal();});});
})();
