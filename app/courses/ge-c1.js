/* General English C1: original IF Academy course. */
IFX.course({
  id: 'ge-c1', track: 'general', level: 'C1', next: 'C2', icon: '🎓',
  title: 'General English C1', sub: 'Precise, persuasive, natural',
  blurb: 'Argument and the future of work — demanding texts, academic collocations and grammar for emphasis and hypothesis.',
  units: [
  { id: 'u1', title: 'The art of persuasion', topic: 'Argument', lessons: [
    { id: 'v', type: 'vocab', title: 'Arguing your case', words: [
      { w: 'compelling', p: 'adjective', d: 'so strong or convincing that you must pay attention', e: "She made a compelling case for a four-day week.", ru: 'убедительный' },
      { w: 'undermine', p: 'verb', d: 'to make something weaker, often gradually', e: "One wrong figure can undermine your whole argument.", ru: 'подрывать' },
      { w: 'concede', p: 'verb', d: 'to admit, often unwillingly, that something is true', e: "I concede that the plan is expensive.", ru: 'признавать' },
      { w: 'counterargument', p: 'noun', d: 'an argument against another argument', e: "Good essays deal with the main counterargument.", ru: 'контраргумент' },
      { w: 'sway', p: 'verb', d: 'to influence someone so they change their opinion', e: "Emotional stories often sway voters.", ru: 'склонить' },
      { w: 'credible', p: 'adjective', d: 'able to be believed or trusted', e: "We need a more credible source.", ru: 'заслуживающий доверия' },
      { w: 'nuance', p: 'noun', d: 'a very small difference in meaning or feeling', e: "The translation lost the nuance of the original.", ru: 'нюанс' },
      { w: 'rhetoric', p: 'noun', d: 'language used to persuade, sometimes without real substance', e: "Behind the rhetoric, the plan has no budget.", ru: 'риторика' }
    ]},
    { id: 'g', type: 'grammar', title: 'Inversion for emphasis',
      rule: "<p>After a negative or limiting expression at the start of a sentence, the auxiliary comes <b>before</b> the subject (like a question). This sounds formal and emphatic.</p><table><tr><td><b>Never</b> have I…</td><td><b>Never have I</b> heard such a weak argument.</td></tr><tr><td><b>Not only</b> … but also</td><td><b>Not only did she</b> win, but she also broke the record.</td></tr><tr><td><b>Rarely / Seldom</b></td><td><b>Rarely do</b> politicians admit mistakes.</td></tr><tr><td><b>Only when / Only after</b></td><td><b>Only when</b> we saw the data <b>did we</b> understand.</td></tr><tr><td><b>Under no circumstances</b></td><td><b>Under no circumstances should</b> you share this.</td></tr></table>",
      ex: [
        { t: 'mc', q: 'Never ___ such a compelling speech.', o: ['I have heard', 'have I heard', 'I heard'], a: 1 },
        { t: 'mc', q: 'Not only ___ late, but he also forgot the slides.', o: ['he was', 'was he', 'did he'], a: 1 },
        { t: 'gap', q: 'Rarely ___ (do) people change their minds after one debate.', a: ['do'] },
        { t: 'mc', q: 'Only after the vote ___ the truth.', o: ['we learned', 'did we learn', 'we did learn'], a: 1 },
        { t: 'mc', q: 'Under no circumstances ___ the door.', o: ['you should open', 'should you open', 'open you'], a: 1 },
        { t: 'order', a: 'Seldom have I seen such a weak argument.' }
      ]},
    { id: 'r', type: 'reading', title: "Why facts don't always win", photo: '/media/spaces/lab-4.webp', alt: 'A presentation in the IF Business Lab',
      text: "It seems logical that the most accurate argument should win a debate. Yet research in psychology suggests otherwise. When people hold a belief that is tied to their identity — their politics, their religion, even their favourite football club — contradicting evidence can sometimes make them hold the belief more firmly, not less.\n\nThis does not mean that facts are useless, but that the way they are delivered matters enormously. Persuaders who begin by attacking the other side tend to trigger defensiveness. By contrast, those who concede a point first, acknowledge the nuance of the issue, and frame their evidence in terms of shared values are far more likely to sway an audience.\n\nCredibility, too, is earned rather than claimed. A speaker who openly addresses the strongest counterargument appears more trustworthy than one who ignores it. Empty rhetoric may impress in the moment, but it is easily undermined by a single well-chosen question.",
      ex: [
        { t: 'mc', q: 'What does the research suggest about beliefs linked to identity?', o: ['They change quickly when facts are shown.', 'Contradicting evidence can strengthen them.', 'They are always based on facts.'], a: 1 },
        { t: 'tf', q: 'The writer argues that facts are useless in debates.', a: false },
        { t: 'mc', q: 'Which strategy is described as effective?', o: ['attacking the other side first', 'conceding a point and appealing to shared values', 'avoiding all counterarguments'], a: 1 },
        { t: 'mc', q: '"Credibility is earned rather than claimed" means…', o: ['you become credible through what you do', 'credible people earn more money', 'you should tell people you are credible'], a: 0 },
        { t: 'mc', q: 'The tone of the text is best described as…', o: ['angry', 'analytical', 'humorous'], a: 1 }
      ]},
    { id: 'c', type: 'check', title: 'Unit check', ex: [
      { t: 'mc', q: 'His constant jokes ___ his serious message.', o: ['undermined', 'conceded', 'swayed'], a: 0 },
      { t: 'mc', q: 'Not until the end ___ the real reason.', o: ['did she reveal', 'she revealed', 'revealed she'], a: 0 },
      { t: 'gap', q: 'Little ___ (do) they know what was coming.', a: ['did'] },
      { t: 'mc', q: 'A subtle difference in meaning is a…', o: ['rhetoric', 'nuance', 'concession'], a: 1 },
      { t: 'order', a: 'Never have I been so convinced by a speech.' },
      { t: 'match', p: [['concede', 'admit unwillingly'], ['sway', 'influence an opinion'], ['credible', 'believable'], ['compelling', 'very convincing']] }
    ]}
  ]},
  { id: 'u2', title: 'Work in the age of AI', topic: 'Future of work', lessons: [
    { id: 'v', type: 'vocab', title: 'Automation and careers', words: [
      { w: 'automation', p: 'noun', d: 'the use of machines or software to do work people used to do', e: "Automation has changed banking completely.", ru: 'автоматизация' },
      { w: 'obsolete', p: 'adjective', d: 'no longer used because something better exists', e: "Some skills become obsolete within ten years.", ru: 'устаревший' },
      { w: 'upskill', p: 'verb', d: 'to learn new skills, especially for work', e: "The company paid for staff to upskill in data analysis.", ru: 'повышать квалификацию' },
      { w: 'redundant', p: 'adjective', d: 'having lost your job because it is no longer needed', e: "Two hundred workers were made redundant.", ru: 'сокращённый' },
      { w: 'gig economy', p: 'noun', d: 'work made of short, separate jobs rather than one permanent job', e: "Delivery drivers are part of the gig economy.", ru: 'гиг-экономика' },
      { w: 'adapt', p: 'verb', d: 'to change in order to deal with a new situation', e: "Workers who adapt quickly will do best.", ru: 'адаптироваться' },
      { w: 'safety net', p: 'noun', d: 'support that protects people when things go wrong', e: "Freelancers often have no safety net.", ru: 'подушка безопасности' },
      { w: 'foresee', p: 'verb', d: 'to know that something will happen before it does', e: "Few people foresaw how fast AI would develop.", ru: 'предвидеть' }
    ]},
    { id: 'g', type: 'grammar', title: 'Mixed conditionals',
      rule: "<p>Mixed conditionals connect different times.</p><table><tr><td><b>past → present</b><br>If + past perfect, would + infinitive</td><td>If I <b>had studied</b> IT, I <b>would be</b> earning more now.</td></tr><tr><td><b>present → past</b><br>If + past simple, would have + past participle</td><td>If she <b>weren't</b> so organised, she <b>would have missed</b> the deadline.</td></tr></table><p>Also: <b>But for</b> + noun = if it weren't / hadn't been for — <i>But for</i> the training, I'd be lost.</p>",
      ex: [
        { t: 'mc', q: 'If I had learned to code at school, I ___ a different job now.', o: ['would have', 'would have had', 'had'], a: 0 },
        { t: 'mc', q: "If he weren't so stubborn, he ___ the offer last week.", o: ['would accept', 'would have accepted', 'accepted'], a: 1 },
        { t: 'gap', q: "If they ___ (not / automate) the factory, those workers would still have jobs.", a: ["hadn't automated", 'had not automated'] },
        { t: 'mc', q: '___ your help, I would still be looking for work.', o: ['But for', 'Unless', 'Even if'], a: 0 },
        { t: 'order', a: 'If I had upskilled earlier, I would be safer now.' }
      ]},
    { id: 'r', type: 'reading', title: 'Not the end of work — the end of jobs as we know them', photo: '/media/spaces/lab-1.webp', alt: 'A meeting in a modern office',
      text: "Each wave of technology has produced the same fear: that machines will leave millions without work. The fear has never been entirely wrong, but it has rarely been entirely right. Automation tends to destroy specific tasks rather than whole professions, and it creates new roles that nobody foresaw — who in 2005 imagined a career as an app developer or a social media manager?\n\nWhat is different now is the speed. Skills that once lasted a career may become obsolete within a decade, and the workers most at risk are not only those in factories but also clerks, translators and junior analysts. Those who can adapt and upskill repeatedly will thrive; those who cannot may find themselves made redundant or pushed into the insecure gig economy.\n\nMany economists therefore argue that the real challenge is political, not technical. Had governments invested earlier in adult education, the transition would be less painful today. A modern safety net, they suggest, should protect people between jobs, not just protect jobs themselves.",
      ex: [
        { t: 'mc', q: 'According to the text, automation usually…', o: ['destroys whole professions', 'replaces particular tasks', 'creates no new jobs'], a: 1 },
        { t: 'mc', q: 'What is described as new about the current situation?', o: ['the fear of machines', 'the speed of change', 'the end of factories'], a: 1 },
        { t: 'tf', q: 'The writer suggests that office workers are safe from automation.', a: false },
        { t: 'mc', q: '"Had governments invested earlier…" is an example of…', o: ['a mixed conditional with inversion', 'reported speech', 'the passive'], a: 0 },
        { t: 'mc', q: 'What kind of safety net do economists recommend?', o: ['one that protects specific jobs', 'one that supports people between jobs', 'one only for factory workers'], a: 1 }
      ]},
    { id: 'c', type: 'check', title: 'Unit check', ex: [
      { t: 'mc', q: 'Fax machines are now almost…', o: ['obsolete', 'redundant', 'credible'], a: 0 },
      { t: 'mc', q: "If I'd taken that job, I ___ in London now.", o: ['would live', 'would be living', 'would have lived'], a: 1 },
      { t: 'gap', q: "If she ___ (be) more confident, she would have applied.", a: ['were', 'was'] },
      { t: 'mc', q: 'Short freelance jobs are part of the…', o: ['gig economy', 'safety net', 'automation'], a: 0 },
      { t: 'order', a: 'Few people could have foreseen such rapid change.' },
      { t: 'match', p: [['upskill', 'learn new work skills'], ['adapt', 'change for a new situation'], ['redundant', 'lost a job that is no longer needed'], ['foresee', 'know before it happens']] }
    ]}
  ]}
  ]
});
