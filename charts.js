/* =====================================================================
   Kapantay | small dependency-free chart helpers
   K.bars, K.line, K.donut, K.pictogram
   ===================================================================== */
(function (K) {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';

  function fmt(v, unit) { return unit === '%' ? (Math.round(v * 10) / 10) + '%' : Number(v).toLocaleString('en-US'); }
  K.fmt = fmt;

  /* Horizontal bars inside an <ol class="bars"> */
  K.bars = function (ol, items, o) {
    o = o || {};
    ol.innerHTML = '';
    items.forEach(function (it) {
      var w = Math.min(100, it[1] / o.max * 100), li = document.createElement('li');
      li.className = 'bar-row';
      li.setAttribute('data-w', w);
      li.innerHTML = '<span class="bar-label">' + K.esc(it[0]) + '</span><span class="bar-track"><span class="bar-fill" style="width:' + ((o.animate && !K.reduce) ? 0 : w) + '%"></span></span><span class="bar-val">' + fmt(it[1], o.unit) + '</span>';
      ol.appendChild(li);
    });
    if (o.animate && !K.reduce) {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          K.$$('.bar-row', ol).forEach(function (li) { li.querySelector('.bar-fill').style.width = li.getAttribute('data-w') + '%'; });
        });
      });
    }
  };

  function el(name, attrs, text) {
    var e = document.createElementNS(NS, name);
    Object.keys(attrs || {}).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    if (text != null) e.textContent = text;
    return e;
  }

  /* Line chart. o = {points:[[x,y],...], xmin, xmax, ymax, step, unit, label} */
  K.line = function (host, o) {
    var W = 480, H = 260, ml = 56, mr = 26, mt = 36, mb = 40, iw = W - ml - mr, ih = H - mt - mb;
    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, class: 'chart', role: 'img', 'aria-label': o.label });
    var X = function (x) { return ml + (x - o.xmin) / (o.xmax - o.xmin) * iw; };
    var Y = function (y) { return mt + ih - y / o.ymax * ih; };
    for (var g = 0; g <= o.ymax; g += o.step) {
      svg.appendChild(el('line', { x1: ml, x2: W - mr, y1: Y(g), y2: Y(g), class: 'lc-grid' }));
      svg.appendChild(el('text', { x: ml - 8, y: Y(g) + 5, 'text-anchor': 'end', class: 'lc-txt' }, g + (o.unit || '')));
    }
    var d = o.points.map(function (p, i) { return (i ? 'L' : 'M') + X(p[0]).toFixed(1) + ' ' + Y(p[1]).toFixed(1); }).join(' ');
    svg.appendChild(el('path', { d: d, class: 'lc-line' }));
    o.points.forEach(function (p) {
      svg.appendChild(el('circle', { cx: X(p[0]), cy: Y(p[1]), r: 6, class: 'lc-pt' }));
      svg.appendChild(el('text', { x: X(p[0]), y: Y(p[1]) - 15, 'text-anchor': 'middle', class: 'lc-val' }, p[1] + (o.unit || '')));
      svg.appendChild(el('text', { x: X(p[0]), y: H - 12, 'text-anchor': 'middle', class: 'lc-txt' }, String(p[0])));
    });
    host.innerHTML = ''; host.appendChild(svg);
  };

  /* Donut. o = {pct, label, center} */
  K.donut = function (host, o) {
    var r = 54, C = 2 * Math.PI * r;
    var svg = el('svg', { viewBox: '0 0 150 150', class: 'dn', role: 'img', 'aria-label': o.label });
    svg.appendChild(el('circle', { cx: 75, cy: 75, r: r, 'stroke-width': 18, class: 'dn-track' }));
    var v = el('circle', { cx: 75, cy: 75, r: r, 'stroke-width': 18, class: 'dn-val', transform: 'rotate(-90 75 75)', 'stroke-dasharray': (K.reduce ? o.pct / 100 * C : 0) + ' ' + C });
    svg.appendChild(v);
    svg.appendChild(el('text', { x: 75, y: 84, 'text-anchor': 'middle', class: 'dn-num' }, o.center));
    host.innerHTML = ''; host.appendChild(svg);
    if (!K.reduce) requestAnimationFrame(function () { requestAnimationFrame(function () { v.setAttribute('stroke-dasharray', (o.pct / 100 * C) + ' ' + C); }); });
  };

  /* Pictogram with tabs. host gets tabs, 100 dots, caption, legend. */
  K.pictogram = function (host, o) {
    o = o || {};
    host.innerHTML = '<div class="chips" id="' + host.id + 'Tabs"></div><div class="pict" aria-hidden="true"></div><div aria-live="polite"><p class="pict-fig"></p><p class="pict-txt"></p><ul class="legend"></ul></div>';
    var grid = K.$('.pict', host), dots = [];
    for (var i = 0; i < 100; i++) { var d = document.createElement('i'); d.style.setProperty('--i', i); grid.appendChild(d); dots.push(d); }
    function show(idx) {
      var p = K.pict[idx];
      dots.forEach(function (d, i) { d.className = p.mode === 'help' ? (i < p.n ? 'help' : 'on') : (i < p.n ? 'on' : ''); });
      K.$('.pict-fig', host).textContent = p.fig;
      K.$('.pict-txt', host).innerHTML = p.txt;
      K.$('.legend', host).innerHTML = p.mode === 'help'
        ? '<li><span class="dot-sw help"></span>' + p.help + '</li><li><span class="dot-sw on"></span>' + p.on + '</li>'
        : '<li><span class="dot-sw on"></span>' + p.on + '</li><li><span class="dot-sw"></span>' + p.off + '</li>';
    }
    var started = false, initial = true;
    var t = K.tabs(K.$('.chips', host), K.pict.map(function (p) { return p.tab; }), function (i) {
      if (started) show(i);
      if (!initial && o.onUse) o.onUse();
    }, { prefix: host.id + 'T' });
    /* one orchestrated moment: the first view fills in after load */
    t.select(0); initial = false;
    K.$('.pict-fig', host).textContent = K.pict[0].fig;
    K.$('.pict-txt', host).innerHTML = K.pict[0].txt;
    setTimeout(function () { started = true; show(t.current); }, K.reduce ? 0 : 450);
    return t;
  };
})(window.K);
