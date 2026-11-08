/* Kapantay | login page: sign in, create account, guest access */
(function (K) {
  'use strict';
  var $ = K.$;
  K.logoSprite();
  $('#themeBtn').innerHTML = K.icon('moon');
  K.bindTheme($('#themeBtn'));
  K.bindQuickExit($('#quickExit'));

  /* Where to go after sign-in (only allow our own pages) */
  function nextUrl() {
    var m = /[?&]next=([^&]+)/.exec(location.search), n = m ? decodeURIComponent(m[1]) : '';
    return /^[a-z]+\.html(#[A-Za-z0-9_-]+)?$/i.test(n) && n !== 'index.html' ? n : 'dashboard.html';
  }
  if (K.auth.session()) { location.replace(nextUrl()); return; }

  /* Dot field: one orchestrated moment on load */
  var dots = $('#authDots'), items = [];
  for (var i = 0; i < 100; i++) { var d = document.createElement('i'); d.style.setProperty('--i', i); dots.appendChild(d); items.push(d); }
  setTimeout(function () { items.forEach(function (d, i) { if (i < 32) d.classList.add('on'); }); }, K.reduce ? 0 : 500);

  /* Tabs */
  var tabIn = $('#tabIn'), tabUp = $('#tabUp'), paneIn = $('#paneIn'), paneUp = $('#paneUp');
  function show(which, focus) {
    var isIn = which === 'in';
    tabIn.setAttribute('aria-selected', String(isIn)); tabUp.setAttribute('aria-selected', String(!isIn));
    tabIn.tabIndex = isIn ? 0 : -1; tabUp.tabIndex = isIn ? -1 : 0;
    paneIn.hidden = !isIn; paneUp.hidden = isIn;
    $('#authTitle').textContent = isIn ? 'Welcome back' : 'Create your account';
    $('#authSub').textContent = isIn ? 'Sign in to pick up your progress and action plan.' : 'Track what you have learned and save your action plan.';
    msg(''); clearErrors();
    if (focus) (isIn ? $('#inEmail') : $('#upName')).focus();
  }
  tabIn.addEventListener('click', function () { show('in', true); });
  tabUp.addEventListener('click', function () { show('up', true); });
  [tabIn, tabUp].forEach(function (t) {
    t.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { var w = t === tabIn ? 'up' : 'in'; show(w, false); (w === 'in' ? tabIn : tabUp).focus(); }
    });
  });
  if (location.hash === '#register') show('up', false);

  /* Messages & errors */
  function msg(text, type) {
    var m = $('#formMsg');
    m.innerHTML = text ? '<div class="form-msg ' + (type || 'bad') + '">' + K.esc(text) + '</div>' : '';
  }
  function setErr(id, text) {
    var e = $('#' + id + 'Err'), inp = $('#' + id);
    if (e) e.textContent = text || '';
    if (inp) { if (text) inp.setAttribute('aria-invalid', 'true'); else inp.removeAttribute('aria-invalid'); }
    return !text;
  }
  function clearErrors() { ['inEmail', 'inPw', 'upName', 'upEmail', 'upPw', 'upPw2', 'upAgree'].forEach(function (id) { setErr(id, ''); }); }
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /* Show / hide password */
  document.querySelectorAll('[data-toggle]').forEach(function (b) {
    b.addEventListener('click', function () {
      var inp = document.getElementById(b.getAttribute('data-toggle')), show = inp.type === 'password';
      inp.type = show ? 'text' : 'password'; b.textContent = show ? 'Hide' : 'Show'; b.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
    });
  });

  /* Password strength */
  function score(pw) {
    var s = 0;
    if (pw.length >= 8) s++;
    if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) s++;
    if (/\d/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw) || pw.length >= 14) s++;
    return s;
  }
  $('#upPw').addEventListener('input', function () {
    var s = score(this.value), bars = document.querySelectorAll('.strength i');
    bars.forEach(function (b, i) { b.classList.toggle('on', i < s); });
    $('#strengthTxt').textContent = !this.value ? 'Use at least 8 characters.' : ['Too weak', 'Weak', 'Fair', 'Good', 'Strong'][s];
  });

  function busy(btn, on, label) { btn.disabled = on; btn.textContent = on ? 'Please wait' : label; }

  /* Sign in */
  $('#formIn').addEventListener('submit', function (e) {
    e.preventDefault(); msg('');
    var email = $('#inEmail').value, pw = $('#inPw').value;
    var ok = setErr('inEmail', EMAIL.test(email.trim()) ? '' : 'Enter a valid email address.');
    ok = setErr('inPw', pw ? '' : 'Enter your password.') && ok;
    if (!ok) return;
    var btn = $('#btnIn'); busy(btn, true);
    K.auth.login(email, pw, $('#remember').checked).then(function () { location.href = nextUrl(); })
      .catch(function (err) { busy(btn, false, 'Sign in'); msg(err.message); });
  });

  /* Create account */
  $('#formUp').addEventListener('submit', function (e) {
    e.preventDefault(); msg('');
    var name = $('#upName').value, email = $('#upEmail').value, pw = $('#upPw').value, pw2 = $('#upPw2').value;
    var ok = setErr('upName', name.trim().length >= 2 ? '' : 'Enter your name.');
    ok = setErr('upEmail', EMAIL.test(email.trim()) ? '' : 'Enter a valid email address.') && ok;
    ok = setErr('upPw', pw.length >= 8 ? '' : 'Use at least 8 characters.') && ok;
    ok = setErr('upPw2', pw2 === pw ? '' : 'The passwords do not match.') && ok;
    ok = setErr('upAgree', $('#upAgree').checked ? '' : 'Please confirm to continue.') && ok;
    if (!ok) return;
    var btn = $('#btnUp'); busy(btn, true);
    K.auth.register(name, email, pw)
      .then(function () { return K.auth.login(email, pw, false); })
      .then(function () { location.href = nextUrl(); })
      .catch(function (err) { busy(btn, false, 'Create account'); msg(err.message); });
  });

  /* Guest */
  $('#btnGuest').addEventListener('click', function () { K.auth.guest(); location.href = nextUrl(); });

  /* Forgot password / reset */
  $('#forgot').addEventListener('click', function (e) {
    e.preventDefault();
    msg('Accounts live only in this browser, so there is no email reset. Create a new account with a different email, continue as guest, or reset demo data below.', 'ok');
  });
  $('#resetDemo').addEventListener('click', function (e) {
    e.preventDefault();
    if (window.confirm('This deletes every demo account, progress record and action plan saved in this browser. Continue?')) {
      K.auth.resetDemo(); msg('Demo data cleared. You can create a new account.', 'ok');
    }
  });
})(window.K);
