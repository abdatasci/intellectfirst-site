/* IF Kids Quest — story lines, words and sentences for each land, graded by Cambridge Young Learners level.
   Starters: single words with pictures and very short sentences.
   Movers: words in sentences, "can / there are / put on".
   Flyers: whole phrases, past simple and "going to".
   KET (A2 Key): present perfect, comparatives, plans, directions, advice.
   PET (B1 Preliminary): conditionals, the passive, past perfect, reported speech, "used to". */
window.KQ_LANDS = [
  {
    id: 'rainbow', name: 'Rainbow Valley', level: 'Starters', ru: 'Радужная долина',
    sky: [0xffd7ec, 0xfff4d6], ground: 0x8fdc7a, ground2: 0x6cc865, props: ['tree', 'candy', 'house'], road: 0xb9a7e8,
    words: [['red', 'red'], ['blue', 'blue'], ['yellow', 'yellow'], ['green', 'green'], ['cat', 'cat'], ['dog', 'dog'], ['bird', 'bird'], ['fish', 'fish']],
    story: [
      { who: 'mia', t: 'Hello! I am Mia. This is Bolt. He is my robot.' },
      { who: 'bolt', t: 'Hello! Beep beep! I like colours.' },
      { who: 'narr', t: 'Look! A big rainbow. Red, yellow, green and blue.', show: ['red', 'yellow', 'green', 'blue'] },
      { who: 'narr', t: 'Oh no! The wind is strong. The colours fall down!' },
      { who: 'mia', t: 'Where is the red? Where is the blue?' },
      { who: 'bolt', t: 'The cat has the red. The fish has the blue!', show: ['cat', 'fish'] },
      { who: 'mia', t: 'Let\'s find the colours, Bolt!', choice: { q: 'What colour is the sun?', opts: ['yellow', 'blue'], a: 0 } },
      { who: 'bolt', t: 'Get in the kart. Let\'s go!' }
    ],
    kart: 'pic',
    mine: [
      { type: 'pic', pic: 'cat', opts: ['cat', 'dog', 'fish'] },
      { type: 'pic', pic: 'red', opts: ['blue', 'red', 'green'] },
      { type: 'listen', say: 'bird', opts: ['fish', 'bird', 'cat'] },
      { type: 'pic', pic: 'yellow', opts: ['yellow', 'green', 'red'] },
      { type: 'gap', t: 'It is a ___ fish.', pic: 'blue', opts: ['blue', 'red', 'yellow'] },
      { type: 'listen', say: 'dog', opts: ['dog', 'cat', 'bird'] }
    ]
  },
  {
    id: 'farm', name: 'Yummy Farm', level: 'Starters', ru: 'Вкусная ферма',
    sky: [0xbfe6ff, 0xfff6d8], ground: 0xa6d96a, ground2: 0x8cc955, props: ['farm', 'tree', 'tree'], road: 0xd8c29a,
    words: [['apple', 'apple'], ['banana', 'banana'], ['egg', 'egg'], ['carrot', 'carrot'], ['cake', 'cake'], ['ice cream', 'icecream']],
    story: [
      { who: 'narr', t: 'Mia and Bolt come to Yummy Farm.' },
      { who: 'bolt', t: 'I am hungry! Beep! Can I eat?' },
      { who: 'mia', t: 'Robots don\'t eat, Bolt! But I like apples.', show: ['apple'] },
      { who: 'narr', t: 'Uh-oh. The farm animals are hiding the food!' },
      { who: 'mia', t: 'Where is my banana? Where is my cake?', show: ['banana', 'cake'] },
      { who: 'bolt', t: 'Do you like carrots, Mia?', choice: { q: 'Do you like carrots?', opts: ['Yes, I do!', 'Yes, it is!'], a: 0 } },
      { who: 'mia', t: 'Let\'s find all the food. Go, go, go!' }
    ],
    kart: 'pic',
    mine: [
      { type: 'pic', pic: 'banana', opts: ['apple', 'banana', 'egg'] },
      { type: 'listen', say: 'carrot', opts: ['cake', 'carrot', 'egg'] },
      { type: 'gap', t: 'I like ___.', pic: 'apple', opts: ['apples', 'cats', 'blue'] },
      { type: 'pic', pic: 'icecream', opts: ['ice cream', 'cake', 'banana'] },
      { type: 'listen', say: 'egg', opts: ['egg', 'apple', 'carrot'] },
      { type: 'gap', t: 'Do you like cake? Yes, I ___.', pic: 'cake', opts: ['do', 'am', 'is'] }
    ]
  },
  {
    id: 'toys', name: 'Toy Town', level: 'Movers', ru: 'Город игрушек',
    sky: [0xc8d7ff, 0xf1ecff], ground: 0x9be0b0, ground2: 0x7fd09a, props: ['house', 'candy', 'house'], road: 0xa9b3c8,
    words: [['ball', 'ball'], ['kite', 'kite'], ['robot', 'robot'], ['balloon', 'balloon'], ['teddy', 'teddy'], ['train', 'train'], ['doll', 'doll'], ['drum', 'drum']],
    story: [
      { who: 'narr', t: 'Toy Town is very quiet today. The toys can\'t move.' },
      { who: 'bolt', t: 'A robot like me! But he can\'t walk.', show: ['robot'] },
      { who: 'mia', t: 'There are two balloons in the tree. Can you get them, Bolt?', show: ['balloon'] },
      { who: 'bolt', t: 'Yes, I can! I can jump very high.' },
      { who: 'narr', t: 'The toys need words to move again. Every word is a key.' },
      { who: 'mia', t: 'Whose kite is this? It\'s the bear\'s kite!', show: ['kite', 'teddy'], choice: { q: 'Whose ball is this?', opts: ['It\'s Mia\'s ball.', 'It\'s ball Mia.'], a: 0 } },
      { who: 'bolt', t: 'Quick! Let\'s drive and find the words.' }
    ],
    kart: 'word',
    kartQ: [
      { t: 'There are two ___ in the tree.', a: 'balloons', o: ['balloons', 'balloon', 'ball'] },
      { t: 'The robot ___ walk.', a: 'can\'t', o: ['can\'t', 'isn\'t', 'don\'t'] },
      { t: 'Bolt can jump very ___.', a: 'high', o: ['high', 'tall', 'big'] },
      { t: 'Whose kite is ___?', a: 'this', o: ['this', 'it', 'is'] },
      { t: 'The teddy is ___ the box.', a: 'in', o: ['in', 'at', 'of'] },
      { t: 'I want to ___ the drum.', a: 'play', o: ['play', 'make', 'do'] },
      { t: 'The train is ___ than the car.', a: 'longer', o: ['longer', 'long', 'longest'] },
      { t: 'There ___ a doll on the bed.', a: 'is', o: ['is', 'are', 'be'] }
    ],
    mine: [
      { type: 'pic', pic: 'kite', opts: ['kite', 'ball', 'drum'] },
      { type: 'gap', t: 'There are three ___.', pic: 'balloon', opts: ['balloons', 'balloon', 'a balloon'] },
      { type: 'listen', say: 'train', opts: ['doll', 'train', 'teddy'] },
      { type: 'gap', t: 'The robot can\'t ___.', pic: 'robot', opts: ['walk', 'walks', 'walking'] },
      { type: 'order', words: ['Can', 'I', 'have', 'the', 'ball', 'please?'] },
      { type: 'gap', t: 'Whose drum is ___?', pic: 'drum', opts: ['this', 'these', 'they'] }
    ]
  },
  {
    id: 'ice', name: 'Ice Mountains', level: 'Movers', ru: 'Ледяные горы',
    sky: [0xcfe6ff, 0xf4f9ff], ground: 0xf4f8ff, ground2: 0xdfe9f7, props: ['pine', 'mountain', 'pine'], road: 0xb6c7de,
    words: [['hat', 'hat'], ['scarf', 'scarf'], ['coat', 'coat'], ['snow', 'snow'], ['cloud', 'cloud'], ['rain', 'rain'], ['sun', 'sun2']],
    story: [
      { who: 'narr', t: 'Brrr! Mia and Bolt are in the Ice Mountains.' },
      { who: 'mia', t: 'It\'s snowing! I\'m very cold.', show: ['snow'] },
      { who: 'bolt', t: 'Put on your coat and your hat, Mia!', show: ['coat', 'hat'] },
      { who: 'mia', t: 'Where is my scarf? The wind took it!', show: ['scarf'] },
      { who: 'narr', t: 'Big grey clouds are coming. Then the sun comes out.', show: ['cloud', 'sun2'] },
      { who: 'bolt', t: 'What\'s the weather like now?', choice: { q: 'What\'s the weather like?', opts: ['It\'s sunny.', 'It\'s Sunday.'], a: 0 } },
      { who: 'mia', t: 'Let\'s go down the mountain. Hold on, Bolt!' }
    ],
    kart: 'word',
    kartQ: [
      { t: 'It\'s cold. Put ___ your coat.', a: 'on', o: ['on', 'in', 'at'] },
      { t: 'It\'s ___! Look at the snow.', a: 'snowing', o: ['snowing', 'snow', 'snows'] },
      { t: 'I\'m very ___. Where is my hat?', a: 'cold', o: ['cold', 'hot', 'hungry'] },
      { t: 'The ___ took my scarf!', a: 'wind', o: ['wind', 'window', 'wings'] },
      { t: 'What\'s the ___ like?', a: 'weather', o: ['weather', 'water', 'winter'] },
      { t: 'There are big grey ___.', a: 'clouds', o: ['clouds', 'cloud', 'cloudy'] },
      { t: 'It\'s raining. Take your ___.', a: 'umbrella', o: ['umbrella', 'kite', 'ball'] },
      { t: 'Mia ___ a warm scarf.', a: 'has got', o: ['has got', 'have got', 'is got'] }
    ],
    mine: [
      { type: 'pic', pic: 'scarf', opts: ['scarf', 'hat', 'coat'] },
      { type: 'listen', say: 'cloud', opts: ['snow', 'rain', 'cloud'] },
      { type: 'gap', t: 'Put ___ your hat.', pic: 'hat', opts: ['on', 'up', 'at'] },
      { type: 'gap', t: 'It\'s ___ today.', pic: 'rain', opts: ['raining', 'rain', 'rains'] },
      { type: 'order', words: ['I', 'am', 'very', 'cold', 'today.'] },
      { type: 'order', words: ['What\'s', 'the', 'weather', 'like?'] }
    ]
  },
  {
    id: 'space', name: 'Star Station', level: 'Flyers', ru: 'Звёздная станция',
    sky: [0x1d1b4b, 0x5a3f9c], ground: 0x7b6bb8, ground2: 0x6a5aa6, props: ['star2', 'planet', 'rocket'], road: 0x3c3470, night: true,
    words: [['rocket', 'rocket'], ['moon', 'moon'], ['planet', 'planet'], ['star', 'star2'], ['astronaut', 'robot']],
    story: [
      { who: 'narr', t: 'Yesterday Mia and Bolt flew to the moon in a rocket.', show: ['rocket', 'moon'] },
      { who: 'mia', t: 'It was amazing! We saw thousands of stars.', show: ['star2'] },
      { who: 'bolt', t: 'Tomorrow we\'re going to visit the purple planet.', show: ['planet'] },
      { who: 'narr', t: 'But the rocket\'s computer stopped. It only understands full sentences.' },
      { who: 'mia', t: 'If we say the right sentences, the engine will start again!' },
      { who: 'bolt', t: 'Which answer is right, Mia?', choice: { q: 'Where did you go yesterday?', opts: ['We went to the moon.', 'We go to the moon tomorrow.'], a: 0 } },
      { who: 'mia', t: 'Three, two, one... let\'s fly!' }
    ],
    kart: 'phrase',
    kartQ: [
      { t: 'Where did you go yesterday?', a: 'We flew to the moon.', o: ['We flew to the moon.', 'We fly to moon.', 'We are flying moon.'] },
      { t: 'What are you going to do tomorrow?', a: 'I\'m going to visit a planet.', o: ['I\'m going to visit a planet.', 'I visited a planet.', 'I go visit planet.'] },
      { t: 'What did you see?', a: 'We saw thousands of stars.', o: ['We saw thousands of stars.', 'We see star.', 'We seeing stars.'] },
      { t: 'Have you ever been to space?', a: 'Yes, I have.', o: ['Yes, I have.', 'Yes, I did.', 'Yes, I am.'] },
      { t: 'Which planet is the biggest?', a: 'Jupiter is the biggest.', o: ['Jupiter is the biggest.', 'Jupiter is big than.', 'Jupiter biggest is.'] },
      { t: 'How did you feel?', a: 'I felt excited.', o: ['I felt excited.', 'I feel excite.', 'I was exciting.'] },
      { t: 'Why did the rocket stop?', a: 'Because the computer broke.', o: ['Because the computer broke.', 'Because computer break.', 'So the computer broken.'] },
      { t: 'What will happen next?', a: 'The engine will start.', o: ['The engine will start.', 'The engine starts yesterday.', 'The engine will started.'] }
    ],
    mine: [
      { type: 'pic', pic: 'planet', opts: ['planet', 'moon', 'rocket'] },
      { type: 'gap', t: 'Yesterday we ___ to the moon.', pic: 'moon', opts: ['flew', 'fly', 'flying'] },
      { type: 'gap', t: 'Tomorrow we\'re ___ to visit Mars.', pic: 'rocket', opts: ['going', 'go', 'went'] },
      { type: 'order', words: ['We', 'saw', 'thousands', 'of', 'stars.'] },
      { type: 'order', words: ['Have', 'you', 'ever', 'been', 'to', 'space?'] },
      { type: 'gap', t: 'Jupiter is the ___ planet.', pic: 'planet', opts: ['biggest', 'bigger', 'big'] }
    ]
  }
  ,
  {
    id: 'museum', name: 'Midnight Museum', level: 'Flyers', ru: 'Ночной музей',
    sky: [0x2b2350, 0x6a4f8f], ground: 0xc9a66b, ground2: 0xb8925a, props: ['clock', 'book', 'house'], road: 0x8a6a45, night: true,
    words: [['key', 'key'], ['clock', 'clock'], ['map', 'map'], ['book', 'book'], ['camera', 'camera']],
    story: [
      { who: 'narr', t: 'Last night Mia and Bolt were visiting the city museum.', show: ['camera'] },
      { who: 'mia', t: 'Look, Bolt! This clock was made three hundred years ago.', show: ['clock'] },
      { who: 'narr', t: 'While they were looking at the dinosaurs, all the lights went out!' },
      { who: 'bolt', t: 'Beep! I can\'t see anything. Somebody has taken the golden key!', show: ['key'] },
      { who: 'mia', t: 'We must find it before the museum opens in the morning.', show: ['map'] },
      { who: 'bolt', t: 'What were we doing when the lights went out?', choice: { q: 'What were Mia and Bolt doing?', opts: ['They were looking at the dinosaurs.', 'They look at the dinosaurs.'], a: 0 } },
      { who: 'mia', t: 'Let\'s follow the map. Quick, into the kart!' }
    ],
    kart: 'phrase',
    kartQ: [
      { t: 'What were you doing at nine o\'clock?', a: 'I was reading a book.', o: ['I was reading a book.', 'I am read a book.', 'I reading book.'] },
      { t: 'Who took the key?', a: 'I don\'t know. Somebody took it.', o: ['I don\'t know. Somebody took it.', 'I not know. Somebody take.', 'Somebody taked it.'] },
      { t: 'When was the clock made?', a: 'It was made long ago.', o: ['It was made long ago.', 'It made long ago.', 'It is make long ago.'] },
      { t: 'What must we do now?', a: 'We must find the key.', o: ['We must find the key.', 'We must to find the key.', 'We musts find key.'] },
      { t: 'Where should we look first?', a: 'We should look upstairs.', o: ['We should look upstairs.', 'We should looking upstairs.', 'We should to look upstairs.'] },
      { t: 'What happened to the lights?', a: 'They suddenly went out.', o: ['They suddenly went out.', 'They sudden go out.', 'They are suddenly out go.'] },
      { t: 'Have you got a torch?', a: 'No, but I\'ve got a camera.', o: ['No, but I\'ve got a camera.', 'No, but I got camera have.', 'No, I haven\'t camera.'] },
      { t: 'How did you feel in the dark?', a: 'I felt a bit frightened.', o: ['I felt a bit frightened.', 'I feel a bit frightening.', 'I was a bit frighten.'] }
    ],
    mine: [
      { type: 'pic', pic: 'key', opts: ['key', 'clock', 'map'] },
      { type: 'gap', t: 'While we ___ walking, the lights went out.', pic: 'clock', opts: ['were', 'was', 'are'] },
      { type: 'gap', t: 'This book ___ written in 1850.', pic: 'book', opts: ['was', 'is', 'were'] },
      { type: 'listen', say: 'camera', opts: ['camera', 'map', 'book'] },
      { type: 'order', words: ['We', 'must', 'find', 'the', 'key.'] },
      { type: 'order', words: ['What', 'were', 'you', 'doing', 'last', 'night?'] }
    ]
  },
  {
    id: 'city', name: 'Big City Trip', level: 'KET', ru: 'Поездка в большой город',
    sky: [0x9fd4ff, 0xffe9c7], ground: 0xb7c2cf, ground2: 0xa3afbd, props: ['bus', 'house', 'house'], road: 0x5d6676,
    words: [['ticket', 'ticket'], ['bus', 'bus'], ['map', 'map'], ['camera', 'camera'], ['phone', 'phone']],
    story: [
      { who: 'narr', t: 'Mia and Bolt have arrived in a big city for the weekend.', show: ['bus'] },
      { who: 'mia', t: 'I\'ve never been to such a big city before! It\'s much busier than our town.' },
      { who: 'bolt', t: 'We\'ve got tickets for the river boat at four o\'clock.', show: ['ticket'] },
      { who: 'narr', t: 'But Mia\'s phone has stopped working, and the map is in the wrong language!', show: ['phone', 'map'] },
      { who: 'mia', t: 'We\'ll have to ask people for directions.' },
      { who: 'bolt', t: 'How should we ask politely?', choice: { q: 'Choose the polite question.', opts: ['Excuse me, could you tell me the way to the river?', 'Where river? Tell me.'], a: 0 } },
      { who: 'mia', t: 'Thank you! Come on, Bolt, we haven\'t got much time.' }
    ],
    kart: 'phrase',
    kartQ: [
      { t: 'Have you ever been to a big city?', a: 'No, I\'ve never been to one.', o: ['No, I\'ve never been to one.', 'No, I never was go.', 'No, I haven\'t went.'] },
      { t: 'How long have you been here?', a: 'We\'ve been here since Friday.', o: ['We\'ve been here since Friday.', 'We are here for Friday.', 'We\'ve been here for Friday.'] },
      { t: 'Is the city bigger than your town?', a: 'Yes, it\'s much bigger.', o: ['Yes, it\'s much bigger.', 'Yes, it\'s more big.', 'Yes, it\'s biggest.'] },
      { t: 'How do I get to the station?', a: 'Go straight on and turn left.', o: ['Go straight on and turn left.', 'Go straight and left turning.', 'You going straight on left.'] },
      { t: 'What are you going to do tomorrow?', a: 'We\'re going to visit a museum.', o: ['We\'re going to visit a museum.', 'We go to visiting a museum.', 'We\'re going visit museum.'] },
      { t: 'How much is a bus ticket?', a: 'It costs two pounds.', o: ['It costs two pounds.', 'It cost two pound.', 'It is costing two pounds.'] },
      { t: 'Could you take a photo of us?', a: 'Of course. Smile!', o: ['Of course. Smile!', 'Yes, I could took.', 'Of course I taking.'] },
      { t: 'Why are you late?', a: 'Because the bus didn\'t come.', o: ['Because the bus didn\'t come.', 'Because the bus not came.', 'So the bus don\'t come.'] }
    ],
    mine: [
      { type: 'pic', pic: 'ticket', opts: ['ticket', 'phone', 'bus'] },
      { type: 'gap', t: 'I\'ve ___ been on a boat before.', pic: 'ticket', opts: ['never', 'ever', 'yet'] },
      { type: 'gap', t: 'The city is ___ than our town.', pic: 'bus', opts: ['busier', 'more busy', 'busiest'] },
      { type: 'listen', say: 'phone', opts: ['phone', 'camera', 'map'] },
      { type: 'gap', t: 'We\'ve lived here ___ 2020.', pic: 'map', opts: ['since', 'for', 'from'] },
      { type: 'order', words: ['Could', 'you', 'tell', 'me', 'the', 'way?'] }
    ]
  },
  {
    id: 'festival', name: 'Music Festival', level: 'KET', ru: 'Музыкальный фестиваль',
    sky: [0xff9ac1, 0xffd88a], ground: 0x8fd17a, ground2: 0x7bc066, props: ['guitar', 'tree', 'drum'], road: 0xc58bd8,
    words: [['guitar', 'guitar'], ['drum', 'drum'], ['ticket', 'ticket'], ['trophy', 'trophy'], ['clock', 'clock']],
    story: [
      { who: 'narr', t: 'Every summer there is a music festival in the park.', show: ['guitar', 'drum'] },
      { who: 'mia', t: 'I\'d like to play in the band competition this year!', show: ['trophy'] },
      { who: 'bolt', t: 'You play the guitar really well. You should enter!' },
      { who: 'narr', t: 'But an hour before the show, the drummer felt ill and went home.', show: ['clock'] },
      { who: 'mia', t: 'Oh no! Who can play the drums now?' },
      { who: 'bolt', t: 'I can! I practise every day.', choice: { q: 'How often does Bolt practise?', opts: ['He practises every day.', 'He never practises.'], a: 0 } },
      { who: 'mia', t: 'Brilliant! Let\'s get to the stage before it starts.' }
    ],
    kart: 'phrase',
    kartQ: [
      { t: 'Would you like to come to the concert?', a: 'Yes, I\'d love to.', o: ['Yes, I\'d love to.', 'Yes, I love go.', 'Yes, I\'d like going.'] },
      { t: 'How often do you practise?', a: 'I usually practise every evening.', o: ['I usually practise every evening.', 'I practise usually evening.', 'Usually I am practise.'] },
      { t: 'What should I wear?', a: 'You should wear something comfortable.', o: ['You should wear something comfortable.', 'You should to wear comfortable.', 'You should wearing comfortable.'] },
      { t: 'When did the festival start?', a: 'It started at six o\'clock.', o: ['It started at six o\'clock.', 'It start at six o\'clock.', 'It starting at six.'] },
      { t: 'Who won the competition?', a: 'Our band won the first prize!', o: ['Our band won the first prize!', 'Our band winned the prize!', 'Our band wins first prize yesterday!'] },
      { t: 'Can you play an instrument?', a: 'Yes, I can play the guitar.', o: ['Yes, I can play the guitar.', 'Yes, I can to play guitar.', 'Yes, I can playing guitar.'] },
      { t: 'Why did the drummer go home?', a: 'Because he felt ill.', o: ['Because he felt ill.', 'Because he feel ill.', 'Because he was feel ill.'] },
      { t: 'How was the show?', a: 'It was the best show ever!', o: ['It was the best show ever!', 'It was the goodest show!', 'It was more good show!'] }
    ],
    mine: [
      { type: 'pic', pic: 'guitar', opts: ['guitar', 'drum', 'trophy'] },
      { type: 'gap', t: 'I\'d like ___ in the band.', pic: 'guitar', opts: ['to play', 'playing', 'play'] },
      { type: 'gap', t: 'You ___ practise more.', pic: 'drum', opts: ['should', 'should to', 'shoulds'] },
      { type: 'listen', say: 'trophy', opts: ['trophy', 'ticket', 'clock'] },
      { type: 'gap', t: 'She plays the guitar very ___.', pic: 'guitar', opts: ['well', 'good', 'nice'] },
      { type: 'order', words: ['Our', 'band', 'won', 'the', 'first', 'prize.'] }
    ]
  },
  {
    id: 'island', name: 'Treasure Island', level: 'PET', ru: 'Остров сокровищ',
    sky: [0x7fd0ff, 0xfff4d6], ground: 0xf3d98b, ground2: 0xe8c96f, props: ['ship', 'island', 'tree'], road: 0xc98f5a,
    words: [['ship', 'ship'], ['island', 'island'], ['compass', 'compass'], ['chest', 'chest'], ['key', 'key']],
    story: [
      { who: 'narr', t: 'An old map was found in Mia\'s grandfather\'s attic.', show: ['map'] },
      { who: 'mia', t: 'It shows an island that was visited by pirates two hundred years ago!', show: ['island'] },
      { who: 'narr', t: 'They sailed for three days. By the time they arrived, the storm had passed.', show: ['ship'] },
      { who: 'bolt', t: 'If I had a better compass, I would find the treasure in seconds.', show: ['compass'] },
      { who: 'mia', t: 'Grandad told me that the chest was hidden under the tallest tree.', show: ['chest'] },
      { who: 'bolt', t: 'What did Grandad say?', choice: { q: 'Choose the correct reported sentence.', opts: ['He said that the chest was hidden under a tree.', 'He said that the chest is hide under a tree.'], a: 0 } },
      { who: 'mia', t: 'Let\'s go before it gets dark!' }
    ],
    kart: 'phrase',
    kartQ: [
      { t: 'What would you do if you found treasure?', a: 'I would share it with my friends.', o: ['I would share it with my friends.', 'I will shared it with my friends.', 'I would to share it with friends.'] },
      { t: 'When was the map found?', a: 'It was found last week.', o: ['It was found last week.', 'It found last week.', 'It was find last week.'] },
      { t: 'Had the storm stopped when you arrived?', a: 'Yes, it had already stopped.', o: ['Yes, it had already stopped.', 'Yes, it has already stop.', 'Yes, it already stopping.'] },
      { t: 'What did the captain say?', a: 'He said we were nearly there.', o: ['He said we were nearly there.', 'He said we are nearly there yesterday.', 'He told that we nearly there.'] },
      { t: 'Who was the island discovered by?', a: 'It was discovered by pirates.', o: ['It was discovered by pirates.', 'It discovered by pirates.', 'It was discover from pirates.'] },
      { t: 'Do you think we\'ll find the chest?', a: 'I\'m sure we will.', o: ['I\'m sure we will.', 'I\'m sure we will find.', 'I\'m sure we are find.'] },
      { t: 'Why didn\'t you bring a torch?', a: 'I forgot to pack it.', o: ['I forgot to pack it.', 'I forgot packing it.', 'I forget to packed it.'] },
      { t: 'What were you doing when the storm started?', a: 'We were sailing past the rocks.', o: ['We were sailing past the rocks.', 'We sailed past the rocks when.', 'We was sailing past rocks.'] }
    ],
    mine: [
      { type: 'pic', pic: 'compass', opts: ['compass', 'chest', 'ship'] },
      { type: 'gap', t: 'If I ___ a boat, I would sail around the world.', pic: 'ship', opts: ['had', 'have', 'would have'] },
      { type: 'gap', t: 'The treasure ___ hidden a long time ago.', pic: 'chest', opts: ['was', 'has', 'did'] },
      { type: 'gap', t: 'When we arrived, the pirates ___ already left.', pic: 'island', opts: ['had', 'have', 'were'] },
      { type: 'listen', say: 'island', opts: ['island', 'compass', 'ship'] },
      { type: 'order', words: ['She', 'said', 'that', 'she', 'was', 'tired.'] }
    ]
  },
  {
    id: 'lab', name: 'Robot Lab', level: 'PET', ru: 'Лаборатория роботов',
    sky: [0x1f3b5c, 0x4fa3c7], ground: 0xcfd8e3, ground2: 0xbac6d4, props: ['laptop', 'bulb', 'house'], road: 0x6c7a8c,
    words: [['laptop', 'laptop'], ['bulb', 'bulb'], ['phone', 'phone'], ['book', 'book'], ['robot', 'robot']],
    story: [
      { who: 'narr', t: 'Bolt was built in a lab that is run by Professor Lee.', show: ['robot'] },
      { who: 'bolt', t: 'I used to live here before I met Mia. Everything is controlled by computers.', show: ['laptop'] },
      { who: 'mia', t: 'The professor, who invents amazing machines, has sent us a message.', show: ['phone'] },
      { who: 'narr', t: 'Her newest robot has escaped, and the lab must be locked before midnight.' },
      { who: 'bolt', t: 'Unless we solve the puzzles, the doors won\'t open.', show: ['bulb'] },
      { who: 'mia', t: 'Which sentence is right?', choice: { q: 'Choose the correct sentence.', opts: ['Bolt used to live in the lab.', 'Bolt use to living in the lab.'], a: 0 } },
      { who: 'bolt', t: 'Systems ready. Let\'s go, Mia!' }
    ],
    kart: 'phrase',
    kartQ: [
      { t: 'Where did Bolt use to live?', a: 'He used to live in the lab.', o: ['He used to live in the lab.', 'He use to living in the lab.', 'He was used live in the lab.'] },
      { t: 'Who is Professor Lee?', a: 'She\'s the scientist who built Bolt.', o: ['She\'s the scientist who built Bolt.', 'She\'s the scientist which built Bolt.', 'She\'s scientist who she built Bolt.'] },
      { t: 'How are the doors controlled?', a: 'They are controlled by a computer.', o: ['They are controlled by a computer.', 'They control by a computer.', 'They are control from a computer.'] },
      { t: 'What did the professor say in her message?', a: 'She said the robot had escaped.', o: ['She said the robot had escaped.', 'She said the robot escapes tomorrow.', 'She told the robot has escape.'] },
      { t: 'What will happen if we don\'t hurry?', a: 'The lab will be locked.', o: ['The lab will be locked.', 'The lab will lock us yesterday.', 'The lab would locked.'] },
      { t: 'Have you finished the puzzle yet?', a: 'Not yet, but I\'m nearly done.', o: ['Not yet, but I\'m nearly done.', 'Not already, I nearly do.', 'Yet not, I am nearly doing.'] },
      { t: 'Would you like to work in a lab?', a: 'Yes, I\'d enjoy inventing things.', o: ['Yes, I\'d enjoy inventing things.', 'Yes, I\'d enjoy to invent things.', 'Yes, I enjoy invent things.'] },
      { t: 'Why is the light flashing?', a: 'It means the robot is nearby.', o: ['It means the robot is nearby.', 'It mean the robot nearby.', 'It is meaning robot is near.'] }
    ],
    mine: [
      { type: 'pic', pic: 'laptop', opts: ['laptop', 'phone', 'bulb'] },
      { type: 'gap', t: 'I ___ to play outside every day when I was small.', pic: 'book', opts: ['used', 'use', 'was used'] },
      { type: 'gap', t: 'The robot ___ by Professor Lee in 2020.', pic: 'robot', opts: ['was built', 'built', 'is building'] },
      { type: 'gap', t: 'This is the lab ___ Bolt was made.', pic: 'laptop', opts: ['where', 'who', 'which'] },
      { type: 'listen', say: 'laptop', opts: ['laptop', 'book', 'phone'] },
      { type: 'order', words: ['Unless', 'we', 'hurry,', 'we', 'will', 'be', 'late.'] }
    ]
  }
];
