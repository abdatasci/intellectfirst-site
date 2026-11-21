// IF Admin on the website (admins only).
//   GET  /api/ifadmin/app            → the IF Admin app (decrypted with the lesson content key)
//   GET  /api/ifadmin/all            → every collection {students, groups, attendance, payments, expenses, settings, staff, results, access}
//   GET  /api/ifadmin/stamp          → change stamps per collection (for polling)
//   PUT  /api/ifadmin/doc/<c>/<id>   → set one document      DELETE same → delete it
//   POST /api/ifadmin/restore        → {collections:{...}} replace collections from a backup
//   POST /api/ifadmin/ai             → {messages} AI assistant: reply + proposed changes (nothing saved)
//   POST /api/ifadmin/ai/apply       → {ops} save the proposed changes (undo point kept)    POST ai/undo {id}
// With header x-if-sync-key = IFADMIN_SYNC_KEY (env), Claude can read/write records without a sign-in:
//   GET all · GET/PUT/DELETE doc/<c>/<id> · POST backup
// Data lives in the private Blobs store "ifadmin", one document per collection (key c/<name>) holding {id: doc}.
import { getStore } from '@netlify/blobs';
import { tgAccount, makeQr } from '../lib/tgauth.mjs';
import { getUser, refreshSession } from '@netlify/identity';
import enc from '../lib/ifadmin-app.json';
import { chat, run } from '../lib/ifadmin-ai.mjs';
import { applyTimetable } from '../lib/migrate.mjs';
import { saveRegister } from '../lib/lessons.mjs';
import { loadStudents, saveStudents } from '../lib/students.mjs';

const COLLS = ['students', 'groups', 'attendance', 'payments', 'expenses', 'settings', 'staff', 'results', 'access', 'mine'];
const A = () => getStore({ name: 'ifadmin', consistency: 'strong' });
const S = () => getStore({ name: 'school', consistency: 'strong' });
const U = () => getStore({ name: 'ielts', consistency: 'strong' });
const json = (data, status = 200) => Response.json(data, { status, headers: { 'Cache-Control': 'no-store' } });
const fail = (status, error) => json({ error }, status);
const ID = /^[A-Za-z0-9_.:@+~-]{1,200}$/;
/* Daily payment alerts: packages that have finished or have one lesson left, and late joiners who reached
   their own package size. Each student carries this month's payment line so unpaid ones can be picked out. */
function paymentAlerts(G, S, Att, P, today) {
  const dm = x => x.slice(8, 10) + '.' + x.slice(5, 7);
  const rows = (P[today.slice(0, 7)] || {}).rows || {};
  const pay = id => { const r = rows[id]; if (!r) return { status: 'no payment line', balance: null }; const bal = (+r.due || 0) - (+r.disc || 0) - (+r.paid || 0); return { status: r.s || '', due: +r.due || 0, disc: +r.disc || 0, paid: +r.paid || 0, balance: bal, method: r.m || '', date: r.d || '', unpaid: bal > 0 }; };
  const out = [];
  for (const [g, gr] of Object.entries(G).sort()) {
    if (g === 'ind' || g === 'indn' || !(gr.dates || []).length) continue;
    const size = +gr.pkg || (g === 'ielts' || g === 'st' ? 12 : 8), dates = [...gr.dates].sort(), ps = gr.ps || dates[0];
    const done = dates.filter(d => d >= ps && d <= today), att = Att[g] || {};
    const reg = [], exc = [];
    for (const [id, s] of Object.entries(S)) {
      if (s.st !== 'active' || s.nofee || !(s.gs && s.gs.length ? s.gs : [s.g]).includes(g)) continue;
      const marks = att[id] && typeof att[id] === 'object' ? att[id] : {};
      const xps = (s.xps || {})[g], fm = Object.keys(marks).filter(d => marks[d] && d >= ps).sort()[0], own = xps || fm;
      const who = { id, name: s.n, phone: s.ph || '', ...pay(id) };
      if (xps || (fm && fm > ps)) { const c = Object.entries(marks).filter(([d, v]) => d >= own && d <= today && (v === 'P' || v === 'UA')).length; if (c >= size - 1) exc.push({ ...who, own: c, size }); }
      else reg.push(who);
    }
    const pi = Math.max(0, dates.indexOf(ps)); let status = null, when = '';
    if (done.length >= size) { status = 'finished'; when = dates[pi + size - 1] ? dm(dates[pi + size - 1]) : '?'; }
    else if (done.length === size - 1) { status = 'one-left'; const nx = dates.find(d => d > today && d >= ps); when = nx ? dm(nx) : '?'; }
    if ((status && reg.length) || exc.length) out.push({ group: g, name: gr.n, schedule: gr.sch || '', done: done.length, size, status, when, students: status ? reg.sort((a, b) => a.name.localeCompare(b.name)) : [], lateJoiners: exc });
  }
  return { date: today, month: today.slice(0, 7), groups: out };
}
function syncKeyOk(k) {
  const want = (globalThis.Netlify?.env?.get('IFADMIN_SYNC_KEY')) || process.env.IFADMIN_SYNC_KEY || '';
  if (want.length < 32 || typeof k !== 'string' || k.length !== want.length) return false;
  let d = 0; for (let i = 0; i < want.length; i++) d |= want.charCodeAt(i) ^ k.charCodeAt(i);
  return d === 0;
}

const getColl = async c => (await A().get('c/' + c, { type: 'json' })) || {};
async function putColl(c, map) {
  await A().setJSON('c/' + c, map);
  const st = (await A().get('stamp', { type: 'json' })) || {};
  st[c] = Date.now(); await A().setJSON('stamp', st);
  if (c === 'groups') await syncClassTimes(map).catch(e => console.error('class times', e.message));
}
/* A group's timetable in IF Admin (e.g. "Mon 15:15–16:45, Fri 16:50–18:20") is also the website class's timetable:
   the calendar, check-in, reminders and the bot read the website class. Only timetables with times are copied. */
const normLabel = s => String(s || '').toLowerCase().replace(/group|teens?/g, m => m.startsWith('teen') ? 'teen' : '').replace(/[^a-z0-9]/g, '');
async function syncClassTimes(groups) {
  const W = getStore({ name: 'school', consistency: 'strong' });
  const classes = (await W.get('classes', { type: 'json' })) || []; let changed = [];
  for (const [gid, g] of Object.entries(groups || {})) {
    if (!g || !/\d{1,2}[:.]\d{2}/.test(g.sch || '')) continue;
    const loose = s => normLabel(s).replace(/teen/g, ''), byLoose = classes.filter(x => loose(x.label) === loose(g.n));
    const c = classes.find(x => x.id === 'c-' + gid) || classes.find(x => normLabel(x.label) === normLabel(g.n)) || (byLoose.length === 1 ? byLoose[0] : null);
    if (c && c.schedule !== g.sch) { c.schedule = g.sch; changed.push(c.label); }
  }
  if (changed.length) await W.setJSON('classes', classes);
  return changed;
}

async function appHtml() {
  const k = await S().get('contentKey', { type: 'json' });
  if (!k?.key) return null;
  const subtle = globalThis.crypto.subtle;
  const key = await subtle.importKey('raw', Buffer.from(k.key, 'base64'), 'AES-GCM', false, ['decrypt']);
  const plain = await subtle.decrypt({ name: 'AES-GCM', iv: Buffer.from(enc.iv, 'base64') }, key, Buffer.from(enc.ct, 'base64'));
  return Buffer.from(plain).toString('utf8');
}

export default async (req) => {
  const url = new URL(req.url);
  const path = url.pathname.replace(/^\/api\/ifadmin\/?/, '').replace(/\/$/, '');
  const method = req.method;
  // Claude (the director's assistant) keeps the records up to date with a private key instead of a sign-in.
  const sk = req.headers.get('x-if-sync-key');
  if (sk) {
    if (!syncKeyOk(sk)) return fail(401, 'key');
    if (path === 'all' && method === 'GET') {
      const out = {}; await Promise.all(COLLS.filter(c => c !== 'mine').map(async c => { out[c] = await getColl(c); }));
      return json({ collections: out, stamp: (await A().get('stamp', { type: 'json' })) || {} });
    }
    const kd = path.match(/^doc\/([a-z]+)\/(.+)$/);
    if (kd && COLLS.includes(kd[1]) && ID.test(decodeURIComponent(kd[2]))) {
      const c = kd[1], id = decodeURIComponent(kd[2]), map = await getColl(c);
      if (method === 'GET') return map[id] ? json({ id, data: map[id] }) : fail(404, 'doc');
      if (method === 'PUT') {
        const body = await req.json().catch(() => null);
        if (!body || typeof body !== 'object' || Array.isArray(body)) return fail(400, 'doc');
        if (JSON.stringify(body).length > 900000) return fail(413, 'big');
        map[id] = body; await putColl(c, map); return json({ ok: true, ...(c === 'groups' ? { classes: await syncClassTimes(map) } : {}) });
      }
      if (method === 'DELETE') { delete map[id]; await putColl(c, map); return json({ ok: true }); }
    }
    // website school records (students, classes, books): read, or merge fields into one record
    const sd = path.match(/^school\/(students|classes|books|teachers)(?:\/([A-Za-z0-9_-]+))?$/);
    if (sd) {
      const st = getStore({ name: 'school', consistency: 'strong' }), list = (await st.get(sd[1], { type: 'json' })) || [];
      if (method === 'GET') return json(sd[2] ? (list.find(x => x.id === sd[2]) || null) : list);
      // add a new record (e.g. a new website class): {id, …}; refused if the id exists
      if (method === 'POST' && !sd[2]) {
        const b = await req.json().catch(() => null);
        if (!b || typeof b !== 'object' || !/^[A-Za-z0-9_-]{2,60}$/.test(b.id || '') || list.some(x => x.id === b.id)) return fail(400, 'bad');
        list.push(b); await st.setJSON(sd[1], list); return json({ ok: true, record: b });
      }
      if (method === 'PATCH' && sd[2]) {
        const b = await req.json().catch(() => null), r = list.find(x => x.id === sd[2]);
        if (!r || !b || typeof b !== 'object' || Array.isArray(b)) return fail(400, 'bad');
        delete b.id; Object.assign(r, b); await st.setJSON(sd[1], list); return json({ ok: true, record: r });
      }
    }
    // placement test results (newest first), and school-made logins for students: {sids:[IF Admin ids], reset?} → one-time passwords
    if (path === 'placements' && method === 'GET') return json(((await S().get('placements', { type: 'json' })) || []).slice(-40).reverse());
    if (path === 'logins' && method === 'POST') {
      const b = await req.json().catch(() => ({}));
      const { makeLogins } = await import('./school-api.mjs');
      const r = await makeLogins(b.sids, !!b.reset), L = (await S().get('logins', { type: 'json' })) || {};
      return json({ ...r, logins: (b.sids || []).map(id => ({ sid: id, login: L[id]?.login || null, pw: L[id]?.pw || null, uid: L[id]?.uid || null })) });
    }
    // the director's message to one class (Telegram; WhatsApp for students not on Telegram): {ru, en, kk?}
    const nc = path.match(/^notify\/([A-Za-z0-9_-]+)$/);
    if (nc && method === 'POST') {
      const b = await req.json().catch(() => ({})); if (!b.ru && !b.en) return fail(400, 'text');
      const { doc, getLinks, tgSend, tgToken, uidsByStudent, inClass } = await import('../lib/bot-core.mjs');
      const { waReady, waSend, waNumber } = await import('../lib/whatsapp.mjs');
      const c = (await doc('classes')).find(x => x.id === nc[1]); if (!c) return fail(404, 'class');
      const students = (await doc('students')).filter(s => inClass(c, s) && !/withdrawn|finished|frozen/i.test(s.status || ''));
      const links = await getLinks(), bySid = await uidsByStudent(links), prefs = (await getStore({ name: 'school', consistency: 'strong' }).get('waPrefs', { type: 'json' })) || {}, wa = waReady();
      const sent = [];
      for (const s0 of students) {
        const uid = s0.uid || bySid[s0.id] || (links['sid:' + s0.id] ? 'sid:' + s0.id : null), l = uid && links[uid], lang = l?.lang || prefs[s0.id]?.lang || 'ru', text = b[lang] || b.ru || b.en;
        try {
          if (l && tgToken()) { await tgSend(l.chatId, text); sent.push([s0.first + ' ' + s0.last, 'telegram']); }
          else if (wa && !prefs[s0.id]?.off) for (const num of [...new Set([s0.phone, s0.parentPhone].map(waNumber).filter(Boolean))]) { await waSend(num, 'IF Academy\n' + text); sent.push([s0.first + ' ' + s0.last, 'whatsapp']); }
        } catch (e) { console.error('notify', s0.id, e.message); }
      }
      return json({ ok: true, sent, students: students.length });
    }
    // website accounts (directory): find by name, and link an account to its school record (copying the phone if the record has none)
    if (path === 'accounts' && method === 'GET') {
      const q = (new URL(req.url).searchParams.get('q') || '').toLowerCase(), dir = (await getStore({ name: 'ielts', consistency: 'strong' }).get('directory', { type: 'json' })) || {};
      return json(Object.entries(dir).filter(([u, d]) => q && String(d.name || '').toLowerCase().includes(q)).slice(0, 20).map(([u, d]) => ({ uid: u, name: d.name, phone: d.phone || '', role: d.role, studentId: d.studentId || null })));
    }
    const la = path.match(/^accounts\/([A-Za-z0-9-]+)\/link$/);
    if (la && method === 'POST') {
      // studentId = the IF Admin student id (e.g. s66): the website and the bot read students from IF Admin
      const b = await req.json().catch(() => ({})), U = getStore({ name: 'ielts', consistency: 'strong' });
      const dir = (await U.get('directory', { type: 'json' })) || {}, p = await U.get(`u/${la[1]}/profile`, { type: 'json' });
      const list = await loadStudents(), rec = list.find(x => x.id === b.studentId);
      if (!p || !rec) return fail(404, 'missing');
      p.studentId = rec.id; if (!p.role || p.role === 'guest') p.role = 'student'; await U.setJSON(`u/${la[1]}/profile`, p);
      dir[la[1]] = { ...(dir[la[1]] || {}), studentId: rec.id, role: p.role }; await U.setJSON('directory', dir);
      rec.uid = la[1]; await saveStudents(list);
      // the phone goes on the IF Admin record if it has none, so the bot can match the number
      const phone = p.phone || (dir[la[1]] || {}).phone || '';
      const S2 = (await A().get('c/students', { type: 'json' })) || {};
      if (phone && S2[rec.id] && !S2[rec.id].ph) { S2[rec.id].ph = phone.replace(/^\+7/, '8'); await putColl('students', S2); }
      return json({ ok: true, profile: { name: p.name, role: p.role, studentId: p.studentId, phone }, record: { id: rec.id, name: `${rec.first} ${rec.last}`.trim(), ph: S2[rec.id] && S2[rec.id].ph } });
    }
    // personal QR sign-in codes for students' accounts: {sids} → [{sid, name, link}] (a new code switches the old one off)
    if (path === 'qr' && method === 'POST') {
      const b = await req.json().catch(() => ({})), U2 = getStore({ name: 'ielts', consistency: 'strong' });
      const dir = (await U2.get('directory', { type: 'json' })) || {}, out = [];
      for (const sid of (Array.isArray(b.sids) ? b.sids : []).slice(0, 40)) {
        const e = Object.entries(dir).find(([, d]) => d.studentId === sid);
        if (!e) { out.push({ sid, error: 'no account' }); continue; }
        const code = await makeQr(e[0], sid, e[1].name || '');
        out.push({ sid, name: e[1].name || '', link: 'https://intellectfirst.com/api/school/qr/' + code });
      }
      return json({ ok: true, out });
    }
    // the director's own private student (not IF Academy's): account track "private", a private class c-pv-<uid> taught by the
    // director, and no IF Admin record. {label, schedule, bookId, unlinkSid} — unlinkSid: an IF Admin record to detach from the account
    const pa = path.match(/^accounts\/([A-Za-z0-9-]+)\/private$/);
    if (pa && method === 'POST') {
      const b = await req.json().catch(() => ({})), U = getStore({ name: 'ielts', consistency: 'strong' }), uid = pa[1];
      const dir = (await U.get('directory', { type: 'json' })) || {}, p = await U.get(`u/${uid}/profile`, { type: 'json' });
      if (!p) return fail(404, 'account');
      p.track = 'private'; p.role = 'student'; delete p.studentId; delete p.request; await U.setJSON(`u/${uid}/profile`, p);
      dir[uid] = { ...(dir[uid] || {}), track: 'private', role: 'student' }; delete dir[uid].studentId; await U.setJSON('directory', dir);
      if (b.unlinkSid) { const list = await loadStudents(), rec = list.find(x => x.id === b.unlinkSid); if (rec && rec.uid === uid) { rec.uid = ''; await saveStudents(list); } }
      const S3 = getStore({ name: 'school', consistency: 'strong' }), classes = await S3.get('classes', { type: 'json' });
      if (!Array.isArray(classes) || !classes.length) return fail(409, 'no-classes');
      const id = 'c-pv-' + uid, c = classes.find(x => x.id === id) || (classes.push({ id }), classes[classes.length - 1]);
      Object.assign(c, { label: String(b.label || (p.name || 'Student') + ' (individual)'), uids: [uid], teacherId: 't-abdoulie', private: true, schedule: String(b.schedule || c.schedule || ''), room: c.room || '' });
      if (b.bookId) c.bookId = String(b.bookId);
      if (!c.meet) c.meet = 'IFAcademy-' + String(c.label).replace(/[^A-Za-z0-9]/g, '') + '-' + Math.random().toString(36).slice(2, 8);
      delete c.left; delete c.leftOn;
      await S3.setJSON('classes', classes);
      return json({ ok: true, profile: { name: p.name, track: p.track, role: p.role }, class: c });
    }
    // lesson clock-in log: read a month, or correct one lesson's clock-in time (the director's corrections)
    // resend a class's latest online test to the students who connected to the bot after it was sent: {classId, id?}
    if (path === 'homework/resend' && method === 'POST') {
      const b = await req.json().catch(() => ({}));
      const { loadHomework } = await import('../lib/homework.mjs'), { tellClass } = await import('../lib/hwsend.mjs'), { doc } = await import('../lib/bot-core.mjs');
      const cls = (await doc('classes')).find(c => c.id === b.classId); if (!cls) return fail(404, 'class');
      const list = (await loadHomework()).filter(h => h.classId === cls.id && h.url && (!b.id || h.id === b.id));
      const item = list[list.length - 1]; if (!item) return fail(404, 'homework');
      if (b.dry) {   // who in the class is on the bot, and since when
        const { getLinks, uidsByStudent, inClass } = await import('../lib/bot-core.mjs'), links = await getLinks(), bySid = await uidsByStudent(links);
        const st = (await doc('students')).filter(s => inClass(cls, s) && !/withdrawn|finished|frozen/i.test(s.status || ''));
        return json({ item, students: st.map(s => { const u = s.uid || bySid[s.id] || (links['sid:' + s.id] ? 'sid:' + s.id : null), l = u && links[u]; return { sid: s.id, name: `${s.first} ${s.last}`.trim(), bot: l ? l.at || 'yes' : null }; }) });
      }
      if (b.test) {   // the teacher's exact test (e.g. 'f3'): fix the item so every link opens it
        const { matchTest } = await import('../lib/testcentres.mjs'), x = matchTest(item.url, String(b.test));
        if (!x) return fail(400, 'test');
        const all = await loadHomework(), it = all.find(h => h.id === item.id); Object.assign(it, { test: x[0], testTitle: x[1], text: x[1] });
        await getStore({ name: 'school', consistency: 'strong' }).setJSON('homework', all); Object.assign(item, it);
      }
      const r = await tellClass(cls, item, null, { since: b.all || b.sids ? '0' : (b.since || item.at), sids: Array.isArray(b.sids) ? b.sids : null, names: true });
      return json({ ok: true, item: { id: item.id, text: item.text, at: item.at, test: item.test || null }, ...r });
    }
    // the director's salary rule (kept with the pay rates; only the director sees it on the website)
    if (path === 'payrates/director' && method === 'PUT') {
      const b = await req.json().catch(() => ({}));
      const { loadRates, saveRates } = await import('../lib/payroll.mjs');
      const r = await loadRates(); r.director = { teacherId: 't-abdoulie', ...b };
      return json({ ok: true, director: (await saveRates(r)).director });
    }
    // English Files units Covered for a class (opens them for its students in IF App): {classId, book, units: ['1A', …], on}
    if (path === 'efcover' && method === 'POST') {
      const b = await req.json().catch(() => ({}));
      const classId = String(b.classId || ''), book = String(b.book || ''), units = Array.isArray(b.units) ? b.units.map(String) : [];
      if (!/^c-[\w-]+$/.test(classId) || !/^ef-[a-c][0-2]p?$/.test(book) || !units.length) return fail(400, 'args');
      const st = getStore({ name: 'ielts', consistency: 'strong' }), k = 'ef/cover/' + classId;
      const cv = (await st.get(k, { type: 'json' }).catch(() => null)) || {}; cv[book] = cv[book] || {};
      for (const u of units) { if (b.on === false) delete cv[book][u]; else cv[book][u] = cv[book][u] || { at: new Date().toISOString(), by: 'Abdoulie Manneh (via Claude)' }; }
      await st.setJSON(k, cv);
      return json({ ok: true, covered: Object.keys(cv[book]) });
    }
    // who taught one lesson (a cover): {key: '<classId>|<date>|<HH:MM>', teacherId | null} — pay and hours follow it
    if (path === 'cover' && method === 'POST') {
      const b = await req.json().catch(() => ({}));
      if (!/^[^|]+\|\d{4}-\d{2}-\d{2}\|\d{2}:\d{2}/.test(String(b.key || ''))) return fail(400, 'key');
      const { setCover } = await import('../lib/cover.mjs');
      return json({ ok: true, lesson: await setCover(String(b.key), b.teacherId ? String(b.teacherId) : null, 'Director (via Claude)') });
    }
    const ll = path.match(/^lessonlog\/(\d{4}-\d{2})(?:\/(.+))?$/);
    if (ll) {
      const st = getStore({ name: 'school', consistency: 'strong' }), key = 'lessonlog/' + ll[1];
      const L = (await st.get(key, { type: 'json' })) || {};
      if (method === 'GET' && !ll[2]) return json(L);
      const k = ll[2] && decodeURIComponent(ll[2]);
      if (method === 'PATCH' && k) {
        const b = await req.json().catch(() => ({})), m = k.match(/^([^|]+)\|(\d{4}-\d{2}-\d{2})\|(\d{2}):(\d{2})$/);
        // the director corrects a register (e.g. a student marked late by mistake): {marks:{sid:'on'|'late'|…}, lateBy:{sid:min}}
        if (m && b.marks && typeof b.marks === 'object' && !b.checkIn) {
          const e0 = L[k] || {};
          const lesson = { key: k, classId: m[1], label: e0.label || '', date: m[2], start: `${m[3]}:${m[4]}`, end: e0.end, teacherId: e0.teacherId };
          const r = await saveRegister(lesson, b.marks, b.lateBy || {}, { uid: 'director', name: 'Director (via Claude)', role: 'admin', quiet: true });
          return json({ ok: true, ...r });
        }
        if (!m || !b.checkIn || isNaN(Date.parse(b.checkIn))) return fail(400, 'bad');
        const at = Date.parse(`${m[2]}T${m[3]}:${m[4]}:00+05:00`);
        const e = L[k] || (L[k] = { classId: m[1], label: String(b.label || ''), date: m[2], start: `${m[3]}:${m[4]}` });
        if (b.end) e.end = String(b.end); if (b.teacherId) e.teacherId = String(b.teacherId);
        e.checkIn = new Date(b.checkIn).toISOString(); e.lateMin = Math.round((Date.parse(b.checkIn) - at) / 60000);
        if (b.by) e.by = b.by; delete e.noShow; delete e.alerted; e.cancelled = false;
        e.correctedAt = new Date().toISOString(); e.correctedBy = 'Director (via Claude)'; if (b.note) e.note = String(b.note).slice(0, 200);
        await st.setJSON(key, L); return json({ ok: true, entry: e });
      }
    }
    if (path === 'lockstatus' && method === 'GET') {   // are the page keys for the encrypted test pages on the site? (yes/no only)
      const k = (await getStore({ name: 'school', consistency: 'strong' }).get('lockKeys', { type: 'json' })) || {};
      return json({ ks: !!k.ks, kt: !!k.kt });
    }
    if (path === 'alerts' && method === 'GET') {
      const today = /^\d{4}-\d{2}-\d{2}$/.test(url.searchParams.get('date') || '') ? url.searchParams.get('date') : new Date(Date.now() + 5 * 3600e3).toISOString().slice(0, 10);
      const [G, S, Att, P] = await Promise.all(['groups', 'students', 'attendance', 'payments'].map(getColl));
      return json(paymentAlerts(G, S, Att, P, today));
    }
    if (path === 'backup' && method === 'POST') {
      const prev = {}; for (const c of COLLS) prev[c] = await getColl(c);
      const key = 'backup/' + new Date().toISOString().replace(/[:.]/g, '-'); await A().setJSON(key, prev);
      return json({ ok: true, key });
    }
    return fail(404, 'route');
  }
  let user; try { user = (await tgAccount(req)) || (await refreshSession().catch(() => null), await getUser()); } catch { user = null; }
  if (!user) return fail(401, 'signin');
  const profile = (await U().get(`u/${user.id}/profile`, { type: 'json' })) || null;
  if (profile?.role !== 'admin') return fail(403, 'admin');

  if (path === 'app' && method === 'GET') {
    let html; try { html = await appHtml(); } catch (e) { console.error('ifadmin decrypt', e?.message); html = null; }
    if (!html) return fail(423, 'locked');
    return new Response(html, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' } });
  }
  if (path === 'me' && method === 'GET') return json({ id: user.id, name: profile.name || '', email: user.email, main: profile.teacherId === 't-abdoulie' });
  if (path === 'all' && method === 'GET') {
    const out = {}; await Promise.all(COLLS.filter(c => c !== 'mine').map(async c => { out[c] = await getColl(c); }));
    return json({ collections: out, stamp: (await A().get('stamp', { type: 'json' })) || {} });
  }
  if (path === 'stamp' && method === 'GET') return json({ stamp: (await A().get('stamp', { type: 'json' })) || {} });

  const d = path.match(/^doc\/([a-z]+)\/(.+)$/);
  if (d && COLLS.includes(d[1]) && ID.test(decodeURIComponent(d[2]))) {
    const c = d[1], id = decodeURIComponent(d[2]), map = await getColl(c);
    if (method === 'PUT') {
      const body = await req.json().catch(() => null);
      if (!body || typeof body !== 'object' || Array.isArray(body)) return fail(400, 'doc');
      if (JSON.stringify(body).length > 900000) return fail(413, 'big');
      map[id] = body; await putColl(c, map); return json({ ok: true });
    }
    if (method === 'DELETE') { delete map[id]; await putColl(c, map); return json({ ok: true }); }
  }

  /* ---------- AI assistant: write what happened, check the changes, apply ---------- */
  const loadAll = async () => { const D = {}; await Promise.all(COLLS.filter(c => c !== 'mine').map(async c => { D[c] = await getColl(c); })); return D; };
  if (path === 'ai' && method === 'POST') {
    const b = await req.json().catch(() => ({}));
    const msgs = (Array.isArray(b.messages) ? b.messages : []).filter(m => m && typeof m.content === 'string').slice(-12);
    if (!msgs.length || msgs.at(-1).role !== 'user') return fail(400, 'message');
    const D = await loadAll();
    const files = (Array.isArray(b.files) ? b.files : []).filter(f => f && typeof f.data === 'string' && /^(image\/(jpeg|png|webp|gif)|application\/pdf)$/.test(f.type || '')).slice(0, 4);
    if (files.reduce((n, f) => n + f.data.length, 0) > 5.5e6) return fail(413, 'too big');
    let r; try { r = await chat(D, msgs, files); } catch (e) { console.error('ifadmin ai', e?.status, e?.message); return fail(502, 'ai'); }
    if (r.ops && r.ops.length) { const pv = run(JSON.parse(JSON.stringify(D)), r.ops); r.lines = pv.lines; r.errors = pv.errors; }
    return json(r);
  }
  if (path === 'ai/apply' && method === 'POST') {
    const b = await req.json().catch(() => ({}));
    if (!Array.isArray(b.ops) || !b.ops.length) return fail(400, 'ops');
    const D = await loadAll(), before = JSON.parse(JSON.stringify(D));
    const res = run(D, b.ops);
    if (!res.touched.size) return json({ lines: res.lines, saved: 0 });
    const id = new Date().toISOString().replace(/[:.]/g, '-');
    const undo = {}; for (const c of res.touched) undo[c] = before[c];
    await A().setJSON('undo/' + id, { at: new Date().toISOString(), by: user.email, ops: b.ops, before: undo });
    for (const c of res.touched) await putColl(c, D[c]);
    // a new group also becomes a website class (teacher, timetable, room): "My classes", check-in and registers use it
    for (const g of D.newGroups || []) {
      try {
        const W = getStore({ name: 'school', consistency: 'strong' });
        const classes = (await W.get('classes', { type: 'json' })) || [], teachers = (await W.get('teachers', { type: 'json' })) || [];
        const tn = g.teacher.toLowerCase(), t = tn && teachers.find(x => (x.name || '').toLowerCase() === tn || (x.name || '').toLowerCase().split(' ')[0] === tn.split(' ')[0] && (x.name || '').toLowerCase().includes(tn.split(' ').slice(-1)[0]));
        const ex = classes.find(c => c.id === 'c-' + g.id);
        if (!ex) classes.push({ id: 'c-' + g.id, label: g.n, teacherId: t ? t.id : '', schedule: g.sch || '', room: g.room || '' });
        else { ex.label = g.n; if (t) ex.teacherId = t.id; if (g.sch) ex.schedule = g.sch; if (g.room) ex.room = g.room; }
        await W.setJSON('classes', classes);
        res.lines.push({ ok: true, text: `Website class · ${g.n}: ${t ? 'teacher ' + t.name : g.teacher ? 'teacher “' + g.teacher + '” not found, set it in Admin → Classes' : g.update ? 'teacher unchanged' : 'no teacher yet'}${g.sch ? ' · ' + g.sch : ''}` });
      } catch (e) { console.error('website class', e.message); }
    }
    if ((D.slots || []).length) {   // individual students' own lesson times and teacher (website classes)
      try {
        const teachers = (await getStore({ name: 'school', consistency: 'strong' }).get('teachers', { type: 'json' })) || [];
        const tid = n => { const t = String(n || '').toLowerCase().trim(); if (!t) return ''; const x = teachers.find(y => (y.name || '').toLowerCase() === t) || teachers.find(y => (y.name || '').toLowerCase().split(' ')[0] === t.split(' ')[0]); return x ? x.id : ''; };
        const miss = D.slots.filter(x => x.teacher && !tid(x.teacher)).map(x => x.teacher);
        await applyTimetable({ individual: D.slots.map(x => [x.sid, x.gid, x.sch, tid(x.teacher), x.room]) });
        res.lines.push({ ok: true, text: `Website: ${D.slots.length} individual timetable${D.slots.length > 1 ? 's' : ''} saved${miss.length ? ' (teacher not found: ' + miss.join(', ') + ' — set it in Admin → Classes)' : ''}` });
      } catch (e) { console.error('slots', e.message); }
    }
    return json({ lines: res.lines, saved: res.lines.filter(l => l.ok).length, undo: id });
  }
  if (path === 'ai/undo' && method === 'POST') {
    const b = await req.json().catch(() => ({}));
    const u = /^[\w-]{10,40}$/.test(b.id || '') && await A().get('undo/' + b.id, { type: 'json' });
    if (!u) return fail(404, 'undo');
    for (const [c, m] of Object.entries(u.before || {})) if (COLLS.includes(c)) await putColl(c, m || {});
    await A().delete('undo/' + b.id);
    return json({ ok: true });
  }

  if (path === 'restore' && method === 'POST') {
    const b = await req.json().catch(() => ({}));
    const cols = b?.collections || {}; const done = {};
    const prev = {}; for (const c of COLLS) prev[c] = await getColl(c);
    if (Object.values(prev).some(m => Object.keys(m).length)) await A().setJSON('backup/' + new Date().toISOString().replace(/[:.]/g, '-'), prev);
    for (const c of COLLS) {
      const m = cols[c]; if (!m || typeof m !== 'object') continue;
      const clean = {}; for (const [id, doc] of Object.entries(m)) if (ID.test(id) && doc && typeof doc === 'object') clean[id] = doc;
      await putColl(c, clean); done[c] = Object.keys(clean).length;
    }
    return json({ restored: done });
  }
  return fail(404, 'route');
};

export const config = { path: ['/api/ifadmin', '/api/ifadmin/*'] };
