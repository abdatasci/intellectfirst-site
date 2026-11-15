/* Business English C1: original IF Academy course. */
IFX.course({
  id: 'be-c1', track: 'business', level: 'C1', next: null, icon: '🏛️',
  title: 'Business English C1', sub: 'Lead, influence and plan strategy',
  blurb: 'Leadership and strategy — the diplomatic and precise English managers need for decisions, risk and change.',
  units: [
  { id: 'u1', title: 'Leading people', topic: 'Leadership', lessons: [
    { id: 'v', type: 'vocab', title: 'Leadership and management', words: [
      { w: 'delegate', p: 'verb', d: 'to give part of your work or authority to someone else', e: "Good managers delegate routine tasks.", ru: 'делегировать' },
      { w: 'empower', p: 'verb', d: 'to give people the confidence and authority to act', e: "We want to empower front-line staff to solve problems.", ru: 'наделять полномочиями' },
      { w: 'accountability', p: 'noun', d: 'being responsible for results and able to explain them', e: "Clear goals create accountability.", ru: 'ответственность, подотчётность' },
      { w: 'micromanage', p: 'verb', d: 'to control every small detail of other people\'s work', e: "Nobody does their best work when they're micromanaged.", ru: 'чрезмерно контролировать' },
      { w: 'stakeholder', p: 'noun', d: 'a person or group affected by or interested in a decision', e: "We consulted all the stakeholders before the change.", ru: 'заинтересованная сторона' },
      { w: 'consensus', p: 'noun', d: 'general agreement within a group', e: "The board reached a consensus after a long debate.", ru: 'консенсус' },
      { w: 'take the initiative', p: 'phrase', d: 'to act before others do, without being told', e: "She took the initiative and fixed the process.", ru: 'проявить инициативу' },
      { w: 'buy-in', p: 'noun', d: 'support and commitment from the people involved', e: "Without staff buy-in, the new system will fail.", ru: 'поддержка, вовлечённость' }
    ]},
    { id: 'g', type: 'grammar', title: 'Diplomatic language and hedging',
      rule: "<p>Senior professionals soften their language to sound tactful and keep relationships strong.</p><table><tr><td>modal verbs</td><td>That <b>might</b> be difficult. · We <b>could</b> consider…</td></tr><tr><td>softening phrases</td><td><b>It might be worth</b> + -ing… · <b>I'd suggest</b> + -ing… · <b>Perhaps we should</b>…</td></tr><tr><td>negative questions</td><td><b>Wouldn't it be better</b> to wait?</td></tr><tr><td>qualifiers</td><td>a <b>slight</b> problem · <b>not entirely</b> convinced · <b>a little</b> concerned</td></tr><tr><td>past forms for distance</td><td>I <b>was wondering</b> if we could… · I <b>wanted</b> to ask…</td></tr></table>",
      ex: [
        { t: 'mc', q: 'Most diplomatic: you think the plan is too expensive.', o: ['The plan is too expensive.', 'I\'m not entirely convinced we can afford this plan.', 'This plan is a bad idea.'], a: 1 },
        { t: 'mc', q: 'It might be worth ___ the stakeholders first.', o: ['to consult', 'consulting', 'consult'], a: 1 },
        { t: 'gap', q: "___ it be better to delegate this task? (negative question)", a: ["Wouldn't", 'Would not'] },
        { t: 'mc', q: 'I ___ wondering if you could join the meeting.', o: ['am being', 'was', 'were'], a: 1 },
        { t: 'order', a: 'Perhaps we should consider a different approach.' }
      ]},
    { id: 'r', type: 'reading', title: 'The manager who stopped answering questions', photo: '/media/spaces/hub-3.webp', alt: 'A team meeting in the IF Hub',
      text: "When Aigerim became head of operations at a logistics firm, she noticed something odd: her calendar was full of meetings in which she simply approved decisions her team was perfectly capable of making. She was, in effect, micromanaging by accident. Every question that reached her desk was a small sign that her people did not feel empowered.\n\nHer solution was deceptively simple. For three months, whenever someone brought her a problem, she replied with a question: \"What would you do?\" At first, staff were uncomfortable; some suspected a trap. But gradually they began to take the initiative, arriving with solutions rather than problems.\n\nThe results were striking. Decisions were made faster, accountability became clearer, and Aigerim finally had time for strategic work with external stakeholders. She is careful not to overstate the case, however. \"Delegation isn't abdication,\" she says. \"You still need consensus on the big goals, and people need to know you'll back them if things go wrong. Without that, you won't get genuine buy-in.\"",
      ex: [
        { t: 'mc', q: 'What did Aigerim realise about her calendar?', o: ['She had too few meetings.', 'She was approving decisions her team could make.', 'Her team never asked questions.'], a: 1 },
        { t: 'mc', q: 'How did staff first react to her new approach?', o: ['They were enthusiastic.', 'They were uncomfortable and suspicious.', 'They refused to answer.'], a: 1 },
        { t: 'tf', q: 'After three months, Aigerim had more time for strategic work.', a: true },
        { t: 'mc', q: '"Delegation isn\'t abdication" means…', o: ['a leader still has responsibility after delegating', 'leaders should never delegate', 'delegation is always successful'], a: 0 },
        { t: 'mc', q: 'Which word best describes the tone of Aigerim\'s final comment?', o: ['cautious', 'boastful', 'angry'], a: 0 }
      ]},
    { id: 'c', type: 'check', title: 'Unit check', ex: [
      { t: 'mc', q: 'Controlling every small detail of your team\'s work is…', o: ['delegating', 'micromanaging', 'empowering'], a: 1 },
      { t: 'mc', q: 'Most tactful:', o: ['You\'re wrong.', 'I see it slightly differently.', 'That\'s not true.'], a: 1 },
      { t: 'gap', q: "I'd suggest ___ (wait) until the board meets.", a: ['waiting'] },
      { t: 'mc', q: 'General agreement in a group is…', o: ['consensus', 'accountability', 'initiative'], a: 0 },
      { t: 'order', a: 'It might be worth involving the stakeholders earlier.' },
      { t: 'match', p: [['delegate', 'give work to others'], ['stakeholder', 'person affected by a decision'], ['buy-in', 'commitment and support'], ['empower', 'give authority and confidence']] }
    ]}
  ]},
  { id: 'u2', title: 'Strategy and risk', topic: 'Strategy', lessons: [
    { id: 'v', type: 'vocab', title: 'Growth, risk and change', words: [
      { w: 'market share', p: 'noun', d: 'the percentage of all sales in a market that a company has', e: "Our market share grew to 18%.", ru: 'доля рынка' },
      { w: 'diversify', p: 'verb', d: 'to start offering different products or entering new markets', e: "The firm diversified into renewable energy.", ru: 'диверсифицировать' },
      { w: 'leverage', p: 'verb', d: 'to use something you have to gain an advantage', e: "We can leverage our brand to enter new markets.", ru: 'использовать (как преимущество)' },
      { w: 'mitigate', p: 'verb', d: 'to make a risk or problem less serious', e: "Insurance helps mitigate the risk.", ru: 'смягчать, снижать' },
      { w: 'contingency plan', p: 'noun', d: 'a plan for what to do if something goes wrong', e: "Do we have a contingency plan if the supplier fails?", ru: 'план на случай непредвиденных обстоятельств' },
      { w: 'due diligence', p: 'noun', d: 'careful research before a business decision, e.g. buying a company', e: "Due diligence revealed serious debts.", ru: 'юридическая/финансовая проверка' },
      { w: 'scale up', p: 'phrasal verb', d: 'to increase the size of an operation', e: "We need investment to scale up production.", ru: 'масштабировать' },
      { w: 'disruption', p: 'noun', d: 'a big change that stops an industry or process working in the usual way', e: "Digital banks caused major disruption.", ru: 'подрыв, потрясение (рынка)' }
    ]},
    { id: 'g', type: 'grammar', title: 'Advanced future forms',
      rule: "<table><tr><td><b>future perfect</b> — completed by a time</td><td>By 2028 we <b>will have doubled</b> our market share.</td></tr><tr><td><b>future continuous</b> — in progress at a time</td><td>This time next year we<b>'ll be operating</b> in three countries.</td></tr><tr><td><b>be set to / be due to</b> — expected / scheduled</td><td>The merger <b>is set to</b> create 500 jobs. The report <b>is due to</b> be published in May.</td></tr><tr><td><b>be on the verge of / be about to</b> — very soon</td><td>We<b>'re on the verge of</b> signing the contract.</td></tr><tr><td><b>be bound to</b> — certain</td><td>Prices <b>are bound to</b> rise.</td></tr></table>",
      ex: [
        { t: 'mc', q: 'By the end of the year, we ___ two new branches.', o: ['will open', 'will have opened', 'are opening'], a: 1 },
        { t: 'mc', q: 'The company is ___ to announce record profits.', o: ['set', 'bound of', 'verge'], a: 0 },
        { t: 'gap', q: "We're on the ___ of a major breakthrough.", a: ['verge'] },
        { t: 'mc', q: 'This time tomorrow I ___ the board.', o: ['will present to', 'will be presenting to', 'will have presented to'], a: 1 },
        { t: 'mc', q: 'With so many new competitors, margins are ___ to fall.', o: ['bound', 'due', 'about'], a: 0 },
        { t: 'order', a: 'By 2030 we will have scaled up production.' }
      ]},
    { id: 'r', type: 'reading', title: 'Growth without gambling', photo: '/media/spaces/lab-2.webp', alt: 'A strategy session around a table',
      text: "For a mid-sized company, the temptation to scale up quickly is enormous, particularly when a competitor appears to be on the verge of collapse. Yet history is full of firms that grew faster than their systems could support. The question is not whether to take risks — growth is impossible without them — but how to take risks you can survive.\n\nThe first principle is to leverage existing strengths. A company that diversifies into an unrelated market abandons its main advantages; one that extends a trusted brand into a neighbouring product line takes a much smaller gamble. The second is preparation. Thorough due diligence before an acquisition, and a credible contingency plan for supply-chain disruption, are unglamorous, but they are what separate bold strategy from mere gambling.\n\nFinally, timing matters. Analysts expect the regional market to have consolidated within five years, and the firms that will have gained market share by then are likely to be those that moved early but carefully. As one chief executive put it: \"Take the risk, but always know which risks you are mitigating and which ones you are simply hoping won't happen.\"",
      ex: [
        { t: 'mc', q: 'According to the text, the main question for growing firms is…', o: ['whether to take risks', 'how to take risks they can survive', 'how to avoid all risks'], a: 1 },
        { t: 'mc', q: 'Which strategy is described as a smaller gamble?', o: ['entering an unrelated market', 'extending a trusted brand into a related product', 'buying a collapsing competitor'], a: 1 },
        { t: 'tf', q: 'The writer considers due diligence exciting but unnecessary.', a: false },
        { t: 'mc', q: '"will have gained" is an example of…', o: ['the future perfect', 'the future continuous', 'be set to'], a: 0 },
        { t: 'mc', q: 'The chief executive warns against…', o: ['mitigating risks', 'confusing hope with risk management', 'moving early'], a: 1 }
      ]},
    { id: 'c', type: 'check', title: 'Unit check', ex: [
      { t: 'mc', q: 'Careful research before buying a company is…', o: ['due diligence', 'market share', 'disruption'], a: 0 },
      { t: 'mc', q: 'By next spring the project ___ for two years.', o: ['will run', 'will have been running', 'is running'], a: 1 },
      { t: 'gap', q: 'The new law is ___ to come into force in January.', a: ['due', 'set'] },
      { t: 'mc', q: 'To make a risk less serious is to ___ it.', o: ['leverage', 'mitigate', 'diversify'], a: 1 },
      { t: 'order', a: 'We need a contingency plan for supply disruption.' },
      { t: 'match', p: [['diversify', 'enter new markets or products'], ['scale up', 'increase the size of operations'], ['leverage', 'use as an advantage'], ['contingency plan', 'plan if things go wrong']] }
    ]}
  ]}
  ]
});
