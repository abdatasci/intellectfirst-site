/* General English C1, units 3–8 (original IF Academy material; English only). */
(function () {
  var K = IFX.k;
  IFX.make('ge-c1', [
    { id: 'u3', t: 'Mind and body', topic: 'Health and psychology',
      v: ['Wellbeing and the mind', `
resilience | noun | the ability to recover quickly from difficulties | Resilience can be learned like any other skill.
cognitive | adjective | connected with thinking and understanding | Sleep loss affects cognitive performance.
sedentary | adjective | involving a lot of sitting and little exercise | A sedentary lifestyle increases health risks.
alleviate | verb | to make pain or a problem less severe | Gentle exercise can alleviate back pain.
detrimental | adjective | causing harm or damage | Chronic stress is detrimental to health.
mindful | adjective | consciously aware of the present moment | Try to be more mindful when you eat.
susceptible | adjective | easily affected or harmed by something | Older people are more susceptible to infection.
burnout | noun | physical and mental exhaustion caused by long-term stress | Teachers are at high risk of burnout.`],
      g: ['Reporting verbs and their patterns', "<table><tr><td>verb + <b>to</b></td><td>agree, offer, refuse, promise, threaten: The doctor <b>refused to prescribe</b> antibiotics.</td></tr><tr><td>verb + object + <b>to</b></td><td>advise, urge, warn, encourage, persuade: She <b>urged</b> patients <b>to rest</b>.</td></tr><tr><td>verb + <b>-ing</b></td><td>deny, admit, suggest, recommend: He <b>denied taking</b> the medication.</td></tr><tr><td>verb + preposition + <b>-ing</b></td><td>accuse sb <b>of</b>, blame sb <b>for</b>, apologise <b>for</b>, insist <b>on</b>: They <b>blamed</b> stress <b>for causing</b> the illness.</td></tr></table>",
        [K.mc('The coach ___ us to take a week off.', ['suggested', 'advised', 'insisted'], 1),
         K.mc('She denied ___ the results.', ['to change', 'changing', 'change'], 1),
         K.mc('Researchers have been accused ___ the data.', ['for exaggerating', 'of exaggerating', 'to exaggerate'], 1),
         K.mc('He insisted ___ paying for everyone.', ['on', 'to', 'for'], 0),
         K.gap('The doctor recommended ___ (reduce) screen time before bed.', 'reducing'),
         K.ord('They blamed long working hours for the rise in burnout.')]],
      r: ['The resilience myth', "We often speak of resilience as if it were a fixed personality trait: some people bounce back from setbacks, while others are permanently crushed. Psychologists increasingly reject this view. Resilience, they argue, is less a quality we possess than a set of habits we practise.\n\nThe most robust predictor is not optimism or toughness but social connection. People who have someone to confide in recover from illness faster and are far less susceptible to depression. Sleep, too, plays an underestimated role: even a few nights of poor sleep measurably reduce cognitive flexibility, making problems seem larger than they are.\n\nNone of this suggests that hardship should simply be endured. On the contrary, researchers urge employers to treat burnout as an organisational failure rather than an individual weakness. Telling exhausted staff to be more mindful, one psychologist observes, is 'like handing out umbrellas in a hurricane'.",
        [K.mc('According to psychologists, resilience is mainly…', ['a fixed personality trait', 'a set of habits that can be practised', 'impossible to change'], 1),
         K.mc('What is the strongest predictor of resilience?', ['optimism', 'social connection', 'physical strength'], 1),
         K.tf('Poor sleep affects how flexibly we think.', true),
         K.mc('Researchers believe burnout should be seen as…', ['an individual weakness', 'an organisational failure', 'unavoidable'], 1),
         K.mc('The umbrella comparison suggests that mindfulness advice alone is…', ['very effective', 'inadequate for a serious problem', 'too expensive'], 1)]] },

    { id: 'u4', t: 'Tomorrow\'s cities', topic: 'Urban future',
      v: ['Cities and change', `
urbanisation | noun | the process of more people moving to cities | Rapid urbanisation puts pressure on housing.
infrastructure | noun | basic systems such as roads, power and water | The city's infrastructure dates from the 1970s.
sprawl | noun | the uncontrolled spread of a city into the countryside | Suburban sprawl increases car dependency.
gentrification | noun | when wealthier people move into an area and change its character | Gentrification has pushed rents up.
congestion | noun | heavy traffic that slows movement | Congestion costs the economy billions.
retrofit | verb | to add new technology to an older building or system | Old blocks are being retrofitted with solar panels.
pedestrianise | verb | to close a street to traffic so only people can walk there | The old town was pedestrianised in 2018.
densely populated | adjective | with many people living in a small area | Singapore is densely populated.`],
      g: ['Future continuous and future perfect', "<table><tr><td><b>will be + -ing</b> — in progress at a future time</td><td>By 2040, most of us <b>will be living</b> in cities.</td></tr><tr><td><b>will have + past participle</b> — completed before a future time</td><td>By the end of the decade, the city <b>will have built</b> a metro.</td></tr><tr><td><b>will have been + -ing</b> — duration up to a future point</td><td>Next year, they <b>will have been working</b> on the project for ten years.</td></tr><tr><td>Also</td><td><b>be due to</b>, <b>be set to</b>, <b>be on the verge of</b>: The bridge <b>is due to</b> open in May.</td></tr></table>",
        [K.mc('By 2030, the population ___ by a third.', ['will grow', 'will have grown', 'will be growing'], 1),
         K.mc('This time next year, we ___ in the new office.', ['will be working', 'will have worked', 'work'], 0),
         K.mc('The new line is ___ to open next spring.', ['due', 'about', 'verge'], 0),
         K.gap('By June, she ___ been living here for five years.', 'will have'),
         K.mc('The company is on the ___ of collapse.', ['edge', 'verge', 'point'], 1),
         K.ord('By the time you arrive, we will have finished the meeting.')]],
      r: ['The fifteen-minute city', "Imagine a city in which everything you need — school, work, shops, a doctor, a park — lies within a fifteen-minute walk or bike ride. This is the idea behind the 'fifteen-minute city', a concept that has been embraced by planners from Paris to Melbourne.\n\nIts supporters argue that by 2050 most urban residents will be living in neighbourhoods that are greener, safer and less congested, because fewer journeys will require a car. Paris has already pedestrianised dozens of streets near schools and will have added hundreds of kilometres of cycle lanes by the end of this decade.\n\nCritics, however, warn of unintended consequences. Desirable walkable districts tend to become more expensive, accelerating gentrification and pushing lower-income families to the edges of the city — precisely where services are most scarce. A truly fair fifteen-minute city, they argue, must be planned from the outskirts in, not from the centre out.",
        [K.mc('The fifteen-minute city puts everyday services…', ['in the city centre only', 'within a short walk or ride', 'online'], 1),
         K.mc('Supporters believe these neighbourhoods will be…', ['more congested', 'greener and safer', 'more expensive to run'], 1),
         K.tf('Paris has already pedestrianised streets near schools.', true),
         K.mc('What risk do critics mention?', ['gentrification pushing poorer families out', 'too many parks', 'lack of cars'], 0),
         K.mc('Critics say a fair plan should start…', ['from the centre', 'from the outskirts', 'with new metro lines'], 1)]] },

    { id: 'u5', t: 'Fair shares', topic: 'Society',
      v: ['Society and inequality', `
disparity | noun | a large difference, especially an unfair one | There is a wide disparity in incomes.
marginalised | adjective | treated as unimportant and excluded from society | Marginalised groups have less access to healthcare.
entrenched | adjective | firmly established and hard to change | Entrenched attitudes are slow to shift.
equitable | adjective | fair and reasonable for everyone | We need a more equitable tax system.
redistribution | noun | sharing wealth more equally | Redistribution remains politically controversial.
meritocracy | noun | a system where people succeed through ability, not wealth | Is our education system a true meritocracy?
upward mobility | noun | moving to a higher social or economic position | Education is a key driver of upward mobility.
safety net | noun | help given to people who are in difficulty | A strong social safety net protects the vulnerable.`],
      g: ['Purpose and contrast: advanced linking', "<table><tr><td>Purpose</td><td><b>so as to / in order to</b> + verb · <b>so that</b> + clause · <b>with a view to</b> + -ing: Taxes were raised <b>so as to</b> fund schools.</td></tr><tr><td>Concession</td><td><b>although / even though</b> + clause · <b>despite / in spite of</b> + noun / -ing · <b>albeit</b> + adjective / adverb: The policy worked, <b>albeit</b> slowly.</td></tr><tr><td>Contrast</td><td><b>whereas / while</b>: Some regions prospered, <b>whereas</b> others declined.</td></tr><tr><td>Formal fronting</td><td><b>Much as</b> I admire the idea, … · <b>However</b> generous the offer, …</td></tr></table>",
        [K.mc('The scheme was successful, ___ on a small scale.', ['although', 'albeit', 'despite'], 1),
         K.mc('___ rising wages, inequality grew.', ['Although', 'Despite', 'Whereas'], 1),
         K.mc('Funding was increased ___ reduce class sizes.', ['so as to', 'so that', 'with a view'], 0),
         K.mc('Wealth grew in the cities, ___ rural incomes fell.', ['whereas', 'despite', 'albeit'], 0),
         K.gap('___ as I agree with the goal, I doubt the method.', 'Much'),
         K.ord('The law was changed with a view to reducing poverty.')]],
      r: ['Is meritocracy fair?', "Few ideas are as widely admired as meritocracy: the belief that rewards should go to those with talent and effort, rather than to those born into privilege. Yet a growing number of thinkers argue that meritocracy, however attractive in principle, can deepen the very disparities it claims to cure.\n\nThe problem is that 'merit' is rarely measured on a level playing field. Children from wealthier families benefit from private tutoring, quieter homes and wider networks, so that their apparent merit is partly inherited. When success is then explained as the result of individual effort alone, those who fall behind may be blamed for their own disadvantage, and entrenched inequalities come to look natural.\n\nNone of these critics wishes to return to a world of inherited privilege. Rather, they argue that a genuinely equitable society needs both opportunity and a robust safety net — so that failure, which is often a matter of luck, does not become a permanent sentence.",
        [K.mc('Meritocracy rewards people according to…', ['their family', 'talent and effort', 'luck'], 1),
         K.mc('Why is merit not measured on a level playing field?', ['tests are too difficult', 'wealthier children have more support', 'teachers are biased'], 1),
         K.tf('The critics want to return to a system of inherited privilege.', false),
         K.mc('What danger do critics see in explaining success by effort alone?', ['people who fall behind are blamed', 'everyone becomes lazy', 'taxes rise'], 0),
         K.mc('The critics believe a fair society needs…', ['less education', 'opportunity and a safety net', 'more competition'], 1)]] },

    { id: 'u6', t: 'The power of words', topic: 'Language and communication',
      v: ['Communication', `
articulate | adjective | able to express ideas clearly | She is an articulate speaker.
eloquent | adjective | using language beautifully and persuasively | He gave an eloquent speech.
ambiguous | adjective | having more than one possible meaning | The instructions were ambiguous.
convey | verb | to communicate an idea or feeling | Tone of voice conveys emotion.
jargon | noun | special words used by a group that others find hard to understand | Avoid legal jargon in letters to clients.
rapport | noun | a friendly understanding between people | A good teacher quickly builds rapport.
tactful | adjective | careful not to upset people | It was a tactful way to say no.
misconstrue | verb | to understand something wrongly | My joke was misconstrued as criticism.`],
      g: ['Verbs that change meaning: -ing or to', "<table><tr><td><b>remember / forget</b></td><td><b>doing</b> = memory of the past · <b>to do</b> = a task: I remember <b>meeting</b> her. Remember <b>to call</b> her.</td></tr><tr><td><b>stop</b></td><td><b>doing</b> = no longer do · <b>to do</b> = pause in order to: He stopped <b>smoking</b>. He stopped <b>to smoke</b>.</td></tr><tr><td><b>try</b></td><td><b>doing</b> = experiment · <b>to do</b> = make an effort: Try <b>restarting</b> it. I tried <b>to explain</b>.</td></tr><tr><td><b>regret</b></td><td><b>doing</b> = sorry about the past · <b>to say / tell / inform</b> = formal bad news: We regret <b>to inform</b> you…</td></tr><tr><td><b>go on</b></td><td><b>doing</b> = continue · <b>to do</b> = move to something new</td></tr></table>",
        [K.mc('I clearly remember ___ him the email.', ['sending', 'to send'], 0),
         K.mc('Please remember ___ the door when you leave.', ['locking', 'to lock'], 1),
         K.mc('We regret ___ you that the course is full.', ['informing', 'to inform'], 1),
         K.mc('If the app crashes, try ___ your phone.', ['restarting', 'to restart'], 0),
         K.mc('After discussing sales, she went on ___ the new strategy.', ['presenting', 'to present'], 1),
         K.ord('He stopped to check his messages.')]],
      r: ['Lost in translation at work', "In international teams, misunderstandings rarely arise from grammar mistakes. Far more often, they stem from differences in how directly people convey disagreement.\n\nIn some cultures, a manager who says 'That's an interesting idea — perhaps we could look at it again' is clearly rejecting the proposal. A colleague from a more direct culture may misconstrue this as encouragement and go on developing the idea for weeks. Conversely, a blunt 'This won't work' may sound constructive in one office and shockingly rude in another.\n\nCommunication experts suggest that the most effective international professionals are not necessarily the most eloquent. Instead, they are those who stop to check their interpretation — 'So, to be clear, you'd prefer we didn't proceed?' — and who build enough rapport for honest, tactful feedback to feel safe.",
        [K.mc('Most misunderstandings in international teams come from…', ['grammar mistakes', 'differences in directness', 'jargon'], 1),
         K.mc('"Perhaps we could look at it again" may actually mean…', ['great idea', 'no', 'start immediately'], 1),
         K.tf('A blunt comment is understood the same way in every culture.', false),
         K.mc('According to experts, the best international professionals…', ['speak most eloquently', 'check their interpretation', 'avoid feedback'], 1),
         K.mc('"Rapport" helps feedback to feel…', ['safe', 'formal', 'unnecessary'], 0)]] },

    { id: 'u7', t: 'Taking risks', topic: 'Risk and adventure',
      v: ['Risk and courage', `
reckless | adjective | doing dangerous things without thinking about the results | It was reckless to climb without a rope.
daunting | adjective | making you feel worried about your ability to do something | Starting a business is daunting.
calculated risk | noun | a risk taken after carefully considering the possible results | Leaving her job was a calculated risk.
adrenaline | noun | a hormone that makes your heart beat faster in danger or excitement | Skydivers love the adrenaline rush.
cautious | adjective | careful to avoid danger | Investors are being cautious this year.
venture | noun / verb | a new, risky business or activity | Their joint venture failed within a year.
thrive | verb | to grow or develop very well | Some people thrive under pressure.
complacent | adjective | too satisfied with yourself to notice danger | Success made the team complacent.`],
      g: ['Unreal past: it\'s time, would rather, as if', "<p>After these expressions, a <b>past tense</b> describes the present or future — it shows something is unreal or not yet true.</p><table><tr><td><b>It's (high) time</b> + past</td><td>It's time we <b>took</b> this seriously.</td></tr><tr><td><b>would rather</b> + sb + past</td><td>I'd rather you <b>didn't tell</b> anyone. (but: I'd rather <b>not tell</b> anyone)</td></tr><tr><td><b>as if / as though</b></td><td>He behaves as if nothing <b>were</b> wrong.</td></tr><tr><td><b>suppose / supposing</b></td><td>Suppose you <b>lost</b> everything — what would you do?</td></tr></table>",
        [K.mc('It\'s high time the government ___ action.', ['takes', 'took', 'will take'], 1),
         K.mc('I\'d rather you ___ climb alone.', ["don't", "didn't", "won't"], 1),
         K.mc('She talks as if she ___ an expert.', ['is', 'were', 'be'], 1),
         K.mc('I\'d rather ___ the risk.', ['not take', "didn't take", 'not taking'], 0),
         K.gap('Supposing you ___ (fail) — would you try again?', 'failed'),
         K.ord("It's time we stopped being so cautious.")]],
      r: ['Why we need to take risks', "Modern life has become remarkably safe. Playgrounds are padded, products carry warnings, and careers are planned to minimise uncertainty. Yet some psychologists argue that it is high time we questioned whether this obsession with safety is doing us more harm than good.\n\nTheir research suggests that people who regularly face manageable challenges — learning a language, speaking in public, starting a small venture — thrive more than those who avoid all risk. Taking a calculated risk and surviving it builds confidence; avoiding every daunting situation, by contrast, makes ordinary difficulties feel overwhelming.\n\nThis is not an argument for being reckless. The point is rather that a life without risk is not risk-free: it carries the hidden danger of becoming complacent, fragile and unprepared for the uncertainty that eventually reaches everyone.",
        [K.mc('Some psychologists question society\'s obsession with…', ['adventure', 'safety', 'money'], 1),
         K.mc('People who face manageable challenges tend to…', ['thrive', 'become reckless', 'avoid risk'], 0),
         K.tf('The writer recommends behaving recklessly.', false),
         K.mc('Avoiding all daunting situations makes ordinary problems feel…', ['easier', 'overwhelming', 'exciting'], 1),
         K.mc('The "hidden danger" of a risk-free life is becoming…', ['too brave', 'complacent and fragile', 'rich'], 1)]] },

    { id: 'u8', t: 'Truth in the media', topic: 'Media and misinformation',
      v: ['News and misinformation', `
misinformation | noun | false information spread by mistake | Misinformation spreads faster than corrections.
disinformation | noun | false information spread deliberately to deceive | The campaign was a disinformation operation.
credible | adjective | able to be believed or trusted | Is the source credible?
sensationalist | adjective | exaggerating to shock or excite people | Sensationalist headlines attract clicks.
verify | verb | to check that something is true | Journalists must verify their sources.
bias | noun | an unfair preference for one side | The report showed a clear political bias.
echo chamber | noun | a space where people only hear opinions like their own | Social media can become an echo chamber.
allegedly | adverb | used when something is said but not proven | The minister allegedly accepted a bribe.`],
      g: ['Hedging and distancing', "<p>Careful writers avoid stating claims too strongly. Use <b>hedging</b> to show uncertainty and <b>distancing</b> to show the claim is not your own.</p><table><tr><td>Verbs</td><td>The policy <b>appears to</b> / <b>seems to</b> have failed. This <b>may suggest</b> that…</td></tr><tr><td>Passive reporting</td><td><b>It is thought that</b>… · The company <b>is said to be</b> in difficulty.</td></tr><tr><td>Adverbs</td><td><b>apparently, allegedly, arguably, seemingly, to some extent</b></td></tr><tr><td>Softening</td><td><b>There is some evidence that</b>… · <b>It would seem that</b>…</td></tr></table>",
        [K.mc('The fire ___ to have started in the kitchen.', ['appears', 'is appearing', 'appeared it'], 0),
         K.mc('It ___ thought that the virus came from bats.', ['has', 'is', 'was being'], 1),
         K.mc('The minister ___ lied to parliament (it is not proven).', ['definitely', 'allegedly', 'obviously'], 1),
         K.mc('Which is the most cautious claim?', ['Social media causes depression.', 'Social media may contribute to depression in some users.', 'Social media always causes depression.'], 1),
         K.gap('The singer is said ___ (be) planning a world tour.', 'to be'),
         K.ord('It would seem that the results were exaggerated.')]],
      r: ['Why false stories travel fast', "A widely cited study of social media found that false stories were, on average, shared significantly more often than true ones and reached people several times faster. Perhaps surprisingly, the main culprits appeared to be ordinary users rather than automated accounts.\n\nResearchers suggest that novelty is the key. False stories tend to be more surprising and emotionally charged — often sensationalist — and people seem to share them in order to appear well-informed. Once a story enters an echo chamber, it is rarely challenged, since everyone in the group already shares the same assumptions.\n\nFact-checking alone, it would seem, is not enough: corrections reach fewer people and arrive too late. Some experts therefore argue that the most effective defence is 'pre-bunking' — teaching people in advance to recognise the techniques used to manipulate them, so that they pause to verify before they share.",
        [K.mc('According to the study, false stories spread…', ['more slowly than true ones', 'faster than true ones', 'at the same speed'], 1),
         K.mc('Who mainly spread the false stories?', ['automated accounts', 'ordinary users', 'journalists'], 1),
         K.mc('Why do people share false stories, according to researchers?', ['to appear well-informed', 'to make money', 'by accident only'], 0),
         K.tf('Fact-checking alone is described as sufficient.', false),
         K.mc('"Pre-bunking" means…', ['correcting stories after they spread', 'teaching people manipulation techniques in advance', 'blocking websites'], 1)]] }
  ]);
})();
