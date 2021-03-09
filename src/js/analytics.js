window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
// Default ad_storage / analytics_storageto 'denied'.
// False (refused) or doesn't exists (no opt-in): DENIED
let cond = window.sessionStorage.getItem('raigyo-dev_consent-policy-accepted');
console.log('cond: ', cond);
if (!cond || cond === false || cond.toString() === 'false') {
  console.log('Onload: GA DENIED');
  /* prettier-ignore */
  gtag('consent', 'default', {
    ad_storage: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 500,
  });
} else {
  console.log('Onload: GA ACCEPTED');
  /* prettier-ignore */
  gtag('consent', 'update', {
    ad_storage: 'denied',
    analytics_storage: 'granted',
  });
}
gtag('js', new Date());
gtag(
  'config',
  'UA-178392896-1',
  { anonymize_ip: true },
  { siteSpeedSampleRate: 100 }
);
// Feature detects Navigation Timing API support.
if (window.performance) {
  // Gets the number of milliseconds since page load
  // (and rounds the result since the value must be an integer).
  var timeSincePageLoad = Math.round(performance.now());

  // Sends the timing event to Google Analytics.
  gtag('event', 'timing_complete', {
    name: 'load',
    value: timeSincePageLoad,
    event_category: 'JS Dependencies',
  });
}

/* prettier-ignore */
// function consentGranted() {
//   console.log("consentGranted()");
//   gtag('consent', 'update', {
//     ad_storage: 'denied',
//     analytics_storage: 'granted',
//   });
// }
