// IF Academy prices for the Telegram bot (/prices, "💰 Prices") and the bot's AI assistant.
// From the 2026–27 brochure: "from" prices per programme (exact price on request), plus the exact prices of the
// individual lesson packages with a local teacher (60 minutes) — the bigger the package, the lower the price per lesson.
export const PACKAGES = [
  { n: 1, price: 8500, en: 'Single lesson', ru: 'Разовое занятие' },
  { n: 8, price: 60000, en: '8 lessons a month (2 a week)', ru: '8 занятий в месяц (2 в неделю)' },
  { n: 12, price: 80000, en: '12 lessons a month (3 a week)', ru: '12 занятий в месяц (3 в неделю)' },
  { n: 16, price: 100000, en: '16 lessons a month (4 a week)', ru: '16 занятий в месяц (4 в неделю)' }
];
export const FROM = [
  { en: 'General English, mini-group', ru: 'General English, мини-группа', from: 30000, per: { en: 'a month', ru: 'в месяц' } },
  { en: 'IELTS preparation', ru: 'Подготовка к IELTS', from: 75000, per: { en: 'a month', ru: 'в месяц' } },
  { en: 'Couple lessons (2 students)', ru: 'Занятия в паре (2 ученика)', from: 50000, per: { en: 'per person a month', ru: 'с человека в месяц' } },
  { en: 'Individual, native speaker', ru: 'Индивидуально, носитель языка', from: 80000, per: { en: 'a month', ru: 'в месяц' } },
  { en: 'Intensive programmes', ru: 'Интенсивы', from: 99000, per: { en: 'whole course', ru: 'за курс' } },
  { en: 'Room rental', ru: 'Аренда помещения', from: 10000, per: { en: 'an hour', ru: 'в час' } }
];
const t = n => Math.round(n).toLocaleString('en-US').replace(/,/g, ' ') + ' ₸';

export function priceText(lang = 'ru') {
  const en = lang === 'en';
  const pk = PACKAGES.map(p => {
    const each = p.price / p.n, save = p.n > 1 ? Math.round((1 - each / PACKAGES[0].price) * 100) : 0;
    return `• ${en ? p.en : p.ru}: ${t(p.price)}${p.n > 1 ? ` — ${t(each)} ${en ? 'a lesson' : 'за занятие'} (−${save}%)` : ''}`;
  }).join('\n');
  const fr = FROM.map(f => `• ${en ? f.en : f.ru}: ${en ? 'from' : 'от'} ${t(f.from)} ${f.per[en ? 'en' : 'ru']}`).join('\n');
  return en
    ? `💰 IF Academy prices 2026–27\n\n👤 Individual lessons with a local teacher (60 min)\n${pk}\nThe bigger the package, the lower the price per lesson.\n\n📚 Other programmes\n${fr}\n\nYour exact price depends on the programme and schedule — ask us for a personal offer. Every programme starts with a free placement test.`
    : `💰 Цены IF Academy 2026–27\n\n👤 Индивидуальные занятия с местным преподавателем (60 мин)\n${pk}\nЧем больше пакет, тем ниже цена за занятие.\n\n📚 Другие программы\n${fr}\n\nТочная цена зависит от программы и расписания — спросите нас о персональном предложении. Каждая программа начинается с бесплатного тестирования уровня.`;
}
export const priceButtons = lang => ({ inline_keyboard: [
  [{ text: lang === 'en' ? '💬 Ask for your exact price' : '💬 Узнать точную цену', url: 'https://t.me/abliem?text=' + encodeURIComponent(lang === 'en' ? 'Hello! I would like to know the price.' : 'Здравствуйте! Хочу узнать цену.') }],
  [{ text: lang === 'en' ? '📝 Free placement test' : '📝 Бесплатный тест уровня', url: 'https://intellectfirst.com/a/placement-test/' }],
  [{ text: lang === 'en' ? '🌐 All prices on the website' : '🌐 Все цены на сайте', url: 'https://intellectfirst.com/#pricing' }]
] });
/** For the AI assistant: the exact prices it may quote. */
export const PRICE_KB = `## exact prices the assistant may quote (individual lessons with a local teacher, 60 minutes)\n${PACKAGES.map(p => `- ${p.en}: ${t(p.price)}${p.n > 1 ? ` (${t(p.price / p.n)} a lesson)` : ''}`).join('\n')}\nAll other programmes: only the "from" prices; exact price on request.`;
