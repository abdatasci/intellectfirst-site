/* IF Lingo · A1 extras for Russian and Kazakh: one listening lesson for every unit, and the level test.
   Original IF Academy scripts. The voices are the device's own Russian or Kazakh voices (see langOf in app/ifx.js);
   the script can be opened on the screen, so the lesson still works where a voice is missing. */
(function () {
  var K = IFX.k, f = function (s, t) { return { s: s, g: 'f', t: t }; }, m = function (s, t) { return { s: s, g: 'm', t: t }; };
  var A = function (cid, uid, title, intro, script, ex) { IFX.listening(cid, uid, { title: title, intro: intro, script: script, ex: ex }); };
  var R = function (uid, title, intro, script, ex) { A('ru-a1', uid, title, intro, script, ex); }, Q = function (uid, title, intro, script, ex) { A('kk-a1', uid, title, intro, script, ex); };
  var an = 'Анна', to = 'Том', ai = 'Айгүл';

  /* ================= Russian A1 ================= */
  R('u0', 'Is this a taxi?', 'Tom reads the signs in the city and asks Anna.', [
    m(to, 'Анна, это такси?'), f(an, 'Да, это такси.'), m(to, 'А это банк?'), f(an, 'Нет, это кафе. Банк там.'), m(to, 'А где метро?'), f(an, 'Метро здесь.')],
    [K.mc('What does Tom ask about first?', ['a taxi', 'a bank', 'a park'], 0), K.tf('The second place is a bank.', false), K.mc('Where is the bank?', ['there', 'here', 'in the metro'], 0)]);
  R('u1', 'Nice to meet you', 'Anna and Tom meet for the first time.', [
    f(an, 'Здравствуйте! Меня зовут Анна.'), m(to, 'Здравствуйте! Меня зовут Том.'), f(an, 'Вы студент?'), m(to, 'Да, я студент. А вы?'), f(an, 'Я учитель.'), m(to, 'Спасибо. До свидания!'), f(an, 'До свидания, Том!')],
    [K.mc('What is the woman’s name?', ['Anna', 'Aigul', 'Tom'], 0), K.tf('Tom is a student.', true), K.mc('What is Anna’s job?', ['teacher', 'doctor', 'student'], 0)]);
  R('u2', 'Who is this?', 'Anna shows Tom a photo of her family.', [
    m(to, 'Анна, кто это?'), f(an, 'Это моя семья. Это моя мама, а это мой папа.'), m(to, 'А это твой брат?'), f(an, 'Нет, это мой друг. Мой брат — вот.'), m(to, 'У тебя есть сестра?'), f(an, 'Да, есть. Она в Астане.')],
    [K.mc('Who does Anna show first?', ['her mother', 'her brother', 'her friend'], 0), K.tf('Anna has a sister.', true), K.mc('Where is Anna’s sister?', ['in Astana', 'in Kostanay', 'at school'], 0)]);
  R('u3', 'How old are you?', 'Anna and Tom talk about their ages.', [
    f(an, 'Том, сколько тебе лет?'), m(to, 'Мне двадцать пять лет. А тебе?'), f(an, 'Мне двадцать три года.'), m(to, 'А твой брат? Сколько ему лет?'), f(an, 'Ему десять лет.')],
    [K.mc('How old is Tom?', ['25', '23', '10'], 0), K.mc('How old is Anna?', ['23', '25', '10'], 0), K.tf('Anna’s brother is ten.', true)]);
  R('u4', 'In the café', 'A man orders food and drink.', [
    m('Гость', 'Здравствуйте! Чай, пожалуйста.'), f('Официант', 'Чай с молоком?'), m('Гость', 'Нет, спасибо. И суп, пожалуйста.'), f('Официант', 'Хлеб?'), m('Гость', 'Да, пожалуйста. Сколько стоит?'), f('Официант', 'Две тысячи тенге.'), m('Гость', 'Спасибо. Очень вкусно!')],
    [K.mc('What does the man drink?', ['tea', 'coffee', 'water'], 0), K.tf('He wants milk in his tea.', false), K.mc('What does he eat?', ['soup and bread', 'meat', 'nothing'], 0)]);
  R('u5', 'Where is the shop?', 'A woman asks the way in the street.', [
    f(an, 'Извините, где магазин?'), m(to, 'Магазин там, на улице Абая.'), f(an, 'А школа?'), m(to, 'Школа здесь. Вот она.'), f(an, 'Спасибо! Вы живёте в городе?'), m(to, 'Да, я живу здесь.')],
    [K.mc('What is the woman looking for first?', ['a shop', 'a school', 'a bank'], 0), K.mc('Where is the school?', ['here', 'there', 'in another city'], 0), K.tf('The man lives in the city.', true)]);
  R('u6', 'Do you speak Russian?', 'Anna asks Tom about his Russian and his work.', [
    f(an, 'Том, вы говорите по-русски?'), m(to, 'Да, немного. Я понимаю, но говорю плохо.'), f(an, 'Нет, вы говорите хорошо! Где вы работаете?'), m(to, 'Я работаю в школе. А вы?'), f(an, 'Я работаю в банке. Я люблю читать.')],
    [K.mc('How much Russian does Tom speak?', ['a little', 'none', 'a lot'], 0), K.mc('Where does Tom work?', ['at a school', 'at a bank', 'at a café'], 0), K.tf('Anna works at a bank.', true)]);
  R('u7', 'Do you have time?', 'Tom wants to meet Anna.', [
    m(to, 'Анна, у тебя есть время сегодня?'), f(an, 'Сегодня нет. У меня урок.'), m(to, 'А завтра?'), f(an, 'Завтра есть. У тебя есть машина?'), m(to, 'Нет, но у меня есть телефон: такси!')],
    [K.mc('Why is Anna busy today?', ['She has a lesson.', 'She is at work.', 'She has no phone.'], 0), K.tf('Anna has time tomorrow.', true), K.mc('What does Tom not have?', ['a car', 'a phone', 'time'], 0)]);
  R('u8', 'How much is it?', 'A woman buys a phone.', [
    f(an, 'Здравствуйте! Сколько стоит этот телефон?'), m('Продавец', 'Сто тысяч тенге. Это новый телефон.'), f(an, 'Это дорого. А маленький телефон?'), m('Продавец', 'Пятьдесят тысяч. Он хороший. Это дёшево.'), f(an, 'Хорошо, маленький, пожалуйста.')],
    [K.mc('How much is the new phone?', ['100,000 tenge', '50,000 tenge', '10,000 tenge'], 0), K.tf('The woman thinks the first phone is cheap.', false), K.mc('Which phone does she buy?', ['the small one', 'the new big one', 'neither'], 0)]);
  R('u9', 'When is the lesson?', 'Tom asks Anna about the timetable.', [
    m(to, 'Анна, когда у нас урок?'), f(an, 'В среду, в шесть часов.'), m(to, 'А в пятницу?'), f(an, 'В пятницу нет. В пятницу я работаю.'), m(to, 'А сейчас который час?'), f(an, 'Сейчас три часа.')],
    [K.mc('When is the lesson?', ['on Wednesday at six', 'on Friday at six', 'on Wednesday at three'], 0), K.tf('Anna works on Friday.', true), K.mc('What time is it now?', ['three o’clock', 'six o’clock', 'one o’clock'], 0)]);
  R('u10', 'What is the weather like?', 'Anna in Kostanay phones Tom in London.', [
    f(an, 'Том, какая сегодня погода в Лондоне?'), m(to, 'Сегодня дождь. А в Костанае?'), f(an, 'Сегодня очень холодно и снег.'), m(to, 'Летом в Костанае жарко?'), f(an, 'Да, летом очень жарко. Я люблю лето.')],
    [K.mc('What is the weather in London?', ['rain', 'snow', 'hot'], 0), K.mc('What is the weather in Kostanay today?', ['very cold, with snow', 'warm', 'rain'], 0), K.tf('Summer in Kostanay is hot.', true)]);
  R('u11', 'What do you do in the morning?', 'Tom and Anna compare their days.', [
    m(to, 'Анна, что вы делаете утром?'), f(an, 'Утром я завтракаю дома, потом работаю.'), m(to, 'А где вы обедаете?'), f(an, 'Я обедаю в кафе. А вы?'), m(to, 'Я обедаю на работе. Вечером я ужинаю дома.')],
    [K.mc('Where does Anna have breakfast?', ['at home', 'at a café', 'at work'], 0), K.mc('Where does Tom have lunch?', ['at work', 'at a café', 'at home'], 0), K.tf('Tom has dinner at home.', true)]);
  R('u12', 'Where is my phone?', 'Tom cannot find his phone.', [
    m(to, 'Анна, где мой телефон?'), f(an, 'Он на столе?'), m(to, 'Нет. На столе книга.'), f(an, 'А на кухне?'), m(to, 'На кухне нет. А, вот он! Он в комнате, на кровати.')],
    [K.mc('What is Tom looking for?', ['his phone', 'his book', 'his key'], 0), K.tf('The phone is on the table.', false), K.mc('Where is the phone?', ['on the bed', 'in the kitchen', 'on the chair'], 0)]);
  R('u13', 'At the station', 'A woman buys a ticket.', [
    f(an, 'Здравствуйте! Один билет в Астану, пожалуйста.'), m('Кассир', 'На поезд или на автобус?'), f(an, 'На поезд. Когда поезд?'), m('Кассир', 'В семь часов. Билет стоит пять тысяч тенге.'), f(an, 'Хорошо. А где остановка такси?'), m('Кассир', 'Остановка там.')],
    [K.mc('Where is the woman going?', ['to Astana', 'to Kostanay', 'to the airport'], 0), K.mc('How is she travelling?', ['by train', 'by bus', 'by plane'], 0), K.mc('How much is the ticket?', ['5,000 tenge', '7,000 tenge', '10,000 tenge'], 0)]);
  R('u14', 'I have a toothache', 'Tom asks Anna what is wrong.', [
    m(to, 'Анна, что у тебя болит?'), f(an, 'У меня болит зуб.'), m(to, 'Врач в больнице. Ты идёшь в больницу?'), f(an, 'Да, я иду в больницу сегодня.'), m(to, 'А голова не болит?'), f(an, 'Нет, голова не болит.')],
    [K.mc('What hurts?', ['a tooth', 'her head', 'her leg'], 0), K.tf('Anna is going to the hospital today.', true), K.tf('Anna has a headache.', false)]);
  R('u15', 'A new jacket', 'Anna notices Tom’s jacket.', [
    f(an, 'Том, это новая куртка?'), m(to, 'Да, новая. Она чёрная и тёплая.'), f(an, 'Хорошая! А сколько она стоит?'), m(to, 'Тридцать тысяч тенге.'), f(an, 'У меня красная куртка, но она не новая.')],
    [K.mc('What colour is Tom’s jacket?', ['black', 'red', 'white'], 0), K.mc('How much was it?', ['30,000 tenge', '20,000 tenge', '13,000 tenge'], 0), K.tf('Anna’s jacket is new.', false)]);
  R('u16', 'What do you like?', 'Tom and Anna talk about free time.', [
    m(to, 'Анна, что вы любите делать вечером?'), f(an, 'Я люблю читать и слушать музыку. А вы?'), m(to, 'Я люблю спорт. В субботу я играю в футбол.'), f(an, 'А фильмы вы любите?'), m(to, 'Да, я люблю смотреть фильмы.')],
    [K.mc('What does Anna like doing?', ['reading and listening to music', 'playing football', 'watching films'], 0), K.mc('When does Tom play football?', ['on Saturday', 'on Sunday', 'in the evening'], 0), K.tf('Tom likes watching films.', true)]);
  R('u17', 'What did you do yesterday?', 'Anna and Tom talk about yesterday.', [
    f(an, 'Том, что вы делали вчера?'), m(to, 'Вчера я был дома. Я читал книгу. А вы?'), f(an, 'Я гуляла в парке, потом была в магазине.'), m(to, 'Что вы купили?'), f(an, 'Я купила новую рубашку.')],
    [K.mc('Where was Tom yesterday?', ['at home', 'in the park', 'at work'], 0), K.mc('What did Anna do first?', ['She walked in the park.', 'She went to the shop.', 'She read a book.'], 0), K.mc('What did Anna buy?', ['a shirt', 'a book', 'a jacket'], 0)]);
  R('u18', 'What will you do tomorrow?', 'Tom asks Anna about her plans.', [
    m(to, 'Анна, что вы будете делать завтра?'), f(an, 'Завтра я буду работать. А в субботу я буду отдыхать.'), m(to, 'А летом?'), f(an, 'Летом мы будем на море. А вы?'), m(to, 'Я буду учить русский язык!')],
    [K.mc('What will Anna do tomorrow?', ['work', 'rest', 'go to the sea'], 0), K.mc('Where will Anna be in summer?', ['at the sea', 'in the mountains', 'at home'], 0), K.tf('Tom will learn Russian.', true)]);
  R('u19', 'At the airport', 'A tourist checks in for his flight.', [
    f('Сотрудник', 'Здравствуйте! Ваш паспорт и билет, пожалуйста.'), m(to, 'Вот паспорт, а вот билет.'), f('Сотрудник', 'Вы турист?'), m(to, 'Да, я турист. Я был в Костанае и в Астане.'), f('Сотрудник', 'Хорошо. Ваш самолёт в девять часов.'), m(to, 'Спасибо. До свидания!')],
    [K.mc('What does the woman ask for?', ['a passport and a ticket', 'a key', 'money'], 0), K.tf('The man was in Kostanay and Astana.', true), K.mc('What time is the plane?', ['nine o’clock', 'seven o’clock', 'six o’clock'], 0)]);

  /* ================= Kazakh A1 ================= */
  Q('u0', 'Is this a taxi?', 'Tom reads the signs in the city and asks Aigul.', [
    m(to, 'Айгүл, бұл такси ме?'), f(ai, 'Иә, бұл такси.'), m(to, 'Ал мынау банк па?'), f(ai, 'Жоқ, бұл кафе. Банк анда.'), m(to, 'Парк қайда?'), f(ai, 'Парк осында.')],
    [K.mc('What does Tom ask about first?', ['a taxi', 'a bank', 'a park'], 0), K.tf('The second place is a bank.', false), K.mc('Where is the park?', ['here', 'there', 'in the bank'], 0)]);
  Q('u1', 'Nice to meet you', 'Aigul and Tom meet for the first time.', [
    f(ai, 'Сәлеметсіз бе! Менің атым Айгүл.'), m(to, 'Сәлеметсіз бе! Менің атым Том.'), f(ai, 'Сіз студентсіз бе?'), m(to, 'Иә, мен студентпін. Ал сіз?'), f(ai, 'Мен мұғаліммін.'), m(to, 'Рақмет. Сау болыңыз!'), f(ai, 'Сау болыңыз, Том!')],
    [K.mc('What is the woman’s name?', ['Aigul', 'Anna', 'Tom'], 0), K.tf('Tom is a student.', true), K.mc('What is Aigul’s job?', ['teacher', 'doctor', 'student'], 0)]);
  Q('u2', 'Who is this?', 'Aigul shows Tom a photo of her family.', [
    m(to, 'Айгүл, бұл кім?'), f(ai, 'Бұл менің отбасым. Бұл менің анам, ал бұл менің әкем.'), m(to, 'Ал бұл сіздің ағаңыз ба?'), f(ai, 'Жоқ, бұл менің досым. Менің ағам — мынау.'), m(to, 'Сізде әпке бар ма?'), f(ai, 'Иә, бар. Ол Астанада.')],
    [K.mc('Who does Aigul show first?', ['her mother', 'her brother', 'her friend'], 0), K.tf('Aigul has an older sister.', true), K.mc('Where is Aigul’s sister?', ['in Astana', 'in Kostanay', 'at school'], 0)]);
  Q('u3', 'How old are you?', 'Aigul and Tom talk about their ages.', [
    f(ai, 'Том, сіз неше жастасыз?'), m(to, 'Мен жиырма бес жастамын. Ал сіз?'), f(ai, 'Мен жиырма үш жастамын.'), m(to, 'Ал сіздің ағаңыз неше жаста?'), f(ai, 'Ол отыз жаста.')],
    [K.mc('How old is Tom?', ['25', '23', '30'], 0), K.mc('How old is Aigul?', ['23', '25', '30'], 0), K.tf('Aigul’s older brother is thirty.', true)]);
  Q('u4', 'In the café', 'A man orders food and drink.', [
    m('Қонақ', 'Сәлеметсіз бе! Шай беріңізші.'), f('Даяшы', 'Сүтпен бе?'), m('Қонақ', 'Жоқ, рақмет. Және нан беріңізші.'), f('Даяшы', 'Ет керек пе?'), m('Қонақ', 'Иә, керек. Қанша тұрады?'), f('Даяшы', 'Екі мың теңге.'), m('Қонақ', 'Рақмет. Өте дәмді!')],
    [K.mc('What does the man drink?', ['tea', 'coffee', 'water'], 0), K.tf('He wants milk in his tea.', false), K.mc('What does he eat?', ['bread and meat', 'soup', 'nothing'], 0)]);
  Q('u5', 'Where is the shop?', 'A woman asks the way in the street.', [
    f(ai, 'Кешіріңіз, дүкен қайда?'), m(to, 'Дүкен анда, Абай көшесінде.'), f(ai, 'Ал мектеп ше?'), m(to, 'Мектеп осында. Міне.'), f(ai, 'Рақмет! Сіз осы қалада тұрасыз ба?'), m(to, 'Иә, мен осында тұрамын.')],
    [K.mc('What is the woman looking for first?', ['a shop', 'a school', 'a bank'], 0), K.mc('Where is the school?', ['here', 'there', 'in another city'], 0), K.tf('The man lives in the city.', true)]);
  Q('u6', 'Do you speak Kazakh?', 'Aigul asks Tom about his Kazakh and his work.', [
    f(ai, 'Том, сіз қазақша сөйлейсіз бе?'), m(to, 'Иә, аздап. Мен түсінемін, бірақ нашар сөйлеймін.'), f(ai, 'Жоқ, сіз жақсы сөйлейсіз! Сіз қайда жұмыс істейсіз?'), m(to, 'Мен мектепте жұмыс істеймін. Ал сіз?'), f(ai, 'Мен банкте жұмыс істеймін.')],
    [K.mc('How much Kazakh does Tom speak?', ['a little', 'none', 'a lot'], 0), K.mc('Where does Tom work?', ['at a school', 'at a bank', 'at a café'], 0), K.tf('Aigul works at a bank.', true)]);
  Q('u7', 'Do you have time?', 'Tom wants to meet Aigul.', [
    m(to, 'Айгүл, бүгін сізде уақыт бар ма?'), f(ai, 'Бүгін жоқ. Менде сабақ бар.'), m(to, 'Ал ертең ше?'), f(ai, 'Ертең бар. Сізде көлік бар ма?'), m(to, 'Жоқ, бірақ менде телефон бар: такси!')],
    [K.mc('Why is Aigul busy today?', ['She has a lesson.', 'She is at work.', 'She has no phone.'], 0), K.tf('Aigul has time tomorrow.', true), K.mc('What does Tom not have?', ['a car', 'a phone', 'time'], 0)]);
  Q('u8', 'How much is it?', 'A woman buys a phone.', [
    f(ai, 'Сәлеметсіз бе! Мына телефон қанша тұрады?'), m('Сатушы', 'Жүз мың теңге. Бұл жаңа телефон.'), f(ai, 'Бұл қымбат. Ал кішкентай телефон ше?'), m('Сатушы', 'Елу мың. Ол жақсы және арзан.'), f(ai, 'Жақсы, кішкентайын беріңізші.')],
    [K.mc('How much is the new phone?', ['100,000 tenge', '50,000 tenge', '10,000 tenge'], 0), K.tf('The woman thinks the first phone is cheap.', false), K.mc('Which phone does she buy?', ['the small one', 'the new big one', 'neither'], 0)]);
  Q('u9', 'When is the lesson?', 'Tom asks Aigul about the timetable.', [
    m(to, 'Айгүл, бізде сабақ қашан?'), f(ai, 'Сәрсенбіде, сағат алтыда.'), m(to, 'Ал жұмада ше?'), f(ai, 'Жұмада жоқ. Жұмада мен жұмыс істеймін.'), m(to, 'Қазір сағат неше?'), f(ai, 'Қазір сағат үш.')],
    [K.mc('When is the lesson?', ['on Wednesday at six', 'on Friday at six', 'on Wednesday at three'], 0), K.tf('Aigul works on Friday.', true), K.mc('What time is it now?', ['three o’clock', 'six o’clock', 'one o’clock'], 0)]);
  Q('u10', 'What is the weather like?', 'Aigul in Kostanay phones Tom in London.', [
    f(ai, 'Том, бүгін Лондонда ауа райы қандай?'), m(to, 'Бүгін жаңбыр жауып тұр. Ал Қостанайда ше?'), f(ai, 'Бүгін өте суық, қар жауып тұр.'), m(to, 'Қостанайда жазда ыстық па?'), f(ai, 'Иә, жазда өте ыстық. Мен жазды жақсы көремін.')],
    [K.mc('What is the weather in London?', ['rain', 'snow', 'hot'], 0), K.mc('What is the weather in Kostanay today?', ['very cold, with snow', 'warm', 'rain'], 0), K.tf('Summer in Kostanay is hot.', true)]);
  Q('u11', 'What do you do in the morning?', 'Tom and Aigul compare their days.', [
    m(to, 'Айгүл, сіз таңертең не істейсіз?'), f(ai, 'Таңертең мен үйде таңғы ас ішемін, содан кейін жұмыс істеймін.'), m(to, 'Түскі асты қайда ішесіз?'), f(ai, 'Мен түскі асты кафеде ішемін. Ал сіз?'), m(to, 'Мен жұмыста ішемін. Кешкі асты үйде ішемін.')],
    [K.mc('Where does Aigul have breakfast?', ['at home', 'at a café', 'at work'], 0), K.mc('Where does Tom have lunch?', ['at work', 'at a café', 'at home'], 0), K.tf('Tom has dinner at home.', true)]);
  Q('u12', 'Where is my phone?', 'Tom cannot find his phone.', [
    m(to, 'Айгүл, менің телефоным қайда?'), f(ai, 'Ол үстелде ме?'), m(to, 'Жоқ. Үстелде кітап бар.'), f(ai, 'Ас үйде ше?'), m(to, 'Ас үйде жоқ. Ә, міне! Ол бөлмеде, төсекте.')],
    [K.mc('What is Tom looking for?', ['his phone', 'his book', 'his key'], 0), K.tf('The phone is on the table.', false), K.mc('Where is the phone?', ['on the bed', 'in the kitchen', 'on the chair'], 0)]);
  Q('u13', 'At the station', 'A woman buys a ticket.', [
    f(ai, 'Сәлеметсіз бе! Астанаға бір билет беріңізші.'), m('Кассир', 'Пойызға ма, автобусқа ма?'), f(ai, 'Пойызға. Пойыз қашан?'), m('Кассир', 'Сағат жетіде. Билет бес мың теңге тұрады.'), f(ai, 'Жақсы. Ал такси аялдамасы қайда?'), m('Кассир', 'Аялдама анда.')],
    [K.mc('Where is the woman going?', ['to Astana', 'to Kostanay', 'to the airport'], 0), K.mc('How is she travelling?', ['by train', 'by bus', 'by plane'], 0), K.mc('How much is the ticket?', ['5,000 tenge', '7,000 tenge', '10,000 tenge'], 0)]);
  Q('u14', 'I have a toothache', 'Tom asks Aigul what is wrong.', [
    m(to, 'Айгүл, қай жеріңіз ауырады?'), f(ai, 'Менің тісім ауырады.'), m(to, 'Дәрігер ауруханада. Сіз ауруханаға барасыз ба?'), f(ai, 'Иә, мен бүгін ауруханаға барамын.'), m(to, 'Басыңыз ауырмай ма?'), f(ai, 'Жоқ, басым ауырмайды.')],
    [K.mc('What hurts?', ['a tooth', 'her head', 'her leg'], 0), K.tf('Aigul is going to the hospital today.', true), K.tf('Aigul has a headache.', false)]);
  Q('u15', 'A new jacket', 'Aigul notices Tom’s jacket.', [
    f(ai, 'Том, бұл жаңа күрте ме?'), m(to, 'Иә, жаңа. Ол қара және жылы.'), f(ai, 'Жақсы күрте! Ол қанша тұрады?'), m(to, 'Отыз мың теңге.'), f(ai, 'Менде қызыл күрте бар, бірақ ол жаңа емес.')],
    [K.mc('What colour is Tom’s jacket?', ['black', 'red', 'white'], 0), K.mc('How much was it?', ['30,000 tenge', '20,000 tenge', '13,000 tenge'], 0), K.tf('Aigul’s jacket is new.', false)]);
  Q('u16', 'What do you like?', 'Tom and Aigul talk about free time.', [
    m(to, 'Айгүл, сізге кешке не істеу ұнайды?'), f(ai, 'Маған кітап оқу және музыка тыңдау ұнайды. Ал сізге?'), m(to, 'Маған спорт ұнайды. Сенбіде мен футбол ойнаймын.'), f(ai, 'Ал фильмдер ұнай ма?'), m(to, 'Иә, маған фильм көру ұнайды.')],
    [K.mc('What does Aigul like doing?', ['reading and listening to music', 'playing football', 'watching films'], 0), K.mc('When does Tom play football?', ['on Saturday', 'on Sunday', 'in the evening'], 0), K.tf('Tom likes watching films.', true)]);
  Q('u17', 'What did you do yesterday?', 'Aigul and Tom talk about yesterday.', [
    f(ai, 'Том, сіз кеше не істедіңіз?'), m(to, 'Кеше мен үйде болдым. Кітап оқыдым. Ал сіз?'), f(ai, 'Мен паркте серуендедім, содан кейін дүкенге бардым.'), m(to, 'Не сатып алдыңыз?'), f(ai, 'Мен жаңа көйлек сатып алдым.')],
    [K.mc('Where was Tom yesterday?', ['at home', 'in the park', 'at work'], 0), K.mc('What did Aigul do first?', ['She walked in the park.', 'She went to the shop.', 'She read a book.'], 0), K.mc('What did Aigul buy?', ['a shirt', 'a book', 'a jacket'], 0)]);
  Q('u18', 'What will you do tomorrow?', 'Tom asks Aigul about her plans.', [
    m(to, 'Айгүл, сіз ертең не істейсіз?'), f(ai, 'Ертең мен жұмыс істеймін. Ал сенбіде демаламын.'), m(to, 'Ал жазда ше?'), f(ai, 'Жазда біз теңізге барамыз. Ал сіз?'), m(to, 'Мен қазақ тілін үйренемін!')],
    [K.mc('What will Aigul do tomorrow?', ['work', 'rest', 'go to the sea'], 0), K.mc('Where will Aigul go in summer?', ['to the sea', 'to the mountains', 'nowhere'], 0), K.tf('Tom will learn Kazakh.', true)]);
  Q('u19', 'At the airport', 'A tourist checks in for his flight.', [
    f('Қызметкер', 'Сәлеметсіз бе! Паспортыңыз бен билетіңізді беріңізші.'), m(to, 'Міне, паспорт, ал мынау билет.'), f('Қызметкер', 'Сіз туристсіз бе?'), m(to, 'Иә, мен туристпін. Мен Қостанайда және Астанада болдым.'), f('Қызметкер', 'Жақсы. Сіздің ұшағыңыз сағат тоғызда.'), m(to, 'Рақмет. Сау болыңыз!')],
    [K.mc('What does the woman ask for?', ['a passport and a ticket', 'a key', 'money'], 0), K.tf('The man was in Kostanay and Astana.', true), K.mc('What time is the plane?', ['nine o’clock', 'seven o’clock', 'six o’clock'], 0)]);

  /* ================= Level tests: 30 questions, 25 minutes. The right answer moves between A, B and C. ================= */
  var n = 0, T = function (q, right, w1, w2) { var o = [w1, w2]; o.splice(n++ % 3, 0, right); return { t: 'mc', q: q, o: o, a: o.indexOf(right) }; };
  var test = function (cid, name, ex, ids) {
    IFX.units(cid, [{ id: 't1', title: name + ' A1 level test', topic: 'Level test', lessons: [{ id: 't', type: 'test', title: name + ' A1 level test', mins: 25, ex: ex }] }]);
    IFX.order(cid, ids.concat(['t1']));
  };
  var IDS = ['u0', 'u1', 'u2', 'u3', 'u4', 'u5', 'u6', 'u7', 'u8', 'u9', 'u10', 'u11', 'u12', 'u13', 'u14', 'u15', 'u16', 'u17', 'u18', 'u19'];
  test('ru-a1', 'Russian', [
    T('“привет” means…', 'hi', 'thank you', 'goodbye'), T('The polite “hello” is…', 'Здравствуйте', 'Привет', 'Спасибо'), T('“I am Tom.” = …', 'Я Том.', 'Я есть Том.', 'Меня Том.'),
    T('Which letter sounds like the English “r”?', 'Р', 'П', 'Г'), T('___ мама (my)', 'моя', 'мой', 'моё'), T('___ брат (my)', 'мой', 'моя', 'моё'),
    T('“сестра” means…', 'sister', 'brother', 'daughter'), T('“пять” is…', '5', '4', '10'), T('“Tea, please.” = …', 'Чай, пожалуйста.', 'Чай, спасибо.', 'Чай, до свидания.'),
    T('“хлеб” means…', 'bread', 'milk', 'meat'), T('Я живу ___ городе.', 'в', 'у', 'с'), T('“где” means…', 'where', 'here', 'there'),
    T('Я работа___.', 'ю', 'ешь', 'ет'), T('Ты работа___.', 'ешь', 'ю', 'ют'), T('“I have a phone.” = …', 'У меня есть телефон.', 'Я есть телефон.', 'Мне телефон.'),
    T('“завтра” means…', 'tomorrow', 'yesterday', 'today'), T('“дорого” means…', 'expensive', 'cheap', 'big'), T('Сейчас пять ___.', 'часов', 'час', 'часа'),
    T('on Wednesday = …', 'в среду', 'в среда', 'на среде'), T('in winter = …', 'зимой', 'зима', 'в зиму'), T('“It is cold today.” = …', 'Сегодня холодно.', 'Сегодня есть холодный.', 'Сегодня зима холод.'),
    T('Мы обеда___ в кафе.', 'ем', 'ю', 'ют'), T('Книга ___ столе.', 'на', 'в', 'у'), T('Я еду ___ автобусе.', 'на', 'в', 'у'),
    T('Я иду в школ___.', 'у', 'а', 'е'), T('У меня ___ голова.', 'болит', 'болят', 'болю'), T('книга → more than one = …', 'книги', 'книгы', 'книга'),
    T('Я слушаю музык___.', 'у', 'а', 'е'), T('Вчера Анна ___ дома.', 'была', 'был', 'были'), T('Завтра я ___ работать.', 'буду', 'был', 'есть')], IDS);
  n = 0;
  test('kk-a1', 'Kazakh', [
    T('“сәлем” means…', 'hi', 'thank you', 'goodbye'), T('The polite “hello” is…', 'Сәлеметсіз бе', 'Сәлем', 'Рақмет'), T('“рақмет” means…', 'thank you', 'please', 'sorry'),
    T('Which letter sounds like “ng” in “sing”?', 'Ң', 'Н', 'Ғ'), T('my mother = менің …', 'анам', 'анаым', 'ана'), T('my friend = менің …', 'досым', 'досм', 'досім'),
    T('“әке” means…', 'father', 'mother', 'older brother'), T('“бес” is…', '5', '4', '10'), T('“There is tea.” = …', 'Шай бар.', 'Шай жоқ.', 'Шай керек.'),
    T('“нан” means…', 'bread', 'milk', 'meat'), T('in the city = …', 'қалада', 'қалаға', 'қаламен'), T('“қайда” means…', 'where', 'here', 'there'),
    T('Мен Қостанайда тұра___.', 'мын', 'сыз', 'ды'), T('Сіз қайда тұра___?', 'сыз', 'мын', 'ды'), T('“I have a phone.” = …', 'Менде телефон бар.', 'Мен телефон бар.', 'Менің телефон.'),
    T('“ертең” means…', 'tomorrow', 'yesterday', 'today'), T('“қымбат” means…', 'expensive', 'cheap', 'big'), T('“What time is it?” = …', 'Сағат неше?', 'Қанша тұрады?', 'Неше жастасыз?'),
    T('on Friday = …', 'жұмада', 'жұмаде', 'жұмаға'), T('in winter = …', 'қыста', 'қысда', 'қысқа'), T('“It is cold today.” = …', 'Бүгін суық.', 'Бүгін суық бар.', 'Бүгін суықта.'),
    T('Біз шай іше___.', 'міз', 'мін', 'сіз'), T('on the table = …', 'үстелде', 'үстелге', 'үстелмен'), T('by bus = …', 'автобуспен', 'автобуста', 'автобусқа'),
    T('Мен дүкен___ барамын.', 'ге', 'де', 'мен'), T('“My head hurts.” = …', 'Менің басым ауырады.', 'Мен бас ауырады.', 'Менде бас бар.'), T('кітап → more than one = …', 'кітаптар', 'кітаплар', 'кітапдар'),
    T('“I like music.” = …', 'Маған музыка ұнайды.', 'Мен музыка ұнайды.', 'Менде музыка ұнайды.'), T('Кеше мен үйде бол___.', 'дым', 'дім', 'ды'), T('“I will not go.” = …', 'Мен бармаймын.', 'Мен барамын.', 'Мен бардым.')], IDS);
})();
