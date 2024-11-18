function getCookie() {
  let cookie_consent_settings = JSON.parse(localStorage.getItem("cookie-consent-settings"));

  if (cookie_consent_settings) {
    if (cookie_consent_settings.expire <= Date.now()) {
      localStorage.removeItem("cookie-consent-settings");
      return null;
    }
  }
  
  return cookie_consent_settings;
}

function setCookie(key, value, maxAge = 30 * 60 * 60 * 1000) {
  let cookie  = {
    data:   value,
    date:   Date.now(),
    expire: Date.now() + maxAge,
    valid:  true
  }
  localStorage.setItem("cookie-consent-settings", JSON.stringify(cookie));
}

function delCookie() {
  localStorage.setItem("cookie-consent-settings", null);
}

function saveCookieSettings() {
  setCookie(
    "cookie-consent-settings",
    {
      "necessary":     true,
      "functionality": document.querySelector("#switchConsentFunctionality").checked,
      "tracking":      document.querySelector("#switchConsentTracking").checked,
      "targeting":     document.querySelector("#switchConsentTargeting").checked
    }
  );
  addAnalytics();
}

function acceptAllCookieSettings() {
  setCookie(
    "cookie-consent-settings",
    {
      "necessary":     true,
      "functionality": true,
      "tracking":      true,
      "targeting":     true
    }
  );
  loadCookieSettings();
  $("#offcanvasCookie").offcanvas('hide');
}


function loadCookieSettings() {
  const cookie_consent_settings = getCookie();

  if (cookie_consent_settings) {
    document.querySelector("#switchConsentFunctionality").checked = cookie_consent_settings['data']['functionality'];
    document.querySelector("#switchConsentTracking").checked      = cookie_consent_settings['data']['tracking'];
    document.querySelector("#switchConsentTargeting").checked     = cookie_consent_settings['data']['targeting'];
  }
}

function initializeCookieBanner(){
  const myOffcanvas = document.getElementById('offcanvasCookie');
  
  myOffcanvas.addEventListener('hide.bs.offcanvas', event => {    
    saveCookieSettings();
  });
  
  myOffcanvas.addEventListener('show.bs.offcanvas', event => {
    loadCookieSettings();
  });

  if ( getCookie() === null ) {
    const bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas);
    bsOffcanvas.show();
  } else {
    loadCookieSettings();
    addAnalytics();
  }
}

window.onload = initializeCookieBanner();
