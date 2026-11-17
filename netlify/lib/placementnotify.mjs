// When anyone finishes the IF Placement Test, every administrator hears about it straight away:
// a notification on their website account (bell in My IF Academy) and a message in the Telegram bot if they have linked it.
// The result itself is already saved in the "placements" list (Admin → Placement results) by placement-api.mjs.
import { getStore } from '@netlify/blobs';
import { getLinks, tgSend, tgToken, addNote } from './bot-core.mjs';

const U = () => getStore({ name: 'ielts', consistency: 'strong' });
const LV = ['Pre-A1', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const lab = v => v == null ? '' : LV[Math.floor(v)] + (v % 1 ? '+' : '');

export function placementText(e, student) {
  const sk = Object.entries(e.skills || {}).map(([k, v]) => `${k[0].toUpperCase() + k.slice(1)} ${lab(v)}`).join(' · ');
  return [`🆕 New placement result: ${e.name || 'Unnamed visitor'} → ${lab(e.overall)}`,
    sk, e.course ? `Recommended: ${e.course}` : '',
    [e.phone, e.email, e.age && 'age ' + e.age].filter(Boolean).join(' · '),
    student ? `Linked to school record: ${student.name || student.n || ''}` : 'Not a current student (new client)',
    'All results: intellectfirst.com/me/#/admin/placements'].filter(Boolean).join('\n');
}

export async function notifyPlacement(entry, student) {
  try {
    const text = placementText(entry, student), dir = (await U().get('directory', { type: 'json' })) || {}, links = await getLinks();
    for (const [uid, a] of Object.entries(dir)) {
      if (a.role !== 'admin') continue;
      await addNote(uid, { kind: 'placement', text, placementId: entry.id }).catch(() => {});
      const l = links[uid];
      if (l && l.chatId && tgToken()) await tgSend(l.chatId, text).catch(e => console.error('placement tg', e.message));
    }
  } catch (e) { console.error('placement notify', e.message); }
}
