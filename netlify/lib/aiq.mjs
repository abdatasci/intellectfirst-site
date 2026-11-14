// Shared AI helpers for IF Live and the AI Test Centre: one JSON-only model call, and question clean-up.
import Anthropic from '@anthropic-ai/sdk';
import { randomInt } from 'node:crypto';

export const MODEL_FAST = process.env.LIVE_MODEL || 'claude-haiku-5-5';
export const MODEL_MARK = process.env.TESTS_MARK_MODEL || 'claude-haiku-5-5';
export const str = (v, n = 80) => (v == null ? '' : String(v)).replace(/\s+/g, ' ').trim().slice(0, n);

export async function aiJSON({ system, prompt, maxTokens = 1500, model = MODEL_FAST, temperature = 0.8 }) {
  const ai = new Anthropic();
  const m = await ai.messages.create({ model, max_tokens: maxTokens, system, messages: [{ role: 'user', content: prompt }] });
  const t = m.content.map(c => c.text || '').join('');
  const s = t.indexOf('{'), e = t.lastIndexOf('}');
  if (s < 0 || e < s) throw new Error('no json');
  return JSON.parse(t.slice(s, e + 1));
}

/** {p, o[], a, x} → validated, options shuffled; null if unusable. */
export function cleanQ(q, kind = 'ai') {
  if (!q || typeof q !== 'object') return null;
  const p = str(q.p, 260), x = str(q.x, 220);
  const o = (Array.isArray(q.o) ? q.o : []).map(v => str(v, 120)).filter(Boolean);
  const a = +q.a;
  if (!p || o.length < 2 || o.length > 4 || !(a >= 0 && a < o.length)) return null;
  if (new Set(o.map(v => v.toLowerCase())).size !== o.length) return null;
  const right = o[a];
  if (!(o.length === 2 && /^(true|false)$/i.test(o[0]))) for (let i = o.length - 1; i > 0; i--) { const j = randomInt(0, i + 1); [o[i], o[j]] = [o[j], o[i]]; }
  return { p, o, a: o.indexOf(right), x, k: kind };
}
