/* English File Advanced Plus (C2) companion course: original IF Academy explanations, practice and listening,
   following the book's syllabus (Files 1–8, lessons A and B: the same grammar points, vocabulary topics and themes).
   No text or audio from the book is reproduced; use it alongside the Student's Book in class. */
(function () {
  var W = function (w, p, d, e, ru) { return { w: w, p: p, d: d, e: e, ru: ru }; };
  var mc = function (q, o, a, why) { var x = { t: 'mc', q: q, o: o, a: a }; if (why) x.why = why; return x; };
  var gap = function (q, a) { return { t: 'gap', q: q, a: a }; };
  var tf = function (q, a) { return { t: 'tf', q: q, a: a }; };
  var order = function (a) { return { t: 'order', a: a }; };
  var f = function (s, t) { return { s: s, g: 'f', t: t }; }, m = function (s, t) { return { s: s, g: 'm', t: t }; };
  var G = function (id, title, rule, ex) { return { id: id, type: 'grammar', title: title, rule: rule, ex: ex }; };
  var V = function (id, title, words) { return { id: id, type: 'vocab', title: title, words: words }; };
  var L = function (title, intro, script, ex) { return { id: 'li', type: 'listen', title: title, intro: intro, script: script, ex: ex }; };
  var C = function (ex) { return { id: 'c', type: 'check', title: 'Revise and check', ex: ex }; };

  IFX.course({
    id: 'ef-c2', track: 'general', level: 'C2', next: null, icon: '📕', book: 'ef-c2',
    title: 'English File Advanced Plus (C2)', sub: 'The C2 coursebook, File by File',
    blurb: 'All eight Files of English File Advanced Plus: every grammar point, the vocabulary topics, listening with British voices and a check after each File.',
    units: [
    /* ---------------- File 1 ---------------- */
    { id: 'u1', title: 'File 1 · Motivation; The parent trap', topic: 'File 1', lessons: [
      G('ga', '1A · Modal verbs (1): will, would, should',
        "<p>At C2, <b>will</b>, <b>would</b> and <b>should</b> do much more than talk about the future.</p><table>" +
        "<tr><td><b>will</b> — typical behaviour, annoying habits</td><td>She <b>will</b> sit for hours without saying a word. · He <b>will</b> keep interrupting! (stressed = irritation)</td></tr>" +
        "<tr><td><b>will</b> — deduction about now</td><td>That'<b>ll</b> be the courier. (I'm fairly sure)</td></tr>" +
        "<tr><td><b>would</b> — past habits, past refusal</td><td>As a child I <b>would</b> read under the covers. · The car <b>wouldn't</b> start.</td></tr>" +
        "<tr><td><b>would</b> — softening opinions</td><td>I <b>would</b> imagine / I'<b>d</b> say it's too late.</td></tr>" +
        "<tr><td><b>should</b> — expectation, probability</td><td>The results <b>should</b> be out by Friday.</td></tr>" +
        "<tr><td><b>should</b> — after <i>if</i>/<i>in case</i> (formal), subjunctive use</td><td><b>Should</b> you need help, call me. · It's vital that he <b>should</b> be told.</td></tr></table>",
        [mc('My flatmate ___ leave the lights on — it drives me mad!', ['would', 'will', 'should'], 1, 'Stressed will = an irritating habit now.'),
         mc('When we were kids, Dad ___ take us fishing every Sunday.', ['would', 'will', 'should'], 0),
         mc('Someone at the door? That ___ be Aidos — he said he\'d come at six.', ['would', 'will', 'should'], 1),
         gap('___ you require further information, do not hesitate to contact us.', ['Should']),
         mc('I ___ say that the plan is a little ambitious. (polite opinion)', ['will', 'would', 'should'], 1),
         order('The parcel should arrive by the end of the week.')]),
      V('va', '1A · Vague language', [
        W('or so', 'phrase', 'approximately; about', 'There were fifty or so people at the meeting.', 'примерно'),
        W('-ish', 'suffix', 'added to numbers, times or adjectives to mean "approximately" or "fairly"', "Let's meet at sevenish. The walls are a greenish colour.", 'около; -ватый'),
        W('give or take', 'phrase', 'plus or minus a small amount', 'It takes two hours, give or take ten minutes.', 'плюс-минус'),
        W('and so on', 'phrase', 'and other similar things', 'We discussed budgets, deadlines and so on.', 'и так далее'),
        W('sort of', 'phrase', 'to some degree; in a way (informal)', "I sort of understand what she means.", 'вроде как'),
        W('stuff', 'noun', 'things in general, used when the exact name is not important', 'Leave your stuff in the hall.', 'вещи, всякое'),
        W('loads of', 'phrase', 'a large amount or number of (informal)', "She's got loads of ideas.", 'куча, масса'),
        W('whatsit', 'noun', 'a word used for a thing whose name you have forgotten', 'Pass me the whatsit — the thing for opening tins.', 'штуковина')]),
      G('gb', '1B · Noun phrases',
        "<p>Advanced writing packs a lot of information into the <b>noun phrase</b>.</p><table>" +
        "<tr><td>compound nouns</td><td>a <b>parenting</b> style, <b>screen-time</b> limits</td></tr>" +
        "<tr><td>noun + preposition phrase</td><td>a fear <b>of failure</b>, the role <b>of grandparents</b></td></tr>" +
        "<tr><td>noun + participle</td><td>children <b>raised</b> abroad, parents <b>working</b> long hours</td></tr>" +
        "<tr><td>noun + to-infinitive</td><td>the decision <b>to move</b>, an attempt <b>to help</b></td></tr>" +
        "<tr><td>possessive 's vs of</td><td><b>the children's</b> needs (people) · <b>the end of</b> the film (things)</td></tr>" +
        "<tr><td>hyphenated compound adjectives</td><td>a <b>ten-year-old</b> boy, a <b>well-meaning</b> parent</td></tr></table>",
        [mc('Choose the most natural noun phrase.', ['a boy who is ten years old', 'a ten-year-old boy', 'a ten-years-old boy'], 1),
         mc('Parents ___ long hours often feel guilty.', ['work', 'working', 'worked'], 1),
         mc('Choose the correct form.', ["the film's end", 'the end of the film'], 1, 'For things, of is usually more natural.'),
         gap('Her decision ___ (leave) the company surprised everyone.', ['to leave']),
         mc('Children ___ in two languages often code-switch.', ['raising', 'raised', 'raise'], 1),
         order('The role of grandparents is often overlooked.')]),
      V('vb', '1B · Phrasal nouns', [
        W('upbringing', 'noun', 'the way a child is cared for and taught while growing up', 'She had a strict upbringing.', 'воспитание'),
        W('outcome', 'noun', 'the result of an action or process', 'The outcome of the case is uncertain.', 'исход'),
        W('breakdown', 'noun', 'a failure of a relationship, system or machine; a list of details', 'a breakdown in communication · a breakdown of costs', 'срыв; разбивка'),
        W('drawback', 'noun', 'a disadvantage', 'The main drawback is the price.', 'недостаток'),
        W('setback', 'noun', 'a problem that delays progress', 'Losing the funding was a serious setback.', 'неудача'),
        W('outburst', 'noun', 'a sudden expression of strong emotion', 'Her angry outburst shocked the class.', 'вспышка'),
        W('feedback', 'noun', 'comments on how well someone has done something', 'Thanks for the helpful feedback.', 'отзыв'),
        W('turnout', 'noun', 'the number of people who come to an event or vote', 'Turnout was higher than expected.', 'явка')]),
      L('A coach on what really motivates us', 'A podcast interview with a performance coach.', [
        f('Host', "You've coached athletes and executives. What separates people who keep going from those who give up?"),
        m('Coach', "Honestly? It's rarely talent. People who last tend to have a reason that's bigger than the result — they'll train in the rain because they love the process, not the medal."),
        f('Host', "So rewards don't work?"),
        m('Coach', "They work for routine tasks. But for anything creative, research suggests that big external rewards can actually reduce motivation. People start doing it for the prize, and when the prize goes, so does the drive."),
        f('Host', "What would you say to a student who's lost interest in English, say?"),
        m('Coach', "I'd ask them to find a small win every day — one film scene understood, one conversation without switching languages. Progress you can see is the most underrated motivator there is.")
      ], [
        mc('According to the coach, people who keep going usually…', ['are more talented', 'have a deeper reason than the result', 'want bigger rewards'], 1),
        mc('When do external rewards work well?', ['for creative tasks', 'for routine tasks', 'never'], 1),
        tf('The coach thinks big prizes always increase motivation.', false),
        mc('What does he recommend for a demotivated student?', ['a long holiday', 'small daily wins', 'a stricter teacher'], 1)
      ]),
      C([mc('He ___ insist on paying for everyone, even when he\'s broke.', ['will', 'should', 'would'], 0),
         gap('___ the flight be delayed, we will rebook you free of charge.', ['Should']),
         mc('A disadvantage is a…', ['drawback', 'turnout', 'outburst'], 0),
         mc('Choose the best noun phrase.', ['a parent well-meaning', 'a well-meaning parent'], 1),
         gap("There were thirty ___ so people there.", ['or'])])
    ]},
    /* ---------------- File 2 ---------------- */
    { id: 'u2', title: 'File 2 · Overcoming adversity; A big adventure', topic: 'File 2', lessons: [
      G('ga', '2A · Modal verbs (2): can, could, be able to, may, might',
        "<table><tr><td><b>can / could</b> — ability, general possibility</td><td>Stress <b>can</b> affect your sleep. · It <b>could</b> get cold at night.</td></tr>" +
        "<tr><td><b>was able to / managed to</b> — a specific past success</td><td>The climbers <b>were able to</b> reach the summit. (not <s>could</s>)</td></tr>" +
        "<tr><td><b>couldn't</b> — past inability (general or specific)</td><td>We <b>couldn't</b> find a way down.</td></tr>" +
        "<tr><td><b>may / might / could have</b> + past participle — speculation about the past</td><td>She <b>might have</b> missed the bus.</td></tr>" +
        "<tr><td><b>could have</b> — unrealised possibility, criticism</td><td>You <b>could have</b> told me!</td></tr>" +
        "<tr><td><b>may well / might well / could well</b> — strong likelihood</td><td>Prices <b>may well</b> rise again.</td></tr>" +
        "<tr><td><b>might as well</b> — no better alternative</td><td>The last bus has gone; we <b>might as well</b> walk.</td></tr></table>",
        [mc('After six hours, the rescuers ___ reach the injured climber.', ['could', 'were able to', 'can'], 1, 'A specific past success: was/were able to or managed to.'),
         mc('You ___ have warned me about the exam — I had no idea!', ['could', 'may', 'can'], 0),
         mc('There\'s nothing on TV. We ___ as well go to bed.', ['might', 'can', 'could have'], 0),
         gap('She isn\'t answering. She ___ have left her phone at home. (possibility)', ['may', 'might', 'could']),
         mc('Inflation ___ well rise again next year.', ['can', 'may', 'is able to'], 1),
         order('They managed to finish the race despite the injury.')]),
      V('va', '2A · Prefixes and suffixes', [
        W('overcome', 'verb', 'to succeed in dealing with a difficulty', 'She overcame her fear of flying.', 'преодолеть'),
        W('underestimate', 'verb', 'to think something is smaller or less important than it is', "Don't underestimate the challenge.", 'недооценивать'),
        W('misjudge', 'verb', 'to form a wrong opinion about someone or something', 'I misjudged the distance.', 'неверно оценить'),
        W('resilience', 'noun', 'the ability to recover quickly from difficulties', 'Children show remarkable resilience.', 'стойкость'),
        W('foolproof', 'adjective', '(-proof) so simple it cannot go wrong; compare waterproof, soundproof', 'There is no foolproof plan.', 'надёжный, безотказный'),
        W('outlive', 'verb', 'to live longer than someone or something', 'The idea outlived its inventor.', 'пережить'),
        W('powerless', 'adjective', 'without the ability or power to act', 'We felt powerless to help.', 'бессильный'),
        W('hopeful', 'adjective', 'believing that something good will happen', 'Doctors are hopeful about her recovery.', 'полный надежд')]),
      G('gb', '2B · Participle clauses',
        "<p>Participle clauses add information concisely, especially in narratives. The subject is usually the same as in the main clause.</p><table>" +
        "<tr><td>-ing — actions at the same time / reason</td><td><b>Walking</b> along the ridge, we saw an eagle. · <b>Feeling</b> exhausted, he stopped.</td></tr>" +
        "<tr><td>having + past participle — an earlier action</td><td><b>Having crossed</b> the desert, they rested for a week.</td></tr>" +
        "<tr><td>past participle — passive meaning</td><td><b>Exhausted</b> by the climb, she fell asleep.</td></tr>" +
        "<tr><td>after conjunctions</td><td><b>Before setting off</b>, check the weather. · <b>When asked</b>, he refused.</td></tr>" +
        "<tr><td>reduced relatives</td><td>The path <b>leading</b> to the lake was closed.</td></tr></table>",
        [mc('___ the summit, they took photos and started down.', ['Reaching', 'Having reached', 'Reached'], 1),
         mc('___ by the storm, the hikers sheltered in a cave.', ['Surprising', 'Surprised', 'Having surprised'], 1),
         gap('Before ___ (set) off, make sure your phone is charged.', ['setting']),
         mc('Which sentence is correct?', ['Walking to the station, it started to rain.', 'Walking to the station, I got caught in the rain.'], 1),
         mc('The road ___ to the village was blocked by snow.', ['leads', 'leading', 'led'], 1),
         order('Having lost the map, they followed the river.')]),
      V('vb', '2B · Ways of moving', [
        W('stagger', 'verb', 'to walk with weak, unsteady steps', 'He staggered to the door.', 'шататься'),
        W('trudge', 'verb', 'to walk slowly and heavily because you are tired', 'We trudged through the snow.', 'тащиться'),
        W('stroll', 'verb', 'to walk in a slow, relaxed way', 'They strolled along the river.', 'прогуливаться'),
        W('dash', 'verb', 'to run somewhere very quickly', 'I dashed to catch the bus.', 'мчаться'),
        W('crawl', 'verb', 'to move on your hands and knees', 'The baby crawled across the floor.', 'ползти'),
        W('limp', 'verb', 'to walk with difficulty because one leg is hurt', 'She limped off the pitch.', 'хромать'),
        W('wander', 'verb', 'to walk around slowly without a clear direction', 'We wandered round the old town.', 'бродить'),
        W('scramble', 'verb', 'to climb or move quickly using hands and feet', 'They scrambled up the rocks.', 'карабкаться')]),
      L('A cyclist\'s journey across Central Asia', 'A traveller describes the hardest day of her trip.', [
        m('Interviewer', "You cycled from Almaty to Istanbul. What was the toughest moment?"),
        f('Elena', "Day forty, in the desert. My back wheel broke, and having been warned there were no villages for eighty kilometres, I panicked."),
        m('Interviewer', "What did you do?"),
        f('Elena', "I pushed the bike — well, trudged, really — for six hours. Then a truck driver stopped. He couldn't speak English and I couldn't speak Turkmen, but we were able to fix the wheel together with wire."),
        m('Interviewer', "Would you do it again?"),
        f('Elena', "Absolutely. I might well have given up that day if he hadn't stopped. But that's what I learnt: you can't plan everything — sometimes strangers are the plan.")
      ], [
        mc('What happened on day forty?', ['She got lost.', 'Her back wheel broke.', 'She ran out of water.'], 1),
        mc('How did she move for six hours?', ['She cycled quickly.', 'She walked, pushing the bike.', 'She got a lift.'], 1),
        tf('Elena and the driver had a language in common.', false),
        mc('What lesson did she learn?', ['Always plan everything.', 'Strangers can be part of the solution.', 'Never travel alone.'], 1)
      ]),
      C([mc('The team ___ win the final despite injuries.', ['could', 'were able to', 'can'], 1),
         gap('___ (finish) the report, she sent it to her manager.', ['Having finished']),
         mc('To walk slowly and heavily because you\'re tired:', ['dash', 'trudge', 'stroll'], 1),
         mc('Prices ___ well go up again.', ['might', 'can', 'must'], 0),
         mc('The opposite of overestimate is…', ['misjudge', 'underestimate', 'outlive'], 1)])
    ]},
    /* ---------------- File 3 ---------------- */
    { id: 'u3', title: 'File 3 · Live your age; In love with Shakespeare', topic: 'File 3', lessons: [
      G('ga', '3A · Determiners: articles and quantifiers',
        "<table><tr><td>zero article — general plural/uncountable</td><td><b>Older people</b> tend to sleep less. · <b>Research</b> shows…</td></tr>" +
        "<tr><td><b>the</b> + adjective — groups</td><td><b>the elderly</b>, <b>the young</b>, <b>the unemployed</b></td></tr>" +
        "<tr><td><b>a / an</b> with uncountables in a specific sense</td><td><b>a</b> good education, <b>a</b> knowledge of history</td></tr>" +
        "<tr><td>quantifiers + of + the/possessive</td><td><b>most of the</b> participants, <b>none of my</b> friends</td></tr>" +
        "<tr><td>few / a few, little / a little</td><td><b>Few</b> people knew (= almost none). · <b>A few</b> people knew (= some).</td></tr>" +
        "<tr><td>every / each, either / neither</td><td><b>Each</b> participant was tested. · <b>Neither</b> result was significant.</td></tr></table>",
        [mc('___ elderly are often more satisfied with life than young adults.', ['The', 'An', '—'], 0),
         mc('___ research suggests that happiness rises after fifty.', ['A', 'The', '—'], 2),
         mc('Very ___ people realised the study had been flawed. (almost none)', ['few', 'a few', 'little'], 0),
         gap('___ of the two groups showed any improvement. (not one, not the other)', ['Neither']),
         mc('She has ___ excellent knowledge of statistics.', ['an', 'the', '—'], 0),
         order('Most of the participants were over sixty.')]),
      V('va', '3A · Research language', [
        W('findings', 'noun', 'the information discovered as the result of research', 'The findings were published last month.', 'результаты'),
        W('sample', 'noun', 'a group of people or things chosen to represent a larger group', 'The sample included 2,000 adults.', 'выборка'),
        W('significant', 'adjective', 'large enough to be important; (statistics) not likely to be by chance', 'There was a significant difference.', 'значимый'),
        W('correlation', 'noun', 'a connection between two things, not necessarily cause and effect', 'a strong correlation between sleep and mood', 'корреляция'),
        W('hypothesis', 'noun', 'an idea that is tested by research', 'The data supported the hypothesis.', 'гипотеза'),
        W('conduct', 'verb', 'to organise and carry out (research, a survey)', 'The study was conducted in five countries.', 'проводить'),
        W('flawed', 'adjective', 'having a mistake or weakness', 'The method was seriously flawed.', 'с изъяном'),
        W('peer-reviewed', 'adjective', 'checked by other experts before publication', 'a peer-reviewed journal', 'рецензируемый')]),
      G('gb', '3B · Word order',
        "<table><tr><td>fronting for emphasis</td><td><b>Strange</b> it may seem, but it's true. · <b>This</b> I cannot accept.</td></tr>" +
        "<tr><td>inversion after negative adverbials</td><td><b>Never had</b> the audience heard such language.</td></tr>" +
        "<tr><td>object + particle with pronouns</td><td>Turn <b>it</b> off. (not <s>turn off it</s>)</td></tr>" +
        "<tr><td>adverbs of frequency with modal/aux</td><td>He has <b>always</b> loved Shakespeare.</td></tr>" +
        "<tr><td>long objects moved to the end</td><td>She explained <b>to the class</b> what the play was really about.</td></tr>" +
        "<tr><td>indirect questions</td><td>Do you know <b>what time it starts</b>? (not <s>what time does it start</s>)</td></tr></table>",
        [mc('Choose the correct order.', ['Can you tell me where is the theatre?', 'Can you tell me where the theatre is?'], 1),
         mc('Choose the correct sentence.', ['Please put away it.', 'Please put it away.'], 1),
         mc('Rarely ___ a play so moving.', ['I have seen', 'have I seen', 'I saw'], 1),
         gap('She has ___ (always / admire) his sonnets.', ['always admired']),
         mc('Choose the more natural sentence.', ['He explained what the soliloquy meant to us.', 'He explained to us what the soliloquy meant.'], 1),
         order('Never had the audience heard such language.')]),
      V('vb', '3B · Idioms from Shakespeare', [
        W('break the ice', 'idiom', 'to make people feel more relaxed when they first meet', 'A quick game broke the ice.', 'растопить лёд'),
        W('wild-goose chase', 'idiom', 'a long, useless search', 'It was a wild-goose chase — the shop had closed years ago.', 'бесполезные поиски'),
        W('in a pickle', 'idiom', 'in a difficult situation', "I'm in a bit of a pickle — I've lost my keys.", 'в затруднении'),
        W('wear your heart on your sleeve', 'idiom', 'to show your feelings openly', 'He wears his heart on his sleeve.', 'не скрывать чувств'),
        W('a laughing stock', 'idiom', 'someone everyone laughs at', 'The decision made the club a laughing stock.', 'посмешище'),
        W('vanish into thin air', 'idiom', 'to disappear completely', 'The money seemed to vanish into thin air.', 'испариться'),
        W('the be-all and end-all', 'idiom', 'the most important thing', 'Exams are not the be-all and end-all.', 'самое главное'),
        W('green-eyed monster', 'idiom', 'jealousy', 'The green-eyed monster struck when she got promoted.', 'ревность')]),
      L('Do we really get happier with age?', 'Two researchers discuss a study on a radio science programme.', [
        f('Presenter', "Your study claims people become happier after their fifties. How big was the sample?"),
        m('Researcher', "Just over forty thousand adults in twelve countries, followed for ten years. The pattern is a U-shape: satisfaction dips in middle age and rises again."),
        f('Presenter', "Some critics say the finding is flawed — that unhappy people simply die earlier."),
        m('Researcher', "That's a fair point, and we did control for health. The correlation remained significant even among people in good health."),
        f('Presenter', "So what explains it?"),
        m('Researcher', "We can't be certain — correlation isn't causation. But a likely factor is expectations: older people tend to compare themselves less with others.")
      ], [
        mc('How many adults were in the study?', ['about 4,000', 'just over 40,000', '400,000'], 1),
        mc('What shape describes the pattern?', ['a straight line', 'a U-shape', 'a peak in middle age'], 1),
        tf('The researcher completely rejects the critics\' point.', false),
        mc('What factor does he suggest?', ['better health', 'lower expectations / less comparison', 'more money'], 1)
      ]),
      C([mc('___ unemployed need more support.', ['—', 'The', 'An'], 1),
         gap('Can you tell me where the station ___?', ['is']),
         mc('A long, useless search is a…', ['wild-goose chase', 'laughing stock', 'pickle'], 0),
         mc('A connection between two things is a…', ['hypothesis', 'correlation', 'sample'], 1),
         order('Very few people noticed the mistake.')])
    ]},
    /* ---------------- File 4 ---------------- */
    { id: 'u4', title: 'File 4 · No more boys and girls; Live to work?', topic: 'File 4', lessons: [
      G('ga', '4A · Cause and effect',
        "<table><tr><td>verbs</td><td>Toy marketing <b>leads to</b> / <b>results in</b> / <b>gives rise to</b> stereotypes. · Stereotypes <b>stem from</b> / <b>arise from</b> early experiences.</td></tr>" +
        "<tr><td>nouns</td><td>The <b>root cause</b> of… · a <b>consequence</b> of… · <b>has an impact on</b>…</td></tr>" +
        "<tr><td>linkers</td><td><b>Owing to</b> / <b>due to</b> + noun · <b>consequently</b>, <b>as a result</b>, <b>thereby</b> + -ing</td></tr>" +
        "<tr><td>trigger / bring about / prompt</td><td>The report <b>prompted</b> a debate. · The law <b>brought about</b> real change.</td></tr></table>" +
        "<p>Note: <i>result <b>in</b></i> (cause → effect) but <i>result <b>from</b></i> (effect ← cause).</p>",
        [mc('Gender stereotypes often stem ___ the toys children play with.', ['to', 'from', 'in'], 1),
         mc('The campaign resulted ___ a 20% rise in applications.', ['from', 'in', 'to'], 1),
         gap('The match was cancelled ___ to heavy rain.', ['due', 'owing']),
         mc('The new policy ___ about a major change in hiring.', ['brought', 'led', 'gave'], 0),
         mc('They lowered prices, ___ attracting new customers.', ['thereby', 'owing to', 'due'], 0),
         order('The report prompted a national debate.')]),
      V('va', '4A · Binomials', [
        W('pros and cons', 'binomial', 'advantages and disadvantages', 'We weighed up the pros and cons.', 'за и против'),
        W('by and large', 'binomial', 'generally; on the whole', 'By and large, the plan worked.', 'в целом'),
        W('sick and tired', 'binomial', 'very annoyed and bored with something', "I'm sick and tired of excuses.", 'сыт по горло'),
        W('safe and sound', 'binomial', 'not hurt or damaged', 'They arrived home safe and sound.', 'цел и невредим'),
        W('peace and quiet', 'binomial', 'a calm, quiet situation', 'I need some peace and quiet.', 'тишина и покой'),
        W('odds and ends', 'binomial', 'small things of different kinds', 'a drawer full of odds and ends', 'всякая всячина'),
        W('give and take', 'binomial', 'willingness to compromise', 'Every relationship needs give and take.', 'взаимные уступки'),
        W('first and foremost', 'binomial', 'most importantly', 'First and foremost, stay calm.', 'прежде всего')]),
      G('gb', '4B · Aspect: perfect and continuous tenses',
        "<p><b>Perfect</b> aspect looks back from a point (completion, result, time up to now). <b>Continuous</b> aspect shows activity in progress, duration or temporariness.</p><table>" +
        "<tr><td>present perfect simple — result, number</td><td>I'<b>ve answered</b> forty emails today.</td></tr>" +
        "<tr><td>present perfect continuous — activity, duration</td><td>I'<b>ve been answering</b> emails all morning.</td></tr>" +
        "<tr><td>past perfect continuous — background duration</td><td>She <b>had been working</b> there for years when she quit.</td></tr>" +
        "<tr><td>future perfect / future continuous</td><td>By 2030 I'<b>ll have paid</b> off the loan. · This time tomorrow I'<b>ll be flying</b>.</td></tr>" +
        "<tr><td>stative verbs rarely continuous</td><td>I'<b>ve known</b> him for years. (not <s>been knowing</s>)</td></tr></table>",
        [mc('I\'m exhausted — I ___ all day.', ['have worked', 'have been working', 'worked'], 1),
         mc('She ___ three reports this week.', ['has written', 'has been writing', 'wrote'], 0),
         gap('By the end of the year, we ___ (open) five new offices.', ['will have opened', "'ll have opened"]),
         mc('They ___ each other since university.', ['have known', 'have been knowing', 'know'], 0),
         mc('He ___ overtime for months before he burnt out.', ['had worked', 'had been working', 'was working'], 1),
         order('This time next week I will be lying on a beach.')]),
      V('vb', '4B · Acronyms and initialisms', [
        W('CEO', 'initialism', 'chief executive officer — the head of a company', 'The CEO announced a four-day week.', 'генеральный директор'),
        W('HR', 'initialism', 'human resources — the department that deals with staff', 'Talk to HR about your contract.', 'отдел кадров'),
        W('ASAP', 'acronym', 'as soon as possible', 'Please reply ASAP.', 'как можно скорее'),
        W('FAQ', 'initialism', 'frequently asked questions', 'Check the FAQ page first.', 'частые вопросы'),
        W('KPI', 'initialism', 'key performance indicator — a measure of success', 'Our main KPI is customer satisfaction.', 'ключевой показатель'),
        W('ROI', 'initialism', 'return on investment', 'The ROI on training is high.', 'окупаемость'),
        W('WFH', 'initialism', 'working from home', "I'm WFH on Fridays.", 'удалённая работа'),
        W('TBC', 'initialism', 'to be confirmed', 'Date: 12 May, venue TBC.', 'уточняется')]),
      L('Can a four-day week work?', 'A manager and an employee discuss a trial at their company.', [
        f('Dana', "So, six months into the four-day-week trial — what's the verdict from HR?"),
        m('Marat', "By and large, positive. Productivity hasn't dropped; in fact our main KPI, customer satisfaction, has gone up slightly."),
        f('Dana', "And sick days?"),
        m('Marat', "Down by almost a third. People have been coming in rested. The cons? Some clients expect replies on Fridays, so we've had to rota a small team."),
        f('Dana', "Will the CEO make it permanent?"),
        m('Marat', "The board meets in March — that's TBC. But I'd be surprised if they reversed it. Staff turnover has fallen too, which saves a fortune in recruitment.")
      ], [
        mc('What happened to productivity?', ['It dropped.', 'It stayed the same or improved.', 'It halved.'], 1),
        mc('By how much did sick days fall?', ['by about a third', 'by half', 'not at all'], 0),
        mc('What was one disadvantage?', ['clients expecting Friday replies', 'lower pay', 'longer hours'], 0),
        tf('The decision to make it permanent has already been made.', false)
      ]),
      C([mc('Poor sleep can lead ___ health problems.', ['to', 'from', 'in'], 0),
         mc('I ___ this book for weeks and I\'m only on page 50.', ['have read', 'have been reading'], 1),
         mc('Advantages and disadvantages:', ['odds and ends', 'pros and cons', 'give and take'], 1),
         gap('Please reply A___ — it\'s urgent.', ['SAP']),
         gap('The delay was ___ to a technical fault.', ['due', 'owing'])])
    ]},
    /* ---------------- File 5 ---------------- */
    { id: 'u5', title: 'File 5 · An emotional roller coaster; Crossing cultures', topic: 'File 5', lessons: [
      G('ga', '5A · Prepositions and sentence patterns',
        "<table><tr><td>adjective + preposition</td><td><b>apprehensive about</b>, <b>resentful of</b>, <b>indifferent to</b>, <b>overwhelmed by</b></td></tr>" +
        "<tr><td>verb + object + preposition</td><td>She <b>accused</b> him <b>of</b> lying. · They <b>congratulated</b> us <b>on</b> winning.</td></tr>" +
        "<tr><td>preposition + -ing</td><td>She left <b>without saying</b> goodbye. · <b>Instead of complaining</b>, act.</td></tr>" +
        "<tr><td>prepositions at the end of clauses</td><td>That's the film I told you <b>about</b>. · What are you worried <b>about</b>?</td></tr>" +
        "<tr><td>it + adjective + that / to</td><td><b>It's</b> only natural <b>to feel</b> nervous.</td></tr></table>",
        [mc('She was apprehensive ___ moving abroad.', ['of', 'about', 'with'], 1),
         mc('He seemed completely indifferent ___ the news.', ['to', 'for', 'about'], 0),
         gap('They accused the manager ___ ignoring complaints.', ['of']),
         mc('She left the room without ___ a word.', ['say', 'saying', 'to say'], 1),
         mc('What are you so anxious ___?', ['for', 'about', 'of'], 1),
         order('It is only natural to feel nervous before an exam.')]),
      V('va', '5A · More sophisticated emotions', [
        W('apprehensive', 'adjective', 'worried that something bad will happen', 'I was apprehensive about the operation.', 'встревоженный'),
        W('elated', 'adjective', 'extremely happy and excited', 'She was elated by the result.', 'ликующий'),
        W('resentful', 'adjective', 'angry because you feel unfairly treated', 'He felt resentful of his brother\'s success.', 'обиженный'),
        W('wistful', 'adjective', 'sadly thinking about something you cannot have', 'a wistful look at old photos', 'тоскливый, задумчивый'),
        W('exasperated', 'adjective', 'very annoyed, especially when you can do nothing', 'an exasperated sigh', 'раздражённый'),
        W('ecstatic', 'adjective', 'extremely happy', 'The fans were ecstatic.', 'в восторге'),
        W('dismayed', 'adjective', 'worried, sad and shocked', 'We were dismayed by the decision.', 'встревоженный, расстроенный'),
        W('content', 'adjective', 'happy and satisfied', 'She seems content with her life.', 'довольный')]),
      G('gb', '5B · Advanced structures for comparing and contrasting',
        "<table><tr><td><b>the … the …</b></td><td><b>The longer</b> you live abroad, <b>the more</b> you notice home.</td></tr>" +
        "<tr><td>modifiers</td><td><b>considerably / far / a great deal</b> more formal · <b>nowhere near as</b> polite · <b>not nearly as</b> direct</td></tr>" +
        "<tr><td>contrast linkers</td><td><b>whereas / while</b> + clause · <b>unlike</b> + noun · <b>as opposed to</b> · <b>by contrast</b></td></tr>" +
        "<tr><td>concession</td><td><b>Much as</b> I love Italy, … · <b>Although / Even though</b> … · <b>Despite / In spite of</b> + -ing / noun</td></tr>" +
        "<tr><td>similarity</td><td><b>Similarly</b>, … · <b>likewise</b> · <b>just as</b> … <b>so</b> …</td></tr></table>",
        [mc('___ more you travel, the more tolerant you become.', ['The', 'More', 'So'], 0),
         mc('British English is ___ near as direct as Dutch.', ['nowhere', 'not', 'far'], 0),
         gap('___ the British, Kazakhs often greet everyone in the room.', ['Unlike']),
         mc('___ I admire their punctuality, I find it a little rigid.', ['Despite', 'Much as', 'Unlike'], 1),
         mc('In Japan, bowing is common, ___ in Russia people usually shake hands.', ['whereas', 'despite', 'unlike'], 0),
         order('The longer you stay, the harder it is to leave.')]),
      V('vb', '5B · Individuals and populations', [
        W('demographic', 'noun', 'a particular group in a population; statistics about it', 'The app targets a younger demographic.', 'демографическая группа'),
        W('ethnicity', 'noun', 'belonging to a group with a shared culture or origin', 'The survey asked about ethnicity.', 'этническая принадлежность'),
        W('expatriate', 'noun', 'someone living outside their own country (expat)', 'a large expatriate community', 'экспат'),
        W('migrant', 'noun', 'a person who moves to another place to find work or better conditions', 'seasonal migrants', 'мигрант'),
        W('native', 'noun / adj', 'a person born in a particular place', 'a native of Kostanay', 'уроженец'),
        W('community', 'noun', 'people living in one area or sharing interests', 'a close-knit community', 'сообщество'),
        W('stereotype', 'noun', 'a fixed, simplified idea about a type of person', 'The film challenges stereotypes.', 'стереотип'),
        W('assimilate', 'verb', 'to become part of a society and accept its customs', 'Children assimilate faster than adults.', 'ассимилироваться')]),
      L('Culture shock in reverse', 'Two people discuss coming home after years abroad.', [
        m('Arman', "Everyone warns you about culture shock abroad. Nobody warned me about coming home."),
        f('Sofia', "Reverse culture shock! I felt it after Spain. The longer I'd been away, the stranger everything seemed — even queuing."),
        m('Arman', "Exactly. In London people apologise constantly, whereas here we're more direct. At first I found it almost rude — my own culture!"),
        f('Sofia', "And friends weren't nearly as interested in my stories as I expected. That made me feel quite resentful, honestly."),
        m('Arman', "Much as I love being back, I miss being anonymous. Here everyone knows your business."),
        f('Sofia', "It took me about a year to feel content again. You end up somewhere in between — not fully either.")
      ], [
        mc('What surprised Arman?', ['culture shock abroad', 'culture shock when returning home', 'the weather'], 1),
        mc('How does Arman compare London and home?', ['London is more direct.', 'People at home are more direct.', 'They are the same.'], 1),
        mc('Why did Sofia feel resentful?', ['Friends weren\'t very interested in her stories.', 'She lost her job.', 'Prices had risen.'], 0),
        tf('Sofia felt completely settled within a month.', false)
      ]),
      C([mc('She was elated ___ the news.', ['by', 'of', 'to'], 0),
         mc('The ___ you practise, the easier it gets.', ['more', 'most', 'much'], 0),
         gap('___ as I love my job, I need a holiday.', ['Much']),
         mc('Worried that something bad will happen:', ['content', 'apprehensive', 'ecstatic'], 1),
         mc('A fixed, simplified idea about a group:', ['stereotype', 'demographic', 'community'], 0)])
    ]},
    /* ---------------- File 6 ---------------- */
    { id: 'u6', title: 'File 6 · Hi-tech, lo-tech; It all adds up', topic: 'File 6', lessons: [
      G('ga', '6A · Position of adverbs',
        "<table><tr><td>front (comment / linking)</td><td><b>Surprisingly</b>, the old phone outlasted the new one. · <b>However</b>, …</td></tr>" +
        "<tr><td>mid (frequency, certainty, focus)</td><td>She <b>rarely</b> uses apps. · They have <b>probably</b> left. · He <b>even</b> repairs his own laptop.</td></tr>" +
        "<tr><td>end (manner, place, time)</td><td>He fixed it <b>carefully</b> <b>in the garage</b> <b>last night</b>. (manner → place → time)</td></tr>" +
        "<tr><td>never between verb and object</td><td>She speaks English <b>fluently</b>. (not <s>speaks fluently English</s>)</td></tr>" +
        "<tr><td>meaning can change</td><td><b>Only</b> I saw it. · I <b>only</b> saw it. · I saw <b>only</b> it.</td></tr></table>",
        [mc('Choose the correct sentence.', ['She speaks fluently three languages.', 'She speaks three languages fluently.'], 1),
         mc('He has ___ forgotten to back up his files. (frequency)', ['never', 'yesterday', 'carefully'], 0),
         mc('Choose the correct order.', ['He repaired it last night carefully.', 'He repaired it carefully last night.'], 1),
         gap('___, the old typewriter still works. (It is surprising)', ['Surprisingly']),
         mc('They will ___ have arrived by now.', ['probably', 'probable', 'in probability'], 0),
         order('She rarely checks her phone in the evening.')]),
      V('va', '6A · Adverb collocations and verbs for making things', [
        W('highly unlikely', 'collocation', 'very improbable', "It's highly unlikely to rain.", 'крайне маловероятно'),
        W('bitterly disappointed', 'collocation', 'extremely disappointed', 'The fans were bitterly disappointed.', 'горько разочарован'),
        W('deeply rooted', 'collocation', 'strongly established', 'deeply rooted traditions', 'глубоко укоренившийся'),
        W('fully aware', 'collocation', 'completely conscious of something', "I'm fully aware of the risks.", 'полностью осознаёт'),
        W('assemble', 'verb', 'to put the parts of something together', 'Assemble the shelves using the screws provided.', 'собирать'),
        W('carve', 'verb', 'to make something by cutting wood or stone', 'He carved a spoon from birch.', 'вырезать'),
        W('weave', 'verb', 'to make cloth by crossing threads', 'They weave carpets by hand.', 'ткать'),
        W('mould', 'verb', 'to shape a soft substance into a form', 'Mould the clay into a bowl.', 'лепить')]),
      G('gb', '6B · Singular and plural agreement',
        "<table><tr><td>collective nouns (BrE)</td><td>The team <b>is / are</b> training. (singular = unit; plural = members)</td></tr>" +
        "<tr><td>always plural</td><td>The police <b>are</b>… · People <b>were</b>… · Cattle <b>graze</b>…</td></tr>" +
        "<tr><td>uncountable, look plural</td><td>The news <b>is</b>… · Mathematics <b>is</b>… · Economics <b>is</b>…</td></tr>" +
        "<tr><td>amounts as one unit</td><td>Ten kilometres <b>is</b> a long way. · Five thousand tenge <b>isn't</b> much.</td></tr>" +
        "<tr><td>a number of / the number of</td><td><b>A number of</b> students <b>are</b>… · <b>The number of</b> students <b>is</b>…</td></tr>" +
        "<tr><td>each / every / neither / none</td><td><b>Each</b> of the answers <b>is</b> correct. · None of us <b>is / are</b> sure (both used).</td></tr></table>",
        [mc('Mathematics ___ my favourite subject.', ['is', 'are'], 0),
         mc('The police ___ investigating the accident.', ['is', 'are'], 1),
         mc('Twenty minutes ___ not long to wait.', ['is', 'are'], 0),
         gap('The number of users ___ (have) doubled.', ['has']),
         mc('A number of people ___ complained.', ['has', 'have'], 1),
         order('Each of the answers is worth two points.')]),
      V('vb', '6B · Numbers and measurements', [
        W('approximately', 'adverb', 'close to an exact number', 'approximately 3.2 million people', 'приблизительно'),
        W('a fraction of', 'phrase', 'a small part of', 'It costs a fraction of the price.', 'малая доля'),
        W('decimal point', 'noun', 'the dot in numbers like 2.5 (two point five)', 'Put the decimal point in the right place.', 'десятичная точка'),
        W('square metre', 'noun', 'm², a unit of area', 'a flat of 60 square metres', 'квадратный метр'),
        W('round up', 'phrasal verb', 'to change a number to the next whole number', '7.6 rounded up is 8.', 'округлить вверх'),
        W('per cent', 'noun', '%, out of every hundred', 'Forty per cent agreed.', 'процент'),
        W('dozens of', 'phrase', 'many (a dozen = 12)', 'dozens of mistakes', 'десятки'),
        W('double / halve', 'verb', 'to make twice as much / half as much', 'Sales doubled; costs halved.', 'удвоить / уменьшить вдвое')]),
      L('When maths goes wrong', 'A science podcast about famous number mistakes.', [
        f('Host', "Today: tiny numbers, huge consequences. Daniel, you collect maths mistakes."),
        m('Daniel', "I do! My favourite is a bridge that was built from both banks at once. One side used a reference height that differed by about half a metre, and the error was doubled instead of corrected."),
        f('Host', "So the two halves didn't meet?"),
        m('Daniel', "Not at first — they were nearly a metre apart. Then there's the case of a medicine dose where a decimal point was in the wrong place: ten times the amount."),
        f('Host', "Frightening. What's the lesson?"),
        m('Daniel', "Mathematics is rarely the problem; communication is. A number of disasters happen because two teams each assume the other has checked.")
      ], [
        mc('What went wrong with the bridge?', ['It was too short.', 'A height difference was doubled.', 'It used the wrong material.'], 1),
        mc('How far apart were the halves at first?', ['about half a metre', 'nearly a metre', 'ten metres'], 1),
        mc('What caused the medicine error?', ['a decimal point in the wrong place', 'a broken machine', 'a translation'], 0),
        tf('Daniel thinks most disasters are caused by bad maths.', false)
      ]),
      C([mc('Choose the correct sentence.', ['He plays brilliantly the piano.', 'He plays the piano brilliantly.'], 1),
         mc('The news ___ better than we expected.', ['is', 'are'], 0),
         mc('To put parts together:', ['carve', 'assemble', 'weave'], 1),
         gap('The number of complaints ___ fallen.', ['has']),
         mc('She was ___ disappointed with the result.', ['bitterly', 'highly', 'deeply rooted'], 0)])
    ]},
    /* ---------------- File 7 ---------------- */
    { id: 'u7', title: 'File 7 · Whodunnit?; Alone or with friends?', topic: 'File 7', lessons: [
      G('ga', '7A · Complex passive forms',
        "<table><tr><td>reporting passives</td><td>The suspect <b>is said to have fled</b> abroad. · <b>It is believed that</b> …</td></tr>" +
        "<tr><td>passive infinitives</td><td>He expects <b>to be released</b> soon. · She hates <b>being told</b> what to do.</td></tr>" +
        "<tr><td>perfect / continuous passives</td><td>The case <b>has been reopened</b>. · The witness <b>is being questioned</b>.</td></tr>" +
        "<tr><td>modal passives</td><td>It <b>can't have been stolen</b> — the door was locked.</td></tr>" +
        "<tr><td>have / get something done</td><td>They <b>had</b> the locks <b>changed</b>. · He <b>got</b> his car <b>broken into</b>.</td></tr></table>",
        [mc('The thief is thought ___ through the window.', ['to escape', 'to have escaped', 'escaping'], 1),
         mc('The witness ___ by the police at the moment.', ['is questioned', 'is being questioned', 'has questioned'], 1),
         gap('The painting can\'t ___ (steal) — it\'s still on the wall.', ['have been stolen']),
         mc('We had our house ___ last year.', ['burgled', 'burgle', 'burgling'], 0),
         mc('She hates ___ what to do.', ['telling', 'being told', 'to tell'], 1),
         order('The case is expected to be closed next month.')]),
      V('va', '7A · Punishment', [
        W('sentence', 'noun / verb', 'the punishment a judge gives; to give a punishment', 'He was sentenced to five years.', 'приговор'),
        W('fine', 'noun / verb', 'money paid as a punishment', 'a heavy fine for speeding', 'штраф'),
        W('community service', 'noun', 'unpaid work in the community as a punishment', '200 hours of community service', 'общественные работы'),
        W('acquit', 'verb', 'to decide officially that someone is not guilty', 'The jury acquitted her.', 'оправдать'),
        W('convict', 'verb', 'to decide officially that someone is guilty', 'He was convicted of fraud.', 'осудить'),
        W('on probation', 'phrase', 'released but under supervision for a period', 'She is on probation for a year.', 'условно'),
        W('suspended sentence', 'noun', 'a prison sentence that is not served unless another crime is committed', 'a six-month suspended sentence', 'условный срок'),
        W('deterrent', 'noun', 'something that makes people decide not to do something', 'Is prison an effective deterrent?', 'сдерживающее средство')]),
      G('gb', '7B · Special uses of tenses',
        "<table><tr><td>past tenses for distance / politeness</td><td>I <b>was wondering</b> if you could help. · I <b>wanted</b> to ask you something.</td></tr>" +
        "<tr><td>past for unreal present</td><td>It's time we <b>left</b>. · I'd rather you <b>didn't</b> tell anyone. · If only I <b>had</b> more time.</td></tr>" +
        "<tr><td>present for narratives, jokes, headlines</td><td>So this man <b>walks</b> into a café… · <b>Hermit leaves</b> cave after 30 years.</td></tr>" +
        "<tr><td>present simple for timetables</td><td>The film <b>starts</b> at eight.</td></tr>" +
        "<tr><td>future in the past</td><td>I <b>was going to</b> call you, but… · We knew it <b>would</b> be hard.</td></tr></table>",
        [mc('It\'s high time we ___ home.', ['go', 'went', 'will go'], 1),
         mc('I ___ wondering if you could lend me your notes.', ['am', 'was', 'will be'], 1),
         gap('I\'d rather you ___ (not / mention) it to anyone.', ["didn't mention", 'did not mention']),
         mc('Headline: "Local woman ___ lottery twice"', ['wins', 'won', 'has won'], 0),
         mc('I ___ phone you, but my battery died.', ['was going to', 'will', 'am going to'], 0),
         order('If only I had more time to read.')]),
      V('vb', '7B · Connotation', [
        W('slim / skinny', 'adjectives', 'both mean thin: slim is positive, skinny can be negative', 'a slim figure · a skinny arm', 'стройный / тощий'),
        W('thrifty / stingy', 'adjectives', 'careful with money (positive) / unwilling to spend (negative)', 'a thrifty shopper · a stingy boss', 'бережливый / скупой'),
        W('confident / arrogant', 'adjectives', 'sure of yourself (positive) / too proud (negative)', 'a confident speaker', 'уверенный / высокомерный'),
        W('solitude', 'noun', 'being alone, usually in a positive, peaceful way', 'She enjoys solitude.', 'уединение'),
        W('loneliness', 'noun', 'being alone and unhappy about it', 'Loneliness affects all ages.', 'одиночество'),
        W('determined / stubborn', 'adjectives', 'not giving up (positive) / refusing to change (negative)', 'a determined athlete · a stubborn child', 'целеустремлённый / упрямый'),
        W('curious / nosy', 'adjectives', 'wanting to know (positive) / too interested in others\' business (negative)', 'a nosy neighbour', 'любознательный / любопытный'),
        W('youthful / childish', 'adjectives', 'young in a good way / silly, immature', 'youthful energy · childish behaviour', 'молодой / ребяческий')]),
      L('A true-crime podcast', 'Two hosts discuss an unsolved museum theft.', [
        m('Host 1', "So, the painting vanished from the gallery overnight. No alarm, no broken glass."),
        f('Host 2', "Which is why the police think it must have been taken by someone with a key. The night guard was questioned for hours."),
        m('Host 1', "And released without charge. It's now believed that the frame had been replaced weeks earlier with a copy."),
        f('Host 2', "Meaning the original might already have been sold before anyone noticed. If it's ever recovered, the thief is expected to face at least ten years."),
        m('Host 1', "Unless he's acquitted. The defence will argue that nobody can prove when the swap happened."),
        f('Host 2', "It's time we heard from our listeners — who do you think did it?")
      ], [
        mc('How did the thief probably get in?', ['by breaking a window', 'with a key', 'through the roof'], 1),
        tf('The night guard was charged with the crime.', false),
        mc('What is now believed?', ['The painting was a copy all along.', 'A copy had replaced the original weeks earlier.', 'The guard sold it.'], 1),
        mc('What will the defence argue?', ['The thief has an alibi.', 'Nobody can prove when the swap happened.', 'The painting is worthless.'], 1)
      ]),
      C([mc('The suspect is said ___ the country.', ['to leave', 'to have left', 'leaving'], 1),
         mc('It\'s time you ___ to bed.', ['go', 'went', 'will go'], 1),
         mc('To officially decide someone is not guilty:', ['convict', 'acquit', 'sentence'], 1),
         mc('Being alone in a positive way:', ['loneliness', 'solitude', 'stubbornness'], 1),
         gap('The car is ___ repaired at the moment.', ['being'])])
    ]},
    /* ---------------- File 8 ---------------- */
    { id: 'u8', title: 'File 8 · Food of love; Seeing things differently', topic: 'File 8', lessons: [
      G('ga', '8A · Expressing conditionality',
        "<table><tr><td>alternatives to if</td><td><b>provided / providing (that)</b>, <b>as long as</b>, <b>on condition that</b>, <b>unless</b>, <b>supposing</b>, <b>otherwise</b></td></tr>" +
        "<tr><td>inversion (formal)</td><td><b>Had</b> I known, I'd have come. · <b>Were</b> it not for her, … · <b>Should</b> you need help, …</td></tr>" +
        "<tr><td>but for / if it weren't for</td><td><b>But for</b> the recipe, the dish would have failed.</td></tr>" +
        "<tr><td>mixed conditionals</td><td>If I'd trained as a chef, I'<b>d be</b> running a restaurant now.</td></tr>" +
        "<tr><td>even if / only if</td><td>I wouldn't eat it <b>even if</b> you paid me. · <b>Only if</b> it's fresh <b>will</b> I buy it.</td></tr></table>",
        [mc('___ I known you were vegetarian, I\'d have cooked something else.', ['If', 'Had', 'Should'], 1),
         mc('You can borrow my car ___ you return it by six.', ['unless', 'provided', 'otherwise'], 1),
         gap('___ it not for her help, we would have failed.', ['Were']),
         mc('___ the rain, the picnic would have been perfect.', ['But for', 'Unless', 'Provided'], 0),
         mc('I wouldn\'t eat insects ___ you paid me.', ['only if', 'even if', 'as long as'], 1),
         order('Only if the fish is fresh will I buy it.')]),
      V('va', '8A · Eating and drinking', [
        W('savour', 'verb', 'to eat or drink slowly to enjoy it fully', 'Savour every bite.', 'смаковать'),
        W('nibble', 'verb', 'to eat in small bites', 'She nibbled a biscuit.', 'покусывать'),
        W('gulp', 'verb', 'to drink or swallow quickly', 'He gulped his coffee and ran.', 'глотать'),
        W('sip', 'verb', 'to drink in very small amounts', 'sip hot tea', 'отпивать маленькими глотками'),
        W('wolf down', 'phrasal verb', 'to eat very quickly', 'The kids wolfed down their pizza.', 'проглотить'),
        W('peckish', 'adjective', 'slightly hungry (informal, BrE)', "I'm feeling a bit peckish.", 'немного голодный'),
        W('mouth-watering', 'adjective', 'looking or smelling delicious', 'a mouth-watering dessert', 'аппетитный'),
        W('acquired taste', 'noun', 'something you only learn to like after trying it several times', 'Kumis is an acquired taste.', 'дело вкуса (не сразу нравится)')]),
      G('gb', '8B · Adjective order',
        "<p>Before a noun, adjectives usually follow this order (you rarely need more than three):</p>" +
        "<p><b>opinion → size → age → shape → colour → origin → material → purpose → NOUN</b></p>" +
        "<table><tr><td>example</td><td>a <b>beautiful</b> <b>small</b> <b>antique</b> <b>round</b> <b>Persian</b> <b>silk</b> rug</td></tr>" +
        "<tr><td>more natural</td><td>a <b>lovely old wooden</b> table · <b>huge black</b> boots</td></tr>" +
        "<tr><td>commas</td><td>between adjectives of the same type: a <b>cheerful, friendly</b> waiter</td></tr>" +
        "<tr><td>after the noun / verb</td><td>The view was <b>breathtaking</b>. · something <b>unusual</b></td></tr></table>",
        [mc('Choose the correct order.', ['a wooden old lovely table', 'a lovely old wooden table'], 1),
         mc('Choose the correct order.', ['a Japanese small ceramic bowl', 'a small Japanese ceramic bowl'], 1),
         mc('Choose the correct order.', ['a black leather huge sofa', 'a huge black leather sofa'], 1),
         gap('I saw something ___ (strange) on the way home.', ['strange']),
         mc('Choose the correct order.', ['a red long silk dress', 'a long red silk dress'], 1),
         order('She bought a beautiful old Italian painting.')]),
      V('vb', '8B · Ways of seeing', [
        W('glance', 'verb', 'to look quickly', 'He glanced at his watch.', 'взглянуть'),
        W('stare', 'verb', 'to look for a long time', "Don't stare — it's rude.", 'пристально смотреть'),
        W('glimpse', 'verb / noun', 'to see something very briefly', 'We caught a glimpse of the Queen.', 'мельком увидеть'),
        W('peer', 'verb', 'to look carefully because it is difficult to see', 'She peered through the fog.', 'вглядываться'),
        W('gaze', 'verb', 'to look for a long time, often with admiration', 'They gazed at the stars.', 'смотреть, любоваться'),
        W('squint', 'verb', 'to look with eyes partly closed', 'He squinted in the sunlight.', 'щуриться'),
        W('scan', 'verb', 'to look quickly over something to find information', 'Scan the text for dates.', 'просматривать'),
        W('witness', 'verb', 'to see something happen, especially a crime or accident', 'Did anyone witness the accident?', 'быть свидетелем')]),
      L('Love at first bite', 'A chef and a food writer talk about food and relationships.', [
        f('Writer', "They say the way to someone's heart is through their stomach. As a chef, do you believe it?"),
        m('Chef', "Provided the cooking is honest, yes. The first meal I made for my wife was a disaster — I burnt the rice. But for her sense of humour, we'd never have had a second date."),
        f('Writer', "So it wasn't the food that won her over!"),
        m('Chef', "Not that night. But food is about attention. If you notice someone sipping their tea slowly, savouring it, you learn what they love."),
        f('Writer', "And acquired tastes?"),
        m('Chef', "Ah — she couldn't stand kumis when we met. Had you told me she'd be drinking it every morning ten years later, I wouldn't have believed you.")
      ], [
        mc('What went wrong at the first meal?', ['He burnt the rice.', 'She was late.', 'The restaurant was closed.'], 0),
        mc('Why was there a second date?', ['the delicious food', 'her sense of humour', 'a friend\'s advice'], 1),
        mc('According to the chef, food is about…', ['money', 'attention', 'presentation'], 1),
        tf('His wife loved kumis from the start.', false)
      ]),
      C([mc('___ you need anything, just call.', ['Should', 'Had', 'Were'], 0),
         mc('Choose the correct order.', ['an old charming stone cottage', 'a charming old stone cottage'], 1),
         mc('To look quickly:', ['stare', 'glance', 'gaze'], 1),
         mc('Slightly hungry:', ['peckish', 'mouth-watering', 'savour'], 0),
         gap('___ for the map, we would have got lost.', ['But'])])
    ]}
    ]
  });
})();
