/* Listening lessons for the new General English units (A1 u3–8, A2 u4–8, B1–C2 u3–8). Original IF Academy scripts,
   performed in the listening "video" by the IF presenters in natural British voices. */
(function () {
  var K = IFX.k, A = function (cid, uid, l) { IFX.listening(cid, uid, l); };
  var f = function (s, t) { return { s: s, g: 'f', t: t }; }, m = function (s, t) { return { s: s, g: 'm', t: t }; };

  /* ----- A1 ----- */
  A('ge-a1', 'u3', { title: 'What time do you get up?', intro: 'Two new classmates talk about their daily routines.', script: [
    f('Dana', 'Hi Arman! What time do you get up in the morning?'), m('Arman', 'I get up at six. I go to the gym before work.'),
    f('Dana', 'Six! That\'s early. I get up at half past seven.'), m('Arman', 'What time does your work start?'),
    f('Dana', 'At nine. I finish at five and I get home at six.'), m('Arman', 'And what do you do in the evening?'),
    f('Dana', 'I have dinner, I watch a film and I go to bed at eleven.')],
    ex: [K.mc('What time does Arman get up?', ['6:00', '7:30', '9:00'], 0), K.mc('Where does Arman go before work?', ['to the gym', 'to a café', 'to school'], 0), K.mc('When does Dana\'s work start?', ['at five', 'at nine', 'at six'], 1), K.tf('Dana goes to bed at eleven.', true)] });
  A('ge-a1', 'u4', { title: 'At the market', intro: 'A customer buys fruit and vegetables.', script: [
    m('Seller', 'Good morning! Can I help you?'), f('Customer', 'Yes, please. A kilo of apples, please.'),
    m('Seller', 'Red or green?'), f('Customer', 'Green, please. And some tomatoes. How much are they?'),
    m('Seller', 'The tomatoes are eight hundred tenge a kilo.'), f('Customer', 'OK, half a kilo, please. Have you got any bananas?'),
    m('Seller', 'Sorry, we haven\'t got any today. That\'s one thousand three hundred tenge, please.')],
    ex: [K.mc('What colour apples does she want?', ['red', 'green', 'yellow'], 1), K.mc('How much are the tomatoes?', ['800 tenge a kilo', '1,300 tenge a kilo', '500 tenge a kilo'], 0), K.tf('The seller has bananas today.', false), K.mc('How much does she pay?', ['800', '1,000', '1,300'], 2)] });
  A('ge-a1', 'u5', { title: 'Excuse me, where\'s the bank?', intro: 'A tourist asks for directions.', script: [
    f('Tourist', 'Excuse me, is there a bank near here?'), m('Man', 'Yes, there\'s a bank in Abay Street.'),
    f('Tourist', 'Is it far?'), m('Man', 'No, it\'s five minutes. Go straight on, then turn left.'),
    f('Tourist', 'Straight on, then left. OK.'), m('Man', 'The bank is next to a big pharmacy, opposite the park.'),
    f('Tourist', 'Thank you very much!'), m('Man', 'You\'re welcome.')],
    ex: [K.mc('What is the tourist looking for?', ['a pharmacy', 'a bank', 'a park'], 1), K.mc('How far is it?', ['two minutes', 'five minutes', 'twenty minutes'], 1), K.mc('What is next to the bank?', ['a pharmacy', 'a park', 'a school'], 0), K.tf('The bank is opposite the park.', true)] });
  A('ge-a1', 'u6', { title: 'Can you swim?', intro: 'Two friends talk about what they can do.', script: [
    m('Timur', 'Aruzhan, can you swim?'), f('Aruzhan', 'Yes, I can. I love swimming. Can you?'),
    m('Timur', 'No, I can\'t. But I can ride a bike and I can play the guitar.'), f('Aruzhan', 'Really? I can\'t play any instruments.'),
    m('Timur', 'What do you like doing at the weekend?'), f('Aruzhan', 'I like dancing and cooking. I can make great plov!'),
    m('Timur', 'Can you teach me?'), f('Aruzhan', 'Sure! Come on Saturday.')],
    ex: [K.tf('Timur can swim.', false), K.mc('What instrument can Timur play?', ['piano', 'guitar', 'dombra'], 1), K.mc('What does Aruzhan like doing?', ['dancing and cooking', 'swimming only', 'playing football'], 0), K.mc('When can Timur come?', ['on Friday', 'on Saturday', 'on Sunday'], 1)] });
  A('ge-a1', 'u7', { title: 'What are you wearing?', intro: 'Two friends talk on a video call.', script: [
    f('Aliya', 'Hi! Where are you? It\'s very sunny there!'), m('Ben', 'I\'m in the park. I\'m sitting on a bench and eating an ice cream.'),
    f('Aliya', 'Lucky you! It\'s snowing here in Kostanay. I\'m wearing my big coat and my boots.'), m('Ben', 'I\'m wearing a T-shirt and shorts!'),
    f('Aliya', 'What are your friends doing?'), m('Ben', 'They\'re playing football. What are you doing?'),
    f('Aliya', 'I\'m waiting for the bus. It\'s really cold!')],
    ex: [K.mc('Where is Ben?', ['at home', 'in the park', 'at the bus stop'], 1), K.mc('What is the weather like in Kostanay?', ['sunny', 'snowing', 'raining'], 1), K.mc('What is Ben wearing?', ['a coat and boots', 'a T-shirt and shorts', 'a jacket'], 1), K.mc('What is Aliya doing?', ['playing football', 'eating ice cream', 'waiting for the bus'], 2)] });
  A('ge-a1', 'u8', { title: 'How was your weekend?', intro: 'Colleagues talk on Monday morning.', script: [
    m('Marat', 'Morning, Saule! How was your weekend?'), f('Saule', 'It was great, thanks. I went to Almaty.'),
    m('Marat', 'Really? What did you do there?'), f('Saule', 'I visited my sister and we went to the mountains. What about you?'),
    m('Marat', 'I stayed at home. I didn\'t do much. I watched football on Saturday.'), f('Saule', 'Did your team win?'),
    m('Marat', 'No, they didn\'t. They lost two–nil!')],
    ex: [K.mc('Where did Saule go?', ['to Astana', 'to Almaty', 'to the sea'], 1), K.mc('Who did she visit?', ['her sister', 'her brother', 'her friend'], 0), K.tf('Marat went out at the weekend.', false), K.mc('What was the football score?', ['2–0 to Marat\'s team', '0–2 — they lost', '1–1'], 1)] });

  /* ----- A2 ----- */
  A('ge-a2', 'u4', { title: 'A strange evening', intro: 'A woman tells her friend what happened last night.', script: [
    f('Gulnara', 'You won\'t believe what happened last night!'), m('Erlan', 'What?'),
    f('Gulnara', 'I was walking home from work. It was dark and it was raining.'), m('Erlan', 'And?'),
    f('Gulnara', 'Suddenly, a small dog started following me. It didn\'t have a collar.'), m('Erlan', 'Poor thing! What did you do?'),
    f('Gulnara', 'At first, I didn\'t know what to do. In the end, I took it home. Now it\'s sleeping on my sofa!'), m('Erlan', 'So you have a dog now!')],
    ex: [K.mc('What was the weather like?', ['sunny', 'raining', 'snowing'], 1), K.mc('What was Gulnara doing?', ['walking home', 'driving', 'shopping'], 0), K.tf('The dog had a collar.', false), K.mc('Where is the dog now?', ['at the vet', 'on Gulnara\'s sofa', 'in the street'], 1)] });
  A('ge-a2', 'u5', { title: 'Summer plans', intro: 'Two students talk about their plans.', script: [
    m('Nurlan', 'What are you going to do this summer?'), f('Asel', 'I\'m going to work in a café in Burabay. What about you?'),
    m('Nurlan', 'I\'m going to visit my uncle in Turkey. I\'ve already booked my ticket.'), f('Asel', 'Lucky you! Will it be very hot?'),
    m('Nurlan', 'Probably. The forecast says thirty-five degrees!'), f('Asel', 'I think I\'ll come and visit you!'),
    m('Nurlan', 'Great — I\'ll show you the beach.')],
    ex: [K.mc('Where is Asel going to work?', ['in Turkey', 'in a café in Burabay', 'in a shop'], 1), K.mc('Who is Nurlan going to visit?', ['his aunt', 'his uncle', 'his grandmother'], 1), K.tf('Nurlan hasn\'t booked his ticket yet.', false), K.mc('What temperature does the forecast say?', ['25°', '30°', '35°'], 2)] });
  A('ge-a2', 'u6', { title: 'City or village?', intro: 'Two friends compare where they live.', script: [
    f('Dina', 'Do you prefer living in the city or in the village?'), m('Askar', 'The village is more peaceful, but the city is more exciting.'),
    f('Dina', 'I agree. Kostanay is quieter than Almaty, but it\'s not as quiet as my grandmother\'s village.'), m('Askar', 'And the air is cleaner in the village.'),
    f('Dina', 'True. But the shops are much better in the city!'), m('Askar', 'For me, the best place is a small town — not too big, not too small.')],
    ex: [K.mc('Askar says the village is more…', ['exciting', 'peaceful', 'crowded'], 1), K.mc('Which is quieter, according to Dina?', ['Almaty', 'Kostanay', 'both are the same'], 1), K.mc('Where is the air cleaner?', ['in the city', 'in the village'], 1), K.mc('What does Askar prefer?', ['a big city', 'a small town', 'a village'], 1)] });
  A('ge-a2', 'u7', { title: 'Have you ever…?', intro: 'A short interview for a student magazine.', script: [
    f('Reporter', 'Have you ever been abroad?'), m('Daniyar', 'Yes, I have. I\'ve been to Georgia and to the UAE.'),
    f('Reporter', 'Have you ever tried anything unusual?'), m('Daniyar', 'Yes! I tried snails in France last year. They were OK!'),
    f('Reporter', 'Wait — you\'ve been to France too?'), m('Daniyar', 'Oh yes, sorry. Three countries, then.'),
    f('Reporter', 'Is there anything you\'ve never done?'), m('Daniyar', 'I\'ve never flown in a helicopter. I\'d love to!')],
    ex: [K.mc('How many countries has Daniyar visited?', ['two', 'three', 'four'], 1), K.mc('What did he try in France?', ['snails', 'frogs', 'cheese'], 0), K.mc('When did he try it?', ['last year', 'last week', 'two years ago'], 0), K.mc('What has he never done?', ['flown in a plane', 'flown in a helicopter', 'been abroad'], 1)] });
  A('ge-a2', 'u8', { title: 'At the doctor\'s', intro: 'A patient talks to a doctor.', script: [
    m('Doctor', 'Good morning. What\'s the problem?'), f('Patient', 'I\'ve got a bad cough and a headache.'),
    m('Doctor', 'How long have you had them?'), f('Patient', 'About four days.'),
    m('Doctor', 'Let me check your temperature… It\'s a little high. You should rest and drink a lot of water.'), f('Patient', 'Do I have to stay at home?'),
    m('Doctor', 'Yes, for two days. And you mustn\'t go to the gym this week. Take this medicine twice a day.')],
    ex: [K.mc('What problems does the patient have?', ['a cough and a headache', 'a stomach ache', 'a broken arm'], 0), K.mc('For how long?', ['two days', 'four days', 'a week'], 1), K.tf('The patient\'s temperature is normal.', false), K.mc('How often should she take the medicine?', ['once a day', 'twice a day', 'three times a day'], 1)] });

  /* ----- B1 ----- */
  A('ge-b1', 'u3', { title: 'Old friends', intro: 'Two former classmates meet by chance.', script: [
    f('Zarina', 'Ruslan? Is that you? I haven\'t seen you since school!'), m('Ruslan', 'Zarina! Wow, it\'s been about ten years. How are you?'),
    f('Zarina', 'I\'m great. I\'ve lived in Astana for five years now. And you?'), m('Ruslan', 'I\'ve been in Kostanay all this time. I\'ve worked at the same bank since 2019.'),
    f('Zarina', 'Do you still keep in touch with anyone from our class?'), m('Ruslan', 'Only Marat. We fell out once, but we\'re close again now.'),
    f('Zarina', 'We should all meet up!'), m('Ruslan', 'Definitely. Let\'s keep in touch this time.')],
    ex: [K.mc('When did they last see each other?', ['last year', 'at school, about ten years ago', 'at university'], 1), K.mc('How long has Zarina lived in Astana?', ['two years', 'five years', 'ten years'], 1), K.mc('Since when has Ruslan worked at the bank?', ['2015', '2019', '2021'], 1), K.tf('Ruslan has never argued with Marat.', false)] });
  A('ge-b1', 'u4', { title: 'Can I borrow some money?', intro: 'A brother asks his sister for help.', script: [
    m('Aidos', 'Aigerim, can I borrow twenty thousand tenge?'), f('Aigerim', 'Again? What\'s it for this time?'),
    m('Aidos', 'There\'s a big discount on these headphones. If I don\'t buy them today, I\'ll miss the bargain.'), f('Aigerim', 'You never pay me back on time.'),
    m('Aidos', 'I will this time — I get paid on Friday. I promise.'), f('Aigerim', 'OK, but I won\'t lend you anything else unless you make a budget.'),
    m('Aidos', 'Deal. You\'re the best!')],
    ex: [K.mc('How much does Aidos want to borrow?', ['10,000', '20,000', '50,000'], 1), K.mc('What does he want to buy?', ['a phone', 'headphones', 'shoes'], 1), K.mc('When does he get paid?', ['Monday', 'Wednesday', 'Friday'], 2), K.mc('What is Aigerim\'s condition?', ['he must pay double', 'he must make a budget', 'he must work for her'], 1)] });
  A('ge-b1', 'u5', { title: 'The new school rules', intro: 'A head teacher talks to parents.', script: [
    f('Head teacher', 'Good evening, everyone. I\'d like to explain some changes for next term.'), f('Head teacher', 'First, students won\'t have to wear a formal uniform any more — a school T-shirt will be enough.'),
    m('Parent', 'That\'s good news. What about phones?'), f('Head teacher', 'Students are allowed to bring phones, but they mustn\'t use them during lessons. They\'ll be kept in a box.'),
    m('Parent', 'And exams?'), f('Head teacher', 'Students will have to take a practice exam in March, so they should start revising after the winter holidays.')],
    ex: [K.tf('Students must still wear a formal uniform.', false), K.mc('What will happen to phones during lessons?', ['students can use them', 'they will be kept in a box', 'they are banned from school'], 1), K.mc('When is the practice exam?', ['in December', 'in March', 'in May'], 1), K.mc('When should students start revising?', ['now', 'after the winter holidays', 'in summer'], 1)] });
  A('ge-b1', 'u6', { title: 'A healthier life', intro: 'A radio presenter interviews a nutritionist.', script: [
    m('Presenter', 'So, what\'s the most important change people can make?'), f('Nutritionist', 'Honestly? Cut down on sugar. Most people don\'t realise how much they eat.'),
    m('Presenter', 'Should we give up sugar completely?'), f('Nutritionist', 'No, I don\'t recommend that. Just try to avoid sugary drinks and eat more homemade food.'),
    m('Presenter', 'And exercise?'), f('Nutritionist', 'Walking thirty minutes a day is enough to keep fit. And sleep — people forget how important sleep is when they feel stressed.')],
    ex: [K.mc('What is the most important change?', ['eat more meat', 'cut down on sugar', 'drink coffee'], 1), K.tf('She recommends giving up sugar completely.', false), K.mc('How much walking is enough?', ['10 minutes', '30 minutes', '2 hours'], 1), K.mc('What do people forget?', ['how important sleep is', 'to drink water', 'to eat breakfast'], 0)] });
  A('ge-b1', 'u7', { title: 'The missing laptop', intro: 'A detective questions a witness.', script: [
    m('Detective', 'When did you notice the laptop was missing?'), f('Witness', 'At about six. I\'d left it on my desk while I went for coffee.'),
    m('Detective', 'Had you locked the office?'), f('Witness', 'No, I hadn\'t. I was only away for ten minutes.'),
    m('Detective', 'Did you see anyone near your desk?'), f('Witness', 'Yes — a man in a blue jacket. I\'d never seen him before. He said he had come to fix the printer.'),
    m('Detective', 'Interesting. Nobody had called a technician today.')],
    ex: [K.mc('When did she notice the laptop was missing?', ['at about six', 'at noon', 'in the morning'], 0), K.tf('She had locked the office.', false), K.mc('What was the man wearing?', ['a black coat', 'a blue jacket', 'a red jumper'], 1), K.mc('Why is the detective suspicious?', ['nobody had called a technician', 'the printer was new', 'the man was famous'], 0)] });
  A('ge-b1', 'u8', { title: 'Clean-up day', intro: 'A volunteer talks about a city project.', script: [
    f('Host', 'Tell us about your clean-up day.'), m('Volunteer', 'Every April, the riverbank is cleaned by about three hundred volunteers.'),
    f('Host', 'What do you find?'), m('Volunteer', 'Mostly plastic. Last year, two tonnes of waste were collected in one day!'),
    f('Host', 'What happens to it?'), m('Volunteer', 'The plastic is taken to a recycling centre, and the rest is sorted.'),
    f('Host', 'How can people help?'), m('Volunteer', 'Come on the day — and reduce plastic the rest of the year!')],
    ex: [K.mc('When is the clean-up day?', ['every April', 'every summer', 'every month'], 0), K.mc('How many volunteers take part?', ['about 30', 'about 300', 'about 3,000'], 1), K.mc('How much waste was collected last year?', ['two kilos', 'two tonnes', 'twenty tonnes'], 1), K.mc('Where is the plastic taken?', ['to a recycling centre', 'to the river', 'to a factory abroad'], 0)] });

  /* ----- B2 ----- */
  A('ge-b2', 'u3', { title: 'Changing careers', intro: 'A podcast host talks to a former engineer.', script: [
    m('Host', 'You\'ve been working as a chef for three years now. What made you leave engineering?'), f('Guest', 'I\'d been feeling burnt out for a long time. My workload was crazy and I was always chasing deadlines.'),
    m('Host', 'Was it a difficult decision?'), f('Guest', 'Very. I\'d just got a promotion, so everyone thought I was mad to resign.'),
    m('Host', 'Do you regret it?'), f('Guest', 'Not for a second. I\'ve been doing what I love, and I\'ve learned more in three years than in the previous ten.')],
    ex: [K.mc('What is the guest\'s job now?', ['engineer', 'chef', 'teacher'], 1), K.mc('Why did she leave engineering?', ['she was fired', 'burnout and a huge workload', 'low salary'], 1), K.tf('She had just been promoted when she resigned.', true), K.mc('How does she feel now?', ['she regrets it', 'she doesn\'t regret it at all', 'she is unsure'], 1)] });
  A('ge-b2', 'u4', { title: 'What would you do?', intro: 'Two friends discuss a dilemma.', script: [
    f('Madina', 'If you won a million dollars, what would you do?'), m('Yerlan', 'I\'d buy a house for my parents first. What about you?'),
    f('Madina', 'I\'d travel for a year. I wish I had more time to see the world.'), m('Yerlan', 'If I were you, I\'d invest some of it first.'),
    f('Madina', 'Always so sensible! Don\'t you ever want to take a risk?'), m('Yerlan', 'Of course I do. I just wish I could decide what risk to take!')],
    ex: [K.mc('What would Yerlan do first?', ['travel', 'buy his parents a house', 'quit his job'], 1), K.mc('What does Madina wish?', ['that she had more time', 'that she had more money', 'that she could cook'], 0), K.mc('Yerlan\'s advice is to…', ['spend everything', 'invest some of it', 'give it away'], 1), K.tf('Yerlan never wants to take risks.', false)] });
  A('ge-b2', 'u5', { title: 'A missed opportunity', intro: 'A man tells his colleague about a regret.', script: [
    m('Kairat', 'You know, ten years ago I was offered a job in Dubai.'), f('Elena', 'Really? Why didn\'t you take it?'),
    m('Kairat', 'I was scared. If I had gone, I would have earned twice as much.'), f('Elena', 'But if you had gone, you wouldn\'t have met your wife!'),
    m('Kairat', 'That\'s true. In hindsight, maybe it was the right choice.'), f('Elena', 'You shouldn\'t blame yourself. Every decision has consequences — some of them good.')],
    ex: [K.mc('Where was the job?', ['Dubai', 'London', 'Almaty'], 0), K.mc('Why didn\'t he take it?', ['he was scared', 'the salary was low', 'his wife said no'], 0), K.mc('What would have happened if he had gone?', ['he would have earned twice as much', 'he would have lost money', 'nothing'], 0), K.tf('Elena thinks he should blame himself.', false)] });
  A('ge-b2', 'u6', { title: 'Film review show', intro: 'Two critics discuss a new film.', script: [
    f('Critic 1', 'So, the new film by the director whose last movie won at Cannes. What did you think?'), m('Critic 2', 'Honestly? Overrated. The plot, which takes forty minutes to start, is hard to follow.'),
    f('Critic 1', 'I disagree. The lead actress, who\'s only twenty, gives a really moving performance.'), m('Critic 2', 'She\'s brilliant, I admit. But a great performance doesn\'t make a masterpiece.'),
    f('Critic 1', 'The audience I saw it with gave it a standing ovation!'), m('Critic 2', 'Then perhaps I\'m the problem!')],
    ex: [K.mc('What does Critic 2 think of the film?', ['a masterpiece', 'overrated', 'moving'], 1), K.mc('How long does the plot take to start?', ['ten minutes', 'forty minutes', 'an hour'], 1), K.mc('How old is the lead actress?', ['twenty', 'thirty', 'forty'], 0), K.tf('Critic 2 thinks the actress is bad.', false)] });
  A('ge-b2', 'u7', { title: 'Strange noises', intro: 'Two flatmates hear something at night.', script: [
    m('Arman', 'Did you hear that? Someone must be in the kitchen.'), f('Aya', 'It can\'t be anyone. The door\'s locked.'),
    m('Arman', 'Then what was it? It might have been the wind.'), f('Aya', 'Or the cat. She must have jumped on the table again.'),
    m('Arman', 'We don\'t have a cat.'), f('Aya', '…The neighbour\'s cat, then. It could have come through the window.'),
    m('Arman', 'The window\'s closed too.'), f('Aya', 'OK. You go and check!')],
    ex: [K.mc('Where does Arman think someone is?', ['in the bedroom', 'in the kitchen', 'outside'], 1), K.mc('Why does Aya say it can\'t be a person?', ['the door is locked', 'there\'s an alarm', 'they live on the 10th floor'], 0), K.tf('They have their own cat.', false), K.mc('Who will check?', ['Aya', 'Arman', 'the neighbour'], 1)] });
  A('ge-b2', 'u8', { title: 'A travel story', intro: 'A traveller tells a friend about a trip.', script: [
    f('Saltanat', 'So how was Kyrgyzstan?'), m('Bauyrzhan', 'Breathtaking! But the journey was a disaster. Our flight was cancelled.'),
    f('Saltanat', 'What did the airline say?'), m('Bauyrzhan', 'They told us there would be a twelve-hour delay. A local man asked us where we were going and said he would drive us.'),
    f('Saltanat', 'Did you trust him?'), m('Bauyrzhan', 'He said he\'d driven tourists for years — and he was the best guide we\'ve ever had!')],
    ex: [K.mc('Where did Bauyrzhan travel?', ['Uzbekistan', 'Kyrgyzstan', 'Georgia'], 1), K.mc('What happened to the flight?', ['it was cancelled', 'it was early', 'it was full'], 0), K.mc('How long was the delay?', ['two hours', 'six hours', 'twelve hours'], 2), K.mc('What was the local man like?', ['the best guide they\'ve ever had', 'unfriendly', 'a taxi driver'], 0)] });

  /* ----- C1 ----- */
  A('ge-c1', 'u3', { title: 'Building resilience', intro: 'A psychologist on a morning radio show.', script: [
    m('Host', 'Is resilience something we\'re born with?'), f('Psychologist', 'Not really. It\'s far more useful to think of it as a set of habits we can practise.'),
    m('Host', 'Such as?'), f('Psychologist', 'Sleep, for one. Even a few bad nights can measurably reduce cognitive flexibility. And social connection — having someone to confide in.'),
    m('Host', 'And mindfulness apps?'), f('Psychologist', 'They can alleviate stress, but I\'d urge employers not to treat them as a substitute for reasonable workloads.')],
    ex: [K.mc('According to the psychologist, resilience is…', ['inborn', 'a set of habits', 'impossible to change'], 1), K.mc('What can a few bad nights reduce?', ['appetite', 'cognitive flexibility', 'heart rate'], 1), K.tf('She thinks mindfulness apps can replace reasonable workloads.', false), K.mc('Who does she address her warning to?', ['students', 'employers', 'doctors'], 1)] });
  A('ge-c1', 'u4', { title: 'The city in 2050', intro: 'An urban planner presents a vision.', script: [
    f('Planner', 'By 2050, roughly two-thirds of humanity will be living in cities.'), f('Planner', 'In our plan, every resident will be able to reach a school, a clinic and a park within fifteen minutes on foot.'),
    m('Journalist', 'What about cars?'), f('Planner', 'By the end of the decade we\'ll have pedestrianised the old centre and retrofitted most Soviet-era blocks with solar panels.'),
    m('Journalist', 'Won\'t rents rise?'), f('Planner', 'That\'s the real risk. Unless we build affordable housing at the same time, gentrification will push families out.')],
    ex: [K.mc('By 2050, how much of humanity will live in cities?', ['a third', 'two-thirds', 'nine-tenths'], 1), K.mc('What will be within fifteen minutes on foot?', ['school, clinic and park', 'the airport', 'all workplaces'], 0), K.mc('What will be retrofitted?', ['old blocks with solar panels', 'roads with lights', 'cars'], 0), K.mc('What does the planner see as the real risk?', ['traffic', 'gentrification', 'pollution'], 1)] });
  A('ge-c1', 'u5', { title: 'Debate: is meritocracy fair?', intro: 'Two students debate on a university podcast.', script: [
    m('Student A', 'Surely rewarding talent and effort is the fairest system we have.'), f('Student B', 'In principle, yes. But merit is rarely measured on a level playing field.'),
    m('Student A', 'So you\'d rather return to inherited privilege?'), f('Student B', 'Not at all. Much as I admire the ideal, I think we need a safety net as well as opportunity.'),
    m('Student A', 'Albeit at a higher cost to taxpayers.'), f('Student B', 'Whereas the cost of wasted talent is far higher.')],
    ex: [K.mc('What does Student A argue?', ['meritocracy is the fairest system', 'inherited privilege is fair', 'taxes should be lower'], 0), K.mc('Student B\'s main objection is that…', ['merit is not measured fairly', 'talent doesn\'t exist', 'effort is unimportant'], 0), K.tf('Student B wants to return to inherited privilege.', false), K.mc('What does Student B say is more costly?', ['taxes', 'wasted talent', 'education'], 1)] });
  A('ge-c1', 'u6', { title: 'Lost in translation', intro: 'A consultant describes a misunderstanding.', script: [
    f('Consultant', 'I remember telling a client their proposal was "quite interesting". I meant it was promising.'), m('Interviewer', 'And how did they take it?'),
    f('Consultant', 'They heard it as a polite rejection and stopped working on it for a month.'), m('Interviewer', 'What did you learn?'),
    f('Consultant', 'I stopped assuming my words conveyed what I meant. Now I always stop to check: "So, to be clear, should we go ahead?"'), m('Interviewer', 'Simple, but effective.')],
    ex: [K.mc('What did the consultant call the proposal?', ['excellent', 'quite interesting', 'unacceptable'], 1), K.mc('How did the client interpret it?', ['as enthusiasm', 'as a polite rejection', 'as a joke'], 1), K.mc('How long did they stop working on it?', ['a week', 'a month', 'a year'], 1), K.mc('What does the consultant do now?', ['avoids feedback', 'checks understanding explicitly', 'writes everything in email'], 1)] });
  A('ge-c1', 'u7', { title: 'The climber', intro: 'An interview with a mountaineer.', script: [
    m('Interviewer', 'Some people would call what you do reckless.'), f('Climber', 'I\'d rather they called it a calculated risk. Every climb is planned for months.'),
    m('Interviewer', 'Have you ever turned back?'), f('Climber', 'Many times. It\'s high time we stopped treating turning back as failure.'),
    m('Interviewer', 'What\'s the biggest danger?'), f('Climber', 'Complacency. When things go well, you start behaving as if the mountain were your friend. It isn\'t.')],
    ex: [K.mc('How does the climber describe her climbs?', ['reckless', 'calculated risks', 'spontaneous'], 1), K.tf('She has never turned back.', false), K.mc('What should not be seen as failure?', ['turning back', 'losing equipment', 'climbing slowly'], 0), K.mc('What is the biggest danger, in her view?', ['bad weather', 'complacency', 'cost'], 1)] });
  A('ge-c1', 'u8', { title: 'Check before you share', intro: 'A media literacy trainer talks to teenagers.', script: [
    m('Trainer', 'Let\'s be honest: we\'ve all shared something that turned out to be false.'), f('Student', 'But how can we tell what\'s credible?'),
    m('Trainer', 'Ask three questions. Who published it? What\'s the evidence? And how does it make you feel?'), f('Student', 'Why does feeling matter?'),
    m('Trainer', 'Because sensationalist stories are designed to make you angry or afraid — that\'s when you\'re least likely to verify.'), f('Student', 'So if it makes me furious, I should pause.'),
    m('Trainer', 'Exactly. Pause, then check.')],
    ex: [K.mc('How many questions does the trainer suggest?', ['two', 'three', 'five'], 1), K.mc('Why do feelings matter?', ['sensational stories make us less likely to verify', 'they make stories true', 'they are irrelevant'], 0), K.mc('What should you do if a story makes you furious?', ['share it quickly', 'pause and check', 'delete your account'], 1), K.tf('The trainer claims he has never shared false information.', false)] });

  /* ----- C2 ----- */
  A('ge-c2', 'u3', { title: 'Who is to blame?', intro: 'An ethicist and an engineer debate accountability.', script: [
    f('Ethicist', 'If an autonomous system causes harm, someone must be held accountable.'), m('Engineer', 'Agreed — but these systems learn from data. Their decisions can be inscrutable even to us.'),
    f('Ethicist', 'Then I\'d insist that any high-stakes system be required to explain itself.'), m('Engineer', 'Were we to demand that, we might sacrifice accuracy for a comforting illusion.'),
    f('Ethicist', 'Better a little less accuracy than no accountability whatsoever.'), m('Engineer', 'Be that as it may, the trade-off is rarely that simple.')],
    ex: [K.mc('What does the ethicist insist on?', ['banning AI', 'that high-stakes systems explain themselves', 'lower accuracy'], 1), K.mc('Why are decisions inscrutable?', ['the systems learn from data', 'engineers hide them', 'they are random'], 0), K.mc('The engineer fears explanations may sacrifice…', ['speed', 'accuracy', 'privacy'], 1), K.tf('By the end, they fully agree.', false)] });
  A('ge-c2', 'u4', { title: 'Reclaiming attention', intro: 'A writer discusses her book on focus.', script: [
    m('Host', 'Your book argues that attention is the scarce resource of our age.'), f('Author', 'Precisely. Information is abundant; the capacity to engage with it deeply is not.'),
    m('Host', 'And the platforms are to blame?'), f('Author', 'Their business model depends on the monetisation of our attention, so the incentives are clear.'),
    m('Host', 'What can individuals do?'), f('Author', 'Something, certainly — but the protection of attention, like the protection of privacy, may ultimately require regulation.')],
    ex: [K.mc('According to the author, what is scarce?', ['information', 'attention', 'technology'], 1), K.mc('How do platforms make money, in her view?', ['by monetising attention', 'by selling devices', 'through subscriptions only'], 0), K.mc('What may ultimately be required?', ['regulation', 'new devices', 'nothing'], 0), K.tf('She thinks individuals can do nothing.', false)] });
  A('ge-c2', 'u5', { title: 'The comedian', intro: 'A stand-up comedian on why humour matters.', script: [
    f('Interviewer', 'Is comedy hard to translate?'), m('Comedian', 'Puns are impossible. Irony is risky. Deadpan is just dangerous — half the audience thinks you mean it.'),
    f('Interviewer', 'You do a lot of self-deprecating humour.'), m('Comedian', 'I do. If I laugh at myself first, nobody else needs to!'),
    f('Interviewer', 'Have you ever offended anyone?'), m('Comedian', 'I\'d like to say no. I won\'t, because I have — and I learned more from that than from any applause.')],
    ex: [K.mc('Which type of humour is "impossible" to translate?', ['puns', 'irony', 'slapstick'], 0), K.mc('Why is deadpan dangerous?', ['it is rude', 'people may think you are serious', 'it is too long'], 1), K.mc('Why does he use self-deprecating humour?', ['so nobody else needs to laugh at him', 'it is easy', 'audiences prefer it'], 0), K.tf('He has never offended anyone.', false)] });
  A('ge-c2', 'u6', { title: 'The prodigy', intro: 'A former chess prodigy reflects on her career.', script: [
    m('Host', 'You were a national champion at eleven. Did that feel like a gift?'), f('Guest', 'At the time, yes. Later, it felt more like a weight. Every plateau looked like failure.'),
    m('Host', 'And now?'), f('Guest', 'I do believe talent exists. But what kept me going was tenacity, not genius.'),
    m('Host', 'What would you tell young prodigies?'), f('Guest', 'That the accolades are by no means the point. The work is.')],
    ex: [K.mc('At what age was she champion?', ['eight', 'eleven', 'fifteen'], 1), K.mc('How did early success feel later?', ['like a weight', 'like nothing', 'like luck'], 0), K.mc('What kept her going?', ['genius', 'tenacity', 'money'], 1), K.mc('Her advice is that what matters is…', ['the accolades', 'the work', 'winning'], 1)] });
  A('ge-c2', 'u7', { title: 'Saiga on the steppe', intro: 'A conservation scientist reports from the field.', script: [
    f('Scientist', 'Twenty years ago the saiga population was thought to have collapsed by ninety-five per cent.'), m('Reporter', 'And today?'),
    f('Scientist', 'It\'s estimated to have recovered to well over a million. Anti-poaching patrols and huge protected areas made the difference.'), m('Reporter', 'So the job is done?'),
    f('Scientist', 'Far from it. As herds encroach on farmland, conflicts with farmers need resolving — and fences need rethinking.'), m('Reporter', 'A new kind of challenge, then.')],
    ex: [K.mc('How much had the population fallen?', ['50%', '75%', '95%'], 2), K.mc('What is the population today?', ['under 40,000', 'around 100,000', 'well over a million'], 2), K.mc('What made the difference?', ['patrols and protected areas', 'zoos', 'hunting bans abroad'], 0), K.tf('The scientist thinks the job is finished.', false)] });
  A('ge-c2', 'u8', { title: 'Forecasting the future', intro: 'A futurist answers listeners\' questions.', script: [
    m('Listener', 'What will the world look like in fifty years?'), f('Futurist', 'I needn\'t pretend to know — and nor should anyone else. Forecasters once confidently predicted flying cars and missed the internet.'),
    m('Listener', 'So what\'s the point of futurism?'), f('Futurist', 'Scenarios rather than predictions. We ask what might happen, and what contingency plans would serve us across many outcomes.'),
    m('Listener', 'Is there anything you\'re sure of?'), f('Futurist', 'Only that change is bound to surprise us.')],
    ex: [K.mc('What did forecasters miss?', ['flying cars', 'the internet', 'space travel'], 1), K.mc('Futurists now prefer…', ['exact predictions', 'scenarios', 'guesswork'], 1), K.mc('What is the futurist sure of?', ['that change will surprise us', 'that robots will rule', 'nothing at all'], 0), K.tf('She claims to know exactly what the world will look like.', false)] });
})();
