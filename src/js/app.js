/* Cookie consent: banner management */

/* Needed only if we use cookieStorage */
// const cookieStorage = {
//   getItem: (item) => {
//     const cookies = document.cookie
//       .split(';')
//       .map((cookie) => cookie.split('='))
//       .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {});
//     return cookies[item];
//   },
//   setItem: (item, value) => {
//     document.cookie = `${item}=${value};`;
//   },
// };

// Storage mechanism
const storageType = sessionStorage; //  localStorage / sessionStorage / cookieStorage
const consentBannerName = 'raigyo-dev_consent-policy-popup-read';
const consentPropertyName = 'raigyo-dev_consent-policy-accepted';
const shouldShowPopup = () => !storageType.getItem(consentBannerName);
// const saveToStorage = () => storageType.setItem(consentBannerName, true);

// We wait that all elements are on the page before JS run
window.onload = () => {
  const acceptFn = (event) => {
    // saveToStorage(storageType);
    console.log('Popup: GA ACCEPTED');
    storageType.setItem(consentBannerName, true);
    storageType.setItem(consentPropertyName, true);
    consentPopup.classList.add('hidden');
  };
  const refuseFn = (event) => {
    // saveToStorage(storageType);
    // console.log('Popup: GA DENIED');
    storageType.setItem(consentBannerName, true);
    storageType.setItem(consentPropertyName, false);
    consentPopup.classList.add('hidden');
  };
  const consentPopup = document.getElementById('consent-popup');
  // Accept button
  const acceptBtn = document.getElementById('accept');
  acceptBtn.addEventListener('click', acceptFn);
  // Refuse button
  const refuseBtn = document.getElementById('refuse');
  refuseBtn.addEventListener('click', refuseFn);

  // if consentBannerName doesn't exist: show popup
  if (shouldShowPopup(storageType)) {
    setTimeout(() => {
      consentPopup.classList.remove('hidden');
    }, 500);
  }
};
