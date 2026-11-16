/* IF Mind Lab: content for the lower levels — Pre A1 (young learners, Starters), A1 (Beginner–Elementary) and A2 (Pre-intermediate).
   Same shapes as data.js. Merged into ML_DATA. */
(function () {
  var D = window.ML_DATA; if (!D) return;
  var L = {
    focus: {
      PA1: [
        { r: 'Animals', y: ['cat', 'dog', 'cow', 'duck', 'fish', 'frog', 'horse', 'lion', 'bird', 'monkey'], n: ['red', 'bed', 'apple', 'ball', 'car', 'sun', 'shoe', 'book', 'milk', 'door'] },
        { r: 'Colours', y: ['red', 'blue', 'green', 'pink', 'black', 'white', 'yellow', 'brown', 'grey', 'orange'], n: ['cat', 'run', 'big', 'pen', 'tree', 'cake', 'hat', 'mum', 'one', 'sing'] },
        { r: 'Food', y: ['apple', 'cake', 'egg', 'milk', 'rice', 'bread', 'banana', 'chips', 'juice', 'pear'], n: ['chair', 'kite', 'nose', 'jump', 'blue', 'train', 'sock', 'tiger', 'ten', 'happy'] }
      ],
      A1: [
        { r: 'Days and months', y: ['Monday', 'Friday', 'Sunday', 'May', 'June', 'March', 'Tuesday', 'August', 'Saturday', 'April'], n: ['morning', 'kitchen', 'teacher', 'orange', 'quickly', 'family', 'happy', 'window', 'eleven', 'shop'] },
        { r: 'Jobs', y: ['doctor', 'teacher', 'driver', 'nurse', 'waiter', 'cook', 'farmer', 'pilot', 'singer', 'police officer'], n: ['hospital', 'bus', 'salad', 'tired', 'garden', 'Monday', 'sister', 'cheap', 'ticket', 'listen'] },
        { r: 'Family', y: ['mother', 'father', 'brother', 'sister', 'aunt', 'uncle', 'cousin', 'grandson', 'wife', 'husband'], n: ['friend', 'neighbour', 'teacher', 'dog', 'house', 'car', 'party', 'boss', 'baby food', 'garden'] }
      ],
      A2: [
        { r: 'Past simple verbs', y: ['went', 'saw', 'ate', 'bought', 'came', 'took', 'made', 'had', 'got', 'gave'], n: ['go', 'see', 'eat', 'buy', 'come', 'take', 'make', 'have', 'get', 'give'] },
        { r: 'Places in a town', y: ['bank', 'museum', 'library', 'chemist', 'station', 'post office', 'market', 'hotel', 'park', 'cinema'], n: ['kitchen', 'bedroom', 'teacher', 'Tuesday', 'quiet', 'carry', 'jacket', 'cousin', 'often', 'cheese'] },
        { r: 'Adjectives for people', y: ['friendly', 'lazy', 'kind', 'shy', 'clever', 'funny', 'rude', 'quiet', 'generous', 'polite'], n: ['slowly', 'yesterday', 'bridge', 'spend', 'kitchen', 'ticket', 'under', 'always', 'climb', 'weather'] }
      ]
    },
    read: {
      PA1: [
        { t: 'Tom has a dog. The dog is brown. It likes balls.', q: 'What colour is the dog?', o: ['black', 'brown', 'white'], a: 1 },
        { t: 'Anna is in the garden. She is playing with her cat. The sun is hot.', q: 'Where is Anna?', o: ['in the garden', 'at school', 'in the kitchen'], a: 0 },
        { t: 'I have got two apples and one banana. I love fruit!', q: 'How many apples?', o: ['one', 'two', 'three'], a: 1 },
        { t: 'Ben can swim but he can\'t ride a bike. He wants to learn.', q: 'What can\'t Ben do?', o: ['swim', 'ride a bike', 'read'], a: 1 }
      ],
      A1: [
        { t: 'My name is Dana. I am a student. I live in Kostanay with my parents and my brother. I go to school by bus.', q: 'How does Dana go to school?', o: ['by bus', 'by car', 'on foot'], a: 0 },
        { t: 'Mark gets up at seven o\'clock. He has tea and toast for breakfast. He starts work at nine.', q: 'What does Mark have for breakfast?', o: ['coffee and eggs', 'tea and toast', 'juice and cake'], a: 1 },
        { t: 'The shop opens at ten and closes at six. It is closed on Sunday.', q: 'When is the shop closed?', o: ['on Saturday', 'on Monday', 'on Sunday'], a: 2 },
        { t: 'Aliya likes music and dancing. She doesn\'t like sport. Her favourite day is Friday.', q: 'What doesn\'t Aliya like?', o: ['music', 'sport', 'dancing'], a: 1 }
      ],
      A2: [
        { t: 'Last summer we went to the sea. The hotel was near the beach, but the weather was bad for three days, so we visited museums instead.', q: 'Why did they visit museums?', o: ['the hotel was far', 'the weather was bad', 'the beach was closed'], a: 1 },
        { t: 'Sam is saving money for a new phone. He works in a café on Saturdays and he doesn\'t buy snacks any more.', q: 'How is Sam saving money?', o: ['he sells his phone', 'he works and buys fewer snacks', 'his parents help him'], a: 1 },
        { t: 'The train to Astana was late because of snow. Most passengers waited in the station café, where the tea was free.', q: 'Why was the train late?', o: ['because of snow', 'because of the café', 'because of a problem with tickets'], a: 0 },
        { t: 'Kate is going to start a new job next month. She is a bit nervous, but she is excited because the office is close to her flat.', q: 'Why is Kate excited?', o: ['the job pays well', 'the office is near her home', 'she starts tomorrow'], a: 1 }
      ]
    },
    echo: {
      PA1: [{ s: 'I like my red ball.', x: ['blue', 'likes'] }, { s: 'The cat is on the bed.', x: ['in', 'dog'] }, { s: 'She has got a big dog.', x: ['small', 'have'] }, { s: 'Can you see the bird?', x: ['do', 'fish'] }, { s: 'We play in the park.', x: ['plays', 'school'] }, { s: 'My mum is happy.', x: ['sad', 'are'] }],
      A1: [{ s: 'I live in a small flat.', x: ['lives', 'big'] }, { s: 'What time do you get up?', x: ['does', 'when'] }, { s: 'My brother doesn\'t like coffee.', x: ['don\'t', 'tea'] }, { s: 'There are two chairs in the kitchen.', x: ['is', 'three'] }, { s: 'She can speak English and Russian.', x: ['cans', 'speaks'] }, { s: 'We are going to the cinema tonight.', x: ['go', 'theatre'] }],
      A2: [{ s: 'I went to the shops yesterday afternoon.', x: ['go', 'morning'] }, { s: 'Have you ever been to London?', x: ['did', 'went'] }, { s: 'It was raining when we left the house.', x: ['rained', 'arrived'] }, { s: 'She is taller than her sister.', x: ['more', 'tall'] }, { s: 'You should drink more water.', x: ['must', 'less'] }, { s: 'We are going to visit our grandparents.', x: ['will', 'visiting'] }]
    },
    spell: {
      PA1: [['apple', 'a red or green fruit'], ['house', 'you live in it'], ['school', 'you learn there'], ['yellow', 'the colour of a banana'], ['flower', 'it grows in the garden and smells nice'], ['teacher', 'she helps you learn'], ['window', 'you look out of it'], ['sister', 'a girl in your family'], ['orange', 'a fruit and a colour'], ['chicken', 'a farm bird'], ['monkey', 'it climbs trees and eats bananas'], ['purple', 'a colour: red and blue together']],
      A1: [['Wednesday', 'the day after Tuesday'], ['tomorrow', 'the day after today'], ['breakfast', 'the first meal of the day'], ['kitchen', 'the room where you cook'], ['beautiful', 'very pretty'], ['February', 'the second month'], ['friend', 'a person you like and know well'], ['restaurant', 'a place where you pay to eat'], ['daughter', 'a girl child'], ['favourite', 'the one you like best'], ['bathroom', 'the room with a shower'], ['business', 'buying and selling; a company']],
      A2: [['interesting', 'not boring'], ['different', 'not the same'], ['comfortable', 'nice to sit in or wear'], ['neighbour', 'a person who lives next to you'], ['expensive', 'it costs a lot of money'], ['journey', 'travelling from one place to another'], ['weather', 'sun, rain, wind or snow'], ['library', 'a place where you borrow books'], ['vegetable', 'a carrot or a potato'], ['believe', 'to think something is true'], ['photograph', 'a picture taken with a camera'], ['sometimes', 'not always, not never']]
    },
    precise: {
      PA1: [{ s: 'The elephant is [very big].', o: ['huge', 'tiny', 'fast'], a: 0 }, { s: 'The mouse is [very small].', o: ['tiny', 'tall', 'long'], a: 0 }, { s: 'I am [very happy] today!', o: ['excited', 'cold', 'hungry'], a: 0 }, { s: 'The ice cream is [very cold].', o: ['freezing', 'hot', 'sweet'], a: 0 }, { s: 'The cake is [very nice].', o: ['yummy', 'dirty', 'old'], a: 0 }, { s: 'The dog is [very fast].', o: ['quick', 'slow', 'quiet'], a: 0 }, { s: 'The baby is [not happy].', o: ['sad', 'big', 'funny'], a: 0 }, { s: 'The room is [not clean].', o: ['dirty', 'new', 'tall'], a: 0 }],
      A1: [{ s: 'The weather is [very hot].', o: ['boiling', 'nice', 'windy'], a: 0 }, { s: 'I am [very hungry].', o: ['starving', 'tired', 'full'], a: 0 }, { s: 'The test was [very easy].', o: ['simple', 'long', 'boring'], a: 0 }, { s: 'Her flat is [very big].', o: ['enormous', 'cheap', 'old'], a: 0 }, { s: 'The film was [very good].', o: ['great', 'okay', 'short'], a: 0 }, { s: 'My bag is [not light].', o: ['heavy', 'small', 'new'], a: 0 }, { s: 'The street is [not noisy].', o: ['quiet', 'long', 'wide'], a: 0 }, { s: 'He is [very tired].', o: ['exhausted', 'bored', 'sleepy'], a: 0 }],
      A2: [{ s: 'The holiday was [very good].', o: ['fantastic', 'fine', 'long'], a: 0 }, { s: 'The hotel was [very bad].', o: ['terrible', 'cheap', 'quiet'], a: 0 }, { s: 'I was [very surprised].', o: ['amazed', 'angry', 'pleased'], a: 0 }, { s: 'The room was [very dirty].', o: ['filthy', 'messy', 'old'], a: 0 }, { s: 'She was [very afraid].', o: ['terrified', 'worried', 'shy'], a: 0 }, { s: 'The soup is [very hot].', o: ['boiling', 'warm', 'spicy'], a: 0 }, { s: 'He is [very clever].', o: ['brilliant', 'kind', 'busy'], a: 0 }, { s: 'The town is [very small].', o: ['tiny', 'quiet', 'old'], a: 0 }]
    },
    fault: {
      PA1: [{ s: 'I has a cat.', b: 1, f: 'have' }, { s: 'She is my sister.', b: -1, f: '' }, { s: 'The dogs is big.', b: 2, f: 'are' }, { s: 'I can swim.', b: -1, f: '' }, { s: 'He like apples.', b: 1, f: 'likes' }, { s: 'They is happy.', b: 1, f: 'are' }, { s: 'This is a apple.', b: 2, f: 'an' }, { s: 'We are in the park.', b: -1, f: '' }],
      A1: [{ s: 'He go to work by bus.', b: 1, f: 'goes' }, { s: 'I am from Kazakhstan.', b: -1, f: '' }, { s: 'She don\'t like tea.', b: 1, f: 'doesn\'t' }, { s: 'There is two books on the table.', b: 1, f: 'are' }, { s: 'What time you get up?', b: 2, f: 'do you get up' }, { s: 'My father is a doctor.', b: -1, f: '' }, { s: 'I usually am late.', b: 2, f: 'I am usually late' }, { s: 'Can you speaks English?', b: 2, f: 'speak' }],
      A2: [{ s: 'I go to the cinema yesterday.', b: 1, f: 'went' }, { s: 'She is more tall than me.', b: 2, f: 'taller' }, { s: 'We have lived here since three years.', b: 4, f: 'for' }, { s: 'Did you see the match last night?', b: -1, f: '' }, { s: 'He didn\'t went to school.', b: 2, f: 'go' }, { s: 'I am going to visit my aunt.', b: -1, f: '' }, { s: 'You should to see a doctor.', b: 2, f: 'should see' }, { s: 'There isn\'t some milk in the fridge.', b: 2, f: 'any' }]
    },
    speak: {
      PA1: ['I like ice cream.', 'This is my dog.', 'The ball is red.', 'I can jump.', 'Look at the bird!', 'My name is Sam.'],
      A1: ['I live in a flat in the city.', 'My sister is a teacher.', 'I get up at seven o\'clock.', 'I don\'t like coffee.', 'Can I have a tea, please?', 'We go to the park on Sundays.'],
      A2: ['Last weekend I visited my grandparents.', 'I have never been to London.', 'It\'s warmer today than yesterday.', 'I\'m going to start a new course next month.', 'You should take an umbrella.', 'What did you do last night?']
    }
  };
  Object.keys(L).forEach(function (k) { D[k] = D[k] || {}; Object.keys(L[k]).forEach(function (lv) { D[k][lv] = L[k][lv]; }); });
})();
