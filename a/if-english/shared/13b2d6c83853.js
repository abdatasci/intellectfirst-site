
const DATA = {"1": {"title": "Animals", "words": [["bat", "It flies at night and sleeps upside down", "летучая мышь", "летает ночью и спит вниз головой"], ["dolphin", "A clever sea animal that jumps and plays", "дельфин", "умное морское животное, которое прыгает и играет"], ["kangaroo", "An Australian animal that jumps; it has a pocket", "кенгуру", "австралийское животное, которое прыгает; у него есть сумка"], ["lion", "A big yellow cat; the king of animals", "лев", "большая жёлтая кошка; царь зверей"], ["panda", "A black and white bear that eats bamboo", "панда", "чёрно-белый медведь, который ест бамбук"], ["parrot", "A colourful bird that can talk", "попугай", "яркая птица, которая умеет говорить"], ["penguin", "A black and white bird that swims but can't fly", "пингвин", "чёрно-белая птица, которая плавает, но не летает"], ["rabbit", "A small animal with long ears", "кролик", "маленькое животное с длинными ушами"], ["shark", "A big fish with lots of sharp teeth", "акула", "большая рыба с множеством острых зубов"], ["whale", "The biggest animal in the sea", "кит", "самое большое животное в море"], ["bear", "A big brown animal that sleeps in winter", "медведь", "большое бурое животное, которое спит зимой"], ["cage", "A box where birds or animals live", "клетка", "ящик, где живут птицы или животные"], ["fur", "The soft hair on a cat or a bear", "мех", "мягкая шерсть у кошки или медведя"], ["wing", "Birds use these to fly", "крыло", "птицы используют их, чтобы летать"]]}, "2": {"title": "The body & the face", "words": [["back", "The part of your body behind you", "спина", "часть тела сзади"], ["neck", "Between your head and your body", "шея", "между головой и телом"], ["shoulder", "Where your arm joins your body", "плечо", "место, где рука соединяется с телом"], ["knee", "The middle of your leg; it bends", "колено", "середина ноги; оно сгибается"], ["stomach", "Where your food goes", "живот", "туда попадает еда"], ["tooth", "White and hard in your mouth; you brush it", "зуб", "белый и твёрдый во рту; его чистят"], ["teeth", "More than one tooth", "зубы", "больше одного зуба"], ["beard", "Hair on a man's chin", "борода", "волосы на подбородке у мужчины"], ["moustache", "Hair above a man's mouth", "усы", "волосы над губой у мужчины"], ["fair", "Light yellow hair", "светлый (о волосах)", "светло-жёлтые волосы"], ["curly", "Hair that is not straight", "кудрявый", "волосы, которые не прямые"], ["fat", "Not thin", "толстый", "не худой"], ["thin", "Not fat", "худой", "не толстый"], ["blond", "Yellow hair", "светловолосый, блондин", "жёлтые волосы"]]}, "3": {"title": "Clothes", "words": [["coat", "A long warm jacket for outside", "пальто", "длинная тёплая куртка для улицы"], ["helmet", "A hard hat for riding a bike", "шлем", "твёрдая шапка для езды на велосипеде"], ["pocket", "A small bag in your jeans for keys", "карман", "маленький мешочек в джинсах для ключей"], ["scarf", "You wear it round your neck", "шарф", "его носят вокруг шеи"], ["sweater", "A warm top made of wool", "свитер", "тёплая шерстяная кофта"], ["swimsuit", "You wear it in the pool", "купальник", "его носят в бассейне"], ["trousers", "Long clothes for your legs", "брюки", "длинная одежда для ног"], ["boots", "Big shoes for rain or snow", "сапоги", "большая обувь для дождя или снега"], ["gloves", "You wear them on your hands when it's cold", "перчатки", "их носят на руках, когда холодно"], ["umbrella", "It keeps you dry in the rain", "зонт", "он защищает от дождя"], ["tights", "Thin clothes for your legs, under a skirt", "колготки", "тонкая одежда для ног, под юбку"], ["T-shirt", "A top with short arms", "футболка", "кофта с короткими рукавами"], ["cap", "A small hat for sunny days", "кепка", "маленькая шапка для солнечных дней"], ["jeans", "Blue trousers", "джинсы", "синие брюки"]]}, "4": {"title": "Family & friends", "words": [["aunt", "Your mum's or dad's sister", "тётя", "сестра мамы или папы"], ["uncle", "Your mum's or dad's brother", "дядя", "брат мамы или папы"], ["cousin", "Your aunt's or uncle's child", "двоюродный брат / сестра", "ребёнок тёти или дяди"], ["grandparents", "Your grandma and grandpa", "бабушка и дедушка", "твои бабушка и дедушка"], ["grandson", "A boy: his grandparents love him", "внук", "мальчик: его любят бабушка и дедушка"], ["granddaughter", "A girl: her grandparents love her", "внучка", "девочка: её любят бабушка и дедушка"], ["parents", "Your mum and dad", "родители", "твои мама и папа"], ["daughter", "A girl child of a mum and dad", "дочь", "ребёнок-девочка у мамы и папы"], ["son", "A boy child of a mum and dad", "сын", "ребёнок-мальчик у мамы и папы"], ["baby", "A very young child", "малыш, младенец", "очень маленький ребёнок"], ["kid", "A child", "ребёнок", "ребёнок"], ["people", "More than one person", "люди", "больше одного человека"], ["best friend", "The friend you like most", "лучший друг", "друг, который нравится больше всех"], ["husband", "The man a woman is married to", "муж", "мужчина, за которым замужем женщина"]]}, "5": {"title": "Food & drink", "words": [["cheese", "Yellow food made from milk", "сыр", "жёлтая еда из молока"], ["soup", "Hot food you eat with a spoon", "суп", "горячая еда, которую едят ложкой"], ["salad", "Cold vegetables like lettuce and tomatoes", "салат", "холодные овощи, например, листья салата и помидоры"], ["sandwich", "Two pieces of bread with food in the middle", "бутерброд, сэндвич", "два куска хлеба с едой посередине"], ["pancake", "Flat round food you eat with honey", "блин", "плоская круглая еда, которую едят с мёдом"], ["noodles", "Long thin food from China", "лапша", "длинная тонкая еда из Китая"], ["vegetables", "Carrots, peas and potatoes", "овощи", "морковь, горох и картофель"], ["bottle", "Water or juice comes in it", "бутылка", "в ней бывает вода или сок"], ["bowl", "You eat cereal or soup from it", "миска", "из неё едят хлопья или суп"], ["cup", "You drink tea from it", "чашка", "из неё пьют чай"], ["glass", "You drink water from it", "стакан", "из него пьют воду"], ["hungry", "You want to eat", "голодный", "хочешь есть"], ["thirsty", "You want to drink", "испытывающий жажду", "хочешь пить"], ["breakfast", "Your first meal in the morning", "завтрак", "первая еда утром"]]}, "6": {"title": "The home", "words": [["balcony", "A small place outside an upstairs window", "балкон", "небольшое место снаружи у окна верхнего этажа"], ["basement", "A room under the house", "подвал", "комната под домом"], ["blanket", "A warm cover for your bed", "одеяло", "тёплое покрывало для кровати"], ["downstairs", "On the floor below", "внизу", "на этаже ниже"], ["upstairs", "On the floor above", "наверху", "на этаже выше"], ["floor", "You walk on it in a room", "пол", "по нему ходят в комнате"], ["lift", "It takes you up and down in a tall building", "лифт", "он возит вверх и вниз в высоком доме"], ["roof", "The top of a house", "крыша", "верх дома"], ["seat", "Something you sit on", "сиденье", "то, на чём сидят"], ["shower", "You wash under it standing up", "душ", "под ним моются стоя"], ["stairs", "You walk up them", "лестница", "по ней поднимаются"], ["toothbrush", "You clean your teeth with it", "зубная щётка", "ею чистят зубы"], ["towel", "You dry yourself with it", "полотенце", "им вытираются"], ["garden", "Grass and flowers next to your house", "сад", "трава и цветы рядом с домом"]]}, "7": {"title": "Health", "words": [["cold", "You sneeze and your nose runs", "простуда", "чихаешь, и течёт из носа"], ["cough", "A loud noise from your throat when you're ill", "кашель", "громкий звук из горла, когда болеешь"], ["earache", "A pain in your ear", "боль в ухе", "боль в ухе"], ["headache", "A pain in your head", "головная боль", "боль в голове"], ["stomach-ache", "A pain in your tummy", "боль в животе", "боль в животике"], ["toothache", "A pain in your tooth", "зубная боль", "боль в зубе"], ["temperature", "When you are very hot because you're ill", "температура (жар)", "когда очень жарко, потому что болеешь"], ["doctor", "She helps you when you're ill", "врач", "она помогает, когда ты болеешь"], ["nurse", "He helps doctors at the hospital", "медбрат, медсестра", "он помогает врачам в больнице"], ["hospital", "A big building for sick people", "больница", "большое здание для больных людей"], ["matter", "What's the ___? = What's wrong?", "дело (What's the matter?)", "What's the ___? = Что случилось?"], ["better", "Not ill any more", "лучше (выздоровел)", "больше не болеешь"], ["fall over", "Go down onto the floor by accident", "упасть", "случайно упасть на пол"], ["hurt", "When part of your body has pain", "болеть, ушибить", "когда часть тела болит"]]}, "8": {"title": "Places & directions", "words": [["bank", "You keep your money here", "банк", "здесь хранят деньги"], ["bus station", "Where buses start and stop", "автовокзал", "место, где автобусы начинают и заканчивают путь"], ["café", "You drink and eat cake here", "кафе", "здесь пьют и едят пирожные"], ["car park", "A place to leave your car", "парковка", "место, где оставляют машину"], ["cinema", "You watch films here", "кинотеатр", "здесь смотрят фильмы"], ["library", "You borrow books here", "библиотека", "здесь берут книги"], ["market", "You buy fruit and vegetables outside here", "рынок", "здесь на улице покупают фрукты и овощи"], ["shopping centre", "A big building with lots of shops", "торговый центр", "большое здание с множеством магазинов"], ["sports centre", "You play sport and swim here", "спортивный центр", "здесь занимаются спортом и плавают"], ["square", "An open place in the middle of a town", "площадь", "открытое место в центре города"], ["swimming pool", "You swim here", "бассейн", "здесь плавают"], ["left", "Not right", "левый, налево", "не правый"], ["straight on", "Don't turn", "прямо", "не поворачивай"], ["near", "Not far", "близко", "не далеко"]]}, "9": {"title": "School", "words": [["break", "A short time to play between lessons", "перемена", "короткое время для игр между уроками"], ["homework", "School work you do at home", "домашнее задание", "школьная работа, которую делают дома"], ["teacher", "The person who helps you learn", "учитель", "человек, который помогает тебе учиться"], ["classmate", "A friend in your class", "одноклассник", "друг в твоём классе"], ["dictionary", "A book: it tells you what words mean", "словарь", "книга, которая говорит, что значат слова"], ["email", "A message you send on a computer", "электронное письмо", "сообщение, которое отправляют с компьютера"], ["internet", "Websites on your computer", "интернет", "сайты на твоём компьютере"], ["letter", "A, B and C are these", "буква", "A, B и C — это они"], ["mistake", "Something that is wrong", "ошибка", "то, что неправильно"], ["page", "One side of paper in a book", "страница", "одна сторона листа в книге"], ["question", "What? Where? and Who? start one", "вопрос", "с What? Where? и Who? он начинается"], ["answer", "What you say after a question", "ответ", "то, что говорят после вопроса"], ["text", "Words you write or read", "текст", "слова, которые пишут или читают"], ["website", "Pages on the internet", "сайт", "страницы в интернете"]]}, "10": {"title": "Sports & leisure", "words": [["band", "A group of people who play music", "музыкальная группа", "группа людей, которые играют музыку"], ["comic", "A magazine with funny pictures and stories", "комикс", "журнал со смешными картинками и историями"], ["dance", "Move your body to music", "танцевать", "двигать телом под музыку"], ["hop", "Jump on one leg", "прыгать на одной ноге", "прыгать на одной ноге"], ["ice skates", "Shoes with a blade for skating on ice", "коньки", "обувь с лезвием для катания по льду"], ["kick", "Hit with your foot", "пинать, ударить ногой", "ударить ногой"], ["skip", "Jump over a rope", "прыгать через скакалку", "прыгать через верёвку"], ["roller skates", "Shoes with wheels", "ролики", "обувь с колёсиками"], ["sail", "Travel on water in a boat with wind", "плыть под парусом", "путешествовать по воде на лодке с ветром"], ["swing", "A seat on ropes in the park", "качели", "сиденье на верёвках в парке"], ["team", "A group of players", "команда", "группа игроков"], ["goal", "You score this in football", "гол", "его забивают в футболе"], ["hobby", "Something you like doing in your free time", "хобби", "то, что нравится делать в свободное время"], ["picnic", "A meal outside in the park", "пикник", "еда на улице в парке"]]}, "11": {"title": "Time", "words": [["week", "Seven days", "неделя", "семь дней"], ["weekend", "Saturday and Sunday", "выходные", "суббота и воскресенье"], ["Monday", "The day after Sunday", "понедельник", "день после воскресенья"], ["Friday", "The day before Saturday", "пятница", "день перед субботой"], ["yesterday", "The day before today", "вчера", "день перед сегодняшним"], ["today", "This day", "сегодня", "этот день"], ["tomorrow", "The day after today", "завтра", "день после сегодняшнего"], ["after", "Later than", "после", "позже, чем"], ["before", "Earlier than", "до, перед", "раньше, чем"], ["always", "Every time", "всегда", "каждый раз"], ["never", "Not one time", "никогда", "ни разу"], ["sometimes", "Not always, not never", "иногда", "не всегда, но и не никогда"], ["often", "Many times", "часто", "много раз"], ["o'clock", "It's three ___ (3:00)", "ровно (о времени)", "It's three ___ (3:00)"]]}, "12": {"title": "Transport", "words": [["bus", "A big car for lots of people", "автобус", "большая машина для многих людей"], ["helicopter", "It flies; it has blades on the top", "вертолёт", "он летает; у него лопасти сверху"], ["motorbike", "A bike with an engine", "мотоцикл", "велосипед с мотором"], ["ticket", "You buy it to get on a bus or train", "билет", "его покупают, чтобы сесть в автобус или поезд"], ["taxi", "You pay the driver to take you somewhere", "такси", "платишь водителю, чтобы он тебя отвёз"], ["tractor", "A farmer drives it in the fields", "трактор", "фермер водит его в полях"], ["train", "It goes on rails", "поезд", "он едет по рельсам"], ["boat", "It goes on water", "лодка", "она плывёт по воде"], ["plane", "It flies people to other countries", "самолёт", "он перевозит людей в другие страны"], ["driver", "The person who drives", "водитель", "человек, который водит"], ["passenger", "A person who travels in a car or bus", "пассажир", "человек, который едет в машине или автобусе"], ["bicycle", "It has two wheels and you ride it", "велосипед", "у него два колеса, на нём катаются"], ["ride", "Go on a bike or a horse", "ехать верхом, кататься", "ехать на велосипеде или лошади"], ["station", "Trains stop here", "станция, вокзал", "здесь останавливаются поезда"]]}, "13": {"title": "Weather", "words": [["cloud", "White or grey; it's in the sky", "облако", "белое или серое; оно в небе"], ["rain", "Water that falls from the sky", "дождь", "вода, которая падает с неба"], ["rainbow", "Seven colours in the sky after rain", "радуга", "семь цветов в небе после дождя"], ["snow", "White and cold; it falls in winter", "снег", "белый и холодный; падает зимой"], ["sun", "It's hot and yellow in the sky", "солнце", "оно горячее и жёлтое в небе"], ["wind", "Moving air", "ветер", "движущийся воздух"], ["cloudy", "When the sky is grey and you can't see the sun", "облачно", "когда небо серое и не видно солнца"], ["sunny", "Bright and warm; good for the beach", "солнечно", "ярко и тепло; хорошо для пляжа"], ["windy", "When trees move and hats fly away", "ветрено", "когда деревья качаются и шапки улетают"], ["weather", "Rain, sun and snow", "погода", "дождь, солнце и снег"], ["hot", "Not cold", "жаркий", "не холодный"], ["cold", "Not hot", "холодный", "не жаркий"], ["wet", "Not dry", "мокрый", "не сухой"], ["dry", "Not wet", "сухой", "не мокрый"]]}, "14": {"title": "Work", "words": [["clown", "A funny person in the circus", "клоун", "смешной человек в цирке"], ["cook", "A person who makes food in a restaurant", "повар", "человек, который готовит еду в ресторане"], ["dentist", "A doctor for your teeth", "стоматолог", "врач для зубов"], ["farmer", "A person who works on a farm", "фермер", "человек, который работает на ферме"], ["film star", "A famous actor", "кинозвезда", "известный актёр"], ["pirate", "A man who steals from ships", "пират", "человек, который грабит корабли"], ["pop star", "A famous singer", "поп-звезда", "известный певец"], ["teacher", "A person who works in a school", "учитель", "человек, который работает в школе"], ["driver", "A person who drives a bus or taxi", "водитель", "человек, который водит автобус или такси"], ["nurse", "A person who helps doctors", "медсестра, медбрат", "человек, который помогает врачам"], ["job", "The work you do", "работа", "дело, которым ты занимаешься"], ["work", "What you do to get money", "работать", "то, что делают, чтобы получать деньги"], ["office", "A room where people work at desks", "офис", "комната, где люди работают за столами"], ["busy", "With lots to do", "занятой", "много дел"]]}, "15": {"title": "The world around us", "words": [["beach", "Sand next to the sea", "пляж", "песок рядом с морем"], ["city", "A very big town", "город", "очень большой город"], ["countryside", "Fields and farms, not the town", "сельская местность", "поля и фермы, не город"], ["field", "Grass on a farm", "поле", "трава на ферме"], ["forest", "Lots of trees", "лес", "много деревьев"], ["grass", "It's green and grows in the park", "трава", "она зелёная и растёт в парке"], ["island", "Land with water all around", "остров", "земля, со всех сторон окружённая водой"], ["lake", "A big area of water with land around it", "озеро", "большой водоём с землёй вокруг"], ["leaf", "Green and on a tree", "лист", "зелёный и растёт на дереве"], ["mountain", "A very high hill", "гора", "очень высокий холм"], ["river", "Water that goes to the sea", "река", "вода, которая течёт в море"], ["sky", "Blue; you see the sun in it", "небо", "голубое; в нём видно солнце"], ["village", "A very small town", "деревня", "очень маленький посёлок"], ["waterfall", "Water falling from high rocks", "водопад", "вода, падающая с высоких скал"]]}, "16": {"title": "Actions & adjectives", "words": [["catch", "Get a ball with your hands", "ловить", "поймать мяч руками"], ["climb", "Go up a tree or a mountain", "лазать, взбираться", "подниматься на дерево или гору"], ["cry", "Tears come from your eyes", "плакать", "из глаз текут слёзы"], ["drop", "Let something fall", "уронить", "дать чему-то упасть"], ["laugh", "What you do when something is funny", "смеяться", "то, что делаешь, когда смешно"], ["shout", "Speak very loudly", "кричать", "говорить очень громко"], ["whisper", "Speak very quietly", "шептать", "говорить очень тихо"], ["brave", "Not afraid", "храбрый", "не боится"], ["clever", "Good at thinking", "умный", "хорошо думает"], ["dangerous", "It can hurt you", "опасный", "может причинить вред"], ["loud", "Very noisy", "громкий", "очень шумный"], ["quiet", "Not noisy", "тихий", "не шумный"], ["strong", "Can carry heavy things", "сильный", "может нести тяжёлые вещи"], ["weak", "Not strong", "слабый", "не сильный"]]}};
const MODES = [
  ['alias','Alias','team'], ['charades','Charades','team'], ['taboo','Taboo','team'],
  ['cards','Flashcards','solo'], ['quiz','Quick Quiz','solo'], ['match','Match','solo'], ['spell','Spell It','solo'], ['blocks','Blocks','solo']
];
const $ = s => document.querySelector(s);
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
function save(k, v){ try{ localStorage.setItem('ifarenaMOV:'+k, JSON.stringify(v)); }catch(e){} }
function load(k, d){ try{ const v = localStorage.getItem('ifarenaMOV:'+k); return v ? JSON.parse(v) : d; }catch(e){ return d; } }
const hashLesson = (location.hash || '').replace('#','').toUpperCase();
let lesson = DATA[hashLesson] ? hashLesson : load('lesson', Object.keys(DATA)[0]);
if (!DATA[lesson]) lesson = Object.keys(DATA)[0];
let mode = load('mode', 'alias');
if (!MODES.some(m => m[0] === mode)) mode = 'alias';
const st = { teams:[{name:'Team A',pts:0},{name:'Team B',pts:0}], turn:0, time:60, timer:null, deck:[], cur:null, running:false, hint:false };
let fc = { i:0, list:[], known:0, lesson:null }, qz = null, mt = null, sp = null, bk = null;
let clock = null;
const stopClock = () => { clearInterval(clock); clock = null; };
function esc(s){ return String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
const words = () => DATA[lesson].words;

function chips(){
  const L = $('#lessons'), M = $('#modes');
  L.querySelectorAll('button').forEach(b => b.remove()); M.querySelectorAll('button,.lbl2').forEach(b => b.remove());
  Object.keys(DATA).forEach(k => { const b = document.createElement('button'); b.textContent = k + ' · ' + DATA[k].title; b.className = k === lesson ? 'on' : ''; b.setAttribute('aria-pressed', k === lesson); b.onclick = () => { lesson = k; save('lesson', k); reset(); }; L.appendChild(b); });
  let grp = '';
  MODES.forEach(([k, n, g]) => {
    if (g !== grp){ grp = g; const s = document.createElement('span'); s.className = 'lbl2'; s.textContent = g === 'team' ? 'Teams:' : 'Solo:'; M.appendChild(s); }
    const b = document.createElement('button'); b.textContent = n; b.className = k === mode ? 'on' : ''; b.setAttribute('aria-pressed', k === mode); b.onclick = () => { mode = k; save('mode', k); reset(); }; M.appendChild(b);
  });
}
function reset(){
  clearInterval(st.timer); st.running = false; st.over = false; st.deck = shuffle(words()); st.time = 60; st.hint = false;
  stopClock(); qz = null; mt = null; sp = null; bk = null;
  chips(); render();
}
function next(){ if (!st.deck.length) return false; st.cur = st.deck.pop(); st.hint = false; return true; }
function render(){ ({alias:team, charades:team, taboo:team, cards:flash, quiz:quiz, match:match, spell:spell, blocks:blocks})[mode](); }

// ---------- Alias / Charades (two teams) ----------
// ---------- Taboo: forbidden-word helpers ----------
const TABOO_STOP = new Set(('a an the and or but if so as at by for from in into of off on onto out over to up with without about after before under than then that this these those there here what which who whom whose when where why how it its it’s you your yours yourself they them their we our us he him his she her i me my mine is are was were be been being am do does did done have has had having can could will would shall should may might must not no yes very really just also too only even still usually often sometimes always never e.g. eg etc something someone somebody anything anyone thing things way kind type sort lot lots get gets got getting go goes going went one ones two other others another each every all some any more most much many such same both own make makes made use used using like e g shows show says say between includes include period describes means mean usually able etc making asks ask because unable when while').split(' '));
function tabooRoot(x){ return String(x).toLowerCase().replace(/[^a-z]/g,'').slice(0,5); }
function tabooWords(w){
  const key = (typeof lesson !== 'undefined' ? lesson : '') + '|' + String(w[0]).toLowerCase();
  if (typeof TABOO_LISTS !== 'undefined' && TABOO_LISTS[key]) return TABOO_LISTS[key];
  const target = String(w[0]).toLowerCase().split(/[^a-z]+/).filter(t => t.length > 2).map(tabooRoot);
  const seen = new Set(), out = [];
  String(w[1] || '').replace(/[’']/g, "'").split(/[^A-Za-z'\-]+/).forEach((o, i) => {
    o = o.replace(/^['\-]+|['\-]+$/g, '').replace(/'s$/, ''); let t = o.toLowerCase(); if (t === o.toUpperCase().toLowerCase() && o !== o.toLowerCase() && i === 0) o = t;
    if (t.length < 3 || /n't$/.test(t) || TABOO_STOP.has(t) || seen.has(t)) return;
    const r = tabooRoot(t); if (target.some(x => x && (x === r || r.startsWith(x) || x.startsWith(r)))) return;
    seen.add(t); out.push({ t: o, i, s: t.length + (i < 4 ? 1 : 0) });
  });
  return out.sort((a, b) => b.s - a.s).slice(0, 3).sort((a, b) => a.i - b.i).map(o => o.t);
}
function tabooBox(w){
  const list = tabooWords(w);
  return `<div class="taboo" role="note" aria-label="Taboo words: do not say these"><div class="tl">DON’T SAY: the word itself${list.length ? ' or…' : ''}</div>${list.length ? `<ul>${list.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}</div>`;
}
(function(){ const css = document.createElement('style'); css.textContent = `.taboo{max-width:560px;margin:10px auto 0;border:2px dashed var(--bad);border-radius:16px;padding:10px 14px 12px;text-align:center}
.taboo .tl{font-size:13px;font-weight:800;letter-spacing:.08em;color:var(--bad)}
.taboo ul{list-style:none;margin:8px 0 0;padding:0;display:flex;flex-wrap:wrap;gap:8px;justify-content:center}
.taboo li{font-weight:800;font-size:clamp(18px,3.2vw,26px);padding:4px 14px;border-radius:999px;background:rgba(180,83,60,.12);color:var(--fg);overflow-wrap:anywhere}`; document.head.appendChild(css); })();

function team(){
  const ch = mode === 'charades', tb = mode === 'taboo', S = $('#stage');
  if (st.over){ const [a,b] = st.teams, win = a.pts === b.pts ? 'It’s a draw!' : (a.pts > b.pts ? a.name : b.name) + ' wins!';
    S.innerHTML = `<div class="mode-tag">GAME OVER · ALL ${words().length} WORDS PLAYED</div><div class="word">${esc(win)}</div>
    <div class="teams"><div class="team"><div class="tbtns">${esc(a.name)}</div><div class="pts">${a.pts}</div></div><div></div><div class="team"><div class="tbtns">${esc(b.name)}</div><div class="pts">${b.pts}</div></div></div>
    <div class="row"><button class="big gold" id="ng">New game</button></div>`;
    $('#ng').onclick = () => { st.teams.forEach(t => t.pts = 0); st.turn = 0; reset(); }; return; }
  const box = i => `<div class="team ${i===st.turn?'active':''}" data-pick="${i}">
      <input id="team${i}" aria-label="Team ${i+1} name" value="${esc(st.teams[i].name)}" data-i="${i}">
      <div class="pts">${st.teams[i].pts}</div>
      <div class="tbtns"><button class="sm" data-adj="${i}" data-v="1" aria-label="Add a point to ${esc(st.teams[i].name)}">+1</button><button class="sm" data-adj="${i}" data-v="-1" aria-label="Take a point from ${esc(st.teams[i].name)}">−1</button>
      ${st.running ? '' : `<button class="sm ${i===st.turn?'gold':''}" data-turn="${i}" aria-pressed="${i===st.turn}">${i===st.turn?'Playing next':'Play this team'}</button>`}</div>
    </div>`;
  S.innerHTML = `<p class="how">${tb ? 'Taboo: explain the word WITHOUT saying it or any of the red TABOO words (no translation, no gestures!). Your team guesses.' : ch ? 'Charades: act out the word with NO talking. Your team guesses.' : 'Alias: explain the word WITHOUT saying it (no translation!). Your team guesses.'} 60 seconds per turn. Got it = +1${ch ? '' : tb ? ', said a taboo word = −1, pass = 0' : ', skip = −1'}. Each word is used only once, by one team: the game ends when all words are played.</p>
  <div class="stats"><span>Words left: ${st.deck.length + (st.running ? 1 : 0)} / ${words().length}</span></div>
  <div class="teams">${box(0)}<div class="timer ${st.time<=10?'low':''}" id="tm">${st.time}</div>${box(1)}</div>
  ${st.running ? `<div class="mode-tag">${esc(st.teams[st.turn].name.toUpperCase())} · ${ch?'ACT IT!':tb?'NO TABOO WORDS!':'EXPLAIN IT!'}</div>
    <div class="word">${esc(st.cur[0])}</div>${tb ? tabooBox(st.cur) : ''}<div class="hint">${st.hint ? esc(st.cur[1]) : ''}</div>
    <div class="row"><button class="big go" id="ok">Got it! +1</button>${tb ? '<button class="big no" id="tbx">Taboo! −1</button><button class="big" id="sk">Pass</button>' : `<button class="big ${ch?'':'no'}" id="sk">Skip ${ch?'':'−1'}</button>`}<button class="big" id="hn">${st.hint?'Hide':'Show'} hint (explainer only)</button><button class="big" id="end">End turn</button></div>`
  : `<div class="word" style="font-size:40px">${esc(st.teams[st.turn].name)}, get ready!</div><div class="hint">One player comes to the board and faces the class. Only they look at the screen.</div>
    <div class="row"><button class="big gold" id="start">Start ${esc(st.teams[st.turn].name)}’s 60-second turn</button><button class="big" id="sw">Switch to ${esc(st.teams[1-st.turn].name)}</button><button class="big" id="rs">Finish game</button></div>`}`;
  S.querySelectorAll('.team input').forEach(inp => {
    inp.oninput = e => { st.teams[+e.target.dataset.i].name = e.target.value || 'Team'; };
    inp.onclick = e => e.stopPropagation();
  });
  S.querySelectorAll('[data-adj]').forEach(b => b.onclick = e => { e.stopPropagation(); st.teams[+b.dataset.adj].pts += +b.dataset.v; team(); });
  S.querySelectorAll('[data-turn]').forEach(b => b.onclick = e => { e.stopPropagation(); st.turn = +b.dataset.turn; team(); });
  if (!st.running) S.querySelectorAll('[data-pick]').forEach(c => c.onclick = () => { st.turn = +c.dataset.pick; team(); });
  const gameOver = () => { clearInterval(st.timer); st.running = false; st.over = true; team(); };
  const endTurn = () => { clearInterval(st.timer); st.running = false; st.time = 60; st.turn = 1 - st.turn; if (!st.deck.length) st.over = true; team(); };
  if (st.running){
    $('#ok').onclick = () => { st.teams[st.turn].pts++; if (!next()) return gameOver(); team(); };
    if (tb) $('#tbx').onclick = () => { st.teams[st.turn].pts--; if (!next()) return gameOver(); team(); };
    $('#sk').onclick = () => { if (!ch && !tb) st.teams[st.turn].pts--; if (!next()) return gameOver(); team(); };
    $('#hn').onclick = () => { st.hint = !st.hint; team(); };
    $('#end').onclick = endTurn;
  } else {
    $('#start').onclick = () => { if (!st.deck.length) return gameOver(); st.running = true; st.time = 60; next(); team(); clearInterval(st.timer);
      st.timer = setInterval(() => { st.time--; const t = $('#tm'); if (t){ t.textContent = st.time; t.classList.toggle('low', st.time <= 10); } if (st.time <= 0) endTurn(); }, 1000); };
    $('#sw').onclick = () => { st.turn = 1 - st.turn; team(); };
    $('#rs').onclick = async () => { if (await (window.IFDialog ? IFDialog.confirm('Finish the game now and show the winner?') : true)) gameOver(); };
  }
}

// ---------- Flashcards ----------
function flash(){
  if (!fc.list.length || fc.lesson !== lesson) fc = { i:0, list:shuffle(words()), known:0, lesson, done:false };
  if (fc.done){ $('#stage').innerHTML = `<div class="mode-tag">DECK COMPLETE</div><div class="word">${fc.known} / ${fc.list.length}</div><div class="hint">words you know in ${esc(lesson)}</div><div class="row"><button class="big gold" id="ag">Play again</button></div>`; $('#ag').onclick = () => { fc = { i:0, list:[], known:0, lesson:null }; flash(); }; return; }
  const w = fc.list[fc.i];
  $('#stage').innerHTML = `<p class="how">Tap the card (or press Space) to flip it. Say the word aloud, then say a sentence with it.</p>
  <div class="flip" id="fl" tabindex="0" role="button" aria-label="Flip card"><div class="in"><div class="side front">${esc(w[0])}</div><div class="side back"><div class="bk">${esc(w[1])}${w[2]?`<div class="ruw" lang="ru">${esc(w[2])}</div>`:""}${w[3]?`<div class="rud" lang="ru">${esc(w[3])}</div>`:""}</div></div></div></div>
  <div class="stats"><span>Card ${fc.i+1} / ${fc.list.length}</span><span>I know it: ${fc.known}</span></div>
  <div class="row"><button class="big" id="pv">Back</button><button class="big go" id="kn">I know it</button><button class="big" id="nx">Still learning</button><button class="big" id="sh">Shuffle</button></div>`;
  const f = $('#fl'); f.onclick = () => f.classList.toggle('f'); f.onkeydown = e => { if (e.key === ' ' || e.key === 'Enter'){ e.preventDefault(); f.classList.toggle('f'); } };
  const mv = d => { if (fc.i + d >= fc.list.length){ fc.done = true; return flash(); } fc.i = Math.max(0, fc.i + d); flash(); };
  $('#pv').onclick = () => mv(-1); $('#nx').onclick = () => mv(1); $('#kn').onclick = () => { fc.known++; mv(1); };
  $('#sh').onclick = () => { fc.list = shuffle(fc.list); fc.i = 0; fc.known = 0; flash(); };
}

// ---------- Quick quiz ----------
function quiz(){
  const best = load('best:' + lesson, 0);
  if (!qz || qz.lesson !== lesson) qz = { lesson, n:0, score:0, streak:0, qs:shuffle(words()), answered:false };
  const S = $('#stage');
  if (qz.n >= qz.qs.length){
    if (qz.score > best) save('best:' + lesson, qz.score); try{ window.IFResults && window.IFResults.report({score:qz.score,label:'Quiz '+lesson+' · '+DATA[lesson].title}); }catch(e){}
    S.innerHTML = `<div class="word">${qz.score} points</div><div class="hint">Best score for ${lesson}: ${Math.max(best, qz.score)}</div><div class="row"><button class="big gold" id="ag">Play again</button></div>`;
    $('#ag').onclick = () => { qz = null; quiz(); }; return;
  }
  const q = qz.qs[qz.n];
  const opts = shuffle([q].concat(shuffle(words().filter(w => w !== q)).slice(0,3)));
  S.innerHTML = `<p class="how">Read the definition. Choose the word. Streaks give bonus points!</p>
  <div class="stats"><span>Question ${qz.n+1} / ${qz.qs.length}</span><span>Score: ${qz.score}</span><span>Streak: ${qz.streak}</span><span>Best: ${best}</span></div>
  <div class="def">${esc(q[1])}</div>
  <div class="opts">${opts.map((o,i)=>`<button data-i="${i}">${esc(o[0])}</button>`).join('')}</div>
  <div class="row" id="nxr"></div>`;
  S.querySelectorAll('.opts button').forEach(b => b.onclick = () => {
    if (qz.answered) return; qz.answered = true;
    const o = opts[+b.dataset.i];
    S.querySelectorAll('.opts button').forEach((x,i) => { if (opts[i] === q) x.classList.add('right'); });
    if (o === q){ qz.streak++; qz.score += 10 + (qz.streak > 1 ? 5 * (qz.streak - 1) : 0); } else { b.classList.add('wrong'); qz.streak = 0; }
    $('#nxr').innerHTML = '<button class="big gold" id="nq">Next question</button>';
    $('#nq').onclick = () => { qz.n++; qz.answered = false; quiz(); }; $('#nq').focus();
  });
}

// ---------- Match (solo, timed) ----------
function match(){
  const S = $('#stage'), best = load('matchall:' + lesson, null);
  if (!mt){
    mt = { deck:shuffle(words()), total:words().length, tiles:[], left:0, sel:null, done:0, start:0, t:0, miss:0, over:false }; mtRound();
  }
  const fmt = s => (s/10).toFixed(1) + ' s';
  if (mt.over){
    stopClock();
    const score = mt.t + mt.miss * 10;
    const nb = best === null || score < best; if (nb) save('matchall:' + lesson, score);
    S.innerHTML = `<div class="word">${fmt(score)}</div><div class="hint">Time ${fmt(mt.t)} + ${mt.miss} mistake${mt.miss===1?'':'s'} × 1 s penalty. ${nb ? 'New best for ' + lesson + '!' : 'Best for ' + lesson + ': ' + fmt(best)}</div><div class="row"><button class="big gold" id="ag">Play again</button></div>`;
    $('#ag').onclick = () => { mt = null; match(); }; return;
  }
  S.innerHTML = `<p class="how">Match every word in the lesson to its definition, 6 pairs at a time, as fast as you can. Tap a word, then its meaning. Every mistake adds 1 second.</p>
  <div class="stats"><span id="mtime">${fmt(mt.t)}</span><span>Pairs: ${mt.done} / ${mt.total}</span><span>Mistakes: ${mt.miss}</span><span>Best: ${best === null ? '—' : fmt(best)}</span></div>
  <div class="tiles">${mt.tiles.map((x,i)=>`<button class="tile ${x.kind==='w'?'tw':''} ${x.gone?'gone':''} ${mt.sel===i?'sel':''}" data-i="${i}" ${x.gone?'disabled aria-hidden="true"':''}>${esc(x.t)}</button>`).join('')}</div>`;
  if (!clock){ mt.start = Date.now() - mt.t * 100; clock = setInterval(() => { mt.t = Math.round((Date.now() - mt.start) / 100); const e = $('#mtime'); if (e) e.textContent = fmt(mt.t); }, 100); }
  S.querySelectorAll('.tile').forEach(b => b.onclick = () => {
    const i = +b.dataset.i, x = mt.tiles[i];
    if (mt.sel === null){ mt.sel = i; match(); return; }
    if (mt.sel === i){ mt.sel = null; match(); return; }
    const y = mt.tiles[mt.sel];
    if (y.k === x.k && y.kind !== x.kind){ x.gone = y.gone = true; mt.done++; mt.left--; mt.sel = null; if (!mt.left){ if (mt.deck.length) mtRound(); else mt.over = true; } match(); }
    else { mt.miss++; const a = S.querySelector(`[data-i="${mt.sel}"]`); b.classList.add('bad'); a && a.classList.add('bad'); mt.sel = null; setTimeout(match, 350); }
  });
}

function mtRound(){ const pick = mt.deck.splice(0, 6); mt.left = pick.length; mt.sel = null;
  mt.tiles = shuffle(pick.flatMap((w, k) => [{k, t:w[0], kind:'w'}, {k, t:w[1], kind:'d'}])); }

// ---------- Spell It (solo, typing) ----------
const norm = s => String(s).toLowerCase().replace(/[’‘`]/g, "'").replace(/[^a-z' -]/g, '').replace(/\s+/g, ' ').trim().replace(/^(a|an|the|be) /, '');
function spell(){
  const S = $('#stage'), best = load('spell:' + lesson, 0);
  if (!sp) sp = { qs:shuffle(words()), n:0, score:0, shown:1, state:'ask', last:'' };
  if (sp.n >= sp.qs.length){
    if (sp.score > best) save('spell:' + lesson, sp.score);
    S.innerHTML = `<div class="word">${sp.score} points</div><div class="hint">Best Spell It score for ${lesson}: ${Math.max(best, sp.score)}</div><div class="row"><button class="big gold" id="ag">Play again</button></div>`;
    $('#ag').onclick = () => { sp = null; spell(); }; return;
  }
  const w = sp.qs[sp.n][0], d = sp.qs[sp.n][1];
  const pattern = w.split('').map((c, i) => /[a-zA-Z]/.test(c) ? (i < sp.shown ? c : '_') : c).join(' ');
  const pts = Math.max(4, 10 - (sp.shown - 1) * 2);
  S.innerHTML = `<p class="how">Read the definition and type the word or phrase. Spelling counts! Each extra letter you reveal costs 2 points.</p>
  <div class="stats"><span>Word ${sp.n+1} / ${sp.qs.length}</span><span>Score: ${sp.score}</span><span>Best: ${best}</span><span>Worth: ${sp.state==='ask'?pts:'—'}</span></div>
  <div class="def">${esc(d)}</div>
  <div class="pattern" aria-label="Letter pattern">${esc(pattern)}</div>
  <form class="spellrow" id="sf" autocomplete="off"><label class="sr" for="sin">Your answer</label><input id="sin" class="spellin" ${sp.state==='ask'?'':'disabled'} value="${esc(sp.state==='ask'?'':sp.last)}" autocapitalize="off" spellcheck="false" placeholder="Type here…"></form>
  <div class="hint" id="sfb">${sp.state==='right' ? '<span class="okc">Correct! +' + sp.got + '</span>' : sp.state==='wrong' ? '<span class="noc">Not quite. The answer is: <b>' + esc(w) + '</b></span>' : ''}</div>
  <div class="row">${sp.state==='ask' ? '<button class="big gold" id="chk">Check</button><button class="big" id="rev">Reveal a letter</button><button class="big" id="giv">Show answer</button>' : '<button class="big gold" id="nxt">Next word</button>'}</div>`;
  if (sp.state === 'ask'){
    const inp = $('#sin'); inp.focus();
    const check = () => { const v = inp.value; if (!v.trim()) return; sp.last = v;
      if (norm(v) === norm(w)){ sp.got = pts; sp.score += pts; sp.state = 'right'; } else { sp.state = 'wrong'; }
      spell(); };
    $('#sf').onsubmit = e => { e.preventDefault(); check(); };
    $('#chk').onclick = check;
    $('#rev').onclick = () => { const letters = w.replace(/[^a-zA-Z]/g, '').length; if (sp.shown < letters) sp.shown++; const keep = inp.value; spell(); $('#sin').value = keep; };
    $('#giv').onclick = () => { sp.last = ''; sp.state = 'wrong'; spell(); };
  } else {
    const go = () => { sp.n++; sp.shown = 1; sp.state = 'ask'; sp.last = ''; spell(); };
    $('#nxt').onclick = go; $('#nxt').focus();
  }
}

// ---------- Blocks (solo puzzle) ----------
const N = 8;
const SHAPES = [
  [[0,0]], [[0,0],[0,1]], [[0,0],[1,0]], [[0,0],[0,1],[0,2]], [[0,0],[1,0],[2,0]],
  [[0,0],[0,1],[1,0],[1,1]], [[0,0],[1,0],[1,1]], [[0,1],[1,0],[1,1]], [[0,0],[0,1],[1,0]],
  [[0,0],[0,1],[0,2],[1,1]], [[0,0],[1,0],[2,0],[2,1]], [[0,0],[0,1],[0,2],[0,3]]
];
const rot = sh => { const r = sh.map(([y,x]) => [x, -y]); const my = Math.min(...r.map(p=>p[0])), mx = Math.min(...r.map(p=>p[1])); return r.map(([y,x]) => [y-my, x-mx]); };
const fits = (g, sh, y, x) => sh.every(([dy,dx]) => { const r = y+dy, c = x+dx; return r >= 0 && r < N && c >= 0 && c < N && !g[r][c]; });
const canPlace = (g, sh) => { let s = sh; for (let k = 0; k < 4; k++){ for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (fits(g, s, y, x)) return true; s = rot(s); } return false; };
function blocks(){
  const S = $('#stage'), best = load('blocks:' + lesson, 0);
  if (!bk) bk = { g:Array.from({length:N}, () => Array(N).fill(0)), score:0, lines:0, streak:0, phase:'q', piece:null, q:null, opts:null, msg:'Answer correctly to win a block. Fill a whole row or column to clear it!', over:false, deck:shuffle(words()), hover:null };
  if (bk.phase === 'q' && !bk.q && !bk.over && !bk.deck.length){ bk.over = true; bk.msg = `All ${words().length} words used! Final score: ${bk.score}.`; }
  if (bk.phase === 'q' && !bk.q && !bk.over){ bk.q = bk.deck.pop(); bk.opts = shuffle([bk.q].concat(shuffle(words().filter(w => w !== bk.q)).slice(0,3))); }
  if (bk.over){
    if (bk.score > best) save('blocks:' + lesson, bk.score);
  }
  const shadow = new Set(); let ok = false;
  if (bk.phase === 'place' && bk.hover){ const [hy, hx] = bk.hover; ok = fits(bk.g, bk.piece, hy, hx); bk.piece.forEach(([dy,dx]) => shadow.add((hy+dy)+','+(hx+dx))); }
  const cells = [];
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++){
    const on = bk.g[y][x], sh = shadow.has(y+','+x);
    cells.push(`<button class="cell ${on===2?'junk':on?'on':''} ${sh?(ok?'ok':'no'):''}" data-y="${y}" data-x="${x}" aria-label="Row ${y+1}, column ${x+1}${on?' filled':''}" ${bk.phase==='place'&&!bk.over?'':'tabindex="-1"'}></button>`);
  }
  const pw = Math.max(...(bk.piece||[[0,0]]).map(p=>p[1]))+1, ph = Math.max(...(bk.piece||[[0,0]]).map(p=>p[0]))+1;
  const prev = bk.piece ? `<div class="pv" style="grid-template-columns:repeat(${pw},22px)">${Array.from({length:ph*pw},(_, i)=>`<span class="${bk.piece.some(([y,x])=>y===Math.floor(i/pw)&&x===i%pw)?'on':''}"></span>`).join('')}</div>` : '';
  let left;
  if (bk.over) left = `<div class="word" style="font-size:44px">Game over</div><div class="hint">${bk.score} points · ${bk.lines} lines cleared<br>Best Blocks score for ${lesson}: ${Math.max(best, bk.score)}</div><div class="row"><button class="big gold" id="ag">Play again</button></div>`;
  else if (bk.phase === 'q') left = `<div class="def" style="margin-top:0">${esc(bk.q[1])}</div><div class="opts one">${bk.opts.map((o,i)=>`<button data-o="${i}">${esc(o[0])}</button>`).join('')}</div>`;
  else left = `<div class="mode-tag">YOUR BLOCK — PLACE IT ON THE GRID</div>${prev}<div class="row"><button class="big" id="rt">Rotate ↻</button></div><p class="how" style="text-align:center">Tap a square for the top-left of the block. Green = it fits.</p>`;
  S.innerHTML = `<p class="how">Blocks: answer to win a block, then place it. Full rows and columns clear for big points. A wrong answer drops a grey junk block on your grid! The game ends when every word is used.</p>
  <div class="stats"><span>Score: ${bk.score}</span><span>Words left: ${bk.deck.length + (bk.q ? 1 : 0)}</span><span>Lines: ${bk.lines}</span><span>Streak: ${bk.streak}</span><span>Best: ${best}</span></div>
  <div class="hint" role="status">${esc(bk.msg)}</div>
  <div class="blocks"><div class="bl">${left}</div><div class="grid" id="grid">${cells.join('')}</div></div>`;
  if (bk.over){ $('#ag').onclick = () => { bk = null; blocks(); }; return; }
  if (bk.phase === 'q'){
    S.querySelectorAll('[data-o]').forEach(b => b.onclick = () => {
      const o = bk.opts[+b.dataset.o];
      if (o === bk.q){
        bk.streak++; bk.score += 5; bk.piece = SHAPES[Math.floor(Math.random()*SHAPES.length)];
        if (bk.streak >= 3 && Math.random() < .5) bk.piece = SHAPES[0];
        bk.msg = `Correct: “${bk.q[0]}”. +5. ${bk.streak >= 3 ? 'Streak bonus: small blocks are easier to fit!' : 'Now place your block.'}`;
        bk.phase = 'place'; bk.q = null;
        if (!canPlace(bk.g, bk.piece)) bk.over = true;
      } else {
        bk.streak = 0;
        const empty = []; bk.g.forEach((r,y) => r.forEach((v,x) => { if (!v) empty.push([y,x]); }));
        if (empty.length){ const [y,x] = empty[Math.floor(Math.random()*empty.length)]; bk.g[y][x] = 2; }
        bk.msg = `Not quite — it was “${bk.q[0]}”. A junk block fell on your grid.`;
        bk.q = null; clearLines(true);
        if (empty.length <= 1) bk.over = true;
      }
      blocks();
    });
  } else {
    $('#rt').onclick = () => { bk.piece = rot(bk.piece); if (!canPlace(bk.g, bk.piece)) bk.over = true; blocks(); };
    S.querySelectorAll('.cell').forEach(c => {
      const y = +c.dataset.y, x = +c.dataset.x;
      c.onmouseenter = c.onfocus = () => { if (!bk.hover || bk.hover[0] !== y || bk.hover[1] !== x){ bk.hover = [y, x]; blocks(); const n = $(`.cell[data-y="${y}"][data-x="${x}"]`); n && n.focus({preventScroll:true}); } };
      c.onclick = () => {
        if (!fits(bk.g, bk.piece, y, x)){ bk.hover = [y, x]; bk.msg = 'It doesn’t fit there. Try another square or rotate it.'; blocks(); return; }
        bk.piece.forEach(([dy,dx]) => bk.g[y+dy][x+dx] = 1);
        bk.score += bk.piece.length; bk.piece = null; bk.hover = null; bk.phase = 'q';
        const cl = clearLines(false); bk.msg = cl ? `Brilliant! ${cl} line${cl>1?'s':''} cleared: +${cl*20*(cl>1?2:1)}${cl>1?' (combo × 2!)':''}` : 'Block placed. Next word!';
        blocks();
      };
    });
  }
}
function clearLines(silent){
  const rows = [], cols = [];
  for (let i = 0; i < N; i++){ if (bk.g[i].every(v => v)) rows.push(i); if (bk.g.every(r => r[i])) cols.push(i); }
  rows.forEach(r => bk.g[r].fill(0)); cols.forEach(c => bk.g.forEach(r => r[c] = 0));
  const n = rows.length + cols.length;
  if (n){ bk.lines += n; bk.score += n * 20 * (n > 1 ? 2 : 1); }
  return silent ? 0 : n;
}
reset();
