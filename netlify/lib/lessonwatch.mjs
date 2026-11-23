// Lesson clock-in watch (runs every 5 minutes from netlify/functions/lesson-watch.mjs): reminders to clock in (about 20 minutes
// before, and again 5 minutes before), the late alert 10 minutes after the start, and the register reminder after the lesson.
import { getStore } from '@netlify/blobs';
import { doc, getProfile, loadChanges, tgSend, tgToken } from './bot-core.mjs';
import { lessonsOn, loadLog, today as todayStr } from './lessons.mjs';
import { lessonButtons } from './teachbot.mjs';

/** Teachers: a nudge to clock in about 20 minutes before the lesson and a second one 5 minutes before (if still not clocked in); the director and managers: an alert when a lesson started
    10 minutes ago and nobody checked in. Each sent once per lesson (flags in the lesson log). */
export async function lessonWatch(classes, links) {
  if (!tgToken()) return 0;
  const date = todayStr(), now = Date.now(), lessons = lessonsOn(classes, date, await loadChanges()).filter(l => !l.cancelled && !l.movedTo);
  const soon = lessons.filter(l => { const t = Date.parse(l.at) - now; return t <= 20 * 60000 && t > -5 * 60000; });
  const soon2 = lessons.filter(l => { const t = Date.parse(l.at) - now; return t <= 5 * 60000 + 15000 && t > -2 * 60000; });
  const late = lessons.filter(l => { const t = now - Date.parse(l.at); return t >= 10 * 60000 && now < Date.parse(l.endAt); });
  const ended = lessons.filter(l => { const t = now - Date.parse(l.endAt); return t >= 0 && t < 3 * 3600e3; });
  if (!soon.length && !soon2.length && !late.length && !ended.length) return 0;
  const store = getStore({ name: 'school', consistency: 'strong' }), month = date.slice(0, 7), L = await loadLog(month);
  const U = getStore({ name: 'ielts', consistency: 'strong' }), teachers = await doc('teachers');
  const staff = [];   // [{uid, chatId, role, teacherId}]
  for (const [uid, l] of Object.entries(links)) {
    if (uid.startsWith('sid:')) continue;
    const p = await getProfile(uid).catch(() => null);   // website accounts, and teachers connected by phone ('tid:')
    if (p && (p.role === 'admin' || p.role === 'teacher')) staff.push({ uid, chatId: l.chatId, role: p.role, teacherId: p.teacherId || '', manager: !!p.manager });
  }
  // a teacher's lessons can also go to other staff (teacher record 'notify': staff teacher ids or account uids), e.g. the
  // manager for a teacher without the bot: they get the same messages with the teacher's name, and can clock in and take the register
  const tOf = id => teachers.find(x => x.id === id) || {}, first = id => String(tOf(id).name || 'the teacher').split(' ')[0];
  const extra = l => { const N = tOf(l.teacherId).notify || []; return staff.filter(x => !(x.teacherId && x.teacherId === l.teacherId) && (N.includes(x.uid) || (x.teacherId && N.includes(x.teacherId)))); };
  let n = 0, dirty = false;
  const entry = l => L[l.key] || (L[l.key] = { classId: l.classId, label: l.label, date: l.date, start: l.start, end: l.end, teacherId: l.teacherId });
  for (const l of soon) {
    const e = entry(l); if (e.checkIn || e.cancelled || e.pinged) continue;
    for (const s of staff.filter(x => x.teacherId && x.teacherId === l.teacherId)) { try { await tgSend(s.chatId, `🕑 ${l.label} starts at ${l.start}${l.room ? ' (' + l.room + ')' : ''}.\nPress ✅ Clock in when you start (from 5 minutes before), then take the register here or on the website.`, { reply_markup: { inline_keyboard: lessonButtons(l, e) } }); n++; } catch (x) {} }
    for (const s of extra(l)) { try { await tgSend(s.chatId, `🕑 ${first(l.teacherId)}’s lesson: ${l.label} starts at ${l.start}${l.room ? ' (' + l.room + ')' : ''}.\nYou can ✅ Clock in for ${first(l.teacherId)} when it starts (from 5 minutes before), then take the register here or on the website.`, { reply_markup: { inline_keyboard: lessonButtons(l, e) } }); n++; } catch (x) {} }
    e.pinged = true; dirty = true;
  }
  for (const l of soon2) {   // second reminder, when clock-in opens (5 minutes before)
    const e = entry(l); if (e.checkIn || e.cancelled || e.pinged2) continue;
    for (const s of staff.filter(x => x.teacherId && x.teacherId === l.teacherId)) { try { await tgSend(s.chatId, `⏰ ${l.label} starts in 5 minutes (${l.start}${l.room ? ', ' + l.room : ''}). Please ✅ Clock in now:`, { reply_markup: { inline_keyboard: lessonButtons(l, e) } }); n++; } catch (x) {} }
    for (const s of extra(l)) { try { await tgSend(s.chatId, `⏰ ${first(l.teacherId)}’s lesson ${l.label} starts in 5 minutes (${l.start}). ${first(l.teacherId)} has not clocked in yet — you can clock in for them:`, { reply_markup: { inline_keyboard: lessonButtons(l, e) } }); n++; } catch (x) {} }
    e.pinged2 = true; dirty = true;
  }
  for (const l of late) {
    const e = entry(l); if (e.checkIn || e.cancelled || e.alerted) continue;
    const t = (teachers.find(x => x.id === l.teacherId) || {}).name || 'The teacher';
    for (const s of staff.filter(x => x.role === 'admin' || x.manager)) { try { await tgSend(s.chatId, `⚠️ ${t} has not checked in for ${l.label} (started ${l.start}${l.room ? ', ' + l.room : ''}).\nIf the lesson is running, you can clock in for them here. Today's lessons: intellectfirst.com/me/#/admin/lessons`, { reply_markup: { inline_keyboard: [[{ text: '✅ Clock in for ' + t.split(' ')[0], callback_data: 'ci:' + l.key }]] } }); n++; } catch (x) {} }
    for (const s of staff.filter(x => x.teacherId && x.teacherId === l.teacherId)) { try { await tgSend(s.chatId, `⚠️ You have not clocked in for ${l.label} (started ${l.start}). Press the button now:`, { reply_markup: { inline_keyboard: lessonButtons(l, e) } }); } catch (x) {} }
    for (const s of extra(l).filter(x => !(x.role === 'admin' || x.manager))) { try { await tgSend(s.chatId, `⚠️ ${first(l.teacherId)} has not clocked in for ${l.label} (started ${l.start}). If the lesson is running, clock in for them:`, { reply_markup: { inline_keyboard: lessonButtons(l, e) } }); } catch (x) {} }
    e.alerted = true; dirty = true;
  }
  for (const l of ended) {   // after the lesson: a button to take the register, once
    const e = entry(l); if (!e.checkIn || e.takenAt || e.cancelled || e.regPinged) continue;
    for (const s of staff.filter(x => x.teacherId && x.teacherId === l.teacherId)) { try { await tgSend(s.chatId, `📋 ${l.label} (${l.start}) has finished. Please take the register:`, { reply_markup: { inline_keyboard: lessonButtons(l, e) } }); n++; } catch (x) {} }
    for (const s of extra(l)) { try { await tgSend(s.chatId, `📋 ${first(l.teacherId)}’s lesson ${l.label} (${l.start}) has finished. Please take the register:`, { reply_markup: { inline_keyboard: lessonButtons(l, e) } }); n++; } catch (x) {} }
    e.regPinged = true; dirty = true;
  }
  if (dirty) { const fresh = await loadLog(month); for (const [k, v] of Object.entries(L)) fresh[k] = { ...v, ...(fresh[k] || {}), pinged: v.pinged || fresh[k]?.pinged, pinged2: v.pinged2 || fresh[k]?.pinged2, alerted: v.alerted || fresh[k]?.alerted, regPinged: v.regPinged || fresh[k]?.regPinged }; await store.setJSON('lessonlog/' + month, fresh); }
  return n;
}

