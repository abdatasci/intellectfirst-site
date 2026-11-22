/* IF Lingo · A2 extras for Russian and Kazakh: one listening lesson for every unit, and the level test.
   Original IF Academy scripts. The script can be opened on the screen, so the lesson still works where a voice is missing. */
(function () {
  var K = IFX.k, f = function (s, t) { return { s: s, g: 'f', t: t }; }, m = function (s, t) { return { s: s, g: 'm', t: t }; };
  var A = function (cid, uid, title, intro, script, ex) { IFX.listening(cid, uid, { title: title, intro: intro, script: script, ex: ex }); };
  var R = function (uid, title, intro, script, ex) { A('ru-a2', uid, title, intro, script, ex); }, Q = function (uid, title, intro, script, ex) { A('kk-a2', uid, title, intro, script, ex); };
  var an = 'Анна', to = 'Том', ai = 'Айгүл';

  /* ================= Russian A2 ================= */
  R('u1', 'Where are you from?', 'Anna meets Tom at a language school.', [
    f(an, 'Том, откуда вы?'), m(to, 'Я из Англии, из Лондона. А вы?'), f(an, 'Я из Казахстана, из Костаная.'), m(to, 'Какая у вас профессия?'), f(an, 'Я инженер. А вы?'), m(to, 'Я учитель. Мой родной язык — английский.')],
    [K.mc('Where is Tom from?', ['London', 'Kostanay', 'Moscow'], 0), K.mc('What is Anna’s profession?', ['engineer', 'teacher', 'doctor'], 0), K.tf('Tom’s native language is English.', true)]);
  R('u2', 'What is your city like?', 'Tom asks Anna about her city.', [
    m(to, 'Анна, в вашем городе есть метро?'), f(an, 'Нет, метро нет. Но есть автобусы.'), m(to, 'А театр есть?'), f(an, 'Да, есть театр и большой торговый центр.'), m(to, 'Ваш район шумный?'), f(an, 'Нет, тихий. Там нет завода.')],
    [K.tf('The city has a metro.', false), K.mc('What is there in the city?', ['a theatre and a shopping centre', 'a metro and a stadium', 'a factory and a mosque'], 0), K.mc('What is Anna’s district like?', ['quiet', 'noisy', 'new'], 0)]);
  R('u3', 'When do you wake up?', 'Anna and Tom compare their days.', [
    f(an, 'Том, когда ты просыпаешься?'), m(to, 'Я просыпаюсь в семь. А ты?'), f(an, 'В шесть. Моя работа начинается в восемь.'), m(to, 'Ты занимаешься спортом?'), f(an, 'Да, раз в неделю. А когда ты ложишься?'), m(to, 'Поздно. Я ложусь в двенадцать.')],
    [K.mc('When does Tom wake up?', ['at seven', 'at six', 'at eight'], 0), K.mc('How often does Anna do sport?', ['once a week', 'every day', 'never'], 0), K.mc('When does Tom go to bed?', ['at twelve', 'at ten', 'at eleven'], 0)]);
  R('u4', 'What will you have?', 'Tom orders in a restaurant.', [
    f('Официант', 'Добрый вечер! Что вы хотите?'), m(to, 'Можно меню, пожалуйста?'), f('Официант', 'Вот, пожалуйста.'), m(to, 'Я буду салат и рыбу.'), f('Официант', 'А на десерт?'), m(to, 'Торт, пожалуйста. И счёт.')],
    [K.mc('What does Tom ask for first?', ['the menu', 'the bill', 'water'], 0), K.mc('What does he order?', ['salad and fish', 'soup and meat', 'only cake'], 0), K.tf('He has cake for dessert.', true)]);
  R('u5', 'A kilogram of tomatoes', 'Anna shops at the market.', [
    f(an, 'Здравствуйте! Килограмм помидоров, пожалуйста.'), m('Продавец', 'Пожалуйста. Что ещё?'), f(an, 'Огурцы свежие?'), m('Продавец', 'Да, очень свежие.'), f(an, 'Тогда несколько огурцов и бутылка воды.'), m('Продавец', 'Тысяча тенге. Пакет?'), f(an, 'Нет, спасибо.')],
    [K.mc('How many tomatoes does Anna buy?', ['a kilogram', 'two kilograms', 'a few'], 0), K.mc('How much does she pay?', ['1,000 tenge', '2,000 tenge', '100 tenge'], 0), K.tf('Anna takes a bag.', false)]);
  R('u6', 'Who is that man?', 'Tom looks at Anna’s photo.', [
    m(to, 'Анна, кто этот высокий человек?'), f(an, 'Это брат мамы, мой дядя.'), m(to, 'У него борода!'), f(an, 'Да. Он очень добрый и весёлый.'), m(to, 'А это его машина?'), f(an, 'Нет, это машина папы.')],
    [K.mc('Who is the tall man?', ['Anna’s uncle', 'Anna’s father', 'Anna’s brother'], 0), K.tf('He has a beard.', true), K.mc('Whose car is it?', ['her father’s', 'her uncle’s', 'her brother’s'], 0)]);
  R('u7', 'Have you read it?', 'Anna asks Tom about a book.', [
    f(an, 'Том, ты прочитал книгу?'), m(to, 'Ещё нет. Я читал вчера два часа.'), f(an, 'А слова ты выучил?'), m(to, 'Да, выучил все двадцать слов!'), f(an, 'Молодец! А письмо написал?'), m(to, 'Написал. Вот оно.')],
    [K.tf('Tom has finished the book.', false), K.mc('How many words did Tom learn?', ['twenty', 'two', 'twelve'], 0), K.tf('Tom has written the letter.', true)]);
  R('u8', 'How do I get to the post office?', 'Tom asks a woman the way.', [
    m(to, 'Извините, как пройти до почты?'), f('Женщина', 'Идите прямо до перекрёстка.'), m(to, 'А потом?'), f('Женщина', 'Потом поверните направо. Почта напротив банка.'), m(to, 'Это далеко?'), f('Женщина', 'Нет, один квартал.')],
    [K.mc('Where does Tom want to go?', ['to the post office', 'to the bank', 'to the museum'], 0), K.mc('Where does he turn?', ['right at the crossroads', 'left at the traffic light', 'right at the bank'], 0), K.mc('How far is it?', ['one block', 'two blocks', 'five blocks'], 0)]);
  R('u9', 'You need to rest', 'Tom is ill and phones Anna.', [
    f(an, 'Том, как ты себя чувствуешь?'), m(to, 'Плохо. У меня простуда и кашель.'), f(an, 'Тебе нужно пить чай с лимоном.'), m(to, 'А мне можно гулять?'), f(an, 'Нет, тебе нельзя гулять. Тебе нужно спать.'), m(to, 'Хорошо, доктор Анна!')],
    [K.mc('What is wrong with Tom?', ['a cold and a cough', 'a bad leg', 'a toothache'], 0), K.mc('What should he drink?', ['tea with lemon', 'cold water', 'coffee'], 0), K.tf('Tom may go for a walk.', false)]);
  R('u10', 'A new job', 'Anna tells Tom about her work.', [
    m(to, 'Анна, где ты сейчас работаешь?'), f(an, 'Я работаю инженером в новой компании.'), m(to, 'Тебе нравится?'), f(an, 'Да. У меня хорошие коллеги, но начальник очень занят.'), m(to, 'А зарплата?'), f(an, 'Хорошая. А ты работаешь учителем?'), m(to, 'Да, в школе.')],
    [K.mc('What is Anna’s job?', ['engineer', 'teacher', 'boss'], 0), K.tf('Anna’s boss is very busy.', true), K.mc('Where does Tom work?', ['at a school', 'at a company', 'at a hospital'], 0)]);
  R('u11', 'Let’s go to the cinema', 'Tom invites Anna out.', [
    m(to, 'Анна, ты свободна в пятницу?'), f(an, 'К сожалению, в пятницу я не могу.'), m(to, 'А в субботу?'), f(an, 'В субботу могу.'), m(to, 'Давай пойдём в кино!'), f(an, 'С удовольствием! Давай встретимся в шесть.')],
    [K.tf('Anna is free on Friday.', false), K.mc('Where are they going?', ['to the cinema', 'to an exhibition', 'to a party'], 0), K.mc('When will they meet?', ['on Saturday at six', 'on Friday at six', 'on Saturday at seven'], 0)]);
  R('u12', 'Colder than London', 'Tom phones Anna from London.', [
    m(to, 'Анна, какая сегодня погода в Костанае?'), f(an, 'Сильный мороз, минус тридцать!'), m(to, 'Ого! В Лондоне теплее: плюс пять.'), f(an, 'У вас солнечно?'), m(to, 'Нет, пасмурно. А какой прогноз на завтра?'), f(an, 'Завтра будет лучше: минус двадцать.')],
    [K.mc('What is the temperature in Kostanay today?', ['minus 30', 'minus 20', 'plus 5'], 0), K.tf('It is sunny in London.', false), K.mc('What will tomorrow be like in Kostanay?', ['better: minus 20', 'colder: minus 35', 'the same'], 0)]);
  R('u13', 'Who will do what?', 'Anna and Tom clean the flat.', [
    f(an, 'Том, сегодня уборка. Что ты сделаешь?'), m(to, 'Я помою посуду.'), f(an, 'Хорошо. А я постираю одежду.'), m(to, 'А кто вынесет мусор?'), f(an, 'Ты! А потом я буду гладить.'), m(to, 'Хорошо. Где пылесос?')],
    [K.mc('What will Tom wash?', ['the dishes', 'the clothes', 'the car'], 0), K.mc('Who will take out the rubbish?', ['Tom', 'Anna', 'nobody'], 0), K.tf('Anna will iron.', true)]);
  R('u14', 'If the weather is good', 'Anna and Tom plan the weekend.', [
    m(to, 'Анна, что ты будешь делать в воскресенье?'), f(an, 'Если будет хорошая погода, я пойду в парк.'), m(to, 'А если будет дождь?'), f(an, 'Наверное, я буду дома. А ты?'), m(to, 'Я обязательно буду учить русский. Через месяц у меня экзамен!')],
    [K.mc('Where will Anna go if the weather is good?', ['to the park', 'to the cinema', 'to work'], 0), K.tf('If it rains, Anna will probably be at home.', true), K.mc('When is Tom’s exam?', ['in a month', 'in a week', 'tomorrow'], 0)]);
  R('u15', 'Can I speak to Anna?', 'Tom phones Anna’s office.', [
    m(to, 'Алло! Можно Анну?'), f('Коллега', 'Она на совещании. Что ей передать?'), m(to, 'Передайте, пожалуйста, что звонил Том.'), f('Коллега', 'Хорошо. Она вам перезвонит.'), m(to, 'Спасибо. Или я отправлю ей сообщение.')],
    [K.mc('Where is Anna?', ['at a meeting', 'at home', 'at lunch'], 0), K.tf('Anna will call Tom back.', true), K.mc('What else will Tom do?', ['send her a message', 'come to the office', 'write a letter'], 0)]);
  R('u16', 'When is your birthday?', 'Anna and Tom talk about dates.', [
    f(an, 'Том, когда твой день рождения?'), m(to, 'Пятого мая. А твой?'), f(an, 'Третьего января.'), m(to, 'О, это скоро после Нового года!'), f(an, 'Да. Мы отмечаем два праздника.'), m(to, 'Желаю тебе счастья!')],
    [K.mc('When is Tom’s birthday?', ['on 5 May', 'on 3 January', 'on 1 May'], 0), K.mc('When is Anna’s birthday?', ['on 3 January', 'on 5 May', 'on 1 January'], 0), K.tf('Anna’s birthday is soon after New Year.', true)]);
  R('u17', 'Do you like the city?', 'Anna asks Tom about Kostanay.', [
    f(an, 'Том, тебе нравится Костанай?'), m(to, 'Да, очень. По-моему, это красивый город.'), f(an, 'А что тебе не нравится?'), m(to, 'Мне не нравятся морозы.'), f(an, 'А мне нравится зима!'), m(to, 'Я рад. У всех своё мнение.')],
    [K.tf('Tom likes Kostanay.', true), K.mc('What does Tom not like?', ['the frosts', 'the people', 'the food'], 0), K.mc('What does Anna like?', ['winter', 'summer', 'rain'], 0)]);
  R('u18', 'My phone is broken', 'Tom goes to a repair shop.', [
    m(to, 'Здравствуйте! У меня сломался телефон.'), f('Мастер', 'Что случилось?'), m(to, 'Он не включается.'), f('Мастер', 'Я починю его завтра.'), m(to, 'Сколько стоит эта услуга?'), f('Мастер', 'Пять тысяч тенге.')],
    [K.mc('What is broken?', ['Tom’s phone', 'Tom’s car', 'Tom’s computer'], 0), K.mc('When will it be ready?', ['tomorrow', 'today', 'in a week'], 0), K.mc('How much is the repair?', ['5,000 tenge', '500 tenge', '15,000 tenge'], 0)]);
  R('u19', 'What happened?', 'Tom is late and tells Anna why.', [
    f(an, 'Том, что случилось? Ты опоздал.'), m(to, 'Извини! Я потерял билет на автобус.'), f(an, 'И что ты сделал?'), m(to, 'Я искал его, но не нашёл. Поэтому я пошёл пешком.'), f(an, 'А где был билет?'), m(to, 'Я вспомнил: он был в куртке!')],
    [K.mc('What did Tom lose?', ['his bus ticket', 'his keys', 'his phone'], 0), K.mc('How did Tom come?', ['on foot', 'by bus', 'by taxi'], 0), K.mc('Where was the ticket?', ['in his jacket', 'in his bag', 'at home'], 0)]);
  R('u20', 'A year in Kazakhstan', 'Anna asks Tom about his year.', [
    f(an, 'Том, ты уже год в Казахстане. Тебе здесь нравится?'), m(to, 'Действительно нравится, особенно люди.'), f(an, 'А что было трудно?'), m(to, 'Зима! Здесь холоднее, чем в Англии.'), f(an, 'А русский язык?'), m(to, 'Я выучил почти тысячу слов!')],
    [K.mc('What does Tom like most?', ['the people', 'the winter', 'the food'], 0), K.tf('Winter in Kazakhstan is colder than in England.', true), K.mc('How many words has Tom learned?', ['almost 1,000', 'almost 100', '5,000'], 0)]);

  /* ================= Kazakh A2 ================= */
  Q('u1', 'Where are you from?', 'Aigul meets Tom at a language school.', [
    f(ai, 'Том, сіз қайдансыз?'), m(to, 'Мен Англияданмын, Лондоннан келдім. Ал сіз?'), f(ai, 'Мен Қазақстаннанмын, Қостанайданмын.'), m(to, 'Сіздің мамандығыңыз қандай?'), f(ai, 'Мен инженермін. Ал сіз?'), m(to, 'Мен мұғаліммін. Менің ана тілім — ағылшын тілі.')],
    [K.mc('Where is Tom from?', ['London', 'Kostanay', 'Moscow'], 0), K.mc('What is Aigul’s profession?', ['engineer', 'teacher', 'doctor'], 0), K.tf('Tom’s native language is English.', true)]);
  Q('u2', 'Which city is bigger?', 'Tom asks Aigul about two cities.', [
    m(to, 'Айгүл, Қостанай үлкен қала ма?'), f(ai, 'Жоқ, Астана Қостанайдан үлкенірек.'), m(to, 'Ал қай қала тынышырақ?'), f(ai, 'Қостанай тынышырақ. Астана шулы.'), m(to, 'Сіздің ауданыңыз қандай?'), f(ai, 'Менің ауданым тыныш, жанында парк бар.')],
    [K.mc('Which city is bigger?', ['Astana', 'Kostanay', 'They are the same.'], 0), K.mc('Which city is quieter?', ['Kostanay', 'Astana', 'London'], 0), K.tf('There is a park near Aigul’s district.', true)]);
  Q('u3', 'What are you doing?', 'Tom phones Aigul.', [
    m(to, 'Сәлем, Айгүл! Не істеп жатырсыз?'), f(ai, 'Мен кешкі ас дайындап жатырмын. Ал сіз?'), m(to, 'Мен кітап оқып отырмын.'), f(ai, 'Қандай кітап?'), m(to, 'Қазақ тілі кітабы. Ал балалар не істеп жатыр?'), f(ai, 'Олар теледидар қарап отыр.')],
    [K.mc('What is Aigul doing?', ['preparing dinner', 'reading a book', 'watching television'], 0), K.mc('What is Tom reading?', ['a Kazakh language book', 'a newspaper', 'a message'], 0), K.mc('What are the children doing?', ['watching television', 'sleeping', 'playing football'], 0)]);
  Q('u4', 'What would you like?', 'Tom orders in a restaurant.', [
    f('Даяшы', 'Қайырлы кеш! Не жегіңіз келеді?'), m(to, 'Мәзірді беріңізші.'), f('Даяшы', 'Міне, мәзір.'), m(to, 'Менің салат пен балық жегім келеді.'), f('Даяшы', 'Не ішкіңіз келеді?'), m(to, 'Шай. Содан кейін есепшотты беріңізші.')],
    [K.mc('What does Tom ask for first?', ['the menu', 'the bill', 'water'], 0), K.mc('What does he want to eat?', ['salad and fish', 'soup and meat', 'cake'], 0), K.mc('What does he want to drink?', ['tea', 'coffee', 'juice'], 0)]);
  Q('u5', 'A kilogram of tomatoes', 'Aigul shops at the market.', [
    f(ai, 'Сәлеметсіз бе! Бір килограмм қызанақ беріңізші.'), m('Сатушы', 'Міне. Тағы не керек?'), f(ai, 'Қияр балғын ба?'), m('Сатушы', 'Иә, өте балғын.'), f(ai, 'Онда мына қиярды да аламын. Және бір шөлмек су.'), m('Сатушы', 'Мың теңге. Пакет керек пе?'), f(ai, 'Жоқ, рақмет.')],
    [K.mc('How many tomatoes does Aigul buy?', ['a kilogram', 'two kilograms', 'a few'], 0), K.mc('How much does she pay?', ['1,000 tenge', '2,000 tenge', '100 tenge'], 0), K.tf('Aigul takes a bag.', false)]);
  Q('u6', 'Who is that man?', 'Tom looks at Aigul’s photo.', [
    m(to, 'Айгүл, мына ұзын бойлы адам кім?'), f(ai, 'Бұл анамның ағасы.'), m(to, 'Оның сақалы бар!'), f(ai, 'Иә. Ол өте мейірімді және көңілді.'), m(to, 'Бұл оның көлігі ме?'), f(ai, 'Жоқ, бұл әкемнің көлігі.')],
    [K.mc('Who is the tall man?', ['her mother’s brother', 'her father', 'her brother'], 0), K.tf('He has a beard.', true), K.mc('Whose car is it?', ['her father’s', 'her uncle’s', 'her brother’s'], 0)]);
  Q('u7', 'Have you been to Almaty?', 'Aigul asks Tom about his travels.', [
    f(ai, 'Том, сіз Алматыда болғансыз ба?'), m(to, 'Иә, бір рет болғанмын. Тамаша қала!'), f(ai, 'Бешбармақ жегенсіз бе?'), m(to, 'Иә, жегенмін. Өте дәмді ұлттық тағам.'), f(ai, 'Ал қымыз ішкенсіз бе?'), m(to, 'Жоқ, ішкен емеспін.')],
    [K.mc('How many times has Tom been to Almaty?', ['once', 'never', 'many times'], 0), K.tf('Tom has eaten beshbarmak.', true), K.tf('Tom has drunk kumys.', false)]);
  Q('u8', 'How do I get to the post office?', 'Tom asks a woman the way.', [
    m(to, 'Кешіріңіз, поштаға қалай баруға болады?'), f('Әйел', 'Қиылысқа дейін тура барыңыз.'), m(to, 'Содан кейін ше?'), f('Әйел', 'Содан кейін оңға бұрылыңыз. Пошта банктің артында.'), m(to, 'Алыс па?'), f('Әйел', 'Жоқ, жақын. Жаяу үш минут.')],
    [K.mc('Where does Tom want to go?', ['to the post office', 'to the bank', 'to the museum'], 0), K.mc('Where is the post office?', ['behind the bank', 'opposite the bank', 'at the crossroads'], 0), K.mc('How far is it?', ['three minutes on foot', 'ten minutes on foot', 'far away'], 0)]);
  Q('u9', 'You need to rest', 'Tom is ill and phones Aigul.', [
    f(ai, 'Том, өзіңізді қалай сезінесіз?'), m(to, 'Жаман. Маған суық тиді, жөтел бар.'), f(ai, 'Сізге лимон қосылған шай ішу керек.'), m(to, 'Маған серуендеуге бола ма?'), f(ai, 'Жоқ, серуендеуге болмайды. Сізге ұйықтау керек.'), m(to, 'Жақсы, кеңесіңізге рақмет!')],
    [K.mc('What is wrong with Tom?', ['a cold and a cough', 'a bad leg', 'a toothache'], 0), K.mc('What should he drink?', ['tea with lemon', 'cold water', 'coffee'], 0), K.tf('Tom may go for a walk.', false)]);
  Q('u10', 'A new job', 'Aigul tells Tom about her work.', [
    m(to, 'Айгүл, сіз қазір қайда жұмыс істейсіз?'), f(ai, 'Мен жаңа компанияда инженер болып жұмыс істеймін.'), m(to, 'Жұмыс сізге ұнай ма?'), f(ai, 'Иә. Әріптестерім жақсы, жалақы да жақсы.'), m(to, 'Ал бастығыңыз қандай?'), f(ai, 'Ол мейірімді, бірақ үнемі бос емес.')],
    [K.mc('What is Aigul’s job?', ['engineer', 'teacher', 'boss'], 0), K.tf('The salary is good.', true), K.mc('What is her boss like?', ['kind but always busy', 'young and cheerful', 'new'], 0)]);
  Q('u11', 'Let’s go to the cinema', 'Tom invites Aigul out.', [
    m(to, 'Айгүл, сіз жұмада боссыз ба?'), f(ai, 'Өкінішке орай, жұмада бара алмаймын.'), m(to, 'Ал сенбіде ше?'), f(ai, 'Сенбіде боспын.'), m(to, 'Киноға барайық!'), f(ai, 'Қуана-қуана! Сағат алтыда кездесейік.')],
    [K.tf('Aigul is free on Friday.', false), K.mc('Where are they going?', ['to the cinema', 'to an exhibition', 'to a celebration'], 0), K.mc('When will they meet?', ['on Saturday at six', 'on Friday at six', 'on Saturday at seven'], 0)]);
  Q('u12', 'Colder than London', 'Tom phones Aigul from London.', [
    m(to, 'Айгүл, бүгін Қостанайда ауа райы қандай?'), f(ai, 'Қатты аяз, отыз градус суық!'), m(to, 'О! Лондон Қостанайға қарағанда жылырақ: бес градус жылы.'), f(ai, 'Сізде күн шуақты ма?'), m(to, 'Жоқ, бұлтты. Ертеңгі болжам қандай?'), f(ai, 'Ертең жақсырақ болады: жиырма градус суық.')],
    [K.mc('What is the temperature in Kostanay today?', ['minus 30', 'minus 20', 'plus 5'], 0), K.tf('It is sunny in London.', false), K.mc('What will tomorrow be like in Kostanay?', ['better: minus 20', 'colder: minus 35', 'the same'], 0)]);
  Q('u13', 'Who will do what?', 'Aigul and Tom clean the flat.', [
    f(ai, 'Том, бүгін үй жинаймыз. Сіз не істейсіз?'), m(to, 'Мен ыдыс жуып, қоқыс шығарамын.'), f(ai, 'Жақсы. Ал мен кір жуып, содан кейін үтіктеймін.'), m(to, 'Шаңсорғыш қайда?'), f(ai, 'Балконда. Маған көмектесіңізші.'), m(to, 'Әрине!')],
    [K.mc('What will Tom wash?', ['the dishes', 'the clothes', 'the car'], 0), K.mc('Who will take out the rubbish?', ['Tom', 'Aigul', 'nobody'], 0), K.mc('Where is the vacuum cleaner?', ['on the balcony', 'in the kitchen', 'in the room'], 0)]);
  Q('u14', 'If the weather is good', 'Aigul and Tom plan the weekend.', [
    m(to, 'Айгүл, жексенбіде не істейсіз?'), f(ai, 'Егер ауа райы жақсы болса, паркке барамын.'), m(to, 'Ал жаңбыр жауса ше?'), f(ai, 'Бәлкім, үйде боламын. Ал сіз?'), m(to, 'Мен міндетті түрде қазақ тілін оқимын. Бір айдан кейін менде емтихан!')],
    [K.mc('Where will Aigul go if the weather is good?', ['to the park', 'to the cinema', 'to work'], 0), K.tf('If it rains, perhaps Aigul will be at home.', true), K.mc('When is Tom’s exam?', ['in a month', 'in a week', 'tomorrow'], 0)]);
  Q('u15', 'Can I speak to Aigul?', 'Tom phones Aigul’s office.', [
    m(to, 'Алло! Айгүлді шақырыңызшы.'), f('Әріптес', 'Ол жиналыста. Оған не айтайын?'), m(to, 'Том қоңырау шалды деп айтыңызшы.'), f('Әріптес', 'Жақсы, жеткіземін. Ол сізге қоңырау шалады.'), m(to, 'Рақмет. Мен оған хабарлама да жіберемін.')],
    [K.mc('Where is Aigul?', ['at a meeting', 'at home', 'at lunch'], 0), K.tf('Aigul will call Tom.', true), K.mc('What else will Tom do?', ['send her a message', 'come to the office', 'write a letter'], 0)]);
  Q('u16', 'When is your birthday?', 'Aigul and Tom talk about dates.', [
    f(ai, 'Том, сіздің туған күніңіз қашан?'), m(to, 'Бесінші мамырда. Ал сіздікі ше?'), f(ai, 'Үшінші қаңтарда.'), m(to, 'О, Жаңа жылдан кейін бірден!'), f(ai, 'Иә. Біз екі мерекені тойлаймыз.'), m(to, 'Сізге бақыт тілеймін!')],
    [K.mc('When is Tom’s birthday?', ['on 5 May', 'on 3 January', 'on 1 May'], 0), K.mc('When is Aigul’s birthday?', ['on 3 January', 'on 5 May', 'on 1 January'], 0), K.tf('Aigul’s birthday is just after New Year.', true)]);
  Q('u17', 'Do you like the city?', 'Aigul asks Tom about Kostanay.', [
    f(ai, 'Том, сізге Қостанай ұнай ма?'), m(to, 'Иә, өте ұнайды. Менің ойымша, бұл әдемі қала.'), f(ai, 'Ал не ұнамайды?'), m(to, 'Маған аяз ұнамайды.'), f(ai, 'Ал маған қыс ұнайды!'), m(to, 'Жақсы. Әркімнің өз пікірі бар.')],
    [K.tf('Tom likes Kostanay.', true), K.mc('What does Tom not like?', ['the frost', 'the people', 'the food'], 0), K.mc('What does Aigul like?', ['winter', 'summer', 'rain'], 0)]);
  Q('u18', 'My phone is broken', 'Tom goes to a repairman.', [
    m(to, 'Сәлеметсіз бе! Менің телефоным бұзылды.'), f('Шебер', 'Не болды?'), m(to, 'Ол қосылмайды. Мен оны жөндеу үшін келдім.'), f('Шебер', 'Мен оны ертең жөндеймін.'), m(to, 'Бұл қызмет қанша тұрады?'), f('Шебер', 'Бес мың теңге.')],
    [K.mc('What is broken?', ['Tom’s phone', 'Tom’s car', 'Tom’s computer'], 0), K.mc('When will it be ready?', ['tomorrow', 'today', 'in a week'], 0), K.mc('How much is the repair?', ['5,000 tenge', '500 tenge', '15,000 tenge'], 0)]);
  Q('u19', 'What happened?', 'Tom is late and tells Aigul why.', [
    f(ai, 'Том, не болды? Сіз кешіктіңіз.'), m(to, 'Кешіріңіз! Мен автобус билетін жоғалттым.'), f(ai, 'Содан кейін не істедіңіз?'), m(to, 'Мен оны іздедім, бірақ таппадым. Сондықтан жаяу келдім.'), f(ai, 'Билет қайда болды?'), m(to, 'Есіме түсірдім: ол күртемде болды!')],
    [K.mc('What did Tom lose?', ['his bus ticket', 'his keys', 'his phone'], 0), K.mc('How did Tom come?', ['on foot', 'by bus', 'by taxi'], 0), K.mc('Where was the ticket?', ['in his jacket', 'in his bag', 'at home'], 0)]);
  Q('u20', 'A year in Kazakhstan', 'Aigul asks Tom about his year.', [
    f(ai, 'Том, сіз Қазақстанда бір жыл тұрдыңыз. Сізге мұнда ұнай ма?'), m(to, 'Шынымен ұнайды, әсіресе адамдар.'), f(ai, 'Не қиын болды?'), m(to, 'Қыс! Мұнда Англияға қарағанда суығырақ.'), f(ai, 'Ал қазақ тілі ше?'), m(to, 'Мен мыңға жуық сөз жаттадым!')],
    [K.mc('What does Tom like most?', ['the people', 'the winter', 'the food'], 0), K.tf('Winter in Kazakhstan is colder than in England.', true), K.mc('How many words has Tom learned?', ['almost 1,000', 'almost 100', '5,000'], 0)]);

  /* ================= Level tests: 30 questions, 25 minutes. The right answer moves between A, B and C. ================= */
  var n = 0, T = function (q, right, w1, w2) { var o = [w1, w2]; o.splice(n++ % 3, 0, right); return { t: 'mc', q: q, o: o, a: o.indexOf(right) }; };
  var IDS = []; for (var i = 1; i <= 20; i++) IDS.push('u' + i);
  var test = function (cid, name, ex) {
    IFX.units(cid, [{ id: 't1', title: name + ' A2 level test', topic: 'Level test', lessons: [{ id: 't', type: 'test', title: name + ' A2 level test', mins: 25, ex: ex }] }]);
    IFX.order(cid, IDS.concat(['t1']));
  };
  test('ru-a2', 'Russian', [
    T('Я из Лондон___.', 'а', 'ы', 'е'), T('Она из Москв___.', 'ы', 'а', 'у'), T('“Where are you from?” = …', 'Откуда вы?', 'Где вы?', 'Куда вы?'),
    T('В городе нет метро. = …', 'There is no metro in the city.', 'There is a metro in the city.', 'The metro is in the city.'), T('У меня нет брат___.', 'а', 'ы', 'у'),
    T('Я просыпа___ в семь.', 'юсь', 'ется', 'емся'), T('Урок начина___ в девять.', 'ется', 'юсь', 'ются'),
    T('Мы ___ заказать суп.', 'хотим', 'хочу', 'хотят'), T('“The bill, please.” = …', 'Счёт, пожалуйста.', 'Меню, пожалуйста.', 'Сдача, пожалуйста.'),
    T('Бутылка вод___.', 'ы', 'а', 'у'), T('“несколько” means…', 'a few', 'fresh', 'a litre'),
    T('Это машина брат___.', 'а', 'у', 'ом'), T('“весёлый” means…', 'cheerful', 'tall', 'elderly'),
    T('Я уже ___ эту книгу. Возьмите её!', 'прочитал', 'читал', 'читаю'), T('Вчера я ___ письмо три часа.', 'писал', 'написал', 'напишу'),
    T('___ прямо, потом поверните налево.', 'Идите', 'Идти', 'Иду'), T('“перекрёсток” means…', 'crossroads', 'traffic light', 'block'),
    T('___ нужно отдыхать. (you, polite)', 'Вам', 'Вы', 'Вас'), T('Здесь ___ курить. (must not)', 'нельзя', 'нужно', 'можно'),
    T('Я работаю учител___.', 'ем', 'ом', 'ой'), T('Она хочет стать врач___.', 'ом', 'ой', 'ем'),
    T('___ пойдём в кино!', 'Давай', 'Давать', 'Дай'), T('К сожалению, я не ___.', 'могу', 'может', 'могут'),
    T('Сегодня ___, чем вчера.', 'холоднее', 'холодный', 'самый холодный'), T('хороший → better = …', 'лучше', 'хуже', 'больше'),
    T('Завтра я ___ посуду.', 'помою', 'помыл', 'мыл'), T('Если ___ дождь, я буду дома.', 'будет', 'был', 'быть'),
    T('Я позвоню мам___.', 'е', 'у', 'ы'), T('Мне ___ эти книги.', 'нравятся', 'нравится', 'нравлюсь'),
    T('Я опоздал, ___ была пробка.', 'потому что', 'поэтому', 'если')]);
  test('kk-a2', 'Kazakh', [
    T('Мен Астана___ келдім.', 'дан', 'нан', 'тан'), T('Ол Лондон___ келді.', 'нан', 'дан', 'тен'), T('“Where are you from?” = …', 'Сіз қайдансыз?', 'Сіз қайдасыз?', 'Сіз кімсіз?'),
    T('үлкен → bigger = …', 'үлкенірек', 'үлкенрақ', 'ең үлкен'), T('Астана Қостанай___ үлкенірек.', 'дан', 'да', 'ға'),
    T('Мен кітап оқы___ жатырмын.', 'п', 'ып', 'іп'), T('“What are you doing now?” = …', 'Не істеп жатырсыз?', 'Не істедіңіз?', 'Не істейсіз ертең?'),
    T('Менің шай іш___ келеді.', 'кім', 'гім', 'ғым'), T('Менің Алматыға бар___ келеді.', 'ғым', 'гім', 'кім'),
    T('Мен осы кітап___ оқимын.', 'ты', 'ды', 'ны'), T('“бірнеше” means…', 'a few', 'fresh', 'a litre'),
    T('Айгүл___ кітабы', 'дің', 'нің', 'тің'), T('“көңілді” means…', 'cheerful', 'tall', 'elderly'),
    T('Мен Алматыда бол___мын.', 'ған', 'ген', 'кен'), T('Сіз бұл фильмді көр___сіз бе?', 'ген', 'ған', 'қан'),
    T('Тура бар___.', 'ыңыз', 'іңіз', 'ңыз'), T('“қиылыс” means…', 'crossroads', 'traffic light', 'crossing'),
    T('___ демалу керек. (you, polite)', 'Сізге', 'Сіз', 'Сіздің'), T('Мұнда темекі шегуге ___. (must not)', 'болмайды', 'болады', 'керек'),
    T('Мен мұғалім ___ жұмыс істеймін.', 'болып', 'болу', 'болған'), T('Оның дәрігер ___ келеді.', 'болғысы', 'болғым', 'болып'),
    T('Киноға бар___!', 'айық', 'ейік', 'йық'), T('“I cannot go.” = …', 'Мен бара алмаймын.', 'Мен бара аламын.', 'Мен барғанмын.'),
    T('Қаңтар — ___ суық ай.', 'ең', 'өте', 'көп'), T('Алматы Қостанай___ қарағанда жылырақ.', 'ға', 'дан', 'да'),
    T('Мен ыдыс жу___, демаламын.', 'ып', 'іп', 'п'), T('Егер ауа райы жақсы бол___, паркке барамыз.', 'са', 'се', 'сам'),
    T('Мен Марат___ қоңырау шалдым.', 'қа', 'ға', 'ке'), T('Бұл жақсы фильм ___ ойлаймын.', 'деп', 'егер', 'үшін'),
    T('Мен кешіктім, ___ кептеліс болды.', 'өйткені', 'сондықтан', 'бірақ')]);
})();
