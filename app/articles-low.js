/* IF Daily Articles, A1 to B1: articles 4 onwards (original IF Academy texts). The first three of each level are in articles.js.
   Add new ones at the end of each list; the order here is the order of the days. */
(function () {
  var A = window.IF_ARTICLES; if (!A) return;

  A.add('A1', [
  { id: 'a1-004', t: 'Bread', topic: 'Food and drink',
    text: `People eat bread in almost every country. It is a very old food. To make bread, you need flour, water and salt. You mix them, and then you bake the bread in a hot oven.

Bread is different in different places. In France, people buy long, thin bread. In India, people eat flat, round bread. In Kazakhstan, people love baursak. They are small, round and soft, and people eat them with tea.

Fresh bread smells very good. Many people buy bread every morning. They eat it for breakfast with butter, cheese or jam.

Bread is not expensive, and it is good with soup, salad and meat. It is a simple food, but people everywhere love it.`,
    v: `bread | noun | a food made from flour and water, baked in an oven | I eat bread for breakfast. | хлеб
flour | noun | a white powder for making bread and cakes | We need flour and water. | мука
bake | verb | to cook in an oven | My mother bakes bread on Sunday. | печь
fresh | adjective | new; made a short time ago | This bread is fresh. | свежий
soft | adjective | not hard | The bread is warm and soft. | мягкий
smell | verb | to have a smell that your nose can notice | The kitchen smells good. | пахнуть`,
    q: [
      { q: 'What do you need to make bread?', o: ['Flour, water and salt', 'Milk, eggs and tea', 'Rice and meat'], a: 0 },
      { q: 'Where do you bake bread?', o: ['In a cup', 'In a hot oven', 'In cold water'], a: 1 },
      { q: 'What are baursak?', o: ['Long, thin bread', 'A kind of soup', 'Small, round and soft bread'], a: 2 },
      { q: 'When do many people buy bread?', o: ['Every morning', 'Only on Sunday', 'At night'], a: 0 },
      { q: 'Bread is…', o: ['new and expensive', 'simple and not expensive', 'cold and hard'], a: 1 }
    ] },
  { id: 'a1-005', t: 'The honey bee', topic: 'Animals',
    text: `A honey bee is a small insect. It is yellow and black, and it can fly. Bees live in big groups. One group has thousands of bees. Their home is a hive.

Bees work a lot. They fly from flower to flower. They take food from the flowers and carry it home. In the hive, they make honey from it. Honey is sweet, and people like it in tea or on bread.

Bees are important for us. When bees visit flowers, they help plants to make fruit. Apples, cherries and many vegetables need bees.

Are you afraid of bees? Do not run and do not shout. Stand still. The bee is not interested in you. It only wants flowers.`,
    v: `insect | noun | a very small animal with six legs | A bee is an insect. | насекомое
fly | verb | to move in the air | Birds and bees can fly. | летать
honey | noun | sweet food that bees make | I like tea with honey. | мёд
sweet | adjective | with a taste like sugar | Honey is very sweet. | сладкий
flower | noun | the pretty, coloured part of a plant | There are red flowers in the garden. | цветок
afraid | adjective | feeling fear | I am afraid of big dogs. | боящийся (бояться)`,
    q: [
      { q: 'What colour is a honey bee?', o: ['Yellow and black', 'Red and white', 'Green'], a: 0 },
      { q: 'Where do bees live?', o: ['In a tree house', 'In a hive', 'In the sea'], a: 1 },
      { q: 'What do bees make?', o: ['Milk', 'Bread', 'Honey'], a: 2 },
      { q: 'Why are bees important?', o: ['They help plants to make fruit', 'They eat apples', 'They sleep in flowers'], a: 0 },
      { q: 'A bee is near you. What do you do?', o: ['Run fast', 'Stand still', 'Shout'], a: 1 }
    ] },
  { id: 'a1-006', t: 'Why is the sea salty?', topic: 'Nature',
    text: `River water is fresh, but sea water is salty. You cannot drink it. Why is that?

Rain falls on the land. The water runs over stones and into rivers. Stones have a little salt in them. The water takes this salt and carries it to the sea. It is only a little salt, so river water does not taste salty.

Rivers run to the sea every day, all year. The sea is their last stop. Then the sun makes the sea warm. Some water goes up into the sky and makes clouds. But the salt cannot go up. It stays in the sea.

This happens again and again for a very long time. So today the sea has a lot of salt.`,
    v: `sea | noun | a very big area of salt water | We swim in the sea in summer. | море
river | noun | a long line of water that runs across the land | The river is near my town. | река
salty | adjective | with salt in it | Sea water is salty. | солёный
rain | noun | water that falls from the sky | I don't like rain. | дождь
carry | verb | to take something from one place to another | Rivers carry water to the sea. | нести, переносить
stay | verb | to not go away | The salt stays in the sea. | оставаться`,
    q: [
      { q: 'Can you drink sea water?', o: ['No, you cannot', 'Yes, every day', 'Only in winter'], a: 0 },
      { q: 'Where does the salt come from?', o: ['From fish', 'From stones on the land', 'From the sun'], a: 1 },
      { q: 'What carries the salt to the sea?', o: ['Clouds', 'Birds', 'Rivers'], a: 2 },
      { q: 'What goes up into the sky?', o: ['Water', 'Salt', 'Stones'], a: 0 },
      { q: 'Why does the sea have a lot of salt?', o: ['People put it there', 'The salt stays and more comes', 'The sea is very cold'], a: 1 }
    ] },
  { id: 'a1-007', t: 'A day at the market', topic: 'Shopping',
    text: `Every town has a market. A market is a busy place. People come in the morning, because the food is fresh then.

At the market you can buy fruit, vegetables, meat, cheese and bread. In summer there are tomatoes, cucumbers and watermelons. In autumn there are apples and pumpkins. The sellers stand behind their tables. They say, "Try this! It is very sweet!"

At a market you can ask about the price. "How much are the apples?" you ask. Sometimes the seller gives you a better price. Sometimes you get one more apple for free.

A market is not only for shopping. People meet their neighbours there and talk. It is noisy and full of colour, and it is a good place to practise a new language.`,
    v: `market | noun | a place where people buy and sell food and other things | We buy vegetables at the market. | рынок
busy | adjective | with a lot of people and things to do | The market is busy on Saturday. | оживлённый
seller | noun | a person who sells things | The seller is very friendly. | продавец
price | noun | the money you pay for something | What is the price of this cheese? | цена
free | adjective | you do not pay for it | The water is free. | бесплатный
neighbour | noun | a person who lives near you | My neighbour has a cat. | сосед`,
    q: [
      { q: 'When do people come to the market?', o: ['In the morning', 'At night', 'Only in winter'], a: 0 },
      { q: 'What can you buy in autumn?', o: ['Watermelons', 'Apples and pumpkins', 'Only bread'], a: 1 },
      { q: 'What do you ask about?', o: ['The weather', 'The seller\'s name', 'The price'], a: 2 },
      { q: 'What do you sometimes get for free?', o: ['One more apple', 'A table', 'A bag of meat'], a: 0 },
      { q: 'What do people also do at the market?', o: ['Sleep', 'Meet neighbours and talk', 'Read books'], a: 1 }
    ] }
  ]);

  A.add('A2', [
  { id: 'a2-004', t: 'How do birds find their way?', topic: 'Animals',
    text: `Every autumn, millions of birds leave the cold north and fly south. In spring they come back. Some of them travel thousands of kilometres, and many return to exactly the same place where they were born. How do they do it without a map or a phone?

Scientists have studied this question for a long time, and they have found several answers. During the day, birds use the sun to decide which way to go. At night, many of them use the stars. Birds also remember what they see below them, such as rivers, mountains and the coast.

There is another, more surprising answer. Birds can feel the Earth's magnetic field. This works like a compass inside the bird's body, and it helps even when the sky is cloudy.

Young birds are not born with all this knowledge. On their first journey, some of them follow older birds and learn the way. Others travel alone and still arrive. Scientists do not understand everything yet, so the journey of birds is still a little mysterious.`,
    v: `travel | verb | to go from one place to another, often far | Some birds travel thousands of kilometres. | путешествовать
return | verb | to come back | They return in spring. | возвращаться
scientist | noun | a person who studies nature and the world | Scientists study how birds fly. | учёный
compass | noun | a thing that shows north, south, east and west | A compass helps you find the way. | компас
journey | noun | a long trip from one place to another | The journey takes two weeks. | путешествие, путь
follow | verb | to go behind somebody | Young birds follow older birds. | следовать за`,
    q: [
      { q: 'When do the birds fly south?', o: ['In autumn', 'In spring', 'In summer'], a: 0 },
      { q: 'What do birds use at night?', o: ['The sun', 'The stars', 'Street lights'], a: 1 },
      { q: 'What works like a compass for birds?', o: ['Their wings', 'The wind', 'The Earth\'s magnetic field'], a: 2 },
      { q: 'How do some young birds learn the way?', o: ['They follow older birds', 'They read maps', 'They ask people'], a: 0 },
      { q: 'What does the text say at the end?', o: ['Birds never get lost', 'Scientists do not understand everything yet', 'Birds stay in the north'], a: 1 }
    ] },
  { id: 'a2-005', t: 'Left-handed people', topic: 'People',
    text: `Look around your classroom or office. Most people are writing with their right hand. But about one person in ten uses the left hand. Why are some people left-handed? Nobody knows exactly, although it is more common in some families than in others.

Life is sometimes a little harder for left-handed people, because most things are made for the right hand. Scissors, for example, are difficult to use. When left-handed people write with a pen, their hand moves over the wet ink and makes it dirty. Even computer mice and guitars are usually made for right-handed people.

In the past, things were worse. Many teachers and parents thought that the left hand was wrong, and they made children write with the right hand. Today we know that this was a mistake.

There is some good news too. In sports such as tennis and boxing, left-handed players can have an advantage. Other players are not used to them, so their moves are harder to guess.

So if you are left-handed, you are different, and that can be a good thing.`,
    v: `left-handed | adjective | using the left hand for writing and other things | My brother is left-handed. | левша (леворукий)
common | adjective | happening often or found in many places | This name is very common. | распространённый
scissors | noun | a tool with two blades for cutting paper | Can I use your scissors? | ножницы
mistake | noun | something that is not correct | It was a big mistake. | ошибка
advantage | noun | something that helps you to be better than others | Being tall is an advantage in basketball. | преимущество
guess | verb | to give an answer when you are not sure | Can you guess my age? | угадывать`,
    q: [
      { q: 'How many people are left-handed?', o: ['About one in ten', 'About half', 'Almost nobody'], a: 0 },
      { q: 'Why is life sometimes harder for them?', o: ['They are slower', 'Most things are made for the right hand', 'They cannot read well'], a: 1 },
      { q: 'What did many teachers do in the past?', o: ['They gave them special pens', 'They sent them home', 'They made them write with the right hand'], a: 2 },
      { q: 'In which sports can it be an advantage?', o: ['Tennis and boxing', 'Running and swimming', 'Chess'], a: 0 },
      { q: 'Why is it an advantage?', o: ['Left-handed people are stronger', 'Other players are not used to them', 'The rules are different'], a: 1 }
    ] },
  { id: 'a2-006', t: 'The sandwich', topic: 'Food and drink',
    text: `What did you have for lunch yesterday? For millions of people, the answer is a sandwich. It is quick, cheap and easy to carry. But where does the name come from?

Sandwich is a small town in the south of England. In the 1700s there was a rich man with the title "Earl of Sandwich". People say that he loved playing cards and did not want to stop for dinner. He asked for some meat between two pieces of bread, so he could eat with one hand and play with the other. His friends liked the idea and asked for "the same as Sandwich". We cannot be sure that the story is true, but the name stayed.

Of course, people put food inside bread long before that. But after the Earl, this kind of meal had a name, and it became popular everywhere.

Today there are thousands of kinds. Some are small and simple, with only cheese or egg. Others are enormous, with meat, salad, tomatoes and sauce. In many cities you can buy one on almost every street. It is a perfect meal for a busy day.`,
    v: `quick | adjective | fast; taking little time | A sandwich is a quick lunch. | быстрый
title | noun | a word that shows a person's position, like "Doctor" or "Earl" | "Earl" is an old English title. | титул
piece | noun | one part of something | Two pieces of bread, please. | кусок
popular | adjective | liked by many people | Pizza is popular everywhere. | популярный
enormous | adjective | very, very big | That is an enormous sandwich! | огромный
meal | noun | food that you eat at one time, like lunch or dinner | Dinner is my favourite meal. | приём пищи, еда`,
    q: [
      { q: 'What is Sandwich?', o: ['A town in England', 'A kind of meat', 'A card game'], a: 0 },
      { q: 'Why did the Earl want this food, in the story?', o: ['He was poor', 'He wanted to eat and play cards', 'He did not like meat'], a: 1 },
      { q: 'Is the story certainly true?', o: ['Yes, it is certain', 'No, it is certainly false', 'We cannot be sure'], a: 2 },
      { q: 'Did people put food in bread before the Earl?', o: ['Yes, long before', 'No, never', 'Only in France'], a: 0 },
      { q: 'Where can you buy a sandwich in many cities?', o: ['Only in Sandwich', 'On almost every street', 'Only at the market'], a: 1 }
    ] },
  { id: 'a2-007', t: 'Why do leaves change colour?', topic: 'Nature',
    text: `In summer the trees in the park are green. In autumn they turn yellow, orange and red. Then the leaves fall. It is beautiful, but why does it happen?

Leaves are like small kitchens. They use sunlight, water and air to make food for the tree. To do this, they need a green material called chlorophyll. In spring and summer there is a lot of it, so the leaves look green.

In autumn the days get shorter and colder. There is less light, and the tree gets ready for winter. It stops making food in its leaves, and the green material slowly disappears. Now we can see other colours. The yellow and orange were in the leaves all summer, but the green was stronger and covered them. Some trees also make a new red colour in autumn.

Finally the leaves fall. This helps the tree, because it needs less water in winter, when the ground is frozen.

In spring, when the days are longer and warmer again, new green leaves grow, and the little kitchens open again.`,
    v: `leaf | noun | one of the flat green parts of a tree (plural: leaves) | The leaves are yellow in autumn. | лист
turn | verb | to change and become a different colour | The leaves turn red. | становиться
sunlight | noun | light from the sun | Plants need sunlight. | солнечный свет
disappear | verb | to go away so that you cannot see it | The snow disappears in spring. | исчезать
cover | verb | to be over something so that you cannot see it | Snow covers the ground. | покрывать
grow | verb | to get bigger; to start to live (for plants) | New leaves grow in spring. | расти`,
    q: [
      { q: 'What do leaves make for the tree?', o: ['Food', 'Water', 'Wood'], a: 0 },
      { q: 'What makes the leaves green?', o: ['Rain', 'A material called chlorophyll', 'Cold air'], a: 1 },
      { q: 'Where were the yellow and orange in summer?', o: ['In the ground', 'In the sky', 'In the leaves, under the green'], a: 2 },
      { q: 'Why is it good for the tree to lose its leaves?', o: ['It needs less water in winter', 'It gets more light', 'It grows faster'], a: 0 },
      { q: 'When do new leaves grow?', o: ['In autumn', 'In spring', 'In winter'], a: 1 }
    ] }
  ]);

  A.add('B1', [
  { id: 'b1-004', t: 'Why we love music', topic: 'Culture',
    text: `Every human society that we know about has music. People sing to babies, at weddings and at funerals. We listen on the bus, in the gym and while we cook. Unlike food or sleep, we do not need music to stay alive. So why does it matter so much to us?

One reason is that music affects our feelings directly. A fast song with a strong beat can give us energy, while a slow one can calm us down. Film directors know this well. If you watch a frightening scene with the sound off, it is far less frightening.

Music is also closely connected to memory. You have probably had this experience: you hear a song from your school days, and suddenly you remember a particular summer, a particular friend, even a smell. Songs seem to keep moments safe for us.

Finally, music brings people together. When a crowd sings at a concert or a football match, strangers feel like one group for a few minutes. Many scientists believe that this was important for early humans, who had to work together to survive.

Whatever the full explanation is, the result is clear. A day with music in it usually feels a little better than a day without.`,
    v: `society | noun | a large group of people who live together with shared rules and customs | Music exists in every society. | общество
affect | verb | to cause a change in something | Music affects our mood. | влиять
calm down | phrasal verb | to become, or make somebody, less excited or angry | Slow music helps me calm down. | успокаивать(ся)
particular | adjective | one specific, not any | I remember that particular summer. | конкретный, определённый
crowd | noun | a large number of people together | The crowd sang loudly. | толпа
survive | verb | to stay alive in a difficult situation | Early humans worked together to survive. | выживать`,
    q: [
      { q: 'How is music different from food or sleep?', o: ['We do not need it to stay alive', 'It is more expensive', 'Only young people like it'], a: 0 },
      { q: 'What happens when you watch a frightening scene with no sound?', o: ['It is more frightening', 'It is far less frightening', 'Nothing changes'], a: 1 },
      { q: 'What can an old song bring back?', o: ['Only the words', 'Nothing at all', 'A particular time, person or smell'], a: 2 },
      { q: 'What happens when a crowd sings together?', o: ['Strangers feel like one group', 'People stop listening', 'The match ends'], a: 0 },
      { q: 'Why may music have been important for early humans?', o: ['It kept animals away', 'It helped them to work together', 'It helped them to sleep'], a: 1 }
    ] },
  { id: 'b1-005', t: 'How glass is made', topic: 'Science',
    text: `You are probably looking at glass right now. It covers your phone and fills your windows, and you may have a glass of water beside you. It is so common that we hardly notice it. Yet glass is a strange and wonderful material, and it begins as something very ordinary: sand.

To make glass, sand is mixed with a few other materials and heated to an extremely high temperature, until it melts into a thick, glowing liquid. When this liquid cools, it becomes hard, but it stays clear. That is the unusual part. Most solid things block light. Glass lets it pass.

People have made glass for thousands of years. For a long time it was a luxury. Only the rich could afford glass cups, and ordinary homes had no glass in their windows. Later, craftsmen learned to blow air into the hot liquid through a long tube to make bottles and bowls. Much later, factories learned to produce large, flat sheets cheaply.

That changed daily life more than we realise. Glass windows made homes brighter and warmer. Glasses helped people with weak eyes to read and work for many more years. Microscopes and telescopes, which depend on glass, opened up worlds that nobody had seen before.

It is not bad for a handful of sand.`,
    v: `material | noun | a substance that things are made from | Glass is a useful material. | материал
melt | verb | to change from solid to liquid because of heat | Ice melts in the sun. | плавиться, таять
liquid | noun | something that flows, like water or oil | The hot liquid cools slowly. | жидкость
luxury | noun | something expensive that you do not really need | For a long time glass was a luxury. | роскошь
afford | verb | to have enough money to pay for something | Only the rich could afford it. | позволить себе
depend on | phrasal verb | to need something in order to work | Telescopes depend on glass. | зависеть от`,
    q: [
      { q: 'What is the main material in glass?', o: ['Sand', 'Water', 'Ice'], a: 0 },
      { q: 'What is unusual about glass?', o: ['It is very soft', 'It is hard but lets light pass', 'It never breaks'], a: 1 },
      { q: 'Who had glass cups for a long time?', o: ['Everybody', 'Only children', 'Only the rich'], a: 2 },
      { q: 'How did craftsmen make bottles?', o: ['They blew air into the hot liquid', 'They cut them from stone', 'They froze the sand'], a: 0 },
      { q: 'Which of these depends on glass?', o: ['A wooden chair', 'A microscope', 'A paper book'], a: 1 }
    ] },
  { id: 'b1-006', t: 'Small habits, big results', topic: 'Self-improvement',
    text: `Every January, millions of people make big promises to themselves. They are going to get fit, read fifty books or learn a language. By February, most of these plans have been forgotten. The problem is not that people are lazy. The problem is usually the size of the plan.

A big goal needs a lot of energy every day, and energy goes up and down. On a good day, an hour at the gym feels possible. After a long day at work, it feels impossible, so we skip it. Then we feel bad, and it becomes easier to skip the next day as well.

A small habit works differently. Imagine that you decide to learn five new English words while you drink your morning tea. It takes three minutes. You can do it when you are tired, busy or in a bad mood. Because it is so easy, you do not need to argue with yourself.

Small habits also grow. Five words a day is more than 1,800 words in a year. And once the habit is part of your morning, you will often do a little more without planning to.

There is a useful trick as well. Connect the new habit to something you already do every day: after I brush my teeth, I will do ten squats. The old habit reminds you of the new one.

So if you want to change something, start smaller than seems sensible. You can always add more later.`,
    v: `habit | noun | something you do regularly, often without thinking | Reading before bed is a good habit. | привычка
goal | noun | something you want to achieve | My goal is to speak English well. | цель
skip | verb | to not do something that you usually do | I skipped the gym yesterday. | пропускать
mood | noun | the way you feel at a particular time | She is in a good mood today. | настроение
trick | noun | a clever way of doing something | Here is a useful trick. | приём, хитрость
sensible | adjective | reasonable and practical | That is a sensible plan. | разумный`,
    q: [
      { q: 'What is usually the problem with January plans?', o: ['They are too big', 'People are lazy', 'January is too cold'], a: 0 },
      { q: 'Why do we skip the gym after a long day?', o: ['It is closed', 'We have little energy', 'It is too cheap'], a: 1 },
      { q: 'Why does a three-minute habit work?', o: ['It is expensive', 'It needs a teacher', 'You can do it even when tired or busy'], a: 2 },
      { q: 'How many words is five a day in a year?', o: ['More than 1,800', 'About 500', 'Exactly 365'], a: 0 },
      { q: 'What is the trick in the text?', o: ['Do the habit only at weekends', 'Connect the new habit to an old one', 'Tell nobody about it'], a: 1 }
    ] },
  { id: 'b1-007', t: 'Can adults still learn a language?', topic: 'Learning',
    text: `Many adults believe that they are too old to learn a language. "Children learn so easily," they say. "My brain is not the same any more." It is true that children have some advantages, but the full picture is more encouraging than most people think.

Young children are very good at copying sounds, so they often end up with a better accent. They also have plenty of time, and they are not afraid of making mistakes. A five-year-old will happily say something wrong twenty times a day.

Adults, however, have advantages of their own. They already know how one language works, so they can understand an explanation of grammar in minutes. They can read, take notes and choose what to study. They also know why they are learning, and a clear reason is a powerful engine.

In fact, in the first months, adults usually make faster progress than children. Where adults often fail is not ability but behaviour. They are embarrassed to speak, they wait until they feel ready, and they study only when they have a free evening, which is not very often.

The solution is to borrow two habits from children: practise a little every day, and do not worry about mistakes. Ten minutes of speaking each day will do more than two hours once a week.

So the honest answer is yes. It will take patience, and your accent may never be perfect. But adults who keep going do succeed, and they do it at every age.`,
    v: `encouraging | adjective | giving you hope or confidence | The news is encouraging. | обнадёживающий
accent | noun | the way a person pronounces a language | She speaks with a French accent. | акцент
progress | noun | the process of getting better at something | You are making good progress. | прогресс
embarrassed | adjective | feeling shy or ashamed in front of others | I was embarrassed to speak. | смущённый
borrow | verb | to take and use something that belongs to somebody else | Let's borrow an idea from children. | заимствовать, брать на время
patience | noun | the ability to wait or continue calmly for a long time | Learning a language takes patience. | терпение`,
    q: [
      { q: 'What are young children very good at?', o: ['Copying sounds', 'Understanding grammar rules', 'Taking notes'], a: 0 },
      { q: 'Which is an advantage of adults?', o: ['They are never embarrassed', 'They can understand a grammar explanation quickly', 'They have more free time'], a: 1 },
      { q: 'Who usually makes faster progress in the first months?', o: ['Children', 'Nobody', 'Adults'], a: 2 },
      { q: 'Where do adults often fail?', o: ['In their behaviour, not their ability', 'In reading', 'In remembering their reason'], a: 0 },
      { q: 'What does the writer recommend?', o: ['Two hours once a week', 'A little practice every day', 'Waiting until you feel ready'], a: 1 }
    ] }
  ]);

  /* ----- batch 2: articles 8 to 11 ----- */
  A.add('A1', [
  { id: 'a1-008', t: 'The moon', topic: 'Space',
    text: `Look at the sky at night. You can often see the moon. It is big and white, and it is very beautiful.

The moon is not a star. It is a big ball of rock. It does not make light. The light comes from the sun, and the moon gives it back to us, like a mirror.

The moon goes around the Earth. It takes about one month. Every night the moon looks a little different. Sometimes it is round, and we call it a full moon. Sometimes it is thin, like a banana. Sometimes we cannot see it.

There is no air and no water on the moon. Nobody lives there. But some people went to the moon many years ago. They walked on it and came home.`,
    v: `moon | noun | the big white object in the sky at night | The moon is round tonight. | луна
sky | noun | the space above us where we see the sun and clouds | The sky is dark at night. | небо
star | noun | a small point of light in the night sky | I can see many stars. | звезда
rock | noun | very hard material; stone | The moon is a ball of rock. | камень, горная порода
round | adjective | with the shape of a ball or circle | A ball is round. | круглый
air | noun | what we breathe | There is no air on the moon. | воздух`,
    q: [
      { q: 'What is the moon?', o: ['A big ball of rock', 'A star', 'A cloud'], a: 0 },
      { q: 'Where does the moon\'s light come from?', o: ['From the Earth', 'From the sun', 'From the stars'], a: 1 },
      { q: 'How long does the moon take to go around the Earth?', o: ['One day', 'One year', 'About one month'], a: 2 },
      { q: 'What is a full moon?', o: ['A round moon', 'A thin moon', 'No moon'], a: 0 },
      { q: 'Is there air on the moon?', o: ['Yes, a lot', 'No, there is not', 'Only in summer'], a: 1 }
    ] },
  { id: 'a1-009', t: 'Rice', topic: 'Food and drink',
    text: `Rice is a very important food. More than half of the people in the world eat rice every day. It is small and white, but some rice is brown or black.

Rice is a plant. It grows in warm countries, and it needs a lot of water. Farmers often grow rice in fields with water in them. China and India grow a lot of rice. Kazakhstan grows rice too, in the south.

It is easy to cook rice. You put rice and water in a pot. You cook it for about twenty minutes. Then it is soft and ready.

People eat rice in many ways. In Kazakhstan, people make plov with rice, meat and carrots. In Japan, people eat rice with fish. Rice is good with almost everything.`,
    v: `rice | noun | small white or brown grains that people cook and eat | We have rice for dinner. | рис
plant | noun | a living thing that grows in the ground | Rice is a plant. | растение
farmer | noun | a person who grows food or keeps animals | The farmer works in the field. | фермер
field | noun | an area of land where food grows | There is water in the rice field. | поле
pot | noun | a deep, round thing for cooking | Put the rice in a pot. | кастрюля
ready | adjective | finished and good to eat or use | Dinner is ready! | готовый`,
    q: [
      { q: 'How many people eat rice every day?', o: ['More than half of the world', 'Only people in China', 'Very few'], a: 0 },
      { q: 'What does rice need?', o: ['Cold weather', 'A lot of water', 'Snow'], a: 1 },
      { q: 'How long do you cook rice?', o: ['Two minutes', 'Two hours', 'About twenty minutes'], a: 2 },
      { q: 'What is in plov?', o: ['Rice, meat and carrots', 'Rice and fish', 'Bread and cheese'], a: 0 },
      { q: 'Where does Kazakhstan grow rice?', o: ['In the north', 'In the south', 'It does not grow rice'], a: 1 }
    ] },
  { id: 'a1-010', t: 'Dogs and people', topic: 'Animals',
    text: `Dogs and people are old friends. Dogs live with people in almost every country. Some dogs are very small, and some are very big. Some have long hair, and some have short hair.

Why do people love dogs? A dog is always happy to see you. When you come home, your dog runs to the door. It does not ask about your day. It is just happy.

Dogs also help people. Some dogs help farmers with sheep. Some dogs help the police. Some dogs help people who cannot see. These dogs go to a special school and learn their job.

A dog needs a lot from you. It needs food, water and a walk every day, in summer and in winter. A dog is not a toy. It is a friend for many years.`,
    v: `friend | noun | a person or animal that you like and know well | My dog is my best friend. | друг
happy | adjective | feeling good and pleased | The dog is happy to see me. | счастливый, радостный
help | verb | to do something for another person | Dogs help people. | помогать
sheep | noun | a farm animal with thick white hair (plural: sheep) | The farmer has fifty sheep. | овца
job | noun | the work that somebody does | The dog learns its job. | работа
toy | noun | a thing that children play with | A dog is not a toy. | игрушка`,
    q: [
      { q: 'Where do dogs live with people?', o: ['In almost every country', 'Only in cold countries', 'Only on farms'], a: 0 },
      { q: 'What does your dog do when you come home?', o: ['It sleeps', 'It runs to the door', 'It asks about your day'], a: 1 },
      { q: 'Who do some dogs help?', o: ['Cats', 'Birds', 'People who cannot see'], a: 2 },
      { q: 'What does a dog need every day?', o: ['Food, water and a walk', 'A new toy', 'A bath'], a: 0 },
      { q: 'A dog is…', o: ['a toy for a week', 'a friend for many years', 'a wild animal'], a: 1 }
    ] },
  { id: 'a1-011', t: 'The rainbow', topic: 'Nature',
    text: `Sometimes it rains, and the sun shines too. Then look at the sky. You can see a rainbow!

A rainbow has seven colours. They are red, orange, yellow, green, blue, indigo and violet. Red is at the top, and violet is at the bottom. The colours are always in the same order.

Where does a rainbow come from? Sunlight looks white, but it has many colours in it. When the light goes through drops of rain, the colours come out. Each drop is like a very small glass.

To see a rainbow, stand with the sun behind you and the rain in front of you. A rainbow does not stay for a long time. When the rain stops, it goes away.

You cannot touch a rainbow, and you cannot walk to it. But you can take a photo!`,
    v: `rainbow | noun | a half circle of colours in the sky after rain | Look, a rainbow! | радуга
shine | verb | to give light | The sun shines in the morning. | светить
colour | noun | red, blue, green and so on | My favourite colour is green. | цвет
drop | noun | a very small amount of water | A drop of rain is on the window. | капля
behind | preposition | at the back of | The sun is behind you. | позади, за
touch | verb | to put your hand on something | You cannot touch a rainbow. | трогать`,
    q: [
      { q: 'When can you see a rainbow?', o: ['When it rains and the sun shines', 'At night', 'When it snows'], a: 0 },
      { q: 'How many colours does a rainbow have?', o: ['Five', 'Seven', 'Ten'], a: 1 },
      { q: 'Which colour is at the top?', o: ['Violet', 'Green', 'Red'], a: 2 },
      { q: 'Where is the sun when you see a rainbow?', o: ['Behind you', 'In front of you', 'Under you'], a: 0 },
      { q: 'Can you touch a rainbow?', o: ['Yes, if you run', 'No, you cannot', 'Only in summer'], a: 1 }
    ] }
  ]);

  A.add('A2', [
  { id: 'a2-008', t: 'The story of chocolate', topic: 'Food and drink',
    text: `Almost everybody likes chocolate, but not many people know where it comes from. It starts on a tree. The cacao tree grows in hot, wet countries near the equator. Its large fruits have seeds inside, and chocolate is made from these seeds.

People in Central America discovered cacao a very long time ago. They did not eat it. They made a drink from the seeds, mixed with water and spices. It was not sweet at all. In fact, it was bitter, and people believed that it gave them energy.

In the 1500s, travellers brought cacao to Europe. Europeans added sugar, and the drink became very popular with rich people. It was expensive, so ordinary families could not buy it.

Chocolate bars are much newer. In the 1800s, factories learned how to make hard chocolate that people could eat. Later somebody added milk, and milk chocolate was born.

Today chocolate is cheap and you can buy it everywhere. But the work is still hard. Farmers pick the fruits by hand, and they dry the seeds in the sun before they are sent to factories around the world.`,
    v: `seed | noun | the small hard part of a plant from which a new plant grows | Chocolate is made from cacao seeds. | семя
discover | verb | to find something for the first time | They discovered cacao long ago. | открывать, обнаруживать
bitter | adjective | with a strong taste that is not sweet, like black coffee | The drink was bitter. | горький
add | verb | to put something with something else | Europeans added sugar. | добавлять
ordinary | adjective | normal, not special or rich | Ordinary families could not buy it. | обычный
pick | verb | to take fruit or flowers from a plant | Farmers pick the fruits by hand. | собирать`,
    q: [
      { q: 'Where does the cacao tree grow?', o: ['In hot, wet countries', 'In cold mountains', 'In deserts'], a: 0 },
      { q: 'How did people in Central America use cacao?', o: ['They ate chocolate bars', 'They made a bitter drink', 'They fed it to animals'], a: 1 },
      { q: 'What did Europeans add?', o: ['Salt', 'Water', 'Sugar'], a: 2 },
      { q: 'When did factories start to make hard chocolate?', o: ['In the 1800s', 'In the 1500s', 'Last year'], a: 0 },
      { q: 'How do farmers pick the fruits?', o: ['With machines', 'By hand', 'They do not pick them'], a: 1 }
    ] },
  { id: 'a2-009', t: 'How much do animals sleep?', topic: 'Animals',
    text: `People need about eight hours of sleep every night. But what about animals? The answer is different for every animal, and some of the numbers are surprising.

Some animals are real sleepers. Koalas sleep for most of the day, sometimes for about twenty hours. They eat leaves that do not give them much energy, so they rest a lot. Bats and cats also love sleeping. A house cat can sleep for fourteen hours or more.

Other animals sleep very little. Giraffes and horses often sleep for only a few hours, and they do it in short pieces. In nature these animals must always be ready to run from danger, so a long, deep sleep is not safe for them. Horses can even sleep while they are standing.

Dolphins have the cleverest idea. They live in water but need to breathe air. When a dolphin sleeps, only half of its brain rests. The other half stays awake, so the dolphin can go up for air and watch for danger.

Why is sleep so different? It depends on what an animal eats, where it lives and who wants to eat it. For animals, sleep is not only rest. It is also a risk.`,
    v: `surprising | adjective | not what you expected | The answer is surprising. | удивительный
rest | verb | to relax and not work | Koalas rest a lot. | отдыхать
danger | noun | something that can hurt you | They run from danger. | опасность
safe | adjective | not in danger | A deep sleep is not safe for them. | безопасный
breathe | verb | to take air in and out of your body | Dolphins need to breathe air. | дышать
awake | adjective | not sleeping | Half of the brain stays awake. | бодрствующий`,
    q: [
      { q: 'How long can koalas sleep?', o: ['About twenty hours', 'About two hours', 'Eight hours exactly'], a: 0 },
      { q: 'Why do koalas rest so much?', o: ['They are ill', 'Their food gives little energy', 'They are afraid'], a: 1 },
      { q: 'Why do giraffes sleep very little?', o: ['They are not tired', 'They eat at night', 'They must be ready to run from danger'], a: 2 },
      { q: 'What is special about dolphins?', o: ['Only half of the brain sleeps', 'They never sleep', 'They sleep on the beach'], a: 0 },
      { q: 'What does sleep depend on?', o: ['The colour of the animal', 'Food, home and enemies', 'The weather only'], a: 1 }
    ] },
  { id: 'a2-010', t: 'Paper', topic: 'Everyday things',
    text: `You probably used paper today. Maybe you read a book, wrote a note or paid with a banknote. Paper is so common that we do not think about it. But for most of history, people did not have it.

Before paper, people wrote on many different things. They used stones, wood, soft clay and animal skins. These materials were heavy, expensive or difficult to prepare. A single book could cost as much as a house.

Paper was invented in China about two thousand years ago. People made it from old cloth and parts of plants. They mixed these with water, pressed the mixture flat and dried it in the sun. The result was light, cheap and easy to write on.

For a long time, only China knew how to make it. Slowly, the knowledge travelled west along trade roads, first to Central Asia and the Middle East and, centuries later, to Europe.

Paper changed the world. Books became cheaper, so more people could learn to read. Later, newspapers, letters and school notebooks all became possible.

Today we read a lot on screens, and some people thought paper would disappear. It has not. We still use it for books, boxes, cups and, of course, for exams.`,
    v: `note | noun | a short written message | I wrote a note for my mother. | записка
skin | noun | the outside part of an animal's or person's body | People wrote on animal skins. | кожа, шкура
invent | verb | to make something for the first time | Paper was invented in China. | изобретать
cloth | noun | material for making clothes | They used old cloth. | ткань
knowledge | noun | what people know | The knowledge travelled west. | знание
screen | noun | the flat front part of a phone or computer | We read on screens. | экран`,
    q: [
      { q: 'What did people write on before paper?', o: ['Stones, wood, clay and skins', 'Plastic', 'Glass'], a: 0 },
      { q: 'Where was paper invented?', o: ['In Europe', 'In China', 'In Egypt'], a: 1 },
      { q: 'What was paper made from?', o: ['Stone and sand', 'Animal skins', 'Old cloth and parts of plants'], a: 2 },
      { q: 'How did paper change the world?', o: ['Books became cheaper', 'People stopped writing', 'Houses became cheaper'], a: 0 },
      { q: 'Has paper disappeared?', o: ['Yes, completely', 'No, we still use it a lot', 'Only in schools'], a: 1 }
    ] },
  { id: 'a2-011', t: 'Your fingerprints', topic: 'The body',
    text: `Look closely at the ends of your fingers. You will see very small lines that make circles and curves. These are your fingerprints, and they are yours alone. Nobody else in the world has exactly the same ones. Even twins, who look the same, have different fingerprints.

Your fingerprints were formed before you were born, and they stay the same for your whole life. Your fingers get bigger as you grow, but the pattern does not change. If you cut your finger, the same pattern usually comes back when the skin gets better.

What are they for? Scientists think that the lines help us to feel small things better and to hold things that are wet.

Because every fingerprint is different, they are very useful. For more than a hundred years, the police have used them to find criminals. When a person touches a glass or a door, they leave a mark that we cannot easily see. The police can find this mark and compare it with others.

Today many of us use our fingerprints every day. We touch a phone, and it opens in less than a second. Your finger has become your key, and it is one key that you cannot leave at home.`,
    v: `fingerprint | noun | the pattern of lines on the end of your finger | Every fingerprint is different. | отпечаток пальца
twin | noun | one of two children born at the same time to the same mother | My sister and I are twins. | близнец
pattern | noun | lines, shapes or colours that repeat | The pattern does not change. | узор, рисунок
hold | verb | to have something in your hand | The lines help us to hold wet things. | держать
criminal | noun | a person who does something against the law | The police found the criminal. | преступник
compare | verb | to look at two things to see how they are different | They compare the marks. | сравнивать`,
    q: [
      { q: 'Do twins have the same fingerprints?', o: ['No, they are different', 'Yes, always', 'Only when they are babies'], a: 0 },
      { q: 'When are fingerprints formed?', o: ['At school age', 'Before you are born', 'When you are an adult'], a: 1 },
      { q: 'What happens to the pattern when you grow?', o: ['It disappears', 'It becomes a new pattern', 'It does not change'], a: 2 },
      { q: 'How do the police use fingerprints?', o: ['To find criminals', 'To open doors', 'To take photos'], a: 0 },
      { q: 'How do many people use fingerprints today?', o: ['To pay taxes', 'To open their phone', 'To write letters'], a: 1 }
    ] }
  ]);

  A.add('B1', [
  { id: 'b1-008', t: 'Why we put things off', topic: 'Psychology',
    text: `You have an important task to finish. You sit down, open your laptop and decide to check your messages first. An hour later, you have cleaned your desk, watched three videos and made tea, but the task is still waiting. This habit has a name: procrastination. Almost everyone does it, and almost everyone feels bad about it.

It is easy to think that people who procrastinate are lazy, but that is not quite right. Lazy people do not care. Procrastinators care a lot, which is exactly why they feel guilty. Researchers who study this behaviour say it is less about time and more about feelings. When a task makes us anxious, bored or unsure of ourselves, we escape to something that feels better right now.

The trouble is that the relief does not last. The task has not gone anywhere, the deadline is closer, and we now feel worse than before. So we escape again.

How can we break the circle? One useful idea is to make the first step extremely small. Do not promise to write the report. Promise to write one sentence. Starting is the hardest part, and once we have begun, continuing is much easier.

It also helps to remove temptations. Put your phone in another room. Close the extra windows on your screen.

Finally, be kind to yourself. People who forgive themselves for yesterday's delay are more likely to start today than those who keep punishing themselves. Feeling terrible is not a plan.`,
    v: `task | noun | a piece of work that you have to do | I have an important task. | задание, задача
guilty | adjective | feeling bad because you did something wrong | She felt guilty about the delay. | виноватый
anxious | adjective | worried and nervous | The exam makes me anxious. | тревожный
relief | noun | the good feeling when something unpleasant stops | The relief does not last. | облегчение
temptation | noun | something that makes you want to do what you should not | Remove temptations from your desk. | искушение, соблазн
forgive | verb | to stop being angry with somebody, or with yourself | Forgive yourself and start again. | прощать`,
    q: [
      { q: 'What is procrastination?', o: ['Putting off things you should do', 'Working too fast', 'Forgetting your password'], a: 0 },
      { q: 'How are procrastinators different from lazy people?', o: ['They are slower', 'They care, so they feel guilty', 'They never finish'], a: 1 },
      { q: 'What is procrastination mostly about, according to researchers?', o: ['Time', 'Money', 'Feelings'], a: 2 },
      { q: 'What first step does the writer suggest?', o: ['Write one sentence', 'Write the whole report', 'Clean your desk'], a: 0 },
      { q: 'Why should you forgive yourself?', o: ['Because the task is not important', 'Because it makes you more likely to start', 'Because nobody will notice'], a: 1 }
    ] },
  { id: 'b1-009', t: 'How coffee travelled the world', topic: 'History',
    text: `Every day, people around the world drink more than two billion cups of coffee. For many of us, the morning does not really begin without one. Yet a few hundred years ago, most of the world had never heard of it.

Coffee comes from the seeds of a small tree that first grew in the mountains of Ethiopia, in East Africa. According to an old legend, a young man who looked after goats noticed that his animals became lively after eating the red fruits of a certain bush. He tried them himself and felt wide awake. Nobody knows if the story is true, but it is a good one.

What we do know is that by the 1400s people in Yemen were drinking coffee. From there it spread across the Middle East. Coffee houses opened in big cities and became popular meeting places, where people talked, listened to music and played chess.

In the 1600s coffee reached Europe. Some people were suspicious of the strange dark drink at first, but coffee houses soon appeared in London, Paris and Vienna. They were sometimes called "penny universities", because for the price of a cup anyone could sit and listen to clever conversation.

Later, coffee trees were planted in Asia and the Americas, and today Brazil grows more coffee than any other country.

So the next time you order a cup, remember its long journey: from an African mountain, across deserts and seas, to your table.`,
    v: `legend | noun | an old story that may not be true | According to a legend, goats found coffee. | легенда
lively | adjective | full of energy | The goats became lively. | оживлённый, бодрый
spread | verb | to move to more and more places | Coffee spread across the Middle East. | распространяться
suspicious | adjective | not trusting something | People were suspicious of the new drink. | подозрительный, недоверчивый
appear | verb | to begin to exist or be seen | Coffee houses appeared in London. | появляться
order | verb | to ask for food or drink in a café | I ordered a cup of coffee. | заказывать`,
    q: [
      { q: 'Where did the coffee tree first grow?', o: ['In Ethiopia', 'In Brazil', 'In France'], a: 0 },
      { q: 'What happens in the legend?', o: ['A king invents coffee', 'Goats become lively after eating red fruits', 'A ship brings coffee to Africa'], a: 1 },
      { q: 'What did people do in coffee houses in the Middle East?', o: ['Only sleep', 'Buy goats', 'Talk, listen to music and play chess'], a: 2 },
      { q: 'Why were coffee houses called "penny universities"?', o: ['You could listen to clever talk for the price of a cup', 'Students worked there', 'They sold books'], a: 0 },
      { q: 'Which country grows the most coffee today?', o: ['Yemen', 'Brazil', 'Ethiopia'], a: 1 }
    ] },
  { id: 'b1-010', t: 'Is handwriting still useful?', topic: 'Education',
    text: `When did you last write a whole page by hand? For many adults, the honest answer is "years ago". We type messages, emails and even shopping lists. Some schools now spend less time teaching children to write neatly, and more time teaching them to type. Does it matter?

There are good arguments on the side of the keyboard. Typing is faster, the result is easy to read, and a typed text can be corrected, copied and shared in seconds. In most jobs, nobody will ever ask to see your handwriting.

However, several studies suggest that writing by hand has benefits that typing does not. When students take notes on a laptop, they tend to type the teacher's words exactly. When they write by hand, they cannot keep up, so they have to choose what is important and put it in their own words. That extra thinking seems to help them understand and remember the lesson.

For young children the difference may be even greater. Forming each letter with a pen appears to help them recognise letters and learn to read.

There is also something personal about handwriting. A birthday card written by hand feels warmer than a text message, even if the words are the same. We keep handwritten letters for decades. Few people print out an old email.

So the sensible answer is probably "both". Type when speed matters. But when you want to learn something properly, or to show someone that you care, pick up a pen.`,
    v: `neatly | adverb | in a tidy and careful way | She writes very neatly. | аккуратно
argument | noun | a reason for or against something | There are good arguments for typing. | аргумент, довод
benefit | noun | a good result of something | Handwriting has several benefits. | польза, преимущество
keep up | phrasal verb | to go as fast as somebody or something | I can't keep up with the teacher. | успевать
recognise | verb | to know what something is when you see it | Children learn to recognise letters. | узнавать, распознавать
decade | noun | a period of ten years | We keep letters for decades. | десятилетие`,
    q: [
      { q: 'What is an advantage of typing?', o: ['It is faster and easy to share', 'It is more personal', 'It helps you remember more'], a: 0 },
      { q: 'What do students tend to do when they type notes?', o: ['Draw pictures', 'Type the teacher\'s exact words', 'Write nothing'], a: 1 },
      { q: 'Why does writing by hand help understanding?', o: ['The paper is bigger', 'Pens are cheaper', 'You must choose what is important'], a: 2 },
      { q: 'How may handwriting help young children?', o: ['It helps them recognise letters', 'It makes them type faster', 'It makes them taller'], a: 0 },
      { q: 'What is the writer\'s conclusion?', o: ['Stop typing', 'Use both, for different purposes', 'Stop writing by hand'], a: 1 }
    ] },
  { id: 'b1-011', t: 'Why do we laugh?', topic: 'People',
    text: `Babies laugh long before they can speak. People in every culture laugh, and the sound is recognised everywhere. Clearly, laughing is an important part of being human. But what is it for?

Most of us would say that we laugh because something is funny. Surprisingly, that is only a small part of the story. A researcher who spent years listening to ordinary conversations found that people rarely laugh at jokes. Much more often, they laugh after completely ordinary remarks such as "See you later!" or "I know!" He also found that we laugh far more when we are with others than when we are alone.

This suggests that laughter is mainly social. It is a signal. When we laugh with someone, we are telling them, "I like you, I agree with you, we are on the same side." That is why a conversation between friends is full of laughter even when nobody says anything clever.

Laughter is also catching. If one person in a room starts laughing, others often join in without knowing why. Television comedies have used recorded laughter for this reason.

There seem to be benefits for the body too. A good laugh relaxes the muscles and can reduce stress for a while. People often say they feel lighter afterwards.

Of course, laughter can also be unkind, when a group laughs at someone and not with them. But at its best, it is one of the simplest ways people have of feeling close. It costs nothing, and you do not even need a joke.`,
    v: `remark | noun | something that you say; a comment | It was an ordinary remark. | замечание, реплика
social | adjective | connected with being with other people | Laughter is mainly social. | социальный
signal | noun | a sound or action that sends a message | A laugh is a signal of friendship. | сигнал
catching | adjective | passing easily from one person to another | Laughter is catching. | заразительный
reduce | verb | to make something smaller or less | Laughing can reduce stress. | уменьшать, снижать
unkind | adjective | not nice to other people | It is unkind to laugh at him. | недобрый`,
    q: [
      { q: 'When do people laugh most often, according to the researcher?', o: ['After ordinary remarks', 'After jokes', 'When they are alone'], a: 0 },
      { q: 'What does laughing with someone tell them?', o: ['"I am bored"', '"I like you and agree with you"', '"Please stop talking"'], a: 1 },
      { q: 'Why do TV comedies use recorded laughter?', o: ['It is cheap', 'The actors like it', 'Laughter is catching'], a: 2 },
      { q: 'What can a good laugh do for the body?', o: ['Relax the muscles and reduce stress', 'Make you taller', 'Help you sleep less'], a: 0 },
      { q: 'When is laughter unkind?', o: ['When friends laugh together', 'When a group laughs at someone', 'When a baby laughs'], a: 1 }
    ] }
  ]);
})();
