/* IF Lingo · B2 extras for Russian and Kazakh: one listening lesson for every unit, and the level test.
   Original IF Academy scripts. The script can be opened on the screen, so the lesson still works where a voice is missing. */
(function () {
  var K = IFX.k, f = function (s, t) { return { s: s, g: 'f', t: t }; }, m = function (s, t) { return { s: s, g: 'm', t: t }; };
  var A = function (cid, uid, title, intro, script, ex) { IFX.listening(cid, uid, { title: title, intro: intro, script: script, ex: ex }); };
  var R = function (uid, title, intro, script, ex) { A('ru-b2', uid, title, intro, script, ex); }, Q = function (uid, title, intro, script, ex) { A('kk-b2', uid, title, intro, script, ex); };
  var an = 'Анна', to = 'Том', ai = 'Айгүл';

  /* ================= Russian B2 ================= */
  R('u1', 'Parents and children', 'Tom asks Anna about her parents.', [
    m(to, 'Анна, ты часто споришь с родителями?'), f(an, 'Бывает. Люди, выросшие в девяностые, думают иначе, чем мы.'), m(to, 'Например?'), f(an, 'Для мамы главное — стабильная работа. А молодёжь, живущая сегодня, хочет свободы.'), m(to, 'И кто прав?'), f(an, 'Обе стороны. Я уважаю её ценности, но выбираю сама.')],
    [K.mc('Who does Anna sometimes argue with?', ['her parents', 'her boss', 'her neighbours'], 0), K.mc('What matters most to her mother?', ['a stable job', 'freedom', 'travel'], 0), K.tf('Anna says only young people are right.', false)]);
  R('u2', 'Working from home', 'Anna asks Tom why he is at home again.', [
    f(an, 'Том, ты опять работаешь из дома?'), m(to, 'Да, наш офис закрыт на ремонт до марта.'), f(an, 'И как? Удобно?'), m(to, 'Отчёт, написанный дома, ничем не хуже. Но мне не хватает коллег.'), f(an, 'А график?'), m(to, 'Гибкий. Задачи, полученные утром, я должен сдать к вечеру.')],
    [K.mc('Why is Tom working from home?', ['The office is closed for repairs.', 'He is ill.', 'He has left his job.'], 0), K.mc('Until when?', ['until March', 'until May', 'until Friday'], 0), K.mc('What does he miss?', ['his colleagues', 'his desk', 'the canteen'], 0)]);
  R('u3', 'Do you believe everything you read?', 'Tom has read an article about coffee.', [
    m(to, 'Анна, ты читала, что кофе продлевает жизнь?'), f(an, 'Читала. Но, читая такие статьи, я всегда смотрю, кто заплатил за исследование.'), m(to, 'И кто?'), f(an, 'Компания, продающая кофе. Узнав это, я перестала верить.'), m(to, 'Значит, это неправда?'), f(an, 'Не знаю. Но доказательств мало.')],
    [K.mc('What did the article say?', ['Coffee makes you live longer.', 'Coffee is dangerous.', 'Coffee is getting cheaper.'], 0), K.mc('Who paid for the study?', ['a company that sells coffee', 'a university', 'the government'], 0), K.tf('Anna says the article is certainly false.', false)]);
  R('u4', 'You need a rest', 'Anna is worried about Tom.', [
    f(an, 'Том, ты плохо выглядишь. Что случилось?'), m(to, 'Я третью неделю работаю без выходных и плохо сплю.'), f(an, 'Тебе стоит взять отпуск.'), m(to, 'Не могу, у нас проект.'), f(an, 'На твоём месте я бы поговорила с начальником. И не следует пить столько кофе.'), m(to, 'Ты права. Завтра поговорю.')],
    [K.mc('How long has Tom been working without days off?', ['more than two weeks', 'two days', 'a year'], 0), K.mc('What does Anna advise first?', ['taking a holiday', 'changing jobs', 'drinking more coffee'], 0), K.mc('What will Tom do tomorrow?', ['talk to his boss', 'go to the doctor', 'finish the project'], 0)]);
  R('u5', 'A walk in the mountains', 'Anna asks Tom about his weekend.', [
    f(an, 'Как поход?'), m(to, 'Отлично! Мы дошли до озера за три часа.'), f(an, 'А гид был?'), m(to, 'Да. Он подошёл к нам у входа в парк и показал дорогу.'), f(an, 'Вы поднимались на гору?'), m(to, 'Нет, мы обошли её. А на обратном пути зашли в кафе.')],
    [K.mc('How long did it take to reach the lake?', ['three hours', 'one hour', 'a whole day'], 0), K.mc('Where did the guide come up to them?', ['at the entrance to the park', 'at the lake', 'in the café'], 0), K.tf('They climbed the mountain.', false)]);
  R('u6', 'Half a wardrobe', 'Tom notices that Anna has fewer things.', [
    m(to, 'Анна, у тебя стало меньше вещей?'), f(an, 'Да, я отдала треть одежды.'), m(to, 'Зачем?'), f(an, 'Я носила только половину. Теперь у меня двое джинсов и полтора десятка футболок.'), m(to, 'А обувь?'), f(an, 'Оба старых ботинка выбросила и купила одну хорошую пару.')],
    [K.mc('How much of her clothing did Anna give away?', ['a third', 'half', 'all of it'], 0), K.mc('How many pairs of jeans does she have now?', ['two', 'five', 'one'], 0), K.mc('What did she buy?', ['one good pair of shoes', 'two coats', 'nothing'], 0)]);
  R('u7', 'A street without cars', 'Anna and Tom talk about a new street for walkers.', [
    f(an, 'Том, ты видел новую пешеходную улицу?'), m(to, 'Видел. Мне нравится то, что там нет машин.'), f(an, 'А магазинам это выгодно?'), m(to, 'Да. Тот, кто идёт пешком, чаще заходит в магазин.'), f(an, 'Но водители недовольны.'), m(to, 'Верно. В то время как пешеходы радуются, водители ищут парковку.')],
    [K.mc('What does Tom like about the street?', ['There are no cars.', 'It is short.', 'It has a car park.'], 0), K.mc('Who goes into shops more often?', ['people on foot', 'drivers', 'tourists by bus'], 0), K.mc('Who is unhappy?', ['drivers', 'shop owners', 'children'], 0)]);
  R('u8', 'The river is low', 'Tom asks Anna about the river.', [
    m(to, 'Анна, почему река стала такой мелкой?'), f(an, 'Из-за того что летом почти не было дождей.'), m(to, 'Это опасно?'), f(an, 'Да, это может привести к проблемам с водой в городе.'), m(to, 'Что можно сделать?'), f(an, 'Экономить. В прошлом году, благодаря тому что жители экономили, воды хватило.')],
    [K.mc('Why is the river low?', ['There was almost no rain in summer.', 'A dam was built.', 'It is winter.'], 0), K.mc('What can this lead to?', ['water problems in the city', 'floods', 'higher bus fares'], 0), K.tf('Last year there was not enough water.', false)]);
  R('u9', 'Will a program replace me?', 'Anna is a translator. Tom asks about her future.', [
    m(to, 'Анна, ты не боишься, что программа заменит переводчиков?'), f(an, 'Немного. Но что бы ни говорили, машина не понимает юмор.'), m(to, 'А если научится?'), f(an, 'Как бы хорошо она ни переводила, кто-то должен проверять текст.'), m(to, 'Значит, ты будешь редактором?'), f(an, 'Да. Я уже прохожу курс.')],
    [K.mc('What is Anna’s job?', ['translator', 'teacher', 'programmer'], 0), K.mc('What does a machine not understand, according to Anna?', ['humour', 'numbers', 'grammar'], 0), K.mc('What is Anna already doing?', ['taking a course', 'looking for another job', 'writing a program'], 0)]);
  R('u10', 'No time for the cinema', 'Anna invites Tom to the cinema.', [
    f(an, 'Том, пойдём в кино в субботу?'), m(to, 'Не могу, мне некогда: у меня курс по вечерам и в выходные.'), f(an, 'Какой курс?'), m(to, 'Анализ данных. На работе мне уже нечего изучать.'), f(an, 'Трудно?'), m(to, 'Да, и не с кем посоветоваться: я учусь онлайн.'), f(an, 'Спрашивай меня, я это проходила.')],
    [K.mc('Why can Tom not go to the cinema?', ['He has a course and no free time.', 'He is ill.', 'He does not like films.'], 0), K.mc('What is he studying?', ['data analysis', 'Russian literature', 'cooking'], 0), K.mc('Who offers to help him?', ['Anna', 'his boss', 'his teacher'], 0)]);
  R('u11', 'The book I could not put down', 'Anna looks tired this morning.', [
    m(to, 'Анна, ты выглядишь усталой.'), f(an, 'Я зачиталась и легла в три часа ночи.'), m(to, 'Что за книга?'), f(an, 'Старый роман. Я читала его в школе, а теперь решила перечитать.'), m(to, 'И как?'), f(an, 'В школе я его недооценила. Осталось сто страниц — дочитаю сегодня.')],
    [K.mc('When did Anna go to bed?', ['at three in the morning', 'at ten in the evening', 'at midnight'], 0), K.tf('Anna is reading this novel for the first time.', false), K.mc('How many pages are left?', ['a hundred', 'ten', 'three hundred'], 0)]);
  R('u12', 'A lost match', 'Anna asks Tom about yesterday’s football match.', [
    f(an, 'Том, как вчерашний матч?'), m(to, 'Мы проиграли. Мне пришлось уйти с поля: я повредил ногу.'), f(an, 'Обидно. Очень болит?'), m(to, 'Ночью мне не спалось. Но хочется скорее вернуться.'), f(an, 'А судья был честным?'), m(to, 'Да. Соперник играл лучше, надо признать.')],
    [K.mc('What was the result?', ['Tom’s team lost.', 'Tom’s team won.', 'It was a draw.'], 0), K.mc('Why did Tom leave the pitch?', ['He hurt his leg.', 'He was sent off.', 'He was tired.'], 0), K.tf('Tom says the referee was unfair.', false)]);
  R('u13', 'A coffee shop of her own', 'Tom has heard some news about Anna.', [
    m(to, 'Анна, я слышал, ты открываешь своё дело?'), f(an, 'Да, маленькую кофейню. Я вложила в неё все сбережения.'), m(to, 'Смело! От чего зависит успех?'), f(an, 'От места. Я арендовала помещение рядом с университетом.'), m(to, 'Когда она окупится?'), f(an, 'Надеюсь, через год. Я рассчитываю на студентов.')],
    [K.mc('What business is Anna opening?', ['a small coffee shop', 'a bookshop', 'a language school'], 0), K.mc('Where is it?', ['next to the university', 'at the market', 'in her flat'], 0), K.mc('When does she hope it will pay for itself?', ['in a year', 'in a month', 'in ten years'], 0)]);
  R('u14', 'Five years abroad', 'Anna asks Tom about his life in Kazakhstan.', [
    f(an, 'Том, сколько ты уже живёшь в Казахстане?'), m(to, 'Пять лет. Время летит!'), f(an, 'Скучаешь по дому?'), m(to, 'Иногда. Вчера мне пришло в голову, что я уже думаю по-русски.'), f(an, 'А что было самым трудным?'), m(to, 'Зима. В первый год я выходил из себя из-за холода.')],
    [K.mc('How long has Tom lived in Kazakhstan?', ['five years', 'one year', 'ten years'], 0), K.mc('What occurred to him yesterday?', ['that he already thinks in Russian', 'that he wants to go home', 'that he has lost his keys'], 0), K.mc('What was the hardest thing?', ['the winter', 'the food', 'the language'], 0)]);
  R('u15', 'Which language at home?', 'Tom asks Anna about her children.', [
    m(to, 'Анна, на каком языке ты говоришь с детьми?'), f(an, 'По-русски. Мой муж — немец, и он говорит с ними по-немецки.'), m(to, 'Они не путают языки?'), f(an, 'Нет. Прежде чем ответить, они смотрят, кто спрашивает.'), m(to, 'А английский?'), f(an, 'Начнём после того, как они пойдут в школу.')],
    [K.mc('Which language does Anna speak with her children?', ['Russian', 'German', 'English'], 0), K.mc('What do the children do before they answer?', ['They look at who is asking.', 'They ask their father.', 'They answer in two languages.'], 0), K.mc('When will they start English?', ['after they start school', 'next week', 'never'], 0)]);
  R('u16', 'A painted wall', 'Anna and Tom talk about a mural.', [
    f(an, 'Том, ты видел роспись на старом заводе?'), m(to, 'Видел. Это искусство или вандализм?'), f(an, 'Искусство! Художники получили разрешение.'), m(to, 'Мне понравилась смелость идеи. А кто рисовал?'), f(an, 'Местные жители и один известный художник.'), m(to, 'Красота! Надо показать её гостям города.')],
    [K.mc('Where is the mural?', ['on the old factory', 'on a school', 'on a bridge'], 0), K.tf('The artists had permission.', true), K.mc('Who painted it?', ['local people and a well-known artist', 'schoolchildren only', 'nobody knows'], 0)]);
  R('u17', 'Is it true?', 'Tom has heard some news from his neighbour.', [
    m(to, 'Анна, говорят, что с понедельника автобусы будут бесплатными!'), f(an, 'Кто говорит?'), m(to, 'Сосед. Он якобы читал это в новостях.'), f(an, 'Я проверила: согласно сайту акимата, бесплатно только для школьников.'), m(to, 'Значит, сосед ошибся.'), f(an, 'По словам водителя, об этом спрашивают весь день.')],
    [K.mc('What had Tom heard?', ['Buses would be free from Monday.', 'Buses would stop running.', 'Tickets would cost more.'], 0), K.mc('What is true?', ['Buses are free only for schoolchildren.', 'Buses are free for everyone.', 'Nothing has changed.'], 0), K.mc('Where did Anna check?', ['on the akimat website', 'in a newspaper', 'with her neighbour'], 0)]);
  R('u18', 'A talk for a conference', 'Tom is writing a talk and asks Anna for help.', [
    m(to, 'Анна, помоги с докладом. Как сказать по-научному «вода — это проблема»?'), f(an, '«Вода является главной проблемой региона».'), m(to, 'А «в отчёте три части»?'), f(an, '«Отчёт состоит из трёх частей».'), m(to, 'Звучит серьёзно! А в разговоре так говорят?'), f(an, 'Нет, только в докладах и статьях.')],
    [K.mc('What is Tom writing?', ['a talk', 'a letter to a friend', 'a shopping list'], 0), K.mc('How many parts does the report have?', ['three', 'two', 'five'], 0), K.tf('People speak like this in everyday conversation.', false)]);
  R('u19', 'A third backpack', 'Anna sees Tom with a new backpack.', [
    f(an, 'Том, зачем тебе третий рюкзак?'), m(to, 'Была скидка! Только сегодня.'), f(an, 'Разве у тебя нет рюкзака?'), m(to, 'Есть. Но этот же лучше!'), f(an, 'Неужели ты веришь рекламе? Ты ведь сам говорил, что это уловка.'), m(to, 'Говорил… Ладно, верну его завтра.')],
    [K.mc('What did Tom buy?', ['a third backpack', 'a first backpack', 'a suitcase'], 0), K.mc('Why did he buy it?', ['There was a discount “only today”.', 'His old one was broken.', 'It was a present.'], 0), K.mc('What will he do tomorrow?', ['take it back', 'buy another one', 'give it to Anna'], 0)]);
  R('u20', 'The vegetable garden', 'Tom asks Anna about her garden.', [
    m(to, 'Анна, как твой огород?'), f(an, 'Спасибо соседу. Если бы не он, всё бы засохло.'), m(to, 'Ты уезжала?'), f(an, 'На две недели. Он поливал каждый вечер.'), m(to, 'А сорняки?'), f(an, 'Выросли! Надо убрать их сегодня, а то помидоров не будет видно.')],
    [K.mc('Who helped Anna?', ['her neighbour', 'her brother', 'Tom'], 0), K.mc('How long was she away?', ['two weeks', 'two days', 'two months'], 0), K.mc('What must she do today?', ['pull out the weeds', 'plant tomatoes', 'water the garden'], 0)]);
  R('u21', 'A new manager', 'Anna asks Tom about his new boss.', [
    f(an, 'Том, как новый начальник?'), m(to, 'Хороший. Он не только слушает, но и делает то, что обещал.'), f(an, 'А прежний?'), m(to, 'Тот то кричал, то молчал неделями.'), f(an, 'А задачи он даёт?'), m(to, 'Да, как опытным, так и новым сотрудникам. Мне дали целый проект.')],
    [K.mc('What is the new manager like?', ['He listens and keeps his promises.', 'He shouts a lot.', 'He is never in the office.'], 0), K.mc('What was the old manager like?', ['He either shouted or was silent for weeks.', 'He was kind to everyone.', 'He gave too many projects.'], 0), K.mc('What has Tom been given?', ['a whole project', 'a new desk', 'a holiday'], 0)]);
  R('u22', 'My grandmother', 'Tom asks Anna about her grandmother.', [
    m(to, 'Анна, сколько лет твоей бабушке?'), f(an, 'Восемьдесят два. И она бодрее меня!'), m(to, 'В чём секрет?'), f(an, 'Она каждый день проходит пять километров. И у неё добрейший характер.'), m(to, 'Она живёт одна?'), f(an, 'Да, но мы звоним ей всё чаще. Она недавно научилась видеозвонкам.')],
    [K.mc('How old is Anna’s grandmother?', ['eighty-two', 'seventy-two', 'ninety-two'], 0), K.mc('What does she do every day?', ['walks five kilometres', 'swims', 'cooks for the family'], 0), K.mc('What has she learned recently?', ['video calls', 'driving', 'English'], 0)]);
  R('u23', 'A call to the akimat', 'Tom phones an office about a request.', [
    f('Сотрудница', 'Акимат, слушаю вас.'), m(to, 'Здравствуйте. Я звоню по поводу обращения о детской площадке.'), f('Сотрудница', 'Назовите номер обращения.'), m(to, 'Сто двадцать пять.'), f('Сотрудница', 'Оно рассмотрено. В соответствии с планом ремонт начнётся в апреле.'), m(to, 'Можно получить ответ письменно?'), f('Сотрудница', 'Да, в течение трёх дней мы отправим его на вашу почту.')],
    [K.mc('What is Tom calling about?', ['a request about a playground', 'a lost passport', 'a water bill'], 0), K.mc('When will the repairs begin?', ['in April', 'in three days', 'next year'], 0), K.mc('How will Tom get the answer in writing?', ['by email within three days', 'by post in a month', 'He must come to the office.'], 0)]);
  R('u24', 'After B2', 'Anna congratulates Tom.', [
    f(an, 'Том, поздравляю! Ты закончил уровень B2.'), m(to, 'Спасибо. Если бы не ты, я бы бросил ещё на A2.'), f(an, 'Что было самым трудным?'), m(to, 'Причастия. Но, читая новости, я к ним привык.'), f(an, 'И что теперь?'), m(to, 'Как бы трудно ни было, хочу сдать экзамен весной.')],
    [K.mc('Which level has Tom finished?', ['B2', 'B1', 'A2'], 0), K.mc('What was the hardest thing for him?', ['participles', 'the alphabet', 'numbers'], 0), K.mc('When does he want to take the exam?', ['in spring', 'tomorrow', 'in two years'], 0)]);

  /* ================= Kazakh B2 ================= */
  Q('u1', 'Parents and children', 'Tom asks Aigul about her parents.', [
    m(to, 'Айгүл, сіз ата-анаңызбен жиі дауласасыз ба?'), f(ai, 'Кейде. Тоқсаныншы жылдары өскен адамдар бізден басқаша ойлайды.'), m(to, 'Мысалы?'), f(ai, 'Анам үшін ең бастысы — тұрақты жұмыс. Ал мен еркіндікті қалайтынымды білемін.'), m(to, 'Кімдікі дұрыс?'), f(ai, 'Екеуінікі де. Мен оның құндылықтарын сыйлаймын, бірақ өзім таңдаймын.')],
    [K.mc('Who does Aigul sometimes argue with?', ['her parents', 'her boss', 'her neighbours'], 0), K.mc('What matters most to her mother?', ['a stable job', 'freedom', 'travel'], 0), K.tf('Aigul says only young people are right.', false)]);
  Q('u2', 'Working from home', 'Aigul asks Tom why he is at home again.', [
    f(ai, 'Том, сіз тағы да үйден жұмыс істеп жатырсыз ба?'), m(to, 'Иә, кеңсемізді наурызға дейін жөндетіп жатыр.'), f(ai, 'Қалай, ыңғайлы ма?'), m(to, 'Ыңғайлы, бірақ әріптестерімді сағындым.'), f(ai, 'Ал кесте ше?'), m(to, 'Икемді. Бастық таңертең тапсырма беріп, кешке есеп жаздырады.')],
    [K.mc('Why is Tom working from home?', ['The office is being repaired.', 'He is ill.', 'He has left his job.'], 0), K.mc('Until when?', ['until March', 'until May', 'until Friday'], 0), K.mc('What does he miss?', ['his colleagues', 'his desk', 'the canteen'], 0)]);
  Q('u3', 'Do you believe everything you read?', 'Tom has read an article about coffee.', [
    m(to, 'Айгүл, кофе өмірді ұзартады деген мақаланы оқыдыңыз ба?'), f(ai, 'Оқып шықтым. Бірақ зерттеуге кім ақша төлегенін тексеріп көрдім.'), m(to, 'Кім екен?'), f(ai, 'Кофе сататын компания. Соны білген соң сенбей қойдым.'), m(to, 'Демек, бұл өтірік пе?'), f(ai, 'Білмеймін. Бірақ дәлел аз.')],
    [K.mc('What did the article say?', ['Coffee makes you live longer.', 'Coffee is dangerous.', 'Coffee is getting cheaper.'], 0), K.mc('Who paid for the study?', ['a company that sells coffee', 'a university', 'the government'], 0), K.tf('Aigul says the article is certainly false.', false)]);
  Q('u4', 'You need a rest', 'Aigul is worried about Tom.', [
    f(ai, 'Том, түріңіз шаршаңқы. Не болды?'), m(to, 'Үшінші апта демалыссыз жұмыс істеп жүрмін, ұйқым да нашар.'), f(ai, 'Демалыс алғаныңыз жөн.'), m(to, 'Ала алмаймын, жобамыз бар.'), f(ai, 'Сіздің орныңызда болсам, бастықпен сөйлесер едім. Кофені де азайтқан дұрыс.'), m(to, 'Дұрыс айтасыз. Ертең сөйлесемін.')],
    [K.mc('How long has Tom been working without days off?', ['more than two weeks', 'two days', 'a year'], 0), K.mc('What does Aigul advise first?', ['taking a holiday', 'changing jobs', 'drinking more coffee'], 0), K.mc('What will Tom do tomorrow?', ['talk to his boss', 'go to the doctor', 'finish the project'], 0)]);
  Q('u5', 'A walk in the mountains', 'Aigul asks Tom about his weekend.', [
    f(ai, 'Жорық қалай өтті?'), m(to, 'Керемет! Көлге үш сағатта жеттік.'), f(ai, 'Гид болды ма?'), m(to, 'Иә. Біз онымен саябақтың кіреберісінде кездестік, ол жол көрсетті.'), f(ai, 'Тауға шықтыңыздар ма?'), m(to, 'Жоқ, айналып өттік. Қайтар жолда кафеде жылынып, бірге суретке түстік.')],
    [K.mc('How long did it take to reach the lake?', ['three hours', 'one hour', 'a whole day'], 0), K.mc('Where did they meet the guide?', ['at the entrance to the park', 'at the lake', 'in the café'], 0), K.tf('They climbed the mountain.', false)]);
  Q('u6', 'Half a wardrobe', 'Tom notices that Aigul has fewer things.', [
    m(to, 'Айгүл, заттарыңыз азайған сияқты ғой?'), f(ai, 'Иә, киімімнің үштен бірін басқаларға бердім.'), m(to, 'Неге?'), f(ai, 'Жартысын ғана киетінмін. Қазір екі джинсым мен он бес шақты футболкам бар.'), m(to, 'Аяқ киім ше?'), f(ai, 'Ескі екеуін тастап, бір жақсы жұп сатып алдым.')],
    [K.mc('How much of her clothing did Aigul give away?', ['a third', 'half', 'all of it'], 0), K.mc('How many pairs of jeans does she have now?', ['two', 'five', 'one'], 0), K.mc('What did she buy?', ['one good pair of shoes', 'two coats', 'nothing'], 0)]);
  Q('u7', 'A street without cars', 'Aigul and Tom talk about a new street for walkers.', [
    f(ai, 'Том, жаңа жаяу жүргіншілер көшесін көрдіңіз бе?'), m(to, 'Көрдім. Көлік болмағандықтан, маған ол жер ұнайды.'), f(ai, 'Дүкендерге бұл тиімді ме?'), m(to, 'Иә. Адам жаяу жүрген сайын дүкенге жиі кіреді.'), f(ai, 'Бірақ жүргізушілер риза емес.'), m(to, 'Рас. Олар тұрақ тапқанша көп уақыт жоғалтады.')],
    [K.mc('What does Tom like about the street?', ['There are no cars.', 'It is short.', 'It has a car park.'], 0), K.mc('Who goes into shops more often?', ['people on foot', 'drivers', 'tourists by bus'], 0), K.mc('Who is unhappy?', ['drivers', 'shop owners', 'children'], 0)]);
  Q('u8', 'The river is low', 'Tom asks Aigul about the river.', [
    m(to, 'Айгүл, өзен неге сонша таяз болып қалды?'), f(ai, 'Жазда жаңбыр жаумағанының салдарынан.'), m(to, 'Бұл қауіпті ме?'), f(ai, 'Иә, бұл қалада су тапшылығына әкелуі мүмкін.'), m(to, 'Не істеуге болады?'), f(ai, 'Үнемдеу керек. Былтыр тұрғындардың үнемдегенінің арқасында су жетті.')],
    [K.mc('Why is the river low?', ['There was no rain in summer.', 'A dam was built.', 'It is winter.'], 0), K.mc('What can this lead to?', ['a shortage of water in the city', 'floods', 'higher bus fares'], 0), K.tf('Last year there was not enough water.', false)]);
  Q('u9', 'Will a program replace me?', 'Aigul is a translator. Tom asks about her future.', [
    m(to, 'Айгүл, бағдарлама аудармашыларды алмастырады деп қорықпайсыз ба?'), f(ai, 'Аздап. Бірақ кім не десе де, машина әзілді түсінбейді.'), m(to, 'Үйреніп алса ше?'), f(ai, 'Ол қанша жақсы аударса да, мәтінді біреу тексеруі керек.'), m(to, 'Демек, сіз редактор боласыз ба?'), f(ai, 'Иә. Қазірдің өзінде курстан өтіп жүрмін.')],
    [K.mc('What is Aigul’s job?', ['translator', 'teacher', 'programmer'], 0), K.mc('What does a machine not understand, according to Aigul?', ['humour', 'numbers', 'grammar'], 0), K.mc('What is Aigul already doing?', ['taking a course', 'looking for another job', 'writing a program'], 0)]);
  Q('u10', 'No time for the cinema', 'Aigul invites Tom to the cinema.', [
    f(ai, 'Том, сенбіде киноға барайық па?'), m(to, 'Бара алмаймын, бос уақытым жоқ: кешке де, демалыс күндері де курсым бар.'), f(ai, 'Қандай курс?'), m(to, 'Деректерді талдау. Жұмыста үйренетін жаңа нәрсем қалмады.'), f(ai, 'Қиын ба?'), m(to, 'Иә, ақылдасатын адамым да жоқ: онлайн оқимын.'), f(ai, 'Менен сұраңыз, мен мұны оқығанмын.')],
    [K.mc('Why can Tom not go to the cinema?', ['He has a course and no free time.', 'He is ill.', 'He does not like films.'], 0), K.mc('What is he studying?', ['data analysis', 'Kazakh literature', 'cooking'], 0), K.mc('Who offers to help him?', ['Aigul', 'his boss', 'his teacher'], 0)]);
  Q('u11', 'The book I could not put down', 'Aigul looks tired this morning.', [
    m(to, 'Айгүл, шаршап тұрған сияқтысыз.'), f(ai, 'Кітапқа беріліп кетіп, түнгі үште жаттым.'), m(to, 'Қандай кітап?'), f(ai, 'Ескі роман. Мектепте оқығанмын, енді қайта оқымақшы болдым.'), m(to, 'Қалай екен?'), f(ai, 'Мектепте оны бағаламаппын. Жүз бет қалды — бүгін бітірермін.')],
    [K.mc('When did Aigul go to bed?', ['at three in the morning', 'at ten in the evening', 'at midnight'], 0), K.tf('Aigul is reading this novel for the first time.', false), K.mc('How many pages are left?', ['a hundred', 'ten', 'three hundred'], 0)]);
  Q('u12', 'A lost match', 'Aigul asks Tom about yesterday’s football match.', [
    f(ai, 'Том, кешегі матч қалай өтті?'), m(to, 'Жеңіліп қалдық. Маған алаңнан кетуге тура келді: аяғымды жарақаттап алдым.'), f(ai, 'Өкінішті. Қатты ауыра ма?'), m(to, 'Түнде ұйықтай алмадым. Бірақ тезірек ойынға оралғым келеді.'), f(ai, 'Төреші әділ болды ма?'), m(to, 'Иә. Қарсыластарымыз жақсырақ ойнады, оны мойындау керек.')],
    [K.mc('What was the result?', ['Tom’s team lost.', 'Tom’s team won.', 'It was a draw.'], 0), K.mc('Why did Tom leave the pitch?', ['He hurt his leg.', 'He was sent off.', 'He was tired.'], 0), K.tf('Tom says the referee was unfair.', false)]);
  Q('u13', 'A coffee shop of her own', 'Tom has heard some news about Aigul.', [
    m(to, 'Айгүл, өз ісіңізді ашып жатыр деп естідім.'), f(ai, 'Иә, шағын кофехана. Бар жинағымды соған салдым.'), m(to, 'Батыл екенсіз! Табыс неге байланысты?'), f(ai, 'Орынға. Мен университеттің жанынан бөлме жалдадым.'), m(to, 'Ол қашан өзін ақтайды?'), f(ai, 'Бір жылда деп үміттенемін. Мен студенттерге сенемін.')],
    [K.mc('What business is Aigul opening?', ['a small coffee shop', 'a bookshop', 'a language school'], 0), K.mc('Where is it?', ['next to the university', 'at the market', 'in her flat'], 0), K.mc('When does she hope it will pay for itself?', ['in a year', 'in a month', 'in ten years'], 0)]);
  Q('u14', 'Five years abroad', 'Aigul asks Tom about his life in Kazakhstan.', [
    f(ai, 'Том, Қазақстанда тұрғаныңызға неше жыл болды?'), m(to, 'Бес жыл. Уақыт зымырап өтіп жатыр!'), f(ai, 'Үйіңізді сағынасыз ба?'), m(to, 'Кейде. Кеше қазақша ойлап жүргенім ойыма келді.'), f(ai, 'Ең қиыны не болды?'), m(to, 'Қыс. Бірінші жылы суыққа ашуым келетін.')],
    [K.mc('How long has Tom lived in Kazakhstan?', ['five years', 'one year', 'ten years'], 0), K.mc('What occurred to him yesterday?', ['that he already thinks in Kazakh', 'that he wants to go home', 'that he has lost his keys'], 0), K.mc('What was the hardest thing?', ['the winter', 'the food', 'the language'], 0)]);
  Q('u15', 'Which language at home?', 'Tom asks Aigul about her children.', [
    m(to, 'Айгүл, балаларыңызбен қай тілде сөйлесесіз?'), f(ai, 'Қазақша. Күйеуім неміс, ол балалармен немісше сөйлеседі.'), m(to, 'Балалар тілдерді шатастырмай ма?'), f(ai, 'Жоқ. Жауап бергенге дейін кім сұрап тұрғанына қарайды.'), m(to, 'Ал ағылшын тілі ше?'), f(ai, 'Олар мектепке барғаннан кейін бастаймыз.')],
    [K.mc('Which language does Aigul speak with her children?', ['Kazakh', 'German', 'English'], 0), K.mc('What do the children do before they answer?', ['They look at who is asking.', 'They ask their father.', 'They answer in two languages.'], 0), K.mc('When will they start English?', ['after they start school', 'next week', 'never'], 0)]);
  Q('u16', 'A painted wall', 'Aigul and Tom talk about a mural.', [
    f(ai, 'Том, ескі зауыттағы қабырға суретін көрдіңіз бе?'), m(to, 'Көрдім. Бұл өнер ме, әлде бұзақылық па?'), f(ai, 'Өнер! Суретшілер рұқсат алған.'), m(to, 'Маған идеяның батылдығы ұнады. Кім салған?'), f(ai, 'Жергілікті тұрғындар мен бір танымал суретші.'), m(to, 'Әдемі екен! Оны қала қонақтарына көрсету керек.')],
    [K.mc('Where is the mural?', ['on the old factory', 'on a school', 'on a bridge'], 0), K.tf('The artists had permission.', true), K.mc('Who painted it?', ['local people and a well-known artist', 'schoolchildren only', 'nobody knows'], 0)]);
  Q('u17', 'Is it true?', 'Tom has heard some news from his neighbour.', [
    m(to, 'Айгүл, дүйсенбіден бастап автобус тегін болады дейді!'), f(ai, 'Кім айтты?'), m(to, 'Көршім. Ол жаңалықтан оқыған көрінеді.'), f(ai, 'Мен тексердім: әкімдік сайтына қарасам, тек оқушыларға тегін екен.'), m(to, 'Демек, көршім қателескен.'), f(ai, 'Жүргізушінің айтуынша, бұл туралы күні бойы сұрап жатыр.')],
    [K.mc('What had Tom heard?', ['Buses would be free from Monday.', 'Buses would stop running.', 'Tickets would cost more.'], 0), K.mc('What is true?', ['Buses are free only for schoolchildren.', 'Buses are free for everyone.', 'Nothing has changed.'], 0), K.mc('Where did Aigul check?', ['on the akimat website', 'in a newspaper', 'with her neighbour'], 0)]);
  Q('u18', 'A talk for a conference', 'Tom is writing a talk and asks Aigul for help.', [
    m(to, 'Айгүл, баяндамама көмектесіңізші. «Су — мәселе» дегенді ғылыми тілде қалай айтады?'), f(ai, '«Су өңірдің басты мәселесі болып табылады».'), m(to, 'Ал «есепте үш бөлім бар» дегенді ше?'), f(ai, '«Есеп үш бөлімнен тұрады».'), m(to, 'Салмақты естіледі! Ауызекі сөйлеуде де осылай айта ма?'), f(ai, 'Жоқ, тек баяндама мен мақалада.')],
    [K.mc('What is Tom writing?', ['a talk', 'a letter to a friend', 'a shopping list'], 0), K.mc('How many parts does the report have?', ['three', 'two', 'five'], 0), K.tf('People speak like this in everyday conversation.', false)]);
  Q('u19', 'A third backpack', 'Aigul sees Tom with a new backpack.', [
    f(ai, 'Том, үшінші рюкзак сізге не үшін керек?'), m(to, 'Жеңілдік болды ғой! Тек бүгін ғана.'), f(ai, 'Сізде рюкзак бар емес пе?'), m(to, 'Бар. Бірақ мынау тіпті жақсы!'), f(ai, 'Шынымен жарнамаға сенесіз бе? Бұл айла деп өзіңіз айттыңыз ғой.'), m(to, 'Айттым… Жарайды, ертең қайтарамын.')],
    [K.mc('What did Tom buy?', ['a third backpack', 'a first backpack', 'a suitcase'], 0), K.mc('Why did he buy it?', ['There was a discount “only today”.', 'His old one was broken.', 'It was a present.'], 0), K.mc('What will he do tomorrow?', ['take it back', 'buy another one', 'give it to Aigul'], 0)]);
  Q('u20', 'The vegetable garden', 'Tom asks Aigul about her garden.', [
    m(to, 'Айгүл, бақшаңыз қалай?'), f(ai, 'Көршіме рақмет. Ол болмағанда, бәрі қурап қалар еді.'), m(to, 'Бір жаққа кеттіңіз бе?'), f(ai, 'Екі аптаға. Ол күнде кешке суарып тұрды.'), m(to, 'Арамшөп ше?'), f(ai, 'Өсіп кетіпті! Бүгін жұлу керек, әйтпесе қызанақ көрінбей қалады.')],
    [K.mc('Who helped Aigul?', ['her neighbour', 'her brother', 'Tom'], 0), K.mc('How long was she away?', ['two weeks', 'two days', 'two months'], 0), K.mc('What must she do today?', ['pull out the weeds', 'plant tomatoes', 'water the garden'], 0)]);
  Q('u21', 'A new manager', 'Aigul asks Tom about his new boss.', [
    f(ai, 'Том, жаңа бастығыңыз қалай?'), m(to, 'Жақсы. Ол тыңдап қана қоймай, уәдесін орындайды.'), f(ai, 'Ал бұрынғысы ше?'), m(to, 'Ол бірде айқайлайтын, бірде апталап үндемейтін.'), f(ai, 'Тапсырма бере ме?'), m(to, 'Иә, тәжірибелі қызметкерлерге де, жаңаларға да. Маған тұтас бір жоба берді.')],
    [K.mc('What is the new manager like?', ['He listens and keeps his promises.', 'He shouts a lot.', 'He is never in the office.'], 0), K.mc('What was the old manager like?', ['He either shouted or was silent for weeks.', 'He was kind to everyone.', 'He gave too many projects.'], 0), K.mc('What has Tom been given?', ['a whole project', 'a new desk', 'a holiday'], 0)]);
  Q('u22', 'My grandmother', 'Tom asks Aigul about her grandmother.', [
    m(to, 'Айгүл, әжеңіз неше жаста?'), f(ai, 'Сексен екіде. Ол менен әлдеқайда ширақ!'), m(to, 'Сыры неде?'), f(ai, 'Күн сайын бес шақырым жаяу жүреді. Мінезі де аса жұмсақ.'), m(to, 'Жалғыз тұра ма?'), f(ai, 'Иә, бірақ біз барған сайын жиі қоңырау шаламыз. Жақында бейнеқоңырау шалуды үйренді.')],
    [K.mc('How old is Aigul’s grandmother?', ['eighty-two', 'seventy-two', 'ninety-two'], 0), K.mc('What does she do every day?', ['walks five kilometres', 'swims', 'cooks for the family'], 0), K.mc('What has she learned recently?', ['video calls', 'driving', 'English'], 0)]);
  Q('u23', 'A call to the akimat', 'Tom phones an office about a request.', [
    f('Қызметкер', 'Әкімдік, тыңдап тұрмын.'), m(to, 'Сәлеметсіз бе. Мен балалар ойын алаңы туралы жолданым жөнінде хабарласып тұрмын.'), f('Қызметкер', 'Жолданымның нөмірін айтыңыз.'), m(to, 'Жүз жиырма бес.'), f('Қызметкер', 'Ол қаралды. Жоспарға сәйкес жөндеу сәуірде басталады.'), m(to, 'Жауапты жазбаша алуға бола ма?'), f('Қызметкер', 'Иә, үш күн ішінде поштаңызға жібереміз.')],
    [K.mc('What is Tom calling about?', ['a request about a playground', 'a lost passport', 'a water bill'], 0), K.mc('When will the repairs begin?', ['in April', 'in three days', 'next year'], 0), K.mc('How will Tom get the answer in writing?', ['by email within three days', 'by post in a month', 'He must come to the office.'], 0)]);
  Q('u24', 'After B2', 'Aigul congratulates Tom.', [
    f(ai, 'Том, құттықтаймын! Сіз B2 деңгейін аяқтадыңыз.'), m(to, 'Рақмет. Сіз болмағанда, мен A2 деңгейінде-ақ тастап кетер едім.'), f(ai, 'Ең қиыны не болды?'), m(to, 'Ұзын сөйлемдер. Бірақ жаңалық оқыған сайын үйреніп кеттім.'), f(ai, 'Енді не істемексіз?'), m(to, 'Қанша қиын болса да, көктемде емтихан тапсырмақшымын.')],
    [K.mc('Which level has Tom finished?', ['B2', 'B1', 'A2'], 0), K.mc('What was the hardest thing for him?', ['long sentences', 'the alphabet', 'numbers'], 0), K.mc('When does he want to take the exam?', ['in spring', 'tomorrow', 'in two years'], 0)]);

  /* ================= Level tests: 30 questions, 35 minutes. The right answer moves between A, B and C. ================= */
  var n = 0, T = function (q, right, w1, w2) { var o = [w1, w2]; o.splice(n++ % 3, 0, right); return { t: 'mc', q: q, o: o, a: o.indexOf(right) }; };
  var IDS = []; for (var i = 1; i <= 24; i++) IDS.push('u' + i);
  var test = function (cid, name, ex) {
    IFX.units(cid, [{ id: 't1', title: name + ' B2 level test', topic: 'Level test', lessons: [{ id: 't', type: 'test', title: name + ' B2 level test', mins: 35, ex: ex }] }]);
    IFX.order(cid, IDS.concat(['t1']));
  };
  test('ru-b2', 'Russian', [
    T('Человек, ___ в этом доме, — мой сосед.', 'живущий', 'живя', 'живёт'), T('Девушка, ___ это письмо, уже уехала.', 'написавшая', 'написанная', 'написав'),
    T('Письмо, ___ вчера, лежит на столе.', 'написанное', 'написавшее', 'написав'), T('Магазин ___.', 'закрыт', 'закрытый', 'закрыв'),
    T('___ новости, я всегда проверяю, кто их написал.', 'Читая', 'Читающий', 'Прочитанный'), T('___ книгу, я лёг спать.', 'Прочитав', 'Прочитанный', 'Читающий'),
    T('Вам ___ отдохнуть.', 'стоит', 'стоите', 'стоять'), T('На вашем месте я ___ взял отпуск.', 'бы', 'буду', 'был'),
    T('Мы ___ до озера за два часа.', 'дошли', 'зашли', 'обошли'), T('По дороге мы ___ в кафе.', 'зашли', 'дошли', 'обошли'),
    T('___ сестры учатся в Астане.', 'Обе', 'Оба', 'Двое'), T('У них ___ детей.', 'двое', 'оба', 'два'),
    T('Меня удивило ___, что он не пришёл.', 'то', 'тот', 'та'), T('___, кто много читает, пишет лучше.', 'Тот', 'То', 'Те'),
    T('Рейс отменили из-за ___, что был туман.', 'того', 'тому', 'то'), T('Благодаря ___, что жители экономили, воды хватило.', 'тому', 'того', 'то'),
    T('Что бы он ___ делал, у него всё получается.', 'ни', 'не', 'нет'), T('Мне ___ отдыхать: много работы.', 'некогда', 'никогда', 'негде'),
    T('Первое видео посмотрели ___ больше людей.', 'гораздо', 'очень', 'самый'), T('Я хочу ___ эту книгу ещё раз.', 'перечитать', 'дочитать', 'начитаться'),
    T('Мне ___ остановиться и помочь.', 'пришлось', 'пришёл', 'приходил'), T('Успех зависит ___ качества.', 'от', 'на', 'в'),
    T('Мне ___ в голову интересная идея.', 'пришла', 'вошла', 'дошла'), T('___ чем ответить, она думает.', 'Прежде', 'После', 'Перед'),
    T('смелый → the quality = …', 'смелость', 'смеление', 'смелитель'), T('По словам ___, это неправда.', 'преподавателя', 'преподаватель', 'преподавателю'),
    T('Образец состоит ___ песка и глины.', 'из', 'в', 'к'), T('Если бы ___ орошение, мы бы потеряли урожай.', 'не', 'ни', 'нет'),
    T('Ни талант, ни опыт ___ заменят доверия.', 'не', 'ни', 'нет'), T('Ответ придёт в течение ___.', 'месяца', 'месяцем', 'месяц')]);
  test('kk-b2', 'Kazakh', [
    T('Мен оның кел___ білемін.', 'генін', 'ген', 'генде'), T('Оның қайда тұр___ білмеймін.', 'атынын', 'атын', 'ған'),
    T('Мен шаштаразда шашымды қи___дым. (had it cut)', 'дыр', 'ыл', 'ыс'), T('Мұғалім оқушыларға мәтінді оқы___ты. (made them read)', 'т', 'л', 'н'),
    T('Ол хат жаз___ бастады.', 'а', 'ып', 'ған'), T('Мен кітапты оқып ___. (finished)', 'болдым', 'көрдім', 'бастадым'),
    T('Демал___ жөн. (you should)', 'ғаныңыз', 'атын', 'ып'), T('Ертең жаңбыр жаума___ екен! (if only)', 'са', 'ған', 'й'),
    T('Олар бір-бірімен сөйле___ті.', 'с', 'н', 'л'), T('Ол жылы киі___ді. (dressed himself)', 'н', 'с', 'т'),
    T('Біз үш___ бардық. (the three of us)', 'еуміз', 'інші', 'тен'), T('Судың үштен ___ қалды.', 'бірі', 'есесі', 'еуі'),
    T('Жаңбыр жау___, біз үйде қалдық. (because)', 'ғандықтан', 'ғанша', 'ған сайын'), T('Мен кел___ күтіңіз. (until)', 'генше', 'гендіктен', 'ген сайын'),
    T('Құрғақшылықтың ___ егін шықпады.', 'салдарынан', 'арқасында', 'мақсатында'), T('Достарымның ___ мен жұмыс таптым. (thanks to)', 'арқасында', 'салдарынан', 'жөнінде'),
    T('Қанша қиын бол___ да, мен берілмеймін.', 'са', 'ған', 'ып'), T('Менің демал___ уақытым жоқ.', 'атын', 'етін', 'ған'),
    T('Біз клуб аш___мыз. (intend to)', 'пақшы', 'мақшы', 'бақшы'), T('Маған тоқта___ тура келді.', 'уға', 'уды', 'удан'),
    T('Табыс сапа___ байланысты.', 'ға', 'дан', 'мен'), T('Ол демалыс___ бас тартты.', 'тан', 'қа', 'пен'),
    T('Менің ___ қызық идея келді.', 'ойыма', 'ойымда', 'ойымнан'), T('Жауап бер___ дейін ол ойланады.', 'генге', 'геннен', 'гендіктен'),
    T('кітап → the place = …', 'кітапхана', 'кітапшы', 'кітапты'), T('Оқытушының ___, бұл жаңалық жалған.', 'айтуынша', 'айтқан', 'айтып'),
    T('Сынама құм мен саз___ тұрады.', 'дан', 'ға', 'бен'), T('Сен ___, мен кешігер едім.', 'болмағанда', 'болғанда', 'болып'),
    T('Ол ___ басшы, әрі дос.', 'әрі', 'не', 'бірде'), T('Жоспарға ___ жөндеу сәуірде басталады.', 'сәйкес', 'ішінде', 'жөнінде')]);
})();
