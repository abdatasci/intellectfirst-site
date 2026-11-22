/* IF Lingo · Kazakh A1: an original IF Academy course for people who speak English.
   Word lines: word | part of speech | meaning in English | example | (empty) | how to say it | the example in English.
   Capital letters in "how to say it" show the stressed syllable (in Kazakh, usually the last one). */
IFX.course({
  id: 'kk-a1', track: 'lang', lang: 'kk-KZ', level: 'A1', next: 'A2', icon: '🇰🇿',
  title: 'Kazakh A1', sub: 'Your first steps in Kazakh',
  blurb: 'Say hello, talk about your family, order food, find your way and go shopping: the first 64 words and 8 grammar points, explained in English.',
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
