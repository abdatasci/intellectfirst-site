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
})();
