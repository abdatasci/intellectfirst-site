/* IF Lingo · Russian A2: an original IF Academy course for people who speak English and have finished Russian A1.
   Word lines: word | part of speech | meaning in English | example | (empty) | how to say it | the example in English.
   Plan: 20 units and a level test (project doc claude/if-lingo.md). Built so far: units 1 to 6. */
IFX.course({
  id: 'ru-a2', track: 'lang', lang: 'ru-RU', level: 'A2', next: 'B1', icon: '🇷🇺',
  title: 'Russian A2', sub: 'Everyday Russian',
  blurb: 'Say where you are from, describe your city and people, order in a restaurant and shop at the market. The first 6 of 20 units, explained in English.',
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
        k.mc('Who has a beard?', ['the father', 'the grandfather', 'the brother'], 0), k.tf('The aunt is the mother’s sister.', true), k.mc('What is very old?', ['the grandfather’s car', 'the photo', 'the house'], 0)]] }
  ]);
})();
