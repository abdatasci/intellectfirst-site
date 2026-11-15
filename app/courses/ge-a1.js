/* General English A1: original IF Academy course. */
IFX.course({
  id: 'ge-a1', track: 'general', level: 'A1', next: 'A2', icon: '🌱',
  title: 'General English A1', sub: 'Your first steps in English',
  blurb: "Say who you are, talk about your family and home — the first words and grammar you need every day.",
  units: [
  { id: 'u1', title: 'Hello!', topic: 'People', lessons: [
    { id: 'v', type: 'vocab', title: 'Names, countries and jobs', words: [
      { w: 'name', p: 'noun', d: 'what people call you', e: "My name is Aliya.", ru: 'имя' },
      { w: 'country', p: 'noun', d: 'a nation, for example Kazakhstan or Italy', e: "What country are you from?", ru: 'страна' },
      { w: 'from', p: 'preposition', d: 'used to say where a person was born or lives', e: "I'm from Kostanay.", ru: 'из' },
      { w: 'job', p: 'noun', d: 'the work you do for money', e: "What's your job?", ru: 'работа' },
      { w: 'teacher', p: 'noun', d: 'a person who teaches at a school', e: "My mother is a teacher.", ru: 'учитель' },
      { w: 'student', p: 'noun', d: 'a person who studies at a school or university', e: "I'm a student at the university.", ru: 'студент' },
      { w: 'married', p: 'adjective', d: 'having a husband or a wife', e: "Are you married?", ru: 'женат / замужем' },
      { w: 'phone number', p: 'noun', d: 'the numbers you use to call someone', e: "What's your phone number?", ru: 'номер телефона' }
    ]},
    { id: 'g', type: 'grammar', title: 'The verb be: am, is, are',
      rule: "<p>Use <b>be</b> to say who or what someone is.</p><table><tr><td>I</td><td><b>am</b> ('m) — I'm Aliya.</td></tr><tr><td>he / she / it</td><td><b>is</b> ('s) — She's a teacher.</td></tr><tr><td>you / we / they</td><td><b>are</b> ('re) — We're students.</td></tr></table><p>Negative: I'm <b>not</b>, he <b>isn't</b>, they <b>aren't</b>. Question: <b>Are</b> you married? <b>Is</b> he from Almaty?</p>",
      ex: [
        { t: 'mc', q: 'I ___ a student.', o: ['am', 'is', 'are'], a: 0 },
        { t: 'mc', q: 'She ___ from Astana.', o: ['am', 'is', 'are'], a: 1 },
        { t: 'mc', q: 'They ___ teachers.', o: ['is', 'am', 'are'], a: 2 },
        { t: 'gap', q: 'He ___ (not) married.', a: ["isn't", 'is not'] },
        { t: 'mc', q: '___ you from Kostanay?', o: ['Is', 'Are', 'Am'], a: 1 },
        { t: 'order', a: 'Where are you from?' }
      ]},
    { id: 'r', type: 'reading', title: 'Meet the class', photo: '/media/spaces/studio-1.webp', alt: 'A small English class at IF Academy',
      text: "Hello! My name is Dana. I'm twenty years old and I'm from Rudny. I'm a student at the university. My phone number is in the class group.\n\nThis is Marat. He's my classmate. He isn't a student — he's a doctor! He's thirty-two and he's married.\n\nOur teacher is Mr Ben. He's from England, but he lives in Kostanay now. Our class is small and friendly. We're all happy to learn English.",
      ex: [
        { t: 'mc', q: 'Where is Dana from?', o: ['Kostanay', 'Rudny', 'England'], a: 1 },
        { t: 'tf', q: 'Marat is a student.', a: false },
        { t: 'mc', q: "What is Marat's job?", o: ['teacher', 'doctor', 'student'], a: 1 },
        { t: 'tf', q: 'The teacher is from England.', a: true },
        { t: 'mc', q: 'The class is…', o: ['big', 'small and friendly', 'boring'], a: 1 }
      ]},
    { id: 'c', type: 'check', title: 'Unit check', ex: [
      { t: 'mc', q: 'My ___ is Timur.', o: ['name', 'job', 'country'], a: 0 },
      { t: 'mc', q: 'We ___ from Kazakhstan.', o: ['is', 'are', 'am'], a: 1 },
      { t: 'gap', q: 'I ___ (not) a teacher.', a: ["'m not", 'am not'] },
      { t: 'mc', q: 'A person who studies is a…', o: ['teacher', 'student', 'doctor'], a: 1 },
      { t: 'order', a: 'What is your phone number?' },
      { t: 'match', p: [['teacher', 'учитель'], ['country', 'страна'], ['job', 'работа'], ['married', 'женат / замужем']] }
    ]}
  ]},
  { id: 'u2', title: 'Family and home', topic: 'Family', lessons: [
    { id: 'v', type: 'vocab', title: 'My family, my home', words: [
      { w: 'mother', p: 'noun', d: 'your female parent (mum)', e: "My mother is a nurse.", ru: 'мама' },
      { w: 'father', p: 'noun', d: 'your male parent (dad)', e: "My father is fifty.", ru: 'папа' },
      { w: 'brother', p: 'noun', d: 'a boy or man with the same parents as you', e: "I've got one brother.", ru: 'брат' },
      { w: 'sister', p: 'noun', d: 'a girl or woman with the same parents as you', e: "My sister is ten.", ru: 'сестра' },
      { w: 'flat', p: 'noun', d: 'a home on one floor of a big building', e: "We live in a flat in the city centre.", ru: 'квартира' },
      { w: 'kitchen', p: 'noun', d: 'the room where you cook', e: "The kitchen is small.", ru: 'кухня' },
      { w: 'bedroom', p: 'noun', d: 'the room where you sleep', e: "My bedroom is blue.", ru: 'спальня' },
      { w: 'big', p: 'adjective', d: 'large; not small', e: "Our house is big.", ru: 'большой' }
    ]},
    { id: 'g', type: 'grammar', title: "have got and my / your / his / her",
      rule: "<p><b>have got / has got</b> = possess.</p><table><tr><td>I / you / we / they</td><td>I<b>'ve got</b> two brothers.</td></tr><tr><td>he / she / it</td><td>She<b>'s got</b> a big flat.</td></tr></table><p>Question: <b>Have</b> you <b>got</b> a sister? — Yes, I have. / No, I haven't.</p><p><b>Possessives:</b> I → <b>my</b>, you → <b>your</b>, he → <b>his</b>, she → <b>her</b>, we → <b>our</b>, they → <b>their</b>.</p>",
      ex: [
        { t: 'mc', q: 'I ___ got a sister.', o: ['have', 'has', 'am'], a: 0 },
        { t: 'mc', q: 'He ___ got a car.', o: ['have', 'has', 'is'], a: 1 },
        { t: 'mc', q: 'This is Ali. ___ flat is big.', o: ['Her', 'His', 'Your'], a: 1 },
        { t: 'gap', q: '___ you got a brother? — Yes, I have.', a: ['Have'] },
        { t: 'mc', q: 'We live here. This is ___ kitchen.', o: ['our', 'their', 'my'], a: 0 },
        { t: 'order', a: 'She has got two brothers.' }
      ]},
    { id: 'r', type: 'reading', title: 'My home', photo: '/media/spaces/reading-1.webp', alt: 'A cosy room with books and lamps',
      text: "Hi, I'm Asel. I live with my family in a flat in Kostanay. It isn't very big, but it's nice.\n\nI've got one brother and one sister. My brother's name is Daulet. He's sixteen. My sister is Aruzhan. She's eight and she's very funny.\n\nOur flat has got three bedrooms, a kitchen and a living room. My favourite room is the kitchen — my mother cooks there every evening and we eat together. My father hasn't got a lot of free time, but at weekends we watch films.",
      ex: [
        { t: 'tf', q: 'Asel lives in a house.', a: false },
        { t: 'mc', q: 'How old is Daulet?', o: ['eight', 'sixteen', 'ten'], a: 1 },
        { t: 'mc', q: 'How many bedrooms has the flat got?', o: ['two', 'three', 'four'], a: 1 },
        { t: 'mc', q: "What is Asel's favourite room?", o: ['the bedroom', 'the living room', 'the kitchen'], a: 2 },
        { t: 'tf', q: 'The family watch films at weekends.', a: true }
      ]},
    { id: 'c', type: 'check', title: 'Unit check', ex: [
      { t: 'mc', q: 'Your mother and father are your…', o: ['parents', 'brothers', 'sisters'], a: 0 },
      { t: 'mc', q: 'She ___ got a cat.', o: ['have', 'has', 'is'], a: 1 },
      { t: 'mc', q: 'They live in Almaty. ___ flat is new.', o: ['Their', 'His', 'Our'], a: 0 },
      { t: 'gap', q: 'You cook in the ___.', a: ['kitchen'] },
      { t: 'order', a: 'Have you got a big family?' },
      { t: 'match', p: [['bedroom', 'room to sleep'], ['kitchen', 'room to cook'], ['flat', 'home in a big building'], ['big', 'not small']] }
    ]}
  ]}
  ]
});
