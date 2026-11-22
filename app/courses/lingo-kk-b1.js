/* IF Lingo · Kazakh B1: an original IF Academy course for people who speak English and have finished Kazakh A2.
   Word lines: word | part of speech | meaning in English | example | (empty) | how to say it | the example in English.
   Plan: 24 units and a level test (project doc claude/if-lingo.md). Built so far: units 1 to 16. */
IFX.course({
  id: 'kk-b1', track: 'lang', lang: 'kk-KZ', level: 'B1', next: 'B2', icon: '🇰🇿',
  title: 'Kazakh B1', sub: 'Independent Kazakh',
  blurb: 'Talk about relationships, study, work, health, travel, housing, nature, technology, the news, culture, sport and money in longer sentences. The first 16 of 24 units, explained in English.',
  units: []
});
(function () {
  var k = IFX.k;
  IFX.make('kk-b1', [
    { id: 'u1', t: 'Қарым-қатынас. People and relationships', topic: 'Relationships',
      v: ['Friends and family', `
қарым-қатынас | noun | relationship, relations | Біздің қарым-қатынасымыз жақсы. | | qa-RYM qa-ty-NAS | We have a good relationship.
сенім | noun | trust | Достықта сенім маңызды. | | se-NIM | Trust is important in friendship.
ұрысу | verb | to quarrel | Біз сирек ұрысамыз. | | oo-ry-SOO | We rarely quarrel.
татуласу | verb | to make up | Олар тез татуласты. | | ta-too-la-SOO | They made up quickly.
қолдау | verb | to support | Отбасым мені әрқашан қолдайды. | | qol-DAU | My family always supports me.
араласу | verb | to socialise, to keep in touch | Біз күн сайын араласамыз. | | a-ra-la-SOO | We keep in touch every day.
ортақ | adjective | common, shared | Бізде ортақ қызығушылық көп. | | or-TAQ | We have many interests in common.
жалғыз | adjective | alone, lonely | Ол өзін жалғыз сезінеді. | | zhal-GHYZ | He feels lonely.
достық | noun | friendship | Біздің достығымыз мықты. | | dos-TYQ | Our friendship is strong.
құрмет | noun | respect | Үлкендерге құрмет көрсетіңіз. | | qoor-MET | Show respect to your elders.`],
      g: ['The person who…, the book that…', '<p>Kazakh has no word like <i>who</i> or <i>that</i>. The verb takes an ending and stands <b>before</b> the noun, like an adjective.</p><table><tr><th>Meaning</th><th>Ending</th><th>Examples</th></tr><tr><td>who <b>did</b>, that was done</td><td><b>-ған, -ген, -қан, -кен</b> (Unit 7 of A2)</td><td>кел<b>ген</b> адам = the person who came<br>мен оқы<b>ған</b> кітап = the book that I read</td></tr><tr><td>who <b>does</b>, that is usually done</td><td><b>-атын, -етін</b> after a consonant<br><b>-йтын, -йтін</b> after a vowel</td><td>Астанада тұр<b>атын</b> дос = a friend who lives in Astana<br>жұмыс істе<b>йтін</b> адам = a person who works</td></tr></table><ul><li>Бұл — мен көр<b>ген</b> фильм. = This is the film that I saw.</li><li>Ол — мені қолда<b>йтын</b> адам. = He is a person who supports me.</li></ul>', [
        k.mc('Кеше кел___ адам — менің досым.', ['ген', 'ған', 'етін'], 0),
        k.mc('Мен оқы___ кітап өте қызық.', ['ған', 'ген', 'қан'], 0),
        k.mc('Астанада тұр___ досым бар. (who lives)', ['атын', 'етін', 'йтын'], 0),
        k.mc('Бұл — банкте жұмыс істе___ адам. (who works)', ['йтін', 'йтын', 'атын'], 0),
        k.mc('“the film that I saw” = …', ['мен көрген фильм', 'фильм мен көрдім', 'мен фильм көретін'], 0),
        k.ord('Бұл мен оқыған кітап')]],
      r: ['My closest friend', 'Әр адамның сенетін адамдары болады. Менің ондай адамым — Марат, мектепте бірге оқыған досым.\n\nБіз мүлдем ұқсас емеспіз. Марат сабырлы және салмақты, ал мен әзілдегенді жақсы көремін. Бірақ ортақ нәрсеміз көп: екеуміз де тау мен футболды жақсы көреміз.\n\nӘрине, кейде ұрысамыз. Былтыр бір ай бойы араласқан жоқпыз! Содан кейін Марат бірінші болып қоңырау шалды, біз татуластық.\n\nҚазір ол басқа қалада тұрады, бірақ біз күн сайын дерлік сөйлесеміз. Ол — мені әрқашан қолдайтын адам. Жақын дос — үлкен бақыт деп ойлаймын.\n\n(әзілдеу = to joke · екеуміз де = both of us · бір ай бойы = for a whole month · дерлік = almost)', [
        k.mc('Where did the writer and Marat meet?', ['at school', 'at work', 'in the mountains'], 0), k.tf('The two friends have the same character.', false), k.mc('Who phoned first after the quarrel?', ['Marat', 'the writer', 'their teacher'], 0), k.tf('They still talk almost every day.', true)]] },

    { id: 'u2', t: 'Білім. Education', topic: 'Education',
      v: ['Study words', `
білім | noun | education, knowledge | Оның жоғары білімі бар. | | bi-LIM | She has a university education.
пән | noun | subject | Менің сүйікті пәнім — тарих. | | pan | My favourite subject is history.
оқытушы | noun | lecturer, teacher | Біздің оқытушымыз өте қатал. | | o-qy-too-SHY | Our lecturer is very strict.
дәріс | noun | lecture | Дәріс сағат тоғызда басталады. | | da-RIS | The lecture begins at nine.
тапсыру | verb | to take (an exam), to hand in | Ертең мен емтихан тапсырамын. | | tap-sy-ROO | Tomorrow I am taking an exam.
үй тапсырмасы | noun | homework | Мен үй тапсырмасын орындап жатырмын. | | uy tap-syr-ma-SY | I am doing my homework.
дағды | noun | skill | Бұл пайдалы дағды. | | dagh-DY | This is a useful skill.
шәкіртақы | noun | scholarship, grant | Ол шәкіртақы алады. | | sha-kir-ta-QY | She gets a scholarship.
ғылым | noun | science | Ол ғылыммен айналысады. | | ghy-LYM | He works in science.
зерттеу | noun | research | Бұл қызықты зерттеу. | | zert-TEU | This is interesting research.`],
      g: ['After doing, before doing', '<p><b>After…</b>: the <b>-ған, -ген, -қан, -кен</b> form + <b>-нан, -нен кейін</b>.</p><ul><li>Мен сабақ біт<b>кеннен кейін</b> үйге барамын. = After the lesson ends, I go home.</li><li>Университетке кел<b>геннен кейін</b> мен кітапханаға бардым. = After I came to the university, I went to the library.</li></ul><p><b>Before…</b>: the “not” form of the verb + <b>-с бұрын</b>.</p><table><tr><th>The verb stem ends in…</th><th>Form</th><th>Examples</th></tr><tr><td>a vowel, or л, р, й, у</td><td><b>-мас, -мес</b></td><td>ұйықта → ұйықта<b>мас бұрын</b>, кел → кел<b>мес бұрын</b></td></tr><tr><td>м, н, ң, з, ж</td><td><b>-бас, -бес</b></td><td>жаз → жаз<b>бас бұрын</b></td></tr><tr><td>к, қ, п, с, т, ш</td><td><b>-пас, -пес</b></td><td>шық → шық<b>пас бұрын</b>, іш → іш<b>пес бұрын</b></td></tr></table><p><b>туралы</b> = about. It comes after the noun: емтихан <b>туралы</b> (about the exam), сіз <b>туралы</b> (about you).</p>', [
        k.mc('Сабақ біт___ кейін мен үйге барамын.', ['кеннен', 'геннен', 'ғаннан'], 0),
        k.mc('Үйге кел___ кейін мен тамақ ішемін.', ['геннен', 'кеннен', 'ғаннан'], 0),
        k.mc('Ұйықта___ бұрын мен кітап оқимын.', ['мас', 'бас', 'пас'], 0),
        k.mc('Үйден шық___ бұрын шамды өшіріңіз.', ['пас', 'мас', 'бас'], 0),
        k.mc('“about the exam” = …', ['емтихан туралы', 'туралы емтихан', 'емтиханнан кейін'], 0),
        k.ord('Мен ұйықтамас бұрын кітап оқимын')]],
      r: ['Studying in two countries', 'Менің атым Дана. Мен Қостанайдағы университеттің екінші курсында оқимын. Менің сүйікті пәнім — ағылшын әдебиеті.\n\nБылтыр мен жарты жыл Англияда оқыдым. Онда бәрі басқаша болды. Дәрістерде оқытушылар біздің пікіріміз туралы көп сұрайтын. Бағаны тек емтихан үшін емес, топтық жұмыс үшін де қоятын.\n\nҮйде біз көбірек тыңдаймыз және жазамыз. Есесіне грамматикадан біліміміз мықты.\n\nМенің ойымша, жақсы білім дегеніміз — білім де, дағды да. Қазір мен шәкіртақы аламын. Университетті бітіргеннен кейін аудармашы болғым келеді.\n\n(сүйікті = favourite · әдебиет = literature · басқаша = different · баға = here: mark · есесіне = on the other hand · мықты = strong · аудармашы = translator)', [
        k.mc('What is Dana’s favourite subject?', ['English literature', 'history', 'grammar'], 0), k.mc('How long did she study in England?', ['half a year', 'two years', 'one month'], 0), k.tf('In England marks were given only for exams.', false), k.mc('What does Dana want to be after university?', ['a translator', 'a lecturer', 'a writer'], 0)]] },

    { id: 'u3', t: 'Мансап. Careers', topic: 'Work',
      v: ['The world of work', `
бос орын | noun | vacancy | Компанияда бос орын бар. | | bos o-RYN | The company has a vacancy.
талап | noun | requirement | Үміткерге қандай талап қойылады? | | ta-LAP | What are the requirements for the candidate?
жауапкершілік | noun | responsibility | Бұл үлкен жауапкершілік. | | zha-wap-ker-shi-LIK | This is a big responsibility.
басшы | noun | manager, head | Ол — бөлім басшысы. | | bas-SHY | She is the head of the department.
қызметте өсу | verb | to be promoted | Ол биыл қызметте өсті. | | qyz-met-TE o-SOO | He was promoted this year.
жұмыстан шығару | verb | to dismiss | Оны мамырда жұмыстан шығарды. | | zhoo-mys-TAN shy-gha-ROO | He was dismissed in May.
жұмысқа алу | verb | to hire | Компания үш адамды жұмысқа алды. | | zhoo-mys-QA a-LOO | The company hired three people.
пайда | noun | profit, benefit | Биыл пайда өсті. | | pay-DA | This year the profit grew.
бизнес | noun | business | Оның өз бизнесі бар. | | BIZ-nes | He has his own business.
кәсіпкер | noun | entrepreneur | Ол — жас кәсіпкер. | | ka-sip-KER | She is a young entrepreneur.`],
      g: ['He said that…: деп айтты, деді', '<p>English changes the words: <i>He said that he <u>would</u> come</i>. Kazakh keeps the speaker’s <b>exact words</b> and adds <b>деп</b> + a verb of speaking.</p><table><tr><th>The exact words</th><th>деп + verb</th><th>Meaning</th></tr><tr><td>Ол «Мен ертең келемін»</td><td><b>деп айтты</b>.</td><td>He said that he would come tomorrow.</td></tr><tr><td>Басшы «Есеп дайын ба?»</td><td><b>деп сұрады</b>.</td><td>The manager asked if the report was ready.</td></tr><tr><td>Мен «Бұл дұрыс»</td><td><b>деп ойладым</b>.</td><td>I thought that it was right.</td></tr></table><p><b>деді</b> = said. It is the short way, used a lot in stories, and it usually comes after the words:</p><ul><li>«Жақсы», — <b>деді</b> ол. = “Good,” he said.</li><li>Present: <b>дейді</b> (says), <b>деймін</b> (I say).</li></ul>', [
        k.mc('Ол «Мен келемін» ___ айтты.', ['деп', 'деді', 'үшін'], 0),
        k.mc('Басшы «Есеп дайын ба?» деп ___.', ['сұрады', 'берді', 'алды'], 0),
        k.mc('«Жақсы», — ___ ол.', ['деді', 'деп', 'деген'], 0),
        k.tf('Before “деп”, the speaker’s exact words stay as they were said.', true),
        k.mc('“She said that she was tired.” = …', ['Ол «Мен шаршадым» деп айтты.', 'Ол шаршады айтты деп.', 'Ол «Мен шаршадым» үшін айтты.'], 0),
        k.ord('Ол ертең келемін деп айтты')]],
      r: ['From employee to entrepreneur', 'Әлия бес жыл үлкен компанияда есепші болып жұмыс істеді. Жұмысы тыныш, жалақысы жақсы болды. Басшысы оған: «Бізде қалыңыз, сіз қызметте өсесіз», — деді.\n\nБірақ Әлия өз бизнесін армандады. Ол «Мен наубайхана ашамын» деп шешті де, компаниядан кетті.\n\nБірінші жыл қиын болды. Пайда жоқтың қасы еді, ал жауапкершілік өте үлкен болды. Әлия күніне он екі сағат жұмыс істеді.\n\nҚазір оның үш наубайханасы бар. Жақында ол он жаңа қызметкерді жұмысқа алды. Оларға қойылатын басты талап — өз жұмысын жақсы көру.\n\n«Адамдар бізге қуана келсін деймін», — дейді Әлия.\n\n(наубайхана = bakery · жоқтың қасы = almost none · қойылатын = that is set · келсін = let them come)', [
        k.mc('What was Aliya’s first job?', ['accountant', 'baker', 'manager'], 0), k.tf('Her manager wanted her to leave.', false), k.mc('Why did she leave the company?', ['to open a bakery', 'to study', 'to move abroad'], 0), k.mc('How many bakeries does she have now?', ['three', 'one', 'ten'], 0)]] },

    { id: 'u4', t: 'Салауатты өмір салты. A healthy lifestyle', topic: 'Health',
      v: ['Staying healthy', `
өмір салты | noun | lifestyle | Оның өмір салты салауатты. | | o-MIR sal-TY | He has a healthy lifestyle.
тамақтану | verb | to eat (your diet) | Дұрыс тамақтану өте маңызды. | | ta-maq-ta-NOO | Eating well is very important.
диета | noun | (special) diet | Дәрігер маған диета тағайындады. | | di-YE-ta | The doctor put me on a diet.
салмақ | noun | weight | Менің салмағым — жетпіс килограмм. | | sal-MAQ | My weight is seventy kilograms.
жаттығу залы | noun | gym | Мен аптасына үш рет жаттығу залына барамын. | | zhat-ty-GHOO za-LY | I go to the gym three times a week.
дәрумен | noun | vitamin | Көкөністе дәрумен көп. | | da-roo-MEN | There are many vitamins in vegetables.
күйзеліс | noun | stress | Жұмыста күйзеліс көп. | | kuy-ze-LIS | There is a lot of stress at work.
зиянды әдет | noun | bad habit | Темекі шегу — зиянды әдет. | | zi-yan-DY a-DET | Smoking is a bad habit.
тастау | verb | to give up, to drop | Ол темекіні тастады. | | tas-TAU | He gave up smoking.
ұйқы | noun | sleep | Жақсы ұйқы денсаулыққа пайдалы. | | ooy-QY | Good sleep is good for your health.`],
      g: ['Don’t do it!', '<p>In A2 you learned <b>барыңыз, ішіңіз</b> (do it). For <b>don’t</b>, put <b>-ма, -ме, -ба, -бе, -па, -пе</b> after the verb stem, then <b>-ңыз, -ңіз</b>.</p><table><tr><th>The verb stem ends in…</th><th>Add</th><th>Examples</th></tr><tr><td>a vowel, or л, р, й, у</td><td><b>-ма, -ме</b></td><td>бар → бар<b>ма</b>ңыз, же → же<b>ме</b>ңіз, кел → кел<b>ме</b>ңіз</td></tr><tr><td>м, н, ң, з, ж</td><td><b>-ба, -бе</b></td><td>жаз → жаз<b>ба</b>ңыз, мін → мін<b>бе</b>ңіз</td></tr><tr><td>к, қ, п, с, т, ш</td><td><b>-па, -пе</b></td><td>іш → іш<b>пе</b>ңіз, шек → шек<b>пе</b>ңіз, айт → айт<b>па</b>ңыз</td></tr></table><ul><li>Мұнда темекі <b>шекпеңіз</b>! = Do not smoke here!</li><li>Кешке кофе <b>ішпеңіз</b>. = Do not drink coffee in the evening.</li></ul><p>To a friend, leave off <b>-ңыз</b>: <b>барма</b>, <b>ішпе</b>, <b>айтпа</b>.</p>', [
        k.mc('Мұнда темекі шек___ңіз.', ['пе', 'ме', 'бе'], 0),
        k.mc('Онда бар___ңыз.', ['ма', 'ба', 'па'], 0),
        k.mc('Көп тәтті же___ңіз.', ['ме', 'бе', 'пе'], 0),
        k.mc('Қате жаз___ңыз.', ['ба', 'ма', 'па'], 0),
        k.mc('“Do not drink!” to a friend = …', ['Ішпе!', 'Ішпеңіз!', 'Ішіңіз!'], 0),
        k.ord('Кешке кофе ішпеңіз')]],
      r: ['The doctor’s advice', 'Тимур — бағдарламашы. Ол күніне он сағат компьютер алдында отырады, аз ұйықтайды және көп жұмыс істейді. Жақында ол дәрігерге барды, өйткені үнемі шаршап жүрді.\n\nДәрігер: «Сізде ауыр ауру жоқ. Бірақ өмір салтыңызды өзгерту керек. Кемінде жеті сағат ұйықтаңыз. Көкөніс пен жемісті көбірек жеңіз, оларда дәрумен көп. Кешке кофе ішпеңіз. Темекі шекпеңіз — бұл зиянды әдет», — деді.\n\n«Ал спорт ше?» — деп сұрады Тимур.\n\n«Аздан бастаңыз. Күн сайын отыз минут серуендеңіз. Бір айдан кейін жаттығу залына жазылыңыз».\n\nТимур денсаулығын күтуге шешім қабылдады. Қазір ол жұмысқа жаяу барады.\n\n(кемінде = at least · аздан = with a little · денсаулығын күту = to look after his health · шешім қабылдады = made a decision)', [
        k.mc('Why did Timur go to the doctor?', ['He felt tired all the time.', 'He broke his leg.', 'He had a cough.'], 0), k.tf('The doctor found a serious illness.', false), k.mc('What should Timur not do in the evening?', ['drink coffee', 'walk', 'eat vegetables'], 0), k.mc('How does Timur get to work now?', ['on foot', 'by car', 'by bus'], 0)]] },

    { id: 'u5', t: 'Жолда. On the move', topic: 'Travel',
      v: ['Coming and going', `
ұшу | verb | to fly | Біз Алматыға ұшамыз. | | oo-SHOO | We are flying to Almaty.
қону | verb | to land | Ұшақ уақытында қонды. | | qo-NOO | The plane landed on time.
аттану | verb | to set off, to depart | Пойыз сағат алтыда аттанады. | | at-ta-NOO | The train departs at six.
кідіріс | noun | delay | Рейсте екі сағат кідіріс бар. | | ki-di-RIS | The flight has a two-hour delay.
кеден | noun | customs | Біз кеденнен өттік. | | ke-DEN | We went through customs.
брондау | verb | to book | Мен қонақүй брондадым. | | bron-DAU | I booked a hotel.
тіркеу | noun | check-in, registration | Тіркеу сағат жетіде басталады. | | tir-KEU | Check-in begins at seven.
маршрут | noun | route | Бұл ең қысқа маршрут. | | marsh-ROOT | This is the shortest route.
жолсерік | noun | conductor (on a train) | Жолсерік билетті тексерді. | | zhol-se-RIK | The conductor checked the ticket.
шетел | noun | abroad, a foreign country | Ол шетелде оқиды. | | she-TEL | He studies abroad.`],
      g: ['Two verbs together: ұшып кетті, ұшып келді', '<p>Kazakh often uses <b>two verbs</b> for one action. The first has the <b>-п</b> form and gives the action. The second shows the direction or the result, and takes the endings.</p><table><tr><th>Second verb</th><th>It adds…</th><th>Examples</th></tr><tr><td><b>кету</b></td><td>away</td><td>ұшып <b>кетті</b> = flew away · шығып <b>кетті</b> = went out and left</td></tr><tr><td><b>келу</b></td><td>to here, arriving</td><td>ұшып <b>келді</b> = arrived by plane · жетіп <b>келді</b> = got here</td></tr><tr><td><b>қалу</b></td><td>it just happened, you ended up</td><td>кешігіп <b>қалдым</b> = I ended up late · ұйықтап <b>қалдым</b> = I fell asleep</td></tr><tr><td><b>шығу</b></td><td>from start to finish</td><td>оқып <b>шықтым</b> = I read it through</td></tr></table><p>You already know two of these: <b>адасып қалдым</b> (I got lost) and <b>сатып алу</b> (to buy).</p>', [
        k.mc('Ұшақ сағат онда Алматыға ұшып ___. (arrived)', ['келді', 'кетті', 'қалды'], 0),
        k.mc('Менің ұшағым ұшып ___. (flew away)', ['кетті', 'келді', 'шықты'], 0),
        k.mc('Мен пойызға кешігіп ___.', ['қалдым', 'келдім', 'шықтым'], 0),
        k.mc('Мен бұл кітапты оқып ___. (read it through)', ['шықтым', 'кеттім', 'қалдым'], 0),
        k.tf('In “ұшып кетті” the second verb shows the direction: away.', true),
        k.ord('Ұшақ Алматыға ұшып келді')]],
      r: ['A long way home', 'Желтоқсанда мен Лондоннан Қостанайға Астана арқылы ұштым. Ұшақ кешкі сағат тоғызда аттанды.\n\nЛондонда бәрі жақсы болды. Мен тіркеуден тез өтіп, ұшаққа міндім. Бірақ біз Астанаға кешігіп келдік: қар жауғандықтан, үш сағат кідіріс болды.\n\nАстанада мен кеденнен өтіп, екінші рейске жүгірдім. Кеш! Менің ұшағым ұшып кетіпті.\n\nКелесі рейс тек таңертең болды. Мен әуежайдың жанынан қонақүй тауып, сонда таксимен бардым.\n\nТаңертең ақыры үйге ұшып келдім. Анам: «Ең бастысы — аман келдің!» — деді.\n\n(арқылы = via · жауғандықтан = because it snowed · кетіпті = had gone, I found · ақыры = at last · аман = safe)', [
        k.mc('Where did the writer change planes?', ['in Astana', 'in London', 'in Kostanay'], 0), k.mc('Why was the first flight late?', ['because of snow', 'because of customs', 'because of a strike'], 0), k.tf('He caught his second flight that evening.', false), k.mc('Where did he spend the night?', ['in a hotel near the airport', 'at the airport', 'at his mother’s home'], 0)]] },

    { id: 'u6', t: 'Ас үйде. In the kitchen', topic: 'Cooking',
      v: ['Cooking words', `
құрам | noun | ingredients, contents | Бұл тағамның құрамы қарапайым. | | qoo-RAM | The ingredients of this dish are simple.
турау | verb | to chop | Мен пияз турап жатырмын. | | too-RAU | I am chopping an onion.
қуыру | verb | to fry | Анам картоп қуырып жатыр. | | qoo-y-ROO | Mum is frying potatoes.
қайнату | verb | to boil | Суды қайнатыңыз. | | qay-na-TOO | Boil the water.
пісіру | verb | to cook, to bake | Әжем нан пісіреді. | | pi-si-ROO | My grandmother bakes bread.
араластыру | verb | to mix | Ұн мен жұмыртқаны араластырыңыз. | | a-ra-las-ty-ROO | Mix the flour and the eggs.
кәстрөл | noun | saucepan | Сорпа кәстрөлде. | | kas-TROL | The soup is in the saucepan.
таба | noun | frying pan | Таба ыстық. | | ta-BA | The frying pan is hot.
ұн | noun | flour | Маған ұн керек. | | oon | I need flour.
қамыр | noun | dough | Қамыр дайын. | | qa-MYR | The dough is ready.`],
      g: ['It is added, it is fried: the passive', '<p>In recipes and rules we often do not say <b>who</b> does the action. The verb takes an ending before the usual endings.</p><table><tr><th>The verb stem ends in…</th><th>Ending</th><th>Examples</th></tr><tr><td>a consonant (not л)</td><td><b>-ыл, -іл</b></td><td>қос → қос<b>ыл</b>ады (is added), пісір → пісір<b>іл</b>еді (is cooked), қуыр → қуыр<b>ыл</b>ады (is fried)</td></tr><tr><td>a vowel</td><td><b>-л</b></td><td>тура → тура<b>л</b>ады (is chopped), жаса → жаса<b>л</b>ады (is made)</td></tr><tr><td>л</td><td><b>-ын, -ін</b></td><td>ал → ал<b>ын</b>ады (is taken), сал → сал<b>ын</b>ады (is put, is built)</td></tr></table><ul><li>Мен тұз қосамын. = I add salt.</li><li>Тұз қос<b>ыл</b>ады. = Salt is added.</li><li>Бұл үй былтыр сал<b>ын</b>ды. = This house was built last year.</li></ul>', [
        k.mc('Қамырға тұз қос___ады.', ['ыл', 'іл', 'л'], 0),
        k.mc('Ет қазанда пісір___еді.', ['іл', 'ыл', 'ін'], 0),
        k.mc('Пияз ұсақтап тура___ады.', ['л', 'ыл', 'іл'], 0),
        k.mc('Ұн дүкеннен ал___ады.', ['ын', 'ыл', 'іл'], 0),
        k.tf('“пісіріледі” means “is cooked”.', true),
        k.ord('Қамырға тұз қосылады')]],
      r: ['Grandmother’s baursaks', 'Бауырсақ — қазақтың ұлттық тағамы. Менің әжем оны әр мерекеде пісіреді. Міне, оның рецепті.\n\nҚұрамы қарапайым: бес жүз грамм ұн, бір стақан жылы сүт, екі жұмыртқа, бір қасық қант, аздап тұз және ашытқы.\n\nАлдымен сүт, қант және ашытқы араластырылады. Он минуттан кейін жұмыртқа, тұз және ұн қосылады. Қамыр жылы жерде бір сағат тұруы керек.\n\nСодан кейін қамыр кішкене бөліктерге кесіледі. Олар табада, ыстық майда үш минуттан қуырылады.\n\nӘжем: «Бауырсақ көп болуы керек, өйткені қонақ әрқашан көп!» — дейді.\n\n(рецепт = here: recipe · ашытқы = yeast · бөлік = piece · кесіледі = is cut)', [
        k.mc('How much flour is needed?', ['500 grams', '5 grams', 'one glass'], 0), k.mc('How long should the dough stand?', ['one hour', 'ten minutes', 'three minutes'], 0), k.tf('The baursaks are boiled in water.', false), k.mc('Why must there be a lot of baursaks?', ['There are always many guests.', 'They are cheap.', 'They keep for a year.'], 0)]] },

    { id: 'u7', t: 'Баспана. A place to live', topic: 'Housing',
      v: ['Renting and living', `
баспана | noun | housing, a place to live | Астанада баспана қымбат. | | bas-pa-NA | Housing is expensive in Astana.
жалға алу | verb | to rent (as a tenant) | Біз орталықтан пәтер жалға аламыз. | | zhal-GHA a-LOO | We rent a flat in the centre.
үй иесі | noun | landlord, owner | Үй иесі жақын жерде тұрады. | | uy i-ye-SI | The landlord lives nearby.
жылыту | noun | heating | Қыста жылыту жақсы істейді. | | zhy-ly-TOO | In winter the heating works well.
коммуналдық қызмет | noun | utilities | Коммуналдық қызмет қымбат емес. | | kom-moo-nal-DYQ qyz-MET | Utilities are not expensive.
жатақхана | noun | student hostel, dormitory | Студенттер жатақханада тұрады. | | zha-taq-kha-NA | The students live in a hostel.
жеке | adjective | own, private | Олардың жеке үйі бар. | | zhe-KE | They have their own house.
қолайлы | adjective | convenient | Бұл пәтер өте қолайлы. | | qo-lay-LY | This flat is very convenient.
көпқабатты үй | noun | block of flats | Біз көпқабатты үйде тұрамыз. | | kop-qa-bat-TY uy | We live in a block of flats.
аула | noun | yard | Балалар аулада ойнап жүр. | | a-oo-LA | The children are playing in the yard.`],
      g: ['On, under, inside, outside', '<p>Place words come <b>after</b> the noun. The noun takes the owner ending <b>-ның, -дың, -тың</b> (A2, Unit 6).</p><table><tr><th>Place word</th><th>Meaning</th><th>Example</th></tr><tr><td><b>үстінде</b></td><td>on, on top of</td><td>үстел<b>дің үстінде</b> = on the table</td></tr><tr><td><b>астында</b></td><td>under</td><td>төсек<b>тің астында</b> = under the bed</td></tr><tr><td><b>ішінде</b></td><td>inside</td><td>үй<b>дің ішінде</b> = inside the house</td></tr><tr><td><b>сыртында</b></td><td>outside</td><td>қала<b>ның сыртында</b> = outside the city</td></tr><tr><td><b>ортасында</b></td><td>in the middle of</td><td>парк<b>тің ортасында</b> = in the middle of the park</td></tr></table><p>You already know <b>жанында</b> (near), <b>артында</b> (behind), <b>алдында</b> (in front of) and <b>арасында</b> (between). They work in the same way.</p><p>For a direction, change <b>-нде</b> to <b>-не</b>: үстелдің үстін<b>е</b> қойыңыз = put it on the table.</p>', [
        k.mc('Кітап үстелдің ___. (on)', ['үстінде', 'астында', 'ішінде'], 0),
        k.mc('Мысық төсектің ___ ұйықтап жатыр. (under)', ['астында', 'үстінде', 'сыртында'], 0),
        k.mc('Балалар үйдің ___ ойнап жүр. (outside)', ['сыртында', 'ішінде', 'астында'], 0),
        k.mc('үй___ ішінде', ['дің', 'ның', 'тің'], 0),
        k.mc('парк___ ортасында', ['тің', 'дің', 'нің'], 0),
        k.ord('Кілт үстелдің үстінде жатыр')]],
      r: ['Looking for a flat', 'Университетке түскенде мен жатақханада тұрдым. Онда көңілді, бірақ шулы болды. Үшінші курста досым екеуміз пәтер жалға алуға шештік.\n\nБіз баспананы бір ай іздедік. Бірінші пәтер университеттің жанында болды, бірақ жалдау ақысы тым қымбат еді. Екіншісі арзан, бірақ жиһазсыз болды, жылытуы да нашар істейтін.\n\nАқыры үшіншісін таптық. Ол саябақтың артында, дүкен мен дәріхананың арасында орналасқан. Оның екі бөлмесі бар, өте қолайлы. Үй иесі — біздің үстімізде тұратын қарт кісі.\n\nКоммуналдық қызметке өзіміз төлейміз. Бұл жеке үйіміз емес, бірақ бізге мұнда ұнайды.\n\n(жалдау ақысы = the rent · тым = too · жиһазсыз = without furniture · орналасқан = is located · кісі = person)', [
        k.mc('Where did the writer live first?', ['in a student hostel', 'with his parents', 'in his own house'], 0), k.mc('What was wrong with the first flat?', ['The rent was too high.', 'It had no furniture.', 'It was far away.'], 0), k.mc('Where does the landlord live?', ['above them', 'in another city', 'next to the park'], 0), k.tf('The landlord pays for the utilities.', false)]] },

    { id: 'u8', t: 'Табиғат және экология. Nature and the environment', topic: 'Environment',
      v: ['Our planet', `
табиғат | noun | nature | Мен Қазақстан табиғатын жақсы көремін. | | ta-bi-GHAT | I love the nature of Kazakhstan.
қоршаған орта | noun | the environment | Қоршаған ортаны қорғау керек. | | qor-sha-GHAN or-TA | We need to protect the environment.
ластану | noun | pollution | Ауаның ластануы — үлкен мәселе. | | las-ta-NOO | Air pollution is a big problem.
жануар | noun | animal | Бұл сирек жануар. | | zha-noo-AR | This is a rare animal.
өсімдік | noun | plant | Далада өсімдік көп. | | o-sim-DIK | There are many plants in the steppe.
қорғау | verb | to protect | Біз орманды қорғауымыз керек. | | qor-GHAU | We must protect the forest.
қайта өңдеу | verb | to recycle | Мұнда пластикті қайта өңдейді. | | qay-TA ong-DEU | Plastic is recycled here.
қалдық | noun | waste | Зауыттан қалдық көп шығады. | | qal-DYQ | A lot of waste comes from the factory.
пластик | noun | plastic | Пластик табиғатқа зиянды. | | PLAS-tik | Plastic is harmful to nature.
сақтау | verb | to preserve, to keep | Бұл көлді сақтау керек. | | saq-TAU | We need to preserve this lake.`],
      g: ['If only…: -са … -ар еді', '<p>For something that is <b>not real</b> (you only imagine it), the first part has <b>-са, -се</b> (A2, Unit 14). The second part has <b>-ар, -ер, -р</b> + <b>еді</b>.</p><table><tr><th>The verb stem</th><th>Ending</th><th>Examples</th></tr><tr><td>hard, ends in a consonant</td><td><b>-ар</b></td><td>бол → бол<b>ар еді</b> (would be), ал → ал<b>ар еді</b></td></tr><tr><td>soft, ends in a consonant</td><td><b>-ер</b></td><td>кел → кел<b>ер еді</b> (would come), көмектес → көмектес<b>ер еді</b></td></tr><tr><td>ends in a vowel</td><td><b>-р</b></td><td>оқы → оқы<b>р еді</b> (would read)</td></tr></table><p>The person ending goes on <b>еді</b>: ед<b>ім</b>, ед<b>іңіз</b>, еді, ед<b>ік</b>.</p><ul><li>Егер уақытым болса, көмектес<b>ер едім</b>. = If I had time, I would help.</li><li>Real, possible: Егер уақытым болса, көмектес<b>емін</b>. = If I have time, I will help.</li></ul>', [
        k.mc('Егер уақытым болса, мен көмектес___ едім.', ['ер', 'ар', 'р'], 0),
        k.mc('Егер ақшам болса, үй сатып ал___ едім.', ['ар', 'ер', 'р'], 0),
        k.mc('Егер уақытым болса, осы кітапты оқы___ едім.', ['р', 'ар', 'ер'], 0),
        k.mc('Which sentence is only imagined?', ['Егер уақытым болса, көмектесер едім.', 'Егер уақытым болса, көмектесемін.', 'Уақытым бар, көмектесемін.'], 0),
        k.mc('“we would come” = …', ['келер едік', 'келер едім', 'келеміз'], 0),
        k.ord('Егер уақытым болса мен көмектесер едім')]],
      r: ['Lake Burabay', 'Бурабай көлі — Қазақстанның ең әдемі жерлерінің бірі. Оның айналасында тау мен орман бар. Орманда сирек кездесетін жануарлар тұрады, сирек өсімдіктер өседі.\n\nӘр жазда мұнда мыңдаған турист келеді. Өкінішке орай, бәрі бірдей табиғатты ойламайды. Демалыс күндерінен кейін жағада көп қалдық қалады: пластик, шөлмек, пакет.\n\nКөрші қаланың оқушылары көлді қорғауға шешім қабылдады. Олар әр сенбіде жағаны тазалайды. Жиналған пластик кейін қайта өңделеді.\n\n«Егер әр турист өз қоқысын жинаса, бізге мұны істеудің керегі болмас еді, — дейді он бес жастағы Айгерім. — Біз Бурабайды балаларымыз үшін сақтағымыз келеді».\n\n(айналасында = around it · сирек кездесетін = rare · мыңдаған = thousands of · жаға = shore · оқушылар = pupils · керегі болмас еді = there would be no need)', [
        k.mc('What is around the lake?', ['mountains and forest', 'a big city', 'factories'], 0), k.mc('What is the problem after weekends?', ['a lot of waste on the shore', 'too many animals', 'no tourists'], 0), k.mc('Who cleans the shore every Saturday?', ['school pupils', 'tourists', 'factory workers'], 0), k.tf('The plastic they collect is recycled.', true)]] },

    { id: 'u9', t: 'Технология. Technology', topic: 'Technology',
      v: ['The digital world', `
технология | noun | technology | Бұл жаңа технология. | | tekh-no-LO-gi-ya | This is a new technology.
құрылғы | noun | device | Бұл пайдалы құрылғы. | | qoo-ryl-GHY | This is a useful device.
жасанды интеллект | noun | artificial intelligence | Жасанды интеллект дәрігерлерге көмектеседі. | | zha-san-DY in-tel-LEKT | Artificial intelligence helps doctors.
деректер | noun | data | Барлық деректер желіде сақталады. | | de-rek-TER | All the data is kept online.
сайт | noun | website | Мектептің сайты бар. | | sayt | The school has a website.
пайдаланушы | noun | user | Сайттың миллион пайдаланушысы бар. | | pay-da-la-noo-SHY | The website has a million users.
жаңарту | verb | to update | Қосымшаны жаңарту керек. | | zha-ngar-TOO | You need to update the app.
жүктеу | verb | to upload, to load | Мен суретті сайтқа жүктедім. | | zhuk-TEU | I uploaded a photo to the website.
жою | verb | to delete | Мен ескі файлдарды жойдым. | | zho-YOO | I deleted the old files.
қауіпсіздік | noun | security, safety | Құпиясөз қауіпсіздік үшін керек. | | qa-wip-siz-DIK | A password is needed for security.`],
      g: ['Reading, swimming, waiting: the -у form with endings', '<p>The dictionary form in <b>-у</b> works like a noun: <i>reading, swimming</i>. It takes the same endings as nouns.</p><table><tr><th>Ending</th><th>Used with…</th><th>Example</th></tr><tr><td>no ending</td><td>ұнайды, керек, қиын, оңай</td><td>Маған ән <b>тыңдау</b> ұнайды. = I like listening to songs.</td></tr><tr><td><b>-ды, -ді</b></td><td>жақсы көру, үйрену, бастау, ұмыту</td><td>Мен кітап <b>оқуды</b> жақсы көремін. = I love reading books.</td></tr><tr><td><b>-ға, -ге</b></td><td>тырысу, көмектесу, болады</td><td>Мен жақсы <b>оқуға</b> тырысамын. = I try to study well.</td></tr><tr><td><b>-дан, -ден</b></td><td>қорқу, шаршау</td><td>Ол суда <b>жүзуден</b> қорқады. = He is afraid of swimming.</td></tr></table><p>Hard words take <b>-ды, -ға, -дан</b>; soft words take <b>-ді, -ге, -ден</b>.</p>', [
        k.mc('Мен кітап оқу___ жақсы көремін.', ['ды', 'ға', 'дан'], 0),
        k.mc('Ол суда жүзу___ қорқады.', ['ден', 'ді', 'ге'], 0),
        k.mc('Мен жақсы оқу___ тырысамын.', ['ға', 'ды', 'дан'], 0),
        k.mc('Маған ән тыңдау ___.', ['ұнайды', 'ұнаймын', 'ұнатамын'], 0),
        k.mc('“I am tired of waiting.” = …', ['Мен күтуден шаршадым.', 'Мен күтуді шаршадым.', 'Мен күту шаршадым.'], 0),
        k.ord('Мен кітап оқуды жақсы көремін')]],
      r: ['A day without the internet', 'Өткен сенбіде бізде күні бойы интернет болмады. Алдымен мен қорықтым: телефонсыз қалай өмір сүруге болады? Менің барлық деректерім, суреттерім мен музыкам желіде сақталады. Тіпті үй тапсырмасы да мұғалімге мектеп сайты арқылы жіберіледі.\n\nТаңертең ішім пысты. Қосымшаларды жаңарту да, фильм жүктеу де мүмкін болмады. Содан кейін екі жыл бұрын сыйға алған ескі кітабымды тауып, жүз бет оқыдым.\n\nТүстен кейін ініммен серуендеуге шықтық. Кешке бүкіл отбасы үстел ойынын ойнады.\n\nТехнология өмірді жеңілдетеді дейді. Бұл рас. Бірақ енді білемін: құрылғысыз бір күн өткізу де жақсы екен.\n\n(күні бойы = all day · өмір сүру = to live · ішім пысты = I was bored · бет = page · бүкіл = whole · жеңілдетеді = makes easier · рас = true)', [
        k.mc('Why was the writer frightened at first?', ['All her data is online.', 'She lost her phone.', 'She had an exam.'], 0), k.tf('She read a hundred pages of a book.', true), k.mc('What did the family do in the evening?', ['played a board game', 'watched a film', 'went for a walk'], 0), k.tf('She thinks a day without devices is a bad thing.', false)]] },

    { id: 'u10', t: 'Жаңалықтар. In the news', topic: 'Media',
      v: ['News and media', `
жаңалық | noun | news | Мен таңертең жаңалық оқимын. | | zha-nga-LYQ | I read the news in the morning.
журналист | noun | journalist | Журналист біздің қала туралы жазды. | | zhoor-na-LIST | A journalist wrote about our city.
мақала | noun | article | Бұл қызықты мақала. | | ma-qa-LA | This is an interesting article.
бағдарлама | noun | programme | Мен бұл бағдарламаны апта сайын көремін. | | bagh-dar-la-MA | I watch this programme every week.
жарнама | noun | advertising, advert | Сайтта жарнама көп. | | zhar-na-MA | There is a lot of advertising on the website.
дереккөз | noun | source | Бұл жаңалықтың дереккөзі қандай? | | de-rek-KOZ | What is the source of this news?
хабарлау | verb | to report, to inform | Газет концерт туралы хабарлады. | | kha-bar-LAU | The newspaper reported on the concert.
талқылау | verb | to discuss | Біз жаңалықты талқылап жатырмыз. | | tal-qy-LAU | We are discussing the news.
шындық | noun | truth | Шындықты айтыңыз. | | shyn-DYQ | Tell the truth.
өсек | noun | rumour, gossip | Бұл тек өсек. | | o-SEK | This is only a rumour.`],
      g: ['I hear that…, it turns out: -ыпты and екен', '<p>Kazakh shows <b>how you know</b> something. If you did not see it yourself (someone told you, you read it, or you have just found out), use this past form:</p><table><tr><th>The verb stem ends in…</th><th>Ending</th><th>Examples</th></tr><tr><td>a vowel</td><td><b>-пты, -пті</b></td><td>оқы → оқы<b>пты</b>, істе → істе<b>пті</b></td></tr><tr><td>a consonant, hard word</td><td><b>-ыпты</b></td><td>жаз → жаз<b>ыпты</b>, бар → бар<b>ыпты</b></td></tr><tr><td>a consonant, soft word</td><td><b>-іпті</b></td><td>кел → кел<b>іпті</b>, кет → кет<b>іпті</b></td></tr></table><ul><li>Марат Астанаға <b>кетті</b>. = Marat went to Astana. (I know it, I saw it.)</li><li>Марат Астанаға <b>кетіпті</b>. = Marat has gone to Astana, I hear.</li></ul><p><b>екен</b> after a noun or adjective = <i>it turns out, I see</i>: Ол дәрігер <b>екен</b>. = It turns out he is a doctor.</p>', [
        k.mc('Естідің бе? Марат Астанаға кет___.', ['іпті', 'ыпты', 'пті'], 0),
        k.mc('Ол жаңа кітап жаз___.', ['ыпты', 'іпті', 'пты'], 0),
        k.mc('Ол бұл жаңалықты газеттен оқы___.', ['пты', 'ыпты', 'іпті'], 0),
        k.tf('“келіпті” is used when you did not see it yourself.', true),
        k.mc('“It turns out he is a doctor.” = …', ['Ол дәрігер екен.', 'Ол дәрігер емес.', 'Ол дәрігер болады.'], 0),
        k.ord('Марат Астанаға кетіпті')]],
      r: ['Is it true?', 'Кеше қалалық чатта хабарлама пайда болды: «Ертең аязға байланысты барлық мектеп жабық болады». Бір сағаттан кейін оны үш мың адам оқыпты. Балалар қуанды, ал ата-аналар «Бұл рас па?» деп сұрады.\n\nЖергілікті газеттің журналисі Әсел жаңалықты тексеруге шешім қабылдады. Ол білім басқармасына қоңырау шалып, «Мектептер жабық па?» деп сұрады. Оған «Сабақ болады, өйткені аяз онша қатты емес» деп жауап берді.\n\nӘсел мақала жазды: «Бұл — өсек. Мектептер жұмыс істейді». Кейін ол дереккөзді тапты: хабарламаны бақылау жұмысын жазғысы келмеген бір оқушы жазыпты.\n\nӘсел: «Жаңалықты талқыламас бұрын оны кім хабарлағанын тексеру керек», — дейді.\n\n(пайда болды = appeared · байланысты = because of · жергілікті = local · тексеру = to check · білім басқармасы = education office · бақылау жұмысы = test)', [
        k.mc('What did the message say?', ['Schools would be closed.', 'There would be a concert.', 'A new school would open.'], 0), k.mc('Who is Asel?', ['a journalist', 'a teacher', 'a pupil'], 0), k.tf('The schools really were closed the next day.', false), k.mc('Who wrote the message?', ['a school pupil', 'the education office', 'a parent'], 0)]] },

    { id: 'u11', t: 'Өнер. Arts and culture', topic: 'Culture',
      v: ['Theatre, books, pictures', `
өнер | noun | art | Мен өнерге қызығамын. | | o-NER | I am interested in art.
суретші | noun | artist, painter | Бұл әйгілі суретші. | | soo-ret-SHI | This is a famous artist.
картина | noun | painting | Қабырғада картина ілулі тұр. | | kar-TI-na | A painting hangs on the wall.
жазушы | noun | writer | Абай — ұлы жазушы. | | zha-zoo-SHY | Abai is a great writer.
шығарма | noun | work (of art), composition | Бұл белгілі шығарма. | | shy-ghar-MA | This is a well-known work.
роман | noun | novel | Мен ұзақ роман оқып жатырмын. | | ro-MAN | I am reading a long novel.
режиссер | noun | director (film, theatre) | Режиссер жаңа фильм түсірді. | | re-zhis-SYOR | The director made a new film.
актер | noun | actor | Ол дарынды актер. | | ak-TYOR | He is a talented actor.
зал | noun | hall | Залда адам көп. | | zal | There are many people in the hall.
қол соғу | verb | to applaud | Көрермендер ұзақ қол соқты. | | qol so-GHOO | The audience applauded for a long time.`],
      g: ['Someone, something, nobody, nothing', '<table><tr><th>Word</th><th>Meaning</th><th>Example</th></tr><tr><td><b>біреу</b></td><td>someone</td><td><b>Біреу</b> саған қоңырау шалды. = Someone called you.</td></tr><tr><td><b>бірдеңе</b></td><td>something</td><td><b>Бірдеңе</b> жегің келе ме? = Do you want to eat something?</td></tr><tr><td><b>бір жерде</b></td><td>somewhere</td><td>Ол <b>бір жерде</b> жұмыс істейді. = He works somewhere.</td></tr><tr><td><b>ешкім</b></td><td>nobody</td><td><b>Ешкім</b> кел<b>ме</b>ді. = Nobody came.</td></tr><tr><td><b>ештеңе</b></td><td>nothing</td><td>Мен <b>ештеңе</b> біл<b>ме</b>ймін. = I know nothing.</td></tr><tr><td><b>ешқашан</b></td><td>never</td><td>Мен <b>ешқашан</b> кешік<b>пе</b>ймін. = I am never late.</td></tr></table><p>With an <b>еш-</b> word the verb must be negative too. Two negatives are correct in Kazakh.</p><p>For experience, use <b>-ған емес</b>: Мен театрда ешқашан бол<b>ған емеспін</b>. = I have never been to the theatre.</p>', [
        k.mc('___ саған қоңырау шалды. Кім екенін білмеймін.', ['Біреу', 'Ешкім', 'Ештеңе'], 0),
        k.mc('Мен ___ білмеймін.', ['ештеңе', 'бірдеңе', 'біреу'], 0),
        k.mc('Кеше ешкім ___.', ['келмеді', 'келді', 'келеді'], 0),
        k.mc('“Do you want to eat something?” = …', ['Бірдеңе жегің келе ме?', 'Ештеңе жегің келе ме?', 'Ешкім жегің келе ме?'], 0),
        k.mc('Мен ешқашан ___.', ['кешікпеймін', 'кешігемін', 'кешіктім'], 0),
        k.ord('Мен театрда ешқашан болған емеспін')]],
      r: ['My first evening at the theatre', 'Мен театрды ешқашан жақсы көрген емеспін. Маған ол қызықсыз сияқты көрінетін. Бірақ өткен айда біреу әпкеме екі билет сыйлады, ол мені шақырды.\n\nҚойылым әйгілі жазушының романы бойынша қойылған екен. Алдымен мен ештеңе түсінбедім: актерлер тез сөйледі. Бірақ кейін бірдеңе өзгерді. Басты рөлдегі актер сондай жақсы ойнады, мен бәрін ұмыттым. Залда ешкім сөйлеспеді.\n\nСоңында көрермендер он минут қол соқты. Режиссер сахнаға шығып, бәріне алғыс айтты.\n\nҚойылымнан кейін біз сол ғимараттағы жас суретшінің көрмесіне бардық. Бір картина маған қатты ұнады.\n\nЕнді мен өнер әр адамға керек деп ойлаймын. Демалыс күндері бір жерге барғыңыз келе ме? Театрға барыңыз!\n\n(көрінетін = used to seem · бойынша = based on · басты рөлдегі = in the main role · сондай = so · алғыс айтты = thanked)', [
        k.mc('Who invited the writer to the theatre?', ['his sister', 'a friend', 'the director'], 0), k.tf('He understood everything from the beginning.', false), k.mc('How long did the audience applaud?', ['ten minutes', 'one minute', 'an hour'], 0), k.mc('Where did they go after the play?', ['to an exhibition', 'to a café', 'home'], 0)]] },

    { id: 'u12', t: 'Спорт. Sport', topic: 'Sport',
      v: ['Winning and losing', `
жарыс | noun | competition | Ертең бізде жарыс болады. | | zha-RYS | We have a competition tomorrow.
жаттықтырушы | noun | coach | Біздің жаттықтырушымыз өте қатал. | | zhat-tyq-ty-roo-SHY | Our coach is very strict.
спортшы | noun | sportsman, athlete | Ол әйгілі спортшы. | | sport-SHY | He is a famous athlete.
жеңіс | noun | victory | Бұл біздің бірінші жеңісіміз. | | zhe-NGIS | This is our first victory.
жеңіліс | noun | defeat | Бұл ауыр жеңіліс болды. | | zhe-ngi-LIS | It was a hard defeat.
жеңу | verb | to win | Біз матчта жеңдік. | | zhe-NGOO | We won the match.
жеңілу | verb | to lose | Олар финалда жеңілді. | | zhe-ngi-LOO | They lost in the final.
матч | noun | match | Матч сағат алтыда басталады. | | match | The match begins at six.
жанкүйер | noun | fan, supporter | Стадионда жанкүйер көп. | | zhan-ku-YER | There are many fans at the stadium.
чемпионат | noun | championship | Бұл қала чемпионаты. | | chem-pi-o-NAT | This is the city championship.`],
      g: ['I used to…: -атын, -етін', '<p>For something you did <b>often in the past</b>, or that was true for a long time, use the ending from Unit 1 (<b>-атын, -етін, -йтын, -йтін</b>) + the person ending.</p><table><tr><th>Who</th><th>бару (to go)</th><th>ойнау (to play)</th></tr><tr><td>мен</td><td>бар<b>атын</b>мын</td><td>ойна<b>йтын</b>мын</td></tr><tr><td>сіз</td><td>бар<b>атын</b>сыз</td><td>ойна<b>йтын</b>сыз</td></tr><tr><td>ол</td><td>бар<b>атын</b></td><td>ойна<b>йтын</b></td></tr><tr><td>біз</td><td>бар<b>атын</b>быз</td><td>ойна<b>йтын</b>быз</td></tr></table><ul><li>Бала кезімде мен күн сайын футбол <b>ойнайтынмын</b>. = As a child I used to play football every day.</li><li>Ол бұрын Алматыда <b>тұратын</b>. = She used to live in Almaty.</li></ul><p>Compare: <b>ойнадым</b> = I played (once, finished). <b>ойнайтынмын</b> = I used to play (many times).</p>', [
        k.mc('Бала кезімде мен күн сайын футбол ойна___мын.', ['йтын', 'атын', 'йтін'], 0),
        k.mc('Ол бұрын таңертең жүгір___.', ['етін', 'атын', 'йтін'], 0),
        k.mc('Біз жазда ауылға бар___быз.', ['атын', 'етін', 'йтын'], 0),
        k.tf('“баратынмын” means “I used to go”.', true),
        k.mc('“She used to live in Almaty.” = …', ['Ол бұрын Алматыда тұратын.', 'Ол Алматыда тұрады.', 'Ол Алматыда тұрғысы келеді.'], 0),
        k.ord('Мен бала кезімде футбол ойнайтынмын')]],
      r: ['Second place', 'Біздің мектептің футбол командасы ешқашан мықты болған емес. Былтыр біз барлық матчта дерлік жеңілетінбіз. Стадионда жанкүйер аз болатын — тек ата-аналарымыз ғана.\n\nКүзде бізге жаңа жаттықтырушы келді. Ол бұрын спортшы болған. Ол: «Жеңіс тәртіптен басталады», — деді. Қазір біз аптасына төрт рет жаттығуға барамыз және әр таң сайын саябақта жүгіреміз.\n\nАлғашқы жарыс наурызда болды. Біз қатты уайымдадық. Бірінші матчта жеңіліс болды — нөл де екі. Бірақ содан кейін қатарынан үш матчта жеңдік!\n\nҚалалық чемпионаттың финалында біз қаланың ең мықты мектебімен ойнадық. Біз жеңілдік, бірақ екінші орын — бұл да жеңіс. Келесі жылы міндетті түрде жеңеміз.\n\n(мықты = strong · дерлік = almost · ғана = only · алғашқы = first · қатарынан = in a row · орын = place)', [
        k.mc('How did the team play last year?', ['They lost almost every match.', 'They won the championship.', 'They did not play.'], 0), k.mc('Who is the new coach?', ['a former athlete', 'a parent', 'a maths teacher'], 0), k.mc('How often do they train now?', ['four times a week', 'once a week', 'every evening'], 0), k.tf('They won the final.', false)]] },

    { id: 'u13', t: 'Ақша. Money matters', topic: 'Money',
      v: ['Earning, spending, saving', `
шығын | noun | expense | Менің шығыным өсті. | | shy-GHYN | My expenses have grown.
кіріс | noun | income | Оның кірісі көп емес. | | ki-RIS | His income is not large.
жұмсау | verb | to spend | Мен кітапқа көп ақша жұмсаймын. | | zhoom-SAU | I spend a lot of money on books.
үнемдеу | verb | to save, to economise | Біз таксиге ақша үнемдейміз. | | u-nem-DEU | We save money on taxis.
несие | noun | loan, credit | Ол банктен несие алды. | | ne-si-YE | He took a loan from the bank.
қарыз | noun | debt | Менің қарызым жоқ. | | qa-RYZ | I have no debts.
салық | noun | tax | Бәрі салық төлейді. | | sa-LYQ | Everyone pays tax.
құн | noun | cost, value | Билеттің құны қанша? | | qoon | What is the cost of the ticket?
тиімді | adjective | good value, profitable | Бұл тиімді ұсыныс. | | ti-yim-DI | This is a good offer.
жинақ | noun | savings | Менің аздаған жинағым бар. | | zhi-NAQ | I have some savings.`],
      g: ['Twice, half, per cent: comparing with numbers', '<table><tr><th>Word</th><th>Meaning</th><th>Example</th></tr><tr><td><b>екі есе</b></td><td>twice, two times</td><td>Бұл ноутбук <b>екі есе</b> қымбат. = This laptop is twice as expensive.</td></tr><tr><td><b>жарты</b></td><td>half</td><td><b>жарты</b> жыл = half a year · <b>жарты</b> баға = half price</td></tr><tr><td><b>пайыз</b></td><td>per cent</td><td>жиырма <b>пайыз</b> жеңілдік = a twenty per cent discount</td></tr><tr><td><b>шамамен</b></td><td>about, roughly</td><td><b>шамамен</b> жүз адам = about a hundred people</td></tr></table><p><b>Cheaper by how much?</b> Put the “to” ending on the amount:</p><ul><li>Бұл телефон он мың теңге<b>ге</b> арзан. = This phone is ten thousand tenge cheaper.</li><li>Ол менен екі жас<b>қа</b> үлкен. = He is two years older than me.</li></ul><p>Remember <b>-дан</b> for <i>than</i>: Алматы Қостанай<b>дан</b> екі есе үлкен.</p>', [
        k.mc('Бұл ноутбук анадан екі ___ қымбат.', ['есе', 'рет', 'дана'], 0),
        k.mc('Бұл телефон он мың теңге___ арзан.', ['ге', 'ден', 'ні'], 0),
        k.mc('“about twenty thousand” = …', ['шамамен жиырма мың', 'жарты жиырма мың', 'екі есе жиырма мың'], 0),
        k.mc('Дүкенде елу ___ жеңілдік бар.', ['пайыз', 'есе', 'жарты'], 0),
        k.tf('“жарты” means “half”.', true),
        k.ord('Бұл ноутбук екі есе қымбат')]],
      r: ['Saving for a laptop', 'Данияр — студент. Ол шәкіртақы алады, ал демалыс күндері кафеде жұмыс істейді. Оның кірісі көп емес, сондықтан ол шығынын қадағалайды.\n\nҚыркүйекте Данияр ноутбук сатып алуға шешім қабылдады. Жаңасы төрт жүз мың теңге тұрды — оның төлей алатын ақшасынан екі есе қымбат. Несие алғысы келмеді: «Қарыз — бұл күйзеліс».\n\nОл ақша жинай бастады. Данияр ақшаны неге жұмсайтынын жазып отырды. Ең көп ақша кафедегі тамаққа кетеді екен. Ол үйде тамақ пісіре бастады және айына жиырма мың теңге үнемдеді.\n\nЖарты жылдан кейін ол тиімді ұсыныс тапты: дәл сондай ноутбук жүз мың теңгеге арзан. Қазір оның ноутбугі бар, ал қарызы жоқ.\n\n(қадағалау = to keep an eye on · жинай бастады = began to save · жазып отырды = kept writing down · дәл сондай = exactly the same)', [
        k.mc('Where does Daniyar work at weekends?', ['in a café', 'in a bank', 'in a shop'], 0), k.mc('How much did a new laptop cost?', ['400,000 tenge', '100,000 tenge', '20,000 tenge'], 0), k.tf('He took a loan to buy it.', false), k.mc('What did he spend the most money on?', ['food in cafés', 'books', 'taxis'], 0)]] },

    { id: 'u14', t: 'Әдет-ғұрып. Customs and traditions', topic: 'Traditions',
      v: ['Family and customs', `
әдет-ғұрып | noun | customs | Бұл көне әдет-ғұрып. | | a-DET ghoo-RYP | This is an ancient custom.
ұрпақ | noun | generation | Үйде үш ұрпақ тұрады. | | oor-PAQ | Three generations live in the house.
ата-баба | noun | ancestors | Менің ата-бабам далада тұрған. | | a-TA ba-BA | My ancestors lived in the steppe.
құрметтеу | verb | to respect | Балалар ата-анасын құрметтейді. | | qoor-met-TEU | Children respect their parents.
қонақжайлылық | noun | hospitality | Қонақжайлылығыңызға рақмет! | | qo-naq-zhay-ly-LYQ | Thank you for your hospitality!
рәсім | noun | ceremony, rite | Бұл үйлену рәсімі. | | ra-SIM | This is a wedding ceremony.
ұлттық | adjective | national | Бұл ұлттық киім. | | oolt-TYQ | This is national dress.
ақсақал | noun | respected elder | Ақсақал бата берді. | | aq-sa-QAL | The elder gave a blessing.
бата | noun | blessing | Ата бізге бата берді. | | ba-TA | Grandfather gave us his blessing.
қонақ күту | verb | to receive guests | Қазақтар қонақ күтуді жақсы көреді. | | qo-NAQ ku-TOO | Kazakhs love receiving guests.`],
      g: ['I must, you should: -уым керек', '<p>In A2 you said <b>Маған демалу керек</b>. A second, very common way puts the “my, your” ending on the <b>-у</b> form:</p><table><tr><th>Who</th><th>бару (to go)</th><th>келу (to come)</th></tr><tr><td>менің</td><td>бар<b>уым</b> керек</td><td>кел<b>уім</b> керек</td></tr><tr><td>сіздің</td><td>бар<b>уыңыз</b> керек</td><td>кел<b>уіңіз</b> керек</td></tr><tr><td>оның</td><td>бар<b>уы</b> керек</td><td>кел<b>уі</b> керек</td></tr><tr><td>біздің</td><td>бар<b>уымыз</b> керек</td><td>кел<b>уіміз</b> керек</td></tr></table><ul><li>Менің ерте тұр<b>уым керек</b>. = I must get up early.</li><li>Not: Сіздің бар<b>уыңыз керек емес</b>. = You do not have to go.</li></ul><p>Stronger, for rules and duty: <b>-уға тиіс</b>. — Әр адам үлкендерді құрметте<b>уге тиіс</b>. = Everyone must respect their elders.</p>', [
        k.mc('Менің ерте тұр___ керек.', ['уым', 'уы', 'уыңыз'], 0),
        k.mc('Сіздің демал___ керек.', ['уыңыз', 'уым', 'уы'], 0),
        k.mc('Оның дәрі іш___ керек.', ['уі', 'уім', 'уіңіз'], 0),
        k.mc('“You do not have to go.” = …', ['Сіздің баруыңыз керек емес.', 'Сіздің баруыңыз керек.', 'Сіз бармаңыз.'], 0),
        k.mc('Әр адам үлкендерді құрметтеуге ___.', ['тиіс', 'жоқ', 'бар'], 0),
        k.ord('Менің ерте тұруым керек')]],
      r: ['A guest in a Kazakh home', 'Қазақстанға келгенімде әріптесім мені ата-анасының үйіне қонаққа шақырды. Мен аздап уайымдадым, өйткені жергілікті әдет-ғұрыпты білмейтінмін.\n\nҮйде үш ұрпақ тұрады екен: ата, ата-ана және балалар. Дәстүр бойынша дастарқандағы ең құрметті орын үлкендер мен қонақтарға беріледі. Мені атаның қасына отырғызды.\n\nҮй иесі әйел маған үнемі тамақ ұсынды: «Алыңыз, жеңіз!» Дастарқанда бешбармақ, бауырсақ, жеміс болды. Қонақжайлылық — мұнда ұлттық қасиет екенін түсіндім.\n\nСоңында ақсақал барлық қонаққа және жастарға жақсы тілек айтты. Маған бұл көне рәсім — бата екенін түсіндірді.\n\nҚазақтар үлкендерді құрметтейді және ата-бабасын ұмытпайды. Менің ойымша, бұл тамаша.\n\n(жергілікті = local · құрметті орын = place of honour · отырғызды = seated · қасиет = quality · жастар = young people)', [
        k.mc('Who invited the writer?', ['a colleague', 'a neighbour', 'a student'], 0), k.mc('How many generations were in the house?', ['three', 'two', 'four'], 0), k.mc('Where did the writer sit?', ['next to the grandfather', 'next to the children', 'by the door'], 0), k.tf('Bata is a new custom.', false)]] },

    { id: 'u15', t: 'Шағым. Problems and complaints', topic: 'Services',
      v: ['When something goes wrong', `
шағым | noun | complaint | Менің шағымым бар. | | sha-GHYM | I have a complaint.
шағымдану | verb | to complain | Ол шуға шағымданады. | | sha-ghym-da-NOO | He complains about the noise.
мәселе | noun | problem | Мәселе неде? | | ma-se-LE | What is the problem?
ақау | noun | defect, fault | Телефонда ақау бар. | | a-QAU | The phone has a defect.
сапа | noun | quality | Сапасы өте жақсы. | | sa-PA | The quality is very good.
қызмет көрсету | noun | service (to customers) | Бұл кафеде қызмет көрсету жақсы. | | qyz-MET kor-se-TOO | The service in this café is good.
ақшаны қайтару | verb | to refund | Дүкен ақшаны қайтарды. | | aq-sha-NY qay-ta-ROO | The shop refunded the money.
кешірім | noun | apology, pardon | Кешірім сұраймын. | | ke-shi-RIM | I apologise.
түзету | verb | to correct, to put right | Біз қатені түзетеміз. | | tu-ze-TOO | We will put the mistake right.
кінәлі | adjective | to blame, guilty | Кешіріңіз, мен кінәлімін. | | ki-na-LI | Sorry, I am to blame.`],
      g: ['Not working, and without doing: -май, -мей', '<p>Put <b>-май, -мей, -бай, -бей, -пай, -пей</b> after the verb stem. The choice of м, б or п follows the same rule as <b>-ма, -ба, -па</b> in Unit 4.</p><table><tr><th>The verb stem ends in…</th><th>Form</th><th>Examples</th></tr><tr><td>a vowel, or л, р, й, у</td><td><b>-май, -мей</b></td><td>істе → істе<b>мей</b>, бар → бар<b>май</b></td></tr><tr><td>м, н, ң, з, ж</td><td><b>-бай, -бей</b></td><td>жаз → жаз<b>бай</b></td></tr><tr><td>к, қ, п, с, т, ш</td><td><b>-пай, -пей</b></td><td>іш → іш<b>пей</b>, айт → айт<b>пай</b></td></tr></table><p><b>1. Without doing:</b></p><ul><li>Ол тамақ <b>ішпей</b> кетті. = He left without eating.</li><li>Мен ештеңе <b>айтпай</b> отырдым. = I sat without saying anything.</li></ul><p><b>2. Is not …ing now</b> (with <b>тұр</b> or <b>жатыр</b>):</p><ul><li>Телефон жұмыс <b>істемей тұр</b>. = The phone is not working.</li></ul>', [
        k.mc('Телефон жұмыс істе___ тұр.', ['мей', 'май', 'пей'], 0),
        k.mc('Ол тамақ іш___ кетті.', ['пей', 'мей', 'бей'], 0),
        k.mc('Мен ештеңе айт___ отырдым.', ['пай', 'май', 'бай'], 0),
        k.mc('Ол хат жаз___ кетті.', ['бай', 'май', 'пай'], 0),
        k.tf('“жұмыс істемей тұр” means “is not working”.', true),
        k.ord('Менің телефоным жұмыс істемей тұр')]],
      r: ['The broken phone', 'Бір ай бұрын Марина дүкеннен жаңа телефон сатып алды. Бір аптадан кейін экраны жұмыс істемей қалды. Марина дүкенге шағыммен келді.\n\n— Менде мәселе бар. Телефон бұзылды, ал оны алғаныма бір-ақ апта болды.\n\nСатушы қарап: «Бәлкім, өзіңіз кінәлі шығарсыз», — деді. Марина келіспеді: «Мен ештеңе істеген жоқпын. Бұл — сапасы нашар тауар».\n\nОл басшыны шақыруды сұрады. Басшы кешірім сұрады: «Қолайсыздық үшін кешіріңіз. Бұл — біздің қатеміз. Біз ақауды үш күнде түзете аламыз немесе ақшаңызды қайтарамыз».\n\nМарина ақшаны қайтаруды таңдады. Бір сағаттан кейін ақша оның картасына түсті.\n\nКешке ол пікір жазды: «Телефон нашар, бірақ қызмет көрсету жақсы. Кешірім сұрағаныңызға рақмет».\n\n(бір-ақ = only one · шығарсыз = perhaps you are · нашар = bad · тауар = goods · қолайсыздық = inconvenience)', [
        k.mc('What stopped working?', ['the screen', 'the battery', 'the charger'], 0), k.tf('The shop assistant said the shop was to blame.', false), k.mc('What did the manager offer?', ['a repair in three days or a refund', 'a new phone', 'nothing'], 0), k.mc('What did Marina choose?', ['a refund', 'a repair', 'another phone'], 0)]] },

    { id: 'u16', t: 'Тілдесу. Speaking and being understood', topic: 'Communication',
      v: ['Languages and talking', `
айтылым | noun | pronunciation, speaking | Оның айтылымы жақсы. | | ay-ty-LYM | Her pronunciation is good.
акцент | noun | accent | Ол акцентпен сөйлейді. | | ak-TSENT | He speaks with an accent.
аудару | verb | to translate | Осы сөзді аударыңызшы. | | a-oo-da-ROO | Please translate this word.
сөз тіркесі | noun | expression, phrase | Бұл пайдалы сөз тіркесі. | | soz tir-ke-SI | This is a useful expression.
әңгімелесу | verb | to have a conversation | Біз ұзақ әңгімелестік. | | ang-gi-me-le-SOO | We talked for a long time.
сұхбаттас | noun | the person you are talking to | Менің сұхбаттасым тез сөйлейді. | | sookh-bat-TAS | The person I am talking to speaks fast.
еркін | adverb | fluently, freely | Ол қазақша еркін сөйлейді. | | er-KIN | She speaks Kazakh fluently.
тіл үйренуші | noun | language learner | Мен — тіл үйренушімін. | | til uy-re-noo-SHI | I am a language learner.
түсінісу | verb | to understand each other | Біз тез түсіністік. | | tu-si-ni-SOO | We understood each other quickly.
қателесу | verb | to make a mistake | Мен жиі қателесемін. | | qa-te-le-SOO | I often make mistakes.`],
      g: ['Although, even though: -са да', '<p>Take the <b>if</b> form (<b>-са, -се</b>, A2 Unit 14) and add <b>да / де</b>. Now it means <b>although</b> or <b>even if</b>.</p><table><tr><th>Who</th><th>Hard word</th><th>Soft word</th></tr><tr><td>мен</td><td>шарша<b>сам да</b></td><td>кел<b>сем де</b></td></tr><tr><td>сіз</td><td>шарша<b>саңыз да</b></td><td>кел<b>сеңіз де</b></td></tr><tr><td>ол</td><td>шарша<b>са да</b></td><td>кел<b>се де</b></td></tr></table><ul><li><b>Шаршасам да</b>, мен сабаққа бардым. = Although I was tired, I went to the lesson.</li><li>Жаңбыр <b>жауса да</b>, біз серуендедік. = Although it was raining, we went for a walk.</li><li>Акценті <b>болса да</b>, бәрі оны түсінеді. = Although he has an accent, everyone understands him.</li></ul><p>Two more words for the same idea: <b>дегенмен</b> (however) and <b>бірақ</b> (but). They come at the start of the second part.</p>', [
        k.mc('Шарша___ да, мен сабаққа бардым.', ['сам', 'сем', 'са'], 0),
        k.mc('Жаңбыр жау___ да, біз серуендедік.', ['са', 'се', 'сам'], 0),
        k.mc('Ол қателес___ де, сөйлей береді.', ['се', 'са', 'сем'], 0),
        k.mc('“however” = …', ['дегенмен', 'өйткені', 'егер'], 0),
        k.tf('“-са да” means “although” or “even if”.', true),
        k.ord('Шаршасам да мен сабаққа бардым')]],
      r: ['Mistakes are my best teachers', 'Том қазақ тілін екі жыл үйреніп жүр. Алдымен ол сөйлеуден қорқатын, өйткені көп қателесетін. Ол көп сөз білетін, дегенмен әңгімелескенде бәрін ұмытып қалатын.\n\nОқытушысы: «Айтылым мен грамматика келеді. Ең бастысы — сөйлесу», — деді. Том көршілерімен, сатушылармен, такси жүргізушілерімен сөйлесе бастады. Акценті болса да, бәрі оны түсінетін.\n\nБір күні ол ағылшын сөз тіркесін аударғысы келіп, күлкілі бірдеңе айтып қалды. Сұхбаттасы ұзақ күлді, содан кейін сөздің мағынасын түсіндірді. Том ол сөзді мәңгі есте сақтады.\n\nҚазір Том еркін дерлік сөйлейді. Қазақ тілі оның ана тілі болмаса да, ол қазақша әзілдей алады. Ол: «Қателер — менің ең жақсы мұғалімдерім», — дейді.\n\n(күлкілі = funny · ұзақ = for a long time · мәңгі = for ever · әзілдеу = to joke)', [
        k.mc('Why was Tom afraid to speak at first?', ['He made many mistakes.', 'He knew no words.', 'He had no teacher.'], 0), k.mc('What did his teacher say was the main thing?', ['talking with people', 'grammar', 'pronunciation'], 0), k.tf('People could not understand Tom because of his accent.', false), k.mc('How does Tom speak now?', ['almost fluently', 'very slowly', 'only in English'], 0)]] }
  ]);
})();
