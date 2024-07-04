document.addEventListener('DOMContentLoaded', function() {
  const cookiesModal = document.getElementById('cookiesModal');
  const acceptCookiesButton = document.getElementById('acceptCookies');
  const refuseCookiesButton = document.getElementById('refuseCookies');
  const customizeCookiesButton = document.getElementById('customizeCookies');
  const cookieChoiceContainer = document.getElementById('cookieChoiceContainer');
  const submitPreferencesButton = document.getElementById('submitPreferences');
  const listCookies = document.getElementById('listCookies');

  if (!localStorage.getItem('cookiesModal')) {
      cookiesModal.style.display = 'block';
  }

  acceptCookiesButton.addEventListener('click', function() {
      localStorage.setItem('cookiesModal', 'true');
      localStorage.setItem('cookiesGoogle', 'true');
      cookiesModal.style.display = 'none';
      initializeGoogleAnalytics(true);
  });

  refuseCookiesButton.addEventListener('click', function() {
      cookiesModal.style.display = 'none';
      initializeGoogleAnalytics(false);
  });

  customizeCookiesButton.addEventListener('click', function() {
    cookieChoiceContainer.style.display = 'block';

  });

  cookieChoiceContainer.addEventListener('click', function() {
    const cookieAnalytics = document.getElementById('cookieAnalytics').checked;
    const cookieSocial = document.getElementById('cookieSocial').checked;
    const cookieAdvertising = document.getElementById('cookieAdvertising').checked;

    localStorage.setItem('cookieAnalytics', cookieAnalytics);
    localStorage.setItem('cookieSocial', cookieSocial);
    localStorage.setItem('cookieAdvertising', cookieAdvertising);
    if (cookieAnalytics && cookieSocial && cookieAdvertising) {
      localStorage.setItem('cookiesModal', 'true');
    }

    updateAnalytics(cookieAnalytics, cookieSocial, cookieAdvertising);

  });

  submitPreferencesButton.addEventListener('click', function() {
    cookiesModal.style.display = 'none';
  })

if (localStorage.getItem('cookiesGoogle') === 'true') {
    initializeGoogleAnalytics(true);
}
});
