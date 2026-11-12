INTELLECT FIRST ACADEMY - STANDALONE WEBSITE AND APPS
Slim copy (under 10 MB) of the site as published on 30 October 2026.
Left out to save space: the gallery videos, the listening audio for the
tests and the Kazakh lesson audio. Photos and pronunciation clips are
reduced in quality. Use the full package for the complete site.

WHAT IS HERE
  index.html        Main academy website (EN / RU / KK)
  app/              Apps launcher (IF Academy Apps)
  login/            Sign-in page for class and staff access codes
  materials/        Lesson materials (locked)
  a/<app-name>/     43 apps: test centres, vocabulary arenas, games,
                    Kazakh and Russian courses, IELTS tools, admin
  media/  brand/    Photos, videos, logo and icons
  a/_shared/        Scripts used by several apps, stored once
  if-runtime.js     Replaces the Claude database: data is saved in the
                    visitor's own browser (localStorage)
  if-lock.js, keys.json   Access-code lock for student and staff pages
  sw.js, manifest.webmanifest   Offline support / install as an app

HOW TO RUN
  Upload the whole folder, unchanged, to any static web host
  (your own domain, Netlify, GitHub Pages, Cloudflare Pages).
  To test on a computer: open a terminal in this folder, run
      python -m http.server 8000
  and visit http://localhost:8000
  Double-clicking index.html opens the main page, but several apps
  need a web server to load their data files.

GOOD TO KNOW
  - No page depends on claude.ai. Fonts load from Google Fonts.
  - Test centres, materials, teacher dashboard and admin are encrypted
    and open only with the class code or staff code.
  - Data is stored per device. There is no shared database or real
    login yet; that needs a backend.
  - AI writing marking does not work outside Claude.
