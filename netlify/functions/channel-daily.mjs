// Every morning at 09:00 Kostanay time the IF Academy bot posts a short article to the Telegram channel.
// The bot must be an administrator of the channel with the "Post messages" right.
// Channel: TELEGRAM_CHANNEL (Netlify environment variable) or @intellectfirst. Posts once a day even if the job runs twice.
import { S, tg, tgToken } from '../lib/bot-core.mjs';
import { todayShort, postHTML } from '../lib/channel-articles.mjs';

export default async () => {
  if (!tgToken()) return new Response('no telegram token');
  const chat = process.env.TELEGRAM_CHANNEL || '@intellectfirst';
  const site = (process.env.URL || 'https://intellectfirst.com').replace(/\/$/, '');
  const { date, item } = todayShort();
  const key = 'bot/channel-daily';
  try { if ((await S().get(key)) === date) return new Response('already posted ' + date); } catch (e) {}
  try {
    await tg('sendMessage', {
      chat_id: chat, text: postHTML(item), parse_mode: 'HTML', disable_web_page_preview: true,
      reply_markup: { inline_keyboard: [[{ text: '📖 Today\'s full article at your level', url: site + '/articles/' }]] }
    });
    await S().set(key, date);
    return new Response('posted ' + date + ': ' + item.t);
  } catch (e) {
    console.error('channel post failed (is the bot an admin of ' + chat + '?):', e.message);
    return new Response('failed: ' + e.message);
  }
};

export const config = { schedule: '0 4 * * *' };   // 04:00 UTC = 09:00 in Kostanay
