/**
 * Klaro Consent Manager Configuration
 * Berliner Bengalis e.V. – berlinerbengalis.com
 * GDPR-compliant: no non-essential scripts run before user consent.
 */
window.klaroConfig = {
  version: 1,
  elementID: 'klaro',
  storageMethod: 'cookie',
  cookieName: 'berlinerbengalis_consent',
  cookieExpiresAfterDays: 365,
  cookiePath: '/',
  cookieDomain: 'berlinerbengalis.com',
  privacyPolicy: '/pages/privacy-policy.html',
  default: false,          // all non-essential services OFF by default
  mustConsent: false,      // show banner but don't force a choice to browse
  acceptAll: true,         // show "Accept All" button
  hideDeclineAll: false,   // show "Decline All" option
  hideLearnMore: false,
  noticeAsModal: false,
  translations: {
    en: {
      privacyPolicyUrl: '/pages/privacy-policy.html',
      consentNotice: {
        description: 'We use cookies for analytics and advertising. Non-essential cookies only activate after your consent. {privacyPolicy}',
        learnMore: 'Manage preferences'
      },
      consentModal: {
        title: 'Cookie Preferences',
        description: 'Choose which cookies you allow. Essential cookies are always active.',
        privacyPolicy: { name: 'Privacy Policy', text: 'Read our {privacyPolicy}.' }
      },
      acceptAll: 'Accept All',
      declineAll: 'Decline All',
      close: 'Close',
      save: 'Save',
      acceptSelected: 'Save Preferences',
      purposes: {
        essential:  { title: 'Essential', description: 'Required for the site to function. Cannot be disabled.' },
        analytics:  { title: 'Analytics', description: 'Helps us understand how visitors use the site (anonymised).' },
        marketing:  { title: 'Advertising', description: 'Enables relevant ads from Google AdSense. Ads will not show if declined.' },
        functional: { title: 'Functional', description: 'Remembers your preferences (e.g. consent choices).' }
      }
    }
  },
  services: [
    {
      name: 'google-analytics',
      title: 'Google Analytics',
      purposes: ['analytics'],
      cookies: [/^_ga/, /^_gid/, /^_gat/],
      required: false,
      optOut: false,
      onlyOnce: true,
      description: 'Anonymised visitor statistics. IP anonymisation enabled.'
    },
    {
      name: 'google-adsense',
      title: 'Google AdSense',
      purposes: ['marketing'],
      cookies: [/^__gads/, /^__gpi/, /^_gcl_/],
      required: false,
      optOut: false,
      onlyOnce: false,
      description: 'Advertising cookies for personalised ads. Only loads after consent.'
    }
  ]
};
