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
})();
