/* General English C2: original IF Academy course. */
IFX.course({
  id: 'ge-c2', track: 'general', level: 'C2', next: null, icon: '💎',
  title: 'General English C2', sub: 'Mastery: style, idiom and subtlety',
  blurb: 'Idiomatic English and language and identity — sophisticated texts and the structures that shape focus and style.',
  units: [
  { id: 'u1', title: 'Shades of meaning', topic: 'Idiom', lessons: [
    { id: 'v', type: 'vocab', title: 'Idiomatic English for nuance', words: [
      { w: 'a double-edged sword', p: 'idiom', d: 'something that has both good and bad effects', e: "Fame is a double-edged sword.", ru: 'палка о двух концах' },
      { w: 'by and large', p: 'idiom', d: 'generally; on the whole', e: "By and large, the reforms have worked.", ru: 'в целом' },
      { w: 'to all intents and purposes', p: 'idiom', d: 'in every important way; practically', e: "To all intents and purposes, the project is finished.", ru: 'фактически' },
      { w: 'take something with a pinch of salt', p: 'idiom', d: 'not completely believe something', e: "Take online reviews with a pinch of salt.", ru: 'относиться скептически' },
      { w: 'the jury is still out', p: 'idiom', d: 'people have not yet decided about something', e: "The jury is still out on the new policy.", ru: 'вопрос остаётся открытым' },
      { w: 'a moot point', p: 'idiom', d: 'a question that is debatable or no longer matters', e: "Whether it was legal is now a moot point.", ru: 'спорный вопрос' },
      { w: 'split hairs', p: 'idiom', d: 'argue about details that are too small to matter', e: "Let's not split hairs over the wording.", ru: 'придираться к мелочам' },
      { w: 'at a premium', p: 'idiom', d: 'rare and therefore valuable or expensive', e: "In the city centre, space is at a premium.", ru: 'в дефиците' }
    ]},
    { id: 'g', type: 'grammar', title: 'Cleft sentences for focus',
      rule: "<p>Cleft sentences split one idea into two parts to put <b>focus</b> on the most important information.</p><table><tr><td><b>It</b> + be + focus + <b>that / who</b></td><td><b>It was</b> the tone, not the words, <b>that</b> offended her.</td></tr><tr><td><b>What</b> + clause + be</td><td><b>What</b> I find surprising <b>is</b> how quickly it spread.</td></tr><tr><td><b>All</b> (= the only thing)</td><td><b>All</b> we need <b>is</b> a little more time.</td></tr><tr><td><b>The reason why / The place where</b></td><td><b>The reason why</b> it failed <b>was</b> poor timing.</td></tr></table>",
      ex: [
        { t: 'mc', q: '___ annoys me is the constant noise.', o: ['That', 'What', 'It'], a: 1 },
        { t: 'mc', q: 'It was Aliya ___ found the mistake.', o: ['which', 'who', 'what'], a: 1 },
        { t: 'gap', q: '___ I want is a straight answer.', a: ['All', 'What'] },
        { t: 'mc', q: 'Choose the sentence that focuses on the time.', o: ['It was in 2019 that we met.', 'We met in 2019, it was.', 'What we met was 2019.'], a: 0 },
        { t: 'order', a: 'What really matters is how you say it.' }
      ]},
    { id: 'r', type: 'reading', title: 'The trouble with idioms', photo: '/media/spaces/reading-2.webp', alt: 'Shelves of books in the IF Reading Zone',
      text: "Idioms are, by and large, the last frontier for advanced learners. A student may write flawless academic prose and still be baffled when a colleague remarks that a proposal is \"a bit of a curate's egg\" — good in parts, if you were wondering. What makes idioms so treacherous is not merely their opacity but their register: deployed in the wrong context, they sound either stilted or oddly flippant.\n\nThere is also the question of currency. Many idioms that appear in older textbooks are, to all intents and purposes, extinct in everyday speech, while new ones emerge and spread at a speed that dictionaries struggle to match. Whether learners should actively use idioms at all is, for some teachers, a moot point; what they must do is understand them.\n\nIt is perhaps this asymmetry — recognising far more than one produces — that best characterises mastery. Native speakers themselves use only a fraction of the idioms they know, and they do so sparingly. The jury is still out on how many a C2 speaker needs, but one thing seems clear: it is precision, not quantity, that impresses.",
      ex: [
        { t: 'mc', q: 'According to the writer, what makes idioms "treacherous"?', o: ['They are always rude.', 'They are hard to understand and easy to use in the wrong register.', 'They change their spelling.'], a: 1 },
        { t: 'tf', q: 'All the idioms in older textbooks are still common today.', a: false },
        { t: 'mc', q: 'The "asymmetry" in the final paragraph refers to…', o: ['understanding many more idioms than you use', 'using idioms in writing but not speech', 'the difference between British and American idioms'], a: 0 },
        { t: 'mc', q: 'The writer concludes that what impresses is…', o: ['using as many idioms as possible', 'using language precisely', 'avoiding idioms completely'], a: 1 }
      ]},
    { id: 'c', type: 'check', title: 'Unit check', ex: [
      { t: 'mc', q: 'Social media is a ___: it connects us but also distracts us.', o: ['moot point', 'double-edged sword', 'pinch of salt'], a: 1 },
      { t: 'mc', q: "It's not the price ___ worries me, it's the quality.", o: ['what', 'that', 'which it'], a: 1 },
      { t: 'gap', q: '___ we did was ask the right question.', a: ['All', 'What'] },
      { t: 'mc', q: 'Arguing about tiny, unimportant details is…', o: ['splitting hairs', 'at a premium', 'by and large'], a: 0 },
      { t: 'order', a: 'The reason why it failed was poor timing.' },
      { t: 'match', p: [['by and large', 'generally'], ['at a premium', 'scarce and valuable'], ['a moot point', 'debatable or irrelevant'], ['the jury is still out', 'not yet decided']] }
    ]}
  ]},
  { id: 'u2', title: 'Language and identity', topic: 'Society', lessons: [
    { id: 'v', type: 'vocab', title: 'How we speak, who we are', words: [
      { w: 'vernacular', p: 'noun', d: 'the everyday language spoken by ordinary people in a place', e: "The novel is written in the local vernacular.", ru: 'народный язык' },
      { w: 'register', p: 'noun', d: 'the level of formality in language', e: "He switched to a formal register for the interview.", ru: 'регистр (стиль речи)' },
      { w: 'connotation', p: 'noun', d: 'a feeling or idea a word suggests beyond its basic meaning', e: "\"Cheap\" has a negative connotation; \"inexpensive\" does not.", ru: 'коннотация' },
      { w: 'colloquial', p: 'adjective', d: 'informal; used in conversation rather than writing', e: "\"Gonna\" is colloquial.", ru: 'разговорный' },
      { w: 'articulate', p: 'adjective', d: 'able to express ideas clearly and well', e: "She is an articulate speaker in three languages.", ru: 'красноречивый' },
      { w: 'idiosyncratic', p: 'adjective', d: 'very individual and unusual', e: "His idiosyncratic spelling made the notes hard to read.", ru: 'своеобразный' },
      { w: 'assimilate', p: 'verb', d: 'to become part of a group or culture; to absorb fully', e: "Immigrant children often assimilate faster than their parents.", ru: 'ассимилироваться' },
      { w: 'code-switch', p: 'verb', d: 'to move between languages or styles depending on the situation', e: "Many bilingual people code-switch without noticing.", ru: 'переключаться между языками' }
    ]},
    { id: 'g', type: 'grammar', title: 'Participle clauses',
      rule: "<p>Participle clauses make writing concise and sophisticated. The subject must be the same as in the main clause.</p><table><tr><td>-ing (active, same time)</td><td><b>Speaking</b> three languages, she code-switches constantly.</td></tr><tr><td><b>Having</b> + past participle (earlier action)</td><td><b>Having lived</b> abroad, he understood both cultures.</td></tr><tr><td>past participle (passive)</td><td><b>Written</b> in dialect, the poem is hard to translate.</td></tr><tr><td>negative</td><td><b>Not knowing</b> the register, I sounded rude.</td></tr></table>",
      ex: [
        { t: 'mc', q: '___ in the 18th century, the dictionary is still useful.', o: ['Writing', 'Written', 'Having written'], a: 1 },
        { t: 'mc', q: '___ finished the report, she went home.', o: ['Having', 'Being', 'Had'], a: 0 },
        { t: 'gap', q: '___ (not / understand) the joke, he smiled politely.', a: ['Not understanding'] },
        { t: 'mc', q: 'Which sentence is correct?', o: ['Walking into the room, the lights were off.', 'Walking into the room, I noticed the lights were off.'], a: 1, why: 'The subject of the participle (who walked) must be the subject of the main clause.' },
        { t: 'order', a: 'Having grown up bilingual, she switches easily.' }
      ]},
    { id: 'r', type: 'reading', title: 'Two languages, one self?', photo: '/media/spaces/hub-4.webp', alt: 'Students talking in the IF Hub',
      text: "Ask bilingual speakers whether they feel like a different person in each language, and a surprising number will say yes. Speaking Russian at home and English at work, one Kostanay engineer describes herself as \"warmer but louder\" in one and \"precise but more reserved\" in the other. Linguists are cautious about such claims, yet the experience is too widespread to dismiss.\n\nPart of the explanation lies in register and connotation. Having learned a language in a particular setting — school, business, family — we absorb not only its words but the social roles attached to them. Code-switching, far from being a sign of weak command of either language, is often a highly articulate strategy, signalling closeness, distance or humour in ways a single language cannot.\n\nThe pressure to assimilate fully, abandoning the vernacular of one's childhood, can therefore carry a hidden cost. What is lost is not merely vocabulary but an idiosyncratic way of being in the world. Seen in this light, multilingualism is less a collection of languages than a repertoire of selves.",
      ex: [
        { t: 'mc', q: 'How do linguists react to the claim of "different personalities"?', o: ['They fully accept it.', 'They are cautious but cannot ignore it.', 'They reject it completely.'], a: 1 },
        { t: 'tf', q: 'The writer sees code-switching as a sign of poor language ability.', a: false },
        { t: 'mc', q: 'According to the text, full assimilation may cost people…', o: ['money and time', 'a personal way of being', 'their jobs'], a: 1 },
        { t: 'mc', q: '"a repertoire of selves" suggests that multilingual people…', o: ['have several ways of expressing who they are', 'are confused about their identity', 'prefer one language'], a: 0 }
      ]},
    { id: 'c', type: 'check', title: 'Unit check', ex: [
      { t: 'mc', q: '"Stingy" and "thrifty" have different…', o: ['registers', 'connotations', 'vernaculars'], a: 1 },
      { t: 'mc', q: '___ by a famous architect, the building attracts tourists.', o: ['Designing', 'Designed', 'Having designed'], a: 1 },
      { t: 'gap', q: '___ (spend) ten years abroad, he found home strange.', a: ['Having spent'] },
      { t: 'mc', q: 'Informal, conversational language is…', o: ['colloquial', 'articulate', 'idiosyncratic'], a: 0 },
      { t: 'order', a: 'Not knowing the rules, I spoke too informally.' },
      { t: 'match', p: [['register', 'level of formality'], ['vernacular', 'everyday local speech'], ['assimilate', 'become part of a culture'], ['articulate', 'expresses ideas clearly']] }
    ]}
  ]}
  ]
});
