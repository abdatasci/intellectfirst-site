/* Young Learners — Starters (Pre A1): picture words for children 6–9. Cartoon pictures drawn for IF English. */
IFX.course({
  id: 'yl-starters', track: 'kids', level: 'Starters', next: 'Movers', icon: '🧸', kids: true,
  title: 'Starters: Picture Words', sub: 'Look, listen and say — for children 6–9',
  blurb: 'Animals, food and toys with pictures, sounds and games. Parents can sit with their child and follow every step.',
  units: [
  { id: 'u1', title: 'Animals', topic: 'Animals', lessons: [
    { id: 'v', type: 'vocab', title: 'Animal friends', words: [
      { w: 'cat', pic: 'cat', p: 'animal', d: 'a small animal that says “miaow”', e: 'This is a cat.', ru: 'кошка' },
      { w: 'dog', pic: 'dog', p: 'animal', d: 'an animal that says “woof”', e: 'My dog is brown.', ru: 'собака' },
      { w: 'fish', pic: 'fish', p: 'animal', d: 'an animal that swims in water', e: 'The fish is blue.', ru: 'рыба' },
      { w: 'bird', pic: 'bird', p: 'animal', d: 'an animal that can fly', e: 'The bird is yellow.', ru: 'птица' },
      { w: 'snake', pic: 'snake', p: 'animal', d: 'a long animal with no legs', e: 'The snake is green.', ru: 'змея' },
      { w: 'spider', pic: 'spider', p: 'animal', d: 'a small animal with eight legs', e: 'A spider has eight legs.', ru: 'паук' }
    ]},
    { id: 'l', type: 'look', title: 'Look and choose', ex: [
      { t: 'picmc', q: 'Where is the cat?', say: 'cat', o: ['dog', 'cat', 'fish'], a: 1 },
      { t: 'mc', pic: 'bird', q: 'What is it?', o: ['a fish', 'a bird', 'a snake'], a: 1 },
      { t: 'picmc', q: 'Listen and choose.', listen: 'spider', o: ['spider', 'snake', 'cat'], a: 0 },
      { t: 'mc', pic: 'fish', q: 'What colour is the fish?', o: ['blue', 'red', 'green'], a: 0 },
      { t: 'mc', scene: { pic: 'dog', n: 3 }, q: 'How many dogs?', o: ['2', '3', '4'], a: 1 },
      { t: 'mc', pic: 'snake', q: 'Is it a snake?', o: ['Yes, it is.', 'No, it isn\'t.'], a: 0 }
    ]},
    { id: 'c', type: 'check', title: 'Animal check', ex: [
      { t: 'picmc', q: 'Listen and choose.', listen: 'dog', o: ['bird', 'dog', 'spider'], a: 1 },
      { t: 'mc', pic: 'cat', q: 'This is a …', o: ['cat', 'dog', 'bird'], a: 0 },
      { t: 'mc', scene: { pic: 'bird', n: 5 }, q: 'How many birds?', o: ['4', '5', '6'], a: 1 },
      { t: 'picmc', q: 'Which animal has eight legs?', o: ['fish', 'spider', 'snake'], a: 1 },
      { t: 'order', a: 'The fish is blue.' }
    ]}
  ]},
  { id: 'u2', title: 'Food', topic: 'Food', lessons: [
    { id: 'v', type: 'vocab', title: 'Yummy food', words: [
      { w: 'apple', pic: 'apple', p: 'food', d: 'a round red or green fruit', e: 'I like apples.', ru: 'яблоко' },
      { w: 'banana', pic: 'banana', p: 'food', d: 'a long yellow fruit', e: 'The banana is yellow.', ru: 'банан' },
      { w: 'cake', pic: 'cake', p: 'food', d: 'sweet food for a birthday', e: 'Happy birthday! Here\'s your cake.', ru: 'торт' },
      { w: 'ice cream', pic: 'icecream', p: 'food', d: 'very cold sweet food', e: 'I love ice cream!', ru: 'мороженое' },
      { w: 'egg', pic: 'egg', p: 'food', d: 'food that comes from a chicken', e: 'I have an egg for breakfast.', ru: 'яйцо' },
      { w: 'carrot', pic: 'carrot', p: 'food', d: 'a long orange vegetable', e: 'Rabbits like carrots.', ru: 'морковь' }
    ]},
    { id: 'l', type: 'look', title: 'I like…', ex: [
      { t: 'picmc', q: 'Find the banana.', say: 'banana', o: ['apple', 'carrot', 'banana'], a: 2 },
      { t: 'mc', pic: 'cake', q: 'What is it?', o: ['an egg', 'a cake', 'an apple'], a: 1 },
      { t: 'mc', pic: 'apple', q: 'Choose: ___ apple', o: ['a', 'an'], a: 1, why: 'an + a, e, i, o, u: an apple, an egg, an ice cream.' },
      { t: 'mc', pic: 'carrot', q: 'What colour is the carrot?', o: ['orange', 'blue', 'pink'], a: 0 },
      { t: 'picmc', q: 'Listen and choose.', listen: 'ice cream', o: ['cake', 'icecream', 'egg'], a: 1 },
      { t: 'order', a: 'I like ice cream.' }
    ]},
    { id: 'c', type: 'check', title: 'Food check', ex: [
      { t: 'mc', scene: { pic: 'apple', n: 4 }, q: 'How many apples?', o: ['3', '4', '5'], a: 1 },
      { t: 'mc', pic: 'egg', q: 'It\'s ___ egg.', o: ['a', 'an'], a: 1 },
      { t: 'picmc', q: 'Which one is a vegetable?', o: ['cake', 'carrot', 'icecream'], a: 1 },
      { t: 'picmc', q: 'Listen and choose.', listen: 'apple', o: ['banana', 'apple', 'egg'], a: 1 },
      { t: 'order', a: 'Do you like bananas?' }
    ]}
  ]},
  { id: 'u3', title: 'Toys', topic: 'Toys', lessons: [
    { id: 'v', type: 'vocab', title: 'My toys', words: [
      { w: 'ball', pic: 'ball', p: 'toy', d: 'a round toy you kick or throw', e: 'Let\'s play with the ball!', ru: 'мяч' },
      { w: 'kite', pic: 'kite', p: 'toy', d: 'a toy that flies in the wind', e: 'My kite is in the sky.', ru: 'воздушный змей' },
      { w: 'car', pic: 'car', p: 'toy', d: 'a toy with four wheels', e: 'I have a red car.', ru: 'машина' },
      { w: 'robot', pic: 'robot', p: 'toy', d: 'a toy machine that looks like a person', e: 'My robot can talk.', ru: 'робот' },
      { w: 'balloon', pic: 'balloon', p: 'toy', d: 'a toy full of air', e: 'The balloon is red.', ru: 'шарик' },
      { w: 'teddy', pic: 'teddy', p: 'toy', d: 'a soft toy bear', e: 'My teddy is brown.', ru: 'плюшевый мишка' }
    ]},
    { id: 'l', type: 'look', title: 'Where is it?', ex: [
      { t: 'picmc', q: 'Find the kite.', say: 'kite', o: ['car', 'kite', 'ball'], a: 1 },
      { t: 'mc', pic: 'robot', q: 'What is it?', o: ['a robot', 'a teddy', 'a car'], a: 0 },
      { t: 'mc', scene: { pic: 'balloon', n: 6 }, q: 'How many balloons?', o: ['5', '6', '7'], a: 1 },
      { t: 'picmc', q: 'Listen and choose.', listen: 'teddy', o: ['teddy', 'robot', 'balloon'], a: 0 },
      { t: 'mc', pic: 'car', q: 'The car is …', o: ['red', 'yellow', 'green'], a: 0 },
      { t: 'order', a: 'This is my ball.' }
    ]},
    { id: 'c', type: 'check', title: 'Toy check', ex: [
      { t: 'picmc', q: 'Which toy can fly?', o: ['car', 'kite', 'teddy'], a: 1 },
      { t: 'mc', pic: 'ball', q: 'It\'s a …', o: ['ball', 'balloon', 'kite'], a: 0 },
      { t: 'mc', scene: { pic: 'car', n: 2 }, q: 'How many cars?', o: ['1', '2', '3'], a: 1 },
      { t: 'picmc', q: 'Listen and choose.', listen: 'balloon', o: ['ball', 'balloon', 'robot'], a: 1 },
      { t: 'order', a: 'I have a brown teddy.' }
    ]}
  ]}
]});
