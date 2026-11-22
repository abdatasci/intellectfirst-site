/* IF Lingo · Russian B2: an original IF Academy course for people who speak English and have finished Russian B1.
   Word lines: word | part of speech | meaning in English | example | (empty) | how to say it | the example in English.
   Plan: 24 units and a level test (project doc claude/if-lingo.md). Built so far: units 1 to 8. */
IFX.course({
  id: 'ru-b2', track: 'lang', lang: 'ru-RU', level: 'B2', next: 'C1', icon: '🇷🇺',
  title: 'Russian B2', sub: 'Confident Russian',
  blurb: 'Discuss generations, work, the media, wellbeing, tourism, consumer habits, cities and the climate, and read longer texts. The first 8 of 24 units, explained in English.',
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
        k.mc('Why did the sea begin to dry up?', ['River water was taken to irrigate fields.', 'It stopped raining.', 'A dam broke.'], 0), k.mc('When was the Kokaral dam built?', ['in 2005', 'in 1960', 'in 1991'], 0), k.mc('Which part of the sea is recovering?', ['the northern part', 'the southern part', 'the whole sea'], 0), k.tf('The text says the whole sea will be fully restored.', false)]] }
  ]);
})();
