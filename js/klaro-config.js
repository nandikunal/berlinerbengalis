window.klaroConfig = {
  cookieName: 'berlinerbengalis_consent',
  storageMethod: 'cookie',
  cookieExpiresAfterDays: 365,
  privacyPolicy: '/pages/privacy-policy.html',

  services: [
    {
      name: 'google-analytics',
      title: 'Google Analytics',
      purposes: ['analytics'],
      cookies: [/^_ga/, /^_gid/],
      required: false
    },
    {
      name: 'google-adsense',
      title: 'Google AdSense',
      purposes: ['marketing'],
      required: false
    }
  ]
};
