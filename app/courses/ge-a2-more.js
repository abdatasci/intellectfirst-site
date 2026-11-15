/* General English A2, units 4–8 (original IF Academy material). */
(function () {
  var K = IFX.k;
  IFX.make('ge-a2', [
    { id: 'u4', t: 'Stories from the past', topic: 'Life stories',
      v: ['Telling a story', `
suddenly | adverb | very quickly and without warning | Suddenly, the lights went out. | вдруг
at first | phrase | at the beginning | At first, I didn't like the city. | сначала
in the end | phrase | finally, after some time | In the end, we found the hotel. | в конце концов
fall over | phrasal verb | to fall to the ground | He fell over on the ice. | падать
lose | verb | to not be able to find something | I lost my keys yesterday. | терять
meet | verb | to see someone for the first time or by chance | They met at university. | встречать, знакомиться
realise | verb | to suddenly understand | I realised I was on the wrong bus. | осознать
happen | verb | to take place | What happened next? | случаться`],
      g: ['Past continuous and past simple', "<p>Use the <b>past continuous</b> (was / were + -ing) for the background — an action in progress. Use the <b>past simple</b> for the short action that interrupts it.</p><table><tr><td>Background</td><td>I <b>was walking</b> home…</td></tr><tr><td>Interruption</td><td>…when it <b>started</b> to rain.</td></tr><tr><td>with <i>while</i></td><td><b>While</b> we <b>were having</b> dinner, the phone <b>rang</b>.</td></tr></table>",
        [K.mc('I ___ TV when you called.', ['watched', 'was watching', 'am watching'], 1),
         K.mc('She ___ over while she was running.', ['fell', 'was falling', 'falls'], 0),
         K.mc('What ___ you doing at 8 last night?', ['did', 'were', 'was'], 1),
         K.gap('While they ___ (travel), they lost their passports.', 'were travelling', 'were traveling'),
         K.mc('It was snowing when we ___ the airport.', ['were leaving', 'left', 'leave'], 1),
         K.ord('I was waiting for the bus when I saw her.')]],
      r: ['A lucky mistake', "Two years ago, Dina was travelling from Kostanay to Astana by train. She was reading a book and she didn't notice her station. Suddenly, she realised the train was leaving Astana! At first, she was very worried.\n\nShe got off at the next small town. While she was waiting for a train back, she started talking to a young woman. Her name was Saule, and she was a teacher, like Dina. They talked for two hours. In the end, Saule became Dina's best friend — and now they work at the same school!",
        [K.mc('Where was Dina going?', ['to Almaty', 'to Astana', 'to Kostanay'], 1),
         K.mc('Why did she miss her station?', ['she was sleeping', 'she was reading', 'she was talking'], 1),
         K.tf('Dina met Saule on the train.', false),
         K.mc('What is Saule\'s job?', ['doctor', 'teacher', 'driver'], 1),
         K.tf('Now they work at the same school.', true)]] },

    { id: 'u5', t: 'Plans and predictions', topic: 'The future',
      v: ['Talking about the future', `
plan | noun / verb | something you have decided to do | What are your plans for the summer? | план, планировать
book | verb | to arrange a hotel, ticket, etc. | We've booked a hotel by the sea. | бронировать
probably | adverb | almost certainly | It will probably rain tomorrow. | вероятно
definitely | adverb | certainly, with no doubt | I'll definitely call you. | точно, определённо
promise | verb | to say you will certainly do something | I promise I'll help you. | обещать
forecast | noun | what the weather will be like | The forecast says it will be sunny. | прогноз
decide | verb | to choose after thinking | I've decided to learn Korean. | решать
in the future | phrase | at a time after now | In the future, robots will do many jobs. | в будущем`],
      g: ['be going to and will', "<table><tr><td><b>be going to</b></td><td>plans you've already decided: I<b>'m going to</b> visit my aunt in July.</td></tr><tr><td><b>will</b> — predictions</td><td>I think it <b>will</b> be cold tomorrow. People <b>won't</b> use cash in the future.</td></tr><tr><td><b>will</b> — offers, promises, quick decisions</td><td>I<b>'ll</b> help you. I<b>'ll</b> have the soup, please.</td></tr></table>",
        [K.mc('I\'ve decided. I ___ study medicine.', ["'m going to", "'ll"], 0),
         K.mc('"The phone\'s ringing." "I ___ answer it."', ["'m going to", "'ll"], 1),
         K.mc('I think Kazakhstan ___ win the match.', ['will', 'is going'], 0),
         K.gap('Don\'t worry — I ___ (not) tell anyone. (will)', "won't", 'will not'),
         K.mc('Look at those clouds! It ___ rain.', ["'s going to", 'will to'], 0),
         K.ord('What are you going to do this weekend?')]],
      r: ['Arman\'s big year', "Next year is going to be a big year for Arman. He's finishing school in May, and in September he's going to start university in Almaty. He's going to study computer science. He has already booked a room in the student hostel.\n\nWhat will university be like? Arman thinks it will probably be difficult at first, but he's sure he'll make new friends. His mother is a bit sad. 'I'll miss you,' she says. 'Don't worry, Mum,' Arman answers. 'I'll call you every day. I promise!'",
        [K.mc('When is Arman finishing school?', ['in May', 'in September', 'next week'], 0),
         K.mc('What is he going to study?', ['medicine', 'computer science', 'law'], 1),
         K.tf('He hasn\'t found a place to live yet.', false),
         K.mc('What does Arman think university will be like at first?', ['easy', 'difficult', 'boring'], 1),
         K.mc('What does Arman promise?', ['to come home every week', 'to call every day', 'to study hard'], 1)]] },

    { id: 'u6', t: 'Comparing places', topic: 'Cities and countries',
      v: ['Describing places', `
crowded | adjective | full of people | The metro is very crowded in the morning. | переполненный
peaceful | adjective | quiet and calm | The village is very peaceful. | спокойный, мирный
modern | adjective | new and using the latest ideas | Astana has many modern buildings. | современный
historic | adjective | important in history; old | Turkistan is a historic city. | исторический
polluted | adjective | with dirty air or water | Big cities are often polluted. | загрязнённый
safe | adjective | not dangerous | It's a very safe area at night. | безопасный
population | noun | the number of people who live in a place | Almaty has a population of two million. | население
capital | noun | the city where the government is | Astana is the capital of Kazakhstan. | столица`],
      g: ['Comparatives and superlatives', "<table><tr><td>Short adjectives</td><td>cold → cold<b>er</b> → the cold<b>est</b> · big → big<b>ger</b> → the big<b>gest</b></td></tr><tr><td>-y</td><td>busy → bus<b>ier</b> → the bus<b>iest</b></td></tr><tr><td>Long adjectives</td><td>modern → <b>more</b> modern → <b>the most</b> modern</td></tr><tr><td>Irregular</td><td>good → <b>better</b> → <b>the best</b> · bad → <b>worse</b> → <b>the worst</b></td></tr><tr><td>Compare with <b>than</b></td><td>Almaty is bigger <b>than</b> Kostanay.</td></tr></table>",
        [K.mc('Astana is ___ than Kostanay.', ['bigger', 'more big', 'biggest'], 0),
         K.mc('This is the ___ building in the city.', ['most modern', 'modernest', 'more modern'], 0),
         K.mc('The weather today is ___ than yesterday.', ['bad', 'worse', 'worst'], 1),
         K.gap('January is the ___ (cold) month of the year.', 'coldest'),
         K.mc('Our street is ___ than the city centre.', ['peaceful', 'more peaceful', 'the most peaceful'], 1),
         K.ord('Which is the most beautiful city in your country?')]],
      r: ['Two capitals', "Kazakhstan has had two famous capitals. Almaty was the capital until 1997. It's still the biggest city in the country, with a population of over two million. It's older and greener than Astana, and the mountains are very close. But it's also more crowded and more polluted, especially in winter.\n\nAstana became the capital in 1997. It's smaller than Almaty, but it's growing fast. It's one of the most modern cities in Central Asia, with amazing buildings. The winters there are much colder and windier — it's one of the coldest capitals in the world!",
        [K.mc('Which city is bigger?', ['Almaty', 'Astana'], 0),
         K.mc('When did Astana become the capital?', ['in 1991', 'in 1997', 'in 2007'], 1),
         K.tf('Almaty is more polluted than Astana.', true),
         K.mc('Which city is near the mountains?', ['Almaty', 'Astana'], 0),
         K.mc('Astana is one of the ___ capitals in the world.', ['warmest', 'coldest', 'oldest'], 1)]] },

    { id: 'u7', t: 'Experiences', topic: 'Life experiences',
      v: ['Have you ever…?', `
abroad | adverb | in or to another country | Have you ever been abroad? | за границей, за границу
fly | verb | to travel by plane | I've never flown in a helicopter. | летать
try | verb | to do or taste something to see what it is like | Have you ever tried sushi? | пробовать
win | verb | to be first in a competition | She has won three medals. | выигрывать
famous | adjective | known by many people | I've met a famous singer! | знаменитый
experience | noun | something that happens to you | It was an amazing experience. | опыт, впечатление
once | adverb | one time | I've been to Turkey once. | один раз
twice | adverb | two times | We've seen that film twice. | дважды`],
      g: ['Present perfect: ever, never', "<p>Use the <b>present perfect</b> (have / has + past participle) for experiences in your life — we don't say <i>when</i>.</p><table><tr><td>Positive</td><td>I<b>'ve been</b> to Moscow. She<b>'s tried</b> horse riding.</td></tr><tr><td>Negative</td><td>I<b>'ve never</b> flown. He <b>hasn't</b> seen the sea.</td></tr><tr><td>Question</td><td><b>Have</b> you <b>ever</b> met a famous person? — Yes, I have.</td></tr><tr><td>Past simple for details</td><td>Yes, I have. I <b>met</b> a footballer last year.</td></tr></table><p>Participles: be → <b>been</b>, see → <b>seen</b>, eat → <b>eaten</b>, fly → <b>flown</b>, win → <b>won</b>.</p>",
        [K.mc('Have you ever ___ to Turkey?', ['went', 'been', 'go'], 1),
         K.mc('I ___ never eaten sushi.', ['have', 'has', 'did'], 0),
         K.mc('She ___ won a competition.', ['has', 'have', 'is'], 0),
         K.mc('"Have you seen this film?" "Yes, I saw it ___."', ['ever', 'last week', 'never'], 1),
         K.gap('He has never ___ (fly) in a plane.', 'flown'),
         K.ord('Have you ever tried horse riding?')]],
      r: ['Things I\'ve never done', "I'm twenty-two and I've done some exciting things. I've been abroad twice — to Turkey and to Georgia. I've tried paragliding, and I've seen a famous band in concert in Almaty.\n\nBut there are a lot of things I've never done. I've never flown on a long flight — the longest flight I've taken is three hours. I've never seen the ocean, only the Caspian Sea. And, believe it or not, I've never learned to drive! This year I want to change that. I've already booked my first driving lesson.",
        [K.mc('How many times has the writer been abroad?', ['once', 'twice', 'three times'], 1),
         K.tf('The writer has tried paragliding.', true),
         K.mc('What has the writer never seen?', ['the Caspian Sea', 'the ocean', 'a concert'], 1),
         K.tf('The writer can drive.', false),
         K.mc('What has the writer booked?', ['a flight', 'a driving lesson', 'a concert'], 1)]] },

    { id: 'u8', t: 'Health and advice', topic: 'Health',
      v: ['Feeling ill', `
headache | noun | a pain in your head | I've got a terrible headache. | головная боль
cough | noun / verb | the noise when air comes out of your throat | He's got a bad cough. | кашель, кашлять
temperature | noun | when your body is hotter than normal | She has a high temperature. | температура
medicine | noun | something you take to get better | Take this medicine twice a day. | лекарство
appointment | noun | a time to see a doctor | I've got an appointment at 3. | запись (к врачу)
rest | verb / noun | to relax and not work | You should rest for a few days. | отдыхать
exercise | noun / verb | physical activity to stay healthy | Regular exercise is important. | упражнения
healthy | adjective | good for your body | Fruit is healthy food. | здоровый`],
      g: ['should, must, have to', "<table><tr><td><b>should / shouldn't</b> — advice</td><td>You <b>should</b> drink more water. You <b>shouldn't</b> go to school today.</td></tr><tr><td><b>must / mustn't</b> — strong rule or necessity</td><td>You <b>must</b> take this medicine. You <b>mustn't</b> smoke here.</td></tr><tr><td><b>have to / don't have to</b></td><td>I <b>have to</b> see the doctor. You <b>don't have to</b> come (it isn't necessary).</td></tr></table>",
        [K.mc('You look tired. You ___ go to bed early.', ['should', "shouldn't", 'mustn\'t'], 0),
         K.mc('You ___ eat so much sugar. It\'s bad for you.', ['should', "shouldn't", 'have to'], 1),
         K.mc('Tomorrow is Sunday, so I ___ get up early.', ["don't have to", "mustn't", 'should'], 0),
         K.mc('Patients ___ use phones in this room. (It\'s forbidden.)', ["don't have to", "mustn't"], 1),
         K.gap('She ___ (have to) take her medicine every morning.', 'has to'),
         K.ord('You should see a doctor about that cough.')]],
      r: ['Ask the doctor', "Dear Doctor,\nI'm sixteen and I always feel tired. I often have headaches in the afternoon. I study a lot and I go to bed after midnight. What should I do? — Tired Teen\n\nDear Tired Teen,\nYou probably don't sleep enough. Teenagers need eight to ten hours of sleep. You should go to bed before eleven, and you shouldn't use your phone in bed. You should also drink more water and eat breakfast every day. Try to do some exercise — a 30-minute walk is enough. If the headaches don't stop, you must make an appointment with your doctor.",
        [K.mc('How old is the writer of the letter?', ['fourteen', 'sixteen', 'twenty'], 1),
         K.mc('When does the teen go to bed?', ['before eleven', 'after midnight', 'at ten'], 1),
         K.mc('How many hours of sleep do teenagers need?', ['5–6', '6–7', '8–10'], 2),
         K.tf('The doctor says a 30-minute walk is enough exercise.', true),
         K.mc('If the headaches continue, the teen must…', ['stop studying', 'see a doctor', 'drink coffee'], 1)]] }
  ]);
})();
