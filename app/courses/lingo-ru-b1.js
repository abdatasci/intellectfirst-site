/* IF Lingo · Russian B1: an original IF Academy course for people who speak English and have finished Russian A2.
   Word lines: word | part of speech | meaning in English | example | (empty) | how to say it | the example in English.
   Plan: 24 units and a level test (project doc claude/if-lingo.md). All 24 units are here; the listening lessons, level test and word bank are in their own files when built. */
IFX.course({
  id: 'ru-b1', track: 'lang', lang: 'ru-RU', level: 'B1', next: 'B2', icon: '🇷🇺',
  title: 'Russian B1', sub: 'Independent Russian',
  blurb: 'Talk about relationships, study, work, health, travel, housing, nature, technology, the news, culture, sport and money in longer sentences. 24 units, explained in English.',
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
        k.mc('What is around the lake?', ['mountains and forest', 'a big city', 'factories'], 0), k.mc('What is the problem after weekends?', ['a lot of waste on the shore', 'too many animals', 'no tourists'], 0), k.mc('Who cleans the shore every Saturday?', ['school pupils', 'tourists', 'factory workers'], 0), k.tf('The plastic they collect is recycled.', true)]] },

    { id: 'u9', t: 'Технологии. Technology', topic: 'Technology',
      v: ['The digital world', `
технология | noun | technology | Это новая технология. | | tekh-na-LO-gee-ya | This is a new technology.
устройство | noun | device | Это полезное устройство. | | oost-ROYST-va | This is a useful device.
искусственный интеллект | noun | artificial intelligence | Искусственный интеллект помогает врачам. | | ees-KOOST-veen-ny een-tee-LYEKT | Artificial intelligence helps doctors.
данные | noun | data | Все данные хранятся в сети. | | DAN-ny-ye | All the data is kept online.
сайт | noun | website | У школы есть сайт. | | sayt | The school has a website.
пользователь | noun | user | У сайта миллион пользователей. | | POL-za-va-teel | The website has a million users.
обновить | verb | to update | Нужно обновить приложение. | | ab-na-VEET | You need to update the app.
загрузить | verb | to upload, to load | Я загрузил фото на сайт. | | za-groo-ZEET | I uploaded a photo to the website.
удалить | verb | to delete | Я удалил старые файлы. | | oo-da-LEET | I deleted the old files.
безопасность | noun | security, safety | Пароль нужен для безопасности. | | bee-za-PAS-nast | A password is needed for security.`],
      g: ['It is used, it is sold: the passive with -ся', '<p>When it is not important <b>who</b> does the action, Russian often adds <b>-ся</b> to the verb. The thing becomes the subject.</p><table><tr><th>Someone does it</th><th>It is done</th></tr><tr><td>Школа использует компьютеры.</td><td>Компьютеры использу<b>ются</b> в школе.</td></tr><tr><td>Мы обновляем сайт каждый день.</td><td>Сайт обновля<b>ется</b> каждый день.</td></tr><tr><td>Здесь продают билеты.</td><td>Билеты прода<b>ются</b> здесь.</td></tr></table><p>One thing: <b>-ется</b> / <b>-ится</b>. Many things: <b>-ются</b> / <b>-ятся</b>.</p><p>A second way: the <b>они</b> form with no subject. It means <i>people, they, someone</i>:</p><ul><li><b>Говорят</b>, что это правда. = People say that it is true.</li><li>Здесь <b>строят</b> новый дом. = They are building a new house here.</li></ul>', [
        k.mc('Этот сайт ___ каждый день. (is updated)', ['обновляется', 'обновляет', 'обновлять'], 0),
        k.mc('Компьютеры ___ в школах. (are used)', ['используются', 'используется', 'использует'], 0),
        k.mc('___, что завтра будет снег. (people say)', ['Говорят', 'Говорит', 'Говорю'], 0),
        k.mc('Как ___ это слово? (is written)', ['пишется', 'писать', 'пишу'], 0),
        k.mc('Здесь ___ новый дом. (they are building)', ['строят', 'строит', 'строю'], 0),
        k.ord('Этот сайт обновляется каждый день')]],
      r: ['A day without the internet', 'В прошлую субботу у нас весь день не было интернета. Сначала я испугалась: как жить без телефона? Все мои данные, фотографии и музыка хранятся в сети. Даже домашнее задание отправляется учителю через сайт школы.\n\nУтром мне было скучно. Я не могла ни обновить приложения, ни загрузить фильм. Потом я нашла старую книгу, которую мне подарили два года назад, и прочитала сто страниц.\n\nПосле обеда мы с братом пошли гулять. Вечером вся семья играла в настольную игру.\n\nГоворят, что технологии делают жизнь легче. Это правда. Но теперь я знаю: один день без устройств — это тоже хорошо.\n\n(хранятся = are kept · ни…ни = neither…nor · страниц = pages · настольная игра = board game)', [
        k.mc('Why was the writer frightened at first?', ['All her data is online.', 'She lost her phone.', 'She had an exam.'], 0), k.tf('She read a hundred pages of a book.', true), k.mc('What did the family do in the evening?', ['played a board game', 'watched a film', 'went for a walk'], 0), k.tf('She thinks a day without devices is a bad thing.', false)]] },

    { id: 'u10', t: 'Новости. In the news', topic: 'Media',
      v: ['News and media', `
новости | noun | news | Я читаю новости утром. | | NO-vas-tee | I read the news in the morning.
журналист | noun | journalist | Журналист написал о нашем городе. | | zhoor-na-LEEST | A journalist wrote about our city.
статья | noun | article | Это интересная статья. | | stat-YA | This is an interesting article.
передача | noun | programme (TV, radio) | Я смотрю эту передачу каждую неделю. | | pee-ree-DA-cha | I watch this programme every week.
реклама | noun | advertising, advert | На сайте много рекламы. | | reek-LA-ma | There is a lot of advertising on the website.
источник | noun | source | Какой источник этой новости? | | ees-TOCH-neek | What is the source of this news?
сообщить | verb | to report, to inform | Газета сообщила о концерте. | | sa-ap-SHCHEET | The newspaper reported on the concert.
обсуждать | verb | to discuss | Мы обсуждаем новости. | | ap-soozh-DAT | We are discussing the news.
правда | noun | truth | Это правда? | | PRAV-da | Is this true?
слух | noun | rumour | Это только слух. | | slookh | This is only a rumour.`],
      g: ['He said that…, she asked if…', '<p><b>1. Statements: что.</b> The verb keeps the tense of the speaker’s own words.</p><ul><li>«Я приду завтра». → Он сказал, <b>что придёт</b> завтра. = He said that he would come tomorrow.</li><li>«Я устал». → Он сказал, <b>что устал</b>.</li></ul><p><b>2. Questions with a question word:</b> keep the word.</p><ul><li>«Где ты живёшь?» → Она спросила, <b>где</b> я живу.</li></ul><p><b>3. Yes-or-no questions: ли.</b> Put the key word first, then <b>ли</b>.</p><ul><li>«Ты придёшь?» → Она спросила, <b>приду ли</b> я. = She asked if I would come.</li><li>«Школы закрыты?» → Он спросил, <b>закрыты ли</b> школы.</li></ul><p><b>4. Requests: чтобы</b> + the past form (Unit 3).</p><ul><li>«Позвони мне!» → Он попросил, <b>чтобы я позвонил</b>.</li></ul>', [
        k.mc('Он сказал, ___ придёт завтра.', ['что', 'чтобы', 'ли'], 0),
        k.mc('Она спросила, приду ___ я.', ['ли', 'что', 'если'], 0),
        k.mc('Учитель попросил, ___ мы пришли рано.', ['чтобы', 'что', 'ли'], 0),
        k.mc('Она спросила, ___ я живу.', ['где', 'что', 'ли'], 0),
        k.mc('«Я устал». → Он сказал, что ___.', ['устал', 'устать', 'уставать'], 0),
        k.ord('Он сказал что придёт завтра')]],
      r: ['Is it true?', 'Вчера в городском чате появилось сообщение: «Завтра все школы будут закрыты из-за мороза». Через час его прочитали три тысячи человек. Дети радовались, а родители спрашивали, правда ли это.\n\nЖурналистка местной газеты Асель решила проверить новость. Она позвонила в управление образования и спросила, закрыты ли школы. Ей ответили, что занятия будут, потому что мороз не такой сильный.\n\nАсель написала статью: «Это слух. Школы работают». Потом она нашла источник: сообщение написал школьник, который не хотел писать контрольную.\n\nАсель говорит, что перед тем как обсуждать новости, нужно всегда проверять, кто их сообщил.\n\n(появилось = appeared · из-за = because of · проверить = to check · управление образования = education office · контрольная = test)', [
        k.mc('What did the message say?', ['Schools would be closed.', 'There would be a concert.', 'A new school would open.'], 0), k.mc('Who is Asel?', ['a journalist', 'a teacher', 'a pupil'], 0), k.tf('The schools really were closed the next day.', false), k.mc('Who wrote the message?', ['a school pupil', 'the education office', 'a parent'], 0)]] },

    { id: 'u11', t: 'Искусство. Arts and culture', topic: 'Culture',
      v: ['Theatre, books, pictures', `
искусство | noun | art | Я интересуюсь искусством. | | ees-KOOST-va | I am interested in art.
художник | noun | artist, painter | Это известный художник. | | khoo-DOZH-neek | This is a well-known artist.
картина | noun | painting, picture | На стене висит картина. | | kar-TEE-na | A painting hangs on the wall.
писатель | noun | writer | Абай — великий писатель. | | pee-SA-teel | Abai is a great writer.
произведение | noun | work (of art) | Это известное произведение. | | pra-eez-vee-DYE-nee-ye | This is a well-known work.
роман | noun | novel | Я читаю длинный роман. | | ra-MAN | I am reading a long novel.
режиссёр | noun | director (film, theatre) | Режиссёр снял новый фильм. | | ree-zhys-SYOR | The director made a new film.
актёр | noun | actor | Он талантливый актёр. | | ak-TYOR | He is a talented actor.
зал | noun | hall | В зале много людей. | | zal | There are many people in the hall.
аплодировать | verb | to applaud | Зрители долго аплодировали. | | a-pla-DEE-ra-vat | The audience applauded for a long time.`],
      g: ['Someone, anything, nobody, never', '<table><tr><th>Ending</th><th>Meaning</th><th>Examples</th></tr><tr><td><b>-то</b></td><td>a real one, but I do not know which</td><td><b>кто-то</b> (someone), <b>что-то</b> (something), <b>где-то</b> (somewhere)</td></tr><tr><td><b>-нибудь</b></td><td>any one; in questions, requests and the future</td><td><b>кто-нибудь</b> (anyone), <b>что-нибудь</b> (anything), <b>куда-нибудь</b> (anywhere)</td></tr><tr><td><b>ни-</b> … <b>не</b></td><td>none at all</td><td><b>никто не</b>, <b>ничего не</b>, <b>никогда не</b>, <b>нигде не</b></td></tr></table><ul><li><b>Кто-то</b> звонил тебе. = Someone called you. (I do not know who.)</li><li>Ты хочешь <b>что-нибудь</b> съесть? = Do you want to eat anything?</li><li><b>Никто не</b> пришёл. = Nobody came.</li><li>Я <b>ничего не</b> знаю. = I know nothing.</li></ul><p>Russian needs <b>не</b> with every ни- word. Two negatives are correct: Я <b>никогда не</b> был там.</p>', [
        k.mc('___ звонил тебе. Я не знаю, кто.', ['Кто-то', 'Кто-нибудь', 'Никто'], 0),
        k.mc('Ты хочешь ___ съесть?', ['что-нибудь', 'ничего', 'никто'], 0),
        k.mc('Я ___ не знаю.', ['ничего', 'что-то', 'что-нибудь'], 0),
        k.mc('Никто ___ пришёл.', ['не', 'ни', 'нет'], 0),
        k.mc('“Nobody knows.” = …', ['Никто не знает.', 'Никто знает.', 'Кто-то не знает.'], 0),
        k.ord('Я никогда не был в театре')]],
      r: ['My first evening at the theatre', 'Я никогда не любил театр. Мне казалось, что это скучно. Но в прошлом месяце кто-то подарил моей сестре два билета, и она пригласила меня.\n\nСпектакль был по роману известного писателя. Сначала я ничего не понимал: актёры говорили быстро. Но потом что-то изменилось. Главный актёр играл так хорошо, что я забыл обо всём. В зале никто не разговаривал.\n\nВ конце зрители аплодировали десять минут. Режиссёр вышел на сцену и поблагодарил всех.\n\nПосле спектакля мы пошли на выставку молодого художника в том же здании. Одна картина мне очень понравилась.\n\nТеперь я думаю, что искусство нужно каждому. Хотите куда-нибудь пойти в выходные? Идите в театр!\n\n(по роману = based on a novel · сцена = stage · поблагодарил = thanked · в том же = in the same)', [
        k.mc('Who invited the writer to the theatre?', ['his sister', 'a friend', 'the director'], 0), k.tf('He understood everything from the beginning.', false), k.mc('How long did the audience applaud?', ['ten minutes', 'one minute', 'an hour'], 0), k.mc('Where did they go after the play?', ['to an exhibition', 'to a café', 'home'], 0)]] },

    { id: 'u12', t: 'Спорт. Sport', topic: 'Sport',
      v: ['Winning and losing', `
соревнование | noun | competition | Завтра у нас соревнование. | | sa-reev-na-VA-nee-ye | We have a competition tomorrow.
тренер | noun | coach | Наш тренер очень строгий. | | TRYE-ner | Our coach is very strict.
спортсмен | noun | sportsman, athlete | Он известный спортсмен. | | sparts-MYEN | He is a well-known athlete.
победа | noun | victory | Это наша первая победа. | | pa-BYE-da | This is our first victory.
поражение | noun | defeat | Это было трудное поражение. | | pa-ra-ZHE-nee-ye | It was a hard defeat.
выиграть | verb | to win | Мы выиграли матч. | | VY-ee-grat | We won the match.
проиграть | verb | to lose | Они проиграли в финале. | | pra-ee-GRAT | They lost in the final.
матч | noun | match | Матч начинается в шесть. | | match | The match begins at six.
болельщик | noun | fan, supporter | На стадионе много болельщиков. | | ba-LYEL-shcheek | There are many fans at the stadium.
чемпионат | noun | championship | Это чемпионат города. | | chem-pee-a-NAT | This is the city championship.`],
      g: ['Going now, or going often? идти and ходить', '<p>Russian has <b>two</b> verbs for each kind of movement.</p><table><tr><th>One direction, right now</th><th>Often, there and back, or in general</th><th>Meaning</th></tr><tr><td>идти: я <b>иду</b></td><td>ходить: я <b>хожу</b></td><td>on foot</td></tr><tr><td>ехать: я <b>еду</b></td><td>ездить: я <b>езжу</b></td><td>by transport</td></tr><tr><td>бежать: я <b>бегу</b></td><td>бегать: я <b>бегаю</b></td><td>run</td></tr><tr><td>плыть: я <b>плыву</b></td><td>плавать: я <b>плаваю</b></td><td>swim</td></tr></table><ul><li>Сейчас я <b>иду</b> на тренировку. = I am going to training now.</li><li>Каждую среду я <b>хожу</b> в бассейн. = Every Wednesday I go to the pool.</li><li>Он хорошо <b>плавает</b>. = He swims well. (a skill)</li><li>Вчера я <b>ходил</b> в театр. = Yesterday I went to the theatre (and came back).</li></ul>', [
        k.mc('Сейчас я ___ на тренировку.', ['иду', 'хожу', 'ходил'], 0),
        k.mc('Каждую среду я ___ в бассейн.', ['хожу', 'иду', 'шёл'], 0),
        k.mc('Он хорошо ___. (a skill)', ['плавает', 'плывёт', 'плыть'], 0),
        k.mc('Смотри, он ___ к нам!', ['бежит', 'бегает', 'бегал'], 0),
        k.mc('Вчера я ___ в театр. (went and came back)', ['ходил', 'иду', 'хожу'], 0),
        k.ord('Каждую среду я хожу в бассейн')]],
      r: ['Second place', 'Наша школьная команда по футболу никогда не была сильной. В прошлом году мы проиграли почти все матчи. Болельщиков на стадионе было мало — только наши родители.\n\nОсенью к нам пришёл новый тренер, бывший спортсмен. Он сказал: «Победа начинается с дисциплины». Теперь мы ходим на тренировки четыре раза в неделю и каждое утро бегаем в парке.\n\nПервое соревнование было в марте. Мы очень волновались. В первом матче было поражение — ноль : два. Но потом мы выиграли три матча подряд!\n\nВ финале городского чемпионата мы играли с лучшей школой города. Мы проиграли, но второе место — это тоже победа. В следующем году мы обязательно выиграем.\n\n(бывший = former · дисциплина = discipline · подряд = in a row · место = place)', [
        k.mc('How did the team play last year?', ['They lost almost every match.', 'They won the championship.', 'They did not play.'], 0), k.mc('Who is the new coach?', ['a former athlete', 'a parent', 'a maths teacher'], 0), k.mc('How often do they train now?', ['four times a week', 'once a week', 'every evening'], 0), k.tf('They won the final.', false)]] },

    { id: 'u13', t: 'Деньги. Money matters', topic: 'Money',
      v: ['Earning, spending, saving', `
расходы | noun | expenses | Мои расходы выросли. | | ras-KHO-dy | My expenses have grown.
доходы | noun | income | Его доходы небольшие. | | da-KHO-dy | His income is small.
тратить | verb | to spend | Я трачу много денег на книги. | | TRA-teet | I spend a lot of money on books.
экономить | verb | to save, to economise | Мы экономим на такси. | | e-ka-NO-meet | We save on taxis.
кредит | noun | loan, credit | Он взял кредит в банке. | | kree-DEET | He took a loan from the bank.
долг | noun | debt | У меня нет долгов. | | dolk | I have no debts.
налог | noun | tax | Все платят налоги. | | na-LOK | Everyone pays taxes.
стоимость | noun | cost | Какая стоимость билета? | | STO-ee-mast | What is the cost of the ticket?
выгодный | adjective | good value, profitable | Это выгодное предложение. | | VY-gad-ny | This is a good offer.
копить | verb | to save up | Я коплю на машину. | | ka-PEET | I am saving up for a car.`],
      g: ['How much cheaper? Comparing with numbers', '<p>You know <b>дороже, чем…</b> from A2. Now add numbers.</p><table><tr><th>Pattern</th><th>Example</th><th>Meaning</th></tr><tr><td><b>на</b> + amount</td><td>Этот телефон дороже <b>на</b> десять тысяч тенге.</td><td>ten thousand tenge more expensive</td></tr><tr><td><b>в</b> + number + <b>раза / раз</b></td><td>Эта квартира <b>в два раза</b> больше.</td><td>twice as big</td></tr><tr><td><b>чем</b> …, <b>тем</b> …</td><td><b>Чем</b> больше я читаю, <b>тем</b> больше знаю.</td><td>the more I read, the more I know</td></tr></table><p>More comparing words: дешёвый → <b>дешевле</b>, дорогой → <b>дороже</b>, много → <b>больше</b>, мало → <b>меньше</b>, лёгкий → <b>легче</b>.</p><p><b>в два, три, четыре раза</b> but <b>в пять раз</b>.</p>', [
        k.mc('Этот ноутбук ___, чем тот. (cheaper)', ['дешевле', 'дешёвый', 'дёшево'], 0),
        k.mc('Он дороже ___ десять тысяч тенге.', ['на', 'в', 'за'], 0),
        k.mc('Эта квартира в два ___ больше.', ['раза', 'раз', 'разы'], 0),
        k.mc('Чем больше я работаю, ___ больше зарабатываю.', ['тем', 'чем', 'так'], 0),
        k.mc('“twice as expensive” = …', ['в два раза дороже', 'на два дороже', 'два раза дорогой'], 0),
        k.ord('Чем больше я читаю тем больше знаю')]],
      r: ['Saving for a laptop', 'Данияр — студент. Он получает стипендию, а по выходным работает в кафе. Его доходы небольшие, поэтому он следит за расходами.\n\nВ сентябре Данияр решил купить ноутбук. Новый стоил четыреста тысяч тенге — в два раза дороже, чем он мог заплатить. Брать кредит он не хотел: «Долг — это стресс».\n\nОн начал копить. Данияр записывал, на что тратит деньги, и понял, что больше всего тратит на еду в кафе. Он стал готовить дома и экономил двадцать тысяч в месяц.\n\nЧерез полгода он нашёл выгодное предложение: такой же ноутбук на сто тысяч дешевле. Теперь у него есть ноутбук и нет долгов.\n\n(записывал = wrote down · больше всего = most of all · такой же = the same)', [
        k.mc('Where does Daniyar work at weekends?', ['in a café', 'in a bank', 'in a shop'], 0), k.mc('How much did a new laptop cost?', ['400,000 tenge', '100,000 tenge', '20,000 tenge'], 0), k.tf('He took a loan to buy it.', false), k.mc('What did he spend the most money on?', ['food in cafés', 'books', 'taxis'], 0)]] },

    { id: 'u14', t: 'Обычаи. Customs and traditions', topic: 'Traditions',
      v: ['Family and customs', `
обычай | noun | custom | Это старый обычай. | | a-BY-chay | This is an old custom.
поколение | noun | generation | В доме живут три поколения. | | pa-ka-LYE-nee-ye | Three generations live in the house.
предки | noun | ancestors | Мои предки жили в степи. | | PRYET-kee | My ancestors lived in the steppe.
уважать | verb | to respect | Дети уважают родителей. | | oo-va-ZHAT | Children respect their parents.
гостеприимство | noun | hospitality | Спасибо за гостеприимство! | | gas-tee-pree-EEMST-va | Thank you for your hospitality!
обряд | noun | ceremony, rite | Это свадебный обряд. | | ab-RYAT | This is a wedding ceremony.
национальный | adjective | national | Это национальный костюм. | | na-tsee-a-NAL-ny | This is national dress.
старший | adjective | older, elder | Это мой старший брат. | | STAR-shee | This is my older brother.
младший | adjective | younger | Моя младшая сестра учится в школе. | | MLAT-shee | My younger sister is at school.
угощать | verb | to treat (to food) | Хозяйка угощает гостей чаем. | | oo-ga-SHCHAT | The hostess treats the guests to tea.`],
      g: ['To friends, to guests: the “to” ending for many', '<p>You know <b>маме, другу</b> (A2). For <b>many</b> people or things the ending is <b>-ам</b> or <b>-ям</b>.</p><table><tr><th>One</th><th>Many</th><th>Example</th></tr><tr><td>гостю</td><td>гост<b>ям</b></td><td>Хозяин помогает гост<b>ям</b>.</td></tr><tr><td>другу</td><td>друзь<b>ям</b></td><td>Я пишу друзь<b>ям</b>.</td></tr><tr><td>ребёнку</td><td>дет<b>ям</b></td><td>Бабушка даёт подарки дет<b>ям</b>.</td></tr><tr><td>студенту</td><td>студент<b>ам</b></td><td>Преподаватель объясняет студент<b>ам</b>.</td></tr></table><p>Two small words use this ending:</p><ul><li><b>к</b> = to (a person), towards: Мы идём <b>к друзьям</b>. Я иду <b>к врачу</b>.</li><li><b>по</b> = according to, along, by: <b>по традиции</b>, <b>по улице</b>, <b>по телефону</b>.</li></ul><p>Words in <b>-ия</b> take <b>-ии</b>: традиция → по традиц<b>ии</b>.</p>', [
        k.mc('Мы идём к друзь___.', ['ям', 'ей', 'ями'], 0),
        k.mc('Бабушка даёт подарки дет___.', ['ям', 'ей', 'и'], 0),
        k.mc('Преподаватель объясняет студент___.', ['ам', 'ов', 'ах'], 0),
        k.mc('По традици___ гостям дают чай.', ['и', 'ю', 'ей'], 0),
        k.mc('Завтра я иду ___ врачу.', ['к', 'по', 'в'], 0),
        k.ord('Мы идём в гости к друзьям')]],
      r: ['A guest in a Kazakh home', 'Когда я приехал в Казахстан, коллега пригласил меня в гости к своим родителям. Я немного волновался, потому что не знал местных обычаев.\n\nВ доме было три поколения: дедушка, родители и дети. По традиции самое почётное место за столом дают старшим и гостям. Меня посадили рядом с дедушкой.\n\nХозяйка всё время угощала меня: «Ешьте, ешьте!» На столе были бешбармак, баурсаки, фрукты. Я понял, что гостеприимство здесь — национальная черта.\n\nВ конце дедушка сказал добрые слова всем гостям и младшим. Мне объяснили, что это старый обряд — бата.\n\nКазахи уважают старших и помнят своих предков. Я думаю, это прекрасно.\n\n(местных = local · почётное = of honour · посадили = seated · черта = trait · прекрасно = wonderful)', [
        k.mc('Who invited the writer?', ['a colleague', 'a neighbour', 'a student'], 0), k.mc('How many generations were in the house?', ['three', 'two', 'four'], 0), k.mc('Where did the writer sit?', ['next to the grandfather', 'next to the children', 'by the door'], 0), k.tf('Bata is a new custom.', false)]] },

    { id: 'u15', t: 'Жалобы. Problems and complaints', topic: 'Services',
      v: ['When something goes wrong', `
жалоба | noun | complaint | У меня есть жалоба. | | ZHA-la-ba | I have a complaint.
жаловаться | verb | to complain | Он жалуется на шум. | | ZHA-la-vat-sa | He complains about the noise.
проблема | noun | problem | В чём проблема? | | prab-LYE-ma | What is the problem?
ошибка | noun | mistake | Это моя ошибка. | | a-SHYP-ka | This is my mistake.
качество | noun | quality | Качество очень хорошее. | | KA-cheest-va | The quality is very good.
обслуживание | noun | service (to customers) | В этом кафе хорошее обслуживание. | | ap-SLOO-zhy-va-nee-ye | The service in this café is good.
возврат | noun | refund, return | Я хочу сделать возврат. | | vaz-VRAT | I want a refund.
извинение | noun | apology | Примите наши извинения. | | eez-vee-NYE-nee-ye | Please accept our apologies.
исправить | verb | to put right, to correct | Мы исправим ошибку. | | ees-PRA-veet | We will put the mistake right.
виноват | adjective | to blame, guilty | Извините, я виноват. | | vee-na-VAT | Sorry, I am to blame.`],
      g: ['Closed, open, broken, ready: short forms', '<p>To say the <b>state</b> something is in, Russian uses a short form. It agrees with the noun.</p><table><tr><th>он</th><th>она</th><th>оно</th><th>они</th><th>Meaning</th></tr><tr><td>закрыт</td><td>закрыт<b>а</b></td><td>закрыт<b>о</b></td><td>закрыт<b>ы</b></td><td>closed</td></tr><tr><td>открыт</td><td>открыт<b>а</b></td><td>открыт<b>о</b></td><td>открыт<b>ы</b></td><td>open</td></tr><tr><td>сломан</td><td>сломан<b>а</b></td><td>сломан<b>о</b></td><td>сломан<b>ы</b></td><td>broken</td></tr><tr><td>готов</td><td>готов<b>а</b></td><td>готов<b>о</b></td><td>готов<b>ы</b></td><td>ready</td></tr><tr><td>виноват</td><td>виноват<b>а</b></td><td>—</td><td>виноват<b>ы</b></td><td>to blame</td></tr></table><ul><li>Магазин <b>закрыт</b>. Дверь <b>открыта</b>. Окно <b>закрыто</b>.</li><li>Телефон <b>сломан</b>. Мы <b>готовы</b>.</li><li>Past and future: Магазин <b>был</b> закрыт. Заказ <b>будет</b> готов завтра.</li></ul>', [
        k.mc('Магазин ___.', ['закрыт', 'закрыта', 'закрыты'], 0),
        k.mc('Дверь ___.', ['открыта', 'открыт', 'открыты'], 0),
        k.mc('Окно ___.', ['закрыто', 'закрыт', 'закрыта'], 0),
        k.mc('Мы ___.', ['готовы', 'готов', 'готова'], 0),
        k.mc('Заказ ___ готов завтра.', ['будет', 'был', 'есть'], 0),
        k.ord('Извините мой телефон сломан')]],
      r: ['The broken phone', 'Месяц назад Марина купила в магазине новый телефон. Через неделю экран перестал работать. Марина пришла в магазин с жалобой.\n\n— У меня проблема. Телефон сломан, а ему только неделя.\n\nПродавец посмотрел и сказал, что, наверное, она сама виновата. Марина не согласилась: «Я ничего не делала. Это плохое качество».\n\nОна попросила позвать руководителя. Руководитель извинился: «Простите за неудобство. Это наша ошибка. Мы можем исправить телефон за три дня или сделать возврат денег».\n\nМарина выбрала возврат. Через час деньги были на её карте.\n\nВечером она написала отзыв: «Телефон плохой, но обслуживание хорошее. Спасибо за извинение».\n\n(перестал = stopped · позвать = to call · простите = forgive us · неудобство = inconvenience · отзыв = review)', [
        k.mc('What stopped working?', ['the screen', 'the battery', 'the charger'], 0), k.tf('The shop assistant said the shop was to blame.', false), k.mc('What did the manager offer?', ['a repair in three days or a refund', 'a new phone', 'nothing'], 0), k.mc('What did Marina choose?', ['a refund', 'a repair', 'another phone'], 0)]] },

    { id: 'u16', t: 'Общение. Speaking and being understood', topic: 'Communication',
      v: ['Languages and talking', `
общение | noun | communication | Общение помогает учить язык. | | ap-SHCHE-nee-ye | Communication helps you learn a language.
произношение | noun | pronunciation | У неё хорошее произношение. | | pra-eez-na-SHE-nee-ye | She has good pronunciation.
акцент | noun | accent | Он говорит с акцентом. | | ak-TSENT | He speaks with an accent.
перевести | verb | to translate | Переведите это слово, пожалуйста. | | pee-ree-vees-TEE | Translate this word, please.
выражение | noun | expression, phrase | Это полезное выражение. | | vy-ra-ZHE-nee-ye | This is a useful expression.
значение | noun | meaning | Какое значение у этого слова? | | zna-CHE-nee-ye | What is the meaning of this word?
разговор | noun | conversation | Это был интересный разговор. | | raz-ga-VOR | It was an interesting conversation.
собеседник | noun | the person you are talking to | Мой собеседник говорит быстро. | | sa-bee-SYED-neek | The person I am talking to speaks fast.
свободно | adverb | fluently, freely | Она свободно говорит по-русски. | | sva-BOD-na | She speaks Russian fluently.
носитель языка | noun | native speaker | Наш учитель — носитель языка. | | na-SEE-teel ya-zy-KA | Our teacher is a native speaker.`],
      g: ['Although, in spite of, however, since', '<table><tr><th>Word</th><th>Meaning</th><th>Example</th></tr><tr><td><b>хотя</b></td><td>although</td><td><b>Хотя</b> я устал, я пошёл на урок.</td></tr><tr><td><b>несмотря на</b> + noun</td><td>in spite of</td><td><b>Несмотря на</b> дождь, мы гуляли.</td></tr><tr><td><b>однако</b></td><td>however</td><td>Он знал много слов, <b>однако</b> боялся говорить.</td></tr><tr><td><b>так как</b></td><td>since, because</td><td>Я опоздал, <b>так как</b> была пробка.</td></tr></table><ul><li>After <b>несмотря на</b>, a word in <b>-а</b> changes to <b>-у</b>: несмотря на погод<b>у</b>, на ошибк<b>у</b>. Other words do not change: на дождь, на акцент.</li><li><b>так как</b> means the same as <b>потому что</b>, but it is a little more formal.</li><li>Put a comma before <b>хотя, однако, так как</b> when they join two parts.</li></ul>', [
        k.mc('___ я устал, я пошёл на урок.', ['Хотя', 'Поэтому', 'Так как'], 0),
        k.mc('Несмотря ___ дождь, мы гуляли.', ['на', 'в', 'о'], 0),
        k.mc('Я опоздал, ___ была пробка.', ['так как', 'хотя', 'однако'], 0),
        k.mc('Он говорит с акцентом, ___ все его понимают.', ['однако', 'так как', 'если'], 0),
        k.mc('Несмотря на погод___, мы поехали.', ['у', 'а', 'е'], 0),
        k.ord('Хотя я устал я пошёл на урок')]],
      r: ['Mistakes are my best teachers', 'Том учит русский язык два года. Сначала он боялся говорить, так как делал много ошибок. Он знал много слов, однако в разговоре всё забывал.\n\nЕго преподаватель сказал: «Произношение и грамматика придут. Главное — общение». Том начал разговаривать с соседями, продавцами, таксистами. Несмотря на акцент, все его понимали.\n\nОднажды он хотел перевести английское выражение и сказал что-то смешное. Его собеседник долго смеялся, а потом объяснил значение слова. Том запомнил это слово навсегда.\n\nСейчас Том говорит почти свободно. Хотя он не носитель языка, он может шутить по-русски. Он говорит: «Ошибки — мои лучшие учителя».\n\n(таксист = taxi driver · смешное = funny · навсегда = for ever · шутить = to joke)', [
        k.mc('Why was Tom afraid to speak at first?', ['He made many mistakes.', 'He knew no words.', 'He had no teacher.'], 0), k.mc('What did his teacher say was the main thing?', ['communication', 'grammar', 'pronunciation'], 0), k.tf('People could not understand Tom because of his accent.', false), k.mc('How does Tom speak now?', ['almost fluently', 'very slowly', 'only in English'], 0)]] },

    { id: 'u17', t: 'Правила и законы. Rules and laws', topic: 'Law',
      v: ['What you may and must do', `
закон | noun | law | Это новый закон. | | za-KON | This is a new law.
правило | noun | rule | В школе есть правила. | | PRA-vee-la | There are rules at school.
право | noun | right | У каждого есть право на отдых. | | PRA-va | Everyone has the right to rest.
штраф | noun | fine | Он заплатил штраф. | | shtraf | He paid a fine.
нарушить | verb | to break (a rule) | Водитель нарушил правила. | | na-ROO-sheet | The driver broke the rules.
разрешение | noun | permission | Нужно разрешение директора. | | raz-ree-SHE-nee-ye | You need the director’s permission.
запрещено | word | forbidden | Здесь запрещено курить. | | za-pree-shchee-NO | Smoking is forbidden here.
разрешено | word | allowed | Здесь разрешено фотографировать. | | raz-ree-shee-NO | Taking photos is allowed here.
обязан | adjective | obliged, must | Водитель обязан остановиться. | | a-BYA-zan | The driver must stop.
полиция | noun | police | Полиция приехала быстро. | | pa-LEE-tsee-ya | The police came quickly.`],
      g: ['Allowed, forbidden, obliged', '<table><tr><th>Word</th><th>Meaning</th><th>Example</th></tr><tr><td><b>разрешено</b> + verb</td><td>it is allowed</td><td>Здесь <b>разрешено</b> фотографировать.</td></tr><tr><td><b>запрещено</b> + verb</td><td>it is forbidden</td><td>Здесь <b>запрещено</b> курить.</td></tr><tr><td><b>обязан, обязана, обязаны</b> + verb</td><td>is obliged to, must</td><td>Водитель <b>обязан</b> остановиться.</td></tr></table><p><b>нельзя</b> has two meanings. The verb pair (A2, Unit 7) shows which:</p><ul><li><b>нельзя</b> + the action verb = <b>not allowed</b>: Сюда нельзя <b>входить</b>: идёт экзамен.</li><li><b>нельзя</b> + the result verb = <b>impossible</b>: Сюда нельзя <b>войти</b>: дверь закрыта.</li></ul><p><b>обязан</b> agrees with the person, like the short forms in Unit 15: он обязан, она обязан<b>а</b>, мы обязан<b>ы</b>.</p>', [
        k.mc('Здесь ___ курить. (forbidden)', ['запрещено', 'разрешено', 'обязан'], 0),
        k.mc('Водитель ___ остановиться.', ['обязан', 'запрещено', 'нельзя'], 0),
        k.mc('Сюда нельзя ___: идёт экзамен. (not allowed)', ['входить', 'войти', 'вошёл'], 0),
        k.mc('Дверь закрыта, сюда нельзя ___. (impossible)', ['войти', 'входить', 'входит'], 0),
        k.mc('Она ___ платить налоги.', ['обязана', 'обязан', 'обязаны'], 0),
        k.ord('Здесь запрещено ездить на самокате')]],
      r: ['New rules for scooters', 'В нашем городе стало много электросамокатов. Это удобно, но опасно: в прошлом году было много аварий. Поэтому весной появились новые правила.\n\nТеперь ездить на самокате разрешено только с шестнадцати лет. На тротуаре скорость должна быть не больше десяти километров в час. Ездить вдвоём запрещено. Вечером водитель обязан включать свет.\n\nПятнадцатилетний Алихан не знал о новом законе. В субботу он ехал с другом на одном самокате, и их остановила полиция. Полицейский объяснил правила и сказал, что за нарушение есть штраф — двадцать тысяч тенге. В первый раз Алихан получил только предупреждение.\n\n«У меня есть права, но есть и обязанности», — понял он. Теперь он ходит пешком и ждёт дня рождения.\n\n(электросамокат = electric scooter · опасно = dangerous · авария = accident · скорость = speed · вдвоём = two together · предупреждение = warning)', [
        k.mc('From what age may you ride a scooter?', ['sixteen', 'fifteen', 'eighteen'], 0), k.mc('What is the top speed on the pavement?', ['10 kilometres an hour', '20 kilometres an hour', '5 kilometres an hour'], 0), k.mc('Why did the police stop Alikhan?', ['Two people were on one scooter.', 'He had no light.', 'He was riding too fast.'], 0), k.tf('Alikhan paid a fine of 20,000 tenge.', false)]] },

    { id: 'u18', t: 'Наука. Science', topic: 'Science',
      v: ['Research and discovery', `
наука | noun | science | Она любит науку. | | na-OO-ka | She loves science.
учёный | noun | scientist | Он известный учёный. | | oo-CHO-ny | He is a well-known scientist.
открытие | noun | discovery | Это важное открытие. | | at-KRY-tee-ye | This is an important discovery.
исследование | noun | research, study | Исследование шло два года. | | ees-SLYE-da-va-nee-ye | The research took two years.
эксперимент | noun | experiment | Мы провели эксперимент. | | eks-pee-ree-MYENT | We carried out an experiment.
изобретение | noun | invention | Телефон — великое изобретение. | | ee-za-bree-TYE-nee-ye | The telephone is a great invention.
изобрести | verb | to invent | Кто изобрёл радио? | | ee-za-brees-TEE | Who invented the radio?
доказать | verb | to prove | Учёные доказали эту теорию. | | da-ka-ZAT | Scientists proved this theory.
лаборатория | noun | laboratory | Она работает в лаборатории. | | la-ba-ra-TO-ree-ya | She works in a laboratory.
результат | noun | result | Результат будет завтра. | | ree-zool-TAT | The result will come tomorrow.`],
      g: ['Was built, was discovered: the passive in the past', '<p>In Unit 15 you met short forms for a state: <b>закрыт, сломан</b>. With <b>был, была, было, были</b> the same kind of word tells what <b>was done</b>.</p><table><tr><th>он</th><th>она</th><th>оно</th><th>они</th></tr><tr><td><b>был</b> построен</td><td><b>была</b> построен<b>а</b></td><td><b>было</b> построен<b>о</b></td><td><b>были</b> построен<b>ы</b></td></tr></table><ul><li>Этот дом <b>был построен</b> в 1950 году. = This house was built in 1950.</li><li>Школа <b>была открыта</b> в сентябре. = The school was opened in September.</li><li>Письмо <b>было написано</b> вчера. = The letter was written yesterday.</li><li>Результаты <b>были получены</b> через месяц. = The results were received a month later.</li></ul><p><b>By whom?</b> Use the ending from “work as” (врач<b>ом</b>, медсестр<b>ой</b>): Ошибка была найдена <b>учеником</b>. = The mistake was found by a pupil.</p>', [
        k.mc('Этот дом ___ построен в 1950 году.', ['был', 'была', 'было'], 0),
        k.mc('Школа ___ открыта в сентябре.', ['была', 'был', 'были'], 0),
        k.mc('Письмо ___ написано вчера.', ['было', 'был', 'была'], 0),
        k.mc('Результаты ___ получены через месяц.', ['были', 'было', 'была'], 0),
        k.mc('Ошибка была найдена ___.', ['учеником', 'ученик', 'ученику'], 0),
        k.ord('Этот дом был построен давно')]],
      r: ['Do plants like music?', 'Каждую весну в нашей школе проходит научная выставка. В этом году девятиклассница Жанна решила проверить одну идею: правда ли, что растения растут быстрее под музыку?\n\nЭксперимент был простым. Двадцать одинаковых растений были посажены в один день. Десять стояли в комнате, где три часа в день играла классическая музыка. Другие десять — в тихой комнате. Свет, вода и температура были одинаковыми.\n\nЧерез шесть недель результаты были получены. Разницы почти не было: «музыкальные» растения были выше только на два миллиметра.\n\nЖанна расстроилась: открытия не получилось. Но учитель сказал: «Ты ничего не доказала, но ты честно показала это. В науке такой результат тоже важен. Так работают настоящие учёные».\n\nЖанна получила второе место.\n\n(проходит = takes place · одинаковый = the same · посажены = planted · разница = difference · настоящий = real)', [
        k.mc('What did Zhanna want to test?', ['whether plants grow faster with music', 'whether plants need water', 'whether music helps pupils'], 0), k.mc('How many plants did she use?', ['twenty', 'ten', 'six'], 0), k.tf('There was a big difference between the two groups.', false), k.mc('What place did Zhanna get?', ['second', 'first', 'third'], 0)]] },

    { id: 'u19', t: 'История. History', topic: 'History',
      v: ['The past of a country', `
век | noun | century | Мы живём в двадцать первом веке. | | vyek | We live in the twenty-first century.
война | noun | war | Война закончилась в 1945 году. | | vay-NA | The war ended in 1945.
независимость | noun | independence | Страна получила независимость. | | nee-za-VEE-see-mast | The country gained independence.
государство | noun | state | Казахстан — молодое государство. | | ga-soo-DARST-va | Kazakhstan is a young state.
народ | noun | people, nation | Народ помнит свою историю. | | na-ROT | The people remember their history.
основать | verb | to found | Город основали в 1879 году. | | as-na-VAT | The city was founded in 1879.
кочевник | noun | nomad | В степи жили кочевники. | | ka-CHEV-neek | Nomads lived in the steppe.
степь | noun | steppe | Вокруг города степь. | | styep | There is steppe around the city.
наследие | noun | heritage | Это наше культурное наследие. | | nas-LYE-dee-ye | This is our cultural heritage.
историк | noun | historian | Историки изучают прошлое. | | ees-TO-reek | Historians study the past.`],
      g: ['In 1991, in the 15th century, a hundred years ago', '<table><tr><th>To say…</th><th>Use…</th><th>Example</th></tr><tr><td>in a year</td><td><b>в</b> … <b>году</b></td><td><b>в</b> 1991 <b>году</b> (в тысяча девятьсот девяносто первом году)</td></tr><tr><td>in a century</td><td><b>в</b> … <b>веке</b></td><td><b>в</b> пятнадцатом <b>веке</b></td></tr><tr><td>ago</td><td>… <b>назад</b></td><td>сто лет <b>назад</b></td></tr><tr><td>since, from</td><td><b>с</b> … <b>года</b></td><td><b>с</b> 1997 <b>года</b></td></tr><tr><td>before, after</td><td><b>до</b>, <b>после</b> + the “of” ending</td><td><b>до</b> войн<b>ы</b>, <b>после</b> войн<b>ы</b></td></tr></table><ul><li>Only the <b>last</b> word of the year changes: в тысяча девятьсот девяносто <b>первом</b> году.</li><li>A full date: шестнадцат<b>ого</b> декабр<b>я</b> 1991 год<b>а</b>.</li><li><b>назад</b> comes after the time: два года назад, сто лет назад.</li></ul>', [
        k.mc('Казахстан стал независимым ___ 1991 году.', ['в', 'на', 'с'], 0),
        k.mc('Это было в пятнадцатом ___.', ['веке', 'век', 'века'], 0),
        k.mc('Сто лет ___ здесь была степь.', ['назад', 'после', 'до'], 0),
        k.mc('После войн___ люди вернулись домой.', ['ы', 'а', 'у'], 0),
        k.mc('Я живу здесь с 2020 ___.', ['года', 'году', 'год'], 0),
        k.ord('Это было сто лет назад')]],
      r: ['The Great Steppe', 'История Казахстана — это история Великой степи. Тысячи лет здесь жили кочевники. Они не строили больших городов, но создали богатую культуру: музыку, поэзию, традиции гостеприимства.\n\nВ пятнадцатом веке, в 1465 году, ханы Керей и Жанибек основали Казахское ханство. Историки считают это событие началом казахского государства.\n\nВ двадцатом веке страна была частью Советского Союза. Это было трудное время: голод, война, но также новые школы, заводы и города.\n\nШестнадцатого декабря 1991 года Казахстан получил независимость. В 1997 году столица переехала из Алматы на север, в город, который сейчас называется Астана.\n\nСегодня народ Казахстана бережёт наследие предков и строит современную страну.\n\n(Великая степь = the Great Steppe · поэзия = poetry · ханство = khanate · часть = part · голод = famine · бережёт = looks after)', [
        k.mc('Who lived in the steppe for thousands of years?', ['nomads', 'farmers', 'sailors'], 0), k.mc('When was the Kazakh Khanate founded?', ['in 1465', 'in 1991', 'in 1997'], 0), k.mc('When did Kazakhstan gain independence?', ['on 16 December 1991', 'on 1 January 1997', 'in 1945'], 0), k.tf('In 1997 the capital moved to Almaty.', false)]] },

    { id: 'u20', t: 'К цели. Reaching your goal', topic: 'Ambitions',
      v: ['Trying and succeeding', `
стремиться | verb | to strive | Она стремится к знаниям. | | stree-MEET-sa | She strives for knowledge.
добиться | verb | to achieve, to get | Он добился успеха. | | da-BEET-sa | He achieved success.
усилие | noun | effort | Это требует усилий. | | oo-SEE-lee-ye | This takes effort.
препятствие | noun | obstacle | Это не препятствие. | | pree-PYATST-vee-ye | This is not an obstacle.
сдаваться | verb | to give up | Никогда не сдавайся! | | zda-VAT-sa | Never give up!
уверенность | noun | confidence | Ему нужна уверенность. | | oo-VYE-reen-nast | He needs confidence.
талант | noun | talent | У неё большой талант. | | ta-LANT | She has great talent.
упорство | noun | persistence | Упорство важнее таланта. | | oo-PORST-va | Persistence is more important than talent.
удаться | verb | to succeed, to work out | Мне удалось найти работу. | | oo-DAT-sa | I managed to find a job.
достижение | noun | achievement | Это большое достижение. | | das-tee-ZHE-nee-ye | This is a great achievement.`],
      g: ['I managed to, I was able to', '<table><tr><th>Pattern</th><th>Meaning</th><th>Example</th></tr><tr><td><b>мне удалось</b> + verb</td><td>I managed to (it worked out)</td><td><b>Мне удалось</b> сдать экзамен.</td></tr><tr><td><b>я смог, смогла</b> + verb</td><td>I was able to</td><td>Она не <b>смогла</b> прийти.</td></tr><tr><td><b>у меня получилось</b></td><td>it worked for me</td><td>У меня не <b>получилось</b>.</td></tr><tr><td><b>добиться</b> + the “of” ending</td><td>to achieve</td><td>Он <b>добился</b> успех<b>а</b>.</td></tr></table><ul><li>With <b>удалось</b> the person is in the “to” form: <b>мне, тебе, ему, ей, нам, вам, им</b>. The word <b>удалось</b> never changes.</li><li><b>смочь</b> changes with the person: смог, смогл<b>а</b>, смогл<b>и</b>.</li></ul>', [
        k.mc('Мне ___ сдать экзамен.', ['удалось', 'удался', 'удалась'], 0),
        k.mc('Она не ___ прийти.', ['смогла', 'смог', 'смогли'], 0),
        k.mc('___ удалось найти работу. (he)', ['Ему', 'Он', 'Его'], 0),
        k.mc('У меня не ___.', ['получилось', 'получился', 'получилась'], 0),
        k.mc('Он добился успех___.', ['а', 'у', 'ом'], 0),
        k.ord('Мне удалось сдать экзамен')]],
      r: ['Two points short', 'Аружан с детства мечтала стать врачом. После школы она сдавала экзамены в медицинский университет, но ей не хватило двух баллов. Поступить не удалось.\n\nМногие на её месте сдались бы. Родители предлагали выбрать другую профессию. Но Аружан решила попробовать ещё раз.\n\nЦелый год она работала санитаркой в больнице, а по вечерам готовилась к экзаменам. Было трудно: после смены не было сил. Зато она увидела настоящую работу врачей и поняла, что её цель — не просто мечта.\n\nЧерез год ей удалось набрать на двадцать баллов больше. Сейчас Аружан учится на третьем курсе.\n\nОна говорит: «Талант важен, но упорство важнее. Препятствие — это не конец пути. Каждое усилие — шаг к цели».\n\n(не хватило = was short of · балл = point · санитарка = hospital assistant · смена = shift · сил = strength · набрать = to score · шаг = step)', [
        k.mc('How many points short was Aruzhan the first time?', ['two', 'twenty', 'ten'], 0), k.tf('Her parents suggested a different profession.', true), k.mc('What did she do for the next year?', ['worked in a hospital and studied', 'travelled abroad', 'stayed at home'], 0), k.mc('What does she say is more important than talent?', ['persistence', 'money', 'luck'], 0)]] },

    { id: 'u21', t: 'Общество. People helping people', topic: 'Society',
      v: ['Society and help', `
общество | noun | society | Мы живём в обществе. | | OP-shcheest-va | We live in a society.
волонтёр | noun | volunteer | Она работает волонтёром. | | va-lan-TYOR | She works as a volunteer.
благотворительность | noun | charity | Он занимается благотворительностью. | | bla-ga-tva-REE-teel-nast | He does charity work.
помощь | noun | help | Спасибо за помощь! | | PO-mashch | Thank you for your help!
бедный | adjective | poor | Это бедная семья. | | BYED-ny | This is a poor family.
богатый | adjective | rich | Он богатый человек. | | ba-GA-ty | He is a rich man.
нуждаться | verb | to be in need of | Они нуждаются в помощи. | | noozh-DAT-sa | They are in need of help.
пожертвование | noun | donation | Спасибо за ваше пожертвование. | | pa-ZHERT-va-va-nee-ye | Thank you for your donation.
бездомный | adjective | homeless | Волонтёры помогают бездомным. | | beez-DOM-ny | Volunteers help homeless people.
заботиться | verb | to care for | Она заботится о бабушке. | | za-BO-teet-sa | She cares for her grandmother.`],
      g: ['I need a doctor: нужен, нужна, нужно, нужны', '<p>In A2 you learned <b>мне нужно</b> + a verb. To need a <b>thing or a person</b>, the word agrees with what is needed.</p><table><tr><th>What is needed</th><th>Form</th><th>Example</th></tr><tr><td>он</td><td><b>нужен</b></td><td>Мне <b>нужен</b> врач.</td></tr><tr><td>она</td><td><b>нужна</b></td><td>Людям <b>нужна</b> помощь.</td></tr><tr><td>оно</td><td><b>нужно</b></td><td>Ему <b>нужно</b> время.</td></tr><tr><td>они</td><td><b>нужны</b></td><td>Нам <b>нужны</b> волонтёры.</td></tr></table><ul><li>The person who needs it is in the “to” form: <b>мне, тебе, ему, ей, нам, вам, им</b>, друзь<b>ям</b>, люд<b>ям</b>.</li><li>Past: Мне <b>был нужен</b> врач. Future: Нам <b>будут нужны</b> волонтёры.</li></ul>', [
        k.mc('Мне ___ врач.', ['нужен', 'нужна', 'нужны'], 0),
        k.mc('Людям ___ помощь.', ['нужна', 'нужен', 'нужно'], 0),
        k.mc('Нам ___ волонтёры.', ['нужны', 'нужна', 'нужен'], 0),
        k.mc('Ему ___ время.', ['нужно', 'нужен', 'нужны'], 0),
        k.mc('___ нужна помощь. (she)', ['Ей', 'Она', 'Её'], 0),
        k.ord('Пожилым людям нужна помощь')]],
      r: ['Saturday volunteers', 'Каждую субботу в девять утра у городского рынка собираются двадцать человек. Это волонтёры благотворительной организации «Добрые руки». Среди них студенты, пенсионеры, даже один директор банка.\n\nСначала они покупают продукты на пожертвования жителей города. Потом делят их на пакеты: хлеб, молоко, крупа, овощи. К обеду пакеты получают шестьдесят пожилых людей, которым трудно выходить из дома.\n\n«Многие думают, что бедным нужны только деньги, — говорит Сауле, которая руководит группой. — Но одиноким людям нужно ещё и внимание. Мы всегда остаёмся на чай и разговор».\n\nОрганизации всегда нужны новые люди. Не обязательно быть богатым, чтобы заботиться о других. Нужно только два часа в неделю.\n\n(собираются = gather · среди = among · делят = divide · крупа = grains · внимание = attention · остаёмся = stay)', [
        k.mc('When do the volunteers meet?', ['on Saturdays at nine', 'on Sundays at noon', 'every evening'], 0), k.mc('Where does the money for food come from?', ['donations from people in the city', 'the bank', 'the market'], 0), k.mc('How many elderly people get a bag?', ['sixty', 'twenty', 'nine'], 0), k.tf('Saule thinks lonely people need only money.', false)]] },

    { id: 'u22', t: 'Город или село? City or village?', topic: 'Lifestyles',
      v: ['Two ways of life', `
ферма | noun | farm | У дяди большая ферма. | | FYER-ma | My uncle has a big farm.
урожай | noun | harvest | В этом году хороший урожай. | | oo-ra-ZHAY | There is a good harvest this year.
поле | noun | field | В поле растёт пшеница. | | PO-lye | Wheat grows in the field.
скот | noun | livestock | Они держат скот. | | skot | They keep livestock.
тишина | noun | silence, quiet | Я люблю тишину. | | tee-shy-NA | I love the quiet.
городской | adjective | city, urban | Это городской парк. | | ga-rat-SKOY | This is the city park.
сельский | adjective | rural, village | Он сельский учитель. | | SYEL-skee | He is a village teacher.
преимущество | noun | advantage | Это большое преимущество. | | pree-ee-MOO-shcheest-va | This is a big advantage.
недостаток | noun | disadvantage | У города есть недостатки. | | nee-das-TA-tak | The city has disadvantages.
темп | noun | pace | Здесь быстрый темп жизни. | | temp | The pace of life is fast here.`],
      g: ['As … as, not as … as, more, less', '<table><tr><th>Pattern</th><th>Meaning</th><th>Example</th></tr><tr><td><b>такой же</b> … <b>как</b></td><td>as … as</td><td>Мой дом <b>такой же</b> большой, <b>как</b> твой.</td></tr><tr><td><b>не такой</b> … <b>как</b></td><td>not as … as</td><td>Село <b>не такое</b> шумное, <b>как</b> город.</td></tr><tr><td><b>более</b> + adjective</td><td>more</td><td>Жизнь в городе <b>более</b> дорогая.</td></tr><tr><td><b>менее</b> + adjective</td><td>less</td><td>Здесь <b>менее</b> шумно.</td></tr></table><ul><li><b>такой</b> agrees with the noun: так<b>ой</b> (он), так<b>ая</b> (она), так<b>ое</b> (оно), так<b>ие</b> (они).</li><li><b>более</b> and <b>менее</b> never change, and the adjective keeps its usual form. They are common with long adjectives: более современный, менее удобный.</li><li>After <b>такой же</b> use <b>как</b>. After <b>-ее</b> forms use <b>чем</b>: тише, <b>чем</b> в городе.</li></ul>', [
        k.mc('Село не такое шумное, ___ город.', ['как', 'чем', 'что'], 0),
        k.mc('Мой дом такой ___ большой, как твой.', ['же', 'бы', 'ли'], 0),
        k.mc('Жизнь в городе ___ дорогая. (more)', ['более', 'много', 'очень'], 0),
        k.mc('В селе тише, ___ в городе.', ['чем', 'как', 'что'], 0),
        k.mc('Эта улица ___ же длинная, как та.', ['такая', 'такой', 'такие'], 0),
        k.ord('Село не такое шумное как город')]],
      r: ['Two brothers', 'Братья Ерлан и Нурлан выросли в маленьком селе. После школы Ерлан уехал в Алматы, а Нурлан остался дома.\n\nЕрлан работает в городской компании. У него высокая зарплата, рядом кино, театры, магазины. Но у городской жизни есть недостатки: два часа в день он стоит в пробках, а аренда квартиры очень дорогая. «Темп жизни здесь слишком быстрый», — говорит он.\n\nУ Нурлана ферма: поле, скот, большой дом. Его доходы не такие высокие, как у брата, и они зависят от урожая. Зато вокруг тишина и чистый воздух, а дети играют на улице.\n\nКаждое лето Ерлан приезжает в село. «Главное преимущество сельской жизни — здесь есть время», — думает он. А Нурлан иногда мечтает о городе.\n\n(выросли = grew up · остался = stayed · зависят от = depend on)', [
        k.mc('Where does Erlan live now?', ['in Almaty', 'in the village', 'in Astana'], 0), k.mc('What are the disadvantages of his life?', ['traffic jams and expensive rent', 'a low salary', 'no shops'], 0), k.mc('What does Nurlan’s income depend on?', ['the harvest', 'his brother', 'the bank'], 0), k.tf('Nurlan earns more than his brother.', false)]] },

    { id: 'u23', t: 'Неожиданная встреча. An unexpected meeting', topic: 'Stories',
      v: ['Words for a good story', `
как только | phrase | as soon as | Как только я пришёл, пошёл дождь. | | kak TOL-ka | As soon as I arrived, it started to rain.
внезапно | adverb | suddenly | Внезапно погас свет. | | vnee-ZAP-na | Suddenly the light went out.
тем временем | phrase | meanwhile | Тем временем поезд уехал. | | tyem VRYE-mee-nyem | Meanwhile the train left.
оказаться | verb | to turn out | Оказалось, что он мой сосед. | | a-ka-ZAT-sa | It turned out that he was my neighbour.
выяснить | verb | to find out | Мы выяснили правду. | | VY-yas-neet | We found out the truth.
совпадение | noun | coincidence | Это просто совпадение. | | saf-pa-DYE-nee-ye | It is just a coincidence.
незнакомец | noun | stranger | Ко мне подошёл незнакомец. | | nee-zna-KO-meets | A stranger came up to me.
тайна | noun | secret, mystery | Это наша тайна. | | TAY-na | This is our secret.
чудо | noun | miracle | Это настоящее чудо! | | CHOO-da | This is a real miracle!
судьба | noun | fate | Наверное, это судьба. | | sood-BA | It is probably fate.`],
      g: ['While, when, as soon as', '<p>The verb pair shows how two actions fit together.</p><table><tr><th>Word</th><th>Verbs</th><th>Example</th></tr><tr><td><b>пока</b> = while</td><td>action verb: something was going on</td><td><b>Пока</b> я <b>ждал</b> поезд, я <b>читал</b> книгу.</td></tr><tr><td><b>когда</b> = when</td><td>result verb: one thing happened, then another</td><td><b>Когда</b> я <b>пришёл</b> домой, все уже спали.</td></tr><tr><td><b>как только</b> = as soon as</td><td>result verb in both parts</td><td><b>Как только</b> поезд <b>остановился</b>, я <b>вышел</b>.</td></tr></table><p>A long action that is broken by a short one:</p><ul><li>Пока я <b>шёл</b> домой, <b>начался</b> дождь. = While I was walking home, it started to rain.</li></ul><p><b>тем временем</b> (meanwhile) starts a new sentence about something happening at the same time.</p>', [
        k.mc('___ я ждал поезд, я читал книгу.', ['Пока', 'Как только', 'Поэтому'], 0),
        k.mc('___ поезд остановился, я вышел.', ['Как только', 'Пока', 'Хотя'], 0),
        k.mc('Пока я ___ домой, начался дождь.', ['шёл', 'пришёл', 'пойду'], 0),
        k.mc('Когда я ___ домой, все уже спали.', ['пришёл', 'шёл', 'иду'], 0),
        k.mc('“meanwhile” = …', ['тем временем', 'как только', 'внезапно'], 0),
        k.ord('Пока я ждал поезд я читал книгу')]],
      r: ['The stranger on the train', 'Прошлой зимой я ехал на поезде из Астаны в Костанай. В купе со мной был незнакомец — пожилой мужчина с добрыми глазами. Пока поезд шёл через степь, мы пили чай и разговаривали.\n\nОн рассказал, что сорок лет назад учился в Костанае и с тех пор не был там. «Я хочу найти старого друга, — сказал он. — Мы вместе жили в общежитии. Потом я уехал, и мы потеряли связь».\n\n— Как его зовут? — спросил я.\n\n— Серик Ахметов.\n\nЯ не поверил. Это имя моего отца! Оказалось, что это не совпадение: мой отец учился в том же институте.\n\nКак только поезд приехал, я позвонил домой. Через час два старых друга обнимали друг друга на вокзале.\n\nОтец говорит, что это судьба. А я думаю, что это просто чудо.\n\n(купе = compartment · с тех пор = since then · не поверил = did not believe · обнимали друг друга = hugged each other)', [
        k.mc('Where was the writer travelling to?', ['Kostanay', 'Astana', 'Almaty'], 0), k.mc('Who did the old man want to find?', ['an old friend', 'his son', 'his teacher'], 0), k.mc('Who was Serik Akhmetov?', ['the writer’s father', 'the writer’s boss', 'the train conductor'], 0), k.tf('The two friends met at the station.', true)]] },

    { id: 'u24', t: 'Повторение. B1 review', topic: 'Review',
      v: ['Phrases for longer speech', `
тем не менее | phrase | nevertheless | Было трудно. Тем не менее я рад. | | tyem nee MYE-nee-ye | It was hard. Nevertheless I am glad.
кроме того | phrase | besides, in addition | Кроме того, это дёшево. | | KRO-mye ta-VO | Besides, it is cheap.
по сравнению с | phrase | compared with | По сравнению с Астаной здесь тепло. | | pa srav-NYE-nee-yoo s | Compared with Astana it is warm here.
с одной стороны | phrase | on the one hand | С одной стороны, это удобно. | | s ad-NOY sta-ra-NY | On the one hand, it is convenient.
с другой стороны | phrase | on the other hand | С другой стороны, это дорого. | | s droo-GOY sta-ra-NY | On the other hand, it is expensive.
в результате | phrase | as a result | В результате мы опоздали. | | v ree-zool-TA-tye | As a result we were late.
в отличие от | phrase | unlike | В отличие от брата, я люблю город. | | v at-LEE-chee-ye at | Unlike my brother, I like the city.
таким образом | phrase | so, in this way | Таким образом, мы решили проблему. | | ta-KEEM O-bra-zam | In this way we solved the problem.
на самом деле | phrase | in fact, really | На самом деле это просто. | | na SA-mam DYE-lye | In fact it is simple.
в основном | phrase | mainly | В основном я читаю новости. | | v as-nav-NOM | I mainly read the news.`],
      g: ['What you can do now', '<p>The main patterns of Russian B1:</p><table><tr><th>Unit</th><th>Pattern</th><th>Example</th></tr><tr><td>1</td><td>который</td><td>друг, <b>который</b> живёт в Астане</td></tr><tr><td>3, 10</td><td>чтобы; что, ли</td><td>Я хочу, <b>чтобы</b> ты пришёл. Он спросил, приду <b>ли</b> я.</td></tr><tr><td>4, 17</td><td>orders and rules</td><td><b>Не курите!</b> Здесь <b>запрещено</b> курить.</td></tr><tr><td>5, 12</td><td>verbs of motion</td><td><b>при</b>ехал, <b>у</b>шла; иду / хожу</td></tr><tr><td>6, 14</td><td>endings for many</td><td>много овощ<b>ей</b>; к друзь<b>ям</b></td></tr><tr><td>8</td><td>only imagined</td><td><b>Если бы</b> я знал, я <b>бы</b> сказал.</td></tr><tr><td>9, 15, 18</td><td>passive</td><td>используется; закрыт; <b>был построен</b></td></tr><tr><td>11</td><td>someone, nobody</td><td><b>кто-то</b>, <b>что-нибудь</b>, <b>никто не</b></td></tr><tr><td>16, 23</td><td>joining ideas</td><td><b>хотя</b>, <b>однако</b>, <b>пока</b>, <b>как только</b></td></tr><tr><td>20, 21</td><td>managing and needing</td><td>мне <b>удалось</b>; мне <b>нужен</b> врач</td></tr></table>', [
        k.mc('Это девушка, ___ работает в банке.', ['которая', 'который', 'которые'], 0),
        k.mc('Я хочу, чтобы ты ___.', ['пришёл', 'прийти', 'придёшь'], 0),
        k.mc('Если бы у меня были деньги, я ___ купил дом.', ['бы', 'буду', 'был'], 0),
        k.mc('Он спросил, приду ___ я.', ['ли', 'что', 'если'], 0),
        k.mc('Школа ___ построена в 1980 году.', ['была', 'был', 'было'], 0),
        k.mc('Нам ___ волонтёры.', ['нужны', 'нужен', 'нужна'], 0),
        k.ord('Хотя было трудно я сдал экзамен')]],
      r: ['A letter after B1', 'Дорогой Марат!\n\nСегодня я закончил уровень B1. Два года назад я не мог сказать по-русски ни слова, а теперь пишу тебе это письмо.\n\nС одной стороны, было трудно. Русская грамматика, на самом деле, не такая простая, как английская. С другой стороны, каждый урок давал мне что-то новое.\n\nПо сравнению с прошлым годом я говорю намного свободнее. Кроме того, я начал читать новости и даже понимаю шутки. В результате у меня появились русскоязычные друзья.\n\nТем не менее мне нужно ещё много учиться. В основном я хочу улучшить произношение.\n\nТаким образом, мой следующий шаг — уровень B2. Если бы не твоя помощь, я бы не смог это сделать. Спасибо!\n\nТвой Том\n\n(уровень = level · ни слова = not a word · намного = much · шутка = joke · русскоязычный = Russian-speaking · улучшить = to improve)', [
        k.mc('How long has Tom been learning Russian?', ['two years', 'one year', 'five years'], 0), k.tf('Tom thinks Russian grammar is as simple as English grammar.', false), k.mc('What does Tom mainly want to improve?', ['his pronunciation', 'his reading', 'his spelling'], 0), k.mc('What is his next step?', ['level B2', 'level A2', 'a job in Russia'], 0)]] }
  ]);
})();
