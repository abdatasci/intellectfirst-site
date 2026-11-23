// Every 5 minutes: lesson clock-in reminders (20 and 5 minutes before), late alerts and register reminders (see lib/lessonwatch.mjs).
import { doc, getLinks, hidePrivate } from '../lib/bot-core.mjs';
import { lessonWatch } from '../lib/lessonwatch.mjs';

export default async () => {
  try { const [cl, lk] = await Promise.all([doc('classes'), getLinks()]); const n = await lessonWatch(hidePrivate(cl, null), lk); return new Response('sent ' + n); }
  catch (e) { console.error('lesson watch', e.message); return new Response('error', { status: 500 }); }
};

export const config = { schedule: '*/5 * * * *' };
