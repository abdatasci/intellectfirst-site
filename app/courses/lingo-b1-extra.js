/* IF Lingo · B1 extras for Russian and Kazakh: one listening lesson for every unit, and the level test.
   Original IF Academy scripts. The script can be opened on the screen, so the lesson still works where a voice is missing. */
(function () {
  var K = IFX.k, f = function (s, t) { return { s: s, g: 'f', t: t }; }, m = function (s, t) { return { s: s, g: 'm', t: t }; };
  var A = function (cid, uid, title, intro, script, ex) { IFX.listening(cid, uid, { title: title, intro: intro, script: script, ex: ex }); };
  var R = function (uid, title, intro, script, ex) { A('ru-b1', uid, title, intro, script, ex); }, Q = function (uid, title, intro, script, ex) { A('kk-b1', uid, title, intro, script, ex); };
  var an = 'Анна', to = 'Том', ai = 'Айгүл';

  /* ================= Russian B1 ================= */
  R('u1', 'A quarrel with a friend', 'Anna tells Tom about a problem with her friend.', [
    m(to, 'Анна, почему ты такая грустная?'), f(an, 'Я поссорилась с подругой, с которой дружу десять лет.'), m(to, 'Что случилось?'), f(an, 'Она рассказала мой секрет человеку, которого я почти не знаю.'), m(to, 'Но вы всегда поддерживали друг друга. Позвони ей.'), f(an, 'Ты прав. Я позвоню первой, и мы помиримся.')],
    [K.mc('How long have Anna and her friend known each other?', ['ten years', 'two years', 'one month'], 0), K.mc('What did the friend do?', ['told Anna’s secret to someone', 'forgot Anna’s birthday', 'moved to another city'], 0), K.tf('Anna decides to phone first.', true)]);
  R('u2', 'After the exam', 'Tom meets Anna after her exam.', [
    m(to, 'Анна, как экзамен?'), f(an, 'Хорошо! Я получила отличную оценку.'), m(to, 'Поздравляю! О чём были вопросы?'), f(an, 'О русской литературе. Преподаватель спрашивал о писателях девятнадцатого века.'), m(to, 'Теперь ты получишь стипендию?'), f(an, 'Да, если сдам ещё два экзамена.')],
    [K.mc('What mark did Anna get?', ['an excellent one', 'a bad one', 'she does not know yet'], 0), K.mc('What were the questions about?', ['Russian literature', 'history', 'grammar'], 0), K.mc('How many more exams must she pass for the scholarship?', ['two', 'one', 'three'], 0)]);
  R('u3', 'A job interview', 'Tom has an interview at a company.', [
    f('Руководитель', 'Добрый день. Почему вы хотите работать у нас?'), m(to, 'Я хочу работать здесь, чтобы использовать свой опыт.'), f('Руководитель', 'Какой у вас опыт?'), m(to, 'Я пять лет преподавал английский.'), f('Руководитель', 'Хорошо. Мы хотим, чтобы вы начали в понедельник.'), m(to, 'Спасибо! Я готов.')],
    [K.mc('How many years of experience does Tom have?', ['five', 'two', 'ten'], 0), K.mc('What did Tom do before?', ['He taught English.', 'He worked in a bank.', 'He was a student.'], 0), K.mc('When does the company want him to start?', ['on Monday', 'next month', 'tomorrow'], 0)]);
  R('u4', 'Advice at the gym', 'A coach gives Tom some advice.', [
    m(to, 'Я хочу изменить образ жизни. С чего начать?'), f('Тренер', 'Приходите на тренировку три раза в неделю.'), m(to, 'А питание?'), f('Тренер', 'Ешьте больше овощей и не ешьте сладкое вечером.'), m(to, 'А кофе можно?'), f('Тренер', 'Можно, но не пейте больше двух чашек в день.')],
    [K.mc('How often should Tom train?', ['three times a week', 'every day', 'once a week'], 0), K.mc('What should he not eat in the evening?', ['sweet things', 'vegetables', 'meat'], 0), K.mc('How much coffee may he drink?', ['up to two cups a day', 'none at all', 'as much as he wants'], 0)]);
  R('u5', 'The flight is late', 'Anna phones Tom from the airport.', [
    f(an, 'Том, я ещё в аэропорту. У рейса задержка.'), m(to, 'Надолго?'), f(an, 'На два часа. Самолёт ещё не прилетел из Алматы.'), m(to, 'Когда ты приедешь домой?'), f(an, 'Наверное, в полночь. Я уже прошла регистрацию.'), m(to, 'Хорошо. Я приеду за тобой на машине.')],
    [K.mc('How long is the delay?', ['two hours', 'one hour', 'five hours'], 0), K.mc('Where is the plane coming from?', ['Almaty', 'Astana', 'London'], 0), K.mc('How will Anna get home?', ['Tom will collect her by car.', 'by taxi', 'by bus'], 0)]);
  R('u6', 'What do we need for the soup?', 'Anna and Tom cook together.', [
    m(to, 'Анна, что нужно для супа?'), f(an, 'Пять картошек, две моркови и немного мяса.'), m(to, 'Сколько минут варить мясо?'), f(an, 'Сорок минут. Потом добавь овощи.'), m(to, 'А соль?'), f(an, 'Одну ложку. И не режь лук, у нас нет лука!')],
    [K.mc('How many potatoes do they need?', ['five', 'two', 'ten'], 0), K.mc('How long should the meat cook?', ['forty minutes', 'four minutes', 'an hour'], 0), K.tf('They have onions at home.', false)]);
  R('u7', 'Is the flat still free?', 'Tom phones about a flat.', [
    m(to, 'Здравствуйте! Вы сдаёте квартиру?'), f('Хозяйка', 'Да. Она находится за парком, рядом с аптекой.'), m(to, 'В квартире есть мебель?'), f('Хозяйка', 'Да, вся мебель новая. Отопление хорошее.'), m(to, 'А коммунальные услуги?'), f('Хозяйка', 'Вы платите их сами. Приходите завтра в шесть.')],
    [K.mc('Where is the flat?', ['behind the park, next to the chemist’s', 'in the centre', 'next to the university'], 0), K.tf('The flat has furniture.', true), K.mc('Who pays for the utilities?', ['the tenant', 'the landlady', 'nobody'], 0)]);
  R('u8', 'Where does the plastic go?', 'Anna and Tom talk about rubbish.', [
    f(an, 'Том, не бросай бутылку в это ведро. Это пластик.'), m(to, 'А куда?'), f(an, 'В жёлтый контейнер во дворе. Его перерабатывают.'), m(to, 'Если бы все так делали, город был бы чище.'), f(an, 'Конечно. Мы должны защищать природу.'), m(to, 'Хорошо, я запомню.')],
    [K.mc('Where should the plastic bottle go?', ['in the yellow container', 'in the kitchen bucket', 'in the river'], 0), K.tf('The plastic is recycled.', true), K.mc('What does Tom say would make the city cleaner?', ['if everyone did this', 'more rain', 'fewer cars'], 0)]);
  R('u9', 'I forgot my password', 'Tom needs help with his phone.', [
    m(to, 'Анна, я не могу открыть приложение банка.'), f(an, 'Ты обновил его?'), m(to, 'Да, обновил вчера. Но теперь я забыл пароль.'), f(an, 'Пароль можно изменить на сайте.'), m(to, 'Это безопасно?'), f(an, 'Да. Тебе отправят код в сообщении.')],
    [K.mc('Which app can Tom not open?', ['the bank app', 'a game', 'the school app'], 0), K.mc('What is the problem?', ['He forgot his password.', 'The phone is broken.', 'There is no internet.'], 0), K.mc('How will he get the code?', ['in a message', 'by post', 'by phone call'], 0)]);
  R('u10', 'Did you hear the news?', 'Anna tells Tom some news.', [
    f(an, 'Том, говорят, что в субботу будет концерт на площади.'), m(to, 'Откуда ты знаешь?'), f(an, 'Соседка сказала, что читала об этом в чате.'), m(to, 'Это может быть слух. Я спрошу, правда ли это.'), f(an, 'У кого?'), m(to, 'У журналиста, который пишет о нашем городе.')],
    [K.mc('What is the news about?', ['a concert on the square', 'a closed school', 'a new shop'], 0), K.mc('Where did the neighbour read it?', ['in a chat', 'in a newspaper', 'on a poster'], 0), K.mc('Who will Tom ask?', ['a journalist', 'the neighbour', 'a teacher'], 0)]);
  R('u11', 'After the exhibition', 'Anna and Tom leave an art exhibition.', [
    m(to, 'Тебе что-нибудь понравилось?'), f(an, 'Да, одна картина молодого художника. А тебе?'), m(to, 'Честно? Я ничего не понял.'), f(an, 'Никто не понимает всё сразу. Хочешь, я объясню?'), m(to, 'Давай. Но сначала пойдём куда-нибудь выпить кофе.'), f(an, 'Хорошо!')],
    [K.mc('What did Anna like?', ['a painting by a young artist', 'the building', 'nothing'], 0), K.tf('Tom understood everything.', false), K.mc('What do they do next?', ['go for a coffee', 'go home', 'buy a painting'], 0)]);
  R('u12', 'How was the match?', 'Tom comes home after a football match.', [
    f(an, 'Ну как матч? Кто выиграл?'), m(to, 'Мы проиграли. Один : три.'), f(an, 'Жаль. Ты часто ходишь на стадион?'), m(to, 'Да, я хожу каждую субботу.'), f(an, 'А что сказал тренер?'), m(to, 'Он сказал, что в следующий раз мы победим.')],
    [K.mc('What was the score?', ['1 : 3', '3 : 1', '0 : 2'], 0), K.mc('How often does Tom go to the stadium?', ['every Saturday', 'every day', 'once a month'], 0), K.tf('The coach thinks the team will win next time.', true)]);
  R('u13', 'Which phone is better value?', 'Anna and Tom are in a shop.', [
    m(to, 'Этот телефон стоит двести тысяч. Это дорого.'), f(an, 'А тот дешевле на пятьдесят тысяч.'), m(to, 'Но у этого память в два раза больше.'), f(an, 'Тебе нужно столько памяти?'), m(to, 'Нет. Я возьму дешёвый и не буду брать кредит.'), f(an, 'Правильно. Чем меньше долгов, тем лучше.')],
    [K.mc('How much is the first phone?', ['200,000 tenge', '150,000 tenge', '50,000 tenge'], 0), K.mc('How much cheaper is the second phone?', ['50,000 tenge', '20,000 tenge', '100,000 tenge'], 0), K.mc('Which phone does Tom choose?', ['the cheaper one', 'the more expensive one', 'neither'], 0)]);
  R('u14', 'Going to visit', 'Anna invites Tom to her grandparents.', [
    f(an, 'Том, в воскресенье мы идём в гости к моим бабушке и дедушке.'), m(to, 'Что мне взять с собой?'), f(an, 'По традиции гости приносят что-нибудь к чаю.'), m(to, 'Я куплю торт. А детям?'), f(an, 'Детям купи конфеты. И не садись, пока дедушка не сядет.'), m(to, 'Понял. Я уважаю ваши обычаи.')],
    [K.mc('Who are they visiting on Sunday?', ['Anna’s grandparents', 'Anna’s colleagues', 'Tom’s friends'], 0), K.mc('What will Tom buy for tea?', ['a cake', 'flowers', 'fruit'], 0), K.mc('When may Tom sit down?', ['after the grandfather sits', 'at once', 'after the children'], 0)]);
  R('u15', 'The soup is cold', 'Tom complains in a café.', [
    m(to, 'Извините, у меня жалоба. Суп холодный.'), f('Официант', 'Простите, это наша ошибка. Я принесу другой.'), m(to, 'И я жду уже сорок минут.'), f('Официант', 'Извините. Сегодня у нас сломана плита.'), m(to, 'Понятно.'), f('Официант', 'Десерт будет бесплатно. Он уже готов.')],
    [K.mc('What is wrong with the soup?', ['It is cold.', 'It is too salty.', 'It is the wrong soup.'], 0), K.mc('How long has Tom been waiting?', ['forty minutes', 'four minutes', 'an hour'], 0), K.mc('What does the café give him free?', ['dessert', 'coffee', 'the soup'], 0)]);
  R('u16', 'How can I speak better?', 'Tom asks Anna for advice.', [
    m(to, 'Анна, я знаю много слов, однако говорю медленно.'), f(an, 'Это нормально. Тебе нужно больше общения.'), m(to, 'Но я делаю ошибки.'), f(an, 'Хотя ты делаешь ошибки, тебя все понимают.'), m(to, 'А произношение?'), f(an, 'Слушай носителей языка и повторяй за ними каждый день.')],
    [K.mc('What is Tom’s problem?', ['He speaks slowly.', 'He knows few words.', 'Nobody understands him.'], 0), K.mc('What does Anna say he needs?', ['more communication', 'a new teacher', 'more grammar books'], 0), K.mc('How can he improve his pronunciation?', ['listen to native speakers and repeat', 'read silently', 'write more'], 0)]);
  R('u17', 'You cannot park here', 'A police officer speaks to Tom.', [
    f('Полицейский', 'Здравствуйте. Здесь запрещено ставить машину.'), m(to, 'Извините, я не видел знак.'), f('Полицейский', 'Знак вот там. Вы обязаны знать правила.'), m(to, 'Я заплачу штраф?'), f('Полицейский', 'В первый раз — нет. Но машину нужно убрать сейчас.'), m(to, 'Спасибо. А где разрешено?'), f('Полицейский', 'За углом есть парковка.')],
    [K.mc('What is forbidden here?', ['parking', 'walking', 'taking photos'], 0), K.tf('Tom has to pay a fine.', false), K.mc('Where is parking allowed?', ['round the corner', 'in front of the bank', 'nowhere'], 0)]);
  R('u18', 'A school experiment', 'Anna tells Tom about her nephew.', [
    f(an, 'Мой племянник получил приз на научной выставке.'), m(to, 'Что он сделал?'), f(an, 'Он провёл эксперимент с водой и солью.'), m(to, 'И что было доказано?'), f(an, 'Что солёная вода замерзает медленнее.'), m(to, 'Когда были получены результаты?'), f(an, 'Через три дня. Он хочет стать учёным.')],
    [K.mc('Who won a prize?', ['Anna’s nephew', 'Anna’s brother', 'Tom'], 0), K.mc('What did the experiment show?', ['Salt water freezes more slowly.', 'Salt water boils faster.', 'Plants like salt.'], 0), K.mc('What does he want to become?', ['a scientist', 'a teacher', 'a doctor'], 0)]);
  R('u19', 'At the museum', 'Tom and Anna visit the history museum.', [
    m(to, 'Анна, когда был основан этот город?'), f(an, 'В 1879 году. Сто лет назад здесь было только пять улиц.'), m(to, 'А что здесь было до города?'), f(an, 'Степь. Здесь жили кочевники.'), m(to, 'Этот музей старый?'), f(an, 'Он был открыт в двадцатом веке.')],
    [K.mc('When was the city founded?', ['in 1879', 'in 1979', 'in 1789'], 0), K.mc('What was there before the city?', ['steppe', 'a forest', 'a lake'], 0), K.mc('When was the museum opened?', ['in the twentieth century', 'in the nineteenth century', 'last year'], 0)]);
  R('u20', 'I did it!', 'Anna has good news.', [
    f(an, 'Том, мне удалось! Я сдала экзамен на права.'), m(to, 'Поздравляю! С первого раза?'), f(an, 'Нет, с третьего. Два раза у меня не получилось.'), m(to, 'Ты не сдалась. Молодец!'), f(an, 'Было трудно, но упорство помогло.'), m(to, 'Теперь ты сможешь ездить на работу на машине.')],
    [K.mc('What exam did Anna pass?', ['her driving test', 'a language exam', 'a university exam'], 0), K.mc('On which try did she pass?', ['the third', 'the first', 'the second'], 0), K.mc('What helped her?', ['persistence', 'luck', 'money'], 0)]);
  R('u21', 'Can you help on Saturday?', 'Anna asks Tom to volunteer.', [
    f(an, 'Том, ты свободен в субботу утром? Нам нужны волонтёры.'), m(to, 'Что нужно делать?'), f(an, 'Мы возим продукты пожилым людям.'), m(to, 'Сколько времени это занимает?'), f(an, 'Два часа. Им нужна не только еда, но и внимание.'), m(to, 'Хорошо, я приду. У меня есть машина.')],
    [K.mc('When do they need volunteers?', ['on Saturday morning', 'on Sunday evening', 'every day'], 0), K.mc('What do the volunteers do?', ['take food to elderly people', 'clean the park', 'teach children'], 0), K.mc('How long does it take?', ['two hours', 'all day', 'half an hour'], 0)]);
  R('u22', 'City or village?', 'Tom and Anna compare two ways of life.', [
    m(to, 'Анна, ты хотела бы жить в селе?'), f(an, 'Не знаю. Там тише, чем в городе, и воздух чище.'), m(to, 'Но работа не такая интересная, как здесь.'), f(an, 'Да, это недостаток. А ты?'), m(to, 'Я вырос на ферме. Главное преимущество села — люди.'), f(an, 'Тогда поедем туда летом!')],
    [K.mc('What does Anna say about the village?', ['It is quieter and the air is cleaner.', 'It is noisy.', 'It is expensive.'], 0), K.mc('Where did Tom grow up?', ['on a farm', 'in a big city', 'by the sea'], 0), K.mc('What is the main advantage of the village for Tom?', ['the people', 'the shops', 'the salaries'], 0)]);
  R('u23', 'The lost wallet', 'Tom tells Anna what happened yesterday.', [
    m(to, 'Вчера со мной случилось чудо.'), f(an, 'Какое?'), m(to, 'Пока я ехал в автобусе, я потерял кошелёк.'), f(an, 'И что?'), m(to, 'Как только я пришёл домой, мне позвонил незнакомец. Он нашёл его.'), f(an, 'Как он узнал твой номер?'), m(to, 'Оказалось, что в кошельке была моя карточка.')],
    [K.mc('Where did Tom lose his wallet?', ['on the bus', 'in a shop', 'at work'], 0), K.mc('Who phoned him?', ['a stranger', 'the police', 'Anna'], 0), K.mc('How did the man know Tom’s number?', ['His card was in the wallet.', 'He knew Tom.', 'He asked the driver.'], 0)]);
  R('u24', 'What next?', 'Anna asks Tom about his plans after B1.', [
    f(an, 'Том, ты закончил уровень B1. Что дальше?'), m(to, 'С одной стороны, я хочу отдохнуть. С другой стороны, я хочу продолжать.'), f(an, 'По сравнению с прошлым годом ты говоришь намного лучше.'), m(to, 'Спасибо. Тем не менее мне нужно больше читать.'), f(an, 'Что ты будешь читать?'), m(to, 'В основном новости. А потом начну B2.')],
    [K.mc('Which level has Tom finished?', ['B1', 'A2', 'B2'], 0), K.mc('What does Tom say he needs to do more?', ['read', 'sleep', 'travel'], 0), K.mc('What will he mainly read?', ['the news', 'novels', 'poems'], 0)]);

  /* ================= Kazakh B1 ================= */
  Q('u1', 'A quarrel with a friend', 'Aigul tells Tom about a problem with her friend.', [
    m(to, 'Айгүл, неге көңілсізсіз?'), f(ai, 'Мен он жыл араласқан құрбыммен ұрысып қалдым.'), m(to, 'Не болды?'), f(ai, 'Ол менің құпиямды мен танымайтын адамға айтып қойды.'), m(to, 'Бірақ сіздер бір-біріңізді әрқашан қолдайтынсыздар. Оған қоңырау шалыңыз.'), f(ai, 'Дұрыс айтасыз. Мен бірінші болып қоңырау шаламын, біз татуласамыз.')],
    [K.mc('How long have Aigul and her friend known each other?', ['ten years', 'two years', 'one month'], 0), K.mc('What did the friend do?', ['told Aigul’s secret to someone', 'forgot Aigul’s birthday', 'moved to another city'], 0), K.tf('Aigul decides to phone first.', true)]);
  Q('u2', 'After the exam', 'Tom meets Aigul after her exam.', [
    m(to, 'Айгүл, емтихан қалай өтті?'), f(ai, 'Жақсы! Мен өте жақсы баға алдым.'), m(to, 'Құттықтаймын! Сұрақтар не туралы болды?'), f(ai, 'Қазақ әдебиеті туралы. Оқытушы он тоғызыншы ғасырдың жазушылары туралы сұрады.'), m(to, 'Енді шәкіртақы аласыз ба?'), f(ai, 'Иә, тағы екі емтихан тапсырғаннан кейін.')],
    [K.mc('What mark did Aigul get?', ['a very good one', 'a bad one', 'she does not know yet'], 0), K.mc('What were the questions about?', ['Kazakh literature', 'history', 'grammar'], 0), K.mc('How many more exams must she pass for the scholarship?', ['two', 'one', 'three'], 0)]);
  Q('u3', 'A job interview', 'Tom has an interview at a company.', [
    f('Басшы', 'Қайырлы күн. Неге бізде жұмыс істегіңіз келеді?'), m(to, 'Мен тәжірибемді пайдалану үшін осында жұмыс істегім келеді.'), f('Басшы', 'Тәжірибеңіз қандай?'), m(to, 'Мен бес жыл ағылшын тілінен сабақ бердім.'), f('Басшы', 'Жақсы. Бізге «Ол дүйсенбіде бастай алады» деп айтты. Солай ма?'), m(to, 'Иә, мен дайынмын. Рақмет!')],
    [K.mc('How many years of experience does Tom have?', ['five', 'two', 'ten'], 0), K.mc('What did Tom do before?', ['He taught English.', 'He worked in a bank.', 'He was a student.'], 0), K.mc('When can he start?', ['on Monday', 'next month', 'tomorrow'], 0)]);
  Q('u4', 'Advice at the gym', 'A coach gives Tom some advice.', [
    m(to, 'Мен өмір салтымды өзгерткім келеді. Неден бастайын?'), f('Жаттықтырушы', 'Аптасына үш рет жаттығу залына келіңіз.'), m(to, 'Ал тамақтану ше?'), f('Жаттықтырушы', 'Көкөністі көбірек жеңіз, кешке тәтті жемеңіз.'), m(to, 'Кофе ішуге бола ма?'), f('Жаттықтырушы', 'Болады, бірақ күніне екі кеседен артық ішпеңіз.')],
    [K.mc('How often should Tom train?', ['three times a week', 'every day', 'once a week'], 0), K.mc('What should he not eat in the evening?', ['sweet things', 'vegetables', 'meat'], 0), K.mc('How much coffee may he drink?', ['up to two cups a day', 'none at all', 'as much as he wants'], 0)]);
  Q('u5', 'The flight is late', 'Aigul phones Tom from the airport.', [
    f(ai, 'Том, мен әлі әуежайдамын. Рейсте кідіріс бар.'), m(to, 'Ұзақ па?'), f(ai, 'Екі сағат. Ұшақ Алматыдан әлі ұшып келген жоқ.'), m(to, 'Үйге қашан келесіз?'), f(ai, 'Түн ортасында шығар. Мен тіркеуден өтіп қойдым.'), m(to, 'Жақсы. Мен сізді көлікпен алып кетемін.')],
    [K.mc('How long is the delay?', ['two hours', 'one hour', 'five hours'], 0), K.mc('Where is the plane coming from?', ['Almaty', 'Astana', 'London'], 0), K.mc('How will Aigul get home?', ['Tom will collect her by car.', 'by taxi', 'by bus'], 0)]);
  Q('u6', 'What do we need for the soup?', 'Aigul and Tom cook together.', [
    m(to, 'Айгүл, сорпаға не керек?'), f(ai, 'Бес картоп, екі сәбіз және аздап ет.'), m(to, 'Ет неше минут пісіріледі?'), f(ai, 'Қырық минут. Содан кейін көкөніс қосылады.'), m(to, 'Ал тұз ше?'), f(ai, 'Бір қасық. Пияз турамаңыз, бізде пияз жоқ!')],
    [K.mc('How many potatoes do they need?', ['five', 'two', 'ten'], 0), K.mc('How long should the meat cook?', ['forty minutes', 'four minutes', 'an hour'], 0), K.tf('They have onions at home.', false)]);
  Q('u7', 'Is the flat still free?', 'Tom phones about a flat.', [
    m(to, 'Сәлеметсіз бе! Сіз пәтер жалға бересіз бе?'), f('Үй иесі', 'Иә. Ол саябақтың артында, дәріхананың жанында.'), m(to, 'Пәтердің ішінде жиһаз бар ма?'), f('Үй иесі', 'Иә, жиһаздың бәрі жаңа. Жылыту жақсы.'), m(to, 'Коммуналдық қызмет ше?'), f('Үй иесі', 'Оны өзіңіз төлейсіз. Ертең сағат алтыда келіңіз.')],
    [K.mc('Where is the flat?', ['behind the park, near the chemist’s', 'in the centre', 'next to the university'], 0), K.tf('The flat has furniture.', true), K.mc('Who pays for the utilities?', ['the tenant', 'the landlady', 'nobody'], 0)]);
  Q('u8', 'Where does the plastic go?', 'Aigul and Tom talk about rubbish.', [
    f(ai, 'Том, шөлмекті бұл шелекке тастамаңыз. Бұл — пластик.'), m(to, 'Қайда тастайын?'), f(ai, 'Ауладағы сары контейнерге. Оны қайта өңдейді.'), m(to, 'Егер бәрі осылай істесе, қала тазарақ болар еді.'), f(ai, 'Әрине. Біз табиғатты қорғауымыз керек.'), m(to, 'Жақсы, есімде сақтаймын.')],
    [K.mc('Where should the plastic bottle go?', ['in the yellow container', 'in the kitchen bucket', 'in the river'], 0), K.tf('The plastic is recycled.', true), K.mc('What does Tom say would make the city cleaner?', ['if everyone did this', 'more rain', 'fewer cars'], 0)]);
  Q('u9', 'I forgot my password', 'Tom needs help with his phone.', [
    m(to, 'Айгүл, мен банк қосымшасын аша алмай тұрмын.'), f(ai, 'Оны жаңарттыңыз ба?'), m(to, 'Иә, кеше жаңарттым. Бірақ енді құпиясөзді ұмытып қалдым.'), f(ai, 'Құпиясөзді сайтта өзгертуге болады.'), m(to, 'Бұл қауіпсіз бе?'), f(ai, 'Иә. Сізге хабарламамен код жібереді.')],
    [K.mc('Which app can Tom not open?', ['the bank app', 'a game', 'the school app'], 0), K.mc('What is the problem?', ['He forgot his password.', 'The phone is broken.', 'There is no internet.'], 0), K.mc('How will he get the code?', ['in a message', 'by post', 'by phone call'], 0)]);
  Q('u10', 'Did you hear the news?', 'Aigul tells Tom some news.', [
    f(ai, 'Том, сенбіде алаңда концерт болады екен.'), m(to, 'Оны қайдан білдіңіз?'), f(ai, 'Көршім чаттан оқыпты.'), m(to, 'Бұл өсек болуы мүмкін. Мен рас па деп сұраймын.'), f(ai, 'Кімнен?'), m(to, 'Біздің қала туралы жазатын журналистен.')],
    [K.mc('What is the news about?', ['a concert on the square', 'a closed school', 'a new shop'], 0), K.mc('Where did the neighbour read it?', ['in a chat', 'in a newspaper', 'on a poster'], 0), K.mc('Who will Tom ask?', ['a journalist', 'the neighbour', 'a teacher'], 0)]);
  Q('u11', 'After the exhibition', 'Aigul and Tom leave an art exhibition.', [
    m(to, 'Сізге бірдеңе ұнады ма?'), f(ai, 'Иә, жас суретшінің бір картинасы. Ал сізге?'), m(to, 'Шынымды айтсам, мен ештеңе түсінбедім.'), f(ai, 'Ешкім бәрін бірден түсінбейді. Түсіндіріп берейін бе?'), m(to, 'Жарайды. Бірақ алдымен бір жерге барып кофе ішейік.'), f(ai, 'Жақсы!')],
    [K.mc('What did Aigul like?', ['a painting by a young artist', 'the building', 'nothing'], 0), K.tf('Tom understood everything.', false), K.mc('What do they do next?', ['go for a coffee', 'go home', 'buy a painting'], 0)]);
  Q('u12', 'How was the match?', 'Tom comes home after a football match.', [
    f(ai, 'Матч қалай өтті? Кім жеңді?'), m(to, 'Біз жеңіліп қалдық. Бір де үш.'), f(ai, 'Өкінішті. Сіз стадионға жиі барасыз ба?'), m(to, 'Иә. Бала кезімде мен әкеммен баратынмын, қазір әр сенбіде барамын.'), f(ai, 'Жаттықтырушы не деді?'), m(to, 'Ол «Келесі жолы жеңеміз» деді.')],
    [K.mc('What was the score?', ['1 : 3', '3 : 1', '0 : 2'], 0), K.mc('Who did Tom use to go to matches with?', ['his father', 'his coach', 'Aigul'], 0), K.tf('The coach thinks the team will win next time.', true)]);
  Q('u13', 'Which phone is better value?', 'Aigul and Tom are in a shop.', [
    m(to, 'Бұл телефон екі жүз мың теңге тұрады. Қымбат екен.'), f(ai, 'Ал анау елу мың теңгеге арзан.'), m(to, 'Бірақ мынаның жады екі есе көп.'), f(ai, 'Сізге сонша жад керек пе?'), m(to, 'Жоқ. Мен арзанын аламын, несие алмаймын.'), f(ai, 'Дұрыс. Қарыз аз болса, жақсы.')],
    [K.mc('How much is the first phone?', ['200,000 tenge', '150,000 tenge', '50,000 tenge'], 0), K.mc('How much cheaper is the second phone?', ['50,000 tenge', '20,000 tenge', '100,000 tenge'], 0), K.mc('Which phone does Tom choose?', ['the cheaper one', 'the more expensive one', 'neither'], 0)]);
  Q('u14', 'Going to visit', 'Aigul invites Tom to her grandparents.', [
    f(ai, 'Том, жексенбіде біз атам мен әжемнің үйіне қонаққа барамыз.'), m(to, 'Менің не алып баруым керек?'), f(ai, 'Дәстүр бойынша қонақтар шайға бірдеңе әкеледі.'), m(to, 'Мен торт сатып аламын. Ал балаларға ше?'), f(ai, 'Балаларға кәмпит алыңыз. Атам отырғанға дейін отырмаңыз.'), m(to, 'Түсіндім. Мен сіздердің әдет-ғұрыптарыңызды құрметтеймін.')],
    [K.mc('Who are they visiting on Sunday?', ['Aigul’s grandparents', 'Aigul’s colleagues', 'Tom’s friends'], 0), K.mc('What will Tom buy for tea?', ['a cake', 'flowers', 'fruit'], 0), K.mc('When may Tom sit down?', ['after the grandfather sits', 'at once', 'after the children'], 0)]);
  Q('u15', 'The soup is cold', 'Tom complains in a café.', [
    m(to, 'Кешіріңіз, менің шағымым бар. Сорпа суық.'), f('Даяшы', 'Кешірім сұраймын, бұл — біздің қатеміз. Басқасын әкелемін.'), m(to, 'Мен қырық минут күтіп отырмын.'), f('Даяшы', 'Кешіріңіз. Бүгін бізде плита жұмыс істемей тұр.'), m(to, 'Түсінікті.'), f('Даяшы', 'Тәтті тағам тегін болады. Ол дайын.')],
    [K.mc('What is wrong with the soup?', ['It is cold.', 'It is too salty.', 'It is the wrong soup.'], 0), K.mc('How long has Tom been waiting?', ['forty minutes', 'four minutes', 'an hour'], 0), K.mc('What does the café give him free?', ['dessert', 'coffee', 'the soup'], 0)]);
  Q('u16', 'How can I speak better?', 'Tom asks Aigul for advice.', [
    m(to, 'Айгүл, мен көп сөз білемін, дегенмен баяу сөйлеймін.'), f(ai, 'Бұл қалыпты нәрсе. Сізге көбірек әңгімелесу керек.'), m(to, 'Бірақ мен қателесемін.'), f(ai, 'Қателессеңіз де, сізді бәрі түсінеді.'), m(to, 'Ал айтылым ше?'), f(ai, 'Қазақша сөйлейтін адамдарды тыңдап, күн сайын қайталаңыз.')],
    [K.mc('What is Tom’s problem?', ['He speaks slowly.', 'He knows few words.', 'Nobody understands him.'], 0), K.mc('What does Aigul say he needs?', ['more conversation', 'a new teacher', 'more grammar books'], 0), K.mc('How can he improve his pronunciation?', ['listen to Kazakh speakers and repeat', 'read silently', 'write more'], 0)]);
  Q('u17', 'You cannot park here', 'A police officer speaks to Tom.', [
    f('Полицей', 'Сәлеметсіз бе. Мұнда көлік қоюға тыйым салынады.'), m(to, 'Кешіріңіз, мен белгіні көрмедім.'), f('Полицей', 'Белгі анау жерде. Сіз ережені білуге міндеттісіз.'), m(to, 'Мен айыппұл төлеймін бе?'), f('Полицей', 'Бірінші рет — жоқ. Бірақ көлікті қазір алып кетіңіз.'), m(to, 'Рақмет. Қай жерде рұқсат етіледі?'), f('Полицей', 'Бұрыштың артында тұрақ бар.')],
    [K.mc('What is forbidden here?', ['parking', 'walking', 'taking photos'], 0), K.tf('Tom has to pay a fine.', false), K.mc('Where is parking allowed?', ['round the corner', 'in front of the bank', 'nowhere'], 0)]);
  Q('u18', 'A school experiment', 'Aigul tells Tom about her nephew.', [
    f(ai, 'Менің жиенім ғылыми көрмеде жүлде алды.'), m(to, 'Ол не істеді?'), f(ai, 'Ол су мен тұзбен эксперимент жасады.'), m(to, 'Не дәлелденді?'), f(ai, 'Тұзды су баяуырақ қатады екен.'), m(to, 'Нәтиже қашан алынды?'), f(ai, 'Үш күннен кейін. Оның ғалым болғысы келеді.')],
    [K.mc('Who won a prize?', ['Aigul’s nephew', 'Aigul’s brother', 'Tom'], 0), K.mc('What did the experiment show?', ['Salt water freezes more slowly.', 'Salt water boils faster.', 'Plants like salt.'], 0), K.mc('What does he want to become?', ['a scientist', 'a teacher', 'a doctor'], 0)]);
  Q('u19', 'At the museum', 'Tom and Aigul visit the history museum.', [
    m(to, 'Айгүл, бұл қаланың негізі қашан қаланды?'), f(ai, '1879 жылы. Жүз жыл бұрын мұнда тек бес көше болған.'), m(to, 'Ал қаладан бұрын мұнда не болған?'), f(ai, 'Дала. Мұнда көшпенділер тұрған.'), m(to, 'Бұл музей ескі ме?'), f(ai, 'Ол жиырмасыншы ғасырда ашылды.')],
    [K.mc('When was the city founded?', ['in 1879', 'in 1979', 'in 1789'], 0), K.mc('What was there before the city?', ['steppe', 'a forest', 'a lake'], 0), K.mc('When was the museum opened?', ['in the twentieth century', 'in the nineteenth century', 'last year'], 0)]);
  Q('u20', 'I did it!', 'Aigul has good news.', [
    f(ai, 'Том, сәті түсті! Мен жүргізуші куәлігіне емтихан тапсыра алдым.'), m(to, 'Құттықтаймын! Бірінші реттен бе?'), f(ai, 'Жоқ, үшінші реттен. Екі рет тапсыра алмадым.'), m(to, 'Сіз берілмедіңіз. Жарайсыз!'), f(ai, 'Қиын болды, бірақ табандылық көмектесті.'), m(to, 'Енді жұмысқа көлікпен бара аласыз.')],
    [K.mc('What exam did Aigul pass?', ['her driving test', 'a language exam', 'a university exam'], 0), K.mc('On which try did she pass?', ['the third', 'the first', 'the second'], 0), K.mc('What helped her?', ['persistence', 'luck', 'money'], 0)]);
  Q('u21', 'Can you help on Saturday?', 'Aigul asks Tom to volunteer.', [
    f(ai, 'Том, сенбіде таңертең боссыз ба? Бізге еріктілер керек.'), m(to, 'Не істеу керек?'), f(ai, 'Біз қарт адамдарға азық-түлік апарып береміз.'), m(to, 'Бұл қанша уақыт алады?'), f(ai, 'Екі сағат. Оларға тек тамақ емес, көңіл бөлу де керек.'), m(to, 'Жақсы, келемін. Менің көлігім бар.')],
    [K.mc('When do they need volunteers?', ['on Saturday morning', 'on Sunday evening', 'every day'], 0), K.mc('What do the volunteers do?', ['take food to elderly people', 'clean the park', 'teach children'], 0), K.mc('How long does it take?', ['two hours', 'all day', 'half an hour'], 0)]);
  Q('u22', 'City or village?', 'Tom and Aigul compare two ways of life.', [
    m(to, 'Айгүл, сіз ауылда тұрғыңыз келе ме?'), f(ai, 'Білмеймін. Онда қалаға қарағанда тыныш, ауа да таза.'), m(to, 'Бірақ жұмыс мұндағыдай қызық емес.'), f(ai, 'Иә, бұл — кемшілік. Ал сіз?'), m(to, 'Мен фермада өстім. Ауылдың басты артықшылығы — адамдар.'), f(ai, 'Онда жазда сонда барайық!')],
    [K.mc('What does Aigul say about the village?', ['It is quieter and the air is cleaner.', 'It is noisy.', 'It is expensive.'], 0), K.mc('Where did Tom grow up?', ['on a farm', 'in a big city', 'by the sea'], 0), K.mc('What is the main advantage of the village for Tom?', ['the people', 'the shops', 'the salaries'], 0)]);
  Q('u23', 'The lost wallet', 'Tom tells Aigul what happened yesterday.', [
    m(to, 'Кеше менде бір ғажайып болды.'), f(ai, 'Қандай?'), m(to, 'Автобуспен келе жатқанда әмиянымды жоғалтып алдым.'), f(ai, 'Сосын не болды?'), m(to, 'Үйге келісімен, маған бейтаныс адам қоңырау шалды. Ол әмиянды тауып алыпты.'), f(ai, 'Ол сіздің нөміріңізді қайдан білді?'), m(to, 'Әмиянның ішінде менің карточкам бар болып шықты.')],
    [K.mc('Where did Tom lose his wallet?', ['on the bus', 'in a shop', 'at work'], 0), K.mc('Who phoned him?', ['a stranger', 'the police', 'Aigul'], 0), K.mc('How did the man know Tom’s number?', ['His card was in the wallet.', 'He knew Tom.', 'He asked the driver.'], 0)]);
  Q('u24', 'What next?', 'Aigul asks Tom about his plans after B1.', [
    f(ai, 'Том, сіз B1 деңгейін аяқтадыңыз. Енді не істейсіз?'), m(to, 'Бір жағынан, демалғым келеді. Екінші жағынан, жалғастырғым келеді.'), f(ai, 'Былтырғымен салыстырғанда сіз әлдеқайда жақсы сөйлейсіз.'), m(to, 'Рақмет. Соған қарамастан маған көбірек оқу керек.'), f(ai, 'Не оқисыз?'), m(to, 'Негізінен жаңалық оқимын. Содан кейін B2-ні бастаймын.')],
    [K.mc('Which level has Tom finished?', ['B1', 'A2', 'B2'], 0), K.mc('What does Tom say he needs to do more?', ['read', 'sleep', 'travel'], 0), K.mc('What will he mainly read?', ['the news', 'novels', 'poems'], 0)]);

  /* ================= Level tests: 30 questions, 30 minutes. The right answer moves between A, B and C. ================= */
  var n = 0, T = function (q, right, w1, w2) { var o = [w1, w2]; o.splice(n++ % 3, 0, right); return { t: 'mc', q: q, o: o, a: o.indexOf(right) }; };
  var IDS = []; for (var i = 1; i <= 24; i++) IDS.push('u' + i);
  var test = function (cid, name, ex) {
    IFX.units(cid, [{ id: 't1', title: name + ' B1 level test', topic: 'Level test', lessons: [{ id: 't', type: 'test', title: name + ' B1 level test', mins: 30, ex: ex }] }]);
    IFX.order(cid, IDS.concat(['t1']));
  };
  test('ru-b1', 'Russian', [
    T('Это подруга, ___ работает со мной.', 'которая', 'который', 'которые'), T('Это город, в ___ я живу.', 'котором', 'который', 'которая'),
    T('Мы говорим об экзамен___. (many)', 'ах', 'ов', 'ы'), T('Она рассказала ___ мне.', 'обо', 'об', 'в'),
    T('Я учу русский, чтобы ___ в Казахстане.', 'работать', 'работал', 'работаю'), T('Начальник хочет, чтобы я ___ в субботу.', 'работал', 'работать', 'работаю'),
    T('Не ___ здесь, пожалуйста.', 'курите', 'курить', 'курят'), T('___ больше воды!', 'Пейте', 'Пить', 'Пьют'),
    T('Она ___ с работы рано. (left)', 'ушла', 'пришла', 'вошла'), T('Самолёт ___ в Алматы в десять. (arrived)', 'прилетел', 'улетел', 'вылетел'),
    T('Пять помидор___.', 'ов', 'а', 'ы'), T('Много овощ___.', 'ей', 'ов', 'и'),
    T('Лампа висит над стол___.', 'ом', 'е', 'а'), T('Если бы у меня было время, я ___ помог.', 'бы', 'буду', 'был'),
    T('Этот сайт ___ каждый день.', 'обновляется', 'обновляет', 'обновлять'), T('Она спросила, приду ___ я.', 'ли', 'что', 'если'),
    T('Я ___ не знаю.', 'ничего', 'что-то', 'что-нибудь'), T('Каждую среду я ___ в бассейн.', 'хожу', 'иду', 'шёл'),
    T('Он дороже ___ десять тысяч тенге.', 'на', 'в', 'за'), T('Мы идём к друзь___.', 'ям', 'ей', 'ями'),
    T('Дверь ___.', 'открыта', 'открыт', 'открыты'), T('___ я устал, я пошёл на урок.', 'Хотя', 'Поэтому', 'Так как'),
    T('Здесь ___ курить. (forbidden)', 'запрещено', 'разрешено', 'обязан'), T('Школа ___ открыта в сентябре.', 'была', 'был', 'были'),
    T('Это было сто лет ___.', 'назад', 'после', 'до'), T('Мне ___ сдать экзамен.', 'удалось', 'удался', 'удалась'),
    T('Людям ___ помощь.', 'нужна', 'нужен', 'нужны'), T('Село не такое шумное, ___ город.', 'как', 'чем', 'что'),
    T('___ поезд остановился, я вышел.', 'Как только', 'Пока', 'Хотя'), T('“on the other hand” = …', 'с другой стороны', 'в результате', 'кроме того')]);
  test('kk-b1', 'Kazakh', [
    T('Кеше кел___ адам — менің досым.', 'ген', 'ған', 'етін'), T('Астанада тұр___ досым бар. (who lives)', 'атын', 'етін', 'йтын'),
    T('Үйге кел___ кейін мен тамақ ішемін.', 'геннен', 'кеннен', 'ғаннан'), T('Ұйықта___ бұрын мен кітап оқимын.', 'мас', 'бас', 'пас'),
    T('Ол «Мен келемін» ___ айтты.', 'деп', 'деді', 'үшін'), T('«Жақсы», — ___ ол.', 'деді', 'деп', 'деген'),
    T('Мұнда темекі шек___ңіз.', 'пе', 'ме', 'бе'), T('Қате жаз___ңыз.', 'ба', 'ма', 'па'),
    T('Менің ұшағым ұшып ___. (flew away)', 'кетті', 'келді', 'шықты'), T('Мен пойызға кешігіп ___.', 'қалдым', 'келдім', 'шықтым'),
    T('Қамырға тұз қос___ады.', 'ыл', 'іл', 'л'), T('Ұн дүкеннен ал___ады.', 'ын', 'ыл', 'іл'),
    T('Кітап үстелдің ___. (on)', 'үстінде', 'астында', 'ішінде'), T('Егер уақытым болса, мен көмектес___ едім.', 'ер', 'ар', 'р'),
    T('Мен кітап оқу___ жақсы көремін.', 'ды', 'ға', 'дан'), T('Естідің бе? Марат Астанаға кет___.', 'іпті', 'ыпты', 'пті'),
    T('Мен ___ білмеймін.', 'ештеңе', 'бірдеңе', 'біреу'), T('Бала кезімде мен футбол ойна___мын.', 'йтын', 'атын', 'йтін'),
    T('Бұл ноутбук анадан екі ___ қымбат.', 'есе', 'рет', 'дана'), T('Менің ерте тұр___ керек.', 'уым', 'уы', 'уыңыз'),
    T('Телефон жұмыс істе___ тұр.', 'мей', 'май', 'пей'), T('Шарша___ да, мен сабаққа бардым.', 'сам', 'сем', 'са'),
    T('Мұнда темекі шегуге тыйым ___.', 'салынады', 'етіледі', 'болады'), T('Бұл үй 1950 жылы сал___.', 'ынды', 'ылды', 'інді'),
    T('Жүз жыл ___ мұнда дала болған.', 'бұрын', 'кейін', 'дейін'), T('Мен емтиханды тапсыр___ алдым.', 'а', 'е', 'й'),
    T('Маған осы хатты оқып ___.', 'беріңізші', 'кетіңізші', 'қалыңызшы'), T('Ауыл қала___ шулы емес.', 'дай', 'дей', 'тай'),
    T('Пойыз тоқта___, мен түстім. (as soon as)', 'сымен', 'ысымен', 'ісімен'), T('“on the other hand” = …', 'екінші жағынан', 'нәтижесінде', 'сонымен қатар')]);
})();
