/* Business English B2: original IF Academy course. */
IFX.course({
  id: 'be-b2', track: 'business', level: 'B2', next: 'C1', icon: '📈',
  title: 'Business English B2', sub: 'Negotiate and present with impact',
  blurb: 'Negotiations and presentations — the language to make offers, reach agreement and describe figures clearly.',
  units: [
  { id: 'u1', title: 'Negotiating a deal', topic: 'Negotiation', lessons: [
    { id: 'v', type: 'vocab', title: 'The language of negotiation', words: [
      { w: 'terms', p: 'noun', d: 'the conditions of an agreement, e.g. price and delivery', e: "We agreed on the terms of payment.", ru: 'условия' },
      { w: 'counter-offer', p: 'noun', d: 'an offer made in reply to another offer', e: "They rejected our price and made a counter-offer.", ru: 'встречное предложение' },
      { w: 'compromise', p: 'noun / verb', d: 'an agreement where both sides accept less than they wanted', e: "In the end, we reached a compromise.", ru: 'компромисс' },
      { w: 'concession', p: 'noun', d: 'something you give or allow to reach agreement', e: "Free delivery was our main concession.", ru: 'уступка' },
      { w: 'bottom line', p: 'noun', d: 'the lowest price or most important point you will accept', e: "Our bottom line is 4,000 tenge per unit.", ru: 'минимальная планка' },
      { w: 'win-win', p: 'adjective', d: 'good for both sides', e: "We're looking for a win-win solution.", ru: 'взаимовыгодный' },
      { w: 'deadlock', p: 'noun', d: 'a situation where neither side will change its position', e: "The talks ended in deadlock.", ru: 'тупик' },
      { w: 'close a deal', p: 'phrase', d: 'to finish a negotiation successfully', e: "We closed the deal before lunch.", ru: 'заключить сделку' }
    ]},
    { id: 'g', type: 'grammar', title: 'Conditionals for bargaining',
      rule: "<p>Use conditionals to link offers to conditions.</p><table><tr><td>First conditional — real offer</td><td>If you <b>order</b> 500 units, we<b>'ll give</b> you 5% off.</td></tr><tr><td>Second conditional — softer, hypothetical</td><td>If you <b>ordered</b> more, we <b>could</b> lower the price.</td></tr><tr><td><b>provided (that) / as long as / on condition that</b></td><td>We'll deliver free <b>as long as</b> you pay within 30 days.</td></tr><tr><td><b>unless</b> = if … not</td><td>We can't agree <b>unless</b> you reduce the price.</td></tr></table>",
      ex: [
        { t: 'mc', q: 'If you ___ by Friday, we will include free installation.', o: ['sign', 'will sign', 'signed'], a: 0 },
        { t: 'mc', q: 'We could offer a longer warranty if you ___ a two-year contract.', o: ['sign', 'signed', 'would sign'], a: 1 },
        { t: 'gap', q: 'We agree, ___ that payment is made in advance.', a: ['provided', 'providing'] },
        { t: 'mc', q: "We can't continue ___ you improve your offer.", o: ['if', 'unless', 'as long as'], a: 1 },
        { t: 'order', a: 'We will reduce the price as long as you order today.' }
      ]},
    { id: 'r', type: 'reading', title: 'Why the best negotiators ask more questions', photo: '/media/spaces/lab-1.webp', alt: 'Two people at a negotiation table',
      text: "Many people believe a good negotiator is someone who talks well and never gives anything away. Research on successful negotiators suggests the opposite. In one well-known study, the most effective negotiators asked more than twice as many questions as average ones, and spent far more time checking that they had understood the other side.\n\nQuestions do two things. First, they reveal what the other side really needs — which is often not the same as what they first ask for. A supplier who demands a higher price may actually be worried about late payment; agreeing to pay faster may cost you little and be worth a lot to them. Second, questions slow the conversation down and help avoid deadlock.\n\nSkilled negotiators also plan their concessions. They know their bottom line before they start and never give something without getting something back: \"If we agree to a three-year contract, could you guarantee the price?\" The goal is not to defeat the other side, but to close a deal that both sides will be happy to keep.",
      ex: [
        { t: 'mc', q: 'What did the study find about effective negotiators?', o: ['They talked more.', 'They asked many more questions.', 'They never made concessions.'], a: 1 },
        { t: 'mc', q: 'In the supplier example, what does the supplier really want?', o: ['a higher price', 'faster payment', 'a longer contract'], a: 1 },
        { t: 'tf', q: 'Skilled negotiators give concessions without asking for anything back.', a: false },
        { t: 'mc', q: 'According to the writer, the goal of negotiation is…', o: ['to defeat the other side', 'a deal both sides will keep', 'to get the lowest price'], a: 1 }
      ]},
    { id: 'c', type: 'check', title: 'Unit check', ex: [
      { t: 'mc', q: 'Neither side would move. The talks reached…', o: ['a deadlock', 'a win-win', 'a bottom line'], a: 0 },
      { t: 'mc', q: 'If you ___ a deposit, we will start production.', o: ['pay', 'paid', 'will pay'], a: 0 },
      { t: 'gap', q: "We'll accept, ___ long as delivery is on time.", a: ['as'] },
      { t: 'mc', q: 'Something you give to reach agreement is a…', o: ['concession', 'term', 'counter-offer'], a: 0 },
      { t: 'order', a: 'If you increased the order, we could lower the price.' },
      { t: 'match', p: [['terms', 'conditions of an agreement'], ['win-win', 'good for both sides'], ['bottom line', 'lowest acceptable point'], ['close a deal', 'finish successfully']] }
    ]}
  ]},
  { id: 'u2', title: 'Presenting results', topic: 'Presentations', lessons: [
    { id: 'v', type: 'vocab', title: 'Describing figures and trends', words: [
      { w: 'rise sharply', p: 'verb phrase', d: 'to go up quickly and by a lot', e: "Online sales rose sharply in December.", ru: 'резко вырасти' },
      { w: 'decline', p: 'verb / noun', d: 'to go down; a fall', e: "Profits declined slightly in the second quarter.", ru: 'снижаться / спад' },
      { w: 'level off', p: 'phrasal verb', d: 'to stop rising or falling and stay the same', e: "Prices levelled off in the spring.", ru: 'стабилизироваться' },
      { w: 'peak', p: 'verb / noun', d: 'to reach the highest point', e: "Visitor numbers peaked in July.", ru: 'достигать пика' },
      { w: 'fluctuate', p: 'verb', d: 'to go up and down repeatedly', e: "The exchange rate fluctuated all year.", ru: 'колебаться' },
      { w: 'outline', p: 'noun / verb', d: 'a short description of the main points', e: "Let me give you a quick outline of my talk.", ru: 'план, кратко изложить' },
      { w: 'highlight', p: 'verb', d: 'to draw attention to something important', e: "I'd like to highlight three key results.", ru: 'выделить' },
      { w: 'wrap up', p: 'phrasal verb', d: 'to finish something, e.g. a talk', e: "To wrap up, let's look at next year.", ru: 'подвести итог' }
    ]},
    { id: 'g', type: 'grammar', title: 'Trends: verbs, adverbs and prepositions',
      rule: "<table><tr><td>verb + adverb</td><td>Sales <b>increased dramatically / steadily / slightly</b>.</td></tr><tr><td>adjective + noun</td><td>There was a <b>dramatic increase / steady rise / slight fall</b> in sales.</td></tr><tr><td><b>by</b> = the size of the change</td><td>Profits rose <b>by</b> 12%.</td></tr><tr><td><b>to</b> = the final level</td><td>Profits rose <b>to</b> 8 million.</td></tr><tr><td><b>from … to</b></td><td>Costs fell <b>from</b> 5 <b>to</b> 4 million.</td></tr><tr><td><b>of</b> after a noun</td><td>a rise <b>of</b> 12%</td></tr></table>",
      ex: [
        { t: 'mc', q: 'Sales increased ___ 15% compared to last year.', o: ['to', 'by', 'of'], a: 1 },
        { t: 'mc', q: 'There was a ___ fall in costs.', o: ['slightly', 'slight', 'slighter'], a: 1 },
        { t: 'gap', q: 'Revenue grew ___ 2 million to 3 million.', a: ['from'] },
        { t: 'mc', q: 'Profits rose ___ a record 9 million.', o: ['by', 'to', 'at'], a: 1 },
        { t: 'mc', q: 'Visitor numbers rose ___ in summer.', o: ['dramatic', 'dramatically', 'drama'], a: 1 },
        { t: 'order', a: 'There was a steady rise of ten percent.' }
      ]},
    { id: 'r', type: 'reading', title: 'Quarterly results: a model presentation', photo: '/media/spaces/lab-4.webp', alt: 'A presentation in the IF Business Lab',
      text: "Good morning, everyone. Today I'd like to give you an outline of our results for the year and highlight three key points.\n\nFirst, sales. As you can see on this slide, sales fluctuated in the first quarter, then rose sharply in the second quarter after the launch of our new product line. They peaked in August at 14 million tenge, and then levelled off for the rest of the year.\n\nSecond, costs. Thanks to our new supplier, costs declined steadily, falling by 8% overall. Third, customers: the number of regular customers grew from 1,200 to 1,750 — a rise of almost 46%.\n\nTo wrap up: a strong year, and a solid base for expansion into Astana. I'm happy to take any questions.",
      ex: [
        { t: 'mc', q: 'What happened to sales in the first quarter?', o: ['They rose sharply.', 'They went up and down.', 'They peaked.'], a: 1 },
        { t: 'mc', q: 'When did sales reach their highest point?', o: ['in the first quarter', 'in August', 'at the end of the year'], a: 1 },
        { t: 'mc', q: 'By how much did costs fall?', o: ['by 8%', 'to 8%', 'by 46%'], a: 0 },
        { t: 'tf', q: 'The number of regular customers fell during the year.', a: false },
        { t: 'mc', q: 'Which phrase does the speaker use to finish?', o: ['Let me give you an outline', 'To wrap up', 'As you can see'], a: 1 }
      ]},
    { id: 'c', type: 'check', title: 'Unit check', ex: [
      { t: 'mc', q: 'Prices went up and down all year. They…', o: ['fluctuated', 'levelled off', 'peaked'], a: 0 },
      { t: 'mc', q: 'Profit rose ___ 3 million ___ 5 million.', o: ['by / to', 'from / to', 'of / by'], a: 1 },
      { t: 'gap', q: 'There was a dramatic ___ (increase) in demand.', a: ['increase'] },
      { t: 'mc', q: 'To finish your presentation, say…', o: ['To wrap up,', 'Let me outline,', 'As you can see,'], a: 0 },
      { t: 'order', a: 'Sales peaked in August and then levelled off.' },
      { t: 'match', p: [['rise sharply', 'go up quickly'], ['decline', 'go down'], ['level off', 'stay the same'], ['highlight', 'draw attention to']] }
    ]}
  ]}
  ]
});
