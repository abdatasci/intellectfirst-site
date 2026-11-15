/* General English A1, units 3–8 (original IF Academy material). */
(function () {
  var K = IFX.k;
  IFX.make('ge-a1', [
    { id: 'u3', t: 'Every day', topic: 'Daily routine',
      v: ['My daily routine', `
get up | phrasal verb | to leave your bed in the morning | I get up at seven o'clock. | вставать
have breakfast | phrase | to eat the first meal of the day | We have breakfast at home. | завтракать
go to work | phrase | to travel to your job | My mum goes to work by bus. | ходить на работу
start | verb | to begin | Lessons start at nine. | начинать(ся)
finish | verb | to end | Work finishes at six. | заканчивать(ся)
get home | phrase | to arrive at your house | I get home at half past six. | приходить домой
have a shower | phrase | to wash under running water | She has a shower in the evening. | принимать душ
go to bed | phrase | to go to sleep at night | I usually go to bed at eleven. | ложиться спать`],
      g: ['Present simple: he, she, it', "<p>With <b>he, she, it</b> the verb ends in <b>-s</b>: she work<b>s</b>, he get<b>s</b> up, it start<b>s</b>.</p><table><tr><td>go, do, watch</td><td>go<b>es</b>, do<b>es</b>, watch<b>es</b></td></tr><tr><td>have</td><td><b>has</b></td></tr><tr><td>Negative</td><td>He <b>doesn't</b> work on Sundays.</td></tr><tr><td>Question</td><td><b>Does</b> she get up early? — Yes, she <b>does</b>.</td></tr></table>",
        [K.mc('My brother ___ up at six.', ['get', 'gets', 'getting'], 1),
         K.mc('She ___ to work by taxi.', ['go', 'goes', 'gos'], 1),
         K.mc('He ___ have breakfast.', ["don't", "doesn't", "isn't"], 1),
         K.mc('___ your father work at the weekend?', ['Do', 'Does', 'Is'], 1),
         K.gap('Dana ___ (have) a shower in the morning.', 'has'),
         K.ord('What time does the lesson start?')]],
      r: ['A day in the life of a nurse', "Aigerim is a nurse. She works at a hospital in Kostanay. She gets up at half past five every morning, has a quick shower and drinks a cup of tea. She doesn't have breakfast at home — she has breakfast at the hospital with her friends.\n\nHer work starts at seven and finishes at three. After work, she goes to the gym or meets her sister. She gets home at about six, cooks dinner and watches TV. She goes to bed early, at ten o'clock, because she is always tired!",
        [K.mc('Where does Aigerim work?', ['at a school', 'at a hospital', 'at a gym'], 1),
         K.mc('What time does she get up?', ['5:30', '6:30', '7:00'], 0),
         K.tf('She has breakfast at home.', false),
         K.mc('When does her work finish?', ['at 3', 'at 6', 'at 7'], 0),
         K.tf('She goes to bed at ten.', true)]] },

    { id: 'u4', t: 'Food and shopping', topic: 'Food',
      v: ['At the market', `
bread | noun | a basic food made from flour and baked | I buy bread every day. | хлеб
cheese | noun | a food made from milk | Do you like cheese? | сыр
vegetables | noun | plants like carrots and potatoes that we eat | We need some vegetables. | овощи
fruit | noun | apples, bananas, oranges and so on | Fruit is good for you. | фрукты
a bottle of | phrase | a container for water, milk, juice | Can I have a bottle of water? | бутылка
a kilo of | phrase | 1,000 grams of something | A kilo of apples, please. | килограмм
How much is it? | phrase | a question about the price | How much is it? — It's 500 tenge. | Сколько стоит?
expensive | adjective | costing a lot of money | Coffee here is very expensive. | дорогой`],
      g: ['some, any, How much / How many', "<table><tr><td><b>some</b></td><td>positive: There's <b>some</b> cheese. I need <b>some</b> eggs.</td></tr><tr><td><b>any</b></td><td>negative and questions: We haven't got <b>any</b> milk. Is there <b>any</b> bread?</td></tr><tr><td><b>How many</b> + plural</td><td><b>How many</b> apples do you want?</td></tr><tr><td><b>How much</b> + uncountable / price</td><td><b>How much</b> rice? <b>How much</b> is it?</td></tr></table>",
        [K.mc('We need ___ potatoes.', ['some', 'any', 'a'], 0),
         K.mc('There isn\'t ___ milk in the fridge.', ['some', 'any', 'many'], 1),
         K.mc('How ___ eggs do you need?', ['much', 'many'], 1),
         K.mc('How ___ is this jacket?', ['much', 'many'], 0),
         K.gap('Are there ___ bananas? (some/any)', 'any'),
         K.ord('Can I have a kilo of tomatoes, please?')]],
      r: ['At the market on Saturday', "Every Saturday, Marat and his grandmother go to the central market. They buy fruit, vegetables, bread and cheese for the week. Marat's grandmother always asks, 'How much is it?' and she sometimes says, 'That's too expensive!'\n\nThis week they buy two kilos of potatoes, a kilo of apples, some carrots and a big piece of cheese. They don't buy any meat because there is some chicken at home. At the end, Marat buys a bottle of juice and some bread. The bread is still warm!",
        [K.mc('When do they go to the market?', ['on Fridays', 'on Saturdays', 'on Sundays'], 1),
         K.mc('How many kilos of potatoes do they buy?', ['one', 'two', 'three'], 1),
         K.tf('They buy some meat.', false),
         K.mc('Why don\'t they buy meat?', ['it is expensive', 'there is chicken at home', 'the shop is closed'], 1),
         K.tf('The bread is warm.', true)]] },

    { id: 'u5', t: 'My town', topic: 'Places',
      v: ['Places in a town', `
bank | noun | a place where you keep money | Is there a bank near here? | банк
pharmacy | noun | a shop that sells medicine | The pharmacy is next to the supermarket. | аптека
post office | noun | a place where you send letters and parcels | I need to go to the post office. | почта
bus stop | noun | a place where the bus stops for passengers | The bus stop is opposite the school. | остановка
square | noun | an open area in the centre of a town | There's a big square in the city centre. | площадь
next to | preposition | very near, at the side of | The café is next to the bank. | рядом с
opposite | preposition | on the other side, facing | The park is opposite my house. | напротив
between | preposition | in the space in the middle of two things | The shop is between the bank and the café. | между`],
      g: ['there is / there are + places', "<table><tr><td>Singular</td><td><b>There's</b> a bank in Lenin Street.</td></tr><tr><td>Plural</td><td><b>There are</b> two pharmacies.</td></tr><tr><td>Negative</td><td><b>There isn't</b> a cinema. <b>There aren't</b> any hotels.</td></tr><tr><td>Question</td><td><b>Is there</b> a post office near here? — Yes, there is. It's <b>next to</b> the bank.</td></tr></table>",
        [K.mc('___ a good café near my flat.', ['There is', 'There are', 'It is'], 0),
         K.mc('There ___ three parks in our town.', ['is', 'are', 'be'], 1),
         K.mc('___ there a pharmacy near here?', ['Are', 'Is', 'Do'], 1),
         K.mc('The bank is ___ the café and the shop.', ['between', 'opposite', 'next'], 0),
         K.gap('There ___ (not) any hotels in my village.', "aren't", 'are not'),
         K.ord('Is there a bus stop near the school?')]],
      r: ['My town: Rudny', "I live in Rudny. It's a small town near Kostanay. There are about 120,000 people here. In the centre, there's a big square with a fountain, and opposite the square there's a theatre. There are a lot of shops and cafés.\n\nMy flat is in a quiet street. There's a pharmacy next to my building and a bus stop opposite it. There isn't a cinema in my street, but there's a big one in the centre. My favourite place is the park between the school and the hospital — it's beautiful in summer.",
        [K.mc('Where is Rudny?', ['near Almaty', 'near Kostanay', 'near Astana'], 1),
         K.mc('What is opposite the square?', ['a theatre', 'a hospital', 'a pharmacy'], 0),
         K.tf('There is a cinema in the writer\'s street.', false),
         K.mc('What is next to the writer\'s building?', ['a bus stop', 'a pharmacy', 'a park'], 1),
         K.mc('Where is the park?', ['between the school and the hospital', 'next to the theatre', 'opposite the flat'], 0)]] },

    { id: 'u6', t: 'Free time', topic: 'Hobbies and abilities',
      v: ['What I can do and what I like', `
swim | verb | to move through water using your arms and legs | Can you swim? | плавать
ride a bike | phrase | to travel on a bicycle | I ride a bike in the park. | кататься на велосипеде
play the guitar | phrase | to make music with a guitar | My brother plays the guitar. | играть на гитаре
cook | verb | to make food hot and ready to eat | My dad can cook very well. | готовить
dance | verb | to move your body to music | She loves dancing. | танцевать
draw | verb | to make a picture with a pencil | I can't draw very well. | рисовать
watch films | phrase | to look at films on TV or at the cinema | We like watching films on Friday. | смотреть фильмы
go for a walk | phrase | to walk for pleasure | Let's go for a walk after lunch. | гулять`],
      g: ['can / can\'t and like + -ing', "<table><tr><td><b>can</b> (ability)</td><td>I <b>can</b> swim. She <b>can't</b> drive. <b>Can</b> you cook? — Yes, I can.</td></tr><tr><td>No -s, no to</td><td>He <b>can play</b> (not <s>cans</s>, not <s>can to play</s>).</td></tr><tr><td><b>like / love / hate + -ing</b></td><td>I <b>love dancing</b>. He <b>doesn't like cooking</b>.</td></tr></table>",
        [K.mc('My sister ___ speak English and French.', ['can', 'cans', 'can to'], 0),
         K.mc('___ you ride a bike?', ['Do', 'Can', 'Are'], 1),
         K.mc('I love ___ to music.', ['listen', 'listening', 'listens'], 1),
         K.mc('He ___ swim. He is afraid of water.', ["can't", "doesn't", 'not'], 0),
         K.gap('Do you like ___ (cook)?', 'cooking'),
         K.ord('She can play the guitar very well.')]],
      r: ['Our free time', "Hi, I'm Timur and this is my family. In our free time we do different things.\n\nMy mum loves cooking. She can make fantastic plov! My dad likes going for walks with our dog. My sister Aruzhan is twelve. She can dance and she can draw really well. She hates watching football.\n\nAnd me? I can play the guitar and I can ride a bike, but I can't swim. I'd like to learn this summer. On Friday evenings we all watch films together — that's my favourite time of the week.",
        [K.mc('What can Timur\'s mum cook?', ['soup', 'plov', 'pizza'], 1),
         K.mc('Who likes going for walks?', ['Timur', 'his dad', 'his sister'], 1),
         K.tf('Aruzhan loves watching football.', false),
         K.mc('What can\'t Timur do?', ['swim', 'ride a bike', 'play the guitar'], 0),
         K.mc('What do they do on Friday evenings?', ['go for a walk', 'cook', 'watch films'], 2)]] },

    { id: 'u7', t: 'Right now', topic: 'Clothes and weather',
      v: ['Clothes and the weather', `
coat | noun | a long warm jacket for cold weather | Wear your coat — it's cold! | пальто
boots | noun | strong shoes that cover your ankles | I need new winter boots. | сапоги, ботинки
hat | noun | something you wear on your head | It's snowing — put on your hat. | шапка
sunny | adjective | with a lot of sun | It's sunny today. | солнечный
raining | verb (now) | water is falling from the sky | Take an umbrella — it's raining. | идёт дождь
snowing | verb (now) | snow is falling from the sky | Look! It's snowing! | идёт снег
cold | adjective | with a low temperature | Kostanay is very cold in January. | холодный
wear | verb | to have clothes on your body | She's wearing a red dress. | носить, быть одетым`],
      g: ['Present continuous: now', "<p>Use <b>am / is / are + -ing</b> for actions happening <b>now</b>.</p><table><tr><td>Positive</td><td>I<b>'m wearing</b> a coat. It<b>'s raining</b>.</td></tr><tr><td>Negative</td><td>She <b>isn't working</b> today.</td></tr><tr><td>Question</td><td>What <b>are</b> you <b>doing</b>? <b>Is</b> it <b>snowing</b>?</td></tr><tr><td>Spelling</td><td>sit → si<b>tt</b>ing · make → ma<b>k</b>ing</td></tr></table>",
        [K.mc('Look! It ___.', ['snows', 'is snowing', 'snowing'], 1),
         K.mc('What ___ you doing now?', ['do', 'are', 'is'], 1),
         K.mc('She ___ a blue coat today.', ['wears', "'s wearing", 'wear'], 1),
         K.gap('We ___ (not / watch) TV now.', "aren't watching", 'are not watching', "'re not watching"),
         K.mc('Spelling: run → ___', ['runing', 'running', 'runnning'], 1),
         K.ord('Are you listening to me?')]],
      r: ['A message from Almaty', "Hi Dana! I'm writing this message from a café in Almaty. It's very different from Kostanay! The sun is shining and it isn't cold at all. I'm not wearing my winter coat — just a jacket.\n\nRight now, I'm sitting by the window and drinking hot chocolate. Outside, people are walking in the park and children are playing. Some tourists are taking photos of the mountains. What are you doing? Is it snowing in Kostanay? Write soon! — Aliya",
        [K.mc('Where is Aliya now?', ['in Kostanay', 'in a café in Almaty', 'at home'], 1),
         K.mc('What\'s the weather like?', ['snowing', 'sunny', 'raining'], 1),
         K.tf('Aliya is wearing her winter coat.', false),
         K.mc('What is she drinking?', ['coffee', 'tea', 'hot chocolate'], 2),
         K.mc('What are the tourists doing?', ['playing', 'taking photos', 'walking'], 1)]] },

    { id: 'u8', t: 'Last weekend', topic: 'The past',
      v: ['What I did', `
yesterday | adverb | the day before today | I was at home yesterday. | вчера
last weekend | phrase | the weekend before this one | What did you do last weekend? | в прошлые выходные
visit | verb | to go and see a person or place | We visited my grandparents. | навещать, посещать
stay | verb | to remain in a place | We stayed at home on Sunday. | оставаться
went | verb (past of go) | travelled somewhere (in the past) | I went to the cinema. | ходил, ездил
saw | verb (past of see) | looked at, watched (in the past) | We saw a good film. | видел
bought | verb (past of buy) | got something with money (in the past) | She bought new shoes. | купил
ago | adverb | before now | I started English two years ago. | назад`],
      g: ['Past simple: was / were and verbs', "<table><tr><td><b>was / were</b></td><td>I <b>was</b> tired. They <b>were</b> at home. <b>Were</b> you at school?</td></tr><tr><td>Regular verbs: <b>-ed</b></td><td>visit → visit<b>ed</b> · stay → stay<b>ed</b> · study → stud<b>ied</b></td></tr><tr><td>Irregular verbs</td><td>go → <b>went</b> · see → <b>saw</b> · buy → <b>bought</b> · have → <b>had</b></td></tr><tr><td>Negative / question</td><td>I <b>didn't go</b>. <b>Did</b> you <b>see</b> it?</td></tr></table>",
        [K.mc('I ___ at home last night.', ['was', 'were', 'am'], 0),
         K.mc('We ___ to the cinema on Saturday.', ['go', 'went', 'goed'], 1),
         K.mc('She ___ her grandmother yesterday.', ['visit', 'visited', 'visiting'], 1),
         K.mc('___ you see the match?', ['Do', 'Did', 'Were'], 1),
         K.gap('They ___ (not / buy) anything.', "didn't buy", 'did not buy'),
         K.ord('What did you do last weekend?')]],
      r: ['My weekend', "Last weekend was great. On Saturday morning I visited my grandparents in their village. My grandmother made baursaks and we had tea in the garden. In the afternoon, I went to the shopping centre with my cousin. I bought a new phone case and she bought some books.\n\nOn Sunday it was cold and rainy, so we stayed at home. In the evening we saw an old comedy on TV — it was very funny. I didn't do my homework, so on Monday morning I was busy!",
        [K.mc('Who did the writer visit on Saturday?', ['friends', 'grandparents', 'a teacher'], 1),
         K.mc('What did the grandmother make?', ['plov', 'baursaks', 'a cake'], 1),
         K.mc('What did the writer buy?', ['books', 'a phone case', 'shoes'], 1),
         K.tf('The weather was nice on Sunday.', false),
         K.tf('The writer did the homework on Sunday.', false)]] }
  ]);
})();
