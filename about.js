/* Kapantay | about (public page) */
(function (K) {
  'use strict';
  if (!K.mountShell({ page: 'about', auth: 'optional', track: false })) return;
  var $ = K.$;

  $('#pillars').innerHTML = K.pillars.map(function (p) { return '<div><h3>' + p[0] + '</h3><p>' + p[1] + '</p></div>'; }).join('');
  $('#gloss').innerHTML = K.glossary.map(function (g) { return '<div><dt>' + g[0] + '</dt><dd>' + g[1] + '</dd></div>'; }).join('');
  $('#faqList').innerHTML = K.faq.map(function (f) {
    return '<details class="acc"><summary><span class="acc-title">' + f[0] + '</span><span></span><span class="chev" aria-hidden="true"></span></summary><div class="body"><p>' + f[1] + '</p></div></details>';
  }).join('');

  $('#resetBtn').addEventListener('click', function () {
    if (window.confirm('This deletes every demo account, progress record and action plan saved in this browser, and signs you out. Continue?')) {
      K.auth.resetDemo(); location.href = 'index.html';
    }
  });

  /* Sub-navigation scroll spy */
  var links = K.$$('#subnav a');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) links.forEach(function (a) {
          if (a.getAttribute('href') === '#' + en.target.id) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-25% 0px -65% 0px' });
    links.forEach(function (a) { var t = document.getElementById(a.getAttribute('href').slice(1)); if (t) io.observe(t); });
  }
})(window.K);
