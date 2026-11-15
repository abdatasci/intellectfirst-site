/* IF Mind Lab — content (original IF Academy material). Levels B1, B2, C1, C2. */
window.ML_DATA = {
  /* SIGNAL LOCK (focus): tap only the words that fit the rule. */
  focus: {
    B1: [
      { r: 'Feelings', y: ['angry', 'nervous', 'proud', 'bored', 'excited', 'upset', 'jealous', 'relaxed', 'scared', 'grateful'], n: ['kitchen', 'quickly', 'borrow', 'ticket', 'often', 'across', 'luggage', 'between', 'decide', 'pillow'] },
      { r: 'Past forms of verbs', y: ['went', 'bought', 'thought', 'caught', 'chose', 'wrote', 'felt', 'brought', 'taught', 'spent'], n: ['go', 'buy', 'think', 'catch', 'choose', 'write', 'feel', 'bring', 'teach', 'spend'] },
      { r: 'Things in a city', y: ['bridge', 'pavement', 'traffic', 'museum', 'square', 'tower', 'station', 'avenue', 'library', 'stadium'], n: ['cousin', 'cheerful', 'yawn', 'forest', 'quietly', 'nephew', 'meadow', 'polite', 'whisper', 'valley'] }
    ],
    B2: [
      { r: 'Words meaning "very big"', y: ['huge', 'enormous', 'vast', 'massive', 'immense', 'gigantic', 'colossal', 'tremendous'], n: ['tiny', 'minor', 'slight', 'narrow', 'brief', 'modest', 'compact', 'scarce'] },
      { r: 'Nouns', y: ['decision', 'loyalty', 'argument', 'failure', 'growth', 'behaviour', 'knowledge', 'freedom', 'pressure', 'safety'], n: ['decide', 'loyal', 'argue', 'fail', 'grow', 'behave', 'know', 'free', 'press', 'safely'] },
      { r: 'Things you can "make"', y: ['a decision', 'a mistake', 'progress', 'an effort', 'a complaint', 'a profit', 'a suggestion', 'an excuse'], n: ['homework', 'a favour', 'the shopping', 'research', 'damage', 'your best', 'exercise', 'the dishes'] }
    ],
    C1: [
      { r: 'Formal (academic) words', y: ['nevertheless', 'subsequently', 'acquire', 'commence', 'endeavour', 'sufficient', 'facilitate', 'notwithstanding', 'prior to', 'whereby'], n: ['anyway', 'later on', 'get', 'start', 'try', 'enough', 'help', 'still', 'before', 'stuff'] },
      { r: 'Words with a negative meaning', y: ['ruthless', 'gullible', 'arrogant', 'stubborn', 'reckless', 'petty', 'smug', 'nosy', 'devious', 'callous'], n: ['resilient', 'diligent', 'candid', 'humble', 'thoughtful', 'shrewd', 'tactful', 'witty', 'gracious', 'steadfast'] },
      { r: 'Collocations with "heavy"', y: ['traffic', 'rain', 'smoker', 'workload', 'losses', 'heart', 'sigh', 'criticism'], n: ['wind', 'opinion', 'mistake', 'success', 'idea', 'mood', 'speed', 'voice'] }
    ],
    C2: [
      { r: 'Words meaning "to criticise"', y: ['censure', 'disparage', 'denounce', 'deride', 'lambast', 'castigate', 'belittle', 'decry', 'pan', 'slate'], n: ['extol', 'commend', 'laud', 'endorse', 'acclaim', 'vindicate', 'applaud', 'champion', 'hail', 'exalt'] },
      { r: 'Idioms about difficulty', y: ['an uphill struggle', 'a tall order', 'a hard nut to crack', 'a tough call', 'no picnic', 'a sticky wicket', 'between a rock and a hard place', 'a can of worms'], n: ['a piece of cake', 'plain sailing', 'child\'s play', 'a walk in the park', 'a doddle', 'like clockwork', 'easy as pie', 'a cakewalk'] },
      { r: 'Words meaning "temporary"', y: ['ephemeral', 'transient', 'fleeting', 'short-lived', 'evanescent', 'momentary', 'provisional', 'interim'], n: ['enduring', 'perennial', 'immutable', 'abiding', 'perpetual', 'indelible', 'lasting', 'entrenched'] }
    ]
  },

  /* HYPERREAD (speed reading): the text flashes a few words at a time, then one question. */
  read: {
    B1: [
      { t: 'Maya missed the last bus home, so she called her brother. He was at a concert and did not answer. In the end she walked to her friend\'s flat and stayed there for the night.', q: 'Where did Maya sleep?', o: ['at her brother\'s', 'at a friend\'s flat', 'at home'], a: 1 },
      { t: 'The new café on the corner is popular with students because the coffee is cheap and the Wi-Fi is fast. However, it closes at six, so most people leave before the evening rush.', q: 'What is the café\'s problem for students?', o: ['the coffee is expensive', 'the Wi-Fi is slow', 'it closes early'], a: 2 },
      { t: 'Daniyar wanted to run a marathon, but his coach told him to start with a ten-kilometre race. He trained for three months, finished in fifty minutes and now feels ready for something longer.', q: 'Why did Daniyar run ten kilometres first?', o: ['his coach advised it', 'he was injured', 'the marathon was full'], a: 0 },
      { t: 'Our school trip to the mountains was cancelled twice because of snow. When we finally went in April, the weather was warm and the paths were dry, so the wait was worth it.', q: 'How was the weather in April?', o: ['snowy', 'warm', 'wet'], a: 1 }
    ],
    B2: [
      { t: 'Although remote work saves employees hours of commuting, many managers worry that it weakens team spirit. Some companies now ask staff to come in on two fixed days, hoping to keep both flexibility and a sense of belonging.', q: 'Why do companies use two fixed office days?', o: ['to save money on offices', 'to balance flexibility with team spirit', 'because staff dislike working from home'], a: 1 },
      { t: 'The museum\'s new exhibition was expected to attract mainly tourists. Surprisingly, most visitors in the first month were local families, drawn by free weekend workshops for children.', q: 'What attracted most of the first visitors?', o: ['free workshops for children', 'cheaper tickets for tourists', 'a famous painting'], a: 0 },
      { t: 'Fast fashion keeps prices low, but the clothes rarely last. Repair cafés, where volunteers fix torn jackets and broken zips for free, are becoming a quiet protest against throwing things away.', q: 'What do repair cafés show?', o: ['clothes are too expensive', 'resistance to a throwaway culture', 'volunteers want to sell clothes'], a: 1 },
      { t: 'Researchers found that people remember lists better when they walk while learning them. The effect disappeared, however, when participants walked on a treadmill while looking at a screen.', q: 'When did walking NOT help memory?', o: ['outdoors', 'with a screen on a treadmill', 'in the morning'], a: 1 }
    ],
    C1: [
      { t: 'The council\'s decision to pedestrianise the old town was initially met with fury from shopkeepers, who predicted ruin. Two years on, footfall has risen by a third, and several of the loudest critics have quietly expanded their premises.', q: 'What happened to the critics?', o: ['they closed their shops', 'their businesses grew', 'they won a court case'], a: 1 },
      { t: 'It is tempting to treat a single dramatic study as settling a question. Yet replication attempts in psychology have repeatedly shown that striking effects shrink, or vanish altogether, once larger and more careful samples are used.', q: 'What is the writer\'s main point?', o: ['psychology is not a science', 'one striking study is not conclusive', 'small samples are more reliable'], a: 1 },
      { t: 'Far from being a distraction, boredom may serve a purpose: it signals that our current activity no longer rewards us, nudging us to seek something more meaningful. Constantly filling every gap with a phone may silence that signal.', q: 'According to the text, what may phones do?', o: ['cure boredom permanently', 'block a useful signal', 'make work more meaningful'], a: 1 },
      { t: 'The novelist insists she never plans a plot; she starts with a voice and follows it. Her editor, rather less romantically, notes that every manuscript arrives with an eighty-page outline.', q: 'What does the editor suggest?', o: ['the novelist does plan', 'the novelist writes too slowly', 'outlines are unnecessary'], a: 0 }
    ],
    C2: [
      { t: 'Critics who dismiss the reform as mere window dressing overlook a subtler shift: by obliging firms to publish pay data, it has made inequity visible, and visibility, however uncomfortable, tends to precede change.', q: 'How does the writer view the reform?', o: ['as purely cosmetic', 'as quietly significant', 'as harmful to firms'], a: 1 },
      { t: 'His memoir is disarmingly candid about his failures, yet one cannot help noticing that each confession is swiftly followed by an anecdote in which he emerges, if not heroic, then at least wiser than everyone else in the room.', q: 'What does the reviewer imply?', o: ['the honesty is partly self-serving', 'the author is genuinely humble', 'the anecdotes are invented'], a: 0 },
      { t: 'Conventional wisdom holds that scarcity sharpens the mind. The evidence suggests the reverse: preoccupation with what we lack consumes the very attention we need to plan our way out of it.', q: 'What does scarcity do, according to the evidence?', o: ['improves planning', 'uses up attention', 'motivates long-term thinking'], a: 1 },
      { t: 'The architect\'s brief was paradoxical: a building that would announce itself on the skyline while appearing to defer to the medieval street below. The solution, a glass tower set back behind a restored façade, pleased almost no one entirely, which may be the surest sign of a fair compromise.', q: 'Why might the design be a fair compromise?', o: ['everyone loved it', 'no side got everything', 'it was the cheapest option'], a: 1 }
    ]
  },

  /* ECHO (listening): the presenter says the sentence; rebuild it from tiles (two tiles are extra). */
  echo: {
    B1: [
      { s: 'I have been learning English for three years.', x: ['since', 'learnt'] },
      { s: 'Could you tell me where the station is?', x: ['what', 'does'] },
      { s: 'We were watching a film when the lights went out.', x: ['was', 'gone'] },
      { s: 'If it rains tomorrow, we will stay at home.', x: ['would', 'rained'] },
      { s: 'She has never travelled outside her country.', x: ['ever', 'travel'] },
      { s: 'The book was much better than the film.', x: ['more', 'then'] }
    ],
    B2: [
      { s: 'By the time we arrived, the concert had already started.', x: ['has', 'begun'] },
      { s: 'I would rather you didn\'t mention it to anyone.', x: ['prefer', 'don\'t'] },
      { s: 'He must have forgotten about the meeting.', x: ['should', 'forgot'] },
      { s: 'The more you practise, the easier it becomes.', x: ['most', 'easiest'] },
      { s: 'She is used to working late at night.', x: ['use', 'work'] },
      { s: 'Had I known, I would have called you earlier.', x: ['If', 'knew'] }
    ],
    C1: [
      { s: 'Not only did she win the race, but she also broke the record.', x: ['does', 'too'] },
      { s: 'Little did we know that the decision would change everything.', x: ['Few', 'knew'] },
      { s: 'It was only when I left home that I appreciated my parents.', x: ['until', 'what'] },
      { s: 'Were it not for your help, we would never have finished.', x: ['Was', 'If'] },
      { s: 'The proposal, however ambitious, deserves serious consideration.', x: ['although', 'consider'] },
      { s: 'Rarely have I seen such a remarkable performance.', x: ['Rare', 'did'] }
    ],
    C2: [
      { s: 'Be that as it may, the committee remains unconvinced.', x: ['However', 'remain'] },
      { s: 'So compelling was the argument that nobody dared to object.', x: ['Such', 'dare'] },
      { s: 'What struck me most was how little anyone seemed to care.', x: ['Which', 'few'] },
      { s: 'Much as I admire his work, I cannot endorse this book.', x: ['Although', 'many'] },
      { s: 'Under no circumstances should the door be left unlocked.', x: ['Any', 'must'] },
      { s: 'The findings, to say the least, were somewhat inconclusive.', x: ['saying', 'little'] }
    ]
  },

  /* GLYPH FORGE (spelling / writing): hear the word, read the meaning, type it. */
  spell: {
    B1: [['necessary', 'needed; that must be done'], ['receive', 'to get something that is sent'], ['business', 'the activity of buying and selling'], ['beautiful', 'very attractive'], ['different', 'not the same'], ['tomorrow', 'the day after today'], ['restaurant', 'a place where you buy and eat meals'], ['believe', 'to think something is true'], ['friendly', 'kind and pleasant'], ['library', 'a place where you borrow books'], ['interesting', 'holding your attention'], ['environment', 'the natural world around us']],
    B2: [['accommodation', 'a place to live or stay'], ['embarrassed', 'feeling awkward or ashamed'], ['definitely', 'without any doubt'], ['occurrence', 'something that happens'], ['separate', 'apart; not joined'], ['government', 'the group that runs a country'], ['independent', 'not controlled by others'], ['committee', 'a group chosen to decide things'], ['recommend', 'to suggest as good'], ['achievement', 'something done successfully'], ['opportunity', 'a chance to do something'], ['guarantee', 'a firm promise']],
    C1: [['conscientious', 'careful and hard-working'], ['bureaucracy', 'a system of complicated official rules'], ['entrepreneur', 'a person who starts businesses'], ['questionnaire', 'a list of written questions'], ['millennium', 'a period of a thousand years'], ['perseverance', 'continuing despite difficulty'], ['acquaintance', 'a person you know slightly'], ['indispensable', 'absolutely necessary'], ['liaison', 'communication between groups'], ['privilege', 'a special advantage'], ['harass', 'to trouble someone repeatedly'], ['rhythm', 'a regular pattern of sound']],
    C2: [['idiosyncrasy', 'a strange personal habit'], ['onomatopoeia', 'a word that imitates a sound'], ['connoisseur', 'an expert judge of taste'], ['supersede', 'to replace something older'], ['mischievous', 'playfully causing trouble'], ['surreptitious', 'done secretly'], ['acquiesce', 'to accept without protest'], ['unprecedented', 'never happened before'], ['ubiquitous', 'found everywhere'], ['pharaoh', 'a ruler of ancient Egypt'], ['minuscule', 'extremely small'], ['camaraderie', 'friendship and trust in a group']]
  },

  /* PRECISION (vocabulary): replace the vague words in [brackets] with the most precise choice. */
  precise: {
    B1: [
      { s: 'The film was [very good].', o: ['brilliant', 'fine', 'okay'], a: 0 },
      { s: 'I was [very tired] after the long walk.', o: ['exhausted', 'sleepy', 'bored'], a: 0 },
      { s: 'It was [very cold] on the mountain.', o: ['cool', 'freezing', 'fresh'], a: 1 },
      { s: 'The hotel room was [very small].', o: ['tiny', 'short', 'little'], a: 0 },
      { s: 'She was [very happy] with her results.', o: ['delighted', 'glad', 'funny'], a: 0 },
      { s: 'The test was [very easy].', o: ['simple', 'light', 'soft'], a: 0 },
      { s: 'He [said loudly] that he was hungry.', o: ['shouted', 'told', 'whispered'], a: 0 },
      { s: 'The streets were [very full of people].', o: ['crowded', 'busy', 'large'], a: 0 }
    ],
    B2: [
      { s: 'The results were [very important] for the company.', o: ['crucial', 'big', 'serious'], a: 0 },
      { s: 'She [looked quickly] at her watch.', o: ['glanced', 'stared', 'watched'], a: 0 },
      { s: 'The price [went up quickly] last year.', o: ['soared', 'grew', 'moved'], a: 0 },
      { s: 'The town was [completely destroyed] by the flood.', o: ['devastated', 'hurt', 'broken'], a: 0 },
      { s: 'He [walked slowly] along the beach.', o: ['strolled', 'marched', 'rushed'], a: 0 },
      { s: 'The idea is [not very clear].', o: ['vague', 'thin', 'weak'], a: 0 },
      { s: 'The book was [very boring].', o: ['tedious', 'tiring', 'slow'], a: 0 },
      { s: 'The team [did better than] their rivals.', o: ['outperformed', 'beat up', 'passed'], a: 0 }
    ],
    C1: [
      { s: 'The minister [said no to] the claims.', o: ['refuted', 'answered', 'returned'], a: 0 },
      { s: 'The evidence [makes stronger] her theory.', o: ['reinforces', 'heavies', 'grows'], a: 0 },
      { s: 'His speech [made worse] the tension in the room.', o: ['exacerbated', 'lowered', 'upset'], a: 0 },
      { s: 'The data [suggest] a link, but do not prove it.', o: ['indicate', 'shout', 'force'], a: 0 },
      { s: 'The changes had a [big] impact on profits.', o: ['substantial', 'fat', 'high'], a: 0 },
      { s: 'She [got] a reputation for honesty.', o: ['earned', 'took', 'made up'], a: 0 },
      { s: 'The plan is [not likely to work].', o: ['unfeasible', 'unlucky', 'unknown'], a: 0 },
      { s: 'We need to [look at closely] the figures.', o: ['scrutinise', 'see', 'watch'], a: 0 }
    ],
    C2: [
      { s: 'The critic [praised very highly] the debut novel.', o: ['lauded', 'liked', 'mentioned'], a: 0 },
      { s: 'Her argument was [clear and logical].', o: ['cogent', 'loud', 'pretty'], a: 0 },
      { s: 'The government tried to [make less serious] the scandal.', o: ['downplay', 'downgrade', 'undercut'], a: 0 },
      { s: 'He has a [strong, hidden] dislike of authority.', o: ['visceral', 'vocal', 'vague'], a: 0 },
      { s: 'The report was full of [unnecessary words].', o: ['verbiage', 'vocabulary', 'verbs'], a: 0 },
      { s: 'Their friendship [slowly became weaker] over the years.', o: ['waned', 'wandered', 'wobbled'], a: 0 },
      { s: 'The decision seemed [done without thinking].', o: ['impetuous', 'impressive', 'imperial'], a: 0 },
      { s: 'His apology sounded [not sincere].', o: ['disingenuous', 'disinterested', 'disorganised'], a: 0 }
    ]
  },

  /* FAULT LINE (grammar): tap the word that is wrong. b = index of the wrong word, f = the correction. */
  fault: {
    B1: [
      { s: 'She don\'t like coffee in the morning.', b: 1, f: 'doesn\'t' },
      { s: 'I have seen him yesterday at the station.', b: 1, f: 'saw (not "have seen")' },
      { s: 'He is more taller than his brother.', b: 2, f: 'taller (no "more")' },
      { s: 'We go to the cinema last weekend.', b: 1, f: 'went' },
      { s: 'There is many people in the park.', b: 1, f: 'are' },
      { s: 'I am agree with your idea.', b: 1, f: 'I agree (no "am")' },
      { s: 'She can to swim very well.', b: 2, f: 'can swim (no "to")' },
      { s: 'They lives in a small flat.', b: 1, f: 'live' }
    ],
    B2: [
      { s: 'He suggested me to apply for the job.', b: 2, f: 'suggested (that) I apply' },
      { s: 'If I would have known, I would have helped.', b: 2, f: 'had (If I had known)' },
      { s: 'I look forward to hear from you.', b: 4, f: 'hearing' },
      { s: 'She has been working here since three years.', b: 5, f: 'for' },
      { s: 'The informations you gave were useful.', b: 1, f: 'information' },
      { s: 'Despite of the rain, we went out.', b: 1, f: 'Despite (no "of")' },
      { s: 'He denied to take the money.', b: 2, f: 'taking' },
      { s: 'I wish I can speak French.', b: 3, f: 'could' }
    ],
    C1: [
      { s: 'Hardly I had arrived when the phone rang.', b: 1, f: 'had I (inversion)' },
      { s: 'The number of students have increased.', b: 4, f: 'has' },
      { s: 'Not until the end she realised the truth.', b: 4, f: 'did she realise' },
      { s: 'It\'s high time we leave for the airport.', b: 4, f: 'left' },
      { s: 'Neither of the answers are correct.', b: 4, f: 'is' },
      { s: 'Having finished the report, the computer crashed.', b: 5, f: 'dangling: "I had finished the report when the computer crashed"' },
      { s: 'She insisted that he pays the bill.', b: 4, f: 'pay (subjunctive)' },
      { s: 'No sooner had we sat down than the music started.', b: -1, f: '' }
    ],
    C2: [
      { s: 'Scarcely had the meeting begun than the alarm went off.', b: 5, f: 'when' },
      { s: 'Were he to apologise, she might forgives him.', b: 6, f: 'forgive' },
      { s: 'The committee are divided on whom should lead.', b: 5, f: 'who (subject of "should lead")' },
      { s: 'Such was his anger that he could barely spoke.', b: 8, f: 'speak' },
      { s: 'Only by working together we can solve this.', b: 4, f: 'can we (inversion)' },
      { s: 'Should you require any assistance, please do not hesitate to contact me.', b: -1, f: '' },
      { s: 'Lest anyone forgets, the deadline is Friday.', b: 2, f: 'forget (subjunctive after "lest")' },
      { s: 'Much to everyone\'s surprise, the plan has worked out good.', b: 9, f: 'well' }
    ]
  },

  /* VOICE GATE (speaking): read the sentence aloud, clearly and at a natural speed. */
  speak: {
    B1: ['I usually walk to school when the weather is nice.', 'Could you help me carry these bags, please?', 'My favourite place in the city is the park by the river.', 'We have lived in this flat for five years.', 'I am going to visit my grandparents at the weekend.', 'She told me she was looking for a new job.'],
    B2: ['If I had more free time, I would learn to play the guitar.', 'The weather has been surprisingly warm for November.', 'I would recommend booking your tickets well in advance.', 'Social media can be both useful and incredibly distracting.', 'He apologised for arriving late to the meeting.', 'It is worth visiting the old town early in the morning.'],
    C1: ['Not only is the proposal expensive, but it is also unrealistic.', 'The research highlights a significant gap in our understanding.', 'Had we left earlier, we would not have missed the flight.', 'There is a growing consensus that the policy has failed.', 'Little did she realise how much the decision would cost.', 'The architecture of the new library is genuinely breathtaking.'],
    C2: ['Notwithstanding the setbacks, the project remains remarkably resilient.', 'His meticulous attention to detail is nothing short of extraordinary.', 'The ramifications of this decision are yet to be fully appreciated.', 'Rarely has a debut novel provoked such a polarised response.', 'The phenomenon is ubiquitous, yet curiously under-researched.', 'Be that as it may, we cannot afford to be complacent.']
  }
};
