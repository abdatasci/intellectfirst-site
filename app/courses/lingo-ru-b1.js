/* IF Lingo · Russian B1: an original IF Academy course for people who speak English and have finished Russian A2.
   Word lines: word | part of speech | meaning in English | example | (empty) | how to say it | the example in English.
   Plan: 24 units and a level test (project doc claude/if-lingo.md). Built so far: units 1 to 8. */
IFX.course({
  id: 'ru-b1', track: 'lang', lang: 'ru-RU', level: 'B1', next: 'B2', icon: '🇷🇺',
  title: 'Russian B1', sub: 'Independent Russian',
  blurb: 'Talk about relationships, study, work, health, travel, cooking, housing and nature in longer sentences. The first 8 of 24 units, explained in English.',
  units: []
});
(function () {
  var k = IFX.k;
  IFX.make('ru-b1', [
    { id: 'u1', t: 'Отношения. People and relationships', topic: 'Relationships',
      v: ['Friends and family', `
отношения | noun | relationship, relations | У нас хорошие отношения. | | at-na-SHE-nee-ya | We have a good relationship.
доверять | verb | to trust | Я доверяю своему другу. | | da-vee-RYAT | I trust my friend.
ссориться | verb | to quarrel | Мы редко ссоримся. | | SSO-reet-sa | We rarely quarrel.
мириться | verb | to make up | Они быстро мирятся. | | mee-REET-sa | They make up quickly.
поддерживать | verb | to support | Семья всегда поддерживает меня. | | pad-DYER-zhy-vat | My family always supports me.
общаться | verb | to talk, to keep in touch | Мы общаемся каждый день. | | ap-SHCHAT-sa | We talk every day.
общий | adjective | common, shared | У нас много общего. | | OP-shchee | We have a lot in common.
надёжный | adjective | reliable | Он надёжный друг. | | na-DYOZH-ny | He is a reliable friend.
близкий | adjective | close | Она мой близкий друг. | | BLEES-kee | She is my close friend.
одинокий | adjective | lonely | Он чувствует себя одиноким. | | a-dee-NO-kee | He feels lonely.`],
      g: ['Who, which, that: который', '<p><b>который</b> joins two sentences about the same person or thing. It agrees with the noun it follows, like an adjective.</p><table><tr><th>The noun is…</th><th>Form</th><th>Example</th></tr><tr><td>он</td><td>котор<b>ый</b></td><td>Это друг, <b>который</b> живёт в Астане.</td></tr><tr><td>она</td><td>котор<b>ая</b></td><td>Это подруга, <b>которая</b> работает со мной.</td></tr><tr><td>оно</td><td>котор<b>ое</b></td><td>Это письмо, <b>которое</b> я получил вчера.</td></tr><tr><td>они</td><td>котор<b>ые</b></td><td>Это люди, <b>которые</b> помогают мне.</td></tr></table><p>Inside its own part of the sentence, <b>который</b> takes the ending its job needs:</p><ul><li>Это друг, <b>с которым</b> я учился. = the friend I studied with</li><li>Это город, <b>в котором</b> я живу. = the city I live in</li><li>Это человек, <b>которого</b> я знаю. = the person I know</li></ul><p>Always put a comma before it.</p>', [
        k.mc('Это друг, ___ живёт в Астане.', ['который', 'которая', 'которые'], 0),
        k.mc('Это подруга, ___ работает со мной.', ['которая', 'который', 'которое'], 0),
        k.mc('Это люди, ___ помогают мне.', ['которые', 'которая', 'который'], 0),
        k.mc('Это город, в ___ я живу.', ['котором', 'который', 'которого'], 0),
        k.mc('Это друг, с ___ я учился.', ['которым', 'который', 'которая'], 0),
        k.ord('Это друг который живёт в Астане')]],
      r: ['My closest friend', 'У каждого человека есть люди, которым он доверяет. У меня это Марат — друг, с которым я учился в школе.\n\nМы очень разные. Марат спокойный и серьёзный, а я люблю шутить. Но у нас много общего: мы оба любим горы и футбол.\n\nКонечно, иногда мы ссоримся. В прошлом году мы не общались целый месяц! Потом Марат позвонил первым, и мы помирились.\n\nСейчас он живёт в другом городе, но мы общаемся почти каждый день. Он надёжный человек, который всегда поддерживает меня. Я думаю, что близкий друг — это большая удача.\n\n(шутить = to joke · оба = both · целый = a whole)', [
        k.mc('Where did the writer and Marat meet?', ['at school', 'at work', 'in the mountains'], 0), k.tf('The two friends have the same character.', false), k.mc('Who phoned first after the quarrel?', ['Marat', 'the writer', 'their teacher'], 0), k.tf('They still talk almost every day.', true)]] },

    { id: 'u2', t: 'Образование. Education', topic: 'Education',
      v: ['Study words', `
образование | noun | education | У неё высшее образование. | | ab-ra-za-VA-nee-ye | She has a university education.
знание | noun | knowledge | Знание — сила. | | ZNA-nee-ye | Knowledge is power.
предмет | noun | subject | Мой любимый предмет — история. | | preed-MYET | My favourite subject is history.
оценка | noun | mark, grade | Он получил хорошую оценку. | | a-TSEN-ka | He got a good mark.
преподаватель | noun | lecturer, teacher | Наш преподаватель очень строгий. | | pree-pa-da-VA-teel | Our lecturer is very strict.
лекция | noun | lecture | Лекция начинается в девять. | | LYEK-tsee-ya | The lecture begins at nine.
сдавать | verb | to take (an exam) | Завтра я сдаю экзамен. | | zda-VAT | Tomorrow I am taking an exam.
домашнее задание | noun | homework | Я делаю домашнее задание. | | da-MASH-nee-ye za-DA-nee-ye | I am doing my homework.
навык | noun | skill | Это полезный навык. | | NA-vyk | This is a useful skill.
стипендия | noun | scholarship, grant | Она получает стипендию. | | stee-PYEN-dee-ya | She gets a scholarship.`],
      g: ['About what? о + a new ending', '<p>After <b>о</b> (about) the noun takes the ending you know from places (<b>в город<u>е</u></b>).</p><table><tr><th></th><th>One</th><th>Many</th></tr><tr><td>экзамен</td><td>об экзамен<b>е</b></td><td>об экзамен<b>ах</b></td></tr><tr><td>книга</td><td>о книг<b>е</b></td><td>о книг<b>ах</b></td></tr><tr><td>учитель</td><td>об учител<b>е</b></td><td>об учител<b>ях</b></td></tr><tr><td>лекция</td><td>о лекци<b>и</b></td><td>о лекци<b>ях</b></td></tr></table><ul><li><b>о</b> becomes <b>об</b> before a vowel sound: об экзамене, об учителе.</li><li>People: <b>обо мне, о тебе, о нём, о ней, о нас, о вас, о них</b>.</li><li>Verbs that use it: <b>думать о</b>, <b>говорить о</b>, <b>мечтать о</b>, <b>рассказать о</b>.</li></ul><p>The plural ending <b>-ах, -ях</b> is the same for all nouns. It also comes after <b>в</b> and <b>на</b>: в школ<b>ах</b>, на лекци<b>ях</b>.</p>', [
        k.mc('Мы говорим о книг___. (one book)', ['е', 'у', 'а'], 0),
        k.mc('Студенты думают об экзамен___. (many)', ['ах', 'ов', 'ы'], 0),
        k.mc('Она рассказала ___ мне.', ['обо', 'о', 'об'], 0),
        k.mc('Я часто думаю о ___. (him)', ['нём', 'он', 'его'], 0),
        k.mc('В наших школ___ много учеников.', ['ах', 'ы', 'ам'], 0),
        k.ord('Мы говорим об экзаменах')]],
      r: ['Studying in two countries', 'Меня зовут Дана. Я учусь на втором курсе университета в Костанае. Мой любимый предмет — английская литература.\n\nВ прошлом году я полгода училась в Англии. Там всё было по-другому. На лекциях преподаватели много спрашивали о нашем мнении. Оценки ставили не только за экзамены, но и за работу в группах.\n\nДома мы больше слушаем и пишем. Зато у нас сильные знания по грамматике.\n\nЯ думаю, что хорошее образование — это и знания, и навыки. Сейчас я получаю стипендию и мечтаю о работе переводчика.\n\n(на втором курсе = in the second year · по-другому = different · ставили = gave · переводчик = translator)', [
        k.mc('What is Dana’s favourite subject?', ['English literature', 'history', 'grammar'], 0), k.mc('How long did she study in England?', ['half a year', 'two years', 'one month'], 0), k.tf('In England marks were given only for exams.', false), k.mc('What job does Dana dream about?', ['translator', 'lecturer', 'writer'], 0)]] },

    { id: 'u3', t: 'Карьера. Careers', topic: 'Work',
      v: ['The world of work', `
вакансия | noun | vacancy | В компании есть вакансия. | | va-KAN-see-ya | The company has a vacancy.
требование | noun | requirement | Какие требования к кандидату? | | TRYE-ba-va-nee-ye | What are the requirements for the candidate?
ответственность | noun | responsibility | Это большая ответственность. | | at-VYET-stveen-nast | This is a big responsibility.
руководитель | noun | manager, head | Она руководитель отдела. | | roo-ka-va-DEE-teel | She is the head of the department.
повышение | noun | promotion, rise | Он получил повышение. | | pa-vy-SHE-nee-ye | He got a promotion.
уволить | verb | to dismiss | Его уволили в мае. | | oo-VO-leet | He was dismissed in May.
нанять | verb | to hire | Компания наняла трёх человек. | | na-NYAT | The company hired three people.
прибыль | noun | profit | В этом году прибыль выросла. | | PREE-byl | This year the profit grew.
бизнес | noun | business | У него свой бизнес. | | BEEZ-nes | He has his own business.
предприниматель | noun | entrepreneur | Она молодой предприниматель. | | preed-pree-nee-MA-teel | She is a young entrepreneur.`],
      g: ['In order to, and want someone to: чтобы', '<p><b>чтобы</b> has two jobs.</p><p><b>1. Purpose</b> (in order to). The same person does both actions, so use the dictionary form:</p><ul><li>Я учу русский, <b>чтобы работать</b> в Казахстане. = I am learning Russian in order to work in Kazakhstan.</li></ul><p><b>2. Wanting another person to do something.</b> A new person does the second action, so the verb takes the <b>past form</b> (-л, -ла, -ли), but the meaning is not past:</p><ul><li>Начальник хочет, <b>чтобы я работал</b> в субботу. = The boss wants me to work on Saturday.</li><li>Я хочу, <b>чтобы она пришла</b>. = I want her to come.</li><li>Мама хочет, <b>чтобы мы учились</b>. = Mum wants us to study.</li></ul><p>Compare: Я хочу <b>работать</b>. (I want to work.) / Я хочу, <b>чтобы ты работал</b>. (I want you to work.)</p>', [
        k.mc('Я учу русский, чтобы ___ в Казахстане.', ['работать', 'работал', 'работаю'], 0),
        k.mc('Начальник хочет, чтобы я ___ в субботу.', ['работал', 'работать', 'работаю'], 0),
        k.mc('Я хочу, чтобы она ___.', ['пришла', 'прийти', 'придёт'], 0),
        k.mc('Мама хочет, чтобы мы ___.', ['учились', 'учимся', 'учиться'], 0),
        k.mc('“I want to work.” = …', ['Я хочу работать.', 'Я хочу, чтобы работал.', 'Я хочу, чтобы я работаю.'], 0),
        k.ord('Я хочу чтобы она пришла')]],
      r: ['From employee to entrepreneur', 'Пять лет Алия работала бухгалтером в большой компании. Работа была спокойная, зарплата хорошая. Руководитель хотел, чтобы она осталась, и даже предложил повышение.\n\nНо Алия мечтала о своём бизнесе. Она ушла из компании, чтобы открыть маленькую пекарню.\n\nПервый год был трудным. Прибыли почти не было, а ответственность была огромная. Алия работала по двенадцать часов в день.\n\nСейчас у неё три пекарни. Недавно она наняла десять новых сотрудников. Главное требование к ним — любить свою работу.\n\n«Я хочу, чтобы люди приходили к нам с удовольствием», — говорит Алия.\n\n(осталась = stayed · пекарня = bakery · огромная = huge)', [
        k.mc('What was Aliya’s first job?', ['accountant', 'baker', 'manager'], 0), k.tf('Her manager wanted her to leave.', false), k.mc('Why did she leave the company?', ['to open a bakery', 'to study', 'to move abroad'], 0), k.mc('How many bakeries does she have now?', ['three', 'one', 'ten'], 0)]] },

    { id: 'u4', t: 'Здоровый образ жизни. A healthy lifestyle', topic: 'Health',
      v: ['Staying healthy', `
образ жизни | noun | lifestyle | У него здоровый образ жизни. | | O-bras ZHYZ-nee | He has a healthy lifestyle.
питание | noun | diet, nutrition | Правильное питание очень важно. | | pee-TA-nee-ye | A good diet is very important.
диета | noun | (special) diet | Врач назначил мне диету. | | dee-YE-ta | The doctor put me on a diet.
вес | noun | weight | Мой вес — семьдесят килограммов. | | vyes | My weight is seventy kilograms.
тренировка | noun | training, workout | У меня тренировка три раза в неделю. | | tree-nee-ROF-ka | I have a workout three times a week.
витамин | noun | vitamin | В овощах много витаминов. | | vee-ta-MEEN | There are many vitamins in vegetables.
стресс | noun | stress | На работе у меня стресс. | | stress | I have stress at work.
вредная привычка | noun | bad habit | Курение — вредная привычка. | | VRYED-na-ya pree-VYCH-ka | Smoking is a bad habit.
бросить | verb | to give up, to quit | Он бросил курить. | | BRO-seet | He gave up smoking.
следить | verb | to keep an eye on | Я слежу за здоровьем. | | slee-DEET | I look after my health.`],
      g: ['Do it! Don’t do it!', '<p>To give advice or an order, take the <b>они</b> form of the verb and change the ending.</p><table><tr><th>они form</th><th>To a friend</th><th>Polite, or to many</th></tr><tr><td>чита-ют (after a vowel)</td><td>чита<b>й</b></td><td>чита<b>йте</b></td></tr><tr><td>говор-ят (after a consonant)</td><td>говор<b>и</b></td><td>говор<b>ите</b></td></tr><tr><td>пь-ют</td><td>пе<b>й</b></td><td>пе<b>йте</b></td></tr><tr><td>ед-ят</td><td>еш<b>ь</b></td><td>еш<b>ьте</b></td></tr><tr><td>занима-ют-ся</td><td>занима<b>йся</b></td><td>занима<b>йтесь</b></td></tr></table><p><b>Don’t:</b> use <b>не</b> + the <b>action</b> verb (not the result verb):</p><ul><li><b>Не курите</b> здесь! = Do not smoke here!</li><li><b>Не ешьте</b> много сладкого. = Do not eat a lot of sweet things.</li></ul><p>For one result, use the result verb: <b>Бросьте</b> курить! = Give up smoking!</p>', [
        k.mc('___ больше воды! (polite)', ['Пейте', 'Пить', 'Пьёте'], 0),
        k.mc('___ спортом! (to a friend)', ['Занимайся', 'Занимайтесь', 'Заниматься'], 0),
        k.mc('Не ___ здесь, пожалуйста. (polite)', ['курите', 'курить', 'курят'], 0),
        k.mc('___ больше овощей! (polite)', ['Ешьте', 'Едите', 'Есть'], 0),
        k.mc('читать → to a friend: …', ['читай', 'читайте', 'читаешь'], 0),
        k.ord('Не ешьте много сладкого')]],
      r: ['The doctor’s advice', 'Тимур — программист. Он сидит за компьютером десять часов в день, мало спит и много работает. Недавно он пошёл к врачу, потому что всё время чувствовал себя уставшим.\n\nВрач сказал: «У вас нет серьёзной болезни. Но ваш образ жизни нужно изменить. Спите не меньше семи часов. Ешьте больше овощей и фруктов, в них много витаминов. Не пейте кофе вечером. И бросьте курить — это вредная привычка».\n\n«А спорт?» — спросил Тимур.\n\n«Начните с малого. Гуляйте по тридцать минут каждый день. Через месяц запишитесь на тренировки».\n\nТимур решил следить за здоровьем. Теперь он ходит на работу пешком.\n\n(уставшим = tired · болезни = illness · не меньше = at least · с малого = with something small)', [
        k.mc('Why did Timur go to the doctor?', ['He felt tired all the time.', 'He broke his leg.', 'He had a cough.'], 0), k.tf('The doctor found a serious illness.', false), k.mc('What should Timur not do in the evening?', ['drink coffee', 'walk', 'eat vegetables'], 0), k.mc('How does Timur get to work now?', ['on foot', 'by car', 'by bus'], 0)]] },

    { id: 'u5', t: 'В дороге. On the move', topic: 'Travel',
      v: ['Coming and going', `
приехать | verb | to arrive (by transport) | Мы приехали в Астану утром. | | pree-YE-khat | We arrived in Astana in the morning.
уехать | verb | to leave (by transport) | Он уехал в командировку. | | oo-YE-khat | He left on a business trip.
прилететь | verb | to arrive by plane | Самолёт прилетел вовремя. | | pree-lee-TYET | The plane arrived on time.
войти | verb | to go in, to enter | Можно войти? | | vay-TEE | May I come in?
перейти | verb | to cross | Перейдите улицу. | | pee-rey-TEE | Cross the street.
отправление | noun | departure | Отправление в шесть часов. | | at-prav-LYE-nee-ye | Departure is at six o’clock.
прибытие | noun | arrival | Прибытие в полдень. | | pree-BY-tee-ye | Arrival is at noon.
задержка | noun | delay | Задержка рейса — два часа. | | za-DYERSH-ka | The flight delay is two hours.
таможня | noun | customs | Мы прошли таможню. | | ta-MOZH-nya | We went through customs.
бронировать | verb | to book | Я бронирую гостиницу. | | bra-NEE-ra-vat | I am booking a hotel.`],
      g: ['Small beginnings, big meanings: verbs of motion', '<p>Add a short beginning to <b>идти</b> (on foot), <b>ехать</b> (by transport) or <b>лететь</b> (by plane) to show the direction.</p><table><tr><th>Beginning</th><th>Meaning</th><th>Examples</th></tr><tr><td><b>при-</b></td><td>arrive, come</td><td><b>при</b>йти, <b>при</b>ехать, <b>при</b>лететь</td></tr><tr><td><b>у-</b></td><td>leave, go away</td><td><b>у</b>йти, <b>у</b>ехать, <b>у</b>лететь</td></tr><tr><td><b>в-</b></td><td>go in</td><td><b>в</b>ойти, <b>въ</b>ехать</td></tr><tr><td><b>вы-</b></td><td>go out</td><td><b>вы</b>йти, <b>вы</b>ехать</td></tr><tr><td><b>пере-</b></td><td>cross, move</td><td><b>пере</b>йти, <b>пере</b>ехать</td></tr></table><p>The past of <b>-йти</b> verbs: пришёл, пришла, пришли; ушёл, ушла, ушли; вошёл, вышел.</p><ul><li>Он <b>пришёл</b> домой в семь. = He came home at seven.</li><li>Она <b>ушла</b> с работы рано. = She left work early.</li><li>Мы <b>выехали</b> из города. = We drove out of the city.</li></ul>', [
        k.mc('Самолёт ___ в Алматы в десять. (arrived)', ['прилетел', 'улетел', 'перелетел'], 0),
        k.mc('Она ___ с работы рано. (left)', ['ушла', 'пришла', 'вошла'], 0),
        k.mc('Он открыл дверь и ___ в комнату.', ['вошёл', 'вышел', 'ушёл'], 0),
        k.mc('___ улицу и поверните направо.', ['Перейдите', 'Войдите', 'Придите'], 0),
        k.mc('“We drove out of the city.” = …', ['Мы выехали из города.', 'Мы въехали в город.', 'Мы приехали в город.'], 0),
        k.ord('Он пришёл домой в семь')]],
      r: ['A long way home', 'В декабре я летел из Лондона в Костанай через Астану. Отправление было в девять вечера.\n\nВ Лондоне всё было хорошо. Я быстро прошёл регистрацию и вошёл в самолёт. Но мы прилетели в Астану с опозданием: из-за снега задержка была три часа.\n\nВ Астане я прошёл таможню и побежал на второй рейс. Поздно! Мой самолёт уже улетел.\n\nСледующий рейс был только утром. К счастью, я заранее не бронировал гостиницу в Костанае. Я нашёл номер рядом с аэропортом и уехал туда на такси.\n\nУтром я наконец прилетел домой. Мама сказала: «Главное, что ты приехал!»\n\n(регистрация = check-in · с опозданием = late · из-за снега = because of the snow)', [
        k.mc('Where did the writer change planes?', ['in Astana', 'in London', 'in Kostanay'], 0), k.mc('Why was the first flight late?', ['because of snow', 'because of customs', 'because of a strike'], 0), k.tf('He caught his second flight that evening.', false), k.mc('Where did he spend the night?', ['in a hotel near the airport', 'at the airport', 'at his mother’s home'], 0)]] },

    { id: 'u6', t: 'На кухне. In the kitchen', topic: 'Cooking',
      v: ['Cooking words', `
ингредиент | noun | ingredient | Какие ингредиенты нужны? | | een-gree-dee-YENT | Which ingredients are needed?
резать | verb | to cut | Я режу хлеб. | | RYE-zat | I am cutting bread.
жарить | verb | to fry | Мама жарит картошку. | | ZHA-reet | Mum is frying potatoes.
варить | verb | to boil, to cook | Я варю суп. | | va-REET | I am cooking soup.
печь | verb | to bake | Бабушка печёт пироги. | | pyech | Grandmother bakes pies.
добавить | verb | to add | Добавьте соль. | | da-BA-veet | Add salt.
смешать | verb | to mix | Смешайте муку и яйца. | | smee-SHAT | Mix the flour and eggs.
кастрюля | noun | saucepan | Суп в кастрюле. | | kas-TRYOO-lya | The soup is in the saucepan.
сковорода | noun | frying pan | Сковорода горячая. | | ska-va-ra-DA | The frying pan is hot.
мука | noun | flour | Мне нужна мука. | | moo-KA | I need flour.`],
      g: ['How many? The “of” ending for many things', '<p>After <b>много, мало, несколько, сколько</b>, after <b>нет</b>, and after numbers from <b>5</b> up, countable nouns take a special plural ending.</p><table><tr><th>The noun ends in…</th><th>Ending</th><th>Examples</th></tr><tr><td>a hard consonant</td><td><b>-ов</b></td><td>помидор → помидор<b>ов</b>, грамм → грамм<b>ов</b></td></tr><tr><td>-а, -о</td><td>no ending</td><td>ложка → лож<b>ек</b>, яблоко → яблок, минута → минут</td></tr><tr><td>-ь, ж, ш, ч, щ</td><td><b>-ей</b></td><td>овощ → овощ<b>ей</b>, день → дн<b>ей</b>, нож → нож<b>ей</b></td></tr><tr><td>-ия, -ие</td><td><b>-ий</b></td><td>лекция → лекц<b>ий</b>, задание → задан<b>ий</b></td></tr></table><p>When two consonants meet at the end, <b>о</b> or <b>е</b> comes between them: ложка → лож<b>е</b>к, тарелка → тарел<b>о</b>к, чашка → чаш<b>е</b>к.</p><p>Numbers: <b>1</b> помидор · <b>2, 3, 4</b> помидор<b>а</b> · <b>5–20</b> помидор<b>ов</b>.</p>', [
        k.mc('Пять помидор___.', ['ов', 'а', 'ы'], 0),
        k.mc('Много овощ___.', ['ей', 'ов', 'и'], 0),
        k.mc('Две ложки, пять ___.', ['ложек', 'ложки', 'ложков'], 0),
        k.mc('Сколько ___ варить суп? (minutes)', ['минут', 'минуты', 'минутов'], 0),
        k.mc('У нас нет яблок. = …', ['We have no apples.', 'We have an apple.', 'We have five apples.'], 0),
        k.ord('Добавьте пять ложек муки')]],
      r: ['Grandmother’s baursaks', 'Баурсаки — традиционное казахское блюдо. Моя бабушка печёт их каждый праздник. Вот её рецепт.\n\nИнгредиентов немного: пятьсот граммов муки, стакан тёплого молока, два яйца, ложка сахара, немного соли и дрожжей.\n\nСначала смешайте молоко, сахар и дрожжи. Через десять минут добавьте яйца, соль и муку. Тесто должно стоять в тёплом месте один час.\n\nПотом режьте тесто на маленькие кусочки. Жарьте их в сковороде, в горячем масле, по три минуты.\n\nБабушка говорит: «Баурсаков должно быть много, потому что гостей всегда много!»\n\n(рецепт = here: recipe · дрожжи = yeast · тесто = dough · кусочки = pieces)', [
        k.mc('How much flour is needed?', ['500 grams', '5 grams', 'one glass'], 0), k.mc('How long should the dough stand?', ['one hour', 'ten minutes', 'three minutes'], 0), k.tf('The baursaks are boiled in water.', false), k.mc('Why must there be a lot of baursaks?', ['There are always many guests.', 'They are cheap.', 'They keep for a year.'], 0)]] },

    { id: 'u7', t: 'Жильё. A place to live', topic: 'Housing',
      v: ['Renting and living', `
жильё | noun | housing, a place to live | В столице дорогое жильё. | | zhyl-YO | Housing is expensive in the capital.
аренда | noun | rent | Аренда квартиры стоит дорого. | | a-RYEN-da | Renting a flat is expensive.
снимать | verb | to rent (as a tenant) | Мы снимаем квартиру в центре. | | snee-MAT | We rent a flat in the centre.
хозяин | noun | landlord, owner | Хозяин квартиры живёт рядом. | | kha-ZYA-een | The landlord lives nearby.
мебель | noun | furniture | В комнате новая мебель. | | MYE-beel | There is new furniture in the room.
удобства | noun | conveniences | В доме есть все удобства. | | oo-DOPST-va | The house has all conveniences.
отопление | noun | heating | Зимой отопление работает хорошо. | | a-tap-LYE-nee-ye | In winter the heating works well.
коммунальные услуги | noun | utilities | Коммунальные услуги стоят недорого. | | ka-moo-NAL-ny-ye oos-LOO-gee | Utilities are not expensive.
общежитие | noun | student hostel, dormitory | Студенты живут в общежитии. | | ap-shchee-ZHY-tee-ye | The students live in a hostel.
собственный | adjective | (your) own | У них собственный дом. | | SOPST-veen-ny | They have their own house.`],
      g: ['Above, under, behind, next to: a new ending', '<p>After <b>над</b> (above), <b>под</b> (under), <b>перед</b> (in front of), <b>за</b> (behind), <b>между</b> (between) and <b>рядом с</b> (next to), the noun takes the ending you met with jobs (<b>работаю врач<u>ом</u></b>).</p><table><tr><th>The noun ends in…</th><th>One</th><th>Many</th></tr><tr><td>a consonant, -о</td><td>стол → над стол<b>ом</b>, окно → под окн<b>ом</b></td><td>над стол<b>ами</b></td></tr><tr><td>-а</td><td>школа → за школ<b>ой</b></td><td>за школ<b>ами</b></td></tr><tr><td>-ь (он), -е</td><td>словарь → под словар<b>ём</b>, море → над мор<b>ем</b></td><td>над мор<b>ями</b></td></tr><tr><td>-ь (она)</td><td>дверь → перед двер<b>ью</b></td><td>перед двер<b>ями</b></td></tr></table><ul><li>Лампа висит <b>над столом</b>. = The lamp hangs above the table.</li><li>Парк находится <b>за домом</b>. = The park is behind the house.</li><li>Я живу <b>рядом с парком</b>. = I live next to the park.</li></ul>', [
        k.mc('Лампа висит над стол___.', ['ом', 'е', 'а'], 0),
        k.mc('Парк находится за школ___.', ['ой', 'е', 'у'], 0),
        k.mc('Я живу рядом с парк___.', ['ом', 'а', 'е'], 0),
        k.mc('Машина стоит перед двер___.', ['ью', 'и', 'ем'], 0),
        k.mc('Кошка спит под ___ . (the bed)', ['кроватью', 'кровать', 'кровати'], 0),
        k.ord('Парк находится за домом')]],
      r: ['Looking for a flat', 'Когда я поступил в университет, я жил в общежитии. Там было весело, но шумно. На третьем курсе мы с другом решили снимать квартиру.\n\nМы искали жильё целый месяц. Первая квартира была рядом с университетом, но аренда стоила слишком дорого. Вторая была дешёвая, но без мебели, и отопление работало плохо.\n\nНаконец мы нашли третью. Она находится за парком, между магазином и аптекой. В ней две комнаты и все удобства. Хозяин — пожилой человек, который живёт над нами.\n\nКоммунальные услуги мы платим сами. Это не собственный дом, но нам здесь нравится.\n\n(слишком = too · без = without · сами = ourselves)', [
        k.mc('Where did the writer live first?', ['in a student hostel', 'with his parents', 'in his own house'], 0), k.mc('What was wrong with the first flat?', ['The rent was too high.', 'It had no furniture.', 'It was far away.'], 0), k.mc('Where does the landlord live?', ['above them', 'in another city', 'next to the park'], 0), k.tf('The landlord pays for the utilities.', false)]] },

    { id: 'u8', t: 'Природа и экология. Nature and the environment', topic: 'Environment',
      v: ['Our planet', `
природа | noun | nature | Я люблю природу Казахстана. | | pree-RO-da | I love the nature of Kazakhstan.
окружающая среда | noun | the environment | Нужно беречь окружающую среду. | | ak-roo-ZHA-yoo-shcha-ya sree-DA | We need to look after the environment.
загрязнение | noun | pollution | Загрязнение воздуха — большая проблема. | | za-gryaz-NYE-nee-ye | Air pollution is a big problem.
животное | noun | animal | Это редкое животное. | | zhy-VOT-na-ye | This is a rare animal.
растение | noun | plant | В степи много растений. | | ras-TYE-nee-ye | There are many plants in the steppe.
защищать | verb | to protect | Мы должны защищать лес. | | za-shchee-SHCHAT | We must protect the forest.
перерабатывать | verb | to recycle | Здесь перерабатывают пластик. | | pee-ree-ra-BA-ty-vat | Plastic is recycled here.
отходы | noun | waste | Завод производит много отходов. | | at-KHO-dy | The factory produces a lot of waste.
пластик | noun | plastic | Пластик опасен для природы. | | PLAS-teek | Plastic is dangerous for nature.
сохранить | verb | to preserve, to save | Нужно сохранить это озеро. | | sa-khra-NEET | We need to save this lake.`],
      g: ['If only…: если бы', '<p>For something that is <b>not real</b> (you only imagine it), use <b>если бы</b> + the past form, and <b>бы</b> + the past form in the second part.</p><ul><li><b>Если бы</b> у меня <b>было</b> время, я <b>бы помог</b>. = If I had time, I would help. (But I have no time.)</li><li><b>Если бы</b> люди не <b>мусорили</b>, город <b>был бы</b> чище. = If people did not drop litter, the city would be cleaner.</li></ul><p>Compare with the real <b>если</b> from A2:</p><table><tr><th>Real, possible</th><th>Only imagined</th></tr><tr><td>Если <b>будет</b> дождь, я <b>буду</b> дома.</td><td>Если <b>бы был</b> дождь, я <b>был бы</b> дома.</td></tr></table><p>The verb looks past, but the meaning can be now or the future. <b>бы</b> usually comes after the verb or after the first word.</p>', [
        k.mc('Если бы у меня ___ время, я бы помог.', ['было', 'будет', 'есть'], 0),
        k.mc('Если бы люди не мусорили, город ___ бы чище.', ['был', 'будет', 'есть'], 0),
        k.mc('Если бы я знал, я ___ сказал.', ['бы', 'буду', 'был'], 0),
        k.mc('Which sentence is only imagined?', ['Если бы был дождь, я был бы дома.', 'Если будет дождь, я буду дома.', 'Когда идёт дождь, я дома.'], 0),
        k.mc('“If I had money, I would buy a house.” = …', ['Если бы у меня были деньги, я бы купил дом.', 'Если у меня будут деньги, я куплю дом.', 'Если у меня деньги, я купил дом.'], 0),
        k.ord('Если бы я знал я бы сказал')]],
      r: ['Lake Burabay', 'Озеро Бурабай — одно из самых красивых мест Казахстана. Вокруг него горы и лес, в котором живут редкие животные и растут редкие растения.\n\nКаждое лето сюда приезжают тысячи туристов. К сожалению, не все думают о природе. После выходных на берегу остаётся много отходов: пластик, бутылки, пакеты.\n\nШкольники из соседнего города решили защищать озеро. Каждую субботу они убирают берег. Пластик, который они собирают, потом перерабатывают.\n\n«Если бы каждый турист убирал за собой, нам не нужно было бы это делать, — говорит пятнадцатилетняя Айгерим. — Мы хотим сохранить Бурабай для наших детей».\n\n(берег = shore · остаётся = is left · за собой = after himself)', [
        k.mc('What is around the lake?', ['mountains and forest', 'a big city', 'factories'], 0), k.mc('What is the problem after weekends?', ['a lot of waste on the shore', 'too many animals', 'no tourists'], 0), k.mc('Who cleans the shore every Saturday?', ['school pupils', 'tourists', 'factory workers'], 0), k.tf('The plastic they collect is recycled.', true)]] }
  ]);
})();
