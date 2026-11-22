/* IF Lingo · Russian A1: an original IF Academy course for people who speak English.
   Word lines: word | part of speech | meaning in English | example | (empty) | how to say it | the example in English.
   Capital letters in "how to say it" show the stressed syllable. */
IFX.course({
  id: 'ru-a1', track: 'lang', lang: 'ru-RU', level: 'A1', next: 'A2', icon: '🇷🇺',
  title: 'Russian A1', sub: 'Your first steps in Russian',
  blurb: 'Say hello, talk about your family, order food, find your way and go shopping: the alphabet, 104 words and 13 grammar points so far, explained in English.',
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
