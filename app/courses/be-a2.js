/* Business English A2: original IF Academy course. */
IFX.course({
  id: 'be-a2', track: 'business', level: 'A2', next: 'B1', icon: '💼',
  title: 'Business English A2', sub: 'English for your first job',
  blurb: 'The office, emails and phone calls — simple, useful English for everyday work.',
  units: [
  { id: 'u1', title: 'At work', topic: 'The workplace', lessons: [
    { id: 'v', type: 'vocab', title: 'People and places at work', words: [
      { w: 'company', p: 'noun', d: 'a business that sells goods or services', e: "I work for a food company.", ru: 'компания' },
      { w: 'manager', p: 'noun', d: 'the person in charge of a team or department', e: "My manager is very helpful.", ru: 'менеджер, руководитель' },
      { w: 'department', p: 'noun', d: 'a part of a company, e.g. sales or marketing', e: "She works in the sales department.", ru: 'отдел' },
      { w: 'customer', p: 'noun', d: 'a person who buys from a company', e: "We have customers in five cities.", ru: 'клиент' },
      { w: 'meeting', p: 'noun', d: 'when people come together to discuss something', e: "The meeting starts at ten.", ru: 'встреча, совещание' },
      { w: 'schedule', p: 'noun', d: 'a plan of times for work and events', e: "My schedule is busy this week.", ru: 'расписание' },
      { w: 'colleague', p: 'noun', d: 'a person you work with', e: "My colleagues are friendly.", ru: 'коллега' },
      { w: 'deal with', p: 'phrasal verb', d: 'to take action to solve or manage something', e: "I deal with customer emails.", ru: 'заниматься, решать' }
    ]},
    { id: 'g', type: 'grammar', title: 'Present simple and present continuous',
      rule: "<table><tr><td><b>Present simple</b> — routines, facts</td><td>I <b>start</b> work at nine. She <b>works</b> in sales.</td></tr><tr><td><b>Present continuous</b> — now, temporary</td><td>I'<b>m writing</b> a report now. We'<b>re working</b> on a new project this month.</td></tr></table><p>Signal words: <i>usually, every day, often</i> → simple · <i>now, at the moment, this week</i> → continuous.</p>",
      ex: [
        { t: 'mc', q: 'I usually ___ my emails in the morning.', o: ['check', "'m checking", 'checks'], a: 0 },
        { t: 'mc', q: "Sorry, she can't talk. She ___ with a customer now.", o: ['meets', "'s meeting", 'meet'], a: 1 },
        { t: 'gap', q: 'Our company ___ (sell) furniture.', a: ['sells'] },
        { t: 'mc', q: 'This week we ___ on a new website.', o: ['work', 'are working', 'works'], a: 1 },
        { t: 'mc', q: '___ your manager speak English?', o: ['Is', 'Does', 'Do'], a: 1 },
        { t: 'order', a: 'What are you working on at the moment?' }
      ]},
    { id: 'r', type: 'reading', title: 'A day at Steppe Foods', photo: '/media/spaces/lab-5.webp', alt: 'A desk in the IF Business Lab',
      text: "Madina is twenty-four. She works in the customer service department of Steppe Foods, a company that makes bread and biscuits in Kostanay.\n\nShe usually starts work at 8:30. First she reads the customer emails and deals with any problems. At eleven she has a short meeting with her manager and colleagues. They talk about the schedule for the week.\n\nThis month is different. The company is opening a new shop in Astana, so Madina is helping the marketing department too. She is learning a lot, but she is very busy! \"I like my job,\" she says. \"Every day I speak to new people.\"",
      ex: [
        { t: 'mc', q: 'Which department does Madina work in?', o: ['marketing', 'customer service', 'sales'], a: 1 },
        { t: 'mc', q: 'What does she do first every day?', o: ['She has a meeting.', 'She reads customer emails.', 'She visits shops.'], a: 1 },
        { t: 'tf', q: 'Madina has a meeting with her manager in the afternoon.', a: false },
        { t: 'mc', q: 'Why is this month different?', o: ['She is on holiday.', 'The company is opening a new shop.', 'She has a new manager.'], a: 1 }
      ]},
    { id: 'c', type: 'check', title: 'Unit check', ex: [
      { t: 'mc', q: 'People who buy from a company are…', o: ['colleagues', 'customers', 'managers'], a: 1 },
      { t: 'mc', q: 'He ___ to work by bus every day.', o: ['goes', 'is going', 'go'], a: 0 },
      { t: 'gap', q: "We ___ (have) a meeting right now — can I call you back?", a: ["'re having", 'are having'] },
      { t: 'mc', q: 'Sales, marketing and IT are…', o: ['departments', 'schedules', 'meetings'], a: 0 },
      { t: 'order', a: 'She deals with customer problems every day.' },
      { t: 'match', p: [['manager', 'person in charge'], ['colleague', 'person you work with'], ['schedule', 'plan of times'], ['company', 'a business']] }
    ]}
  ]},
  { id: 'u2', title: 'Calls and emails', topic: 'Communication', lessons: [
    { id: 'v', type: 'vocab', title: 'Phone and email phrases', words: [
      { w: 'call back', p: 'phrasal verb', d: 'to phone someone again, or return their call', e: "Can you call me back after lunch?", ru: 'перезвонить' },
      { w: 'hold on', p: 'phrasal verb', d: 'to wait for a short time on the phone', e: "Hold on, please. I'll get her.", ru: 'подождать' },
      { w: 'leave a message', p: 'phrase', d: 'to give information for someone who is not there', e: "Would you like to leave a message?", ru: 'оставить сообщение' },
      { w: 'available', p: 'adjective', d: 'free to talk or meet', e: "Is Mr Ivanov available?", ru: 'свободен, доступен' },
      { w: 'attach', p: 'verb', d: 'to add a file to an email', e: "I've attached the price list.", ru: 'прикрепить' },
      { w: 'confirm', p: 'verb', d: 'to say that something is definitely true or arranged', e: "Please confirm the time of the meeting.", ru: 'подтвердить' },
      { w: 'spell', p: 'verb', d: 'to say the letters of a word in order', e: "Could you spell your name, please?", ru: 'произнести по буквам' },
      { w: 'regards', p: 'noun', d: 'used to end a polite email', e: "Best regards, Aidos", ru: 'с уважением' }
    ]},
    { id: 'g', type: 'grammar', title: 'Polite requests: can, could, would you mind',
      rule: "<table><tr><td><b>Can</b> I / you…? (neutral)</td><td><b>Can</b> I speak to Ms Lee?</td></tr><tr><td><b>Could</b> you…? (more polite)</td><td><b>Could</b> you send me the file?</td></tr><tr><td><b>Would you mind</b> + -ing? (very polite)</td><td><b>Would you mind calling</b> back later?</td></tr></table><p>Answers: Sure. / Of course. / No problem. — To <i>Would you mind…?</i>: <b>Not at all.</b> (= yes, I'll do it)</p>",
      ex: [
        { t: 'mc', q: '___ you spell that, please?', o: ['Could', 'Would you mind', 'Do'], a: 0 },
        { t: 'mc', q: 'Would you mind ___ the report again?', o: ['send', 'sending', 'to send'], a: 1 },
        { t: 'gap', q: '___ I leave a message for Mr Saparov?', a: ['Can', 'Could', 'May'] },
        { t: 'mc', q: '"Would you mind waiting?" — "___"', o: ['Yes, I mind.', 'Not at all.', 'No, thanks.'], a: 1 },
        { t: 'order', a: 'Could you call me back this afternoon?' }
      ]},
    { id: 'r', type: 'reading', title: 'An email to a new customer', photo: '/media/spaces/lab-3.webp', alt: 'A laptop on a meeting table',
      text: "Subject: Your order — price list attached\n\nDear Ms Petrova,\n\nThank you for your call this morning. As we discussed, I have attached our price list for 2026. Could you check the sizes and confirm your order by Friday?\n\nI am not available on Thursday, but my colleague Arman can answer your questions. His number is 8 714 555 0192. If he is busy, please leave a message and he will call you back the same day.\n\nWould you mind sending us your company address for the delivery?\n\nBest regards,\nMadina Akhmetova\nCustomer Service, Steppe Foods",
      ex: [
        { t: 'mc', q: 'What is attached to the email?', o: ['an invoice', 'a price list', 'a contract'], a: 1 },
        { t: 'mc', q: 'When should Ms Petrova confirm her order?', o: ['by Thursday', 'by Friday', 'today'], a: 1 },
        { t: 'tf', q: 'Madina is available on Thursday.', a: false },
        { t: 'mc', q: 'What does Madina ask for at the end?', o: ['the company address', 'a phone number', 'the price list'], a: 0 }
      ]},
    { id: 'c', type: 'check', title: 'Unit check', ex: [
      { t: 'mc', q: '"___ on, please. I\'ll connect you."', o: ['Hold', 'Call', 'Leave'], a: 0 },
      { t: 'mc', q: 'Would you mind ___ the door?', o: ['close', 'closing', 'to close'], a: 1 },
      { t: 'gap', q: "I've ___ the file to this email.", a: ['attached'] },
      { t: 'mc', q: 'The best way to end a work email is…', o: ['Bye!', 'Best regards,', 'See ya,'], a: 1 },
      { t: 'order', a: 'Could you confirm the meeting time?' },
      { t: 'match', p: [['call back', 'phone again'], ['available', 'free to talk'], ['confirm', 'say it is arranged'], ['spell', 'say the letters']] }
    ]}
  ]}
  ]
});
