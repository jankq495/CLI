/* ================================================================
   MUDX4.COM — Scroll & Interaction Animations
   Clean, professional. No DOM injections.
   ================================================================ */

(function () {
  'use strict';

  var CONFIG = {
    parallaxFactor: 0.22,
    revealThreshold: 0.10
  };

  /* ----------------------------------------------------------------
     SCROLL REVEAL — fade + rise para cards, headings, secciones
     ---------------------------------------------------------------- */
  function initScrollReveal() {
    document.querySelectorAll('.section-resource-list__content, .resource-list').forEach(function (g) {
      g.classList.add('mudx4-stagger');
    });

    [
      { sel: '.resource-list__item', cls: 'mudx4-reveal' },
      { sel: '.product-card',        cls: 'mudx4-reveal' },
      { sel: '.shopify-section h2',  cls: 'mudx4-reveal' },
      { sel: '.shopify-section h3',  cls: 'mudx4-reveal' }
    ].forEach(function (item) {
      document.querySelectorAll(item.sel).forEach(function (el) {
        el.classList.add(item.cls);
      });
    });

    document.querySelectorAll('media-with-content, .media-with-content').forEach(function (mwc) {
      var kids = mwc.querySelectorAll(':scope > *');
      if (kids[0]) kids[0].classList.add('mudx4-reveal-left');
      if (kids[1]) kids[1].classList.add('mudx4-reveal-right');
    });

    if (!('IntersectionObserver' in window)) return;

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('mudx4-in-view');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: CONFIG.revealThreshold, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.mudx4-reveal, .mudx4-reveal-left, .mudx4-reveal-right').forEach(function (el) {
      obs.observe(el);
    });
  }

  /* ----------------------------------------------------------------
     HERO PARALLAX — imagen escala ligeramente al hacer scroll
     ---------------------------------------------------------------- */
  function initParallax() {
    var heroImg = document.querySelector('.hero__media-wrapper');
    var hero    = document.querySelector('.hero');
    if (!heroImg || !hero) return;

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          var sy = window.scrollY;
          if (sy < hero.offsetHeight + 100) {
            heroImg.style.transform = 'translateY(' + (sy * CONFIG.parallaxFactor) + 'px)';
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ----------------------------------------------------------------
     HERO ENTRANCE — H1, subtítulo y CTA aparecen escalonados
     ---------------------------------------------------------------- */
  function initHeroEntrance() {
    var items = [
      { el: document.querySelector('.hero h1'),                        delay: '0.2s' },
      { el: document.querySelector('.hero h2'),                        delay: '0.2s' },
      { el: document.querySelector('.hero p'),                         delay: '0.55s' },
      { el: document.querySelector('.hero .button, .hero a.button'),   delay: '0.9s' }
    ];

    items.forEach(function (item) {
      if (!item.el) return;
      item.el.style.opacity    = '0';
      item.el.style.transform  = 'translateY(20px)';
      item.el.style.transition = 'opacity 0.8s ease ' + item.delay + ', transform 0.8s ease ' + item.delay;
    });

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        items.forEach(function (item) {
          if (!item.el) return;
          item.el.style.opacity   = '1';
          item.el.style.transform = 'translateY(0)';
        });
      });
    });
  }

  /* ----------------------------------------------------------------
     HEADER — borde ámbar suave al hacer scroll
     ---------------------------------------------------------------- */
  function initHeaderScroll() {
    var header = document.querySelector('header-component, .header-section');
    if (!header) return;
    var lastScrolled = false;
    window.addEventListener('scroll', function () {
      var scrolled = window.scrollY > 50;
      if (scrolled === lastScrolled) return;
      lastScrolled = scrolled;
      if (scrolled) {
        header.style.borderBottom = '1px solid rgba(232,160,32,0.4)';
        header.style.backdropFilter = 'blur(8px)';
      } else {
        header.style.borderBottom = '';
        header.style.backdropFilter = '';
      }
    }, { passive: true });
  }

  /* ----------------------------------------------------------------
     INIT
     ---------------------------------------------------------------- */
  function init() {
    initScrollReveal();
    initParallax();
    initHeroEntrance();
    initHeaderScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
