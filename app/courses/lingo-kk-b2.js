/* IF Lingo · Kazakh B2: an original IF Academy course for people who speak English and have finished Kazakh B1.
   Word lines: word | part of speech | meaning in English | example | (empty) | how to say it | the example in English.
   Plan: 24 units and a level test (project doc claude/if-lingo.md). Built so far: units 1 to 8. */
IFX.course({
  id: 'kk-b2', track: 'lang', lang: 'kk-KZ', level: 'B2', next: 'C1', icon: '🇰🇿',
  title: 'Kazakh B2', sub: 'Confident Kazakh',
  blurb: 'Discuss generations, work, the media, wellbeing, tourism, consumer habits, cities and the climate, and read longer texts. The first 8 of 24 units, explained in English.',
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
        k.mc('Why did the sea begin to dry up?', ['River water was taken to irrigate fields.', 'It stopped raining.', 'A dam broke.'], 0), k.mc('When was the Kokaral dam built?', ['in 2005', 'in 1960', 'in 1991'], 0), k.mc('Which part of the sea is recovering?', ['the northern part', 'the southern part', 'the whole sea'], 0), k.tf('The text says the whole sea will be fully restored.', false)]] }
  ]);
})();
