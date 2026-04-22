(function () {
  // ── Smooth scroll ──────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      var el = document.querySelector(id);
      if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  // ── Day / Night toggle ─────────────────────────────
  var html = document.documentElement;
  var btn = document.getElementById('theme-toggle');
  var saved = localStorage.getItem('exial-theme');
  if (saved === 'day') { html.classList.add('day'); if (btn) btn.textContent = '🌙'; }

  if (btn) {
    btn.addEventListener('click', function () {
      if (html.classList.contains('day')) {
        html.classList.remove('day');
        btn.textContent = '🌙';
        localStorage.setItem('exial-theme', 'night');
      } else {
        html.classList.add('day');
        btn.textContent = '☀️';
        localStorage.setItem('exial-theme', 'day');
      }
    });
  }

  // ── Animated bars (phone + revenue + allocation) ───
  function animateBars(entries, observer) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.phone-bar-fill, .rev-bar-fill, .alloc-bar-fill').forEach(function (bar) {
        var w = bar.getAttribute('data-width');
        if (w) bar.style.width = w;
      });
      observer.unobserve(entry.target);
    });
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(animateBars, { threshold: 0.25 });
    document.querySelectorAll('.phone-outer, .rev-panel, .tracker-panel').forEach(function (el) {
      io.observe(el);
    });
  } else {
    // Fallback: set immediately
    document.querySelectorAll('.phone-bar-fill, .rev-bar-fill, .alloc-bar-fill').forEach(function (bar) {
      var w = bar.getAttribute('data-width');
      if (w) bar.style.width = w;
    });
  }

  // ── Fade-in on scroll ──────────────────────────────
  var fadeTargets = document.querySelectorAll('.stat-card, .inv-metric, .xs-card, .ec-cell, .ws-card, .rat-card, .faq-card, .cap-row, .tracker-card');
  if ('IntersectionObserver' in window && fadeTargets.length) {
    fadeTargets.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(14px)';
      el.style.transition = 'opacity 0.38s ease, transform 0.38s ease';
    });
    var fadeIO = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.15 });
    fadeTargets.forEach(function (el) { fadeIO.observe(el); });
  }
})();
