/* IF Lingo · Kazakh A2: an original IF Academy course for people who speak English and have finished Kazakh A1.
   Word lines: word | part of speech | meaning in English | example | (empty) | how to say it | the example in English.
   Plan: 20 units and a level test (project doc claude/if-lingo.md). Built so far: units 1 to 6. */
IFX.course({
  id: 'kk-a2', track: 'lang', lang: 'kk-KZ', level: 'A2', next: 'B1', icon: '🇰🇿',
  title: 'Kazakh A2', sub: 'Everyday Kazakh',
  blurb: 'Say where you are from, describe your city and people, order in a restaurant and shop at the market. The first 6 of 20 units, explained in English.',
  units: []
});
(function () {
  var k = IFX.k;
  IFX.make('kk-a2', [
    { id: 'u1', t: 'Сіз қайдансыз? Where are you from?', topic: 'People',
      v: ['Countries and jobs', `
Англия | noun | England | Мен Англияданмын. | | AN-gli-ya | I am from England.
Қазақстан | noun | Kazakhstan | Ол Қазақстаннан келді. | | qa-zaq-STAN | She came from Kazakhstan.
Ресей | noun | Russia | Ол Ресейден келді. | | re-SEY | He came from Russia.
шетелдік | noun | foreigner | Мен шетелдікпін. | | she-tel-DIK | I am a foreigner.
ана тілі | noun | native language | Менің ана тілім — ағылшын тілі. | | a-NA ti-LI | My native language is English.
ағылшын | adjective | English | Бұл ағылшын кітабы. | | a-ghyl-SHYN | This is an English book.
мамандық | noun | profession | Сіздің мамандығыңыз қандай? | | ma-man-DYQ | What is your profession?
инженер | noun | engineer | Менің ағам инженер. | | in-zhe-NER | My older brother is an engineer.`],
      g: ['From: -дан, -ден, -тан, -тен, -нан, -нен', '<p><b>Сіз қайдансыз?</b> = Where are you from? For <b>from</b>, add an ending to the place.</p><table><tr><th>The word ends in…</th><th>Ending</th><th>Examples</th></tr><tr><td>a vowel, or л, р, й, з, ж</td><td><b>-дан, -ден</b></td><td>Астана → Астана<b>дан</b>, үй → үй<b>ден</b>, Ресей → Ресей<b>ден</b></td></tr><tr><td>к, қ, п, с, т, ш</td><td><b>-тан, -тен</b></td><td>жұмыс → жұмыс<b>тан</b>, мектеп → мектеп<b>тен</b></td></tr><tr><td>м, н, ң</td><td><b>-нан, -нен</b></td><td>Лондон → Лондон<b>нан</b>, Қазақстан → Қазақстан<b>нан</b>, дүкен → дүкен<b>нен</b></td></tr></table><p>Hard words (а, о, ұ, ы) take <b>-дан, -тан, -нан</b>; soft words (ә, е, і, ө, ү) take <b>-ден, -тен, -нен</b>.</p><p><b>Мен Лондоннан келдім.</b> = I came from London.</p>', [
        k.mc('Мен Астана___ келдім.', ['дан', 'ден', 'тан'], 0),
        k.mc('Ол мектеп___ келді.', ['тен', 'ден', 'нен'], 0),
        k.mc('Біз Лондон___ келдік.', ['нан', 'дан', 'тан'], 0),
        k.tf('“Сіз қайдансыз?” means “Where are you from?”', true),
        k.ord('Мен Англиядан келдім')]],
      r: ['A new student', 'Сәлеметсіз бе! Менің атым Джон. Мен Англияданмын, Лондоннан келдім. Мен инженермін.\n\nМенің ана тілім — ағылшын тілі. Мен аздап қазақша сөйлеймін.\n\nҚазір мен Қостанайда тұрамын. Менің әйелім Қазақстаннан, Астанадан. Ол дәрігер.\n\nАл сіз қайдансыз?', [
        k.mc('Where is John from?', ['London', 'Astana', 'Moscow'], 0), k.tf('John’s wife is from Astana.', true), k.mc('What is John’s profession?', ['engineer', 'doctor', 'teacher'], 0)]] },

    { id: 'u2', t: 'Менің қалам. My city', topic: 'City',
      v: ['Places and what they are like', `
аудан | noun | district | Мен жаңа ауданда тұрамын. | | a-oo-DAN | I live in a new district.
ескерткіш | noun | monument | Орталықта ескерткіш бар. | | es-kert-KISH | There is a monument in the centre.
мешіт | noun | mosque | Қалада мешіт бар. | | me-SHIT | There is a mosque in the city.
зауыт | noun | factory | Менің әкем зауытта жұмыс істейді. | | za-WYT | My father works at a factory.
сауда орталығы | noun | shopping centre | Сауда орталығы жақын. | | sa-oo-DA or-ta-ly-GHY | The shopping centre is near.
тыныш | adjective | quiet | Бұл тыныш аудан. | | ty-NYSH | This is a quiet district.
шулы | adjective | noisy | Орталық шулы. | | shoo-LY | The centre is noisy.
тұрғын | noun | resident | Қалада екі жүз мың тұрғын бар. | | toor-GHYN | The city has two hundred thousand residents.`],
      g: ['Bigger, quieter: -рақ, -рек', '<p>To compare, add an ending to the adjective.</p><table><tr><th>The adjective ends in…</th><th>Ending</th><th>Examples</th></tr><tr><td>a vowel</td><td><b>-рақ, -рек</b></td><td>жаңа → жаңа<b>рақ</b> (newer), әдемі → әдемі<b>рек</b> (more beautiful)</td></tr><tr><td>a consonant</td><td><b>-ырақ, -ірек</b></td><td>тыныш → тыныш<b>ырақ</b> (quieter), үлкен → үлкен<b>ірек</b> (bigger)</td></tr></table><p><b>Than</b> is the “from” ending of Unit 1 on the second thing:</p><ul><li><b>Астана Қостанайдан үлкенірек.</b> = Astana is bigger than Kostanay.</li><li><b>Менің ауданым орталықтан тынышырақ.</b> = My district is quieter than the centre.</li></ul>', [
        k.mc('үлкен → bigger = …', ['үлкенірек', 'үлкенрақ', 'үлкенырақ'], 0),
        k.mc('жаңа → newer = …', ['жаңарақ', 'жаңарек', 'жаңаырақ'], 0),
        k.mc('Астана Қостанай___ үлкенірек.', ['дан', 'да', 'ға'], 0),
        k.tf('“тынышырақ” means “quieter”.', true),
        k.ord('Астана Қостанайдан үлкенірек')]],
      r: ['Kostanay', 'Қостанай — Қазақстандағы қала. Қалада екі жүз мың тұрғын бар.\n\nОрталықта парк, ескерткіш және үлкен сауда орталығы бар. Қалада театр бар, бірақ метро жоқ.\n\nМен тыныш ауданда тұрамын. Менің ауданым орталықтан тынышырақ. Мен қаламды жақсы көремін!\n\n(Қазақстандағы = in Kazakhstan)', [
        k.mc('How many people live in the city?', ['200,000', '20,000', '2,000,000'], 0), k.tf('The city has a metro.', false), k.mc('What is the writer’s district like?', ['quiet', 'noisy', 'old'], 0)]] },

    { id: 'u3', t: 'Қазір не істеп жатырсыз? Right now', topic: 'Routine',
      v: ['What people are doing', `
дайындау | verb | to prepare | Мен кешкі ас дайындап жатырмын. | | da-yyn-DAU | I am preparing dinner.
сөйлесу | verb | to talk (with someone) | Мен досыммен сөйлесіп тұрмын. | | soy-le-SOO | I am talking with my friend.
қарау | verb | to look, to watch | Мен теледидар қарап отырмын. | | qa-RAU | I am watching television.
отыру | verb | to sit | Ол бөлмеде отыр. | | o-ty-ROO | He is sitting in the room.
хабарласу | verb | to call, to get in touch | Мен анама хабарласып жатырмын. | | kha-bar-la-SOO | I am calling my mother.
аптасына бір рет | phrase | once a week | Мен аптасына бір рет футбол ойнаймын. | | ap-ta-sy-NA bir ret | I play football once a week.
үнемі | adverb | all the time | Ол үнемі жұмыс істейді. | | oo-ne-MI | He works all the time.
бос емес | phrase | busy | Мен қазір бос емеспін. | | bos e-MES | I am busy now.`],
      g: ['Right now: -п + жатыр, отыр, тұр', '<p>For what is happening <b>now</b>, use the verb with <b>-п</b> and a helper word.</p><table><tr><th>The verb stem ends in…</th><th>Add</th><th>Examples</th></tr><tr><td>a vowel</td><td><b>-п</b></td><td>оқы → оқы<b>п</b>, істе → істе<b>п</b>, қара → қара<b>п</b></td></tr><tr><td>a consonant, hard word</td><td><b>-ып</b></td><td>жаз → жаз<b>ып</b>, бар → бар<b>ып</b></td></tr><tr><td>a consonant, soft word</td><td><b>-іп</b></td><td>іш → іш<b>іп</b>, кел → кел<b>іп</b></td></tr></table><p>The helper: <b>жатыр</b> (in the middle of doing it), <b>отыр</b> (sitting), <b>тұр</b> (standing). The person ending goes on the helper:</p><ul><li>Мен кітап оқып жатыр<b>мын</b>. = I am reading a book.</li><li>Сіз не істеп жатыр<b>сыз</b>? = What are you doing?</li><li>Ол жұмыс істеп жатыр. = He is working.</li><li>Біз шай ішіп отыр<b>мыз</b>. = We are drinking tea.</li></ul>', [
        k.mc('Мен кітап оқы___ жатырмын.', ['п', 'ып', 'іп'], 0),
        k.mc('Ол хат жаз___ отыр.', ['ып', 'іп', 'п'], 0),
        k.mc('Біз шай іш___ отырмыз.', ['іп', 'ып', 'п'], 0),
        k.mc('“What are you doing now?” = …', ['Сіз не істеп жатырсыз?', 'Сіз не істедіңіз?', 'Сіз кеше не істедіңіз?'], 0),
        k.ord('Мен кітап оқып жатырмын')]],
      r: ['A phone call', '— Сәлем, Айгүл! Не істеп жатырсың?\n\n— Сәлем, Том! Мен кешкі ас дайындап жатырмын. Ал сен?\n\n— Мен теледидар қарап отырмын. Анаң үйде ме?\n\n— Иә, ол досымен сөйлесіп отыр. Әкем жұмыс істеп жатыр, ол бос емес.\n\n— Жақсы. Ертең хабарласамын!\n\n(жатырсың = you are, to a friend · анаң = your mother · досымен = with her friend)', [
        k.mc('What is Aigul doing?', ['preparing dinner', 'watching television', 'working'], 0), k.mc('What is Tom doing?', ['watching television', 'talking with a friend', 'cooking'], 0), k.tf('Aigul’s father is busy.', true)]] },

    { id: 'u4', t: 'Мейрамханада. At the restaurant', topic: 'Eating out',
      v: ['Ordering a meal', `
мәзір | noun | menu | Мәзірді беріңізші. | | ma-ZIR | The menu, please.
даяшы | noun | waiter | Даяшы, есепшотты беріңізші! | | da-ya-SHY | Waiter, the bill, please!
есепшот | noun | bill | Есепшотты беріңізші. | | e-sep-SHOT | The bill, please.
салат | noun | salad | Менің салат жегім келеді. | | sa-LAT | I would like to eat a salad.
тәтті тағам | noun | dessert | Тәтті тағамға торт бар. | | tat-TI ta-GHAM | For dessert there is cake.
торт | noun | cake | Бұл дәмді торт. | | tort | This is a tasty cake.
тапсырыс беру | verb | to order | Мен сорпаға тапсырыс беремін. | | tap-sy-RYS be-ROO | I am ordering soup.
аш | adjective | hungry | Мен ашпын. | | ash | I am hungry.`],
      g: ['I would like to: -ғым, -гім, -қым, -кім келеді', '<p><b>Менің шай ішкім келеді.</b> = I would like to drink tea.</p><table><tr><th>The verb stem</th><th>Add</th><th>Examples</th></tr><tr><td>hard, ends in a vowel or a voiced sound</td><td><b>-ғым</b></td><td>бар → бар<b>ғым</b> келеді, ал → ал<b>ғым</b> келеді</td></tr><tr><td>soft, ends in a vowel or a voiced sound</td><td><b>-гім</b></td><td>же → же<b>гім</b> келеді, көр → көр<b>гім</b> келеді</td></tr><tr><td>ends in к, қ, п, с, т, ш</td><td><b>-қым, -кім</b></td><td>іш → іш<b>кім</b> келеді</td></tr></table><ul><li>The person who wants is <b>менің</b>: <b>Менің</b> Астанаға барғым келеді.</li><li>The polite question: <b>Не ішкіңіз келеді?</b> = What would you like to drink?</li><li>Not: <b>келмейді</b>. — Менің барғым келмейді. = I do not want to go.</li></ul>', [
        k.mc('Менің шай іш___ келеді.', ['кім', 'гім', 'ғым'], 0),
        k.mc('Менің Астанаға бар___ келеді.', ['ғым', 'гім', 'кім'], 0),
        k.mc('Менің торт же___ келеді.', ['гім', 'ғым', 'қым'], 0),
        k.mc('“What would you like to drink?” = …', ['Не ішкіңіз келеді?', 'Не іштіңіз?', 'Не ішіп жатырсыз?'], 0),
        k.ord('Менің шай ішкім келеді')]],
      r: ['Dinner for two', '— Қайырлы кеш! Міне, мәзір.\n\n— Рақмет. Айгүл, не жегіңіз келеді?\n\n— Менің салат пен балық жегім келеді. Ал сіз?\n\n— Мен өте ашпын. Мен сорпа, ет және картоп аламын.\n\n— Тәтті тағамға не аласыз?\n\n— Торт пен шай беріңізші.\n\n(Содан кейін)\n\n— Даяшы, есепшотты беріңізші!\n\n(сорпа = soup)', [
        k.mc('What does Aigul want to eat?', ['salad and fish', 'soup and meat', 'cake'], 0), k.tf('The man is hungry.', true), k.mc('What do they have for dessert?', ['cake and tea', 'fruit', 'nothing'], 0)]] },

    { id: 'u5', t: 'Базарда. At the market', topic: 'Shopping',
      v: ['Amounts and vegetables', `
килограмм | noun | kilogram | Бір килограмм алма беріңізші. | | ki-lo-GRAMM | A kilogram of apples, please.
литр | noun | litre | Бір литр сүт беріңізші. | | litr | A litre of milk, please.
шөлмек | noun | bottle | Бір шөлмек су. | | shol-MEK | A bottle of water.
пакет | noun | bag, packet | Пакет керек пе? | | pa-KET | Do you need a bag?
қызанақ | noun | tomato | Бұл қызыл қызанақ. | | qy-za-NAQ | This is a red tomato.
қияр | noun | cucumber | Бұл жасыл қияр. | | qi-YAR | This is a green cucumber.
балғын | adjective | fresh | Бұл балғын көкөніс. | | bal-GHYN | This is a fresh vegetable.
бірнеше | word | several, a few | Менде бірнеше сұрақ бар. | | bir-ne-SHE | I have a few questions.`],
      g: ['This book, that apple: the object ending', '<p>When the object is a <b>particular</b> thing (this one, that one, my one), it takes an ending.</p><ul><li>Мен кітап оқимын. = I read books / a book.</li><li>Мен <b>осы</b> кітап<b>ты</b> оқимын. = I am reading <b>this</b> book.</li></ul><table><tr><th>The word ends in…</th><th>Ending</th><th>Examples</th></tr><tr><td>a vowel</td><td><b>-ны, -ні</b></td><td>алма → алма<b>ны</b>, күрте → күрте<b>ні</b></td></tr><tr><td>к, қ, п, с, т, ш</td><td><b>-ты, -ті</b></td><td>кітап → кітап<b>ты</b>, сүт → сүт<b>ті</b>, қызанақ → қызанақ<b>ты</b></td></tr><tr><td>other consonants</td><td><b>-ды, -ді</b></td><td>қияр → қияр<b>ды</b>, үй → үй<b>ді</b>, мәзір → мәзір<b>ді</b></td></tr></table>', [
        k.mc('Мен осы кітап___ оқимын.', ['ты', 'ды', 'ны'], 0),
        k.mc('Мен мына алма___ аламын.', ['ны', 'ды', 'ты'], 0),
        k.mc('Мен осы қияр___ аламын.', ['ды', 'ты', 'ны'], 0),
        k.mc('Мен осы сүт___ ішемін.', ['ті', 'ді', 'ні'], 0),
        k.ord('Мен осы кітапты оқимын')]],
      r: ['At the market', '— Сәлеметсіз бе! Не аласыз?\n\n— Бір килограмм қызанақ және бірнеше қияр беріңізші.\n\n— Қызанақ өте балғын. Тағы не керек?\n\n— Бір литр сүт және бір шөлмек су.\n\n— Міне. Пакет керек пе?\n\n— Иә, рақмет. Қанша тұрады?\n\n— Екі мың теңге.', [
        k.mc('How many tomatoes does the customer want?', ['a kilogram', 'a few', 'two kilograms'], 0), k.tf('The customer buys milk.', true), k.mc('How much does everything cost?', ['2,000 tenge', '200 tenge', '20,000 tenge'], 0)]] },

    { id: 'u6', t: 'Ол қандай адам? Describing people', topic: 'People',
      v: ['What people are like', `
ұзын бойлы | adjective | tall | Менің ағам ұзын бойлы. | | oo-ZYN boy-LY | My older brother is tall.
аласа бойлы | adjective | short (not tall) | Ол аласа бойлы. | | a-la-SA boy-LY | She is short.
қарт | adjective | elderly | Бұл қарт адам. | | qart | This is an elderly person.
жігіт | noun | young man | Ол жақсы жігіт. | | zhi-GIT | He is a good young man.
мейірімді | adjective | kind | Менің әжем мейірімді. | | me-yi-rim-DI | My grandmother is kind.
ақылды | adjective | clever | Ол ақылды қыз. | | a-qyl-DY | She is a clever girl.
көңілді | adjective | cheerful | Менің досым көңілді. | | ko-ngil-DI | My friend is cheerful.
сақал | noun | beard | Оның сақалы бар. | | sa-QAL | He has a beard.`],
      g: ['Whose? Aigul’s book', '<p>For <i>Aigul’s book</i>, both words take an ending: the owner and the thing.</p><table><tr><th>Owner</th><th>Ending on the owner</th><th>Example</th></tr><tr><td>ends in a vowel, or м, н, ң</td><td><b>-ның, -нің</b></td><td>Том<b>ның</b> үй<b>і</b> (Tom’s house), ана<b>ның</b> сөмке<b>сі</b> (mother’s bag)</td></tr><tr><td>ends in к, қ, п, с, т, ш</td><td><b>-тың, -тің</b></td><td>дос<b>тың</b> көліг<b>і</b> (the friend’s car)</td></tr><tr><td>other consonants</td><td><b>-дың, -дің</b></td><td>Айгүл<b>дің</b> кітаб<b>ы</b> (Aigul’s book)</td></tr></table><p>The thing takes <b>-ы, -і</b> after a consonant and <b>-сы, -сі</b> after a vowel. Before the ending, <b>п</b> becomes <b>б</b> and <b>к, қ</b> become <b>г, ғ</b>: кітап → кітабы, көлік → көлігі.</p>', [
        k.mc('Айгүл___ кітабы', ['дің', 'нің', 'тің'], 0),
        k.mc('Том___ үйі', ['ның', 'дың', 'тың'], 0),
        k.mc('дос___ көлігі', ['тың', 'дың', 'ның'], 0),
        k.mc('mother’s bag = ананың …', ['сөмкесі', 'сөмке', 'сөмкем'], 0),
        k.ord('Бұл Айгүлдің кітабы')]],
      r: ['A family photo', 'Бұл менің отбасымның суреті.\n\nБұл менің әкем. Ол ұзын бойлы, оның сақалы бар. Ол өте мейірімді.\n\nБұл менің анам. Ол аласа бойлы және көңілді. Ал бұл анамның сіңлісі, менің тәтем. Ол ақылды.\n\nБұл менің атам. Ол қарт адам. Атамның көлігі өте ескі!\n\n(сіңлісі = her younger sister)', [
        k.mc('Who has a beard?', ['the father', 'the grandfather', 'the brother'], 0), k.tf('The aunt is the mother’s sister.', true), k.mc('What is very old?', ['the grandfather’s car', 'the photo', 'the house'], 0)]] }
  ]);
})();
