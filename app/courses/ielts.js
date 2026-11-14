/* IELTS lessons: original IF Academy course — teaches the skills, then practises them. */
IFX.course({
  id: 'ielts', track: 'exam', level: 'B1+', next: 'Band 6.5+', icon: '🎓',
  title: 'IELTS Lessons', sub: 'Learn the skills, then practise',
  blurb: 'Step-by-step lessons for Writing Task 1, Writing Task 2 and Reading — language, strategy and model answers, before you go to the practice tests.',
  units: [
  { id: 'u1', title: 'Writing Task 1: describing trends', topic: 'Writing Task 1', lessons: [
    { id: 'v', type: 'vocab', title: 'The language of change', words: [
      { w: 'increase', p: 'verb / noun', d: 'to go up; a rise', e: 'Sales increased from 20 to 35 million.', ru: 'увеличиваться' },
      { w: 'decline', p: 'verb / noun', d: 'to go down; a fall', e: 'There was a steady decline in car use.', ru: 'снижаться, спад' },
      { w: 'fluctuate', p: 'verb', d: 'to go up and down many times', e: 'Prices fluctuated between $5 and $7.', ru: 'колебаться' },
      { w: 'peak', p: 'verb / noun', d: 'to reach the highest point', e: 'Visitor numbers peaked in July at 2 million.', ru: 'достигать пика' },
      { w: 'remain stable', p: 'phrase', d: 'to stay at the same level', e: 'Unemployment remained stable at 5%.', ru: 'оставаться стабильным' },
      { w: 'sharply', p: 'adverb', d: 'quickly and by a large amount', e: 'The figure rose sharply in 2010.', ru: 'резко' },
      { w: 'gradually', p: 'adverb', d: 'slowly, over a long time', e: 'The population grew gradually.', ru: 'постепенно' },
      { w: 'overall', p: 'adverb', d: 'in general; looking at the whole picture', e: 'Overall, online sales rose over the period.', ru: 'в целом' }
    ]},
    { id: 'g', type: 'grammar', title: 'Describing change accurately',
      rule: '<p>Two patterns — use both to vary your writing:</p><table><tr><td>verb + adverb</td><td>Sales <b>rose sharply</b>.</td></tr><tr><td>adjective + noun</td><td>There was a <b>sharp rise</b> in sales.</td></tr></table><p>Prepositions with numbers:</p><table><tr><td><b>from</b> … <b>to</b></td><td>rose <b>from</b> 20% <b>to</b> 35%</td></tr><tr><td><b>by</b></td><td>the difference: rose <b>by</b> 15 points</td></tr><tr><td><b>at</b></td><td>a point: peaked <b>at</b> 40%</td></tr><tr><td><b>of</b></td><td>after a noun: a rise <b>of</b> 15%</td></tr></table><p>Use the <b>past simple</b> for past dates and <b>will / is expected to</b> for forecasts.</p>',
      ex: [
        { t: 'mc', q: 'The number of tourists rose ___ 2 million to 3 million.', o: ['from', 'by', 'at'], a: 0 },
        { t: 'mc', q: 'Profits increased ___ 10% (the difference).', o: ['at', 'by', 'to'], a: 1 },
        { t: 'gap', q: 'There was a ___ (gradual / gradually) increase in prices.', a: ['gradual'] },
        { t: 'gap', q: 'Car sales fell ___ (sharp / sharply) after 2008.', a: ['sharply'] },
        { t: 'mc', q: 'Electricity use peaked ___ 500 units in January.', o: ['at', 'of', 'from'], a: 0 },
        { t: 'order', a: 'There was a slight fall in the number of students.' }
      ]},
    { id: 'r', type: 'reading', title: 'Model answer: a line graph', chart: 'line',
      text: 'The graph shows the percentage of households in three countries — Kazakhstan, Germany and Brazil — with internet access between 2005 and 2025.\n\nOverall, internet access rose in all three countries, and by 2025 the figures were very similar. Kazakhstan saw the most dramatic growth.\n\nIn 2005, Germany had by far the highest level of access, at around 60%, while only 10% of households in Kazakhstan and 15% in Brazil were connected. Over the next ten years, the figure for Kazakhstan increased sharply, reaching 70% in 2015, whereas Brazil grew more gradually to 50%.\n\nGermany\'s figure continued to rise steadily and peaked at 95% in 2025. By this time, Kazakhstan had almost caught up, at 90%, and Brazil had reached 85%.',
      ex: [
        { t: 'mc', q: 'Which sentence is the OVERVIEW?', o: ['In 2005, Germany had the highest level of access.', 'Overall, internet access rose in all three countries, and by 2025 the figures were very similar.', 'Brazil had reached 85%.'], a: 1, why: 'The overview gives the main trends, without small details.' },
        { t: 'mc', q: 'Which country had the most dramatic growth?', o: ['Germany', 'Kazakhstan', 'Brazil'], a: 1 },
        { t: 'tf', q: 'The model answer gives the writer\'s opinion about the internet.', a: false, why: 'Task 1 reports data. No opinions.' },
        { t: 'mc', q: 'Which word shows a comparison between two countries?', o: ['whereas', 'overall', 'peaked'], a: 0 },
        { t: 'mc', q: 'How is the answer organised?', o: ['introduction, overview, two detail paragraphs', 'introduction, opinion, conclusion', 'one long paragraph'], a: 0 }
      ]},
    { id: 'c', type: 'check', title: 'Unit check', ex: [
      { t: 'mc', q: 'Go up and down many times:', o: ['peak', 'fluctuate', 'decline'], a: 1 },
      { t: 'gap', q: 'Prices rose ___ $4 to $6.', a: ['from'] },
      { t: 'mc', q: 'Choose the better overview start:', o: ['In my opinion…', 'Overall,…', 'Firstly, in 2005…'], a: 1 },
      { t: 'gap', q: 'There was a ___ (sharp / sharply) drop in 2020.', a: ['sharp'] },
      { t: 'order', a: 'The figure remained stable at around fifty percent.' },
      { t: 'match', p: [['peak', 'highest point'], ['decline', 'fall'], ['gradually', 'slowly'], ['remain stable', 'stay the same']] }
    ]}
  ]},
  { id: 'u2', title: 'Writing Task 2: the opinion essay', topic: 'Writing Task 2', lessons: [
    { id: 'v', type: 'vocab', title: 'Linking ideas', words: [
      { w: 'furthermore', p: 'linker', d: 'used to add another point (= in addition)', e: 'Furthermore, cities offer better jobs.', ru: 'более того' },
      { w: 'however', p: 'linker', d: 'used to show a contrast', e: 'However, living costs are higher.', ru: 'однако' },
      { w: 'whereas', p: 'linker', d: 'used to compare two different facts in one sentence', e: 'Cities are crowded, whereas villages are quiet.', ru: 'тогда как' },
      { w: 'as a result', p: 'linker', d: 'used to show a consequence', e: 'As a result, traffic has increased.', ru: 'в результате' },
      { w: 'for instance', p: 'linker', d: 'used to give an example', e: 'For instance, Almaty has grown very fast.', ru: 'например' },
      { w: 'although', p: 'linker', d: 'used to accept a point but disagree (+ clause)', e: 'Although cities are expensive, they offer more.', ru: 'хотя' },
      { w: 'in conclusion', p: 'linker', d: 'used to start the final paragraph', e: 'In conclusion, the benefits are greater.', ru: 'в заключение' },
      { w: 'consequently', p: 'linker', d: 'therefore; because of this', e: 'Consequently, housing prices have risen.', ru: 'следовательно' }
    ]},
    { id: 'g', type: 'skill', title: 'Essay structure: four paragraphs',
      rule: '<table><tr><td><b>1 Introduction</b></td><td>Paraphrase the question + give your clear opinion (thesis).</td></tr><tr><td><b>2 Body 1</b></td><td>Main reason → explain → example.</td></tr><tr><td><b>3 Body 2</b></td><td>Second reason (or the other view + why you still disagree) → explain → example.</td></tr><tr><td><b>4 Conclusion</b></td><td>Repeat your opinion in new words. No new ideas.</td></tr></table><p>Aim for <b>250–290 words</b> in <b>40 minutes</b>: 5 minutes planning, 30 writing, 5 checking.</p><p class="ex">Thesis example: <i>I strongly believe that the advantages of city life outweigh the disadvantages.</i></p>',
      ex: [
        { t: 'mc', q: 'Where do you give your opinion first?', o: ['in the conclusion only', 'in the introduction', 'you never give it'], a: 1 },
        { t: 'mc', q: 'What should NOT be in the conclusion?', o: ['your opinion', 'a summary of reasons', 'a completely new idea'], a: 2 },
        { t: 'mc', q: 'How long should a Task 2 essay be?', o: ['at least 150 words', 'at least 250 words', 'exactly 500 words'], a: 1 },
        { t: 'mc', q: 'Best order inside a body paragraph:', o: ['example → reason → explanation', 'reason → explanation → example', 'conclusion → reason'], a: 1 },
        { t: 'mc', q: 'Paraphrase “More people are moving to cities.”', o: ['More people are moving to cities.', 'Urban populations are growing as people leave rural areas.', 'Cities are big.'], a: 1 }
      ]},
    { id: 'r', type: 'reading', title: 'Model essay: city life', photo: 'YKxt6EctCy4', alt: 'Aerial view of a modern city',
      text: 'Question: More and more people are moving from the countryside to cities. Do the advantages of this trend outweigh the disadvantages?\n\nIn recent decades, a growing number of people have left rural areas to live in towns and cities. Although this trend creates some serious problems, I strongly believe that its advantages are greater.\n\nThe main benefit of moving to a city is access to opportunities. Cities offer a wider range of jobs and usually higher salaries. Furthermore, universities, hospitals and cultural centres are concentrated in urban areas. For instance, a young person from a village near Kostanay can study at a university in Astana and find work in a growing industry such as IT.\n\nAdmittedly, rapid urban growth causes problems. Housing becomes expensive, and traffic and pollution increase. However, these are problems that good planning can solve: better public transport and more affordable housing can make cities healthier places to live. In contrast, the lack of jobs and services in rural areas is much harder to fix.\n\nIn conclusion, while the move to cities brings challenges, the educational and economic opportunities it offers are, in my view, far more significant.',
      ex: [
        { t: 'mc', q: 'What is the writer\'s opinion?', o: ['The disadvantages are greater.', 'The advantages are greater.', 'They are equal.'], a: 1 },
        { t: 'mc', q: 'What is the main idea of Body 1?', o: ['pollution', 'opportunities in cities', 'village life'], a: 1 },
        { t: 'mc', q: 'Why does the writer mention a young person from a village near Kostanay?', o: ['as an example', 'as a conclusion', 'as a counter-argument'], a: 0 },
        { t: 'mc', q: 'What does “Admittedly” introduce?', o: ['the other side of the argument', 'a new example', 'the conclusion'], a: 0 },
        { t: 'tf', q: 'The conclusion introduces a new argument about health.', a: false }
      ]},
    { id: 'c', type: 'check', title: 'Unit check', ex: [
      { t: 'mc', q: 'Show a result:', o: ['for instance', 'as a result', 'whereas'], a: 1 },
      { t: 'mc', q: '___ the city is noisy, I enjoy living there.', o: ['However', 'Although', 'Furthermore'], a: 1 },
      { t: 'mc', q: 'Add a point:', o: ['furthermore', 'however', 'whereas'], a: 0 },
      { t: 'mc', q: 'Where is the thesis statement?', o: ['introduction', 'body 2', 'title'], a: 0 },
      { t: 'order', a: 'In conclusion the advantages outweigh the disadvantages.' },
      { t: 'match', p: [['for instance', 'example'], ['however', 'contrast'], ['consequently', 'result'], ['in conclusion', 'final paragraph']] }
    ]}
  ]},
  { id: 'u3', title: 'Reading: True / False / Not Given', topic: 'Reading', lessons: [
    { id: 'v', type: 'vocab', title: 'Academic words', words: [
      { w: 'evidence', p: 'noun', d: 'facts that show something is true', e: 'There is little evidence that the method works.', ru: 'доказательство' },
      { w: 'claim', p: 'verb / noun', d: 'to say something is true without proof', e: 'The company claims its product is the best.', ru: 'утверждать' },
      { w: 'significant', p: 'adjective', d: 'important or large enough to notice', e: 'There was a significant improvement.', ru: 'значительный' },
      { w: 'decline', p: 'noun', d: 'a gradual decrease', e: 'a decline in reading habits', ru: 'спад' },
      { w: 'contribute to', p: 'verb', d: 'to be one of the causes of something', e: 'Stress can contribute to poor sleep.', ru: 'способствовать' },
      { w: 'researcher', p: 'noun', d: 'a person who studies a subject carefully', e: 'Researchers asked 2,000 teenagers.', ru: 'исследователь' },
      { w: 'whereas', p: 'linker', d: 'while (contrast)', e: 'Adults read news, whereas teens read fiction.', ru: 'тогда как' },
      { w: 'approximately', p: 'adverb', d: 'about; close to', e: 'approximately 40% of students', ru: 'приблизительно' }
    ]},
    { id: 'g', type: 'skill', title: 'True, False or Not Given?',
      rule: '<table><tr><td><b>TRUE</b></td><td>The text says the same thing (often with different words).</td></tr><tr><td><b>FALSE</b></td><td>The text says the <b>opposite</b>.</td></tr><tr><td><b>NOT GIVEN</b></td><td>The text <b>doesn\'t say</b>. You can\'t know from the text — don\'t use your own knowledge.</td></tr></table><p><b>Strategy</b>: 1) underline key words in the statement; 2) find the paragraph (answers are in order); 3) read that part carefully; 4) watch for <i>all, some, never, only, most</i>.</p><p class="ex">Text: <i>Most students prefer printed books.</i> → “All students prefer printed books.” = <b>FALSE</b> · “Students read more in winter.” = <b>NOT GIVEN</b></p>',
      ex: [
        { t: 'mc', q: 'Text: “The library opened in 1998.” Statement: The library is more than twenty years old.', o: ['True', 'False', 'Not Given'], a: 0 },
        { t: 'mc', q: 'Text: “Some visitors complained about the noise.” Statement: All visitors were happy.', o: ['True', 'False', 'Not Given'], a: 1 },
        { t: 'mc', q: 'Text: “The museum has 3 floors.” Statement: The museum is the largest in the city.', o: ['True', 'False', 'Not Given'], a: 2 },
        { t: 'mc', q: 'Text: “Prices rarely change.” Statement: Prices change very often.', o: ['True', 'False', 'Not Given'], a: 1 },
        { t: 'mc', q: 'Which word in a statement should make you especially careful?', o: ['the', 'only', 'and'], a: 1 }
      ]},
    { id: 'r', type: 'reading', title: 'Practice passage: Do young people still read?', photo: '/media/spaces/reading-2.webp', alt: 'The IF Reading Zone',
      text: 'It is often claimed that teenagers no longer read books. However, a recent study of approximately 2,000 young people aged 13 to 19 suggests that the picture is more complicated.\n\nThe researchers found that the time teenagers spend reading for pleasure has fallen by around 20% over the last decade. Smartphones and video platforms appear to contribute to this decline, as they compete for young people\'s free time.\n\nAt the same time, the study found significant growth in other types of reading. Many teenagers now read long texts online, such as fan fiction and articles, and audiobooks have become popular, especially among boys. Girls, on the other hand, were more likely to read printed novels.\n\nThe researchers concluded that young people are not reading less overall, but reading differently. They recommend that schools include digital texts in lessons, whereas parents should simply encourage reading of any kind.',
      ex: [
        { t: 'mc', q: 'Reading for pleasure has fallen over the last decade.', o: ['True', 'False', 'Not Given'], a: 0 },
        { t: 'mc', q: 'The study included young people under 13.', o: ['True', 'False', 'Not Given'], a: 1 },
        { t: 'mc', q: 'Audiobooks are more popular among boys.', o: ['True', 'False', 'Not Given'], a: 0 },
        { t: 'mc', q: 'Teenagers in big cities read more than those in villages.', o: ['True', 'False', 'Not Given'], a: 2 },
        { t: 'mc', q: 'The researchers say young people are reading much less in total.', o: ['True', 'False', 'Not Given'], a: 1 }
      ]},
    { id: 'c', type: 'check', title: 'Unit check', ex: [
      { t: 'mc', q: 'If the text says the opposite of the statement, the answer is…', o: ['True', 'False', 'Not Given'], a: 1 },
      { t: 'mc', q: 'Facts that show something is true:', o: ['claim', 'evidence', 'decline'], a: 1 },
      { t: 'mc', q: '“approximately 40%” means…', o: ['exactly 40%', 'about 40%', 'more than 40%'], a: 1 },
      { t: 'mc', q: 'In T/F/NG, the answers usually come…', o: ['in random order', 'in the same order as the text'], a: 1 },
      { t: 'order', a: 'There is no evidence for this claim.' },
      { t: 'match', p: [['significant', 'important or large'], ['contribute to', 'help cause'], ['researcher', 'person who studies'], ['claim', 'say without proof']] }
    ]}
  ]}
]});
