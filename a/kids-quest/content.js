/* IF Kids Quest — story lines, words and sentences for each land, graded by Cambridge Young Learners level.
   Starters: single words with pictures and very short sentences.
   Movers: words in sentences, "can / there are / put on".
   Flyers: whole phrases, past simple and "going to". */
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
];
