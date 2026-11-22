/* IF Lingo · Kazakh B1: an original IF Academy course for people who speak English and have finished Kazakh A2.
   Word lines: word | part of speech | meaning in English | example | (empty) | how to say it | the example in English.
   Plan: 24 units and a level test (project doc claude/if-lingo.md). Built so far: units 1 to 8. */
IFX.course({
  id: 'kk-b1', track: 'lang', lang: 'kk-KZ', level: 'B1', next: 'B2', icon: '🇰🇿',
  title: 'Kazakh B1', sub: 'Independent Kazakh',
  blurb: 'Talk about relationships, study, work, health, travel, cooking, housing and nature in longer sentences. The first 8 of 24 units, explained in English.',
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
        k.mc('What is around the lake?', ['mountains and forest', 'a big city', 'factories'], 0), k.mc('What is the problem after weekends?', ['a lot of waste on the shore', 'too many animals', 'no tourists'], 0), k.mc('Who cleans the shore every Saturday?', ['school pupils', 'tourists', 'factory workers'], 0), k.tf('The plastic they collect is recycled.', true)]] }
  ]);
})();
