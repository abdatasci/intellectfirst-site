/* IF Young Learners Test Centres: original practice material written by IF Academy in the style of the
   Pre A1 Starters, A1 Movers and A2 Flyers task types. Pictures are emoji; listening is read aloud by the device.
   Each pool is split across Test 1, 2 and 3 (5 items per task per test). */
window.YL = (function () {
  /* word → emoji, shared by the levels and the games */
  var P = {
    cat: '🐱', dog: '🐶', fish: '🐟', bird: '🐦', horse: '🐴', cow: '🐮', duck: '🦆', frog: '🐸', monkey: '🐒', elephant: '🐘', giraffe: '🦒', lion: '🦁', tiger: '🐯', snake: '🐍', mouse: '🐭', sheep: '🐑', goat: '🐐', crocodile: '🐊', spider: '🕷️', bear: '🐻', rabbit: '🐰', chicken: '🐔', whale: '🐋', dolphin: '🐬', bee: '🐝', butterfly: '🦋', penguin: '🐧', owl: '🦉', kangaroo: '🦘', bat: '🦇', parrot: '🦜', camel: '🐫', panda: '🐼', shark: '🦈', octopus: '🐙', snail: '🐌',
    apple: '🍎', banana: '🍌', orange: '🍊', grapes: '🍇', lemon: '🍋', pear: '🍐', watermelon: '🍉', cake: '🍰', bread: '🍞', egg: '🥚', milk: '🥛', juice: '🧃', pizza: '🍕', burger: '🍔', chips: '🍟', ice: '🧊', 'ice cream': '🍦', chocolate: '🍫', carrot: '🥕', tomato: '🍅', sandwich: '🥪', cheese: '🧀', rice: '🍚', soup: '🍲', candy: '🍬', pineapple: '🍍', coconut: '🥥', potato: '🥔', onion: '🧅', sausage: '🌭',
    ball: '⚽', kite: '🪁', doll: '🪆', robot: '🤖', car: '🚗', bus: '🚌', bike: '🚲', train: '🚆', plane: '✈️', boat: '⛵', lorry: '🚚', helicopter: '🚁', motorbike: '🏍️', rocket: '🚀', ship: '🚢', taxi: '🚕', tractor: '🚜',
    book: '📖', pen: '🖊️', pencil: '✏️', bag: '🎒', computer: '💻', clock: '🕐', phone: '📱', camera: '📷', guitar: '🎸', piano: '🎹', drum: '🥁', paint: '🎨', scissors: '✂️', key: '🔑', lamp: '💡', ruler: '📏', globe: '🌍', letter: '✉️', umbrella: '☂️', present: '🎁', balloon: '🎈', map: '🗺️', ticket: '🎟️', tent: '⛺', medicine: '💊', torch: '🔦',
    hat: '🎩', shoe: '👟', shoes: '👟', dress: '👗', shirt: '👕', 'T-shirt': '👕', jeans: '👖', sock: '🧦', socks: '🧦', glasses: '👓', jacket: '🧥', scarf: '🧣', gloves: '🧤', boots: '👢', crown: '👑', watch: '⌚', ring: '💍',
    sun: '☀️', moon: '🌙', star: '⭐', tree: '🌳', flower: '🌸', rain: '🌧️', snow: '❄️', cloud: '☁️', rainbow: '🌈', mountain: '⛰️', beach: '🏖️', island: '🏝️', river: '🏞️', fire: '🔥', leaf: '🍃', wind: '🌬️', storm: '⛈️', desert: '🏜️', forest: '🌲', planet: '🪐', volcano: '🌋',
    house: '🏠', school: '🏫', hospital: '🏥', shop: '🏪', park: '🌳', bed: '🛏️', chair: '🪑', door: '🚪', window: '🪟', bath: '🛁', sofa: '🛋️', castle: '🏰', farm: '🚜', zoo: '🦓', library: '📚', cinema: '🎬', bank: '🏦', bridge: '🌉', station: '🚉', airport: '🛫', museum: '🏛️', circus: '🎪', hotel: '🏨',
    eye: '👁️', ear: '👂', nose: '👃', mouth: '👄', hand: '✋', foot: '🦶', arm: '💪', teeth: '🦷', baby: '👶', boy: '👦', girl: '👧', man: '👨', woman: '👩', grandmother: '👵', grandfather: '👴', doctor: '🧑‍⚕️', nurse: '🧑‍⚕️', farmer: '🧑‍🌾', cook: '🧑‍🍳', pirate: '🏴‍☠️', astronaut: '🧑‍🚀', police: '👮', firefighter: '🧑‍🚒', teacher: '🧑‍🏫', dentist: '🦷', pilot: '🧑‍✈️', clown: '🤡',
    football: '⚽', tennis: '🎾', basketball: '🏀', swimming: '🏊', skating: '⛸️', fishing: '🎣', dancing: '💃', singing: '🎤', reading: '📖', drawing: '🖍️', running: '🏃', climbing: '🧗', sleeping: '😴', cooking: '🍳', skiing: '⛷️', sailing: '⛵', 'riding a bike': '🚴', 'playing the guitar': '🎸', 'taking photos': '📷',
    happy: '😀', sad: '😢', angry: '😠', tired: '😴', hungry: '😋', thirsty: '🥤', hot: '🥵', cold: '🥶', ill: '🤒', scared: '😱', bored: '🥱', surprised: '😮',
    red: '🟥', blue: '🟦', green: '🟩', yellow: '🟨', orange_c: '🟧', purple: '🟪', brown: '🟫', black: '⬛', white: '⬜', pink: '🩷', grey: '🩶'
  };
  var pic = function (w) { return P[w] || '❓'; };

  /* ---------- Starters ---------- */
  var starters = {
    id: 'starters', name: 'Pre A1 Starters', short: 'Starters', ages: 'Ages 6–8', colour: '#2f9a68',
    words: ['cat', 'dog', 'fish', 'bird', 'horse', 'cow', 'duck', 'frog', 'monkey', 'elephant', 'giraffe', 'lion', 'tiger', 'snake', 'mouse', 'sheep', 'goat', 'crocodile', 'spider', 'bear',
      'apple', 'banana', 'orange', 'grapes', 'lemon', 'pear', 'cake', 'bread', 'egg', 'milk', 'juice', 'pizza', 'burger', 'chips', 'ice cream', 'chocolate', 'carrot', 'tomato', 'sandwich', 'rice',
      'ball', 'kite', 'doll', 'robot', 'car', 'bus', 'bike', 'train', 'plane', 'boat', 'lorry', 'book', 'pen', 'pencil', 'bag', 'computer', 'clock', 'phone', 'camera', 'guitar', 'piano',
      'hat', 'shoe', 'dress', 'shirt', 'jeans', 'sock', 'glasses', 'jacket', 'sun', 'tree', 'flower', 'house', 'school', 'bed', 'chair', 'door', 'window', 'eye', 'ear', 'nose', 'mouth', 'hand', 'foot', 'baby', 'boy', 'girl', 'man', 'woman'],
    tasks: [
      { id: 'L1', part: 'Listening', title: 'Listen and choose the picture', kind: 'listenPick', how: 'Press ▶ and listen. Choose the right picture.', items: [
        ['Point to the cat. The cat is sleeping.', 'cat', ['dog', 'mouse']], ['I want an apple, please.', 'apple', ['banana', 'pear']], ['Look at my new kite! It\'s red and yellow.', 'kite', ['ball', 'doll']],
        ['Lucy is eating a burger.', 'burger', ['pizza', 'cake']], ['Where\'s your bag? It\'s under the table.', 'bag', ['book', 'pen']], ['My brother has got a robot.', 'robot', ['car', 'train']],
        ['The giraffe is very tall.', 'giraffe', ['elephant', 'horse']], ['I like riding my bike in the park.', 'bike', ['bus', 'boat']], ['Grandpa is wearing a hat.', 'hat', ['shoe', 'jacket']],
        ['There\'s a frog in the water!', 'frog', ['fish', 'duck']], ['Can you see the plane in the sky?', 'plane', ['bird', 'kite']], ['Mum is reading a book.', 'book', ['phone', 'computer']],
        ['The baby is drinking milk.', 'milk', ['juice', 'egg']], ['Ben has got a new guitar.', 'guitar', ['piano', 'camera']], ['Look! A monkey in the tree.', 'monkey', ['spider', 'bird']]] },
      { id: 'L2', part: 'Listening', title: 'Listen and write a number', kind: 'listenNumber', how: 'Press ▶ and listen. Write the number (1–20).', items: [
        ['How many cats are there? There are three cats.', 3], ['How old is Anna? She\'s seven.', 7], ['How many apples are in the bag? Ten apples.', 10], ['How many birds can you see? I can see five birds.', 5],
        ['How many books has Tom got? He\'s got twelve books.', 12], ['How old are you, Sam? I\'m eight.', 8], ['How many pencils are on the desk? There are four.', 4], ['How many ducks are on the river? Nine ducks.', 9],
        ['How many children are in the garden? Six children.', 6], ['How many eggs do we need? We need two eggs.', 2], ['How many balloons has Mia got? Fifteen balloons!', 15], ['How old is your sister? She\'s eleven.', 11],
        ['How many chairs are in the room? There are twenty chairs.', 20], ['How many sweets are on the table? Fourteen.', 14], ['How many fish are in the tank? There are eight fish.', 8]] },
      { id: 'L3', part: 'Listening', title: 'Listen and choose the colour', kind: 'listenColour', how: 'Press ▶ and listen. What colour is it?', items: [
        ['Colour the ball. Make it blue.', 'ball', 'blue'], ['The car is red. Colour the car red.', 'car', 'red'], ['Can you see the fish? Colour it orange.', 'fish', 'orange_c'], ['The bird is yellow.', 'bird', 'yellow'],
        ['Make the hat green, please.', 'hat', 'green'], ['The dog is brown.', 'dog', 'brown'], ['Colour the flower pink.', 'flower', 'pink'], ['The kite is purple.', 'kite', 'purple'],
        ['The cat is black.', 'cat', 'black'], ['Colour the bag grey.', 'bag', 'grey'], ['The robot is blue.', 'robot', 'blue'], ['The duck is yellow.', 'duck', 'yellow'],
        ['Colour the shoe red.', 'shoe', 'red'], ['The tree is green.', 'tree', 'green'], ['The sheep is white.', 'sheep', 'white']] },
      { id: 'R1', part: 'Reading & Writing', title: 'Look and read. Yes or no?', kind: 'yesNo', how: 'Look at the picture. Is the sentence right? Choose yes or no.', items: [
        ['cat', 'This is a cat.', true], ['dog', 'This is a horse.', false], ['banana', 'This is a banana.', true], ['bus', 'This is a train.', false], ['flower', 'This is a flower.', true],
        ['elephant', 'This animal is very small.', false], ['ice cream', 'You can eat this.', true], ['bike', 'This is a car.', false], ['clock', 'This is a clock.', true], ['fish', 'This animal can fly.', false],
        ['sun', 'This is the moon.', false], ['guitar', 'You can play music with this.', true], ['bed', 'You sleep in this.', true], ['giraffe', 'This animal has got a long neck.', true], ['shoe', 'You wear this on your head.', false]] },
      { id: 'R2', part: 'Reading & Writing', title: 'Look and choose the word', kind: 'picWord', how: 'Look at the picture. Choose the right word.', items: [
        ['lion', ['tiger', 'bear']], ['orange', ['lemon', 'apple']], ['train', ['bus', 'plane']], ['pencil', ['pen', 'ruler']], ['jacket', ['shirt', 'dress']],
        ['crocodile', ['snake', 'frog']], ['sandwich', ['cake', 'bread']], ['window', ['door', 'chair']], ['camera', ['phone', 'computer']], ['grapes', ['pear', 'tomato']],
        ['spider', ['mouse', 'bird']], ['boat', ['lorry', 'car']], ['glasses', ['hat', 'sock']], ['carrot', ['chips', 'egg']], ['piano', ['guitar', 'clock']]] },
      { id: 'R3', part: 'Reading & Writing', title: 'Look and spell the word', kind: 'spell', how: 'Look at the picture and the letters. Write the word.', items: ['cat', 'dog', 'egg', 'bus', 'pen', 'fish', 'cake', 'kite', 'duck', 'frog', 'milk', 'book', 'bird', 'ball', 'lemon'] }
    ]
  };

  /* ---------- Movers ---------- */
  var movers = {
    id: 'movers', name: 'A1 Movers', short: 'Movers', ages: 'Ages 7–10', colour: '#3f7fd0',
    words: ['kangaroo', 'dolphin', 'whale', 'bat', 'parrot', 'panda', 'penguin', 'rabbit', 'chicken', 'bee', 'butterfly', 'snail', 'shark', 'octopus', 'camel',
      'cheese', 'soup', 'pineapple', 'watermelon', 'coconut', 'potato', 'sausage', 'bread', 'juice', 'candy', 'helicopter', 'motorbike', 'taxi', 'ship', 'tractor', 'rocket',
      'scarf', 'gloves', 'boots', 'umbrella', 'present', 'balloon', 'map', 'ticket', 'tent', 'lamp', 'torch', 'medicine',
      'moon', 'star', 'rain', 'snow', 'cloud', 'rainbow', 'mountain', 'beach', 'island', 'river', 'forest', 'hospital', 'library', 'cinema', 'bank', 'bridge', 'station', 'circus', 'zoo',
      'doctor', 'nurse', 'farmer', 'cook', 'pirate', 'police', 'teacher', 'dentist', 'clown', 'teeth', 'swimming', 'skating', 'fishing', 'dancing', 'singing', 'climbing', 'sleeping', 'cooking'],
    tasks: [
      { id: 'L1', part: 'Listening', title: 'Listen and choose', kind: 'listenPick', how: 'Press ▶ and listen to the conversation. Choose the right picture.', items: [
        ['What did Peter do at the weekend? — I went fishing with my dad. We caught three fish!', 'fishing', ['swimming', 'skating']], ['Which animal did you like at the zoo, Kim? — The kangaroos! They can jump so far.', 'kangaroo', ['panda', 'penguin']],
        ['What\'s the weather like today? — It\'s raining, so take your umbrella.', 'umbrella', ['scarf', 'gloves']], ['How did you get to the island? — We went by ship. It was slow but fun.', 'ship', ['helicopter', 'taxi']],
        ['What does your aunt do? — She\'s a dentist. She looks at people\'s teeth.', 'dentist', ['doctor', 'farmer']], ['What did you have for lunch? — Soup and bread. The soup was hot!', 'soup', ['sausage', 'cheese']],
        ['Where\'s Jack? — He\'s in the library. He\'s looking for a book about sharks.', 'library', ['cinema', 'bank']], ['What do you want for your birthday? — A torch! Then I can read in my tent.', 'torch', ['lamp', 'map']],
        ['What\'s Vicky doing? — She\'s climbing that big rock. Be careful, Vicky!', 'climbing', ['dancing', 'singing']], ['Which fruit is the biggest? — The watermelon. It\'s really heavy!', 'watermelon', ['pineapple', 'coconut']],
        ['Who helped you? — A police officer. She showed us the way to the station.', 'police', ['nurse', 'cook']], ['What can you see in the sky tonight? — Lots of stars, and the moon.', 'star', ['cloud', 'rainbow']],
        ['What did the pirate find? — A map! And on the map there was an island.', 'map', ['ticket', 'present']], ['Which animal sleeps in the day? — The bat. It flies at night.', 'bat', ['bee', 'parrot']],
        ['What\'s in the box? — A present for Grandma. It\'s a new scarf.', 'present', ['balloon', 'medicine']]] },
      { id: 'L2', part: 'Listening', title: 'Listen and write', kind: 'listenWrite', how: 'Press ▶ and listen. Write a name or a number.', items: [
        ['What\'s your name? — Daisy. D-A-I-S-Y.', 'Write the girl\'s name.', 'Daisy'], ['How old is your cousin? — He\'s thirteen.', 'How old is the cousin?', '13'], ['What\'s the name of the street? — Hill Street. H-I-L-L.', 'Write the street: ___ Street', 'Hill'],
        ['How many people are in your class? — Twenty-four.', 'How many people are in the class?', '24'], ['What\'s your dog called? — Rex. R-E-X.', 'Write the dog\'s name.', 'Rex'], ['What time does the film start? — At four o\'clock.', 'The film starts at ___ o\'clock.', '4'],
        ['What\'s your teacher\'s name? — Mr Brown. B-R-O-W-N.', 'Mr ___', 'Brown'], ['How many floors are in the hotel? — Eighteen.', 'How many floors?', '18'], ['Who is your best friend? — Lily. L-I-L-Y.', 'Write the friend\'s name.', 'Lily'],
        ['What number is your house? — It\'s number thirty.', 'House number:', '30'], ['What\'s the name of the shop? — Fox. F-O-X.', 'The ___ shop', 'Fox'], ['How many eggs are in the box? — Sixteen.', 'How many eggs?', '16'],
        ['What\'s the cat\'s name? — Tiger. T-I-G-E-R.', 'Write the cat\'s name.', 'Tiger'], ['How old is the castle? — It\'s nearly a hundred years old! No — ninety years old.', 'How old is the castle?', '90'], ['What\'s your surname? — Green. G-R-E-E-N.', 'Write the surname.', 'Green']] },
      { id: 'R1', part: 'Reading & Writing', title: 'Read and choose the word', kind: 'defPick', how: 'Read the sentence. Which word is it?', items: [
        ['This person works in a hospital and helps doctors.', 'nurse', ['farmer', 'clown']], ['You can see this in the sky after rain. It has many colours.', 'rainbow', ['cloud', 'moon']], ['This animal lives in the sea and it is very, very big.', 'whale', ['snail', 'parrot']],
        ['You wear these on your hands when it is cold.', 'gloves', ['boots', 'scarf']], ['People go here to watch films.', 'cinema', ['bank', 'library']], ['This is a big hill. Some people climb it.', 'mountain', ['island', 'river']],
        ['This person makes people laugh at the circus.', 'clown', ['pirate', 'dentist']], ['You need this to go on a train or to the cinema.', 'ticket', ['map', 'lamp']], ['This animal has eight legs and lives in the sea.', 'octopus', ['dolphin', 'shark']],
        ['You can sleep in this when you go camping.', 'tent', ['torch', 'balloon']], ['This insect makes honey.', 'bee', ['butterfly', 'bat']], ['This yellow fruit is sweet. It has a green top.', 'pineapple', ['potato', 'coconut']],
        ['This person grows food and has animals like cows and sheep.', 'farmer', ['cook', 'teacher']], ['You go over this to get to the other side of the river.', 'bridge', ['station', 'beach']], ['This animal lives in hot places and can walk a long way without water.', 'camel', ['penguin', 'panda']]] },
      { id: 'R2', part: 'Reading & Writing', title: 'Choose the best answer', kind: 'dialogue', how: 'Read what the first person says. Choose the best answer.', items: [
        ['What\'s the matter, Sam?', 'I\'ve got a headache.', ['I\'m a doctor.', 'It\'s Tuesday.']], ['Would you like some soup?', 'Yes, please. I\'m hungry.', ['Yes, I would like.', 'I\'m eight.']], ['Where did you go yesterday?', 'To the beach with my cousins.', ['I go to the beach.', 'Yes, I did.']],
        ['Can I borrow your pencil?', 'Of course. Here you are.', ['No, I\'m not.', 'It\'s my pencils.']], ['How often do you go swimming?', 'Twice a week.', ['At the pool.', 'With my sister.']], ['Whose umbrella is this?', 'It\'s Grandpa\'s.', ['It\'s raining.', 'Yes, it is.']],
        ['Shall we play football after school?', 'Good idea!', ['I play.', 'It was fun.']], ['What\'s the weather like?', 'It\'s cloudy and cold.', ['I like it.', 'It\'s Monday.']], ['Why are you tired?', 'Because I went to bed late.', ['Yes, very tired.', 'I\'m in bed.']],
        ['Did you like the film?', 'Yes, it was really funny.', ['Yes, I like.', 'It is a film.']], ['Which is your bike?', 'The blue one next to the tree.', ['I ride it.', 'It\'s fast.']], ['What do you want to be?', 'A pilot. I love planes.', ['I\'m a boy.', 'I want it.']],
        ['Can you help me, please?', 'Yes, what do you need?', ['Yes, I can help me.', 'No, thank you.']], ['Where\'s the station?', 'It\'s next to the bank.', ['By train.', 'It\'s big.']], ['Have you got any brothers?', 'Yes, I\'ve got one.', ['Yes, I have brother.', 'He\'s ten.']]] },
      { id: 'R3', part: 'Reading & Writing', title: 'Read the story. Choose a word', kind: 'gapPick', how: 'Read the sentence from the story. Choose the right word for the gap.', items: [
        ['Last Saturday, Anna and her family went to the ___. They saw lions and monkeys.', 'zoo', ['bank', 'library']], ['It was a sunny day, so Anna wore her ___ hat.', 'new', ['hungry', 'slowly']], ['The monkeys were very funny. They ___ from tree to tree.', 'jumped', ['jump', 'jumping']],
        ['At lunchtime they had a picnic ___ a big tree.', 'under', ['on', 'at']], ['Anna\'s little brother dropped his ice cream and ___.', 'cried', ['cry', 'crying']], ['Dad bought him ___ ice cream.', 'another', ['other', 'many']],
        ['In the afternoon, they ___ the penguins swimming.', 'watched', ['watch', 'looking']], ['The penguins were ___ than the ducks.', 'bigger', ['big', 'biggest']], ['Then it started to ___, so they ran to the car.', 'rain', ['raining', 'rains']],
        ['They got home at six o\'clock and they were very ___.', 'tired', ['tiring', 'sleep']], ['Anna drew a picture ___ the animals.', 'of', ['for', 'with']], ['She put it ___ the wall in her bedroom.', 'on', ['in', 'at']],
        ['"This was the ___ day of the holiday!" said Anna.', 'best', ['good', 'better']], ['The next day, Anna told her friends ___ the zoo.', 'about', ['for', 'at']], ['Now her friends ___ to go there too.', 'want', ['wants', 'wanting']]] },
      { id: 'R4', part: 'Reading & Writing', title: 'Look and write one word', kind: 'picType', how: 'Look at the picture. Write the word.', items: ['penguin', 'rabbit', 'chicken', 'cheese', 'boots', 'helicopter', 'island', 'teeth', 'snow', 'ticket', 'rocket', 'balloon', 'library', 'parrot', 'tractor'] }
    ]
  };

  /* ---------- Flyers ---------- */
  var flyers = {
    id: 'flyers', name: 'A2 Flyers', short: 'Flyers', ages: 'Ages 9–12', colour: '#c4513d',
    words: ['astronaut', 'pilot', 'firefighter', 'planet', 'volcano', 'desert', 'storm', 'wind', 'museum', 'airport', 'hotel', 'castle', 'globe', 'letter', 'ruler', 'scissors', 'key', 'ring', 'watch', 'crown',
      'skiing', 'sailing', 'riding a bike', 'playing the guitar', 'taking photos', 'onion', 'tomato', 'chocolate', 'medicine', 'camera', 'shark', 'dolphin', 'owl', 'kangaroo', 'butterfly', 'snail', 'octopus', 'whale', 'penguin', 'camel'],
    tasks: [
      { id: 'L1', part: 'Listening', title: 'Listen and choose', kind: 'listenPick', how: 'Press ▶ and listen to the conversation. Choose the right picture.', items: [
        ['What would you like to be when you grow up, Harry? — I\'d like to be an astronaut and travel to other planets.', 'astronaut', ['pilot', 'firefighter']], ['What did you lose on the way to school? — My key! I think it fell out of my pocket.', 'key', ['ring', 'watch']],
        ['Where did you spend the holiday? — In the desert. It was so hot, and we rode camels!', 'desert', ['mountain', 'forest']], ['What should I take to the museum? — Your camera. You can take photos inside.', 'camera', ['globe', 'scissors']],
        ['Which hobby has your brother started? — Sailing. He goes out on the lake every Sunday.', 'sailing', ['skiing', 'fishing']], ['What was the weather like on the trip? — Terrible! There was a big storm on the first night.', 'storm', ['snow', 'wind']],
        ['What did the king lose in the story? — His crown. In the end, a little owl found it.', 'crown', ['ring', 'key']], ['What did your grandmother send you? — A letter, and inside there were some photos of her garden.', 'letter', ['present', 'ticket']],
        ['Which animal did you learn about in science? — The octopus. It can change colour!', 'octopus', ['dolphin', 'shark']], ['Where are you meeting your uncle? — At the airport. His plane lands at three.', 'airport', ['station', 'hotel']],
        ['What did you see from the top of the mountain? — A volcano! But don\'t worry, it was asleep.', 'volcano', ['castle', 'bridge']], ['What do you need for the art lesson? — Scissors and some glue.', 'scissors', ['ruler', 'pencil']],
        ['What did Emma get for passing her exams? — A watch. It tells you the time and the weather!', 'watch', ['phone', 'computer']], ['Which is the slowest animal in the garden? — The snail, of course.', 'snail', ['butterfly', 'bee']],
        ['What is Oliver doing this weekend? — He\'s going skiing with his school.', 'skiing', ['skating', 'climbing']]] },
      { id: 'L2', part: 'Listening', title: 'Listen and write', kind: 'listenWrite', how: 'Press ▶ and listen. Write a word or a number.', items: [
        ['The school trip is on Wednesday. — Which day? — Wednesday.', 'Day of the trip:', 'Wednesday'], ['How much is the ticket? — Fifteen pounds.', 'The ticket costs ___ pounds.', '15'], ['What\'s the name of the castle? — Rock Castle. R-O-C-K.', '___ Castle', 'Rock'],
        ['What should we bring? — A sandwich and a bottle of water.', 'Bring a sandwich and a bottle of ___', 'water'], ['When does the museum close? — At half past five.', 'The museum closes at half past ___', 'five'], ['What\'s the guide\'s name? — Mrs Carter. C-A-R-T-E-R.', 'Mrs ___', 'Carter'],
        ['How many students are going? — Thirty-five.', 'How many students?', '35'], ['Which month is the concert? — In July.', 'Month of the concert:', 'July'], ['What\'s the name of the river? — The Swan. S-W-A-N.', 'The River ___', 'Swan'],
        ['How long is the walk? — About seven kilometres.', 'The walk is ___ kilometres.', '7'], ['What do I need to wear? — Comfortable shoes.', 'Wear comfortable ___', 'shoes'], ['What\'s the hotel called? — The Seaview. S-E-A-V-I-E-W.', 'The ___ Hotel', 'Seaview'],
        ['What year was the bridge built? — In nineteen ninety.', 'The bridge was built in 19__', '90'], ['Which floor is the restaurant on? — The fourth floor.', 'The restaurant is on floor ___', '4'], ['What\'s the bus number? — Number sixty-two.', 'Bus number:', '62']] },
      { id: 'R1', part: 'Reading & Writing', title: 'Read and write the word', kind: 'defType', how: 'Read the sentence. Write the word. The first letter is there to help you.', items: [
        ['This person flies a plane.', 'pilot'], ['You can find old and interesting things in this building.', 'museum'], ['This is a mountain with fire inside it.', 'volcano'], ['You use this to cut paper.', 'scissors'],
        ['This hot, dry place has a lot of sand.', 'desert'], ['People stay here when they are on holiday in a different town.', 'hotel'], ['This person travels into space.', 'astronaut'], ['You wear this on your finger.', 'ring'],
        ['This is a round model of the world.', 'globe'], ['A king or a queen wears this on their head.', 'crown'], ['You use this to open a door.', 'key'], ['This person helps when there is a fire.', 'firefighter'],
        ['This bird can see very well at night.', 'owl'], ['You send this to someone in an envelope.', 'letter'], ['You go here to catch a plane.', 'airport']] },
      { id: 'R2', part: 'Reading & Writing', title: 'Choose the right word', kind: 'gapPick', how: 'Read the sentence. Choose the right word for the gap.', items: [
        ['I\'ve never ___ to Japan, but I\'d love to go.', 'been', ['go', 'went']], ['If it rains tomorrow, we ___ stay at home.', 'will', ['would', 'are']], ['This is the ___ exciting book I\'ve ever read.', 'most', ['more', 'much']],
        ['She has lived in Kostanay ___ 2019.', 'since', ['for', 'from']], ['While I was walking home, I ___ an old friend.', 'met', ['meet', 'was meet']], ['You ___ wear a helmet when you ride a bike.', 'should', ['shouldn\'t to', 'mustn\'t']],
        ['The film was ___ boring that I fell asleep.', 'so', ['such', 'too']], ['My uncle, ___ is a doctor, works in Astana.', 'who', ['which', 'where']], ['We were late ___ the bus didn\'t come.', 'because', ['so', 'but']],
        ['I\'m not good ___ maths, but I love science.', 'at', ['in', 'on']], ['They ___ football when it started to snow.', 'were playing', ['played', 'play']], ['Have you finished your homework ___?', 'yet', ['already', 'still']],
        ['This bag is ___ heavy for me to carry.', 'too', ['enough', 'very much']], ['Would you mind ___ the window?', 'opening', ['open', 'to open']], ['The castle ___ in the 14th century.', 'was built', ['built', 'is building']]] },
      { id: 'R3', part: 'Reading & Writing', title: 'Read the conversation', kind: 'dialogue', how: 'Read what the first person says. Choose the best answer.', items: [
        ['How was your holiday?', 'Amazing! We went sailing every day.', ['I\'m on holiday.', 'Yes, it was.']], ['Have you ever been skiing?', 'No, but I\'d like to try.', ['Yes, I go.', 'I\'m skiing.']], ['What were you doing at eight o\'clock last night?', 'I was watching a film.', ['I watched.', 'At home.']],
        ['Could you tell me the way to the museum?', 'Go straight on and turn left at the bank.', ['Yes, I could.', 'It\'s a museum.']], ['Why didn\'t you come to the party?', 'I had a cold.', ['Yes, I didn\'t.', 'It was a party.']], ['Which would you prefer, tea or juice?', 'Juice, please.', ['Yes, please.', 'I prefer.']],
        ['How long have you had your dog?', 'For about three years.', ['Since three years.', 'He\'s three.']], ['What will you do if it snows?', 'We\'ll build a snowman!', ['It snowed.', 'It\'s cold.']], ['Do you know who wrote this book?', 'I think it was a famous scientist.', ['Yes, I know it.', 'It\'s a book.']],
        ['Shall I help you carry that?', 'Thanks, that\'s kind of you.', ['Yes, you shall.', 'It\'s heavy.']], ['What\'s the most interesting place you\'ve visited?', 'The castle in Scotland.', ['I visit it.', 'Yes, I have.']], ['Is it far to the airport?', 'About twenty minutes by taxi.', ['It\'s an airport.', 'Yes, I am.']],
        ['Who\'s the tallest person in your class?', 'My friend Dias. He\'s nearly 170 centimetres!', ['He\'s tall.', 'In my class.']], ['How did you break your arm?', 'I fell off my bike.', ['It\'s broken.', 'With my arm.']], ['Would you like to come camping with us?', 'I\'d love to! When are you going?', ['Yes, I like.', 'I camp.']]] },
      { id: 'R4', part: 'Reading & Writing', title: 'Write the past form', kind: 'typeWord', how: 'Complete the sentence with the right form of the verb.', items: [
        ['Yesterday we (go) ___ to the cinema.', 'went'], ['Last summer I (swim) ___ in the sea every day.', 'swam'], ['She (buy) ___ a new jacket on Saturday.', 'bought'], ['They (see) ___ a whale from the boat.', 'saw'],
        ['I (write) ___ a letter to my grandmother.', 'wrote'], ['He (catch) ___ a big fish.', 'caught'], ['We (eat) ___ pizza for dinner.', 'ate'], ['My dad (drive) ___ us to school.', 'drove'],
        ['The children (run) ___ to the park.', 'ran'], ['I (find) ___ some money in my pocket.', 'found'], ['She (take) ___ lots of photos.', 'took'], ['We (fly) ___ to Istanbul last year.', 'flew'],
        ['He (forget) ___ his homework.', 'forgot'], ['The bird (build) ___ a nest in our tree.', 'built'], ['I (think) ___ the test was easy.', 'thought']] }
    ]
  };
  return { P: P, pic: pic, levels: { starters: starters, movers: movers, flyers: flyers } };
})();
