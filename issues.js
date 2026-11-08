/* Kapantay | the issue */
(function (K) {
  'use strict';
  if (!K.mountShell({ page: 'issues', auth: 'required', track: true })) return;
  var $ = K.$, c = K.c;

  /* Pictogram */
  K.pictogram($('#pictHost'), { onUse: function () { K.progress.update(function (d) { d.explored = true; }); } });

  /* Forms of violence */
  var fp = $('#formPanel');
  K.tabs($('#formTabs'), K.forms.map(function (f) { return f.tab; }), function (i) {
    var f = K.forms[i];
    fp.setAttribute('aria-labelledby', 'formTabs-' + i);
    fp.innerHTML = '<h3>' + f.tab + '</h3><p>' + f.desc + '</p><ul class="plain-list" style="margin-bottom:1rem">' +
      f.eg.map(function (e) { return '<li>' + e + '</li>'; }).join('') + '</ul><p class="note" style="margin:0"><b>Law:</b> ' + f.law + '</p>';
  }, { prefix: 'formTabs' }).select(0);

  /* Risk groups */
  $('#riskRows').innerHTML = K.risk.map(function (r) { return '<div><dt>' + r[0] + '</dt><dd>' + r[1] + '</dd></div>'; }).join('');

  /* Two-level model: rings + tabs stay in sync */
  var levels = [K.factors.inner, K.factors.outer];
  $('#ringsHost').innerHTML =
    '<svg class="rings" viewBox="0 0 320 320" role="img" aria-label="Two nested circles: the outer circle is community and society, the inner circle is person and relationship.">' +
    '<circle class="ring" id="ringOuter" cx="160" cy="160" r="150"/><circle class="ring" id="ringInner" cx="160" cy="160" r="86"/>' +
    '<text class="ring-t" x="160" y="52" text-anchor="middle">Community and society</text>' +
    '<text class="ring-t" x="160" y="156" text-anchor="middle">Person and</text><text class="ring-t" x="160" y="174" text-anchor="middle">relationship</text></svg>';
  var why = K.tabs($('#whyTabs'), levels.map(function (l) { return l.title; }), function (i) {
    $('#whyList').innerHTML = levels[i].items.map(function (t) { return '<li>' + t + '</li>'; }).join('');
    $('#ringInner').classList.toggle('on', i === 0);
    $('#ringOuter').classList.toggle('on', i === 1);
    var texts = document.querySelectorAll('.ring-t');
    texts.forEach(function (t, j) { t.classList.toggle('lt', (j === 0 && i === 1) || (j > 0 && i === 0)); });
  }, { prefix: 'why' });
  why.select(0);
  $('#ringInner').addEventListener('click', function () { why.select(0); });
  $('#ringOuter').addEventListener('click', function () { why.select(1); });

  /* Consequences */
  var cp = $('#conPanel');
  K.tabs($('#conTabs'), K.consequences.map(function (x) { return x.tab; }), function (i) {
    var x = K.consequences[i];
    cp.innerHTML = '<h3>' + x.title + '</h3><ul class="plain-list">' + x.items.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul>' +
      '<p class="src-line" style="margin:.8rem 0 0">Source ' + c.apply(null, x.cites) + '</p>' + (x.note ? '<p class="note">' + x.note + ' <a href="help.html">Get help</a></p>' : '');
  }, { prefix: 'conTabs' }).select(0);

  /* Prevention */
  $('#prevRows').innerHTML = K.prevention.map(function (p) { return '<div><dt>' + p[0] + '</dt><dd>' + p[1] + '</dd></div>'; }).join('');

  /* Gender gap bars */
  var gap = K.explorer[2];
  K.bars($('#gapBars'), gap.items, { max: gap.max, unit: gap.unit, animate: true });

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
