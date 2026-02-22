/**
 * Mobile Navigation Menu Toggle
 * Handles hamburger menu open/close on mobile devices
 */

document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.getElementById('bbNavToggle');
  const navLinks = document.getElementById('bbNavLinks');
  const navLinkItems = navLinks ? navLinks.querySelectorAll('a') : [];

  // Toggle menu when hamburger button is clicked
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      const isOpen = navLinks.classList.contains('open');
      navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', !isOpen);
    });
  }

  // Close menu when a link is clicked
  navLinkItems.forEach(link => {
    link.addEventListener('click', function() {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu when clicking outside
  if (navLinks && navToggle) {
    document.addEventListener('click', function(event) {
      const isClickInsideNav = navLinks.contains(event.target);
      const isClickOnToggle = navToggle.contains(event.target);

      if (!isClickInsideNav && !isClickOnToggle && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
});
