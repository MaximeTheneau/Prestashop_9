document.addEventListener('DOMContentLoaded', () => {
  const toggleNav = document.getElementById('navbar-toggle');
  const toggleNavButton = document.getElementById('navbar-toggle--button');
  const navMenu = document.getElementById('navbar-menu');

  toggleNavButton.addEventListener('click', () => {
    const isExpanded = toggleNavButton.getAttribute('aria-expanded') === 'true';
    toggleNavButton.setAttribute('aria-expanded', !isExpanded);
    navMenu.setAttribute('aria-hidden', isExpanded);
    navMenu.classList.toggle('navbar__menu--hidden');
  });

  toggleNavButton.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleNavButton.click();
    }
  });

});
