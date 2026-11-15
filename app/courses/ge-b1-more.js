/* General English B1, units 3–8 (original IF Academy material). */
(function () {
  var K = IFX.k;
  IFX.make('ge-b1', [
    { id: 'u3', t: 'Relationships', topic: 'People',
      v: ['Friends and family', `
get on well with | phrasal verb | to have a friendly relationship with | I get on well with my brother. | ладить с
fall out with | phrasal verb | to stop being friendly after an argument | She fell out with her best friend. | поссориться с
rely on | phrasal verb | to trust someone to help you | You can always rely on Asel. | полагаться на
close | adjective | knowing someone very well and liking them | We've been close friends for years. | близкий
keep in touch | phrase | to continue to talk or write to someone | Let's keep in touch after the course. | поддерживать связь
colleague | noun | a person you work with | My colleagues are very friendly. | коллега
trust | verb / noun | to believe that someone is honest | I trust her completely. | доверять
apologise | verb | to say you are sorry | He apologised for being late. | извиняться`],
      g: ['Present perfect with for and since', "<p>Use the <b>present perfect</b> for situations that started in the past and continue <b>now</b>.</p><table><tr><td><b>for</b> + a period</td><td>I've known her <b>for</b> ten years / <b>for</b> a long time.</td></tr><tr><td><b>since</b> + a point in time</td><td>We've lived here <b>since</b> 2019 / <b>since</b> I was a child.</td></tr><tr><td>Question</td><td><b>How long have</b> you <b>been</b> friends?</td></tr></table><p>Not: <s>I know her for ten years.</s> · <s>I am here since Monday.</s></p>",
        [K.mc('I\'ve known Marat ___ 2015.', ['for', 'since', 'from'], 1),
         K.mc('They\'ve been married ___ twenty years.', ['for', 'since', 'during'], 0),
         K.mc('How long ___ you lived in Kostanay?', ['do', 'have', 'are'], 1),
         K.mc('Choose the correct sentence.', ['I know him since school.', 'I\'ve known him since school.', 'I\'m knowing him since school.'], 1),
         K.gap('She ___ (work) here since March.', 'has worked', "'s worked"),
         K.ord('We have been friends for a long time.')]],
      r: ['Friends for thirty years', "Gulnara and Svetlana have been best friends since they were six. They met on their first day at school in Kostanay, when Svetlana lent Gulnara a pencil. They have been close ever since.\n\nOf course, they haven't always agreed. When they were teenagers, they fell out for a whole month about a boy! But they apologised, and now they laugh about it. Svetlana moved to Germany fifteen years ago, but they have kept in touch. 'We've talked on the phone every Sunday for fifteen years,' says Gulnara. 'I know I can always rely on her.'",
        [K.mc('How did the friends meet?', ['at university', 'at school', 'at work'], 1),
         K.mc('What did Svetlana lend Gulnara?', ['a book', 'a pencil', 'money'], 1),
         K.tf('They have never had an argument.', false),
         K.mc('Where does Svetlana live now?', ['in Kostanay', 'in Germany', 'in Almaty'], 1),
         K.mc('How often do they talk on the phone?', ['every day', 'every Sunday', 'once a month'], 1)]] },

    { id: 'u4', t: 'Money matters', topic: 'Money',
      v: ['Spending and saving', `
afford | verb | to have enough money for something | I can't afford a new car. | позволить себе
save | verb | to keep money to use later | I'm saving for a holiday. | копить
waste | verb / noun | to use badly or without need | Don't waste money on things you don't need. | тратить впустую
borrow | verb | to take something you will give back | Can I borrow 2,000 tenge? | брать взаймы
lend | verb | to give something that will be given back | My sister lent me her car. | давать взаймы
bargain | noun | something cheaper than usual | These shoes were a real bargain. | выгодная покупка
budget | noun | a plan for how to spend money | We're on a tight budget this month. | бюджет
discount | noun | a lower price | Students get a 10% discount. | скидка`],
      g: ['First conditional and unless', "<p>Use the <b>first conditional</b> for real possibilities in the future.</p><table><tr><td><b>If</b> + present, <b>will</b> + verb</td><td><b>If</b> you <b>save</b> every month, you<b>'ll be able</b> to buy it.</td></tr><tr><td>Negative</td><td>If I <b>don't get</b> a discount, I <b>won't buy</b> it.</td></tr><tr><td><b>unless</b> = if … not</td><td>I won't buy it <b>unless</b> it's cheaper.</td></tr></table><p>Don't use <i>will</i> after <i>if</i>: <s>If it will rain…</s></p>",
        [K.mc('If you ___ a budget, you\'ll save more.', ['make', 'will make', 'made'], 0),
         K.mc('If it\'s too expensive, I ___ buy it.', ["don't", "won't", "didn't"], 1),
         K.mc('We\'ll be late ___ we leave now.', ['if', 'unless', 'when'], 1),
         K.gap('If you lend me the money, I ___ (pay) you back tomorrow.', "'ll pay", 'will pay'),
         K.mc('Choose the correct sentence.', ['If it will be sunny, we\'ll go out.', 'If it\'s sunny, we\'ll go out.'], 1),
         K.ord("I won't buy it unless there's a discount.")]],
      r: ['How to save money as a student', "Most students don't have much money, but a few simple habits can make a big difference.\n\nFirst, make a budget. Write down everything you spend for one month — you'll be surprised how much you waste on coffee and snacks! Second, never go shopping when you're hungry. If you do, you'll buy things you don't need. Third, always ask about student discounts: cinemas, museums and even some cafés offer them.\n\nFinally, think twice before you borrow money. If you borrow from friends, pay it back quickly, or you might lose a friend as well as your money!",
        [K.mc('What is the first piece of advice?', ['get a job', 'make a budget', 'stop drinking coffee'], 1),
         K.mc('What happens if you shop when you\'re hungry?', ['you buy things you don\'t need', 'you save money', 'you get a discount'], 0),
         K.tf('Only cinemas give student discounts.', false),
         K.mc('The writer says that if you don\'t pay friends back, you might…', ['lose a friend', 'get a discount', 'save money'], 0),
         K.mc('The text is mainly…', ['a story', 'advice', 'an advert'], 1)]] },

    { id: 'u5', t: 'School and learning', topic: 'Education',
      v: ['Education words', `
subject | noun | something you study at school | My favourite subject is history. | предмет
exam | noun | an official test | I've got a maths exam tomorrow. | экзамен
pass | verb | to be successful in an exam | She passed all her exams. | сдать (экзамен)
fail | verb | to not be successful in an exam | He failed his driving test. | провалить
revise | verb | to study again before an exam | I'm revising for my exams. | повторять (материал)
uniform | noun | special clothes all students wear | We have to wear a uniform. | школьная форма
strict | adjective | expecting people to obey rules | Our teacher is very strict. | строгий
term | noun | one part of the school year | The autumn term starts in September. | четверть, семестр`],
      g: ['must, have to, be allowed to', "<table><tr><td><b>have to / must</b></td><td>necessary: We <b>have to</b> wear a uniform. You <b>must</b> be on time.</td></tr><tr><td><b>don't have to</b></td><td>not necessary: You <b>don't have to</b> come on Saturday.</td></tr><tr><td><b>mustn't / can't / aren't allowed to</b></td><td>forbidden: You <b>mustn't</b> use phones in exams. We <b>aren't allowed to</b> leave early.</td></tr><tr><td><b>can / be allowed to</b></td><td>permitted: We <b>can</b> / <b>are allowed to</b> use dictionaries.</td></tr><tr><td>Past</td><td>We <b>had to</b> … · We <b>weren't allowed to</b> …</td></tr></table>",
        [K.mc('Tomorrow is a holiday, so we ___ go to school.', ['mustn\'t', "don't have to", 'have to'], 1),
         K.mc('You ___ cheat in the exam!', ['mustn\'t', "don't have to"], 0),
         K.mc('Are students ___ to use phones in class?', ['allow', 'allowed', 'allowing'], 1),
         K.mc('When I was at school, we ___ wear a uniform.', ['must', 'had to', 'have to'], 1),
         K.gap('She ___ (have to) revise every evening.', 'has to'),
         K.ord("We weren't allowed to talk in the library.")]],
      r: ['School then and now', "Mr Akhmetov has taught English at the same school in Kostanay for thirty years, and a lot has changed. 'When I started, students had to stand up when a teacher came into the room,' he says. 'They weren't allowed to speak unless the teacher asked a question.'\n\nToday, lessons are more relaxed. Students work in groups and they can use tablets to find information. They don't have to wear a strict uniform any more, but they mustn't use their phones during lessons. 'Some things never change,' laughs Mr Akhmetov. 'Students still have to revise before exams — and they still don't like it!'",
        [K.mc('How long has Mr Akhmetov taught at the school?', ['ten years', 'twenty years', 'thirty years'], 2),
         K.tf('In the past, students had to stand up when a teacher came in.', true),
         K.mc('What can students use today?', ['phones', 'tablets', 'calculators only'], 1),
         K.tf('Students today must wear a strict uniform.', false),
         K.mc('What hasn\'t changed?', ['students don\'t like revising', 'the uniform', 'group work'], 0)]] },

    { id: 'u6', t: 'Food and lifestyle', topic: 'Healthy living',
      v: ['Eating and living well', `
diet | noun | the food you usually eat | A balanced diet is important. | рацион, диета
avoid | verb | to stay away from something | I try to avoid sugary drinks. | избегать
give up | phrasal verb | to stop doing something | He gave up smoking last year. | бросить (привычку)
cut down on | phrasal verb | to eat, drink or do less of something | I'm cutting down on coffee. | сокращать
portion | noun | the amount of food for one person | The portions here are huge. | порция
homemade | adjective | made at home, not bought | I love homemade bread. | домашний
fit | adjective | healthy and strong | She runs every day to keep fit. | в форме
stressed | adjective | worried and nervous | I feel stressed before exams. | в стрессе`],
      g: ['-ing form or infinitive (to + verb)?', "<table><tr><td><b>-ing</b> after</td><td>enjoy, avoid, give up, mind, finish, suggest, can't stand: I <b>enjoy cooking</b>. <b>Avoid eating</b> late.</td></tr><tr><td><b>-ing</b> as a subject / after prepositions</td><td><b>Swimming</b> is good for you. I'm good <b>at cooking</b>.</td></tr><tr><td><b>to + verb</b> after</td><td>want, decide, hope, plan, need, learn, try: I've <b>decided to eat</b> less sugar.</td></tr><tr><td><b>to + verb</b> for purpose</td><td>I go running <b>to keep</b> fit.</td></tr></table>",
        [K.mc('I\'ve decided ___ up chocolate.', ['giving', 'to give'], 1),
         K.mc('She enjoys ___ new recipes.', ['trying', 'to try'], 0),
         K.mc('You should avoid ___ too much salt.', ['eating', 'to eat'], 0),
         K.mc('___ every day is good for your health.', ['Walk', 'Walking', 'To walking'], 1),
         K.gap('I go to the gym ___ (keep) fit.', 'to keep'),
         K.ord("I'm trying to cut down on sugar.")]],
      r: ['The secrets of long life', "In some parts of the world, many people live to be a hundred. Scientists have studied these places to find out why.\n\nThe first secret seems to be food. People eat a lot of vegetables and beans, and they avoid eating processed food. Their portions are smaller, and most meals are homemade. The second secret is movement: they don't go to the gym, but they walk, work in the garden and keep active all day.\n\nFinally, they don't seem to feel stressed. They enjoy spending time with family and friends, and they have a reason to get up every morning. Perhaps living longer isn't about giving up everything we love — it's about enjoying life in a healthy way.",
        [K.mc('What do people in these places avoid?', ['vegetables', 'processed food', 'beans'], 1),
         K.tf('They go to the gym every day.', false),
         K.mc('How do they keep active?', ['walking and gardening', 'running marathons', 'playing tennis'], 0),
         K.mc('The third secret is about…', ['sleep', 'not feeling stressed', 'money'], 1),
         K.mc('The writer thinks living longer is about…', ['giving up everything', 'enjoying life in a healthy way', 'eating less'], 1)]] },

    { id: 'u7', t: 'Mysteries', topic: 'Crime and mystery',
      v: ['Crime and mystery', `
steal | verb | to take something that isn't yours | Someone stole my bike. | красть
thief | noun | a person who steals | The thief ran away. | вор
witness | noun | a person who saw a crime | The police spoke to three witnesses. | свидетель
evidence | noun | facts that show something is true | There was no evidence. | доказательства
arrest | verb | (of the police) to take someone to the police station | They arrested a man yesterday. | арестовать
suspect | noun | a person who might be guilty | The police have two suspects. | подозреваемый
disappear | verb | to go where no one can see you | The painting disappeared in 1911. | исчезать
solve | verb | to find the answer to a problem | Detectives never solved the case. | раскрывать, решать`],
      g: ['Past perfect', "<p>Use the <b>past perfect</b> (had + past participle) for something that happened <b>before</b> another past action.</p><table><tr><td>Earlier action</td><td>When the police arrived, the thief <b>had escaped</b>.</td></tr><tr><td>Negative</td><td>She <b>hadn't seen</b> him before.</td></tr><tr><td>Question</td><td><b>Had</b> you <b>locked</b> the door?</td></tr></table><p>Compare: When I got to the station, the train <b>left</b> (I saw it leave). / … the train <b>had left</b> (it was already gone).</p>",
        [K.mc('When we got home, someone ___ the window.', ['broke', 'had broken', 'has broken'], 1),
         K.mc('I didn\'t know him. I ___ him before.', ["hadn't met", "haven't met", "didn't meet"], 0),
         K.mc('By the time the police arrived, the thieves ___.', ['disappeared', 'had disappeared', 'have disappeared'], 1),
         K.gap('She was tired because she ___ (not / sleep) well.', "hadn't slept", 'had not slept'),
         K.mc('___ you finished your work when he called?', ['Have', 'Had', 'Did'], 1),
         K.ord('The thief had already left when the police arrived.')]],
      r: ['The missing Mona Lisa', "On the morning of 22 August 1911, a painter arrived at the Louvre museum in Paris to copy the Mona Lisa. But when he went to the room, he saw only four metal hooks on the wall. The painting had disappeared!\n\nAt first, the guards thought it had gone to the photography department. By the time they realised it had been stolen, more than a day had passed. The police questioned hundreds of people — even the artist Pablo Picasso — but they found no evidence.\n\nTwo years later, a man tried to sell the painting in Florence. His name was Vincenzo Peruggia, and he had worked at the Louvre. He had simply hidden in a cupboard, taken the painting and walked out under his coat.",
        [K.mc('When did the painting disappear?', ['1911', '1913', '1921'], 0),
         K.mc('What did the painter see on the wall?', ['another painting', 'four metal hooks', 'a message'], 1),
         K.tf('The police questioned Picasso.', true),
         K.mc('Where was the painting found?', ['in Paris', 'in Florence', 'in London'], 1),
         K.mc('How did Peruggia steal it?', ['at night through a window', 'he hid in a cupboard and took it under his coat', 'with two other men'], 1)]] },

    { id: 'u8', t: 'Our planet', topic: 'The environment',
      v: ['The environment', `
pollution | noun | dirty air, water or land | Air pollution is a big problem in winter. | загрязнение
recycle | verb | to use again after special treatment | We recycle paper and plastic. | перерабатывать
waste | noun | things that are thrown away | We produce too much plastic waste. | отходы
climate change | noun | changes in the world's weather caused by people | Climate change affects every country. | изменение климата
protect | verb | to keep safe from harm | We must protect our forests. | защищать
species | noun | a group of animals or plants of the same type | Many species are in danger. | вид (животных)
energy | noun | power from electricity, gas, the sun, etc. | Solar energy is becoming cheaper. | энергия
reduce | verb | to make smaller or less | We need to reduce our energy use. | сокращать`],
      g: ['The passive: present and past', "<p>Use the <b>passive</b> when the action is more important than who does it.</p><table><tr><td>Present simple</td><td>Plastic <b>is recycled</b> here. Millions of trees <b>are cut down</b> every year.</td></tr><tr><td>Past simple</td><td>The park <b>was cleaned</b> by volunteers. The rules <b>were changed</b> in 2020.</td></tr><tr><td>Who did it?</td><td>use <b>by</b>: The project was started <b>by</b> students.</td></tr></table>",
        [K.mc('Paper ___ at this factory.', ['recycles', 'is recycled', 'recycled'], 1),
         K.mc('The forest ___ by a fire last summer.', ['destroyed', 'was destroyed', 'is destroyed'], 1),
         K.mc('These bottles ___ from old plastic.', ['are made', 'make', 'is made'], 0),
         K.gap('The river ___ (clean) by volunteers last year.', 'was cleaned'),
         K.mc('The new park was opened ___ the mayor.', ['from', 'by', 'with'], 1),
         K.ord('Thousands of species are protected in national parks.')]],
      r: ['A city that cleaned its air', "Twenty years ago, the air in our city was so polluted that on some winter days you couldn't see the end of the street. Most houses were heated with coal, and old buses filled the roads.\n\nThen things began to change. Many homes were connected to gas, and the old buses were replaced with electric ones. A new cycle path was built along the river, and thousands of trees were planted by schoolchildren.\n\nToday the air is much cleaner, although the problem hasn't been solved completely. 'Every small action matters,' says one of the volunteers. 'If everyone recycles and uses less energy, our children will breathe cleaner air.'",
        [K.mc('Why was the air so polluted?', ['factories', 'coal heating and old buses', 'forest fires'], 1),
         K.mc('What replaced the old buses?', ['trams', 'electric buses', 'bikes'], 1),
         K.tf('Schoolchildren planted thousands of trees.', true),
         K.tf('The pollution problem has been completely solved.', false),
         K.mc('The volunteer believes that…', ['only the government can help', 'every small action matters', 'nothing will change'], 1)]] }
  ]);
})();
