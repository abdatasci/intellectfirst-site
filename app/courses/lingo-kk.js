/* IF Lingo · Kazakh A1: an original IF Academy course for people who speak English.
   Word lines: word | part of speech | meaning in English | example | (empty) | how to say it | the example in English.
   Capital letters in "how to say it" show the stressed syllable (in Kazakh, usually the last one). */
IFX.course({
  id: 'kk-a1', track: 'lang', lang: 'kk-KZ', level: 'A1', next: 'A2', icon: '🇰🇿',
  title: 'Kazakh A1', sub: 'Your first steps in Kazakh',
  blurb: 'Say hello, talk about your family, order food, find your way and go shopping: the alphabet, 500 words, 20 grammar points, listening in every unit and a level test, explained in English.',
  units: []
});
(function () {
  var k = IFX.k;
  IFX.make('kk-a1', [
    { id: 'u1', t: 'Сәлем! Hello!', topic: 'Greetings',
      v: ['Hello, thank you, goodbye', `
сәлем | greeting | hi (to friends) | Сәлем, Айгүл! | | sa-LEM | Hi, Aigul!
сәлеметсіз бе | greeting | hello (polite) | Сәлеметсіз бе, мен Томмын. | | sa-le-met-SIZ be | Hello, I am Tom.
рақмет | word | thank you | Рақмет, жақсы. | | rakh-MET | Thank you, good.
иә | word | yes | Иә, мен студентпін. | | ee-YA | Yes, I am a student.
жоқ | word | no | Жоқ, рақмет. | | zhok | No, thank you.
кешіріңіз | word | excuse me; sorry | Кешіріңіз, сіз Айгүлсіз бе? | | ke-shi-ri-NGIZ | Excuse me, are you Aigul?
менің атым | phrase | my name is | Менің атым Том. | | me-NING a-TYM | My name is Tom.
сау болыңыз | greeting | goodbye (polite) | Сау болыңыз, Айгүл! | | sau bo-ly-NGYZ | Goodbye, Aigul!`],
      g: ['I am…: an ending on the word', '<p>Kazakh has no separate word for <b>am, is, are</b>. It adds an ending to the last word.</p><table><tr><th>Person</th><th>Example</th><th>Meaning</th></tr><tr><td>мен (I)</td><td>Мен студент<b>пін</b>. · Мен мұғалім<b>мін</b>.</td><td>I am a student. · I am a teacher.</td></tr><tr><td>сіз (you, polite)</td><td>Сіз студент<b>сіз</b>.</td><td>You are a student.</td></tr><tr><td>ол (he, she)</td><td>Ол студент.</td><td>He / she is a student. (no ending)</td></tr></table><p>To ask a name politely: <b>Сіздің атыңыз кім?</b> Answer: <b>Менің атым …</b></p>', [
        k.mc('Мен студент___.', ['пін', 'сіз', '(no ending)'], 0), k.mc('How do you say “My name is Tom”?', ['Менің атым Том.', 'Мен атым Том.', 'Сіздің атыңыз Том.'], 0),
        k.mc('Which is the polite hello?', ['Сәлем!', 'Сәлеметсіз бе!', 'Сау болыңыз!'], 1), k.tf('“Ол студент” means “He or she is a student”.', true), k.ord('Менің атым Айгүл')]],
      r: ['At the language school', '— Сәлеметсіз бе! Менің атым Айгүл. Сіздің атыңыз кім?\n\n— Сәлеметсіз бе! Менің атым Том.\n\n— Сіз студентсіз бе?\n\n— Иә, мен студентпін. Ал сіз?\n\n— Мен мұғаліммін.\n\n— Рақмет, Айгүл. Сау болыңыз!\n\n— Сау болыңыз, Том!\n\n(мұғалім = teacher · ал сіз? = and you?)', [
        k.mc('Who is the teacher?', ['Aigul', 'Tom', 'Nobody'], 0), k.tf('Tom is a student.', true), k.mc('Which words do they use to say goodbye?', ['Сәлем', 'Сау болыңыз', 'Рақмет'], 1)]] },

    { id: 'u2', t: 'Менің отбасым. My family', topic: 'Family',
      v: ['Family and friends', `
отбасы | noun | family | Бұл менің отбасым. | | ot-ba-SY | This is my family.
ана | noun | mother | Менің анам мұғалім. | | a-NA | My mother is a teacher.
әке | noun | father | Менің әкем дәрігер. | | a-KE | My father is a doctor.
аға | noun | older brother | Бұл менің ағам. | | a-GHA | This is my older brother.
әпке | noun | older sister | Менің әпкем студент. | | ap-KE | My older sister is a student.
дос | noun | friend | Том менің досым. | | dos | Tom is my friend.
ұл | noun | son; boy | Менің ұлым үйде. | | ool | My son is at home.
қыз | noun | daughter; girl | Менің қызым мектепте. | | kyz | My daughter is at school.`],
      g: ['My: менің + an ending', '<p>For <b>my</b>, say <b>менің</b> and add an ending to the noun.</p><table><tr><th>The noun ends in…</th><th>Ending</th><th>Examples</th></tr><tr><td>a vowel</td><td><b>-м</b></td><td>ана → ана<b>м</b>, әке → әке<b>м</b>, аға → аға<b>м</b></td></tr><tr><td>a consonant, with a, о, ұ, ы in the word</td><td><b>-ым</b></td><td>дос → дос<b>ым</b>, ұл → ұл<b>ым</b>, қыз → қыз<b>ым</b></td></tr><tr><td>a consonant, with ә, е, і, ө, ү in the word</td><td><b>-ім</b></td><td>үй → үй<b>ім</b> (my house)</td></tr></table><p>This “hard or soft vowels” rule (vowel harmony) decides almost every Kazakh ending.</p>', [
        k.mc('менің ана___', ['м', 'ым', 'ім'], 0), k.mc('менің дос___', ['м', 'ым', 'ім'], 1), k.mc('менің үй___ (үй = house)', ['м', 'ым', 'ім'], 2),
        k.tf('“Менің әкем” means “my father”.', true), k.ord('Бұл менің отбасым')]],
      r: ['Aigul’s family', 'Менің атым Айгүл. Бұл менің отбасым.\n\nМенің анам мұғалім. Менің әкем дәрігер.\n\nМенің ағам студент. Менің әпкем де студент.\n\nТом менің досым.\n\n(бұл = this · дәрігер = doctor · де = also)', [
        k.mc('What is the job of Aigul’s mother?', ['teacher', 'doctor', 'student'], 0), k.tf('Aigul’s father is a doctor.', true), k.mc('Who is Tom?', ['her brother', 'her friend', 'her father'], 1)]] },

    { id: 'u3', t: 'Сіз неше жастасыз? Numbers and age', topic: 'Numbers',
      v: ['Numbers and age', `
бір | number | one | Бір шай беріңізші. | | bir | One tea, please.
екі | number | two | Екі кофе беріңізші. | | e-KI | Two coffees, please.
үш | number | three | Менің үш ағам бар. | | oosh | I have three older brothers.
төрт | number | four | Төрт қосу бір — бес. | | tort | Four plus one is five.
бес | number | five | Мен бес жастамын. | | bes | I am five years old.
он | number | ten | Ұлым он жаста. | | on | My son is ten years old.
неше | question word | how many | Сіз неше жастасыз? | | ne-SHE | How old are you?
жас | noun | age; a year of age | Мен жиырма жастамын. | | zhas | I am twenty years old.`],
      g: ['Saying your age', '<p>Say the number, then <b>жаста</b> (“at the age”), then the ending for the person.</p><table><tr><th>Person</th><th>Example</th></tr><tr><td>мен (I)</td><td>Мен он жаста<b>мын</b>.</td></tr><tr><td>сен (you, friend)</td><td>Сен он жаста<b>сың</b>.</td></tr><tr><td>сіз (you, polite)</td><td>Сіз он жаста<b>сыз</b>.</td></tr><tr><td>ол (he, she)</td><td>Ол он жаста. (no ending)</td></tr></table><p>Question: <b>Сіз неше жастасыз?</b> (polite) · <b>Сен неше жастасың?</b> (friend or child).</p>', [
        k.mc('Мен бес жаста___.', ['мын', 'сыз', '(no ending)'], 0), k.mc('Ол үш жаста___.', ['мын', 'сыз', '(no ending)'], 2), k.mc('Сіз неше жаста___?', ['мын', 'сыз', 'сың'], 1),
        k.tf('“Неше?” asks “how many?”', true), k.ord('Мен он жастамын')]],
      r: ['Two children talk', '— Сәлем! Сен неше жастасың?\n\n— Мен он жастамын. Ал сен?\n\n— Мен бес жастамын.\n\n— Сенің інің бар ма?\n\n— Иә, бір інім бар. Ол үш жаста.\n\n(ал сен? = and you? · іні = younger brother · бар ма? = is there? do you have?)', [
        k.mc('How old is the younger brother?', ['one', 'three', 'ten'], 1), k.tf('One of the children is ten years old.', true), k.mc('How many younger brothers does the child have?', ['one', 'two', 'three'], 0)]] },

    { id: 'u4', t: 'Асханада. Food and drink', topic: 'Food',
      v: ['Food and drink', `
су | noun | water | Су беріңізші. | | soo | Water, please.
шай | noun | tea | Маған шай керек. | | shay | I need tea.
кофе | noun | coffee | Сүтпен кофе беріңізші. | | KO-fe | Coffee with milk, please.
нан | noun | bread | Бұл нан. | | nan | This is bread.
сүт | noun | milk | Сүт осында. | | soot | The milk is here.
ет | noun | meat | Мен ет жемеймін. | | et | I do not eat meat.
алма | noun | apple | Алма бар ма? | | al-MA | Are there any apples?
дәмді | adjective | tasty | Рақмет, өте дәмді! | | dam-DI | Thank you, very tasty!`],
      g: ['бар, жоқ, керек', '<ul><li><b>бар</b> = there is: <b>Шай бар.</b> There is tea. · <b>Шай бар ма?</b> Is there tea?</li><li><b>жоқ</b> = there is not: <b>Шай жоқ.</b> There is no tea.</li><li><b>керек</b> = needed: <b>Маған шай керек.</b> I need tea. (маған = to me)</li></ul><p>The polite way to ask for something: name it and add <b>беріңізші</b> (please give): <b>Шай беріңізші.</b></p><p>These three words always come at the end of the sentence.</p>', [
        k.mc('How do you ask “Is there tea?”', ['Шай бар ма?', 'Шай керек.', 'Шай беріңізші.'], 0), k.mc('Маған су ___. (I need water.)', ['бар', 'керек', 'жоқ'], 1),
        k.mc('— Нан бар ма? — Жоқ, нан ___.', ['бар', 'керек', 'жоқ'], 2), k.tf('“Беріңізші” is a polite way to ask for something.', true), k.ord('Маған шай керек')]],
      r: ['In a café', '— Сәлеметсіз бе! Сізге не керек?\n\n— Сәлеметсіз бе! Маған сорпа мен нан керек.\n\n— Жақсы. Шай ма, кофе ме?\n\n— Шай беріңізші.\n\n— Мінеки.\n\n— Рақмет, өте дәмді!\n\n(сізге не керек? = what do you need? · сорпа = soup · мен = and · мінеки = here you are · өте = very)', [
        k.mc('What food does the customer order?', ['soup and bread', 'meat and bread', 'soup and milk'], 0), k.mc('What does the customer drink?', ['coffee', 'tea', 'water'], 1), k.tf('The customer likes the food.', true)]] },

    { id: 'u5', t: 'Дүкен қайда? In the city', topic: 'Places',
      v: ['Places in the city', `
қала | noun | city, town | Қостанай — менің қалам. | | ka-LA | Kostanay is my city.
көше | noun | street | Бұл Әл-Фараби көшесі. | | ko-SHE | This is Al-Farabi Street.
үй | noun | house; home | Менің үйім осында. | | ooy | My house is here.
дүкен | noun | shop | Дүкен қайда? | | doo-KEN | Where is the shop?
мектеп | noun | school | Мектеп анда. | | mek-TEP | The school is over there.
қайда | question word | where | Сіз қайда тұрасыз? | | kai-DA | Where do you live?
осында | adverb | here | Мен осындамын. | | o-syn-DA | I am here.
анда | adverb | there | Дүкен анда. | | an-DA | The shop is there.`],
      g: ['In, at: -да, -де, -та, -те', '<p>Kazakh has no word for <b>in</b> or <b>at</b>. It adds an ending to the place.</p><table><tr><th>The word…</th><th>Ending</th><th>Examples</th></tr><tr><td>has a, о, ұ, ы</td><td><b>-да</b></td><td>қала → қала<b>да</b> (in the city)</td></tr><tr><td>has ә, е, і, ө, ү</td><td><b>-де</b></td><td>үй → үй<b>де</b> (at home), дүкен → дүкен<b>де</b></td></tr><tr><td>ends in п, т, к, қ, с, ш</td><td><b>-та / -те</b></td><td>мектеп → мектеп<b>те</b> (at school)</td></tr></table><p>Add the person’s ending after it: <b>Мен мектептемін.</b> = I am at school. <b>Ол үйде.</b> = He / she is at home.</p>', [
        k.mc('Мен мектеп___мін.', ['де', 'те', 'та'], 1), k.mc('Анам дүкен___.', ['де', 'да', 'те'], 0), k.mc('Ол қала___.', ['де', 'да', 'та'], 1),
        k.tf('“Дүкен қайда?” means “Where is the shop?”', true), k.ord('Менің ағам мектепте')]],
      r: ['Tom’s street', 'Менің атым Том. Мен Қостанай қаласында тұрамын.\n\nМенің үйім Әл-Фараби көшесінде. Мектеп осында, ал дүкен анда.\n\nҚазір менің ұлым мектепте, ал қызым үйде.\n\n(тұрамын = I live · қазір = now · ал = and, but)', [
        k.mc('Where does Tom live?', ['in Kostanay', 'in Astana', 'in Almaty'], 0), k.mc('Where is his son now?', ['at home', 'at school', 'in the shop'], 1), k.tf('His daughter is at home.', true)]] },

    { id: 'u6', t: 'Мен қазақша сөйлеймін. Everyday verbs', topic: 'Verbs',
      v: ['Everyday verbs', `
жұмыс істеу | verb | to work | Мен мектепте жұмыс істеймін. | | zhoo-MYS is-TEU | I work at a school.
тұру | verb | to live; to stand | Мен Қостанайда тұрамын. | | too-ROO | I live in Kostanay.
сөйлеу | verb | to speak | Мен қазақша сөйлеймін. | | soy-LEU | I speak Kazakh.
түсіну | verb | to understand | Мен түсінбеймін. | | too-si-NOO | I do not understand.
оқу | verb | to read; to study | Мен кітап оқимын. | | o-KOO | I read a book.
білу | verb | to know | Мен Айгүлді білемін. | | bi-LOO | I know Aigul.
жақсы көру | verb | to love; to like | Мен шайды жақсы көремін. | | zhak-SY ko-ROO | I love tea.
аздап | adverb | a little | Мен аздап қазақша сөйлеймін. | | az-DAP | I speak a little Kazakh.`],
      g: ['The present: тұрамын, тұрасыз, тұрады', '<p>Take <b>-у</b> off the verb, add a linking vowel (<b>а</b>, <b>е</b> or <b>й</b>), then the ending for the person. The verb comes last in the sentence.</p><table><tr><th>Person</th><th>тұру (live)</th><th>білу (know)</th><th>сөйлеу (speak)</th></tr><tr><td>мен</td><td>тұр<b>амын</b></td><td>біл<b>емін</b></td><td>сөйле<b>ймін</b></td></tr><tr><td>сен</td><td>тұр<b>асың</b></td><td>біл<b>есің</b></td><td>сөйле<b>йсің</b></td></tr><tr><td>сіз</td><td>тұр<b>асыз</b></td><td>біл<b>есіз</b></td><td>сөйле<b>йсіз</b></td></tr><tr><td>ол</td><td>тұр<b>ады</b></td><td>біл<b>еді</b></td><td>сөйле<b>йді</b></td></tr></table><p><b>Оқу</b> is a little different: оқимын, оқисың, оқисыз, оқиды.</p><p>For “not”, put <b>-ма / -ме / -ба / -бе / -па / -пе</b> inside the verb: түсін<b>бе</b>ймін = I do not understand; біл<b>ме</b>ймін = I do not know.</p>', [
        k.mc('Мен Қостанайда тұра___.', ['мын', 'сың', 'ды'], 0), k.mc('Ол кітап оқи___.', ['мын', 'сыз', 'ды'], 2), k.mc('Сен қазақша сөйлей___ бе?', ['мін', 'сің', 'ді'], 1),
        k.tf('“Мен түсінбеймін” means “I do not understand”.', true), k.ord('Мен аздап қазақша сөйлеймін')]],
      r: ['Tom and Aigul', 'Менің атым Том. Мен Қостанайда тұрамын және мектепте жұмыс істеймін. Мен мұғаліммін.\n\nМен ағылшынша сөйлеймін және аздап қазақша сөйлеймін.\n\nМенің әйелім Айгүл дүкенде жұмыс істейді. Ол қазақша оқиды және сөйлейді.\n\nМен Қостанайды жақсы көремін!\n\n(және = and · ағылшынша = in English · әйелім = my wife)', [
        k.mc('Where does Tom work?', ['in a shop', 'at a school', 'at home'], 1), k.tf('Tom speaks a lot of Kazakh.', false), k.mc('Who works in a shop?', ['Tom', 'Aigul', 'their son'], 1)]] },

    { id: 'u7', t: 'Менде … бар. I have', topic: 'Time and things',
      v: ['Time words and things', `
бүгін | adverb | today | Бүгін мен үйдемін. | | boo-GIN | Today I am at home.
ертең | adverb | tomorrow | Ертең мен жұмыс істеймін. | | er-TENG | Tomorrow I am working.
кеше | adverb | yesterday | Кеше дүйсенбі болды. | | ke-SHE | Yesterday was Monday.
қазір | adverb | now | Қазір мен мектептемін. | | ka-ZIR | I am at school now.
уақыт | noun | time | Менде уақыт бар. | | oo-a-KYT | I have time.
көлік | noun | car | Менде көлік бар. | | ko-LIK | I have a car.
телефон | noun | phone | Менде телефон жоқ. | | te-le-FON | I do not have a phone.
сабақ | noun | lesson | Бүгін менде сабақ бар. | | sa-BAK | I have a lesson today.`],
      g: ['I have: менде … бар', '<p>Kazakh says “at me there is”: <b>Менде көлік бар.</b> = I have a car.</p><table><tr><th>Person</th><th>Have</th><th>Do not have</th></tr><tr><td>I</td><td><b>Менде</b> … бар.</td><td><b>Менде</b> … жоқ.</td></tr><tr><td>you (friend)</td><td><b>Сенде</b> … бар ма?</td><td></td></tr><tr><td>you (polite)</td><td><b>Сізде</b> … бар ма?</td><td></td></tr><tr><td>he, she</td><td><b>Онда</b> … бар.</td><td><b>Онда</b> … жоқ.</td></tr></table><p>The noun does not change after <b>жоқ</b>: <b>Менде телефон жоқ.</b></p>', [
        k.mc('How do you say “I have a car”?', ['Менде көлік бар.', 'Мен көлік бар.', 'Менің көлік.'], 0), k.mc('___ уақыт бар ма? (polite “you”)', ['Менде', 'Сенде', 'Сізде'], 2),
        k.mc('Менде телефон ___. (I do not have a phone.)', ['бар', 'жоқ', 'керек'], 1), k.tf('“Бүгін менде сабақ бар” means “I have a lesson today”.', true), k.ord('Бүгін менде уақыт бар')]],
      r: ['Are you free today?', '— Сәлем, Том! Бүгін сенде уақыт бар ма?\n\n— Жоқ, бүгін менде сабақ бар.\n\n— Ал ертең?\n\n— Ертең менде уақыт бар.\n\n— Жақсы! Сенде көлік бар ма?\n\n— Жоқ, менде көлік жоқ.\n\n— Менде бар. Ертең кездесеміз!\n\n(жақсы = good · ертең кездесеміз = see you tomorrow)', [
        k.mc('When is Tom free?', ['today', 'tomorrow', 'yesterday'], 1), k.tf('Tom has a car.', false), k.mc('What does Tom have today?', ['a lesson', 'a car', 'a new phone'], 0)]] },

    { id: 'u8', t: 'Қанша тұрады? Shopping', topic: 'Shopping',
      v: ['Shopping and describing', `
қанша тұрады | phrase | how much is it | Нан қанша тұрады? | | kan-SHA too-ra-DY | How much is the bread?
ақша | noun | money | Менде ақша бар. | | ak-SHA | I have money.
қымбат | adjective | expensive | Бұл өте қымбат. | | kym-BAT | This is very expensive.
арзан | adjective | cheap | Мұнда арзан. | | ar-ZAN | It is cheap here.
үлкен | adjective | big | Бұл үлкен дүкен. | | ool-KEN | This is a big shop.
кішкентай | adjective | small | Менің үйім кішкентай. | | kish-ken-TAI | My house is small.
жақсы | adjective | good | Бұл жақсы кофе. | | zhak-SY | This is good coffee.
жаңа | adjective | new | Менде жаңа телефон бар. | | zha-NGA | I have a new phone.`],
      g: ['Adjectives, and yes-or-no questions', '<p><b>Adjectives never change</b> and come before the noun: жаңа үй, жаңа көлік, жаңа телефон.</p><p>To make a <b>yes-or-no question</b>, add a small word at the end. Which one depends on the last sound and on vowel harmony.</p><table><tr><th>The word ends in…</th><th>Question word</th><th>Examples</th></tr><tr><td>a vowel, or р, л, й, у</td><td><b>ма / ме</b></td><td>Бұл жақсы <b>ма</b>? · Бұл дәмді <b>ме</b>?</td></tr><tr><td>м, н, ң, з, ж</td><td><b>ба / бе</b></td><td>Бұл арзан <b>ба</b>? · Бұл үлкен <b>бе</b>?</td></tr><tr><td>п, т, к, қ, с, ш</td><td><b>па / пе</b></td><td>Бұл қымбат <b>па</b>? · Бұл мектеп <b>пе</b>?</td></tr></table>', [
        k.mc('Бұл жақсы ___?', ['ма', 'ба', 'па'], 0), k.mc('Бұл арзан ___?', ['ма', 'ба', 'па'], 1), k.mc('Бұл қымбат ___?', ['ма', 'ба', 'па'], 2),
        k.tf('In Kazakh the adjective changes for every noun.', false), k.ord('Бұл өте жақсы дүкен')]],
      r: ['In a phone shop', '— Сәлеметсіз бе! Мына телефон қанша тұрады?\n\n— Екі жүз мың теңге.\n\n— Бұл қымбат! Ал кішкентай телефон ше?\n\n— Жүз мың. Бұл жаңа және жақсы телефон.\n\n— Жақсы. Менде ақша бар. Рақмет!\n\n(мына = this · екі жүз мың = 200,000 · жүз мың = 100,000 · ше? = and what about…?)', [
        k.mc('What does the customer want to buy?', ['a phone', 'a car', 'a house'], 0), k.mc('How much is the small phone?', ['100,000 tenge', '200,000 tenge', '10,000 tenge'], 0), k.tf('The customer has no money.', false)]] }
  ]);
})();

/* ---- Batch 2 (22 Nov 2026): the alphabet unit and units 9 to 12. The full A1 plan is in the project doc claude/if-lingo.md. ---- */
(function () {
  var k = IFX.k;
  IFX.make('kk-a1', [
    { id: 'u0', t: 'Әліпби. The alphabet', topic: 'Alphabet',
      v: ['Words you already know', `
такси | noun | taxi | Бұл такси. | | tak-SEE | This is a taxi.
банк | noun | bank | Банк қайда? | | bank | Where is the bank?
парк | noun | park | Бұл парк. | | park | This is a park.
кафе | noun | café | Кафе осында. | | ka-FE | The café is here.
студент | noun | student | Том студент. | | stoo-DENT | Tom is a student.
паспорт | noun | passport | Бұл паспорт. | | PAS-port | This is a passport.
футбол | noun | football | Мен футболды жақсы көремін. | | foot-BOL | I love football.
компьютер | noun | computer | Бұл жаңа компьютер. | | kom-PYOO-ter | This is a new computer.`],
      g: ['42 letters: the Russian 33 and nine more', '<p>Kazakh is written with <b>42 letters</b>: the 33 letters of the Russian alphabet and <b>nine</b> more.</p><table><tr><th>Letter</th><th>Sound</th><th>Example</th></tr><tr><td><b>Ә ә</b></td><td>a, as in “cat”</td><td>әке (father)</td></tr><tr><td><b>Ғ ғ</b></td><td>a soft g, deep in the throat</td><td>аға (older brother)</td></tr><tr><td><b>Қ қ</b></td><td>a deep k, far back in the mouth</td><td>қала (city)</td></tr><tr><td><b>Ң ң</b></td><td>ng, as in “sing”</td><td>жаңа (new)</td></tr><tr><td><b>Ө ө</b></td><td>like “ur” in “burn”</td><td>көше (street)</td></tr><tr><td><b>Ұ ұ</b></td><td>a short oo, as in “put”</td><td>ұл (son)</td></tr><tr><td><b>Ү ү</b></td><td>oo said with the lips forward</td><td>үй (house)</td></tr><tr><td><b>Һ һ</b></td><td>h</td><td>қаһарман (hero)</td></tr><tr><td><b>І і</b></td><td>a short i, as in “bit”</td><td>бір (one)</td></tr></table><p>The other letters, in three groups:</p><ul><li><b>Friends</b> (as in English): А · Е · К · М · О · Т</li><li><b>False friends</b>: В = v · Н = n · Р = r · С = s · У = oo or w · Х = kh</li><li><b>New shapes</b>: Б b · Г g · Д d · Ж zh · З z · И ee · Й y · Л l · П p · Ф f · Ш sh · Ы a short hard “i”</li></ul><p>The stress is usually on the <b>last</b> part of the word: са-ЛЕМ, рақ-МЕТ.</p>', [
        k.mc('Which sound is Қ?', ['a deep k, far back in the mouth', 'sh', 'ch'], 0),
        k.mc('Which sound is Ң?', ['ng, as in “sing”', 'n', 'g'], 0),
        k.mc('Which sound is Ә?', ['a, as in “cat”', 'o', 'ya'], 0),
        k.mc('Which sound is Ш?', ['sh', 's', 'w'], 0),
        k.mc('Which sound is Р?', ['p', 'r', 'd'], 1),
        k.tf('Kazakh uses nine letters that Russian does not have.', true)]],
      r: ['Read the signs', 'ТАКСИ\n\nБАНК\n\nМЕЙРАМХАНА\n\nДӘРІХАНА\n\nДҮКЕН\n\nӘУЕЖАЙ\n\nӘЖЕТХАНА\n\n(мейрамхана = restaurant · дәріхана = pharmacy · дүкен = shop · әуежай = airport · әжетхана = toilet)', [
        k.mc('Where do you buy medicine?', ['ДӘРІХАНА', 'БАНК', 'ТАКСИ'], 0), k.mc('ДҮКЕН is…', ['a shop', 'a station', 'a road'], 0), k.mc('Which sign takes you to a plane?', ['ӘУЕЖАЙ', 'ӘЖЕТХАНА', 'МЕЙРАМХАНА'], 0)]] },

    { id: 'u9', t: 'Сағат неше? Days and time', topic: 'Time',
      v: ['Days of the week', `
дүйсенбі | noun | Monday | Дүйсенбіде мен жұмыс істеймін. | | dooy-sen-BI | On Monday I work.
сейсенбі | noun | Tuesday | Сейсенбіде сабақ бар. | | sey-sen-BI | There is a lesson on Tuesday.
сәрсенбі | noun | Wednesday | Бүгін сәрсенбі. | | sar-sen-BI | Today is Wednesday.
бейсенбі | noun | Thursday | Бейсенбіде мен үйдемін. | | bey-sen-BI | On Thursday I am at home.
жұма | noun | Friday | Жұмада біз кафедеміз. | | zhoo-MA | On Friday we are at the café.
сенбі | noun | Saturday | Сенбіде мен жұмыс істемеймін. | | sen-BI | On Saturday I do not work.
жексенбі | noun | Sunday | Жексенбіде мен үйдемін. | | zhek-sen-BI | On Sunday I am at home.
сағат | noun | hour; o’clock; clock | Қазір сағат екі. | | sa-GHAT | It is two o’clock now.`],
      g: ['What time is it? On Monday', '<p><b>Сағат неше?</b> = What time is it?</p><ul><li><b>Қазір сағат бір.</b> = It is one o’clock now.</li><li><b>Қазір сағат үш.</b> = It is three o’clock now.</li></ul><p>The number comes <b>after</b> the word <b>сағат</b>.</p><p>More numbers: <b>алты</b> 6 · <b>жеті</b> 7 · <b>сегіз</b> 8 · <b>тоғыз</b> 9 · <b>он бір</b> 11 · <b>он екі</b> 12.</p><p><b>On</b> a day and <b>at</b> a time: add <b>-да</b> or <b>-де</b>, the ending you know from “in, at”.</p><table><tr><th>Word</th><th>With the ending</th><th>Meaning</th></tr><tr><td>дүйсенбі</td><td>дүйсенбі<b>де</b></td><td>on Monday</td></tr><tr><td>жұма</td><td>жұма<b>да</b></td><td>on Friday</td></tr><tr><td>сағат алты</td><td>сағат алты<b>да</b></td><td>at six o’clock</td></tr><tr><td>сағат жеті</td><td>сағат жеті<b>де</b></td><td>at seven o’clock</td></tr></table>', [
        k.mc('Қазір сағат үш. = …', ['It is three o’clock now.', 'It is Wednesday.', 'I have three hours.'], 0),
        k.mc('on Friday = …', ['жұмада', 'жұмаде', 'жұма'], 0),
        k.mc('on Monday = …', ['дүйсенбіда', 'дүйсенбіде', 'дүйсенбі'], 1),
        k.tf('“Сағат неше?” means “What time is it?”', true),
        k.ord('Қазір сағат екі')]],
      r: ['Aigul’s week', 'Дүйсенбіде және сейсенбіде мен жұмыс істеймін.\n\nСәрсенбіде менде ағылшын тілі сабағы бар. Сабақ сағат алтыда.\n\nЖұмада біз кафедеміз. Сенбіде және жексенбіде мен үйдемін.\n\n(және = and · ағылшын тілі сабағы = an English lesson · біз = we)', [
        k.mc('When is Aigul’s English lesson?', ['on Wednesday', 'on Friday', 'on Sunday'], 0), k.tf('Aigul works on Sunday.', false), k.mc('What time is the lesson?', ['six o’clock', 'three o’clock', 'seven o’clock'], 0)]] },

    { id: 'u10', t: 'Ауа райы қандай? Weather', topic: 'Weather',
      v: ['Weather and seasons', `
ауа райы | noun | weather | Бүгін ауа райы жақсы. | | a-OO-a ra-YY | The weather is good today.
суық | adjective | cold | Қыста суық. | | soo-YQ | It is cold in winter.
жылы | adjective | warm | Көктемде жылы. | | zhy-LY | It is warm in spring.
ыстық | adjective | hot | Жазда ыстық. | | ys-TYQ | It is hot in summer.
жаңбыр | noun | rain | Бүгін жаңбыр жауып тұр. | | zhang-BYR | It is raining today.
қар | noun | snow | Қыста қар жауады. | | qar | It snows in winter.
қыс | noun | winter | Қостанайда қыс суық. | | qys | Winter in Kostanay is cold.
жаз | noun | summer | Мен жазды жақсы көремін. | | zhaz | I love summer.`],
      g: ['It is cold. In winter', '<p>Kazakh has no word for “it is”. Say the day or the place, then the adjective.</p><ul><li><b>Бүгін суық.</b> = It is cold today.</li><li><b>Осында жылы.</b> = It is warm here.</li><li><b>өте</b> = very: <b>өте суық</b> = very cold.</li></ul><p><b>In</b> a season: add <b>-да, -де, -та</b> or <b>-те</b>.</p><table><tr><th>Season</th><th>In …</th></tr><tr><td>қыс (winter)</td><td>қыс<b>та</b></td></tr><tr><td>көктем (spring)</td><td>көктем<b>де</b></td></tr><tr><td>жаз (summer)</td><td>жаз<b>да</b></td></tr><tr><td>күз (autumn)</td><td>күз<b>де</b></td></tr></table><p>After <b>к, қ, п, с, т, ш</b> the ending starts with <b>т</b>: қыс → қыста.</p>', [
        k.mc('How do you say “It is hot today”?', ['Бүгін ыстық.', 'Бүгін ыстық бар.', 'Бүгін ыстықта.'], 0),
        k.mc('in winter = …', ['қыс', 'қыста', 'қысда'], 1),
        k.mc('in summer = …', ['жазда', 'жазта', 'жаз'], 0),
        k.tf('“өте суық” means “very cold”.', true),
        k.ord('Бүгін өте суық')]],
      r: ['The weather in Kostanay', 'Мен Қостанайда тұрамын. Қыста осында өте суық, қар жауады. Көктемде жылы. Жазда ыстық. Күзде жаңбыр жауады.\n\nБүгін ауа райы жақсы: жылы. Мен жазды жақсы көремін!\n\n(жауады = falls · күзде = in autumn)', [
        k.mc('What is winter like in Kostanay?', ['very cold', 'warm', 'hot'], 0), k.tf('It rains in autumn.', true), k.mc('Which season does the writer love?', ['summer', 'winter', 'autumn'], 0)]] },

    { id: 'u11', t: 'Менің күнім. My day', topic: 'Daily routine',
      v: ['From morning to night', `
таңертең | adverb | in the morning | Таңертең мен кофе ішемін. | | tang-er-TENG | In the morning I drink coffee.
күндіз | adverb | in the daytime | Күндіз мен жұмыс істеймін. | | koon-DIZ | In the daytime I work.
кешке | adverb | in the evening | Кешке мен үйдемін. | | kesh-KE | In the evening I am at home.
түнде | adverb | at night | Түнде мен ұйықтаймын. | | toon-DE | At night I sleep.
таңғы ас | noun | breakfast | Мен таңғы асты сағат жетіде ішемін. | | tang-GHY as | I have breakfast at seven o’clock.
түскі ас | noun | lunch | Біз түскі асты кафеде ішеміз. | | toos-KI as | We have lunch at a café.
кешкі ас | noun | dinner | Кешкі асты үйде ішемін. | | kesh-KI as | I have dinner at home.
ұйықтау | verb | to sleep | Мен түнде ұйықтаймын. | | oo-yyq-TAU | I sleep at night.`],
      g: ['We and they in the present', '<p>You know <b>мен тұрамын, сіз тұрасыз, ол тұрады</b>. Here are <b>we</b> and <b>they</b>.</p><table><tr><th>Who</th><th>ішу (to drink, to have a meal)</th><th>ұйықтау (to sleep)</th></tr><tr><td>мен (I)</td><td>іше<b>мін</b></td><td>ұйықтай<b>мын</b></td></tr><tr><td>сіз (you, polite)</td><td>іше<b>сіз</b></td><td>ұйықтай<b>сыз</b></td></tr><tr><td>ол (he, she)</td><td>іше<b>ді</b></td><td>ұйықтай<b>ды</b></td></tr><tr><td>біз (we)</td><td>іше<b>міз</b></td><td>ұйықтай<b>мыз</b></td></tr><tr><td>олар (they)</td><td>іше<b>ді</b></td><td>ұйықтай<b>ды</b></td></tr></table><p><b>They</b> uses the same ending as <b>he, she</b>.</p><p>Words with <b>ә, е, і, ө, ү</b> take the soft endings (-мін, -міз, -ді); words with <b>а, о, ұ, ы</b> take the hard ones (-мын, -мыз, -ды).</p>', [
        k.mc('Біз кафеде түскі ас іше___.', ['мін', 'міз', 'ді'], 1),
        k.mc('Олар үйде ұйықтай___.', ['ды', 'мыз', 'мын'], 0),
        k.mc('Мен кофе іше___.', ['мін', 'міз', 'сіз'], 0),
        k.mc('in the evening = …', ['кешке', 'түнде', 'таңертең'], 0),
        k.ord('Таңертең мен кофе ішемін')]],
      r: ['Aigul’s day', 'Таңертең Айгүл үйде таңғы ас ішеді: шай және нан. Сағат тоғызда ол жұмыста.\n\nКүндіз Айгүл мен Том кафеде түскі ас ішеді. Содан кейін олар жұмыс істейді.\n\nКешке Айгүл үйде кешкі ас ішеді. Түнде ол ұйықтайды.\n\n(жұмыста = at work · Айгүл мен Том = Aigul and Tom · содан кейін = after that)', [
        k.mc('Where does Aigul have breakfast?', ['at home', 'at a café', 'at work'], 0), k.tf('Aigul and Tom have lunch at a café.', true), k.mc('What does Aigul do at night?', ['She sleeps.', 'She works.', 'She has dinner.'], 0)]] },

    { id: 'u12', t: 'Менің пәтерім. My home', topic: 'Home',
      v: ['Rooms and furniture', `
пәтер | noun | flat, apartment | Менде үлкен пәтер бар. | | pa-TER | I have a big flat.
бөлме | noun | room | Бұл менің бөлмем. | | bol-ME | This is my room.
ас үй | noun | kitchen | Анам ас үйде. | | as ooy | My mother is in the kitchen.
үстел | noun | table | Телефон үстелде. | | oos-TEL | The phone is on the table.
орындық | noun | chair | Бұл жаңа орындық. | | o-ryn-DYQ | This is a new chair.
терезе | noun | window | Бөлмеде үлкен терезе бар. | | te-re-ZE | There is a big window in the room.
төсек | noun | bed | Төсек бөлмеде. | | to-SEK | The bed is in the room.
кітап | noun | book | Бұл жақсы кітап. | | ki-TAP | This is a good book.`],
      g: ['Where is it? There is, there is not', '<p>The ending <b>-да, -де, -та, -те</b> means <b>in, on</b> and <b>at</b>.</p><table><tr><th>Noun</th><th>Where?</th><th>Meaning</th></tr><tr><td>бөлме</td><td>бөлме<b>де</b></td><td>in the room</td></tr><tr><td>үстел</td><td>үстел<b>де</b></td><td>on the table</td></tr><tr><td>орындық</td><td>орындық<b>та</b></td><td>on the chair</td></tr><tr><td>төсек</td><td>төсек<b>те</b></td><td>on the bed</td></tr></table><ul><li><b>Бөлмеде терезе бар.</b> = There is a window in the room.</li><li><b>Бөлмеде үстел жоқ.</b> = There is no table in the room.</li><li><b>Кітап қайда?</b> — <b>Үстелде.</b> = Where is the book? On the table.</li></ul>', [
        k.mc('Кітап үстел___.', ['да', 'де', 'те'], 1),
        k.mc('Телефон орындық___.', ['та', 'да', 'де'], 0),
        k.mc('“There is a window in the room.” = …', ['Бөлмеде терезе бар.', 'Бөлмеде терезе жоқ.', 'Терезе бөлме.'], 0),
        k.tf('“Кітап қайда?” means “Where is the book?”', true),
        k.ord('Кітап үстелде')]],
      r: ['Tom’s flat', 'Менде пәтер бар. Ол кішкентай, бірақ жақсы.\n\nПәтерде бір бөлме және ас үй бар. Бөлмеде төсек, үстел және орындық бар. Үстелде кітап пен телефон бар.\n\nБөлмеде үлкен терезе бар.\n\n(ол = it · бірақ = but · кітап пен телефон = a book and a phone)', [
        k.mc('How many rooms are there in the flat?', ['one', 'two', 'three'], 0), k.tf('There is a book on the table.', true), k.mc('What is big?', ['the window', 'the flat', 'the table'], 0)]] }
  ]);
  IFX.order('kk-a1', ['u0', 'u1', 'u2', 'u3', 'u4', 'u5', 'u6', 'u7', 'u8', 'u9', 'u10', 'u11', 'u12']);
})();

/* ---- Batch 3 (22 Nov 2026): units 13 to 19. Kazakh A1 now has all 20 units of the plan. ---- */
(function () {
  var k = IFX.k;
  IFX.make('kk-a1', [
    { id: 'u13', t: 'Қалай барамын? Transport', topic: 'Transport',
      v: ['Getting around', `
автобус | noun | bus | Мен автобуспен барамын. | | af-TO-boos | I go by bus.
пойыз | noun | train | Пойыз сағат алтыда. | | po-YYZ | The train is at six o’clock.
ұшақ | noun | plane | Ұшақ үлкен. | | oo-SHAQ | The plane is big.
вокзал | noun | railway station | Вокзал қайда? | | vak-ZAL | Where is the railway station?
аялдама | noun | bus stop | Аялдама осында. | | a-yal-da-MA | The bus stop is here.
билет | noun | ticket | Бір билет беріңізші. | | bi-LET | One ticket, please.
бару | verb | to go | Мен дүкенге барамын. | | ba-ROO | I am going to the shop.
келу | verb | to come | Ол үйге келеді. | | ke-LOO | He is coming home.`],
      g: ['To a place: -ға, -ге, -қа, -ке', '<p>For <b>to</b> a place, add an ending to the place.</p><table><tr><th>The word</th><th>Ending</th><th>Examples</th></tr><tr><td>has а, о, ұ, ы</td><td><b>-ға</b></td><td>қала → қала<b>ға</b>, Астана → Астана<b>ға</b>, вокзал → вокзал<b>ға</b></td></tr><tr><td>has ә, е, і, ө, ү</td><td><b>-ге</b></td><td>үй → үй<b>ге</b>, дүкен → дүкен<b>ге</b>, кафе → кафе<b>ге</b></td></tr><tr><td>ends in к, қ, п, с, т, ш</td><td><b>-қа</b> or <b>-ке</b></td><td>жұмыс → жұмыс<b>қа</b>, мектеп → мектеп<b>ке</b>, парк → парк<b>ке</b></td></tr></table><p>The verb: мен бара<b>мын</b> · сіз бара<b>сыз</b> · ол бара<b>ды</b> · біз бара<b>мыз</b>.</p><p><b>By</b> transport: add <b>-мен, -бен</b> or <b>-пен</b>: такси<b>мен</b>, пойыз<b>бен</b>, автобус<b>пен</b>.</p>', [
        k.mc('Мен дүкен___ барамын.', ['ге', 'ға', 'де'], 0),
        k.mc('Біз Астана___ барамыз.', ['ге', 'ға', 'да'], 1),
        k.mc('Ол мектеп___ барады.', ['ке', 'ге', 'ға'], 0),
        k.mc('by bus = …', ['автобуспен', 'автобусқа', 'автобуста'], 0),
        k.ord('Мен дүкенге барамын')]],
      r: ['A trip to Astana', 'Сенбіде біз Астанаға барамыз. Біз пойызбен барамыз. Пойыз сағат жетіде.\n\nТаңертең біз вокзалға таксимен барамыз. Менде билет бар.\n\nАстанада біз паркке және кафеге барамыз.', [
        k.mc('How are they travelling to Astana?', ['by train', 'by bus', 'by plane'], 0), k.tf('They go to the station by bus.', false), k.mc('What time is the train?', ['seven o’clock', 'six o’clock', 'nine o’clock'], 0)]] },

    { id: 'u14', t: 'Қай жеріңіз ауырады? Health', topic: 'Health',
      v: ['The body and the doctor', `
бас | noun | head | Менің басым ауырады. | | bas | I have a headache.
қол | noun | hand; arm | Бұл менің қолым. | | qol | This is my hand.
аяқ | noun | leg; foot | Менің аяғым ауырады. | | a-YAQ | My leg hurts.
іш | noun | stomach | Оның іші ауырады. | | ish | He has a stomach ache.
тіс | noun | tooth | Менің тісім ауырады. | | tis | I have a toothache.
дәрігер | noun | doctor | Дәрігер ауруханада. | | da-ri-GER | The doctor is at the hospital.
аурухана | noun | hospital | Аурухана қайда? | | a-oo-roo-kha-NA | Where is the hospital?
дәріхана | noun | pharmacy | Дәріхана анда. | | da-ri-kha-NA | The pharmacy is there.`],
      g: ['It hurts: менің … ауырады', '<p><b>Менің басым ауырады.</b> = My head hurts.</p><p>Use the “my” endings from Unit 3:</p><table><tr><th>Noun</th><th>My …</th><th>His, her …</th></tr><tr><td>бас</td><td>менің бас<b>ым</b></td><td>оның бас<b>ы</b></td></tr><tr><td>тіс</td><td>менің тіс<b>ім</b></td><td>оның тіс<b>і</b></td></tr><tr><td>қол</td><td>менің қол<b>ым</b></td><td>оның қол<b>ы</b></td></tr><tr><td>аяқ</td><td>менің ая<b>ғым</b></td><td>оның ая<b>ғы</b></td></tr></table><p>Before the ending, <b>қ</b> becomes <b>ғ</b>: аяқ → аяғым.</p><p>The doctor asks: <b>Қай жеріңіз ауырады?</b> = Where does it hurt?</p>', [
        k.mc('Менің бас___ ауырады.', ['ым', 'ім', 'ы'], 0),
        k.mc('Менің тіс___ ауырады.', ['ым', 'ім', 'і'], 1),
        k.mc('аяқ → my leg = менің …', ['аяқым', 'аяғым', 'аяқ'], 1),
        k.tf('“Оның басы ауырады” can mean “His head hurts” or “Her head hurts”.', true),
        k.ord('Менің басым ауырады')]],
      r: ['At the doctor’s', '— Сәлеметсіз бе! Қай жеріңіз ауырады?\n\n— Сәлеметсіз бе, дәрігер. Менің басым және ішім ауырады.\n\n— Сіз бүгін жұмыс істейсіз бе?\n\n— Жоқ, бүгін мен үйдемін.\n\n— Жақсы. Дәріхана осында, ауруханада. Шай, су ішіңіз және ұйықтаңыз!\n\n— Рақмет, дәрігер.\n\n(ішіңіз = drink · ұйықтаңыз = sleep)', [
        k.mc('What hurts?', ['the head and the stomach', 'a tooth', 'a leg'], 0), k.tf('The patient is working today.', false), k.mc('Where is the pharmacy?', ['in the hospital', 'in the park', 'at the station'], 0)]] },

    { id: 'u15', t: 'Киім және түстер. Clothes and colours', topic: 'Clothes',
      v: ['Clothes and three colours', `
киім | noun | clothes | Бұл жаңа киім. | | ki-IM | These are new clothes.
күрте | noun | jacket | Менде жылы күрте бар. | | koor-TE | I have a warm jacket.
көйлек | noun | shirt; dress | Бұл ақ көйлек. | | koy-LEK | This is a white shirt.
шалбар | noun | trousers | Бұл менің шалбарым. | | shal-BAR | These are my trousers.
аяқ киім | noun | shoes | Менің аяқ киімім қайда? | | a-YAQ ki-IM | Where are my shoes?
ақ | adjective | white | Қар ақ. | | aq | Snow is white.
қара | adjective | black | Бұл қара кофе. | | qa-RA | This is black coffee.
қызыл | adjective | red | Бұл қызыл көлік. | | qy-ZYL | This is a red car.`],
      g: ['More than one: -лар, -дар, -тар', '<p>The plural ending has three forms. Each has a hard and a soft pair.</p><table><tr><th>The word ends in…</th><th>Ending</th><th>Examples</th></tr><tr><td>a vowel, or р, й, у</td><td><b>-лар, -лер</b></td><td>бала → бала<b>лар</b> (children), күрте → күрте<b>лер</b>, шалбар → шалбар<b>лар</b></td></tr><tr><td>л, м, н, ң, з, ж</td><td><b>-дар, -дер</b></td><td>қыз → қыз<b>дар</b>, дүкен → дүкен<b>дер</b>, үстел → үстел<b>дер</b></td></tr><tr><td>к, қ, п, с, т, ш</td><td><b>-тар, -тер</b></td><td>кітап → кітап<b>тар</b>, дос → дос<b>тар</b>, көйлек → көйлек<b>тер</b></td></tr></table><p>After a number, the noun stays as it is: <b>екі кітап</b> = two books.</p>', [
        k.mc('кітап → …', ['кітаптар', 'кітаплар', 'кітапдар'], 0),
        k.mc('күрте → …', ['күртелар', 'күртелер', 'күртедер'], 1),
        k.mc('дүкен → …', ['дүкендер', 'дүкенлер', 'дүкентер'], 0),
        k.mc('two books = …', ['екі кітап', 'екі кітаптар', 'екі кітаплар'], 0),
        k.ord('Бұл менің жаңа шалбарым')]],
      r: ['In a clothes shop', '— Сәлеметсіз бе! Сізде күртелер бар ма?\n\n— Иә. Міне, қара күртелер, ал мынау қызыл күртелер.\n\n— Қара күрте қанша тұрады?\n\n— Жиырма мың теңге.\n\n— Жақсы. Және ақ көйлек беріңізші.\n\n(міне = here is, here are · ал мынау = and these are · жиырма мың = twenty thousand)', [
        k.mc('Which jacket does the customer ask the price of?', ['the black one', 'the red one', 'the white one'], 0), k.tf('The shop has red jackets.', true), k.mc('What else does the customer want?', ['a white shirt', 'black trousers', 'red shoes'], 0)]] },

    { id: 'u16', t: 'Сізге не ұнайды? Free time', topic: 'Free time',
      v: ['Things to do', `
музыка | noun | music | Маған музыка ұнайды. | | MOO-zy-ka | I like music.
фильм | noun | film | Бұл жақсы фильм. | | film | This is a good film.
спорт | noun | sport | Маған спорт ұнайды. | | sport | I like sport.
ойын | noun | game | Бұл жаңа ойын. | | o-YYN | This is a new game.
ойнау | verb | to play | Балалар паркте ойнайды. | | oy-NAU | The children play in the park.
көру | verb | to see; to watch | Кешке мен фильм көремін. | | ko-ROO | In the evening I watch a film.
тыңдау | verb | to listen to | Мен музыка тыңдаймын. | | tyng-DAU | I listen to music.
демалу | verb | to rest | Сенбіде мен демаламын. | | de-ma-LOO | On Saturday I rest.`],
      g: ['I like: маған … ұнайды', '<p><b>Маған музыка ұнайды.</b> = I like music. (Word for word: “To me music is pleasing.”)</p><table><tr><th>Who likes it</th><th>Kazakh</th></tr><tr><td>I</td><td><b>маған</b> … ұнайды</td></tr><tr><td>you (polite)</td><td><b>сізге</b> … ұнайды</td></tr><tr><td>he, she</td><td><b>оған</b> … ұнайды</td></tr><tr><td>we</td><td><b>бізге</b> … ұнайды</td></tr></table><ul><li>To like <b>doing</b>: use the verb with <b>-у</b>: <b>Маған кітап оқу ұнайды.</b> = I like reading books.</li><li>Not: <b>ұнамайды</b>. — Маған футбол ұнамайды. = I do not like football.</li><li>The question: <b>Сізге не ұнайды?</b> = What do you like?</li></ul>', [
        k.mc('___ музыка ұнайды. (I)', ['Маған', 'Мен', 'Менде'], 0),
        k.mc('“I like reading books.” = …', ['Маған кітап оқу ұнайды.', 'Мен кітап оқу ұнайды.', 'Маған кітап оқимын ұнайды.'], 0),
        k.mc('“I do not like football.” = Маған футбол …', ['ұнамайды', 'ұнайды', 'жоқ ұнайды'], 0),
        k.tf('“Сізге не ұнайды?” means “What do you like?”', true),
        k.ord('Маған музыка ұнайды')]],
      r: ['Tom’s Saturday', 'Менің атым Том. Сенбіде мен жұмыс істемеймін.\n\nТаңертең мен кітап оқимын. Күндіз біз паркте футбол ойнаймыз. Маған футбол өте ұнайды!\n\nКешке мен музыка тыңдаймын немесе фильм көремін.\n\nАл сізге не ұнайды?\n\n(немесе = or · ал = and, but)', [
        k.mc('What does Tom do in the morning?', ['He reads a book.', 'He plays football.', 'He works.'], 0), k.tf('Tom plays football in the park.', true), k.mc('What does Tom do in the evening?', ['He listens to music or watches a film.', 'He reads a book.', 'He goes to the shop.'], 0)]] },

    { id: 'u17', t: 'Кеше не істедіңіз? Yesterday', topic: 'The past',
      v: ['Yesterday', `
істеу | verb | to do | Сіз не істейсіз? | | is-TEU | What are you doing?
болу | verb | to be | Кеше мен үйде болдым. | | bo-LOO | Yesterday I was at home.
серуендеу | verb | to go for a walk | Біз паркте серуендедік. | | se-roo-en-DEU | We walked in the park.
сатып алу | verb | to buy | Мен нан сатып алдым. | | sa-TYP a-LOO | I bought bread.
апта | noun | week | Аптада жеті күн бар. | | ap-TA | There are seven days in a week.
жыл | noun | year | Бұл жақсы жыл. | | zhyl | This is a good year.
күн | noun | day | Бүгін жақсы күн. | | koon | Today is a good day.
бұрын | adverb | before, earlier | Мен бұрын Астанада тұрдым. | | boo-RYN | I lived in Astana before.`],
      g: ['The past: -ды, -ді, -ты, -ті', '<p>Take <b>-у</b> off the verb, add the past ending, then the person.</p><table><tr><th>Who</th><th>бару (go)</th><th>келу (come)</th><th>ішу (drink)</th></tr><tr><td>мен</td><td>бар<b>дым</b></td><td>кел<b>дім</b></td><td>іш<b>тім</b></td></tr><tr><td>сіз</td><td>бар<b>дыңыз</b></td><td>кел<b>діңіз</b></td><td>іш<b>тіңіз</b></td></tr><tr><td>ол, олар</td><td>бар<b>ды</b></td><td>кел<b>ді</b></td><td>іш<b>ті</b></td></tr><tr><td>біз</td><td>бар<b>дық</b></td><td>кел<b>дік</b></td><td>іш<b>тік</b></td></tr></table><p>After <b>к, қ, п, с, т, ш</b> the ending starts with <b>т</b>: іш → іш<b>ті</b>.</p><p>Not: add <b>-ма, -ме</b> first: істе<b>ме</b>ді = did not do.</p>', [
        k.mc('Кеше мен дүкенге бар___.', ['дым', 'дім', 'тым'], 0),
        k.mc('Кеше біз үйге кел___.', ['дік', 'дық', 'дім'], 0),
        k.mc('Кеше ол шай іш___.', ['ті', 'ді', 'ты'], 0),
        k.tf('“Мен кітап оқыдым” means “I read a book” (in the past).', true),
        k.ord('Кеше мен үйде болдым')]],
      r: ['Aigul’s Sunday', 'Кеше жексенбі болды. Айгүл жұмыс істемеді.\n\nТаңертең ол үйде болды, кітап оқыды. Күндіз Айгүл мен Том паркте серуендеді. Күн жылы болды.\n\nСодан кейін олар дүкенге барды. Айгүл нан мен сүт сатып алды.\n\nКешке олар фильм көрді.\n\n(нан мен сүт = bread and milk)', [
        k.mc('What did Aigul do in the morning?', ['She read a book at home.', 'She worked.', 'She went to the park.'], 0), k.tf('It was cold.', false), k.mc('What did Aigul buy?', ['bread and milk', 'a book', 'a ticket'], 0)]] },

    { id: 'u18', t: 'Жоспарлар. Plans', topic: 'The future',
      v: ['Holidays and plans', `
жоспар | noun | plan | Менің жоспарым бар. | | zhos-PAR | I have a plan.
демалыс | noun | holiday; day off | Жазда менде демалыс бар. | | de-ma-LYS | I have a holiday in summer.
теңіз | noun | sea | Жазда біз теңізге барамыз. | | te-NGIZ | In summer we go to the sea.
тау | noun | mountain | Бұл үлкен тау. | | tau | This is a big mountain.
үйрену | verb | to learn | Мен қазақ тілін үйренемін. | | ooy-re-NOO | I am learning Kazakh.
жақында | adverb | soon | Жақында жаз келеді. | | zha-qyn-DA | Summer is coming soon.
мүмкін | word | maybe | Мүмкін, ертең. | | moom-KIN | Maybe tomorrow.
келесі | adjective | next | Келесі аптада мен Астанаға барамын. | | ke-le-SI | Next week I am going to Astana.`],
      g: ['The future: the same verb and a time word', '<p>Kazakh uses the present form for the future too. A time word shows which one you mean.</p><ul><li><b>Мен жұмыс істеймін.</b> = I work.</li><li><b>Мен ертең жұмыс істеймін.</b> = I will work tomorrow.</li></ul><p>Time words: <b>ертең</b> tomorrow · <b>жақында</b> soon · <b>келесі аптада</b> next week · <b>жазда</b> in summer.</p><p><b>Will not</b>: put <b>-ма</b> or <b>-ме</b> (after к, қ, п, с, т, ш: <b>-па, -пе</b>) before the ending.</p><table><tr><th>Verb</th><th>I will not…</th></tr><tr><td>бару</td><td>бар<b>ма</b>ймын</td></tr><tr><td>келу</td><td>кел<b>ме</b>ймін</td></tr><tr><td>істеу</td><td>істе<b>ме</b>ймін</td></tr></table>', [
        k.mc('“I will work tomorrow.” = …', ['Мен ертең жұмыс істеймін.', 'Мен кеше жұмыс істедім.', 'Мен ертең жұмыс істедім.'], 0),
        k.mc('“I will not go.” = Мен бар___мын.', ['май', 'мей', 'ды'], 0),
        k.mc('“I will not come.” = Мен кел___мін.', ['май', 'мей', 'ді'], 1),
        k.tf('Kazakh can use the same verb form for “now” and for “tomorrow”.', true),
        k.ord('Ертең мен үйде боламын')]],
      r: ['Summer plans', 'Жақында жаз келеді! Шілдеде менде демалыс бар.\n\nМен жұмыс істемеймін. Біз теңізге барамыз. Таңертең мен серуендеймін, ал күндіз демаламын.\n\nКешке мен қазақ тілін үйренемін. Мүмкін, мен қазақша кітап оқимын!\n\n(шілдеде = in July · қазақша = in Kazakh)', [
        k.mc('When is the holiday?', ['in July', 'in winter', 'on Saturday'], 0), k.tf('The writer will work on holiday.', false), k.mc('What will the writer do in the evening?', ['learn Kazakh', 'go for a walk', 'watch a film'], 0)]] },

    { id: 'u19', t: 'Саяхат. Travel and review', topic: 'Travel',
      v: ['On a trip', `
саяхат | noun | journey, trip | Бұл жақсы саяхат. | | sa-ya-KHAT | This is a good trip.
қонақүй | noun | hotel | Қонақүй қала орталығында. | | qo-naq-OOY | The hotel is in the city centre.
кілт | noun | key | Міне, сіздің кілтіңіз. | | kilt | Here is your key.
ел | noun | country | Қазақстан — үлкен ел. | | yel | Kazakhstan is a big country.
әуежай | noun | airport | Біз әуежайға барамыз. | | a-oo-e-ZHAY | We are going to the airport.
турист | noun | tourist | Мен туристпін. | | too-RIST | I am a tourist.
орталық | noun | centre | Орталықта үлкен парк бар. | | or-ta-LYQ | There is a big park in the centre.
көмектесіңізші | phrase | help me, please | Көмектесіңізші! | | ko-mek-te-si-NGIZ-shi | Help me, please!`],
      g: ['Review: seven things you can say now', '<table><tr><th>You can…</th><th>Kazakh</th></tr><tr><td>say who you are</td><td>Менің атым Том. Мен туристпін.</td></tr><tr><td>say what you have</td><td><b>Менде</b> билет <b>бар</b>.</td></tr><tr><td>say where a thing is</td><td>Қонақүй орталық<b>та</b>.</td></tr><tr><td>say where you are going</td><td>Мен Астана<b>ға</b> барамын.</td></tr><tr><td>say what you like</td><td><b>Маған</b> музыка <b>ұнайды</b>.</td></tr><tr><td>talk about yesterday</td><td>Кеше мен үйде бол<b>дым</b>.</td></tr><tr><td>talk about tomorrow</td><td><b>Ертең</b> мен жұмыс істеймін.</td></tr></table><p>This is the end of Kazakh A1. Well done!</p>', [
        k.mc('Менде билет ___.', ['бар', 'барамын', 'болды'], 0),
        k.mc('Қонақүй орталық___.', ['та', 'да', 'қа'], 0),
        k.mc('Кеше Айгүл әуежайда бол___.', ['ды', 'ады', 'дым'], 0),
        k.mc('Біз Астана___ барамыз.', ['ға', 'да', 'ге'], 0),
        k.mc('___ музыка ұнайды.', ['Маған', 'Мен', 'Менде'], 0),
        k.ord('Сізде бөлме бар ма')]],
      r: ['At the hotel', '— Сәлеметсіз бе! Сізде бөлме бар ма?\n\n— Сәлеметсіз бе! Иә, бар. Сіз туристсіз бе?\n\n— Иә, мен Англияданмын. Кеше мен Астанада болдым, ал бүгін Қостанайдамын.\n\n— Жақсы. Бөлме жиырма мың теңге тұрады. Міне, сіздің кілтіңіз.\n\n— Рақмет! Ал кафе қайда?\n\n— Кафе осында, қонақүйде.\n\n(Англияданмын = I am from England)', [
        k.mc('Where is the tourist from?', ['England', 'Astana', 'Kostanay'], 0), k.tf('He was in Astana yesterday.', true), k.mc('Where is the café?', ['in the hotel', 'in the park', 'at the airport'], 0)]] }
  ]);
  IFX.order('kk-a1', ['u0', 'u1', 'u2', 'u3', 'u4', 'u5', 'u6', 'u7', 'u8', 'u9', 'u10', 'u11', 'u12', 'u13', 'u14', 'u15', 'u16', 'u17', 'u18', 'u19']);
})();
