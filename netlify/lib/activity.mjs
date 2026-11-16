// Activity of staff and students → the director and the manager (Telegram + website notifications).
// Never blocks the action itself: errors are logged and ignored.
export async function activity(text, exceptUid) {
  try { const { tellAdmins } = await import('./cover.mjs'); await tellAdmins(text, null, exceptUid); }
  catch (e) { console.error('activity', e.message); }
}
