/* Kapantay | take action: LIVES, action plan, quiz */
(function (K) {
  'use strict';
  if (!K.mountShell({ page: 'act', auth: 'required', track: true })) return;
  var $ = K.$, c = K.c;

  /* LIVES */
  $('#livesList').innerHTML = K.lives.map(function (l) {
    return '<li><b>' + l[0] + '</b><span><strong>' + l[1] + '.</strong> ' + l[2] + '</span></li>';
  }).join('');

  /* Action plan (saved per user, in this browser) */
  var total = 0; K.actions.forEach(function (g) { total += g.items.length; });
  var plan = K.progress.get().plan;
  $('#planGroups').innerHTML = K.actions.map(function (g) {
    return '<fieldset class="plan-group"><legend>' + g.g + '</legend>' + g.items.map(function (it) {
      return '<label class="check"><input type="checkbox" data-id="' + it[0] + '"' + (plan[it[0]] ? ' checked' : '') + '><span>' + it[1] + c.apply(null, it[2]) + '</span></label>';
    }).join('') + '</fieldset>';
  }).join('');
  function plain(html) { var t = document.createElement('div'); t.innerHTML = html; return t.textContent; }
  function chosen() {
    var out = []; K.actions.forEach(function (g) { g.items.forEach(function (it) { if (plan[it[0]]) out.push(plain(it[1])); }); });
    return out;
  }
  function renderPlan() {
    var ch = chosen();
    $('#planMeter').style.width = (ch.length / total * 100) + '%';
    $('#planCount').textContent = ch.length + ' of ' + total + ' actions chosen';
    $('#planList').innerHTML = ch.length ? ch.map(function (x) { return '<li>' + K.esc(x) + '</li>'; }).join('')
      : '<li style="list-style:none;margin-left:-1.2rem">Nothing selected yet. Start with one action you can do this week.</li>';
  }
  $('#planGroups').addEventListener('change', function (e) {
    var t = e.target;
    if (t && t.matches('input[type=checkbox]')) {
      plan[t.getAttribute('data-id')] = t.checked;
      K.progress.update(function (d) { d.plan[t.getAttribute('data-id')] = t.checked; });
      renderPlan();
    }
  });
  renderPlan();
  $('#copyPlan').addEventListener('click', function () {
    var ch = chosen();
    if (!ch.length) { $('#planStatus').textContent = 'Choose at least one action first.'; return; }
    K.copy('My Kapantay action plan\n\n' + ch.map(function (x) { return '- ' + x; }).join('\n') + '\n\nKapantay means equal.').then(function (ok) {
      $('#planStatus').textContent = ok ? 'Plan copied.' : 'Copy failed. Select the list above and copy it manually.';
    });
  });

  /* Quiz */
  var qi = 0, score = 0, box = $('#quizBox');
  function renderQ() {
    if (qi >= K.quiz.length) { finish(); return; }
    var q = K.quiz[qi];
    box.innerHTML = '<p class="quiz-meta">Question ' + (qi + 1) + ' of ' + K.quiz.length + '</p><h3 id="qText">' + q.q + '</h3><div role="group" aria-labelledby="qText" id="qOpts"></div><div id="qFeed" aria-live="polite"></div>';
    q.o.forEach(function (t, i) {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'q-opt'; b.textContent = t;
      b.addEventListener('click', function () { answer(i); });
      $('#qOpts').appendChild(b);
    });
  }
  function answer(i) {
    var q = K.quiz[qi];
    K.$$('.q-opt').forEach(function (b, j) { b.disabled = true; if (j === q.a) b.classList.add('right'); else if (j === i) b.classList.add('wrong'); });
    var ok = i === q.a; if (ok) score++;
    $('#qFeed').innerHTML = '<p class="q-why"><b>' + (ok ? 'Correct.' : 'Not quite.') + '</b> ' + q.why + c.apply(null, q.c) + '</p><button class="btn btn-primary" id="qNext" type="button">' + (qi === K.quiz.length - 1 ? 'See my score' : 'Next question') + '</button>';
    $('#qNext').addEventListener('click', function () { qi++; renderQ(); });
    $('#qNext').focus();
  }
  function finish() {
    var best = K.progress.update(function (d) { d.quizDone = true; d.quizBest = Math.max(d.quizBest || 0, score); }).quizBest;
    var n = K.quiz.length;
    var msg = score === n ? 'Perfect score. You know the facts, so share them.' : score >= n * 0.6 ? 'Solid. Review the sources for the ones you missed.' : 'A good start. Explore the Evidence page and try again.';
    box.innerHTML = '<p class="quiz-meta">Quiz complete</p><h3>You scored ' + score + ' out of ' + n + '.</h3><p>' + msg + '</p><p class="note">Your best score on this device: ' + best + ' out of ' + n + '.</p><button class="btn btn-primary" id="qRetry" type="button">Try again</button> <a class="btn btn-ghost" href="evidence.html#sources">Review the sources</a>';
    $('#qRetry').addEventListener('click', function () { qi = 0; score = 0; renderQ(); });
  }
  renderQ();

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
