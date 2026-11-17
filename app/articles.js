/* IF Daily Articles: original IF Academy articles for teens and adults, one a day at every level (A1–C2).
   Used by the IF App (Home card and #/articles) and by the website page /articles/ (B1–C1).
   How "daily" works: the first article of each level appears on START, the next one the day after, and so on.
   When the list ends it starts again, so there is always an article for today. To add a month, add articles
   to the end of each level with IF_ARTICLES.add(level, [...]). Nothing else needs changing.
   Article: { id, t: title, topic, text (blank line between paragraphs),
              v: "word | part of speech | meaning | example | Russian" lines, q: [ { q, o: [3 options], a: index } ] } */
(function () {
  var START = '2026-11-17';
  var LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  var BANK = {};
  var DAY = 864e5;
  // today's date in Kostanay time (UTC+5), as YYYY-MM-DD: the same clock the app uses for streaks
  function today(d) { d = d || new Date(); return new Date(d.getTime() + 5 * 3600e3).toISOString().slice(0, 10); }
  function dayNo(d) { return Math.floor((Date.parse((d || today()) + 'T00:00:00Z') - Date.parse(START + 'T00:00:00Z')) / DAY); }
  function words(s) {
    return String(s).trim().split('\n').map(function (l) {
      var p = l.split('|').map(function (x) { return x.trim(); });
      var w = { w: p[0], p: p[1], d: p[2], e: p[3] }; if (p[4]) w.ru = p[4]; return w;
    }).filter(function (w) { return w.w && w.d; });
  }
  var A = window.IF_ARTICLES = {
    start: START, levels: LEVELS,
    add: function (lv, list) {
      var b = BANK[lv] = BANK[lv] || [];
      list.forEach(function (a) {
        a.level = lv; a.words = words(a.v);
        if (/^C/.test(lv)) a.words.forEach(function (w) { delete w.ru; });   // C1–C2 are English only, like the courses
        a.ex = a.q.map(function (x, i) {   // move the right answer around so it is not always in the same place
          var k = x.q.split('').reduce(function (n, ch) { return n + ch.charCodeAt(0); }, 0) % x.o.length, o = x.o.slice(k).concat(x.o.slice(0, k));
          return { t: 'mc', q: x.q, o: o, a: o.indexOf(x.o[x.a]) };
        });
        a.n = b.length; b.push(a);
      });
    },
    all: function (lv) { return BANK[lv] || []; },
    /** Today's article for a level (null before the start date or for an empty level). */
    today: function (lv, d) { var b = BANK[lv] || [], n = dayNo(d); return b.length && n >= 0 ? b[n % b.length] : null; },
    /** Articles already published for a level, newest first. */
    list: function (lv, d) {
      var b = BANK[lv] || [], n = dayNo(d); if (!b.length || n < 0) return [];
      var cur = n % b.length, out = [];
      for (var i = 0; i < Math.min(n + 1, b.length); i++) out.push(b[(cur - i + b.length) % b.length]);
      return out;
    },
    /** Is this article published yet? */
    open: function (lv, id, d) { return A.list(lv, d).some(function (a) { return a.id === id; }); },
    /** The date an article was last "today's article", as YYYY-MM-DD. */
    dateOf: function (a, d) {
      var b = BANK[a.level] || [], n = dayNo(d), back = ((n % b.length) - a.n + b.length) % b.length;
      return new Date(Date.parse((d || today()) + 'T00:00:00Z') - back * DAY).toISOString().slice(0, 10);
    },
    minutes: function (a) { return Math.max(1, Math.round(a.text.split(/\s+/).length / 130)); },
    today_: today
  };

  /* ================= A1 ================= */
  A.add('A1', [
  { id: 'a1-001', t: 'Why people love tea', topic: 'Food and drink',
    text: `Tea is a very old drink. People in many countries drink it every day. In Kazakhstan, people often drink tea with milk. In England, people drink tea with milk too. In China and Japan, people like green tea.

Tea is easy to make. You need hot water and tea leaves. You wait for three minutes. Then you can drink it.

Why do people love tea? It is warm, and it is cheap. It is also a good drink for friends. When a guest comes to your home, you give them a cup of tea. You sit, you drink, and you talk. A cup of tea is a small thing, but it makes people happy.`,
    v: `drink | noun | something you can drink, e.g. water or tea | Tea is my favourite drink. | напиток
hot | adjective | not cold; with a high temperature | Be careful, the water is hot. | горячий
cheap | adjective | not expensive; it costs little money | This tea is cheap. | дешёвый
guest | noun | a person who visits your home | We have a guest today. | гость
cup | noun | a small thing you drink tea or coffee from | I want a cup of tea. | чашка
wait | verb | to stay until something happens | Please wait for three minutes. | ждать`,
    q: [
      { q: 'How do people in Kazakhstan often drink tea?', o: ['With milk', 'With ice', 'With lemon only'], a: 0 },
      { q: 'What do you need to make tea?', o: ['Cold water and sugar', 'Hot water and tea leaves', 'Milk and coffee'], a: 1 },
      { q: 'How long do you wait?', o: ['Three hours', 'Thirty minutes', 'Three minutes'], a: 2 },
      { q: 'What do you give a guest?', o: ['A cup of tea', 'A book', 'A green hat'], a: 0 },
      { q: 'Tea is…', o: ['cold and expensive', 'warm and cheap', 'new and difficult'], a: 1 }
    ] },
  { id: 'a1-002', t: 'Cats sleep a lot', topic: 'Animals',
    text: `Do you have a cat? Then you know this: cats sleep a lot. A cat sleeps for about fourteen hours every day. That is more than half of the day!

Cats sleep in the morning and in the afternoon. They like warm places. A cat can sleep on a bed, on a chair or in a box. Some cats sleep on a computer because it is warm.

Why do cats sleep so much? Cats are hunters. In nature, a cat runs fast and jumps high to catch its food. This is hard work, so the cat needs to rest.

At night, many cats wake up. They walk, they play and they run in the house. So when you want to sleep, your cat wants to play!`,
    v: `sleep | verb | to rest with your eyes closed, usually at night | I sleep for eight hours. | спать
warm | adjective | a little hot, in a nice way | The room is warm. | тёплый
box | noun | a thing with four sides that you put things in | The cat is in the box. | коробка
fast | adverb | quickly; not slowly | Cats run fast. | быстро
rest | verb | to stop working and relax | I am tired. I need to rest. | отдыхать
wake up | phrasal verb | to stop sleeping | I wake up at seven. | просыпаться`,
    q: [
      { q: 'How long does a cat sleep every day?', o: ['About four hours', 'About fourteen hours', 'About forty hours'], a: 1 },
      { q: 'What places do cats like?', o: ['Warm places', 'Cold places', 'Wet places'], a: 0 },
      { q: 'Why do some cats sleep on a computer?', o: ['It is big', 'It is new', 'It is warm'], a: 2 },
      { q: 'Why does a cat need to rest?', o: ['Hunting is hard work', 'It is always ill', 'It does not like people'], a: 0 },
      { q: 'What do many cats do at night?', o: ['They sleep', 'They wake up and play', 'They eat all night'], a: 1 }
    ] },
  { id: 'a1-003', t: 'The bicycle', topic: 'Transport',
    text: `A bicycle is a simple machine. It has two wheels, a seat and no engine. You move it with your legs. People call it a "bike".

Bikes are good for you. When you ride a bike, your legs and your heart work. You are in the fresh air, not in a car.

Bikes are good for the city too. A bike is quiet and clean. It does not need petrol. Ten bikes can stand in the place of one car.

In some cities, many people go to work or school by bike. In Amsterdam, there are more bikes than people!

A bike is not expensive, and children can learn to ride one in a few days. It is a small machine, but it is a very good idea.`,
    v: `wheel | noun | a round thing under a car or bike that turns | A bike has two wheels. | колесо
ride | verb | to sit on a bike or horse and move | I ride my bike to school. | ездить (верхом, на велосипеде)
quiet | adjective | with little or no noise | The street is quiet at night. | тихий
clean | adjective | not dirty | The air here is clean. | чистый
expensive | adjective | it costs a lot of money | That car is expensive. | дорогой
learn | verb | to get new knowledge or a new skill | Children learn fast. | учиться`,
    q: [
      { q: 'How many wheels does a bicycle have?', o: ['Two', 'Three', 'Four'], a: 0 },
      { q: 'How do you move a bike?', o: ['With an engine', 'With your legs', 'With petrol'], a: 1 },
      { q: 'A bike is…', o: ['noisy and dirty', 'quiet and clean', 'big and expensive'], a: 1 },
      { q: 'Which city has more bikes than people?', o: ['London', 'Astana', 'Amsterdam'], a: 2 },
      { q: 'How long do children need to learn to ride?', o: ['A few days', 'A few years', 'One hour'], a: 0 }
    ] }
  ]);

  /* ================= A2 ================= */
  A.add('A2', [
  { id: 'a2-001', t: 'Why do we yawn?', topic: 'The body',
    text: `Everybody yawns. Babies yawn, old people yawn, and even dogs, cats and fish yawn. You probably yawned this morning. But why do we do it?

Many people think that we yawn because we are tired or bored. That is partly true: we often yawn before bed and in long, slow lessons. But we also yawn when we wake up, and sportspeople sometimes yawn before an important match. They are not bored at all!

Scientists are still not sure about the answer. One idea is that a yawn helps to cool the brain. When you yawn, you take in a lot of air, and this may help your brain to work better. So a yawn in class does not always mean "this is boring". It can mean "my brain is getting ready".

The strangest thing about yawning is that it spreads. When one person yawns, other people near them often yawn too. It happens more with friends and family than with strangers. It can even happen when you read about yawning.

Did you yawn while you were reading this? Don't worry. It doesn't mean the article was boring!`,
    v: `yawn | verb | to open your mouth wide and breathe in, usually when you are tired | I always yawn in the morning. | зевать
bored | adjective | not interested; with nothing interesting to do | The children were bored on the long trip. | скучающий
tired | adjective | needing rest or sleep | I'm tired after work. | уставший
brain | noun | the part of your head that thinks | Your brain needs sleep. | мозг
spread | verb | to move from one person or place to many | The news spread quickly. | распространяться
stranger | noun | a person you do not know | Don't open the door to strangers. | незнакомец`,
    q: [
      { q: 'Who yawns?', o: ['Only tired people', 'People and many animals', 'Only babies'], a: 1 },
      { q: 'Why do sportspeople sometimes yawn before a match?', o: ['They are bored', 'The article says they are not bored, so there is another reason', 'They slept badly'], a: 1 },
      { q: 'What is one idea from scientists?', o: ['A yawn cools the brain', 'A yawn makes you hungry', 'A yawn helps you hear'], a: 0 },
      { q: 'When does yawning spread most easily?', o: ['With strangers', 'With friends and family', 'When you are alone'], a: 1 },
      { q: 'Are scientists sure why we yawn?', o: ['Yes, completely', 'No, not yet', 'They do not study it'], a: 1 }
    ] },
  { id: 'a2-002', t: 'A street without cars', topic: 'City life',
    text: `Imagine your street without cars. There is no traffic and no noise. Children are playing football in the road, and neighbours are sitting outside with cups of tea. It sounds like a dream, but in some cities it is real.

In many towns in Europe, the centre is closed to cars. People walk, cycle or take a bus or tram. At first, shop owners were worried. They thought that customers would stop coming. But the opposite happened. People who walk spend more time in the street. They look in shop windows, they stop for coffee, and they buy more.

There are other good results too. The air is cleaner, and the streets are quieter and safer. Old people and families with small children feel more comfortable. Cafés put tables outside, and musicians play in the squares.

Of course, there are problems. Some people need a car because they cannot walk far. Shops need lorries to bring their goods. Cities usually solve this with special rules: for example, lorries can come only early in the morning.

More and more cities are trying car-free streets, sometimes for just one day a week. Would it work on your street?`,
    v: `traffic | noun | all the cars and buses moving on a road | There is a lot of traffic at 6 p.m. | дорожное движение
neighbour | noun | a person who lives near you | Our neighbours are very friendly. | сосед
customer | noun | a person who buys something in a shop | The shop has many customers on Saturday. | покупатель
safe | adjective | not dangerous | This street is safe for children. | безопасный
solve | verb | to find an answer to a problem | We need to solve this problem. | решать
goods | noun (plural) | things that shops sell | The lorry brings goods to the shop. | товары`,
    q: [
      { q: 'How do people move in a car-free centre?', o: ['Only by taxi', 'They walk, cycle or use a bus or tram', 'They stay at home'], a: 1 },
      { q: 'What were shop owners worried about?', o: ['Losing customers', 'Too many customers', 'High prices'], a: 0 },
      { q: 'What really happened to the shops?', o: ['They closed', 'Nothing changed', 'People bought more'], a: 2 },
      { q: 'Who may still need a car?', o: ['People who cannot walk far', 'Musicians', 'Children'], a: 0 },
      { q: 'How do cities solve the problem of lorries?', o: ['Lorries are never allowed', 'Lorries come early in the morning', 'Shops carry goods by bike'], a: 1 }
    ] },
  { id: 'a2-003', t: 'The story of the pencil', topic: 'Everyday things',
    text: `You probably have a pencil in your bag or on your desk. It is cheap and simple, and nobody thinks about it. But the pencil has an interesting story.

About 450 years ago, people in the north of England found a strange black stone in the ground. It was soft, and it left a dark line on paper and on sheep. Farmers used it to mark their animals. The stone was graphite.

Graphite was useful, but it was dirty and it broke easily. So people put it between two pieces of wood. This was the first pencil.

Many people call the black part of a pencil "lead", but this is a mistake. Lead is a different metal, and it is dangerous. There is no lead in a pencil, only graphite and clay.

The pencil has some surprising advantages over the pen. It works upside down, it works in very cold weather, and you can remove your mistakes with a rubber. One pencil can draw a line about fifty kilometres long.

Today, the world makes billions of pencils every year. Computers and phones are everywhere, but artists, builders and schoolchildren still use this simple old tool.`,
    v: `soft | adjective | not hard; easy to press or cut | This bread is fresh and soft. | мягкий
mark | verb | to put a sign or line on something | The teacher marked the mistakes in red. | отмечать
break | verb | to become two or more pieces | Glass breaks easily. | ломаться
mistake | noun | something that is not correct | I made a mistake in the test. | ошибка
remove | verb | to take something away | Please remove your shoes. | удалять, убирать
tool | noun | a thing that helps you to do a job | A hammer is a useful tool. | инструмент`,
    q: [
      { q: 'Where did people find graphite?', o: ['In the north of England', 'In China', 'In the sea'], a: 0 },
      { q: 'What did farmers do with it?', o: ['They ate it', 'They marked their animals', 'They built houses'], a: 1 },
      { q: 'Why did people put graphite in wood?', o: ['It was too expensive', 'It was dirty and broke easily', 'It was too heavy'], a: 1 },
      { q: 'Is there lead in a pencil?', o: ['Yes, a lot', 'Yes, a little', 'No'], a: 2 },
      { q: 'What can a pencil do that many pens cannot?', o: ['Work upside down', 'Write in colour', 'Write faster'], a: 0 }
    ] }
  ]);

  /* ================= B1 ================= */
  A.add('B1', [
  { id: 'b1-001', t: 'The power of a short walk', topic: 'Health',
    text: `When people decide to get fit, they usually think big. They buy expensive trainers, join a gym and promise to go five times a week. A month later, most of them have given up. There is a much simpler habit that almost anyone can keep: a short walk every day.

Walking does not look like serious exercise, but its effects are real. Doctors have known for a long time that people who walk regularly have healthier hearts and sleep better. A walk after a meal also helps the body to deal with sugar, which is especially useful after a heavy lunch.

The benefits are not only physical. Many writers and scientists have said that their best ideas came to them while they were walking. This is not surprising. When you walk, your body is busy but your mind is free. You are not looking at a screen, and nobody is asking you questions. Problems that seemed impossible at your desk often become clearer after twenty minutes outside.

Walking is also one of the few forms of exercise that costs nothing and needs no equipment. You do not have to book it or change your clothes, and you can do it with a friend. In fact, a conversation during a walk is often easier than one at a table, because you are side by side rather than face to face.

If you want to start, do not set a difficult target. Ten minutes after dinner is enough. The secret is not the distance. It is doing it again tomorrow.`,
    v: `give up | phrasal verb | to stop trying to do something | Don't give up — you're nearly there. | сдаваться, бросать
habit | noun | something you do regularly, often without thinking | Reading before bed is a good habit. | привычка
regularly | adverb | often and at similar times | She exercises regularly. | регулярно
benefit | noun | a good or helpful result | One benefit of walking is better sleep. | польза, преимущество
equipment | noun | the things you need for an activity | Skiing needs a lot of equipment. | оборудование, снаряжение
target | noun | a result that you try to reach | My target is 6,000 steps a day. | цель`,
    q: [
      { q: 'What happens to most people who join a gym, according to the article?', o: ['They become very fit', 'They give up after about a month', 'They start walking instead'], a: 1 },
      { q: 'Why is a walk after a meal useful?', o: ['It helps the body deal with sugar', 'It makes you hungry again', 'It replaces sleep'], a: 0 },
      { q: 'Why do good ideas often come during a walk?', o: ['Walking is tiring', 'Your body is busy but your mind is free', 'You walk with clever people'], a: 1 },
      { q: 'Why can a conversation be easier during a walk?', o: ['It is noisy outside', 'You walk side by side, not face to face', 'You speak less'], a: 1 },
      { q: 'What is "the secret", according to the writer?', o: ['Walking a long distance', 'Buying good trainers', 'Doing it again the next day'], a: 2 }
    ] },
  { id: 'b1-002', t: 'Why we forget names', topic: 'Memory',
    text: `You meet someone at a party. They tell you their name, you shake hands, and thirty seconds later the name has completely disappeared. You remember their face, their job and even the story they told you about their dog. So why not the name?

The first reason is that names are meaningless. If somebody tells you they are a baker, your brain immediately connects the word to bread, early mornings and the smell of a bakery. But if their surname is Baker, there is nothing to connect it to. It is just a sound. Our memory works by linking new information to things we already know, and a name offers very few links.

The second reason is attention. When we meet a new person, we are often thinking about ourselves: what to say next, how we look, whether our handshake was too weak. The name is said at exactly the moment when we are not listening. In other words, we do not really forget it. We never learned it.

Fortunately, there are simple ways to improve. Repeat the name straight away: "Nice to meet you, Dana." Use it once more during the conversation. If you can, connect it to something, such as another Dana you know or a word that sounds similar. And if you have already forgotten, just ask again. Most people are not offended, because they have probably forgotten your name too.

Remembering names is not a special talent. It is a small skill, and like any skill it gets better with practice.`,
    v: `disappear | verb | to stop being there; to go away completely | My keys have disappeared again. | исчезать
connect | verb | to join two things or ideas together | I connect this song to my childhood. | связывать
attention | noun | the act of listening or looking carefully | Please pay attention to the instructions. | внимание
repeat | verb | to say or do something again | Could you repeat your name, please? | повторять
improve | verb | to get better or make something better | Her English improved quickly. | улучшать(ся)
offended | adjective | upset because someone was rude to you | He was offended when nobody thanked him. | обиженный`,
    q: [
      { q: 'Why is the job "baker" easier to remember than the name "Baker"?', o: ['It is shorter', 'The job connects to many things we know', 'Jobs are more important'], a: 1 },
      { q: 'What are we often doing when someone says their name?', o: ['Thinking about ourselves', 'Looking at our phone', 'Talking to someone else'], a: 0 },
      { q: 'What does the writer mean by "We never learned it"?', o: ['Names are impossible to learn', 'We were not listening when the name was said', 'We learn names at school'], a: 1 },
      { q: 'Which piece of advice is in the article?', o: ['Write the name on your hand', 'Repeat the name straight away', 'Avoid using the name'], a: 1 },
      { q: 'What should you do if you forget a name?', o: ['Ask again', 'Pretend you remember', 'Leave the party'], a: 0 }
    ] },
  { id: 'b1-003', t: 'The food that never goes bad', topic: 'Science',
    text: `Almost everything in your kitchen has a "use by" date. Milk lasts a few days, bread goes hard, and fruit slowly turns brown. But there is one food that can stay good for years, and possibly for centuries: honey. Archaeologists have reported finding pots of honey in ancient tombs that were thousands of years old.

How is this possible? Honey has three natural defences. First, it contains very little water. Bacteria need water to live, and in honey there is simply not enough for them to grow. Honey is also so sweet that it pulls water out of any bacteria that land in it, which kills them.

Second, honey is slightly acidic. It does not taste sour because the sugar hides it, but the acid makes life even more difficult for tiny organisms.

Third, bees add something special. When they turn the liquid from flowers into honey, they add a substance from their own bodies. This creates a small amount of a chemical that also fights bacteria. For this reason, people used honey on cuts and burns long before modern medicine existed.

There is one condition, however. Honey must be kept in a closed jar. If it is left open, it takes in water from the air, and then it can go bad like other food.

If your honey becomes hard and cloudy, do not throw it away. This is natural and does not mean it is spoiled. Just put the jar in warm water for a while, and it will become liquid again.`,
    v: `last | verb | to stay in good condition for a period of time | Fresh fish doesn't last long. | сохраняться, длиться
ancient | adjective | very old; from a time long ago | We visited an ancient city. | древний
contain | verb | to have something inside | Oranges contain a lot of vitamin C. | содержать
liquid | noun | something that flows, like water or oil | Water is a liquid. | жидкость
condition | noun | something that must be true for another thing to happen | You can borrow it on one condition. | условие
spoiled | adjective | (of food) no longer good to eat | The milk is spoiled; don't drink it. | испорченный`,
    q: [
      { q: 'What is unusual about honey?', o: ['It can stay good for a very long time', 'It is made in factories', 'It contains a lot of water'], a: 0 },
      { q: 'Why can\'t bacteria grow in honey?', o: ['It is too cold', 'There is not enough water', 'It is too salty'], a: 1 },
      { q: 'Why doesn\'t honey taste sour?', o: ['It has no acid', 'The sugar hides the acid', 'Bees remove the acid'], a: 1 },
      { q: 'What did people use honey for in the past?', o: ['Cuts and burns', 'Cleaning floors', 'Feeding animals'], a: 0 },
      { q: 'What should you do if honey becomes hard?', o: ['Throw it away', 'Add water to it', 'Put the jar in warm water'], a: 2 }
    ] }
  ]);

  /* ================= B2 ================= */
  A.add('B2', [
  { id: 'b2-001', t: 'Why boredom is good for you', topic: 'Psychology',
    text: `Ask anyone when they were last truly bored, and they may struggle to answer. Waiting for a bus, standing in a queue, sitting in a dentist's waiting room: every empty moment is now filled by the phone in our pocket. We have almost eliminated boredom from daily life. The question is whether that is the achievement it appears to be.

Boredom is unpleasant, and that is precisely its purpose. Like hunger, it is a signal. It tells us that what we are doing is not satisfying and pushes us to look for something more meaningful. When we silence that signal with a quick scroll, the discomfort disappears, but so does the push. We are no longer bored, yet we have not found anything worth doing either.

There is also a link between boredom and creativity. When the mind has nothing to focus on, it begins to wander. It replays conversations, imagines the future and connects ideas that seemed unrelated. Many people notice that their best ideas arrive in the shower or on a long drive, in other words, in exactly the situations where no screen is available. A mind that is constantly entertained rarely gets the chance to wander at all.

Children provide the clearest example. A child who complains "I'm bored" and is handed a tablet learns that boredom is a problem for somebody else to solve. A child who is left alone with the feeling will, after some protest, usually invent a game. That second child is practising a skill which will be valuable for life: the ability to generate their own interest.

None of this means we should seek out dull experiences. The point is simply to tolerate the occasional empty moment instead of filling it automatically. Next time you are waiting for the kettle to boil, try leaving your phone where it is. You may find that your own thoughts are better company than you expected.`,
    v: `eliminate | verb | to remove something completely | The new system eliminated most errors. | устранять
signal | noun | a sign that gives information or tells you to act | Pain is a signal that something is wrong. | сигнал
wander | verb | (of the mind) to move from one thought to another without control | My mind wandered during the lecture. | блуждать
generate | verb | to produce or create something | The idea generated a lot of interest. | порождать, создавать
tolerate | verb | to accept something unpleasant without complaining | I can't tolerate that noise. | терпеть, переносить
dull | adjective | not interesting or exciting | The film was long and dull. | скучный, унылый`,
    q: [
      { q: 'What has "almost eliminated boredom"?', o: ['Longer working hours', 'The phone, which fills every empty moment', 'Better public transport'], a: 1 },
      { q: 'Why does the writer compare boredom to hunger?', o: ['Both are signals that push us to act', 'Both are dangerous', 'Both happen at the same time of day'], a: 0 },
      { q: 'According to the article, why do ideas often come in the shower?', o: ['Warm water helps thinking', 'There is no screen, so the mind can wander', 'People are more awake'], a: 1 },
      { q: 'What does a child learn when handed a tablet?', o: ['How to invent games', 'That boredom is someone else\'s problem to solve', 'That adults are busy'], a: 1 },
      { q: 'What is the writer\'s main recommendation?', o: ['Look for boring activities', 'Stop using phones', 'Tolerate the occasional empty moment'], a: 2 }
    ] },
  { id: 'b2-002', t: 'The hidden price of free apps', topic: 'Technology',
    text: `Most of the apps on your phone cost nothing. You can send messages, watch videos, find your way across a city and store thousands of photographs without paying a single tenge. Yet the companies behind these services are among the richest in the world. Clearly, somebody is paying. The question is who, and with what.

The usual answer is advertising. A free app earns money by showing you adverts, and adverts are worth far more when they are aimed at the right person. To aim them well, the company needs to know you: your age, your location, what you search for, what you buy and how long you look at each post. In this model, you are not really the customer. The advertiser is the customer, and your attention is the product being sold.

This creates a subtle conflict of interest. A service you pay for succeeds when it solves your problem quickly. A service paid for by advertising succeeds when you stay as long as possible. That is why so many apps are designed to be difficult to put down: videos that play automatically, feeds that never end, and notifications that pull you back whenever you leave. These features are not accidents. They are the result of careful testing.

It would be unfair to say that the exchange is always a bad one. Free maps, free email and free video calls have made life easier for billions of people, including many who could never afford to pay for them. For plenty of users, a few adverts are a perfectly reasonable price.

The real issue is that the price is invisible. When you hand over money, you know exactly what you have spent. When you pay with data and attention, the cost is harder to measure, so it is easy to spend far more than you intended. A sensible approach is to treat your time as you would treat your money: check where it goes, decide what is worth it, and cancel what is not.`,
    v: `store | verb | to keep something so that you can use it later | You can store your files online. | хранить
aim | verb | to direct something at a particular person or group | The advert is aimed at teenagers. | нацеливать
subtle | adjective | not obvious; difficult to notice | There is a subtle difference between the two words. | тонкий, едва заметный
feature | noun | an important part or quality of something | The phone's best feature is its camera. | функция, особенность
afford | verb | to have enough money to pay for something | We can't afford a new car this year. | позволить себе
intend | verb | to plan to do something | I intended to stay for an hour. | намереваться`,
    q: [
      { q: 'How do most free apps earn money?', o: ['From government support', 'From advertising', 'From selling phones'], a: 1 },
      { q: 'In the advertising model, what is "the product being sold"?', o: ['The app', 'The user\'s attention', 'The advert'], a: 1 },
      { q: 'What is the "conflict of interest"?', o: ['Paid services want you to stay; free ones want you to leave', 'A free service succeeds when you stay as long as possible', 'Advertisers dislike app designers'], a: 1 },
      { q: 'What does the writer say about the exchange?', o: ['It is always a bad deal', 'It can be reasonable for many users', 'It should be illegal'], a: 1 },
      { q: 'Why is paying with data and attention risky?', o: ['The cost is invisible and hard to measure', 'It is more expensive than money', 'Companies lose the data'], a: 0 }
    ] },
  { id: 'b2-003', t: 'The four-day week', topic: 'Work',
    text: `For about a century, the five-day working week has seemed as natural as the seasons. In fact, it is a fairly recent invention. In the nineteenth century, many factory workers were on the job six days out of seven, and the two-day weekend only became standard in the first half of the twentieth. Now a growing number of companies are asking whether it is time for the next step: four days of work for five days' pay.

The idea sounds too good to be true, and sceptics have an obvious objection. If people work twenty per cent less, surely they will produce twenty per cent less. Supporters reply that this assumes every hour at work is equally productive, which anyone who has sat through a pointless Friday afternoon meeting knows to be false. Their argument is that when time is limited, people waste less of it. Meetings get shorter, interruptions are reduced, and staff return on Monday properly rested.

Companies that have tried the shorter week often report encouraging results. Employees say they feel less stressed and have more time for family, exercise and study. Many firms find that output stays roughly the same, and that it becomes easier to recruit and keep good staff.

Nevertheless, the model does not suit everybody. A software company can reorganise its tasks, but a hospital, a restaurant or a school must be open at particular hours. In such workplaces, a four-day week means hiring additional staff, which costs money. There is also a risk that five days of work are simply squeezed into four longer and more exhausting ones, which defeats the purpose.

The most honest conclusion is that the four-day week is neither a miracle nor a fantasy. It is an experiment, and its success depends on how carefully it is designed. What the debate has already achieved, however, is valuable in itself: it has reminded us that the way we organise work is a choice, not a law of nature.`,
    v: `sceptic | noun | a person who doubts that something is true or will work | Sceptics said the plan would fail. | скептик
objection | noun | a reason for disagreeing with something | Does anyone have an objection to the plan? | возражение
productive | adjective | achieving a lot in the time available | I'm most productive in the morning. | продуктивный
output | noun | the amount of work or goods produced | The factory doubled its output. | объём выпуска, результат
recruit | verb | to find and hire new people for a job | The company recruits graduates every year. | нанимать
squeeze | verb | to force something into a small space or short time | We squeezed three meetings into one morning. | втискивать`,
    q: [
      { q: 'What does the article say about the five-day week?', o: ['It has always existed', 'It is a fairly recent invention', 'It began in the 21st century'], a: 1 },
      { q: 'What is the sceptics\' main objection?', o: ['Less work time will mean less produced', 'Workers will ask for more money', 'Weekends are too long already'], a: 0 },
      { q: 'How do supporters answer it?', o: ['Not every hour at work is equally productive', 'Production does not matter', 'Workers can work at home on the fifth day'], a: 0 },
      { q: 'Why is the model harder for hospitals and schools?', o: ['Their staff do not want it', 'They must be open at particular hours', 'They have too few meetings'], a: 1 },
      { q: 'What is the writer\'s overall view?', o: ['It is a miracle', 'It is a fantasy', 'It is an experiment that depends on careful design'], a: 2 }
    ] }
  ]);

  /* ================= C1 ================= */
  A.add('C1', [
  { id: 'c1-001', t: 'The paradox of choice', topic: 'Psychology',
    text: `Walk into a large supermarket and count the varieties of jam, breakfast cereal or shampoo. The numbers are faintly absurd. We tend to take this abundance as proof of progress, on the reasonable assumption that if some choice is good, more must be better. A substantial body of psychological thinking suggests that the assumption breaks down sooner than we imagine.

The difficulty begins with the decision itself. Comparing three options is manageable; comparing thirty is laborious, and beyond a certain point many people simply postpone the decision or abandon it. Retailers have long observed that a smaller, carefully chosen range can sell better than an enormous one, because shoppers who are overwhelmed tend to walk away empty-handed.

More interesting is what happens after we choose. With only two alternatives, an imperfect result can be blamed on the world: there was nothing better available. With two hundred, the responsibility shifts to us. Somewhere on those shelves the ideal product presumably existed, and we failed to find it. Abundance therefore raises our expectations and, at the same stroke, makes us the author of our own disappointment. We may end up with a better product than our grandparents ever had and feel worse about it.

Psychologists sometimes distinguish between two temperaments. "Maximisers" feel compelled to identify the best possible option and will research exhaustively before committing. "Satisficers" establish what they need and accept the first option that meets the standard. Maximisers frequently obtain objectively superior outcomes, and yet they tend to report lower satisfaction, haunted as they are by the alternatives they rejected.

It would be a mistake to romanticise scarcity. Having no choice at all, in one's career, one's partner or one's beliefs, is a far graver problem than having too much, and nobody who has experienced the former would trade places. The argument is not against freedom but against the notion that it increases without limit as options multiply.

The practical lesson is modest. For decisions that matter little, decide quickly and do not look back. Reserve your deliberation for the few choices that genuinely shape a life. "Good enough" is frequently mistaken for a lack of ambition; often it is simply the wiser strategy.`,
    v: `abundance | noun | a very large quantity of something | The region has an abundance of natural resources. |
laborious | adjective | requiring a lot of time and effort | Checking every figure by hand was laborious. |
overwhelmed | adjective | unable to cope because there is too much of something | She felt overwhelmed by the amount of information. |
compelled | adjective | feeling that you must do something | He felt compelled to tell the truth. |
exhaustively | adverb | in a way that includes every detail or possibility | The topic has been exhaustively researched. |
deliberation | noun | careful thought before a decision | After long deliberation, they accepted the offer. |`,
    q: [
      { q: 'What assumption does the writer question?', o: ['That supermarkets are too large', 'That more choice is always better', 'That shoppers enjoy comparing products'], a: 1 },
      { q: 'Why might a smaller range sell better?', o: ['Overwhelmed shoppers often buy nothing', 'Small shops have lower prices', 'Customers distrust large shops'], a: 0 },
      { q: 'How does abundance change who we blame for a poor result?', o: ['We blame the retailer', 'We blame ourselves, since a better option presumably existed', 'We blame nobody'], a: 1 },
      { q: 'What is said about "maximisers"?', o: ['They obtain worse outcomes but feel happier', 'They often obtain better outcomes but feel less satisfied', 'They decide quickly'], a: 1 },
      { q: 'What is the writer\'s position on freedom of choice?', o: ['It should be reduced by law', 'It is not the issue; the claim that more options always means more freedom is', 'Scarcity is preferable'], a: 1 }
    ] },
  { id: 'c1-002', t: 'What maps leave out', topic: 'Geography and ideas',
    text: `A map appears to be the most neutral of documents. It does not argue or persuade; it merely shows where things are. Yet every map is the product of decisions, and the most consequential of them concern what to omit. A map that included everything would be as large as the territory it described, and precisely as useless.

Consider the problem of flattening a sphere. The Earth's curved surface cannot be transferred to a flat sheet without distortion, and cartographers must choose which property to sacrifice: shape, area, distance or direction. The projection most of us grew up with preserves direction, which made it invaluable to sailors, but it achieves this by inflating regions far from the equator. Greenland appears comparable in size to Africa, when in reality Africa is roughly fourteen times larger. The map is not wrong. It was designed to answer one question, and we have fallen into the habit of asking it another.

Selection goes well beyond geometry. A road atlas ignores hills; a hiking map lavishes attention on them. A tourist map of a city enlarges the cathedral and deletes the industrial estate. The celebrated diagram of the London Underground abandons geographical accuracy altogether, spacing stations evenly and straightening the lines, and it is admired because the passenger needs to know only the order of stations and where to change. Its distortions are the source of its clarity.

What is true of maps is true of every representation we rely on. A company's accounts, a school report and a news bulletin are all maps of a kind: simplified pictures constructed for a purpose. Each makes certain features vivid and renders others invisible, and the danger lies in forgetting that a selection has been made. A student's grades record performance in examinations; they are silent about curiosity, kindness or resilience. To conclude that those qualities are absent, or unimportant, is to mistake the map for the territory.

None of this is a counsel of despair. We cannot dispense with simplification, since a mind confronted with the whole of reality would be paralysed. The sensible response is to cultivate a habit of asking two questions of any picture of the world we are offered: what was this made for, and what has been left out?`,
    v: `omit | verb | to leave something out, deliberately or by accident | Several names were omitted from the list. |
distortion | noun | a change that makes something appear different from how it really is | The mirror produced a strange distortion. |
inflate | verb | to make something appear larger or more important than it is | The figures were inflated to impress investors. |
lavish | verb | to give a great deal of something to someone or something | The critics lavished praise on the film. |
render | verb | to cause something to be in a particular state | The storm rendered the road impassable. |
dispense with | phrasal verb | to manage without something; to get rid of it | We can dispense with the formalities. |`,
    q: [
      { q: 'Why would a map that included everything be useless?', o: ['It would be too expensive to print', 'It would be as large as the territory itself', 'Nobody could draw it accurately'], a: 1 },
      { q: 'What does the familiar projection preserve, and at what cost?', o: ['Area, at the cost of shape', 'Direction, at the cost of enlarging regions far from the equator', 'Distance, at the cost of colour'], a: 1 },
      { q: 'Why is the London Underground diagram admired?', o: ['It is geographically precise', 'Its distortions make it clear for the passenger\'s purpose', 'It shows every street'], a: 1 },
      { q: 'What point is made about school grades?', o: ['They measure everything that matters', 'They record exam performance and say nothing about other qualities', 'They are usually inaccurate'], a: 1 },
      { q: 'What does the writer recommend?', o: ['Rejecting all simplified pictures', 'Asking what a representation was made for and what it leaves out', 'Using only detailed maps'], a: 1 }
    ] },
  { id: 'c1-003', t: 'One thing at a time', topic: 'Work and attention',
    text: `Few claims appear on a curriculum vitae more often than "excellent multitasker". It is offered as evidence of energy and efficiency, and employers have traditionally received it as such. The uncomfortable truth, which researchers into attention have been repeating for years, is that for demanding mental work, multitasking in the strict sense barely exists.

What we call multitasking is, in most cases, rapid switching. The mind does not write a report and conduct a conversation simultaneously; it alternates between them, and each alternation carries a cost. On returning to the report, we must reconstruct where we were: which point we were making, what the next sentence was to be. The delay may last only seconds, but multiplied across a day of interruptions it amounts to a considerable loss. Worse, a residue of the previous task lingers, so that part of our attention remains with the message we have just read even as we try to resume the argument we were building.

The exceptions prove the rule. We can walk and talk, or listen to music while washing up, because one of the activities is so practised that it makes negligible demands on attention. The trouble arises when two tasks compete for the same resource, typically language or deliberate reasoning. Nobody can compose an email while following a meeting; one can only do each badly in turn.

Why, then, does the habit persist? Partly because it is flattering. Juggling several things produces a sensation of busyness that is easily mistaken for productivity. Partly, too, because the modern workplace is engineered for interruption. Messages arrive with a sound and a flash, and a prompt reply has come to be regarded as a sign of commitment. In such an environment, sustained concentration can look almost like negligence.

The remedy requires no special technique, only a degree of resolve. Decide what the task is; remove what is likely to interrupt it; work on it for a defined period; then, and only then, attend to everything else. People who adopt this discipline commonly report that they finish sooner and make fewer errors. They also describe something less expected: that work done with undivided attention is more satisfying. Concentration, it turns out, is not merely a means of getting things done. It is one of the pleasures of doing them.`,
    v: `alternate | verb | to move repeatedly between two things | He alternates between optimism and despair. |
residue | noun | a small amount of something that remains after the main part has gone | A residue of doubt remained after the meeting. |
linger | verb | to continue to exist longer than expected | The smell of smoke lingered for days. |
negligible | adjective | so small that it is not worth considering | The cost of the change was negligible. |
sustained | adjective | continuing for a long period without weakening | The project needs sustained effort. |
resolve | noun | strong determination to do something | She showed great resolve in finishing the course. |`,
    q: [
      { q: 'What does the writer say multitasking usually is?', o: ['A rare natural talent', 'Rapid switching between tasks', 'Doing two tasks perfectly at once'], a: 1 },
      { q: 'What is the "residue" mentioned in the second paragraph?', o: ['Unfinished paperwork', 'Attention that remains with the previous task', 'Time saved by switching'], a: 1 },
      { q: 'Why can we walk and talk at the same time?', o: ['Both tasks require language', 'One activity is so practised that it needs almost no attention', 'Walking improves speech'], a: 1 },
      { q: 'Which reason is given for the persistence of the habit?', o: ['It produces a feeling of busyness mistaken for productivity', 'It has been proved to be efficient', 'Employers forbid concentration'], a: 0 },
      { q: 'What unexpected benefit do people report?', o: ['Higher salaries', 'Work done with undivided attention is more satisfying', 'Fewer meetings'], a: 1 }
    ] }
  ]);

  /* ================= C2 ================= */
  A.add('C2', [
  { id: 'c2-001', t: 'The tyranny of the measurable', topic: 'Society',
    text: `There is an old observation, attributed in various forms to economists and social scientists, that when a measure becomes a target it ceases to be a good measure. The remark is usually quoted with a wry smile and then ignored, for the appeal of numbers to anyone charged with running an institution is all but irresistible. Numbers are portable, comparable and apparently impartial. They allow a minister to assess ten thousand schools without visiting one. It is hardly surprising that we have come to govern so much of life by them. What is surprising is how reliably the practice defeats itself.

The mechanism is not mysterious. An indicator is chosen because it correlates with something we care about but cannot observe directly. Examination results, for instance, are a tolerable proxy for learning so long as nobody is trying to manipulate them. Attach rewards and penalties, however, and behaviour reorganises itself around the indicator rather than the underlying good. Teachers, being rational, teach to the test. Results improve; whether learning has improved is another matter, and one that the figures are by now incapable of settling, since the link that made them informative has been severed by the very act of relying on it.

Examples can be multiplied indefinitely. Hospitals judged on waiting times discover ingenious ways of redefining when waiting begins. Police forces assessed on recorded crime find that fewer crimes are recorded. Call-centre staff timed on each conversation learn to conclude calls promptly, whether or not the customer's problem has been resolved. In none of these cases need anyone behave dishonestly. People merely respond, as people do, to what is rewarded, and the institution ends up scrupulously optimising something it never actually wanted.

A subtler casualty is whatever cannot be counted at all. The doctor's patience with a frightened patient, the teacher's refusal to give up on an awkward child, the engineer's insistence on checking once more: such things appear on no dashboard, and in a regime of targets what does not appear tends, by degrees, not to be done. The measurable drives out the important, not through malice but through a kind of administrative gravity.

It would be facile to conclude that measurement should be abandoned. The alternative to imperfect data is seldom wisdom; more often it is prejudice, anecdote and the unchecked confidence of whoever speaks loudest. The defensible position is a narrower one. Numbers serve us well as instruments of inquiry, prompting questions that someone must then go and answer by looking. They serve us badly as substitutes for judgement. An institution that has forgotten the difference will, in time, hit every one of its targets and miss the point entirely.`,
    v: `wry | adjective | showing that you find a bad or difficult situation slightly amusing | She gave a wry smile at the mention of her first job. |
proxy | noun | something used to represent or measure something else | Income is often used as a proxy for success. |
sever | verb | to cut or break a connection completely | The two countries severed diplomatic relations. |
ingenious | adjective | clever, original and well suited to its purpose | It was an ingenious solution to an old problem. |
scrupulously | adverb | with extreme care and attention to detail | The accounts were scrupulously checked. |
facile | adjective | too simple; produced without careful thought | The report offered only facile answers. |`,
    q: [
      { q: 'Why are numbers attractive to those who run institutions?', o: ['They are portable, comparable and seemingly impartial', 'They are always accurate', 'They remove the need for staff'], a: 0 },
      { q: 'What happens when rewards are attached to an indicator?', o: ['The indicator becomes more reliable', 'Behaviour reorganises around the indicator, breaking its link to the underlying good', 'People ignore the indicator'], a: 1 },
      { q: 'What does the writer stress about the examples given?', o: ['They all involve fraud', 'Nobody need be dishonest; people respond to what is rewarded', 'They are rare exceptions'], a: 1 },
      { q: 'What is the "subtler casualty"?', o: ['The accuracy of the data', 'Valuable conduct that cannot be counted and so tends not to be done', 'The morale of managers'], a: 1 },
      { q: 'What is the writer\'s final position on measurement?', o: ['It should be abandoned', 'It is useful for prompting inquiry but a poor substitute for judgement', 'It should replace judgement entirely'], a: 1 }
    ] },
  { id: 'c2-002', t: 'In praise of forgetting', topic: 'Mind',
    text: `We are accustomed to regarding forgetting as a defect: a leak in the vessel, a failure of the mechanism. The vocabulary we use betrays the prejudice. Memories "fade", facts "slip away", names "escape" us, as though recollection were the natural state and oblivion a regrettable lapse from it. It is worth entertaining the opposite hypothesis, namely that forgetting is among the mind's most sophisticated accomplishments, and that a memory incapable of it would be not a gift but an affliction.

The case can be made from what we know of those rare individuals who retain almost everything. Their testimony is seldom enviable. Unable to shed the particular, they struggle with the general: each encounter with a face, a dog or a morning is preserved in such exhaustive specificity that the common pattern is obscured. To grasp that this animal and that one are both "dog" requires us to disregard a great deal about each of them. Abstraction, in other words, is a form of principled forgetting. A mind that discarded nothing could catalogue the world but would be hard pressed to think about it.

Forgetting also performs a quieter service as an editor. The brain is not an archive committed to impartial preservation; it is closer to a newspaper with limited space and a strong sense of what its reader needs. Information that is used repeatedly is retained and strengthened, while that which is never called upon is allowed to lapse. The process is ruthless and occasionally mistaken, as anyone searching for a password will confirm, but on the whole it ensures that what comes to mind is what is likely to matter. The alternative, a consciousness cluttered with every telephone number and parking space of a lifetime, hardly bears contemplation.

There is, finally, an emotional dimension. The capacity of painful experience to lose its edge over time is so familiar that we seldom reflect on how much depends on it. Grief that never softened, embarrassment that retained the heat of its first moment, quarrels recalled with perfect fidelity: ordinary life could scarcely proceed under such conditions. Forgiveness, of others and of oneself, leans heavily on the gradual blurring of detail. We speak of time as a healer; the healing is done, in large part, by forgetting.

None of this should console the student who cannot recall an irregular verb on the morning of an examination. Yet even here the lesson is instructive, for it tells us how memory wishes to be treated. It keeps what it is asked for. To remember a thing, one need not strain to hold it; one need only return to it, at intervals, until the mind is persuaded that it is worth the space.`,
    v: `oblivion | noun | the state of being completely forgotten | Many once-famous writers have fallen into oblivion. |
affliction | noun | something that causes suffering | Loneliness is a common affliction of old age. |
shed | verb | to get rid of something that is no longer wanted | The company shed a third of its staff. |
lapse | verb | to come to an end, usually through lack of use or attention | He let his membership lapse. |
cluttered | adjective | filled with too many things in an untidy way | Her desk was cluttered with old papers. |
fidelity | noun | the degree to which a copy matches the original | The recording reproduces the concert with remarkable fidelity. |`,
    q: [
      { q: 'What hypothesis does the writer invite us to consider?', o: ['That memory is unreliable', 'That forgetting is a sophisticated accomplishment and not a defect', 'That recollection is the natural state of the mind'], a: 1 },
      { q: 'Why do people who retain almost everything struggle with the general?', o: ['Excessive detail obscures the common pattern', 'They lack intelligence', 'They refuse to learn categories'], a: 0 },
      { q: 'What is meant by comparing the brain to a newspaper?', o: ['It reports events accurately', 'It selects what its reader is likely to need, given limited space', 'It is updated daily'], a: 1 },
      { q: 'What role does forgetting play in emotional life?', o: ['It prevents us from feeling grief', 'It lets painful experience lose its edge, making forgiveness possible', 'It makes quarrels more frequent'], a: 1 },
      { q: 'What practical advice follows for the student?', o: ['Strain to hold the fact in mind', 'Return to the material at intervals', 'Accept that verbs cannot be learned'], a: 1 }
    ] },
  { id: 'c2-003', t: 'Why expertise is hard to see', topic: 'Knowledge',
    text: `It is a peculiarity of genuine skill that it tends to conceal itself. The novice juggler is all visible effort: eyes darting, shoulders tense, the occasional lunge to rescue a falling ball. The master appears to be doing very little. So it is with the surgeon whose operation is "uneventful", the translator whose version reads as though it had been written in the second language, and the teacher in whose classroom nothing in particular seems to happen except that everyone learns. In each case the mark of accomplishment is an absence, and absences are notoriously difficult to admire.

The phenomenon has consequences beyond the merely aesthetic. Because expert performance looks easy, it is routinely underestimated by those who have never attempted it. The spectator who watches a seasoned negotiator secure agreement with a few mild remarks is apt to conclude that negotiation is a matter of mild remarks. What he cannot see is the hinterland: the hundred alternatives considered and discarded, the reading of the other party's hesitation, the judgement, formed over decades, of what not to say. The visible act is the tip; the competence lies almost wholly below the waterline.

Experts themselves are frequently poor guides to what they know. A good deal of skill is tacit, acquired through practice and never formulated in words. Ask a native speaker why one phrasing is acceptable and another not, and the usual answer is that it "sounds right", which is true and of no use whatever to the learner. Indeed, the more thoroughly a competence has been absorbed, the less accessible it becomes to introspection. The expert has forgotten what it was like not to know, and so pitches the explanation several steps above where the beginner is standing.

This asymmetry creates an opening for the confident amateur. Real expertise is characteristically hedged: it speaks of probabilities, exceptions and conditions, because it knows where the difficulties lie. Ignorance suffers from no such inhibition. To an audience unable to evaluate the substance, the unqualified assertion can sound more authoritative than the careful one, and the public reputation of the two speakers may come to be the inverse of what each deserves.

How, then, is a layperson to tell the difference? There is no infallible test, but some signs are suggestive. The expert can generally say what would change their mind, and where the limits of their knowledge fall. They are specific where the pretender is sweeping, and they are seldom surprised by the obvious objection, having long since met it. Above all, their record can be examined. Skill may be invisible in the moment of its exercise, yet it leaves a trail of outcomes, and those, unlike fluency, are difficult to counterfeit.`,
    v: `conceal | verb | to hide something or prevent it from being known | He could barely conceal his disappointment. |
hinterland | noun | the less visible background that lies behind something | Behind the short speech lay a hinterland of careful research. |
tacit | adjective | understood or known without being expressed in words | There was a tacit agreement not to mention it. |
introspection | noun | the examination of one's own thoughts and feelings | The illness gave him time for introspection. |
hedged | adjective | expressed cautiously, with qualifications | The forecast was heavily hedged. |
counterfeit | verb | to make an imitation of something in order to deceive | Confidence is easy to counterfeit; results are not. |`,
    q: [
      { q: 'What do the surgeon, translator and teacher have in common?', o: ['Their effort is clearly visible', 'Their accomplishment shows as an absence of visible difficulty', 'They work in public'], a: 1 },
      { q: 'What is the "hinterland" of the negotiator?', o: ['The room in which the talks are held', 'The unseen consideration and judgement behind the visible act', 'The other party\'s position'], a: 1 },
      { q: 'Why are experts often poor at explaining what they know?', o: ['Much skill is tacit and they have forgotten what not knowing is like', 'They prefer to keep secrets', 'They are rarely asked'], a: 0 },
      { q: 'Why can the confident amateur sound more authoritative?', o: ['Amateurs know more', 'Unqualified assertions impress an audience that cannot judge the substance', 'Experts refuse to speak'], a: 1 },
      { q: 'Which sign of real expertise does the writer consider most important?', o: ['Fluent speech', 'A record of outcomes that can be examined', 'Never admitting limits'], a: 1 }
    ] }
  ]);

  /* In the IF App each level is a hidden "daily" course, so the lesson player, XP, streak and saved progress all work as for courses. */
  if (window.IFX && IFX.course) {
    LEVELS.forEach(function (lv) {
      IFX.course({
        id: 'art-' + lv.toLowerCase(), daily: true, track: 'daily', level: lv, icon: '📰',
        title: 'Daily articles ' + lv, sub: 'A new article every day', blurb: 'One original article a day at your level, with key words and questions.',
        units: A.all(lv).map(function (a) {
          return { id: a.id, title: a.t, topic: a.topic, lessons: [
            { id: 'r', type: 'reading', title: a.t, text: a.text, ex: a.ex },
            { id: 'v', type: 'vocab', title: 'Key words: ' + a.t, words: a.words }
          ] };
        })
      });
    });
  }
})();
