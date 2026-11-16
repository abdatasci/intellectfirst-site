/* IF App: everything on the site, organised. Each item: id, s (section), t (title), d (description), lv (levels), tr (track),
   tags (for filters and search), href, icon. Sections: vocab, grammar, games, tests, ielts, kids, more. */
window.IFX_DIR = [
  /* ---------- vocabulary courses (IF App Vocabulary Arenas, by level, book and exam) ---------- */
  { id: 'voc-a1', s: 'vocab', t: 'English File Elementary vocabulary (A1)', d: 'Every Student\'s Book unit: beginner words with pictures, sounds and games', lv: ['A1'], tr: 'general', tags: ['general', 'level', 'book', 'ef', 'teens', 'adults'], href: '/a/if-english/courses/A1/index.html', icon: '🌱' },
  { id: 'voc-a2', s: 'vocab', t: 'English File Pre-intermediate vocabulary (A2)', d: 'Every Student\'s Book unit: everyday vocabulary, unit by unit', lv: ['A2'], tr: 'general', tags: ['general', 'level', 'book', 'ef', 'teens', 'adults'], href: '/a/if-english/courses/A2/index.html', icon: '🌿' },
  { id: 'voc-b1', s: 'vocab', t: 'English File Intermediate vocabulary (B1)', d: 'Every Student\'s Book unit: topic vocabulary and collocations', lv: ['B1'], tr: 'general', tags: ['general', 'level', 'book', 'ef', 'teens', 'adults'], href: '/a/if-english/courses/B1/index.html', icon: '🌳' },
  { id: 'voc-b2', s: 'vocab', t: 'English File Upper-intermediate vocabulary (B2)', d: 'Every Student\'s Book unit: words for opinions and discussion', lv: ['B2'], tr: 'general', tags: ['general', 'level', 'book', 'ef', 'teens', 'adults'], href: '/a/if-english/courses/B2/index.html', icon: '🌲' },
  { id: 'voc-c1', s: 'vocab', t: 'English File Advanced vocabulary (C1)', d: 'Every Student\'s Book unit: precise and academic vocabulary', lv: ['C1'], tr: 'general', tags: ['general', 'level', 'book', 'ef', 'teens', 'adults'], href: '/a/if-english/courses/C1/index.html', icon: '🏔️' },
  { id: 'voc-tb1', s: 'vocab', t: 'English for Teenagers B1 vocabulary', d: 'Every unit of English for Teenagers B1–B2', lv: ['B1'], tr: 'general', tags: ['book', 'teens'], href: '/a/if-english/courses/TeensB1/index.html', icon: '🎧' },
  { id: 'voc-tb2', s: 'vocab', t: 'English for Teenagers B2 vocabulary', d: 'Every unit of English for Teenagers B2–C1', lv: ['B2'], tr: 'general', tags: ['book', 'teens'], href: '/a/if-english/courses/TeensB2/index.html', icon: '🎮' },
  { id: 'voc-ielts', s: 'vocab', t: 'IELTS vocabulary', d: 'Topic vocabulary for IELTS Writing and Speaking', lv: ['B2', 'C1'], tr: 'exam', tags: ['exam', 'ielts'], href: '/a/if-english/courses/IELTS/index.html', icon: '🎓' },
  { id: 'band9', s: 'vocab', t: 'Band 9 Lexis', d: 'High-scoring IELTS words and collocations by topic', lv: ['B2', 'C1'], tr: 'exam', tags: ['exam', 'ielts'], href: '/a/band9-lexis/index.html', icon: '💎' },
  { id: 'voc-starters', s: 'vocab', t: 'Starters vocabulary', d: 'Cambridge Pre A1 Starters words for children: 15 topics with audio, games and Russian', lv: ['A1'], tr: 'kids', tags: ['kids', 'cambridge', 'starters'], href: '/a/if-english/courses/Starters/index.html', icon: '⭐' },
  { id: 'voc-movers', s: 'vocab', t: 'Movers vocabulary', d: 'Cambridge A1 Movers words for children', lv: ['A1'], tr: 'kids', tags: ['kids', 'cambridge'], href: '/a/if-english/courses/Movers/index.html', icon: '🐯' },
  { id: 'voc-flyers', s: 'vocab', t: 'Flyers vocabulary', d: 'Cambridge A2 Flyers words for children', lv: ['A2'], tr: 'kids', tags: ['kids', 'cambridge'], href: '/a/if-english/courses/Flyers/index.html', icon: '🦅' },
  { id: 'voc-ket', s: 'vocab', t: 'KET (A2 Key) vocabulary', d: 'The Cambridge A2 Key word list, unit by unit', lv: ['A2'], tr: 'exam', tags: ['exam', 'cambridge', 'ket', 'kids'], href: '/a/if-english/courses/KET/index.html', icon: '🔑' },
  { id: 'voc-pet', s: 'vocab', t: 'PET (B1 Preliminary) vocabulary', d: 'The Cambridge B1 Preliminary word list, unit by unit', lv: ['B1'], tr: 'exam', tags: ['exam', 'cambridge', 'pet', 'kids'], href: '/a/if-english/courses/PET/index.html', icon: '🎯' },

  /* ---------- grammar ---------- */
  { id: 'gram-centre', s: 'grammar', t: 'IF Grammar Arena', d: 'Grammar in Use as games: follow the Quest unit by unit, or practise any unit with the game you like', lv: ['A1', 'A2', 'B1', 'B2', 'C1'], tr: 'general', tags: ['book', 'game', 'teens', 'adults', 'general', 'ielts'], href: '/a/grammar-arena/', icon: '🧩' },

  /* ---------- games ---------- */
  { id: 'live', s: 'games', t: 'IF Live', d: 'Choose your level and topic and play straight away; in class, join your teacher\'s game', lv: ['A1', 'A2', 'B1', 'B2', 'C1'], tr: 'general', tags: ['class', 'vocabulary', 'grammar', 'ai', 'teens', 'adults', 'business', 'ielts'], href: '/live/', icon: '📡' },
  { id: 'gameroom', s: 'games', t: 'Board & mystery games', d: 'For the class: Mafia, murder mysteries, Alibi, riddles, board and card games', lv: ['A1', 'A2', 'B1', 'B2', 'C1'], tr: 'general', tags: ['class', 'teens', 'adults', 'ielts'], href: '/a/if-english/gameroom/index.html', icon: '🕵️' },
  { id: 'mind-lab', s: 'games', t: 'IF Mind Lab', d: 'Brain-training games for teens and adults: focus, reading speed, listening, spelling, vocabulary, grammar and speaking, B1–C2', lv: ['B1', 'B2', 'C1', 'C2'], tr: 'general', tags: ['vocabulary', 'grammar', 'teens', 'daily', 'adults', 'general', 'business', 'ielts', 'brain'], href: '/a/mind-lab/', icon: '🧠' },
  { id: 'ket-boost', s: 'archive', t: 'KET Booster Arcade', d: '16 units of A2 Key games', lv: ['A2'], tr: 'exam', tags: ['ket', 'vocabulary', 'grammar'], href: '/a/ket-booster/index.html', icon: '🚀' },
  { id: 'ket-quest', s: 'archive', t: 'KET Quest Arena', d: '48 lesson games for A2 Key', lv: ['A2'], tr: 'exam', tags: ['ket', 'vocabulary', 'grammar'], href: '/a/ket-quest/index.html', icon: '🏆' },
  { id: 'pet-arcade', s: 'archive', t: 'PET Arcade', d: 'B1 Preliminary arcade games', lv: ['B1'], tr: 'exam', tags: ['pet', 'vocabulary', 'grammar'], href: '/a/pet-arcade/index.html', icon: '👾' },
  { id: 'pet-quest', s: 'archive', t: 'PET Quest', d: 'Team game for B1 Preliminary classes', lv: ['B1'], tr: 'exam', tags: ['pet', 'class'], href: '/a/pet-quest/index.html', icon: '⚔️' },
  { id: 'flyers-arcade', s: 'archive', t: 'Flyers Arcade', d: 'Games for Cambridge A2 Flyers', lv: ['A2'], tr: 'kids', tags: ['kids', 'vocabulary'], href: '/a/flyers-arcade/index.html', icon: '🦅' },
  { id: 'if-kart', s: 'games', t: 'IF Kart 3D', d: '3D kart race: drive through the gift boxes, answer in English and get a turbo — Starters, Movers, Flyers, A2 Key, B1 PET', lv: ['A1', 'A2', 'B1'], tr: 'kids', tags: ['kids', 'ket', 'pet', 'vocabulary', 'grammar', 'race', '3d', 'cambridge'], href: '/a/if-kart/', icon: '🏎️' },
  { id: 'kart-ket', s: 'games', t: 'IF Kart 3D · A2 Key', d: '3D kart race with A2 Key words and sentences', lv: ['A2'], tr: 'exam', tags: ['ket', 'race', '3d'], href: '/a/if-kart/?level=ket', icon: '🏁' },
  { id: 'kart-pet', s: 'games', t: 'IF Kart 3D · B1 PET', d: '3D kart race with B1 Preliminary words and sentences', lv: ['B1'], tr: 'exam', tags: ['pet', 'race', '3d'], href: '/a/if-kart/?level=pet', icon: '🏁' },
  { id: 'bq-ket', s: 'games', t: 'Block Quest · A2 Key', d: '3D block world: mine glowing word blocks and run the Grammar Obby with A2 Key questions', lv: ['A2'], tr: 'exam', tags: ['ket', 'vocabulary', 'grammar', '3d'], href: '/a/block-quest/?level=A2', icon: '⛏️' },
  { id: 'obby-ket', s: 'games', t: 'Grammar Obby · A2 Key', d: '3D parkour in the sky: jump onto the platform with the right answer — wrong ones fall!', lv: ['A2'], tr: 'exam', tags: ['ket', 'grammar', '3d'], href: '/a/block-quest/?level=A2&mode=obby', icon: '🏃' },
  { id: 'kq-ket', s: 'games', t: 'Kids Quest · A2 Key race', d: 'Kart race and word mine in Big City Trip and Music Festival', lv: ['A2'], tr: 'exam', tags: ['ket', 'grammar', 'race'], href: '/a/kids-quest/?level=KET', icon: '🏎️' },
  { id: 'bq-pet', s: 'games', t: 'Block Quest · B1 PET', d: '3D block world: mine glowing word blocks and run the Grammar Obby with B1 Preliminary questions', lv: ['B1'], tr: 'exam', tags: ['pet', 'vocabulary', 'grammar', '3d'], href: '/a/block-quest/?level=B1', icon: '⛏️' },
  { id: 'obby-pet', s: 'games', t: 'Grammar Obby · B1 PET', d: '3D parkour in the sky: jump onto the platform with the right answer — wrong ones fall!', lv: ['B1'], tr: 'exam', tags: ['pet', 'grammar', '3d'], href: '/a/block-quest/?level=B1&mode=obby', icon: '🏃' },
  { id: 'kq-pet', s: 'games', t: 'Kids Quest · B1 PET race', d: 'Kart race and word mine on Treasure Island and in the Robot Lab', lv: ['B1'], tr: 'exam', tags: ['pet', 'grammar', 'race'], href: '/a/kids-quest/?level=PET', icon: '🏎️' },
  { id: 'kq-flyers', s: 'games', t: 'Kids Quest · Flyers race', d: 'Star Station and Midnight Museum: kart race, story and word mine', lv: ['A2'], tr: 'kids', tags: ['kids', 'vocabulary', 'race'], href: '/a/kids-quest/?level=Flyers', icon: '🚀' },
  { id: 'bq-kids', s: 'games', t: 'Block Quest for kids (A1)', d: '3D block world for older children: mine word blocks and jump the obby', lv: ['A1'], tr: 'kids', tags: ['kids', 'vocabulary', '3d'], href: '/a/block-quest/?level=A1', icon: '🧱' },
  { id: 'block-quest', s: 'games', t: 'IF Block Quest (3D)', d: 'Word Mine and Grammar Obby: 3D block-world games for teens and adults, A1–C2, questions from the IF App courses', lv: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'], tr: 'general', tags: ['general', 'vocabulary', 'grammar', 'teens', 'adults'], href: '/a/block-quest/', icon: '⛏️' },
  { id: 'kids-quest', s: 'games', t: 'IF Kids Quest', d: 'Story adventure with kart races and a word mine — 10 lands from Starters, Movers and Flyers to A2 Key and B1 PET', lv: ['A1', 'A2', 'B1'], tr: 'kids', tags: ['kids', 'vocabulary', 'cambridge', 'ket', 'pet'], href: '/a/kids-quest/', icon: '🏎️' },
  { id: 'yl-games', s: 'archive', t: 'Young Learners games', d: 'Memory, balloons, spelling and speed games for Starters, Movers and Flyers', lv: ['A1', 'A2'], tr: 'kids', tags: ['kids', 'vocabulary'], href: '/a/young-learners/', icon: '🎈' },
  { id: 'kids-english', s: 'archive', t: 'IF Kids English', d: 'Playful English for young children', lv: ['A1'], tr: 'kids', tags: ['kids', 'vocabulary'], href: '/a/kids-english/index.html', icon: '🧸' },

  /* ---------- tests ---------- */
  { id: 'placement', s: 'tests', t: 'Placement test', d: 'Find your level in about 20 minutes', lv: ['A1', 'A2', 'B1', 'B2', 'C1'], tr: 'general', tags: ['level'], href: '/a/placement-test/index.html', icon: '🧭', feature: true },
  { id: 'test-centre', s: 'tests', t: 'IF Test Centre', d: 'All tests in one place, with results saved to your account', lv: ['A1', 'A2', 'B1', 'B2', 'C1'], tr: 'general', tags: ['all'], href: '/tests/', icon: '📝' },
  { id: 'ef-a1', s: 'tests', t: 'English File Elementary tests', d: 'Unit and progress tests · teens and adults', lv: ['A1'], tr: 'general', tags: ['book', 'teens', 'adults'], href: '/a/ef-a1-tests/index.html', icon: '📗' },
  { id: 'ef-a2', s: 'tests', t: 'English File Pre-intermediate tests', d: 'Unit and progress tests · teens and adults', lv: ['A2'], tr: 'general', tags: ['book', 'teens', 'adults'], href: '/a/ef-a2-tests/index.html', icon: '📘' },
  { id: 'ef-b1', s: 'tests', t: 'English File Intermediate tests', d: 'Unit and progress tests · teens and adults', lv: ['B1'], tr: 'general', tags: ['book', 'teens', 'adults'], href: '/a/ef-b1-tests/index.html', icon: '📙' },
  { id: 'ef-b2', s: 'tests', t: 'English File Upper-intermediate tests', d: 'Unit and progress tests · teens and adults', lv: ['B2'], tr: 'general', tags: ['book', 'teens', 'adults'], href: '/a/ef-b2-tests/index.html', icon: '📕' },
  { id: 'ef-c1', s: 'tests', t: 'English File Advanced tests', d: 'Unit and progress tests · teens and adults', lv: ['C1'], tr: 'general', tags: ['book', 'teens', 'adults'], href: '/a/ef-c1-tests/index.html', icon: '📓' },
  { id: 'teens-b1', s: 'tests', t: 'English for Teenagers B1–B2 tests', d: 'Book unit tests for teens', lv: ['B1'], tr: 'general', tags: ['book', 'teens'], href: '/a/teens-b1-tests/index.html', icon: '🧑‍🎓' },
  { id: 'teens-b2', s: 'tests', t: 'English for Teenagers B2–C1 tests', d: 'Book unit tests for teens', lv: ['B2'], tr: 'general', tags: ['book', 'teens'], href: '/a/teens-b2-tests/index.html', icon: '🧑‍🎓' },
  { id: 'pet-tests', s: 'tests', t: 'PET (B1 Preliminary) tests', d: 'Practice tests for the Cambridge B1 exam', lv: ['B1'], tr: 'exam', tags: ['cambridge', 'pet'], href: '/a/pet-tests/index.html', icon: '🎯' },
  { id: 'starters-t', s: 'tests', t: 'Starters tests', d: 'Pre A1 Starters practice tests with listening', lv: ['A1'], tr: 'kids', tags: ['kids', 'cambridge'], href: '/a/starters-tests/', icon: '⭐' },
  { id: 'movers-t', s: 'tests', t: 'Movers tests', d: 'A1 Movers practice tests with listening', lv: ['A1'], tr: 'kids', tags: ['kids', 'cambridge'], href: '/a/movers-tests/', icon: '🐯' },
  { id: 'flyers-t', s: 'tests', t: 'Flyers tests', d: 'A2 Flyers practice tests with listening', lv: ['A2'], tr: 'kids', tags: ['kids', 'cambridge'], href: '/a/flyers-tests/', icon: '🦅' },

  /* ---------- IELTS practice tools (the lessons are an IF App course) ---------- */
  { id: 'ielts-studio', s: 'ielts', t: 'IF IELTS Studio', d: 'Writing practice, Task 1 charts, the Language and Vocabulary banks (PDF)', lv: ['B1', 'B2', 'C1'], tr: 'exam', tags: ['ielts', 'writing'], href: '/a/ielts-studio/index.html', icon: '✍️' },
  { id: 'ielts-speaking', s: 'ielts', t: 'IELTS Speaking Lab', d: 'Parts 1, 2 and 3 with model answers and timing', lv: ['B1', 'B2', 'C1'], tr: 'exam', tags: ['ielts', 'speaking'], href: '/a/ielts-speaking/index.html', icon: '🎤' },
  { id: 'ielts-centre', s: 'ielts', t: 'IELTS Centre', d: 'Full practice tests and your band scores', lv: ['B2', 'C1'], tr: 'exam', tags: ['ielts', 'tests'], href: '/a/ielts/index.html', icon: '🏛️' },

  /* ---------- young learners ---------- */
  { id: 'yl', s: 'kids', t: 'Young Learners Centre', d: 'Starters, Movers and Flyers: tests, games and live games', lv: ['A1', 'A2'], tr: 'kids', tags: ['kids', 'cambridge'], href: '/a/young-learners/', icon: '🧸' },

  /* ---------- more ---------- */
  { id: 'materials', s: 'more', t: 'Lesson materials', d: 'Course books, lesson slides and worksheets from your classes', lv: [], tr: 'general', tags: ['class'], href: '/materials/index.html', icon: '📚' },
  { id: 'timetable', s: 'more', t: 'Class timetable', d: 'IF Academy groups and times', lv: [], tr: 'other', tags: ['school'], href: '/a/class-catalog/index.html', icon: '🗓️' }
];
