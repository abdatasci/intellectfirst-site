/* General English B2: original IF Academy course. */
IFX.course({
  id: 'ge-b2', track: 'general', level: 'B2', next: 'C1', icon: '🏔️',
  title: 'General English B2', sub: 'Express yourself with confidence',
  blurb: 'Habits, change and the media — longer texts, phrasal verbs and the grammar to report and compare ideas.',
  units: [
  { id: 'u1', title: 'Habits and change', topic: 'Lifestyle', lessons: [
    { id: 'v', type: 'vocab', title: 'Changing your habits', words: [
      { w: 'cut down on', p: 'phrasal verb', d: 'to do or use less of something', e: "I'm trying to cut down on sugar.", ru: 'сокращать' },
      { w: 'give up', p: 'phrasal verb', d: 'to stop doing something completely', e: "He gave up smoking two years ago.", ru: 'бросить' },
      { w: 'take up', p: 'phrasal verb', d: 'to start a new hobby or activity', e: "She took up running last spring.", ru: 'начать заниматься' },
      { w: 'stick to', p: 'phrasal verb', d: 'to continue doing what you planned', e: "It's hard to stick to a diet.", ru: 'придерживаться' },
      { w: 'willpower', p: 'noun', d: 'the ability to control what you do', e: "You need willpower to wake up at six.", ru: 'сила воли' },
      { w: 'routine', p: 'noun', d: 'the usual order in which you do things', e: "Exercise is part of my morning routine.", ru: 'распорядок' },
      { w: 'motivation', p: 'noun', d: 'the reason or energy that makes you want to do something', e: "My motivation drops in winter.", ru: 'мотивация' },
      { w: 'get into the habit of', p: 'phrase', d: 'to start doing something regularly', e: "I got into the habit of reading before bed.", ru: 'привыкнуть (делать)' }
    ]},
    { id: 'g', type: 'grammar', title: 'used to, be used to, get used to',
      rule: "<table><tr><td><b>used to</b> + infinitive</td><td>a past habit or state that is not true now — I <b>used to live</b> in Rudny.</td></tr><tr><td><b>be used to</b> + -ing / noun</td><td>something is normal for you — I'<b>m used to getting</b> up early.</td></tr><tr><td><b>get used to</b> + -ing / noun</td><td>something is becoming normal — I'<b>m getting used to</b> the cold.</td></tr></table><p>Negative and question: I <b>didn't use to</b> like coffee. <b>Did</b> you <b>use to</b> play football?</p>",
      ex: [
        { t: 'mc', q: 'I ___ eat a lot of fast food, but now I cook at home.', o: ['used to', 'am used to', 'get used to'], a: 0 },
        { t: 'mc', q: "She's a nurse, so she ___ working at night.", o: ['used to', 'is used to', 'use to'], a: 1 },
        { t: 'gap', q: "It took me a month to get used to ___ (wake) up at six.", a: ['waking'] },
        { t: 'mc', q: '___ you use to have long hair?', o: ['Were', 'Did', 'Are'], a: 1 },
        { t: 'mc', q: 'Choose the correct sentence.', o: ["I'm used to drive on the right.", "I'm used to driving on the right."], a: 1, why: 'be used to + -ing.' },
        { t: 'order', a: 'I am still getting used to my new routine.' }
      ]},
    { id: 'r', type: 'reading', title: 'The myth of the 21-day habit', photo: '/media/spaces/hub-2.webp', alt: 'A student planning her week',
      text: "You have probably heard that it takes 21 days to form a new habit. The idea is popular in self-help books, but researchers say it is not quite true. In a well-known study at University College London, volunteers chose a simple daily habit — drinking water after breakfast, for example — and reported every day how automatic it felt.\n\nOn average, it took 66 days before the new behaviour felt automatic, and for some people it took more than eight months. Interestingly, missing one day did not ruin the process. What mattered was coming back to the habit the next day.\n\nThe lesson? Be patient. Willpower alone rarely lasts, so build the habit into your routine: attach it to something you already do, start small, and don't give up after one bad week. Motivation gets you started; routine keeps you going.",
      ex: [
        { t: 'mc', q: 'What does the writer say about the "21 days" idea?', o: ['It is scientifically proven.', 'It is popular but not accurate.', 'It comes from University College London.'], a: 1 },
        { t: 'mc', q: 'On average, how long did a habit take to feel automatic?', o: ['21 days', '66 days', 'eight months'], a: 1 },
        { t: 'tf', q: 'Missing one day stopped the habit from forming.', a: false },
        { t: 'mc', q: 'Which piece of advice is NOT in the text?', o: ['start small', 'link the habit to something you already do', 'reward yourself with food'], a: 2 },
        { t: 'mc', q: '"Motivation gets you started; routine keeps you going" means…', o: ['motivation is more important than routine', 'you need both, but routine matters more over time', 'routine is boring'], a: 1 }
      ]},
    { id: 'c', type: 'check', title: 'Unit check', ex: [
      { t: 'mc', q: 'I want to ___ yoga — it looks relaxing.', o: ['take up', 'give up', 'cut down on'], a: 0 },
      { t: 'mc', q: "He's lived in Canada for years, so he's ___ the cold.", o: ['used to', 'use to', 'using to'], a: 0 },
      { t: 'gap', q: 'We ___ (not / use to) have a car.', a: ["didn't use to", 'did not use to'] },
      { t: 'mc', q: 'The ability to control yourself is…', o: ['routine', 'willpower', 'motivation'], a: 1 },
      { t: 'order', a: 'She gave up sugar for a whole month.' },
      { t: 'match', p: [['stick to', 'continue with a plan'], ['cut down on', 'use less of'], ['give up', 'stop completely'], ['routine', 'usual order of things']] }
    ]}
  ]},
  { id: 'u2', title: 'News and truth', topic: 'Media', lessons: [
    { id: 'v', type: 'vocab', title: 'Media and fake news', words: [
      { w: 'headline', p: 'noun', d: 'the title of a news story', e: "The headline was shocking, but the article was boring.", ru: 'заголовок' },
      { w: 'source', p: 'noun', d: 'where information comes from', e: "Always check the source before you share.", ru: 'источник' },
      { w: 'reliable', p: 'adjective', d: 'that you can trust', e: "Is this website a reliable source?", ru: 'надёжный' },
      { w: 'biased', p: 'adjective', d: 'showing unfair support for one side', e: "The report was biased against young people.", ru: 'предвзятый' },
      { w: 'misleading', p: 'adjective', d: 'making people believe something false', e: "The graph was misleading.", ru: 'вводящий в заблуждение' },
      { w: 'go viral', p: 'phrase', d: 'to spread very quickly on the internet', e: "The video went viral overnight.", ru: 'стать вирусным' },
      { w: 'clickbait', p: 'noun', d: 'a title made to make you click, often untrue', e: "\"You won't believe number 7!\" is classic clickbait.", ru: 'кликбейт' },
      { w: 'fact-check', p: 'verb', d: 'to check if information is true', e: "Journalists should fact-check every number.", ru: 'проверять факты' }
    ]},
    { id: 'g', type: 'grammar', title: 'The passive with say, think, believe',
      rule: "<p>Use these structures to report what people say without naming them — very common in the news.</p><table><tr><td><b>It is said / thought / believed that</b> + clause</td><td><b>It is believed that</b> the video is fake.</td></tr><tr><td>subject + <b>is said / thought to</b> + infinitive</td><td>The singer <b>is said to be</b> very shy.</td></tr><tr><td>past: <b>to have</b> + past participle</td><td>The photo <b>is thought to have been</b> edited.</td></tr></table>",
      ex: [
        { t: 'mc', q: '___ that the story is not true.', o: ['It is said', 'It says', 'They are said'], a: 0 },
        { t: 'mc', q: 'The company is thought ___ millions last year.', o: ['to lose', 'to have lost', 'losing'], a: 1 },
        { t: 'gap', q: 'The author is believed ___ (be) a teenager.', a: ['to be'] },
        { t: 'mc', q: 'It ___ that the video went viral in one hour.', o: ['is reported', 'reports', 'is reporting'], a: 0 },
        { t: 'mc', q: 'Choose the correct sentence.', o: ['He is said that he is rich.', 'He is said to be rich.'], a: 1 },
        { t: 'order', a: 'The photo is thought to have been edited.' }
      ]},
    { id: 'r', type: 'reading', title: 'Five seconds before you share', photo: '/media/spaces/lab-2.webp', alt: 'People looking at a phone together',
      text: "A dramatic photo appears in your feed: a huge storm over the city, with the headline \"Kostanay under water!\" Within minutes it has been shared thousands of times. Later it turns out the photo was taken in another country six years ago.\n\nMisleading posts spread fast because they make us feel something — fear, anger or surprise — and we share before we think. Clickbait headlines are designed for exactly this.\n\nFact-checkers suggest a simple five-second test. Who is the source, and are they reliable? Is the story reported anywhere else? Is the photo old? (A reverse image search takes seconds.) And finally: does the headline match the article? If any answer worries you, don't share. A biased or false story only goes viral if people like us help it.",
      ex: [
        { t: 'tf', q: 'The storm photo was taken in Kostanay.', a: false },
        { t: 'mc', q: 'Why do misleading posts spread quickly, according to the text?', o: ['They are long and detailed.', 'They make us feel strong emotions.', 'They come from journalists.'], a: 1 },
        { t: 'mc', q: 'Which check is part of the five-second test?', o: ['Count the likes.', 'Check if the photo is old.', 'Read the comments.'], a: 1 },
        { t: 'mc', q: 'The final sentence suggests that…', o: ['readers can stop false stories spreading', 'journalists are to blame', 'social media should be banned'], a: 0 }
      ]},
    { id: 'c', type: 'check', title: 'Unit check', ex: [
      { t: 'mc', q: 'A story that spreads very fast online…', o: ['goes viral', 'goes biased', 'goes reliable'], a: 0 },
      { t: 'mc', q: 'The minister is said ___ next week.', o: ['to resign', 'resigning', 'that he resigns'], a: 0 },
      { t: 'gap', q: 'It ___ (believe) that the photo is fake.', a: ['is believed'] },
      { t: 'mc', q: 'A report that supports only one side is…', o: ['reliable', 'biased', 'viral'], a: 1 },
      { t: 'order', a: 'Always check the source before you share.' },
      { t: 'match', p: [['headline', 'title of a story'], ['source', 'where information comes from'], ['clickbait', 'title made to get clicks'], ['fact-check', 'check if it is true']] }
    ]}
  ]}
  ]
});
