/* IF Lingo · Russian A2: an original IF Academy course for people who speak English and have finished Russian A1.
   Word lines: word | part of speech | meaning in English | example | (empty) | how to say it | the example in English.
   Plan: 20 units and a level test (project doc claude/if-lingo.md). Built so far: units 1 to 13. */
IFX.course({
  id: 'ru-a2', track: 'lang', lang: 'ru-RU', level: 'A2', next: 'B1', icon: '🇷🇺',
  title: 'Russian A2', sub: 'Everyday Russian',
  blurb: 'Say where you are from, describe your city and people, order in a restaurant, ask the way, see a doctor and make plans with friends. The first 13 of 20 units, explained in English.',
  units: []
});
(function () {
  var k = IFX.k;
  IFX.make('ru-a2', [
    { id: 'u1', t: 'Откуда вы? Where are you from?', topic: 'People',
      v: ['Countries and jobs', `
Англия | noun | England | Я из Англии. | | AN-glee-ya | I am from England.
Казахстан | noun | Kazakhstan | Она из Казахстана. | | ka-zakh-STAN | She is from Kazakhstan.
Россия | noun | Russia | Он из России. | | ra-SEE-ya | He is from Russia.
иностранец | noun | foreigner | Я иностранец. | | ee-na-STRA-neets | I am a foreigner.
родной язык | noun | native language | Мой родной язык — английский. | | rad-NOY ya-ZYK | My native language is English.
английский | adjective | English | Это английская книга. | | an-GLEE-skee | This is an English book.
профессия | noun | profession | Какая у вас профессия? | | pra-FYE-see-ya | What is your profession?
инженер | noun | engineer | Мой брат инженер. | | een-zhee-NYER | My brother is an engineer.`],
      g: ['From: из + a new ending', '<p><b>Откуда вы?</b> = Where are you from? Answer with <b>из</b> and change the end of the place.</p><table><tr><th>The place ends in…</th><th>Change</th><th>Examples</th></tr><tr><td>a consonant</td><td>add <b>-а</b></td><td>Лондон → из Лондон<b>а</b>, Казахстан → из Казахстан<b>а</b></td></tr><tr><td>-а</td><td>-а → <b>-ы</b></td><td>Астана → из Астан<b>ы</b>, Москва → из Москв<b>ы</b></td></tr><tr><td>-ия</td><td>-ия → <b>-ии</b></td><td>Англия → из Англ<b>ии</b>, Россия → из Росс<b>ии</b></td></tr></table><p>This ending has many jobs in Russian. You will meet it again in the next units.</p>', [
        k.mc('Я из Лондон___.', ['а', 'ы', 'е'], 0),
        k.mc('Она из Астан___.', ['ы', 'а', 'у'], 0),
        k.mc('Он из Росси___.', ['и', 'я', 'ю'], 0),
        k.tf('“Откуда вы?” means “Where are you from?”', true),
        k.ord('Я из Англии')]],
      r: ['A new student', 'Здравствуйте! Меня зовут Джон. Я из Англии, из Лондона. Я инженер.\n\nМой родной язык — английский. Я немного говорю по-русски.\n\nСейчас я живу в Костанае. Моя жена из Казахстана, из Астаны. Она врач.\n\nА вы откуда?', [
        k.mc('Where is John from?', ['London', 'Astana', 'Moscow'], 0), k.tf('John’s wife is from Astana.', true), k.mc('What is John’s profession?', ['engineer', 'doctor', 'teacher'], 0)]] },

    { id: 'u2', t: 'Мой город. My city', topic: 'City',
      v: ['Places and what they are like', `
район | noun | district | Я живу в новом районе. | | ra-YON | I live in a new district.
памятник | noun | monument | В центре есть памятник. | | PA-meet-neek | There is a monument in the centre.
мечеть | noun | mosque | В городе есть мечеть. | | mee-CHET | There is a mosque in the city.
завод | noun | factory | Мой папа работает на заводе. | | za-VOT | My dad works at a factory.
торговый центр | noun | shopping centre | Торговый центр рядом. | | tar-GO-vy tsentr | The shopping centre is nearby.
тихий | adjective | quiet | Это тихий район. | | TEE-khee | This is a quiet district.
шумный | adjective | noisy | Центр шумный. | | SHOOM-ny | The centre is noisy.
житель | noun | resident | В городе двести тысяч жителей. | | ZHEE-teel | The city has two hundred thousand residents.`],
      g: ['There is no…: нет + the new ending', '<p><b>есть</b> = there is. <b>нет</b> = there is no. After <b>нет</b> the noun takes the ending from Unit 1.</p><table><tr><th>There is…</th><th>There is no…</th></tr><tr><td>В городе есть театр.</td><td>В городе <b>нет</b> театр<b>а</b>.</td></tr><tr><td>Здесь есть парк.</td><td>Здесь <b>нет</b> парк<b>а</b>.</td></tr><tr><td>У меня есть машина.</td><td>У меня <b>нет</b> машин<b>ы</b>.</td></tr><tr><td>У меня есть сестра.</td><td>У меня <b>нет</b> сестр<b>ы</b>.</td></tr></table><p>Some words never change: метро, кафе, такси. — В городе нет метро.</p>', [
        k.mc('В городе нет театр___.', ['а', 'ы', 'у'], 0),
        k.mc('У меня нет машин___.', ['ы', 'а', 'е'], 0),
        k.mc('Здесь нет парк___.', ['а', 'ы', 'и'], 0),
        k.mc('“There is a museum in the city.” = …', ['В городе есть музей.', 'В городе нет музея.', 'В город музей.'], 0),
        k.ord('В городе нет театра')]],
      r: ['Kostanay', 'Костанай — город в Казахстане. В городе двести тысяч жителей.\n\nВ центре есть парк, памятник и большой торговый центр. В городе есть театр, но нет метро.\n\nЯ живу в тихом районе. Мой район зелёный и красивый. Я люблю мой город!', [
        k.mc('How many people live in the city?', ['200,000', '20,000', '2,000,000'], 0), k.tf('The city has a metro.', false), k.mc('What is the writer’s district like?', ['quiet', 'noisy', 'old'], 0)]] },

    { id: 'u3', t: 'Мой обычный день. A usual day', topic: 'Routine',
      v: ['Verbs for your day', `
просыпаться | verb | to wake up | Я просыпаюсь в шесть. | | pra-sy-PAT-sa | I wake up at six.
ложиться | verb | to go to bed | Я ложусь в одиннадцать. | | la-ZHEET-sa | I go to bed at eleven.
заниматься | verb | to do (sport, study) | Я занимаюсь спортом. | | za-nee-MAT-sa | I do sport.
встречаться | verb | to meet (each other) | Мы встречаемся в кафе. | | fstree-CHAT-sa | We meet at the café.
возвращаться | verb | to return | Я возвращаюсь домой в семь. | | vaz-vra-SHCHAT-sa | I return home at seven.
начинаться | verb | to begin (of an event) | Урок начинается в девять. | | na-chee-NAT-sa | The lesson begins at nine.
каждый день | phrase | every day | Я работаю каждый день. | | KAZH-dy dyen | I work every day.
раз в неделю | phrase | once a week | Я играю в футбол раз в неделю. | | ras v nee-DYE-lyoo | I play football once a week.`],
      g: ['Verbs with -ся', '<p>Many everyday verbs end in <b>-ся</b>. Change the verb as usual, then add <b>-ся</b> after a consonant or <b>-сь</b> after a vowel.</p><table><tr><th>Who</th><th>просыпаться</th></tr><tr><td>я</td><td>просыпаю<b>сь</b></td></tr><tr><td>ты</td><td>просыпаешь<b>ся</b></td></tr><tr><td>он, она</td><td>просыпает<b>ся</b></td></tr><tr><td>мы</td><td>просыпаем<b>ся</b></td></tr><tr><td>вы</td><td>просыпаете<b>сь</b></td></tr><tr><td>они</td><td>просыпают<b>ся</b></td></tr></table><p>You already know two of them: <b>умываться</b> (to wash) and <b>одеваться</b> (to get dressed).</p>', [
        k.mc('Я просыпа___ в шесть.', ['юсь', 'ется', 'ются'], 0),
        k.mc('Урок начина___ в девять.', ['ется', 'юсь', 'емся'], 0),
        k.mc('Мы встреча___ в кафе.', ['емся', 'ется', 'юсь'], 0),
        k.mc('Они возвраща___ домой.', ['ются', 'ется', 'емся'], 0),
        k.ord('Я ложусь в одиннадцать')]],
      r: ['Anna’s working day', 'Я просыпаюсь в шесть часов. Сначала я умываюсь и одеваюсь, потом завтракаю.\n\nРабота начинается в девять. Я возвращаюсь домой в семь.\n\nРаз в неделю я занимаюсь спортом. В пятницу мы с другом встречаемся в кафе.\n\nЯ ложусь в одиннадцать.', [
        k.mc('When does Anna wake up?', ['at six', 'at seven', 'at nine'], 0), k.mc('How often does she do sport?', ['once a week', 'every day', 'never'], 0), k.tf('She goes to bed at ten.', false)]] },

    { id: 'u4', t: 'В ресторане. At the restaurant', topic: 'Eating out',
      v: ['Ordering a meal', `
меню | noun | menu | Меню, пожалуйста. | | mee-NYOO | The menu, please.
официант | noun | waiter | Официант, счёт, пожалуйста! | | a-fee-tsee-ANT | Waiter, the bill, please!
счёт | noun | bill | Счёт, пожалуйста. | | shchot | The bill, please.
салат | noun | salad | Я хочу салат. | | sa-LAT | I want a salad.
десерт | noun | dessert | На десерт — торт. | | dee-SYERT | For dessert, cake.
торт | noun | cake | Это вкусный торт. | | tort | This is a tasty cake.
заказать | verb | to order | Я хочу заказать суп. | | za-ka-ZAT | I want to order soup.
голодный | adjective | hungry | Я голодный. | | ga-LOD-ny | I am hungry.`],
      g: ['Ordering: хочу, буду, можно', '<p>Three ways to ask for food and drink:</p><ul><li><b>Я хочу</b> салат. = I want a salad.</li><li><b>Я буду</b> суп. = I’ll have the soup.</li><li><b>Можно</b> меню? = May I have the menu?</li></ul><table><tr><th>Who</th><th>хотеть (to want)</th></tr><tr><td>я</td><td>хоч<b>у</b></td></tr><tr><td>ты</td><td>хоч<b>ешь</b></td></tr><tr><td>он, она</td><td>хоч<b>ет</b></td></tr><tr><td>мы</td><td>хот<b>им</b></td></tr><tr><td>вы</td><td>хот<b>ите</b></td></tr><tr><td>они</td><td>хот<b>ят</b></td></tr></table><p>Look: <b>ч</b> becomes <b>т</b> for мы, вы, они.</p>', [
        k.mc('Мы ___ заказать салат.', ['хотим', 'хочу', 'хочет'], 0),
        k.mc('Вы ___ чай или кофе?', ['хотите', 'хотим', 'хочу'], 0),
        k.mc('“I’ll have the soup.” = …', ['Я буду суп.', 'Я есть суп.', 'Я был суп.'], 0),
        k.mc('“May I have the menu?” = …', ['Можно меню?', 'Нужно меню?', 'Нет меню?'], 0),
        k.ord('Я хочу заказать суп')]],
      r: ['Dinner for two', '— Добрый вечер! Вот меню.\n\n— Спасибо. Что вы хотите, Анна?\n\n— Я буду салат и рыбу. А вы?\n\n— Я очень голодный. Я буду суп, мясо и картошку.\n\n— А на десерт?\n\n— Торт и чай, пожалуйста.\n\n(Потом)\n\n— Официант, счёт, пожалуйста!', [
        k.mc('What does Anna order?', ['salad and fish', 'soup and meat', 'cake'], 0), k.tf('The man is hungry.', true), k.mc('What do they have for dessert?', ['cake and tea', 'fruit', 'nothing'], 0)]] },

    { id: 'u5', t: 'На рынке. At the market', topic: 'Shopping',
      v: ['Amounts and vegetables', `
килограмм | noun | kilogram | Килограмм яблок, пожалуйста. | | kee-la-GRAM | A kilogram of apples, please.
литр | noun | litre | Литр молока, пожалуйста. | | leetr | A litre of milk, please.
бутылка | noun | bottle | Бутылка воды. | | boo-TYL-ka | A bottle of water.
пакет | noun | bag, packet | Пакет, пожалуйста. | | pa-KYET | A bag, please.
помидор | noun | tomato | Это красный помидор. | | pa-mee-DOR | This is a red tomato.
огурец | noun | cucumber | Это свежий огурец. | | a-goo-RYETS | This is a fresh cucumber.
свежий | adjective | fresh | Это свежий хлеб. | | SVYE-zhee | This is fresh bread.
несколько | word | several, a few | У меня несколько вопросов. | | NYES-kal-ka | I have a few questions.`],
      g: ['How much: the new ending after amounts', '<p>After an amount (<b>килограмм, литр, бутылка, много, мало, сколько</b>) the noun takes the same ending as after <b>из</b> and <b>нет</b>.</p><table><tr><th>Noun</th><th>After an amount</th></tr><tr><td>вода</td><td>бутылка вод<b>ы</b></td></tr><tr><td>молоко</td><td>литр молок<b>а</b></td></tr><tr><td>сахар</td><td>много сахар<b>а</b></td></tr><tr><td>хлеб</td><td>мало хлеб<b>а</b></td></tr></table><p>For things you count, use the plural form: килограмм помидор<b>ов</b>, килограмм огурц<b>ов</b>, килограмм яблок.</p>', [
        k.mc('Бутылка вод___.', ['ы', 'а', 'у'], 0),
        k.mc('Литр молок___.', ['а', 'о', 'и'], 0),
        k.mc('Килограмм помидор___.', ['ов', 'ы', 'а'], 0),
        k.mc('Много сахар___.', ['а', 'ы', 'ов'], 0),
        k.ord('Литр молока и бутылка воды')]],
      r: ['At the market', '— Здравствуйте! Что вы хотите?\n\n— Килограмм помидоров и несколько огурцов, пожалуйста.\n\n— Помидоры очень свежие. Что ещё?\n\n— Литр молока и бутылка воды.\n\n— Вот, пожалуйста. Пакет?\n\n— Да, спасибо. Сколько стоит?\n\n— Две тысячи тенге.', [
        k.mc('How many tomatoes does the customer want?', ['a kilogram', 'a few', 'two kilograms'], 0), k.tf('The customer buys milk.', true), k.mc('How much does everything cost?', ['2,000 tenge', '200 tenge', '20,000 tenge'], 0)]] },

    { id: 'u6', t: 'Как он выглядит? Describing people', topic: 'People',
      v: ['What people are like', `
высокий | adjective | tall | Мой брат высокий. | | vy-SO-kee | My brother is tall.
низкий | adjective | short (not tall) | Она низкая. | | NEES-kee | She is short.
молодой | adjective | young | Он молодой врач. | | ma-la-DOY | He is a young doctor.
пожилой | adjective | elderly | Это пожилой человек. | | pa-zhee-LOY | This is an elderly person.
добрый | adjective | kind | Моя бабушка добрая. | | DOB-ry | My grandmother is kind.
умный | adjective | clever | Она умная девочка. | | OOM-ny | She is a clever girl.
весёлый | adjective | cheerful | Мой друг весёлый. | | vee-SYO-ly | My friend is cheerful.
борода | noun | beard | У него борода. | | ba-ra-DA | He has a beard.`],
      g: ['Whose? Anna’s book', '<p>English says <i>Anna’s book</i>. Russian says <i>the book of Anna</i>: the thing first, then the owner with the ending you know.</p><table><tr><th>Owner</th><th>Russian</th><th>Meaning</th></tr><tr><td>Анна</td><td>книга Анн<b>ы</b></td><td>Anna’s book</td></tr><tr><td>брат</td><td>машина брат<b>а</b></td><td>my brother’s car</td></tr><tr><td>друг</td><td>дом друг<b>а</b></td><td>my friend’s house</td></tr><tr><td>мама</td><td>сестра мам<b>ы</b></td><td>mum’s sister</td></tr></table><p>The same ending comes after <b>у</b>: <b>У брата есть машина.</b> = My brother has a car. <b>У Анны есть сестра.</b> = Anna has a sister.</p>', [
        k.mc('Это книга Анн___.', ['ы', 'а', 'у'], 0),
        k.mc('Это машина брат___.', ['а', 'ы', 'у'], 0),
        k.mc('У ___ есть сестра. (Anna)', ['Анны', 'Анна', 'Анну'], 0),
        k.mc('“my friend’s house” = …', ['дом друга', 'дом друг', 'друг дом'], 0),
        k.ord('Это машина брата')]],
      r: ['A family photo', 'Это фото моей семьи.\n\nЭто мой папа. Он высокий, у него борода. Он очень добрый.\n\nЭто моя мама. Она низкая и весёлая. А это сестра мамы, моя тётя. Она молодая и умная.\n\nЭто мой дедушка. Он пожилой человек. Машина дедушки очень старая!', [
        k.mc('Who has a beard?', ['the father', 'the grandfather', 'the brother'], 0), k.tf('The aunt is the mother’s sister.', true), k.mc('What is very old?', ['the grandfather’s car', 'the photo', 'the house'], 0)]] },

    { id: 'u7', t: 'Что вы уже сделали? Finished or not', topic: 'Experiences',
      v: ['Trips and results', `
поездка | noun | trip | Это была интересная поездка. | | pa-YEST-ka | It was an interesting trip.
впечатление | noun | impression | У меня хорошее впечатление. | | fpee-chat-LYE-nee-ye | I have a good impression.
однажды | adverb | once, one day | Однажды я был в Алматы. | | ad-NAZH-dy | Once I was in Almaty.
в детстве | phrase | in childhood | В детстве я жил в деревне. | | v DYET-stvye | In childhood I lived in a village.
попробовать | verb | to try, to taste | Я попробовал бешбармак. | | pa-PRO-ba-vat | I tried beshbarmak.
прочитать | verb | to read to the end | Я прочитал эту книгу. | | pra-chee-TAT | I have read this book.
написать | verb | to write (and finish) | Она написала письмо. | | na-pee-SAT | She wrote a letter.
выучить | verb | to learn (and know) | Я выучил десять слов. | | VY-oo-cheet | I learned ten words.`],
      g: ['Two verbs for one action', '<p>Most Russian verbs come in pairs. One shows the <b>action itself</b> (how long, how often). The other shows the <b>result</b>: it is finished.</p><table><tr><th>The action</th><th>The result</th><th>Meaning</th></tr><tr><td>читать</td><td><b>про</b>читать</td><td>to read</td></tr><tr><td>писать</td><td><b>на</b>писать</td><td>to write</td></tr><tr><td>делать</td><td><b>с</b>делать</td><td>to do</td></tr><tr><td>учить</td><td><b>вы</b>учить</td><td>to learn</td></tr><tr><td>пробовать</td><td><b>по</b>пробовать</td><td>to try</td></tr></table><ul><li>Вчера я <b>читал</b> книгу два часа. = I was reading for two hours. (the action)</li><li>Я уже <b>прочитал</b> книгу. = I have read the book. (finished)</li></ul><p>Words like <b>два часа, часто, каждый день</b> go with the action. The word <b>уже</b> often goes with the result.</p>', [
        k.mc('Вчера я ___ книгу два часа.', ['читал', 'прочитал', 'прочитаю'], 0),
        k.mc('Я уже ___ эту книгу. Вот она, возьмите!', ['прочитал', 'читал', 'читаю'], 0),
        k.mc('Она ___ письмо и пошла домой.', ['написала', 'писала', 'пишет'], 0),
        k.mc('Я ___ все слова. Теперь я знаю их!', ['выучил', 'учил', 'учу'], 0),
        k.ord('Я уже прочитал эту книгу')]],
      r: ['A trip to Almaty', 'В прошлом году я был в Алматы. Это была интересная поездка.\n\nВ детстве я много читал об этом городе. И вот я увидел его!\n\nЯ попробовал бешбармак. Очень вкусно! Я выучил несколько казахских слов и написал письмо маме.\n\nУ меня очень хорошее впечатление. А вы были в Алматы?\n\n(об этом городе = about this city · увидел = saw)', [
        k.mc('Where did the writer go?', ['Almaty', 'Astana', 'Moscow'], 0), k.tf('The writer did not like the trip.', false), k.mc('What did the writer write?', ['a letter to his mother', 'a book', 'ten words'], 0)]] },

    { id: 'u8', t: 'Как пройти? Asking the way', topic: 'Directions',
      v: ['Finding your way', `
перекрёсток | noun | crossroads | Идите до перекрёстка. | | pee-ree-KRYOS-tak | Go as far as the crossroads.
светофор | noun | traffic light | Поверните у светофора. | | svee-ta-FOR | Turn at the traffic light.
повернуть | verb | to turn | Нужно повернуть направо. | | pa-veer-NOOT | You need to turn right.
пройти | verb | to get to, to walk past | Как пройти до музея? | | pray-TEE | How do I get to the museum?
переход | noun | crossing | Вот переход. | | pee-ree-KHOT | Here is the crossing.
квартал | noun | block (of a street) | Музей — два квартала отсюда. | | kvar-TAL | The museum is two blocks from here.
заблудиться | verb | to get lost | Я заблудился. | | za-bloo-DEET-sa | I am lost.
мимо | preposition | past | Идите мимо банка. | | MEE-ma | Go past the bank.`],
      g: ['Telling someone the way: идите, поверните', '<p>To tell someone politely what to do, the verb ends in <b>-ите</b>.</p><table><tr><th>Verb</th><th>Do it!</th><th>Meaning</th></tr><tr><td>идти</td><td>ид<b>ите</b></td><td>go</td></tr><tr><td>повернуть</td><td>поверн<b>ите</b></td><td>turn</td></tr><tr><td>пройти</td><td>пройд<b>ите</b></td><td>go past, go through</td></tr><tr><td>сказать</td><td>скаж<b>ите</b></td><td>tell me</td></tr><tr><td>показать</td><td>покаж<b>ите</b></td><td>show me</td></tr></table><p><b>до</b> = as far as, to. After <b>до</b> and <b>мимо</b> use the ending from Unit 1: до банк<b>а</b>, до аптек<b>и</b>, мимо парк<b>а</b>.</p><p>The useful question: <b>Скажите, пожалуйста, как пройти до …?</b></p>', [
        k.mc('___ прямо до светофора.', ['Идите', 'Идти', 'Иду'], 0),
        k.mc('Потом ___ направо.', ['поверните', 'повернуть', 'повернул'], 0),
        k.mc('Как пройти до аптек___?', ['и', 'а', 'у'], 0),
        k.mc('“Tell me, please…” = …', ['Скажите, пожалуйста…', 'Сказать, пожалуйста…', 'Скажу, пожалуйста…'], 0),
        k.ord('Идите прямо до светофора')]],
      r: ['Lost in the city', '— Извините, я заблудился. Скажите, пожалуйста, как пройти до музея?\n\n— Идите прямо до светофора. Потом поверните налево. Там переход. Пройдите мимо банка. Музей напротив парка.\n\n— Это далеко?\n\n— Нет, два квартала. Пять минут пешком.\n\n— Большое спасибо!', [
        k.mc('Where does the tourist want to go?', ['to the museum', 'to the bank', 'to the park'], 0), k.tf('The museum is far away.', false), k.mc('Where should the tourist turn left?', ['at the traffic light', 'at the bank', 'at the park'], 0)]] },

    { id: 'u9', t: 'У врача. At the doctor’s', topic: 'Health',
      v: ['Feeling ill', `
простуда | noun | a cold | У меня простуда. | | pra-STOO-da | I have a cold.
кашель | noun | cough | У меня сильный кашель. | | KA-shel | I have a bad cough.
насморк | noun | runny nose | У ребёнка насморк. | | NAS-mark | The child has a runny nose.
рецепт | noun | prescription | Вот ваш рецепт. | | ree-TSEPT | Here is your prescription.
таблетка | noun | tablet | Одна таблетка утром. | | tab-LYET-ka | One tablet in the morning.
чувствовать себя | verb | to feel | Как вы себя чувствуете? | | CHOOST-va-vat see-BYA | How do you feel?
нужно | word | need to, it is necessary | Вам нужно отдыхать. | | NOOZH-na | You need to rest.
нельзя | word | must not | Здесь нельзя курить. | | neel-ZYA | You must not smoke here.`],
      g: ['Advice: нужно, нельзя, должен', '<p>For advice, the person goes in a special form (<i>to me, to you</i>), then <b>нужно</b> or <b>нельзя</b>, then the verb in its dictionary form.</p><table><tr><th>Who</th><th>Form</th><th>Example</th></tr><tr><td>я</td><td><b>мне</b></td><td>Мне нужно отдыхать.</td></tr><tr><td>ты</td><td><b>тебе</b></td><td>Тебе нужно спать.</td></tr><tr><td>он</td><td><b>ему</b></td><td>Ему нельзя работать.</td></tr><tr><td>она</td><td><b>ей</b></td><td>Ей нужно пить чай.</td></tr><tr><td>вы</td><td><b>вам</b></td><td>Вам нельзя курить.</td></tr></table><p><b>должен</b> = must. It changes like an adjective: он <b>должен</b>, она <b>должна</b>, они <b>должны</b>. — Она должна пить много воды.</p>', [
        k.mc('___ нужно отдыхать. (I)', ['Мне', 'Я', 'Меня'], 0),
        k.mc('Вам ___ курить. (must not)', ['нельзя', 'нужно', 'можно'], 0),
        k.mc('Она ___ пить много воды.', ['должна', 'должен', 'должны'], 0),
        k.mc('“He needs to sleep.” = …', ['Ему нужно спать.', 'Он нужно спать.', 'Ей нужно спать.'], 0),
        k.ord('Вам нужно пить много воды')]],
      r: ['A visit to the doctor', '— Здравствуйте. Как вы себя чувствуете?\n\n— Плохо. У меня кашель и насморк. У меня болит горло.\n\n— Температура есть?\n\n— Да, тридцать восемь.\n\n— У вас простуда. Вам нужно отдыхать и пить много чая. Вам нельзя работать три дня. Вот рецепт: одна таблетка утром и вечером.\n\n— Спасибо, доктор!', [
        k.mc('What is wrong with the patient?', ['a cough and a runny nose', 'a headache', 'a bad leg'], 0), k.tf('The patient can go to work tomorrow.', false), k.mc('When should the patient take a tablet?', ['in the morning and in the evening', 'only at night', 'every hour'], 0)]] },

    { id: 'u10', t: 'Работа и учёба. Work and study', topic: 'Work',
      v: ['At work', `
коллега | noun | colleague | Это мой коллега. | | ka-LYE-ga | This is my colleague.
начальник | noun | boss | Мой начальник в офисе. | | na-CHAL-neek | My boss is in the office.
совещание | noun | meeting (at work) | Совещание в десять. | | sa-vee-SHCHA-nee-ye | The meeting is at ten.
опыт | noun | experience | У меня есть опыт. | | O-pyt | I have experience.
зарплата | noun | salary | Зарплата хорошая. | | zar-PLA-ta | The salary is good.
компания | noun | company | Это большая компания. | | kam-PA-nee-ya | This is a big company.
сотрудник | noun | employee | Он новый сотрудник. | | sa-TROOD-neek | He is a new employee.
занят | adjective | busy | Я сегодня занят. | | ZA-nyat | I am busy today.`],
      g: ['Work as…: врачом, учителем, медсестрой', '<p>After <b>работать</b> (to work as) and <b>стать</b> (to become), the job takes a new ending.</p><table><tr><th>The job ends in…</th><th>Change</th><th>Examples</th></tr><tr><td>a consonant</td><td>add <b>-ом</b></td><td>врач → врач<b>ом</b>, инженер → инженер<b>ом</b></td></tr><tr><td>-ь</td><td>-ь → <b>-ем</b></td><td>учитель → учител<b>ем</b>, водитель → водител<b>ем</b></td></tr><tr><td>-а</td><td>-а → <b>-ой</b></td><td>медсестра → медсестр<b>ой</b> (a nurse)</td></tr></table><ul><li>Я работаю инженер<b>ом</b>. = I work as an engineer.</li><li>Она хочет стать врач<b>ом</b>. = She wants to become a doctor.</li></ul><p>The same ending comes after <b>с</b> (with): с друг<b>ом</b>, с сестр<b>ой</b>.</p>', [
        k.mc('Я работаю врач___.', ['ом', 'ой', 'ем'], 0),
        k.mc('Она работает медсестр___.', ['ой', 'ом', 'ем'], 0),
        k.mc('Он хочет стать учител___.', ['ем', 'ом', 'ой'], 0),
        k.mc('“I work as an engineer.” = …', ['Я работаю инженером.', 'Я работаю инженер.', 'Я работаю инженера.'], 0),
        k.ord('Я хочу стать врачом')]],
      r: ['Marat and his sister', 'Меня зовут Марат. Я работаю инженером в большой компании.\n\nУ меня хороший начальник и весёлые коллеги. В понедельник у нас совещание. Я очень занят: я работаю с девяти до шести.\n\nМоя сестра учится в университете. Она хочет стать врачом. У неё ещё нет опыта, но она много учится.', [
        k.mc('What is Marat’s job?', ['engineer', 'doctor', 'teacher'], 0), k.tf('There is a meeting on Monday.', true), k.mc('What does his sister want to become?', ['a doctor', 'an engineer', 'a boss'], 0)]] },

    { id: 'u11', t: 'Давай пойдём! Invitations', topic: 'Free time',
      v: ['Inviting and answering', `
приглашение | noun | invitation | Спасибо за приглашение! | | pree-gla-SHE-nee-ye | Thank you for the invitation!
выставка | noun | exhibition | В музее новая выставка. | | VY-staf-ka | There is a new exhibition at the museum.
вечеринка | noun | party | В субботу у нас вечеринка. | | vee-chee-REEN-ka | We have a party on Saturday.
согласен | adjective | agree (I agree) | Я согласен. | | sa-GLA-seen | I agree.
к сожалению | phrase | unfortunately | К сожалению, я занят. | | k sa-zha-LYE-nee-yoo | Unfortunately, I am busy.
с удовольствием | phrase | with pleasure | С удовольствием! | | s oo-da-VOL-stvee-yem | With pleasure!
давай | word | let’s | Давай пойдём в кино! | | da-VAY | Let’s go to the cinema!
свободен | adjective | free (not busy) | Ты свободен в субботу? | | sva-BO-deen | Are you free on Saturday?`],
      g: ['Let’s… and I can', '<p><b>Давай</b> (to a friend) or <b>Давайте</b> (polite, or to a group) + the <b>мы</b> form = Let’s…</p><ul><li>Давай <b>пойдём</b> в кино! = Let’s go to the cinema!</li><li>Давайте <b>встретимся</b> в семь. = Let’s meet at seven.</li></ul><p>To answer: <b>С удовольствием!</b> or <b>К сожалению, я не могу.</b></p><table><tr><th>Who</th><th>мочь (can)</th></tr><tr><td>я</td><td>мо<b>гу</b></td></tr><tr><td>ты</td><td>мо<b>жешь</b></td></tr><tr><td>он, она</td><td>мо<b>жет</b></td></tr><tr><td>мы</td><td>мо<b>жем</b></td></tr><tr><td>вы</td><td>мо<b>жете</b></td></tr><tr><td>они</td><td>мо<b>гут</b></td></tr></table><p>For a woman: <b>свободна, занята, согласна</b>. — Анна свободна в субботу.</p>', [
        k.mc('___ пойдём в кино!', ['Давай', 'Давать', 'Даю'], 0),
        k.mc('К сожалению, я не ___.', ['могу', 'может', 'можем'], 0),
        k.mc('Мы ___ встретиться в субботу.', ['можем', 'могу', 'могут'], 0),
        k.mc('“With pleasure!” = …', ['С удовольствием!', 'К сожалению!', 'До свидания!'], 0),
        k.ord('Давай пойдём на выставку')]],
      r: ['Plans for Saturday', '— Привет, Анна! Ты свободна в субботу?\n\n— Да, свободна.\n\n— Давай пойдём на выставку!\n\n— С удовольствием! А когда?\n\n— В три часа. Потом у Марата вечеринка. Хочешь пойти?\n\n— Спасибо за приглашение, но, к сожалению, вечером я не могу. Я занята.\n\n— Жаль. Тогда давай встретимся в три у музея.\n\n— Согласна!\n\n(жаль = that is a pity · тогда = then)', [
        k.mc('Where are they going on Saturday at three?', ['to an exhibition', 'to the cinema', 'to a party'], 0), k.tf('Anna is going to the party.', false), k.mc('Where will they meet?', ['at the museum', 'at Marat’s home', 'at the café'], 0)]] },

    { id: 'u12', t: 'Холоднее, чем вчера. Weather and comparing', topic: 'Weather',
      v: ['The forecast', `
прогноз | noun | forecast | Какой прогноз на завтра? | | prag-NOS | What is the forecast for tomorrow?
гроза | noun | thunderstorm | Летом часто бывает гроза. | | gra-ZA | In summer there is often a thunderstorm.
мороз | noun | frost | Сегодня сильный мороз. | | ma-ROS | There is a hard frost today.
сильный | adjective | strong | Сегодня сильный ветер. | | SEEL-ny | There is a strong wind today.
солнечно | adverb | sunny | Сегодня солнечно. | | SOL-neech-na | It is sunny today.
пасмурно | adverb | cloudy, dull | Сегодня пасмурно. | | PAS-moor-na | It is cloudy today.
чем | word | than | Сегодня теплее, чем вчера. | | chem | Today is warmer than yesterday.
самый | word | the most | Это самый большой город. | | SA-my | This is the biggest city.`],
      g: ['Colder, better, the coldest', '<p>To compare, most adjectives change their ending to <b>-ее</b>.</p><table><tr><th>Adjective</th><th>More</th></tr><tr><td>холодный</td><td>холодн<b>ее</b> (colder)</td></tr><tr><td>тёплый</td><td>тепл<b>ее</b> (warmer)</td></tr><tr><td>красивый</td><td>красив<b>ее</b> (more beautiful)</td></tr><tr><td>интересный</td><td>интересн<b>ее</b> (more interesting)</td></tr></table><p>Four you must learn by heart: большой → <b>больше</b>, маленький → <b>меньше</b>, хороший → <b>лучше</b>, плохой → <b>хуже</b>.</p><ul><li><b>чем</b> = than: Астана больше, <b>чем</b> Костанай.</li><li><b>самый</b> + adjective = the most: Январь — <b>самый</b> холодный месяц.</li></ul>', [
        k.mc('Сегодня ___, чем вчера.', ['холоднее', 'холодный', 'холодно'], 0),
        k.mc('Астана ___, чем Костанай.', ['больше', 'большой', 'большее'], 0),
        k.mc('хороший → better = …', ['лучше', 'хорошее', 'хуже'], 0),
        k.mc('Январь — ___ холодный месяц.', ['самый', 'чем', 'очень'], 0),
        k.ord('Сегодня теплее чем вчера')]],
      r: ['The weather forecast', 'Прогноз погоды.\n\nСегодня в Костанае пасмурно, минус пятнадцать. Завтра будет холоднее: минус двадцать пять и сильный ветер. Это сильный мороз!\n\nВ Алматы теплее, чем в Костанае: плюс два и солнечно.\n\nЯнварь — самый холодный месяц в Казахстане. Летом лучше: тепло, иногда бывает гроза.', [
        k.mc('What will the temperature be in Kostanay tomorrow?', ['minus 25', 'minus 15', 'plus 2'], 0), k.tf('Almaty is warmer than Kostanay.', true), k.mc('Which is the coldest month?', ['January', 'July', 'March'], 0)]] },

    { id: 'u13', t: 'Домашние дела. Jobs at home', topic: 'Home',
      v: ['Cleaning day', `
уборка | noun | cleaning | Суббота — день уборки. | | oo-BOR-ka | Saturday is cleaning day.
посуда | noun | dishes | Я мою посуду. | | pa-SOO-da | I am washing the dishes.
мыть | verb | to wash | Он моет машину. | | myt | He is washing the car.
стирать | verb | to wash clothes | Мама стирает одежду. | | stee-RAT | Mum is washing the clothes.
пылесос | noun | vacuum cleaner | Где пылесос? | | py-lee-SOS | Where is the vacuum cleaner?
мусор | noun | rubbish | Вынеси мусор, пожалуйста. | | MOO-sar | Take out the rubbish, please.
гладить | verb | to iron | Я не люблю гладить. | | GLA-deet | I do not like ironing.
порядок | noun | order, tidiness | В комнате порядок. | | pa-RYA-dak | The room is tidy.`],
      g: ['I will do it: помою, сделаю, уберу', '<p>In Unit 7 you met verb pairs. The <b>result</b> verb has no present. With the usual endings it means the <b>future</b>: I will do it and finish it.</p><table><tr><th>The action</th><th>The result</th><th>I will…</th></tr><tr><td>мыть</td><td>помыть</td><td>я <b>помою</b></td></tr><tr><td>делать</td><td>сделать</td><td>я <b>сделаю</b></td></tr><tr><td>стирать</td><td>постирать</td><td>я <b>постираю</b></td></tr><tr><td>убирать</td><td>убрать</td><td>я <b>уберу</b></td></tr></table><ul><li>Я <b>мою</b> посуду. = I am washing the dishes. (now)</li><li>Я <b>помою</b> посуду. = I will wash the dishes. (and they will be clean)</li><li>Я <b>буду мыть</b> посуду. = I will be washing the dishes. (the action)</li></ul>', [
        k.mc('Завтра я ___ посуду. (will wash)', ['помою', 'помыл', 'мыл'], 0),
        k.mc('Я ___ уроки вечером. (will do)', ['сделаю', 'сделал', 'делал'], 0),
        k.mc('“I am washing the dishes now.” = …', ['Я мою посуду.', 'Я помою посуду.', 'Я помыл посуду.'], 0),
        k.mc('Я ___ одежду завтра. (will wash)', ['постираю', 'постирал', 'стирал'], 0),
        k.ord('Завтра я помою посуду')]],
      r: ['Saturday is cleaning day', 'Суббота — день уборки. В нашей семье все помогают.\n\nМама: «Кто что сделает?»\n\nПапа: «Я помою посуду и вынесу мусор».\n\nЯ: «Я уберу мою комнату. Где пылесос?»\n\nСестра: «Я постираю одежду, а потом буду гладить».\n\nЧерез два часа в квартире порядок. Теперь можно отдыхать!\n\n(помогают = help · вынесу = I will take out · через = after)', [
        k.mc('Who will wash the dishes?', ['the father', 'the mother', 'the sister'], 0), k.tf('The sister asks for the vacuum cleaner.', false), k.mc('Which day is cleaning day?', ['Saturday', 'Sunday', 'Friday'], 0)]] }
  ]);
})();
