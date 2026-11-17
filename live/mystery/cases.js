/* IF Academy mystery cases (the three cases from the Board & Mystery Games room), with each character's card
   (what the player reads) and a first-person statement `s` (what that character tells the detectives).
   Used by Mystery Live and the solo detective game. */
window.IF_CASES = [
 {
  "id": "necklace",
  "title": "The Missing Necklace",
  "place": "Hotel Aurora",
  "level": "B1",
  "players": "8–12",
  "grammar": "Past continuous: What were you doing at 7:00?",
  "intro": "It is Saturday evening at the Hotel Aurora. Dana Volkova, a famous pianist, is staying in room 214. At 6:55 p.m. she left her room for dinner with friends in town. She forgot to lock the door. When she came back at 7:45 p.m., her grandmother’s gold necklace was not on the table. The hotel manager has asked everyone in the hotel to stay in the meeting room. One of you is the thief. The police will arrive in 45 minutes. Find the thief before they do!",
  "questions": [
   "What’s your name and what do you do?",
   "Why are you staying at the hotel?",
   "What were you doing at 7:00 p.m.? Who were you with?",
   "What were you doing at 7:30 p.m.? Who were you with?",
   "Did you see anything strange?"
  ],
  "times": [
   "7:00 p.m.",
   "7:30 p.m."
  ],
  "clues": [
   "The camera on the 2nd floor wasn’t working on Saturday.",
   "The door of room 214 was not damaged. The thief walked in.",
   "A business card was found on the floor of room 214. Only the letters ‘…TIQUES’ can be read.",
   "The thief knew which room was Dana’s."
  ],
  "solution": "Victor Hale took the necklace. He said he was swimming with a woman at 7:00, but Emma was alone in the pool, and at 7:40 she saw him with dry hair. He said he was having dinner in the restaurant at 7:30, but Daniel and Sofia were the only people there. Maria saw a man in a grey suit asking for Dana’s room, and the business card in room 214 was from an ANTIQUES dealer. The necklace is in room 118.",
  "chars": [
   {
    "name": "Arman Seitkali",
    "role": "Photographer",
    "culprit": false,
    "why": "You are on holiday with your wife, Leila. You aren’t very happy together at the moment.",
    "t1": "You were arguing with your wife, Leila, in your room (312).",
    "t2": "You were phoning your brother in the hotel lobby. You were speaking very loudly.",
    "extra": "Tell people you were in the lobby. A woman was waiting there for a taxi.",
    "s": {
     "why": "I am on holiday with my wife, Leila. We aren’t very happy together at the moment.",
     "t1": "I was arguing with my wife, Leila, in my room (312).",
     "t2": "I was phoning my brother in the hotel lobby. I was speaking very loudly.",
     "extra": "A woman was waiting in the lobby for a taxi while I was on the phone."
    }
   },
   {
    "name": "Leila Seitkali",
    "role": "Teacher",
    "culprit": false,
    "why": "You are on holiday with your husband, Arman.",
    "t1": "You were arguing with your husband, Arman, in your room (312).",
    "t2": "You were crying in the hotel bar. A friendly woman (Nina) sat with you and talked to you.",
    "extra": "You don’t want people to know about the argument, but you must tell the truth.",
    "s": {
     "why": "I am on holiday with my husband, Arman.",
     "t1": "I was arguing with my husband, Arman, in my room (312).",
     "t2": "I was crying in the hotel bar. A friendly woman (Nina) sat with me and talked to me.",
     "extra": "Yes, we had an argument. I don’t like talking about it, but it is the truth."
    }
   },
   {
    "name": "Nina Park",
    "role": "Dana’s best friend",
    "culprit": false,
    "why": "You are travelling with Dana. You didn’t go to dinner because you were tired.",
    "t1": "You were doing a yoga class in the hotel gym. The trainer was Tom Reed.",
    "t2": "You were in the hotel bar. A woman (Leila) was crying, so you sat with her.",
    "extra": "You know Dana always leaves the necklace on the table because it is too heavy to wear at dinner.",
    "s": {
     "why": "I am travelling with Dana. I didn’t go to dinner because I was tired.",
     "t1": "I was doing a yoga class in the hotel gym. The trainer was Tom Reed.",
     "t2": "I was in the hotel bar. A woman (Leila) was crying, so I sat with her.",
     "extra": "I know Dana always leaves the necklace on the table because it is too heavy to wear at dinner."
    }
   },
   {
    "name": "Tom Reed",
    "role": "Personal trainer at the hotel gym",
    "culprit": false,
    "why": "You work at the hotel.",
    "t1": "You were teaching a yoga class in the gym. Only one person came: Nina Park.",
    "t2": "You were fixing a broken running machine in the gym with Ivan, the hotel engineer.",
    "extra": "You are a big fan of Dana’s music and you have all her albums.",
    "s": {
     "why": "I work at the hotel.",
     "t1": "I was teaching a yoga class in the gym. Only one person came: Nina Park.",
     "t2": "I was fixing a broken running machine in the gym with Ivan, the hotel engineer.",
     "extra": "I am a big fan of Dana’s music and I have all her albums."
    }
   },
   {
    "name": "Ivan Lee",
    "role": "Hotel engineer",
    "culprit": false,
    "why": "You work at the hotel.",
    "t1": "You were repairing the lift on the 2nd floor, at the end of the corridor. Oleg, the security guard, was holding your ladder. You couldn’t see room 214 from there.",
    "t2": "You were fixing a running machine in the gym with Tom Reed.",
    "extra": "At 7:00 you saw a cleaning trolley outside room 210, next to room 214.",
    "s": {
     "why": "I work at the hotel.",
     "t1": "I was repairing the lift on the 2nd floor, at the end of the corridor. Oleg, the security guard, was holding my ladder. I couldn’t see room 214 from there.",
     "t2": "I was fixing a running machine in the gym with Tom Reed.",
     "extra": "At 7:00 I saw a cleaning trolley outside room 210, next to room 214."
    }
   },
   {
    "name": "Oleg Brandt",
    "role": "Security guard",
    "culprit": false,
    "why": "You work at the hotel.",
    "t1": "You were holding a ladder for Ivan, the engineer. He was repairing the lift on the 2nd floor.",
    "t2": "You were watching the security cameras in your office. Maria from reception brought you a cup of tea.",
    "extra": "The camera on the 2nd floor has been broken since Friday. You told the manager, but nobody fixed it.",
    "s": {
     "why": "I work at the hotel.",
     "t1": "I was holding a ladder for Ivan, the engineer. He was repairing the lift on the 2nd floor.",
     "t2": "I was watching the security cameras in my office. Maria from reception brought me a cup of tea.",
     "extra": "The camera on the 2nd floor has been broken since Friday. I told the manager, but nobody fixed it."
    }
   },
   {
    "name": "Maria Gomez",
    "role": "Receptionist",
    "culprit": false,
    "why": "You work at the hotel.",
    "t1": "You were checking in a new guest, a journalist called Daniel Brooks.",
    "t2": "You were taking a cup of tea to Oleg in the security office.",
    "extra": "At 6:50 a man in a grey suit asked you which room Dana Volkova was in. You didn’t tell him, but he saw her name on your computer screen.",
    "s": {
     "why": "I work at the hotel.",
     "t1": "I was checking in a new guest, a journalist called Daniel Brooks.",
     "t2": "I was taking a cup of tea to Oleg in the security office.",
     "extra": "At 6:50 a man in a grey suit asked me which room Dana Volkova was in. I didn’t tell him, but he saw her name on my computer screen."
    }
   },
   {
    "name": "Daniel Brooks",
    "role": "Journalist",
    "culprit": false,
    "why": "You came to interview Dana Volkova for a music magazine tomorrow.",
    "t1": "You were checking in at reception. The receptionist was Maria.",
    "t2": "You were having coffee in the restaurant with Sofia Lind, a singer. There was nobody else in the restaurant.",
    "extra": "Sofia told you she doesn’t like Dana very much.",
    "s": {
     "why": "I came to interview Dana Volkova for a music magazine tomorrow.",
     "t1": "I was checking in at reception. The receptionist was Maria.",
     "t2": "I was having coffee in the restaurant with Sofia Lind, a singer. There was nobody else in the restaurant.",
     "extra": "Sofia told me she doesn’t like Dana very much."
    }
   },
   {
    "name": "Sofia Lind",
    "role": "Singer",
    "culprit": false,
    "why": "You sing in the hotel restaurant every Saturday. You and Dana went to music school together, but you are not friends.",
    "t1": "You were singing in the hotel restaurant. There were only a few people listening.",
    "t2": "You were having coffee with a journalist, Daniel Brooks, in the restaurant. Only you two were there.",
    "extra": "You think Dana is arrogant, but you would never steal from her.",
    "s": {
     "why": "I sing in the hotel restaurant every Saturday. Dana and I went to music school together, but we are not friends.",
     "t1": "I was singing in the hotel restaurant. There were only a few people listening.",
     "t2": "I was having coffee with a journalist, Daniel Brooks, in the restaurant. Only the two of us were there.",
     "extra": "I think Dana is arrogant, but I would never steal from her."
    }
   },
   {
    "name": "Emma Clarke",
    "role": "Doctor",
    "culprit": false,
    "why": "You are on holiday alone.",
    "t1": "You were swimming in the hotel pool. You were alone. Nobody else was in the pool.",
    "t2": "You were waiting in the lobby for a taxi. A man was speaking very loudly on the phone.",
    "extra": "At 7:40 you saw a man in a grey suit near the lift. His hair was completely dry.",
    "s": {
     "why": "I am on holiday alone.",
     "t1": "I was swimming in the hotel pool. I was alone. Nobody else was in the pool.",
     "t2": "I was waiting in the lobby for a taxi. A man was speaking very loudly on the phone.",
     "extra": "At 7:40 I saw a man in a grey suit near the lift. His hair was completely dry."
    }
   },
   {
    "name": "Aliya Nurlan",
    "role": "Hotel cleaner",
    "culprit": false,
    "why": "You work at the hotel.",
    "t1": "You were cleaning room 210 on the 2nd floor. You were alone.",
    "t2": "You were on a video call with your daughter in the staff room.",
    "extra": "You were near room 214, so people might think it was you. Stay calm and tell the truth.",
    "s": {
     "why": "I work at the hotel.",
     "t1": "I was cleaning room 210 on the 2nd floor. I was alone.",
     "t2": "I was on a video call with my daughter in the staff room.",
     "extra": "I was near room 214, so people might think it was me. It wasn’t."
    }
   },
   {
    "name": "Victor Hale",
    "role": "Antiques dealer",
    "culprit": true,
    "why": "You buy and sell old jewellery. You are wearing a grey suit.",
    "t1": "THE TRUTH: you were in room 214 stealing the necklace. YOU MUST SAY: “I was swimming in the pool with a woman.”",
    "t2": "THE TRUTH: you were hiding the necklace in your room (118). YOU MUST SAY: “I was having dinner in the restaurant.”",
    "extra": "You are the thief! Don’t tell anyone. Lie about where you were. Try to make people suspect the cleaner or the singer.",
    "s": {
     "why": "I buy and sell old jewellery. I am wearing a grey suit.",
     "t1": "I was swimming in the pool with a woman.",
     "t2": "I was having dinner in the restaurant.",
     "extra": "I didn’t see anything strange. Have you asked the cleaner? Or the singer?"
    }
   }
  ]
 },
 {
  "id": "reunion",
  "title": "Murder at the Reunion",
  "place": "Riverside Music School",
  "level": "B1–B2",
  "players": "7–11",
  "grammar": "Past continuous + past simple; modals of deduction (must / might / can’t have)",
  "intro": "Tonight is the 20-year reunion party at Riverside Music School. Old students and teachers are in the main hall. At 9:15 p.m. all the lights in the school went out. Two minutes later they came back on, and then everyone heard a scream. Mr Robert Harlow, the old head teacher, was found dead in the piano room. Somebody hit him on the head with a heavy metronome. The doors of the school were locked, so the murderer is still here. Who killed Mr Harlow?",
  "questions": [
   "What’s your name? Who are you?",
   "What did you think of Mr Harlow?",
   "When did you last see him? What was he doing?",
   "What were you doing at 9:15, when the lights went out?",
   "Who do you think did it, and why?"
  ],
  "times": [
   "Last time you saw Mr Harlow",
   "At 9:15 (lights out)"
  ],
  "clues": [
   "Someone turned off the main light switch by hand. The switch is next to the head teacher’s office.",
   "Mr Harlow’s blue folder is missing. It wasn’t in the piano room.",
   "A blue folder was found in the head teacher’s office. Inside were bank papers: money is missing from the school charity fund.",
   "The metronome was wiped clean. The murderer was careful."
  ],
  "solution": "David Grant killed Mr Harlow. He said he didn’t see Mr Harlow all evening, but Peter and Sam both saw them arguing at 8:50. Mr Harlow knew Grant took money from the charity fund and wanted to tell everyone. The light switch was turned off by hand, next to Grant’s office. Sam saw Grant leaving the piano room corridor at 9:18, and the blue folder was found in his office.",
  "chars": [
   {
    "name": "Kate Moore",
    "role": "Ex-student, now a famous violinist",
    "culprit": false,
    "why": "Mr Harlow was very strict. He made you practise for six hours a day. You hated it then, but now you are grateful.",
    "t1": "At 8:40 you gave him a signed copy of your new CD. He smiled and said he was proud of you.",
    "t2": "You were talking to Peter Owen, another ex-student, in the main hall.",
    "extra": "You noticed that Mr Harlow was holding a blue folder all evening. He never put it down.",
    "s": {
     "why": "Mr Harlow was very strict. He made me practise for six hours a day. I hated it then, but now I am grateful.",
     "t1": "At 8:40 I gave him a signed copy of my new CD. He smiled and said he was proud of me.",
     "t2": "I was talking to Peter Owen, another ex-student, in the main hall.",
     "extra": "I noticed that Mr Harlow was holding a blue folder all evening. He never put it down."
    }
   },
   {
    "name": "Peter Owen",
    "role": "Ex-student, now works in a bank",
    "culprit": false,
    "why": "You failed your music exams. Mr Harlow told your parents you had no talent. You still feel angry about it.",
    "t1": "At 8:50 you saw him arguing with the head teacher, Mr Grant, near the office. Mr Grant looked very angry.",
    "t2": "You were talking to Kate Moore in the main hall. You were bored, but she was talking about her CD.",
    "extra": "You have a good reason to hate Mr Harlow, so people will suspect you. Tell the truth.",
    "s": {
     "why": "I failed my music exams. Mr Harlow told my parents I had no talent. I still feel angry about it.",
     "t1": "At 8:50 I saw him arguing with the head teacher, Mr Grant, near the office. Mr Grant looked very angry.",
     "t2": "I was talking to Kate Moore in the main hall. I was bored, but she was talking about her CD.",
     "extra": "I know I had a reason to hate Mr Harlow. But I didn’t do it."
    }
   },
   {
    "name": "David Grant",
    "role": "Head teacher of the school now",
    "culprit": true,
    "why": "Mr Harlow was the head teacher before you. You are always polite about him, but you didn’t like him.",
    "t1": "THE TRUTH: at 8:50 you argued with him near your office. He knew you took money from the school charity fund. He wanted to tell everyone at the party. YOU MUST SAY: “I didn’t see him at all this evening.”",
    "t2": "THE TRUTH: you turned off the main light switch next to your office, walked to the piano room and hit him. YOU MUST SAY: “I was in my office, working on the computer.”",
    "extra": "You are the murderer! Don’t tell anyone. The blue folder with the bank papers is hidden in your office.",
    "s": {
     "why": "Mr Harlow was the head teacher before me. He was a fine teacher.",
     "t1": "I didn’t see him at all this evening.",
     "t2": "I was in my office, working on the computer.",
     "extra": "I have no idea who did this. It is terrible for the school."
    }
   },
   {
    "name": "Anna Webb",
    "role": "Music teacher",
    "culprit": false,
    "why": "You worked with Mr Harlow for ten years. He was a good teacher, but he didn’t have many friends.",
    "t1": "At 9:05 you saw him walking to the piano room. He looked worried. He was holding a blue folder.",
    "t2": "You were serving drinks to the guests in the main hall with two other teachers.",
    "extra": "Mr Harlow told you last week: “I have found something terrible about this school.”",
    "s": {
     "why": "I worked with Mr Harlow for ten years. He was a good teacher, but he didn’t have many friends.",
     "t1": "At 9:05 I saw him walking to the piano room. He looked worried. He was holding a blue folder.",
     "t2": "I was serving drinks to the guests in the main hall with two other teachers.",
     "extra": "Mr Harlow told me last week: “I have found something terrible about this school.”"
    }
   },
   {
    "name": "Sam Ortiz",
    "role": "Caretaker",
    "culprit": false,
    "why": "Mr Harlow was always kind to you. You are very sad.",
    "t1": "At 8:50 you heard him arguing with Mr Grant near the office. Mr Harlow shouted: “Tonight, everyone will know the truth!”",
    "t2": "You were in the kitchen. When the lights went out, you ran to the main light switch. It is next to Mr Grant’s office. Someone turned it off by hand. It wasn’t a problem with the electricity.",
    "extra": "You saw Mr Grant come out of the piano room corridor at 9:18. He was breathing very fast.",
    "s": {
     "why": "Mr Harlow was always kind to me. I am very sad.",
     "t1": "At 8:50 I heard him arguing with Mr Grant near the office. Mr Harlow shouted: “Tonight, everyone will know the truth!”",
     "t2": "I was in the kitchen. When the lights went out, I ran to the main light switch. It is next to Mr Grant’s office. Someone turned it off by hand. It wasn’t a problem with the electricity.",
     "extra": "I saw Mr Grant come out of the piano room corridor at 9:18. He was breathing very fast."
    }
   },
   {
    "name": "Ruth Kim",
    "role": "Ex-student, now a nurse",
    "culprit": false,
    "why": "Mr Harlow wasn’t friendly, but he helped you get a place at a good university.",
    "t1": "At 9:00 he asked you for something for a headache. You gave him some tablets.",
    "t2": "You were in the toilets. You were alone.",
    "extra": "You were alone at 9:15, so people may suspect you. Stay calm.",
    "s": {
     "why": "Mr Harlow wasn’t friendly, but he helped me get a place at a good university.",
     "t1": "At 9:00 he asked me for something for a headache. I gave him some tablets.",
     "t2": "I was in the toilets. I was alone.",
     "extra": "I was alone at 9:15, so I know people may suspect me."
    }
   },
   {
    "name": "Mark Ellis",
    "role": "Ex-student, now a journalist",
    "culprit": false,
    "why": "You are writing a book about scandals in music schools.",
    "t1": "At 9:00 Mr Harlow said to you: “Meet me in the piano room at 9:30. I have a big story for you.”",
    "t2": "You were outside in the car park, talking on the phone to your editor. You can show the call on your phone.",
    "extra": "You think the ‘big story’ was in the blue folder. Where is the folder now?",
    "s": {
     "why": "I am writing a book about scandals in music schools.",
     "t1": "At 9:00 Mr Harlow said to me: “Meet me in the piano room at 9:30. I have a big story for you.”",
     "t2": "I was outside in the car park, talking on the phone to my editor. I can show the call on my phone.",
     "extra": "I think the ‘big story’ was in the blue folder. Where is the folder now?"
    }
   }
  ]
 },
 {
  "id": "cake",
  "title": "Who Took the Birthday Cake?",
  "place": "Aunt Saule’s house",
  "level": "A2–B1",
  "players": "6–8",
  "grammar": "Past simple and past continuous; questions with ‘Who…?’ and ‘What were you doing…?’",
  "intro": "It’s Aunt Saule’s 50th birthday party. At 3:00 p.m. there was a beautiful chocolate cake on the kitchen table. At 4:00 p.m. the cake was gone! There are only a few crumbs on the table. The party starts at 5:00. Somebody in the house took the cake. Who was it, and where is it now?",
  "questions": [
   "Who are you?",
   "What were you doing between 3:00 and 4:00?",
   "Who were you with?",
   "Did you see or hear anything strange?"
  ],
  "times": [
   "3:00–3:30",
   "3:30–4:00"
  ],
  "clues": [
   "There is chocolate cake on the garage floor.",
   "A receipt from ‘Sweet Dreams Cake Shop’ was found in a jacket. Time: 3:52 p.m.",
   "Grandpa says the TV was off all afternoon."
  ],
  "solution": "Uncle Ruslan took the cake. He said he was watching football, but Grandpa was asleep in the living room and the TV was off. Grandpa heard a crash in the kitchen at 3:30. Zara’s video and Mrs Petrova show Ruslan’s car leaving at 3:35 and coming back at 4:05. The broken cake is in the garage, and the receipt shows he bought a new cake at 3:52. It’s arriving at 4:30!",
  "chars": [
   {
    "name": "Aunt Saule",
    "role": "The birthday woman",
    "culprit": false,
    "why": "You are 50 today!",
    "t1": "You were at the hairdresser’s in town.",
    "t2": "You were still at the hairdresser’s. You came home at 4:10. The hairdresser can tell everyone.",
    "extra": "You can ask the hairdresser to phone and confirm your story.",
    "s": {
     "why": "I am 50 today!",
     "t1": "I was at the hairdresser’s in town.",
     "t2": "I was still at the hairdresser’s. I came home at 4:10. The hairdresser can tell everyone.",
     "extra": "I can ask the hairdresser to phone and confirm my story."
    }
   },
   {
    "name": "Uncle Ruslan",
    "role": "Saule’s brother",
    "culprit": true,
    "why": "You are helping with the party.",
    "t1": "THE TRUTH: you picked up the cake to move it, but you dropped it on the floor! YOU MUST SAY: “I was watching football on TV in the living room.”",
    "t2": "THE TRUTH: you put the broken cake in the garage and drove to the cake shop to buy a new one. It will arrive at 4:30. YOU MUST SAY: “I was still watching football.”",
    "extra": "You took the cake! Don’t tell anyone. You are embarrassed.",
    "s": {
     "why": "I am helping with the party.",
     "t1": "I was watching football on TV in the living room.",
     "t2": "I was still watching football.",
     "extra": "Maybe it was Dima. Look at his face!"
    }
   },
   {
    "name": "Dima",
    "role": "Saule’s nephew, 10 years old",
    "culprit": false,
    "why": "You love chocolate.",
    "t1": "You were eating chocolates from a box in your bedroom. Your face is still brown with chocolate!",
    "t2": "You were making a funny video in the garden with your cousin Zara.",
    "extra": "Everyone thinks it was you because of your face. It wasn’t!",
    "s": {
     "why": "I love chocolate.",
     "t1": "I was eating chocolates from a box in my bedroom. My face is still brown with chocolate!",
     "t2": "I was making a funny video in the garden with my cousin Zara.",
     "extra": "Everyone thinks it was me because of my face. It wasn’t!"
    }
   },
   {
    "name": "Grandpa Bolat",
    "role": "Saule’s father",
    "culprit": false,
    "why": "You are 80 and you love quiet afternoons.",
    "t1": "You were sleeping on the sofa in the living room. The TV was OFF. You can’t sleep with the TV on.",
    "t2": "You were still sleeping on the sofa. Nobody else was in the living room.",
    "extra": "At about 3:30 the kitchen made a loud noise, like something falling. It woke you for a second.",
    "s": {
     "why": "I am 80 and I love quiet afternoons.",
     "t1": "I was sleeping on the sofa in the living room. The TV was OFF. I can’t sleep with the TV on.",
     "t2": "I was still sleeping on the sofa. Nobody else was in the living room.",
     "extra": "At about 3:30 the kitchen made a loud noise, like something falling. It woke me for a second."
    }
   },
   {
    "name": "Zara",
    "role": "Saule’s niece, a teenager",
    "culprit": false,
    "why": "You love making videos for social media.",
    "t1": "You were blowing up balloons in the garden with Aunt Aliya.",
    "t2": "You were making a funny video in the garden with Dima.",
    "extra": "In the corner of your video, at 3:36, Uncle Ruslan’s car is driving away from the house.",
    "s": {
     "why": "I love making videos for social media.",
     "t1": "I was blowing up balloons in the garden with Aunt Aliya.",
     "t2": "I was making a funny video in the garden with Dima.",
     "extra": "In the corner of my video, at 3:36, Uncle Ruslan’s car is driving away from the house."
    }
   },
   {
    "name": "Aunt Aliya",
    "role": "Ruslan’s wife",
    "culprit": false,
    "why": "You are decorating the house for the party.",
    "t1": "You were blowing up balloons in the garden with Zara.",
    "t2": "You were putting balloons on the front door.",
    "extra": "You noticed chocolate on Ruslan’s shoe at 4:05. He said it was mud.",
    "s": {
     "why": "I am decorating the house for the party.",
     "t1": "I was blowing up balloons in the garden with Zara.",
     "t2": "I was putting balloons on the front door.",
     "extra": "I noticed chocolate on Ruslan’s shoe at 4:05. He said it was mud."
    }
   },
   {
    "name": "Mrs Petrova",
    "role": "The neighbour",
    "culprit": false,
    "why": "You were invited to the party.",
    "t1": "You were working in your garden next door.",
    "t2": "You saw Ruslan’s car leave the house at 3:35 and come back at 4:05. He was driving fast.",
    "extra": "You know everything that happens on this street!",
    "s": {
     "why": "I was invited to the party.",
     "t1": "I was working in my garden next door.",
     "t2": "I saw Ruslan’s car leave the house at 3:35 and come back at 4:05. He was driving fast.",
     "extra": "I know everything that happens on this street!"
    }
   },
   {
    "name": "Kostya",
    "role": "The party photographer",
    "culprit": false,
    "why": "You came early to take photos of the house.",
    "t1": "You weren’t there. You arrived at 3:45.",
    "t2": "At 3:50 you took a photo of the kitchen. The table is empty and the garage door is open.",
    "extra": "Your photos show the time they were taken.",
    "s": {
     "why": "I came early to take photos of the house.",
     "t1": "I wasn’t there. I arrived at 3:45.",
     "t2": "At 3:50 I took a photo of the kitchen. The table is empty and the garage door is open.",
     "extra": "My photos show the time they were taken."
    }
   }
  ]
 }
];
