/* General English A2: original IF Academy course. Photos: Unsplash (free licence) and IF Academy. */
IFX.course({
  id: 'ge-a2', track: 'general', level: 'A2', next: 'B1', icon: '🌍',
  title: 'General English A2', sub: 'Everyday English for real life',
  blurb: 'Daily life, food, travel and plans — short readings, the key words and the grammar you need to talk about them.',
  units: [
  { id: 'u1', title: 'My day', topic: 'Daily life', lessons: [
    { id: 'v', type: 'vocab', title: 'Daily routines', words: [
      { w: 'wake up', p: 'phrasal verb', d: 'to stop sleeping', e: 'I wake up at seven every morning.', ru: 'просыпаться' },
      { w: 'get dressed', p: 'phrase', d: 'to put your clothes on', e: 'She gets dressed quickly and leaves.', ru: 'одеваться' },
      { w: 'commute', p: 'verb', d: 'to travel to work or school every day', e: 'Many people commute by bus.', ru: 'ездить на работу' },
      { w: 'have a break', p: 'phrase', d: 'to stop working or studying for a short time', e: 'We have a break at eleven.', ru: 'делать перерыв' },
      { w: 'usually', p: 'adverb', d: 'in most situations; most of the time', e: 'I usually walk to school.', ru: 'обычно' },
      { w: 'rarely', p: 'adverb', d: 'not often', e: 'He rarely eats breakfast.', ru: 'редко' },
      { w: 'busy', p: 'adjective', d: 'having a lot to do', e: 'Monday is my busiest day.', ru: 'занятой' },
      { w: 'free time', p: 'noun', d: 'time when you are not working or studying', e: 'In my free time I play football.', ru: 'свободное время' }
    ]},
    { id: 'g', type: 'grammar', title: 'Present simple and adverbs of frequency',
      rule: '<p>Use the <b>present simple</b> for habits and routines. Add <b>-s/-es</b> with he, she, it.</p><table><tr><td>I / you / we / they</td><td>work · don\'t work</td></tr><tr><td>he / she / it</td><td>works · doesn\'t work</td></tr></table><p><b>Adverbs of frequency</b> go <b>before</b> the main verb but <b>after</b> <i>be</i>:</p><p class="ex">She <b>always</b> gets up early. · He is <b>never</b> late.</p><p>always · usually · often · sometimes · rarely · never</p>',
      ex: [
        { t: 'gap', q: 'My brother ___ (work) in a bank.', a: ['works'] },
        { t: 'gap', q: 'We ___ (not / have) lessons on Sunday.', a: ["don't have", 'do not have'] },
        { t: 'mc', q: 'Choose the correct sentence.', o: ['She is always on time.', 'She always is on time.', 'Always she is on time.'], a: 0, why: 'Frequency adverbs go after be.' },
        { t: 'mc', q: '___ your sister drive to work?', o: ['Do', 'Does', 'Is'], a: 1 },
        { t: 'order', a: 'I usually have lunch at one o\'clock.' },
        { t: 'order', a: 'They never watch TV in the morning.' }
      ]},
    { id: 'r', type: 'reading', title: 'A day in Kostanay', photo: 'NBzV5F_4bPA', alt: 'People walking in a city street in the morning',
      text: 'Aigerim is twenty-four and she works at a travel agency in the centre of Kostanay. She usually wakes up at half past six. She has a quick breakfast — tea and bread with honey — and then she commutes to work by bus. The journey takes about twenty minutes.\n\nShe starts work at eight thirty. In the morning she answers emails and phone calls from customers. She has a break at one o\'clock and often eats lunch with her colleagues in a small café near the office.\n\nAigerim finishes work at six. Three evenings a week she goes to English classes, because she wants to work with tourists from other countries. On the other evenings she cooks dinner with her mother or meets friends. She rarely watches TV — she prefers reading. She goes to bed at about eleven.',
      ex: [
        { t: 'mc', q: 'How does Aigerim go to work?', o: ['She walks.', 'She takes the bus.', 'She drives.'], a: 1 },
        { t: 'mc', q: 'What does she do in the morning at work?', o: ['She meets tourists.', 'She answers emails and calls.', 'She cooks lunch.'], a: 1 },
        { t: 'tf', q: 'Aigerim goes to English classes every evening.', a: false, why: 'Three evenings a week.' },
        { t: 'tf', q: 'She wants to work with tourists.', a: true },
        { t: 'mc', q: 'What does she rarely do?', o: ['read', 'watch TV', 'meet friends'], a: 1 }
      ]},
    { id: 'c', type: 'check', title: 'Unit check', ex: [
      { t: 'gap', q: 'He ___ (get up) at six on weekdays.', a: ['gets up'] },
      { t: 'mc', q: 'I don\'t go out much. I ___ go to the cinema.', o: ['always', 'rarely', 'usually'], a: 1 },
      { t: 'mc', q: 'A word for "travel to work every day":', o: ['commute', 'wake up', 'get dressed'], a: 0 },
      { t: 'gap', q: 'Where ___ your parents live?', a: ['do'] },
      { t: 'order', a: 'My sister is often busy on Mondays.' },
      { t: 'match', p: [['wake up', 'stop sleeping'], ['free time', 'time for hobbies'], ['have a break', 'stop for a short time'], ['busy', 'with a lot to do']] }
    ]}
  ]},
  { id: 'u2', title: 'Food and cafés', topic: 'Food', lessons: [
    { id: 'v', type: 'vocab', title: 'At the café', words: [
      { w: 'menu', p: 'noun', d: 'a list of food and drinks in a café or restaurant', e: 'Can I see the menu, please?', ru: 'меню' },
      { w: 'order', p: 'verb', d: 'to ask for food or drink in a café', e: 'Are you ready to order?', ru: 'заказывать' },
      { w: 'bill', p: 'noun', d: 'the paper that shows how much you must pay', e: 'Could we have the bill, please?', ru: 'счёт' },
      { w: 'tip', p: 'noun', d: 'extra money you give to a waiter', e: 'We left a small tip.', ru: 'чаевые' },
      { w: 'delicious', p: 'adjective', d: 'very good to eat', e: 'This soup is delicious!', ru: 'очень вкусный' },
      { w: 'spicy', p: 'adjective', d: 'with a hot taste, like chilli', e: 'I don\'t like spicy food.', ru: 'острый' },
      { w: 'dessert', p: 'noun', d: 'sweet food you eat after the main meal', e: 'For dessert we had ice cream.', ru: 'десерт' },
      { w: 'takeaway', p: 'noun', d: 'food you buy and eat at home', e: 'Let\'s get a takeaway tonight.', ru: 'еда на вынос' }
    ]},
    { id: 'g', type: 'grammar', title: 'Countable and uncountable: some, any, much, many',
      rule: '<p><b>Countable</b> nouns have a plural: <i>an apple → apples</i>. <b>Uncountable</b> nouns don\'t: <i>water, bread, rice, money</i>.</p><table><tr><td>some</td><td>positive sentences: <i>I\'d like some water.</i></td></tr><tr><td>any</td><td>questions and negatives: <i>Is there any milk? There aren\'t any eggs.</i></td></tr><tr><td>many</td><td>countable: <i>How many apples?</i></td></tr><tr><td>much</td><td>uncountable: <i>How much sugar?</i></td></tr></table><p>We also say <b>a lot of</b> with both: <i>a lot of eggs, a lot of milk</i>.</p>',
      ex: [
        { t: 'mc', q: 'Is there ___ bread?', o: ['some', 'any', 'many'], a: 1 },
        { t: 'mc', q: 'How ___ coffee do you drink a day?', o: ['many', 'much'], a: 1 },
        { t: 'mc', q: 'How ___ students are in your class?', o: ['many', 'much'], a: 0 },
        { t: 'gap', q: 'I\'d like ___ tea, please.', a: ['some'] },
        { t: 'gap', q: 'There aren\'t ___ tomatoes in the fridge.', a: ['any'] },
        { t: 'order', a: 'We don\'t have much time.' }
      ]},
    { id: 'r', type: 'reading', title: 'The best coffee in town', photo: 'w06oJlBLc58', alt: 'A barista serving coffee to a customer',
      text: 'Daniyar opened his small café two years ago. "At first I didn\'t have much money," he says, "so I bought only one coffee machine and six tables." Now the café is one of the most popular places on the street.\n\nThe menu is short. There are some cakes, a few sandwiches and, of course, a lot of different coffees. "People don\'t want a long menu. They want good food and friendly service," Daniyar explains. His most popular dessert is a honey cake from his grandmother\'s recipe.\n\nStudents often come in the afternoon to study, and in the morning there are many office workers who order coffee as a takeaway. On Saturdays there is live music. Daniyar\'s plan for next year? "A second café — but not too big!"',
      ex: [
        { t: 'mc', q: 'Why did Daniyar buy only one coffee machine?', o: ['He didn\'t have much money.', 'The café was very big.', 'He didn\'t like coffee.'], a: 0 },
        { t: 'tf', q: 'The café has a very long menu.', a: false },
        { t: 'mc', q: 'Where is the honey cake recipe from?', o: ['a cookbook', 'his grandmother', 'a customer'], a: 1 },
        { t: 'mc', q: 'Who buys takeaway coffee in the morning?', o: ['students', 'musicians', 'office workers'], a: 2 },
        { t: 'tf', q: 'Daniyar wants to open a very big café.', a: false }
      ]},
    { id: 'c', type: 'check', title: 'Unit check', ex: [
      { t: 'mc', q: 'Could we have the ___, please? We want to pay.', o: ['menu', 'bill', 'tip'], a: 1 },
      { t: 'gap', q: 'How ___ sugar do you want?', a: ['much'] },
      { t: 'mc', q: 'Food with a hot taste, like chilli, is…', o: ['sweet', 'spicy', 'delicious'], a: 1 },
      { t: 'gap', q: 'Are there ___ sandwiches left?', a: ['any'] },
      { t: 'order', a: 'Are you ready to order?' },
      { t: 'match', p: [['dessert', 'sweet food after a meal'], ['takeaway', 'food you eat at home'], ['tip', 'extra money for the waiter'], ['menu', 'list of food and drinks']] }
    ]}
  ]},
  { id: 'u3', title: 'Travel and holidays', topic: 'Travel', lessons: [
    { id: 'v', type: 'vocab', title: 'Getting around', words: [
      { w: 'ticket', p: 'noun', d: 'a piece of paper or a code that lets you travel', e: 'I bought a train ticket online.', ru: 'билет' },
      { w: 'platform', p: 'noun', d: 'the place where you get on a train', e: 'The train leaves from platform 3.', ru: 'платформа' },
      { w: 'luggage', p: 'noun', d: 'the bags you take when you travel', e: 'How much luggage do you have?', ru: 'багаж' },
      { w: 'book', p: 'verb', d: 'to arrange a hotel room or ticket before you go', e: 'We booked a hotel near the sea.', ru: 'бронировать' },
      { w: 'abroad', p: 'adverb', d: 'in or to another country', e: 'Have you ever been abroad?', ru: 'за границей' },
      { w: 'sightseeing', p: 'noun', d: 'visiting famous places as a tourist', e: 'We did some sightseeing in Almaty.', ru: 'осмотр достопримечательностей' },
      { w: 'delay', p: 'noun', d: 'when something happens later than planned', e: 'There was a two-hour delay.', ru: 'задержка' },
      { w: 'journey', p: 'noun', d: 'travelling from one place to another', e: 'The journey to Astana takes ten hours.', ru: 'поездка' }
    ]},
    { id: 'g', type: 'grammar', title: 'Past simple: regular and irregular verbs',
      rule: '<p>Use the <b>past simple</b> for finished actions in the past: <i>yesterday, last week, in 2020, two days ago</i>.</p><table><tr><td>regular</td><td>visit → visit<b>ed</b> · stop → stop<b>ped</b> · study → stud<b>ied</b></td></tr><tr><td>irregular</td><td>go → <b>went</b> · see → <b>saw</b> · buy → <b>bought</b> · take → <b>took</b></td></tr><tr><td>negative</td><td>We <b>didn\'t</b> stay long. (didn\'t + base verb)</td></tr><tr><td>question</td><td><b>Did</b> you enjoy it?</td></tr></table>',
      ex: [
        { t: 'gap', q: 'Last summer we ___ (go) to Burabay.', a: ['went'] },
        { t: 'gap', q: 'I ___ (book) the tickets two weeks ago.', a: ['booked'] },
        { t: 'gap', q: 'She ___ (not / take) much luggage.', a: ["didn't take", 'did not take'] },
        { t: 'mc', q: '___ you see the mountains?', o: ['Do', 'Did', 'Were'], a: 1 },
        { t: 'mc', q: 'They ___ in a small hotel.', o: ['stayed', 'staied', 'stay'], a: 0 },
        { t: 'order', a: 'We didn\'t have time for sightseeing.' }
      ]},
    { id: 'r', type: 'reading', title: 'A trip that went wrong — and right', photo: 'w66RJBGihks', alt: 'A traveller with a suitcase on a train platform',
      text: 'Last March, Timur and his friend Asel decided to travel to Almaty for a long weekend. They booked their train tickets online and found a cheap hotel near the mountains.\n\nOn Friday evening they arrived at the station with their luggage, but there was a problem: a four-hour delay. "We were tired and a bit angry," Timur remembers. "But then we met a family from Shymkent on the platform. They had a big bag of food and they shared it with us!"\n\nThe journey took almost a whole day, so they had only two days for sightseeing. They went up to Shymbulak, walked around the city centre and tried a lot of new food. "We didn\'t see everything," says Asel, "but it was a great trip. Next time we\'ll fly!"',
      ex: [
        { t: 'mc', q: 'How did they book the tickets?', o: ['at the station', 'online', 'by phone'], a: 1 },
        { t: 'mc', q: 'What was the problem at the station?', o: ['They lost their luggage.', 'The train was late.', 'There were no tickets.'], a: 1 },
        { t: 'tf', q: 'A family on the platform gave them food.', a: true },
        { t: 'tf', q: 'They had five days for sightseeing.', a: false },
        { t: 'mc', q: 'How do they want to travel next time?', o: ['by train', 'by car', 'by plane'], a: 2 }
      ]},
    { id: 'c', type: 'check', title: 'Unit check', ex: [
      { t: 'gap', q: 'We ___ (see) a lot of interesting places.', a: ['saw'] },
      { t: 'mc', q: 'The bags you take on a trip:', o: ['luggage', 'ticket', 'platform'], a: 0 },
      { t: 'gap', q: '___ you enjoy your holiday?', a: ['did'] },
      { t: 'mc', q: 'Have you ever lived ___?', o: ['abroad', 'journey', 'delay'], a: 0 },
      { t: 'order', a: 'Our train left from platform two.' },
      { t: 'match', p: [['book', 'arrange before you go'], ['delay', 'later than planned'], ['sightseeing', 'visiting famous places'], ['journey', 'travel from A to B']] }
    ]}
  ]}
]});
