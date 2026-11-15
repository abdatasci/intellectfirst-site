/* General English C2, units 3–8 (original IF Academy material; English only). */
(function () {
  var K = IFX.k;
  IFX.make('ge-c2', [
    { id: 'u3', t: 'Machines and morals', topic: 'Ethics and technology',
      v: ['Ethics and technology', `
accountability | noun | the fact of being responsible for what you do and able to explain it | Who bears accountability when an algorithm errs?
autonomy | noun | the ability to make your own decisions without control | Patients must retain autonomy over their treatment.
contentious | adjective | likely to cause strong disagreement | Facial recognition remains highly contentious.
safeguard | noun / verb | a measure intended to protect | Robust safeguards must be built in from the start.
unprecedented | adjective | never having happened before | The technology raises unprecedented questions.
utilitarian | adjective | aiming at the greatest good for the greatest number | A purely utilitarian calculation ignores individual rights.
inscrutable | adjective | impossible to understand or interpret | Many AI decisions remain inscrutable even to their designers.
erode | verb | to gradually weaken or destroy | Constant surveillance may erode trust.`],
      g: ['The subjunctive and formal conditionals', "<table><tr><td>Mandative subjunctive (base form)</td><td>The committee recommended that every system <b>be</b> audited. It is essential that he <b>attend</b>.</td></tr><tr><td>Inverted conditionals</td><td><b>Were</b> the law <b>to change</b>, … · <b>Should</b> you <b>require</b> help, … · <b>Had</b> we <b>known</b>, …</td></tr><tr><td>Fixed expressions</td><td><b>Be that as it may</b>, … · <b>Come what may</b>, … · <b>Suffice it to say</b>, …</td></tr></table>",
        [K.mc('The report insists that the company ___ the data.', ['delete', 'deletes', 'will delete'], 0),
         K.mc('___ the system fail, a human must take over.', ['If', 'Should', 'Would'], 1),
         K.mc('___ we been warned, we would have acted.', ['Were', 'Had', 'Should'], 1),
         K.mc('___ the government to ban it, many firms would leave.', ['Were', 'Should', 'Had'], 0),
         K.gap('It is vital that every user ___ (be) informed.', 'be'),
         K.ord('Be that as it may, the risks cannot be ignored.')]],
      r: ['Who is responsible?', "When a self-driving car causes an accident, who bears the blame — the passenger, the manufacturer, or the programmers who wrote the code years earlier? The question, once confined to philosophy seminars, has acquired unprecedented urgency.\n\nThe difficulty is not merely legal. Many modern systems learn from data rather than following explicit rules, so their decisions can be inscrutable even to their designers. Were a court to demand an explanation, the honest answer might be that no single person knows. Accountability, in other words, risks dissolving into a fog of shared and therefore absent responsibility.\n\nSome ethicists propose that any system making high-stakes decisions be required to justify them in terms a human can scrutinise. Others regard this as naïve: insisting on explanations, they argue, would sacrifice accuracy for a comforting illusion of understanding. Suffice it to say that the debate is far from settled.",
        [K.mc('Why is the question of responsibility urgent now?', ['it is purely philosophical', 'self-driving systems make real decisions', 'cars are cheaper'], 1),
         K.mc('Why can decisions be "inscrutable"?', ['systems learn from data rather than explicit rules', 'programmers hide them', 'laws forbid explanations'], 0),
         K.mc('The phrase "a fog of shared and therefore absent responsibility" suggests that…', ['everyone is clearly to blame', 'no one ends up responsible', 'only the passenger is responsible'], 1),
         K.tf('All ethicists agree that systems should explain their decisions.', false),
         K.mc('Opponents of required explanations fear a loss of…', ['accuracy', 'privacy', 'speed'], 0)]] },

    { id: 'u4', t: 'The attention economy', topic: 'Academic style',
      v: ['Attention and the digital world', `
distraction | noun | something that takes your attention away | Notifications are a constant source of distraction.
monetise | verb | to earn money from something | Platforms monetise users' attention through advertising.
compulsive | adjective | difficult to stop or control | Compulsive checking of phones is now widespread.
fragmented | adjective | broken into separate parts | Our attention has become increasingly fragmented.
deliberation | noun | long and careful thought | Serious decisions require deliberation.
ubiquitous | adjective | found everywhere | Smartphones are ubiquitous.
proliferation | noun | a rapid increase in number | the proliferation of streaming services
detrimental | adjective | harmful | Multitasking is detrimental to deep work.`],
      g: ['Nominalisation: writing like an academic', "<p>Academic English often turns verbs and adjectives into <b>nouns</b>. This makes writing more concise, objective and formal.</p><table><tr><td>Verbal</td><td>People <b>check</b> their phones <b>constantly</b>, so they <b>concentrate</b> less.</td></tr><tr><td>Nominalised</td><td>The constant <b>checking</b> of phones leads to a <b>reduction</b> in <b>concentration</b>.</td></tr><tr><td>Common patterns</td><td>increase → an <b>increase in</b> · fail → <b>failure to</b> · able → <b>the ability to</b> · decide → <b>the decision to</b></td></tr></table>",
        [K.mc('Nominalise: "Prices rose sharply."', ['There was a sharp rise in prices.', 'Prices were rising sharply.', 'Sharp prices rose.'], 0),
         K.mc('Nominalise: "The company failed to adapt."', ['The company\'s failure to adapt', 'The company failing adapt', 'Failed adaptation company'], 0),
         K.mc('Which is the most academic?', ['We use phones a lot, so we can\'t focus.', 'Heavy phone use is associated with reduced concentration.', 'Phones are bad for focusing.'], 1),
         K.gap('"They decided to close the factory." → The ___ to close the factory…', 'decision'),
         K.mc('"People are able to concentrate" → people\'s ___ to concentrate', ['able', 'ability', 'abilities'], 1),
         K.ord('The proliferation of devices has led to a decline in deep reading.')]],
      r: ['Who owns your attention?', "In an economy of information abundance, the scarce resource is no longer information but attention. This insight, first articulated decades ago, now underpins the business models of the world's most valuable companies, which monetise attention by selling it to advertisers.\n\nThe consequences of this arrangement are increasingly documented. The constant interruption of tasks by notifications results in a fragmented form of attention, in which sustained deliberation becomes difficult. Moreover, the design of many applications — infinite scrolling, unpredictable rewards — appears to encourage compulsive use rather than considered choice.\n\nCritics are careful not to overstate the case: correlation is not causation, and technology has also enabled unprecedented access to knowledge. Nevertheless, there is growing support for the view that the protection of attention, like the protection of privacy, may require regulation rather than mere individual self-discipline.",
        [K.mc('In an economy of information abundance, the scarce resource is…', ['information', 'attention', 'money'], 1),
         K.mc('How do companies monetise attention?', ['by selling it to advertisers', 'by charging users', 'by selling devices'], 0),
         K.mc('Which design features are mentioned as encouraging compulsive use?', ['dark mode and fonts', 'infinite scrolling and unpredictable rewards', 'privacy settings'], 1),
         K.tf('The critics claim technology has had no benefits.', false),
         K.mc('The final paragraph suggests protecting attention may require…', ['only self-discipline', 'regulation', 'new devices'], 1)]] },

    { id: 'u5', t: 'A sense of humour', topic: 'Wit and humour',
      v: ['Humour and irony', `
deadpan | adjective | pretending to be serious when joking | His deadpan delivery made it even funnier.
irony | noun | saying the opposite of what you mean, or a situation that is unexpectedly opposite | The irony was lost on the audience.
self-deprecating | adjective | making jokes about yourself | Her self-deprecating humour put everyone at ease.
wry | adjective | showing amusement in a slightly mocking way | He gave a wry smile.
pun | noun | a joke using a word with two meanings | The headline was a terrible pun.
tongue-in-cheek | adjective | not meant seriously | The article was entirely tongue-in-cheek.
banter | noun | friendly joking conversation | There was plenty of good-natured banter.
quip | noun / verb | a quick, clever remark | "Only on Mondays," she quipped.`],
      g: ['Ellipsis and substitution', "<p>Fluent speakers avoid repetition by <b>leaving words out</b> (ellipsis) or <b>replacing</b> them (substitution).</p><table><tr><td><b>so / not</b> for clauses</td><td>\"Is it funny?\" \"I think <b>so</b>.\" / \"I hope <b>not</b>.\"</td></tr><tr><td><b>do / do so</b> for verbs</td><td>He promised to apologise, and he <b>did so</b> at once.</td></tr><tr><td><b>one / ones</b> for nouns</td><td>This joke is better than the last <b>one</b>.</td></tr><tr><td>Ellipsis after auxiliaries</td><td>She can tell jokes, but I <b>can't</b>. · I'd laugh if I <b>could</b>.</td></tr><tr><td>Infinitive</td><td>I didn't want to go, but I had <b>to</b>.</td></tr></table>",
        [K.mc('"Will it rain?" "I hope ___."', ['not', 'no', "don't"], 0),
         K.mc('"Is he coming?" "I believe ___."', ['it', 'so', 'yes'], 1),
         K.mc('He was asked to resign and he ___ so the next day.', ['made', 'did', 'was'], 1),
         K.mc('I prefer the red dress to the blue ___.', ['it', 'one', 'that'], 1),
         K.mc('"Would you like to come?" "I\'d love ___."', ['to', 'it', 'so'], 0),
         K.ord('She can speak Japanese, but I cannot.')]],
      r: ['The serious business of jokes', "Humour, it has often been observed, is notoriously difficult to translate. A pun depends on a coincidence of sound that rarely survives in another language; irony relies on shared assumptions about what is normal; and deadpan delivery can be mistaken for genuine seriousness by anyone unfamiliar with the convention.\n\nYet humour is far from trivial. Research on teams suggests that good-natured banter can build trust remarkably quickly, provided that everyone is included. Self-deprecating humour, in particular, signals confidence: only those secure in their status can afford to laugh at themselves.\n\nThe risks, however, are real. Teasing that one person regards as affectionate may strike another as wounding, and a tongue-in-cheek remark in an email, stripped of tone and facial expression, may be read quite literally. As one researcher wryly put it: 'Humour is like a hedgehog — delightful, provided you know how to hold it.'",
        [K.mc('Why are puns hard to translate?', ['they depend on sounds that rarely match in other languages', 'they are too long', 'they are rude'], 0),
         K.mc('What can banter do in teams?', ['create conflict only', 'build trust if everyone is included', 'replace meetings'], 1),
         K.mc('Self-deprecating humour signals…', ['weakness', 'confidence', 'anger'], 1),
         K.tf('Tongue-in-cheek remarks are always understood correctly in emails.', false),
         K.mc('The hedgehog comparison suggests humour is…', ['dangerous and to be avoided', 'enjoyable if handled with care', 'always painful'], 1)]] },

    { id: 'u6', t: 'Ambition', topic: 'Success and achievement',
      v: ['Success and drive', `
tenacity | noun | determination to continue despite difficulties | Her tenacity eventually paid off.
prodigy | noun | a young person with exceptional ability | He was a chess prodigy at the age of eight.
meteoric | adjective | extremely fast and impressive | Her rise to fame was meteoric.
hubris | noun | excessive pride or self-confidence | The CEO's hubris led to the company's collapse.
accolade | noun | an award or praise for an achievement | The film received every major accolade.
plateau | noun / verb | a period where progress stops | Many learners reach a plateau at B2.
unassuming | adjective | modest; not wanting attention | Despite her fame, she remained unassuming.
relentless | adjective | never stopping or becoming less intense | the relentless pursuit of perfection`],
      g: ['Emphasis: do, the very, whatsoever, by no means', "<table><tr><td>Emphatic <b>do / does / did</b></td><td>I <b>do</b> understand your concern. She <b>did</b> warn us.</td></tr><tr><td><b>the very</b></td><td>That is <b>the very</b> reason I left.</td></tr><tr><td><b>whatsoever / at all</b> after negatives</td><td>There is no evidence <b>whatsoever</b>.</td></tr><tr><td><b>by no means / not in the least</b></td><td>Success is <b>by no means</b> guaranteed.</td></tr><tr><td><b>such / so</b> + intensifiers</td><td>It was <b>such</b> a relentless schedule that…</td></tr></table>",
        [K.mc('I ___ appreciate your help, even if I don\'t show it.', ['do', 'am', 'have'], 0),
         K.mc('Talent alone is by no ___ enough.', ['ways', 'means', 'way'], 1),
         K.mc('He has no interest ___ in fame.', ['whatsoever', 'whenever', 'however'], 0),
         K.mc('That was the ___ moment she decided to quit.', ['same', 'very', 'just'], 1),
         K.gap('"You didn\'t call!" "I ___ call — twice!"', 'did'),
         K.ord('Success is by no means guaranteed.')]],
      r: ['The myth of the prodigy', "We are fascinated by prodigies: the child who composes symphonies at nine or wins international chess tournaments before reaching her teens. Their meteoric rise seems to confirm that greatness is a gift bestowed at birth.\n\nThe evidence, however, tells a more complicated story. Many celebrated prodigies do not go on to achieve extraordinary things as adults; the early accolades, it seems, can make the inevitable plateau feel like failure. Conversely, a striking number of the most influential figures in science and the arts were by no means exceptional children. What distinguished them was tenacity — a relentless, often unglamorous commitment to their work over decades.\n\nNone of this is to deny that talent exists. It does, and it matters. But it is the very ordinariness of persistence that makes it so easy to overlook — and so democratic: unlike genius, it is available to anyone prepared to keep going.",
        [K.mc('What do people often believe about greatness?', ['it is learned', 'it is a gift from birth', 'it is luck'], 1),
         K.mc('Why might early accolades harm prodigies?', ['they make the later plateau feel like failure', 'they make them lazy', 'they cause hubris in parents'], 0),
         K.tf('Many influential adults were exceptional as children.', false),
         K.mc('What distinguished the most influential figures?', ['tenacity', 'money', 'early fame'], 0),
         K.mc('Why does the writer call persistence "democratic"?', ['it is chosen by voting', 'anyone can develop it', 'governments support it'], 1)]] },

    { id: 'u7', t: 'The wild', topic: 'Nature and conservation',
      v: ['Wilderness and conservation', `
pristine | adjective | completely clean and untouched | The lake remains pristine.
encroach | verb | to gradually take over land belonging to something else | Farms are encroaching on the forest.
biodiversity | noun | the variety of living things in an area | Wetlands support remarkable biodiversity.
rewilding | noun | returning land to its natural state | Rewilding projects have brought back beavers.
habitat | noun | the natural home of an animal or plant | Habitat loss is the main threat to the species.
poaching | noun | illegal hunting | Poaching of saiga antelope has declined.
dwindle | verb | to become gradually smaller | The population had dwindled to a few thousand.
resurgence | noun | a return after a period of decline | The saiga's resurgence is a conservation success.`],
      g: ['Complex passives and causatives', "<table><tr><td>Passive infinitive / perfect</td><td>The area <b>needs to be protected</b>. The species <b>is believed to have been</b> saved.</td></tr><tr><td>Passive -ing</td><td>The animals dislike <b>being watched</b>.</td></tr><tr><td>Causative <b>have / get</b> sth done</td><td>The reserve <b>had</b> new fences <b>built</b>. We <b>got</b> the samples <b>analysed</b>.</td></tr><tr><td><b>need + -ing</b> (= needs to be done)</td><td>The signs <b>need replacing</b>.</td></tr></table>",
        [K.mc('The saiga is thought ___ almost extinct in 2003.', ['to be', 'to have been', 'being'], 1),
         K.mc('The rangers had cameras ___ along the river.', ['install', 'installed', 'installing'], 1),
         K.mc('The fences need ___.', ['repair', 'repairing', 'to repair'], 1),
         K.mc('Wild animals hate ___ by tourists.', ['being followed', 'following', 'to be follow'], 0),
         K.gap('The forest is said ___ (have) been cut down in the 1960s.', 'to have'),
         K.ord('The reserve must be protected from development.')]],
      r: ['The return of the saiga', "In the early 2000s, the saiga antelope of the Kazakh steppe appeared to be heading for extinction. Decades of poaching, driven by demand for the males' horns, had caused numbers to dwindle by around 95 per cent, and the species was thought to have fewer than 40,000 individuals left.\n\nWhat followed is one of the great conservation stories of the century. Anti-poaching patrols were strengthened, protected areas were created on a vast scale, and local communities were involved in monitoring herds. The results have been remarkable: by the early 2020s, the population was estimated to have recovered to well over a million animals.\n\nThis resurgence has brought new challenges. As herds encroach on farmland, conflicts with farmers have increased, and the question is no longer simply how to save the saiga, but how humans and a recovering species can share the steppe.",
        [K.mc('Why did saiga numbers fall?', ['disease', 'poaching for horns', 'climate change only'], 1),
         K.mc('By how much did the population fall?', ['about 50%', 'about 75%', 'about 95%'], 2),
         K.tf('Local communities were involved in monitoring herds.', true),
         K.mc('By the early 2020s, the population was estimated at…', ['under 40,000', 'around 100,000', 'well over a million'], 2),
         K.mc('What is the new challenge?', ['renewed poaching', 'conflict with farmers', 'lack of water'], 1)]] },

    { id: 'u8', t: 'What lies ahead', topic: 'The future of humanity',
      v: ['Thinking about the future', `
foreseeable | adjective | possible to predict | in the foreseeable future
paradigm shift | noun | a fundamental change in approach or ideas | The internet caused a paradigm shift in communication.
existential | adjective | relating to existence, especially the threat of ending it | Some regard climate change as an existential threat.
speculative | adjective | based on guesses rather than evidence | Such predictions are highly speculative.
trajectory | noun | the path or direction of development | The current trajectory is unsustainable.
inexorable | adjective | impossible to stop | the inexorable rise of automation
contingency | noun | a possible future event that you plan for | We need a contingency plan.
harbinger | noun | a sign that something is going to happen | The heatwave was a harbinger of hotter summers.`],
      g: ['Advanced modal meanings', "<table><tr><td><b>needn't have</b> vs <b>didn't need to</b></td><td>We <b>needn't have worried</b> (we worried, but it was unnecessary). We <b>didn't need to</b> worry (so we didn't).</td></tr><tr><td><b>may well / might well</b></td><td>strong probability: Robots <b>may well</b> replace drivers.</td></tr><tr><td><b>be bound to / be sure to</b></td><td>certainty: Prices <b>are bound to</b> rise.</td></tr><tr><td><b>would</b> for past habit / typical behaviour</td><td>She <b>would</b> walk for hours. · He <b>would</b> say that, wouldn't he?</td></tr><tr><td><b>could have</b> — unrealised possibility</td><td>Things <b>could have been</b> far worse.</td></tr></table>",
        [K.mc('We took umbrellas, but it was sunny. We ___ them.', ["needn't have taken", "didn't need to take"], 0),
         K.mc('The meeting was cancelled, so I ___ prepare anything.', ["needn't have prepared", "didn't need to"], 1),
         K.mc('Given current trends, prices are ___ to rise.', ['bound', 'sure that', 'well'], 0),
         K.mc('Automation ___ well transform the job market.', ['must', 'may', 'can'], 1),
         K.mc('The accident ___ have been far worse.', ['could', 'should', 'need'], 0),
         K.ord('In the foreseeable future, change is bound to accelerate.')]],
      r: ['Forecasting the future', "Predictions about the long-term future have an unflattering track record. Mid-twentieth-century forecasters confidently expected flying cars and holidays on the Moon, yet almost entirely failed to anticipate the internet — the very technology that would bring about a paradigm shift in how we live.\n\nPart of the difficulty is that change rarely follows a smooth trajectory. Developments that seem inexorable stall, while marginal ideas suddenly transform everything. For this reason, many futurists now prefer to think in terms of scenarios rather than predictions: instead of asking what will happen, they ask what might happen, and what contingency plans would serve us across a range of outcomes.\n\nThis humility is not pessimism. We needn't have perfect forecasts in order to act wisely; we need only recognise which risks are existential, which opportunities are real, and which of today's small developments may well turn out to be harbingers of tomorrow.",
        [K.mc('What did mid-twentieth-century forecasters fail to predict?', ['flying cars', 'the internet', 'space travel'], 1),
         K.mc('According to the text, change usually…', ['follows a smooth path', 'is unpredictable', 'stops completely'], 1),
         K.mc('Futurists now prefer to think in terms of…', ['exact predictions', 'scenarios', 'historical cycles'], 1),
         K.tf('The writer says perfect forecasts are necessary to act wisely.', false),
         K.mc('The tone of the final paragraph is…', ['pessimistic', 'humble but constructive', 'angry'], 1)]] }
  ]);
})();
