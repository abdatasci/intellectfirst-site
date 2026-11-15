/* General English B2, units 3–8 (original IF Academy material). */
(function () {
  var K = IFX.k;
  IFX.make('ge-b2', [
    { id: 'u3', t: 'Careers', topic: 'Work',
      v: ['Building a career', `
apply for | verb | to formally ask for a job or place | She's applied for a job at a bank. | подавать заявку на
qualifications | noun | exams you have passed or skills you have | You need the right qualifications for this job. | квалификация
promotion | noun | a move to a more important job | He got a promotion after two years. | повышение
deadline | noun | the time by which something must be done | The deadline is Friday at noon. | крайний срок
workload | noun | the amount of work you have to do | My workload has doubled this month. | нагрузка
freelance | adjective | working for different companies, not employed by one | She works as a freelance designer. | внештатный, фриланс
resign | verb | to officially leave your job | He resigned after an argument with his boss. | увольняться
burnout | noun | extreme tiredness from working too hard | Long hours can lead to burnout. | выгорание`],
      g: ['Present perfect continuous', "<p>Use <b>have / has been + -ing</b> for an activity that started in the past and is still going on, or has just stopped and has a visible result.</p><table><tr><td>Duration</td><td>I<b>'ve been working</b> here for three years.</td></tr><tr><td>Recent result</td><td>You look tired. <b>Have</b> you <b>been running</b>?</td></tr><tr><td>Simple vs continuous</td><td>I<b>'ve written</b> three reports (result: number). / I<b>'ve been writing</b> reports all day (activity).</td></tr></table><p>State verbs (know, believe, own) stay simple: I<b>'ve known</b> her for years.</p>",
        [K.mc('She ___ for that company since 2020.', ['works', "'s been working", 'is working'], 1),
         K.mc('I ___ three applications this week.', ["'ve sent", "'ve been sending"], 0),
         K.mc('Your eyes are red. ___ you been crying?', ['Have', 'Has', 'Did'], 0),
         K.mc('I\'ve ___ my boss for ten years.', ['known', 'been knowing'], 0),
         K.gap('How long ___ you been learning English?', 'have'),
         K.ord("He's been looking for a new job for months.")]],
      r: ['Leaving the office', "For eight years, Aidana worked as an accountant in a large company in Almaty. She had a good salary and had recently got a promotion, but she was unhappy. 'My workload was enormous,' she explains. 'I was always chasing deadlines and I was close to burnout.'\n\nTwo years ago, she resigned and started working freelance as a photographer — something she had been doing as a hobby since she was a teenager. 'The first year was hard. I earned half my old salary,' she admits. 'But I've been doing what I love, and I've never felt better.'\n\nShe has been running photography workshops for the last six months, and she's now thinking of opening a small studio.",
        [K.mc('What was Aidana\'s first job?', ['photographer', 'accountant', 'teacher'], 1),
         K.mc('Why was she unhappy?', ['low salary', 'too much work and stress', 'a difficult boss'], 1),
         K.tf('She started photography two years ago.', false),
         K.mc('In her first freelance year she earned…', ['twice as much', 'the same', 'half her old salary'], 2),
         K.mc('What is she thinking of doing next?', ['going back to accounting', 'opening a studio', 'moving abroad'], 1)]] },

    { id: 'u4', t: 'If only…', topic: 'Choices and dreams',
      v: ['Wishes and choices', `
dilemma | noun | a difficult choice between two options | I'm in a real dilemma about which job to take. | дилемма
take a risk | phrase | to do something that might go wrong | Sometimes you have to take a risk. | рисковать
opportunity | noun | a chance to do something | It was the opportunity of a lifetime. | возможность
regret | verb / noun | to feel sorry about something you did | I don't regret moving abroad. | сожалеть
weigh up | phrasal verb | to think carefully about the good and bad points | Weigh up the pros and cons first. | взвешивать
afford | verb | to have enough money for | If I could afford it, I'd travel more. | позволить себе
ambition | noun | a strong wish to achieve something | Her ambition is to become a pilot. | амбиция, мечта
settle down | phrasal verb | to start a calm life in one place | They want to settle down and have children. | остепениться`],
      g: ['Second conditional and wish', "<table><tr><td><b>Second conditional</b> — unreal now / future</td><td><b>If</b> I <b>had</b> more time, I <b>would learn</b> to paint. (but I don't have time)</td></tr><tr><td><b>were</b> for all persons</td><td>If I <b>were</b> you, I<b>'d accept</b> the offer.</td></tr><tr><td><b>wish / if only</b> + past simple</td><td>I <b>wish</b> I <b>lived</b> by the sea. <b>If only</b> I <b>could</b> drive!</td></tr><tr><td><b>wish</b> + would</td><td>complaining: I <b>wish</b> you <b>would</b> stop talking!</td></tr></table>",
        [K.mc('If I ___ rich, I would buy a house in the mountains.', ['am', 'were', 'will be'], 1),
         K.mc('If I were you, I ___ take that job.', ['will', 'would', 'did'], 1),
         K.mc('I wish I ___ speak Chinese.', ['can', 'could', 'will'], 1),
         K.mc('What ___ you do if you lost your phone?', ['will', 'would', 'do'], 1),
         K.gap('I wish I ___ (have) more free time.', 'had'),
         K.ord('If I had enough money, I would travel the world.')]],
      r: ['Readers\' dilemmas', "'I'm 24 and I've been offered a job in Seoul. It's a great opportunity, but my parents are getting older and I'm their only child. If I went, I would miss them terribly. If I stayed, I'd always wonder what might have happened. What would you do?' — Dina\n\nOur advice: Weigh up the pros and cons carefully, but don't make your decision based only on fear. If you took the job for two years, you would gain experience and still be young enough to come back. Talk honestly with your parents — they may want you to take the risk. And remember: you can visit, call and video-chat every day. If we were you, we'd say yes — and plan the first trip home before you leave!",
        [K.mc('Where is the job?', ['in Tokyo', 'in Seoul', 'in Beijing'], 1),
         K.mc('What is Dina worried about?', ['the salary', 'leaving her parents', 'learning Korean'], 1),
         K.tf('The advice is to decide quickly without thinking.', false),
         K.mc('The magazine suggests taking the job for…', ['six months', 'two years', 'ten years'], 1),
         K.mc('What would the magazine do?', ['say no', 'say yes', 'ask her parents to decide'], 1)]] },

    { id: 'u5', t: 'Looking back', topic: 'Regrets',
      v: ['Mistakes and lessons', `
in hindsight | phrase | looking back now, with knowledge you didn't have then | In hindsight, I should have studied harder. | задним числом
make a mistake | phrase | to do something wrong | Everyone makes mistakes. | ошибаться
turning point | noun | a time when an important change happens | Moving to Almaty was a turning point. | поворотный момент
lesson | noun | something you learn from experience | I learned an important lesson. | урок
blame | verb | to say someone is responsible for something bad | Don't blame yourself. | винить
miss out on | phrasal verb | to lose a chance to do something enjoyable | I missed out on the trip. | упустить
narrowly | adverb | only just | We narrowly missed the train. | едва, чуть-чуть
consequence | noun | a result of an action | Every decision has consequences. | последствие`],
      g: ['Third conditional and should have', "<table><tr><td><b>Third conditional</b> — unreal past</td><td><b>If</b> I <b>had left</b> earlier, I <b>wouldn't have missed</b> the flight. (but I left late)</td></tr><tr><td>Negative</td><td>If she <b>hadn't helped</b> me, I <b>would have failed</b>.</td></tr><tr><td><b>should have / shouldn't have</b> + past participle</td><td>criticism of the past: You <b>should have told</b> me. I <b>shouldn't have spent</b> so much.</td></tr></table>",
        [K.mc('If I had known, I ___ you.', ['would help', 'would have helped', 'helped'], 1),
         K.mc('If we ___ the map, we wouldn\'t have got lost.', ['had checked', 'checked', 'would check'], 0),
         K.mc('You ___ have called me. I was worried!', ['should', 'would', 'must'], 0),
         K.mc('I shouldn\'t ___ so much cake.', ['eat', 'have eaten', 'ate'], 1),
         K.gap('If she ___ (not / miss) the bus, she would have met him.', "hadn't missed", 'had not missed'),
         K.ord('In hindsight, I should have taken the job.')]],
      r: ['The bus I missed', "Ten years ago, I narrowly missed the last bus home after a concert in Kostanay. I was furious with myself — I should have left five minutes earlier. I had to walk to a friend's flat, and that's where I met Askar, his cousin, who was visiting from Pavlodar.\n\nWe talked all night. If I had caught that bus, I would never have met him. Two years later we got married. In hindsight, missing that bus was the biggest turning point of my life.\n\nI often think about how small events have big consequences. Of course, not every mistake ends so well. But the lesson I learned is this: don't blame yourself too much — sometimes a 'mistake' takes you exactly where you need to be.",
        [K.mc('Where was the writer that night?', ['at a party', 'at a concert', 'at work'], 1),
         K.mc('Who is Askar?', ['the writer\'s friend', 'the friend\'s cousin', 'a bus driver'], 1),
         K.tf('The writer caught the last bus.', false),
         K.mc('What happened two years later?', ['they moved to Pavlodar', 'they got married', 'they lost touch'], 1),
         K.mc('The writer\'s lesson is:', ['always leave early', 'don\'t blame yourself too much', 'never go to concerts'], 1)]] },

    { id: 'u6', t: 'Arts and culture', topic: 'Culture',
      v: ['Talking about the arts', `
exhibition | noun | a public show of art or objects | There's a new exhibition at the museum. | выставка
performance | noun | when someone acts, sings or plays music for an audience | Her performance was outstanding. | выступление
critic | noun | a person who writes reviews of films, books, etc. | The critics loved the film. | критик
masterpiece | noun | an excellent work of art | This novel is a masterpiece. | шедевр
audience | noun | the people who watch or listen | The audience clapped for ten minutes. | зрители
plot | noun | the story of a film or book | The plot was hard to follow. | сюжет
moving | adjective | making you feel strong emotions | It was a very moving story. | трогательный
overrated | adjective | thought to be better than it really is | I think that film is overrated. | переоценённый`],
      g: ['Relative clauses', "<table><tr><td><b>Defining</b> — essential information, no commas</td><td>The artist <b>who / that</b> painted this is from Turkistan. The film <b>(that)</b> we saw was moving.</td></tr><tr><td><b>Non-defining</b> — extra information, with commas, no <i>that</i></td><td>Abai, <b>who</b> lived in the 19th century, was a great poet. The theatre, <b>which</b> opened in 1960, is being renovated.</td></tr><tr><td>whose / where / when</td><td>the writer <b>whose</b> book won · the city <b>where</b> I was born · the year <b>when</b> we met</td></tr></table>",
        [K.mc('That\'s the actor ___ won the award.', ['who', 'which', 'whose'], 0),
         K.mc('The museum, ___ is in the city centre, is free on Sundays.', ['that', 'which', 'where'], 1),
         K.mc('This is the café ___ we first met.', ['which', 'where', 'when'], 1),
         K.mc('She\'s the singer ___ songs are always sad.', ['who', 'whose', 'which'], 1),
         K.mc('Which sentence is correct?', ['My brother, that lives in Astana, is a pianist.', 'My brother, who lives in Astana, is a pianist.'], 1),
         K.ord('The book that I am reading is a masterpiece.')]],
      r: ['Review: a concert to remember', "Last night's concert at the Kostanay Philharmonic, which was the first of this year's festival, was a triumph. The orchestra, whose young conductor is only 28, played a programme of Kazakh and European music to a full audience.\n\nThe highlight was a new piece by a local composer who grew up in a village near Arkalyk. It mixed the sound of the dombra with a full orchestra, and many people in the audience were visibly moved. Some critics might call it too long, but for me it was a small masterpiece.\n\nIf you missed it, don't worry: the festival, which continues until Sunday, still has a few tickets left.",
        [K.mc('Where was the concert?', ['in Almaty', 'at the Kostanay Philharmonic', 'in Arkalyk'], 1),
         K.mc('How old is the conductor?', ['18', '28', '38'], 1),
         K.mc('What was special about the new piece?', ['it was very short', 'it mixed dombra with an orchestra', 'it had no music'], 1),
         K.tf('The reviewer thought the new piece was too long.', false),
         K.mc('When does the festival end?', ['tonight', 'on Sunday', 'next month'], 1)]] },

    { id: 'u7', t: 'Explaining the unexplained', topic: 'Speculation',
      v: ['Mysteries and possibilities', `
evidence | noun | facts that show something is true | There's no evidence for that theory. | доказательство
theory | noun | an idea that tries to explain something | Scientists have several theories. | теория
explanation | noun | a reason that makes something clear | Is there a logical explanation? | объяснение
mysterious | adjective | strange and hard to explain | A mysterious light appeared in the sky. | загадочный
coincidence | noun | when two things happen together by chance | What a coincidence! | совпадение
eyewitness | noun | a person who saw something happen | Several eyewitnesses described the same thing. | очевидец
sceptical | adjective | doubting that something is true | I'm sceptical about ghosts. | скептический
hoax | noun | a trick to make people believe something false | The photo turned out to be a hoax. | мистификация, розыгрыш`],
      g: ['Modals of deduction: present and past', "<table><tr><td>Present</td><td>It <b>must be</b> true (I'm sure). It <b>might / could be</b> a coincidence (possible). It <b>can't be</b> a ghost (impossible).</td></tr><tr><td>Past</td><td>They <b>must have seen</b> something. It <b>might have been</b> a plane. It <b>can't have been</b> a UFO.</td></tr></table>",
        [K.mc('The lights are off. They ___ be at home.', ["can't", 'must', 'might'], 0),
         K.mc('She ___ have taken the bus — her car is still here.', ['must', "can't", 'should'], 0),
         K.mc('I\'m not sure. It ___ have been a plane.', ['might', 'must', "can't"], 0),
         K.mc('He passed the exam with 100%. He ___ studied hard.', ["can't have", 'must have', 'might not'], 1),
         K.gap('That photo can\'t ___ (be) real — it must be a hoax.', 'be'),
         K.ord('They must have heard the noise.')]],
      r: ['The lights over the steppe', "In September 2019, dozens of people in a small village in northern Kazakhstan reported seeing strange lights moving slowly across the night sky. The eyewitnesses all described the same thing: a line of bright points, completely silent, which disappeared after a few minutes.\n\nSome people were convinced it must have been a UFO. Others were more sceptical. Astronomers later offered a simpler explanation: the lights could have been a group of satellites launched a few days earlier, which often look like a moving 'train' of stars just after launch.\n\nNot everyone accepted this theory. 'They can't have been satellites,' one farmer insisted. 'They changed direction!' Was it a coincidence, a hoax, or something else? We may never know for certain.",
        [K.mc('When did people see the lights?', ['in 2009', 'in 2019', 'in 2021'], 1),
         K.tf('The lights made a loud noise.', false),
         K.mc('What explanation did astronomers give?', ['a plane', 'satellites', 'a hoax'], 1),
         K.mc('Why did the farmer disagree?', ['the lights changed direction', 'he saw aliens', 'it was too cold'], 0),
         K.mc('The writer\'s conclusion is that…', ['it was definitely a UFO', 'we may never know for certain', 'it was a hoax'], 1)]] },

    { id: 'u8', t: 'Travel stories', topic: 'Reported speech',
      v: ['Travelling and tourism', `
itinerary | noun | a plan of a journey | Our itinerary includes three cities. | маршрут
off the beaten track | phrase | in a place few tourists visit | We found a village off the beaten track. | вдали от туристических троп
breathtaking | adjective | extremely beautiful | The view was breathtaking. | захватывающий дух
cancel | verb | to say something will not happen | Our flight was cancelled. | отменять
delay | noun / verb | when something happens later than planned | There was a two-hour delay. | задержка
local | adjective / noun | from the area you are in | We ate with a local family. | местный
souvenir | noun | something you buy to remember a place | I bought a souvenir for my mum. | сувенир
jet lag | noun | tiredness after a long flight across time zones | I had terrible jet lag. | смена часовых поясов`],
      g: ['Reported speech', "<p>When we report what someone said, the tense usually moves <b>one step back</b>.</p><table><tr><td>\"I <b>am</b> tired.\"</td><td>She said (that) she <b>was</b> tired.</td></tr><tr><td>\"We <b>have</b> missed the bus.\"</td><td>He said they <b>had missed</b> the bus.</td></tr><tr><td>\"I <b>will</b> call you.\"</td><td>She said she <b>would</b> call me.</td></tr><tr><td>Questions</td><td>\"Where <b>are</b> you from?\" → He asked where I <b>was</b> from. \"Do you like it?\" → She asked <b>if</b> I liked it.</td></tr><tr><td>Commands</td><td>\"Wait here.\" → The guide told us <b>to wait</b> there.</td></tr></table>",
        [K.mc('"I love this city." → She said she ___ the city.', ['loves', 'loved', 'has loved'], 1),
         K.mc('"We will arrive late." → They said they ___ arrive late.', ['will', 'would', 'are'], 1),
         K.mc('"Is the museum open?" → I asked ___ the museum was open.', ['that', 'if', 'what'], 1),
         K.mc('"Don\'t touch the paintings." → The guard told us ___ the paintings.', ["don't touch", 'not to touch', 'to not touching'], 1),
         K.gap('"I have lost my passport." → He said he ___ lost his passport.', 'had'),
         K.ord('The guide asked where we were from.')]],
      r: ['A journey to Charyn', "Last summer, my friend Ainur and I decided to visit Charyn Canyon, which is off the beaten track for most tourists. Our itinerary was simple: Almaty, then two days in the canyon.\n\nThings didn't start well. Our bus was delayed for three hours, and the driver told us that the road was closed because of a storm. A local woman at the bus station asked us where we were going. When we explained, she said her son would drive us there the next morning — and he did!\n\nThe canyon was breathtaking. Ainur said it was the most beautiful place she had ever seen. Before we left, the woman's son told us to come back in autumn, when the colours are even better. We promised we would.",
        [K.mc('Where did they want to go?', ['Charyn Canyon', 'Lake Kaindy', 'Astana'], 0),
         K.mc('Why was the bus delayed?', ['a storm closed the road', 'the driver was ill', 'they were late'], 0),
         K.mc('Who drove them to the canyon?', ['the bus driver', 'a local woman\'s son', 'a taxi driver'], 1),
         K.tf('Ainur didn\'t like the canyon.', false),
         K.mc('When did the son tell them to come back?', ['in winter', 'in spring', 'in autumn'], 2)]] }
  ]);
})();
