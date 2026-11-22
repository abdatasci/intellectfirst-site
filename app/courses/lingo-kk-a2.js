/* IF Lingo · Kazakh A2: an original IF Academy course for people who speak English and have finished Kazakh A1.
   Word lines: word | part of speech | meaning in English | example | (empty) | how to say it | the example in English.
   Plan: 20 units and a level test (project doc claude/if-lingo.md). Built so far: units 1 to 13. */
IFX.course({
  id: 'kk-a2', track: 'lang', lang: 'kk-KZ', level: 'A2', next: 'B1', icon: '🇰🇿',
  title: 'Kazakh A2', sub: 'Everyday Kazakh',
  blurb: 'Say where you are from, describe your city and people, order in a restaurant, ask the way, see a doctor and make plans with friends. The first 13 of 20 units, explained in English.',
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
        k.mc('Who has a beard?', ['the father', 'the grandfather', 'the brother'], 0), k.tf('The aunt is the mother’s sister.', true), k.mc('What is very old?', ['the grandfather’s car', 'the photo', 'the house'], 0)]] },

    { id: 'u7', t: 'Сіз … болғансыз ба? Have you ever…?', topic: 'Experiences',
      v: ['Trips and experiences', `
сапар | noun | trip | Бұл қызықты сапар болды. | | sa-PAR | It was an interesting trip.
әсер | noun | impression | Қала маған жақсы әсер етті. | | a-SER | The city made a good impression on me.
бір рет | phrase | once | Мен Алматыда бір рет болғанмын. | | bir ret | I have been to Almaty once.
бала кезімде | phrase | in my childhood | Бала кезімде мен ауылда тұрдым. | | ba-LA ke-zim-DE | In my childhood I lived in a village.
жаттау | verb | to learn by heart | Мен он сөз жаттадым. | | zhat-TAU | I learned ten words by heart.
бітіру | verb | to finish | Мен жұмысты бітірдім. | | bi-ti-ROO | I finished the work.
тамаша | adjective | wonderful | Бұл тамаша қала. | | ta-ma-SHA | This is a wonderful city.
ұлттық тағам | noun | national dish | Бешбармақ — ұлттық тағам. | | oolt-TYQ ta-GHAM | Beshbarmak is a national dish.`],
      g: ['I have been, I have seen: -ған, -ген, -қан, -кен', '<p>For something you have done <b>at some time in your life</b>, add an ending to the verb, then the person ending.</p><table><tr><th>The verb stem</th><th>Ending</th><th>Examples</th></tr><tr><td>hard, ends in a vowel or a voiced sound</td><td><b>-ған</b></td><td>бол → бол<b>ған</b>, бар → бар<b>ған</b>, оқы → оқы<b>ған</b></td></tr><tr><td>soft, ends in a vowel or a voiced sound</td><td><b>-ген</b></td><td>көр → көр<b>ген</b>, же → же<b>ген</b></td></tr><tr><td>ends in к, қ, п, с, т, ш</td><td><b>-қан, -кен</b></td><td>айт → айт<b>қан</b>, іш → іш<b>кен</b></td></tr></table><ul><li>Мен Алматыда болған<b>мын</b>. = I have been to Almaty.</li><li>Сіз бешбармақ жеген<b>сіз</b> бе? = Have you eaten beshbarmak?</li><li>Ол бұл фильмді көрген. = He has seen this film.</li><li>Not: Мен Алматыда болған <b>емеспін</b>. = I have not been to Almaty.</li></ul>', [
        k.mc('Мен Алматыда бол___мын.', ['ған', 'ген', 'кен'], 0),
        k.mc('Сіз бешбармақ же___сіз бе?', ['ген', 'ған', 'қан'], 0),
        k.mc('Ол бұл фильмді көр___.', ['ген', 'ған', 'қан'], 0),
        k.mc('Мен қымыз іш___мін.', ['кен', 'ген', 'ған'], 0),
        k.ord('Мен Алматыда болғанмын')]],
      r: ['A trip to Almaty', 'Былтыр мен Алматыға бардым. Бұл тамаша сапар болды. Мен бұрын Алматыда болған емеспін.\n\nМен тауды көрдім және ұлттық тағам — бешбармақ жедім. Өте дәмді!\n\nМен бірнеше қазақ сөзін жаттадым. Қала маған жақсы әсер етті.\n\nАл сіз Алматыда болғансыз ба?', [
        k.mc('Where did the writer go?', ['Almaty', 'Astana', 'Moscow'], 0), k.tf('The writer had been to Almaty before.', false), k.mc('What did the writer eat?', ['beshbarmak', 'fish', 'cake'], 0)]] },

    { id: 'u8', t: 'Қалай баруға болады? Asking the way', topic: 'Directions',
      v: ['Finding your way', `
қиылыс | noun | crossroads | Қиылысқа дейін барыңыз. | | qi-y-LYS | Go as far as the crossroads.
бағдаршам | noun | traffic light | Бағдаршамнан бұрылыңыз. | | bagh-dar-SHAM | Turn at the traffic light.
бұрылу | verb | to turn | Оңға бұрылу керек. | | boo-ry-LOO | You need to turn right.
өту | verb | to cross, to go past | Көшеден өтіңіз. | | o-TOO | Cross the street.
өткел | noun | crossing | Міне, өткел. | | ot-KEL | Here is the crossing.
адасу | verb | to get lost | Мен адасып қалдым. | | a-da-SOO | I am lost.
көрсету | verb | to show | Картадан көрсетіңізші. | | kor-se-TOO | Please show me on the map.
артында | postposition | behind | Музей банктің артында. | | ar-tyn-DA | The museum is behind the bank.`],
      g: ['Telling someone the way: -ыңыз, -іңіз, -ңыз, -ңіз', '<p>To tell someone politely what to do, add an ending to the verb stem.</p><table><tr><th>The verb stem ends in…</th><th>Ending</th><th>Examples</th></tr><tr><td>a consonant, hard word</td><td><b>-ыңыз</b></td><td>бар → бар<b>ыңыз</b> (go), бұрыл → бұрыл<b>ыңыз</b> (turn)</td></tr><tr><td>a consonant, soft word</td><td><b>-іңіз</b></td><td>өт → өт<b>іңіз</b> (cross), көрсет → көрсет<b>іңіз</b> (show)</td></tr><tr><td>a vowel</td><td><b>-ңыз, -ңіз</b></td><td>қара → қара<b>ңыз</b> (look), сөйле → сөйле<b>ңіз</b> (speak)</td></tr></table><p>Add <b>-шы, -ші</b> to make it softer, like “please”: айтыңыз<b>шы</b>, көрсетіңіз<b>ші</b>.</p><p>The useful question: <b>Музейге қалай баруға болады?</b> = How can I get to the museum? Useful words: <b>оңға</b> (to the right), <b>солға</b> (to the left).</p>', [
        k.mc('Тура бар___.', ['ыңыз', 'іңіз', 'ңыз'], 0),
        k.mc('Көшеден өт___.', ['іңіз', 'ыңыз', 'ңіз'], 0),
        k.mc('Мына жерге қара___.', ['ңыз', 'ыңыз', 'іңіз'], 0),
        k.mc('“Please show me.” = …', ['Көрсетіңізші.', 'Көрсеттіңіз.', 'Көрсетемін.'], 0),
        k.ord('Бағдаршамға дейін тура барыңыз')]],
      r: ['Lost in the city', '— Кешіріңіз, мен адасып қалдым. Музейге қалай баруға болады?\n\n— Бағдаршамға дейін тура барыңыз. Содан кейін солға бұрылыңыз. Өткелден өтіңіз. Музей банктің артында.\n\n— Алыс па?\n\n— Жоқ, жақын. Жаяу бес минут.\n\n— Картадан көрсетіңізші.\n\n— Міне, қараңыз.\n\n— Көп рақмет!', [
        k.mc('Where does the tourist want to go?', ['to the museum', 'to the bank', 'to the park'], 0), k.tf('The museum is far away.', false), k.mc('Where is the museum?', ['behind the bank', 'opposite the park', 'at the crossroads'], 0)]] },

    { id: 'u9', t: 'Дәрігерде. At the doctor’s', topic: 'Health',
      v: ['Feeling ill', `
суық тию | verb | to catch a cold | Маған суық тиді. | | soo-YQ ti-YOO | I have caught a cold.
жөтел | noun | cough | Менде жөтел бар. | | zho-TEL | I have a cough.
тұмау | noun | a cold, runny nose | Балада тұмау бар. | | too-MAU | The child has a cold.
рецепт | noun | prescription | Міне, сіздің рецептіңіз. | | re-TSEPT | Here is your prescription.
таблетка | noun | tablet | Таңертең бір таблетка ішіңіз. | | tab-LET-ka | Take one tablet in the morning.
сезіну | verb | to feel | Өзіңізді қалай сезінесіз? | | se-zi-NOO | How do you feel?
кеңес | noun | advice | Кеңесіңізге рақмет. | | ke-NGES | Thank you for your advice.
болмайды | word | must not, not allowed | Мұнда темекі шегуге болмайды. | | bol-may-DY | You must not smoke here.`],
      g: ['Advice: керек, болады, болмайды', '<p>The person takes the “to” ending: <b>маған</b> (to me), <b>сізге</b> (to you), <b>оған</b> (to him, to her).</p><table><tr><th>Meaning</th><th>Pattern</th><th>Example</th></tr><tr><td>need to</td><td>verb with <b>-у</b> + <b>керек</b></td><td>Сізге демал<b>у керек</b>. = You need to rest.</td></tr><tr><td>may, can</td><td>verb with <b>-уға, -уге</b> + <b>болады</b></td><td>Мұнда отыр<b>уға болады</b>. = You may sit here.</td></tr><tr><td>must not</td><td>verb with <b>-уға, -уге</b> + <b>болмайды</b></td><td>Сізге жұмыс істе<b>уге болмайды</b>. = You must not work.</td></tr></table><p>The verb with <b>-у</b> is the form you find in the dictionary: демалу, ішу, ұйықтау.</p>', [
        k.mc('___ демалу керек. (you, polite)', ['Сізге', 'Сіз', 'Сіздің'], 0),
        k.mc('Маған дәрі ішу ___.', ['керек', 'бар', 'жоқ'], 0),
        k.mc('Сізге жұмыс істеуге ___. (must not)', ['болмайды', 'болады', 'керек'], 0),
        k.mc('“I need to sleep.” = …', ['Маған ұйықтау керек.', 'Мен ұйықтау керек.', 'Маған ұйықтауға болмайды.'], 0),
        k.ord('Сізге көп су ішу керек')]],
      r: ['A visit to the doctor', '— Сәлеметсіз бе. Өзіңізді қалай сезінесіз?\n\n— Жаман. Менде жөтел мен тұмау бар. Басым ауырады.\n\n— Температура бар ма?\n\n— Иә, отыз сегіз.\n\n— Сізге суық тиген. Сізге демалу және көп шай ішу керек. Үш күн жұмыс істеуге болмайды. Міне, рецепт: таңертең және кешке бір таблетка.\n\n— Кеңесіңізге рақмет!', [
        k.mc('What is wrong with the patient?', ['a cough and a cold', 'a bad leg', 'a toothache'], 0), k.tf('The patient can go to work tomorrow.', false), k.mc('When should the patient take a tablet?', ['in the morning and in the evening', 'only at night', 'every hour'], 0)]] },

    { id: 'u10', t: 'Жұмыс және оқу. Work and study', topic: 'Work',
      v: ['At work', `
әріптес | noun | colleague | Бұл менің әріптесім. | | a-rip-TES | This is my colleague.
бастық | noun | boss | Менің бастығым кеңседе. | | bas-TYQ | My boss is in the office.
тәжірибе | noun | experience | Менің тәжірибем бар. | | ta-zhi-ri-BE | I have experience.
жалақы | noun | salary | Жалақы жақсы. | | zha-la-QY | The salary is good.
компания | noun | company | Бұл үлкен компания. | | kom-PA-ni-ya | This is a big company.
қызметкер | noun | employee | Ол жаңа қызметкер. | | qyz-met-KER | He is a new employee.
түйіндеме | noun | CV | Түйіндемеңізді жіберіңіз. | | tu-yin-de-ME | Send your CV.
сұхбат | noun | interview | Ертең менде сұхбат бар. | | sookh-BAT | I have an interview tomorrow.`],
      g: ['Work as… and want to become…', '<p><b>болып</b> (from <b>болу</b>, to be) + <b>жұмыс істеу</b> = to work as.</p><ul><li>Мен инженер <b>болып</b> жұмыс істеймін. = I work as an engineer.</li><li>Ол мұғалім <b>болып</b> жұмыс істейді. = She works as a teacher.</li></ul><p>To say what someone <b>wants to become</b>, use the pattern from Unit 4 with <b>болу</b>:</p><table><tr><th>Who</th><th>Pattern</th><th>Example</th></tr><tr><td>менің</td><td>бол<b>ғым</b> келеді</td><td>Менің дәрігер болғым келеді.</td></tr><tr><td>сіздің</td><td>бол<b>ғыңыз</b> келеді</td><td>Сіздің кім болғыңыз келеді?</td></tr><tr><td>оның</td><td>бол<b>ғысы</b> келеді</td><td>Оның инженер болғысы келеді.</td></tr></table>', [
        k.mc('Мен мұғалім ___ жұмыс істеймін.', ['болып', 'болды', 'болу'], 0),
        k.mc('Менің инженер ___ келеді.', ['болғым', 'болғысы', 'болып'], 0),
        k.mc('Оның дәрігер ___ келеді.', ['болғысы', 'болғым', 'болып'], 0),
        k.mc('“I work as a doctor.” = …', ['Мен дәрігер болып жұмыс істеймін.', 'Мен дәрігер жұмыс істеймін.', 'Менің дәрігер болғым келеді.'], 0),
        k.ord('Мен инженер болып жұмыс істеймін')]],
      r: ['Marat and his sister', 'Менің атым Марат. Мен үлкен компанияда инженер болып жұмыс істеймін.\n\nМенің бастығым жақсы, әріптестерім көңілді. Дүйсенбіде бізде жиналыс болады. Мен бос емеспін: сағат тоғыздан алтыға дейін жұмыс істеймін.\n\nМенің қарындасым университетте оқиды. Оның дәрігер болғысы келеді. Оның тәжірибесі әлі жоқ, бірақ ол көп оқиды.\n\n(әлі = yet · бірақ = but)', [
        k.mc('What is Marat’s job?', ['engineer', 'doctor', 'teacher'], 0), k.tf('There is a meeting on Monday.', true), k.mc('What does his sister want to become?', ['a doctor', 'an engineer', 'a boss'], 0)]] },

    { id: 'u11', t: 'Барайық! Invitations', topic: 'Free time',
      v: ['Inviting and answering', `
шақырту | noun | invitation | Шақыртуыңызға рақмет! | | sha-qyr-TOO | Thank you for your invitation!
көрме | noun | exhibition | Музейде жаңа көрме бар. | | kor-ME | There is a new exhibition at the museum.
той | noun | celebration, party | Сенбіде бізде той болады. | | toy | We have a celebration on Saturday.
келісу | verb | to agree | Мен келісемін. | | ke-li-SOO | I agree.
өкінішке орай | phrase | unfortunately | Өкінішке орай, мен бос емеспін. | | o-ki-nish-KE o-RAY | Unfortunately, I am busy.
қуана-қуана | adverb | with pleasure | Қуана-қуана барамын! | | qoo-a-NA qoo-a-NA | I will go with pleasure!
бос | adjective | free (not busy) | Сіз сенбіде боссыз ба? | | bos | Are you free on Saturday?
ұсыныс | noun | suggestion | Бұл жақсы ұсыныс. | | oo-sy-NYS | This is a good suggestion.`],
      g: ['Let’s… and I can', '<p><b>Let’s…</b> Add an ending to the verb stem.</p><table><tr><th>The verb stem</th><th>Ending</th><th>Examples</th></tr><tr><td>a consonant, hard word</td><td><b>-айық</b></td><td>бар → бар<b>айық</b> (let’s go)</td></tr><tr><td>a consonant, soft word</td><td><b>-ейік</b></td><td>кездес → кездес<b>ейік</b> (let’s meet), көр → көр<b>ейік</b></td></tr><tr><td>a vowel</td><td><b>-йық, -йік</b></td><td>ойна → ойна<b>йық</b> (let’s play), сөйле → сөйле<b>йік</b></td></tr></table><p><b>Can:</b> the verb with <b>-а, -е, -й</b> + <b>алу</b> with the person ending.</p><ul><li>Мен бар<b>а аламын</b>. = I can go.</li><li>Мен бар<b>а алмаймын</b>. = I cannot go.</li><li>Сіз кел<b>е аласыз</b> ба? = Can you come?</li></ul>', [
        k.mc('Киноға бар___!', ['айық', 'ейік', 'йық'], 0),
        k.mc('Сағат жетіде кездес___.', ['ейік', 'айық', 'йік'], 0),
        k.mc('Футбол ойна___!', ['йық', 'айық', 'ейік'], 0),
        k.mc('“I cannot go.” = …', ['Мен бара алмаймын.', 'Мен бара аламын.', 'Мен барайық.'], 0),
        k.ord('Сенбіде көрмеге барайық')]],
      r: ['Plans for Saturday', '— Сәлем, Айгүл! Сен сенбіде боссың ба?\n\n— Иә, боспын.\n\n— Көрмеге барайық!\n\n— Қуана-қуана! Сағат нешеде?\n\n— Сағат үште. Содан кейін Маратта той болады. Барасың ба?\n\n— Шақыртуыңа рақмет, бірақ, өкінішке орай, кешке бара алмаймын. Мен бос емеспін.\n\n— Өкінішті. Онда сағат үште музейдің жанында кездесейік.\n\n— Келісемін!\n\n(өкінішті = that is a pity · онда = then)', [
        k.mc('Where are they going on Saturday at three?', ['to an exhibition', 'to the cinema', 'to a celebration'], 0), k.tf('Aigul is going to Marat’s celebration.', false), k.mc('Where will they meet?', ['near the museum', 'at Marat’s home', 'at the café'], 0)]] },

    { id: 'u12', t: 'Ең суық ай. Weather and comparing', topic: 'Weather',
      v: ['The forecast', `
болжам | noun | forecast | Ертеңгі болжам қандай? | | bol-ZHAM | What is the forecast for tomorrow?
найзағай | noun | thunderstorm, lightning | Жазда найзағай жиі болады. | | nay-za-GHAY | In summer there is often a thunderstorm.
аяз | noun | frost | Бүгін аяз. | | a-YAZ | There is a frost today.
қатты | adjective | strong, hard | Бүгін қатты жел. | | qat-TY | There is a strong wind today.
шуақты | adjective | sunny | Бүгін күн шуақты. | | shoo-aq-TY | It is sunny today.
бұлтты | adjective | cloudy | Бүгін күн бұлтты. | | boolt-TY | It is cloudy today.
ең | word | the most | Бұл ең үлкен қала. | | eng | This is the biggest city.
қарағанда | word | compared with, than | Алматы Қостанайға қарағанда жылырақ. | | qa-ra-ghan-DA | Almaty is warmer than Kostanay.`],
      g: ['The coldest, and compared with', '<p><b>ең</b> + adjective = the most. The adjective does not change.</p><ul><li><b>ең</b> үлкен = the biggest</li><li><b>ең</b> суық = the coldest</li><li>Қаңтар — <b>ең</b> суық ай. = January is the coldest month.</li></ul><p>In Unit 2 you compared with <b>-дан</b>. A second way: the “to” ending (<b>-ға, -ге, -қа, -ке</b>) + <b>қарағанда</b>.</p><ul><li>Алматы Қостанай<b>ға қарағанда</b> жылырақ. = Almaty is warmer than Kostanay.</li><li>Бүгін кеше<b>ге қарағанда</b> суығырақ. = Today is colder than yesterday.</li></ul><p>Look: <b>суық</b> → <b>суығырақ</b>. Before the ending, <b>қ</b> becomes <b>ғ</b>.</p><p>For tomorrow’s weather use <b>болады</b> (will be): Ертең суық <b>болады</b>.</p>', [
        k.mc('Қаңтар — ___ суық ай.', ['ең', 'өте', 'көп'], 0),
        k.mc('Алматы Қостанай___ қарағанда жылырақ.', ['ға', 'да', 'дан'], 0),
        k.mc('Ертең суық ___.', ['болады', 'болды', 'бар'], 0),
        k.tf('“ең үлкен” means “the biggest”.', true),
        k.ord('Қаңтар ең суық ай')]],
      r: ['The weather forecast', 'Ауа райы болжамы.\n\nБүгін Қостанайда күн бұлтты, он бес градус суық. Ертең суығырақ болады: жиырма бес градус суық және қатты жел. Бұл қатты аяз!\n\nАлматы Қостанайға қарағанда жылырақ: екі градус жылы, күн шуақты.\n\nҚаңтар — Қазақстандағы ең суық ай. Жазда жақсырақ: жылы, кейде найзағай болады.', [
        k.mc('What will the temperature be in Kostanay tomorrow?', ['minus 25', 'minus 15', 'plus 2'], 0), k.tf('Almaty is warmer than Kostanay.', true), k.mc('Which is the coldest month?', ['January', 'July', 'March'], 0)]] },

    { id: 'u13', t: 'Үй шаруасы. Jobs at home', topic: 'Home',
      v: ['Cleaning day', `
ыдыс | noun | dishes | Мен ыдыс жуамын. | | y-DYS | I wash the dishes.
жуу | verb | to wash | Ол көлік жуып жатыр. | | zhoo-OO | He is washing the car.
кір жуу | verb | to wash clothes | Анам кір жуып жатыр. | | kir zhoo-OO | Mum is washing the clothes.
шаңсорғыш | noun | vacuum cleaner | Шаңсорғыш қайда? | | shang-sor-GHYSH | Where is the vacuum cleaner?
қоқыс | noun | rubbish | Қоқысты шығарыңызшы. | | qo-QYS | Please take out the rubbish.
үтіктеу | verb | to iron | Мен көйлек үтіктеймін. | | u-tik-TEU | I iron a shirt.
тәртіп | noun | order, tidiness | Бөлмеде тәртіп. | | tar-TIP | The room is tidy.
көмектесу | verb | to help | Мен анама көмектесемін. | | ko-mek-te-SOO | I help my mother.`],
      g: ['First this, then that: joining actions with -п', '<p>In Unit 3 you used the <b>-п</b> form with жатыр. The same form joins two actions done by one person: <i>do this, and then that</i>. Only the last verb takes the person ending.</p><table><tr><th>Two sentences</th><th>One sentence</th></tr><tr><td>Мен ыдыс жуамын. Мен демаламын.</td><td>Мен ыдыс жу<b>ып</b>, демаламын.</td></tr><tr><td>Ол бөлмені жинайды. Ол кетеді.</td><td>Ол бөлмені жина<b>п</b>, кетеді.</td></tr><tr><td>Біз шай ішеміз. Біз жұмысқа барамыз.</td><td>Біз шай іш<b>іп</b>, жұмысқа барамыз.</td></tr></table><p>Remember: <b>-п</b> after a vowel, <b>-ып</b> in hard words, <b>-іп</b> in soft words.</p>', [
        k.mc('Мен ыдыс жу___, қоқыс шығарамын.', ['ып', 'іп', 'п'], 0),
        k.mc('Ол бөлмені жина___, демалады.', ['п', 'ып', 'іп'], 0),
        k.mc('Біз шай іш___, жұмысқа барамыз.', ['іп', 'ып', 'п'], 0),
        k.tf('In “Мен ыдыс жуып, демаламын” only the last verb has the person ending.', true),
        k.ord('Мен ыдыс жуып демаламын')]],
      r: ['Saturday is cleaning day', 'Сенбі — үй жинайтын күн. Біздің отбасымызда бәрі көмектеседі.\n\nАнам: «Кім не істейді?»\n\nӘкем: «Мен ыдыс жуып, қоқыс шығарамын».\n\nМен: «Мен бөлмемді жинаймын. Шаңсорғыш қайда?»\n\nӘпкем: «Мен кір жуып, содан кейін үтіктеймін».\n\nЕкі сағаттан кейін пәтерде тәртіп. Енді демалуға болады!\n\n(үй жинайтын күн = the day for cleaning the house · бәрі = everyone · енді = now)', [
        k.mc('Who will wash the dishes?', ['the father', 'the mother', 'the sister'], 0), k.tf('The sister asks for the vacuum cleaner.', false), k.mc('Which day is cleaning day?', ['Saturday', 'Sunday', 'Friday'], 0)]] }
  ]);
})();
