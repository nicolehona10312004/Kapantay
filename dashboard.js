/* Kapantay | dashboard */
(function (K) {
  'use strict';
  if (!K.mountShell({ page: 'dashboard', auth: 'required', track: false })) return;
  var $ = K.$, c = K.c;
  var s = K.auth.session();

  /* Greeting */
  var h = new Date().getHours(), part = h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
  var first = s.guest ? '' : ', ' + s.name.trim().split(/\s+/)[0];
  $('#greeting').textContent = part + first;
  if (s.guest) $('#subGreet').innerHTML = 'You are browsing as a guest. <a href="index.html#register">Create an account</a> to keep your progress under your name.';

  /* KPIs */
  $('#kpis').innerHTML = K.kpis.map(function (k) {
    return '<div class="kpi"><b>' + k.value + '</b><span>' + k.label + c.apply(null, k.cites) + '</span><small>' + k.tag + '</small></div>';
  }).join('');

  /* Data snapshot */
  var trend = K.explorer[0], gap = K.explorer[2], inited = false;
  var views = [
    { tab: 'Partner violence over time', render: function (b) {
        b.innerHTML = '<h3>' + trend.title + '</h3><p class="note">' + trend.desc + '</p><div id="lineHost"></div><p class="insight">' + trend.insight + '</p><p class="src-line">Source ' + c.apply(null, trend.cites) + '</p>';
        K.line($('#lineHost', b), { points: [[2008, 29], [2017, 24], [2022, 18]], xmin: 2006, xmax: 2024, ymax: 40, step: 10, unit: '%', label: 'Line chart: partner violence reported by Filipino women fell from 29% in 2008 to 24% in 2017 and 18% in 2022.' });
      } },
    { tab: 'Seeking help', render: function (b) {
        b.innerHTML = '<h3>Filipino survivors who sought help</h3><p class="note">Women aged 15 to 49 who experienced physical or sexual violence, 2022 survey.</p><div class="dn-wrap" style="margin:1rem 0"><div id="dnHost"></div><ul class="legend" style="flex-direction:column;gap:.5rem;font-size:1rem"><li><span class="dot-sw help"></span>48% sought help</li><li><span class="dot-sw"></span>52% did not</li></ul></div><p class="insight">Of those who did seek help, 60% turned to family or friends rather than to barangay officials, social workers or the police.</p><p class="src-line">Source ' + c(6) + '</p>';
        K.donut($('#dnHost', b), { pct: 48, center: '48%', label: 'Donut chart: 48% of Filipino survivors of physical or sexual violence sought help.' });
      } },
    { tab: 'Gender gap, 2026', render: function (b) {
        b.innerHTML = '<h3>' + gap.title + '</h3><p class="note">' + gap.desc + '</p><ol class="bars" id="gapBars"></ol><p class="insight">' + gap.insight + '</p><p class="src-line">Source ' + c.apply(null, gap.cites) + '</p>';
        K.bars($('#gapBars', b), gap.items, { max: gap.max, unit: gap.unit, animate: true });
      } }
  ];
  var snap = K.tabs($('#snapTabs'), views.map(function (v) { return v.tab; }), function (i) {
    views[i].render($('#snapBody'));
    if (inited) K.progress.update(function (d) { d.explored = true; });
  }, { prefix: 'snap' });
  snap.select(0); inited = true;

  /* Progress */
  function renderProgress() {
    var m = K.progress.milestones();
    K.donut($('#progDonut'), { pct: m.pct, center: m.pct + '%', label: 'Progress: ' + m.done + ' of ' + m.total + ' steps complete.' });
    $('#progText').textContent = m.done + ' of ' + m.total + ' steps complete. Progress is saved on this device.';
    $('#todo').innerHTML = m.list.map(function (x) {
      return '<li class="' + (x.done ? 'done' : '') + '"><span class="tick" aria-hidden="true"></span><a href="' + x.href + '">' + x.label + '</a>' + (x.done ? '<span class="sr"> (done)</span>' : '') + '</li>';
    }).join('');
    var next = m.list.filter(function (x) { return !x.done; })[0], last = m.data.last;
    var out = '';
    if (next) out += '<a class="btn btn-primary" href="' + next.href + '">Next step: ' + next.label + '</a> ';
    else out += '<p class="callout" style="margin:0">You have completed every step. Share what you learned with someone today.</p>';
    if (last && last.href) out += '<p class="note" style="margin:.8rem 0 0">Last visited: <a href="' + last.href + '">' + K.esc(last.label) + '</a></p>';
    $('#resume').innerHTML = out;
  }
  renderProgress();

  /* Fact of the day */
  var day = Math.floor(Date.now() / 86400000), fi = day % K.facts.length;
  function showFact() { $('#factText').innerHTML = K.facts[fi].t; }
  showFact();
  $('#nextFact').addEventListener('click', function () { fi = (fi + 1) % K.facts.length; showFact(); });

  /* Quick help + updates */
  $('#qhLines').innerHTML = K.hotlines.filter(function (x) { return x.tel && /^(911|0919|\(02\) 8929)/.test(x.num); }).map(function (x) {
    return '<li><div class="who">' + x.who + '<span class="what">' + x.what + '</span></div><a class="num" href="' + x.tel + '">' + x.num + '</a></li>';
  }).join('');
  $('#updates').innerHTML = K.updates.map(function (u) { return '<li><time>' + u.date + '</time>' + u.t + '</li>'; }).join('');
})(window.K);
