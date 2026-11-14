/* General English B1: original IF Academy course. */
IFX.course({
  id: 'ge-b1', track: 'general', level: 'B1', next: 'B2', icon: '🧭',
  title: 'General English B1', sub: 'Say more, understand more',
  blurb: 'Work, technology and opinions — longer readings, useful collocations and the grammar for experiences and the future.',
  units: [
  { id: 'u1', title: 'Work and life', topic: 'Work', lessons: [
    { id: 'v', type: 'vocab', title: 'Jobs and working life', words: [
      { w: 'apply for', p: 'phrasal verb', d: 'to ask officially for a job or a place, usually in writing', e: 'She applied for a job at a bank.', ru: 'подавать заявление' },
      { w: 'salary', p: 'noun', d: 'the money you earn every month from your job', e: 'The salary is good, but the hours are long.', ru: 'зарплата' },
      { w: 'deadline', p: 'noun', d: 'the time or date when work must be finished', e: 'The deadline for the report is Friday.', ru: 'крайний срок' },
      { w: 'colleague', p: 'noun', d: 'a person you work with', e: 'My colleagues are very helpful.', ru: 'коллега' },
      { w: 'flexible', p: 'adjective', d: 'able to change easily, e.g. working hours', e: 'I have flexible hours, so I can start at ten.', ru: 'гибкий' },
      { w: 'remote', p: 'adjective', d: 'done from home or another place, not at the office', e: 'Remote work is popular in IT.', ru: 'удалённый' },
      { w: 'stressful', p: 'adjective', d: 'making you feel worried and tired', e: 'Exams are stressful for many students.', ru: 'напряжённый' },
      { w: 'balance', p: 'noun', d: 'a good mix of different things, e.g. work and free time', e: 'It\'s hard to find a balance between work and family.', ru: 'баланс' }
    ]},
    { id: 'g', type: 'grammar', title: 'Present perfect for experiences and news',
      rule: '<p>Use the <b>present perfect</b> (have/has + past participle) for:</p><table><tr><td>experiences (no exact time)</td><td>I<b>\'ve worked</b> in a hotel. · <b>Have</b> you ever <b>been</b> to London?</td></tr><tr><td>recent news / results</td><td>She<b>\'s found</b> a new job!</td></tr><tr><td>with <i>for / since</i></td><td>He<b>\'s lived</b> here <b>for</b> ten years / <b>since</b> 2015.</td></tr></table><p>With a finished time (<i>yesterday, in 2020</i>) use the <b>past simple</b>: <i>I worked there <b>in 2020</b>.</i></p>',
      ex: [
        { t: 'gap', q: 'I ___ (never / work) from home.', a: ["'ve never worked", 'have never worked', "I've never worked"] },
        { t: 'mc', q: '___ you ever applied for a job abroad?', o: ['Did', 'Have', 'Has'], a: 1 },
        { t: 'mc', q: 'She has worked here ___ 2019.', o: ['for', 'since', 'ago'], a: 1 },
        { t: 'mc', q: 'Choose the correct sentence.', o: ['I have started this job last year.', 'I started this job last year.'], a: 1, why: '“last year” is a finished time → past simple.' },
        { t: 'gap', q: 'They ___ (just / finish) the project.', a: ["'ve just finished", 'have just finished'] },
        { t: 'order', a: 'How long have you worked here?' }
      ]},
    { id: 'r', type: 'reading', title: 'Is the office dead?', photo: 'TP5zfBbUox0', alt: 'A man working on a laptop at home',
      text: 'Five years ago, most people in Kazakhstan worked in an office from nine to six. Today, many companies — especially in IT, design and marketing — let their staff work remotely for part of the week. But is it really better?\n\nSupporters say remote work saves time and money. "I used to spend two hours a day in traffic," says Ruslan, a programmer from Astana. "Now I use that time for sport and my family." Flexible hours also help parents and students who need to organise their own day.\n\nHowever, not everyone is happy. Some workers feel lonely, and it can be difficult to stop working when your office is your kitchen table. Managers also worry that it is harder to build a team when colleagues rarely meet. Many experts now recommend a mix: two or three days at home and the rest in the office. As one HR manager put it, "The office isn\'t dead — it has simply changed its job."',
      ex: [
        { t: 'mc', q: 'What is the main topic of the text?', o: ['how to find a job in IT', 'the advantages and disadvantages of remote work', 'traffic problems in Astana'], a: 1 },
        { t: 'tf', q: 'Ruslan now spends more time with his family.', a: true },
        { t: 'mc', q: 'Which problem of remote work is NOT mentioned?', o: ['feeling lonely', 'low salaries', 'difficulty stopping work'], a: 1 },
        { t: 'mc', q: 'What do many experts recommend?', o: ['working only at home', 'working only in the office', 'a mix of both'], a: 2 },
        { t: 'mc', q: '“The office has simply changed its job” means…', o: ['offices are closing', 'offices are used in a different way now', 'managers need new jobs'], a: 1 }
      ]},
    { id: 'c', type: 'check', title: 'Unit check', ex: [
      { t: 'mc', q: 'The ___ for applications is 30 November.', o: ['salary', 'deadline', 'balance'], a: 1 },
      { t: 'gap', q: 'He ___ (live) in Kostanay since 2018.', a: ["'s lived", 'has lived'] },
      { t: 'mc', q: 'I ___ to Turkey twice.', o: ['have been', 'went', 'have gone'], a: 0 },
      { t: 'mc', q: 'Work done from home is…', o: ['remote', 'stressful', 'flexible'], a: 0 },
      { t: 'order', a: 'She has applied for three jobs this month.' },
      { t: 'match', p: [['colleague', 'person you work with'], ['salary', 'monthly pay'], ['flexible', 'easy to change'], ['stressful', 'making you worried']] }
    ]}
  ]},
  { id: 'u2', title: 'Living with technology', topic: 'Technology', lessons: [
    { id: 'v', type: 'vocab', title: 'Phones, apps and the internet', words: [
      { w: 'download', p: 'verb', d: 'to copy a file or app from the internet to your device', e: 'Download the app and create an account.', ru: 'скачивать' },
      { w: 'device', p: 'noun', d: 'a machine such as a phone, tablet or laptop', e: 'How many devices do you use every day?', ru: 'устройство' },
      { w: 'screen time', p: 'noun', d: 'the time you spend looking at a phone, computer or TV', e: 'I want to reduce my screen time.', ru: 'экранное время' },
      { w: 'notification', p: 'noun', d: 'a message from an app that appears on your screen', e: 'I turned off notifications at night.', ru: 'уведомление' },
      { w: 'addicted to', p: 'adjective', d: 'unable to stop doing or using something', e: 'Some teenagers are addicted to games.', ru: 'зависимый от' },
      { w: 'privacy', p: 'noun', d: 'keeping your personal information secret', e: 'Check your privacy settings.', ru: 'конфиденциальность' },
      { w: 'post', p: 'verb', d: 'to put a message or photo on social media', e: 'She posts photos every day.', ru: 'публиковать' },
      { w: 'offline', p: 'adjective', d: 'not connected to the internet', e: 'I like to stay offline at weekends.', ru: 'офлайн' }
    ]},
    { id: 'g', type: 'grammar', title: 'Future forms: will, going to, present continuous',
      rule: '<table><tr><td><b>going to</b></td><td>plans and intentions: <i>I\'m going to delete some apps.</i></td></tr><tr><td><b>present continuous</b></td><td>fixed arrangements with a time: <i>I\'m meeting Aru at six.</i></td></tr><tr><td><b>will</b></td><td>decisions now, predictions, offers: <i>I\'ll help you. · Robots will do many jobs.</i></td></tr></table><p>Evidence now → <b>going to</b>: <i>Look at those clouds. It\'s going to rain.</i></p>',
      ex: [
        { t: 'mc', q: 'The phone is ringing. — I ___ answer it!', o: ["'ll", "'m going to", "'m answering"], a: 0, why: 'A decision made at the moment of speaking.' },
        { t: 'mc', q: 'We ___ our grandparents on Sunday — it\'s all arranged.', o: ['will visit', 'are visiting', 'visit'], a: 1 },
        { t: 'mc', q: 'My battery is at 1%. My phone ___ die!', o: ['will', 'is going to'], a: 1 },
        { t: 'gap', q: 'I think people ___ (use) phones less in the future.', a: ['will use', "'ll use"] },
        { t: 'gap', q: 'This year I ___ (going to / learn) to code.', a: ["'m going to learn", 'am going to learn'] },
        { t: 'order', a: 'I am not going to post that photo.' }
      ]},
    { id: 'r', type: 'reading', title: 'My week without a smartphone', photo: '3nSoYKQ_bqg', alt: 'Two people looking at a smartphone together',
      text: 'Last month, nineteen-year-old student Dana tried an experiment: one week without her smartphone. "My screen time was more than six hours a day," she says. "I was addicted to notifications."\n\nThe first two days were the hardest. She didn\'t know the time, she couldn\'t check the bus timetable and she felt that she was missing something important. "I kept touching my pocket," she laughs. But on day three things started to change. She read a whole book, talked more with her family and noticed small things on her walk to university.\n\nWas it all positive? Not exactly. Dana missed a group message about a change to her timetable and arrived at an empty classroom. Now she is using her phone again, but with new rules: no phone during meals, notifications off after ten, and one offline day every Sunday. "I\'m not going to throw my phone away," she says, "but I\'m going to be its boss — not the other way round."',
      ex: [
        { t: 'mc', q: 'Why did Dana do the experiment?', o: ['Her phone was broken.', 'She used her phone too much.', 'Her university asked her to.'], a: 1 },
        { t: 'tf', q: 'The first days of the experiment were easy.', a: false },
        { t: 'mc', q: 'What happened on day three?', o: ['She bought a new phone.', 'She started to enjoy the experiment.', 'She missed a class.'], a: 1 },
        { t: 'mc', q: 'Which is one of her new rules?', o: ['no phone at university', 'no phone during meals', 'no social media'], a: 1 },
        { t: 'mc', q: '“I\'m going to be its boss” means she wants to…', o: ['control how she uses the phone', 'work for a phone company', 'stop using phones'], a: 0 }
      ]},
    { id: 'c', type: 'check', title: 'Unit check', ex: [
      { t: 'mc', q: 'Turn off ___ so the phone doesn\'t disturb you.', o: ['devices', 'notifications', 'privacy'], a: 1 },
      { t: 'mc', q: 'I\'m tired. I think I ___ go to bed early.', o: ["'ll", "'m going"], a: 0 },
      { t: 'gap', q: 'Are you ___ (meet) anyone this evening?', a: ['meeting'] },
      { t: 'mc', q: 'Not connected to the internet:', o: ['offline', 'download', 'post'], a: 0 },
      { t: 'order', a: 'We are going to spend less time online.' },
      { t: 'match', p: [['device', 'phone, tablet or laptop'], ['privacy', 'keeping information secret'], ['post', 'put on social media'], ['screen time', 'time looking at screens']] }
    ]}
  ]}
]});
