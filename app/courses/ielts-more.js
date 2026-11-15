/* IELTS Lessons, units 4–8 (original IF Academy material). */
(function () {
  var K = IFX.k;
  IFX.make('ielts', [
    { id: 'u4', t: 'Listening Section 1: forms and details', topic: 'Listening', skill: true,
      v: ['Words for forms and bookings', `
surname | noun | your family name | Could you spell your surname, please? | фамилия
postcode | noun | letters and numbers at the end of an address | The postcode is KN4 7RT. | почтовый индекс
deposit | noun | money you pay first to keep a booking | You need to pay a 20% deposit. | залог, предоплата
available | adjective | free to be used or booked | Is the double room available on Friday? | свободный, доступный
reference number | noun | a code that identifies your booking | Your reference number is B-4471. | номер брони
in advance | phrase | before the time something happens | Please book at least two days in advance. | заранее
confirm | verb | to say that something is definitely arranged | I'll email you to confirm the time. | подтверждать
fortnight | noun | two weeks | We're staying for a fortnight. | две недели`],
      g: ['Catching the right answer', "<table><tr><td><b>Read first</b></td><td>Use the 30 seconds before each part to read the questions and guess the <b>type</b> of answer: a name, a number, a date, a price?</td></tr><tr><td><b>Spelling</b></td><td>Names and streets are spelled out letter by letter. Know <b>double</b> letters (\"double L\") and tricky pairs: A/E/I, G/J, B/V/P.</td></tr><tr><td><b>Distractors</b></td><td>Speakers often <b>change their minds</b>: \"Thursday… no, actually, Friday is better.\" Write the <b>final</b> answer.</td></tr><tr><td><b>Word limit</b></td><td>\"NO MORE THAN TWO WORDS AND/OR A NUMBER\" — <i>the 5th of May</i> → write <b>5 May</b>.</td></tr></table>",
        [K.mc('The speaker says: "The class is on Tuesday — sorry, I mean Wednesday." You write:', ['Tuesday', 'Wednesday', 'Tuesday or Wednesday'], 1),
         K.mc('"ONE WORD ONLY": the answer is "a large kitchen". You write:', ['a large kitchen', 'large kitchen', 'kitchen'], 2),
         K.mc('"Double S" means:', ['S S', 'the letter S twice in a row', 'a capital S'], 1),
         K.mc('Before the recording starts you should:', ['close your eyes', 'read the questions and predict the answers', 'write your name'], 1),
         K.tf('Spelling mistakes are accepted in the Listening test.', false),
         K.mc('£15.50 is said:', ['fifteen pounds fifty', 'fifteen fifty pounds', 'fifteen point five'], 0)]],
      r: ['Practice: booking a language course (transcript)', "Receptionist: Good morning, Riverside Language School. How can I help?\n\nCaller: Hi, I'd like to book a place on the evening English course.\n\nReceptionist: Of course. Can I take your name?\n\nCaller: Yes, it's Daniyar Seitkali. That's S-E-I-T-K-A-L-I.\n\nReceptionist: Thank you. And your address?\n\nCaller: 14 Mill Road, and the postcode is CB2 9LP.\n\nReceptionist: Lovely. The course starts on the 3rd of March — oh, sorry, that's the morning group. The evening group starts on the 10th of March. It runs for ten weeks and costs £240. We ask for a deposit of £60 to keep your place.\n\nCaller: That's fine. Can I pay the rest in advance?\n\nReceptionist: Yes, any time before the first lesson. Your reference number is RL-306. I'll email you to confirm everything today.",
        [K.gap('Family name: ___', 'Seitkali', 'SEITKALI'),
         K.mc('Address: 14 ___ Road', ['Mill', 'Hill', 'Mile'], 0),
         K.mc('The evening course starts on:', ['3 March', '10 March', '30 March'], 1),
         K.mc('Total price of the course:', ['£60', '£240', '£300'], 1),
         K.gap('Reference number: ___', 'RL-306', 'RL306'),
         K.tf('The caller must pay everything on the first day.', false)]] },

    { id: 'u5', t: 'Speaking Part 2: the long turn', topic: 'Speaking', skill: true,
      v: ['Words for telling a story well', `
memorable | adjective | special and easy to remember | It was one of the most memorable days of my life. | запоминающийся
vividly | adverb | very clearly, with lots of detail | I vividly remember the smell of the sea. | ярко, живо
looking back | phrase | when I think about it now | Looking back, it was a great decision. | оглядываясь назад
to be honest | phrase | used to say what you really think | To be honest, I was quite nervous. | честно говоря
it turned out that | phrase | used to say what happened in the end | It turned out that the shop was closed. | оказалось, что
spontaneous | adjective | done without planning | It was a spontaneous trip with my friends. | спонтанный
unforgettable | adjective | impossible to forget | The view from the mountain was unforgettable. | незабываемый
reflect on | phrasal verb | to think carefully about something | I often reflect on what I learned that summer. | размышлять о`],
      g: ['Speaking for two minutes', "<table><tr><td><b>1 minute to prepare</b></td><td>Write 4–5 key words — one for each point on the card. Don't write sentences.</td></tr><tr><td><b>Start</b></td><td>\"I'd like to talk about…\" — then set the scene: when, where, who.</td></tr><tr><td><b>Middle</b></td><td>Cover every point on the card. Add <b>details</b> and <b>feelings</b>. Use past tenses accurately.</td></tr><tr><td><b>End</b></td><td>The last point is usually \"explain why…\" — give 2 reasons and a reflection: \"Looking back, …\"</td></tr></table><p>Keep going until the examiner stops you. Silence costs more than small mistakes.</p>",
        [K.mc('How long do you speak in Part 2?', ['30 seconds', '1–2 minutes', '5 minutes'], 1),
         K.mc('In the preparation minute you should write:', ['full sentences', 'key words for each point', 'nothing'], 1),
         K.mc('A good way to start:', ['"I don\'t know."', '"I\'d like to talk about a trip I took last summer."', '"Yes."'], 1),
         K.mc('If you finish early, you should:', ['stop and wait', 'add more details, feelings and reflections', 'ask the examiner a question'], 1),
         K.tf('It is better to stop talking than to make a small grammar mistake.', false),
         K.ord('Looking back, it was the best decision I have ever made.')]],
      r: ['Model answer: describe a memorable journey', "I'd like to talk about a spontaneous trip I took with two friends to Burabay, a national park in the north of Kazakhstan, about two years ago.\n\nIt was the end of our exams and we were exhausted, so one evening we just decided to go. We took the night train from Kostanay and arrived early in the morning. I vividly remember stepping off the train into cold, fresh air that smelled of pine trees.\n\nWe spent three days hiking around the lakes. The most memorable moment was climbing a hill called Okzhetpes at sunrise. To be honest, I was quite nervous because the path was steep, but the view from the top was unforgettable — the lake was completely still, like a mirror.\n\nIt turned out that the trip was important for me in another way, too. We didn't have much internet, so we talked for hours instead of looking at our phones. Looking back, I think that's why I remember it so clearly: it was the first time in months that I really relaxed and enjoyed the moment.",
        [K.mc('Where did the speaker go?', ['to Almaty', 'to Burabay', 'to the sea'], 1),
         K.mc('How did they travel?', ['by plane', 'by car', 'by night train'], 2),
         K.tf('The trip was planned months in advance.', false),
         K.mc('Why was the speaker nervous?', ['the path was steep', 'the train was late', 'it was raining'], 0),
         K.mc('Why does the speaker remember the trip so well?', ['it was expensive', 'they relaxed and talked instead of using phones', 'they won a prize'], 1)]] },

    { id: 'u6', t: 'Writing Task 2: discussion and advantages essays', topic: 'Writing Task 2', skill: true,
      v: ['Language for balanced essays', `
on the one hand | phrase | used to introduce one side of an argument | On the one hand, online learning is flexible. | с одной стороны
on the other hand | phrase | used to introduce the opposite side | On the other hand, students may feel isolated. | с другой стороны
proponents | noun | people who support an idea | Proponents of the tax argue that it reduces pollution. | сторонники
opponents | noun | people who are against an idea | Opponents claim it is unfair to poorer families. | противники
outweigh | verb | to be more important than | I believe the benefits outweigh the drawbacks. | перевешивать
drawback | noun | a disadvantage | The main drawback is the cost. | недостаток
whereas | conjunction | used to compare two different facts | Some prefer cities, whereas others choose the countryside. | тогда как
to a certain extent | phrase | partly, but not completely | I agree with this view to a certain extent. | в определённой степени`],
      g: ['Two common question types', "<table><tr><td><b>Discuss both views and give your opinion</b></td><td>Intro (paraphrase + your view) → Body 1: view A → Body 2: view B → Conclusion (your view again).</td></tr><tr><td><b>Do the advantages outweigh the disadvantages?</b></td><td>Intro (paraphrase + your answer) → Body 1: the weaker side → Body 2: the stronger side → Conclusion.</td></tr></table><p>Always answer <b>every part</b> of the question. In a \"discuss both views\" essay, your opinion must be clear in the introduction and the conclusion.</p><p class=\"ex\"><i>While some people argue that…, others believe that… This essay will discuss both views before explaining why I support the latter.</i></p>",
        [K.mc('"Discuss both views and give your opinion": where must your opinion appear?', ['only in the conclusion', 'in the introduction and the conclusion', 'nowhere'], 1),
         K.mc('In an advantages/disadvantages essay, Body 2 should present:', ['the stronger side', 'an unrelated idea', 'a summary'], 0),
         K.mc('Choose the best linker: Cities offer jobs, ___ villages offer peace.', ['whereas', 'because', 'therefore'], 0),
         K.mc('"The benefits ___ the drawbacks."', ['outweigh', 'overweight', 'outwork'], 0),
         K.tf('You can ignore part of the question if you write 250 words.', false),
         K.ord('I agree with this view to a certain extent.')]],
      r: ['Model essay: should university education be free?', "Some people argue that university education should be free for everyone, while others believe that students should pay for their own degrees. This essay will discuss both views before explaining why I support free higher education.\n\nOn the one hand, opponents of free tuition point out that universities are expensive to run, and if students do not pay, the money must come from taxes. They also argue that graduates usually earn more, so it is fair that they cover part of the cost themselves.\n\nOn the other hand, proponents claim that free education gives every talented young person the same chance, regardless of their family's income. In countries such as Germany, where tuition is free, more students from poorer backgrounds go to university, and the whole economy benefits from a better-educated workforce.\n\nIn conclusion, although free tuition has a real cost, I believe its benefits outweigh this drawback, because a country's future depends on using all of its young people's talent.",
        [K.mc('What is the writer\'s opinion?', ['students should pay', 'university should be free', 'the writer has no opinion'], 1),
         K.mc('Which argument do opponents use?', ['graduates earn more, so they should pay', 'education is a human right', 'Germany is rich'], 0),
         K.tf('The writer gives an example from another country.', true),
         K.mc('The essay has how many paragraphs?', ['three', 'four', 'five'], 1),
         K.mc('Which linker introduces the opposite view?', ['In conclusion', 'On the other hand', 'For example'], 1)]] },

    { id: 'u7', t: 'Reading: matching headings', topic: 'Reading', skill: true,
      v: ['Academic words for reading', `
significant | adjective | large or important enough to notice | There was a significant rise in temperature. | значительный
attribute to | verb | to say that something is caused by | Scientists attribute the decline to pollution. | объяснять чем-то
phenomenon | noun | something that happens or exists, often unusual | Migration is a natural phenomenon. | явление
consequently | adverb | as a result | Water levels fell; consequently, fish died. | следовательно
undermine | verb | to make something weaker gradually | Lack of sleep can undermine your health. | подрывать
substantial | adjective | large in amount | A substantial number of species are at risk. | существенный
predominantly | adverb | mainly | The workforce is predominantly young. | преимущественно
emerge | verb | to appear or become known | New evidence emerged in 2019. | появляться, выясняться`],
      g: ['How to match headings', "<table><tr><td><b>1</b></td><td>Read the <b>headings</b> first. Underline the key idea in each.</td></tr><tr><td><b>2</b></td><td>For each paragraph, read the <b>first and last sentences</b> — they usually carry the main idea.</td></tr><tr><td><b>3</b></td><td>Choose the heading that sums up the <b>whole paragraph</b>, not just one detail.</td></tr><tr><td><b>4</b></td><td>There are always <b>more headings than paragraphs</b>. Cross out the ones you use.</td></tr></table><p>Trap: a heading that repeats a word from the paragraph is often wrong — look for the same <b>idea</b> in different words.</p>",
        [K.mc('What should you read first?', ['the whole passage slowly', 'the list of headings', 'the last paragraph'], 1),
         K.mc('The main idea is usually in:', ['the middle of the paragraph', 'the first and last sentences', 'the numbers'], 1),
         K.mc('A heading that uses the same word as the paragraph is:', ['always correct', 'sometimes a trap', 'never used'], 1),
         K.tf('There are usually more headings than paragraphs.', true),
         K.mc('A good heading summarises:', ['one example', 'the whole paragraph', 'the first word'], 1)]],
      r: ['Practice passage: the return of the wolf', "A  For most of the twentieth century, grey wolves were absent from Yellowstone National Park in the United States. They had been hunted until none remained, and for decades the park's ecosystem developed without its top predator.\n\nB  In 1995, scientists reintroduced fourteen wolves from Canada. The decision was controversial: local farmers feared for their animals, and some politicians argued that the money would be better spent elsewhere.\n\nC  The effects were more significant than anyone expected. With wolves hunting them, elk stopped grazing in open valleys. Consequently, young trees along the rivers began to grow again, and birds and beavers returned. Scientists attribute these changes to a phenomenon called a 'trophic cascade', in which one species changes a whole food chain.\n\nD  Not everyone accepts this story, however. Some researchers argue that a series of wet years and a growing population of bears also played a substantial role, and that the wolves' influence has been exaggerated.",
        [K.mc('Paragraph A — choose the heading:', ['A predator disappears', 'Farmers protest', 'A disputed explanation'], 0),
         K.mc('Paragraph B — choose the heading:', ['Rivers recover', 'An unpopular plan', 'Bears increase'], 1),
         K.mc('Paragraph C — choose the heading:', ['Unexpected changes across the ecosystem', 'The cost of the project', 'Wolves from Canada'], 0),
         K.mc('Paragraph D — choose the heading:', ['A success story', 'Doubts about the cause', 'More wolves arrive'], 1),
         K.tf('Fourteen wolves were brought to the park in 1995.', true)]] },

    { id: 'u8', t: 'Writing Task 1: processes and maps', topic: 'Writing Task 1',
      v: ['Words for processes and maps', `
stage | noun | one step in a process | The process consists of six stages. | этап
subsequently | adverb | after that | The leaves are subsequently dried. | впоследствии, затем
transported | verb (passive) | moved from one place to another | The bottles are transported to a factory. | транспортироваться
converted into | verb (passive) | changed into something else | The waste is converted into energy. | превращаться в
replaced by | verb (passive) | taken away and something else put there | The farmland was replaced by houses. | заменяться
demolished | verb (passive) | knocked down completely | The old factory was demolished. | сносить
expanded | verb (passive) | made bigger | The car park was expanded. | расширяться
adjacent to | preposition | next to | A new school was built adjacent to the park. | рядом с`],
      g: ['The passive for processes and changes', "<p>Processes and maps describe what <b>is done</b> or what <b>was changed</b>, so the <b>passive</b> is the key structure.</p><table><tr><td>Process (present passive)</td><td>The beans <b>are picked</b> and <b>dried</b> in the sun.</td></tr><tr><td>Map (past passive)</td><td>The forest <b>was cut down</b> and a road <b>was built</b>.</td></tr><tr><td>Map (present perfect passive)</td><td>A new bridge <b>has been constructed</b>.</td></tr><tr><td>Sequencers</td><td>First, … Next, … After that, … Finally, …</td></tr></table>",
        [K.mc('The cocoa beans ___ by hand.', ['pick', 'are picked', 'are picking'], 1),
         K.mc('In 2005 the old hospital ___.', ['demolished', 'was demolished', 'is demolishing'], 1),
         K.gap('Since then, a shopping centre ___ been built.', 'has'),
         K.mc('Best sequencer for the last step:', ['First', 'Finally', 'Meanwhile'], 1),
         K.ord('The glass is melted and made into new bottles.'),
         K.mc('"The car park was made bigger." =', ['The car park was expanded.', 'The car park was demolished.', 'The car park was replaced.'], 0)]],
      r: ['Model answer: how glass bottles are recycled', "The diagram illustrates the process by which used glass bottles are recycled into new ones.\n\nOverall, the process consists of six main stages, beginning with the collection of used bottles and ending with new bottles being delivered to shops.\n\nFirst, used bottles are collected from special bins and transported to a recycling plant, where they are cleaned and sorted by colour. Subsequently, the glass is crushed into small pieces, known as cullet, which are then mixed with sand and heated in a furnace at about 1,500 degrees.\n\nAt the next stage, the melted glass is shaped into new bottles using moulds. Finally, the new bottles are filled, labelled and sent back to supermarkets, where the cycle begins again.",
        [K.mc('How many stages does the process have?', ['four', 'six', 'eight'], 1),
         K.mc('Where are the bottles cleaned?', ['at the supermarket', 'at the recycling plant', 'at home'], 1),
         K.mc('What is "cullet"?', ['small pieces of crushed glass', 'a type of sand', 'a new bottle'], 0),
         K.tf('The glass is heated to about 1,500 degrees.', true),
         K.mc('Which tense is used most?', ['present passive', 'past continuous', 'future simple'], 0)]] }
  ]);
})();
