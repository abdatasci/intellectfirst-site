/* Русский A1–B1 · Атлас грамматики — the whole grammar system as infographics.
   Chapter order follows a classic reference-grammar layout (sounds → nouns → prepositions → pronouns → adjectives → numbers → verbs → conjunctions);
   all explanations, examples and visuals are original. */
window.ATLAS={
intro:'Every rule of Russian you need up to B1, one picture per card. Tap any Russian example to hear it, then check yourself with three quick questions. Use it as a reference whenever a lesson’s grammar feels foggy.',
chapters:[
 {id:'snd',icon:'🔊',ru:'Звуки и буквы',en:'Sounds & letters'},
 {id:'noun',icon:'📦',ru:'Существительные и падежи',en:'Nouns & the six cases'},
 {id:'prep',icon:'🧭',ru:'Предлоги',en:'Prepositions'},
 {id:'pron',icon:'👥',ru:'Местоимения',en:'Pronouns'},
 {id:'adj',icon:'🎨',ru:'Прилагательные',en:'Adjectives & adverbs'},
 {id:'num',icon:'🔢',ru:'Числа, даты, время',en:'Numbers, dates & time'},
 {id:'verb',icon:'⚙️',ru:'Глаголы',en:'Verbs'},
 {id:'conj',icon:'🔗',ru:'Союзы',en:'Joining sentences'}
],
cards:[
/* ===== SOUNDS ===== */
{id:'vowels',ch:'snd',icon:'🎵',ru:'Твёрдые и мягкие гласные',en:'Hard & soft vowels',lv:'A1',lessons:'1',
 html:()=>`<div class="gram"><h4>Ten vowels = five pairs</h4>
 <div class="ig-tldr">Each “hard” vowel has a “soft” twin that adds a <b>y</b>-sound or softens the consonant before it.</div>
 <div class="ig-row"><span class="ig-chip m">а<small>a</small></span><span class="ig-op">↔</span><span class="ig-chip f">я<small>ya</small></span><span class="ig-chip m">о<small>o</small></span><span class="ig-op">↔</span><span class="ig-chip f">ё<small>yo</small></span><span class="ig-chip m">у<small>u</small></span><span class="ig-op">↔</span><span class="ig-chip f">ю<small>yu</small></span></div>
 <div class="ig-row"><span class="ig-chip m">ы<small>y</small></span><span class="ig-op">↔</span><span class="ig-chip f">и<small>i</small></span><span class="ig-chip m">э<small>e</small></span><span class="ig-op">↔</span><span class="ig-chip f">е<small>ye</small></span></div>
 <div class="ig-vs"><div><h5>🪨 hard</h5><p>мал (small) · был (was) · нос (nose)</p></div><div><h5>🪶 soft</h5><p>мял (crumpled) · бил (beat) · нёс (carried)</p></div></div>
 <div class="ig-memo"><i>🤫</i><p><b>ь</b> (soft sign) softens the consonant without a vowel: брат → брать. <b>ъ</b> (hard sign) keeps a little gap: подъезд.</p></div></div>`,
 qs:[{q:'Soft twin of «у»',o:['ю','я','ё','и'],a:'ю'},{q:'Soft twin of «ы»',o:['и','е','ю','я'],a:'и'},{q:'Which letter has NO sound of its own?',o:['ь','э','ы','й'],a:'ь'}]},
{id:'stress',ch:'snd',icon:'📢',ru:'Ударение и редукция',en:'Stress & vowel reduction',lv:'A1',lessons:'1',
 html:()=>`<div class="gram"><h4>One strong syllable, the rest are lazy</h4>
 <div class="ig-tldr">Only the stressed vowel is pronounced fully. Unstressed <b>о → а</b>, unstressed <b>е / я → и</b>.</div>
 <div class="ig-row"><span class="ig-chip">молоко</span><span class="ig-op">→</span><span class="ig-chip hl">ма-ла-КО</span></div>
 <div class="ig-row"><span class="ig-chip">сестра</span><span class="ig-op">→</span><span class="ig-chip hl">си-СТРА</span></div>
 <div class="ig-row"><span class="ig-chip">язык</span><span class="ig-op">→</span><span class="ig-chip hl">и-ЗЫК</span></div>
 <div class="ig-cards"><div class="ig-card n"><i>🎯</i><b>ё</b><small>is always stressed: ёлка, всё, идёт</small></div><div class="ig-card f"><i>⚠️</i><b>за́мок ≠ замо́к</b><small>castle vs lock — stress changes meaning!</small></div></div>
 <div class="ig-memo"><i>🎧</i><p>Learn words with their stress, like a melody. Tap 🔊 everywhere in the course.</p></div></div>`,
 qs:[{q:'How do you pronounce «молоко»?',o:['ма-ла-КО','мо-ло-КО','МО-ло-ко','ма-ло-КА'],a:'ма-ла-КО'},{q:'Unstressed «о» sounds like…',o:['а','у','о','э'],a:'а'},{q:'Which letter is always stressed?',o:['ё','е','я','о'],a:'ё'}]},
{id:'devoice',ch:'snd',icon:'🔇',ru:'Оглушение',en:'Devoicing at the end of words',lv:'A1',lessons:'1',
 html:()=>`<div class="gram"><h4>Voiced consonants go quiet at the end</h4>
 <div class="ig-tldr">At the end of a word (and before a voiceless consonant) <b>б д в г з ж</b> sound like <b>п т ф к с ш</b>.</div>
 <div class="ig-row"><span class="ig-chip">хлеб<small>you write</small></span><span class="ig-op">→</span><span class="ig-chip hl">хлеп<small>you say</small></span><span class="ig-chip">сад</span><span class="ig-op">→</span><span class="ig-chip hl">сат</span></div>
 <div class="ig-row"><span class="ig-chip">друг</span><span class="ig-op">→</span><span class="ig-chip hl">друк</span><span class="ig-chip">глаз</span><span class="ig-op">→</span><span class="ig-chip hl">глас</span><span class="ig-chip">нож</span><span class="ig-op">→</span><span class="ig-chip hl">нош</span></div>
 <div class="ig-cards"><div class="ig-card"><i>🅱️➡️🅿️</i><b>б → п</b><small>зуб</small></div><div class="ig-card"><i>🔤</i><b>в → ф</b><small>Иванов → Ивано[ф]</small></div><div class="ig-card"><i>🔤</i><b>вторник → [ф]торник</b><small>also before a voiceless consonant</small></div></div></div>`,
 qs:[{q:'«хлеб» sounds like…',o:['хлеп','хлеб','хлев','хлэп'],a:'хлеп'},{q:'«друг» sounds like…',o:['друк','друг','друх','друкк'],a:'друк'},{q:'Which letter becomes «т» at the end?',o:['д','б','з','ж'],a:'д'}]},
/* ===== NOUNS ===== */
{id:'gender',ch:'noun',icon:'⚧',ru:'Род существительных',en:'Noun gender',lv:'A1',lessons:'4, 7',
 html:()=>`<div class="gram"><h4>Look at the last letter</h4>
 <div class="ig-cards"><div class="ig-card m"><i>🧑</i><b>он</b><small>consonant, -й: стол, музей · (+ папа, дедушка — men!)</small></div><div class="ig-card f"><i>👩</i><b>она</b><small>-а, -я: книга, неделя</small></div><div class="ig-card n"><i>🌳</i><b>оно</b><small>-о, -е, -мя: окно, море, имя</small></div><div class="ig-card hl"><i>🃏</i><b>-ь</b><small>either: день (он), дверь (она)</small></div></div>
 <div class="ig-memo"><i>🔎</i><p>Most <b>-ость</b> words are feminine: радость, новость, скорость.</p></div></div>`,
 qs:[{q:'«неделя» is…',o:['она','он','оно','они'],a:'она'},{q:'«папа» is…',o:['он','она','оно','они'],a:'он'},{q:'«новость» is…',o:['она','он','оно','они'],a:'она'}]},
{id:'cases',ch:'noun',icon:'🗺',ru:'Шесть падежей: карта',en:'The six cases at a glance',lv:'A1–B1',lessons:'5–48',
 html:()=>`<div class="gram"><h4>Each case answers its own question</h4>
 <div class="ig-tldr">A case is the <b>job</b> a noun does in the sentence. Ask the question — the ending follows.</div>
 <div class="ig-cards">
  <div class="ig-card"><i>🙋</i><b>Именительный</b><small><span class="ig-q">Кто? Что?</span><br>the subject: <b>Мама</b> спит.</small></div>
  <div class="ig-card m"><i>🚫</i><b>Родительный</b><small><span class="ig-q">Кого? Чего?</span><br>“of”, нет, у, из, много: нет <b>мамы</b></small></div>
  <div class="ig-card n"><i>🎁</i><b>Дательный</b><small><span class="ig-q">Кому? Чему?</span><br>“to / for”, нравится, лет: <b>маме</b> 40 лет</small></div>
  <div class="ig-card f"><i>🎯</i><b>Винительный</b><small><span class="ig-q">Кого? Что? Куда?</span><br>the object, direction: люблю <b>маму</b></small></div>
  <div class="ig-card pl"><i>🛠</i><b>Творительный</b><small><span class="ig-q">Кем? Чем? С кем?</span><br>“with”, by means of, работать кем: с <b>мамой</b></small></div>
  <div class="ig-card hl"><i>📍</i><b>Предложный</b><small><span class="ig-q">О ком? Где?</span><br>about, location: о <b>маме</b>, в школе</small></div>
 </div>
 <div class="tw"><table class="gt"><tr><th></th><th>он · стол</th><th>оно · окно</th><th>она · книга</th><th>она · дверь</th></tr>
 <tr><td>Им.</td><td>стол</td><td>окно</td><td>книга</td><td>дверь</td></tr>
 <tr><td>Род.</td><td>стол<b>а</b></td><td>окн<b>а</b></td><td>книг<b>и</b></td><td>двер<b>и</b></td></tr>
 <tr><td>Дат.</td><td>стол<b>у</b></td><td>окн<b>у</b></td><td>книг<b>е</b></td><td>двер<b>и</b></td></tr>
 <tr><td>Вин.</td><td>стол · брат<b>а</b></td><td>окно</td><td>книг<b>у</b></td><td>дверь</td></tr>
 <tr><td>Твор.</td><td>стол<b>ом</b></td><td>окн<b>ом</b></td><td>книг<b>ой</b></td><td>дверь<b>ю</b></td></tr>
 <tr><td>Предл.</td><td>о стол<b>е</b></td><td>об окн<b>е</b></td><td>о книг<b>е</b></td><td>о двер<b>и</b></td></tr></table></div></div>`,
 qs:[{q:'Which case answers «С кем?»',o:['творительный','дательный','предложный','родительный'],a:'творительный'},{q:'«У меня нет ___» needs…',o:['родительный','винительный','дательный','именительный'],a:'родительный'},{q:'Instrumental of «книга»',o:['книгой','книгу','книге','книги'],a:'книгой'}]},
{id:'acc',ch:'noun',icon:'🎯',ru:'Винительный падеж',en:'Accusative: the object & “where to”',lv:'A1–A2',lessons:'11, 14, 15',
 html:()=>`<div class="gram"><h4>The thing you see, love, buy</h4>
 <div class="ig-tldr">Only two changes to remember: <b>она -а/-я → -у/-ю</b> and <b>animate он → -а/-я</b>.</div>
 <div class="ig-row"><span class="ig-chip f">мама</span><span class="ig-op">→</span><span class="ig-chip hl">люблю мам<b>у</b></span><span class="ig-chip f">Россия</span><span class="ig-op">→</span><span class="ig-chip hl">еду в Росси<b>ю</b></span></div>
 <div class="ig-row"><span class="ig-chip m">брат</span><span class="ig-op">→</span><span class="ig-chip hl">вижу брат<b>а</b><small>alive</small></span><span class="ig-chip m">стол</span><span class="ig-op">→</span><span class="ig-chip hl">вижу стол<small>not alive</small></span></div>
 <div class="ig-cards"><div class="ig-card"><i>➡️</i><b>в / на + acc.</b><small>direction: иду в школу</small></div><div class="ig-card"><i>⏳</i><b>через / на + acc.</b><small>time: через неделю, на месяц</small></div></div></div>`,
 qs:[{q:'Я вижу ___. (сестра)',o:['сестру','сестра','сестры','сестре'],a:'сестру'},{q:'Я жду ___. (друг)',o:['друга','друг','другу','другом'],a:'друга'},{q:'Мы идём ___ парк.',o:['в','на','из','у'],a:'в'}]},
{id:'gen',ch:'noun',icon:'🚫',ru:'Родительный падеж',en:'Genitive: “of”, absence & quantity',lv:'A2',lessons:'27, 40',
 html:()=>`<div class="gram"><h4>The busiest case in Russian</h4>
 <div class="ig-cards"><div class="ig-card"><i>🔗</i><b>of</b><small>книга брат<span class="end">а</span></small></div><div class="ig-card f"><i>🚫</i><b>нет + gen.</b><small>нет врем<span class="end">ени</span></small></div><div class="ig-card"><i>🙋</i><b>у + gen.</b><small>у Лен<span class="end">ы</span> есть кот</small></div><div class="ig-card n"><i>🔢</i><b>много / мало / сколько</b><small>много друз<span class="end">ей</span></small></div><div class="ig-card m"><i>🚪</i><b>из, от, до, без, для, около</b><small>из Москв<span class="end">ы</span>, без сахар<span class="end">а</span></small></div></div>
 <div class="ig-row"><span class="ig-chip m">-а / -я</span><span class="ig-chip f">-ы / -и</span><span class="ig-chip n">-а / -я</span><span class="ig-chip pl">plural: -ов, -ей, zero</span></div>
 <div class="ig-memo"><i>🔢</i><p>Plural genitive starter pack: столов, книг, окон, друзей, лет, людей, денег.</p></div></div>`,
 qs:[{q:'чай без ___ (сахар)',o:['сахара','сахар','сахару','сахаром'],a:'сахара'},{q:'У меня нет ___. (машина)',o:['машины','машина','машину','машине'],a:'машины'},{q:'много ___ (книги)',o:['книг','книги','книгов','книгах'],a:'книг'}]},
{id:'dat',ch:'noun',icon:'🎁',ru:'Дательный падеж',en:'Dative: to whom?',lv:'A2',lessons:'28, 24',
 html:()=>`<div class="gram"><h4>The receiver, the experiencer</h4>
 <div class="ig-row"><span class="ig-chip m">брат → брат<b>у</b></span><span class="ig-chip f">мама → мам<b>е</b></span><span class="ig-chip pl">друзья → друзь<b>ям</b></span></div>
 <div class="ig-cards"><div class="ig-card"><i>🎁</i><b>give / tell / call</b><small>подарить маме, звонить брату</small></div><div class="ig-card n"><i>❤️</i><b>нравиться</b><small>мне нравится</small></div><div class="ig-card f"><i>🎂</i><b>age</b><small>ему 30 лет</small></div><div class="ig-card hl"><i>🌡</i><b>feelings</b><small>мне холодно, ей скучно</small></div><div class="ig-card m"><i>🚶</i><b>к, по</b><small>к врачу, по улице, по телефону</small></div></div></div>`,
 qs:[{q:'Я звоню ___. (папа)',o:['папе','папу','папы','папой'],a:'папе'},{q:'___ нравится музыка. (I)',o:['Мне','Я','Меня','Мной'],a:'Мне'},{q:'Я иду ___ врачу.',o:['к','в','на','у'],a:'к'}]},
{id:'instr',ch:'noun',icon:'🛠',ru:'Творительный падеж',en:'Instrumental: with whom / as what',lv:'A2',lessons:'31, 32',
 html:()=>`<div class="gram"><h4>Tools, company & roles</h4>
 <div class="ig-row"><span class="ig-chip m">брат → брат<b>ом</b></span><span class="ig-chip f">мама → мам<b>ой</b></span><span class="ig-chip f">дверь → дверь<b>ю</b></span><span class="ig-chip pl">друзья → друзь<b>ями</b></span></div>
 <div class="ig-cards"><div class="ig-card"><i>🤝</i><b>с + instr.</b><small>кофе с молоком, с другом</small></div><div class="ig-card n"><i>👩‍⚕️</i><b>работать / стать / быть</b><small>работать врачом</small></div><div class="ig-card m"><i>✏️</i><b>by means of</b><small>писать ручкой</small></div><div class="ig-card f"><i>💳</i><b>verbs</b><small>пользоваться, заниматься, интересоваться</small></div><div class="ig-card hl"><i>📍</i><b>над, под, перед, за, между</b><small>над столом, перед домом</small></div></div></div>`,
 qs:[{q:'чай с ___ (лимон)',o:['лимоном','лимона','лимону','лимон'],a:'лимоном'},{q:'Она работает ___. (учительница)',o:['учительницей','учительница','учительницу','учительнице'],a:'учительницей'},{q:'Я занимаюсь ___. (спорт)',o:['спортом','спорт','спорта','спорту'],a:'спортом'}]},
{id:'prepc',ch:'noun',icon:'📍',ru:'Предложный падеж',en:'Prepositional: where & about',lv:'A1',lessons:'6',
 html:()=>`<div class="gram"><h4>Always with a preposition</h4>
 <div class="ig-vs"><div><h5>📍 Где? в / на</h5><p>в школ<b class="hl">е</b> · на работ<b class="hl">е</b> · в Росси<b class="hl">и</b></p></div><div><h5>💬 О ком? О чём? о / об</h5><p>о маме · об окне · обо мне</p></div></div>
 <div class="ig-cards"><div class="ig-card hl"><i>✳️</i><b>-у special</b><small>в лесу, в саду, на полу, в аэропорту</small></div><div class="ig-card"><i>🚌</i><b>на + transport</b><small>на автобусе, на машине</small></div></div></div>`,
 qs:[{q:'Мы живём в ___. (Казахстан)',o:['Казахстане','Казахстан','Казахстана','Казахстану'],a:'Казахстане'},{q:'Мы говорили ___ тебе.',o:['о','на','в','с'],a:'о'},{q:'грибы в ___ (лес)',o:['лесу','лесе','лес','леса'],a:'лесу'}]},
{id:'plural',ch:'noun',icon:'👥',ru:'Множественное число',en:'Plural endings',lv:'A1–A2',lessons:'4, 27',
 html:()=>`<div class="gram"><h4>Nominative plural</h4>
 <div class="ig-row"><span class="ig-chip m">стол → стол<b>ы</b></span><span class="ig-chip f">книга → книг<b>и</b></span><span class="ig-chip n">окно → окн<b>а</b></span><span class="ig-chip n">море → мор<b>я</b></span></div>
 <div class="ig-cards"><div class="ig-card hl"><i>🏠</i><b>-а stressed</b><small>дом → дома, город → города, глаз → глаза</small></div><div class="ig-card f"><i>👶</i><b>rebels</b><small>человек → люди, ребёнок → дети, друг → друзья, брат → братья</small></div></div>
 <div class="ig-memo"><i>7️⃣</i><p>After <b>г к х ж ш ч щ</b> write <b>и</b>, never ы.</p></div></div>`,
 qs:[{q:'Plural of «дом»',o:['дома','домы','доми','домов'],a:'дома'},{q:'Plural of «человек»',o:['люди','человеки','человека','людей'],a:'люди'},{q:'Plural of «ручка»',o:['ручки','ручкы','ручка','ручек'],a:'ручки'}]},
/* ===== PREPOSITIONS ===== */
{id:'where3',ch:'prep',icon:'🧭',ru:'Где? Куда? Откуда?',en:'Location, direction, origin',lv:'A1–A2',lessons:'14, 33',
 html:()=>`<div class="gram"><h4>Three questions, three cases</h4>
 <div class="tw"><table class="gt"><tr><th></th><th>📍 Где? (prep.)</th><th>➡️ Куда? (acc.)</th><th>⬅️ Откуда? (gen.)</th></tr>
 <tr><td>в-places</td><td>в школ<b>е</b></td><td>в школ<b>у</b></td><td>из школ<b>ы</b></td></tr>
 <tr><td>на-places</td><td>на работ<b>е</b></td><td>на работ<b>у</b></td><td>с работ<b>ы</b></td></tr>
 <tr><td>people</td><td>у врач<b>а</b></td><td>к врач<b>у</b></td><td>от врач<b>а</b></td></tr>
 <tr><td>home</td><td>дома</td><td>домой</td><td>из дома</td></tr></table></div>
 <div class="ig-memo"><i>🔁</i><p>Pairs travel together: <b>в ↔ из</b>, <b>на ↔ с</b>, <b>к ↔ от</b>.</p></div></div>`,
 qs:[{q:'Я иду ___ работы домой.',o:['с','из','от','на'],a:'с'},{q:'Я иду ___ бабушке.',o:['к','в','на','у'],a:'к'},{q:'Откуда ты? — ___ Англии.',o:['Из','С','От','В'],a:'Из'}]},
/* ===== PRONOUNS ===== */
{id:'pers',ch:'pron',icon:'🙋',ru:'Личные местоимения',en:'Personal pronouns in all cases',lv:'A1–A2',lessons:'2–28',
 html:()=>`<div class="gram"><h4>The whole family in one table</h4>
 <div class="tw"><table class="gt"><tr><th>Им.</th><th>Род./Вин.</th><th>Дат.</th><th>Твор.</th><th>Предл.</th></tr>
 <tr><td>я</td><td>меня</td><td>мне</td><td>мной</td><td>обо мне</td></tr>
 <tr><td>ты</td><td>тебя</td><td>тебе</td><td>тобой</td><td>о тебе</td></tr>
 <tr><td>он / оно</td><td>его</td><td>ему</td><td>им</td><td>о нём</td></tr>
 <tr><td>она</td><td>её</td><td>ей</td><td>ей</td><td>о ней</td></tr>
 <tr><td>мы</td><td>нас</td><td>нам</td><td>нами</td><td>о нас</td></tr>
 <tr><td>вы</td><td>вас</td><td>вам</td><td>вами</td><td>о вас</td></tr>
 <tr><td>они</td><td>их</td><td>им</td><td>ими</td><td>о них</td></tr></table></div>
 <div class="ig-memo"><i>🔤</i><p>After a preposition, он / она / они get an <b>н</b>: у <b>н</b>его, к <b>н</b>ей, с <b>н</b>ими.</p></div></div>`,
 qs:[{q:'Я думаю о ___. (she)',o:['ней','её','ей','она'],a:'ней'},{q:'Пойдём с ___! (we)',o:['нами','нас','нам','мы'],a:'нами'},{q:'У ___ есть машина. (he)',o:['него','его','ему','нём'],a:'него'}]},
{id:'svoj',ch:'pron',icon:'🪞',ru:'Свой или его?',en:'свой: one’s own',lv:'B1',
 html:()=>`<div class="gram"><h4>свой = belongs to the subject</h4>
 <div class="ig-tldr">If the owner is the <b>subject</b> of the sentence, use <b>свой</b>. It changes like мой.</div>
 <div class="ig-vs"><div><h5>🪞 свой — his OWN</h5><p>Дима любит <b class="hl">свою</b> машину.</p><p class="hint">Dima’s car</p></div><div><h5>👉 его — someone else’s</h5><p>Дима любит <b class="hl">его</b> машину.</p><p class="hint">another man’s car!</p></div></div>
 <div class="ig-memo"><i>💡</i><p>With я / ты / мы / вы both are fine: Я люблю мою / свою маму.</p></div></div>`,
 qs:[{q:'Лена взяла ___ сумку (her own).',o:['свою','её','свой','своя'],a:'свою'},{q:'«Он позвонил его брату» means the brother is…',o:['someone else’s','his own','nobody’s','hers'],a:'someone else’s'},{q:'Они продали ___ дом (their own).',o:['свой','их','своя','своим'],a:'свой'}]},
/* ===== ADJECTIVES ===== */
{id:'adjend',ch:'adj',icon:'🎨',ru:'Окончания прилагательных',en:'Adjective endings by case',lv:'A1–B1',lessons:'7+',
 html:()=>`<div class="gram"><h4>Adjectives copy the noun’s case</h4>
 <div class="tw"><table class="gt"><tr><th></th><th>он / оно</th><th>она</th><th>они</th></tr>
 <tr><td>Им.</td><td>нов<b>ый</b> / нов<b>ое</b></td><td>нов<b>ая</b></td><td>нов<b>ые</b></td></tr>
 <tr><td>Род.</td><td>нов<b>ого</b></td><td>нов<b>ой</b></td><td>нов<b>ых</b></td></tr>
 <tr><td>Дат.</td><td>нов<b>ому</b></td><td>нов<b>ой</b></td><td>нов<b>ым</b></td></tr>
 <tr><td>Вин.</td><td>= Им. / Род.*</td><td>нов<b>ую</b></td><td>= Им. / Род.*</td></tr>
 <tr><td>Твор.</td><td>нов<b>ым</b></td><td>нов<b>ой</b></td><td>нов<b>ыми</b></td></tr>
 <tr><td>Предл.</td><td>о нов<b>ом</b></td><td>о нов<b>ой</b></td><td>о нов<b>ых</b></td></tr></table></div>
 <p class="hint">* animate = like genitive: вижу нового друга.</p>
 <div class="ig-memo"><i>🎼</i><p>The adjective ending often rhymes with the pronoun: <b>его — нового</b>, <b>ему — новому</b>, <b>ей — новой</b>.</p></div></div>`,
 qs:[{q:'Я живу в ___ доме. (новый)',o:['новом','новый','новому','нового'],a:'новом'},{q:'Я вижу ___ машину. (красный)',o:['красную','красная','красной','красный'],a:'красную'},{q:'с ___ друзьями (старый)',o:['старыми','старые','старых','старым'],a:'старыми'}]},
{id:'compar',ch:'adj',icon:'📈',ru:'Сравнение',en:'Comparatives & superlatives',lv:'A2',lessons:'26',
 html:()=>`<div class="gram"><h4>More, the most</h4>
 <div class="ig-row"><span class="ig-chip">быстрый</span><span class="ig-op">→</span><span class="ig-chip hl">быстр<b>ее</b></span><span class="ig-op">→</span><span class="ig-chip">самый быстрый</span></div>
 <div class="ig-vs"><div><h5>✌️ with чем</h5><p>Он выше, <b class="hl">чем</b> я.</p></div><div><h5>☝️ with genitive</h5><p>Он выше <b class="hl">меня</b>.</p></div></div>
 <div class="ig-cards"><div class="ig-card"><b>хороший → лучше</b></div><div class="ig-card"><b>плохой → хуже</b></div><div class="ig-card"><b>большой → больше</b></div><div class="ig-card"><b>маленький → меньше</b></div><div class="ig-card"><b>высокий → выше</b></div><div class="ig-card"><b>дорогой → дороже</b></div></div></div>`,
 qs:[{q:'Comparative of «дорогой»',o:['дороже','дорогее','дорожее','более дорогее'],a:'дороже'},{q:'Он старше ___. (я — genitive)',o:['меня','мне','мной','я'],a:'меня'},{q:'the biggest city',o:['самый большой город','самый больше город','больше всех город','самая большой город'],a:'самый большой город'}]},
{id:'short',ch:'adj',icon:'✂️',ru:'Краткие прилагательные',en:'Short adjectives (рад, занят…)',lv:'A2–B1',lessons:'23, 46',
 html:()=>`<div class="gram"><h4>Short, after the noun, about now</h4>
 <div class="ig-tldr">Some adjectives have a short form used as a predicate: <b>Я рад.</b> <b>Она занята.</b></div>
 <div class="ig-cards"><div class="ig-card"><i>😊</i><b>рад · рада · рады</b><small>glad</small></div><div class="ig-card"><i>⏳</i><b>занят · занята</b><small>busy</small></div><div class="ig-card"><i>✅</i><b>готов · готова</b><small>ready</small></div><div class="ig-card"><i>❗</i><b>должен · должна</b><small>must</small></div><div class="ig-card"><i>👍</i><b>прав · права</b><small>right</small></div><div class="ig-card"><i>🤒</i><b>болен · больна</b><small>ill</small></div></div>
 <div class="ig-vs"><div><h5>long = permanent quality</h5><p>Он <b class="hl">больной</b> человек.</p></div><div><h5>short = state now</h5><p>Он сейчас <b class="hl">болен</b>.</p></div></div></div>`,
 qs:[{q:'Она ___ тебя видеть. (glad)',o:['рада','рад','радая','рады'],a:'рада'},{q:'Мы ___ ! (ready)',o:['готовы','готов','готовые','готова'],a:'готовы'},{q:'Ты ___ (right — man)',o:['прав','правый','права','правы'],a:'прав'}]},
/* ===== NUMBERS ===== */
{id:'numnoun',ch:'num',icon:'🔢',ru:'Число + существительное',en:'Numbers with nouns',lv:'A1–B1',lessons:'3, 15, 40',
 html:()=>`<div class="gram"><h4>1 · 2–4 · 5+</h4>
 <div class="ig-cards"><div class="ig-card m"><i>1️⃣</i><b>один стол · одна книга</b><small>nominative singular</small></div><div class="ig-card f"><i>2️⃣</i><b>два стола · две книги</b><small>2, 3, 4 → genitive singular</small></div><div class="ig-card n"><i>5️⃣</i><b>пять столов · пять книг</b><small>5–20 → genitive plural</small></div></div>
 <div class="ig-row"><span class="ig-chip">21 год</span><span class="ig-chip">22 года</span><span class="ig-chip">25 лет</span><span class="ig-chip">11–14 лет</span></div>
 <div class="ig-memo"><i>👀</i><p>Always look at the <b>last word</b> of the number: двадцать <b>один</b> студент, двадцать <b>два</b> студента.</p></div></div>`,
 qs:[{q:'3 ___ (сестра)',o:['сестры','сестёр','сестра','сестрам'],a:'сестры'},{q:'12 ___ (год)',o:['лет','года','год','годов'],a:'лет'},{q:'две ___ (тысяча)',o:['тысячи','тысяч','тысяча','тысячей'],a:'тысячи'}]},
{id:'timedate',ch:'num',icon:'📅',ru:'Время и даты',en:'Time & dates',lv:'A1–A2',lessons:'10, 29',
 html:()=>`<div class="gram"><h4>When?</h4>
 <div class="ig-cards"><div class="ig-card"><i>🕖</i><b>в семь часов</b><small>at 7 o’clock (в + acc.)</small></div><div class="ig-card"><i>📆</i><b>в понедельник</b><small>on Monday (в + acc.)</small></div><div class="ig-card"><i>🗓</i><b>в мае</b><small>in May (в + prep.)</small></div><div class="ig-card"><i>📌</i><b>пятого мая</b><small>on 5 May (genitive, no preposition)</small></div><div class="ig-card"><i>🕰</i><b>в 1995 году</b><small>in 1995 (в + prep.)</small></div><div class="ig-card"><i>❄️</i><b>зимой</b><small>in winter (instrumental, no preposition)</small></div></div></div>`,
 qs:[{q:'“on 5 May”',o:['пятого мая','в пятое мая','пятое мая','на пятом мае'],a:'пятого мая'},{q:'“in May”',o:['в мае','в май','мая','маем'],a:'в мае'},{q:'“in winter”',o:['зимой','в зиме','на зиму','зима'],a:'зимой'}]},
/* ===== VERBS ===== */
{id:'conjug',ch:'verb',icon:'⚙️',ru:'Два спряжения',en:'Two conjugation patterns',lv:'A1',lessons:'9',
 html:()=>`<div class="gram"><h4>-ешь or -ишь?</h4>
 <div class="tw"><table class="gt"><tr><th></th><th>📗 I · читать</th><th>📕 II · говорить</th></tr>
 <tr><td>я</td><td>чита<b>ю</b></td><td>говор<b>ю</b></td></tr><tr><td>ты</td><td>чита<b>ешь</b></td><td>говор<b>ишь</b></td></tr><tr><td>он / она</td><td>чита<b>ет</b></td><td>говор<b>ит</b></td></tr><tr><td>мы</td><td>чита<b>ем</b></td><td>говор<b>им</b></td></tr><tr><td>вы</td><td>чита<b>ете</b></td><td>говор<b>ите</b></td></tr><tr><td>они</td><td>чита<b>ют</b></td><td>говор<b>ят</b></td></tr></table></div>
 <div class="ig-memo"><i>🔍</i><p>Most <b>-ить</b> verbs are type II; most <b>-ать / -ять</b> verbs are type I. Learn the я and ты forms of every new verb.</p></div></div>`,
 qs:[{q:'они ___ (говорить)',o:['говорят','говорют','говорит','говорим'],a:'говорят'},{q:'ты ___ (знать)',o:['знаешь','знаишь','знаем','знает'],a:'знаешь'},{q:'Type of «смотреть»',o:['II (-ишь)','I (-ешь)','irregular','reflexive'],a:'II (-ишь)'}]},
{id:'aspect',ch:'verb',icon:'🔁',ru:'Вид глагола',en:'Aspect: НСВ & СВ',lv:'A2–B1',lessons:'18, 34',
 html:()=>`<div class="gram"><h4>Process or result?</h4>
 <div class="ig-vs"><div><h5>🔁 НСВ</h5><p>process · habit · duration · fact</p><p>читал, буду читать, читай!</p></div><div><h5>✅ СВ</h5><p>result · one time · sequence</p><p>прочитал, прочитаю, прочитай!</p></div></div>
 <div class="ig-time"><span><small>past</small>читал / прочитал</span><span class="now"><small>present</small>читаю (НСВ only!)</span><span class="fut"><small>future</small>буду читать / прочитаю</span></div>
 <div class="ig-cards"><div class="ig-card"><b>делать → сделать</b></div><div class="ig-card"><b>писать → написать</b></div><div class="ig-card"><b>покупать → купить</b></div><div class="ig-card"><b>говорить → сказать</b></div><div class="ig-card"><b>брать → взять</b></div></div></div>`,
 qs:[{q:'СВ verbs have no…',o:['present tense','past tense','future tense','imperative'],a:'present tense'},{q:'Я ___ эту книгу два раза (finished twice).',o:['прочитал','читал бы','читаю','прочитаю'],a:'прочитал'},{q:'Perfective partner of «брать»',o:['взять','побрать','забрать','брать'],a:'взять'}]},
{id:'motion',ch:'verb',icon:'🚶',ru:'Глаголы движения',en:'Verbs of motion: one way vs many ways',lv:'A2',lessons:'14, 20',
 html:()=>`<div class="gram"><h4>Two verbs for every way of moving</h4>
 <div class="ig-tldr"><b>Unidirectional</b> = one trip in one direction, now. <b>Multidirectional</b> = round trips, habits, wandering.</div>
 <div class="tw"><table class="gt"><tr><th></th><th>➡️ one direction</th><th>🔄 round trip / habit</th></tr>
 <tr><td>🚶 walk</td><td>идти</td><td>ходить</td></tr><tr><td>🚗 ride</td><td>ехать</td><td>ездить</td></tr><tr><td>✈️ fly</td><td>лететь</td><td>летать</td></tr><tr><td>🏃 run</td><td>бежать</td><td>бегать</td></tr><tr><td>📦 carry</td><td>нести</td><td>носить</td></tr><tr><td>👶 lead</td><td>вести</td><td>водить</td></tr></table></div>
 <div class="ig-vs"><div><h5>➡️ now, one way</h5><p>Я <b class="hl">иду</b> в магазин.</p></div><div><h5>🔄 every day</h5><p>Я <b class="hl">хожу</b> в спортзал.</p></div></div></div>`,
 qs:[{q:'Каждый год мы ___ в Турцию.',o:['ездим','едем','идём','ходим'],a:'ездим'},{q:'Смотри, самолёт ___ !',o:['летит','летает','едет','ходит'],a:'летит'},{q:'Вчера я ___ в театр (and came back).',o:['ходил','шёл','иду','пойду'],a:'ходил'}]},
{id:'prefix',ch:'verb',icon:'🧩',ru:'Приставки движения',en:'Motion prefixes',lv:'B1',lessons:'33',
 html:()=>`<div class="gram"><h4>Prefix = arrow</h4>
 <div class="ig-cards"><div class="ig-card n"><i>➡️🏠</i><b>при-</b><small>arrive</small></div><div class="ig-card f"><i>🏠➡️</i><b>у-</b><small>leave</small></div><div class="ig-card m"><i>🚪⤵️</i><b>в-</b><small>in</small></div><div class="ig-card m"><i>🚪⤴️</i><b>вы-</b><small>out</small></div><div class="ig-card hl"><i>↪️</i><b>за-</b><small>drop in</small></div><div class="ig-card pl"><i>↔️</i><b>пере-</b><small>across</small></div><div class="ig-card"><i>🏁</i><b>до-</b><small>as far as</small></div><div class="ig-card"><i>⇢</i><b>под-</b><small>up to</small></div><div class="ig-card"><i>⇠</i><b>от-</b><small>away</small></div><div class="ig-card"><i>🔄</i><b>об(о)-</b><small>around</small></div></div>
 <div class="ig-row"><span class="ig-chip">прийти / приходить</span><span class="ig-chip">приехать / приезжать</span><span class="ig-chip">прилететь / прилетать</span></div></div>`,
 qs:[{q:'“to cross the road”',o:['перейти дорогу','уйти дорогу','зайти дорогу','дойти дорогу'],a:'перейти дорогу'},{q:'“to drop in at a café”',o:['зайти в кафе','выйти в кафе','перейти в кафе','отойти в кафе'],a:'зайти в кафе'},{q:'Opposite of «прийти»',o:['уйти','войти','дойти','зайти'],a:'уйти'}]},
{id:'imper',ch:'verb',icon:'📣',ru:'Повелительное наклонение',en:'The imperative',lv:'A2',lessons:'23',
 html:()=>`<div class="gram"><h4>Build a command in 3 steps</h4>
 <ol class="ig-steps"><li>они-form: чита<b>ют</b> · пиш<b>ут</b> · встан<b>ут</b></li><li>Stem ends in a vowel → <b>-й</b>: читай · consonant → <b>-и</b>: пиши (or <b>-ь</b> if stress is on the stem: встань)</li><li>Polite / plural: add <b>-те</b>: читайте, пишите, встаньте</li></ol>
 <div class="ig-cards"><div class="ig-card hl"><i>🤝</i><b>давай(те)</b><small>let’s</small></div><div class="ig-card f"><i>🚫</i><b>не + НСВ</b><small>Не звони! Не кури!</small></div><div class="ig-card n"><i>⚠️</i><b>не + СВ = warning</b><small>Не упади! Не забудь!</small></div></div></div>`,
 qs:[{q:'Imperative of «писать» (ты)',o:['пиши','писай','пишь','напиши бы'],a:'пиши'},{q:'Polite “Sit down!”',o:['Садитесь!','Сидите!','Садись!','Сесть!'],a:'Садитесь!'},{q:'“Don’t call!”',o:['Не звони!','Не позвони!','Не звонить ты!','Не звонишь!'],a:'Не звони!'}]},
{id:'reflex',ch:'verb',icon:'🔄',ru:'Глаголы на -ся',en:'Reflexive -ся verbs',lv:'A1–A2',lessons:'9, 32',
 html:()=>`<div class="gram"><h4>Four jobs of -ся</h4>
 <div class="ig-cards"><div class="ig-card"><i>🪞</i><b>to oneself</b><small>умываться — to wash (oneself)</small></div><div class="ig-card"><i>🤝</i><b>each other</b><small>встречаться, переписываться</small></div><div class="ig-card"><i>📱</i><b>by itself</b><small>Телефон сломался.</small></div><div class="ig-card"><i>🏭</i><b>passive</b><small>Дом строится.</small></div></div>
 <div class="ig-row"><span class="ig-chip">я учу<b>сь</b><small>after a vowel: -сь</small></span><span class="ig-chip">он учит<b>ся</b><small>after a consonant: -ся</small></span></div></div>`,
 qs:[{q:'я ___ (заниматься)',o:['занимаюсь','занимаюся','занимаюсе','занимаю'],a:'занимаюсь'},{q:'«Мы часто встречаемся» means…',o:['we often meet each other','we often meet ourselves','we are often met','we often meet them'],a:'we often meet each other'},{q:'The door opened (by itself).',o:['Дверь открылась.','Дверь открыла.','Дверь открыли.','Дверь открыта ся.'],a:'Дверь открылась.'}]},
{id:'cond',ch:'verb',icon:'🦄',ru:'Условное наклонение',en:'Conditional: бы',lv:'B1',lessons:'36',
 html:()=>`<div class="gram"><h4>Past form + бы</h4>
 <div class="ig-row"><span class="ig-chip hl">Если бы</span><span class="ig-chip">я знал,</span><span class="ig-chip">я бы</span><span class="ig-chip">помог.</span></div>
 <div class="ig-cards"><div class="ig-card"><i>🌈</i><b>Хорошо бы…</b><small>It would be nice…</small></div><div class="ig-card"><i>🧭</i><b>Я бы на твоём месте…</b><small>If I were you…</small></div><div class="ig-card"><i>🙏</i><b>Не могли бы вы…?</b><small>Could you…?</small></div></div></div>`,
 qs:[{q:'Если бы у меня была машина, я ___ на дачу.',o:['поехал бы','поеду','еду','поехать бы'],a:'поехал бы'},{q:'Which is polite?',o:['Не могли бы вы помочь?','Помогай!','Ты поможешь?','Помощь!'],a:'Не могли бы вы помочь?'},{q:'«бы» goes with…',o:['the past form','the present form','the infinitive only','the future form'],a:'the past form'}]},
/* ===== CONJUNCTIONS ===== */
{id:'connect',ch:'conj',icon:'🔗',ru:'Как соединять предложения',en:'Connecting ideas',lv:'A2–B1',lessons:'35, 41, 47, 48',
 html:()=>`<div class="gram"><h4>Your connector toolbox</h4>
 <div class="ig-cards"><div class="ig-card"><i>💬</i><b>что</b><small>Я знаю, что он дома.</small></div><div class="ig-card"><i>🎯</i><b>чтобы</b><small>Я учусь, чтобы работать.</small></div><div class="ig-card"><i>👆</i><b>который</b><small>Друг, который живёт в Москве.</small></div><div class="ig-card"><i>❓</i><b>если</b><small>Если будет время, позвоню.</small></div><div class="ig-card"><i>⏰</i><b>когда</b><small>Когда я пришёл, все спали.</small></div><div class="ig-card"><i>➡️</i><b>потому что / поэтому</b><small>because / so</small></div><div class="ig-card"><i>⚖️</i><b>хотя</b><small>Хотя было поздно, …</small></div><div class="ig-card"><i>❔</i><b>ли</b><small>Не знаю, придёт ли он.</small></div></div>
 <div class="ig-memo"><i>✏️</i><p>Russian <b>always</b> puts a comma before что, чтобы, который, если, когда, потому что, хотя.</p></div></div>`,
 qs:[{q:'Я не знаю, ___ он придёт. (whether)',o:['придёт ли','если','что ли','чтобы'],a:'придёт ли'},{q:'Мама хочет, ___ я позвонил.',o:['чтобы','что','который','если'],a:'чтобы'},{q:'Before «что» you always write…',o:['a comma','a dash','nothing','a full stop'],a:'a comma'}]}
]};
