/* IF English app bridge. Loaded first on every page (home, courses, Game Room).
   - keeps each course's saved progress separate (all pages share one app origin)
   - Premium status: RevenueCat purchases, cached on the device so it works offline
   - native text-to-speech behind the browser speechSynthesis API (Android's WebView has none)
   - Android back button, in-page dialogs, "Home" button on course pages */
(function () {
  'use strict';
  if (window.IFEN) return;
  var CFG = window.IFEN_CONFIG || {};
  var ROOT = window.IFEN_ROOT || '';
  var NS = window.IFEN_NS || '';
  var CAP = window.Capacitor || null;
  var NATIVE = !!(CAP && CAP.isNativePlatform && CAP.isNativePlatform());
  var PLATFORM = NATIVE && CAP.getPlatform ? CAP.getPlatform() : 'web';

  /* ---------- 1. per-course storage ---------- */
  var SHARED = /^(ifen:|ifpron:|if\.)/;
  if (NS) {
    try {
      var proto = Storage.prototype, oGet = proto.getItem, oSet = proto.setItem, oDel = proto.removeItem;
      var wrap = function (k) { k = String(k); return SHARED.test(k) ? k : NS + '|' + k; };
      proto.getItem = function (k) { return oGet.call(this, this === window.localStorage ? wrap(k) : k); };
      proto.setItem = function (k, v) { return oSet.call(this, this === window.localStorage ? wrap(k) : k, v); };
      proto.removeItem = function (k) { return oDel.call(this, this === window.localStorage ? wrap(k) : k); };
    } catch (e) {}
  }
  function lsGet(k, d) { try { var v = window.localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } }
  function lsSet(k, v) { try { window.localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  /* ---------- 2. plugins ---------- */
  function plugin(name) {
    if (!NATIVE) return null;
    try { return CAP.registerPlugin ? CAP.registerPlugin(name) : (CAP.Plugins && CAP.Plugins[name]) || null; } catch (e) { return null; }
  }
  var Purchases = plugin('Purchases'), TTS = plugin('TextToSpeech'), App = plugin('App');

  /* ---------- 3. Premium ---------- */
  var GRACE = 3 * 24 * 3600 * 1000;           /* keeps Premium working offline around renewal time */
  function premiumInfo() { return lsGet('ifen:premium', { active: false }); }
  function isPremium() {
    if (!NATIVE) return !!(window.IFLock && IFLock.canOpen('s')); /* Academy access uses the site's existing session. */
    var p = premiumInfo();
    if (!p || !p.active) return false;
    return p.exp == null || Date.now() < p.exp + GRACE;
  }
  function applyCustomerInfo(info) {
    var ent = info && info.entitlements && info.entitlements.active && info.entitlements.active[CFG.entitlement || 'premium'];
    var prev = isPremium();
    var p = ent ? {
      active: true,
      exp: ent.expirationDateMillis || (ent.expirationDate ? Date.parse(ent.expirationDate) : null),
      product: ent.productIdentifier || '', willRenew: ent.willRenew !== false,
      store: ent.store || '', checked: Date.now()
    } : { active: false, checked: Date.now() };
    lsSet('ifen:premium', p);
    if (prev !== isPremium()) fire('ifen:premium', { premium: isPremium() });
    return p;
  }
  function apiKey() {
    var k = (CFG.revenueCatKeys || {})[PLATFORM] || '';
    return /REPLACE/.test(k) ? '' : k;
  }
  var configuring = null;
  function ready() {
    if (!NATIVE || !Purchases) return Promise.reject(err('unavailable', 'Purchases are only available in the installed app.'));
    if (!apiKey()) return Promise.reject(err('not-configured', 'Subscriptions are not set up yet.'));
    if (!configuring) {
      configuring = Promise.resolve(Purchases.isConfigured ? Purchases.isConfigured().catch(function () { return { isConfigured: false }; }) : { isConfigured: false })
        .then(function (r) { if (!(r && r.isConfigured)) return Purchases.configure({ apiKey: apiKey() }); })
        .catch(function (e) { configuring = null; throw e; });
    }
    return configuring;
  }
  function refresh() {
    return ready().then(function () { return Purchases.getCustomerInfo(); })
      .then(function (r) { return applyCustomerInfo(r && (r.customerInfo || r)); });
  }
  function offerings() {
    return ready().then(function () { return Purchases.getOfferings(); }).then(function (o) {
      var cur = o && (o.current || (o.all && o.all['default']));
      return cur ? cur.availablePackages || [] : [];
    });
  }
  function buy(pkg) {
    return ready().then(function () { return Purchases.purchasePackage({ aPackage: pkg }); })
      .then(function (r) { applyCustomerInfo(r && r.customerInfo); return isPremium(); })
      .catch(function (e) { if (cancelled(e)) return null; throw e; });
  }
  function restore() {
    return ready().then(function () { return Purchases.restorePurchases(); })
      .then(function (r) { applyCustomerInfo(r && (r.customerInfo || r)); return isPremium(); });
  }
  function cancelled(e) {
    if (!e) return false;
    return e.userCancelled === true || String(e.code) === '1' || /PURCHASE_CANCELLED|cancel/i.test(String(e.code || '') + ' ' + String(e.message || ''));
  }
  function err(code, msg) { var e = new Error(msg); e.code = code; return e; }
  function fire(name, detail) { try { window.dispatchEvent(new CustomEvent(name, { detail: detail })); } catch (e) {} }

  if (!NATIVE) {
    window.addEventListener('storage', function(e) { if (!e.key || /^if\./.test(e.key)) fire('ifen:premium', {premium:isPremium()}); });
    window.addEventListener('pageshow', function() { fire('ifen:premium', {premium:isPremium()}); });
    window.addEventListener('focus', function() { fire('ifen:premium', {premium:isPremium()}); });
  }
  /* ---------- 4. native text-to-speech behind window.speechSynthesis ---------- */
  if (NATIVE && TTS) (function () {
    var voices = [], listeners = [], token = 0;
    function Utt(text) {
      this.text = text == null ? '' : String(text); this.lang = ''; this.rate = 1; this.pitch = 1; this.volume = 1; this.voice = null;
      this.onstart = this.onend = this.onerror = this.onboundary = this.onpause = this.onresume = this.onmark = null;
    }
    Utt.prototype.addEventListener = function (t, f) { this['on' + t] = f; };
    Utt.prototype.removeEventListener = function (t) { this['on' + t] = null; };
    var synth = {
      speaking: false, pending: false, paused: false, onvoiceschanged: null,
      getVoices: function () { return voices.slice(); },
      speak: function (u) {
        if (!u) return;
        var my = ++token; synth.speaking = true;
        var opts = { text: u.text, lang: u.lang || (u.voice && u.voice.lang) || 'en-GB', rate: clamp(u.rate, 0.1, 2, 1), pitch: clamp(u.pitch, 0.5, 2, 1),
          volume: clamp(u.volume, 0, 1, 1), category: 'playback', queueStrategy: 0 };
        if (u.voice && typeof u.voice._i === 'number') opts.voice = u.voice._i;
        try { u.onstart && u.onstart({ type: 'start', utterance: u }); } catch (e) {}
        TTS.speak(opts).then(function () {
          if (my === token) synth.speaking = false;
          try { u.onend && u.onend({ type: 'end', utterance: u }); } catch (e) {}
        }).catch(function (e) {
          if (my === token) synth.speaking = false;
          try { u.onerror && u.onerror({ type: 'error', error: String(e && e.message || e), utterance: u }); } catch (x) {}
        });
      },
      cancel: function () { token++; synth.speaking = false; try { TTS.stop(); } catch (e) {} },
      pause: function () {}, resume: function () {},
      addEventListener: function (t, f) { if (t === 'voiceschanged') listeners.push(f); },
      removeEventListener: function (t, f) { listeners = listeners.filter(function (x) { return x !== f; }); }
    };
    function clamp(v, lo, hi, d) { v = Number(v); if (!isFinite(v)) v = d; return Math.max(lo, Math.min(hi, v)); }
    try { Object.defineProperty(window, 'speechSynthesis', { value: synth, configurable: true, writable: true }); } catch (e) { window.speechSynthesis = synth; }
    window.SpeechSynthesisUtterance = Utt;
    TTS.getSupportedVoices().then(function (r) {
      voices = ((r && r.voices) || []).map(function (v, i) {
        return { name: v.name || v.voiceURI || ('Voice ' + (i + 1)), lang: String(v.lang || '').replace('_', '-'), voiceURI: v.voiceURI || v.name || '',
          localService: v.localService !== false, 'default': !!v['default'], _i: i };
      });
      var ev = { type: 'voiceschanged' };
      try { synth.onvoiceschanged && synth.onvoiceschanged(ev); } catch (e) {}
      listeners.forEach(function (f) { try { f(ev); } catch (e) {} });
    }).catch(function () {});
  })();

  /* ---------- 5. in-page dialogs (used by the games for "Finish the game?") ---------- */
  function dialog(msg, okLabel, cancelLabel) {
    return new Promise(function (res) {
      var d = document.createElement('div'); d.className = 'ifen-dlg';
      d.innerHTML = '<div class="ifen-dlg-box" role="dialog" aria-modal="true"><p></p><div class="ifen-dlg-row">' +
        (cancelLabel ? '<button type="button" data-v="0"></button>' : '') + '<button type="button" class="ok" data-v="1"></button></div></div>';
      d.querySelector('p').textContent = msg;
      if (cancelLabel) d.querySelector('[data-v="0"]').textContent = cancelLabel;
      d.querySelector('.ok').textContent = okLabel || 'OK';
      d.addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; d.remove(); res(b.dataset.v === '1'); });
      document.body.appendChild(d); d.querySelector('.ok').focus();
    });
  }
  window.IFDialog = window.IFDialog || {
    confirm: function (m) { return dialog(m, ruUI() ? 'Да' : 'Yes', ruUI() ? 'Нет' : 'No'); },
    alert: function (m) { return dialog(m, 'OK'); }
  };
  function ruUI() { return lsGet('ifen:lang', null) === 'ru'; }

  /* ---------- 6. navigation ---------- */
  function home(view) { location.href = ROOT + 'index.html' + (view ? '#' + view : ''); }
  if (App && App.addListener) {
    App.addListener('backButton', function () {
      if (document.querySelector('.ifen-dlg')) { document.querySelector('.ifen-dlg').remove(); return; }
      if (typeof window.IFEN_BACK === 'function' && window.IFEN_BACK() === true) return;
      if (!NS && !window.IFEN_PAGE) { if (App.minimizeApp) App.minimizeApp(); else if (App.exitApp) App.exitApp(); return; }
      home();
    });
    App.addListener('resume', function () { if (apiKey()) refresh().catch(function () {}); });
  }

  /* course pages: Home button + premium badge in the page header */
  function decorate() {
    if (!NS && !window.IFEN_PAGE) return;
    var css = document.createElement('style');
    css.textContent = '.ifen-home{display:inline-flex;align-items:center;justify-content:center;gap:4px;min-width:44px;min-height:44px;padding:0 14px 0 10px;border-radius:999px;border:1.5px solid rgba(255,255,255,.35);background:rgba(255,255,255,.08);color:#fff;font:700 15px/1 Manrope,system-ui,sans-serif;text-decoration:none;cursor:pointer;flex:none}' +
      '.ifen-home:active{transform:scale(.97)}.ifen-home svg{width:20px;height:20px}' +
      '.ifen-dlg{position:fixed;inset:0;z-index:2147483000;background:rgba(10,16,32,.55);display:flex;align-items:center;justify-content:center;padding:16px}' +
      '.ifen-dlg-box{background:var(--card,#fff);color:var(--fg,#1F2937);border-top:4px solid #C9A227;border-radius:16px;max-width:420px;width:100%;padding:20px;box-shadow:0 18px 50px rgba(0,0,0,.35)}' +
      '.ifen-dlg-box p{margin:0 0 16px;font-size:17px;line-height:1.45}.ifen-dlg-row{display:flex;gap:10px;justify-content:flex-end}' +
      '.ifen-dlg-row button{font:inherit;font-weight:800;border-radius:999px;padding:11px 20px;min-height:44px;border:2px solid var(--line,#D8E1EE);background:transparent;color:inherit}' +
      '.ifen-dlg-row .ok{background:#14213D;border-color:#14213D;color:#fff}';
    document.head.appendChild(css);
    var b = document.createElement('a'); b.className = 'ifen-home'; b.href = ROOT + 'index.html';
    b.setAttribute('aria-label', 'Home');
    b.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg><span>' + (ruUI() ? 'Меню' : 'Home') + '</span>';
    var host = window.IFEN_HOME_HOST ? document.querySelector(window.IFEN_HOME_HOST) : document.querySelector('header');
    if (host) host.insertBefore(b, host.firstChild);
    else { b.style.cssText = 'position:fixed;z-index:99;top:calc(8px + env(safe-area-inset-top,0px));left:calc(8px + env(safe-area-inset-left,0px));background:#14213D'; document.body.appendChild(b); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', decorate); else decorate();

  window.IFEN = {
    native: NATIVE, platform: PLATFORM, root: ROOT, ns: NS, config: CFG,
    isPremium: isPremium, premiumInfo: premiumInfo, refresh: refresh, offerings: offerings, buy: buy, restore: restore,
    purchasesReady: function () { return NATIVE && !!Purchases && !!apiKey(); },
    home: home, dialog: dialog, get: lsGet, set: lsSet, fire: fire, lang: function () { return ruUI() ? 'ru' : 'en'; }
  };
})();
