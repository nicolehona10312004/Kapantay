/* Kapantay | evidence: statistics, laws, claims, sources */
(function (K) {
  'use strict';
  if (!K.mountShell({ page: 'evidence', auth: 'required', track: true })) return;
  var $ = K.$, $$ = K.$$, c = K.c;
  function explored() { K.progress.update(function (d) { d.explored = true; }); }

  /* ---------- Statistics: data explorer ---------- */
  var exInit = false;
  K.tabs($('#exTabs'), K.explorer.map(function (e) { return e.tab; }), function (i) {
    var e = K.explorer[i];
    $('#exPanel').setAttribute('aria-labelledby', 'exTabs-' + i);
    $('#exTitle').textContent = e.title; $('#exDesc').textContent = e.desc;
    K.bars($('#bars'), e.items, { max: e.max, unit: e.unit, animate: exInit });
    $('#exInsight').textContent = e.insight;
    $('#exSrc').innerHTML = 'Source ' + c.apply(null, e.cites) + (e.unit === '%' && e.max < 100 ? ' Scale runs from 0 to ' + e.max + '%.' : '');
    if (exInit) explored();
  }, { prefix: 'exTabs' }).select(0);
  exInit = true;

  K.pictogram($('#pictHost'), { onUse: explored });
  $('#ledger').innerHTML = K.ledger.map(function (f) { return '<div class="fact searchable"><b>' + f.b + '</b><span>' + f.t + '</span></div>'; }).join('');

  /* ---------- Laws: finder ---------- */
  var fo = $('#finderOpts');
  K.finder.forEach(function (f, i) {
    var l = document.createElement('label'); l.className = 'opt';
    l.innerHTML = '<input type="radio" name="sit" value="' + i + '"><span>' + f.label + '</span>';
    l.querySelector('input').addEventListener('change', function () {
      $('#finderResult').innerHTML = '<h3>' + f.law + '</h3><p>' + f.body + '</p><ol>' + f.steps.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ol>';
      K.progress.update(function (d) { d.finder = true; });
    });
    fo.appendChild(l);
  });

  /* ---------- Laws: ledger ---------- */
  var state = { law: 'all', verdict: 'all', q: '' };
  var lawList = $('#lawList');
  K.laws.forEach(function (l) {
    var d = document.createElement('details');
    d.className = 'acc law searchable'; d.setAttribute('data-cat', l.cat);
    d.innerHTML = '<summary><span class="law-ra">' + l.ra + '</span><span><span class="acc-title">' + l.title + '</span><span class="law-meta"><span>' + l.year + '</span><span class="tag">' + K.lawCatName[l.cat] + '</span></span></span><span class="chev" aria-hidden="true"></span></summary>' +
      '<div class="body"><p style="font-weight:500">' + l.sum + '</p><ul>' + l.pts.map(function (p) { return '<li>' + p + '</li>'; }).join('') + '</ul></div>';
    lawList.appendChild(d);
  });
  var lf = $('#lawFilters');
  K.lawCats.forEach(function (ct, i) {
    var b = document.createElement('button'); b.type = 'button'; b.className = 'chip'; b.textContent = ct[1]; b.setAttribute('aria-pressed', String(i === 0));
    b.addEventListener('click', function () {
      $$('button', lf).forEach(function (x) { x.setAttribute('aria-pressed', 'false'); }); b.setAttribute('aria-pressed', 'true');
      state.law = ct[0]; applyFilters();
    });
    lf.appendChild(b);
  });

  /* ---------- Claims ---------- */
  var claimList = $('#claimList');
  K.claims.forEach(function (cl, i) {
    var d = document.createElement('details');
    d.className = 'acc searchable'; d.setAttribute('data-v', cl.v);
    d.innerHTML = '<summary><span class="acc-title">&ldquo;' + cl.claim + '&rdquo;</span><span class="verdict v-' + cl.v + '">' + cl.label + '</span><span class="chev" aria-hidden="true"></span></summary><div class="body"><p>' + cl.body + '</p></div>';
    d.addEventListener('toggle', function () {
      if (d.open) K.progress.update(function (p) { p.claimsOpened[i] = true; });
    });
    claimList.appendChild(d);
  });
  var vf = $('#verdictFilters');
  [['all', 'All claims'], ['false', 'Not supported'], ['mis', 'Misleading'], ['partly', 'Partly true']].forEach(function (v, i) {
    var b = document.createElement('button'); b.type = 'button'; b.className = 'chip'; b.textContent = v[1]; b.setAttribute('aria-pressed', String(i === 0));
    b.addEventListener('click', function () {
      $$('button', vf).forEach(function (x) { x.setAttribute('aria-pressed', 'false'); }); b.setAttribute('aria-pressed', 'true');
      state.verdict = v[0]; applyFilters();
    });
    vf.appendChild(b);
  });

  /* ---------- Sources ---------- */
  var refList = $('#refList');
  function plain(html) { var t = document.createElement('div'); t.innerHTML = html; return t.textContent; }
  K.refs.forEach(function (r) {
    var li = document.createElement('li');
    li.id = 'r' + r.id; li.setAttribute('data-n', r.id); li.className = 'searchable';
    li.innerHTML = r.ref + ' <a href="' + r.url + '" target="_blank" rel="noopener noreferrer">' + K.esc(r.url.replace(/^https?:\/\/(www\.)?/, '')) + '</a><span class="used">Used for: ' + r.used + '</span><button type="button" aria-label="Copy citation for source ' + r.id + '">Copy citation</button>';
    var sourceLink = li.querySelector('a');
    sourceLink.addEventListener('click', function (e) {
      e.preventDefault();
      K.openExternal(r.url);
    });
    li.querySelector('button').addEventListener('click', function () {
      K.copy(plain(r.ref) + ' ' + r.url).then(function (ok) { K.toast(ok ? 'Citation copied' : 'Copy failed. Select the text and copy it manually.'); });
    });
    refList.appendChild(li);
  });

  /* ---------- Tabs, search and filters ---------- */
  var IDS = ['statistics', 'laws', 'claims', 'sources'], LABELS = ['Statistics', 'Laws', 'Claim check', 'Sources'], active = 0;
  var evTabs = K.tabs($('#evTabs'), LABELS, function (i) {
    active = i;
    IDS.forEach(function (id, j) { $('#tab-' + id).hidden = j !== i; });
    $('#q').value = ''; state.q = ''; applyFilters();
  }, { prefix: 'evTab' });

  function applyFilters() {
    var sec = $('#tab-' + IDS[active]), q = state.q.trim().toLowerCase(), items = $$('.searchable', sec), shown = 0;
    items.forEach(function (el) {
      var ok = true;
      if (IDS[active] === 'laws') ok = state.law === 'all' || el.getAttribute('data-cat') === state.law;
      if (IDS[active] === 'claims') ok = state.verdict === 'all' || el.getAttribute('data-v') === state.verdict;
      if (ok && q) ok = el.textContent.toLowerCase().indexOf(q) !== -1;
      el.hidden = !ok; if (ok) shown++;
    });
    $('#resultCount').textContent = (q || (IDS[active] === 'laws' && state.law !== 'all') || (IDS[active] === 'claims' && state.verdict !== 'all')) && items.length
      ? 'Showing ' + shown + ' of ' + items.length + (shown === 0 ? '. Try a different word or clear the filter.' : '') : '';
  }
  $('#q').addEventListener('input', function () { state.q = this.value; applyFilters(); });

  function fromHash() {
    var h = location.hash.replace('#', '');
    var ref = /^r(\d+)$/.exec(h);
    if (ref) { evTabs.select(3); var t = document.getElementById(h); if (t) setTimeout(function () { t.scrollIntoView({ block: 'center' }); }, 30); return; }
    var i = IDS.indexOf(h);
    if (i > -1) evTabs.select(i); else if (evTabs.current < 0) evTabs.select(0);
  }
  window.addEventListener('hashchange', fromHash);
  fromHash();
  $$('#evTabs button').forEach(function (b, i) {
    b.addEventListener('click', function () { if (history.replaceState) history.replaceState(null, '', '#' + IDS[i]); });
  });
})(window.K);
