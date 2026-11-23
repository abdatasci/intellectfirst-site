/* IF Lingo · Russian B2: an original IF Academy course for people who speak English and have finished Russian B1.
   Word lines: word | part of speech | meaning in English | example | (empty) | how to say it | the example in English.
   Plan: 24 units and a level test (project doc claude/if-lingo.md). Built so far: units 1 to 24. */
IFX.course({
  id: 'ru-b2', track: 'lang', lang: 'ru-RU', level: 'B2', next: 'C1', icon: '🇷🇺',
  title: 'Russian B2', sub: 'Confident Russian',
  blurb: 'Discuss generations, work, the media, wellbeing, tourism, cities, the climate, machines at work, lifelong learning, fair play, business, migration, the news, science, advertising and official letters, and read longer texts. 24 units, explained in English.',
  units: []
});
(function () {
  var k = IFX.k;
  IFX.make('ru-b2', [
    { id: 'u1', t: 'Поколения. Generations and values', topic: 'Society',
      v: ['Values and growing up', `
ценности | noun | values | У каждого поколения свои ценности. | | TSEN-nas-tee | Every generation has its own values.
мировоззрение | noun | world view | Книги меняют мировоззрение. | | mee-ra-vaz-ZRYE-nee-ye | Books change your world view.
воспитание | noun | upbringing | Он получил хорошее воспитание. | | vas-pee-TA-nee-ye | He had a good upbringing.
взгляды | noun | views, opinions | Наши взгляды не совпадают. | | VZGLYA-dy | Our views differ.
зрелость | noun | maturity, adulthood | Зрелость приходит с опытом. | | ZRYE-last | Maturity comes with experience.
юность | noun | youth (the time of life) | Его юность прошла в селе. | | YOO-nast | His youth was spent in a village.
идентичность | noun | identity | Язык — часть нашей идентичности. | | ee-den-TEECH-nast | Language is part of our identity.
самостоятельный | adjective | independent | Она самостоятельный человек. | | sa-ma-sta-YA-teel-ny | She is an independent person.
зависеть | verb | to depend | Всё зависит от тебя. | | za-VEE-seet | Everything depends on you.
влияние | noun | influence | Родители имеют большое влияние. | | vlee-YA-nee-ye | Parents have a great influence.`],
      g: ['The man living here: active participles', '<p>A participle is made from a verb but works like an adjective. It replaces <b>который</b> + verb, mostly in writing.</p><table><tr><th>Time</th><th>How to make it</th><th>Examples</th></tr><tr><td>now</td><td>они form without -т + <b>-щий</b></td><td>читаю-т → читаю<b>щий</b> (who is reading)<br>живу-т → живу<b>щий</b> (who lives)<br>говоря-т → говоря<b>щий</b> (who speaks)</td></tr><tr><td>past</td><td>past form without -л + <b>-вший</b></td><td>чита-л → чита<b>вший</b> (who was reading)<br>написа-л → написа<b>вший</b> (who wrote)</td></tr><tr><td>past, after a consonant</td><td><b>-ший</b></td><td>вырос → вырос<b>ший</b> (who grew up)</td></tr></table><ul><li>Человек, <b>который живёт</b> здесь = Человек, <b>живущий</b> здесь.</li><li>Студент, <b>который написал</b> книгу = Студент, <b>написавший</b> книгу.</li></ul><p>The participle agrees with its noun like an adjective: бабушка, вырос<b>шая</b> в селе; я знаю девушку, говоря<b>щую</b> по-казахски.</p>', [
        k.mc('Человек, ___ в этом доме сейчас, — мой сосед.', ['живущий', 'жить', 'живёт'], 0),
        k.mc('Студент, ___ эту книгу, получил приз.', ['написавший', 'пишущий', 'написать'], 0),
        k.mc('Я знаю девушку, ___ по-казахски.', ['говорящую', 'говорящий', 'говорящая'], 0),
        k.mc('читать → “who is reading” = …', ['читающий', 'читавший', 'читая'], 0),
        k.mc('“который работает” = …', ['работающий', 'работавший', 'работать'], 0),
        k.ord('Это бабушка выросшая в селе')]],
      r: ['Three generations at one table', 'В нашей семье за воскресным столом собираются три поколения. Бабушка, выросшая в селе, считает, что главное в жизни — семья и уважение к старшим. Мама, работающая в банке, ценит стабильность и образование. А я, студентка, думаю, что важнее всего свобода выбора.\n\nКонечно, наши взгляды часто не совпадают. Бабушка не понимает, почему я не спешу замуж. Мама волнуется, что я хочу стать фотографом, а не юристом. Раньше такие разговоры заканчивались ссорой.\n\nНо недавно я поняла: ценности каждого поколения зависят от времени, в котором оно росло. Бабушкина юность была трудной, поэтому для неё так важна семья. Мамина зрелость пришлась на годы перемен, поэтому она ищет стабильность.\n\nТеперь мы больше слушаем друг друга. Воспитание, полученное в семье, остаётся со мной, даже когда я выбираю свой путь. Самостоятельный человек — не тот, кто спорит со всеми, а тот, кто понимает других.\n\n(ценит = values · стабильность = stability · не совпадают = do not coincide · пришлась на = fell in · перемены = changes)', [
        k.mc('Where did the grandmother grow up?', ['in a village', 'in a big city', 'abroad'], 0), k.mc('What does the writer value most?', ['freedom of choice', 'stability', 'money'], 0), k.tf('The mother wants her daughter to be a photographer.', false), k.mc('What did the writer come to understand?', ['Each generation’s values depend on the time it grew up in.', 'Older people are always right.', 'Families should not talk about values.'], 0)]] },

    { id: 'u2', t: 'Работа по-новому. New ways of working', topic: 'Work',
      v: ['Work today', `
удалённая работа | noun | remote work | Удалённая работа экономит время. | | oo-da-LYON-na-ya ra-BO-ta | Remote work saves time.
гибкий график | noun | flexible hours | У меня гибкий график. | | GEEP-kee GRA-feek | I have flexible hours.
сотрудничество | noun | cooperation | Спасибо за сотрудничество. | | sa-TROOD-nee-cheest-va | Thank you for your cooperation.
эффективность | noun | efficiency | Нужно повысить эффективность. | | e-feek-TEEV-nast | Efficiency needs to be raised.
производительность | noun | productivity | Производительность выросла. | | pra-eez-va-DEE-teel-nast | Productivity has grown.
совмещать | verb | to combine | Она совмещает работу и учёбу. | | sav-mee-SHCHAT | She combines work and study.
баланс | noun | balance | Важен баланс работы и отдыха. | | ba-LANS | A balance of work and rest is important.
нагрузка | noun | workload | У врачей большая нагрузка. | | na-GROOS-ka | Doctors have a heavy workload.
коллектив | noun | staff, team | У нас дружный коллектив. | | ka-leek-TEEF | We have a friendly team.
корпоративная культура | noun | company culture | В фирме сильная корпоративная культура. | | kar-pa-ra-TEEV-na-ya kool-TOO-ra | The firm has a strong company culture.`],
      g: ['Written, built, opened: passive participles', '<p>These participles describe a thing by what <b>was done to it</b>.</p><table><tr><th>Verb</th><th>Participle</th><th>Meaning</th></tr><tr><td>написать</td><td>написа<b>нный</b></td><td>written</td></tr><tr><td>сделать</td><td>сдела<b>нный</b></td><td>done, made</td></tr><tr><td>построить</td><td>постро<b>енный</b></td><td>built</td></tr><tr><td>опубликовать</td><td>опубликова<b>нный</b></td><td>published</td></tr><tr><td>открыть, забыть</td><td>откры<b>тый</b>, забы<b>тый</b></td><td>opened, forgotten</td></tr></table><p><b>Long or short?</b></p><ul><li>Long form (with <b>-нн-</b>) describes the noun: Письмо, <b>написанное</b> вчера, лежит на столе.</li><li>Short form (one <b>-н-</b>, B1 Units 15 and 18) is the main fact of the sentence: Письмо <b>написано</b>. Работа <b>сделана</b>.</li></ul><p>The doer takes the “work as” ending: дом, построенный <b>дедушкой</b>; проект, созданный <b>нашей командой</b>.</p>', [
        k.mc('Письмо, ___ вчера, лежит на столе.', ['написанное', 'написано', 'написавшее'], 0),
        k.mc('Работа уже ___.', ['сделана', 'сделанная', 'сделавшая'], 0),
        k.mc('Это дом, ___ моим дедушкой.', ['построенный', 'построен', 'построивший'], 0),
        k.mc('открыть → “opened” = …', ['открытый', 'открывший', 'открывающий'], 0),
        k.mc('Проект, ___ нашей командой, получил приз.', ['созданный', 'создан', 'создавший'], 0),
        k.ord('Это дом построенный моим дедушкой')]],
      r: ['Four days instead of five', 'Год назад небольшая IT-компания в Алматы провела эксперимент: сотрудники стали работать четыре дня в неделю вместо пяти, а зарплата осталась прежней. Кроме того, каждый мог выбрать удалённую работу или офис.\n\nРуководители боялись, что производительность упадёт. Однако результаты, опубликованные через полгода, удивили всех. Количество выполненных задач не изменилось, а число больничных сократилось на треть. Сотрудники говорили, что им стало легче совмещать работу и семью.\n\nКонечно, были и проблемы. Нагрузка в рабочие дни выросла, а общаться с коллегами стало труднее. «Сотрудничество требует живых встреч, — говорит директор. — Поэтому по вторникам весь коллектив собирается в офисе».\n\nСейчас компания не хочет возвращаться к старому графику. По мнению директора, эффективность зависит не от количества часов, а от того, как человек себя чувствует.\n\n(вместо = instead of · прежней = the same as before · количество = number · сократилось на треть = fell by a third · требует = requires)', [
        k.mc('What did the company change?', ['a four-day week with the same pay', 'lower pay for fewer hours', 'no more office'], 0), k.mc('What were the managers afraid of?', ['Productivity would fall.', 'People would leave.', 'Clients would complain.'], 0), k.mc('What happened to sick leave?', ['It fell by a third.', 'It doubled.', 'It did not change.'], 0), k.mc('When does the whole team meet in the office?', ['on Tuesdays', 'on Fridays', 'every day'], 0)]] },

    { id: 'u3', t: 'Правда или нет? Thinking critically', topic: 'Media',
      v: ['Information and truth', `
достоверность | noun | reliability, accuracy | Проверьте достоверность новости. | | das-ta-VYER-nast | Check the reliability of the news.
проверять | verb | to check | Я всегда проверяю факты. | | pra-vee-RYAT | I always check the facts.
искажать | verb | to distort | Заголовок искажает смысл. | | ees-ka-ZHAT | The headline distorts the meaning.
предвзятый | adjective | biased | Это предвзятое мнение. | | preed-VZYA-ty | This is a biased opinion.
манипуляция | noun | manipulation | Реклама часто использует манипуляцию. | | ma-nee-poo-LYA-tsee-ya | Advertising often uses manipulation.
критическое мышление | noun | critical thinking | Школа должна учить критическому мышлению. | | kree-TEE-chees-ka-ye mysh-LYE-nee-ye | School should teach critical thinking.
первоисточник | noun | original source | Найдите первоисточник. | | pyer-va-ees-TOCH-neek | Find the original source.
дезинформация | noun | disinformation | В сети много дезинформации. | | de-zeen-far-MA-tsee-ya | There is a lot of disinformation online.
алгоритм | noun | algorithm | Алгоритм выбирает новости для нас. | | al-ga-REETM | An algorithm chooses the news for us.
доверчивый | adjective | trusting, gullible | Он слишком доверчивый. | | da-VYER-chee-vy | He is too trusting.`],
      g: ['While reading, having read: verbal adverbs', '<p>These forms never change. They tell <b>how</b> or <b>when</b> the main action happens, and both actions must have the <b>same doer</b>.</p><table><tr><th>Meaning</th><th>How to make it</th><th>Examples</th></tr><tr><td>while doing (action verb)</td><td>они form without the ending + <b>-я</b> (<b>-а</b> after ж, ш, ч, щ)</td><td>чита-ют → чита<b>я</b>, слуша-ют → слуша<b>я</b>, дума-ют → дума<b>я</b>, слыш-ат → слыш<b>а</b></td></tr><tr><td>having done (result verb)</td><td>past form without -л + <b>-в</b></td><td>прочита-л → прочита<b>в</b>, сдела-л → сдела<b>в</b>, найдя (from найти)</td></tr><tr><td>having done, verbs in -ся</td><td><b>-вшись</b></td><td>вернул-ся → верну<b>вшись</b></td></tr></table><ul><li><b>Читая</b> новости, я пью кофе. = While reading the news, I drink coffee.</li><li><b>Прочитав</b> статью, он проверил источник. = Having read the article, he checked the source.</li><li><b>Не зная</b> ответа, он молчал. = Not knowing the answer, he was silent.</li></ul>', [
        k.mc('___ новости, я пью кофе.', ['Читая', 'Прочитав', 'Читающий'], 0),
        k.mc('___ статью, он проверил источник.', ['Прочитав', 'Читая', 'Прочитанный'], 0),
        k.mc('___ домой, она позвонила маме.', ['Вернувшись', 'Возвращая', 'Вернувшая'], 0),
        k.mc('слушать → “while listening” = …', ['слушая', 'слушав', 'слушающий'], 0),
        k.mc('Не ___ ответа, он молчал.', ['зная', 'знал', 'знающий'], 0),
        k.ord('Прочитав статью он проверил источник')]],
      r: ['Before you share', 'Каждый день мы получаем больше информации, чем человек сто лет назад получал за месяц. Листая ленту новостей, мы редко задаём себе вопрос: а правда ли это?\n\nАлгоритмы социальных сетей показывают нам то, что нам нравится. Прочитав десять похожих статей, человек начинает думать, что так считают все. Так работает информационный «пузырь».\n\nПреподаватель журналистики Айжан Сериковна учит студентов простому правилу трёх вопросов. Кто это написал? Откуда автор это знает? Кому это выгодно? Найдя первоисточник, вы часто видите, что заголовок искажает смысл.\n\n«Критическое мышление — это не недоверие ко всему, — говорит она. — Это привычка проверять. Доверчивый человек верит всему, предвзятый — только тому, что подтверждает его мнение. Думающий человек проверяет и то, и другое».\n\nЕё главный совет: не делитесь новостью, не прочитав её до конца.\n\n(листая ленту = scrolling the feed · пузырь = bubble · смысл = meaning · недоверие = distrust · не делитесь = do not share)', [
        k.mc('What do social network algorithms show us?', ['what we like', 'only true news', 'everything in order of time'], 0), k.mc('How many questions are in the teacher’s rule?', ['three', 'ten', 'one'], 0), k.tf('For the teacher, critical thinking means distrusting everything.', false), k.mc('What is her main advice?', ['Do not share news before reading it to the end.', 'Read only one newspaper.', 'Never use social networks.'], 0)]] },

    { id: 'u4', t: 'Когда нет сил. Stress and wellbeing', topic: 'Health',
      v: ['Mind and mood', `
выгорание | noun | burnout | У неё эмоциональное выгорание. | | vy-ga-RA-nee-ye | She has emotional burnout.
тревога | noun | anxiety, alarm | Я чувствую тревогу. | | tree-VO-ga | I feel anxiety.
депрессия | noun | depression | Депрессию нужно лечить. | | deep-RYES-see-ya | Depression needs treating.
психолог | noun | psychologist | Она ходит к психологу. | | psee-KHO-lak | She sees a psychologist.
психическое здоровье | noun | mental health | Психическое здоровье важно для всех. | | psee-KHEE-chees-ka-ye zda-ROV-ye | Mental health matters for everyone.
истощение | noun | exhaustion | Врач сказал, что это истощение. | | ees-ta-SHCHE-nee-ye | The doctor said it was exhaustion.
восстановиться | verb | to recover | Ему нужно время, чтобы восстановиться. | | vas-sta-na-VEET-sa | He needs time to recover.
терапия | noun | therapy | Терапия помогла ей. | | tee-ra-PEE-ya | Therapy helped her.
самочувствие | noun | how you feel, general state | Как ваше самочувствие? | | sa-ma-CHOOST-vee-ye | How are you feeling?
переутомление | noun | overwork, overtiredness | Причина болезни — переутомление. | | pee-ree-oo-tam-LYE-nee-ye | The cause of the illness is overwork.`],
      g: ['Careful advice: стоит, следует, я бы', '<table><tr><th>Pattern</th><th>Tone</th><th>Example</th></tr><tr><td>кому + <b>стоит</b> + verb</td><td>it is worth, you should</td><td>Вам <b>стоит</b> обратиться к врачу.</td></tr><tr><td>кому + <b>не стоит</b> + verb</td><td>you had better not</td><td><b>Не стоит</b> волноваться.</td></tr><tr><td>кому + <b>следует</b> + verb</td><td>formal: you ought to</td><td>Вам <b>следует</b> больше спать.</td></tr><tr><td><b>на вашем месте я бы</b> + past form</td><td>if I were you</td><td><b>На вашем месте я бы</b> взял отпуск.</td></tr><tr><td>кому + <b>бы</b> + verb</td><td>short and friendly</td><td>Тебе <b>бы</b> отдохнуть.</td></tr></table><ul><li>The person is in the “to” form: <b>мне, тебе, вам, ему, ей</b>.</li><li><b>стоит</b> and <b>следует</b> never change.</li><li>After <b>не стоит</b> use the action verb: не стоит <b>волноваться</b>, не стоит <b>проверять</b>.</li></ul>', [
        k.mc('Вам ___ обратиться к врачу.', ['стоит', 'стоите', 'стоят'], 0),
        k.mc('На вашем месте я ___ взял отпуск.', ['бы', 'буду', 'был'], 0),
        k.mc('Вам следу___ больше спать.', ['ет', 'ют', 'ешь'], 0),
        k.mc('Тебе ___ отдохнуть.', ['бы', 'был', 'будешь'], 0),
        k.mc('“If I were you” = …', ['На вашем месте', 'В вашем месте', 'Если бы я вы'], 0),
        k.ord('На вашем месте я бы взял отпуск')]],
      r: ['When there is no strength left', 'Гульнара десять лет работала учителем и очень любила свою профессию. Но прошлой зимой она заметила, что по утрам ей не хочется идти в школу. Она плохо спала, часто раздражалась и чувствовала постоянную тревогу.\n\nСначала Гульнара думала, что это просто усталость. Подруга сказала ей: «На твоём месте я бы обратилась к психологу». Гульнара сомневалась: ей казалось, что просить о помощи стыдно.\n\nПсихолог объяснил, что это эмоциональное выгорание — истощение, которое появляется после долгого переутомления. «Вам стоит пересмотреть нагрузку, — сказал он. — И не следует проверять тетради по ночам».\n\nГульнара взяла отпуск, начала гулять каждый день и отказалась от дополнительных уроков. Восстановиться удалось не сразу: на это ушло три месяца.\n\nСейчас она снова в школе и говорит коллегам: «О психическом здоровье стоит заботиться так же, как о физическом».\n\n(раздражалась = got irritated · постоянный = constant · стыдно = shameful · пересмотреть = to reconsider · тетради = exercise books)', [
        k.mc('What is Gulnara’s job?', ['teacher', 'psychologist', 'doctor'], 0), k.mc('What did her friend advise?', ['to see a psychologist', 'to change her job', 'to work harder'], 0), k.mc('How long did it take her to recover?', ['three months', 'three days', 'a year'], 0), k.tf('The psychologist told her to mark exercise books at night.', false)]] },

    { id: 'u5', t: 'Туризм: за и против. Tourism, for and against', topic: 'Travel',
      v: ['Tourism and its effects', `
туризм | noun | tourism | Туризм приносит доход. | | too-REEZM | Tourism brings income.
поток | noun | flow, stream | Летом поток туристов растёт. | | pa-TOK | In summer the flow of tourists grows.
местные жители | noun | local people | Местные жители недовольны шумом. | | MYES-ny-ye ZHY-tee-lee | Local people are unhappy about the noise.
ущерб | noun | damage | Природе нанесён ущерб. | | oo-SHCHERP | Damage has been done to nature.
сохранение | noun | preservation | Сохранение природы — общая задача. | | sa-khra-NYE-nee-ye | Preserving nature is a shared task.
ограничить | verb | to limit | Нужно ограничить число машин. | | a-gra-NEE-cheet | The number of cars must be limited.
устойчивый | adjective | sustainable, stable | Нам нужен устойчивый туризм. | | oos-TOY-chee-vy | We need sustainable tourism.
курорт | noun | resort | Это известный горный курорт. | | koo-RORT | This is a well-known mountain resort.
прибыльный | adjective | profitable | Это прибыльный бизнес. | | PREE-byl-ny | This is a profitable business.
массовый | adjective | mass | Массовый туризм меняет города. | | MAS-sa-vy | Mass tourism changes cities.`],
      g: ['Reaching, approaching, dropping in: more beginnings for verbs of motion', '<p>In B1 you learned <b>при-, у-, в-, вы-, пере-</b>. Five more:</p><table><tr><th>Beginning</th><th>Meaning</th><th>Examples</th></tr><tr><td><b>до-</b></td><td>as far as, reach</td><td>Мы <b>дошли</b> до вершины. = We reached the top.</td></tr><tr><td><b>под-</b></td><td>come up to</td><td>Он <b>подошёл</b> к окну. = He came up to the window.</td></tr><tr><td><b>об-</b></td><td>go round</td><td>Туристы <b>обошли</b> озеро. = The tourists walked round the lake.</td></tr><tr><td><b>про-</b></td><td>go past, go through</td><td>Автобус <b>проехал</b> мимо. = The bus drove past.</td></tr><tr><td><b>за-</b></td><td>drop in on the way</td><td>Я <b>зашёл</b> в магазин. = I dropped into the shop.</td></tr></table><p>Each beginning likes its own small word: <b>до</b>йти <b>до</b>, <b>под</b>ойти <b>к</b>, <b>про</b>йти <b>мимо</b> or <b>через</b>, <b>за</b>йти <b>в</b> or <b>к</b>.</p><p>The same forms give the verbal adverbs of Unit 3: <b>подойдя</b> к озеру, <b>дойдя</b> до реки.</p>', [
        k.mc('Мы ___ до вершины за три часа.', ['дошли', 'зашли', 'обошли'], 0),
        k.mc('Он ___ к окну и посмотрел на улицу.', ['подошёл', 'прошёл', 'дошёл'], 0),
        k.mc('По дороге домой я ___ в магазин.', ['зашёл', 'обошёл', 'дошёл'], 0),
        k.mc('Туристы ___ озеро вокруг.', ['обошли', 'подошли', 'зашли'], 0),
        k.mc('Автобус ___ мимо остановки.', ['проехал', 'подъехал', 'заехал'], 0),
        k.ord('По дороге домой я зашёл в магазин')]],
      r: ['The village that grew tired of tourists', 'Ещё десять лет назад об одном горном селе на юге Казахстана знали только местные жители. Потом фотографии соседних озёр появились в интернете, и начался массовый туризм. Теперь летом сюда приезжает больше людей, чем живёт в селе.\n\nС одной стороны, туризм приносит доход. Почти в каждом доме открылась гостиница, у молодёжи появилась работа. С другой стороны, поток машин разрушает дороги, а на берегах озёр остаётся мусор. Природе нанесён серьёзный ущерб.\n\nВ прошлом году жители села решили ограничить число гостей. Подойдя к озеру, турист теперь видит правила: нельзя разводить костры, машину нужно оставить на парковке и дойти до воды пешком.\n\n«Мы не против гостей, — говорит хозяйка гостевого дома. — Но мы хотим устойчивого туризма. Сохранение озёр важнее, чем прибыльный сезон».\n\n(разрушает = destroys · нанесён = has been done · разводить костры = to light fires · против = against · гостевой дом = guest house)', [
        k.mc('How did mass tourism begin?', ['Photos of the lakes appeared online.', 'A new road was built.', 'A film was made there.'], 0), k.mc('What good has tourism brought?', ['income and jobs', 'cleaner lakes', 'better roads'], 0), k.mc('What must a tourist do now?', ['leave the car and walk to the water', 'pay to take photos', 'bring firewood'], 0), k.tf('The villagers are against all guests.', false)]] },

    { id: 'u6', t: 'Меньше, но лучше. Buying less', topic: 'Consumer society',
      v: ['Buying and wanting', `
потребление | noun | consumption | Потребление воды растёт. | | pat-reeb-LYE-nee-ye | Water consumption is growing.
потребитель | noun | consumer | Потребитель имеет права. | | pat-ree-BEE-teel | The consumer has rights.
спрос | noun | demand | Спрос на жильё высокий. | | spros | Demand for housing is high.
товар | noun | goods, product | Этот товар хорошего качества. | | ta-VAR | This product is of good quality.
бренд | noun | brand | Люди платят за бренд. | | brent | People pay for the brand.
минимализм | noun | minimalism | Она выбрала минимализм. | | mee-nee-ma-LEEZM | She chose minimalism.
необходимость | noun | necessity | Телефон сегодня — необходимость. | | nee-ap-kha-DEE-mast | A phone today is a necessity.
излишек | noun | surplus, excess | У нас излишек одежды. | | eez-LEE-shek | We have a surplus of clothes.
навязывать | verb | to impose | Реклама навязывает нам желания. | | na-VYA-zy-vat | Advertising imposes wants on us.
осознанный | adjective | conscious, deliberate | Это осознанный выбор. | | a-SOZ-nan-ny | This is a conscious choice.`],
      g: ['Both, two of us, one and a half: numbers with a difference', '<table><tr><th>Word</th><th>Use</th><th>Example</th></tr><tr><td><b>оба</b> (он, оно), <b>обе</b> (она)</td><td>both</td><td><b>Оба</b> шкафа полны. <b>Обе</b> сестры в Астане.</td></tr><tr><td><b>двое, трое, четверо</b></td><td>a group of people; with <b>детей</b></td><td>У меня <b>двое</b> детей. Нас было <b>трое</b>.</td></tr><tr><td><b>полтора</b> (он, оно), <b>полторы</b> (она)</td><td>one and a half</td><td><b>полтора</b> часа, <b>полторы</b> зарплаты</td></tr><tr><td><b>треть, четверть, половина</b></td><td>a third, a quarter, a half</td><td>Он носил только <b>треть</b> одежды.</td></tr></table><p>After small words, numbers change too:</p><ul><li><b>с</b> + двумя, тремя, пятью: Я говорю <b>с двумя</b> друзьями.</li><li><b>из</b> + двух, трёх, десяти: Один <b>из трёх</b> покупателей вернул товар. <b>Из десяти</b> желаний осталось два.</li></ul>', [
        k.mc('У меня ___ детей.', ['двое', 'два', 'две'], 0),
        k.mc('___ сестры живут в Астане.', ['Обе', 'Оба', 'Двое'], 0),
        k.mc('Я говорю с ___ друзьями.', ['двумя', 'два', 'двух'], 0),
        k.mc('Один из ___ покупателей вернул товар.', ['трёх', 'три', 'тремя'], 0),
        k.mc('Я ждал ___ часа.', ['полтора', 'полторы', 'оба'], 0),
        k.ord('Из десяти желаний осталось два')]],
      r: ['Less, but better', 'Тимур работал в рекламе и хорошо знал, как создаётся спрос. «Нам навязывают мысль, что без нового телефона или модной куртки мы не будем счастливы», — говорит он.\n\nДва года назад, переезжая в новую квартиру, Тимур удивился: у него было двенадцать коробок вещей, которыми он почти не пользовался. Оба шкафа были полны одежды, но носил он только треть.\n\nТогда Тимур попробовал минимализм. Он отдал лишние вещи и установил правило: перед каждой покупкой ждать тридцать дней. Из десяти желаний через месяц оставалось два или три.\n\n«Осознанное потребление — это не бедность, — объясняет он. — Я покупаю меньше товаров, но лучшего качества. Раньше я платил за бренд, теперь — за необходимость».\n\nЗа год Тимур сэкономил полторы зарплаты. Но главное, по его словам, — свободное время: излишек вещей требует слишком много внимания.\n\n(мысль = idea · не пользовался = did not use · лишние = unnecessary · установил = set · по его словам = in his words)', [
        k.mc('Where did Timur work?', ['in advertising', 'in a bank', 'in a clothes shop'], 0), k.mc('How many boxes of little-used things did he have?', ['twelve', 'two', 'thirty'], 0), k.mc('What rule did he set?', ['to wait thirty days before buying', 'to buy only brands', 'to shop once a year'], 0), k.mc('How much did he save in a year?', ['one and a half salaries', 'half a salary', 'ten salaries'], 0)]] },

    { id: 'u7', t: 'Город для людей. Cities for people', topic: 'Cities',
      v: ['How cities grow', `
застройка | noun | building development | В центре плотная застройка. | | za-STROY-ka | The centre is densely built up.
плотность | noun | density | Плотность населения высокая. | | PLOT-nast | The population density is high.
благоустройство | noun | improvement of public spaces | Идёт благоустройство парка. | | bla-ga-oo-STROYST-va | The park is being improved.
пешеходная зона | noun | pedestrian zone | В центре сделали пешеходную зону. | | pee-she-KHOD-na-ya ZO-na | A pedestrian zone was made in the centre.
зелёная зона | noun | green space | Городу нужны зелёные зоны. | | zee-LYO-na-ya ZO-na | The city needs green spaces.
жилой комплекс | noun | housing complex | Рядом строят жилой комплекс. | | zhy-LOY KOM-pleeks | A housing complex is being built nearby.
планировка | noun | layout | У квартиры удобная планировка. | | pla-nee-ROF-ka | The flat has a convenient layout.
урбанизация | noun | urbanisation | Урбанизация меняет страну. | | oor-ba-nee-ZA-tsee-ya | Urbanisation is changing the country.
городские власти | noun | city authorities | Городские власти обещали новый парк. | | ga-rat-SKEE-ye VLAS-tee | The city authorities promised a new park.
доступность | noun | accessibility, availability | Важна доступность транспорта. | | das-TOOP-nast | The availability of transport matters.`],
      g: ['What, the one who, everything that: joining with то and тот', '<p>Russian often puts a small pointing word before <b>что</b> or <b>кто</b>.</p><table><tr><th>Pattern</th><th>Meaning</th><th>Example</th></tr><tr><td><b>то, что</b></td><td>the fact that, what</td><td>Мне нравится <b>то, что</b> здесь много парков.</td></tr><tr><td><b>тот, кто</b></td><td>the one who</td><td><b>Тот, кто</b> живёт в центре, платит больше.</td></tr><tr><td><b>те, кто</b></td><td>those who</td><td>Хорошо <b>тем, кто</b> живёт рядом с парком.</td></tr><tr><td><b>всё, что</b></td><td>everything that</td><td><b>Всё, что</b> нужно, находится рядом.</td></tr><tr><td><b>в то время как</b></td><td>while, whereas</td><td>Центр растёт, <b>в то время как</b> окраины ждут.</td></tr></table><p>The pointing word takes the ending its verb needs:</p><ul><li>Я рад <b>тому, что</b> вы пришли. (рад + “to” form)</li><li>Всё зависит <b>от того, как</b> человек себя чувствует. (от + “of” form)</li><li>Я согласен <b>с тем, что</b> вы сказали. (с + “with” form)</li></ul>', [
        k.mc('Мне нравится ___, что в городе много парков.', ['то', 'тот', 'те'], 0),
        k.mc('___, кто живёт в центре, платит больше.', ['Тот', 'То', 'Всё'], 0),
        k.mc('Я согласен со всем, ___ вы сказали.', ['что', 'кто', 'как'], 0),
        k.mc('Центр растёт, в то время ___ окраины ждут.', ['как', 'что', 'когда'], 0),
        k.mc('Я рад ___, что вы пришли.', ['тому', 'то', 'тем'], 0),
        k.ord('Мне нравится то что здесь много парков')]],
      r: ['A city for people', 'Каким должен быть современный город? Архитекторы всё чаще говорят: тем, в котором удобно жить пешеходу, а не только водителю.\n\nВ двадцатом веке города строили для машин. Широкие проспекты, огромные жилые комплексы, длинная дорога на работу. То, что казалось прогрессом, привело к пробкам и шуму.\n\nСегодня популярна идея «пятнадцатиминутного города». Всё, что нужно человеку каждый день, — школа, магазин, поликлиника, парк — должно находиться в пятнадцати минутах ходьбы от дома. Тот, кто живёт в таком районе, реже садится за руль.\n\nГородские власти многих стран уже меняют планировку: появляются пешеходные зоны, а плотность застройки ограничивают, чтобы оставить место для зелёных зон.\n\nКритики напоминают, что благоустройство центра не должно забывать об окраинах. Доступность — это когда хорошо всем, а не только тем, кто живёт в дорогих кварталах.\n\n(архитектор = architect · в пятнадцати минутах ходьбы = fifteen minutes’ walk · садится за руль = gets behind the wheel · напоминают = remind)', [
        k.mc('What were twentieth-century cities built for?', ['cars', 'pedestrians', 'bicycles'], 0), k.mc('What is the “fifteen-minute city”?', ['Everything you need daily is a short walk away.', 'A city you can cross in fifteen minutes by car.', 'A city with fifteen districts.'], 0), k.mc('What are city authorities changing?', ['adding pedestrian zones and limiting density', 'building wider avenues', 'closing parks'], 0), k.mc('What do critics remind us?', ['The outskirts must not be forgotten.', 'The centre needs more cars.', 'Parks cost too much.'], 0)]] },

    { id: 'u8', t: 'Климат и вода. Climate and water', topic: 'Environment',
      v: ['Causes and effects', `
изменение климата | noun | climate change | Изменение климата касается всех. | | eez-mee-NYE-nee-ye KLEE-ma-ta | Climate change affects everyone.
парниковый эффект | noun | greenhouse effect | Парниковый эффект нагревает планету. | | par-nee-KO-vy e-FYEKT | The greenhouse effect warms the planet.
уровень | noun | level | Уровень воды поднялся. | | OO-ra-veen | The water level rose.
высыхать | verb | to dry up | Озеро высыхает. | | vy-sy-KHAT | The lake is drying up.
орошение | noun | irrigation | Воду берут на орошение полей. | | a-ra-SHE-nee-ye | Water is taken to irrigate the fields.
плотина | noun | dam | На реке построили плотину. | | pla-TEE-na | A dam was built on the river.
последствие | noun | consequence | Последствия были серьёзными. | | pas-LYETST-vee-ye | The consequences were serious.
катастрофа | noun | catastrophe, disaster | Это экологическая катастрофа. | | ka-tas-TRO-fa | This is an environmental disaster.
восстановление | noun | restoration, recovery | Восстановление леса займёт годы. | | vas-sta-nav-LYE-nee-ye | Restoring the forest will take years.
угроза | noun | threat | Засуха — угроза для урожая. | | oog-RO-za | Drought is a threat to the harvest.`],
      g: ['Because of, thanks to, as a result, lead to', '<table><tr><th>Pattern</th><th>Use</th><th>Example</th></tr><tr><td><b>из-за того что</b></td><td>a bad cause</td><td><b>Из-за того что</b> воду забирали, море высохло.</td></tr><tr><td><b>благодаря тому что</b></td><td>a good cause</td><td><b>Благодаря тому что</b> построили плотину, вода вернулась.</td></tr><tr><td><b>вследствие</b> + the “of” ending</td><td>formal: as a result of</td><td><b>Вследствие</b> засух<b>и</b> урожай погиб.</td></tr><tr><td><b>привести к</b> + the “to” ending</td><td>to lead to</td><td>Это <b>привело к</b> катастроф<b>е</b>.</td></tr><tr><td><b>так что</b></td><td>so (result)</td><td>Воды стало меньше, <b>так что</b> рыба исчезла.</td></tr></table><ul><li>With a noun use the short forms from B1: <b>из-за</b> дождя, <b>благодаря</b> помощи.</li><li>With a whole sentence add <b>того что</b> or <b>тому что</b>.</li><li>For many things: привести к серьёзн<b>ым</b> последстви<b>ям</b>.</li></ul>', [
        k.mc('Море высохло ___ того, что воду брали на поля.', ['из-за', 'для', 'после'], 0),
        k.mc('___ тому что построили плотину, вода вернулась.', ['Благодаря', 'Из-за', 'Вследствие'], 0),
        k.mc('Это привело ___ катастрофе.', ['к', 'в', 'на'], 0),
        k.mc('Воды стало меньше, так ___ рыба исчезла.', ['что', 'как', 'бы'], 0),
        k.mc('Это привело к серьёзным ___.', ['последствиям', 'последствия', 'последствий'], 0),
        k.ord('Это привело к серьёзным последствиям')]],
      r: ['The sea that is coming back', 'В середине двадцатого века Аральское море было одним из самых больших озёр мира. Здесь ловили рыбу, работали порты, отдыхали туристы.\n\nС 1960-х годов воду рек, впадающих в море, стали забирать на орошение полей. Вследствие этого уровень воды начал падать. Море высыхало год за годом, и рыбацкие города оказались в десятках километров от берега. Из-за того что дно стало пустыней, ветер разносил соль и пыль. Это привело к экологической катастрофе и серьёзным последствиям для здоровья людей.\n\nВ 2005 году в Казахстане была построена плотина Кокарал. Благодаря тому что вода перестала уходить на юг, северная часть моря начала восстанавливаться. Уровень воды поднялся, вернулась рыба, а берег стал ближе к городу Аральску.\n\nПолное восстановление моря невозможно. Но Северный Арал показывает: даже большую угрозу можно уменьшить, если действовать вместе.\n\n(впадающих = flowing into · рыбацкий = fishing · дно = the sea bed · разносил = carried · уменьшить = to reduce · действовать = to act)', [
        k.mc('Why did the sea begin to dry up?', ['River water was taken to irrigate fields.', 'It stopped raining.', 'A dam broke.'], 0), k.mc('When was the Kokaral dam built?', ['in 2005', 'in 1960', 'in 1991'], 0), k.mc('Which part of the sea is recovering?', ['the northern part', 'the southern part', 'the whole sea'], 0), k.tf('The text says the whole sea will be fully restored.', false)]] },

    { id: 'u9', t: 'Заменит ли меня робот? Work and machines', topic: 'Technology',
      v: ['Jobs of the future', `
автоматизация | noun | automation | Автоматизация меняет заводы. | | af-ta-ma-tee-ZA-tsee-ya | Automation is changing factories.
нейросеть | noun | neural network | Нейросеть написала этот текст. | | ney-ra-SYET | A neural network wrote this text.
рынок труда | noun | job market | Рынок труда быстро меняется. | | RY-nak troo-DA | The job market is changing fast.
переобучение | noun | retraining | Он прошёл переобучение. | | pee-ree-a-boo-CHE-nee-ye | He went through retraining.
творческий | adjective | creative | Это творческая профессия. | | TVOR-chees-kee | This is a creative profession.
рутинный | adjective | routine | Программа делает рутинную работу. | | roo-TEEN-ny | The program does the routine work.
предсказать | verb | to predict | Трудно предсказать будущее. | | preet-ska-ZAT | It is hard to predict the future.
востребованный | adjective | in demand | Это востребованная профессия. | | vas-TRYE-ba-van-ny | This profession is in demand.
угрожать | verb | to threaten | Что угрожает моей работе? | | oog-ra-ZHAT | What threatens my job?
приспособиться | verb | to adapt | Нужно приспособиться к новому. | | pree-spa-SO-beet-sa | You need to adapt to what is new.`],
      g: ['Whatever, however, wherever: бы ни', '<p>A question word + <b>бы</b> + <b>ни</b> + the past form means <i>whatever, however, wherever</i>. The verb looks past, but the meaning is general.</p><table><tr><th>Pattern</th><th>Meaning</th><th>Example</th></tr><tr><td><b>что бы … ни</b></td><td>whatever</td><td><b>Что бы</b> он <b>ни</b> делал, у него всё получается.</td></tr><tr><td><b>как бы … ни</b></td><td>however</td><td><b>Как бы</b> трудно <b>ни</b> было, я не сдамся.</td></tr><tr><td><b>где бы … ни</b></td><td>wherever</td><td><b>Где бы</b> я <b>ни</b> жил, я помню дом.</td></tr><tr><td><b>какой бы … ни</b></td><td>however, whatever kind of</td><td><b>Какой бы</b> умной <b>ни</b> была машина, она не заменит врача.</td></tr></table><ul><li>It is <b>ни</b>, not <b>не</b>. Here <b>ни</b> does not make the sentence negative.</li><li>A phrase to remember: <b>что бы ни случилось</b> = whatever happens.</li></ul>', [
        k.mc('Что бы он ___ делал, у него всё получается.', ['ни', 'не', 'нет'], 0),
        k.mc('Как ___ трудно ни было, я не сдамся.', ['бы', 'был', 'будет'], 0),
        k.mc('Где бы я ни ___, я помню дом.', ['жил', 'живу', 'буду жить'], 0),
        k.mc('___ бы умной ни была машина, она не заменит врача.', ['Какой', 'Что', 'Где'], 0),
        k.mc('“whatever happens” = …', ['что бы ни случилось', 'что не случилось', 'что-нибудь случилось'], 0),
        k.ord('Как бы трудно ни было я не сдамся')]],
      r: ['Will a robot take my job?', 'Дана двенадцать лет работала бухгалтером. Когда её фирма начала автоматизацию, половину её рутинных задач стала выполнять программа. «Сначала я испугалась, — вспоминает Дана. — Мне казалось, что нейросеть угрожает моей профессии».\n\nЭксперты пытаются предсказать, какие профессии исчезнут. Но что бы они ни говорили, одно ясно: рынок труда меняется быстрее, чем раньше. Какой бы умной ни была машина, она плохо справляется с творческими задачами и с общением с людьми.\n\nДана решила не ждать. Она прошла переобучение и стала финансовым аналитиком. Теперь программа считает, а Дана объясняет клиентам, что значат цифры.\n\n«Как бы трудно ни было учиться в сорок лет, это лучше, чем бояться, — говорит она. — Востребованным остаётся тот, кто умеет приспособиться».\n\n(выполнять = to carry out · пытаются = try · справляется с = copes with · аналитик = analyst · цифры = figures)', [
        k.mc('What was Dana’s job for twelve years?', ['accountant', 'programmer', 'analyst'], 0), k.mc('What did the program take over?', ['half of her routine tasks', 'all of her work', 'her talks with clients'], 0), k.mc('What do machines do badly, according to the text?', ['creative tasks and talking with people', 'counting', 'routine work'], 0), k.mc('What is Dana’s job now?', ['financial analyst', 'teacher', 'manager of a factory'], 0)]] },

    { id: 'u10', t: 'Учиться никогда не поздно. Learning for life', topic: 'Education',
      v: ['How we learn', `
система образования | noun | education system | Система образования меняется. | | sees-TYE-ma ab-ra-za-VA-nee-ya | The education system is changing.
учебная программа | noun | curriculum, syllabus | В учебной программе новый предмет. | | oo-CHEB-na-ya pra-GRA-ma | There is a new subject in the curriculum.
непрерывное обучение | noun | lifelong learning | Непрерывное обучение стало нормой. | | nee-pree-RYV-na-ye a-boo-CHE-nee-ye | Lifelong learning has become the norm.
самообразование | noun | self-education | Он занимается самообразованием. | | sa-ma-ab-ra-za-VA-nee-ye | He educates himself.
оценивать | verb | to assess | Учитель оценивает работу. | | a-TSE-nee-vat | The teacher assesses the work.
зубрить | verb | to learn by rote, to cram | Не нужно зубрить правила. | | zoob-REET | There is no need to cram rules.
понимание | noun | understanding | Важно понимание, а не память. | | pa-nee-MA-nee-ye | Understanding matters, not memory.
подход | noun | approach | Нужен новый подход. | | pat-KHOT | A new approach is needed.
мотивировать | verb | to motivate | Хорошие задачи мотивируют. | | ma-tee-VEE-ra-vat | Good tasks motivate.
дистанционный | adjective | distance, remote | Это дистанционный курс. | | dees-tan-tsee-ON-ny | This is a distance course.`],
      g: ['No time to, nothing to, nobody to: некогда, нечего, некого', '<p>These words begin with stressed <b>не-</b> and go with the dictionary form of the verb. They mean that something is <b>impossible because there is no time, thing, person or place</b>.</p><table><tr><th>Word</th><th>Meaning</th><th>Example</th></tr><tr><td><b>некогда</b></td><td>there is no time to</td><td>Мне <b>некогда</b> отдыхать.</td></tr><tr><td><b>нечего</b></td><td>there is nothing to</td><td>Здесь <b>нечего</b> делать.</td></tr><tr><td><b>некого</b></td><td>there is nobody to</td><td>Мне <b>некого</b> спросить.</td></tr><tr><td><b>негде, некуда</b></td><td>there is nowhere to (be / go)</td><td>Нам <b>некуда</b> идти.</td></tr><tr><td><b>не с кем</b></td><td>there is nobody to … with</td><td>Ему <b>не с кем</b> поговорить.</td></tr></table><ul><li>The person is in the “to” form: <b>мне, ему, нам</b>.</li><li>Past: Мне <b>было</b> некогда. Future: Мне <b>будет</b> некогда.</li><li>Compare B1: Я <b>ничего не</b> делаю. (I do nothing.) / Мне <b>нечего</b> делать. (I have nothing to do.)</li></ul>', [
        k.mc('Мне ___ отдыхать: много работы.', ['некогда', 'никогда', 'негде'], 0),
        k.mc('Здесь ___ делать.', ['нечего', 'ничего', 'никого'], 0),
        k.mc('Нам ___ идти.', ['некуда', 'никуда', 'нигде'], 0),
        k.mc('Ему не ___ поговорить.', ['с кем', 'с никем', 'кого'], 0),
        k.mc('Я ___ не видел.', ['ничего', 'нечего', 'некуда'], 0),
        k.ord('Мне некогда отдыхать')]],
      r: ['It is never too late to learn', 'Болату пятьдесят два года. Тридцать лет он работал водителем автобуса. «Мне всегда было некогда учиться, — рассказывает он. — Семья, работа, дом. А когда дети выросли, оказалось, что вечерами мне нечего делать».\n\nСын посоветовал ему дистанционный курс программирования. Первые месяцы были тяжёлыми. Болату не с кем было посоветоваться: в группе все были моложе в два раза. В школе он привык зубрить, а здесь требовалось понимание.\n\nПреподаватель нашёл к нему особый подход: он давал задачи из жизни. Например, написать программу расписания автобусов. Это мотивировало лучше, чем оценки.\n\nЧерез полтора года Болат получил первую работу в IT. Он считает, что система образования должна учить не фактам, а умению учиться. «Непрерывное обучение — не мода. Сегодня без него некуда двигаться».\n\n(посоветовал = advised · посоветоваться = to ask for advice · особый = special · умение = ability · двигаться = to move)', [
        k.mc('What was Bolat’s job for thirty years?', ['bus driver', 'teacher', 'programmer'], 0), k.mc('Who suggested the course?', ['his son', 'his boss', 'his teacher'], 0), k.mc('Why were the first months hard?', ['He had nobody to ask, and the group was much younger.', 'The course was too expensive.', 'He had no computer.'], 0), k.mc('Which task motivated him?', ['a program for a bus timetable', 'a game', 'a website for a school'], 0)]] },

    { id: 'u11', t: 'Зачем мы читаем. Why we read', topic: 'Culture',
      v: ['Books and readers', `
чтение | noun | reading | Чтение развивает ум. | | CHTYE-nee-ye | Reading develops the mind.
литература | noun | literature | Я люблю русскую литературу. | | lee-tee-ra-TOO-ra | I love Russian literature.
электронная книга | noun | e-book | Я читаю электронную книгу. | | e-leek-TRON-na-ya KNEE-ga | I am reading an e-book.
воображение | noun | imagination | У ребёнка богатое воображение. | | va-ab-ra-ZHE-nee-ye | The child has a rich imagination.
повествование | noun | narrative | Повествование идёт от первого лица. | | pa-veest-va-VA-nee-ye | The narrative is in the first person.
перечитать | verb | to reread | Я хочу перечитать этот роман. | | pee-ree-chee-TAT | I want to reread this novel.
жанр | noun | genre | Мой любимый жанр — детектив. | | zhanr | My favourite genre is the detective story.
отрывок | noun | extract, passage | Прочитайте отрывок вслух. | | at-RY-vak | Read the passage aloud.
цитата | noun | quotation | Это известная цитата. | | tsee-TA-ta | This is a well-known quotation.
сосредоточиться | verb | to concentrate | Мне трудно сосредоточиться. | | sas-ree-da-TO-cheet-sa | I find it hard to concentrate.`],
      g: ['Read again, read to the end, get lost in a book: beginnings that change the meaning', '<table><tr><th>Beginning</th><th>It adds…</th><th>Examples</th></tr><tr><td><b>пере-</b></td><td>again</td><td><b>пере</b>читать (to reread), <b>пере</b>писать (to rewrite), <b>пере</b>делать (to redo)</td></tr><tr><td><b>до-</b></td><td>to the end</td><td><b>до</b>читать (to finish reading), <b>до</b>писать (to finish writing)</td></tr><tr><td><b>недо-</b></td><td>not enough</td><td><b>недо</b>оценить (to underestimate), <b>недо</b>спать (not to get enough sleep)</td></tr><tr><td><b>за-</b> … <b>-ся</b></td><td>to get lost in it</td><td><b>за</b>читать<b>ся</b> (to be absorbed in reading), <b>за</b>думать<b>ся</b> (to be lost in thought)</td></tr><tr><td><b>на-</b> … <b>-ся</b></td><td>as much as you want</td><td><b>на</b>читать<b>ся</b> (to read your fill), <b>на</b>говорить<b>ся</b> (to talk your fill)</td></tr></table><ul><li>Я хочу <b>перечитать</b> эту книгу. = I want to read this book again.</li><li>Он <b>зачитался</b> и опоздал. = He got lost in his book and was late.</li><li>Мы <b>недооценили</b> его. = We underestimated him.</li></ul>', [
        k.mc('Я хочу ___ эту книгу ещё раз.', ['перечитать', 'дочитать', 'начитаться'], 0),
        k.mc('Осталось десять страниц. Я хочу ___ книгу сегодня.', ['дочитать', 'перечитать', 'зачитаться'], 0),
        k.mc('Он ___ и пропустил свою остановку.', ['зачитался', 'начитался', 'перечитал'], 0),
        k.mc('Мы ___ этого писателя: он гений.', ['недооценили', 'дочитали', 'начитались'], 0),
        k.mc('За каникулы я ___ на весь год.', ['начитался', 'зачитался', 'недочитал'], 0),
        k.ord('Я хочу перечитать эту книгу')]],
      r: ['A club in a village library', 'Когда Сауле стала библиотекарем в небольшом селе, в библиотеку почти никто не ходил. «Все говорили, что молодёжь больше не читает, — вспоминает она. — Но я думаю, что мы их недооценили».\n\nСауле открыла читательский клуб. Правило было одно: каждый приносит любимый отрывок и объясняет, почему он важен. Жанр не имел значения — фантастика, стихи, даже комиксы.\n\nПервым пришёл девятиклассник Алмас. Он признался, что зачитался электронной книгой и опоздал на автобус. Потом пришли его друзья. Через год в клубе было тридцать человек.\n\n«Чтение развивает воображение и учит сосредоточиться, — говорит Сауле. — Ребята начали перечитывать книги из школьной программы и находить в них новое».\n\nНа стене библиотеки теперь висит цитата, выбранная клубом: «Дочитав хорошую книгу, ты уже немного другой человек».\n\n(библиотекарь = librarian · не имел значения = did not matter · фантастика = science fiction · ребята = the youngsters)', [
        k.mc('What is Saule’s job?', ['librarian', 'teacher', 'writer'], 0), k.mc('What was the club’s one rule?', ['Bring a favourite passage and explain why it matters.', 'Read one book a week.', 'Read only the classics.'], 0), k.mc('Why was Almas late for the bus?', ['He was lost in an e-book.', 'He was at the club.', 'He overslept.'], 0), k.mc('How many members did the club have after a year?', ['thirty', 'nine', 'three'], 0)]] },

    { id: 'u12', t: 'Честная игра. Fair play', topic: 'Sport',
      v: ['Sport and honesty', `
честная игра | noun | fair play | Мы за честную игру. | | CHES-na-ya eeg-RA | We are for fair play.
допинг | noun | doping | Спортсмена наказали за допинг. | | DO-peenk | The athlete was punished for doping.
дисквалификация | noun | disqualification | Ему грозит дисквалификация. | | dees-kva-lee-fee-KA-tsee-ya | He faces disqualification.
соперник | noun | rival, opponent | Мой соперник очень сильный. | | sa-PYER-neek | My opponent is very strong.
судейство | noun | refereeing, judging | Судейство было справедливым. | | soo-DYEYST-va | The refereeing was fair.
жульничать | verb | to cheat | Он никогда не жульничает. | | ZHOOL-nee-chat | He never cheats.
обман | noun | deception, cheating | Это был обман. | | ab-MAN | It was cheating.
репутация | noun | reputation | У клуба хорошая репутация. | | ree-poo-TA-tsee-ya | The club has a good reputation.
достоинство | noun | dignity | Он проиграл с достоинством. | | das-TO-eenst-va | He lost with dignity.
уступить | verb | to give way, to yield | Он уступил место сопернику. | | oos-too-PEET | He gave up his place to his rival.`],
      g: ['I had to, I feel like, I cannot sleep: sentences with no “I”', '<p>For things that <b>happen to</b> you, Russian puts the person in the “to” form and the verb in the <b>оно</b> form.</p><table><tr><th>Pattern</th><th>Meaning</th><th>Example</th></tr><tr><td>мне <b>пришлось</b> + verb</td><td>I had to (once)</td><td>Мне <b>пришлось</b> остановиться.</td></tr><tr><td>мне <b>приходится</b> + verb</td><td>I have to (often)</td><td>Ему <b>приходится</b> тренироваться каждый день.</td></tr><tr><td>мне <b>хочется</b> + verb</td><td>I feel like</td><td>Мне <b>хочется</b> пить.</td></tr><tr><td>мне <b>не спится</b></td><td>I cannot sleep</td><td>Перед стартом мне <b>не спалось</b>.</td></tr><tr><td>мне <b>повезло</b></td><td>I was lucky</td><td>Нам <b>повезло</b> с погодой.</td></tr></table><ul><li>Compare: Я <b>хочу</b> победить. (my decision) / Мне <b>хочется</b> победить. (a feeling that comes to me)</li><li>Past: хотелось, приходилось, не спалось. All end in <b>-ось</b> or <b>-ло</b>.</li></ul>', [
        k.mc('Мне ___ остановиться и помочь.', ['пришлось', 'пришёл', 'приходил'], 0),
        k.mc('Перед стартом мне не ___.', ['спится', 'сплю', 'спит'], 0),
        k.mc('Ему ___ тренироваться каждый день.', ['приходится', 'приходит', 'пришёл'], 0),
        k.mc('Мне ___ пить.', ['хочется', 'хочу', 'хочет'], 0),
        k.mc('___ пришлось уйти. (she)', ['Ей', 'Она', 'Её'], 0),
        k.ord('Мне пришлось остановиться и помочь')]],
      r: ['The race he did not win', 'На городском марафоне в Алматы студент Ерлан бежал вторым. До финиша оставалось двести метров, когда его соперник, бежавший первым, упал.\n\nЕрлану не пришлось долго думать. Он остановился, помог сопернику встать и довёл его до финиша. Они пришли пятым и шестым: их обогнали другие.\n\n«Мне, конечно, хотелось победить, — говорит Ерлан. — Я готовился полгода, перед стартом мне не спалось. Но победа, полученная так, была бы обманом».\n\nВидео с марафона посмотрели миллионы людей. Многие писали, что в спорте слишком много давления, допинга и споров о судействе, и что такие истории возвращают веру в честную игру.\n\nТренер сказал: «Медаль можно выиграть в следующем году. А репутация и достоинство зарабатываются один раз».\n\nЧерез месяц Ерлану пришлось выступать в школах: дети хотели услышать его историю.\n\n(финиш = finish · упал = fell · довёл = led · обогнали = overtook · выступать = to give talks)', [
        k.mc('What place was Erlan in before his rival fell?', ['second', 'first', 'fifth'], 0), k.mc('What did Erlan do?', ['He helped his rival to the finish.', 'He ran past and won.', 'He stopped the race.'], 0), k.tf('Erlan won a medal.', false), k.mc('What did his coach say is earned only once?', ['reputation and dignity', 'a medal', 'money'], 0)]] },

    { id: 'u13', t: 'Своё дело. A business of your own', topic: 'Economy',
      v: ['Running a small business', `
малый бизнес | noun | small business | Малый бизнес создаёт рабочие места. | | MA-ly BEEZ-nes | Small business creates jobs.
выручка | noun | takings, revenue | Выручка выросла вдвое. | | VY-rooch-ka | Takings have doubled.
затраты | noun | costs | Затраты на аренду высокие. | | za-TRA-ty | Rent costs are high.
бизнес-план | noun | business plan | Она написала бизнес-план. | | BEEZ-nes plan | She wrote a business plan.
поставщик | noun | supplier | У нас надёжный поставщик. | | pas-taf-SHCHEEK | We have a reliable supplier.
заказчик | noun | customer, client (who orders) | Заказчик доволен работой. | | za-KAS-cheek | The client is pleased with the work.
окупиться | verb | to pay for itself | Бизнес окупился через год. | | a-koo-PEET-sa | The business paid for itself in a year.
вложить | verb | to invest, to put in | Он вложил деньги в магазин. | | vla-ZHYT | He invested money in the shop.
арендовать | verb | to rent, to lease | Мы арендуем офис. | | a-reen-da-VAT | We rent an office.
расширить | verb | to expand | Она хочет расширить дело. | | ras-SHY-reet | She wants to expand the business.`],
      g: ['Depend on, take part in, invest in: verbs and their small words', '<p>Many verbs always take the same small word and ending. Learn them together.</p><table><tr><th>Verb</th><th>Small word + ending</th><th>Example</th></tr><tr><td>зависеть</td><td><b>от</b> + “of” ending</td><td>Успех зависит <b>от</b> качеств<b>а</b>.</td></tr><tr><td>отказаться</td><td><b>от</b> + “of” ending</td><td>Она отказалась <b>от</b> отпуск<b>а</b>.</td></tr><tr><td>влиять</td><td><b>на</b> + object ending</td><td>Цены влияют <b>на</b> спрос.</td></tr><tr><td>рассчитывать, надеяться</td><td><b>на</b> + object ending</td><td>Я рассчитываю <b>на</b> ваш<b>у</b> помощь.</td></tr><tr><td>вложить</td><td><b>в</b> + object ending</td><td>Он вложил деньги <b>в</b> фургон.</td></tr><tr><td>участвовать</td><td><b>в</b> + place ending</td><td>Мы участвуем <b>в</b> ярмарк<b>е</b>.</td></tr><tr><td>заниматься</td><td>“work as” ending, no small word</td><td>Она занимается бизнес<b>ом</b>.</td></tr></table>', [
        k.mc('Успех зависит ___ качества.', ['от', 'на', 'в'], 0),
        k.mc('Цены влияют ___ спрос.', ['на', 'от', 'в'], 0),
        k.mc('Она занимается ___.', ['бизнесом', 'бизнес', 'бизнеса'], 0),
        k.mc('Мы участвуем ___ ярмарке.', ['в', 'на', 'от'], 0),
        k.mc('Она отказалась ___ отпуска.', ['от', 'в', 'на'], 0),
        k.ord('Успех зависит от качества')]],
      r: ['A bakery on wheels', 'Три года назад Айгуль продавала пироги на рынке. Выручка зависела от погоды: в дождь покупателей не было. Тогда ей пришла идея — пекарня в фургоне, которая сама приезжает к людям.\n\nАйгуль написала бизнес-план и вложила все сбережения в старый фургон. Ей пришлось отказаться от отпуска на два года. Родственники сомневались, но она рассчитывала на постоянных клиентов.\n\nСначала затраты были выше доходов. Айгуль нашла надёжного поставщика муки и начала участвовать в городских ярмарках. Через год бизнес окупился.\n\nСегодня у неё три фургона и первый крупный заказчик — сеть кофеен. Она арендовала цех и хочет расширить дело.\n\n«Малый бизнес — это не только деньги, — говорит Айгуль. — Он влияет на жизнь района. Люди выходят из дома на запах свежего хлеба и разговаривают друг с другом».\n\n(фургон = van · постоянный = regular · ярмарка = fair · крупный = large · сеть кофеен = chain of coffee shops · цех = workshop · запах = smell)', [
        k.mc('Where did Aigul sell her pies before?', ['at the market', 'in a café', 'online'], 0), k.mc('What did she put her savings into?', ['an old van', 'a new shop', 'a coffee machine'], 0), k.mc('When did the business pay for itself?', ['after a year', 'after a month', 'after five years'], 0), k.mc('Who is her first large client?', ['a chain of coffee shops', 'a school', 'the market'], 0)]] },

    { id: 'u14', t: 'Два дома. Two homes', topic: 'Migration',
      v: ['Living in another country', `
эмиграция | noun | emigration | Эмиграция — трудное решение. | | e-mee-GRA-tsee-ya | Emigration is a hard decision.
переезд | noun | move (to a new home) | Переезд занял неделю. | | pee-ree-YEST | The move took a week.
адаптация | noun | adaptation, settling in | Адаптация заняла год. | | a-dap-TA-tsee-ya | Settling in took a year.
тоска по дому | noun | homesickness | Её мучает тоска по дому. | | tas-KA pa DO-moo | She suffers from homesickness.
чужой | adjective | strange, not your own | Это чужой для меня город. | | choo-ZHOY | This city is strange to me.
вид на жительство | noun | residence permit | Она получила вид на жительство. | | veet na ZHY-teel-stva | She received a residence permit.
диаспора | noun | diaspora | В городе большая казахская диаспора. | | dee-AS-pa-ra | There is a large Kazakh diaspora in the city.
корни | noun | roots | Он не забывает свои корни. | | KOR-nee | He does not forget his roots.
ностальгия | noun | nostalgia | Иногда у меня ностальгия. | | nas-tal-GEE-ya | Sometimes I feel nostalgia.
интегрироваться | verb | to integrate | Трудно интегрироваться без языка. | | een-teg-REE-ra-vat-sa | It is hard to integrate without the language.`],
      g: ['Time flies, an idea came to me: verbs of motion in set phrases', '<p>Verbs of motion are used in many phrases that have nothing to do with walking.</p><table><tr><th>Phrase</th><th>Meaning</th><th>Example</th></tr><tr><td><b>время идёт / летит</b></td><td>time passes / flies</td><td>Как быстро <b>летит</b> время!</td></tr><tr><td><b>прийти в голову</b></td><td>to occur to someone</td><td>Мне <b>пришла в голову</b> идея.</td></tr><tr><td><b>выйти из себя</b></td><td>to lose your temper</td><td>Он <b>вышел из себя</b>.</td></tr><tr><td><b>вести себя</b></td><td>to behave</td><td>Дети хорошо <b>вели себя</b>.</td></tr><tr><td><b>войти в положение</b></td><td>to understand someone’s situation</td><td><b>Войдите в моё положение</b>.</td></tr><tr><td><b>пройти</b> (о боли, времени)</td><td>to pass, to go away</td><td>Тоска не <b>проходит</b>.</td></tr></table><ul><li>The verb still changes in the usual way: идея <b>пришла</b>, мысли <b>пришли</b>.</li><li>The person is in the “to” form with <b>прийти в голову</b>: <b>мне, ему, нам</b>.</li></ul>', [
        k.mc('Как быстро ___ время!', ['летит', 'едет', 'плывёт'], 0),
        k.mc('Мне ___ в голову интересная идея.', ['пришла', 'вошла', 'дошла'], 0),
        k.mc('Он ___ из себя и начал кричать.', ['вышел', 'ушёл', 'пришёл'], 0),
        k.mc('Дети хорошо ___ себя.', ['вели', 'шли', 'несли'], 0),
        k.mc('“to understand someone’s situation” = …', ['войти в положение', 'выйти из себя', 'прийти в голову'], 0),
        k.ord('Мне пришла в голову интересная идея')]],
      r: ['Two homes', 'Айгерим уехала в Германию пять лет назад, чтобы учиться в университете. Сейчас у неё есть работа и вид на жительство. Время летит, но тоска по дому не проходит.\n\n«Первые месяцы я вела себя как гостья, — рассказывает она. — Всё казалось чужим: язык, еда, даже тишина по воскресеньям. Мне не раз приходило в голову всё бросить».\n\nАдаптация шла медленно. Помогла казахская диаспора: по субботам земляки собирались, готовили бешбармак и говорили на родном языке. Но Айгерим понимала, что нельзя жить только среди своих. Она записалась в хор и нашла немецких друзей.\n\n«Интегрироваться — не значит забыть корни, — считает она. — Ностальгия осталась, но теперь это не боль, а тепло».\n\nКогда её спрашивают, где её дом, она отвечает: «У меня их два. И я счастлива, что мне не нужно выбирать».\n\n(не раз = more than once · земляки = people from the same homeland · среди своих = among your own people · хор = choir · тепло = warmth)', [
        k.mc('Why did Aigerim go to Germany?', ['to study at university', 'to get married', 'for a holiday'], 0), k.mc('What helped her settle in?', ['the Kazakh diaspora', 'a pay rise', 'a new flat'], 0), k.mc('What did she join to meet local people?', ['a choir', 'a football team', 'a book club'], 0), k.mc('What does she say about her home?', ['She has two.', 'It is only in Kazakhstan.', 'She has none.'], 0)]] },

    { id: 'u15', t: 'Три языка за одним столом. Living in two languages', topic: 'Language',
      v: ['Being bilingual', `
двуязычие | noun | bilingualism | Двуязычие — обычное дело в Казахстане. | | dvoo-ya-ZY-chee-ye | Bilingualism is usual in Kazakhstan.
билингв | noun | bilingual person | Мой сын — билингв. | | bee-LEENGF | My son is bilingual.
переключаться | verb | to switch | Она легко переключается с языка на язык. | | pee-ree-klyoo-CHAT-sa | She switches easily from one language to another.
смешивать | verb | to mix | Дети иногда смешивают языки. | | SMYE-shy-vat | Children sometimes mix languages.
государственный язык | noun | state language | Казахский — государственный язык. | | ga-soo-DARST-veen-ny ya-ZYK | Kazakh is the state language.
официальный | adjective | official | Это официальный документ. | | a-fee-tsee-AL-ny | This is an official document.
владеть | verb | to have command of | Она владеет тремя языками. | | vla-DYET | She has command of three languages.
языковая среда | noun | language environment | Языковая среда помогает учиться. | | ya-zy-KO-va-ya sree-DA | A language environment helps you learn.
передавать | verb | to pass on | Родители передают детям язык. | | pee-ree-da-VAT | Parents pass the language on to their children.
сохранять | verb | to keep, to preserve | Важно сохранять родной язык. | | sa-khra-NYAT | It is important to keep your native language.`],
      g: ['Although, as, before, after: longer joining phrases', '<table><tr><th>Phrase</th><th>Meaning</th><th>Example</th></tr><tr><td><b>несмотря на то что</b></td><td>although, in spite of the fact that</td><td><b>Несмотря на то что</b> языков три, дети их не смешивают.</td></tr><tr><td><b>по мере того как</b></td><td>as (gradually)</td><td><b>По мере того как</b> дети растут, их словарь растёт.</td></tr><tr><td><b>прежде чем</b> + verb</td><td>before</td><td><b>Прежде чем</b> ответить, она думает.</td></tr><tr><td><b>после того как</b></td><td>after</td><td><b>После того как</b> мы переехали, дети выучили язык.</td></tr><tr><td><b>при условии что</b></td><td>on condition that</td><td>Я помогу <b>при условии, что</b> ты будешь стараться.</td></tr><tr><td><b>в случае если</b></td><td>in case, if</td><td><b>В случае если</b> пойдёт дождь, урок будет в классе.</td></tr></table><ul><li><b>прежде чем</b> takes the dictionary form when the doer is the same: прежде чем <b>ответить</b>.</li><li>These phrases belong to careful speech and writing. In everyday talk people say <b>хотя, когда, если</b>.</li></ul>', [
        k.mc('___ на то что дома говорят по-казахски, дети знают русский.', ['Несмотря', 'Благодаря', 'Прежде'], 0),
        k.mc('По мере того ___ дети растут, их словарь растёт.', ['как', 'что', 'чем'], 0),
        k.mc('___ чем ответить, она думает.', ['Прежде', 'После', 'Перед'], 0),
        k.mc('Я помогу при условии, ___ ты будешь стараться.', ['что', 'как', 'если'], 0),
        k.mc('После того ___ мы переехали, дети выучили язык.', ['как', 'что', 'чем'], 0),
        k.ord('Прежде чем ответить она думает')]],
      r: ['Three languages at one table', 'В семье Сериковых говорят на трёх языках. С бабушкой — по-казахски, в школе дети учатся по-русски, а папа, преподаватель, каждый вечер читает им по-английски.\n\nНесмотря на то что языков три, дети их почти не смешивают. Семилетняя Амина легко переключается: прежде чем ответить, она смотрит, кто с ней говорит.\n\nТак было не всегда. После того как семья переехала в город, дети начали забывать казахский: вокруг была другая языковая среда. Тогда родители установили правило: дома — только казахский.\n\n«Двуязычие — это подарок, но его нужно сохранять, — говорит мама. — По мере того как дети растут, им нужны книги, песни, друзья на каждом языке».\n\nНекоторые исследования показывают, что билингвы легче переключают внимание. Но для Сериковых важнее другое: передавать детям язык бабушки — значит передавать историю семьи.\n\n(семилетняя = seven-year-old · установили = set · некоторые = some · внимание = attention)', [
        k.mc('Which language do the children speak with their grandmother?', ['Kazakh', 'Russian', 'English'], 0), k.mc('What does Amina do before she answers?', ['She looks at who is speaking to her.', 'She asks her mother.', 'She answers in English.'], 0), k.mc('What rule did the parents set?', ['only Kazakh at home', 'only Russian at school', 'no English'], 0), k.mc('Why does the grandmother’s language matter to the family?', ['It carries the family’s history.', 'It is needed for exams.', 'It is easier than Russian.'], 0)]] },

    { id: 'u16', t: 'Стена, которая заговорила. Art in the street', topic: 'Art',
      v: ['Art and the city', `
граффити | noun | graffiti | На стене граффити. | | gra-FEE-tee | There is graffiti on the wall.
роспись | noun | mural, wall painting | Художники сделали роспись стены. | | ROS-pees | The artists painted a mural on the wall.
фасад | noun | facade, front of a building | Фасад дома покрасили. | | fa-SAT | The front of the house was painted.
уличное искусство | noun | street art | Уличное искусство меняет город. | | OO-leech-na-ye ees-KOOST-va | Street art changes the city.
вандализм | noun | vandalism | Это не искусство, а вандализм. | | van-da-LEEZM | This is not art but vandalism.
украсить | verb | to decorate | Мы украсили двор цветами. | | oo-KRA-seet | We decorated the yard with flowers.
заброшенный | adjective | abandoned | Это заброшенный завод. | | za-BRO-shen-ny | This is an abandoned factory.
пространство | noun | space | Это общественное пространство. | | pras-TRANST-va | This is a public space.
эскиз | noun | sketch | Художник показал эскиз. | | es-KEES | The artist showed a sketch.
прохожий | noun | passer-by | Прохожие останавливались и смотрели. | | pra-KHO-zhee | Passers-by stopped and looked.`],
      g: ['Making new words: endings that build nouns and adjectives', '<table><tr><th>Ending</th><th>It makes…</th><th>Examples</th></tr><tr><td><b>-ость</b></td><td>a quality (from an adjective)</td><td>смелый → смел<b>ость</b> (courage), доступный → доступн<b>ость</b>, новый → нов<b>ость</b></td></tr><tr><td><b>-ение, -ание</b></td><td>an action or its result (from a verb)</td><td>украсить → украш<b>ение</b>, создать → созд<b>ание</b>, решить → реш<b>ение</b></td></tr><tr><td><b>-тель</b></td><td>the person who does it</td><td>читать → чита<b>тель</b>, жить → жи<b>тель</b>, писать → писа<b>тель</b></td></tr><tr><td><b>-ство</b></td><td>an activity or a state</td><td>искус<b>ство</b>, творче<b>ство</b>, дет<b>ство</b></td></tr><tr><td><b>-ный, -ский</b></td><td>an adjective (from a noun)</td><td>улица → улич<b>ный</b>, город → город<b>ской</b>, школа → школь<b>ный</b></td></tr></table><p>Nouns in <b>-ость</b> are “она” words; nouns in <b>-ение, -ство</b> are “оно” words; nouns in <b>-тель</b> are “он” words. Knowing the endings helps you guess new words when you read.</p>', [
        k.mc('смелый → the quality = …', ['смелость', 'смеление', 'смелитель'], 0),
        k.mc('украсить → the result = …', ['украшение', 'украсость', 'украситель'], 0),
        k.mc('читать → the person = …', ['читатель', 'читание', 'читость'], 0),
        k.mc('улица → adjective = …', ['уличный', 'улицкий', 'улицовый'], 0),
        k.mc('город → adjective = …', ['городской', 'городный', 'городовый'], 0),
        k.ord('Уличное искусство украшает город')]],
      r: ['The wall that began to speak', 'В нашем районе двадцать лет стоял заброшенный завод. Его серый фасад был покрыт надписями. Жители считали это вандализмом и просили городские власти снести здание.\n\nПрошлым летом группа молодых художников предложила другое решение. Они показали эскиз: огромная роспись с историей района — степь, первые рабочие, дети во дворе. Власти согласились, а жители собрали деньги на краски.\n\nРабота шла два месяца. Прохожие останавливались, давали советы, приносили чай. Пенсионерка Мария Ивановна, тридцать лет работавшая на этом заводе, рассказала художникам о своих коллегах — и их лица появились на стене.\n\nТеперь здесь общественное пространство: летом показывают кино, зимой заливают каток.\n\n«Уличное искусство — не украшение, — говорит одна из художниц. — Граффити может быть и вандализмом, и искусством. Разница в том, разговаривает ли стена с людьми».\n\n(серый = grey · покрыт надписями = covered in writing · снести = to pull down · рабочие = workers · заливают каток = make an ice rink · разница = difference)', [
        k.mc('What stood in the district for twenty years?', ['an abandoned factory', 'an old school', 'an empty shop'], 0), k.mc('What did the young artists propose?', ['a huge mural of the district’s history', 'pulling the building down', 'a new car park'], 0), k.mc('How long did the work take?', ['two months', 'two years', 'two weeks'], 0), k.mc('Whose faces appeared on the wall?', ['former workers of the factory', 'the city authorities', 'famous actors'], 0)]] },

    { id: 'u17', t: 'Правда или слух? Checking the news', topic: 'Media',
      v: ['News you can trust', `
ложный | adjective | false | Это ложная новость. | | LOZH-ny | This is false news.
перепроверить | verb | to double-check | Перепроверьте дату новости. | | pee-ree-pra-VYE-reet | Double-check the date of the news.
сенсация | noun | sensation | Газета искала сенсацию. | | seen-SA-tsee-ya | The newspaper was looking for a sensation.
репост | noun | repost, share | Он сделал репост записи. | | ree-POST | He reposted the post.
проверка фактов | noun | fact-checking | Проверка фактов занимает время. | | pra-VYER-ka FAK-taf | Fact-checking takes time.
опровергнуть | verb | to refute, to deny | Министр опроверг эту новость. | | a-pra-VYERG-noot | The minister denied this news.
вводить в заблуждение | verb | to mislead | Заголовок вводит в заблуждение. | | vva-DEET v za-bloozh-DYE-nee-ye | The headline is misleading.
непроверенный | adjective | unchecked, unverified | Это непроверенная информация. | | nee-pra-VYE-reen-ny | This is unverified information.
сомнительный | adjective | doubtful, dubious | Это сомнительный сайт. | | sam-NEE-teel-ny | This is a dubious website.
распространить | verb | to spread | Запись распространили за час. | | ras-pras-tra-NEET | The post was spread within an hour.`],
      g: ['They say, supposedly, according to: showing where information comes from', '<p>At B2 you must show whether you <b>know</b> something or only <b>heard</b> it.</p><table><tr><th>Word</th><th>Meaning</th><th>Example</th></tr><tr><td><b>говорят, что</b></td><td>they say that</td><td><b>Говорят, что</b> мост закроют.</td></tr><tr><td><b>якобы</b></td><td>supposedly (I doubt it)</td><td>Он <b>якобы</b> видел документ.</td></tr><tr><td><b>будто (бы)</b></td><td>that, as if (I doubt it)</td><td>Пишут, <b>будто</b> мост закроют на год.</td></tr><tr><td><b>как будто</b></td><td>as if, it seems</td><td>Мне казалось, <b>как будто</b> я помогаю.</td></tr><tr><td><b>по словам</b> + “of” ending</td><td>according to (a person)</td><td><b>По словам</b> преподавател<b>я</b>, это неправда.</td></tr><tr><td><b>согласно</b> + “to” ending</td><td>according to (a document)</td><td><b>Согласно</b> отчёт<b>у</b>, цены выросли.</td></tr></table><ul><li><b>якобы</b> and <b>будто</b> tell the listener that you do not fully believe it.</li><li><b>по словам</b> and <b>согласно</b> are neutral. They only name the source.</li></ul>', [
        k.mc('Он ___ видел документ, но я не верю.', ['якобы', 'согласно', 'по словам'], 0),
        k.mc('По словам ___, это неправда.', ['преподавателя', 'преподаватель', 'преподавателю'], 0),
        k.mc('Согласно ___, цены выросли.', ['отчёту', 'отчёта', 'отчёт'], 0),
        k.mc('Пишут, ___ мост закроют на год.', ['будто', 'согласно', 'чтобы'], 0),
        k.tf('The word “якобы” shows that the speaker is sure the news is true.', false),
        k.ord('По словам преподавателя это неправда')]],
      r: ['The post he should not have shared', 'Тимур учится на факультете журналистики. Однажды он увидел в соцсети запись: «Главный мост города закроют на год». Якобы об этом сообщил человек из администрации. Тимур сразу переслал запись друзьям. За час её распространили тысячи людей.\n\nВечером администрация опровергла слух: мост закроют только на две ночи. Тимуру было стыдно. «Мне казалось, будто я помогаю людям, — говорит он. — А я вводил их в заблуждение».\n\nНа следующий день преподаватель показала студентам три шага проверки фактов. Первый: найти первоисточник. Второй: посмотреть на дату. Третий: спросить себя, кому выгодна эта новость. По её словам, сомнительный текст часто начинается со слов «говорят» или «все уже знают».\n\nТеперь Тимур ведёт школьный кружок. Его подписчики — подростки, и первое правило кружка простое: сначала проверить, потом делиться.\n\n(соцсеть = social network · запись = post · переслал = forwarded · стыдно = ashamed · выгодна = benefits · кружок = club)', [
        k.mc('What did the post say?', ['The main bridge would close for a year.', 'The bridge had fallen.', 'A new bridge would open.'], 0), k.mc('What was true?', ['The bridge would close for two nights.', 'The bridge would close for a year.', 'Nothing would close.'], 0), k.mc('Which is NOT one of the teacher’s three steps?', ['Count the likes.', 'Find the original source.', 'Look at the date.'], 0), k.mc('What is the first rule of Timur’s club?', ['Check first, then share.', 'Share quickly.', 'Never read the news.'], 0)]] },

    { id: 'u18', t: 'Язык науки. The language of science', topic: 'Science',
      v: ['Doing research', `
предположение | noun | assumption, guess | Это только предположение. | | preed-pa-la-ZHE-nee-ye | It is only an assumption.
образец | noun | sample | Она взяла образец почвы. | | ab-ra-ZYETS | She took a soil sample.
почва | noun | soil | Здесь хорошая почва. | | POCH-va | The soil is good here.
замер | noun | measurement (taken on the spot) | Она сделала замеры на поле. | | za-MYER | She took measurements in the field.
выборка | noun | sample (set of data) | Выборка была большой. | | VY-bar-ka | The sample was large.
закономерность | noun | pattern, regularity | Мы увидели закономерность. | | za-ka-na-MYER-nast | We saw a pattern.
погрешность | noun | margin of error | Погрешность измерений небольшая. | | pa-GRESH-nast | The margin of error is small.
обоснованный | adjective | well-founded | Это обоснованный вывод. | | a-bas-NO-van-ny | This is a well-founded conclusion.
измерение | noun | measurement | Измерения делали каждый месяц. | | eez-mee-RYE-nee-ye | Measurements were taken every month.
лесополоса | noun | shelterbelt, line of trees | Лесополоса защищает поле от ветра. | | lee-sa-pa-la-SA | A shelterbelt protects the field from the wind.`],
      g: ['Is, consists of, belongs to: the verbs of formal writing', '<p>Everyday Russian has no word for <i>is</i>. Scientific and official Russian uses special verbs instead.</p><table><tr><th>Verb</th><th>Ending after it</th><th>Example</th></tr><tr><td><b>являться</b> (to be)</td><td>“work as” ending</td><td>Почва <b>является</b> природн<b>ым</b> богатств<b>ом</b>.</td></tr><tr><td><b>представлять собой</b> (to be, to look like)</td><td>object ending</td><td>Лесополоса <b>представляет собой</b> ряд деревьев.</td></tr><tr><td><b>состоять из</b> (to consist of)</td><td>“of” ending</td><td>Образец <b>состоит из</b> песк<b>а</b> и глин<b>ы</b>.</td></tr><tr><td><b>относиться к</b> (to belong to)</td><td>“to” ending</td><td>Пшеница <b>относится к</b> зернов<b>ым</b> культур<b>ам</b>.</td></tr><tr><td><b>заключаться в</b> (to lie in)</td><td>place ending</td><td>Причина <b>заключается в</b> ветр<b>е</b>.</td></tr><tr><td><b>называться</b> (to be called)</td><td>“work as” ending</td><td>Это <b>называется</b> эрози<b>ей</b>.</td></tr></table><p>In conversation say: Почва — это богатство. In a report write: Почва является богатством.</p>', [
        k.mc('Почва ___ природным богатством.', ['является', 'состоит', 'относится'], 0),
        k.mc('Образец состоит ___ песка и глины.', ['из', 'в', 'к'], 0),
        k.mc('Пшеница относится ___ зерновым культурам.', ['к', 'из', 'на'], 0),
        k.mc('Причина заключается ___ ветре.', ['в', 'из', 'к'], 0),
        k.mc('Это называется ___.', ['эрозией', 'эрозия', 'эрозию'], 0),
        k.ord('Образец состоит из песка и глины')]],
      r: ['Where did the wheat go?', 'Алия — молодой почвовед. Два года назад фермер из степного района попросил её о помощи: урожай пшеницы падал каждый год. Фермер был уверен, что причина заключается в сухой погоде.\n\nУ Алии была другая гипотеза: проблема не в воде, а в ветре, который уносит верхний слой почвы. Чтобы проверить её, она взяла двести образцов с разных полей и целый год вела наблюдение.\n\nВыборка показала закономерность. На полях, защищённых лесополосой, почва оставалась на месте, и урожай был выше. На открытых полях ветер уносил её весной. Алия учла и погрешность измерений: разница была слишком большой, чтобы быть случайной.\n\nЕё вывод был обоснованным, и фермер посадил деревья вокруг всех полей. «Наука — это не мнение, — говорит Алия. — Наука состоит из вопросов, проверок и честных цифр».\n\n(почвовед = soil scientist · уносит = carries away · слой = layer · учла = took into account · случайный = by chance)', [
        k.mc('What did the farmer think the cause was?', ['dry weather', 'the wind', 'bad seeds'], 0), k.mc('What was Aliya’s hypothesis?', ['The wind was carrying the top soil away.', 'There was too much water.', 'The farmer planted too late.'], 0), k.mc('How many samples did she take?', ['two hundred', 'twenty', 'two thousand'], 0), k.mc('What did the farmer do in the end?', ['planted trees around all the fields', 'sold the farm', 'stopped growing wheat'], 0)]] },

    { id: 'u19', t: 'Только сегодня! How advertising works', topic: 'Advertising',
      v: ['Selling and persuading', `
рекламный ролик | noun | advert, commercial | Этот рекламный ролик очень короткий. | | reek-LAM-ny RO-leek | This advert is very short.
торговая марка | noun | trademark, brand name | Это известная торговая марка. | | tar-GO-va-ya MAR-ka | This is a well-known brand name.
слоган | noun | slogan | У компании новый слоган. | | SLO-gan | The company has a new slogan.
целевая аудитория | noun | target audience | Наша целевая аудитория — студенты. | | tsee-lee-VA-ya a-oo-dee-TO-ree-ya | Our target audience is students.
убеждать | verb | to persuade, to convince | Реклама убеждает нас покупать. | | oo-beezh-DAT | Advertising persuades us to buy.
уловка | noun | trick | Это старая уловка продавцов. | | oo-LOF-ka | It is an old sellers’ trick.
соблазн | noun | temptation | Трудно бороться с соблазном. | | sab-LAZN | It is hard to fight temptation.
импульсивная покупка | noun | impulse purchase | Это была импульсивная покупка. | | eem-pool-SEEV-na-ya pa-KOOP-ka | It was an impulse purchase.
внушать | verb | to instil, to make someone believe | Реклама внушает нам страх. | | vnoo-SHAT | Advertising instils fear in us.
лояльность | noun | loyalty | Бренды ценят лояльность клиентов. | | la-YAL-nast | Brands value customer loyalty.`],
      g: ['Little words with big meanings: ведь, же, разве, неужели, даже, лишь', '<p>These short words do not change. They show your <b>attitude</b>.</p><table><tr><th>Word</th><th>What it does</th><th>Example</th></tr><tr><td><b>ведь</b></td><td>“after all, you know” (gives a reason both people know)</td><td><b>Ведь</b> это почти десять тысяч.</td></tr><tr><td><b>же</b></td><td>makes the word before it stronger</td><td>Где <b>же</b> граница? Я <b>же</b> говорил!</td></tr><tr><td><b>разве</b></td><td>a question when you think the answer is no</td><td><b>Разве</b> магазин завтра закроется?</td></tr><tr><td><b>неужели</b></td><td>a question that shows surprise</td><td><b>Неужели</b> так просто?</td></tr><tr><td><b>даже</b></td><td>even</td><td>Работает <b>даже</b> запах хлеба.</td></tr><tr><td><b>лишь</b></td><td>only (a little more formal than только)</td><td>Я пользовался ею <b>лишь</b> два раза.</td></tr></table><ul><li><b>же</b> always comes <b>after</b> the word it makes stronger.</li><li><b>разве</b> and <b>неужели</b> stand at the start of the question.</li></ul>', [
        k.mc('___ магазин завтра закроется? (I do not think so.)', ['Разве', 'Ведь', 'Даже'], 0),
        k.mc('___ так просто? (I am surprised.)', ['Неужели', 'Лишь', 'Же'], 0),
        k.mc('Работает ___ запах хлеба.', ['даже', 'разве', 'неужели'], 0),
        k.mc('Я пользовался ею ___ два раза.', ['лишь', 'же', 'разве'], 0),
        k.mc('Где ___ граница?', ['же', 'лишь', 'ведь'], 0),
        k.ord('Я пользовался ею лишь два раза')]],
      r: ['Only today!', 'Данияр десять лет работает в рекламе. Он знает, как бренды убеждают нас покупать.\n\n«Посмотрите на цену: 9 990 тенге. Ведь это почти десять тысяч, но мозг видит девять, — объясняет он. — А слова „только сегодня“? Разве завтра магазин закроется? Нет, но мы спешим».\n\nПо его словам, работает всё: медленная музыка в магазине, яркая упаковка, даже запах хлеба у входа. Каждый рекламный ролик сделан для своей целевой аудитории, а короткий слоган запоминается лучше длинного объяснения.\n\nГде же граница между рекламой и манипуляцией? Данияр считает, что честная реклама рассказывает о товаре, а нечестная навязывает страх: «У всех уже есть, лишь у тебя нет».\n\nСам он тоже не идеален: в прошлом году сделал импульсивную покупку — соковыжималку, которой пользовался лишь два раза. Теперь у него правило: подождать двадцать четыре часа. «Неужели так просто? Да. Через день половина желаний исчезает».\n\n(мозг = brain · спешим = we hurry · граница = border · соковыжималка = juicer · исчезает = disappears)', [
        k.mc('Why do shops write 9,990 and not 10,000?', ['The brain sees nine.', 'It is the law.', 'It is easier to count.'], 0), k.mc('What does dishonest advertising push on us, according to Daniyar?', ['fear', 'facts about the product', 'slow music'], 0), k.mc('What did Daniyar buy on impulse?', ['a juicer', 'a phone', 'a car'], 0), k.mc('What is his rule now?', ['Wait twenty-four hours.', 'Never go shopping.', 'Buy only today.'], 0)]] },

    { id: 'u20', t: 'Земля и вода. Land and water', topic: 'Farming',
      v: ['On the farm', `
фермерское хозяйство | noun | farm | У него небольшое фермерское хозяйство. | | FYER-meer-ska-ye kha-ZYAYST-va | He has a small farm.
урожайность | noun | yield | Урожайность выросла. | | oo-ra-ZHAY-nast | The yield has grown.
удобрение | noun | fertiliser | Он сократил удобрения. | | oo-dab-RYE-nee-ye | He cut down on fertilisers.
неурожай | noun | crop failure, bad harvest | В прошлом году был неурожай. | | nee-oo-ra-ZHAY | Last year there was a bad harvest.
капельный полив | noun | drip irrigation | Капельный полив экономит воду. | | KA-peel-ny pa-LEEF | Drip irrigation saves water.
пастбище | noun | pasture | Коровы на пастбище. | | PAST-bee-shche | The cows are in the pasture.
посев | noun | sowing; sown crop | Посев начинается в мае. | | pa-SYEF | Sowing begins in May.
сорняк | noun | weed | В огороде много сорняков. | | sar-NYAK | There are a lot of weeds in the vegetable garden.
плодородный | adjective | fertile | Здесь плодородная земля. | | pla-da-ROD-ny | The land here is fertile.
кооператив | noun | cooperative | Фермеры создали кооператив. | | ka-a-pee-ra-TEEF | The farmers set up a cooperative.`],
      g: ['If it were not for…, otherwise', '<table><tr><th>Pattern</th><th>Meaning</th><th>Example</th></tr><tr><td><b>если бы не</b> + noun (dictionary form), … <b>бы</b> + past</td><td>if it were not for, but for</td><td><b>Если бы не</b> орошени<b>е</b>, мы <b>бы потеряли</b> урожай.</td></tr><tr><td><b>иначе</b></td><td>otherwise</td><td>Мне пришлось рискнуть, <b>иначе</b> хозяйство не выжило бы.</td></tr><tr><td><b>а то</b></td><td>or else (everyday speech)</td><td>Поливай чаще, <b>а то</b> всё засохнет.</td></tr><tr><td><b>в противном случае</b></td><td>otherwise (formal)</td><td>Заплатите до пятницы, <b>в противном случае</b> договор закончится.</td></tr></table><ul><li>After <b>если бы не</b> the noun stays in its dictionary form: если бы не <b>дождь</b>, если бы не <b>ты</b>, если бы не <b>соседи</b>.</li><li>The second half has <b>бы</b> + past, as in B1, Unit 8.</li><li>It can be good news or bad news: Если бы не ты, я бы опоздал. (Thanks to you I was on time.) / Если бы не дождь, мы бы гуляли. (Because of the rain we did not.)</li></ul>', [
        k.mc('Если бы ___ орошение, мы бы потеряли урожай.', ['не', 'ни', 'нет'], 0),
        k.mc('Если бы не ___, я бы опоздал.', ['ты', 'тебя', 'тебе'], 0),
        k.mc('Если бы не дождь, мы ___ гуляли.', ['бы', 'будем', 'были'], 0),
        k.mc('Поливай чаще, ___ всё засохнет.', ['а то', 'если бы', 'чтобы'], 0),
        k.mc('“Если бы не соседи, я бы не справился.” = …', ['The neighbours helped me.', 'The neighbours did not help me.', 'I have no neighbours.'], 0),
        k.ord('Если бы не орошение мы бы потеряли урожай')]],
      r: ['The dry year', 'Прошлое лето было самым сухим за двадцать лет. Засуха уничтожила посевы во многих хозяйствах района. Но поля Серика остались зелёными.\n\nДва года назад он взял кредит и провёл капельное орошение. Соседи смеялись: зачем тратить деньги, если дождь бесплатный? «Если бы не орошение, мы бы потеряли весь урожай, — говорит Серик. — Мне пришлось рискнуть, иначе хозяйство не выжило бы».\n\nОн изменил и другое: стал меньше пахать, чтобы земля держала воду, и сократил удобрения, потому что плодородная земля не любит лишней химии. Урожайность выросла не сразу — первый год был трудным, сорняков стало больше.\n\nКогда пришла засуха, Серик поделился водой с двумя соседями. Осенью они втроём создали кооператив и теперь вместе покупают технику.\n\n«Если бы не тот сухой год, мы бы до сих пор работали поодиночке», — улыбается он.\n\n(уничтожила = destroyed · капельное = drip · пахать = to plough · лишний = extra · поодиночке = each on his own)', [
        k.mc('What did Serik do two years ago?', ['He took a loan and put in drip irrigation.', 'He sold his fields.', 'He bought more cows.'], 0), k.mc('Why did the neighbours laugh?', ['They thought it was a waste of money.', 'His fields were too small.', 'He planted too early.'], 0), k.tf('The yield grew in the very first year.', false), k.mc('What did the three farmers do in the autumn?', ['They set up a cooperative.', 'They moved to the city.', 'They stopped farming.'], 0)]] },

    { id: 'u21', t: 'Начальник или лидер? Leading a team', topic: 'Work',
      v: ['Working as a team', `
подчинённый | noun | subordinate, member of your staff | У неё шесть подчинённых. | | pat-chee-NYON-ny | She has a staff of six.
делегировать | verb | to delegate | Хороший начальник умеет делегировать. | | dee-lee-GEE-ra-vat | A good boss knows how to delegate.
разногласие | noun | disagreement | У нас было разногласие. | | raz-na-GLA-see-ye | We had a disagreement.
уступка | noun | concession | Обе стороны пошли на уступки. | | oos-TOOP-ka | Both sides made concessions.
обратная связь | noun | feedback | Мне нужна обратная связь. | | ab-RAT-na-ya svyas | I need feedback.
полномочия | noun | authority, powers | У меня нет таких полномочий. | | pal-na-MO-chee-ya | I do not have that authority.
сплочённый | adjective | close-knit, united | У нас сплочённая команда. | | spla-CHON-ny | We have a close-knit team.
уволиться | verb | to resign, to quit | Он решил уволиться. | | oo-VO-leet-sa | He decided to resign.
поручение | noun | assignment, task given to someone | Я выполнил ваше поручение. | | pa-roo-CHE-nee-ye | I have carried out your assignment.
инициатива | noun | initiative | Он проявил инициативу. | | ee-nee-tsee-a-TEE-va | He showed initiative.`],
      g: ['Both … and, not only … but also, either … or: joining words in pairs', '<table><tr><th>Pair</th><th>Meaning</th><th>Example</th></tr><tr><td><b>как … так и</b></td><td>both … and</td><td><b>Как</b> опытные сотрудники, <b>так и</b> новички молчали.</td></tr><tr><td><b>не только … но и</b></td><td>not only … but also</td><td>Она <b>не только</b> проверяла, <b>но и</b> переписывала отчёты.</td></tr><tr><td><b>либо … либо</b></td><td>either … or</td><td><b>Либо</b> вы берёте задачу целиком, <b>либо</b> не берёте.</td></tr><tr><td><b>то … то</b></td><td>now … now</td><td>Она <b>то</b> сердилась, <b>то</b> винила себя.</td></tr><tr><td><b>ни … ни</b> + не</td><td>neither … nor</td><td><b>Ни</b> талант, <b>ни</b> опыт <b>не</b> заменят доверия.</td></tr></table><ul><li>Put a comma before the second half.</li><li>With <b>ни … ни</b> the verb still needs <b>не</b>.</li><li><b>либо … либо</b> is a little more formal than <b>или … или</b>.</li></ul>', [
        k.mc('Как опытные сотрудники, ___ и новички молчали.', ['так', 'но', 'то'], 0),
        k.mc('Она не только проверяла, ___ переписывала отчёты.', ['но и', 'так и', 'либо'], 0),
        k.mc('Она ___ сердилась, то винила себя.', ['то', 'ни', 'как'], 0),
        k.mc('Ни талант, ни опыт ___ заменят доверия.', ['не', 'ни', 'нет'], 0),
        k.mc('___ вы берёте задачу, либо не берёте.', ['Либо', 'Ни', 'Как'], 0),
        k.ord('Ни талант ни опыт не заменят доверия')]],
      r: ['The boss who did everything herself', 'Зарину назначили руководителем группы из шести человек. Она была лучшим специалистом отдела и решила, что хороший начальник всё делает сам. Она не только проверяла каждую мелочь, но и переписывала чужие отчёты по ночам.\n\nЧерез три месяца как опытные сотрудники, так и новички молчали на совещаниях. Двое подчинённых собирались уволиться. Зарина то сердилась, то винила себя.\n\nПомогла обратная связь. Она попросила каждого честно написать, что мешает работать. Ответы были похожи: «Нам не доверяют», «У нас нет полномочий», «Инициатива наказуема».\n\nЗарина начала делегировать: либо человек получает задачу целиком, либо не получает её вообще. Разногласия теперь обсуждают открыто и ищут компромисс.\n\nСегодня группа стала сплочённой, никто не уволился. «Ни талант, ни опыт не заменят взаимопонимания, — говорит Зарина. — Руководить — значит не делать всё самой, а помогать другим делать хорошо».\n\n(назначили = appointed · мелочь = small detail · винила = blamed · наказуема = gets punished · целиком = as a whole)', [
        k.mc('How many people are in Zarina’s group?', ['six', 'three', 'twelve'], 0), k.mc('What did she do at night?', ['rewrote other people’s reports', 'studied management', 'looked for a new job'], 0), k.mc('What did the answers have in common?', ['People felt they were not trusted.', 'People wanted more money.', 'People wanted a new office.'], 0), k.tf('In the end two people left the group.', false)]] },

    { id: 'u22', t: 'Возраст — не конец. Growing older', topic: 'Society',
      v: ['Later life', `
долголетие | noun | long life, longevity | В чём секрет долголетия? | | dal-ga-LYE-tee-ye | What is the secret of a long life?
одиночество | noun | loneliness | Она почувствовала одиночество. | | a-dee-NO-chest-va | She felt loneliness.
мудрость | noun | wisdom | Мудрость приходит с опытом. | | MOOD-rast | Wisdom comes with experience.
морщина | noun | wrinkle | У него морщины у глаз. | | mar-SHCHEE-na | He has wrinkles by his eyes.
седой | adjective | grey-haired | У дедушки седые волосы. | | see-DOY | Grandad has grey hair.
бодрый | adjective | lively, full of energy | Утром я бодрый. | | BOD-ry | In the morning I am full of energy.
ровесник | noun | person of the same age | Мы с ним ровесники. | | ra-VYES-neek | He and I are the same age.
выйти на пенсию | verb | to retire | Она вышла на пенсию в прошлом году. | | VY-tee na PYEN-see-yoo | She retired last year.
преклонный возраст | noun | old age, advanced years | Он работает и в преклонном возрасте. | | pree-KLON-ny VOZ-rast | He works even at an advanced age.
обуза | noun | burden | Я не хочу быть обузой. | | a-BOO-za | I do not want to be a burden.`],
      g: ['The most, by far, more and more: making it stronger', '<table><tr><th>Form</th><th>Meaning</th><th>Example</th></tr><tr><td><b>самый</b> + adjective</td><td>the most (B1)</td><td><b>самый</b> простой рецепт</td></tr><tr><td><b>-ейший, -айший</b></td><td>a most, extremely</td><td>прост<b>ейший</b> рецепт, важн<b>ейший</b> секрет, велич<b>айший</b> писатель</td></tr><tr><td><b>наи-</b> + лучший, худший, больший</td><td>the very best, worst, greatest (formal)</td><td><b>наи</b>лучший результат</td></tr><tr><td><b>один из самых</b> + “of” plural</td><td>one of the most</td><td><b>один из самых</b> популярн<b>ых</b> блогов</td></tr><tr><td><b>гораздо, намного</b> + comparative</td><td>much, far</td><td><b>гораздо</b> больше людей</td></tr><tr><td><b>всё</b> + comparative</td><td>more and more</td><td>Я чувствую себя <b>всё</b> бодрее.</td></tr></table><ul><li><b>-айший</b> comes after г, к, х, which change: великий → велич<b>айший</b>, высокий → высоч<b>айший</b>.</li><li>Do not say “очень лучше”. Say <b>гораздо лучше</b> or <b>намного лучше</b>.</li></ul>', [
        k.mc('Первое видео посмотрели ___ больше людей.', ['гораздо', 'очень', 'самый'], 0),
        k.mc('Я чувствую себя ___ бодрее.', ['всё', 'самый', 'очень'], 0),
        k.mc('важный → “a most important” = …', ['важнейший', 'важнее', 'важно'], 0),
        k.mc('Это один из самых ___ блогов.', ['популярных', 'популярный', 'популярные'], 0),
        k.mc('великий → …', ['величайший', 'великейший', 'величее'], 0),
        k.ord('Я чувствую себя всё бодрее')]],
      r: ['Forty thousand grandchildren', 'Розе Ахметовне семьдесят четыре года. Выйдя на пенсию, она почувствовала одиночество: дети жили далеко, ровесники болели, дни были похожи один на другой. «Мне казалось, что я стала обузой», — вспоминает она.\n\nВнучка предложила ей снять короткое видео о том, как печь баурсаки. Роза Ахметовна согласилась не сразу: седые волосы, морщины — кому это интересно? Оказалось, что очень многим. Первое видео посмотрели гораздо больше людей, чем она ожидала.\n\nСегодня у неё сорок тысяч подписчиков. Она рассказывает не только о рецептах, но и о своём детстве в ауле. Самые популярные видео — простейшие: чай, старые фотографии, истории.\n\n«Преклонный возраст — не конец, — говорит она. — Я чувствую себя всё бодрее. Говорят, секрет долголетия — в генах. А я думаю, что важнейший секрет — быть нужной. Мудрость приходит не с годами, а с вопросами, которые тебе задают».\n\n(снять видео = to film a video · баурсаки = fried dough balls · ожидала = expected · гены = genes)', [
        k.mc('How did Roza Akhmetovna feel after she retired?', ['lonely', 'very busy', 'rich'], 0), k.mc('Who suggested the first video?', ['her granddaughter', 'her son', 'a neighbour'], 0), k.mc('What was the first video about?', ['how to make baursaks', 'her childhood', 'old photographs'], 0), k.mc('What does she think is the most important secret?', ['being needed', 'good genes', 'sleeping a lot'], 0)]] },

    { id: 'u23', t: 'В связи с… Writing to an office', topic: 'Formal language',
      v: ['Official letters', `
заявитель | noun | applicant | Заявитель получил ответ. | | za-ya-VEE-teel | The applicant received an answer.
рассмотреть | verb | to consider, to examine | Просим рассмотреть наш вопрос. | | ras-smat-RYET | We ask you to consider our question.
уведомить | verb | to notify | Нас уведомили о решении. | | oo-VYE-da-meet | We were notified of the decision.
ведомство | noun | government office, department | Это ведомство отвечает за дороги. | | VYE-dams-tva | This department is responsible for roads.
должностное лицо | noun | official (person) | Письмо получило должностное лицо. | | dalzh-nast-NO-ye lee-TSO | An official received the letter.
заверить | verb | to certify | Копию нужно заверить. | | za-VYE-reet | The copy needs to be certified.
приложить | verb | to attach, to enclose | Приложите фотографии к письму. | | pree-la-ZHYT | Attach the photographs to the letter.
срок рассмотрения | noun | time allowed for a reply | Срок рассмотрения — один месяц. | | srok ras-smat-RYE-nee-ya | The time allowed for a reply is one month.
отказ | noun | refusal | Мы получили отказ. | | at-KAS | We received a refusal.
канцелярия | noun | registry, office that takes in letters | Сдайте письмо в канцелярию. | | kan-tsee-LYA-ree-ya | Hand the letter in at the registry.`],
      g: ['In connection with, in accordance with: the small words of official Russian', '<table><tr><th>Phrase</th><th>Ending after it</th><th>Example</th></tr><tr><td><b>в связи с</b> (in connection with, because of)</td><td>“with” ending</td><td><b>В связи с</b> ремонт<b>ом</b> офис закрыт.</td></tr><tr><td><b>в соответствии с</b> (in accordance with)</td><td>“with” ending</td><td><b>В соответствии с</b> план<b>ом</b> ремонт начнётся в апреле.</td></tr><tr><td><b>в течение</b> (within, during)</td><td>“of” ending</td><td>Ответ придёт <b>в течение</b> месяц<b>а</b>.</td></tr><tr><td><b>в целях</b> (for the purpose of)</td><td>“of” ending</td><td><b>В целях</b> безопасност<b>и</b> вход закрыт.</td></tr><tr><td><b>по поводу</b> (concerning)</td><td>“of” ending</td><td>Я звоню <b>по поводу</b> заявлени<b>я</b>.</td></tr><tr><td><b>на основании</b> (on the basis of)</td><td>“of” ending</td><td><b>На основании</b> договор<b>а</b> просим вернуть деньги.</td></tr></table><ul><li>Everyday speech: <b>из-за</b> ремонта, <b>по</b> плану, <b>за</b> месяц, <b>о</b> заявлении.</li><li>Official letters also like the “we ask” form: <b>Просим рассмотреть… Прошу сообщить…</b></li></ul>', [
        k.mc('В связи с ___ офис закрыт.', ['ремонтом', 'ремонта', 'ремонт'], 0),
        k.mc('Ответ придёт в течение ___.', ['месяца', 'месяцем', 'месяц'], 0),
        k.mc('В соответствии ___ планом ремонт начнётся в апреле.', ['с', 'на', 'по'], 0),
        k.mc('Я звоню по ___ заявления.', ['поводу', 'целях', 'связи'], 0),
        k.mc('Which is everyday speech?', ['из-за ремонта', 'в связи с ремонтом', 'на основании ремонта'], 0),
        k.ord('В связи с ремонтом офис закрыт')]],
      r: ['Two letters about one playground', 'Во дворе дома номер двенадцать сломалась детская площадка. Жильцы написали в акимат эмоциональное письмо: «Сколько можно ждать? Сделайте что-нибудь!» Ответа не было.\n\nСоседка Гульнара, юрист, объяснила: «Ведомство отвечает на обращения, а не на эмоции. Должностное лицо должно понять, кто пишет, о чём и чего просит».\n\nВторое письмо было другим. Оно начиналось словами: «В связи с аварийным состоянием детской площадки просим рассмотреть вопрос о её ремонте в течение месяца». Жильцы описали факты, указали даты и приложили фотографии. Копию письма они заверили подписями сорока жильцов и сдали в канцелярию.\n\nЧерез три недели их уведомили: в соответствии с планом ремонт начнётся в апреле. Отказа не было.\n\nВесной площадку починили. «Официальный стиль кажется сухим, — говорит Гульнара. — Но всего на одной странице он делает главное: показывает, что вы знаете свои права и уважаете чужое время».\n\n(детская площадка = playground · жильцы = residents · аварийное состояние = dangerous condition · указали = gave · починили = repaired)', [
        k.mc('What happened to the first letter?', ['There was no answer.', 'It was refused.', 'It was lost in the post.'], 0), k.mc('What is Gulnara’s job?', ['lawyer', 'official', 'journalist'], 0), k.mc('What did the residents attach to the second letter?', ['photographs', 'money', 'a toy'], 0), k.mc('When were they notified?', ['after three weeks', 'the next day', 'after a year'], 0)]] },

    { id: 'u24', t: 'Что я умею теперь. B2 review', topic: 'Review',
      v: ['Talking about your progress', `
беглость | noun | fluency | Беглость приходит с практикой. | | BYEG-last | Fluency comes with practice.
лексика | noun | vocabulary (of a language) | В тексте сложная лексика. | | LYEK-see-ka | The text has difficult vocabulary.
разговорная речь | noun | spoken, everyday language | Это слово из разговорной речи. | | raz-ga-VOR-na-ya ryech | This word is from everyday speech.
запинаться | verb | to stumble (in speech) | Я запинаюсь, когда волнуюсь. | | za-pee-NAT-sa | I stumble when I am nervous.
выражаться | verb | to express yourself | Он выражается ясно. | | vy-ra-ZHAT-sa | He expresses himself clearly.
усвоить | verb | to take in, to master | Я усвоил это правило. | | oos-VO-eet | I have mastered this rule.
языковой барьер | noun | language barrier | Языковой барьер можно преодолеть. | | ya-zy-ka-VOY bar-YER | The language barrier can be overcome.
подбирать слова | verb | to search for words | Я долго подбираю слова. | | pad-bee-RAT sla-VA | I take a long time to find the words.
свободно владеть | verb | to be fluent in | Она свободно владеет русским. | | sva-BOD-na vla-DYET | She is fluent in Russian.
совершенствовать | verb | to improve, to perfect | Я совершенствую свой русский. | | sa-veer-SHENST-va-vat | I am perfecting my Russian.`],
      g: ['The patterns of B2', '<p>These are the main patterns of the level. If one is not clear, go back to its unit.</p><table><tr><th>Unit</th><th>Pattern</th><th>Example</th></tr><tr><td>1, 2</td><td>participles</td><td>человек, <b>живущий</b> здесь; письмо, <b>написанное</b> вчера</td></tr><tr><td>3</td><td>verbal adverbs</td><td><b>Прочитав</b> книгу, я лёг спать.</td></tr><tr><td>4</td><td>advice</td><td>Вам <b>стоит</b> отдохнуть.</td></tr><tr><td>7, 8</td><td>longer joining phrases</td><td><b>из-за того что</b>, <b>благодаря тому что</b>, <b>в то время как</b></td></tr><tr><td>9</td><td>whatever, however</td><td><b>Как бы</b> трудно <b>ни</b> было…</td></tr><tr><td>10</td><td>no time to, nothing to</td><td>Мне <b>некогда</b> отдыхать.</td></tr><tr><td>12</td><td>sentences with no “I”</td><td>Мне <b>пришлось</b> уйти.</td></tr><tr><td>15</td><td>although, as, before</td><td><b>несмотря на то что</b>, <b>по мере того как</b>, <b>прежде чем</b></td></tr><tr><td>17</td><td>the source of information</td><td><b>якобы</b>, <b>по словам</b>, <b>согласно</b></td></tr><tr><td>20</td><td>if it were not for</td><td><b>Если бы не</b> ты, я бы опоздал.</td></tr><tr><td>21</td><td>joining words in pairs</td><td><b>не только … но и</b>, <b>ни … ни</b></td></tr><tr><td>23</td><td>official phrases</td><td><b>в связи с</b>, <b>в течение</b></td></tr></table>', [
        k.mc('Человек, ___ в этом доме, — мой сосед.', ['живущий', 'живя', 'жил'], 0),
        k.mc('___ книгу, я лёг спать.', ['Прочитав', 'Прочитанный', 'Читающий'], 0),
        k.mc('Как бы трудно ___ было, я не сдамся.', ['ни', 'не', 'нет'], 0),
        k.mc('Мне ___ уйти раньше. (I had to)', ['пришлось', 'пришёл', 'некогда'], 0),
        k.mc('Если бы не друзья, я ___ сдался.', ['бы', 'буду', 'был'], 0),
        k.ord('Если бы не друзья я бы сдался')]],
      r: ['A letter from a learner', 'Два года назад я приехал в Казахстан и не мог даже заказать чай. Вчера я полчаса спорил с коллегой о фильме — по-русски. Как бы трудно ни было, я рад, что не бросил.\n\nЧто мне помогло? Во-первых, я перестал бояться ошибок. Носители языка не смеются, когда ты запинаешься; им приятно, что ты стараешься. Во-вторых, я учил не слова, а фразы: словарный запас растёт быстрее, если слово живёт в предложении. В-третьих, я каждый день слушал живую речь, чтобы усвоить интонацию.\n\nЯзыковой барьер не исчез за один день. Он становился всё ниже по мере того, как я говорил. Если бы не друзья, которые терпеливо ждали, пока я закончу фразу, я бы сдался.\n\nДо беглости мне ещё далеко, и мне есть что совершенствовать. Но теперь я умею выражаться так, чтобы меня понимали. Это и есть навык.\n\nТом, Алматы\n\n(спорил = argued · не бросил = did not give up · терпеливо = patiently · сдался = gave up)', [
        k.mc('What could Tom not do two years ago?', ['order tea', 'read English', 'find a job'], 0), k.mc('What did he learn instead of single words?', ['phrases', 'grammar tables', 'songs'], 0), k.mc('Who helped him not to give up?', ['friends who waited patiently', 'his teacher at school', 'a phone app'], 0), k.tf('Tom says he is already completely fluent.', false)]] }
  ]);
})();
