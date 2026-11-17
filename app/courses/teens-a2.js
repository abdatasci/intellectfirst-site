/* A2 English for Teens: original IF Academy course for 12–16 year olds (not based on a textbook).
   8 units: words, grammar, reading, speaking. Each unit also has IF Classroom slides (A, B, C), a page in the printable
   coursebook and its own Block Quest and IF Live games. Extra fields read by the slide and book builders:
   wu = warm-up question, sp = speaking questions, task = mini project. */
IFX.course({
  id: 'teens-a2', track: 'general', level: 'A2', next: 'B1', icon: '🎧',
  title: 'A2 English for Teens', sub: 'Your world in English',
  blurb: 'School, friends, phones, sport, food, travel and future dreams — real teen topics with the A2 grammar and words you need to talk about them.',
  units: []
});
(function () {
  var K = IFX.k;
  IFX.make('teens-a2', [
    { id: 'u1', t: 'This is me', topic: 'Me and my interests', wu: 'What three words describe you?',
      sp: ['What do you love doing at the weekend?', 'What is something you hate doing?', 'Who is your best friend? What is he or she like?', 'What app do you use most?'],
      task: 'Make a “This is me” poster: 5 facts, 3 likes, 1 dislike, 1 secret talent.',
      v: ['Hobbies and personality', `
be into | phrase | to like something very much | I'm really into K-pop. | увлекаться
hang out | phrasal verb | to spend free time with friends | We hang out in the park after school. | тусоваться, проводить время
chill | verb | to relax | On Sundays I just chill at home. | отдыхать, расслабляться
draw | verb | to make a picture with a pencil or pen | She draws cartoons in her notebook. | рисовать
collect | verb | to get and keep things of one type | My brother collects football cards. | коллекционировать
funny | adjective | making people laugh | Daniyar is really funny. | смешной
shy | adjective | nervous about talking to new people | I'm a bit shy in a new class. | застенчивый
friendly | adjective | kind and nice to other people | Our new classmate is very friendly. | дружелюбный
lazy | adjective | not wanting to work or do things | I'm lazy in the morning! | ленивый
talent | noun | something you can do very well | Her talent is singing. | талант`],
      g: ['Present simple + like / love / hate + -ing', "<p>Use the <b>present simple</b> for facts about you and things you do regularly. With <b>he / she / it</b> add <b>-s</b>.</p><table><tr><td>I / you / we / they</td><td>play · don't play · Do you play?</td></tr><tr><td>he / she / it</td><td>plays · doesn't play · Does she play?</td></tr></table><p>After <b>like, love, enjoy, hate, don't mind</b> use the <b>-ing</b> form:</p><p class=\"ex\">I <b>love drawing</b>. · She <b>hates getting up</b> early. · We <b>don't mind waiting</b>.</p>",
        [K.mc('My sister ___ in a band.', ['sing', 'sings', 'singing'], 1),
         K.mc('I love ___ video games with my cousins.', ['play', 'plays', 'playing'], 2),
         K.gap('He ___ (not / like) getting up early.', "doesn't like", 'does not like'),
         K.mc('___ your friends hang out at the mall?', ['Do', 'Does', 'Are'], 0),
         K.gap('Aruzhan enjoys ___ (draw) anime characters.', 'drawing'),
         K.ord('We hate doing homework on Sundays.')]],
      r: ['Meet Timur', "Hi! I'm Timur and I'm fourteen. I live in Kostanay with my mum, my dad and my little sister, Aya. I'm in Year 8.\n\nI'm really into football and video games. I play football with my friends three times a week, and at the weekend we hang out in the park or at the mall. I also collect football cards — I've got more than 300!\n\nMy friends say I'm funny and friendly, but I'm a bit shy with new people. I love listening to music, but I hate cleaning my room. My mum says I'm lazy. Maybe she's right!\n\nMy secret talent? I can draw really well. I draw cartoons of my teachers… but I don't show them!",
        [K.mc('How old is Timur?', ['twelve', 'fourteen', 'fifteen'], 1),
         K.mc('How often does he play football?', ['every day', 'three times a week', 'at the weekend only'], 1),
         K.tf('Timur collects football cards.', true),
         K.tf('He is shy with his friends.', false),
         K.mc('What is his secret talent?', ['singing', 'drawing', 'dancing'], 1)]] },

    { id: 'u2', t: 'School life', topic: 'School', wu: 'What is your favourite school subject — and why?',
      sp: ['What do you have to do at your school?', 'What can’t you do in class?', 'Which subject is the most useful?', 'Describe a perfect school day.'],
      task: 'Write 6 rules for the perfect school — 3 with “have to” and 3 with “can”.',
      v: ['School subjects and rules', `
subject | noun | something you study at school, e.g. maths | My favourite subject is biology. | предмет
timetable | noun | a list of lessons and times | Let me check my timetable. | расписание
uniform | noun | special clothes all students wear | We have to wear a uniform. | школьная форма
break | noun | a short rest between lessons | We eat a snack at break. | перемена
homework | noun | school work you do at home | I do my homework after dinner. | домашнее задание
exam | noun | an important test | We have a maths exam on Friday. | экзамен
pass | verb | to get a good enough mark in a test | I hope I pass the exam! | сдать (экзамен)
fail | verb | to not pass a test | Don't worry if you fail — try again. | провалить
be good at | phrase | to do something well | Asel is good at chemistry. | хорошо получаться, быть сильным в
rule | noun | something you must or mustn't do | There is a rule: no phones in class. | правило`],
      g: ['can / can\'t · have to / don\'t have to', "<table><tr><td><b>can</b></td><td>it is OK, it is allowed: We <b>can</b> use a dictionary.</td></tr><tr><td><b>can't</b></td><td>it is not allowed: You <b>can't</b> eat in class.</td></tr><tr><td><b>have to / has to</b></td><td>it is necessary: I <b>have to</b> wear a uniform. She <b>has to</b> get up at 7.</td></tr><tr><td><b>don't have to</b></td><td>it is not necessary (but you can): We <b>don't have to</b> go to school on Sunday.</td></tr></table><p class=\"ex\">Question: <b>Do</b> you <b>have to</b> …? · <b>Can</b> we …?</p>",
        [K.mc('We ___ wear a uniform. It\'s a school rule.', ['can', 'have to', "don't have to"], 1),
         K.mc('You ___ use your phone in the exam. It\'s not allowed.', ["can't", 'have to', "don't have to"], 0),
         K.gap('My brother ___ (have to) do a lot of homework.', 'has to'),
         K.mc('It\'s Saturday! I ___ get up early.', ["don't have to", 'have to', "can't"], 0),
         K.mc('___ we leave early today, please?', ['Have', 'Can', 'Do'], 1),
         K.ord('Do you have to wear a uniform?')]],
      r: ['Two schools, two worlds', "Madi lives in Kostanay and Lily lives in London. Both are thirteen, but their school days are very different.\n\nMadi starts school at eight o'clock. He has to wear a uniform — a white shirt and dark trousers. He studies fifteen subjects, and he has a lot of homework. He can't use his phone in lessons, but he can use it at break.\n\nLily starts at nine and finishes at half past three. She also has to wear a uniform, with a school tie! At lunchtime, students eat together in the school canteen. Lily doesn't have to take exams this year, but she has to do a big science project.\n\nWhat do they both love? Friday afternoons — sport and clubs!",
        [K.mc('What time does Madi start school?', ['at seven', 'at eight', 'at nine'], 1),
         K.tf('Madi can use his phone at break.', true),
         K.tf('Lily doesn\'t have to wear a uniform.', false),
         K.mc('What does Lily have to do this year?', ['take exams', 'a science project', 'learn Russian'], 1),
         K.mc('What do they both love?', ['Monday mornings', 'exams', 'Friday afternoons'], 2)]] },

    { id: 'u3', t: 'Screen time', topic: 'Phones and the internet', wu: 'How many hours a day do you use your phone?',
      sp: ['What are you doing on your phone these days?', 'Which apps do you use every day?', 'Is social media good or bad for teens?', 'Could you live for a week without a phone?'],
      task: 'Keep a screen-time diary for 3 days and report back: what do you usually do, and what are you doing differently now?',
      v: ['Phones and online life', `
download | verb | to copy a file or app from the internet to your phone | I downloaded a new game. | скачивать
post | verb | to put a photo or message online | She posts photos every day. | публиковать, выкладывать
follow | verb | to see someone's posts on social media | I follow a lot of football players. | подписываться
share | verb | to let other people see or use something | Can you share the link? | делиться
charge | verb | to put power into a phone battery | My phone is charging. | заряжать
screen | noun | the flat part of a phone, TV or computer | My screen is broken! | экран
password | noun | a secret word that lets you use an account | Never share your password. | пароль
online | adjective / adverb | connected to the internet | Are you online now? | в сети, онлайн
message | noun / verb | (to send) a short written text | Message me after school. | сообщение, писать сообщение
addicted | adjective | not able to stop doing something | I think I'm addicted to this game! | зависимый`],
      g: ['Present simple vs present continuous', "<table><tr><td><b>Present simple</b></td><td>habits, things that are always true: I <b>usually check</b> my phone in the morning.</td></tr><tr><td><b>Present continuous</b> (am / is / are + -ing)</td><td>now, or around now: Shh! I<b>'m watching</b> a video. · This week I<b>'m learning</b> to code.</td></tr></table><p>Signal words: <b>usually, every day, often</b> → simple · <b>now, at the moment, today, this week, Look!</b> → continuous</p>",
        [K.mc('Look! My cat ___ on the keyboard!', ['sits', 'is sitting', 'sit'], 1),
         K.mc('I ___ my phone every night before bed.', ['charge', 'am charging', 'charges'], 0),
         K.gap('Can you call back later? I ___ (do) my homework.', "am doing", "'m doing"),
         K.mc('She ___ a lot of photos online. She loves it.', ['posts', 'is posting', 'post'], 0),
         K.mc('What ___ you ___ at the moment?', ['do / do', 'are / doing', 'does / do'], 1),
         K.ord('My brother is playing a new game this week.')]],
      r: ['My week without a phone', "Last month our English teacher gave us a challenge: no phones for a week. Here is my diary.\n\nMonday: It's terrible! I usually check my phone thirty times a day. Now I'm sitting in my room and I don't know what to do.\n\nWednesday: It's a bit better. Today I'm reading a real book — a paper one! My friends are messaging me, but I can't answer. They think I'm angry.\n\nFriday: I'm playing basketball with my dad. He usually works late, but today he's home. We're laughing a lot.\n\nSunday: The week is over. I'm charging my phone… but I'm not opening my apps. I'm not addicted any more — I think!\n\n— Dana, 15",
        [K.mc('How many times a day does Dana usually check her phone?', ['three', 'thirteen', 'thirty'], 2),
         K.tf('On Monday Dana felt great.', false),
         K.mc('What is she doing on Wednesday?', ['reading a book', 'watching TV', 'playing basketball'], 0),
         K.tf('Her friends think she is angry.', true),
         K.mc('Who does she play basketball with?', ['her friends', 'her dad', 'her teacher'], 1)]] },

    { id: 'u4', t: 'Weekend stories', topic: 'The past', wu: 'What did you do last weekend? Tell your partner three things.',
      sp: ['Where did you go last weekend?', 'What was the best day of your last holiday?', 'Did you ever lose something important?', 'Tell a funny story from school.'],
      task: 'Make a comic strip (6 pictures) of a funny or crazy weekend. Write one past simple sentence under each picture.',
      v: ['Weekend activities and time words', `
go out | phrasal verb | to leave home to do something fun | We went out for pizza on Saturday. | выходить (куда-то развлечься)
stay in | phrasal verb | to stay at home | It was cold, so I stayed in. | оставаться дома
sleepover | noun | a night when friends sleep at your house | I had a sleepover for my birthday. | ночёвка у друга
concert | noun | a music show | We went to a concert in Astana. | концерт
lose | verb | to not be able to find something | I lost my keys at the cinema. | терять
win | verb | to be first in a game or competition | Our team won 3–1! | выигрывать
bored | adjective | not interested; with nothing to do | I was bored on Sunday. | скучающий
excited | adjective | very happy because something good will happen | We were excited about the trip. | взволнованный (радостно)
ago | adverb | before now | I saw that film two weeks ago. | назад
last | adjective | the one before now: last night, last week | Last night I went to bed late. | прошлый`],
      g: ['Past simple: regular and irregular verbs', "<p>Regular verbs add <b>-ed</b>: play → play<b>ed</b>, stay → stay<b>ed</b>, chat → chat<b>ted</b>.</p><p>Irregular verbs change: go → <b>went</b>, have → <b>had</b>, see → <b>saw</b>, win → <b>won</b>, lose → <b>lost</b>, eat → <b>ate</b>.</p><table><tr><td>Negative</td><td>I <b>didn't go</b> out. (not <s>didn't went</s>)</td></tr><tr><td>Question</td><td><b>Did</b> you <b>see</b> the match? — Yes, I did. / No, I didn't.</td></tr></table>",
        [K.mc('We ___ a great film on Saturday.', ['see', 'saw', 'seed'], 1),
         K.mc('I ___ go out last night. I stayed in.', ["didn't", "don't", "wasn't"], 0),
         K.gap('Our team ___ (win) the match 2–0!', 'won'),
         K.mc('___ you go to the concert?', ['Do', 'Did', 'Were'], 1),
         K.gap('She ___ (lose) her phone on the bus.', 'lost'),
         K.ord('What did you do last weekend?')]],
      r: ['The worst (and best) Saturday', "Last Saturday was a crazy day. In the morning I woke up late and I missed my bus to football practice. My coach wasn't happy!\n\nIn the afternoon I went to the mall with my friends Ali and Sanzhar. We wanted to see a new film, but we lost the tickets. We looked everywhere — in our pockets, in our bags, under the chairs… nothing! I was so bored and angry.\n\nBut then something amazing happened. A man came to us and said, “Are these yours?” He had our tickets! He found them near the café.\n\nWe saw the film, and it was brilliant. After that we had a sleepover at Ali's house and played games until two o'clock. Crazy day — but a happy ending!",
        [K.mc('Why did the writer miss the bus?', ['he lost his ticket', 'he woke up late', 'he was ill'], 1),
         K.tf('The boys lost their cinema tickets.', true),
         K.mc('Where did the man find the tickets?', ['near the café', 'under the chairs', 'in a bag'], 0),
         K.tf('The film was boring.', false),
         K.mc('Where did they have a sleepover?', ["at Sanzhar's house", "at Ali's house", "at the writer's house"], 1)]] },

    { id: 'u5', t: 'Food and friends', topic: 'Food and eating out', wu: 'Pizza or plov? Burgers or baursaks? Choose and say why.',
      sp: ['What did you have for breakfast today?', 'What food can you cook?', 'Describe your favourite café or restaurant.', 'Is there any food you never eat?'],
      task: 'Plan a party menu for 10 friends with a budget of 20,000 tenge. Write a shopping list with some / any / how much / how many.',
      v: ['Food and drink', `
snack | noun | a small amount of food between meals | I have a snack after school. | перекус
meal | noun | breakfast, lunch or dinner | Dinner is my favourite meal. | приём пищи
healthy | adjective | good for your body | Fruit is a healthy snack. | полезный, здоровый
junk food | noun | food that is not healthy, like chips and burgers | I try not to eat junk food. | вредная еда, фастфуд
spicy | adjective | with a hot taste, like chilli | I love spicy noodles. | острый
delicious | adjective | very, very tasty | Grandma's baursaks are delicious! | очень вкусный
order | verb | to ask for food in a café | Can we order now, please? | заказывать
bill | noun | a paper that shows how much you must pay | Can we have the bill, please? | счёт
recipe | noun | instructions for cooking something | Can you send me the recipe? | рецепт
vegetarian | noun / adjective | (a person who) doesn't eat meat | My friend Lina is vegetarian. | вегетарианец`],
      g: ['Countable and uncountable: some / any · much / many', "<table><tr><td><b>Countable</b> (you can count them)</td><td>an apple, two apples, some eggs</td></tr><tr><td><b>Uncountable</b></td><td>water, bread, rice, cheese, money — no <i>a</i>, no plural</td></tr><tr><td><b>some</b></td><td>positive: There's <b>some</b> milk. I've got <b>some</b> crisps.</td></tr><tr><td><b>any</b></td><td>negative and questions: Is there <b>any</b> juice? We haven't got <b>any</b> eggs.</td></tr><tr><td><b>How many</b> + countable</td><td>How many apples do we need?</td></tr><tr><td><b>How much</b> + uncountable</td><td>How much sugar do you want?</td></tr></table>",
        [K.mc('Is there ___ milk in the fridge?', ['some', 'any', 'a'], 1),
         K.mc('How ___ eggs do we need for the cake?', ['much', 'many', 'any'], 1),
         K.gap("There's ___ bread on the table — help yourself.", 'some'),
         K.mc('How ___ money have you got?', ['many', 'much', 'some'], 1),
         K.mc('We haven\'t got ___ crisps. Let\'s buy some.', ['some', 'any', 'many'], 1),
         K.ord('Would you like some juice?')]],
      r: ['The Friday food challenge', "Every Friday, Kamila and her friends have a food challenge. They meet at a different café and everyone orders something new.\n\nLast Friday they went to a Korean café. Kamila ordered spicy ramen. “It was delicious, but very, very spicy!” she says. “I needed a lot of water.” Her friend Lina is vegetarian, so she had kimbap with vegetables. Erasyl ordered three different snacks — and he didn't share any!\n\nThe challenge has a rule: you can't order junk food. “We want to try healthy food from other countries,” says Kamila. At the end, they look at the bill and everyone pays the same. How much do they spend? “About 3,000 tenge each. Not much for a trip around the world!”",
        [K.mc('When do the friends have their food challenge?', ['every Monday', 'every Friday', 'every month'], 1),
         K.mc('What did Kamila order?', ['kimbap', 'spicy ramen', 'snacks'], 1),
         K.tf('Lina doesn\'t eat meat.', true),
         K.tf('Erasyl shared his snacks.', false),
         K.mc('How much does each person usually spend?', ['about 1,000 tenge', 'about 3,000 tenge', 'about 30,000 tenge'], 1)]] },

    { id: 'u6', t: 'Faster, higher, stronger', topic: 'Sport and challenges', wu: 'What is the most exciting sport to watch? Why?',
      sp: ['Which is harder: football or basketball? Why?', 'Who is the best sportsperson in the world?', 'What is the most difficult thing you can do?', 'Compare two sports you know.'],
      task: 'Class records! Find the fastest, tallest, oldest and best singer in your class and present them with superlatives.',
      v: ['Sport and fitness', `
team | noun | a group of people who play together | Our basketball team is the best in town. | команда
match | noun | a game between two teams or players | We watched the match on TV. | матч
score | verb | to get a goal or point | Ronaldo scored again! | забить (гол)
coach | noun | a person who trains a team | Our coach is very strict. | тренер
practise | verb | to do something again and again to get better | I practise every day after school. | тренироваться
fit | adjective | healthy and strong | Swimming keeps you fit. | в хорошей форме
champion | noun | the winner of a competition | She is the city boxing champion. | чемпион
cheer | verb | to shout to support a team | The fans cheered loudly. | болеть, подбадривать
lift weights | phrase | to raise heavy things in the gym to get stronger | My brother lifts weights at the gym. | поднимать тяжести
dangerous | adjective | that can hurt you | Mountain climbing is dangerous. | опасный`],
      g: ['Comparatives and superlatives', "<table><tr><td>short adjectives</td><td>fast → fast<b>er</b> → the fast<b>est</b> · big → big<b>ger</b> → the big<b>gest</b> · easy → eas<b>ier</b> → the eas<b>iest</b></td></tr><tr><td>long adjectives</td><td>dangerous → <b>more</b> dangerous → <b>the most</b> dangerous</td></tr><tr><td>irregular</td><td>good → <b>better</b> → <b>the best</b> · bad → <b>worse</b> → <b>the worst</b></td></tr></table><p class=\"ex\">Boxing is <b>more dangerous than</b> tennis. · Usain Bolt is <b>the fastest</b> man in the world.</p>",
        [K.mc('A cheetah is ___ than a horse.', ['fast', 'faster', 'fastest'], 1),
         K.mc('This is ___ match of the season!', ['the most exciting', 'more exciting', 'the excitingest'], 0),
         K.gap('My brother is ___ (good) at chess than me.', 'better'),
         K.mc('Yesterday was the ___ day of my life. I lost everything!', ['bad', 'worse', 'worst'], 2),
         K.gap('Is boxing ___ (dangerous) than football?', 'more dangerous'),
         K.ord('She is the strongest girl in our class.')]],
      r: ['The girl who never stops', "Aisulu is fifteen and she is the youngest member of a running club in Kostanay. Three years ago she couldn't run more than one kilometre. Now she runs ten kilometres every Sunday!\n\n“At first it was the hardest thing in the world,” she says. “My legs hurt and I was always the slowest in the group. But my coach said: practise a little every day.”\n\nNow Aisulu is fitter and stronger than ever. Last year she won a city race for teenagers. Her friends and family were there to cheer. “It was the best day of my life,” she says.\n\nWhat's next? “A half marathon — twenty-one kilometres. It will be longer and more difficult, but I'm ready!”",
        [K.tf('Aisulu is the oldest member of the club.', false),
         K.mc('How far does she run every Sunday now?', ['one kilometre', 'ten kilometres', 'twenty-one kilometres'], 1),
         K.mc('What did her coach tell her?', ['stop running', 'practise a little every day', 'run faster'], 1),
         K.tf('She won a race last year.', true),
         K.mc('What does she want to do next?', ['a half marathon', 'a swimming race', 'stop running'], 0)]] },

    { id: 'u7', t: 'Future me', topic: 'Plans, jobs and dreams', wu: 'What job do you want in ten years? Why?',
      sp: ['What are you going to do this summer?', 'What job will you have in 2040?', 'Will robots do our jobs? Which ones?', 'What are you going to do after school today?'],
      task: 'Write a letter to yourself in 2036: three plans (going to) and three predictions (will).',
      v: ['Jobs and the future', `
engineer | noun | a person who designs machines, roads or buildings | My cousin is an engineer at a car factory. | инженер
vet | noun | a doctor for animals | I want to be a vet because I love animals. | ветеринар
programmer | noun | a person who writes computer code | Programmers can work from home. | программист
designer | noun | a person who plans how things look | She's a fashion designer. | дизайнер
earn | verb | to get money for work | Footballers earn a lot of money. | зарабатывать
skill | noun | something you learn to do well | Speaking English is a useful skill. | навык
university | noun | a place where you study after school | My sister is at university in Almaty. | университет
dream | noun / verb | something you really want to happen | My dream is to travel around the world. | мечта, мечтать
probably | adverb | almost certainly | I'll probably study IT. | вероятно
abroad | adverb | in another country | I want to study abroad. | за границей`],
      g: ['be going to and will', "<table><tr><td><b>be going to</b></td><td>plans you have already decided: I<b>'m going to</b> visit my grandparents this summer.</td></tr><tr><td><b>will</b> (predictions)</td><td>what you think or guess about the future: I think robots <b>will</b> drive our cars.</td></tr><tr><td><b>will</b> (quick decisions)</td><td>It's cold. — I<b>'ll</b> close the window.</td></tr></table><p class=\"ex\">Negative: I<b>'m not going to</b> … · It <b>won't</b> (will not) rain.</p>",
        [K.mc('I\'ve decided! I ___ study programming at university.', ['will', "'m going to", 'am'], 1),
         K.mc('I think people ___ live on Mars one day.', ['will', 'are going', 'going to'], 0),
         K.mc('The phone is ringing. — I ___ answer it!', ["'ll", "'m going to", 'am'], 0),
         K.gap("Don't worry, it ___ (not / rain) tomorrow.", "won't", 'will not'),
         K.gap('What ___ you going to do this weekend?', 'are'),
         K.ord('She is going to be a vet.')]],
      r: ['Jobs of the future', "What jobs will you and your friends have in 2040? Some of them don't exist today!\n\nExperts say robots will probably do many boring jobs, like checking tickets or packing boxes. But people will still be important. We will need engineers to build robots, programmers to write their code and designers to make them look friendly.\n\nThere will be new jobs too. Maybe you'll be a space tour guide, a drone pilot or a doctor who works online with patients in different countries. And animals will still need vets — robots can't love a sick dog!\n\nWe asked three students about their plans. Nurlan (14) is going to study engineering. Sofia (15) is going to be a game designer. And Arman (13)? “I'm going to be a footballer. I'll earn millions — and buy my mum a house!”",
        [K.mc('What jobs will robots probably do?', ['boring jobs', 'all jobs', 'vet jobs'], 0),
         K.tf('Some jobs of 2040 don\'t exist today.', true),
         K.mc('Which job is NOT in the text?', ['drone pilot', 'space tour guide', 'chef'], 2),
         K.mc('What is Sofia going to be?', ['an engineer', 'a game designer', 'a vet'], 1),
         K.tf('Arman wants to buy a house for his dad.', false)]] },

    { id: 'u8', t: 'Adventure time', topic: 'Travel and experiences', wu: 'What is the most beautiful place you have ever seen?',
      sp: ['Have you ever been on a plane?', 'Which countries have you visited?', 'Have you ever tried something really scary?', 'Where would you like to go next? Why?'],
      task: '“Find someone who…” — ask 10 classmates Have you ever…? questions and report the results.',
      v: ['Travel and experiences', `
trip | noun | a short journey to a place and back | We went on a school trip to Burabay. | поездка
abroad | adverb | in or to another country | Have you ever been abroad? | за границу
passport | noun | a document you need to travel to other countries | Don't forget your passport! | паспорт
pack | verb | to put things in a bag for a trip | I always pack my bag the night before. | собирать вещи
luggage | noun | the bags you take on a trip | My luggage was very heavy. | багаж
explore | verb | to travel around a new place to learn about it | We explored the old town on foot. | исследовать
amazing | adjective | very surprising and very good | The view from the mountain was amazing. | потрясающий
scary | adjective | making you afraid | The roller coaster was really scary! | страшный
souvenir | noun | something you buy to remember a place | I bought a souvenir for my mum. | сувенир
experience | noun | something that happens to you | Camping was a great experience. | опыт, впечатление`],
      g: ['Present perfect: Have you ever…?', "<p>Use the <b>present perfect</b> (have / has + past participle) for experiences in your life — <i>when</i> is not important.</p><table><tr><td>+</td><td>I<b>'ve been</b> to Turkey. · She<b>'s tried</b> sushi.</td></tr><tr><td>−</td><td>I<b>'ve never flown</b> in a plane.</td></tr><tr><td>?</td><td><b>Have</b> you <b>ever seen</b> the sea? — Yes, I have. / No, I haven't.</td></tr></table><p>Past participles: go → <b>been</b>, see → <b>seen</b>, eat → <b>eaten</b>, fly → <b>flown</b>, try → <b>tried</b>, visit → <b>visited</b>.</p><p class=\"ex\">When? → past simple: I went to Turkey <b>last summer</b>.</p>",
        [K.mc('Have you ever ___ a camel?', ['ride', 'rode', 'ridden'], 2),
         K.mc('She ___ never been abroad.', ['have', 'has', 'is'], 1),
         K.gap("I've never ___ (eat) Japanese food.", 'eaten'),
         K.mc('___ you ever seen the Caspian Sea?', ['Did', 'Have', 'Are'], 1),
         K.mc('I ___ to Almaty last year.', ['went', 'have been', 'have gone'], 0),
         K.ord('Have you ever been on a plane?')]],
      r: ['Burabay: a teen travel blog', "Have you ever heard of Burabay? It's a national park in the north of Kazakhstan, and people call it “the Kazakh Switzerland”. I've just come back from a school trip there, and it was the best experience of my life!\n\nWe packed our bags and travelled there by bus. It took five hours. We stayed in small wooden houses near a lake. Every day we explored the forest and climbed the hills. The view from the top of Bolektau mountain was amazing!\n\nThe scariest moment? One night we heard a strange noise near our house. We were so scared… but it was only a big, friendly dog!\n\nI've been to Turkey and Russia, but I've never seen a place like Burabay. Have you ever been there? If not — go!\n\n— Alina, 14",
        [K.mc('Where is Burabay?', ['in the south of Kazakhstan', 'in the north of Kazakhstan', 'in Switzerland'], 1),
         K.mc('How did they travel there?', ['by plane', 'by train', 'by bus'], 2),
         K.tf('They stayed in a big hotel.', false),
         K.mc('What made the strange noise?', ['a bear', 'a dog', 'their teacher'], 1),
         K.tf('Alina has been to Turkey.', true)]] }
  ]);
})();
