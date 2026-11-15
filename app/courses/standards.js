/* IF English — standards map.
   Every course is referenced to the CEFR Companion Volume (Council of Europe, 2020), which describes language as
   reception, production, interaction and mediation; IELTS to the current test format and the public band descriptors;
   Business English to the CEFR applied to work contexts; young learners to the Cambridge English Pre A1–A2 framework.
   Each unit carries one "can-do" goal written in CEFR style. */
(function () {
  var CV = 'CEFR Companion Volume (Council of Europe, 2020)';
  var LV = {
    A1: 'Basic user — can interact in a simple way on familiar, everyday topics.',
    A2: 'Basic user — can handle short exchanges about routine matters and immediate needs.',
    B1: 'Independent user — can deal with most everyday situations and describe experiences, plans and opinions.',
    B2: 'Independent user — can interact with fluency and spontaneity and argue a point of view.',
    C1: 'Proficient user — can use language flexibly and effectively for social, academic and professional purposes.',
    C2: 'Proficient user — can understand virtually everything and express themselves with precision and nuance.'
  };
  var MODES = ['Reception', 'Production', 'Interaction', 'Mediation'];
  var C = {
    'ge-a1': { ref: CV, level: 'A1', modes: MODES },
    'ge-a2': { ref: CV, level: 'A2', modes: MODES },
    'ge-b1': { ref: CV, level: 'B1', modes: MODES },
    'ge-b2': { ref: CV, level: 'B2', modes: MODES },
    'ge-c1': { ref: CV, level: 'C1', modes: MODES },
    'ge-c2': { ref: CV, level: 'C2', modes: MODES },
    'ef-c2': { ref: CV, level: 'C2', modes: MODES },
    'gr-a1': { ref: CV + ' — Grammatical accuracy scale', level: 'A1', modes: ['Linguistic competence'] },
    'be-a2': { ref: CV + ', applied to work contexts', level: 'A2', modes: ['Workplace reception', 'Workplace interaction', 'Business writing'] },
    'be-b1': { ref: CV + ', applied to work contexts', level: 'B1', modes: ['Workplace reception', 'Workplace interaction', 'Business writing'] },
    'be-b2': { ref: CV + ', applied to work contexts', level: 'B2', modes: ['Workplace reception', 'Workplace interaction', 'Business writing', 'Mediation'] },
    'be-c1': { ref: CV + ', applied to work contexts', level: 'C1', modes: ['Workplace reception', 'Workplace interaction', 'Business writing', 'Mediation'] },
    ielts: { ref: 'IELTS Academic & General Training — current test format and public band descriptors (Writing & Speaking descriptors updated 2023)', level: 'B1–C1 · Band 5.5 → 7+', desc: 'Writing is assessed on Task Achievement/Response, Coherence & Cohesion, Lexical Resource and Grammatical Range & Accuracy; Speaking on Fluency & Coherence, Lexical Resource, Grammatical Range & Accuracy and Pronunciation.', modes: ['Listening', 'Reading', 'Writing', 'Speaking'] },
    'yl-starters': { ref: 'Cambridge English Pre A1 Starters — young learners framework', level: 'Pre A1', desc: 'Can understand and use familiar words and very simple phrases with picture support.', modes: ['Listening', 'Reading & writing', 'Speaking'] }
  };

  var U = {
    'ge-a1': ['introduce myself and others and ask simple personal questions.', 'talk about my family and describe my home.', 'describe my daily routine and say what time things happen.', 'buy food in a shop or market and ask about prices and quantities.', 'ask for and give simple directions in a town.', 'say what I can and can\'t do and talk about my free time.', 'describe what people are wearing and doing right now and talk about the weather.', 'say what I did last weekend using simple past forms.'],
    'ge-a2': ['describe my daily life and habits in some detail.', 'order food in a café and talk about what I like eating.', 'talk about travel and holidays and make simple travel arrangements.', 'tell a simple story about past events in sequence.', 'talk about plans, intentions and predictions.', 'compare places and say which I prefer and why.', 'ask and talk about life experiences.', 'describe a health problem and understand simple advice.'],
    'ge-b1': ['talk about work and balance in my life and give reasons for my opinions.', 'discuss the role of technology in daily life.', 'describe relationships and how they change over time.', 'talk about money, saving and spending and make conditions.', 'discuss rules, obligation and learning experiences.', 'understand and give advice on a healthy lifestyle.', 'narrate events using past tenses and follow a mystery story.', 'understand the main points of a talk on the environment and describe processes using the passive.'],
    'ge-b2': ['discuss habits and lifestyle change with fluency.', 'evaluate news stories and distinguish fact from opinion.', 'talk in detail about careers and professional choices.', 'talk about imaginary situations, wishes and dreams.', 'express regret and speculate about alternative pasts.', 'give and justify opinions about films, books and the arts.', 'speculate about causes of unexplained events using modal verbs.', 'report what others said and retell a travel story.'],
    'ge-c1': ['build and recognise persuasive arguments.', 'discuss how AI is changing work, with precise and nuanced language.', 'understand extended talks on health and psychology and summarise them.', 'present a vision of the future and discuss its risks.', 'debate questions of fairness, conceding and counter-arguing.', 'reflect on how language can be misunderstood and check understanding diplomatically.', 'discuss risk and decision-making using a wide range of structures.', 'critically assess media sources and explain how misinformation spreads.'],
    'ge-c2': ['use idiomatic language precisely and recognise fine shades of meaning.', 'discuss language and identity with sophistication.', 'debate complex ethical questions about technology.', 'understand and produce well-structured academic argument.', 'appreciate and use irony, understatement and humour.', 'discuss success and ambition with nuance and precision.', 'follow a specialised report and summarise it for a non-expert (mediation).', 'discuss the future with appropriate hedging and stance.'],
    'ef-c2': ['talk about motivation and family relationships with precision.', 'narrate challenges and adventures vividly.', 'discuss age, literature and culture in depth.', 'debate gender and work-life questions.', 'express a wide range of emotions and cross-cultural experiences.', 'discuss technology and numbers with idiomatic accuracy.', 'speculate and deduce in detective-style narratives.', 'describe food, perception and art with nuanced vocabulary.'],
    'gr-a1': ['ask and answer questions with be.', 'use a/an, plurals and this, that, these, those correctly.', 'give simple instructions and make suggestions with let\'s.', 'use the present simple with I, you, we and they.', 'use the present simple with he, she and it.', 'say how often I do things.', 'talk about ability with can and can\'t.', 'describe places with there is / there are, some and any.', 'show possession with \'s and ask with whose.', 'use object pronouns correctly.', 'talk about likes and dislikes with -ing.', 'describe actions happening now.', 'choose between the present simple and present continuous.', 'talk about the past with was and were.', 'use regular verbs in the past simple.', 'use irregular past verbs, negatives and questions.', 'talk about plans with be going to.', 'use prepositions of time and place correctly.'],
    'be-a2': ['describe my job and workplace in simple terms.', 'make and take simple phone calls and write short work emails.', 'describe a company and its products.', 'handle travel situations: hotels, transport and arrangements.', 'arrange and rearrange meetings and talk about deadlines.', 'deal with a simple customer complaint politely.'],
    'be-b1': ['take part in routine meetings and give my opinion.', 'write clear emails to customers and respond to requests.', 'answer common interview questions about my experience and strengths.', 'describe a product and discuss how to promote it.', 'manage phone and video calls, including checking and clarifying.', 'welcome and look after visiting clients appropriately.'],
    'be-b2': ['negotiate a deal, make concessions and reach agreement.', 'present results clearly using figures and visuals.', 'discuss recruitment options and justify a decision.', 'describe financial trends and interpret figures accurately.', 'discuss corporate responsibility and evaluate green claims.', 'respond to a crisis with clear, transparent communication.'],
    'be-c1': ['discuss leadership styles and give constructive feedback.', 'analyse strategy and assess risk in a discussion.', 'debate innovation and disruption, conceding and pushing back.', 'evaluate the case for a merger, weighing financial and cultural factors.', 'adapt my communication to different cultural expectations (mediation).', 'deliver a concise, persuasive pitch and handle tough questions.'],
    ielts: ['describe trends in a graph accurately (Writing Task 1, Band 6.5+ target).', 'plan and write a clear opinion essay with a consistent position (Writing Task 2).', 'distinguish True, False and Not Given in Academic reading.', 'note specific details from a Section 1 conversation — names, numbers and dates.', 'speak for two minutes on a cue card with organised ideas (Speaking Part 2).', 'discuss both views and give my opinion in a balanced essay (Writing Task 2).', 'match headings to paragraphs by identifying the main idea.', 'describe a process or changes on a map using the passive and sequencing (Writing Task 1).'],
    'yl-starters': ['name and recognise common animals.', 'name and recognise common foods.', 'name and recognise toys and say what I have.']
  };

  window.IFStd = {
    LV: LV,
    course: function (id) { var c = C[id]; if (!c) return null; return { ref: c.ref, level: c.level, desc: c.desc || LV[c.level] || '', modes: c.modes }; },
    unit: function (cid, uid) { var a = U[cid], i = parseInt(String(uid).replace(/\D/g, ''), 10) - 1; return a && a[i] ? 'I can ' + a[i] : ''; }
  };
})();
