// Al-Sami Ovi — shared site behavior
// No localStorage/sessionStorage is used; theme resets to dark on reload,
// which is intentional here. If you host this yourself and want the theme
// choice to persist across visits, that's a small, safe addition to make.

(function () {
  var root = document.documentElement;
  var themeToggle = document.querySelector('.theme-toggle');
  var navToggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav-primary');

  // Theme toggle
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') || 'dark';
      var next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      themeToggle.setAttribute(
        'aria-label',
        next === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      );
    });
  }

  // Mobile nav toggle
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Header elevation on scroll (subtle)
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 8) {
        header.style.borderBottomColor = 'var(--border-strong)';
      } else {
        header.style.borderBottomColor = 'var(--border)';
      }
    };
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Gentle reveal for the hero on load (single orchestrated moment, not a
  // per-section scroll effect)
  var prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (!prefersReducedMotion) {
    var revealEls = document.querySelectorAll('.reveal');
    revealEls.forEach(function (el, i) {
      setTimeout(function () {
        el.classList.add('is-visible');
      }, 80 + i * 90);
    });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }
})();
