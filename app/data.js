/* IF English: everything on the site, organised. Each item: id, s (section), t (title), d (description), lv (levels), tr (track),
   tags (for filters and search), href, icon. Sections: vocab, grammar, games, tests, ielts, kids, more. */
window.IFX_DIR = [
  /* ---------- vocabulary courses (IF English Vocabulary Arenas, by level, book and exam) ---------- */
  { id: 'voc-a1', s: 'vocab', t: 'English File Elementary vocabulary (A1)', d: 'Every Student\'s Book unit: beginner words with pictures, sounds and games', lv: ['A1'], tr: 'general', tags: ['general', 'level', 'book', 'ef'], href: '/a/if-english/courses/A1/index.html', icon: '🌱' },
  { id: 'voc-a2', s: 'vocab', t: 'English File Pre-intermediate vocabulary (A2)', d: 'Every Student\'s Book unit: everyday vocabulary, unit by unit', lv: ['A2'], tr: 'general', tags: ['general', 'level', 'book', 'ef'], href: '/a/if-english/courses/A2/index.html', icon: '🌿' },
  { id: 'voc-b1', s: 'vocab', t: 'English File Intermediate vocabulary (B1)', d: 'Every Student\'s Book unit: topic vocabulary and collocations', lv: ['B1'], tr: 'general', tags: ['general', 'level', 'book', 'ef'], href: '/a/if-english/courses/B1/index.html', icon: '🌳' },
  { id: 'voc-b2', s: 'vocab', t: 'English File Upper-intermediate vocabulary (B2)', d: 'Every Student\'s Book unit: words for opinions and discussion', lv: ['B2'], tr: 'general', tags: ['general', 'level', 'book', 'ef'], href: '/a/if-english/courses/B2/index.html', icon: '🌲' },
  { id: 'voc-c1', s: 'vocab', t: 'English File Advanced vocabulary (C1)', d: 'Every Student\'s Book unit: precise and academic vocabulary', lv: ['C1'], tr: 'general', tags: ['general', 'level', 'book', 'ef'], href: '/a/if-english/courses/C1/index.html', icon: '🏔️' },
  { id: 'voc-tb1', s: 'vocab', t: 'English for Teenagers B1 vocabulary', d: 'Every unit of English for Teenagers B1–B2', lv: ['B1'], tr: 'general', tags: ['book', 'teens'], href: '/a/if-english/courses/TeensB1/index.html', icon: '🎧' },
  { id: 'voc-tb2', s: 'vocab', t: 'English for Teenagers B2 vocabulary', d: 'Every unit of English for Teenagers B2–C1', lv: ['B2'], tr: 'general', tags: ['book', 'teens'], href: '/a/if-english/courses/TeensB2/index.html', icon: '🎮' },
  { id: 'voc-ket', s: 'vocab', t: 'KET (A2 Key) vocabulary', d: 'The Cambridge A2 Key word list, unit by unit', lv: ['A2'], tr: 'exam', tags: ['exam', 'cambridge', 'ket'], href: '/a/if-english/courses/KET/index.html', icon: '🔑' },
  { id: 'voc-pet', s: 'vocab', t: 'PET (B1 Preliminary) vocabulary', d: 'The Cambridge B1 Preliminary word list, unit by unit', lv: ['B1'], tr: 'exam', tags: ['exam', 'cambridge', 'pet'], href: '/a/if-english/courses/PET/index.html', icon: '🎯' },
  { id: 'voc-ielts', s: 'vocab', t: 'IELTS vocabulary', d: 'Topic vocabulary for IELTS Writing and Speaking', lv: ['B2', 'C1'], tr: 'exam', tags: ['exam', 'ielts'], href: '/a/if-english/courses/IELTS/index.html', icon: '🎓' },
  { id: 'band9', s: 'vocab', t: 'Band 9 Lexis', d: 'High-scoring IELTS words and collocations by topic', lv: ['B2', 'C1'], tr: 'exam', tags: ['exam', 'ielts'], href: '/a/band9-lexis/index.html', icon: '💎' },
  { id: 'voc-movers', s: 'vocab', t: 'Movers vocabulary', d: 'Cambridge A1 Movers words for children', lv: ['A1'], tr: 'kids', tags: ['kids', 'cambridge'], href: '/a/if-english/courses/Movers/index.html', icon: '🐯' },
  { id: 'voc-flyers', s: 'vocab', t: 'Flyers vocabulary', d: 'Cambridge A2 Flyers words for children', lv: ['A2'], tr: 'kids', tags: ['kids', 'cambridge'], href: '/a/if-english/courses/Flyers/index.html', icon: '🦅' },

  /* ---------- grammar ---------- */
  { id: 'gram-centre', s: 'grammar', t: 'IF Grammar Game Centre', d: 'Grammar in Use units as games, from tenses to reported speech', lv: ['B1', 'B2', 'C1'], tr: 'general', tags: ['book', 'game'], href: '/a/grammar-game-centre/index.html', icon: '🧩' },
  { id: 'giu-quest', s: 'grammar', t: 'Grammar in Use Quest', d: 'A quest through the intermediate grammar units', lv: ['B1', 'B2'], tr: 'general', tags: ['book', 'game'], href: '/a/grammar-in-use-quest/index.html', icon: '🗺️' },
  { id: 'skill-games', s: 'grammar', t: 'IF Skill Games', d: 'Spot the error, build the sentence, choose the precise word', lv: ['A2', 'B1', 'B2', 'C1'], tr: 'general', tags: ['game', 'daily'], href: '/a/skill-games/index.html', icon: '⚡' },

  /* ---------- games ---------- */
  { id: 'live', s: 'games', t: 'IF Live', d: 'Class games on the big screen: join with a PIN — or practise alone with AI questions', lv: ['A1', 'A2', 'B1', 'B2', 'C1'], tr: 'general', tags: ['class', 'vocabulary', 'grammar', 'ai'], href: '/live/', icon: '📡' },
  { id: 'gameroom', s: 'games', t: 'IF Game Room', d: 'Arcade games on your own vocabulary', lv: ['A1', 'A2', 'B1', 'B2', 'C1'], tr: 'general', tags: ['vocabulary'], href: '/a/if-english/gameroom/index.html', icon: '🕹️' },
  { id: 'g-skill', s: 'games', t: 'IF Skill Games', d: 'Quick daily grammar and word workouts', lv: ['A2', 'B1', 'B2', 'C1'], tr: 'general', tags: ['grammar', 'vocabulary'], href: '/a/skill-games/index.html', icon: '⚡' },
  { id: 'g-gram', s: 'games', t: 'Grammar Game Centre', d: 'Grammar in Use as games', lv: ['B1', 'B2', 'C1'], tr: 'general', tags: ['grammar'], href: '/a/grammar-game-centre/index.html', icon: '🧩' },
  { id: 'g-giu', s: 'games', t: 'Grammar in Use Quest', d: 'Grammar adventure', lv: ['B1', 'B2'], tr: 'general', tags: ['grammar'], href: '/a/grammar-in-use-quest/index.html', icon: '🗺️' },
  { id: 'ket-boost', s: 'games', t: 'KET Booster Arcade', d: '16 units of A2 Key games', lv: ['A2'], tr: 'exam', tags: ['ket', 'vocabulary', 'grammar'], href: '/a/ket-booster/index.html', icon: '🚀' },
  { id: 'ket-quest', s: 'games', t: 'KET Quest Arena', d: '48 lesson games for A2 Key', lv: ['A2'], tr: 'exam', tags: ['ket', 'vocabulary', 'grammar'], href: '/a/ket-quest/index.html', icon: '🏆' },
  { id: 'pet-arcade', s: 'games', t: 'PET Arcade', d: 'B1 Preliminary arcade games', lv: ['B1'], tr: 'exam', tags: ['pet', 'vocabulary', 'grammar'], href: '/a/pet-arcade/index.html', icon: '👾' },
  { id: 'pet-quest', s: 'games', t: 'PET Quest', d: 'Team game for B1 Preliminary classes', lv: ['B1'], tr: 'exam', tags: ['pet', 'class'], href: '/a/pet-quest/index.html', icon: '⚔️' },
  { id: 'flyers-arcade', s: 'games', t: 'Flyers Arcade', d: 'Games for Cambridge A2 Flyers', lv: ['A2'], tr: 'kids', tags: ['kids', 'vocabulary'], href: '/a/flyers-arcade/index.html', icon: '🦅' },
  { id: 'kids-quest', s: 'games', t: 'IF Kids Quest', d: 'Story adventure: Rainbow Valley to Star Station — kart race and word mine, Starters to Flyers', lv: ['A1', 'A2'], tr: 'kids', tags: ['kids', 'vocabulary', 'cambridge'], href: '/a/kids-quest/', icon: '🏎️' },
  { id: 'yl-games', s: 'games', t: 'Young Learners games', d: 'Memory, balloons, spelling and speed games for Starters, Movers and Flyers', lv: ['A1', 'A2'], tr: 'kids', tags: ['kids', 'vocabulary'], href: '/a/young-learners/', icon: '🎈' },
  { id: 'kids-english', s: 'games', t: 'IF Kids English', d: 'Playful English for young children', lv: ['A1'], tr: 'kids', tags: ['kids', 'vocabulary'], href: '/a/kids-english/index.html', icon: '🧸' },

  /* ---------- tests ---------- */
  { id: 'placement', s: 'tests', t: 'Placement test', d: 'Find your level in about 20 minutes', lv: ['A1', 'A2', 'B1', 'B2', 'C1'], tr: 'general', tags: ['level'], href: '/a/placement-test/index.html', icon: '🧭', feature: true },
  { id: 'test-centre', s: 'tests', t: 'IF Test Centre', d: 'All tests in one place, with results saved to your account', lv: ['A1', 'A2', 'B1', 'B2', 'C1'], tr: 'general', tags: ['all'], href: '/tests/', icon: '📝' },
  { id: 'ef-a1', s: 'tests', t: 'English File Elementary tests', d: 'Unit and progress tests', lv: ['A1'], tr: 'general', tags: ['book'], href: '/a/ef-a1-tests/index.html', icon: '📗' },
  { id: 'ef-a2', s: 'tests', t: 'English File Pre-intermediate tests', d: 'Unit and progress tests', lv: ['A2'], tr: 'general', tags: ['book'], href: '/a/ef-a2-tests/index.html', icon: '📘' },
  { id: 'ef-b1', s: 'tests', t: 'English File Intermediate tests', d: 'Unit and progress tests', lv: ['B1'], tr: 'general', tags: ['book'], href: '/a/ef-b1-tests/index.html', icon: '📙' },
  { id: 'ef-b2', s: 'tests', t: 'English File Upper-intermediate tests', d: 'Unit and progress tests', lv: ['B2'], tr: 'general', tags: ['book'], href: '/a/ef-b2-tests/index.html', icon: '📕' },
  { id: 'ef-c1', s: 'tests', t: 'English File Advanced tests', d: 'Unit and progress tests', lv: ['C1'], tr: 'general', tags: ['book'], href: '/a/ef-c1-tests/index.html', icon: '📓' },
  { id: 'teens-b1', s: 'tests', t: 'English for Teenagers B1–B2 tests', d: 'Book unit tests for teens', lv: ['B1'], tr: 'general', tags: ['book', 'teens'], href: '/a/teens-b1-tests/index.html', icon: '🧑‍🎓' },
  { id: 'teens-b2', s: 'tests', t: 'English for Teenagers B2–C1 tests', d: 'Book unit tests for teens', lv: ['B2'], tr: 'general', tags: ['book', 'teens'], href: '/a/teens-b2-tests/index.html', icon: '🧑‍🎓' },
  { id: 'pet-tests', s: 'tests', t: 'PET (B1 Preliminary) tests', d: 'Practice tests for the Cambridge B1 exam', lv: ['B1'], tr: 'exam', tags: ['cambridge', 'pet'], href: '/a/pet-tests/index.html', icon: '🎯' },
  { id: 'starters-t', s: 'tests', t: 'Starters tests', d: 'Pre A1 Starters practice tests with listening', lv: ['A1'], tr: 'kids', tags: ['kids', 'cambridge'], href: '/a/starters-tests/', icon: '⭐' },
  { id: 'movers-t', s: 'tests', t: 'Movers tests', d: 'A1 Movers practice tests with listening', lv: ['A1'], tr: 'kids', tags: ['kids', 'cambridge'], href: '/a/movers-tests/', icon: '🐯' },
  { id: 'flyers-t', s: 'tests', t: 'Flyers tests', d: 'A2 Flyers practice tests with listening', lv: ['A2'], tr: 'kids', tags: ['kids', 'cambridge'], href: '/a/flyers-tests/', icon: '🦅' },
  { id: 'ielts-tests', s: 'tests', t: 'IELTS practice tests', d: 'Reading, Listening and Writing practice with AI marking', lv: ['B2', 'C1'], tr: 'exam', tags: ['ielts'], href: '/a/ielts/index.html', icon: '🎓' },

  /* ---------- IELTS practice tools (the lessons are an IF English course) ---------- */
  { id: 'ielts-studio', s: 'ielts', t: 'IF IELTS Studio', d: 'Writing practice, Task 1 charts, the Language and Vocabulary banks (PDF)', lv: ['B1', 'B2', 'C1'], tr: 'exam', tags: ['ielts', 'writing'], href: '/a/ielts-studio/index.html', icon: '✍️' },
  { id: 'ielts-speaking', s: 'ielts', t: 'IELTS Speaking Lab', d: 'Parts 1, 2 and 3 with model answers and timing', lv: ['B1', 'B2', 'C1'], tr: 'exam', tags: ['ielts', 'speaking'], href: '/a/ielts-speaking/index.html', icon: '🎤' },
  { id: 'ielts-centre', s: 'ielts', t: 'IELTS Centre', d: 'Full practice tests and your band scores', lv: ['B2', 'C1'], tr: 'exam', tags: ['ielts', 'tests'], href: '/a/ielts/index.html', icon: '🏛️' },

  /* ---------- young learners ---------- */
  { id: 'yl', s: 'kids', t: 'Young Learners Centre', d: 'Starters, Movers and Flyers: tests, games and live games', lv: ['A1', 'A2'], tr: 'kids', tags: ['kids', 'cambridge'], href: '/a/young-learners/', icon: '🧸' },

  /* ---------- more ---------- */
  { id: 'materials', s: 'more', t: 'Lesson materials', d: 'Course books, lesson slides and worksheets from your classes', lv: [], tr: 'general', tags: ['class'], href: '/materials/index.html', icon: '📚' },
  { id: 'timetable', s: 'more', t: 'Class timetable', d: 'IF Academy groups and times', lv: [], tr: 'other', tags: ['school'], href: '/a/class-catalog/index.html', icon: '🗓️' }
];
