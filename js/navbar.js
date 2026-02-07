/**
 * Mobile Navigation Menu Toggle
 * Handles hamburger menu open/close on mobile devices
 */

document.addEventListener('DOMContentLoaded', function() {
  const navbarToggle = document.getElementById('navbarToggle');
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.navbar-menu a');

  // Toggle menu when hamburger button is clicked
  if (navbarToggle) {
    navbarToggle.addEventListener('click', function() {
      navbar.classList.toggle('mobile-open');
    });
  }

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navbar.classList.remove('mobile-open');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    const isClickInsideNavbar = navbar.contains(event.target);
    const isClickOnToggle = navbarToggle && navbarToggle.contains(event.target);
    
    if (!isClickInsideNavbar && !isClickOnToggle && navbar.classList.contains('mobile-open')) {
      navbar.classList.remove('mobile-open');
    }
  });
});
