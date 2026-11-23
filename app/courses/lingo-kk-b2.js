/* IF Lingo · Kazakh B2: an original IF Academy course for people who speak English and have finished Kazakh B1.
   Word lines: word | part of speech | meaning in English | example | (empty) | how to say it | the example in English.
   Plan: 24 units and a level test (project doc claude/if-lingo.md). Built so far: units 1 to 24. */
IFX.course({
  id: 'kk-b2', track: 'lang', lang: 'kk-KZ', level: 'B2', next: 'C1', icon: '🇰🇿',
  title: 'Kazakh B2', sub: 'Confident Kazakh',
  blurb: 'Discuss generations, work, the media, wellbeing, tourism, cities, the climate, machines at work, lifelong learning, fair play, business, migration, the news, science, advertising and official letters, and read longer texts. 24 units, explained in English.',
  units: []
});
(function () {
  var k = IFX.k;
  IFX.make('kk-b2', [
    { id: 'u1', t: 'Буындар. Generations and values', topic: 'Society',
      v: ['Values and growing up', `
құндылық | noun | value | Әр буынның өз құндылығы бар. | | qoon-dy-LYQ | Every generation has its own values.
дүниетаным | noun | world view | Кітап дүниетанымды өзгертеді. | | du-ni-ye-ta-NYM | Books change your world view.
тәрбие | noun | upbringing | Ол жақсы тәрбие алған. | | tar-bi-YE | He had a good upbringing.
ұстаным | noun | position, principle | Біздің ұстанымымыз әртүрлі. | | oos-ta-NYM | Our positions are different.
есею | verb | to grow up, to mature | Ол ерте есейді. | | e-se-YOO | She grew up early.
жастық шақ | noun | youth (the time of life) | Оның жастық шағы ауылда өтті. | | zhas-TYQ shaq | His youth was spent in a village.
бірегейлік | noun | identity | Тіл — біздің бірегейлігіміздің бір бөлігі. | | bi-re-gey-LIK | Language is part of our identity.
дербес | adjective | independent | Ол — дербес адам. | | der-BES | She is an independent person.
тәуелді болу | verb | to depend | Бәрі саған тәуелді болады. | | ta-wel-DI bo-LOO | Everything depends on you.
ықпал | noun | influence | Ата-ананың ықпалы зор. | | yq-PAL | Parents have a great influence.`],
      g: ['I know that he came: a whole sentence as an object', '<p>English uses <i>that</i>: I know <u>that he came</u>. Kazakh turns the second verb into a noun with <b>-ған</b> (done) or <b>-атын</b> (does), then adds the owner ending and the object ending.</p><table><tr><th>Who</th><th>Done: келу</th><th>Does: тұру</th></tr><tr><td>менің</td><td>кел<b>генімді</b></td><td>тұр<b>атынымды</b></td></tr><tr><td>сенің</td><td>кел<b>геніңді</b></td><td>тұр<b>атыныңды</b></td></tr><tr><td>оның</td><td>кел<b>генін</b></td><td>тұр<b>атынын</b></td></tr></table><ul><li>Мен <b>оның келгенін</b> білемін. = I know that he came.</li><li>Ол <b>менің қайда тұратынымды</b> біледі. = He knows where I live.</li><li>Сен <b>оның не айтқанын</b> естідің бе? = Did you hear what she said?</li></ul><p>Other verbs need other endings: Сенің келген<b>іңе</b> қуаныштымын. = I am glad that you came. (қуанышты + “to” ending)</p>', [
        k.mc('Мен оның кел___ білемін.', ['генін', 'ген', 'геннен'], 0),
        k.mc('Ол менің қайда тұр___ біледі.', ['атынымды', 'атын', 'ғанын'], 0),
        k.mc('Сен оның не айт___ естідің бе?', ['қанын', 'қан', 'атын'], 0),
        k.mc('Сенің кел___ қуаныштымын.', ['геніңе', 'генін', 'геніңді'], 0),
        k.tf('In “оның келгенін білемін” the ending shows that it is his or her action.', true),
        k.ord('Мен оның келгенін білемін')]],
      r: ['Three generations at one table', 'Біздің отбасымызда жексенбі күні дастарқан басына үш буын жиналады. Ауылда өскен әжем өмірдегі ең бастысы — отбасы мен үлкенді сыйлау деп санайды. Банкте жұмыс істейтін анам тұрақтылық пен білімді бағалайды. Ал мен, студент қыз, ең маңыздысы — таңдау еркіндігі деп ойлаймын.\n\nӘрине, біздің ұстанымдарымыз жиі сәйкес келмейді. Әжем менің неге тұрмысқа шығуға асықпайтынымды түсінбейді. Анам менің заңгер емес, фотограф болғым келетініне алаңдайды. Бұрын мұндай әңгімелер ұрыспен аяқталатын.\n\nБірақ жақында мен бір нәрсені түсіндім: әр буынның құндылықтары оның қандай заманда өскеніне тәуелді болады. Әжемнің жастық шағы қиын болған, сондықтан ол үшін отбасы өте маңызды. Анамның есейген кезі өзгерістер жылдарына тұспа-тұс келген, сондықтан ол тұрақтылықты іздейді.\n\nҚазір біз бір-бірімізді көбірек тыңдаймыз. Отбасында алған тәрбием өз жолымды таңдағанда да менімен бірге қалады. Дербес адам — бәрімен дауласатын адам емес, басқаларды түсінетін адам.\n\n(буын = generation · тұрақтылық = stability · бағалайды = values · сәйкес келмейді = do not coincide · асықпайтынымды = that I am in no hurry · тұспа-тұс келген = coincided with)', [
        k.mc('Where did the grandmother grow up?', ['in a village', 'in a big city', 'abroad'], 0), k.mc('What does the writer value most?', ['freedom of choice', 'stability', 'money'], 0), k.tf('The mother wants her daughter to be a photographer.', false), k.mc('What did the writer come to understand?', ['Each generation’s values depend on the time it grew up in.', 'Older people are always right.', 'Families should not talk about values.'], 0)]] },

    { id: 'u2', t: 'Жұмыстың жаңа түрі. New ways of working', topic: 'Work',
      v: ['Work today', `
қашықтан жұмыс | noun | remote work | Қашықтан жұмыс уақытты үнемдейді. | | qa-shyq-TAN zhoo-MYS | Remote work saves time.
икемді кесте | noun | flexible hours | Менің кестем икемді. | | i-kem-DI kes-TE | I have flexible hours.
ынтымақтастық | noun | cooperation | Ынтымақтастығыңызға рақмет. | | yn-ty-maq-tas-TYQ | Thank you for your cooperation.
тиімділік | noun | efficiency | Тиімділікті арттыру керек. | | ti-yim-di-LIK | Efficiency needs to be raised.
өнімділік | noun | productivity | Өнімділік өсті. | | o-nim-di-LIK | Productivity has grown.
үйлестіру | verb | to combine, to coordinate | Ол жұмыс пен оқуды үйлестіреді. | | uy-les-ti-ROO | She combines work and study.
тепе-теңдік | noun | balance | Жұмыс пен демалыстың тепе-теңдігі маңызды. | | te-PE teng-DIK | A balance of work and rest is important.
жүктеме | noun | workload | Дәрігерлердің жүктемесі ауыр. | | zhuk-te-ME | Doctors have a heavy workload.
ұжым | noun | staff, team | Біздің ұжым тату. | | oo-ZHYM | Our team is friendly.
корпоративтік мәдениет | noun | company culture | Фирманың корпоративтік мәдениеті мықты. | | kor-po-ra-tiv-TIK ma-de-ni-YET | The firm has a strong company culture.`],
      g: ['Having it done: the causative', '<p>Add an ending to the verb to say that someone <b>makes or lets</b> another person do the action, or <b>has it done</b>.</p><table><tr><th>The verb stem ends in…</th><th>Ending</th><th>Examples</th></tr><tr><td>a vowel, or р</td><td><b>-т</b></td><td>оқы → оқы<b>т</b>у (to teach, to make read), істе → істе<b>т</b>у (to make someone do)</td></tr><tr><td>a consonant, hard word</td><td><b>-дыр, -тыр</b></td><td>жаз → жаз<b>дыр</b>у (to have written), ал → ал<b>дыр</b>у (to send for)</td></tr><tr><td>a consonant, soft word</td><td><b>-дір, -тір</b></td><td>күл → күл<b>дір</b>у (to make laugh), кел → кел<b>тір</b>у (to bring about)</td></tr></table><p>The person who really does the action takes the “to” ending:</p><ul><li>Басшы хатшы<b>ға</b> хат жаз<b>дыр</b>ды. = The manager had the secretary write a letter.</li><li>Мұғалім балалар<b>ға</b> кітап оқы<b>т</b>ты. = The teacher had the children read a book.</li><li>Мен шашымды қи<b>дыр</b>дым. = I had my hair cut.</li></ul>', [
        k.mc('Басшы хатшыға хат жаз___ды.', ['дыр', 'дір', 'т'], 0),
        k.mc('Мұғалім балаларға кітап оқы___ты.', ['т', 'дыр', 'тір'], 0),
        k.mc('Ол әзілімен мені күл___ді.', ['дір', 'дыр', 'т'], 0),
        k.mc('Мен шаштаразда шашымды қи___дым.', ['дыр', 'дір', 'т'], 0),
        k.tf('“жаздыру” means “to have something written by someone”.', true),
        k.ord('Басшы хатшыға хат жаздырды')]],
      r: ['Four days instead of five', 'Бір жыл бұрын Алматыдағы шағын IT-компания эксперимент жасады: қызметкерлер аптасына бес күннің орнына төрт күн жұмыс істей бастады, ал жалақы бұрынғыдай қалды. Сонымен қатар, әркім қашықтан жұмысты немесе кеңсені таңдай алды.\n\nБасшылар өнімділік төмендейді деп қорықты. Алайда жарты жылдан кейін жарияланған нәтижелер бәрін таңғалдырды. Орындалған тапсырмалар саны өзгермеді, ал ауырып қалған күндер саны үштен бірге азайды. Қызметкерлер жұмыс пен отбасын үйлестіру жеңілдегенін айтты.\n\nӘрине, қиындықтар да болды. Жұмыс күндеріндегі жүктеме артты, әріптестермен араласу қиындады. «Ынтымақтастық бетпе-бет кездесуді қажет етеді, — дейді директор. — Сондықтан сейсенбі сайын бүкіл ұжым кеңседе жиналады».\n\nҚазір компания ескі кестеге қайтқысы келмейді. Директордың пікірінше, тиімділік сағат санына емес, адамның өзін қалай сезінетініне байланысты.\n\n(шағын = small · орнына = instead of · бұрынғыдай = as before · төмендейді = will fall · азайды = fell · бетпе-бет = face to face · қажет етеді = requires)', [
        k.mc('What did the company change?', ['a four-day week with the same pay', 'lower pay for fewer hours', 'no more office'], 0), k.mc('What were the managers afraid of?', ['Productivity would fall.', 'People would leave.', 'Clients would complain.'], 0), k.mc('What happened to the number of sick days?', ['It fell by a third.', 'It doubled.', 'It did not change.'], 0), k.mc('When does the whole team meet in the office?', ['on Tuesdays', 'on Fridays', 'every day'], 0)]] },

    { id: 'u3', t: 'Рас па, өтірік пе? Thinking critically', topic: 'Media',
      v: ['Information and truth', `
шынайылық | noun | reliability, truthfulness | Жаңалықтың шынайылығын тексеріңіз. | | shy-na-yy-LYQ | Check the reliability of the news.
тексеру | verb | to check | Мен фактілерді әрқашан тексеремін. | | tek-se-ROO | I always check the facts.
бұрмалау | verb | to distort | Тақырып мағынаны бұрмалайды. | | boor-ma-LAU | The headline distorts the meaning.
біржақты | adjective | one-sided, biased | Бұл — біржақты пікір. | | bir-zhaq-TY | This is a one-sided opinion.
манипуляция | noun | manipulation | Жарнама манипуляцияны жиі қолданады. | | ma-ni-poo-LYA-tsi-ya | Advertising often uses manipulation.
сыни ойлау | noun | critical thinking | Мектеп сыни ойлауға үйретуі керек. | | sy-NI oy-LAU | School should teach critical thinking.
бастапқы дереккөз | noun | original source | Бастапқы дереккөзді табыңыз. | | bas-tap-QY de-rek-KOZ | Find the original source.
дезинформация | noun | disinformation | Желіде дезинформация көп. | | de-zin-for-MA-tsi-ya | There is a lot of disinformation online.
алгоритм | noun | algorithm | Алгоритм бізге жаңалық таңдайды. | | al-go-RITM | An algorithm chooses the news for us.
сенгіш | adjective | trusting, gullible | Ол тым сенгіш. | | sen-GISH | He is too trusting.`],
      g: ['Begin, keep on, finish, try: helper verbs', '<p>A second verb shows <b>how</b> the action goes. The first verb takes <b>-а, -е, -й</b> or <b>-ып, -іп, -п</b>.</p><table><tr><th>Helper</th><th>First verb</th><th>Meaning</th><th>Example</th></tr><tr><td><b>бастау</b></td><td>-а, -е, -й</td><td>to begin</td><td>Ол кітап оқи <b>бастады</b>. = He began to read a book.</td></tr><tr><td><b>беру</b></td><td>-а, -е, -й</td><td>to keep on</td><td>Сіз сөйлей <b>беріңіз</b>. = Please go on talking.</td></tr><tr><td><b>болу</b></td><td>-ып, -іп, -п</td><td>to finish</td><td>Мен мақаланы оқып <b>болдым</b>. = I have finished reading the article.</td></tr><tr><td><b>көру</b></td><td>-ып, -іп, -п</td><td>to try</td><td>Мына тағамды жеп <b>көріңіз</b>. = Try this dish.</td></tr><tr><td><b>қою</b></td><td>-ып, -іп, -п</td><td>done, and it stays done</td><td>Мен есікті жауып <b>қойдым</b>. = I have shut the door.</td></tr></table><p>Compare with B1: <b>-ып беру</b> (with -ып) means “do it for someone”; <b>-а беру</b> (with -а) means “keep on doing”.</p>', [
        k.mc('Ол кітап оқи ___. (began)', ['бастады', 'берді', 'болды'], 0),
        k.mc('Сіз сөйлей ___, мен тыңдап отырмын. (go on)', ['беріңіз', 'бастаңыз', 'болыңыз'], 0),
        k.mc('Мен мақаланы оқып ___. (finished)', ['болдым', 'бастадым', 'бердім'], 0),
        k.mc('Мына тағамды жеп ___! (try)', ['көріңіз', 'болыңыз', 'беріңіз'], 0),
        k.mc('Мен есікті жауып ___. (it is done)', ['қойдым', 'көрдім', 'бастадым'], 0),
        k.ord('Мен мақаланы оқып болдым')]],
      r: ['Before you share', 'Біз күн сайын жүз жыл бұрынғы адам бір айда алған ақпараттан да көп ақпарат аламыз. Жаңалықтар таспасын парақтап отырып, өзімізге «Бұл рас па?» деген сұрақты сирек қоямыз.\n\nӘлеуметтік желілердің алгоритмдері бізге ұнайтын нәрсені көрсетеді. Ұқсас он мақаланы оқып болған адам бәрі осылай ойлайды деп сене бастайды. Ақпараттық «көпіршік» осылай жұмыс істейді.\n\nЖурналистика оқытушысы Айжан Серікқызы студенттерге қарапайым «үш сұрақ» ережесін үйретеді. Мұны кім жазды? Автор мұны қайдан біледі? Бұл кімге тиімді? Бастапқы дереккөзді тауып көрсеңіз, тақырыптың мағынаны бұрмалағанын жиі байқайсыз.\n\n«Сыни ойлау — бәріне сенбеу емес, — дейді ол. — Бұл — тексеру әдеті. Сенгіш адам бәріне сенеді, біржақты адам тек өз пікірін растайтын нәрсеге сенеді. Ойлы адам екеуін де тексереді».\n\nОның басты кеңесі: жаңалықты соңына дейін оқып шықпай, бөліспеңіз.\n\n(таспа = feed · парақтап = scrolling · көпіршік = bubble · ойлы = thoughtful · бөліспеңіз = do not share)', [
        k.mc('What do social network algorithms show us?', ['what we like', 'only true news', 'everything in order of time'], 0), k.mc('How many questions are in the teacher’s rule?', ['three', 'ten', 'one'], 0), k.tf('For the teacher, critical thinking means distrusting everything.', false), k.mc('What is her main advice?', ['Do not share news before reading it to the end.', 'Read only one newspaper.', 'Never use social networks.'], 0)]] },

    { id: 'u4', t: 'Күш таусылғанда. Stress and wellbeing', topic: 'Health',
      v: ['Mind and mood', `
кәсіби қажу | noun | burnout at work | Оның кәсіби қажуы бар. | | ka-si-BI qa-ZHOO | She has burnout.
алаңдаушылық | noun | anxiety, worry | Мен алаңдаушылық сезінемін. | | a-lang-da-oo-shy-LYQ | I feel anxiety.
депрессия | noun | depression | Депрессияны емдеу керек. | | dep-RES-si-ya | Depression needs treating.
психолог | noun | psychologist | Ол психологқа барады. | | psi-KHO-log | She sees a psychologist.
психикалық денсаулық | noun | mental health | Психикалық денсаулық бәріне маңызды. | | psi-khi-ka-LYQ den-sa-oo-LYQ | Mental health matters for everyone.
қалжырау | verb | to be exhausted | Ол жұмыстан қалжырады. | | qal-zhy-RAU | She was exhausted by work.
қалпына келу | verb | to recover | Оған қалпына келу үшін уақыт керек. | | qal-py-NA ke-LOO | He needs time to recover.
терапия | noun | therapy | Терапия оған көмектесті. | | te-ra-PI-ya | Therapy helped her.
хал-жағдай | noun | how you are, general state | Хал-жағдайыңыз қалай? | | khal zhagh-DAY | How are you?
шамадан тыс шаршау | noun | overtiredness | Аурудың себебі — шамадан тыс шаршау. | | sha-ma-DAN tys shar-SHAU | The cause of the illness is overtiredness.`],
      g: ['You had better…, if only…', '<table><tr><th>Pattern</th><th>Meaning</th><th>Example</th></tr><tr><td><b>-ғаныңыз жөн</b></td><td>you had better (polite)</td><td>Дәрігерге бар<b>ғаныңыз жөн</b>.</td></tr><tr><td><b>-ған дұрыс</b></td><td>it is right to, it is best to</td><td>Көбірек демал<b>ған дұрыс</b>.</td></tr><tr><td><b>-мағаныңыз жөн</b></td><td>you had better not</td><td>Түнде жұмыс істе<b>мегеніңіз жөн</b>.</td></tr><tr><td><b>-са екен</b></td><td>if only, I wish</td><td>Ол тезірек сауық<b>са екен</b>!</td></tr></table><ul><li>The first three use the <b>-ған, -ген, -қан, -кен</b> form you know. The owner ending shows who the advice is for: бар<b>ғаның</b> (you, to a friend), бар<b>ғаныңыз</b> (you, polite), бар<b>ғаны</b> (he, she).</li><li>For “not”, put <b>-ма, -ме, -ба, -бе, -па, -пе</b> before it (B1, Unit 4): істе<b>ме</b>геніңіз, іш<b>пе</b>геніңіз.</li></ul>', [
        k.mc('Дәрігерге бар___ жөн. (you, polite)', ['ғаныңыз', 'ғаным', 'ғанда'], 0),
        k.mc('Көбірек демал___ дұрыс.', ['ған', 'ып', 'са'], 0),
        k.mc('Ол тезірек сауық___ екен!', ['са', 'ған', 'ып'], 0),
        k.mc('Түнде жұмыс істе___ жөн. (you had better not)', ['мегеніңіз', 'геніңіз', 'меңіз'], 0),
        k.tf('“барғаныңыз жөн” means “you had better go”.', true),
        k.ord('Дәрігерге барғаныңыз жөн')]],
      r: ['When there is no strength left', 'Гүлнар он жыл мұғалім болып жұмыс істеді және мамандығын өте жақсы көретін. Бірақ өткен қыста ол таңертең мектепке барғысы келмейтінін байқады. Ол нашар ұйықтады, жиі ашуланды және үнемі алаңдаушылық сезінді.\n\nАлдымен Гүлнар мұны жай шаршағандық деп ойлады. Құрбысы оған: «Психологқа барғаның жөн», — деді. Гүлнар күмәнданды: көмек сұрау оған ұят сияқты көрінді.\n\nПсихолог бұл — кәсіби қажу, яғни ұзақ уақыт шамадан тыс шаршаудан болатын күй екенін түсіндірді. «Жүктемеңізді қайта қарағаныңыз жөн, — деді ол. — Дәптерлерді түнде тексермегеніңіз дұрыс».\n\nГүлнар демалыс алды, күн сайын серуендей бастады және қосымша сабақтардан бас тартты. Қалпына келу бірден болған жоқ: бұған үш ай кетті.\n\nҚазір ол қайтадан мектепте және әріптестеріне: «Психикалық денсаулыққа дене саулығы сияқты қамқорлық жасау керек», — дейді.\n\n(ашуланды = got angry · ұят = shameful · күй = state · қайта қарау = to reconsider · қосымша = extra · дене саулығы = physical health)', [
        k.mc('What is Gulnar’s job?', ['teacher', 'psychologist', 'doctor'], 0), k.mc('What did her friend advise?', ['to see a psychologist', 'to change her job', 'to work harder'], 0), k.mc('How long did it take her to recover?', ['three months', 'three days', 'a year'], 0), k.tf('The psychologist told her to mark exercise books at night.', false)]] },

    { id: 'u5', t: 'Туризм: пайдасы мен зияны. Tourism, for and against', topic: 'Travel',
      v: ['Tourism and its effects', `
туризм | noun | tourism | Туризм табыс әкеледі. | | too-RIZM | Tourism brings income.
ағын | noun | flow, stream | Жазда туристер ағыны көбейеді. | | a-GHYN | In summer the flow of tourists grows.
жергілікті тұрғындар | noun | local people | Жергілікті тұрғындар шуға наразы. | | zher-gi-lik-TI toor-ghyn-DAR | Local people are unhappy about the noise.
залал | noun | damage, harm | Табиғатқа залал келді. | | za-LAL | Damage has been done to nature.
сақтап қалу | verb | to preserve, to save | Біз көлді сақтап қалуымыз керек. | | saq-TAP qa-LOO | We must preserve the lake.
шектеу | verb | to limit | Көлік санын шектеу керек. | | shek-TEU | The number of cars must be limited.
тұрақты | adjective | sustainable, stable | Бізге тұрақты туризм керек. | | too-raq-TY | We need sustainable tourism.
курорт | noun | resort | Бұл — әйгілі тау курорты. | | koo-RORT | This is a famous mountain resort.
жаппай | adjective | mass | Жаппай туризм қалаларды өзгертеді. | | zhap-PAY | Mass tourism changes cities.
туристік маусым | noun | tourist season | Туристік маусым маусымда басталады. | | too-ris-TIK ma-oo-SYM | The tourist season begins in June.`],
      g: ['Each other and oneself: two more verb endings', '<p><b>1. With each other: -ыс, -іс, -с.</b> Two or more people do the action together or to each other.</p><table><tr><th>Verb</th><th>Together</th><th>Meaning</th></tr><tr><td>сөйлеу</td><td>сөйле<b>с</b>у</td><td>to talk with each other</td></tr><tr><td>көру</td><td>көр<b>іс</b>у</td><td>to see each other</td></tr><tr><td>хат жазу</td><td>хат жаз<b>ыс</b>у</td><td>to write to each other</td></tr><tr><td>келу</td><td>кел<b>іс</b>у</td><td>to agree</td></tr></table><p><b>2. Oneself: -ын, -ін, -н.</b> The action comes back to the doer.</p><table><tr><th>Verb</th><th>Oneself</th><th>Meaning</th></tr><tr><td>жуу</td><td>жу<b>ын</b>у</td><td>to wash oneself</td></tr><tr><td>кию</td><td>ки<b>ін</b>у</td><td>to get dressed</td></tr><tr><td>тарау</td><td>тара<b>н</b>у</td><td>to comb one’s hair</td></tr></table><ul><li>Біз жиі хат жаз<b>ыс</b>амыз. = We often write to each other.</li><li>Ол таңертең жу<b>ын</b>ады. = He washes in the morning.</li></ul>', [
        k.mc('Біз жиі хат жаз___амыз. (to each other)', ['ыс', 'ын', 'ыл'], 0),
        k.mc('Ол таңертең жу___ады. (himself)', ['ын', 'ыс', 'ыл'], 0),
        k.mc('Достар ұзақ сөйле___ті. (with each other)', ['с', 'н', 'л'], 0),
        k.mc('Мен тез ки___дім. (got dressed)', ['ін', 'іс', 'іл'], 0),
        k.tf('“көрісу” means “to see each other”.', true),
        k.ord('Біз жиі хат жазысамыз')]],
      r: ['The village that grew tired of tourists', 'Он жыл бұрын Қазақстанның оңтүстігіндегі бір таулы ауылды тек жергілікті тұрғындар ғана білетін. Кейін көрші көлдердің суреттері интернетте пайда болып, жаппай туризм басталды. Қазір жазда мұнда ауылда тұратын адамнан да көп адам келеді.\n\nБір жағынан, туризм табыс әкеледі. Әр үй дерлік қонақүйге айналды, жастарға жұмыс табылды. Екінші жағынан, көліктер ағыны жолды бұзады, көл жағасында қоқыс қалады. Табиғатқа үлкен залал келді.\n\nБылтыр ауыл тұрғындары өзара келісіп, қонақтар санын шектеуге шешім қабылдады. Қазір турист көлге жақындағанда ережені көреді: от жағуға болмайды, көлікті тұраққа қалдырып, суға дейін жаяу бару керек.\n\n«Біз қонаққа қарсы емеспіз, — дейді қонақ үй иесі. — Бірақ біз тұрақты туризмді қалаймыз. Көлдерді сақтап қалу табысты туристік маусымнан маңыздырақ».\n\n(оңтүстік = south · таулы = mountain · айналды = turned into · өзара = among themselves · от жағу = to light a fire · қарсы = against)', [
        k.mc('How did mass tourism begin?', ['Photos of the lakes appeared online.', 'A new road was built.', 'A film was made there.'], 0), k.mc('What good has tourism brought?', ['income and jobs', 'cleaner lakes', 'better roads'], 0), k.mc('What must a tourist do now?', ['leave the car and walk to the water', 'pay to take photos', 'bring firewood'], 0), k.tf('The villagers are against all guests.', false)]] },

    { id: 'u6', t: 'Аз, бірақ сапалы. Buying less', topic: 'Consumer society',
      v: ['Buying and wanting', `
тұтыну | noun | consumption | Су тұтыну өсіп келеді. | | too-ty-NOO | Water consumption is growing.
сұраныс | noun | demand | Баспанаға сұраныс жоғары. | | soo-ra-NYS | Demand for housing is high.
тауар | noun | goods, product | Бұл тауардың сапасы жақсы. | | ta-WAR | This product is of good quality.
бренд | noun | brand | Адамдар бренд үшін төлейді. | | brend | People pay for the brand.
минимализм | noun | minimalism | Ол минимализмді таңдады. | | mi-ni-ma-LIZM | She chose minimalism.
қажеттілік | noun | necessity, need | Телефон бүгінде — қажеттілік. | | qa-zhet-ti-LIK | A phone today is a necessity.
артық зат | noun | unnecessary thing | Үйде артық зат көп. | | ar-TYQ zat | There are many unnecessary things at home.
таңу | verb | to impose | Жарнама бізге тілекті таңады. | | ta-NGOO | Advertising imposes wants on us.
саналы | adjective | conscious, deliberate | Бұл — саналы таңдау. | | sa-na-LY | This is a conscious choice.
ысырапшылдық | noun | wastefulness | Ысырапшылдық табиғатқа зиян. | | y-sy-rap-shyl-DYQ | Wastefulness harms nature.`],
      g: ['Three of us, about ten, one third: numbers with a difference', '<table><tr><th>Kind</th><th>How to make it</th><th>Examples</th></tr><tr><td>a group of people (1 to 7)</td><td><b>-еу, -ау</b></td><td>бір<b>еу</b>, ек<b>еу</b>, үш<b>еу</b>, төрт<b>еу</b>, бес<b>еу</b>, алт<b>ау</b>, жет<b>еу</b></td></tr><tr><td>with “of us, of them”</td><td>+ owner ending</td><td>үшеу<b>міз</b> (the three of us), екеу<b>і</b> (the two of them)</td></tr><tr><td>about, roughly</td><td><b>шақты</b>, or <b>-дай, -дей</b></td><td>он <b>шақты</b> адам (about ten people), жүз<b>дей</b> (about a hundred)</td></tr><tr><td>a part of the whole</td><td>whole + <b>-тан, -тен, -дан, -ден</b> + part</td><td>үш<b>тен</b> бір (one third), төрт<b>тен</b> үш (three quarters)</td></tr><tr><td>one and a half</td><td><b>бір жарым</b></td><td><b>бір жарым</b> сағат</td></tr></table><ul><li>Біз киноға <b>үшеуміз</b> бардық. = The three of us went to the cinema.</li><li>Ол киімінің <b>үштен бірін</b> ғана киетін. = He wore only a third of his clothes.</li></ul>', [
        k.mc('Біз киноға ___ бардық. (the three of us)', ['үшеуміз', 'үшінші', 'үш есе'], 0),
        k.mc('Дүкенде он ___ адам бар. (about ten)', ['шақты', 'есе', 'дана'], 0),
        k.mc('Ақшамның ___ бірін жинаймын. (one third)', ['үштен', 'үшке', 'үште'], 0),
        k.mc('екі → “the two of them” = …', ['екеуі', 'екінші', 'екі есе'], 0),
        k.tf('“жүздей” means “about a hundred”.', true),
        k.ord('Біз киноға үшеуміз бардық')]],
      r: ['Less, but better', 'Тимур жарнама саласында жұмыс істеді және сұраныстың қалай жасалатынын жақсы білетін. «Бізге жаңа телефонсыз немесе сәнді күртесіз бақытты болмайсың деген ойды таңады», — дейді ол.\n\nЕкі жыл бұрын жаңа пәтерге көшкенде Тимур таңғалды: оның пайдаланбайтын заттары он екі қорап болып шықты. Екі шкаф та киімге толы, бірақ ол соның үштен бірін ғана киетін.\n\nСол кезде Тимур минимализмді байқап көрді. Ол артық заттарын таратып берді және бір ереже қойды: әр сатып алудың алдында отыз күн күту. Он тілектен бір айдан кейін екеу-үшеуі ғана қалатын.\n\n«Саналы тұтыну — кедейлік емес, — деп түсіндіреді ол. — Мен тауарды азырақ, бірақ сапалысын аламын. Бұрын бренд үшін төлейтінмін, қазір қажеттілік үшін төлеймін».\n\nБір жылда Тимур бір жарым айлық жалақысын үнемдеді. Бірақ ең бастысы, оның айтуынша, — бос уақыт: артық зат тым көп көңіл бөлуді талап етеді.\n\n(сала = field · сәнді = fashionable · таратып берді = gave away · сапалы = good-quality · оның айтуынша = in his words · талап етеді = demands)', [
        k.mc('Where did Timur work?', ['in advertising', 'in a bank', 'in a clothes shop'], 0), k.mc('How many boxes of unused things did he have?', ['twelve', 'two', 'thirty'], 0), k.mc('What rule did he set?', ['to wait thirty days before buying', 'to buy only brands', 'to shop once a year'], 0), k.mc('How much did he save in a year?', ['one and a half months’ pay', 'half a month’s pay', 'ten months’ pay'], 0)]] },

    { id: 'u7', t: 'Адамға арналған қала. Cities for people', topic: 'Cities',
      v: ['How cities grow', `
құрылыс салу | verb | to build, to develop (land) | Орталықта құрылыс салып жатыр. | | qoo-ry-LYS sa-LOO | Building is going on in the centre.
тығыздық | noun | density | Халықтың тығыздығы жоғары. | | ty-ghyz-DYQ | The population density is high.
абаттандыру | verb | to improve (public spaces) | Саябақты абаттандырып жатыр. | | a-bat-tan-dy-ROO | The park is being improved.
жаяу жүргіншілер аймағы | noun | pedestrian zone | Орталықта жаяу жүргіншілер аймағы ашылды. | | zha-YAU zhur-gin-shi-LER ay-ma-GHY | A pedestrian zone opened in the centre.
жасыл аймақ | noun | green space | Қалаға жасыл аймақ керек. | | zha-SYL ay-MAQ | The city needs green space.
тұрғын үй кешені | noun | housing complex | Жақын жерде тұрғын үй кешені салынып жатыр. | | toor-GHYN uy ke-she-NI | A housing complex is being built nearby.
қала жоспары | noun | city plan | Қала жоспары өзгерді. | | qa-LA zhos-pa-RY | The city plan has changed.
урбандалу | noun | urbanisation | Урбандалу елді өзгертіп жатыр. | | oor-ban-da-LOO | Urbanisation is changing the country.
қала билігі | noun | city authorities | Қала билігі жаңа саябақ салуға уәде берді. | | qa-LA bi-li-GI | The city authorities promised to build a new park.
қолжетімділік | noun | accessibility, availability | Көліктің қолжетімділігі маңызды. | | qol-zhe-tim-di-LIK | The availability of transport matters.`],
      g: ['Because, until, every time: three joining endings', '<p>All three are built on <b>-ған, -ген, -қан, -кен</b>.</p><table><tr><th>Ending</th><th>Meaning</th><th>Example</th></tr><tr><td><b>-ғандықтан, -гендіктен</b></td><td>because</td><td>Жаңбыр жау<b>ғандықтан</b>, біз үйде қалдық. = Because it rained, we stayed at home.</td></tr><tr><td><b>-ғанша, -генше</b></td><td>until; rather than</td><td>Мен кел<b>генше</b> күтіңіз. = Wait until I come.<br>Автобус күт<b>кенше</b>, жаяу барайық. = Rather than wait for the bus, let’s walk.</td></tr><tr><td><b>-ған сайын, -ген сайын</b></td><td>every time; the more…</td><td>Қала өс<b>кен сайын</b> көлік көбейеді. = The more the city grows, the more cars there are.</td></tr></table><p>After к, қ, п, с, т, ш the ending starts with <b>қ</b> or <b>к</b>: күт<b>кенше</b>, өс<b>кен сайын</b>, айт<b>қандықтан</b>.</p>', [
        k.mc('Жаңбыр жау___, біз үйде қалдық. (because)', ['ғандықтан', 'ғанша', 'ған сайын'], 0),
        k.mc('Мен кел___ күтіңіз. (until)', ['генше', 'гендіктен', 'ген сайын'], 0),
        k.mc('Қала өс___ сайын көлік көбейеді.', ['кен', 'ген', 'қан'], 0),
        k.mc('Автобус күт___, жаяу барайық. (rather than)', ['кенше', 'кендіктен', 'кен сайын'], 0),
        k.tf('“келген сайын” means “every time (someone) comes”.', true),
        k.ord('Жаңбыр жауғандықтан біз үйде қалдық')]],
      r: ['A city for people', 'Заманауи қала қандай болуы керек? Сәулетшілер жиі былай дейді: тек жүргізушіге емес, жаяу жүргіншіге де ыңғайлы қала.\n\nЖиырмасыншы ғасырда қалаларды көлік үшін салды. Кең даңғылдар, алып тұрғын үй кешендері, жұмысқа дейінгі ұзақ жол. Прогресс болып көрінген нәрсе кептеліс пен шуға әкелді.\n\nБүгінде «он бес минуттық қала» идеясы танымал. Адамға күн сайын керек нәрсенің бәрі — мектеп, дүкен, емхана, саябақ — үйден жаяу он бес минуттық жерде болуы тиіс. Мұндай ауданда тұратын адам көлікке сирек отырады.\n\nКөптеген елдердің қала билігі қала жоспарын өзгертіп жатыр: жаяу жүргіншілер аймағы пайда болуда, ал жасыл аймаққа орын қалдыру үшін құрылыс тығыздығын шектейді.\n\nСыншылар орталықты абаттандырғанда шеткі аудандарды ұмытпау керек екенін еске салады. Қолжетімділік дегеніміз — тек қымбат орамда тұратындарға емес, бәріне жақсы болуы.\n\n(сәулетші = architect · ыңғайлы = convenient · алып = huge · танымал = popular · сыншы = critic · шеткі = outlying · еске салады = remind · орам = block)', [
        k.mc('What were twentieth-century cities built for?', ['cars', 'pedestrians', 'bicycles'], 0), k.mc('What is the “fifteen-minute city”?', ['Everything you need daily is a short walk away.', 'A city you can cross in fifteen minutes by car.', 'A city with fifteen districts.'], 0), k.mc('What are city authorities changing?', ['adding pedestrian zones and limiting density', 'building wider avenues', 'closing parks'], 0), k.mc('What do critics remind us?', ['The outlying districts must not be forgotten.', 'The centre needs more cars.', 'Parks cost too much.'], 0)]] },

    { id: 'u8', t: 'Климат және су. Climate and water', topic: 'Environment',
      v: ['Causes and effects', `
жаһандық жылыну | noun | global warming | Жаһандық жылыну бәрімізге қатысты. | | zha-han-DYQ zhy-ly-NOO | Global warming concerns us all.
жылыжай әсері | noun | greenhouse effect | Жылыжай әсері ғаламшарды жылытады. | | zhy-ly-ZHAY a-se-RI | The greenhouse effect warms the planet.
деңгей | noun | level | Су деңгейі көтерілді. | | deng-GEY | The water level rose.
тартылу | verb | to recede, to dry up | Көл тартылып барады. | | tar-ty-LOO | The lake is drying up.
суландыру | noun | irrigation | Суды егістікті суландыруға алады. | | soo-lan-dy-ROO | Water is taken to irrigate the fields.
бөгет | noun | dam | Өзенге бөгет салынды. | | bo-GET | A dam was built on the river.
зардап | noun | harm, bad consequence | Зардабы ауыр болды. | | zar-DAP | The consequences were serious.
апат | noun | disaster, catastrophe | Бұл — экологиялық апат. | | a-PAT | This is an environmental disaster.
қалпына келтіру | verb | to restore | Орманды қалпына келтіруге жылдар керек. | | qal-py-NA kel-ti-ROO | Restoring the forest takes years.
қауіп | noun | threat, danger | Құрғақшылық — егінге қауіп. | | qa-WIP | Drought is a threat to the harvest.`],
      g: ['As a result of, thanks to, lead to', '<table><tr><th>Pattern</th><th>Use</th><th>Example</th></tr><tr><td>noun + <b>-ның салдарынан</b></td><td>as a result of (bad)</td><td>Суландыру<b>дың салдарынан</b> теңіз тартылды.</td></tr><tr><td>noun + <b>-ның арқасында</b></td><td>thanks to (good)</td><td>Бөгет<b>тің арқасында</b> су қайта оралды.</td></tr><tr><td><b>соның салдарынан / нәтижесінде</b></td><td>as a result of that</td><td>Су азайды. <b>Соның салдарынан</b> балық жойылды.</td></tr><tr><td>noun + <b>-ға, -ге, -қа, -ке әкелу</b></td><td>to lead to</td><td>Бұл апат<b>қа әкелді</b>.</td></tr><tr><td>verb + <b>-ғандықтан</b> (Unit 7)</td><td>because</td><td>Теңіз табаны шөлге айнал<b>ғандықтан</b>, жел тұз таратты.</td></tr></table><p>With a whole sentence, use the <b>-ған</b> form + owner ending before <b>арқасында</b> or <b>салдарынан</b>: Су кетуі тоқта<b>ғанының арқасында</b> теңіз қалпына келе бастады.</p>', [
        k.mc('Суландырудың ___ теңіз тартылды.', ['салдарынан', 'арқасында', 'үшін'], 0),
        k.mc('Бөгеттің ___ су қайта оралды.', ['арқасында', 'салдарынан', 'кесірінен'], 0),
        k.mc('Бұл үлкен апат___ әкелді.', ['қа', 'тан', 'та'], 0),
        k.mc('Су азайды. ___ балық жойылды.', ['Соның салдарынан', 'Соның арқасында', 'Сол үшін де'], 0),
        k.tf('“салдарынан” is used for a bad result.', true),
        k.ord('Бұл үлкен апатқа әкелді')]],
      r: ['The sea that is coming back', 'Жиырмасыншы ғасырдың ортасында Арал теңізі әлемдегі ең үлкен көлдердің бірі болған. Мұнда балық аулады, порттар жұмыс істеді, туристер демалды.\n\n1960-жылдардан бастап теңізге құятын өзендердің суын егістікті суландыруға ала бастады. Соның салдарынан су деңгейі төмендей бастады. Теңіз жылдан-жылға тартылып, балықшылар қалалары жағадан ондаған километр қашықта қалды. Теңіз табаны шөлге айналғандықтан, жел тұз бен шаңды таратты. Бұл экологиялық апатқа және адамдардың денсаулығы үшін ауыр зардаптарға әкелді.\n\n2005 жылы Қазақстанда Көкарал бөгеті салынды. Судың оңтүстікке кетуі тоқтағанының арқасында теңіздің солтүстік бөлігі қалпына келе бастады. Су деңгейі көтерілді, балық қайта оралды, жаға Арал қаласына жақындады.\n\nТеңізді толық қалпына келтіру мүмкін емес. Бірақ Солтүстік Арал мынаны көрсетеді: бірге әрекет етсек, үлкен қауіпті де азайтуға болады.\n\n(құятын = flowing into · балықшы = fisherman · табан = bed · бөлік = part · толық = full · азайту = to reduce · әрекет ету = to act)', [
        k.mc('Why did the sea begin to dry up?', ['River water was taken to irrigate fields.', 'It stopped raining.', 'A dam broke.'], 0), k.mc('When was the Kokaral dam built?', ['in 2005', 'in 1960', 'in 1991'], 0), k.mc('Which part of the sea is recovering?', ['the northern part', 'the southern part', 'the whole sea'], 0), k.tf('The text says the whole sea will be fully restored.', false)]] },

    { id: 'u9', t: 'Мені робот алмастыра ма? Work and machines', topic: 'Technology',
      v: ['Jobs of the future', `
автоматтандыру | noun | automation | Автоматтандыру зауыттарды өзгертіп жатыр. | | av-to-mat-tan-dy-ROO | Automation is changing factories.
нейрожелі | noun | neural network | Бұл мәтінді нейрожелі жазды. | | ney-ro-zhe-LI | A neural network wrote this text.
еңбек нарығы | noun | job market | Еңбек нарығы тез өзгеріп жатыр. | | eng-BEK na-ry-GHY | The job market is changing fast.
қайта даярлау | noun | retraining | Ол қайта даярлаудан өтті. | | qay-TA da-yar-LAU | He went through retraining.
шығармашыл | adjective | creative | Бұл — шығармашыл мамандық. | | shy-ghar-ma-SHYL | This is a creative profession.
бірсарынды | adjective | routine, monotonous | Бағдарлама бірсарынды жұмысты істейді. | | bir-sa-ryn-DY | The program does the routine work.
болжау | verb | to predict | Болашақты болжау қиын. | | bol-ZHAU | It is hard to predict the future.
сұранысқа ие | adjective | in demand | Бұл мамандық сұранысқа ие. | | soo-ra-nys-QA i-YE | This profession is in demand.
қауіп төндіру | verb | to threaten | Менің жұмысыма не қауіп төндіреді? | | qa-WIP ton-di-ROO | What threatens my job?
бейімделу | verb | to adapt | Жаңа жағдайға бейімделу керек. | | be-yim-de-LOO | You need to adapt to the new situation.`],
      g: ['Whatever, however, wherever: a question word + -са да', '<p>In B1 you learned <b>-са да</b> (although). Put a question word in front and it means <i>whatever, however, wherever</i>.</p><table><tr><th>Pattern</th><th>Meaning</th><th>Example</th></tr><tr><td><b>не</b> … <b>-са да</b></td><td>whatever</td><td>Ол <b>не</b> істе<b>се де</b>, бәрі сәтті болады.</td></tr><tr><td><b>қанша</b> … <b>-са да</b></td><td>however (much)</td><td><b>Қанша</b> қиын бол<b>са да</b>, мен берілмеймін.</td></tr><tr><td><b>қайда</b> … <b>-са да</b></td><td>wherever</td><td>Мен <b>қайда</b> тұр<b>сам да</b>, үйімді ұмытпаймын.</td></tr><tr><td><b>кім</b> … <b>-са да</b></td><td>whoever</td><td><b>Кім</b> кел<b>се де</b>, есікті ашыңыз.</td></tr></table><ul><li>The person ending goes on <b>-са</b>: бар<b>сам</b> да, бар<b>саң</b> да, бар<b>са</b> да.</li><li>After a soft word use <b>де</b>: кел<b>се де</b>, істе<b>се де</b>.</li><li>A phrase to remember: <b>не болса да</b> = whatever happens.</li></ul>', [
        k.mc('Ол не істе___ де, бәрі сәтті болады.', ['се', 'са', 'сем'], 0),
        k.mc('Қанша қиын бол___ да, мен берілмеймін.', ['са', 'се', 'сам'], 0),
        k.mc('Мен қайда тұр___ да, үйімді ұмытпаймын.', ['сам', 'са', 'сем'], 0),
        k.mc('“whatever happens” = …', ['не болса да', 'не болды', 'бірдеңе болса'], 0),
        k.tf('In “қайда барса да” the word “да” gives the meaning “wherever”.', true),
        k.ord('Қанша қиын болса да мен берілмеймін')]],
      r: ['Will a robot take my job?', 'Дана он екі жыл есепші болып жұмыс істеді. Фирмасы автоматтандыруды бастағанда, оның бірсарынды тапсырмаларының жартысын бағдарлама орындайтын болды. «Алдымен қорықтым, — деп еске алады Дана. — Нейрожелі менің мамандығыма қауіп төндіріп тұрғандай көрінді».\n\nСарапшылар қандай мамандықтар жойылатынын болжауға тырысады. Бірақ олар не айтса да, бір нәрсе анық: еңбек нарығы бұрынғыдан тезірек өзгеріп жатыр. Машина қанша ақылды болса да, шығармашыл тапсырмаларды және адамдармен қарым-қатынасты нашар атқарады.\n\nДана күтіп отырмауға шешім қабылдады. Ол қайта даярлаудан өтіп, қаржы талдаушысы болды. Қазір бағдарлама есептейді, ал Дана клиенттерге сандардың мағынасын түсіндіреді.\n\n«Қырық жаста оқу қанша қиын болса да, қорқып отырғаннан жақсы, — дейді ол. — Бейімделе алатын адам ғана сұранысқа ие болып қалады».\n\n(орындау = to carry out · сарапшы = expert · анық = clear · атқарады = performs · талдаушы = analyst · сан = figure)', [
        k.mc('What was Dana’s job for twelve years?', ['accountant', 'programmer', 'analyst'], 0), k.mc('What did the program take over?', ['half of her routine tasks', 'all of her work', 'her talks with clients'], 0), k.mc('What do machines do badly, according to the text?', ['creative tasks and dealing with people', 'counting', 'routine work'], 0), k.mc('What is Dana’s job now?', ['financial analyst', 'teacher', 'manager of a factory'], 0)]] },

    { id: 'u10', t: 'Оқуға ешқашан кеш емес. Learning for life', topic: 'Education',
      v: ['How we learn', `
білім беру жүйесі | noun | education system | Білім беру жүйесі өзгеріп жатыр. | | bi-LIM be-ROO zhu-ye-SI | The education system is changing.
оқу бағдарламасы | noun | curriculum, syllabus | Оқу бағдарламасында жаңа пән бар. | | o-QOO bagh-dar-la-ma-SY | There is a new subject in the curriculum.
үздіксіз білім | noun | lifelong learning | Үздіксіз білім қалыпты нәрсеге айналды. | | uz-dik-SIZ bi-LIM | Lifelong learning has become the norm.
өздігінен білім алу | noun | self-education | Ол өздігінен білім алумен айналысады. | | oz-di-gi-NEN bi-LIM a-LOO | He educates himself.
бағалау | verb | to assess, to value | Мұғалім жұмысты бағалайды. | | ba-gha-LAU | The teacher assesses the work.
құр жаттау | noun | rote learning | Ережені құр жаттаудың қажеті жоқ. | | qoor zhat-TAU | There is no need to learn the rules by rote.
ұғыну | verb | to grasp, to understand | Мағынасын ұғыну маңызды. | | oo-ghy-NOO | It is important to grasp the meaning.
тәсіл | noun | approach, method | Жаңа тәсіл керек. | | ta-SIL | A new approach is needed.
ынталандыру | verb | to motivate | Жақсы тапсырма ынталандырады. | | yn-ta-lan-dy-ROO | A good task motivates.
қашықтан оқыту | noun | distance teaching | Бұл — қашықтан оқыту курсы. | | qa-shyq-TAN o-qy-TOO | This is a distance course.`],
      g: ['No time to, nothing to, nobody to', '<p>Kazakh says <i>my time for resting does not exist</i>. Use the <b>-атын, -етін, -йтын, -йтін</b> form (B1, Unit 1) before the noun, then <b>жоқ</b>.</p><table><tr><th>Meaning</th><th>Pattern</th><th>Example</th></tr><tr><td>no time to</td><td>-атын <b>уақыт</b> жоқ</td><td>Менің демал<b>атын уақытым жоқ</b>.</td></tr><tr><td>nothing to do</td><td>-атын <b>жұмыс, іс</b> жоқ</td><td>Кешке істе<b>йтін ісім жоқ</b>.</td></tr><tr><td>nobody to</td><td>-атын <b>адам</b> жоқ</td><td>Оның ақылдас<b>атын адамы жоқ</b>.</td></tr><tr><td>nowhere to</td><td>-атын <b>жер</b> жоқ</td><td>Біздің бар<b>атын жеріміз жоқ</b>.</td></tr></table><ul><li>The noun takes the owner ending: уақыт<b>ым</b>, адам<b>ы</b>, жер<b>іміз</b>.</li><li>With <b>бар</b> it means there <b>is</b>: Менің айтатын сөзім <b>бар</b>. = I have something to say.</li></ul>', [
        k.mc('Менің демал___ уақытым жоқ.', ['атын', 'етін', 'ған'], 0),
        k.mc('Кешке істе___ ісім жоқ.', ['йтін', 'йтын', 'ген'], 0),
        k.mc('Оның ақылдас___ адамы жоқ.', ['атын', 'етін', 'қан'], 0),
        k.mc('Біздің бар___ жеріміз жоқ.', ['атын', 'етін', 'ған'], 0),
        k.tf('“айтатын сөзім жоқ” means “I have nothing to say”.', true),
        k.ord('Менің демалатын уақытым жоқ')]],
      r: ['It is never too late to learn', 'Болат елу екі жаста. Ол отыз жыл автобус жүргізушісі болып жұмыс істеді. «Менің оқитын уақытым ешқашан болған емес, — дейді ол. — Отбасы, жұмыс, үй. Ал балалар есейгенде, кешке істейтін ісім жоқ екен».\n\nҰлы оған бағдарламалауды қашықтан оқытатын курсты ұсынды. Алғашқы айлар ауыр болды. Болаттың ақылдасатын адамы болмады: топтағылардың бәрі одан екі есе жас еді. Мектепте ол құр жаттауға үйренген, ал мұнда ұғыну керек болды.\n\nОқытушы оған ерекше тәсіл тапты: өмірден алынған тапсырмалар берді. Мысалы, автобус кестесінің бағдарламасын жазу. Бұл бағадан гөрі жақсы ынталандырды.\n\nБір жарым жылдан кейін Болат IT саласындағы алғашқы жұмысын тапты. Оның ойынша, білім беру жүйесі фактіні емес, оқи білуді үйретуі керек. «Үздіксіз білім — сән емес. Бүгінде онсыз алға жылжитын жол жоқ».\n\n(бағдарламалау = programming · ақылдасу = to ask for advice · ерекше = special · гөрі = rather than · оқи білу = knowing how to learn · онсыз = without it · алға жылжу = to move forward)', [
        k.mc('What was Bolat’s job for thirty years?', ['bus driver', 'teacher', 'programmer'], 0), k.mc('Who suggested the course?', ['his son', 'his boss', 'his teacher'], 0), k.mc('Why were the first months hard?', ['He had nobody to ask, and the group was much younger.', 'The course was too expensive.', 'He had no computer.'], 0), k.mc('Which task motivated him?', ['a program for a bus timetable', 'a game', 'a website for a school'], 0)]] },

    { id: 'u11', t: 'Біз не үшін оқимыз. Why we read', topic: 'Culture',
      v: ['Books and readers', `
кітап оқу | noun | reading | Кітап оқу ойды дамытады. | | ki-TAP o-QOO | Reading develops the mind.
әдебиет | noun | literature | Мен қазақ әдебиетін жақсы көремін. | | a-de-bi-YET | I love Kazakh literature.
электрондық кітап | noun | e-book | Мен электрондық кітап оқып жатырмын. | | e-lek-tron-DYQ ki-TAP | I am reading an e-book.
қиял | noun | imagination | Баланың қиялы бай. | | qi-YAL | The child has a rich imagination.
хикая | noun | tale, narrative | Бұл — қызық хикая. | | khi-ka-YA | This is an interesting tale.
қайта оқу | verb | to reread | Мен осы романды қайта оқығым келеді. | | qay-TA o-QOO | I want to reread this novel.
жанр | noun | genre | Менің сүйікті жанрым — детектив. | | zhanr | My favourite genre is the detective story.
үзінді | noun | extract, passage | Үзіндіні дауыстап оқыңыз. | | u-zin-DI | Read the passage aloud.
дәйексөз | noun | quotation | Бұл — белгілі дәйексөз. | | da-yek-SOZ | This is a well-known quotation.
зейін қою | verb | to concentrate | Маған зейін қою қиын. | | ze-YIN qo-YOO | I find it hard to concentrate.`],
      g: ['I intend to, he will probably: two future forms', '<p><b>1. I intend to: -мақшы.</b> A firm plan.</p><table><tr><th>The verb stem ends in…</th><th>Ending</th><th>Examples</th></tr><tr><td>a vowel, or л, р, й, у</td><td><b>-мақшы, -мекші</b></td><td>оқы → оқы<b>мақшы</b>мын, кел → кел<b>мекші</b></td></tr><tr><td>м, н, ң, з, ж</td><td><b>-бақшы, -бекші</b></td><td>жаз → жаз<b>бақшы</b>мын</td></tr><tr><td>к, қ, п, с, т, ш</td><td><b>-пақшы, -пекші</b></td><td>аш → аш<b>пақшы</b>мыз, кет → кет<b>пекші</b></td></tr></table><ul><li>Мен осы кітапты қайта оқы<b>мақшымын</b>. = I intend to reread this book.</li><li>Біз клуб аш<b>пақшымыз</b>. = We intend to open a club.</li></ul><p><b>2. Probably will: -ар, -ер, -р.</b> You are not sure.</p><ul><li>Ол бүгін кел<b>ер</b>. = He will probably come today.</li><li>Not: Ол кел<b>мес</b>. = He probably will not come.</li></ul><p>Compare: кел<b>еді</b> (he will come, a fact) · кел<b>мекші</b> (he intends to come) · кел<b>ер</b> (he may well come).</p>', [
        k.mc('Мен осы кітапты қайта оқы___мын.', ['мақшы', 'мекші', 'бақшы'], 0),
        k.mc('Ол ертең кел___.', ['мекші', 'мақшы', 'пекші'], 0),
        k.mc('Біз клуб аш___мыз.', ['пақшы', 'мақшы', 'бақшы'], 0),
        k.mc('“Ол бүгін келер.” = …', ['He will probably come today.', 'He came today.', 'He must not come today.'], 0),
        k.tf('“бармақшымын” means “I intend to go”.', true),
        k.ord('Мен осы кітапты қайта оқымақшымын')]],
      r: ['A club in a village library', 'Сәуле шағын ауылға кітапханашы болып келгенде, кітапханаға ешкім дерлік келмейтін. «Бәрі жастар енді кітап оқымайды дейтін, — деп еске алады ол. — Бірақ біз оларды дұрыс бағаламадық деп ойлаймын».\n\nСәуле оқырмандар клубын ашты. Ереже біреу ғана болды: әркім өзіне ұнайтын үзіндіні әкеліп, оның неге маңызды екенін түсіндіреді. Жанр маңызды емес — фантастика, өлең, тіпті комикс те болады.\n\nБірінші болып тоғызыншы сынып оқушысы Алмас келді. Ол электрондық кітапқа беріліп кетіп, автобусқа кешігіп қалғанын айтты. Кейін оның достары келді. Бір жылдан кейін клубта отыз адам болды.\n\n«Кітап оқу қиялды дамытады және зейін қоюға үйретеді, — дейді Сәуле. — Балалар мектеп бағдарламасындағы кітаптарды қайта оқып, олардан жаңа нәрсе таба бастады. Келесі жылы біз жазушылармен кездесу өткізбекшіміз».\n\nКітапхана қабырғасында қазір клуб таңдаған дәйексөз ілулі тұр: «Жақсы кітапты оқып болған адам сәл де болса өзгереді».\n\n(кітапханашы = librarian · дұрыс бағаламадық = did not value properly · беріліп кетіп = absorbed · өткізбекшіміз = we intend to hold · сәл де болса = at least a little)', [
        k.mc('What is Saule’s job?', ['librarian', 'teacher', 'writer'], 0), k.mc('What was the club’s one rule?', ['Bring a favourite passage and explain why it matters.', 'Read one book a week.', 'Read only the classics.'], 0), k.mc('Why was Almas late for the bus?', ['He was lost in an e-book.', 'He was at the club.', 'He overslept.'], 0), k.mc('What does the club intend to do next year?', ['hold meetings with writers', 'close the library', 'buy a bus'], 0)]] },

    { id: 'u12', t: 'Әділ ойын. Fair play', topic: 'Sport',
      v: ['Sport and honesty', `
әділ ойын | noun | fair play | Біз әділ ойынды қолдаймыз. | | a-DIL o-YYN | We support fair play.
допинг | noun | doping | Спортшы допинг үшін жазаланды. | | DO-ping | The athlete was punished for doping.
шеттету | verb | to disqualify, to exclude | Оны жарыстан шеттетті. | | shet-te-TOO | He was disqualified from the competition.
бақталас | noun | rival | Менің бақталасым өте мықты. | | baq-ta-LAS | My rival is very strong.
төрелік | noun | refereeing, judging | Төрелік әділ болды. | | to-re-LIK | The refereeing was fair.
қысым | noun | pressure | Спортшыларға қысым көп. | | qy-SYM | There is a lot of pressure on athletes.
алдау | verb | to deceive, to cheat | Ол ешкімді алдаған жоқ. | | al-DAU | He did not deceive anyone.
бедел | noun | reputation, standing | Клубтың беделі жоғары. | | be-DEL | The club has a high reputation.
абырой | noun | honour, dignity | Ол абыроймен жеңілді. | | a-by-ROY | He lost with dignity.
жол беру | verb | to give way | Ол бақталасына жол берді. | | zhol be-ROO | He gave way to his rival.`],
      g: ['I had to, I was forced to', '<table><tr><th>Pattern</th><th>Meaning</th><th>Example</th></tr><tr><td>кімге + <b>-уға тура келді</b></td><td>had to (it turned out that way)</td><td>Маған тоқта<b>уға тура келді</b>. = I had to stop.</td></tr><tr><td>кімге + <b>-уға тура келеді</b></td><td>has to (regularly)</td><td>Оған күн сайын жаттығ<b>уға тура келеді</b>.</td></tr><tr><td>кім + <b>-уға мәжбүр болды</b></td><td>was forced to</td><td>Ол жарыстан шығ<b>уға мәжбүр болды</b>.</td></tr></table><ul><li>With <b>тура келу</b> the person takes the “to” ending: <b>маған, сізге, оған, Ерланға</b>.</li><li>With <b>мәжбүр болу</b> the person has no ending: <b>мен, ол, Ерлан</b>.</li><li>Not: Маған күтуге тура <b>келмеді</b>. = I did not have to wait.</li></ul><p>Compare with what you know: бар<b>уым керек</b> (I must, B1) · бар<b>уға тура келді</b> (I had to, there was no choice) · бар<b>ғым келді</b> (I wanted to).</p>', [
        k.mc('Маған тоқта___ тура келді.', ['уға', 'уды', 'удан'], 0),
        k.mc('Маған көмектесуге тура ___. (had to)', ['келді', 'барды', 'берді'], 0),
        k.mc('Ол жарыстан шығуға ___ болды. (forced)', ['мәжбүр', 'керек', 'тиіс'], 0),
        k.mc('___ күтуге тура келді. (he)', ['Оған', 'Ол', 'Оның'], 0),
        k.mc('“I had to wait.” = …', ['Маған күтуге тура келді.', 'Менің күткім келді.', 'Мен күте алдым.'], 0),
        k.ord('Маған тоқтауға тура келді')]],
      r: ['The race he did not win', 'Алматыдағы қалалық марафонда студент Ерлан екінші болып келе жатты. Мәреге екі жүз метр қалғанда, бірінші келе жатқан бақталасы құлап қалды.\n\nЕрланға ұзақ ойлануға тура келмеді. Ол тоқтап, бақталасына тұруға көмектесті және оны мәреге дейін жеткізді. Екеуі бесінші және алтыншы болып келді: оларды басқалар басып озды.\n\n«Әрине, менің жеңгім келді, — дейді Ерлан. — Мен жарты жыл дайындалдым, сөре алдында ұйықтай алмадым. Бірақ осылай алынған жеңіс алдау болар еді».\n\nМарафоннан түсірілген бейнені миллиондаған адам көрді. Көп адам спортта қысым, допинг және төрелік туралы дау тым көп екенін, ал мұндай оқиғалар әділ ойынға деген сенімді қайтаратынын жазды.\n\nЖаттықтырушысы: «Медальді келесі жылы ұтуға болады. Ал бедел мен абырой бір-ақ рет жиналады», — деді.\n\nБір айдан кейін Ерланға мектептерде сөз сөйлеуге тура келді: балалар оның оқиғасын тыңдағысы келді.\n\n(мәре = finish · құлап қалды = fell · басып озды = overtook · сөре = start · ұту = to win · сөз сөйлеу = to give a talk)', [
        k.mc('What place was Erlan in before his rival fell?', ['second', 'first', 'fifth'], 0), k.mc('What did Erlan do?', ['He helped his rival to the finish.', 'He ran past and won.', 'He stopped the race.'], 0), k.tf('Erlan won a medal.', false), k.mc('What did his coach say is earned only once?', ['reputation and honour', 'a medal', 'money'], 0)]] },

    { id: 'u13', t: 'Өз ісің. A business of your own', topic: 'Economy',
      v: ['Running a small business', `
шағын бизнес | noun | small business | Шағын бизнес жұмыс орындарын ашады. | | sha-GHYN BIZ-nes | Small business creates jobs.
түсім | noun | takings, revenue | Түсім екі есе өсті. | | tu-SIM | Takings have doubled.
өзіндік құн | noun | cost price | Тауардың өзіндік құны жоғары. | | o-zin-DIK qoon | The cost price of the product is high.
бизнес-жоспар | noun | business plan | Ол бизнес-жоспар жазды. | | BIZ-nes zhos-PAR | She wrote a business plan.
жеткізуші | noun | supplier | Біздің жеткізушіміз сенімді. | | zhet-ki-zoo-SHI | Our supplier is reliable.
тапсырыс беруші | noun | client (who orders) | Тапсырыс беруші жұмысқа риза. | | tap-sy-RYS be-roo-SHI | The client is pleased with the work.
өзін ақтау | verb | to pay for itself | Бизнес бір жылда өзін ақтады. | | o-ZIN aq-TAU | The business paid for itself in a year.
қаржы салу | verb | to invest | Ол дүкенге қаржы салды. | | qar-ZHY sa-LOO | He invested in the shop.
кеңейту | verb | to expand | Ол ісін кеңейткісі келеді. | | ke-ngey-TOO | She wants to expand her business.
тұрақты тұтынушы | noun | regular customer | Біздің тұрақты тұтынушыларымыз көп. | | too-raq-TY too-ty-noo-SHY | We have many regular customers.`],
      g: ['Depend on, take part in, give up: verbs and their endings', '<p>Many verbs always need the same ending on the noun before them. Learn them together.</p><table><tr><th>Verb</th><th>Ending before it</th><th>Example</th></tr><tr><td><b>байланысты болу</b> (to depend on)</td><td>-ға, -ге, -қа, -ке</td><td>Табыс сапа<b>ға</b> байланысты.</td></tr><tr><td><b>әсер ету</b> (to affect)</td><td>-ға, -ге, -қа, -ке</td><td>Баға сұраныс<b>қа</b> әсер етеді.</td></tr><tr><td><b>қатысу</b> (to take part in)</td><td>-ға, -ге, -қа, -ке</td><td>Біз жәрмеңке<b>ге</b> қатысамыз.</td></tr><tr><td><b>сену</b> (to rely on, to believe)</td><td>-ға, -ге, -қа, -ке</td><td>Мен достарым<b>а</b> сенемін.</td></tr><tr><td><b>айналысу</b> (to be engaged in)</td><td>-мен, -бен, -пен</td><td>Ол бизнес<b>пен</b> айналысады.</td></tr><tr><td><b>бас тарту</b> (to give up, to refuse)</td><td>-дан, -ден, -тан, -тен</td><td>Ол демалыс<b>тан</b> бас тартты.</td></tr><tr><td><b>қорқу</b> (to be afraid of)</td><td>-дан, -ден, -тан, -тен</td><td>Ол тәуекел<b>ден</b> қорықпайды.</td></tr></table>', [
        k.mc('Табыс сапа___ байланысты.', ['ға', 'дан', 'мен'], 0),
        k.mc('Баға сұраныс___ әсер етеді.', ['қа', 'тан', 'пен'], 0),
        k.mc('Ол бизнес___ айналысады.', ['пен', 'ке', 'тен'], 0),
        k.mc('Біз жәрмеңке___ қатысамыз.', ['ге', 'ден', 'мен'], 0),
        k.mc('Ол демалыс___ бас тартты.', ['тан', 'қа', 'пен'], 0),
        k.ord('Табыс сапаға байланысты')]],
      r: ['A bakery on wheels', 'Үш жыл бұрын Айгүл базарда бәліш сататын. Түсім ауа райына байланысты болатын: жаңбырда сатып алушы болмайтын. Сол кезде оның ойына бір идея келді — адамдарға өзі баратын фургондағы наубайхана.\n\nАйгүл бизнес-жоспар жазып, бар жинағын ескі фургонға салды. Оған екі жыл демалыстан бас тартуға тура келді. Туыстары күмәнданды, бірақ ол тұрақты тұтынушыларына сенді.\n\nАлдымен шығын кірістен көп болды. Айгүл сенімді ұн жеткізушісін тауып, қалалық жәрмеңкелерге қатыса бастады. Бір жылдан кейін бизнес өзін ақтады.\n\nБүгінде оның үш фургоны және алғашқы ірі тапсырыс берушісі — кофеханалар желісі бар. Ол цех жалдап, ісін кеңейткісі келеді.\n\n«Шағын бизнес — тек ақша емес, — дейді Айгүл. — Ол ауданның өміріне әсер етеді. Адамдар жаңа піскен нанның иісіне үйден шығып, бір-бірімен сөйлеседі».\n\n(сатып алушы = buyer · фургон = van · жәрмеңке = fair · ірі = large · цех жалдап = renting a workshop · иіс = smell)', [
        k.mc('Where did Aigul sell her pies before?', ['at the market', 'in a café', 'online'], 0), k.mc('What did she put her savings into?', ['an old van', 'a new shop', 'a coffee machine'], 0), k.mc('When did the business pay for itself?', ['after a year', 'after a month', 'after five years'], 0), k.mc('Who is her first large client?', ['a chain of coffee shops', 'a school', 'the market'], 0)]] },

    { id: 'u14', t: 'Екі үй. Two homes', topic: 'Migration',
      v: ['Living in another country', `
шетелге көшу | noun | moving abroad, emigration | Шетелге көшу — қиын шешім. | | she-tel-GE ko-SHOO | Moving abroad is a hard decision.
қоныс аудару | verb | to move, to resettle | Олар Германияға қоныс аударды. | | qo-NYS a-oo-da-ROO | They moved to Germany.
сіңісу | verb | to settle in, to integrate | Жаңа ортаға сіңісу оңай емес. | | si-ngi-SOO | It is not easy to settle into a new place.
сағыныш | noun | longing, homesickness | Үйге деген сағынышым басылмайды. | | sa-ghy-NYSH | My longing for home does not fade.
бөтен | adjective | strange, not your own | Бұл маған бөтен қала. | | bo-TEN | This city is strange to me.
ықтиярхат | noun | residence permit | Ол ықтиярхат алды. | | yq-ti-yar-KHAT | She received a residence permit.
диаспора | noun | diaspora | Қалада үлкен қазақ диаспорасы бар. | | di-AS-po-ra | There is a large Kazakh diaspora in the city.
тамыр | noun | root | Ол өз тамырын ұмытпайды. | | ta-MYR | He does not forget his roots.
аңсау | verb | to long for | Мен туған жерімді аңсаймын. | | ang-SAU | I long for my homeland.
отандас | noun | compatriot | Мен шетелде отандасымды кездестірдім. | | o-tan-DAS | I met a compatriot abroad.`],
      g: ['Time flies, it occurred to me: set phrases', '<p>Some phrases cannot be translated word for word. Learn them whole.</p><table><tr><th>Phrase</th><th>Word for word</th><th>Meaning</th></tr><tr><td><b>уақыт зымырап өтеді</b></td><td>time rushes past</td><td>time flies</td></tr><tr><td><b>ойыма келді</b></td><td>it came to my thought</td><td>it occurred to me</td></tr><tr><td><b>ашуы келді</b></td><td>his anger came</td><td>he got angry</td></tr><tr><td><b>өзін ұстау</b></td><td>to hold oneself</td><td>to behave</td></tr><tr><td><b>көңілі толды</b></td><td>his heart filled</td><td>he was satisfied</td></tr><tr><td><b>көңіл бөлу</b></td><td>to share one’s heart</td><td>to pay attention</td></tr></table><ul><li>The owner ending shows whose thought or feeling it is: ой<b>ым</b>а келді (to me), ой<b>ың</b>а келді (to you), ой<b>ын</b>а келді (to him).</li><li>Менің <b>ойыма</b> қызық идея келді. = An interesting idea occurred to me.</li><li>Балалар <b>өздерін</b> жақсы ұстады. = The children behaved well.</li></ul>', [
        k.mc('Уақыт қалай тез ___!', ['зымырайды', 'жүзеді', 'отырады'], 0),
        k.mc('Менің ___ қызық идея келді.', ['ойыма', 'ойымда', 'ойымнан'], 0),
        k.mc('Оның ___ келіп, айқайлай бастады.', ['ашуы', 'ойы', 'көңілі'], 0),
        k.mc('Балалар өздерін жақсы ___.', ['ұстады', 'алды', 'берді'], 0),
        k.tf('“көңілі толды” means “he was satisfied”.', true),
        k.ord('Менің ойыма қызық идея келді')]],
      r: ['Two homes', 'Әйгерім бес жыл бұрын университетте оқу үшін Германияға кетті. Қазір оның жұмысы мен ықтиярхаты бар. Уақыт зымырап өтіп жатыр, бірақ үйге деген сағыныш басылмайды.\n\n«Алғашқы айларда мен өзімді қонақ сияқты ұстадым, — дейді ол. — Бәрі бөтен көрінді: тіл, тамақ, тіпті жексенбідегі тыныштық та. Бәрін тастап кету талай рет ойыма келді».\n\nЖаңа ортаға сіңісу баяу жүрді. Қазақ диаспорасы көмектесті: сенбі сайын отандастар жиналып, бешбармақ пісіріп, ана тілінде сөйлесетін. Бірақ Әйгерім тек өз адамдарының арасында өмір сүруге болмайтынын түсінді. Ол хорға жазылып, неміс достар тапты.\n\n«Жаңа елге сіңісу — тамырыңды ұмыту емес, — дейді ол. — Туған жерді аңсау қалды, бірақ қазір бұл ауру емес, жылу».\n\nОдан үйің қайда деп сұрағанда, ол: «Менің екі үйім бар. Таңдаудың қажеті жоқ екеніне қуанамын», — деп жауап береді.\n\n(басылмайды = does not fade · талай рет = many a time · баяу = slowly · хор = choir · неміс = German · қажеті жоқ = no need)', [
        k.mc('Why did Aigerim go to Germany?', ['to study at university', 'to get married', 'for a holiday'], 0), k.mc('What helped her settle in?', ['the Kazakh diaspora', 'a pay rise', 'a new flat'], 0), k.mc('What did she join to meet local people?', ['a choir', 'a football team', 'a book club'], 0), k.mc('What does she say about her home?', ['She has two.', 'It is only in Kazakhstan.', 'She has none.'], 0)]] },

    { id: 'u15', t: 'Бір дастарқанда үш тіл. Living in two languages', topic: 'Language',
      v: ['Being bilingual', `
қостілділік | noun | bilingualism | Қостілділік Қазақстанда қалыпты нәрсе. | | qos-til-di-LIK | Bilingualism is usual in Kazakhstan.
қостілді | adjective | bilingual | Менің ұлым қостілді. | | qos-til-DI | My son is bilingual.
тілден тілге ауысу | verb | to switch between languages | Ол тілден тілге оңай ауысады. | | til-DEN til-GE a-wy-SOO | She switches easily between languages.
шатастыру | verb | to mix up, to confuse | Балалар кейде тілдерді шатастырады. | | sha-tas-ty-ROO | Children sometimes mix up languages.
ресми тіл | noun | official language | Бұл елде екі ресми тіл бар. | | res-MI til | This country has two official languages.
меңгеру | verb | to master | Ол үш тілді меңгерген. | | meng-ge-ROO | She has mastered three languages.
тілдік орта | noun | language environment | Тілдік орта үйренуге көмектеседі. | | til-DIK or-TA | A language environment helps you learn.
дарыту | verb | to pass on, to instil | Ата-ана балаға тілді дарытады. | | da-ry-TOO | Parents pass the language on to the child.
тіл тазалығы | noun | purity of language | Ол тіл тазалығына мән береді. | | til ta-za-ly-GHY | He cares about the purity of the language.
сөйлеу тілі | noun | spoken, everyday language | Бұл сөз сөйлеу тілінде жиі кездеседі. | | soy-LEU ti-LI | This word is common in everyday speech.`],
      g: ['In spite of, in case, on condition, until', '<table><tr><th>Ending or word</th><th>Meaning</th><th>Example</th></tr><tr><td><b>-ғанына қарамастан</b></td><td>in spite of the fact that</td><td>Тіл үшеу бол<b>ғанына қарамастан</b>, балалар шатастырмайды.</td></tr><tr><td><b>-ған жағдайда</b></td><td>in case, if it happens that</td><td>Жаңбыр жау<b>ған жағдайда</b> сабақ сыныпта болады.</td></tr><tr><td><b>-у шартымен</b></td><td>on condition that</td><td>Сен тырыс<b>у шартымен</b> көмектесемін.</td></tr><tr><td><b>-ғанға дейін</b></td><td>until, before</td><td>Жауап бер<b>генге дейін</b> ол ойланады.</td></tr></table><ul><li>The first, second and fourth are built on <b>-ған, -ген, -қан, -кен</b>, like the endings in Unit 7.</li><li><b>қарамастан</b> can also follow a noun with the “to” ending: жаңбыр<b>ға қарамастан</b> = in spite of the rain.</li><li>These forms belong to careful speech and writing. In everyday talk people say <b>-са да</b> and <b>егер</b>.</li></ul>', [
        k.mc('Тіл үшеу бол___ қарамастан, балалар оларды шатастырмайды.', ['ғанына', 'ғанға', 'ған соң'], 0),
        k.mc('Жаңбыр жау___ жағдайда сабақ сыныпта болады.', ['ған', 'са', 'ып'], 0),
        k.mc('Сен тырысу ___ мен көмектесемін.', ['шартымен', 'жағдайда', 'қарамастан'], 0),
        k.mc('Жауап бер___ дейін ол ойланады.', ['генге', 'геннен', 'гендіктен'], 0),
        k.tf('“қарамастан” means “in spite of”.', true),
        k.ord('Жауап бергенге дейін ол ойланады')]],
      r: ['Three languages at one table', 'Серіковтер отбасында үш тілде сөйлейді. Әжемен — қазақша, мектепте балалар орысша оқиды, ал оқытушы болып жұмыс істейтін әкесі оларға әр кеш сайын ағылшынша кітап оқып береді.\n\nТіл үшеу болғанына қарамастан, балалар оларды шатастырмайды десе де болады. Жеті жасар Әмина тілден тілге оңай ауысады: жауап бергенге дейін ол өзімен кім сөйлесіп тұрғанына қарайды.\n\nБұрын бұлай емес еді. Отбасы қалаға көшкеннен кейін балалар қазақ тілін ұмыта бастады: айналадағы тілдік орта басқа болды. Сонда ата-анасы ереже қойды: үйде тек қазақша сөйлесеміз.\n\n«Қостілділік — сый, бірақ оны сақтай білу керек, — дейді анасы. — Балалар өскен сайын оларға әр тілде кітап, ән, дос керек».\n\nКейбір зерттеулер қостілді адамдардың зейінін бір нәрседен екіншісіне оңай аударатынын көрсетеді. Бірақ Серіковтер үшін басқа нәрсе маңыздырақ: әженің тілін балаларға дарыту — отбасы тарихын жеткізу деген сөз.\n\n(десе де болады = one could say · жасар = -year-old · сый = gift · кейбір = some · зейін = attention · деген сөз = means)', [
        k.mc('Which language do the children speak with their grandmother?', ['Kazakh', 'Russian', 'English'], 0), k.mc('What does Amina do before she answers?', ['She looks at who is speaking to her.', 'She asks her mother.', 'She answers in English.'], 0), k.mc('What rule did the parents set?', ['only Kazakh at home', 'only Russian at school', 'no English'], 0), k.mc('Why does the grandmother’s language matter to the family?', ['It carries the family’s history.', 'It is needed for exams.', 'It is easier than Russian.'], 0)]] },

    { id: 'u16', t: 'Сөйлей бастаған қабырға. Art in the street', topic: 'Art',
      v: ['Art and the city', `
граффити | noun | graffiti | Қабырғада граффити бар. | | graf-FI-ti | There is graffiti on the wall.
қабырға суреті | noun | mural, wall painting | Суретшілер қабырға суретін салды. | | qa-byr-GHA soo-re-TI | The artists painted a mural.
қасбет | noun | facade, front of a building | Үйдің қасбетін сырлады. | | qas-BET | The front of the house was painted.
көше өнері | noun | street art | Көше өнері қаланы өзгертеді. | | ko-SHE o-ne-RI | Street art changes the city.
бұзақылық | noun | vandalism, hooliganism | Бұл өнер емес, бұзақылық. | | boo-za-qy-LYQ | This is not art but vandalism.
әшекейлеу | verb | to decorate | Біз ауланы гүлмен әшекейледік. | | a-she-key-LEU | We decorated the yard with flowers.
қараусыз қалған | adjective | abandoned, neglected | Бұл — қараусыз қалған зауыт. | | qa-ra-oo-SYZ qal-GHAN | This is an abandoned factory.
қоғамдық кеңістік | noun | public space | Бұл — қоғамдық кеңістік. | | qo-gham-DYQ ke-ngis-TIK | This is a public space.
нобай | noun | sketch | Суретші нобай көрсетті. | | no-BAY | The artist showed a sketch.
өткінші | noun | passer-by | Өткіншілер тоқтап қарады. | | ot-kin-SHI | Passers-by stopped and looked.`],
      g: ['Making new words: endings that build words', '<table><tr><th>Ending</th><th>It makes…</th><th>Examples</th></tr><tr><td><b>-шы, -ші</b></td><td>the person who does it</td><td>сурет → сурет<b>ші</b> (artist), жазу → жазу<b>шы</b> (writer), өткін → өткін<b>ші</b></td></tr><tr><td><b>-лық, -лік, -дық, -дік, -тық, -тік</b></td><td>a quality or an idea</td><td>батыл → батыл<b>дық</b> (courage), дос → дос<b>тық</b> (friendship), бұзақы → бұзақы<b>лық</b></td></tr><tr><td><b>-хана</b></td><td>a place</td><td>кітап → кітап<b>хана</b> (library), шебер → шебер<b>хана</b> (workshop), ас → ас<b>хана</b> (canteen)</td></tr><tr><td><b>-сыз, -сіз</b></td><td>without</td><td>үй → үй<b>сіз</b> (homeless), су → су<b>сыз</b> (without water), қарау → қарау<b>сыз</b></td></tr><tr><td><b>-лы, -лі, -ды, -ді, -ты, -ті</b></td><td>with, having</td><td>білім → білім<b>ді</b> (educated), тұз → тұз<b>ды</b> (salty), дарын → дарын<b>ды</b></td></tr></table><p>Hard words take the hard form, soft words the soft form. Knowing the endings helps you guess new words when you read.</p>', [
        k.mc('сурет → the person = …', ['суретші', 'суреттік', 'суретхана'], 0),
        k.mc('батыл → the quality = …', ['батылдық', 'батылшы', 'батылсыз'], 0),
        k.mc('кітап → the place = …', ['кітапхана', 'кітапшы', 'кітапты'], 0),
        k.mc('үй → “without a home” = …', ['үйсіз', 'үйлі', 'үйші'], 0),
        k.mc('білім → “educated” = …', ['білімді', 'білімсіз', 'білімші'], 0),
        k.ord('Көше өнері қаланы әшекейлейді')]],
      r: ['The wall that began to speak', 'Біздің ауданда жиырма жыл бойы қараусыз қалған зауыт тұрды. Оның сұр қасбеті жазуларға толы болатын. Тұрғындар мұны бұзақылық деп санап, қала билігінен ғимаратты бұзуды сұрады.\n\nӨткен жазда бір топ жас суретші басқа шешім ұсынды. Олар нобай көрсетті: ауданның тарихы бейнеленген алып қабырға суреті — дала, алғашқы жұмысшылар, ауладағы балалар. Билік келісті, ал тұрғындар бояуға ақша жинады.\n\nЖұмыс екі айға созылды. Өткіншілер тоқтап, кеңес беріп, шай әкеліп тұрды. Осы зауытта отыз жыл жұмыс істеген зейнеткер Мария Ивановна суретшілерге әріптестері туралы айтып берді — олардың бейнесі қабырғада пайда болды.\n\nҚазір мұнда қоғамдық кеңістік бар: жазда кино көрсетеді, қыста мұз айдынын құяды.\n\n«Көше өнері — жай әшекей емес, — дейді суретшілердің бірі. — Граффити бұзақылық та, өнер де бола алады. Айырмашылық мынада: қабырға адамдармен сөйлесе ме, жоқ па».\n\n(сұр = grey · жазу = writing · бұзу = to pull down · бейнеленген = depicted · алып = huge · созылды = lasted · бейне = image · айырмашылық = difference)', [
        k.mc('What stood in the district for twenty years?', ['an abandoned factory', 'an old school', 'an empty shop'], 0), k.mc('What did the young artists propose?', ['a huge mural of the district’s history', 'pulling the building down', 'a new car park'], 0), k.mc('How long did the work take?', ['two months', 'two years', 'two weeks'], 0), k.mc('Whose images appeared on the wall?', ['former workers of the factory', 'the city authorities', 'famous actors'], 0)]] },

    { id: 'u17', t: 'Шындық па, өсек пе? Checking the news', topic: 'Media',
      v: ['News you can trust', `
қауесет | noun | rumour | Қалада бір қауесет тарады. | | qa-oo-e-SET | A rumour spread through the town.
алғашқы дереккөз | noun | original source | Жаңалықтың алғашқы дереккөзін табыңыз. | | al-ghash-QY de-rek-KOZ | Find the original source of the news.
сенсация | noun | sensation | Газет сенсация іздеді. | | sen-SA-tsi-ya | The newspaper was looking for a sensation.
желі қолданушысы | noun | social media user | Желі қолданушылары жазбаны бөлісті. | | zhe-LI qol-da-noo-shy-SY | Social media users shared the post.
деректі тексеру | noun | fact-checking | Деректі тексеру уақыт алады. | | de-rek-TI tek-se-ROO | Fact-checking takes time.
теріске шығару | verb | to refute, to deny | Министр бұл жаңалықты теріске шығарды. | | te-ris-KE shy-gha-ROO | The minister denied this news.
жаңылыстыру | verb | to mislead | Бұл жазба адамдарды жаңылыстырады. | | zha-ngy-lys-ty-ROO | This post misleads people.
расталмаған | adjective | unconfirmed | Бұл — расталмаған ақпарат. | | ras-tal-ma-GHAN | This is unconfirmed information.
күмәнді | adjective | doubtful, dubious | Бұл — күмәнді сайт. | | ku-man-DI | This is a dubious website.
әсірелеу | verb | to exaggerate | Журналист оқиғаны әсіреледі. | | a-si-re-LEU | The journalist exaggerated the event.`],
      g: ['They say, it seems, according to: showing where information comes from', '<p>At B2 you must show whether you <b>know</b> something or only <b>heard</b> it.</p><table><tr><th>Form</th><th>Meaning</th><th>Example</th></tr><tr><td>… <b>дейді</b></td><td>they say</td><td>Көпір жабылады <b>дейді</b>.</td></tr><tr><td><b>-ған көрінеді</b></td><td>apparently (I was told, or it looks so)</td><td>Мұны бір дереккөз айт<b>қан көрінеді</b>.</td></tr><tr><td><b>-ған сияқты</b></td><td>it seems</td><td>Ол ауырып қал<b>ған сияқты</b>.</td></tr><tr><td><b>… деген сөз бар</b></td><td>there is talk that</td><td>Баға өседі <b>деген сөз бар</b>.</td></tr><tr><td>кімнің + <b>айтуынша</b></td><td>according to (a person)</td><td>Оқытушы<b>ның айтуынша</b>, бұл жалған.</td></tr></table><ul><li>Compare B1: <b>-ыпты, екен</b> also show that you did not see it yourself.</li><li><b>айтуынша</b> is neutral. It only names the source. The others show that you are not sure.</li><li>The ending is -ған, -ген, -қан, -кен by the usual rule: жабыл<b>ған</b>, кел<b>ген</b>, айт<b>қан</b>, кет<b>кен</b>.</li></ul>', [
        k.mc('Көпір жабыл___ көрінеді.', ['ған', 'ып', 'са'], 0),
        k.mc('Оқытушының ___, бұл жаңалық жалған.', ['айтуынша', 'айтқан', 'айтып'], 0),
        k.mc('“Көпір жабылады дейді.” = …', ['They say the bridge will close.', 'The bridge closed yesterday.', 'The bridge must close.'], 0),
        k.mc('Ол ауырып қалған ___. (it seems)', ['сияқты', 'үшін', 'туралы'], 0),
        k.tf('“деген сөз бар” shows that the speaker is completely sure.', false),
        k.ord('Оқытушының айтуынша бұл жаңалық жалған')]],
      r: ['The post he should not have shared', 'Тимур журналистика факультетінде оқиды. Бір күні ол әлеуметтік желіден «Қаланың басты көпірі бір жылға жабылады» деген жазбаны көрді. Мұны әкімдіктегі бір адам айтқан көрінеді. Тимур жазбаны бірден достарына жіберді. Бір сағаттың ішінде оны мыңдаған адам бөлісті.\n\nКешке әкімдік өсекті теріске шығарды: көпір тек екі түнге жабылады екен. Тимур ұялды. «Мен адамдарға көмектесіп жатқан сияқты едім, — дейді ол. — Ал шынында оларды жаңылыстырыппын».\n\nКелесі күні оқытушы студенттерге деректі тексерудің үш қадамын көрсетті. Біріншісі: алғашқы дереккөзді табу. Екіншісі: күніне қарау. Үшіншісі: бұл жаңалық кімге пайдалы деп өзіңнен сұрау. Оның айтуынша, күмәнді мәтін көбіне «дейді» немесе «бәрі біледі» деген сөздерден басталады.\n\nҚазір Тимур мектепте үйірме жүргізеді. Оның жазылушылары — жасөспірімдер, ал үйірменің бірінші ережесі қарапайым: алдымен тексеру, содан кейін бөлісу.\n\n(әлеуметтік желі = social network · жазба = post · ұялды = felt ashamed · қадам = step · үйірме = club · жасөспірім = teenager)', [
        k.mc('What did the post say?', ['The main bridge would close for a year.', 'The bridge had fallen.', 'A new bridge would open.'], 0), k.mc('What was true?', ['The bridge would close for two nights.', 'The bridge would close for a year.', 'Nothing would close.'], 0), k.mc('Which is NOT one of the teacher’s three steps?', ['Count the likes.', 'Find the original source.', 'Look at the date.'], 0), k.mc('What is the first rule of Timur’s club?', ['Check first, then share.', 'Share quickly.', 'Never read the news.'], 0)]] },

    { id: 'u18', t: 'Ғылым тілі. The language of science', topic: 'Science',
      v: ['Doing research', `
ғылыми болжам | noun | scientific hypothesis | Бұл — әзірге ғылыми болжам ғана. | | ghy-ly-MI bol-ZHAM | For now it is only a scientific hypothesis.
сынама | noun | sample (taken for testing) | Ол топырақтан сынама алды. | | sy-na-MA | She took a sample of the soil.
топырақ | noun | soil | Мұнда топырақ жақсы. | | to-py-RAQ | The soil is good here.
бақылау жүргізу | verb | to carry out observation | Ол бір жыл бақылау жүргізді. | | ba-qy-LAU zhur-gi-ZOO | She carried out observation for a year.
іріктеме | noun | sample (set of data) | Іріктеме үлкен болды. | | i-rik-te-ME | The sample was large.
заңдылық | noun | pattern, regularity | Біз бір заңдылықты байқадық. | | zang-dy-LYQ | We noticed a pattern.
өлшеу қателігі | noun | margin of error | Өлшеу қателігі аз. | | ol-SHEU qa-te-li-GI | The margin of error is small.
негізделген | adjective | well-founded | Бұл — негізделген қорытынды. | | ne-giz-del-GEN | This is a well-founded conclusion.
жел эрозиясы | noun | wind erosion | Жел эрозиясы топырақты бұзады. | | zhel e-ro-zi-ya-SY | Wind erosion damages the soil.
орман белдеуі | noun | shelterbelt, line of trees | Орман белдеуі егістікті желден қорғайды. | | or-MAN bel-de-WI | A shelterbelt protects the field from the wind.`],
      g: ['Is, consists of, belongs to: the verbs of formal writing', '<p>Scientific and official Kazakh uses fixed verb phrases. Each needs its own ending on the noun before it.</p><table><tr><th>Phrase</th><th>Meaning</th><th>Example</th></tr><tr><td><b>болып табылады</b></td><td>is (formal)</td><td>Топырақ табиғи байлық <b>болып табылады</b>.</td></tr><tr><td>-дан, -ден, -тан, -тен, -нан, -нен + <b>тұрады</b></td><td>consists of</td><td>Сынама құм мен саз<b>дан тұрады</b>.</td></tr><tr><td>-ға, -ге, -қа, -ке + <b>жатады</b></td><td>belongs to</td><td>Бидай дәнді дақылдар<b>ға жатады</b>.</td></tr><tr><td><b>деп аталады</b></td><td>is called</td><td>Бұл құбылыс эрозия <b>деп аталады</b>.</td></tr><tr><td>-мен, -бен, -пен + <b>байланысты</b></td><td>is connected with</td><td>Мәселе жел<b>мен байланысты</b>.</td></tr></table><p>In conversation say: Топырақ — байлық. In a report write: Топырақ байлық болып табылады.</p>', [
        k.mc('Топырақ табиғи байлық болып ___.', ['табылады', 'тұрады', 'жатады'], 0),
        k.mc('Сынама құм мен саз___ тұрады.', ['дан', 'ға', 'бен'], 0),
        k.mc('Бидай дәнді дақылдар___ жатады.', ['ға', 'дан', 'мен'], 0),
        k.mc('Бұл құбылыс эрозия деп ___.', ['аталады', 'табылады', 'тұрады'], 0),
        k.mc('Мәселе жел___ байланысты.', ['мен', 'ден', 'ге'], 0),
        k.ord('Сынама құм мен саздан тұрады')]],
      r: ['Where did the wheat go?', 'Әлия — жас топырақтанушы. Екі жыл бұрын далалық аудандағы бір фермер одан көмек сұрады: бидай өнімі жыл сайын азайып бара жатты. Фермер мұның себебі құрғақ ауа райы екеніне сенімді болды.\n\nӘлияның гипотезасы басқа еді: мәселе суда емес, топырақтың үстіңгі қабатын ұшырып әкететін желде. Оны тексеру үшін ол әртүрлі егістіктен екі жүз сынама алып, бір жыл бойы бақылау жүргізді.\n\nІріктеме бір заңдылықты көрсетті. Орман белдеуі қорғап тұрған егістіктерде топырақ орнында қалып, өнім жоғары болды. Ашық егістіктерде жел оны көктемде ұшырып әкететін. Әлия өлшеу қателігін де есепке алды: айырмашылық кездейсоқ болу үшін тым үлкен еді.\n\nОның қорытындысы негізделген болды, сондықтан фермер барлық егістіктің айналасына ағаш отырғызды. «Ғылым — пікір емес, — дейді Әлия. — Ғылым сұрақтан, тексеруден және шынайы сандардан тұрады».\n\n(топырақтанушы = soil scientist · қабат = layer · ұшырып әкету = to blow away · егістік = field · есепке алу = to take into account · кездейсоқ = by chance)', [
        k.mc('What did the farmer think the cause was?', ['dry weather', 'the wind', 'bad seeds'], 0), k.mc('What was Aliya’s hypothesis?', ['The wind was carrying the top soil away.', 'There was too much water.', 'The farmer planted too late.'], 0), k.mc('How many samples did she take?', ['two hundred', 'twenty', 'two thousand'], 0), k.mc('What did the farmer do in the end?', ['planted trees around all the fields', 'sold the farm', 'stopped growing wheat'], 0)]] },

    { id: 'u19', t: 'Тек бүгін ғана! How advertising works', topic: 'Advertising',
      v: ['Selling and persuading', `
жарнамалық ролик | noun | advert, commercial | Бұл жарнамалық ролик өте қысқа. | | zhar-na-ma-LYQ RO-lik | This advert is very short.
сауда белгісі | noun | trademark, brand name | Бұл — танымал сауда белгісі. | | sa-oo-DA bel-gi-SI | This is a well-known brand name.
ұран | noun | slogan | Компанияның жаңа ұраны бар. | | oo-RAN | The company has a new slogan.
мақсатты аудитория | noun | target audience | Біздің мақсатты аудиториямыз — студенттер. | | maq-sat-TY a-oo-di-TO-ri-ya | Our target audience is students.
иландыру | verb | to persuade, to convince | Жарнама бізді сатып алуға иландырады. | | i-lan-dy-ROO | Advertising persuades us to buy.
айла-шарғы | noun | trick, manipulation | Бұл кеңес емес, айла-шарғы. | | ay-LA shar-GHY | This is not advice but a trick.
орауыш | noun | wrapper, wrapping | Кәмпиттің орауышы ашық түсті. | | o-ra-WYSH | The sweet has a bright wrapper.
ойланбай сатып алу | noun | impulse buying | Ойланбай сатып алу — қымбат әдет. | | oy-lan-BAY sa-TYP a-LOO | Impulse buying is an expensive habit.
азғыру | verb | to tempt, to lure | Жарнама бізді артық затқа азғырады. | | az-ghy-ROO | Advertising tempts us to buy things we do not need.
адалдық | noun | loyalty, honesty | Брендтер клиенттің адалдығын бағалайды. | | a-dal-DYQ | Brands value customer loyalty.`],
      g: ['Little words with big meanings: ғой, -шы, тіпті, ғана, -ақ', '<p>These short words show your <b>attitude</b>.</p><table><tr><th>Word</th><th>What it does</th><th>Example</th></tr><tr><td><b>ғой, қой</b></td><td>“you know, after all”</td><td>Бұл он мыңға жуық <b>қой</b>. Мен айттым <b>ғой</b>!</td></tr><tr><td><b>-шы, -ші</b></td><td>makes a request softer and friendlier</td><td>Қараңыз<b>шы</b>. Келіңіз<b>ші</b>.</td></tr><tr><td><b>тіпті</b></td><td>even</td><td><b>Тіпті</b> нанның иісі де әсер етеді.</td></tr><tr><td><b>ғана, қана</b> / <b>тек</b></td><td>only</td><td>Сенде <b>ғана</b> жоқ. <b>Тек</b> бүгін.</td></tr><tr><td><b>-ақ</b></td><td>only, just (after a number or a short word)</td><td>Оны екі<b>-ақ</b> рет пайдаландым.</td></tr><tr><td><b>ма екен?</b></td><td>I wonder if…</td><td>Дүкен ертең жабыла <b>ма екен</b>?</td></tr></table><ul><li><b>ғой, ғана</b> become <b>қой, қана</b> after к, қ, п, с, т, ш and other voiceless sounds: жуық <b>қой</b>, рет <b>қана</b>.</li><li><b>тек</b> stands before the word, <b>ғана</b> after it. They can be used together: <b>тек</b> бүгін <b>ғана</b>.</li></ul>', [
        k.mc('Мен айттым ___!', ['ғой', 'ғана', 'тіпті'], 0),
        k.mc('Бағаға қараңыз___.', ['шы', 'ші', 'ғой'], 0),
        k.mc('Оны екі___ рет пайдаландым.', ['-ақ', '-шы', '-ма'], 0),
        k.mc('___ балалар да біледі. (even)', ['Тіпті', 'Тек', 'Ғана'], 0),
        k.tf('“ғана” means “only” and stands after the word.', true),
        k.ord('Мен оны екі рет қана пайдаландым')]],
      r: ['Only today!', 'Данияр он жыл бойы жарнама саласында жұмыс істеп келеді. Ол брендтердің бізді сатып алуға қалай иландыратынын біледі.\n\n«Бағаға қараңызшы: 9 990 теңге. Бұл он мыңға жуық қой, бірақ ми тоғызды көреді, — деп түсіндіреді ол. — Ал „тек бүгін ғана“ деген сөздер ше? Дүкен ертең жабылып қала ма екен? Жоқ, бірақ біз асығамыз».\n\nОның айтуынша, бәрі әсер етеді: дүкендегі баяу музыка, ашық түсті қаптама, тіпті кіреберістегі нанның иісі де. Әр жарнамалық ролик өзінің мақсатты аудиториясына арналған, ал қысқа ұран ұзақ түсіндірмеден жақсы есте қалады.\n\nЖарнама мен айла-шарғының шекарасы қайда? Данияр әділ жарнама тауар туралы айтады, ал әділетсіз жарнама қорқыныш таңады деп санайды: «Бәрінде бар, сенде ғана жоқ».\n\nӨзі де мінсіз емес: былтыр ойланбай шырын сыққыш сатып алып, оны екі-ақ рет пайдаланды. Қазір оның ережесі бар: жиырма төрт сағат күту. «Шынымен осылай оңай ма? Иә. Бір күннен кейін тілектің жартысы жоғалады».\n\n(ми = brain · асығу = to hurry · кіреберіс = entrance · шекара = border · мінсіз = perfect · шырын сыққыш = juicer · тілек = wish)', [
        k.mc('Why do shops write 9,990 and not 10,000?', ['The brain sees nine.', 'It is the law.', 'It is easier to count.'], 0), k.mc('What does dishonest advertising push on us, according to Daniyar?', ['fear', 'facts about the product', 'slow music'], 0), k.mc('What did Daniyar buy without thinking?', ['a juicer', 'a phone', 'a car'], 0), k.mc('What is his rule now?', ['Wait twenty-four hours.', 'Never go shopping.', 'Buy only today.'], 0)]] },

    { id: 'u20', t: 'Жер мен су. Land and water', topic: 'Farming',
      v: ['On the farm', `
шаруа қожалығы | noun | farm | Оның шағын шаруа қожалығы бар. | | sha-roo-A qo-zha-ly-GHY | He has a small farm.
түсімділік | noun | crop yield | Биыл түсімділік жоғары. | | tu-sim-di-LIK | The yield is high this year.
тыңайтқыш | noun | fertiliser | Ол тыңайтқышты азайтты. | | ty-ngayt-QYSH | He cut down on fertiliser.
қуаңшылық | noun | drought | Қуаңшылық егісті құртты. | | qoo-ang-shy-LYQ | The drought destroyed the crops.
тамшылатып суару | noun | drip irrigation | Тамшылатып суару суды үнемдейді. | | tam-shy-la-TYP soo-a-ROO | Drip irrigation saves water.
жайылым | noun | pasture | Сиырлар жайылымда жүр. | | zha-yy-LYM | The cows are in the pasture.
егіс | noun | sowing; sown crop | Егіс мамырда басталады. | | e-GIS | Sowing begins in May.
дәнді дақыл | noun | grain crop, cereal | Бидай — дәнді дақыл. | | dan-DI da-QYL | Wheat is a grain crop.
арамшөп | noun | weed | Бақшада арамшөп көп. | | a-ram-SHOP | There are a lot of weeds in the vegetable garden.
құнарлы | adjective | fertile | Мұнда жер құнарлы. | | qoo-nar-LY | The land here is fertile.`],
      g: ['If it were not for…, otherwise', '<table><tr><th>Pattern</th><th>Meaning</th><th>Example</th></tr><tr><td>noun + <b>болмағанда</b>, … <b>-ар еді</b></td><td>if it were not for, but for</td><td>Суару жүйесі <b>болмағанда</b>, біз астықтан айырыл<b>ар едік</b>.</td></tr><tr><td>… <b>-мас еді</b></td><td>would not have</td><td>Сен болмағанда, мен үлгер<b>мес едім</b>.</td></tr><tr><td><b>әйтпесе</b></td><td>otherwise, or else</td><td>Жиі суар, <b>әйтпесе</b> бәрі қурап қалады.</td></tr><tr><td><b>олай болмаған жағдайда</b></td><td>otherwise (formal)</td><td>Жұмаға дейін төлеңіз, <b>олай болмаған жағдайда</b> шарт тоқтатылады.</td></tr></table><ul><li><b>болмағанда</b> does not change for the person: сен <b>болмағанда</b>, достарым <b>болмағанда</b>.</li><li>The second half is the unreal form from B1, Unit 8: <b>-ар, -ер + еді</b>; the negative is <b>-мас, -мес + еді</b>.</li><li>It can be good news or bad news: Сен болмағанда, мен кешігер едім. (Thanks to you I was on time.)</li></ul>', [
        k.mc('Суару жүйесі ___, біз астықтан айырылар едік.', ['болмағанда', 'болғанда', 'болса'], 0),
        k.mc('Сен болмағанда, мен кешіг___ едім.', ['ер', 'ген', 'іп'], 0),
        k.mc('Сен болмағанда, мен үлгер___ едім. (would not have)', ['мес', 'ген', 'ер'], 0),
        k.mc('Жиі суар, ___ бәрі қурап қалады.', ['әйтпесе', 'өйткені', 'сондықтан'], 0),
        k.mc('“Көршілер болмағанда, мен үлгермес едім.” = …', ['The neighbours helped me.', 'The neighbours did not help me.', 'I have no neighbours.'], 0),
        k.ord('Сен болмағанда мен кешігер едім')]],
      r: ['The dry year', 'Өткен жаз жиырма жылдағы ең құрғақ жаз болды. Құрғақшылық ауданның көптеген шаруа қожалығында егісті құртты. Бірақ Серіктің егістігі жасыл күйінде қалды.\n\nЕкі жыл бұрын ол несие алып, тамшылатып суару жүйесін орнатқан болатын. Көршілері күлген: жаңбыр тегін болса, ақшаны неге шашу керек? «Суару жүйесі болмағанда, біз бар астықтан айырылар едік, — дейді Серік. — Маған тәуекел етуге тура келді, әйтпесе қожалық аман қалмас еді».\n\nОл басқа нәрсені де өзгертті: топырақ суды ұстап тұруы үшін жерді аз жыртатын болды, тыңайтқышты да азайтты, өйткені құнарлы жер артық химияны ұнатпайды. Өнімділік бірден өскен жоқ — бірінші жыл қиын болды, арамшөп көбейді.\n\nҚұрғақшылық келгенде, Серік сумен екі көршісімен бөлісті. Күзде үшеуі кооператив құрып, қазір техниканы бірге сатып алады.\n\n«Сол құрғақ жыл болмағанда, біз әлі күнге дейін жеке-жеке жұмыс істеп жүрер едік», — деп күледі ол.\n\n(құртты = destroyed · тамшылатып суару = drip irrigation · шашу = to waste · тәуекел ету = to take a risk · жырту = to plough · жеке-жеке = each on his own)', [
        k.mc('What did Serik do two years ago?', ['He took a loan and put in drip irrigation.', 'He sold his fields.', 'He bought more cows.'], 0), k.mc('Why did the neighbours laugh?', ['They thought it was a waste of money.', 'His fields were too small.', 'He planted too early.'], 0), k.tf('The yield grew in the very first year.', false), k.mc('What did the three farmers do in the autumn?', ['They set up a cooperative.', 'They moved to the city.', 'They stopped farming.'], 0)]] },

    { id: 'u21', t: 'Бастық па, көшбасшы ма? Leading a team', topic: 'Work',
      v: ['Working as a team', `
бағынышты | adjective | subordinate | Оның алты бағынышты қызметкері бар. | | ba-ghy-nysh-TY | She has six members of staff under her.
міндет жүктеу | verb | to give someone a duty, to delegate | Жақсы басшы міндет жүктей біледі. | | min-DET zhuk-TEU | A good boss knows how to delegate.
келіспеушілік | noun | disagreement | Арамызда келіспеушілік болды. | | ke-lis-peu-shi-LIK | There was a disagreement between us.
ымыра | noun | compromise | Біз ымыраға келдік. | | y-my-RA | We reached a compromise.
сенім арту | verb | to put your trust in | Басшы қызметкерлеріне сенім артады. | | se-NIM ar-TOO | The boss puts her trust in her staff.
өкілеттік | noun | authority, powers | Менде мұндай өкілеттік жоқ. | | o-ki-let-TIK | I do not have that authority.
ұйымшыл | adjective | close-knit, united | Біздің топ ұйымшыл. | | oo-yym-SHYL | Our team is close-knit.
тәлімгер | noun | mentor | Жаңа қызметкердің тәлімгері бар. | | ta-lim-GER | The new member of staff has a mentor.
өзара түсіністік | noun | mutual understanding | Топта өзара түсіністік бар. | | o-za-RA tu-si-nis-TIK | There is mutual understanding in the group.
бастама | noun | initiative | Ол бастама көтерді. | | bas-ta-MA | He took the initiative.`],
      g: ['Both … and, not only … but also, either … or: joining words in pairs', '<table><tr><th>Pair</th><th>Meaning</th><th>Example</th></tr><tr><td>… <b>да</b>, … <b>да</b></td><td>both … and</td><td>Тәжірибелілер <b>де</b>, жаңадан келгендер <b>де</b> үндемеді.</td></tr><tr><td><b>әрі … әрі</b></td><td>both … and (two qualities of one person or thing)</td><td>Ол <b>әрі</b> басшы, <b>әрі</b> дос.</td></tr><tr><td><b>-ып қана қоймай</b>, …</td><td>not only … but also</td><td>Ол тексер<b>іп қана қоймай</b>, есептерді қайта жазатын.</td></tr><tr><td><b>не … не</b></td><td>either … or</td><td>Тапсырманы <b>не</b> толық аласыз, <b>не</b> мүлде алмайсыз.</td></tr><tr><td><b>бірде … бірде</b></td><td>now … now</td><td>Ол <b>бірде</b> ашуланады, <b>бірде</b> өзін кінәлайды.</td></tr></table><ul><li><b>да, де, та, те</b> follows the usual rule: дарын <b>да</b>, тәжірибе <b>де</b>, топ <b>та</b>.</li><li>With a negative verb, <b>… да, … да</b> means <i>neither … nor</i>: Дарын <b>да</b>, тәжірибе <b>де</b> көмектес<b>пей</b>ді.</li></ul>', [
        k.mc('Ол ___ басшы, әрі дос.', ['әрі', 'не', 'бірде'], 0),
        k.mc('Тәжірибелілер де, жаңадан келгендер ___ үндемеді.', ['де', 'не', 'әрі'], 0),
        k.mc('Ол тексеріп қана ___, есептерді қайта жазатын.', ['қоймай', 'қойып', 'қойса'], 0),
        k.mc('Ол ___ ашуланады, бірде өзін кінәлайды.', ['бірде', 'әрі', 'не'], 0),
        k.mc('“Тапсырманы не аласыз, не алмайсыз.” = …', ['You either take the task or you do not.', 'You take the task and do it.', 'You never take the task.'], 0),
        k.ord('Ол әрі басшы әрі дос')]],
      r: ['The boss who did everything herself', 'Заринаны алты адамнан тұратын топтың жетекшісі етіп тағайындады. Ол бөлімдегі ең мықты маман еді, сондықтан жақсы басшы бәрін өзі істейді деп ойлады. Ол әр ұсақ-түйекті тексеріп қана қоймай, түнде өзгелердің есептерін қайта жазатын.\n\nҮш айдан кейін тәжірибелі қызметкерлер де, жаңадан келгендер де жиналыста үндемейтін болды. Екі бағынышты қызметкер жұмыстан шықпақшы болды. Зарина бірде ашуланып, бірде өзін кінәлайтын.\n\nКері байланыс көмектесті. Ол әркімнен жұмысқа не кедергі келтіретінін шынын айтып жазуды сұрады. Жауаптар ұқсас болды: «Бізге сенбейді», «Бізде өкілеттік жоқ», «Бастама көтерген жазаланады».\n\nЗарина міндет жүктеуді үйренді: адам тапсырманы не толық алады, не мүлде алмайды. Келіспеушіліктерді қазір ашық талқылап, ымыра іздейді.\n\nБүгінде топ ұйымшыл, ешкім жұмыстан кеткен жоқ. «Дарын да, тәжірибе де өзара түсіністіктің орнын баса алмайды, — дейді Зарина. — Басқару — бәрін өзің істеу емес, басқалардың жақсы істеуіне көмектесу».\n\n(тағайындады = appointed · ұсақ-түйек = small detail · үндемеу = to stay silent · кінәлау = to blame · кедергі келтіру = to get in the way · орнын басу = to replace)', [
        k.mc('How many people are in Zarina’s group?', ['six', 'three', 'twelve'], 0), k.mc('What did she do at night?', ['rewrote other people’s reports', 'studied management', 'looked for a new job'], 0), k.mc('What did the answers have in common?', ['People felt they were not trusted.', 'People wanted more money.', 'People wanted a new office.'], 0), k.tf('In the end two people left the group.', false)]] },

    { id: 'u22', t: 'Жас — кедергі емес. Growing older', topic: 'Society',
      v: ['Later life', `
ұзақ өмір сүру | verb | to live a long life | Ұзақ өмір сүрудің сыры неде? | | oo-ZAQ o-MIR su-ROO | What is the secret of living a long life?
жалғыздық | noun | loneliness | Ол жалғыздықты сезінді. | | zhal-ghyz-DYQ | She felt loneliness.
даналық | noun | wisdom | Даналық тәжірибемен келеді. | | da-na-LYQ | Wisdom comes with experience.
әжім | noun | wrinkle | Оның көзінің жанында әжім бар. | | a-ZHIM | He has wrinkles by his eyes.
ақ шашты | adjective | grey-haired, white-haired | Ақ шашты кісі — менің атам. | | aq shash-TY | The grey-haired man is my grandfather.
ширақ | adjective | spry, lively | Атам әлі ширақ. | | shi-RAQ | My grandfather is still spry.
замандас | noun | person of the same generation | Олар — менің замандастарым. | | za-man-DAS | They are people of my generation.
зейнетке шығу | verb | to retire | Ол былтыр зейнетке шықты. | | zey-net-KE shy-GHOO | She retired last year.
егде жас | noun | old age, advanced years | Ол егде жаста да жұмыс істейді. | | eg-DE zhas | He works even at an advanced age.
масыл | noun | burden, someone who lives off others | Мен ешкімге масыл болғым келмейді. | | ma-SYL | I do not want to be a burden to anyone.`],
      g: ['Very, too, brand new, more and more: making it stronger', '<table><tr><th>Form</th><th>Meaning</th><th>Example</th></tr><tr><td><b>ең</b></td><td>the most (A2)</td><td><b>ең</b> қарапайым бейне</td></tr><tr><td><b>аса</b></td><td>extremely (careful speech)</td><td><b>аса</b> маңызды сыр</td></tr><tr><td><b>тым</b></td><td>too (more than is good)</td><td>Бұл <b>тым</b> қымбат.</td></tr><tr><td><b>әлдеқайда</b> + -рақ, -рек</td><td>much, far</td><td><b>әлдеқайда</b> көп адам; <b>әлдеқайда</b> жақсы<b>рақ</b></td></tr><tr><td><b>барған сайын</b></td><td>more and more</td><td>Мен өзімді <b>барған сайын</b> сергек сезінемін.</td></tr><tr><td>first sounds + <b>п</b></td><td>completely, very</td><td><b>ап</b>-ақ, <b>қып</b>-қызыл, <b>жап</b>-жаңа, <b>тап</b>-таза</td></tr></table><ul><li>For the last form, take the word up to its first vowel, add <b>п</b>, then say the whole word: жа-ңа → <b>жап</b>-жаңа (brand new), қы-зыл → <b>қып</b>-қызыл (bright red), ақ → <b>ап</b>-ақ (snow-white).</li><li><b>тым</b> is a complaint. <b>өте</b> and <b>аса</b> are not.</li></ul>', [
        k.mc('Бұл көйлек ___ қымбат, мен ала алмаймын.', ['тым', 'ең', 'сайын'], 0),
        k.mc('Алғашқы бейнені ___ көп адам көрді.', ['әлдеқайда', 'барған', 'тап'], 0),
        k.mc('Мен өзімді барған ___ сергек сезінемін.', ['сайын', 'соң', 'кезде'], 0),
        k.mc('жаңа → “brand new” = …', ['жап-жаңа', 'жаң-жаңа', 'жа-жаңа'], 0),
        k.mc('ақ → “snow-white” = …', ['ап-ақ', 'ақ-ап', 'ақп-ақ'], 0),
        k.ord('Мен өзімді барған сайын сергек сезінемін')]],
      r: ['Forty thousand grandchildren', 'Роза апа жетпіс төрт жаста. Зейнетке шыққаннан кейін ол жалғыздықты сезінді: балалары алыста тұрды, құрдастары ауырып жүрді, күндер бір-біріне ұқсас болды. «Мен өзімді масыл сияқты сезіндім», — деп еске алады ол.\n\nНемересі оған бауырсақ пісіру туралы қысқа бейне түсіруді ұсынды. Роза апа бірден келіскен жоқ: ап-ақ шаш, әжім — бұл кімге қызық? Өте көп адамға қызық екен. Алғашқы бейнені ол күткеннен әлдеқайда көп адам көрді.\n\nБүгінде оның қырық мың жазылушысы бар. Ол тек тағам туралы ғана емес, ауылдағы балалық шағы туралы да айтады. Ең танымал бейнелері — ең қарапайымдары: шай, ескі суреттер, әңгімелер.\n\n«Егде жас — өмірдің соңы емес, — дейді ол. — Мен өзімді барған сайын сергек сезінемін. Ұзақ өмір сүрудің сыры тұқымда дейді. Ал менің ойымша, аса маңызды сыр — біреуге керек болу. Даналық жылдармен емес, саған қойылатын сұрақтармен келеді».\n\n(бауырсақ = fried dough balls · бейне түсіру = to film a video · күткеннен = than expected · балалық шақ = childhood · сыр = secret · тұқым = here: family line, genes)', [
        k.mc('How did Roza feel after she retired?', ['lonely', 'very busy', 'rich'], 0), k.mc('Who suggested the first video?', ['her grandchild', 'her son', 'a neighbour'], 0), k.mc('What was the first video about?', ['how to make baursaks', 'her childhood', 'old photographs'], 0), k.mc('What does she think is the most important secret?', ['being needed', 'a good family line', 'sleeping a lot'], 0)]] },

    { id: 'u23', t: '…байланысты. Writing to an office', topic: 'Formal language',
      v: ['Official letters', `
жолданым | noun | official request, appeal | Біз әкімдікке жолданым жаздық. | | zhol-da-NYM | We wrote a request to the akimat.
қарастыру | verb | to consider, to examine | Мәселемізді қарастыруыңызды сұраймыз. | | qa-ras-ty-ROO | We ask you to consider our question.
хабардар ету | verb | to notify | Бізді шешім туралы хабардар етті. | | kha-bar-DAR e-TOO | We were notified of the decision.
құзырлы орган | noun | the authority responsible | Бұл мәселені құзырлы орган шешеді. | | qoo-zyr-LY or-GAN | The authority responsible decides this question.
лауазымды тұлға | noun | official (person) | Хатты лауазымды тұлға алды. | | la-oo-a-zym-DY tool-GHA | An official received the letter.
куәландыру | verb | to certify | Көшірмені куәландыру керек. | | ku-a-lan-dy-ROO | The copy needs to be certified.
қоса тіркеу | verb | to attach, to enclose | Хатқа суреттерді қоса тіркеңіз. | | qo-SA tir-KEU | Attach the photographs to the letter.
қарау мерзімі | noun | time allowed for a reply | Қарау мерзімі — бір ай. | | qa-RAU mer-zi-MI | The time allowed for a reply is one month.
қабылдамау | verb | to reject, not to accept | Олар жолданымды қабылдамады. | | qa-byl-da-MAU | They rejected the request.
тіркеу бөлімі | noun | registry, registration desk | Хатты тіркеу бөліміне тапсырыңыз. | | tir-KEU bo-li-MI | Hand the letter in at the registry.`],
      g: ['In connection with, in accordance with: the words of official Kazakh', '<table><tr><th>Word</th><th>Ending before it</th><th>Example</th></tr><tr><td><b>байланысты</b> (in connection with, because of)</td><td>-ға, -ге, -қа, -ке</td><td>Жөндеу<b>ге байланысты</b> кеңсе жабық.</td></tr><tr><td><b>сәйкес</b> (in accordance with)</td><td>-ға, -ге, -қа, -ке</td><td>Жоспар<b>ға сәйкес</b> жөндеу сәуірде басталады.</td></tr><tr><td><b>ішінде</b> (within)</td><td>no ending</td><td>Жауап бір ай <b>ішінде</b> келеді.</td></tr><tr><td><b>мақсатында</b> (for the purpose of)</td><td>the -у form, no ending</td><td>Қауіпсіздікті сақтау <b>мақсатында</b> есік жабық.</td></tr><tr><td><b>жөнінде</b> (concerning)</td><td>no ending</td><td>Мен жолданым <b>жөнінде</b> хабарласып тұрмын.</td></tr><tr><td><b>негізінде</b> (on the basis of)</td><td>no ending</td><td>Шарт <b>негізінде</b> ақшаны қайтаруды сұраймыз.</td></tr></table><ul><li>Everyday speech: жөндеу <b>үшін</b>, жоспар <b>бойынша</b>, жолданым <b>туралы</b>.</li><li>Official letters like the “we ask” form: <b>… -уыңызды сұраймыз</b> = we ask you to …</li></ul>', [
        k.mc('Жөндеу___ байланысты кеңсе жабық.', ['ге', 'ден', 'мен'], 0),
        k.mc('Жоспарға ___ жөндеу сәуірде басталады.', ['сәйкес', 'ішінде', 'жөнінде'], 0),
        k.mc('Жауап бір ай ___ келеді.', ['ішінде', 'сәйкес', 'байланысты'], 0),
        k.mc('Мен жолданым ___ хабарласып тұрмын.', ['жөнінде', 'ішінде', 'мақсатында'], 0),
        k.mc('Which is everyday speech?', ['жоспар бойынша', 'жоспарға сәйкес', 'жоспар негізінде'], 0),
        k.ord('Жауап бір ай ішінде келеді')]],
      r: ['Two letters about one playground', 'Он екінші үйдің ауласындағы балалар ойын алаңы бұзылып қалды. Тұрғындар әкімдікке ашулы хат жазды: «Қашанғы күтеміз? Бірдеңе істеңіздер!» Жауап болмады.\n\nЗаңгер көрші Гүлнар түсіндірді: «Құзырлы орган сезімге емес, жолданымға жауап береді. Лауазымды тұлға кім жазып отырғанын, не туралы жазғанын және не сұрайтынын түсінуі керек».\n\nЕкінші хат басқаша болды. Ол мына сөздермен басталды: «Балалар ойын алаңының апатты жағдайына байланысты оны жөндеу мәселесін бір ай ішінде қарастыруыңызды сұраймыз». Тұрғындар деректерді сипаттап, күндерін көрсетіп, суреттерді қоса тіркеді. Хаттың көшірмесін қырық тұрғынның қолымен куәландырып, кеңсеге тапсырды.\n\nҮш аптадан кейін оларды хабардар етті: жоспарға сәйкес жөндеу сәуірде басталады. Бас тарту болған жоқ.\n\nКөктемде алаң жөнделді. «Ресми стиль құрғақ көрінеді, — дейді Гүлнар. — Бірақ ол бір-ақ бетте ең бастысын істейді: сіздің өз құқығыңызды білетініңізді және өзгенің уақытын сыйлайтыныңызды көрсетеді».\n\n(ойын алаңы = playground · тұрғын = resident · қашанғы = how long · апатты жағдай = dangerous condition · көшірме = copy · қолымен = with the signature · сыйлау = to respect)', [
        k.mc('What happened to the first letter?', ['There was no answer.', 'It was refused.', 'It was lost in the post.'], 0), k.mc('What is Gulnar’s job?', ['lawyer', 'official', 'journalist'], 0), k.mc('What did the residents attach to the second letter?', ['photographs', 'money', 'a toy'], 0), k.mc('When were they notified?', ['after three weeks', 'the next day', 'after a year'], 0)]] },

    { id: 'u24', t: 'Мен енді не істей аламын. B2 review', topic: 'Review',
      v: ['Talking about your progress', `
еркін сөйлеу | verb | to speak fluently | Еркін сөйлеу тәжірибемен келеді. | | er-KIN soy-LEU | Speaking fluently comes with practice.
сөз байлығы | noun | richness of vocabulary | Оның сөз байлығы мол. | | soz bay-ly-GHY | He has a rich stock of words.
тіл иесі | noun | native speaker | Ол тіл иесі сияқты сөйлейді. | | til i-ye-SI | He speaks like a native speaker.
мүдіру | verb | to stumble, to falter (in speech) | Мен толқығанда мүдіремін. | | mu-di-ROO | I stumble when I am nervous.
ойын жеткізу | verb | to get your thought across | Ол ойын анық жеткізеді. | | o-YYN zhet-ki-ZOO | He gets his thoughts across clearly.
игеру | verb | to master, to take in | Мен бұл ережені игердім. | | i-ge-ROO | I have mastered this rule.
тілдік кедергі | noun | language barrier | Тілдік кедергіні жеңуге болады. | | til-DIK ke-der-GI | The language barrier can be overcome.
интонация | noun | intonation | Сұрақтың интонациясы басқа. | | in-to-NA-tsi-ya | A question has a different intonation.
машық | noun | skill, practised habit | Сөйлеу — машықты қажет етеді. | | ma-SHYQ | Speaking takes practice.
шыңдау | verb | to hone, to sharpen (a skill) | Мен қазақшамды шыңдап жүрмін. | | shyng-DAU | I am honing my Kazakh.`],
      g: ['The patterns of B2', '<p>These are the main patterns of the level. If one is not clear, go back to its unit.</p><table><tr><th>Unit</th><th>Pattern</th><th>Example</th></tr><tr><td>1</td><td>a whole sentence as an object</td><td>Оның кел<b>генін</b> білемін.</td></tr><tr><td>2</td><td>making someone do it</td><td>Мен шашымды қи<b>дыр</b>дым.</td></tr><tr><td>3</td><td>helper verbs</td><td>жаз<b>а бастады</b>, оқ<b>ып болды</b>, жас<b>ап көрді</b></td></tr><tr><td>4</td><td>advice</td><td>Демал<b>ғаныңыз жөн</b>.</td></tr><tr><td>7</td><td>because, until, every time</td><td><b>-ғандықтан</b>, <b>-ғанша</b>, <b>-ған сайын</b></td></tr><tr><td>9</td><td>whatever, however</td><td><b>Қанша</b> қиын бол<b>са да</b>…</td></tr><tr><td>10</td><td>no time to, nothing to</td><td>Менің демал<b>атын уақытым жоқ</b>.</td></tr><tr><td>11</td><td>I intend to</td><td>Мен бар<b>мақшы</b>мын.</td></tr><tr><td>12</td><td>I had to</td><td>Маған кет<b>уге тура келді</b>.</td></tr><tr><td>15</td><td>in spite of, until</td><td><b>-ғанына қарамастан</b>, <b>-ғанға дейін</b></td></tr><tr><td>17</td><td>the source of information</td><td><b>-ған көрінеді</b>, <b>айтуынша</b></td></tr><tr><td>20</td><td>if it were not for</td><td>Сен <b>болмағанда</b>, мен кешіг<b>ер едім</b>.</td></tr><tr><td>23</td><td>official words</td><td><b>-ға байланысты</b>, <b>-ға сәйкес</b></td></tr></table>', [
        k.mc('Мен оның кел___ білемін.', ['генін', 'ген', 'генде'], 0),
        k.mc('Қанша қиын бол___ да, мен берілмеймін.', ['са', 'ған', 'ып'], 0),
        k.mc('Мен ертең бар___мын. (I intend to)', ['мақшы', 'ған', 'атын'], 0),
        k.mc('Маған ерте кетуге тура ___.', ['келді', 'барды', 'алды'], 0),
        k.mc('Достарым ___, мен берілер едім.', ['болмағанда', 'болғанда', 'болса да'], 0),
        k.ord('Достарым болмағанда мен берілер едім')]],
      r: ['A letter from a learner', 'Екі жыл бұрын мен Қазақстанға келгенде тіпті шайға тапсырыс бере алмайтынмын. Кеше әріптесіммен фильм туралы жарты сағат қазақша пікір таластырдым. Қанша қиын болса да, тастап кетпегеніме қуанамын.\n\nМаған не көмектесті? Біріншіден, мен қателесуден қорқуды қойдым. Тіл иелері сен мүдірген кезде күлмейді; сенің тырысқаның оларға ұнайды. Екіншіден, мен жеке сөздерді емес, тіркестерді жаттадым: сөз сөйлемнің ішінде өмір сүрсе, сөздік қор тезірек өседі. Үшіншіден, дауыс ырғағын игеру үшін күн сайын тірі сөзді тыңдадым.\n\nТілдік кедергі бір күнде жоғалған жоқ. Мен сөйлеген сайын ол аласара берді. Сөйлемімді аяқтағанша шыдап күткен достарым болмағанда, мен берілер едім.\n\nЕркін сөйлеуге әлі алыс, жетілдіретін нәрсем көп. Бірақ қазір мен ойымды басқалар түсінетіндей жеткізе аламын. Дағды деген — осы.\n\nТом, Алматы\n\n(пікір таластыру = to argue · тіркес = phrase · аласару = to get lower · шыдап күту = to wait patiently · берілу = to give up)', [
        k.mc('What could Tom not do two years ago?', ['order tea', 'read English', 'find a job'], 0), k.mc('What did he learn instead of single words?', ['phrases', 'grammar tables', 'songs'], 0), k.mc('Who helped him not to give up?', ['friends who waited patiently', 'his teacher at school', 'a phone app'], 0), k.tf('Tom says he is already completely fluent.', false)]] }
  ]);
})();
