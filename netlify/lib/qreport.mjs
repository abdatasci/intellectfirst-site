// "Report this question" in IF App lessons: the administrators hear about it straight away
// (a note on their website account and a message in the Telegram bot if linked), so a wrong question gets fixed.
import { getStore } from '@netlify/blobs';
import { getLinks, tgSend, tgToken, addNote } from './bot-core.mjs';

const U = () => getStore({ name: 'ielts', consistency: 'strong' });
const clean = (s, n) => String(s == null ? '' : s).replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, n);

export async function reportQuestion(uid, profile, b) {
  const lesson = clean(b.lesson, 160), q = clean(b.q, 300), right = clean(b.right, 120);
  if (!lesson || !q) return { ok: false };
  // at most 20 reports a day per account, one per question
  const day = new Date().toISOString().slice(0, 10), key = `qrep/${uid}/${day}`, seen = (await U().get(key, { type: 'json' })) || [];
  const id = lesson + '|' + q.slice(0, 60);
  if (seen.length >= 20 || seen.indexOf(id) >= 0) return { ok: true, already: true };
  seen.push(id); await U().setJSON(key, seen);
  const text = ['⚑ Question reported in IF App', `${profile?.name || 'A student'} · ${lesson}`, `“${q}”`, right ? `App's answer: ${right}` : ''].filter(Boolean).join('\n');
  try {
    const dir = (await U().get('directory', { type: 'json' })) || {}, links = await getLinks();
    for (const [aid, a] of Object.entries(dir)) {
      if (a.role !== 'admin') continue;
      await addNote(aid, { kind: 'qreport', text }).catch(() => {});
      const l = links[aid];
      if (l && l.chatId && tgToken()) await tgSend(l.chatId, text).catch(e => console.error('qreport tg', e.message));
    }
  } catch (e) { console.error('qreport', e.message); }
  return { ok: true };
}
