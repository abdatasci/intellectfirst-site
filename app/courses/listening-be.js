/* Listening lessons for the new Business English (A2–C1 u3–6) and IELTS (u4–8) units. Original IF Academy scripts. */
(function () {
  var K = IFX.k, A = function (cid, uid, l) { IFX.listening(cid, uid, l); };
  var f = function (s, t) { return { s: s, g: 'f', t: t }; }, m = function (s, t) { return { s: s, g: 'm', t: t }; };

  /* ----- Business A2 ----- */
  A('be-a2', 'u3', { title: 'At a trade fair', intro: 'A visitor asks about a company\'s products.', script: [
    m('Visitor', 'Hello. What does your company make?'), f('Sales rep', 'We make smart lights for homes and offices. Our head office is in Almaty.'),
    m('Visitor', 'How many people work for you?'), f('Sales rep', 'About eighty. We export to Russia and Uzbekistan.'),
    m('Visitor', 'Which is your best-selling product?'), f('Sales rep', 'This one — the Sky lamp. It\'s cheaper than our other lamps and it uses less energy.'),
    m('Visitor', 'Can I have a brochure?'), f('Sales rep', 'Of course. Here\'s my business card too.')],
    ex: [K.mc('What does the company make?', ['smart lights', 'phones', 'furniture'], 0), K.mc('Where is the head office?', ['Astana', 'Almaty', 'Kostanay'], 1), K.mc('How many employees are there?', ['about 18', 'about 80', 'about 800'], 1), K.tf('The Sky lamp uses more energy than the other lamps.', false)] });
  A('be-a2', 'u4', { title: 'Checking in', intro: 'A business traveller arrives at a hotel.', script: [
    f('Receptionist', 'Good evening. Welcome to the Grand Hotel.'), m('Guest', 'Hi. I have a reservation. My name is Serik Akhmetov.'),
    f('Receptionist', 'Yes, a single room for three nights. Can I see your passport, please?'), m('Guest', 'Here you are. What time is breakfast?'),
    f('Receptionist', 'From seven to ten in the restaurant on the first floor. Your room is 412.'), m('Guest', 'Can I order a taxi to the airport for Friday at six a.m.?'),
    f('Receptionist', 'No problem. I\'ll book it for you.')],
    ex: [K.mc('How many nights is he staying?', ['one', 'two', 'three'], 2), K.mc('What does the receptionist ask to see?', ['his passport', 'his ticket', 'his credit card'], 0), K.mc('What is his room number?', ['214', '412', '421'], 1), K.mc('When does he need a taxi?', ['Friday 6 a.m.', 'Thursday 6 p.m.', 'Friday 10 a.m.'], 0)] });
  A('be-a2', 'u5', { title: 'Moving a meeting', intro: 'Two colleagues rearrange a meeting.', script: [
    m('Daniyar', 'Hi Anna. Can we move Thursday\'s meeting? I\'m visiting a client that day.'), f('Anna', 'Sure. Are you free on Wednesday afternoon?'),
    m('Daniyar', 'I\'m afraid not. How about Friday morning?'), f('Anna', 'Friday at ten is fine. But the report deadline is Friday at twelve.'),
    m('Daniyar', 'Then let\'s meet at nine. We\'ll finish by half past ten.'), f('Anna', 'Perfect. I\'ll send a calendar invitation.')],
    ex: [K.mc('Why can\'t Daniyar meet on Thursday?', ['he is ill', 'he is visiting a client', 'he is on holiday'], 1), K.tf('Daniyar is free on Wednesday afternoon.', false), K.mc('When is the report deadline?', ['Friday 10:00', 'Friday 12:00', 'Thursday 12:00'], 1), K.mc('What time is the new meeting?', ['9:00', '10:00', '10:30'], 0)] });
  A('be-a2', 'u6', { title: 'A wrong delivery', intro: 'A customer calls a supplier.', script: [
    f('Customer', 'Hello, I\'m calling about order 5523. You sent the wrong chairs.'), m('Supplier', 'I\'m very sorry. What did you receive?'),
    f('Customer', 'Black chairs. We ordered grey ones, and two of them are broken.'), m('Supplier', 'I apologise. We\'ll send the grey chairs tomorrow, and we\'ll collect the black ones.'),
    f('Customer', 'Thank you. Can you give us a discount?'), m('Supplier', 'Yes — ten per cent off this order.')],
    ex: [K.mc('What is the order number?', ['5523', '5325', '2553'], 0), K.mc('What colour chairs did they order?', ['black', 'grey', 'white'], 1), K.mc('How many chairs are broken?', ['one', 'two', 'all'], 1), K.mc('What discount does the supplier offer?', ['5%', '10%', '20%'], 1)] });

  /* ----- Business B1 ----- */
  A('be-b1', 'u3', { title: 'The interview', intro: 'A candidate interviews for a marketing assistant role.', script: [
    f('Interviewer', 'So, tell me about your experience.'), m('Candidate', 'I\'ve worked in customer service for two years, and I\'ve managed our company\'s social media since last spring.'),
    f('Interviewer', 'What\'s your biggest strength?'), m('Candidate', 'I\'m very organised. I\'ve never missed a deadline.'),
    f('Interviewer', 'And a weakness?'), m('Candidate', 'I find it hard to say no, so I\'m learning to prioritise.'),
    f('Interviewer', 'Do you have any questions for us?'), m('Candidate', 'Yes — what training do you offer new staff?')],
    ex: [K.mc('How long has he worked in customer service?', ['one year', 'two years', 'five years'], 1), K.mc('What has he managed since last spring?', ['a team', 'social media', 'a shop'], 1), K.mc('What is his weakness?', ['he is late', 'he finds it hard to say no', 'he is disorganised'], 1), K.mc('What does he ask about?', ['salary', 'holidays', 'training'], 2)] });
  A('be-b1', 'u4', { title: 'Launching a campaign', intro: 'A marketing team plans an advert.', script: [
    f('Manager', 'Our target market is students aged eighteen to twenty-five. Where should we advertise?'), m('Assistant', 'Definitely online. Short videos work better than banners with that age group.'),
    f('Manager', 'What about influencers?'), m('Assistant', 'If we use local influencers, it\'ll cost less and feel more authentic.'),
    f('Manager', 'Good. And the budget?'), m('Assistant', 'Two million tenge for the first month. We\'ll measure the results before we spend more.')],
    ex: [K.mc('Who is the target market?', ['children', 'students aged 18–25', 'retired people'], 1), K.mc('What works best with this age group?', ['banners', 'short videos', 'newspaper ads'], 1), K.mc('Why use local influencers?', ['cheaper and more authentic', 'more famous', 'faster'], 0), K.mc('What is the first month\'s budget?', ['1 million', '2 million', '5 million'], 1)] });
  A('be-b1', 'u5', { title: 'A video call', intro: 'A team starts an online meeting.', script: [
    m('Host', 'Hi everyone. Can you all hear me?'), f('Aigul', 'Sorry, you\'re breaking up a bit. Could you say that again?'),
    m('Host', 'Can you hear me now?'), f('Aigul', 'Yes, much better, thanks.'),
    m('Host', 'Great. Before we start, Ben, could you mute your microphone? There\'s some background noise.'), m('Ben', 'Oops, sorry! Done.'),
    m('Host', 'Thanks. First item: the sales figures. Aigul, could you share your screen?')],
    ex: [K.mc('What is the first problem?', ['the host is breaking up', 'nobody joined', 'the camera is off'], 0), K.mc('Why should Ben mute?', ['background noise', 'he is late', 'he is speaking too much'], 0), K.mc('What is the first item?', ['the budget', 'the sales figures', 'the new office'], 1), K.mc('What is Aigul asked to do?', ['take notes', 'share her screen', 'leave'], 1)] });
  A('be-b1', 'u6', { title: 'Looking after a client', intro: 'A host welcomes a visiting client.', script: [
    f('Host', 'Mr Grant, welcome to Kostanay! How was your flight?'), m('Client', 'Long, but fine, thank you.'),
    f('Host', 'Would you like to go to the hotel first, or straight to the office?'), m('Client', 'The hotel first, if that\'s OK. I\'d like to freshen up.'),
    f('Host', 'Of course. Tonight we\'ve booked a table at a traditional Kazakh restaurant. Do you have any dietary requirements?'), m('Client', 'I don\'t eat pork, but otherwise I\'ll try anything!'),
    f('Host', 'Then you must try beshbarmak.')],
    ex: [K.mc('Where does the client want to go first?', ['the office', 'the hotel', 'a restaurant'], 1), K.mc('What has the host booked?', ['a tour', 'a table at a Kazakh restaurant', 'a concert'], 1), K.mc('What doesn\'t the client eat?', ['fish', 'pork', 'meat'], 1), K.tf('The client\'s flight was short.', false)] });

  /* ----- Business B2 ----- */
  A('be-b2', 'u3', { title: 'Hiring for the future', intro: 'Two HR managers discuss recruitment.', script: [
    m('HR 1', 'We\'ve shortlisted five candidates for the data role, but none of them has much leadership experience.'), f('HR 2', 'Should we widen the search, or develop someone internally?'),
    m('HR 1', 'Internal candidates are already familiar with the culture. Retention would be better too.'), f('HR 2', 'True. But we\'d need to invest in a mentoring programme.'),
    m('HR 1', 'Which is still cheaper than a headhunter\'s fee.'), f('HR 2', 'Agreed. Let\'s interview the shortlist and talk to Aliya in finance — she\'s keen to move into analytics.')],
    ex: [K.mc('How many candidates are shortlisted?', ['three', 'five', 'ten'], 1), K.mc('What do the candidates lack?', ['qualifications', 'leadership experience', 'languages'], 1), K.mc('What is cheaper than a headhunter?', ['a mentoring programme', 'advertising', 'a new office'], 0), K.mc('Who is Aliya?', ['a candidate from outside', 'an employee in finance', 'a headhunter'], 1)] });
  A('be-b2', 'u4', { title: 'Quarterly results', intro: 'A finance director presents the figures.', script: [
    f('Director', 'Revenue rose by twelve per cent this quarter, to four hundred million tenge.'), f('Director', 'However, costs increased sharply because of higher fuel prices, so our profit margin fell slightly, from fifteen to thirteen per cent.'),
    m('CEO', 'What\'s the outlook for next quarter?'), f('Director', 'We expect sales to level off. If fuel prices stabilise, margins should recover.'),
    m('CEO', 'And cash flow?'), f('Director', 'Healthy. We\'re well within budget.')],
    ex: [K.mc('By how much did revenue rise?', ['2%', '12%', '20%'], 1), K.mc('Why did costs increase?', ['higher salaries', 'higher fuel prices', 'new offices'], 1), K.mc('What happened to the profit margin?', ['it rose to 15%', 'it fell from 15% to 13%', 'it stayed the same'], 1), K.mc('What does she expect next quarter?', ['sales to level off', 'sales to double', 'a loss'], 0)] });
  A('be-b2', 'u5', { title: 'Going green', intro: 'A sustainability manager is interviewed.', script: [
    m('Interviewer', 'Some people say sustainability is just marketing.'), f('Manager', 'Greenwashing exists, certainly. That\'s why we publish independent audits of our emissions.'),
    m('Interviewer', 'What has actually changed?'), f('Manager', 'We\'ve cut packaging by forty per cent and switched our warehouses to solar power.'),
    m('Interviewer', 'Has it cost you money?'), f('Manager', 'Initially, yes. But energy costs have dropped, and customers are more loyal. It\'s paid for itself in three years.')],
    ex: [K.mc('How does the company prove its claims?', ['independent audits', 'adverts', 'awards'], 0), K.mc('By how much has packaging been cut?', ['14%', '40%', '60%'], 1), K.mc('What powers the warehouses?', ['wind', 'solar', 'gas'], 1), K.mc('How long did it take to pay for itself?', ['one year', 'three years', 'ten years'], 1)] });
  A('be-b2', 'u6', { title: 'Crisis meeting', intro: 'A data leak has been discovered.', script: [
    m('CEO', 'What exactly do we know?'), f('IT director', 'Last night, customer emails were exposed. No passwords or payment data were accessed.'),
    m('CEO', 'Have we informed the customers?'), f('PR manager', 'Not yet. I\'d recommend we notify them within the hour, before the media gets hold of it.'),
    m('CEO', 'Agreed. Transparency first. And I want a full review so this never happens again.'), f('IT director', 'The vulnerability has already been fixed.')],
    ex: [K.mc('What was exposed?', ['passwords', 'customer emails', 'payment data'], 1), K.mc('When does the PR manager want to notify customers?', ['within the hour', 'next week', 'never'], 0), K.mc('What is the CEO\'s priority?', ['secrecy', 'transparency', 'blaming IT'], 1), K.tf('The vulnerability has not been fixed yet.', false)] });

  /* ----- Business C1 ----- */
  A('be-c1', 'u3', { title: 'Disrupt or be disrupted', intro: 'A panel discussion at a tech conference.', script: [
    f('Moderator', 'Is disruption still the right goal for start-ups?'), m('Founder', 'I\'d argue the word has been overused. Most successful firms don\'t disrupt — they iterate relentlessly.'),
    f('Investor', 'I\'d push back slightly. Incumbents rarely see the threat until their business model has already been undermined.'), m('Founder', 'Granted. But scalability matters more than novelty.'),
    f('Moderator', 'So what would you tell a founder today?'), f('Investor', 'Solve a painful problem, and pivot before you run out of cash — not after.')],
    ex: [K.mc('What does the founder say successful firms do?', ['disrupt', 'iterate relentlessly', 'copy competitors'], 1), K.mc('According to the investor, incumbents…', ['always see threats early', 'rarely see threats in time', 'never fail'], 1), K.mc('The founder says what matters more than novelty?', ['scalability', 'branding', 'funding'], 0), K.mc('When should founders pivot?', ['after running out of cash', 'before running out of cash', 'never'], 1)] });
  A('be-c1', 'u4', { title: 'The merger', intro: 'Two executives assess a possible acquisition.', script: [
    m('CFO', 'On paper, the synergies are compelling — we\'d cut duplicate costs by about eighteen million.'), f('COO', 'On paper. Due diligence has flagged some serious liabilities, though.'),
    m('CFO', 'Which we could factor into the valuation.'), f('COO', 'My bigger concern is culture. Their teams are fiercely independent; ours are process-driven.'),
    m('CFO', 'So you\'d walk away?'), f('COO', 'Not necessarily. But I\'d want a phased integration and a retention plan for their key people.')],
    ex: [K.mc('How much could duplicate costs be cut by?', ['8 million', '18 million', '80 million'], 1), K.mc('What has due diligence flagged?', ['liabilities', 'fraud', 'nothing'], 0), K.mc('What is the COO\'s bigger concern?', ['price', 'culture', 'location'], 1), K.mc('What does the COO want?', ['to walk away', 'a phased integration and retention plan', 'a fast takeover'], 1)] });
  A('be-c1', 'u5', { title: 'Across cultures', intro: 'An intercultural trainer gives advice.', script: [
    f('Trainer', 'In low-context cultures, people say exactly what they mean. In high-context cultures, much of the message is in what isn\'t said.'), m('Manager', 'So a "maybe" might actually mean "no"?'),
    f('Trainer', 'Quite often. And silence in a meeting may signal reflection rather than disagreement.'), m('Manager', 'How do I avoid misreading people?'),
    f('Trainer', 'Build rapport before business, ask open questions — and never assume your norms are the default.')],
    ex: [K.mc('In high-context cultures, much meaning is…', ['written down', 'in what isn\'t said', 'in numbers'], 1), K.mc('What can "maybe" sometimes mean?', ['yes', 'no', 'later'], 1), K.mc('Silence may signal…', ['reflection', 'anger', 'boredom'], 0), K.mc('Which is NOT the trainer\'s advice?', ['build rapport', 'ask open questions', 'assume your norms are the default'], 2)] });
  A('be-c1', 'u6', { title: 'Two minutes to pitch', intro: 'A founder pitches to investors.', script: [
    m('Founder', 'One in three farmers in our region loses part of their harvest to poor storage. Our sensors cut that loss by half.'), m('Founder', 'We already have two hundred paying customers and we\'re growing twenty per cent a month.'),
    f('Investor', 'What are you asking for?'), m('Founder', 'Three hundred thousand dollars for fifteen per cent equity, to expand into Uzbekistan.'),
    f('Investor', 'What\'s stopping a bigger competitor from copying you?'), m('Founder', 'Our data. Four years of local harvest data that nobody else has.')],
    ex: [K.mc('How many farmers lose part of their harvest?', ['one in two', 'one in three', 'one in ten'], 1), K.mc('How fast is the company growing?', ['10% a month', '20% a month', '20% a year'], 1), K.mc('How much equity is offered?', ['5%', '15%', '30%'], 1), K.mc('What protects them from competitors?', ['patents', 'their data', 'low prices'], 1)] });

  /* ----- IELTS ----- */
  A('ielts', 'u4', { title: 'Section 1: joining a gym', intro: 'Listen to a phone call and note the details, as in IELTS Listening Section 1.', script: [
    m('Receptionist', 'Fit Zone, good morning. How can I help?'), f('Caller', 'Hi, I\'d like to join the gym. Could you tell me about membership?'),
    m('Receptionist', 'Of course. Can I take your name?'), f('Caller', 'Yes, it\'s Karina Wells — that\'s W-E-L-L-S.'),
    m('Receptionist', 'And your phone number?'), f('Caller', '0-7-7-0-0, 9-1-5-3-8-6.'),
    m('Receptionist', 'Thanks. Standard membership is thirty-two pounds a month, or the off-peak option is twenty-four pounds — that\'s before four p.m. only.'), f('Caller', 'I\'ll take off-peak. When can I start?'),
    m('Receptionist', 'Your induction is on Tuesday the fourteenth at ten fifteen.')],
    ex: [K.gap('Surname: ____', 'Wells', 'wells'), K.mc('Cost of off-peak membership?', ['£24', '£32', '£42'], 0), K.mc('Off-peak means before…', ['10 a.m.', '4 p.m.', '6 p.m.'], 1), K.mc('Induction date and time?', ['Tuesday 14th, 10:15', 'Thursday 14th, 10:50', 'Tuesday 4th, 10:15'], 0)] });
  A('ielts', 'u5', { title: 'Speaking Part 2: a model answer', intro: 'Listen to a candidate answer the cue card "Describe a place you enjoy visiting".', script: [
    f('Examiner', 'You have one minute to prepare. Describe a place you enjoy visiting. Please begin.'),
    m('Candidate', 'I\'d like to talk about Burabay, a lake district about four hours from my home town. I first went there with my family when I was about ten.'),
    m('Candidate', 'What I love most is the contrast — you have these strange granite rocks rising straight out of pine forest, and the lakes are incredibly clear.'),
    m('Candidate', 'I usually go in late summer, when it\'s warm but not crowded. We hike, swim, and in the evenings we just sit by the water.'),
    m('Candidate', 'I suppose the reason I enjoy it so much is that it\'s the one place where I completely switch off my phone.'),
    f('Examiner', 'Thank you. Would you recommend it to tourists?')],
    ex: [K.mc('How long does the candidate have to prepare?', ['30 seconds', 'one minute', 'two minutes'], 1), K.mc('How far is Burabay from his home town?', ['one hour', 'four hours', 'a day'], 1), K.mc('What contrast does he describe?', ['rocks and forest', 'city and village', 'snow and sand'], 0), K.mc('Why does he enjoy it most?', ['the food', 'he switches off his phone', 'it is cheap'], 1), K.tf('He usually goes in winter.', false)] });
  A('ielts', 'u6', { title: 'Planning a discussion essay', intro: 'A teacher and student plan a Writing Task 2 essay.', script: [
    f('Teacher', 'The question: some people think university should be free; others think students should pay. Discuss both views and give your opinion.'), m('Student', 'So I need both sides, plus my own view?'),
    f('Teacher', 'Exactly. Body paragraph one: free education widens access. Body two: fees fund quality and make students value it.'), m('Student', 'And where does my opinion go?'),
    f('Teacher', 'State it clearly in the introduction, then confirm it in the conclusion. And aim for at least two hundred and fifty words — you\'ll lose marks otherwise.'), m('Student', 'About forty minutes, then?'),
    f('Teacher', 'Yes, and leave five minutes to check.')],
    ex: [K.mc('What does the question ask?', ['only your opinion', 'both views and your opinion', 'advantages only'], 1), K.mc('Where should the opinion first appear?', ['introduction', 'body two', 'only the conclusion'], 0), K.mc('Minimum word count?', ['150', '250', '300'], 1), K.mc('How long to leave for checking?', ['two minutes', 'five minutes', 'ten minutes'], 1)] });
  A('ielts', 'u7', { title: 'A lecture on sleep', intro: 'Listen to part of a lecture, then choose headings for each part — as in IELTS matching headings.', script: [
    f('Lecturer', 'Let\'s begin with history. Before electric light, many Europeans slept in two separate phases, waking for an hour in the middle of the night.'),
    f('Lecturer', 'Now to the science. During deep sleep, the brain clears waste products that build up while we\'re awake.'),
    f('Lecturer', 'Which brings me to the modern problem: screens. Blue light delays the release of melatonin, so we fall asleep later.'),
    f('Lecturer', 'Finally, the solutions. Keep a regular schedule, and keep phones out of the bedroom.')],
    ex: [K.mc('Part 1 is best headed…', ['Sleep in the past', 'The cost of insomnia', 'Children and sleep'], 0), K.mc('Part 2 is best headed…', ['How the brain cleans itself', 'Dreams and memory', 'Sleep in animals'], 0), K.mc('Part 3 is best headed…', ['A modern obstacle to sleep', 'Diet and sleep', 'Sleep at work'], 0), K.mc('What does blue light delay?', ['melatonin release', 'deep sleep waste', 'waking up'], 0)] });
  A('ielts', 'u8', { title: 'Describing a map', intro: 'Listen to a guide describe changes to a town — useful language for Writing Task 1 maps.', script: [
    m('Guide', 'Twenty years ago, this area was mainly farmland, with a single road running from north to south.'),
    m('Guide', 'Since then, the farmland to the east of the road has been replaced by a housing estate.'),
    m('Guide', 'A new school was built next to the estate, and the old railway station was converted into a museum.'),
    m('Guide', 'The forest in the west has been reduced in size, although a park was created along the river.')],
    ex: [K.mc('What was the area mainly 20 years ago?', ['forest', 'farmland', 'industry'], 1), K.mc('What replaced the farmland east of the road?', ['a park', 'a housing estate', 'a school'], 1), K.mc('What happened to the railway station?', ['it was demolished', 'it became a museum', 'it was enlarged'], 1), K.tf('The forest has grown larger.', false)] });
})();
