/* IF English: settings you may need to change. Everything else reads from here. */
window.IFEN_CONFIG = {
  appName: 'IF English',
  appId: 'kz.ifacademy.english',
  version: '1.0.0',

  /* RevenueCat public SDK keys (RevenueCat dashboard → Project → API keys).
     Until they are filled in, the app runs normally and shows the plans as "coming soon". */
  revenueCatKeys: {
    ios: 'appl_REPLACE_WITH_YOUR_KEY',
    android: 'goog_REPLACE_WITH_YOUR_KEY'
  },
  entitlement: 'premium',          /* RevenueCat entitlement identifier */

  freeUnits: 2,                    /* free units at the start of every course (vocabulary and grammar each) */

  /* Shown only until the store prices load (the stores show the real local price) */
  displayPrices: { monthly: '990 ₸', yearly: '7 900 ₸', yearlyPerMonth: '658 ₸', save: '33%' },

  supportEmail: 'ab.manneh86@gmail.com',
  website: 'https://intellectfirst.com/a/if-english/',
  privacyUrl: 'https://intellectfirst.com/a/if-english/legal/privacy.html',
  termsUrl: 'https://intellectfirst.com/a/if-english/legal/terms.html',
  appleEulaUrl: 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/',
  manageIos: 'https://apps.apple.com/account/subscriptions',
  manageAndroid: 'https://play.google.com/store/account/subscriptions?package=kz.ifacademy.english'
};
