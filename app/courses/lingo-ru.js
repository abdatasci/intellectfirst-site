/* IF Lingo · Russian A1: an original IF Academy course for people who speak English.
   Word lines: word | part of speech | meaning in English | example | (empty) | how to say it | the example in English.
   Capital letters in "how to say it" show the stressed syllable. */
IFX.course({
  id: 'ru-a1', track: 'lang', lang: 'ru-RU', level: 'A1', next: 'A2', icon: '🇷🇺',
  title: 'Russian A1', sub: 'Your first steps in Russian',
  blurb: 'Say hello, talk about your family, order food, find your way and go shopping: the alphabet, 160 words and 20 grammar points, explained in English.',
  units: []
});
(function () {
  var k = IFX.k;
  IFX.make('ru-a1', [
    { id: 'u1', t: 'Привет! Hello!', topic: 'Greetings',
      v: ['Hello, please, thank you', `
привет | greeting | hi (to friends) | Привет, Анна! | | pree-VYET | Hi, Anna!
здравствуйте | greeting | hello (polite) | Здравствуйте, я Том. | | ZDRAST-vooy-tye | Hello, I am Tom.
спасибо | word | thank you | Спасибо, хорошо. | | spa-SEE-ba | Thank you, good.
пожалуйста | word | please; you are welcome | Чай, пожалуйста. | | pa-ZHAL-sta | Tea, please.
да | word | yes | Да, я студент. | | da | Yes, I am a student.
нет | word | no | Нет, спасибо. | | nyet | No, thank you.
меня зовут | phrase | my name is | Меня зовут Том. | | mee-NYA za-VOOT | My name is Tom.
до свидания | greeting | goodbye | До свидания, Анна! | | da svee-DA-nee-ya | Goodbye, Anna!`],
      g: ['No word for “am, is, are”', '<p>In the present, Russian does not use a word for <b>am, is, are</b>.</p><ul><li><b>Я Том.</b> = I am Tom.</li><li><b>Это Анна.</b> = This is Anna.</li><li><b>Я студент.</b> = I am a student.</li></ul><p>To ask a name: <b>Как вас зовут?</b> (polite) · <b>Как тебя зовут?</b> (to a friend or a child). Answer: <b>Меня зовут …</b></p>', [
        k.mc('How do you say “I am Tom” in Russian?', ['Я Том.', 'Я есть Том.', 'Меня Том.'], 0),
        k.mc('You meet your new boss. Which word is the polite hello?', ['Привет!', 'Здравствуйте!', 'Спасибо!'], 1),
        k.tf('“Это Анна” means “This is Anna”.', true),
        k.ord('Меня зовут Анна'),
        k.mc('— Как вас зовут? — …', ['Меня зовут Том.', 'Спасибо.', 'До свидания.'], 0)]],
      r: ['At the language school', '— Здравствуйте! Меня зовут Анна. Как вас зовут?\n\n— Здравствуйте! Меня зовут Том.\n\n— Вы студент?\n\n— Да, я студент. А вы?\n\n— Я учитель.\n\n— Спасибо, Анна. До свидания!\n\n— До свидания, Том!\n\n(вы = you · учитель = teacher · а вы? = and you?)', [
        k.mc('Who is the teacher?', ['Anna', 'Tom', 'Nobody'], 0), k.tf('Tom is a student.', true), k.mc('Which words do they use to say goodbye?', ['Привет', 'До свидания', 'Спасибо'], 1)]] },

    { id: 'u2', t: 'Моя семья. My family', topic: 'Family',
      v: ['Family and friends', `
семья | noun (feminine) | family | Это моя семья. | | seem-YA | This is my family.
мама | noun (feminine) | mum | Моя мама — учитель. | | MA-ma | My mum is a teacher.
папа | noun (masculine) | dad | Мой папа — врач. | | PA-pa | My dad is a doctor.
брат | noun (masculine) | brother | Это мой брат. | | brat | This is my brother.
сестра | noun (feminine) | sister | Моя сестра — студентка. | | sees-TRA | My sister is a student.
друг | noun (masculine) | friend | Том — мой друг. | | drook | Tom is my friend.
сын | noun (masculine) | son | Мой сын дома. | | syn | My son is at home.
дочь | noun (feminine) | daughter | Моя дочь в школе. | | doch | My daughter is at school.`],
      g: ['My: мой, моя, моё', '<p>Every Russian noun is masculine, feminine or neuter. The word for <b>my</b> changes with it.</p><table><tr><th>Noun</th><th>My</th><th>Examples</th></tr><tr><td>masculine (ends in a consonant)</td><td><b>мой</b></td><td>мой брат, мой друг, мой дом</td></tr><tr><td>feminine (ends in -а, -я)</td><td><b>моя</b></td><td>моя мама, моя сестра, моя семья</td></tr><tr><td>neuter (ends in -о, -е)</td><td><b>моё</b></td><td>моё молоко</td></tr></table><p>Watch out: <b>папа</b> is a man, so it is masculine: <b>мой папа</b>. <b>Дочь</b> is feminine: <b>моя дочь</b>.</p>', [
        k.mc('___ сестра', ['Мой', 'Моя', 'Моё'], 1), k.mc('___ брат', ['Мой', 'Моя', 'Моё'], 0), k.mc('___ папа', ['Мой', 'Моя', 'Моё'], 0),
        k.tf('“Моя мама” is correct Russian.', true), k.ord('Это моя семья')]],
      r: ['Anna’s family', 'Меня зовут Анна. Это моя семья.\n\nМоя мама — учитель. Мой папа — врач.\n\nМой брат — студент. Моя сестра — тоже студентка.\n\nТом — мой друг.\n\n(врач = doctor · тоже = also)', [
        k.mc('What is the job of Anna’s mum?', ['teacher', 'doctor', 'student'], 0), k.tf('Anna’s dad is a doctor.', true), k.mc('Who is Tom?', ['her brother', 'her friend', 'her dad'], 1)]] },

    { id: 'u3', t: 'Сколько вам лет? Numbers and age', topic: 'Numbers',
      v: ['Numbers and age', `
один | number | one | Один чай, пожалуйста. | | a-DEEN | One tea, please.
два | number | two | Два кофе, пожалуйста. | | dva | Two coffees, please.
три | number | three | У меня три брата. | | tree | I have three brothers.
четыре | number | four | Четыре плюс один — пять. | | chee-TY-ree | Four plus one is five.
пять | number | five | Мне пять лет. | | pyat | I am five years old.
десять | number | ten | Сыну десять лет. | | DYE-seet | My son is ten years old.
сколько | question word | how much; how many | Сколько вам лет? | | SKOL-ka | How old are you?
лет | noun | years (after 5 and more) | Мне двадцать лет. | | lyet | I am twenty years old.`],
      g: ['Saying your age', '<p>Russian says “to me (there are) … years”: <b>Мне пять лет.</b> = I am five.</p><p>The word for “year” changes with the number:</p><ul><li>1 → <b>год</b>: Сыну один год.</li><li>2, 3, 4 → <b>года</b>: Мне три года.</li><li>5 to 20 → <b>лет</b>: Мне десять лет.</li></ul><p>Question: <b>Сколько вам лет?</b> (polite) · <b>Сколько тебе лет?</b> (to a friend or a child).</p>', [
        k.mc('Мне пять ___.', ['год', 'года', 'лет'], 2), k.mc('Мне три ___.', ['год', 'года', 'лет'], 1), k.mc('Сыну один ___.', ['год', 'года', 'лет'], 0),
        k.tf('“Сколько вам лет?” means “How old are you?”', true), k.ord('Мне десять лет')]],
      r: ['Two children talk', '— Привет! Сколько тебе лет?\n\n— Мне десять лет. А тебе?\n\n— Мне пять лет.\n\n— У тебя есть брат?\n\n— Да, один брат. Ему три года.\n\n(а тебе? = and you? · у тебя есть…? = do you have…? · ему = he is, “to him”)', [
        k.mc('How old is the brother?', ['one', 'three', 'ten'], 1), k.tf('One of the children is ten years old.', true), k.mc('How many brothers does the child have?', ['one', 'two', 'three'], 0)]] },

    { id: 'u4', t: 'В кафе. Food and drink', topic: 'Food',
      v: ['Food and drink', `
вода | noun (feminine) | water | Вода, пожалуйста. | | va-DA | Water, please.
чай | noun (masculine) | tea | Я хочу чай. | | chay | I want tea.
кофе | noun (masculine) | coffee | Кофе с молоком, пожалуйста. | | KO-fye | Coffee with milk, please.
хлеб | noun (masculine) | bread | Это хлеб. | | khlyep | This is bread.
молоко | noun (neuter) | milk | Молоко здесь. | | ma-la-KO | The milk is here.
суп | noun (masculine) | soup | Суп очень вкусный. | | soop | The soup is very tasty.
мясо | noun (neuter) | meat | Я не ем мясо. | | MYA-sa | I do not eat meat.
вкусно | adverb | tasty; it tastes good | Спасибо, очень вкусно! | | FKOOS-na | Thank you, it is very tasty!`],
      g: ['I want…, May I have…?', '<ul><li><b>Я хочу чай.</b> = I want tea.</li><li><b>Ты хочешь чай?</b> = Do you want tea? (friend)</li><li><b>Вы хотите чай?</b> = Would you like tea? (polite)</li><li><b>Я не хочу суп.</b> = I do not want soup. Put <b>не</b> before the verb.</li></ul><p>The polite way to order: <b>Можно чай, пожалуйста?</b> = May I have tea, please?</p><p>After <b>хочу</b> and <b>можно</b>, a feminine word in -а changes to -у: вода → <b>Можно воду, пожалуйста?</b></p>', [
        k.mc('Я ___ чай.', ['хочу', 'хочешь', 'хотите'], 0), k.mc('Вы ___ кофе?', ['хочу', 'хочешь', 'хотите'], 2),
        k.mc('How do you say “I do not want soup”?', ['Я не хочу суп.', 'Я хочу не суп.', 'Не я хочу суп.'], 0),
        k.tf('“Можно воду, пожалуйста?” is a polite way to ask for water.', true), k.ord('Я хочу чай с молоком')]],
      r: ['In a café', '— Здравствуйте! Что вы хотите?\n\n— Здравствуйте! Можно суп и хлеб, пожалуйста?\n\n— Да. Вы хотите чай или кофе?\n\n— Чай, пожалуйста.\n\n— Пожалуйста.\n\n— Спасибо, очень вкусно!\n\n(что = what · и = and · или = or)', [
        k.mc('What food does the customer order?', ['soup and bread', 'meat and bread', 'soup and milk'], 0), k.mc('What does the customer drink?', ['coffee', 'tea', 'water'], 1), k.tf('The customer likes the food.', true)]] },

    { id: 'u5', t: 'Где магазин? In the city', topic: 'Places',
      v: ['Places in the city', `
город | noun (masculine) | city, town | Костанай — мой город. | | GO-rat | Kostanay is my city.
улица | noun (feminine) | street | Это улица Аль-Фараби. | | OO-lee-tsa | This is Al-Farabi Street.
дом | noun (masculine) | house; home | Мой дом здесь. | | dom | My house is here.
магазин | noun (masculine) | shop | Где магазин? | | ma-ga-ZEEN | Where is the shop?
школа | noun (feminine) | school | Школа там. | | SHKO-la | The school is there.
где | question word | where | Где вы живёте? | | gdye | Where do you live?
здесь | adverb | here | Я здесь. | | zdyes | I am here.
там | adverb | there | Магазин там. | | tam | The shop is there.`],
      g: ['Where? в + place', '<p>To say where something is, use <b>в</b> (in, at) and change the end of the noun to <b>-е</b>.</p><table><tr><th>Place</th><th>In / at the place</th></tr><tr><td>магазин</td><td>в магазин<b>е</b></td></tr><tr><td>школа</td><td>в школ<b>е</b></td></tr><tr><td>город</td><td>в город<b>е</b></td></tr></table><p><b>Я в школе.</b> = I am at school. One special word: “at home” is <b>дома</b>: <b>Я дома.</b></p>', [
        k.mc('Я в ___.', ['школа', 'школе', 'школу'], 1), k.mc('Мама в ___.', ['магазин', 'магазине', 'магазина'], 1),
        k.mc('“At home” in Russian is…', ['дома', 'в дом', 'дом'], 0), k.tf('“Где магазин?” means “Where is the shop?”', true), k.ord('Мой брат в школе')]],
      r: ['Tom’s street', 'Меня зовут Том. Я живу в городе Костанай.\n\nМой дом на улице Аль-Фараби. Школа здесь, а магазин там.\n\nСейчас мой сын в школе, а моя дочь дома.\n\n(я живу = I live · на улице = on the street · сейчас = now · а = and, but)', [
        k.mc('Where does Tom live?', ['in Kostanay', 'in Astana', 'in Almaty'], 0), k.mc('Where is his son now?', ['at home', 'at school', 'in the shop'], 1), k.tf('His daughter is at home.', true)]] },

    { id: 'u6', t: 'Я говорю по-русски. Everyday verbs', topic: 'Verbs',
      v: ['Everyday verbs', `
работать | verb | to work | Я работаю в школе. | | ra-BO-tat | I work at a school.
жить | verb | to live | Я живу в Костанае. | | zhyt | I live in Kostanay.
говорить | verb | to speak | Я говорю по-русски. | | ga-va-REET | I speak Russian.
понимать | verb | to understand | Я не понимаю. | | pa-nee-MAT | I do not understand.
читать | verb | to read | Я читаю книгу. | | chee-TAT | I am reading a book.
знать | verb | to know | Я знаю Анну. | | znat | I know Anna.
любить | verb | to love; to like | Я люблю чай. | | lyoo-BEET | I love tea.
немного | adverb | a little | Я немного говорю по-русски. | | nee-MNO-ga | I speak a little Russian.`],
      g: ['The present: я работаю, ты работаешь', '<p>Take <b>-ть</b> off the verb and add an ending for the person.</p><table><tr><th>Person</th><th>работать</th><th>читать</th></tr><tr><td>я (I)</td><td>работа<b>ю</b></td><td>чита<b>ю</b></td></tr><tr><td>ты (you, friend)</td><td>работа<b>ешь</b></td><td>чита<b>ешь</b></td></tr><tr><td>он / она (he / she)</td><td>работа<b>ет</b></td><td>чита<b>ет</b></td></tr><tr><td>вы (you, polite)</td><td>работа<b>ете</b></td><td>чита<b>ете</b></td></tr></table><p><b>Понимать</b> and <b>знать</b> work the same way. Two common verbs are different: <b>я говорю, он говорит</b> · <b>я живу, он живёт</b>.</p><p>One present tense does the work of two in English: <b>Я читаю</b> = I read / I am reading.</p>', [
        k.mc('Я ___ в магазине.', ['работаю', 'работаешь', 'работает'], 0), k.mc('Она ___ книгу.', ['читаю', 'читаешь', 'читает'], 2), k.mc('Ты ___?', ['понимаю', 'понимаешь', 'понимает'], 1),
        k.tf('“Я не понимаю” means “I do not understand”.', true), k.ord('Я немного говорю по-русски')]],
      r: ['Tom and Anna', 'Меня зовут Том. Я живу в Костанае и работаю в школе. Я учитель.\n\nЯ говорю по-английски и немного говорю по-русски.\n\nМоя жена Анна работает в магазине. Она читает и говорит по-русски.\n\nЯ люблю Костанай!\n\n(жена = wife · по-английски = in English)', [
        k.mc('Where does Tom work?', ['in a shop', 'at a school', 'at home'], 1), k.tf('Tom speaks a lot of Russian.', false), k.mc('Who works in a shop?', ['Tom', 'Anna', 'their son'], 1)]] },

    { id: 'u7', t: 'У меня есть… I have', topic: 'Time and things',
      v: ['Time words and things', `
сегодня | adverb | today | Сегодня я дома. | | see-VOD-nya | Today I am at home.
завтра | adverb | tomorrow | Завтра я работаю. | | ZAF-tra | Tomorrow I am working.
вчера | adverb | yesterday | Вчера был понедельник. | | fchee-RA | Yesterday was Monday.
сейчас | adverb | now | Сейчас я читаю. | | see-CHAS | I am reading now.
время | noun (neuter) | time | У меня есть время. | | VRYE-mya | I have time.
машина | noun (feminine) | car | У меня есть машина. | | ma-SHY-na | I have a car.
телефон | noun (masculine) | phone | У меня нет телефона. | | tee-lee-FON | I do not have a phone.
урок | noun (masculine) | lesson | Сегодня у меня урок. | | oo-ROK | I have a lesson today.`],
      g: ['I have: у меня есть', '<p>Russian says “at me there is”: <b>У меня есть машина.</b> = I have a car.</p><ul><li><b>У тебя есть…?</b> = Do you have…? (friend)</li><li><b>У вас есть…?</b> = Do you have…? (polite)</li></ul><p>For “I do not have”, use <b>у меня нет</b> and change the end of the noun:</p><ul><li>телефон → У меня нет телефон<b>а</b>.</li><li>машина → У меня нет машин<b>ы</b>.</li><li>время → У меня нет времен<b>и</b>.</li></ul>', [
        k.mc('How do you say “I have a car”?', ['У меня есть машина.', 'Я есть машина.', 'Я машина.'], 0), k.mc('У ___ есть время? (polite “you”)', ['меня', 'тебя', 'вас'], 2),
        k.mc('У меня нет ___.', ['телефон', 'телефона', 'телефону'], 1), k.tf('“Сегодня у меня урок” means “I have a lesson today”.', true), k.ord('Сегодня у меня есть время')]],
      r: ['Are you free today?', '— Привет, Том! У тебя есть время сегодня?\n\n— Нет, сегодня у меня урок.\n\n— А завтра?\n\n— Завтра у меня есть время.\n\n— Хорошо! У тебя есть машина?\n\n— Нет, у меня нет машины.\n\n— У меня есть. До завтра!\n\n(хорошо = good · до завтра = see you tomorrow)', [
        k.mc('When is Tom free?', ['today', 'tomorrow', 'yesterday'], 1), k.tf('Tom has a car.', false), k.mc('What does Tom have today?', ['a lesson', 'a car', 'a new phone'], 0)]] },

    { id: 'u8', t: 'Сколько стоит? Shopping', topic: 'Shopping',
      v: ['Shopping and describing', `
сколько стоит | phrase | how much is it | Сколько стоит хлеб? | | SKOL-ka STO-eet | How much is the bread?
деньги | noun (plural) | money | У меня есть деньги. | | DYEN-gee | I have money.
дорого | adverb | expensive | Это очень дорого. | | DO-ra-ga | That is very expensive.
дёшево | adverb | cheap | Здесь дёшево. | | DYO-shee-va | It is cheap here.
большой | adjective | big | Это большой магазин. | | bal-SHOY | This is a big shop.
маленький | adjective | small | У меня маленький дом. | | MA-leen-kee | I have a small house.
хороший | adjective | good | Это хороший кофе. | | kha-RO-shy | This is good coffee.
новый | adjective | new | У меня новый телефон. | | NO-vy | I have a new phone.`],
      g: ['Adjectives follow the noun’s gender', '<p>An adjective comes before the noun and takes the noun’s gender, like <b>мой, моя, моё</b>.</p><table><tr><th>Masculine</th><th>Feminine</th><th>Neuter</th></tr><tr><td>нов<b>ый</b> дом</td><td>нов<b>ая</b> машина</td><td>нов<b>ое</b> молоко</td></tr><tr><td>хорош<b>ий</b> суп</td><td>хорош<b>ая</b> школа</td><td>хорош<b>ее</b> мясо</td></tr><tr><td>больш<b>ой</b> город</td><td>больш<b>ая</b> семья</td><td>больш<b>ое</b> спасибо</td></tr></table><p><b>Большое спасибо!</b> = Thank you very much!</p>', [
        k.mc('___ машина', ['новый', 'новая', 'новое'], 1), k.mc('___ дом', ['большой', 'большая', 'большое'], 0), k.mc('___ молоко', ['хороший', 'хорошая', 'хорошее'], 2),
        k.tf('“Сколько стоит чай?” asks about the price of tea.', true), k.ord('Это очень хороший магазин')]],
      r: ['In a phone shop', '— Здравствуйте! Сколько стоит этот телефон?\n\n— Двести тысяч тенге.\n\n— Это дорого! А маленький телефон?\n\n— Сто тысяч. Это новый и хороший телефон.\n\n— Хорошо. У меня есть деньги. Спасибо!\n\n(этот = this · двести тысяч = 200,000 · сто тысяч = 100,000)', [
        k.mc('What does the customer want to buy?', ['a phone', 'a car', 'a house'], 0), k.mc('How much is the small phone?', ['100,000 tenge', '200,000 tenge', '10,000 tenge'], 0), k.tf('The customer has no money.', false)]] }
  ]);
})();

/* ---- Batch 2 (22 Nov 2026): the alphabet unit and units 9 to 12. The full A1 plan is in the project doc claude/if-lingo.md. ---- */
(function () {
  var k = IFX.k;
  IFX.make('ru-a1', [
    { id: 'u0', t: 'Алфавит. The alphabet', topic: 'Alphabet',
      v: ['Words you already know', `
такси | noun | taxi | Это такси. | | tak-SEE | This is a taxi.
банк | noun | bank | Где банк? | | bank | Where is the bank?
парк | noun | park | Это парк. | | park | This is a park.
метро | noun | metro, underground | Где метро? | | mee-TRO | Where is the metro?
кафе | noun | café | Это кафе. | | ka-FE | This is a café.
студент | noun | student | Том студент. | | stoo-DYENT | Tom is a student.
доктор | noun | doctor | Анна доктор. | | DOK-tar | Anna is a doctor.
паспорт | noun | passport | Это паспорт. | | PAS-part | This is a passport.`],
      g: ['33 letters in three groups', '<p>Russian has <b>33 letters</b>. Learn them in three groups.</p><table><tr><th>Group</th><th>Letters and sounds</th></tr><tr><td><b>1. Friends</b><br>look and sound like English</td><td><b>А</b> a · <b>К</b> k · <b>М</b> m · <b>О</b> o · <b>Т</b> t</td></tr><tr><td><b>2. False friends</b><br>look like English, sound different</td><td><b>В</b> = v · <b>Е</b> = ye · <b>Н</b> = n · <b>Р</b> = r · <b>С</b> = s · <b>У</b> = oo · <b>Х</b> = kh</td></tr><tr><td><b>3. New shapes</b></td><td><b>Б</b> b · <b>Г</b> g · <b>Д</b> d · <b>Ж</b> zh · <b>З</b> z · <b>И</b> ee · <b>Й</b> y · <b>Л</b> l · <b>П</b> p · <b>Ф</b> f · <b>Ц</b> ts · <b>Ч</b> ch · <b>Ш</b> sh · <b>Щ</b> shch · <b>Ы</b> a hard “i” · <b>Э</b> e · <b>Ю</b> yoo · <b>Я</b> ya · <b>Ё</b> yo</td></tr></table><p><b>ь</b> and <b>ъ</b> have no sound of their own: <b>ь</b> makes the letter before it soft.</p><p>A letter <b>о</b> without stress sounds like “a”: <b>доктор</b> = DOK-tar.</p>', [
        k.mc('Which sound is the Russian letter В?', ['b', 'v', 'w'], 1),
        k.mc('Which sound is Р?', ['p', 'r', 'd'], 1),
        k.mc('Which sound is Н?', ['h', 'n', 'm'], 1),
        k.mc('Which sound is С?', ['s', 'k', 'ts'], 0),
        k.mc('ресторан = …', ['restaurant', 'rest', 'store'], 0),
        k.tf('The letter ь has no sound of its own.', true)]],
      r: ['Read the signs', 'ТАКСИ\n\nБАНК\n\nРЕСТОРАН\n\nАПТЕКА\n\nСУПЕРМАРКЕТ\n\nТУАЛЕТ\n\nАЭРОПОРТ\n\n(аптека = pharmacy)', [
        k.mc('Where do you buy medicine?', ['АПТЕКА', 'БАНК', 'ТАКСИ'], 0), k.mc('РЕСТОРАН is…', ['a restaurant', 'a station', 'a road'], 0), k.mc('Which sign takes you to a plane?', ['АЭРОПОРТ', 'ТУАЛЕТ', 'СУПЕРМАРКЕТ'], 0)]] },

    { id: 'u9', t: 'Который час? Days and time', topic: 'Time',
      v: ['Days of the week', `
понедельник | noun | Monday | В понедельник я работаю. | | pa-nee-DYEL-neek | On Monday I work.
вторник | noun | Tuesday | Во вторник у меня урок. | | FTOR-neek | On Tuesday I have a lesson.
среда | noun | Wednesday | Сегодня среда. | | sree-DA | Today is Wednesday.
четверг | noun | Thursday | В четверг я дома. | | cheet-VYERK | On Thursday I am at home.
пятница | noun | Friday | В пятницу мы в кафе. | | PYAT-nee-tsa | On Friday we are at the café.
суббота | noun | Saturday | В субботу я дома. | | soo-BO-ta | On Saturday I am at home.
воскресенье | noun | Sunday | В воскресенье я не работаю. | | vas-kree-SYE-nye | On Sunday I do not work.
час | noun | hour; o’clock | Сейчас один час. | | chas | It is one o’clock now.`],
      g: ['What time is it? On Monday', '<p><b>Который час?</b> = What time is it?</p><table><tr><th>Number</th><th>Word</th><th>Example</th></tr><tr><td>1</td><td><b>час</b></td><td>Сейчас час. = It is one o’clock.</td></tr><tr><td>2, 3, 4</td><td><b>часа</b></td><td>Сейчас три часа.</td></tr><tr><td>5 to 12</td><td><b>часов</b></td><td>Сейчас семь часов.</td></tr></table><p>More numbers: <b>шесть</b> 6 · <b>семь</b> 7 · <b>восемь</b> 8 · <b>девять</b> 9 · <b>одиннадцать</b> 11 · <b>двенадцать</b> 12.</p><p><b>On</b> a day = <b>в</b> + the day. Days that end in <b>-а</b> change it to <b>-у</b>: в понедельник, <b>во</b> вторник, в сред<b>у</b>, в четверг, в пятниц<b>у</b>, в суббот<b>у</b>, в воскресенье.</p><p><b>At</b> a time = <b>в</b> + the time: в шесть часов.</p>', [
        k.mc('Сейчас три …', ['час', 'часа', 'часов'], 1),
        k.mc('Сейчас семь …', ['час', 'часа', 'часов'], 2),
        k.mc('on Friday = …', ['в пятница', 'в пятницу', 'на пятницу'], 1),
        k.tf('“Во вторник” means “on Tuesday”.', true),
        k.ord('В субботу я дома')]],
      r: ['Tom’s week', 'В понедельник и во вторник я работаю.\n\nВ среду у меня урок русского языка. Урок в шесть часов.\n\nВ пятницу мы в кафе. В субботу и в воскресенье я дома.\n\n(урок русского языка = a Russian lesson · мы = we)', [
        k.mc('When is Tom’s Russian lesson?', ['on Wednesday', 'on Friday', 'on Sunday'], 0), k.tf('Tom works on Sunday.', false), k.mc('What time is the lesson?', ['six o’clock', 'three o’clock', 'seven o’clock'], 0)]] },

    { id: 'u10', t: 'Какая сегодня погода? Weather', topic: 'Weather',
      v: ['Weather and seasons', `
погода | noun | weather | Сегодня хорошая погода. | | pa-GO-da | The weather is good today.
холодно | adverb | (it is) cold | Зимой холодно. | | KHO-lad-na | It is cold in winter.
тепло | adverb | (it is) warm | Весной тепло. | | teep-LO | It is warm in spring.
жарко | adverb | (it is) hot | Летом жарко. | | ZHAR-ka | It is hot in summer.
дождь | noun | rain | Сегодня дождь. | | dozht | It is raining today.
снег | noun | snow | Зимой снег. | | snyek | There is snow in winter.
зима | noun | winter | Зима в Костанае холодная. | | zee-MA | Winter in Kostanay is cold.
лето | noun | summer | Я люблю лето. | | LYE-ta | I love summer.`],
      g: ['It is cold: one word', '<p>English needs three words: <i>It is cold.</i> Russian needs one: <b>Холодно.</b></p><ul><li><b>Сегодня жарко.</b> = It is hot today.</li><li><b>Здесь тепло.</b> = It is warm here.</li><li><b>Мне холодно.</b> = I am cold.</li></ul><p><b>In</b> a season: the word changes its ending, with no word for “in”.</p><table><tr><th>Season</th><th>In …</th></tr><tr><td>зима (winter)</td><td><b>зимой</b></td></tr><tr><td>весна (spring)</td><td><b>весной</b></td></tr><tr><td>лето (summer)</td><td><b>летом</b></td></tr><tr><td>осень (autumn)</td><td><b>осенью</b></td></tr></table>', [
        k.mc('How do you say “It is hot today”?', ['Сегодня жарко.', 'Сегодня есть жарко.', 'Сегодня жаркий.'], 0),
        k.mc('in winter = …', ['зима', 'зимой', 'в зима'], 1),
        k.mc('in summer = …', ['летом', 'лето', 'в лето'], 0),
        k.tf('“Мне холодно” means “I am cold”.', true),
        k.ord('Сегодня очень холодно')]],
      r: ['The weather in Kostanay', 'Я живу в Костанае. Зимой здесь очень холодно и снег. Весной тепло. Летом жарко. Осенью дождь.\n\nСегодня хорошая погода: тепло. Я люблю лето!\n\n(я живу = I live · очень = very · осенью = in autumn)', [
        k.mc('What is winter like in Kostanay?', ['very cold', 'warm', 'hot'], 0), k.tf('It rains in autumn.', true), k.mc('Which season does the writer love?', ['summer', 'winter', 'autumn'], 0)]] },

    { id: 'u11', t: 'Мой день. My day', topic: 'Daily routine',
      v: ['From morning to night', `
утро | noun | morning | Утром я пью кофе. | | OOT-ra | In the morning I drink coffee.
день | noun | day; afternoon | Днём я работаю. | | dyen | In the afternoon I work.
вечер | noun | evening | Вечером я дома. | | VYE-cheer | In the evening I am at home.
завтракать | verb | to have breakfast | Я завтракаю в семь часов. | | ZAF-tra-kat | I have breakfast at seven o’clock.
обедать | verb | to have lunch | Мы обедаем в кафе. | | a-BYE-dat | We have lunch at a café.
ужинать | verb | to have dinner | Вечером я ужинаю дома. | | OO-zhee-nat | In the evening I have dinner at home.
спать | verb | to sleep | Ночью я сплю. | | spat | At night I sleep.
потом | adverb | then, after that | Я обедаю, потом работаю. | | pa-TOM | I have lunch, then I work.`],
      g: ['We, you, they: -ем, -ете, -ют', '<p>You know <b>я работаю, ты работаешь</b>. Here is the whole verb.</p><table><tr><th>Who</th><th>завтракать</th></tr><tr><td>я (I)</td><td>завтрака<b>ю</b></td></tr><tr><td>ты (you, a friend)</td><td>завтрака<b>ешь</b></td></tr><tr><td>он, она (he, she)</td><td>завтрака<b>ет</b></td></tr><tr><td>мы (we)</td><td>завтрака<b>ем</b></td></tr><tr><td>вы (you, polite or many)</td><td>завтрака<b>ете</b></td></tr><tr><td>они (they)</td><td>завтрака<b>ют</b></td></tr></table><p>Parts of the day, with no word for “in”: <b>утром</b> in the morning · <b>днём</b> in the afternoon · <b>вечером</b> in the evening · <b>ночью</b> at night.</p>', [
        k.mc('Мы обеда___ в кафе.', ['ю', 'ем', 'ют'], 1),
        k.mc('Они ужина___ дома.', ['ет', 'ем', 'ют'], 2),
        k.mc('Вы завтрака___ дома?', ['ете', 'ешь', 'ю'], 0),
        k.mc('in the evening = …', ['вечер', 'вечером', 'в вечер'], 1),
        k.ord('Утром я завтракаю дома')]],
      r: ['Anna’s day', 'Утром Анна завтракает дома: чай и хлеб. В девять часов она на работе.\n\nДнём Анна и Том обедают в кафе. Потом они работают.\n\nВечером Анна ужинает дома. Ночью она спит.\n\n(на работе = at work · она = she)', [
        k.mc('Where does Anna have breakfast?', ['at home', 'at a café', 'at work'], 0), k.tf('Anna and Tom have lunch at a café.', true), k.mc('What does Anna do at night?', ['She sleeps.', 'She works.', 'She has dinner.'], 0)]] },

    { id: 'u12', t: 'Моя квартира. My home', topic: 'Home',
      v: ['Rooms and furniture', `
квартира | noun | flat, apartment | У меня большая квартира. | | kvar-TEE-ra | I have a big flat.
комната | noun | room | Это моя комната. | | KOM-na-ta | This is my room.
кухня | noun | kitchen | Мама на кухне. | | KOOKH-nya | Mum is in the kitchen.
ванная | noun | bathroom | Ванная здесь. | | VAN-na-ya | The bathroom is here.
стол | noun | table | Книга на столе. | | stol | The book is on the table.
стул | noun | chair | Это новый стул. | | stool | This is a new chair.
окно | noun | window | В комнате большое окно. | | ak-NO | There is a big window in the room.
кровать | noun | bed | Кровать в комнате. | | kra-VAT | The bed is in the room.`],
      g: ['In and on: в, на + -е', '<p>To say where a thing is, use <b>в</b> (in) or <b>на</b> (on) and change the end of the noun to <b>-е</b>.</p><table><tr><th>Noun</th><th>Where?</th><th>Meaning</th></tr><tr><td>комната</td><td><b>в</b> комнат<b>е</b></td><td>in the room</td></tr><tr><td>квартира</td><td><b>в</b> квартир<b>е</b></td><td>in the flat</td></tr><tr><td>стол</td><td><b>на</b> стол<b>е</b></td><td>on the table</td></tr><tr><td>кухня</td><td><b>на</b> кухн<b>е</b></td><td>in the kitchen</td></tr></table><p>Russian says <b>на кухне</b> (“on the kitchen”) and <b>на работе</b> (“on work”). Learn these two as they are.</p><p><b>Где книга?</b> — <b>На столе.</b> = Where is the book? On the table.</p>', [
        k.mc('Книга ___ столе.', ['в', 'на', 'у'], 1),
        k.mc('Мы ___ комнате.', ['в', 'на', 'у'], 0),
        k.mc('комната → in the room = в …', ['комната', 'комнату', 'комнате'], 2),
        k.tf('Russian says “на кухне” for “in the kitchen”.', true),
        k.ord('Книга на столе')]],
      r: ['Tom’s flat', 'У меня есть квартира. Она маленькая, но хорошая.\n\nВ квартире одна комната и кухня. В комнате кровать, стол и стул. На столе книга и телефон.\n\nВ комнате большое окно.\n\n(она = it · но = but · одна = one · книга = book)', [
        k.mc('How many rooms are there in the flat?', ['one', 'two', 'three'], 0), k.tf('There is a book on the table.', true), k.mc('What is big?', ['the window', 'the flat', 'the table'], 0)]] }
  ]);
  IFX.order('ru-a1', ['u0', 'u1', 'u2', 'u3', 'u4', 'u5', 'u6', 'u7', 'u8', 'u9', 'u10', 'u11', 'u12']);
})();

/* ---- Batch 3 (22 Nov 2026): units 13 to 19. Russian A1 now has all 20 units of the plan. ---- */
(function () {
  var k = IFX.k;
  IFX.make('ru-a1', [
    { id: 'u13', t: 'Как доехать? Transport', topic: 'Transport',
      v: ['Getting around', `
автобус | noun | bus | Я еду на автобусе. | | af-TO-boos | I am going by bus.
поезд | noun | train | Поезд в шесть часов. | | PO-yeest | The train is at six o’clock.
самолёт | noun | plane | Самолёт большой. | | sa-ma-LYOT | The plane is big.
вокзал | noun | railway station | Где вокзал? | | vak-ZAL | Where is the railway station?
остановка | noun | bus stop | Остановка здесь. | | as-ta-NOF-ka | The bus stop is here.
билет | noun | ticket | Один билет, пожалуйста. | | bee-LYET | One ticket, please.
идти | verb | to go on foot | Я иду в магазин. | | eet-TEE | I am going to the shop.
ехать | verb | to go by transport | Мы едем в Астану. | | YE-khat | We are going to Astana.`],
      g: ['Going: идти, ехать, в + place', '<p>Russian has two verbs for “go”: <b>идти</b> on foot, <b>ехать</b> by car, bus or train.</p><table><tr><th>Who</th><th>идти</th><th>ехать</th></tr><tr><td>я</td><td>ид<b>у</b></td><td>ед<b>у</b></td></tr><tr><td>ты</td><td>ид<b>ёшь</b></td><td>ед<b>ешь</b></td></tr><tr><td>он, она</td><td>ид<b>ёт</b></td><td>ед<b>ет</b></td></tr><tr><td>мы</td><td>ид<b>ём</b></td><td>ед<b>ем</b></td></tr><tr><td>вы</td><td>ид<b>ёте</b></td><td>ед<b>ете</b></td></tr><tr><td>они</td><td>ид<b>ут</b></td><td>ед<b>ут</b></td></tr></table><p><b>To</b> a place = <b>в</b> + the place. Words that end in <b>-а</b> change it to <b>-у</b>: школа → в школ<b>у</b>, Астана → в Астан<b>у</b>. Other words do not change: в магазин, в парк.</p><p><b>By</b> transport = <b>на</b> + <b>-е</b>: на автобус<b>е</b>, на поезд<b>е</b>, на машин<b>е</b>, на такси.</p>', [
        k.mc('Я ___ в школу. (on foot)', ['иду', 'еду', 'идёт'], 0),
        k.mc('Мы ___ в Астану на поезде.', ['идём', 'едем', 'едут'], 1),
        k.mc('школа → to school = в …', ['школа', 'школе', 'школу'], 2),
        k.mc('by bus = …', ['на автобусе', 'в автобус', 'у автобуса'], 0),
        k.ord('Я еду на автобусе')]],
      r: ['A trip to Astana', 'В субботу мы едем в Астану. Мы едем на поезде. Поезд в семь часов.\n\nУтром мы едем на вокзал на такси. У меня есть билет.\n\nВ Астане мы идём в парк и в кафе.\n\n(на вокзал = to the station)', [
        k.mc('How are they travelling to Astana?', ['by train', 'by bus', 'by plane'], 0), k.tf('They go to the station by bus.', false), k.mc('What time is the train?', ['seven o’clock', 'six o’clock', 'nine o’clock'], 0)]] },

    { id: 'u14', t: 'Что у вас болит? Health', topic: 'Health',
      v: ['The body and the doctor', `
голова | noun | head | У меня болит голова. | | ga-la-VA | I have a headache.
рука | noun | hand; arm | Это моя рука. | | roo-KA | This is my hand.
нога | noun | leg; foot | У меня болит нога. | | na-GA | My leg hurts.
живот | noun | stomach | У него болит живот. | | zhee-VOT | He has a stomach ache.
зуб | noun | tooth | У меня болит зуб. | | zoop | I have a toothache.
врач | noun | doctor | Врач в больнице. | | vrach | The doctor is at the hospital.
больница | noun | hospital | Где больница? | | bal-NEE-tsa | Where is the hospital?
аптека | noun | pharmacy | Аптека там. | | ap-TYE-ka | The pharmacy is there.`],
      g: ['It hurts: у меня болит…', '<p><b>У меня болит голова.</b> = My head hurts. (Word for word: “At me hurts head.”)</p><table><tr><th>Whose</th><th>Russian</th></tr><tr><td>my</td><td><b>у меня</b> болит…</td></tr><tr><td>your (a friend)</td><td><b>у тебя</b> болит…</td></tr><tr><td>your (polite)</td><td><b>у вас</b> болит…</td></tr><tr><td>his</td><td><b>у него</b> болит…</td></tr><tr><td>her</td><td><b>у неё</b> болит…</td></tr></table><p>One thing hurts: <b>болит</b>. Two or more: <b>болят</b>. — У меня бол<b>ят</b> ноги. (ноги = legs)</p><p>The doctor asks: <b>Что у вас болит?</b> = What hurts?</p>', [
        k.mc('У меня ___ голова.', ['болит', 'болят', 'болю'], 0),
        k.mc('У меня ___ ноги. (ноги = legs)', ['болит', 'болят', 'боли'], 1),
        k.mc('“She has a toothache.” = …', ['У неё болит зуб.', 'У него болит зуб.', 'Она болит зуб.'], 0),
        k.tf('“Что у вас болит?” means “What hurts?”', true),
        k.ord('У меня болит голова')]],
      r: ['At the doctor’s', '— Здравствуйте! Что у вас болит?\n\n— Здравствуйте, доктор. У меня болит голова и живот.\n\n— Вы работаете сегодня?\n\n— Нет, сегодня я дома.\n\n— Хорошо. Аптека здесь, в больнице. Чай, вода и спать!\n\n— Спасибо, доктор.', [
        k.mc('What hurts?', ['the head and the stomach', 'a tooth', 'a leg'], 0), k.tf('The patient is working today.', false), k.mc('Where is the pharmacy?', ['in the hospital', 'in the park', 'at the station'], 0)]] },

    { id: 'u15', t: 'Одежда и цвета. Clothes and colours', topic: 'Clothes',
      v: ['Clothes and three colours', `
одежда | noun | clothes | Это новая одежда. | | a-DYEZH-da | These are new clothes.
куртка | noun | jacket | У меня тёплая куртка. | | KOORT-ka | I have a warm jacket.
рубашка | noun | shirt | Это белая рубашка. | | roo-BASH-ka | This is a white shirt.
брюки | noun | trousers | Это мои брюки. | | BRYOO-kee | These are my trousers.
обувь | noun | shoes, footwear | Где моя обувь? | | O-boof | Where are my shoes?
белый | adjective | white | Снег белый. | | BYE-ly | Snow is white.
чёрный | adjective | black | Это чёрный кофе. | | CHOR-ny | This is black coffee.
красный | adjective | red | Это красная машина. | | KRAS-ny | This is a red car.`],
      g: ['More than one: -ы, -и', '<p>To make the plural, change the end of the noun.</p><table><tr><th>Noun</th><th>Plural</th><th>Rule</th></tr><tr><td>стол, телефон</td><td>стол<b>ы</b>, телефон<b>ы</b></td><td>add <b>-ы</b></td></tr><tr><td>машина, комната</td><td>машин<b>ы</b>, комнат<b>ы</b></td><td>-а → <b>-ы</b></td></tr><tr><td>книга, куртка, рубашка</td><td>книг<b>и</b>, куртк<b>и</b>, рубашк<b>и</b></td><td>after <b>г, к, х, ж, ш, ч, щ</b> write <b>-и</b></td></tr><tr><td>окно</td><td>окн<b>а</b></td><td>-о → <b>-а</b></td></tr></table><p>The adjective ends in <b>-ые</b>: нов<b>ые</b> куртки, красн<b>ые</b> машины.</p>', [
        k.mc('стол → …', ['столы', 'стола', 'столи'], 0),
        k.mc('куртка → …', ['куртки', 'курткы', 'куртка'], 0),
        k.mc('окно → …', ['окны', 'окна', 'окни'], 1),
        k.mc('new jackets = …', ['новые куртки', 'новая куртки', 'новый куртки'], 0),
        k.ord('Это мои новые брюки')]],
      r: ['In a clothes shop', '— Здравствуйте! У вас есть куртки?\n\n— Да. Вот чёрные куртки, а вот красные.\n\n— Сколько стоит чёрная куртка?\n\n— Двадцать тысяч тенге.\n\n— Хорошо. И белая рубашка, пожалуйста.\n\n(вот = here is, here are · а = and, but · двадцать тысяч = twenty thousand)', [
        k.mc('Which jacket does the customer ask the price of?', ['the black one', 'the red one', 'the white one'], 0), k.tf('The shop has red jackets.', true), k.mc('What else does the customer want?', ['a white shirt', 'black trousers', 'red shoes'], 0)]] },

    { id: 'u16', t: 'Что вы любите? Free time', topic: 'Free time',
      v: ['Things to do', `
музыка | noun | music | Я люблю музыку. | | MOO-zy-ka | I love music.
фильм | noun | film | Это хороший фильм. | | feelm | This is a good film.
книга | noun | book | Я читаю книгу. | | KNEE-ga | I am reading a book.
спорт | noun | sport | Я люблю спорт. | | sport | I love sport.
футбол | noun | football | Мы играем в футбол. | | foot-BOL | We play football.
играть | verb | to play | Дети играют в парке. | | ee-GRAT | The children play in the park.
смотреть | verb | to watch | Вечером я смотрю фильм. | | sma-TRYET | In the evening I watch a film.
слушать | verb | to listen to | Я слушаю музыку. | | SLOO-shat | I listen to music.`],
      g: ['I like doing it; the object ending -у', '<p><b>любить</b> + a verb = to like doing: <b>Я люблю читать.</b> = I like reading.</p><p>я любл<b>ю</b> · ты люб<b>ишь</b> · он, она люб<b>ит</b> · мы люб<b>им</b> · вы люб<b>ите</b> · они люб<b>ят</b></p><p>When a word in <b>-а</b> is the thing you read, love or hear, <b>-а</b> becomes <b>-у</b>:</p><ul><li>музыка → Я слушаю музык<b>у</b>.</li><li>книга → Я читаю книг<b>у</b>.</li></ul><p>Words like <b>фильм, спорт, футбол</b> do not change: Я смотрю фильм.</p>', [
        k.mc('Я слушаю ___.', ['музыка', 'музыку', 'музыке'], 1),
        k.mc('Я читаю ___.', ['книгу', 'книга', 'книги'], 0),
        k.mc('Я смотрю ___.', ['фильм', 'фильму', 'фильма'], 0),
        k.mc('“I like to read.” = …', ['Я люблю читать.', 'Я люблю читаю.', 'Я любить читать.'], 0),
        k.ord('Мы играем в футбол')]],
      r: ['Tom’s Saturday', 'Меня зовут Том. В субботу я не работаю.\n\nУтром я читаю книгу. Днём мы играем в футбол в парке. Я очень люблю футбол!\n\nВечером я слушаю музыку или смотрю фильм.\n\nА что вы любите?\n\n(или = or · очень = very much)', [
        k.mc('What does Tom do in the morning?', ['He reads a book.', 'He plays football.', 'He works.'], 0), k.tf('Tom plays football in the park.', true), k.mc('What does Tom do in the evening?', ['He listens to music or watches a film.', 'He reads a book.', 'He goes to the shop.'], 0)]] },

    { id: 'u17', t: 'Что вы делали вчера? Yesterday', topic: 'The past',
      v: ['Yesterday', `
делать | verb | to do; to make | Что вы делаете? | | DYE-lat | What are you doing?
быть | verb | to be | Вчера я был дома. | | byt | Yesterday I was at home.
гулять | verb | to go for a walk | Мы гуляли в парке. | | goo-LYAT | We walked in the park.
купить | verb | to buy | Я купил хлеб. | | koo-PEET | I bought bread.
видеть | verb | to see | Я видел Анну в парке. | | VEE-deet | I saw Anna in the park.
неделя | noun | week | Неделя — это семь дней. | | nee-DYE-lya | A week is seven days.
год | noun | year | Это хороший год. | | got | This is a good year.
давно | adverb | a long time ago | Я был там давно. | | dav-NO | I was there a long time ago.`],
      g: ['The past: -л, -ла, -ли', '<p>Take <b>-ть</b> off the verb and add:</p><table><tr><th>Who did it</th><th>Ending</th><th>работать</th><th>быть</th></tr><tr><td>a man (я, ты, он)</td><td><b>-л</b></td><td>работа<b>л</b></td><td>бы<b>л</b></td></tr><tr><td>a woman (я, ты, она)</td><td><b>-ла</b></td><td>работа<b>ла</b></td><td>бы<b>ла</b></td></tr><tr><td>more than one (мы, вы, они)</td><td><b>-ли</b></td><td>работа<b>ли</b></td><td>бы<b>ли</b></td></tr></table><p>The ending shows who did it, a man or a woman. Tom says: <b>Я работал.</b> Anna says: <b>Я работала.</b></p><p><b>Было тепло.</b> = It was warm.</p>', [
        k.mc('Вчера Анна ___ дома.', ['был', 'была', 'были'], 1),
        k.mc('Вчера Том ___ в парке.', ['гулял', 'гуляла', 'гуляли'], 0),
        k.mc('Вчера мы ___ фильм.', ['смотрел', 'смотрела', 'смотрели'], 2),
        k.tf('A woman says “Я работала”.', true),
        k.ord('Вчера я был дома')]],
      r: ['Anna’s Sunday', 'Вчера было воскресенье. Анна не работала.\n\nУтром она была дома и читала книгу. Днём Анна и Том гуляли в парке. Было тепло.\n\nПотом они были в магазине. Анна купила хлеб и молоко.\n\nВечером они смотрели фильм.', [
        k.mc('What did Anna do in the morning?', ['She read a book at home.', 'She worked.', 'She went to the park.'], 0), k.tf('It was cold.', false), k.mc('What did Anna buy?', ['bread and milk', 'a book', 'a ticket'], 0)]] },

    { id: 'u18', t: 'Что вы будете делать? Plans', topic: 'The future',
      v: ['Holidays and plans', `
отпуск | noun | holiday from work | В июле у меня отпуск. | | OT-poosk | I have a holiday in July.
каникулы | noun | school holidays | Летом у меня каникулы. | | ka-NEE-koo-ly | I have holidays in summer.
море | noun | sea | Летом мы будем на море. | | MO-rye | In summer we will be at the sea.
гора | noun | mountain | Это большая гора. | | ga-RA | This is a big mountain.
отдыхать | verb | to rest, to relax | В субботу я отдыхаю. | | ad-dy-KHAT | On Saturday I rest.
учить | verb | to learn | Я учу русский язык. | | oo-CHEET | I am learning Russian.
скоро | adverb | soon | Скоро лето. | | SKO-ra | Summer is soon.
может быть | phrase | maybe | Может быть, завтра. | | MO-zhet byt | Maybe tomorrow.`],
      g: ['The future: буду + verb', '<p>For the future, use <b>быть</b> in the future and the verb with <b>-ть</b>.</p><table><tr><th>Who</th><th>Future of “be”</th><th>Example</th></tr><tr><td>я</td><td><b>буду</b></td><td>Завтра я буду работать.</td></tr><tr><td>ты</td><td><b>будешь</b></td><td>Ты будешь читать?</td></tr><tr><td>он, она</td><td><b>будет</b></td><td>Анна будет отдыхать.</td></tr><tr><td>мы</td><td><b>будем</b></td><td>Мы будем гулять.</td></tr><tr><td>вы</td><td><b>будете</b></td><td>Что вы будете делать?</td></tr><tr><td>они</td><td><b>будут</b></td><td>Они будут играть.</td></tr></table><p>With no second verb it means <b>will be</b>: Завтра я буду дома.</p>', [
        k.mc('Завтра я ___ работать.', ['буду', 'будет', 'будем'], 0),
        k.mc('Летом мы ___ отдыхать.', ['буду', 'будем', 'будут'], 1),
        k.mc('Завтра они ___ дома.', ['будет', 'будем', 'будут'], 2),
        k.mc('“I will read.” = …', ['Я буду читать.', 'Я буду читаю.', 'Я будет читать.'], 0),
        k.ord('Завтра я буду дома')]],
      r: ['Summer plans', 'Скоро лето! В июле у меня отпуск.\n\nЯ не буду работать. Мы будем на море. Утром я буду гулять, а днём отдыхать.\n\nВечером я буду учить русский язык. Может быть, я буду читать книгу на русском!\n\n(в июле = in July · на русском = in Russian)', [
        k.mc('When is the holiday?', ['in July', 'in winter', 'on Saturday'], 0), k.tf('The writer will work on holiday.', false), k.mc('What will the writer do in the evening?', ['learn Russian', 'go for a walk', 'watch a film'], 0)]] },

    { id: 'u19', t: 'В путешествии. Travel and review', topic: 'Travel',
      v: ['On a trip', `
путешествие | noun | journey, trip | Это хорошее путешествие. | | poo-tee-SHEST-vee-ye | This is a good trip.
гостиница | noun | hotel | Гостиница в центре города. | | gas-TEE-nee-tsa | The hotel is in the city centre.
номер | noun | hotel room; number | У вас есть номер? | | NO-meer | Do you have a room?
ключ | noun | key | Вот ваш ключ. | | klyooch | Here is your key.
страна | noun | country | Казахстан — большая страна. | | stra-NA | Kazakhstan is a big country.
аэропорт | noun | airport | Мы едем в аэропорт. | | a-e-ra-PORT | We are going to the airport.
турист | noun | tourist | Я турист. | | too-REEST | I am a tourist.
помогите | phrase | help me, please | Помогите, пожалуйста! | | pa-ma-GEE-tye | Help me, please!`],
      g: ['Review: seven things you can say now', '<table><tr><th>You can…</th><th>Russian</th></tr><tr><td>say who you are</td><td>Меня зовут Том. Я турист.</td></tr><tr><td>say what you have</td><td><b>У меня есть</b> билет.</td></tr><tr><td>say where a thing is</td><td>Гостиница <b>в</b> центр<b>е</b>.</td></tr><tr><td>say where you are going</td><td>Я еду <b>в</b> Астан<b>у</b>.</td></tr><tr><td>say what you like</td><td><b>Я люблю</b> читать.</td></tr><tr><td>talk about yesterday</td><td>Вчера я бы<b>л</b> дома.</td></tr><tr><td>talk about tomorrow</td><td>Завтра я <b>буду</b> работать.</td></tr></table><p>This is the end of Russian A1. Well done!</p>', [
        k.mc('У меня ___ билет.', ['есть', 'буду', 'был'], 0),
        k.mc('Гостиница ___ центре.', ['в', 'на', 'у'], 0),
        k.mc('Вчера Анна ___ в аэропорту.', ['был', 'была', 'будет'], 1),
        k.mc('Завтра мы ___ в гостинице.', ['были', 'будем', 'есть'], 1),
        k.mc('Я еду в ___.', ['Астана', 'Астану', 'Астане'], 1),
        k.ord('У вас есть номер')]],
      r: ['At the hotel', '— Здравствуйте! У вас есть номер?\n\n— Здравствуйте! Да, есть. Вы турист?\n\n— Да, я из Англии. Вчера я был в Астане, а сегодня я в Костанае.\n\n— Хорошо. Номер стоит двадцать тысяч тенге. Вот ваш ключ.\n\n— Спасибо! А где кафе?\n\n— Кафе здесь, в гостинице.\n\n(из Англии = from England)', [
        k.mc('Where is the tourist from?', ['England', 'Astana', 'Kostanay'], 0), k.tf('He was in Astana yesterday.', true), k.mc('Where is the café?', ['in the hotel', 'in the park', 'at the airport'], 0)]] }
  ]);
  IFX.order('ru-a1', ['u0', 'u1', 'u2', 'u3', 'u4', 'u5', 'u6', 'u7', 'u8', 'u9', 'u10', 'u11', 'u12', 'u13', 'u14', 'u15', 'u16', 'u17', 'u18', 'u19']);
})();
