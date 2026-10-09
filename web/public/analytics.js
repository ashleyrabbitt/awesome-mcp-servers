// Production Google Analytics tag. History-based page views use GA4 Enhanced Measurement.
(() => {
  if (!['aisuperpower.cc', 'www.aisuperpower.cc'].includes(location.hostname)) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', 'G-R9X4RKWE12', {
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-R9X4RKWE12';
  document.head.appendChild(script);
})();
