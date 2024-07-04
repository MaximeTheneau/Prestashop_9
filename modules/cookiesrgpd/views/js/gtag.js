document.addEventListener('DOMContentLoaded', function() {
  if (localStorage.getItem('cookiesGoogle') === 'true') {
      const googleAnalyticsID = localStorage.getItem('googleAnalyticsID');
      if (googleAnalyticsID) {
          const script = document.createElement('script');
          script.async = true;
          script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsID}`;
          script.id = 'google-analytics-init';
          document.head.appendChild(script);

          const scriptInit = document.createElement('script');
          scriptInit.innerHTML = `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', ${new Date()});
              gtag('config', '${googleAnalyticsID}');
          `;
          document.head.appendChild(scriptInit);
      }
  }
});
