/* IF Daily Articles, B2 to C2: articles 4 onwards (original IF Academy texts). The first three of each level are in articles.js.
   Add new ones at the end of each list; the order here is the order of the days. C1 and C2 are English only. */
(function () {
  var A = window.IF_ARTICLES; if (!A) return;

  A.add('B2', [
  { id: 'b2-004', t: 'Why cities are warmer than the countryside', topic: 'Environment',
    text: `Anyone who has cycled out of a big city on a summer evening has felt it: at some point the air suddenly becomes cooler. The difference is not imaginary. Cities are consistently warmer than the land around them, sometimes by several degrees, and the effect is strongest at night. Scientists call it the urban heat island.

The causes are easy to understand once you look at what a city is made of. Concrete, brick and asphalt absorb the sun's energy all day and release it slowly after dark, like a stone left by a fire. The countryside, by contrast, is covered in plants. Plants draw water from the soil and release it through their leaves, which cools the air in much the same way that sweat cools our skin.

Cities also produce heat of their own. Engines, air conditioners and millions of appliances all give off warmth. Air conditioning is a particularly unfortunate example: it cools the inside of a building by pushing heat into the street. Tall buildings then make matters worse by blocking the wind that might carry the warm air away.

None of this would matter much if it were merely uncomfortable. But during heatwaves, the extra degrees can be dangerous, especially for elderly people living alone in top-floor flats.

Fortunately, the solutions are neither mysterious nor especially expensive. Trees are the most effective: a shaded street can be dramatically cooler than an exposed one. Roofs painted in pale colours reflect sunlight instead of storing it. Some cities are replacing car parks with small parks, and others are bringing buried streams back to the surface.

What these measures have in common is that they make a city more pleasant as well as cooler. It is rare for the sensible choice and the attractive one to be the same, which makes this an opportunity worth taking.`,
    v: `consistently | adverb | always in the same way | Cities are consistently warmer. | постоянно, неизменно
absorb | verb | to take in heat, light or liquid | Dark surfaces absorb more heat. | поглощать
release | verb | to let something out | The walls release heat at night. | выделять, отдавать
heatwave | noun | a period of unusually hot weather | The heatwave lasted two weeks. | период сильной жары
shaded | adjective | protected from direct sunlight | We sat on a shaded bench. | затенённый
measure | noun | an action taken to deal with a problem | The city introduced new measures. | мера`,
    q: [
      { q: 'When is the urban heat island effect strongest?', o: ['At night', 'At midday', 'In winter mornings'], a: 0 },
      { q: 'How do plants cool the air?', o: ['By blocking the wind', 'By releasing water through their leaves', 'By absorbing concrete'], a: 1 },
      { q: 'Why is air conditioning described as unfortunate?', o: ['It is too quiet', 'It uses no energy', 'It pushes heat into the street'], a: 2 },
      { q: 'Who is most at risk in a heatwave, according to the text?', o: ['Elderly people living alone on top floors', 'Cyclists', 'Shop owners'], a: 0 },
      { q: 'What do the solutions have in common?', o: ['They are all very expensive', 'They make a city more pleasant as well as cooler', 'They require new technology'], a: 1 }
    ] },
  { id: 'b2-005', t: 'The placebo effect', topic: 'Medicine',
    text: `Imagine that a doctor gives you a pill for a headache. Within half an hour, the pain has faded. Later you discover that the pill contained nothing but sugar. Were you imagining the pain? Not at all. You have simply experienced one of the most curious findings in medicine: the placebo effect.

A placebo is a treatment with no active ingredient. It should, in theory, do nothing. In practice, a proportion of patients who receive one report that they feel better, particularly when the problem is pain, tiredness or nausea. Their improvement is not a lie. Expecting relief appears to change how the brain processes unpleasant signals.

Some of the details are remarkable. In various studies, the appearance of the treatment has seemed to matter: an injection tends to produce a stronger response than a pill, and a confident, attentive doctor a stronger one than a hurried one. The ritual of being cared for seems to be part of the medicine.

This is precisely why new drugs are tested the way they are. Volunteers are divided into two groups. One receives the real drug and the other a placebo, and neither the patients nor the doctors know who has which. Only if the real drug clearly outperforms the placebo can anyone claim that it works.

It is important not to exaggerate. A placebo may ease how an illness feels, but there is no good evidence that it can shrink a tumour or cure an infection. Anyone who abandons real treatment in favour of belief alone is taking a serious risk.

Nevertheless, the effect carries a useful lesson for ordinary medicine. Patients are not machines to be repaired. How they are spoken to, how much time they are given and whether they trust the person treating them can all influence how they feel, and feeling better is, after all, a large part of what patients want.`,
    v: `ingredient | noun | one of the things that something is made from | The pill had no active ingredient. | ингредиент, компонент
relief | noun | the feeling when pain or worry stops | The medicine brought quick relief. | облегчение
remarkable | adjective | unusual and surprising | The results were remarkable. | поразительный
outperform | verb | to do better than something else | The new drug outperformed the old one. | превосходить
exaggerate | verb | to make something seem bigger or more important than it is | Don't exaggerate the benefits. | преувеличивать
abandon | verb | to stop doing or using something | He abandoned the treatment. | отказываться, бросать`,
    q: [
      { q: 'What is a placebo?', o: ['A treatment with no active ingredient', 'A very strong painkiller', 'A kind of injection only'], a: 0 },
      { q: 'For which problems does it seem to work best?', o: ['Broken bones', 'Pain, tiredness and nausea', 'Infections'], a: 1 },
      { q: 'Why do neither patients nor doctors know who gets the real drug?', o: ['To save money', 'To keep the test short', 'So that expectations do not affect the result'], a: 2 },
      { q: 'What can a placebo NOT do, according to the text?', o: ['Cure an infection', 'Make pain feel less', 'Reduce tiredness'], a: 0 },
      { q: 'What lesson does the writer draw?', o: ['Doctors should give more sugar pills', 'How patients are treated as people matters', 'New drugs do not need testing'], a: 1 }
    ] },
  { id: 'b2-006', t: 'The art of listening', topic: 'Communication',
    text: `Most of us would describe ourselves as good listeners. Most of us are wrong. What we call listening is, much of the time, waiting: we stay quiet while the other person speaks, but our attention is on what we intend to say next.

Real listening is surprisingly hard work. People speak far more slowly than we can think, which leaves the mind with spare capacity. Unless we make an effort, it fills the gap with its own concerns: a reply, a judgement, a shopping list. The speaker usually notices. A glance at a phone or a slightly delayed "mm" is enough to tell someone that they have lost their audience.

Good listeners do several things differently. First, they let silences happen. A pause that feels awkward to us is often the moment when the other person is deciding whether to say what really matters. Second, they ask questions that could not have been prepared in advance, questions that grow out of what was just said. Third, they resist the temptation to solve. When a friend describes a problem, our instinct is to offer advice. Frequently, what the friend wants is to feel understood, and advice, however sensible, can sound like a polite request to stop talking.

There is also a simple technique that works remarkably well: repeating the essence of what you have heard in your own words. "So you felt that nobody had asked for your opinion." It may seem artificial, but it shows that you were paying attention, and it gives the speaker a chance to correct you.

The rewards are considerable. People who feel listened to become less defensive and more willing to listen in return. Negotiators, doctors and teachers all rely on this. In a period when everyone is encouraged to express themselves, the person who can truly pay attention to someone else has become unusual, and unusually valuable.`,
    v: `capacity | noun | the ability to hold or do something | The mind has spare capacity. | ёмкость, способность
glance | noun | a quick look | She took a glance at her phone. | беглый взгляд
awkward | adjective | uncomfortable or embarrassing | There was an awkward silence. | неловкий
resist | verb | to stop yourself from doing something you want to do | I couldn't resist giving advice. | удерживаться, сопротивляться
essence | noun | the most important part of something | Repeat the essence of what you heard. | суть
defensive | adjective | behaving as if you are being criticised | He became defensive at once. | занимающий оборонительную позицию`,
    q: [
      { q: 'What are we often doing when we think we are listening?', o: ['Waiting for our turn to speak', 'Taking careful notes', 'Checking facts'], a: 0 },
      { q: 'Why does the mind wander while someone speaks?', o: ['Speech is too fast', 'We think faster than people speak', 'Listening is boring'], a: 1 },
      { q: 'What may a pause in the conversation mean?', o: ['The conversation is over', 'The speaker is angry', 'The speaker is deciding whether to say something important'], a: 2 },
      { q: 'Why can advice be unwelcome?', o: ['It can sound like a request to stop talking', 'It is always wrong', 'Friends never have problems'], a: 0 },
      { q: 'What is the technique described near the end?', o: ['Changing the subject', 'Repeating the main point in your own words', 'Staying completely silent'], a: 1 }
    ] },
  { id: 'b2-007', t: 'The second life of clothes', topic: 'Society',
    text: `Not long ago, buying second-hand clothes was something people did quietly, out of necessity. Today teenagers boast about a jacket they found for almost nothing, and online platforms for used fashion have millions of customers. What changed?

Part of the answer is money. New clothes of decent quality have become expensive, while cheap ones often lose their shape after a few washes. A well-made second-hand coat can cost less than a poor new one and outlast it by years.

Part of it is conscience. Making clothes uses enormous quantities of water and energy, and a large share of what is produced is worn only a handful of times before it is thrown away. Many younger shoppers are uneasy about this. Buying something that already exists feels like a small refusal to take part.

And part of it is simply taste. When everybody shops at the same few chains, everybody looks alike. A second-hand shop offers the opposite: one of everything, from every decade. Finding the right piece takes patience, which is exactly what makes it satisfying. Nobody tells a story about a shirt they ordered in thirty seconds.

The trend has its critics. Some point out that people who resell clothes online may simply use the income to buy more new ones, so the total keeps rising. Others note that as second-hand becomes fashionable, prices climb, and those who depended on it are priced out.

These are fair objections, and they suggest that second-hand shopping is not a solution in itself. The more important change may be in attitude. A generation is learning to ask where a garment came from, how long it will last and what will happen to it afterwards. Those are good questions to ask about a coat, and about a great deal else besides.`,
    v: `necessity | noun | the fact of needing something; having no choice | They bought used clothes out of necessity. | необходимость
boast | verb | to talk too proudly about something | He boasts about his cheap finds. | хвастаться
outlast | verb | to last longer than something else | A good coat will outlast a cheap one. | прослужить дольше
conscience | noun | the feeling that tells you what is right or wrong | My conscience would not let me. | совесть
uneasy | adjective | worried or slightly uncomfortable | She felt uneasy about the waste. | испытывающий беспокойство
objection | noun | a reason for disagreeing | That is a fair objection. | возражение`,
    q: [
      { q: 'How was second-hand shopping seen in the past?', o: ['As something done quietly, out of necessity', 'As a luxury', 'As illegal'], a: 0 },
      { q: 'What is the money argument?', o: ['Used clothes are always free', 'A good used coat can cost less and last longer than a poor new one', 'New clothes never wear out'], a: 1 },
      { q: 'Why is finding the right piece satisfying?', o: ['It is instant', 'It is advertised', 'It takes patience'], a: 2 },
      { q: 'What is one criticism of the trend?', o: ['Rising prices push out people who depended on it', 'Used clothes are unhygienic', 'Shops are too far away'], a: 0 },
      { q: 'What does the writer think matters most?', o: ['The number of shops', 'The change in attitude', 'The price of jackets'], a: 1 }
    ] }
  ]);

  A.add('C1', [
  { id: 'c1-004', t: 'What we only think we understand', topic: 'Psychology',
    text: `Ask people whether they understand how a zip works and most will say yes without hesitation. Ask them to explain it, step by step, and something awkward happens. The explanation runs out after a sentence or two, and their confidence drops sharply. Psychologists who have run versions of this experiment with everyday objects have found the pattern again and again. We mistake familiarity for understanding.

The reason is not stupidity. It is that we live inside a vast division of intellectual labour. Nobody alive could build a smartphone from raw materials, or even fully describe one; the knowledge is distributed among thousands of specialists. Because that knowledge is always within reach, we rarely notice where our own ends and other people's begins. We know that somebody knows, and it feels much the same as knowing.

For zips and bicycles this hardly matters. For public questions it matters a great deal. People often hold forceful views on taxation, energy policy or healthcare systems whose workings they could not outline. The strength of an opinion, it turns out, is a poor guide to the depth of knowledge behind it.

There is, however, an encouraging twist. In some studies, when people were asked to explain in detail how a policy they supported would actually produce its effects, their positions tended to become more moderate. Asking them merely to list reasons for their view did not have this effect; it simply hardened it. Reasons can be recited. Mechanisms have to be understood, and the attempt exposes the gaps.

The practical implications are modest but real. Before defending a position, it is worth trying to explain the mechanism to oneself, on paper, as if to an intelligent twelve-year-old. And when a conversation turns hostile, "How would that work, exactly?" is often a more productive question than "Why do you believe that?" It invites the other person to discover the limits of their knowledge themselves, which is a good deal more persuasive than being told.

None of this is an argument for having no opinions. It is an argument for holding them with a grip proportionate to what we actually know.`,
    v: `hesitation | noun | a pause before doing something, because of doubt | She agreed without hesitation.
familiarity | noun | the state of knowing something well through frequent contact | Familiarity is not the same as understanding.
distributed | adjective | spread among many people or places | The knowledge is distributed among specialists.
forceful | adjective | expressed strongly and confidently | He holds forceful views on tax.
moderate | adjective | not extreme | Their positions became more moderate.
proportionate | adjective | of a suitable size in relation to something else | Hold opinions with a proportionate grip.`,
    q: [
      { q: 'What happens when people try to explain how a zip works?', o: ['Their confidence drops', 'They explain it perfectly', 'They refuse to answer'], a: 0 },
      { q: 'Why do we overestimate our understanding?', o: ['We are not intelligent enough', 'Other people\'s knowledge is always within reach', 'Objects are too simple'], a: 1 },
      { q: 'What does the text say about strong opinions?', o: ['They show deep knowledge', 'They are always wrong', 'They are a poor guide to how much someone knows'], a: 2 },
      { q: 'What made people\'s positions more moderate in some studies?', o: ['Explaining how the policy would work', 'Listing reasons for their view', 'Hearing an expert'], a: 0 },
      { q: 'Which question does the writer recommend in a hostile conversation?', o: ['"Why do you believe that?"', '"How would that work, exactly?"', '"Who told you that?"'], a: 1 }
    ] },
  { id: 'c1-005', t: 'In defence of slow travel', topic: 'Travel',
    text: `The modern holiday is a triumph of logistics. In ten days it is entirely possible to see four capitals, photograph a dozen monuments and return home with the vague sense of having watched a film on fast-forward. We have become extraordinarily efficient at arriving, and rather poor at being anywhere.

Slow travel is the deliberate alternative. Its principles are simple: go to fewer places, stay longer, and move between them overland where possible. A fortnight in one small town replaces a tour of seven cities. The train replaces the short flight, not only for environmental reasons but because the journey is then part of the experience and not an interruption of it.

What is gained is difficult to put on a postcard. After three or four days in the same neighbourhood, the baker begins to recognise you. You learn which café fills up after the market closes, and why. You stop consulting the map. A place ceases to be a collection of sights and becomes a set of routines, and it is in routines that the character of a place actually lives.

There is a psychological argument too. Anticipation and memory make up most of the pleasure of travel, and both are fed by depth more than by quantity. People who rush through a list of attractions often struggle, a year later, to tell them apart. Those who spent a week doing apparently little can describe it hour by hour.

The obvious objection is that slow travel is a luxury. Not everyone has a month of leave, and for someone who may visit a continent once, the temptation to see everything is entirely reasonable. That is fair. But slowness is a matter of proportion, not of duration. Even a long weekend can be spent in one district on foot instead of in three cities by taxi.

The underlying question is what we imagine travel is for. If it is for collecting evidence that we have been somewhere, speed serves us well. If it is for discovering how other people arrange their days, and perhaps reconsidering how we arrange our own, there is no substitute for staying put.`,
    v: `logistics | noun | the practical organisation needed to make a complicated plan work | The trip was a triumph of logistics.
deliberate | adjective | done on purpose, after thought | Slow travel is a deliberate choice.
fortnight | noun | a period of two weeks (British English) | We spent a fortnight in one town.
anticipation | noun | the feeling of looking forward to something | Anticipation is part of the pleasure.
proportion | noun | the relationship in size or amount between things | It is a matter of proportion, not duration.
stay put | phrase | to remain in one place | Sometimes it is better to stay put.`,
    q: [
      { q: 'What is the writer\'s criticism of the modern holiday?', o: ['We arrive efficiently but do not really experience places', 'It is too cheap', 'It is badly organised'], a: 0 },
      { q: 'Why does the writer prefer the train?', o: ['It is always faster', 'The journey becomes part of the experience', 'It is always cheaper'], a: 1 },
      { q: 'Where does the character of a place live, according to the text?', o: ['In its monuments', 'In its museums', 'In its routines'], a: 2 },
      { q: 'What objection does the writer accept as fair?', o: ['Slow travel is a luxury for some', 'Slow travel is boring', 'Trains are unreliable'], a: 0 },
      { q: 'How does the writer answer that objection?', o: ['Everyone should take a month off', 'Slowness is about proportion, not duration', 'Flights should be banned'], a: 1 }
    ] },
  { id: 'c1-006', t: 'Why we fear the wrong things', topic: 'Risk',
    text: `Many people who would never board a small aircraft will happily drive home tired on a wet motorway. Parents who forbid their children to walk to school will strap them into a car without a second thought. Measured against the statistics, such choices are difficult to defend. Measured against how the human mind estimates danger, they make perfect sense.

We do not, as a rule, calculate risk. We feel it. And the feeling is shaped by a handful of predictable distortions. The first is vividness. A dramatic event that is easy to picture seems more probable than a dull one, regardless of how often each occurs. A single accident shown repeatedly on the news can outweigh thousands of quiet, unreported ones.

The second is control. Risks we choose and manage ourselves feel smaller than risks imposed on us. Behind the wheel we believe our skill protects us; as passengers in a plane we can only sit. That the belief in our own skill is frequently exaggerated does not weaken its hold.

The third is familiarity. A hazard we have lived with for years fades into the background, while a new one commands our full attention, however slight it may be. The stairs in one's own house rarely frighten anyone.

These instincts were presumably useful in a world of immediate, visible threats. They serve us less well in one where the significant dangers are gradual and statistical: a diet, a habit, an hour too many spent sitting down. Such risks generate no headlines and trigger no alarm, which is precisely what makes them effective.

Knowing about these distortions does not switch them off, but it does allow a small correction. When a fear feels overwhelming, it is worth asking whether the thing is truly likely or merely easy to imagine. And when something feels perfectly safe, it is worth asking whether that is a fact or simply a habit.

The aim is not to live anxiously. If anything, it is the reverse: to spend our limited supply of worry where it might actually do some good.`,
    v: `distortion | noun | a change that makes something appear different from how it really is | Our sense of risk is full of distortions.
vividness | noun | the quality of producing strong, clear images in the mind | Vividness makes an event seem likely.
impose | verb | to force something on somebody | Risks imposed on us feel larger.
hazard | noun | something that can be dangerous | Wet floors are a hazard.
gradual | adjective | happening slowly over a long time | The danger is gradual and easy to miss.
trigger | verb | to cause something to start | Such risks trigger no alarm.`,
    q: [
      { q: 'How do we usually judge risk, according to the text?', o: ['We feel it; we do not calculate it', 'We consult statistics', 'We ask experts'], a: 0 },
      { q: 'What is the effect of vividness?', o: ['Dull events seem more likely', 'Dramatic events seem more probable than they are', 'All events seem equally likely'], a: 1 },
      { q: 'Why does driving feel safer than flying to many people?', o: ['Cars are newer', 'Driving is cheaper', 'They feel in control when driving'], a: 2 },
      { q: 'Why are gradual, statistical risks effective?', o: ['They produce no headlines and no alarm', 'They are very rare', 'They are always visible'], a: 0 },
      { q: 'What is the writer\'s aim?', o: ['To make readers more anxious', 'To help us spend our worry where it does some good', 'To stop people driving'], a: 1 }
    ] },
  { id: 'c1-007', t: 'The quiet power of defaults', topic: 'Behaviour',
    text: `Every form we fill in, every device we unbox and every account we open arrives with certain choices already made on our behalf. The box is ticked or unticked; the setting is on or off. We are free to change these defaults, and the striking fact is how seldom we do.

The tendency is well documented. Where joining a workplace savings scheme requires an employee to opt in, participation is typically modest. Where employees are enrolled automatically and must opt out to leave, participation is far higher, although the options available are identical. Nothing has been forbidden and nothing required. Only the starting point has moved.

Several forces are at work. One is plain inertia: changing a setting demands attention, and attention is scarce. Another is the suspicion that a default represents a recommendation. If the people who designed the system chose this option, we reason, they presumably had grounds. A third is our dislike of responsibility. A choice we actively make is one we can regret; a choice made for us is merely something that happened.

The implications cut both ways. A well-chosen default can help large numbers of people do what they themselves say they want, such as save for retirement, without restricting anyone's freedom. For this reason, designers of public policy have taken a keen interest in the subject.

But the same lever is available to those whose interests are not ours. The pre-ticked box that subscribes us to marketing, the free trial that renews at full price, the privacy setting that shares everything unless we object: each relies on the knowledge that most people will not get round to changing it. The line between helping people and exploiting their inattention can be thin, and it is not always drawn in good faith.

A reasonable test is whether the person would thank you if they understood exactly what had been set up for them. Defaults that pass it are a kindness. Defaults that fail it are a trap with good manners.

For the rest of us, the lesson is unglamorous: it pays to look at the boxes somebody else has already ticked.`,
    v: `on somebody's behalf | phrase | instead of somebody; as their representative | Choices are made on our behalf.
opt in | phrasal verb | to choose to take part in something | Few employees opt in.
inertia | noun | the tendency to stay unchanged; lack of energy to act | Inertia keeps us from changing settings.
scarce | adjective | not available in large amounts | Attention is scarce.
exploit | verb | to use something or somebody unfairly for your own advantage | Some companies exploit our inattention.
in good faith | phrase | honestly, with no intention to deceive | The line is not always drawn in good faith.`,
    q: [
      { q: 'What is striking about defaults?', o: ['How seldom we change them', 'How often they are wrong', 'How expensive they are'], a: 0 },
      { q: 'What differs between the two savings schemes?', o: ['The options available', 'Only the starting point', 'The employer'], a: 1 },
      { q: 'Why may people treat a default as a recommendation?', o: ['It is required by law', 'It is always the cheapest', 'They assume the designers had a reason'], a: 2 },
      { q: 'Which is given as an example of a default used against us?', o: ['A free trial that renews at full price', 'Automatic saving for retirement', 'A seat belt reminder'], a: 0 },
      { q: 'What is the writer\'s test for a fair default?', o: ['Whether it saves the company money', 'Whether the person would thank you if they understood it', 'Whether it can be changed'], a: 1 }
    ] }
  ]);

  A.add('C2', [
  { id: 'c2-004', t: 'The uses of ambiguity', topic: 'Language',
    text: `We are taught from an early age that clarity is a virtue and ambiguity a failure of thought or nerve. The well-drafted contract, the unambiguous instruction, the essay whose every sentence admits of one reading only: these are held up as models, and in many settings rightly so. Nobody wants a prescription that might mean either of two doses. Yet to treat ambiguity as nothing but noise in the signal is to misunderstand a good deal of what language is for.

Consider the diplomatic communiqué. Its notoriously elastic phrasing is frequently mocked, but the elasticity is the point. Two governments that cannot agree on a formula each of them could defend at home may nevertheless agree on a form of words that each can interpret favourably. The ambiguity is not a defect in the agreement; it is the agreement. It purchases time, and time is often what is most needed.

Ordinary social life depends on the same resource to a degree we seldom acknowledge. The invitation that can be declined without offence, the criticism framed so that its target may choose to hear a suggestion, the remark that tests the water without committing its speaker: each leaves both parties room to retreat with dignity. A language stripped of such devices would be admirably precise and very nearly uninhabitable.

Literature, of course, makes a positive art of it. A line that could be paraphrased without loss would scarcely need to be a line of poetry. What holds the attention is the sense of several meanings held in suspension, none cancelling the others, so that the reader is obliged to collaborate. The ambiguity here is not a puzzle awaiting its solution but the very thing being offered.

None of this licenses vagueness, which is a different matter altogether. Vagueness is the absence of any definite meaning; ambiguity is the presence of more than one. The vague writer has not decided what to say. The ambiguous one, at least when working deliberately, has decided to say two things at once and knows precisely which two.

The distinction suggests a more useful rule than the blanket demand for clarity. The question to ask of any utterance is what would be lost if only one reading survived. Where the answer is nothing, as with the dosage or the fire exit, ambiguity is simply error. Where the answer is the possibility of agreement, or tact, or the pleasure of a mind made to work, it is worth protecting, and the insistence on spelling everything out begins to look less like rigour than like a failure of imagination.`,
    v: `elastic | adjective | able to stretch; flexible in meaning | The phrasing was deliberately elastic.
communiqué | noun | an official statement, especially from governments after a meeting | The summit ended with a joint communiqué.
decline | verb | to refuse politely | The invitation can be declined without offence.
in suspension | phrase | held in an undecided or unresolved state | Several meanings are held in suspension.
license | verb | to give permission or justification for something | None of this licenses vagueness.
rigour | noun | the quality of being careful, strict and exact | It looks less like rigour than a lack of imagination.`,
    q: [
      { q: 'Where does the writer agree that clarity is essential?', o: ['In a prescription', 'In a poem', 'In a diplomatic statement'], a: 0 },
      { q: 'Why is ambiguity useful in a diplomatic communiqué?', o: ['It hides mistakes', 'It lets each side interpret the words favourably', 'It shortens the text'], a: 1 },
      { q: 'What does everyday ambiguity allow people to do?', o: ['Avoid speaking altogether', 'Win every argument', 'Retreat with dignity'], a: 2 },
      { q: 'How does the writer distinguish vagueness from ambiguity?', o: ['Vagueness has no definite meaning; ambiguity has more than one', 'They are the same thing', 'Vagueness is deliberate; ambiguity is accidental'], a: 0 },
      { q: 'What question does the writer propose asking?', o: ['Is the sentence short enough?', 'What would be lost if only one reading survived?', 'Who is the audience?'], a: 1 }
    ] },
  { id: 'c2-005', t: 'On changing one\'s mind', topic: 'Thinking',
    text: `We profess to admire people who change their minds in the light of evidence, and we very rarely do so ourselves. The gap between the ideal and the practice is not, for the most part, a matter of hypocrisy. It reflects something about how beliefs are held, which is seldom one at a time.

A conviction of any importance is not a free-standing proposition that can be swapped for a better one like a faulty component. It is woven into a fabric: it supports other beliefs and is supported by them, it has been stated in front of friends, it may underpin a career or a sense of who one is. To abandon it is to accept a cascade of consequent revisions and, not least, the admission that one was wrong in public, possibly for years. Seen in this light, the reluctance is not irrational. It is an accurate estimate of the cost.

This is why argument so often fails where it seems most deserved to succeed. Presented with a strong objection, the mind does not typically weigh it; it looks for the exit. The source is questioned, the terms are redefined, an exception is carved out. These manoeuvres are not signs of low intelligence. On the contrary, the more able the reasoner, the more ingenious the defence. Cleverness, it has been observed, is as readily recruited to protect a position as to examine it.

How, then, does anyone ever change? Rarely in the course of the argument itself. More often the revision takes place afterwards and in private, when no one is waiting to claim the victory. It tends to be gradual: a view is first held less loudly, then qualified, then quietly dropped, and eventually remembered as never having been held with much conviction. Biographies and memoirs are full of such tidy retrospective adjustments.

Two practical conclusions follow. The first concerns how to persuade. If people yield in private and not under pressure, then the triumphant refutation, however satisfying to deliver, is close to counterproductive. Better to leave an objection with someone, and a way of accepting it that costs them little, and then to change the subject.

The second concerns ourselves. Since we cannot easily observe our own evasions, it helps to decide in advance what would count as evidence against a view, before the evidence arrives and the temptation to reinterpret it sets in. It also helps to hold fewer beliefs as parts of one's identity. An opinion that is merely something one thinks can be exchanged for a better one at modest cost. An opinion that has become something one is can only be defended.

None of this makes changing one's mind pleasant. It may, however, make it possible, which is as much as can reasonably be asked.`,
    v: `profess | verb | to claim something, sometimes when it is not entirely true | We profess to admire open minds.
underpin | verb | to support or form the basis of something | The belief may underpin a career.
cascade | noun | a series of things that follow one after another | Abandoning it means a cascade of revisions.
manoeuvre | noun | a clever or skilful move made to gain an advantage | These manoeuvres protect the belief.
refutation | noun | a proof that a statement or argument is wrong | A triumphant refutation rarely persuades.
evasion | noun | the act of avoiding something you should face | We cannot easily see our own evasions.`,
    q: [
      { q: 'Why is abandoning an important belief costly?', o: ['It is connected to many other beliefs and to one\'s public self', 'It takes a long time to say', 'Others will not notice'], a: 0 },
      { q: 'What does the mind typically do with a strong objection?', o: ['Weigh it carefully', 'Look for a way out', 'Accept it immediately'], a: 1 },
      { q: 'What does the text say about very able reasoners?', o: ['They change their minds more easily', 'They avoid arguments', 'They build more ingenious defences'], a: 2 },
      { q: 'When do people usually revise their views?', o: ['Afterwards, in private', 'During the argument', 'Never'], a: 0 },
      { q: 'What does the writer advise us to decide in advance?', o: ['Whom to trust', 'What would count as evidence against our view', 'Which arguments to avoid'], a: 1 }
    ] },
  { id: 'c2-006', t: 'The case against convenience', topic: 'Modern life',
    text: `Convenience has become the least examined of modern goods. To say of a product or service that it saves effort is, in most conversations, to end the discussion in its favour. The burden of proof lies with whoever would do a thing the slower way, and it is rarely discharged. Yet the steady removal of friction from daily life has costs that do not appear on any receipt, and they are worth setting out, if only so that the bargain is struck knowingly.

The first cost is to competence. A capacity that is never exercised does not remain in storage; it decays. Those who have navigated by satellite for a decade often find that they can no longer hold the shape of their own city in their heads. The point is not that mental maps are precious in themselves. It is that we tend to discover what a convenience has taken only after it has gone, and by then the dependence is complete.

The second is to meaning. A striking amount of what people report as most satisfying in their lives is, viewed coldly, inconvenient: raising children, learning an instrument, cooking for friends, tending a garden. The effort is not an unfortunate price attached to the reward. In large part it is the reward. A meal that arrives at the door in twenty minutes and one that took an afternoon to prepare may be nutritionally identical and are not remotely the same experience.

The third is subtler and concerns other people. Much of the friction that technology has removed was social. One once had to ask a stranger for directions, wait in a shop while the assistant finished with a neighbour, telephone a restaurant and speak to a human being. These encounters were minor and frequently tedious. They were also a low-level, continuous rehearsal of the business of dealing with people one had not chosen, and their disappearance leaves us somewhat out of practice.

It would be absurd to conclude that difficulty is a virtue. Nobody is ennobled by washing sheets by hand, and for those whose time and strength are in short supply, labour-saving devices have been nothing short of a liberation. The argument is not against convenience but against its automatic priority, the unreflective assumption that the easier way is, for that reason alone, the better.

A more discriminating approach would ask, of each new ease, what exactly the effort it eliminates was doing for us. Sometimes the answer is nothing, and we should accept the gift gladly. Sometimes the effort was holding up more than we realised: a skill, a pleasure, a thin thread of connection with the people around us. In those cases the convenient option is not really saving us anything. It is merely postponing the moment at which we notice what we have spent.`,
    v: `friction | noun | difficulty or resistance that slows an activity down | Technology removes friction from daily life.
discharge | verb | to fulfil a duty or obligation (formal) | The burden of proof is rarely discharged.
decay | verb | to become gradually weaker or worse | Unused skills decay.
tedious | adjective | boring and lasting too long | The encounters were often tedious.
ennoble | verb | to make somebody better or more admirable | Nobody is ennobled by needless labour.
discriminating | adjective | able to judge quality and make careful distinctions | We need a more discriminating approach.`,
    q: [
      { q: 'What is the writer\'s complaint about convenience?', o: ['It is accepted without examination', 'It is too expensive', 'It never works'], a: 0 },
      { q: 'What is the example of lost competence?', o: ['Cooking for friends', 'Holding a mental map of one\'s city', 'Playing an instrument'], a: 1 },
      { q: 'What does the writer say about effort in satisfying activities?', o: ['It should be removed', 'It is an unfortunate price', 'It is largely the reward itself'], a: 2 },
      { q: 'What was the hidden value of minor social friction?', o: ['Practice in dealing with people we had not chosen', 'Saving time', 'Earning money'], a: 0 },
      { q: 'What is the writer NOT arguing?', o: ['That we should question each new ease', 'That difficulty is a virtue in itself', 'That convenience has hidden costs'], a: 1 }
    ] },
  { id: 'c2-007', t: 'What translation cannot carry', topic: 'Language',
    text: `It is a commonplace that something is always lost in translation, and like most commonplaces it is both true and misleading. True, because no two languages divide the world along quite the same lines. Misleading, because it implies that the original is a full vessel from which the translator inevitably spills, when the more interesting fact is how much arrives intact, and by what indirect routes.

The difficulties are real enough. Words carry not only meanings but histories: a term for home, for honour, for a particular quality of longing, may gather associations over centuries that no dictionary equivalent can reproduce. Grammar interferes too. A language that obliges its speakers to mark whether an event was witnessed or merely reported, or to choose between a formal and an intimate "you", builds into every sentence information that another language must either omit or laboriously spell out. And sound is all but untransferable. The pun, the rhyme and the rhythm that made a line memorable belong to one language's accidents and to no other's.

Faced with this, the translator is not a copyist but a negotiator. Every sentence presents competing loyalties: to the literal sense, to the tone, to the effect on the reader, to the naturalness of the result. These cannot all be honoured at once, and to favour one is to shortchange another. A joke rendered word for word ceases to be a joke; replaced by a different joke that works, it is no longer what the author wrote. Neither choice is wrong. They are different decisions about what, in this passage, mattered most.

It follows that there can be no definitive translation of a work of any richness, only successive attempts, each reflecting what its age was capable of hearing. This is sometimes lamented as though it were a weakness. It might as easily be considered a form of abundance. A text that has been translated many times has been read with exceptional closeness many times, and each version brings forward something the others left in shadow.

There is a gain on the receiving side as well, less often remarked upon. A language is altered by what is translated into it. Constructions that once sounded foreign become available; concepts that had no name acquire one. Much of what any modern language can now say with ease it learned to say by straining to accommodate somebody else's thought.

So the old complaint deserves a qualified reply. Something is lost in translation, certainly. But the loss is the price of a transaction in which a good deal is also found: by the reader, who gains a book otherwise closed to them, and by the language itself, which is left slightly larger than before. Given the alternative, which is silence between peoples, it is an extraordinarily good bargain.`,
    v: `commonplace | noun | a remark or idea that is repeated so often it is no longer original | It is a commonplace that something is lost.
intact | adjective | complete and not damaged | Much of the meaning arrives intact.
laboriously | adverb | with a lot of effort and time | The detail must be laboriously spelled out.
shortchange | verb | to give somebody or something less than is deserved | To favour one loyalty is to shortchange another.
definitive | adjective | final; not able to be improved | There is no definitive translation.
accommodate | verb | to make room for something; to adapt in order to include it | The language strains to accommodate new ideas.`,
    q: [
      { q: 'Why does the writer call the usual saying misleading?', o: ['It ignores how much arrives intact', 'It is completely false', 'It is too modern'], a: 0 },
      { q: 'Which element is described as almost impossible to transfer?', o: ['Plot', 'Sound: puns, rhyme and rhythm', 'Names'], a: 1 },
      { q: 'How is the translator described?', o: ['As a copyist', 'As a critic', 'As a negotiator'], a: 2 },
      { q: 'Why is there no definitive translation of a rich work?', o: ['Each attempt reflects what its age could hear', 'Translators are careless', 'Languages never change'], a: 0 },
      { q: 'What gain on the receiving side does the writer mention?', o: ['Translators become famous', 'The receiving language itself grows', 'Books become cheaper'], a: 1 }
    ] }
  ]);

  /* ----- batch 2: articles 8 to 11 ----- */
  A.add('B2', [
  { id: 'b2-008', t: 'First impressions', topic: 'Psychology',
    text: `We like to think that we judge people slowly and fairly, weighing the evidence as it comes in. The research suggests otherwise. Studies in which volunteers looked at unfamiliar faces for a fraction of a second found that they had already formed opinions about how trustworthy or capable each person was, and that more time rarely changed their minds. It merely made them more confident.

There is a plausible reason why our brains work like this. For most of human history, deciding quickly whether a stranger was a friend or a threat could be a matter of life and death. A slow, careful judgement was a luxury our ancestors could not always afford.

The difficulty is that fast judgements are built from thin material. We respond to a smile, a tone of voice, a handshake, clothing, and whether the person resembles someone we already know. None of these tells us much about honesty or ability. Tall people are not better leaders, and a nervous candidate is not necessarily a weak employee, yet both assumptions influence real decisions.

First impressions are also stubborn. Once we have decided that a new colleague is unfriendly, we tend to notice everything that supports the idea and overlook whatever contradicts it. The colleague, sensing our coolness, may well become less friendly, and our prediction comes true.

What can be done? In formal situations, structure helps. Interviewers who ask every candidate the same questions and score the answers separately make better choices than those who rely on a general feeling. In everyday life, the remedy is simply to treat a first impression as a hypothesis, not a verdict, and to give people a second and a third meeting before filing them away.

It is worth remembering, finally, that others are judging us just as quickly. That is not a reason to perform. But arriving on time, listening properly and remembering a name cost very little, and they shape an opinion that may take months to revise.`,
    v: `trustworthy | adjective | able to be trusted | He has a trustworthy face. | заслуживающий доверия
plausible | adjective | reasonable and likely to be true | There is a plausible explanation. | правдоподобный
resemble | verb | to look like somebody or something | She resembles her aunt. | напоминать, быть похожим
overlook | verb | to fail to notice something | We overlook facts that do not fit. | упускать из виду
remedy | noun | a way of solving a problem | The remedy is simple. | средство, решение
verdict | noun | a final decision or judgement | Treat it as a hypothesis, not a verdict. | вердикт, окончательное суждение`,
    q: [
      { q: 'What did more time do to people\'s first judgements?', o: ['It made them more confident, not different', 'It reversed them', 'It made them forget'], a: 0 },
      { q: 'Why might fast judgement have been useful in the past?', o: ['People had no clocks', 'Strangers could be dangerous', 'Faces were all similar'], a: 1 },
      { q: 'What is the problem with fast judgements?', o: ['They take too long', 'They are always negative', 'They are based on things that reveal little'], a: 2 },
      { q: 'How can a first impression come true?', o: ['Our coolness makes the other person less friendly', 'People never change', 'We forget it quickly'], a: 0 },
      { q: 'What helps interviewers choose better?', o: ['Trusting a general feeling', 'Asking the same questions and scoring answers separately', 'Shorter interviews'], a: 1 }
    ] },
  { id: 'b2-009', t: 'Why we need the dark', topic: 'Environment',
    text: `For almost all of history, night meant darkness. Once the sun had set, people had firelight, moonlight and the stars, and little else. Within a few generations, electric lighting has changed that so completely that many children in large cities have never seen the Milky Way. We tend to regard this as progress. In several respects it is a loss.

The most obvious casualty is the night sky itself. The glow above a modern city hides all but the brightest stars. A view that inspired calendars, navigation, myths and a good deal of science has become, for most people, something to be visited on holiday.

The effects on wildlife are more serious. Many creatures depend on the rhythm of light and darkness. Migrating birds, which navigate partly by the stars, can be drawn off course by brightly lit buildings. Newly hatched sea turtles head for the brightest horizon, which used to be the sea and is now sometimes a road. Insects circle lamps until they are exhausted, and insects feed much else.

Humans are not exempt. Our bodies run on an internal clock that is set by light. Bright light late in the evening, particularly the bluish kind produced by screens and many modern lamps, tells the brain that it is still daytime and can delay sleep. A growing body of research links poor sleep with a wide range of health problems.

The encouraging part is that light pollution is unusually easy to reverse. Unlike chemicals in a river, light does not linger: switch off the lamp and the problem vanishes at once. Streetlights can be shielded so that they shine downwards, where the light is needed. Warmer colours can replace harsh white. Offices can be darkened when nobody is in them, which also saves money.

None of this means returning to candles. Light makes streets safer and evenings longer. The point is simply that darkness is not an absence to be filled. It is something living things, ourselves included, have always relied on.`,
    v: `casualty | noun | a person or thing that suffers as a result of something | The night sky is the first casualty. | жертва, пострадавший
glow | noun | a soft, steady light | The glow of the city hides the stars. | свечение
navigate | verb | to find the right direction when travelling | Birds navigate by the stars. | ориентироваться, прокладывать путь
exempt | adjective | not affected by a rule or problem | Humans are not exempt. | освобождённый, не подверженный
linger | verb | to stay for a long time | Unlike chemicals, light does not linger. | задерживаться
harsh | adjective | too strong, bright or unpleasant | Harsh white light hurts the eyes. | резкий`,
    q: [
      { q: 'What have many city children never seen?', o: ['The Milky Way', 'The moon', 'A street lamp'], a: 0 },
      { q: 'How can bright buildings affect migrating birds?', o: ['They help them rest', 'They can draw them off course', 'They keep them warm'], a: 1 },
      { q: 'What does bright evening light do to people?', o: ['It improves eyesight', 'It makes them hungry', 'It can delay sleep'], a: 2 },
      { q: 'Why is light pollution easy to reverse?', o: ['Light disappears as soon as it is switched off', 'It is very cheap', 'Animals get used to it'], a: 0 },
      { q: 'What is the writer\'s position?', o: ['We should go back to candles', 'Darkness is something living things rely on', 'Cities should have no lights'], a: 1 }
    ] },
  { id: 'b2-010', t: 'The return of the night train', topic: 'Travel',
    text: `A generation ago, the sleeper train seemed to be heading for the museum. Cheap flights had made it possible to cross a continent in two hours for the price of a restaurant meal, and one overnight route after another was closed. Recently, however, several railway companies have begun to bring night trains back, and tickets on some routes sell out weeks in advance. What explains the revival?

Concern about the environment is one factor. A journey by rail generally produces far less carbon dioxide per passenger than the same journey by air, and a growing number of travellers take this into account, especially for trips within one continent.

But there is also a practical argument that has nothing to do with conscience. A flight that lasts two hours seldom takes two hours. Add the journey to an airport outside the city, the queues, the waiting and the transfer at the other end, and half a day has gone. A night train leaves from the centre of one city in the evening and arrives in the centre of another in the morning. The traveller loses no working time and saves the cost of a hotel.

Then there is the experience itself, which is hard to justify on a spreadsheet and easy to recommend. There is a particular pleasure in falling asleep in one country and waking in another, with unfamiliar hills sliding past the window while someone brings coffee.

It would be dishonest to pretend that the picture is entirely rosy. Sleeper carriages are expensive to build and run, since each one carries far fewer passengers than an ordinary coach and earns money only once a day. Fares are often higher than budget flights. Delays, shared compartments and narrow beds are not to everyone's taste.

Still, the revival suggests that speed is not the only thing travellers value. For a certain kind of journey, arriving rested, in the middle of town, having actually seen the distance covered, is worth a great deal.`,
    v: `revival | noun | the process of becoming popular or active again | Night trains are enjoying a revival. | возрождение
take into account | phrase | to consider something when making a decision | Travellers take the environment into account. | принимать во внимание
transfer | noun | the journey between an airport or station and your final destination | The transfer took an hour. | трансфер, пересадка
justify | verb | to show that something is reasonable | It is hard to justify on a spreadsheet. | обосновывать, оправдывать
rosy | adjective | seeming very good or hopeful | The picture is not entirely rosy. | радужный
fare | noun | the price of a journey by train, bus or plane | Train fares are often higher. | стоимость проезда`,
    q: [
      { q: 'Why did night trains nearly disappear?', o: ['Cheap flights', 'Bad weather', 'A lack of railways'], a: 0 },
      { q: 'What is the practical argument for the night train?', o: ['It is always cheaper', 'It saves working time and a hotel night', 'It is faster than flying'], a: 1 },
      { q: 'Why is a two-hour flight rarely two hours?', o: ['Planes fly slowly', 'Pilots take breaks', 'Travel to the airport, queues and transfers add time'], a: 2 },
      { q: 'Why are sleeper carriages costly to run?', o: ['They carry few passengers and earn once a day', 'They use more fuel than planes', 'They need two drivers'], a: 0 },
      { q: 'What does the revival suggest?', o: ['Flights will end soon', 'Speed is not the only thing travellers value', 'Trains are now faster than planes'], a: 1 }
    ] },
  { id: 'b2-011', t: 'What makes a city walkable?', topic: 'City life',
    text: `Ask people to describe a place where they loved spending time on holiday, and they will often describe somewhere they explored on foot: an old town, a seafront, a market district. Ask them how they get around at home, and many will say they drive everywhere, including to the gym. The contrast says something about how cities have been built over the last century, and about what some of them are now trying to undo.

A walkable neighbourhood is not simply one with pavements. Four conditions are usually mentioned. The walk must be useful: shops, schools and workplaces have to be close enough to reach. It must be safe, which mostly means slow traffic and frequent crossings. It must be comfortable, with shade, benches and streets that feel enclosed, not exposed. And it must be interesting. People will happily walk past a row of small shop windows and will avoid a blank wall of the same length.

The benefits reach further than one might expect. Residents of walkable areas tend to be more physically active without setting out to exercise. Local businesses often do well, because pedestrians pass slowly and stop more often than drivers. Children and elderly people, who cannot drive, gain independence. And neighbours who meet on the street are more likely to know one another, which makes an area feel safer.

There are costs, and they should be acknowledged. Property in pleasant, walkable districts becomes expensive, which can push out the very people who made the place lively. Reducing space for cars causes genuine difficulty for those who depend on them, including delivery drivers and people with limited mobility. Good planning has to take both into account.

Yet the direction of travel is clear. Cities that once competed to build wider roads now compete to plant trees and widen pavements. The reasoning is simple. A street designed only for passing through will be passed through. A street designed for people to stay in becomes a place.`,
    v: `contrast | noun | an obvious difference between two things | The contrast is striking. | контраст
undo | verb | to cancel the effect of something | Cities are trying to undo past mistakes. | исправить, отменить
enclosed | adjective | surrounded on several sides | Narrow streets feel enclosed and comfortable. | закрытый, окружённый
pedestrian | noun | a person who is walking in a street | Pedestrians stop more often than drivers. | пешеход
acknowledge | verb | to accept that something is true | The costs should be acknowledged. | признавать
mobility | noun | the ability to move around easily | People with limited mobility need cars. | подвижность, мобильность`,
    q: [
      { q: 'What do people often love about holiday places?', o: ['They explored them on foot', 'They had big car parks', 'They were very modern'], a: 0 },
      { q: 'Which is one of the four conditions for a walkable area?', o: ['The walk must be long', 'The walk must be interesting', 'The walk must be uphill'], a: 1 },
      { q: 'Why do local businesses often do well?', o: ['Rents are lower', 'Drivers spend more', 'Pedestrians pass slowly and stop more often'], a: 2 },
      { q: 'What is one cost of walkable districts?', o: ['Property becomes expensive', 'People exercise less', 'Shops close'], a: 0 },
      { q: 'What does the final paragraph argue?', o: ['Wider roads are the future', 'Streets designed for staying become places', 'Trees cause problems'], a: 1 }
    ] }
  ]);

  A.add('C1', [
  { id: 'c1-008', t: 'Why everything takes longer than planned', topic: 'Psychology',
    text: `Ask a student when the essay will be finished, a builder when the kitchen will be ready, or a government when the new railway will open, and you will receive an answer that later proves optimistic. The tendency is so widespread that it has acquired a name, the planning fallacy, and it is remarkable chiefly for its resistance to experience. People who have missed every previous deadline remain confident about the next one.

The explanation lies in the way we construct forecasts. Asked how long a task will take, we imagine carrying it out: first this step, then that. The scenario we picture is a smooth one, because it is built from what we intend to happen. It does not include the illness, the missing document, the colleague on holiday or the part that turns out to be harder than it looked. None of these is individually likely. Collectively, something of the kind is almost certain.

Psychologists describe this as taking the inside view. Its alternative, the outside view, ignores the details of the present case and asks a blunter question: how long have similar projects actually taken in the past? The answer is usually sobering. It is also, as a rule, far more accurate, precisely because it contains all the unforeseen obstacles that the inside view cannot imagine.

Why do we not adopt the outside view naturally? Partly because each project feels unique to the person planning it. Partly because optimism is rewarded: the contractor with the lowest estimate wins the job, and the manager who promises an early launch gets the budget. An honest forecast can look, from the outside, like a lack of commitment.

The remedies are well known and unglamorous. Break a project into parts and estimate each, since omissions are easier to spot at a small scale. Consult the record of comparable undertakings. Ask someone with no stake in the outcome, who will have no reason to share your hopes. And add a margin for the unknown without being able to say what it is for.

There is a consolation. The same optimism that distorts our schedules is probably what persuades us to begin ambitious things at all. Few would start a doctorate, a business or a house if they knew in advance exactly what it would cost. The aim, then, is not to abolish hope but to keep it away from the calendar.`,
    v: `fallacy | noun | a false idea that many people believe, or a mistake in reasoning | This is known as the planning fallacy.
forecast | noun | a statement about what is expected to happen | Our forecasts are too optimistic.
sobering | adjective | making you think seriously about something | The real figures are sobering.
unforeseen | adjective | not expected or predicted | Unforeseen obstacles delay every project.
stake | noun | a personal interest in how something turns out | Ask someone with no stake in the outcome.
consolation | noun | something that makes a disappointment easier to accept | There is one consolation.`,
    q: [
      { q: 'What is notable about the planning fallacy?', o: ['It survives repeated experience', 'It affects only governments', 'It disappears with age'], a: 0 },
      { q: 'Why is the "inside view" too optimistic?', o: ['It uses old statistics', 'It imagines only the smooth scenario', 'It adds too many delays'], a: 1 },
      { q: 'What does the outside view ask?', o: ['What do I intend to do?', 'Who is responsible?', 'How long have similar projects actually taken?'], a: 2 },
      { q: 'Why is optimism rewarded?', o: ['Low estimates win jobs and budgets', 'It is always accurate', 'Clients prefer delays'], a: 0 },
      { q: 'What consolation does the writer offer?', o: ['Deadlines do not matter', 'Optimism is what makes us start ambitious things', 'Planning is unnecessary'], a: 1 }
    ] },
  { id: 'c1-009', t: 'The trouble with averages', topic: 'Numbers',
    text: `The average is perhaps the most useful single number ever devised, and one of the most frequently misunderstood. It allows a mass of data to be summarised in a breath: the average salary, the average temperature, the average time a patient waits. The trouble begins when we forget that a summary is not a description, and start to treat the average as if it were a typical case.

Consider income. In a small company, nine employees each earn a modest wage and the owner earns ten times as much. The mean salary will be nearly double what any ordinary employee takes home. It is arithmetically correct and tells a newcomer almost nothing about what to expect. The median, the figure in the middle when everyone is lined up in order, would be a far better guide, which is why careful reports on wages and house prices prefer it.

A subtler problem arises when the average describes nobody at all. A well-known story from the history of design concerns the cockpits of military aircraft, which were at one time built to fit the average pilot. When the measurements of several thousand pilots were examined individually, it reportedly turned out that not one of them was close to average on all the relevant dimensions at once. A seat designed for everyone in general fitted no one in particular. The eventual solution was the adjustable seat, an idea now so familiar that we rarely think of it as an idea.

Averages can also conceal exactly what matters. A river that is, on average, a metre deep can still drown a person who steps into the wrong part of it. A hospital with an excellent average waiting time may contain a group of patients who wait for months. A treatment that helps on average may help some people greatly and harm others.

None of this means averages should be distrusted. It means they should be questioned. Which kind of average is this, the mean or the median? How widely are the individual cases spread around it? Who is at the extremes, and does the summary hide them?

The habit of asking is more valuable than any formula. A number that stands alone invites us to imagine a world of identical cases clustered neatly around it. The real world is seldom so obliging, and a good deal of practical wisdom consists in remembering the spread behind the figure.`,
    v: `devise | verb | to invent a new way of doing something | It is the most useful number ever devised.
median | noun | the middle value when a set of numbers is put in order | The median is a better guide than the mean.
conceal | verb | to hide something | Averages can conceal what matters.
dimension | noun | a measurement such as height, length or width | No pilot was average on every dimension.
extreme | noun | the furthest point from the middle | Who is at the extremes?
obliging | adjective | willing to help; convenient | The real world is seldom so obliging.`,
    q: [
      { q: 'What mistake do we make with averages?', o: ['We treat them as typical cases', 'We calculate them wrongly', 'We ignore them'], a: 0 },
      { q: 'Why is the mean salary misleading in the example?', o: ['Everyone earns the same', 'One very high salary pulls it up', 'It is lower than every wage'], a: 1 },
      { q: 'What did the study of pilots reportedly show?', o: ['Most pilots were average', 'Pilots were too tall', 'No pilot was average on all dimensions'], a: 2 },
      { q: 'What does the river example illustrate?', o: ['An average can hide dangerous extremes', 'Rivers are shallow', 'Averages are always too high'], a: 0 },
      { q: 'What does the writer recommend?', o: ['Distrusting all averages', 'Questioning what lies behind an average', 'Using only the mean'], a: 1 }
    ] },
  { id: 'c1-010', t: 'In praise of small talk', topic: 'Communication',
    text: `Small talk has a poor reputation. It is routinely dismissed as shallow, a waste of time, a ritual for people with nothing to say. Those who pride themselves on depth announce that they cannot bear it and would rather discuss ideas. The dismissal is understandable and, on reflection, mistaken. It confuses the content of a conversation with its purpose.

The content of small talk is, admittedly, trivial. Nobody learns anything from an exchange about the weather, the traffic or the slowness of the lift. But the information being transmitted is not about the weather. It is about the speakers. Each is signalling to the other: I see you; I mean no harm; I am willing to be on friendly terms. Anthropologists have a term for speech whose function is to maintain a bond, as opposed to conveying facts, and they regard it as one of the oldest uses of language.

Seen this way, small talk is less a failed attempt at conversation than a successful attempt at something else. It also serves as a kind of antechamber. People rarely move straight from silence to substance. A few minutes of harmless exchange allow two strangers to gauge each other's mood and manner, and to discover whether a more serious conversation is welcome. Much of what later becomes friendship, collaboration or trust begins with remarks nobody would bother to remember.

The evidence that it matters is fairly consistent. In studies where commuters were asked to chat with a stranger, most predicted they would dislike it and reported afterwards that the journey had been more pleasant. Brief exchanges with a shopkeeper or a neighbour appear to contribute more to people's sense of belonging than their triviality would suggest.

There is a cultural dimension that should not be ignored. The amount of small talk considered polite varies enormously. What passes for ordinary friendliness in one country strikes visitors from another as intrusive, or insincere. Neither side is wrong; they are following different rules about how much warmth strangers owe one another.

For the learner of a language, the lesson is practical. Fluency is often imagined as the ability to discuss complex subjects. In daily life it is at least as much the ability to say nothing in particular, gracefully, for two minutes. That skill opens more doors than the subjunctive ever will.`,
    v: `dismiss | verb | to decide that something is not worth considering | Small talk is dismissed as shallow.
trivial | adjective | of little importance | The content is trivial.
bond | noun | a close connection between people | Such speech maintains a bond.
antechamber | noun | a small room leading to a larger, more important one | Small talk serves as an antechamber.
gauge | verb | to judge or measure something | They gauge each other's mood.
intrusive | adjective | entering somebody's private space in an unwelcome way | Visitors may find such friendliness intrusive.`,
    q: [
      { q: 'What does the usual criticism of small talk confuse?', o: ['Content with purpose', 'Speaking with writing', 'Friends with strangers'], a: 0 },
      { q: 'What is small talk really communicating?', o: ['Facts about the weather', 'A willingness to be on friendly terms', 'Opinions about politics'], a: 1 },
      { q: 'What is meant by calling it an "antechamber"?', o: ['It is uncomfortable', 'It is old-fashioned', 'It leads into more serious conversation'], a: 2 },
      { q: 'What happened in the commuter studies?', o: ['People enjoyed chatting more than they expected', 'People refused to talk', 'Journeys became longer'], a: 0 },
      { q: 'What is the lesson for language learners?', o: ['Avoid small talk', 'Being able to chat about nothing is a real part of fluency', 'Learn the subjunctive first'], a: 1 }
    ] },
  { id: 'c1-011', t: 'Why old buildings matter', topic: 'Cities',
    text: `When an old building is demolished to make way for a new one, the argument in favour is usually stated in terms that seem unanswerable. The replacement will be more efficient, safer, better insulated and able to house more people on the same plot. To object can look like mere sentiment. Yet there are hard-headed reasons, as well as sentimental ones, for thinking that a city without old buildings would be a poorer place.

The first is economic, and it was set out forcefully by writers on urban life in the last century. New construction is expensive, and its costs must be recovered through high rents. Only established, profitable tenants can pay them: banks, chain stores, well-funded offices. The second-hand bookshop, the repair workshop, the unproven restaurant and the artist's studio need cheap space, and cheap space is almost by definition old space. A district composed entirely of new buildings therefore tends towards a certain sameness, however striking the architecture. New ideas, as the observation goes, often need old buildings.

The second reason is environmental. A great deal of energy is consumed in manufacturing concrete, steel and glass and in the act of construction itself. A building that already stands has, so to speak, paid that debt. Even a highly efficient replacement may take decades to save enough energy in use to cancel out what was spent in creating it. Adapting what exists is frequently the greener course, though not the more fashionable.

The third reason is harder to quantify. Old buildings are a form of memory held in common. They tell residents that others lived, worked and argued here before them, and that the place did not begin last year. A city that erases its past at every opportunity offers its inhabitants little to belong to.

None of this amounts to a case for preserving everything. Cities that cannot change become museums, charming to visit and difficult to live in. Some old buildings are simply bad buildings that happen to have survived. And the need for decent, affordable housing is real and urgent.

The sensible position lies in mixture. A healthy street contains buildings of different ages, in different conditions, at different rents. That variety is not untidiness awaiting correction. It is what allows a neighbourhood to accommodate the established and the experimental side by side, and it is far easier to destroy than to recreate.`,
    v: `demolish | verb | to pull down a building | The old factory was demolished.
plot | noun | a piece of land for building on | More people can be housed on the same plot.
hard-headed | adjective | practical and not influenced by emotion | There are hard-headed reasons too.
tenant | noun | a person or business that pays rent for a building | Only profitable tenants can afford new space.
quantify | verb | to express something as a number | The third reason is harder to quantify.
erase | verb | to remove something completely | A city that erases its past loses something.`,
    q: [
      { q: 'Why can objecting to demolition look like sentiment?', o: ['The case for the new building sounds practical', 'Old buildings are always ugly', 'Nobody lives in them'], a: 0 },
      { q: 'Why do small, new businesses need old buildings?', o: ['They prefer old architecture', 'They need cheap space', 'They are required to by law'], a: 1 },
      { q: 'What is the environmental argument?', o: ['Old buildings use no energy', 'New buildings cannot be heated', 'An existing building has already "paid" its construction energy'], a: 2 },
      { q: 'What does the writer say about preserving everything?', o: ['It would turn cities into museums', 'It is the only solution', 'It is cheap'], a: 0 },
      { q: 'What does the writer recommend?', o: ['Only new buildings', 'A mixture of buildings of different ages', 'No building at all'], a: 1 }
    ] }
  ]);

  A.add('C2', [
  { id: 'c2-008', t: 'The persistence of ritual', topic: 'Society',
    text: `A visitor from a rigorously rational planet would find a good deal of human behaviour difficult to account for. We shake hands, a gesture that transfers nothing. We light candles on a cake and ask a child to extinguish them. Graduates process in gowns of medieval cut to receive a document that could have been posted. Mourners dress in an agreed colour and stand at an agreed distance from a grave. None of these actions achieves, in any mechanical sense, the thing it accompanies. All of them would be sorely missed.

It was once fashionable to suppose that ritual belonged to the childhood of societies and would wither as education spread. The prediction has not fared well. Secular institutions have proved as fertile in ceremony as religious ones, and wholly new rituals appear with each generation: the unboxing of a purchase, the photograph of a meal, the stadium chant. Whatever ritual is for, the need it answers does not appear to be diminishing.

Several functions suggest themselves. The most evident is the marking of transitions. A life contains changes of status that are in themselves invisible. Nothing in a person's body alters at the moment they become an adult, a spouse or a graduate. Ceremony makes the change public and therefore real, both to the community and, not least, to the individual, who may otherwise have difficulty believing in it.

A second function is the management of emotion. Experiments suggest that people who perform a fixed sequence of actions before a stressful task, even an arbitrary sequence invented for the purpose, report less anxiety and sometimes perform better. Grief, too, seems more bearable when there is something prescribed to do. The power of ritual here lies precisely in its fixity. At moments when we do not know what to feel or how to behave, it relieves us of the burden of improvisation.

A third is the creation of solidarity. Actions performed in unison, whether singing, marching or merely standing and sitting together, appear to blur the boundary between self and group to a degree that discussion seldom achieves. That the effect can be turned to sinister purposes is undeniable. It is the same effect that holds a choir together, or a team.

What is most striking is that ritual does not depend on belief in its efficacy. Those who knock on wood rarely suppose that wood is listening. They do it nonetheless, and feel a small discomfort if prevented. The explanation may be that ritual operates beneath the level at which propositions are affirmed or denied. It addresses not what we think but how we are held: in time, among others, and in the presence of things too large for ordinary speech. An entirely rational planet might have dispensed with it. One suspects its inhabitants would have found certain days very hard to get through.`,
    v: `extinguish | verb | to make a fire or light stop burning (formal) | The child is asked to extinguish the candles.
wither | verb | to become weaker and disappear | Ritual was expected to wither.
secular | adjective | not connected with religion | Secular institutions also love ceremony.
arbitrary | adjective | not based on any reason or system | Even an arbitrary sequence reduced anxiety.
in unison | phrase | together, at the same time | Actions performed in unison create solidarity.
dispense with | phrasal verb | to stop using something because it is not needed | A rational planet might have dispensed with ritual.`,
    q: [
      { q: 'What do the opening examples have in common?', o: ['They achieve nothing mechanically, yet would be missed', 'They are all religious', 'They are all recent inventions'], a: 0 },
      { q: 'What happened to the prediction that ritual would fade?', o: ['It came true', 'It has not fared well', 'It was never made'], a: 1 },
      { q: 'Why does ceremony matter at transitions?', o: ['It changes the body', 'It is legally required', 'It makes an invisible change public and real'], a: 2 },
      { q: 'Why is the fixity of ritual valuable in grief?', o: ['It removes the need to improvise', 'It shortens mourning', 'It is entertaining'], a: 0 },
      { q: 'What does the writer find most striking?', o: ['Ritual is always religious', 'Ritual works without belief in its effectiveness', 'Ritual is disappearing'], a: 1 }
    ] },
  { id: 'c2-009', t: 'Nostalgia reconsidered', topic: 'Mind',
    text: `For most of its history, nostalgia was regarded as an affliction. The word was coined by a physician in the seventeenth century to name a condition observed in soldiers and servants far from home, who grew listless, lost their appetite and, it was claimed, sometimes died of longing. Well into the modern period it retained an air of weakness: to be nostalgic was to be unable to face the present, to prefer a doctored past to a demanding reality.

More recent research has obliged a revision. When psychologists began to study the experience systematically, they found that it was neither rare nor confined to the unhappy. Most people, it appears, feel nostalgic fairly regularly, and the episodes are typically triggered not by contentment but by its opposite: loneliness, uncertainty, a sense that life lacks direction. On this account nostalgia is less a symptom than a response, something the mind reaches for when it is under strain.

What it retrieves is instructive. Nostalgic memories are overwhelmingly social. They feature family gatherings, friendships, shared hardships, occasions on which the rememberer belonged. They also tend to follow a redemptive arc, in which difficulty gives way to something good. After dwelling on such a memory, participants in experiments commonly report feeling more connected to others, more convinced that their lives have continuity and meaning, and somewhat more optimistic about what lies ahead. The backward glance, paradoxically, appears to steady people for going forward.

It would be naive to conclude that nostalgia is simply benign. The emotion is easily manufactured and readily exploited. Advertisers have long understood that a product wrapped in the imagery of a consumer's youth requires little further argument. More seriously, public rhetoric that promises the restoration of a vanished golden age draws on the same reservoir. The past invoked on such occasions is seldom one that any historian would recognise, and the longing it arouses can be directed against whoever is held responsible for its loss.

The distinction worth drawing is between two attitudes to the remembered past. One treats it as a resource: evidence that one has been loved and capable before and may be again. The other treats it as a destination, a place to which one might, if only certain obstacles were removed, return. The first is sustaining because it asks nothing impossible. The second is corrosive because it does.

There is a quiet irony in the fact that the period we shall one day be nostalgic for is, in all probability, the present one. The ordinary Tuesday, the unremarkable kitchen, the voices in the next room: these are precisely the materials from which future longing will be made. To recognise this is not to escape nostalgia but to turn it, briefly, to its best use, which is to notice what one has while it is still here to be noticed.`,
    v: `affliction | noun | something that causes suffering, especially an illness | Nostalgia was once considered an affliction.
listless | adjective | having no energy or interest | The soldiers grew listless.
redemptive | adjective | turning something bad into something good | The memories follow a redemptive arc.
benign | adjective | not harmful | It would be naive to call nostalgia simply benign.
reservoir | noun | a large supply of something | Such rhetoric draws on the same reservoir.
corrosive | adjective | gradually causing damage | Treating the past as a destination is corrosive.`,
    q: [
      { q: 'How was nostalgia first understood?', o: ['As a medical condition', 'As a literary style', 'As a sign of intelligence'], a: 0 },
      { q: 'What typically triggers nostalgia, according to research?', o: ['Great happiness', 'Loneliness and uncertainty', 'Physical illness'], a: 1 },
      { q: 'What is characteristic of nostalgic memories?', o: ['They are mostly about objects', 'They are usually sad throughout', 'They are overwhelmingly social'], a: 2 },
      { q: 'What danger does the writer identify?', o: ['Nostalgia can be manufactured and exploited', 'Nostalgia causes forgetting', 'Nostalgia is too rare'], a: 0 },
      { q: 'Which attitude to the past does the writer endorse?', o: ['Treating it as a destination', 'Treating it as a resource', 'Ignoring it'], a: 1 }
    ] },
  { id: 'c2-010', t: 'The limits of advice', topic: 'Wisdom',
    text: `Advice is the most generously offered and least gratefully received of all human commodities. Each generation discovers, with some indignation, that the next declines to profit from its experience, and each forgets how firmly it declined in its turn. The pattern is so stable that it invites a question less often asked than it might be: why is knowledge about how to live so difficult to hand on?

Part of the answer is that advice travels stripped of the experience that gave it weight. "Do not marry in haste." "Look after your health while you have it." "Nobody on their deathbed wishes they had spent more time at the office." Such sentences are perfectly intelligible and, to the person uttering them, saturated with memory. To the hearer they are merely true, in the thin way that a proverb is true. The conviction that makes a principle operative cannot be transmitted with the words; it has to be acquired at roughly the original price.

A second difficulty is that advice is necessarily general, and lives are obstinately particular. The counsellor knows what happened in one case, their own, and extrapolates. But the recipient differs in temperament, circumstance and era. Counsel that was sound for a cautious person in a stable profession may be ruinous for a restless one in a collapsing industry. The adviser, moreover, is seldom a disinterested witness to their own history. People who took a risk that succeeded recommend boldness; those whose risk failed recommend prudence. Each is reporting a single throw of the dice as though it were a law.

There is, thirdly, the matter of standing. To accept advice is tacitly to concede that another sees one's situation more clearly than one does oneself, and this is not a concession people make readily, least of all to those who love them. The young do not ignore their elders out of stupidity. They do so partly because the need to become the author of one's own decisions is itself a requirement of growing up, one that would be defeated by too much obedience.

It does not follow that advice is worthless, only that its usefulness lies elsewhere than is commonly assumed. Rarely does it determine a decision. What it can do is furnish a vocabulary: a set of considerations that lie dormant until experience activates them. Years later, in the middle of the very mistake one was warned against, the old sentence returns, and now it has meaning. It arrives too late to prevent the error and in good time to help one understand it.

The most valuable counsel may therefore be the least directive. It consists not of conclusions but of questions; not "you should leave" but "what would you regret?" Such advice respects the fact that the other person will, in the end, have to learn it themselves. It merely ensures that, when they do, they will not be learning alone.`,
    v: `indignation | noun | anger at something that seems unfair | Each generation feels some indignation.
saturated | adjective | completely filled with something | The words are saturated with memory.
obstinately | adverb | in a way that refuses to change | Lives are obstinately particular.
extrapolate | verb | to guess about a wider situation from limited facts | The adviser extrapolates from one case.
prudence | noun | carefulness in avoiding risks | Those whose risk failed recommend prudence.
dormant | adjective | not active now, but able to become active later | The considerations lie dormant for years.`,
    q: [
      { q: 'Why does advice lose its force when passed on?', o: ['It arrives without the experience behind it', 'It is usually false', 'It is too long'], a: 0 },
      { q: 'What is the problem with advice being general?', o: ['General statements are illegal', 'Each life is particular and differs from the adviser\'s', 'Nobody understands it'], a: 1 },
      { q: 'What does the writer say about advisers who took risks?', o: ['They are always right', 'They refuse to give advice', 'They treat one outcome as if it were a law'], a: 2 },
      { q: 'Why do the young ignore their elders, in part?', o: ['Making their own decisions is part of growing up', 'They are stupid', 'They do not listen at all'], a: 0 },
      { q: 'What kind of advice does the writer value most?', o: ['Firm instructions', 'Questions that help the person think', 'Warnings repeated often'], a: 1 }
    ] },
  { id: 'c2-011', t: 'On reading slowly', topic: 'Reading',
    text: `We live in what must be the most text-saturated period in history. The average literate adult now encounters, in the course of a single day, a quantity of written words that would have astonished a medieval scholar. It might be supposed that we have consequently become the most accomplished readers who ever lived. In one sense we have: nobody before us could extract the gist of a page so swiftly, or discard so efficiently what is of no use. In another, we may be losing a capacity that earlier readers took for granted.

The mode of reading that the screen encourages is a kind of foraging. The eye skims for keywords, leaps between headings, follows a link, returns or does not. It is admirably adapted to its purpose, which is locating information, and it would be foolish to deplore it. The difficulty is that habits are not confined to the occasions that formed them. Many people now report that when they sit down with a demanding book, their attention behaves as though it were still online. After two pages it begins to cast about for something else.

Slow reading is a different activity, and not merely the same one performed at reduced speed. It involves staying with a sentence long enough to hear its rhythm, to notice the word that was chosen in preference to its near neighbours, to register what has been left unsaid. It tolerates not understanding for a while. It rereads. Above all it grants the writer a provisional authority: the reader agrees, for the duration, to think along someone else's lines instead of merely checking the text against what they already believe.

What is gained by this is not chiefly information, of which slow reading is a notoriously inefficient source. It is something closer to experience. A long novel read attentively does not tell us that other minds are as real as our own; it makes us inhabit one, for hours, until the proposition no longer needs stating. A difficult argument followed step by step does not merely deliver its conclusion; it rehearses in us the discipline of holding several ideas in play at once. These are capacities, and like other capacities they strengthen with use and weaken without it.

It would be sentimental to pretend that everything merits such treatment. Most of what we read deserves the skim it receives, and the ability to triage is a form of intelligence. The loss occurs only if skimming becomes the sole gear available, so that nothing can any longer be read in the other way, however richly it would repay it.

The remedy is not heroic. It requires a book worth the trouble, a period of time with the telephone in another room, and a willingness to endure the first twenty minutes, during which the restless mind protests. After that, more often than not, something settles. The pages begin to turn at their own pace, and one remembers, with a certain surprise, that this was always available.`,
    v: `gist | noun | the main point or general meaning of something | We can extract the gist of a page quickly.
forage | verb | to search widely for food or supplies | Online reading is a kind of foraging.
deplore | verb | to disapprove of something strongly | It would be foolish to deplore skimming.
provisional | adjective | accepted for now, but likely to be changed | The reader grants the writer a provisional authority.
triage | verb | to sort things by how much attention they need | The ability to triage is a form of intelligence.
repay | verb | to reward the effort given to something | Some books richly repay slow reading.`,
    q: [
      { q: 'In what sense are we accomplished readers?', o: ['We extract the gist very quickly', 'We remember everything', 'We read only long books'], a: 0 },
      { q: 'What problem do many people report?', o: ['They cannot find information online', 'Their attention wanders when they read a demanding book', 'Books are too expensive'], a: 1 },
      { q: 'What is essential to slow reading?', o: ['Reading aloud', 'Reading only fiction', 'Staying with the text and thinking along the writer\'s lines'], a: 2 },
      { q: 'What does slow reading mainly provide?', o: ['Something close to experience', 'Information', 'Speed'], a: 0 },
      { q: 'What is the writer\'s view of skimming?', o: ['It should be abandoned', 'It is fine, unless it becomes the only way we can read', 'It is always harmful'], a: 1 }
    ] }
  ]);
})();
