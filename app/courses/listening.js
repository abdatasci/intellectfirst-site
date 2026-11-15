/* Listening lessons for every IF English course (original IF Academy scripts).
   Each line is spoken in a natural British voice: woman (g: 'f') or man (g: 'm').
   Children's courses use the children's voices; teen and adult courses use the adult voices. */
(function () {
  var A = function (cid, uid, l) { IFX.listening(cid, uid, l); };
  var f = function (s, t) { return { s: s, g: 'f', t: t }; }, m = function (s, t) { return { s: s, g: 'm', t: t }; };

  /* ---------------- General English A1 ---------------- */
  A('ge-a1', 'u1', { title: 'First day at IF Academy', intro: 'Aliya meets a new student before class.', script: [
    f('Aliya', "Hi! Are you a new student?"),
    m('Tom', "Yes, I am. I'm Tom. What's your name?"),
    f('Aliya', "My name is Aliya. Nice to meet you, Tom. Where are you from?"),
    m('Tom', "I'm from Manchester, in England. And you?"),
    f('Aliya', "I'm from Kostanay. I'm a student at the university. Are you a student too?"),
    m('Tom', "No, I'm not. I'm a teacher. I teach music at a school here."),
    f('Aliya', "Oh, great! Is your wife here too?"),
    m('Tom', "No, I'm not married. Oh — the class is starting. See you later, Aliya!")
  ], ex: [
    { t: 'mc', q: 'Where is Tom from?', o: ['Kostanay', 'Manchester', 'London'], a: 1 },
    { t: 'tf', q: 'Aliya is a university student.', a: true },
    { t: 'mc', q: "What is Tom's job?", o: ['student', 'doctor', 'music teacher'], a: 2 },
    { t: 'tf', q: 'Tom is married.', a: false },
    { t: 'gap', q: 'Nice to ___ you, Tom.', a: ['meet'] }
  ]});
  A('ge-a1', 'u2', { title: 'A new flat', intro: 'Dana phones her brother about her new flat.', script: [
    m('Arman', "Hi, Dana! How is your new flat?"),
    f('Dana', "It's great! It's small, but it's very nice. It's got two bedrooms and a big kitchen."),
    m('Arman', "Two bedrooms? Who lives with you?"),
    f('Dana', "My sister, Madina. Her bedroom is next to the kitchen."),
    m('Arman', "Is it near your work?"),
    f('Dana', "Yes, it's ten minutes on foot. Come and visit on Saturday! Mum and Dad are coming too."),
    m('Arman', "OK, see you on Saturday!")
  ], ex: [
    { t: 'mc', q: 'How many bedrooms has the flat got?', o: ['one', 'two', 'three'], a: 1 },
    { t: 'mc', q: 'Who lives with Dana?', o: ['her brother', 'her mother', 'her sister'], a: 2 },
    { t: 'tf', q: 'The kitchen is small.', a: false },
    { t: 'mc', q: 'How does Dana get to work?', o: ['by bus', 'on foot', 'by car'], a: 1 },
    { t: 'gap', q: 'Come and visit on ___!', a: ['Saturday'] }
  ]});

  /* ---------------- General English A2 ---------------- */
  A('ge-a2', 'u1', { title: 'A podcast about routines', intro: 'Two people talk about their daily routine on a radio show.', script: [
    f('Host', "Welcome back to Morning Kostanay. Today we're talking about routines. Erlan, you're a nurse. What time do you get up?"),
    m('Erlan', "Very early! I usually get up at half past five, because my shift starts at seven."),
    f('Host', "Do you have breakfast?"),
    m('Erlan', "Not at home. I have a coffee and a sandwich at the hospital at about ten."),
    f('Host', "And what do you do after work?"),
    m('Erlan', "I finish at four. Then I go to the gym three times a week, and I always read before bed."),
    f('Host', "That sounds healthy! What time do you go to bed?"),
    m('Erlan', "Never after ten o'clock.")
  ], ex: [
    { t: 'mc', q: 'What time does Erlan get up?', o: ['5:30', '7:00', '10:00'], a: 0 },
    { t: 'mc', q: 'Where does he have breakfast?', o: ['at home', 'at a café', 'at the hospital'], a: 2 },
    { t: 'mc', q: 'How often does he go to the gym?', o: ['every day', 'three times a week', 'at weekends'], a: 1 },
    { t: 'tf', q: 'Erlan reads before bed.', a: true },
    { t: 'gap', q: 'He never goes to bed after ___ o\'clock.', a: ['ten', '10'] }
  ]});
  A('ge-a2', 'u2', { title: 'Ordering in a café', intro: 'A customer orders at a coffee shop.', script: [
    m('Waiter', "Good afternoon. What can I get you?"),
    f('Customer', "Hi. Can I have a large cappuccino, please?"),
    m('Waiter', "Of course. Anything to eat?"),
    f('Customer', "Yes, I'd like a piece of chocolate cake. Oh — have you got any soup?"),
    m('Waiter', "Sorry, we haven't got any soup today. We've got some chicken sandwiches."),
    f('Customer', "No, thanks. Just the cake. How much is that?"),
    m('Waiter', "That's two thousand four hundred tenge, please."),
    f('Customer', "Can I pay by card?"),
    m('Waiter', "Yes, of course.")
  ], ex: [
    { t: 'mc', q: 'What does the customer drink?', o: ['tea', 'a cappuccino', 'juice'], a: 1 },
    { t: 'tf', q: 'The café has got soup today.', a: false },
    { t: 'mc', q: 'What does she eat?', o: ['a sandwich', 'soup', 'chocolate cake'], a: 2 },
    { t: 'mc', q: 'How much does she pay?', o: ['1,400 tenge', '2,400 tenge', '2,800 tenge'], a: 1 },
    { t: 'gap', q: 'Can I pay by ___?', a: ['card'] }
  ]});
  A('ge-a2', 'u3', { title: 'A holiday story', intro: 'Two friends talk about a holiday.', script: [
    m('Nurlan', "Hi Sara! How was your holiday in Turkey?"),
    f('Sara', "It was amazing, but the first day was terrible! Our flight was four hours late."),
    m('Nurlan', "Oh no! What did you do?"),
    f('Sara', "We waited at the airport and played cards. Then, when we arrived, the hotel didn't have our booking!"),
    m('Nurlan', "Really? Where did you sleep?"),
    f('Sara', "They gave us a room in another hotel — next to the sea! It was much better."),
    m('Nurlan', "Lucky you! Did you swim every day?"),
    f('Sara', "Yes, and we went on a boat trip. I took hundreds of photos.")
  ], ex: [
    { t: 'mc', q: 'Where did Sara go?', o: ['Spain', 'Turkey', 'Egypt'], a: 1 },
    { t: 'mc', q: 'How late was the flight?', o: ['two hours', 'four hours', 'one day'], a: 1 },
    { t: 'tf', q: 'The first hotel had their booking.', a: false },
    { t: 'mc', q: 'What was special about the second hotel?', o: ['It was cheap.', 'It was next to the sea.', 'It had a pool.'], a: 1 },
    { t: 'gap', q: 'We went on a ___ trip.', a: ['boat'] }
  ]});

  /* ---------------- General English B1 ---------------- */
  A('ge-b1', 'u1', { title: 'A job interview', intro: 'Aigerim has an interview for a job in marketing.', script: [
    m('Manager', "Thanks for coming in, Aigerim. So, tell me about your experience."),
    f('Aigerim', "I've worked in marketing for three years. At the moment I'm working for a small IT company in Kostanay."),
    m('Manager', "Why do you want to leave?"),
    f('Aigerim', "I enjoy my job, but I'd like more responsibility. I've never managed a team, and I'd love to learn."),
    m('Manager', "This job is remote three days a week. Have you ever worked from home?"),
    f('Aigerim', "Yes, during the pandemic. I'm very organised, so I don't find it stressful."),
    m('Manager', "Good. And the salary — is that OK for you?"),
    f('Aigerim', "Yes, it's fine. When can I expect to hear from you?"),
    m('Manager', "We'll call you by Friday.")
  ], ex: [
    { t: 'mc', q: 'How long has Aigerim worked in marketing?', o: ['one year', 'three years', 'five years'], a: 1 },
    { t: 'mc', q: 'Why does she want a new job?', o: ['She wants a higher salary.', 'She wants more responsibility.', 'She doesn\'t like her colleagues.'], a: 1 },
    { t: 'tf', q: 'Aigerim has managed a team before.', a: false },
    { t: 'mc', q: 'How many days a week is the job remote?', o: ['two', 'three', 'five'], a: 1 },
    { t: 'gap', q: 'We\'ll call you by ___.', a: ['Friday'] }
  ]});
  A('ge-b1', 'u2', { title: 'Too much screen time?', intro: 'A father and his teenage daughter disagree about phones.', script: [
    m('Dad', "Kamila, you've been on your phone for three hours. Can you put it down?"),
    f('Kamila', "Dad, I'm not just playing. I'm doing my homework on it!"),
    m('Dad', "With forty notifications a minute? Honestly, I think you're addicted to it."),
    f('Kamila', "That's not fair. You check your emails at dinner every night."),
    m('Dad', "Hmm. OK, that's true. What if we both try something? No phones at dinner and none after ten."),
    f('Kamila', "Fine — but only if you turn yours off too. And I want to download one more app first!"),
    m('Dad', "Deal. Starting tonight.")
  ], ex: [
    { t: 'mc', q: 'How long has Kamila been on her phone?', o: ['one hour', 'three hours', 'all day'], a: 1 },
    { t: 'mc', q: 'What does Kamila say she is doing?', o: ['playing games', 'chatting to friends', 'homework'], a: 2 },
    { t: 'tf', q: 'Dad agrees that he also uses his phone too much.', a: true },
    { t: 'mc', q: 'What is the new rule?', o: ['no phones at weekends', 'no phones at dinner and after ten', 'one hour a day'], a: 1 },
    { t: 'gap', q: 'Kamila says Dad checks his ___ at dinner.', a: ['emails', 'email'] }
  ]});

  /* ---------------- General English B2 ---------------- */
  A('ge-b2', 'u1', { title: 'Breaking a habit', intro: 'A radio interview with a sports coach about changing habits.', script: [
    f('Presenter', "My guest today is coach Ruslan Bekov. Ruslan, why do most New Year's resolutions fail?"),
    m('Ruslan', "Because people rely on willpower. Willpower is like a battery — by the evening it's empty."),
    f('Presenter', "So what should we do instead?"),
    m('Ruslan', "Make the new habit easy and tiny. If you want to take up running, don't start with ten kilometres. Put your trainers by the door and run for five minutes."),
    f('Presenter', "And if you want to give something up, like sugar?"),
    m('Ruslan', "Make it harder to get. I used to keep chocolate in my desk. Now I don't buy it, so I've got used to not having it."),
    f('Presenter', "How long does it take?"),
    m('Ruslan', "Longer than people think — about two months. And missing one day doesn't matter. Just don't miss two.")
  ], ex: [
    { t: 'mc', q: 'Why do resolutions fail, according to Ruslan?', o: ['People are lazy.', 'People depend on willpower.', 'The goals are too small.'], a: 1 },
    { t: 'mc', q: 'What does he compare willpower to?', o: ['a muscle', 'a battery', 'a clock'], a: 1 },
    { t: 'tf', q: 'He advises beginners to run ten kilometres.', a: false },
    { t: 'mc', q: 'How did Ruslan cut down on chocolate?', o: ['He stopped buying it.', 'He ate it only at weekends.', 'He gave it to colleagues.'], a: 0 },
    { t: 'gap', q: 'Missing one day doesn\'t matter. Just don\'t miss ___.', a: ['two'] }
  ]});
  A('ge-b2', 'u2', { title: 'Is it fake?', intro: 'Two journalists check a story before it is published.', script: [
    f('Editor', "Marat, this video of the flood is going viral. Can we use it?"),
    m('Marat', "Not yet. It's said to be from Kostanay, but I'm not convinced. Look at the cars — they're driving on the left."),
    f('Editor', "Good point. Where did it come from?"),
    m('Marat', "The source is an anonymous account created two days ago. That's not reliable."),
    f('Editor', "Did you do a reverse image search?"),
    m('Marat', "Yes. The same video appeared in 2019 — it's thought to have been filmed in Australia."),
    f('Editor', "So the headline is completely misleading. Let's write about that instead: how fake videos spread."),
    m('Marat', "I'll have it ready in an hour.")
  ], ex: [
    { t: 'mc', q: 'Why does Marat doubt the video first?', o: ['The quality is bad.', 'The cars drive on the left.', 'There is no sound.'], a: 1 },
    { t: 'tf', q: 'The source is a well-known news agency.', a: false },
    { t: 'mc', q: 'Where was the video probably filmed?', o: ['Kostanay', 'Australia', 'the UK'], a: 1 },
    { t: 'mc', q: 'What will they write about?', o: ['the flood in Kostanay', 'how fake videos spread', 'the weather in Australia'], a: 1 },
    { t: 'gap', q: 'The video is thought to have been ___ in Australia.', a: ['filmed'] }
  ]});

  /* ---------------- General English C1 ---------------- */
  A('ge-c1', 'u1', { title: 'A debate: should homework be banned?', intro: 'Two teachers debate on a school podcast.', script: [
    f('Ms Clarke', "I'll concede that some homework is pointless. But banning it altogether would undermine what we do in class. Practice is how skills become automatic."),
    m('Mr Shaw', "That's a compelling point in theory, but the evidence for primary school is weak. Younger children gain very little, and it often widens the gap between families who can help and those who can't."),
    f('Ms Clarke', "So the answer is better homework, not none. Short, purposeful tasks — reading, or practising what they learnt that day."),
    m('Mr Shaw', "On that I agree. Rarely have I seen a twenty-question worksheet change anything. But I'd go further: for under-tens, scrap set homework and encourage reading for pleasure."),
    f('Ms Clarke', "And for teenagers?"),
    m('Mr Shaw', "For teenagers it's credible — as long as it's feedback-driven, not busywork.")
  ], ex: [
    { t: 'mc', q: 'What does Ms Clarke concede?', o: ['All homework should be banned.', 'Some homework is pointless.', 'Teenagers need no homework.'], a: 1 },
    { t: 'mc', q: "Mr Shaw's main concern about homework for young children is that it…", o: ['takes too long to mark', 'can increase inequality between families', 'is too difficult'], a: 1 },
    { t: 'tf', q: 'Both speakers agree that short, purposeful tasks are better than long worksheets.', a: true },
    { t: 'mc', q: 'What does Mr Shaw recommend for under-tens?', o: ['more worksheets', 'reading for pleasure', 'weekend homework only'], a: 1 },
    { t: 'gap', q: 'Rarely ___ I seen a worksheet change anything.', a: ['have'] }
  ]});
  A('ge-c1', 'u2', { title: 'Will AI take my job?', intro: 'A careers adviser talks to a translator.', script: [
    f('Asel', "I've been a translator for twelve years, and half my clients now use machine translation. I'm worried my job will be obsolete."),
    m('Adviser', "It's a fair worry. But automation tends to replace tasks, not whole professions. Which parts of your work are still in demand?"),
    f('Asel', "Legal documents, mostly — clients need someone to take responsibility for accuracy."),
    m('Adviser', "Exactly. If you had specialised earlier, you'd probably feel safer now. The good news is it's not too late to upskill."),
    f('Asel', "You mean a legal qualification?"),
    m('Adviser', "Possibly, or training in editing machine output. Many translators now work as post-editors. Those who adapt quickly will have plenty of work.")
  ], ex: [
    { t: 'mc', q: 'How long has Asel been a translator?', o: ['six years', 'ten years', 'twelve years'], a: 2 },
    { t: 'mc', q: 'Which work is still in demand for her?', o: ['marketing texts', 'legal documents', 'film subtitles'], a: 1 },
    { t: 'tf', q: 'The adviser thinks it is too late for Asel to change.', a: false },
    { t: 'mc', q: '"If you had specialised earlier, you\'d probably feel safer now" is…', o: ['a mixed conditional', 'a first conditional', 'reported speech'], a: 0 },
    { t: 'gap', q: 'Many translators now work as post-___.', a: ['editors'] }
  ]});

  /* ---------------- General English C2 ---------------- */
  A('ge-c2', 'u1', { title: 'A review that split the critics', intro: 'Two critics discuss a new novel on a radio arts programme.', script: [
    m('Julian', "By and large, I admired it. The prose is meticulous, though the ending is a double-edged sword — daring, but it leaves half the plot unresolved."),
    f('Helen', "I'd take the rave reviews with a pinch of salt. What the novel lacks is any real tension. It was the publicity, not the book, that created the excitement."),
    m('Julian', "Now you're splitting hairs. Tension isn't everything; atmosphere is at a premium in fiction these days, and this has it in abundance."),
    f('Helen', "Whether it deserves the prize is, frankly, a moot point — it's already a bestseller."),
    m('Julian', "True. But the jury is still out on whether it'll be read in ten years.")
  ], ex: [
    { t: 'mc', q: "Julian's overall view of the novel is…", o: ['mostly positive', 'completely negative', 'neutral'], a: 0 },
    { t: 'mc', q: 'According to Helen, what created the excitement?', o: ['the ending', 'the publicity', 'the prize'], a: 1 },
    { t: 'tf', q: 'Helen thinks the book has a lot of tension.', a: false },
    { t: 'mc', q: '"A moot point" in Helen\'s sentence means…', o: ['no longer worth arguing about', 'an excellent point', 'a secret'], a: 0 },
    { t: 'gap', q: 'What the novel ___ is any real tension.', a: ['lacks'] }
  ]});
  A('ge-c2', 'u2', { title: 'Growing up with three languages', intro: 'A linguist interviews a trilingual student.', script: [
    f('Linguist', "You grew up speaking Kazakh, Russian and English. Do you feel like a different person in each?"),
    m('Daniyar', "Somewhat. Having learnt English through films and online gaming, my English register is quite colloquial — I sometimes sound too informal in emails."),
    f('Linguist', "And when do you code-switch?"),
    m('Daniyar', "Constantly with friends — mid-sentence, even. It isn't laziness; some ideas simply have the right connotation in one language and not another."),
    f('Linguist', "Have you ever felt pressure to drop one of them?"),
    m('Daniyar', "At school, yes. Not wanting to stand out, I avoided speaking Kazakh for years. It's only recently that I've reclaimed it — my grandmother's vernacular, her idioms. Losing that would have meant losing part of myself.")
  ], ex: [
    { t: 'mc', q: 'How did Daniyar mainly learn English?', o: ['at university', 'through films and gaming', 'from his grandmother'], a: 1 },
    { t: 'mc', q: 'What problem does he mention with his English?', o: ['It is too formal.', 'It is sometimes too informal for emails.', 'His pronunciation.'], a: 1 },
    { t: 'tf', q: 'He sees code-switching as a sign of laziness.', a: false },
    { t: 'mc', q: 'Why did he avoid speaking Kazakh at school?', o: ['He had forgotten it.', 'He didn\'t want to stand out.', 'It was not allowed.'], a: 1 },
    { t: 'gap', q: 'It\'s only recently ___ I\'ve reclaimed it.', a: ['that'] }
  ]});

  /* ---------------- Business English A2 ---------------- */
  A('be-a2', 'u1', { title: 'A new colleague', intro: 'A manager shows a new employee around the office.', script: [
    f('Manager', "Welcome to Steppe Foods, Timur. I'm Gulnara, the sales manager."),
    m('Timur', "Nice to meet you. Thank you."),
    f('Manager', "This is the sales department. There are six people in the team. Your desk is next to the window."),
    m('Timur', "Great. What time do we usually start?"),
    f('Manager', "At nine. We have a team meeting every Monday at ten. Today we're preparing a big order for a customer in Astana, so everyone is very busy."),
    m('Timur', "Who do I ask if I have a problem with my computer?"),
    f('Manager', "Ask Bolat in the IT department, on the second floor.")
  ], ex: [
    { t: 'mc', q: "What is Gulnara's job?", o: ['IT manager', 'sales manager', 'customer'], a: 1 },
    { t: 'mc', q: 'How many people are in the sales team?', o: ['four', 'six', 'ten'], a: 1 },
    { t: 'mc', q: 'When is the team meeting?', o: ['every day at nine', 'Mondays at ten', 'Fridays at ten'], a: 1 },
    { t: 'tf', q: 'Today the team is preparing an order for Astana.', a: true },
    { t: 'gap', q: 'The IT department is on the ___ floor.', a: ['second', '2nd'] }
  ]});
  A('be-a2', 'u2', { title: 'Taking a phone message', intro: 'A customer calls Steppe Foods.', script: [
    f('Madina', "Good morning, Steppe Foods, Madina speaking. How can I help?"),
    m('Mr Wilson', "Hello. Could I speak to Arman Seitkali, please?"),
    f('Madina', "I'm sorry, he isn't available. He's in a meeting. Would you like to leave a message?"),
    m('Mr Wilson', "Yes, please. My name is David Wilson, from Northway Shops."),
    f('Madina', "Could you spell your surname, please?"),
    m('Mr Wilson', "W-I-L-S-O-N. Could he call me back this afternoon? My number is 8 701 555 3420."),
    f('Madina', "So that's 8 701 555 3420. I'll give him the message."),
    m('Mr Wilson', "Thank you very much.")
  ], ex: [
    { t: 'mc', q: 'Why can\'t Arman speak?', o: ['He is on holiday.', 'He is in a meeting.', 'He is ill.'], a: 1 },
    { t: 'mc', q: 'Which company is Mr Wilson from?', o: ['Steppe Foods', 'Northway Shops', 'Wilson and Co'], a: 1 },
    { t: 'gap', q: 'The caller\'s surname is ___.', a: ['Wilson'] },
    { t: 'mc', q: 'When should Arman call back?', o: ['this morning', 'this afternoon', 'tomorrow'], a: 1 },
    { t: 'gap', q: 'The phone number ends in 555 ___.', a: ['3420'] }
  ]});

  /* ---------------- Business English B1 ---------------- */
  A('be-b1', 'u1', { title: 'A project meeting', intro: 'A team plans the opening of a new shop.', script: [
    f('Chair', "OK, let's start. We've got three items on the agenda: the opening date, the budget and staff. Ruslan, the date?"),
    m('Ruslan', "The builders say the shop will be ready on 20th March, so I suggest we open on the 25th."),
    f('Chair', "Does everyone agree? … Good. Next, the budget. Aliya?"),
    f('Aliya', "We're about ten percent over budget because of the new lights. I'd recommend cutting the advertising, not the lights."),
    m('Ruslan', "I'm not sure I agree. Without advertising, nobody will know we've opened."),
    f('Chair', "Let's come back to that on Friday with exact numbers. Finally, staff — we need four people. Ruslan, can you put the job advert online this week?"),
    m('Ruslan', "Sure, I'll do it tomorrow.")
  ], ex: [
    { t: 'mc', q: 'How many items are on the agenda?', o: ['two', 'three', 'four'], a: 1 },
    { t: 'mc', q: 'When will the shop open?', o: ['20th March', '25th March', '30th March'], a: 1 },
    { t: 'mc', q: 'Why is the project over budget?', o: ['staff costs', 'advertising', 'new lights'], a: 2 },
    { t: 'tf', q: 'Ruslan agrees with cutting the advertising.', a: false },
    { t: 'gap', q: 'They need ___ new staff.', a: ['four', '4'] }
  ]});
  A('be-b1', 'u2', { title: 'A customer complaint', intro: 'A customer calls about a late delivery.', script: [
    m('Customer', "Hello, I ordered a sofa three weeks ago and it still hasn't arrived. You promised delivery in ten days."),
    f('Agent', "I'm very sorry to hear that, Mr Nurov. Could you give me your order number?"),
    m('Customer', "It's 4-5-8-2-1."),
    f('Agent', "Thank you. I can see the problem — the sofa was sent to our Almaty warehouse by mistake. I do apologise."),
    m('Customer', "So when will I get it?"),
    f('Agent', "It will arrive on Thursday. And to say sorry, we'd like to offer you free delivery and a fifteen percent discount."),
    m('Customer', "Well, that's fair. Thank you for sorting it out.")
  ], ex: [
    { t: 'mc', q: 'What did the customer order?', o: ['a table', 'a sofa', 'a bed'], a: 1 },
    { t: 'mc', q: 'What was the problem?', o: ['It was broken.', 'It went to the wrong warehouse.', 'It was the wrong colour.'], a: 1 },
    { t: 'gap', q: 'The order number is 4582___.', a: ['1'] },
    { t: 'mc', q: 'What does the company offer?', o: ['a refund', 'free delivery and 15% off', 'a new sofa'], a: 1 },
    { t: 'tf', q: 'The customer is happy with the solution at the end.', a: true }
  ]});

  /* ---------------- Business English B2 ---------------- */
  A('be-b2', 'u1', { title: 'Negotiating a supply deal', intro: 'A buyer and a supplier negotiate the price of furniture.', script: [
    f('Buyer', "Your price of eighty thousand tenge per chair is too high for us. Our bottom line is sixty-five."),
    m('Supplier', "Sixty-five is below our costs, I'm afraid. But if you ordered two hundred chairs instead of one hundred, we could go down to seventy-two."),
    f('Buyer', "Two hundred is a big commitment. What about seventy, provided that delivery is included?"),
    m('Supplier', "We could include delivery as long as you pay half in advance."),
    f('Buyer', "Half in advance is difficult. Thirty percent?"),
    m('Supplier', "Forty, and we have a deal — seventy thousand, delivery included, two hundred chairs."),
    f('Buyer', "Agreed. That's a win-win, I think.")
  ], ex: [
    { t: 'mc', q: "What was the supplier's first price per chair?", o: ['65,000', '72,000', '80,000'], a: 2 },
    { t: 'mc', q: 'How many chairs do they finally agree on?', o: ['100', '150', '200'], a: 2 },
    { t: 'mc', q: 'What is the final price?', o: ['65,000', '70,000', '72,000'], a: 1 },
    { t: 'gap', q: 'The buyer pays ___ percent in advance.', a: ['forty', '40'] },
    { t: 'tf', q: 'Delivery is included in the final deal.', a: true }
  ]});
  A('be-b2', 'u2', { title: 'Presenting the quarter', intro: 'A sales director presents results to the board.', script: [
    m('Director', "Good morning. Let me start with a quick outline: sales, costs and next steps."),
    m('Director', "Sales rose sharply in July, by eighteen percent, after the summer campaign. They peaked in August and then levelled off in September."),
    m('Director', "Costs fell slightly — by three percent — thanks to our new logistics partner."),
    f('Board member', "Sorry to interrupt — what happened to online sales?"),
    m('Director', "Good question. Online sales fluctuated, but overall they grew from twenty to twenty-six percent of total revenue."),
    m('Director', "To wrap up: a strong quarter. I'd like to highlight one priority — expanding online before the new year.")
  ], ex: [
    { t: 'mc', q: 'By how much did sales rise in July?', o: ['by 3%', 'by 18%', 'by 26%'], a: 1 },
    { t: 'mc', q: 'When did sales reach their highest point?', o: ['July', 'August', 'September'], a: 1 },
    { t: 'mc', q: 'Why did costs fall?', o: ['a new logistics partner', 'fewer staff', 'a cheaper office'], a: 0 },
    { t: 'gap', q: 'Online sales grew from twenty to ___ percent of revenue.', a: ['twenty-six', '26', 'twenty six'] },
    { t: 'tf', q: 'The priority is to open new shops.', a: false }
  ]});

  /* ---------------- Business English C1 ---------------- */
  A('be-c1', 'u1', { title: 'A difficult conversation', intro: 'A director gives feedback to a team leader.', script: [
    f('Director', "Arman, I wanted to talk about the Astana project. I'm not entirely convinced the team is getting enough space."),
    m('Arman', "What do you mean?"),
    f('Director', "Two people have mentioned that every decision has to go through you. It might be worth delegating some of that."),
    m('Arman', "I suppose I do micromanage a little. The client is important, and I don't want mistakes."),
    f('Director', "That's understandable. But wouldn't it be better to agree clear goals and let them take the initiative? You'd still have accountability — just at a different level."),
    m('Arman', "Fair enough. I'll try giving Dana full responsibility for the next client report."),
    f('Director', "Good. Let's review how it went in two weeks.")
  ], ex: [
    { t: 'mc', q: "What is the director's main concern?", o: ['The client is unhappy.', 'Arman controls every decision.', 'The team is too small.'], a: 1 },
    { t: 'mc', q: 'Why does Arman say he micromanages?', o: ['He doesn\'t trust Dana.', 'The client is important.', 'He is new.'], a: 1 },
    { t: 'tf', q: 'The director speaks in a direct, critical way without softening.', a: false },
    { t: 'mc', q: 'What will Dana be responsible for?', o: ['the budget', 'the next client report', 'hiring'], a: 1 },
    { t: 'gap', q: 'They will review it in two ___.', a: ['weeks'] }
  ]});
  A('be-c1', 'u2', { title: 'Board discussion: expansion', intro: 'Two board members discuss entering a new market.', script: [
    m('CFO', "The Uzbek market is on the verge of opening up. If we move now, by 2028 we'll have built a five percent market share."),
    f('CEO', "And the risk? We've never operated outside Kazakhstan."),
    m('CFO', "That's why I'd propose a partnership with a local distributor rather than an acquisition. We leverage their network and mitigate most of the regulatory risk."),
    f('CEO', "Due diligence on the distributor first, then. And a contingency plan if the currency falls."),
    m('CFO', "Agreed. The report is due to be finished by the end of the month."),
    f('CEO', "Then this time next month we'll be presenting it to the board. Good.")
  ], ex: [
    { t: 'mc', q: 'What market share does the CFO expect by 2028?', o: ['2%', '5%', '15%'], a: 1 },
    { t: 'mc', q: 'What does the CFO propose?', o: ['buying a company', 'a partnership with a local distributor', 'opening their own shops'], a: 1 },
    { t: 'tf', q: 'The company already operates in other countries.', a: false },
    { t: 'mc', q: 'What does the CEO want a contingency plan for?', o: ['a fall in the currency', 'staff leaving', 'a competitor'], a: 0 },
    { t: 'gap', q: 'The report is ___ to be finished by the end of the month.', a: ['due'] }
  ]});

  /* ---------------- IELTS (exam-style listening) ---------------- */
  A('ielts', 'u1', { title: 'Listening Part 1: booking a course', intro: 'A man phones a language school. Complete the form.', task: 'IELTS Part 1: write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.', script: [
    f('Receptionist', "Good afternoon, City Language Centre. How can I help?"),
    m('Caller', "Hi, I'd like to book an IELTS preparation course, please."),
    f('Receptionist', "Of course. Can I take your name?"),
    m('Caller', "It's Michael Brennan — that's B-R-E-N-N-A-N."),
    f('Receptionist', "Thank you. And is this the full-time or the evening course?"),
    m('Caller', "The evening one. I work during the day."),
    f('Receptionist', "That runs on Tuesdays and Thursdays from six thirty. It starts on the fourteenth of March and lasts eight weeks."),
    m('Caller', "And the price?"),
    f('Receptionist', "It's two hundred and forty pounds, but there's a ten percent discount if you pay before the first of March."),
    m('Caller', "Great. How did you say I could pay?"),
    f('Receptionist', "By bank transfer or by card at reception. Oh, and could I have a contact number?"),
    m('Caller', "Yes, it's 07700 900 418.")
  ], ex: [
    { t: 'gap', q: 'Surname: ___', a: ['Brennan'] },
    { t: 'mc', q: 'Course type:', o: ['full-time', 'evening', 'weekend'], a: 1 },
    { t: 'gap', q: 'Start date: ___ March', a: ['14', '14th', 'fourteenth'] },
    { t: 'gap', q: 'Length of course: ___ weeks', a: ['8', 'eight'] },
    { t: 'gap', q: 'Price: £___', a: ['240'] },
    { t: 'mc', q: 'Discount if you pay before:', o: ['1 March', '14 March', '1 April'], a: 0 }
  ]});
  A('ielts', 'u2', { title: 'Listening Part 3: discussing an essay', intro: 'Two students discuss their essay plan with a tutor.', task: 'IELTS Part 3: choose the correct answer.', script: [
    m('Tutor', "So, your essay question is whether cities should ban cars from their centres. What's your position?"),
    f('Zarina', "We agree with the ban, mostly. But Tom thinks we should mention the effect on small shops."),
    m('Tom', "Right — because if customers can't drive in, some shops might lose business. That's the strongest counter-argument."),
    m('Tutor', "Good. A balanced essay needs that. Where will you put it?"),
    f('Zarina', "In the third paragraph, and then we'll answer it with evidence from Oslo, where shop sales actually went up."),
    m('Tutor', "Excellent — specific examples like that impress examiners. Just make sure your conclusion clearly repeats your opinion. Many students forget that.")
  ], ex: [
    { t: 'mc', q: "What is the students' opinion?", o: ['They mostly support a ban.', 'They are against a ban.', 'They have no opinion yet.'], a: 0 },
    { t: 'mc', q: "Tom's concern is about…", o: ['pollution', 'small shops losing customers', 'public transport'], a: 1 },
    { t: 'mc', q: 'Where will they put the counter-argument?', o: ['the introduction', 'the third paragraph', 'the conclusion'], a: 1 },
    { t: 'mc', q: 'What happened in Oslo?', o: ['Shop sales fell.', 'Shop sales rose.', 'The ban was cancelled.'], a: 1 },
    { t: 'mc', q: 'What does the tutor warn about?', o: ['writing too many words', 'forgetting to repeat the opinion in the conclusion', 'using examples'], a: 1 }
  ]});
  A('ielts', 'u3', { title: 'Listening Part 4: a lecture on reading habits', intro: 'Part of a university lecture. Complete the notes.', task: 'IELTS Part 4: write ONE WORD ONLY for each answer.', script: [
    f('Lecturer', "Today I want to look at how young people's reading habits have changed. A common claim is that teenagers have simply stopped reading. The data suggest something more complicated."),
    f('Lecturer', "In a survey of two thousand fifteen-year-olds, eighty percent said they read every day — but mostly on screens, and mostly short texts such as messages and articles."),
    f('Lecturer', "What has declined is reading for pleasure: long fiction. Only one in five read a novel in the previous month, compared with almost half twenty years ago."),
    f('Lecturer', "Why does this matter? Researchers link long-form reading with concentration and a wider vocabulary. Screen reading tends to encourage skimming rather than deep attention."),
    f('Lecturer', "Interestingly, audiobooks are growing fastest among this age group, which suggests that interest in stories hasn't disappeared — only the format has changed.")
  ], ex: [
    { t: 'gap', q: 'Survey size: two ___ fifteen-year-olds', a: ['thousand'] },
    { t: 'mc', q: 'Percentage who read every day:', o: ['20%', '50%', '80%'], a: 2 },
    { t: 'gap', q: 'The kind of reading that has declined: reading for ___', a: ['pleasure'] },
    { t: 'gap', q: 'Long-form reading is linked with concentration and a wider ___.', a: ['vocabulary'] },
    { t: 'gap', q: 'Screen reading encourages ___ rather than deep attention.', a: ['skimming'] },
    { t: 'gap', q: 'Growing fastest among teenagers: ___', a: ['audiobooks'] }
  ]});

  /* ---------------- Young Learners: Starters (children's voices) ---------------- */
  A('yl-starters', 'u1', { title: 'Tom and his pets', intro: 'Listen to Tom.', task: 'Listen and choose the picture.', script: [
    m('Tom', "Hello! I'm Tom. I've got a cat. Its name is Pickle. It's orange!"),
    f('Lucy', "Hi Tom! I'm Lucy. I haven't got a cat. I've got a fish. It's very small."),
    m('Tom', "My grandma has got a dog. It's big and brown."),
    f('Lucy', "Look! A bird in the tree!")
  ], ex: [
    { t: 'picmc', q: 'What has Tom got?', o: ['dog', 'cat', 'fish'], a: 1 },
    { t: 'picmc', q: 'What has Lucy got?', o: ['fish', 'bird', 'spider'], a: 0 },
    { t: 'picmc', q: "What has Tom's grandma got?", o: ['cat', 'snake', 'dog'], a: 2 },
    { t: 'picmc', q: 'What is in the tree?', o: ['bird', 'cat', 'fish'], a: 0 }
  ]});
  A('yl-starters', 'u2', { title: 'Lunch time', intro: 'Listen to Lucy and Tom at lunch.', task: 'Listen and choose the picture.', script: [
    f('Lucy', "I'm hungry! I've got a banana and an apple."),
    m('Tom', "I've got an egg and a carrot. I don't like carrots!"),
    f('Lucy', "Do you like cake?"),
    m('Tom', "Yes, I do! And I love ice cream!")
  ], ex: [
    { t: 'picmc', q: 'Which fruit has Lucy got?', o: ['banana', 'carrot', 'egg'], a: 0 },
    { t: 'picmc', q: "What doesn't Tom like?", o: ['cake', 'carrot', 'icecream'], a: 1 },
    { t: 'picmc', q: 'What does Tom love?', o: ['apple', 'egg', 'icecream'], a: 2 }
  ]});
  A('yl-starters', 'u3', { title: 'At the toy shop', intro: 'Listen to Lucy in the toy shop.', task: 'Listen and choose the picture.', script: [
    f('Lucy', "Wow! Look at all the toys!"),
    m('Shopkeeper', "Hello! What would you like?"),
    f('Lucy', "I'd like a kite, please. A red kite."),
    m('Shopkeeper', "Here you are. And for your brother?"),
    f('Lucy', "He likes robots. A robot, please!")
  ], ex: [
    { t: 'picmc', q: 'What does Lucy want?', o: ['ball', 'kite', 'teddy'], a: 1 },
    { t: 'picmc', q: 'What does her brother like?', o: ['robot', 'car', 'balloon'], a: 0 },
    { t: 'mc', q: 'What colour is the kite?', o: ['blue', 'red', 'green'], a: 1 }
  ]});

  /* ---------------- Maths in English (children's voices) ---------------- */
  A('maths', 'u1', { title: 'Count with Ben', intro: 'Listen to Ben counting.', task: 'Listen and answer.', script: [
    m('Ben', "Let's count! One, two, three, four, five apples."),
    f('Mia', "I've got seven balloons. One, two, three, four, five, six, seven!"),
    m('Ben', "And I've got ten stars!")
  ], ex: [
    { t: 'mc', q: 'How many apples?', o: ['3', '5', '7'], a: 1 },
    { t: 'mc', q: 'How many balloons has Mia got?', o: ['6', '7', '10'], a: 1 },
    { t: 'mc', q: 'How many stars has Ben got?', o: ['7', '9', '10'], a: 2 }
  ]});
  A('maths', 'u2', { title: 'Big numbers', intro: 'Listen to the numbers.', task: 'Listen and answer.', script: [
    f('Mia', "There are fifteen children in my class."),
    m('Ben', "I'm twelve years old!"),
    f('Mia', "My house is number nineteen."),
    m('Ben', "Count with me: eleven, twelve, thirteen, fourteen…")
  ], ex: [
    { t: 'mc', q: 'How many children are in Mia\'s class?', o: ['13', '15', '50'], a: 1 },
    { t: 'mc', q: 'How old is Ben?', o: ['12', '20', '2'], a: 0 },
    { t: 'mc', q: 'What is Mia\'s house number?', o: ['9', '17', '19'], a: 2 },
    { t: 'mc', q: 'What number comes next: eleven, twelve, thirteen, fourteen…?', o: ['15', '16', '40'], a: 0 }
  ]});
  A('maths', 'u3', { title: 'Adding up', intro: 'Listen to the sums.', task: 'Listen and choose the answer.', script: [
    m('Ben', "I've got three cars. Mia gives me two more. Now I've got…"),
    f('Mia', "Five cars! Now my turn. Four plus four is…"),
    m('Ben', "Eight! And six plus three?"),
    f('Mia', "Nine!")
  ], ex: [
    { t: 'mc', q: 'Three cars plus two cars =', o: ['4', '5', '6'], a: 1 },
    { t: 'mc', q: 'Four plus four =', o: ['6', '8', '9'], a: 1 },
    { t: 'mc', q: 'Six plus three =', o: ['9', '8', '10'], a: 0 }
  ]});
  A('maths', 'u4', { title: 'Taking away', intro: 'Listen to Mia and Ben.', task: 'Listen and choose the answer.', script: [
    f('Mia', "I've got ten sweets. I give Ben three. Now I've got…"),
    m('Ben', "Seven sweets! I've got six balloons. Two fly away. Now I've got four."),
    f('Mia', "Nine take away five is…"),
    m('Ben', "Four!")
  ], ex: [
    { t: 'mc', q: 'Ten take away three =', o: ['6', '7', '13'], a: 1 },
    { t: 'mc', q: 'How many balloons does Ben have at the end?', o: ['2', '4', '8'], a: 1 },
    { t: 'mc', q: 'Nine take away five =', o: ['4', '5', '14'], a: 0 }
  ]});
  A('maths', 'u5', { title: 'Shapes everywhere', intro: 'Listen to Mia.', task: 'Listen and choose the picture.', script: [
    f('Mia', "Look at my picture! The sun is a circle."),
    m('Ben', "The window is a square, and the roof is a triangle!"),
    f('Mia', "And the door is a rectangle.")
  ], ex: [
    { t: 'picmc', q: 'What shape is the sun?', o: ['square', 'circle', 'triangle'], a: 1 },
    { t: 'picmc', q: 'What shape is the roof?', o: ['triangle', 'rectangle', 'circle'], a: 0 },
    { t: 'picmc', q: 'What shape is the door?', o: ['circle', 'square', 'rectangle'], a: 2 }
  ]});
})();
