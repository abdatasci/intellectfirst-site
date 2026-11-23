/* Renews the 1-hour sign-in token from the refresh cookie, like refreshSession() in @netlify/identity, with one change:
   when the renewal is refused it does NOT delete the sign-in cookies.

   Why: a page often sends two or more requests at the same moment (IF Live sends two "generate" requests at once). When
   the token has just run out, each request tries to renew it with the same refresh token. The first one succeeds and sets
   new cookies; the others are refused, because a refresh token can be used only once, and the library then deleted the
   cookies. If a refused answer reached the browser last, the teacher was signed out for good and every later request
   answered 401 ("AI is busy", "Could not open the game room") until they signed in again. (Seen on 23 Nov 2026.) */
const JWT = 'nf_jwt', REF = 'nf_refresh', MARGIN_S = 60;

const decode = t => { try { return JSON.parse(Buffer.from(t.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8')); } catch { return null; } };

export async function refreshSession() {
  const cookies = globalThis.Netlify?.context?.cookies;
  if (!cookies || typeof cookies.get !== 'function') return null;
  const access = cookies.get(JWT), refresh = cookies.get(REF);
  if (!access || !refresh) return null;
  const exp = decode(access)?.exp;
  if (!exp || exp - Math.floor(Date.now() / 1000) > MARGIN_S) return null;
  const base = globalThis.netlifyIdentityContext?.url || (globalThis.Netlify?.context?.url ? new URL('/.netlify/identity', globalThis.Netlify.context.url).href : process.env.URL ? new URL('/.netlify/identity', process.env.URL).href : null);
  if (!base) return null;
  let res;
  try {
    const ac = new AbortController(), t = setTimeout(() => ac.abort(), 8000);
    res = await fetch(`${base}/token`, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refresh }).toString(), signal: ac.signal });
    clearTimeout(t);
  } catch { return null; }
  if (!res.ok) return null;   // refused (probably a parallel request already used this refresh token): keep the cookies
  const d = await res.json().catch(() => null);
  if (!d || !d.access_token) return null;
  const opt = { httpOnly: false, secure: true, path: '/', sameSite: 'Lax' };
  cookies.set({ name: JWT, value: d.access_token, ...opt });
  if (d.refresh_token) cookies.set({ name: REF, value: d.refresh_token, ...opt });
  return d.access_token;
}
