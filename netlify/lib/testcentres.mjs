// The IF Academy test centres a teacher can send to a class as an online test (bot "📝 Send homework" and My classes).
export const SITE = 'https://intellectfirst.com';
export const CENTRES = [
  ['ef-a1', 'English File Elementary (A1)', '/a/ef-a1-tests/'],
  ['ef-a2', 'English File Pre-intermediate (A2)', '/a/ef-a2-tests/'],
  ['ef-b1', 'English File Intermediate (B1)', '/a/ef-b1-tests/'],
  ['ef-b2', 'English File Upper-intermediate (B2)', '/a/ef-b2-tests/'],
  ['ef-c1', 'English File Advanced (C1)', '/a/ef-c1-tests/'],
  ['teens-b1', 'English for Teenagers B1–B2', '/a/teens-b1-tests/'],
  ['teens-b2', 'English for Teenagers B2–C1', '/a/teens-b2-tests/'],
  ['pet', 'PET (B1 Preliminary)', '/a/pet-tests/'],
  ['yl', 'Young Learners (Starters–Flyers)', '/a/yl-tests/'],
  ['ielts', 'IELTS Centre', '/a/ielts/'],
  ['place', 'IF Placement Test', '/a/placement-test/']
];
export const centreByUrl = url => CENTRES.find(c => c[2] === url) || null;
