/* IF Lingo · Russian A1: an original IF Academy course for people who speak English.
   Word lines: word | part of speech | meaning in English | example | (empty) | how to say it | the example in English.
   Capital letters in "how to say it" show the stressed syllable. */
IFX.course({
  id: 'ru-a1', track: 'lang', lang: 'ru-RU', level: 'A1', next: 'A2', icon: '🇷🇺',
  title: 'Russian A1', sub: 'Your first steps in Russian',
  blurb: 'Say hello, talk about your family, order food, find your way and go shopping: the first 64 words and 8 grammar points, explained in English.',
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
