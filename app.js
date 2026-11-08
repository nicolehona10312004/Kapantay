/* =====================================================================
   Kapantay | core app script
   - helpers, theme, quick exit
   - demo authentication (browser-only; see README)
   - per-user progress tracking
   - app shell (sidebar, top bar, footer) injected around .page
   ===================================================================== */
window.K = window.K || {};
(function (K) {
  'use strict';

  /* ---------- Helpers ---------- */
  K.$ = function (s, r) { return (r || document).querySelector(s); };
  K.$$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  K.esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); };
  K.reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  K.file = function () { return (location.pathname.split('/').pop() || 'index.html'); };
  K.ls = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
    del: function (k) { try { localStorage.removeItem(k); } catch (e) {} }
  };
  K.ss = {
    get: function (k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} },
    del: function (k) { try { sessionStorage.removeItem(k); } catch (e) {} }
  };
  K.toast = function (msg) {
    var t = document.createElement('div');
    t.className = 'toast'; t.setAttribute('role', 'status'); t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 2600);
  };

  /* Open a URL in the device's external browser when running on a phone/webview.
     Falls back to a new tab or normal navigation if no external-browser API is available. */
  K.openExternal = function (url, opts) {
    var href = String(url || '').trim();
    if (!href) return false;
    opts = opts || {};
    try {
      if (window.cordova && window.cordova.InAppBrowser) {
        window.cordova.InAppBrowser.open(href, '_system', 'location=yes,toolbar=yes');
        return true;
      }
    } catch (e) {}
    try {
      if (typeof window.open === 'function') {
        var win = window.open(href, opts.target || '_system');
        if (win) return true;
      }
    } catch (e) {}
    var a = document.createElement('a');
    a.href = href; a.target = opts.target || '_blank'; a.rel = 'noopener noreferrer';
    a.style.display = 'none';
    document.body.appendChild(a); a.click(); a.remove();
    return true;
  };


  /* Copy text to the clipboard with a fallback for older browsers / file:// */
  K.copy = function (text) {
    function fallback() {
      return new Promise(function (res) {
        var ta = document.createElement('textarea');
        ta.value = text; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;top:-1000px';
        document.body.appendChild(ta); ta.select();
        var ok = false; try { ok = document.execCommand('copy'); } catch (e) {}
        ta.remove(); res(ok);
      });
    }
    if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(text).then(function () { return true; }, fallback);
    return fallback();
  };

  /* Accessible tab builder: K.tabs(listEl, ['A','B'], function(i){...}) */
  K.tabs = function (list, labels, onSelect, opts) {
    opts = opts || {};
    list.setAttribute('role', 'tablist');
    list.innerHTML = '';
    var cur = -1, btns = labels.map(function (l, i) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'chip'; b.setAttribute('role', 'tab');
      b.id = (opts.prefix || list.id || 'tab') + '-' + i; b.textContent = l;
      b.addEventListener('click', function () { select(i, false); });
      b.addEventListener('keydown', function (e) {
        var n = labels.length, t = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') t = (cur + 1) % n;
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') t = (cur - 1 + n) % n;
        else if (e.key === 'Home') t = 0; else if (e.key === 'End') t = n - 1;
        if (t !== null) { e.preventDefault(); select(t, true); }
      });
      list.appendChild(b); return b;
    });
    function select(i, focus) {
      cur = i;
      btns.forEach(function (b, j) { b.setAttribute('aria-selected', String(j === i)); b.tabIndex = j === i ? 0 : -1; });
      onSelect(i);
      if (focus) btns[i].focus();
    }
    return { select: select, get current() { return cur; } };
  };

  /* ---------- Icons & logo ---------- */
  var ICONS = {
    grid: '<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>',
    alert: '<circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/>',
    chart: '<path d="M4 20V11M10 20V4M16 20v-8M22 20H2"/>',
    check: '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.7 2.7L16 9.8"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.5h.01"/>',
    lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
    out: '<path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 16l4-4-4-4M14 12H4"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/>'
  };
  K.icon = function (n, cls) {
    return '<svg class="' + (cls || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[n] + '</svg>';
  };
  K.logoSprite = function () {
    if (document.getElementById('mark')) return;
    var d = document.createElement('div');
    d.innerHTML = '<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><symbol id="mark" viewBox="0 0 48 48">' +
      '<g fill="none" stroke-width="5" transform="rotate(-100 24 24)"><circle cx="24" cy="24" r="19" stroke="var(--logo-ring)" stroke-dasharray="34.79 5"/><circle cx="24" cy="24" r="19" stroke="var(--logo-accent)" stroke-dasharray="34.79 84.59"/></g>' +
      '<rect x="15" y="18.5" width="18" height="4" rx="2" fill="var(--logo-ring)"/><rect x="15" y="25.5" width="18" height="4" rx="2" fill="var(--logo-ring)"/></symbol></svg>';
    document.body.insertBefore(d.firstChild, document.body.firstChild);
  };
  K.brandHTML = function (href) {
    return '<a class="brand" href="' + (href || 'index.html') + '" aria-label="Kapantay, Gender and Society"><svg aria-hidden="true"><use href="#mark"/></svg>' +
      '<span class="brand-text"><span class="brand-name">Kapantay</span><span class="brand-sub">Gender &amp; Society</span></span></a>';
  };

  /* ---------- Theme & quick exit ---------- */
  var root = document.documentElement;
  function currentTheme() { return root.getAttribute('data-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); }
  K.bindTheme = function (btn) {
    if (!btn) return;
    function label() { btn.setAttribute('aria-label', 'Switch to ' + (currentTheme() === 'dark' ? 'light' : 'dark') + ' theme'); }
    btn.addEventListener('click', function () {
      var n = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', n); K.ls.set('kapantay.theme', n); label();
    });
    label();
  };
  K.quickExit = function () {
    if (K.openExternal('https://www.google.com')) return true;
    window.location.replace('https://www.google.com');
    return true;
  };
  K.bindQuickExit = function (btn) {
    if (btn) btn.addEventListener('click', K.quickExit);
    var last = 0;
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { var t = Date.now(); if (t - last < 700) K.quickExit(); last = t; }
    });
  };

  /* ---------- Demo authentication (browser-only) ----------
     Accounts are stored in this browser's localStorage. Passwords are
     salted and hashed with PBKDF2 when the Web Crypto API is available.
     This is a front-end demonstration: it is NOT real security and
     nothing is sent to a server. See README.md. */
  function hex(buf) { return Array.prototype.map.call(new Uint8Array(buf), function (b) { return ('0' + b.toString(16)).slice(-2); }).join(''); }
  function randomHex(n) {
    var a = new Uint8Array(n);
    if (window.crypto && crypto.getRandomValues) crypto.getRandomValues(a); else for (var i = 0; i < n; i++) a[i] = Math.floor(Math.random() * 256);
    return hex(a.buffer);
  }
  function fallbackHash(s) { var h = 5381; for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0; return 'fb' + (h >>> 0).toString(16); }
  function derive(pw, salt) {
    if (!(window.crypto && crypto.subtle && window.TextEncoder)) return Promise.resolve(fallbackHash(salt + pw));
    var enc = new TextEncoder();
    return crypto.subtle.importKey('raw', enc.encode(pw), 'PBKDF2', false, ['deriveBits']).then(function (key) {
      return crypto.subtle.deriveBits({ name: 'PBKDF2', salt: enc.encode(salt), iterations: 100000, hash: 'SHA-256' }, key, 256);
    }).then(hex);
  }
  function readUsers() { try { return JSON.parse(K.ls.get('kapantay.users') || '{}') || {}; } catch (e) { return {}; } }

  K.auth = {
    session: function () {
      var raw = K.ss.get('kapantay.session') || K.ls.get('kapantay.session');
      try { return raw ? JSON.parse(raw) : null; } catch (e) { return null; }
    },
    uid: function () { var s = this.session(); return s && !s.guest ? s.email : 'guest'; },
    start: function (s, remember) {
      K.ss.del('kapantay.session'); K.ls.del('kapantay.session');
      (remember ? K.ls : K.ss).set('kapantay.session', JSON.stringify(s));
    },
    register: function (name, email, password) {
      email = email.trim().toLowerCase();
      var users = readUsers();
      if (users[email]) return Promise.reject(new Error('An account with this email already exists. Try signing in.'));
      var salt = randomHex(16);
      return derive(password, salt).then(function (h) {
        users[email] = { name: name.trim(), salt: salt, hash: h, created: new Date().toISOString() };
        K.ls.set('kapantay.users', JSON.stringify(users));
        return { email: email, name: name.trim() };
      });
    },
    login: function (email, password, remember) {
      email = email.trim().toLowerCase();
      var u = readUsers()[email], self = this;
      var bad = new Error('That email and password do not match an account on this browser.');
      if (!u) return Promise.reject(bad);
      return derive(password, u.salt).then(function (h) {
        if (h !== u.hash) throw bad;
        self.start({ email: email, name: u.name }, remember);
        return { email: email, name: u.name };
      });
    },
    guest: function () { this.start({ guest: true, name: 'Guest' }, false); },
    logout: function () { K.ss.del('kapantay.session'); K.ls.del('kapantay.session'); },
    resetDemo: function () {
      Object.keys(localStorage).filter(function (k) { return k.indexOf('kapantay.') === 0 && k !== 'kapantay.theme'; }).forEach(function (k) { K.ls.del(k); });
      K.ss.del('kapantay.session');
    }
  };

  /* ---------- Progress tracking (per user, in this browser) ---------- */
  var DEF = { visited: {}, claimsOpened: {}, finder: false, explored: false, quizBest: null, quizDone: false, plan: {}, last: null };
  K.progress = {
    key: function () { return 'kapantay.data.' + K.auth.uid(); },
    get: function () {
      var d; try { d = JSON.parse(K.ls.get(this.key()) || '{}') || {}; } catch (e) { d = {}; }
      return Object.assign({}, DEF, d, { visited: Object.assign({}, d.visited), claimsOpened: Object.assign({}, d.claimsOpened), plan: Object.assign({}, d.plan) });
    },
    update: function (fn) { var d = this.get(); fn(d); K.ls.set(this.key(), JSON.stringify(d)); return d; },
    visit: function (id, label, href) { this.update(function (d) { d.visited[id] = true; d.last = { label: label, href: href, at: Date.now() }; }); },
    milestones: function () {
      var d = this.get(), planN = Object.keys(d.plan).filter(function (k) { return d.plan[k]; }).length;
      var list = [
        { id: 'issue', label: 'Read about the issue', href: 'issues.html', done: !!d.visited.issues },
        { id: 'data', label: 'Explore the data', href: 'evidence.html#statistics', done: !!d.explored },
        { id: 'claims', label: 'Check three common claims', href: 'evidence.html#claims', done: Object.keys(d.claimsOpened).length >= 3 },
        { id: 'rights', label: 'Find the law that applies to you', href: 'evidence.html#laws', done: !!d.finder },
        { id: 'quiz', label: 'Take the quiz', href: 'act.html#quiz', done: !!d.quizDone },
        { id: 'plan', label: 'Choose three actions for your plan', href: 'act.html#plan', done: planN >= 3 }
      ];
      var n = list.filter(function (m) { return m.done; }).length;
      return { list: list, done: n, total: list.length, pct: Math.round(n / list.length * 100), data: d, planN: planN };
    }
  };

  /* ---------- App shell ---------- */
  var NAV = [
    { id: 'dashboard', label: 'Dashboard', href: 'dashboard.html', icon: 'grid', auth: true },
    { id: 'issues', label: 'The issue', href: 'issues.html', icon: 'alert', auth: true },
    { id: 'evidence', label: 'Evidence', href: 'evidence.html', icon: 'chart', auth: true },
    { id: 'act', label: 'Take action', href: 'act.html', icon: 'check', auth: true },
    { id: 'help', label: 'Get help', href: 'help.html', icon: 'phone' },
    { id: 'about', label: 'About', href: 'about.html', icon: 'info' }
  ];
  var LABEL = { dashboard: 'Dashboard', issues: 'The issue', evidence: 'Evidence', act: 'Take action', help: 'Get help', about: 'About Kapantay' };

  K.mountShell = function (opt) {
    var s = K.auth.session();
    if (opt.auth === 'required' && !s) {
      location.replace('index.html?next=' + encodeURIComponent(K.file() + location.hash));
      return false;
    }
    K.logoSprite();
    var page = K.$('.page');
    var initials = s ? (s.guest ? 'G' : s.name.trim().split(/\s+/).map(function (w) { return w[0]; }).slice(0, 2).join('').toUpperCase()) : '';

    var nav = NAV.map(function (n) {
      var locked = n.auth && !s;
      var href = locked ? 'index.html?next=' + encodeURIComponent(n.href) : n.href;
      return '<a href="' + href + '"' + (n.id === opt.page ? ' aria-current="page"' : '') + '>' + K.icon(n.icon) + '<span>' + n.label + '</span>' + (locked ? K.icon('lock', 'lock') : '') + '</a>';
    }).join('');

    var foot = s
      ? '<div class="user"><span class="avatar" aria-hidden="true">' + K.esc(initials) + '</span><div><b>' + K.esc(s.name) + '</b><span>' + (s.guest ? 'Guest mode' : K.esc(s.email)) + '</span></div></div>' +
        '<button class="btn btn-ghost btn-block" id="signOut" type="button">' + K.icon('out') + (s.guest ? 'Leave guest mode' : 'Sign out') + '</button>'
      : '<p class="note" style="margin-bottom:.8rem">Sign in to track your progress and save your action plan.</p><a class="btn btn-primary btn-block" href="index.html">Sign in</a>';

    var shell = document.createElement('div');
    shell.className = 'shell';
    shell.innerHTML =
      '<aside class="sidebar" id="sidebar" aria-label="Site">' + K.brandHTML(s ? 'dashboard.html' : 'index.html') +
      '<nav class="side-nav" aria-label="Primary">' + nav + '</nav><div class="side-foot">' + foot + '</div></aside>' +
      '<div class="scrim" id="scrim"></div>' +
      '<div class="content"><header class="topbar">' +
      '<button class="icon-btn menu-btn" id="menuBtn" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="sidebar">' + K.icon('menu') + '</button>' +
      '<span class="where">' + (LABEL[opt.page] || '') + '</span>' +
      '<button class="icon-btn" id="themeBtn" type="button" aria-label="Switch color theme">' + K.icon('moon') + '</button>' +
      '<button class="quick-exit" id="quickExit" type="button" title="Leave this site immediately (or press Esc twice)">Quick exit</button></header>' +
      '<main id="main"></main>' +
      '<footer class="app-foot"><p>Kapantay is an independent educational project. It is not a government agency, a legal service or a crisis line. If you are in danger, call 911.</p><p>Last reviewed 19 September 2026. Statistics change as new surveys are published; check the linked sources for the latest figures.</p></footer></div>';

    var skip = document.createElement('a');
    skip.className = 'skip'; skip.href = '#main'; skip.textContent = 'Skip to main content';
    document.body.insertBefore(shell, document.body.firstChild);
    document.body.insertBefore(skip, document.body.firstChild);
    K.$('#main', shell).appendChild(page);

    var side = K.$('#sidebar'), scrim = K.$('#scrim'), mb = K.$('#menuBtn');
    function setMenu(o) { side.classList.toggle('open', o); scrim.classList.toggle('show', o); mb.setAttribute('aria-expanded', String(o)); }
    mb.addEventListener('click', function () { setMenu(!side.classList.contains('open')); });
    scrim.addEventListener('click', function () { setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
    K.$$('.side-nav a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });

    K.bindTheme(K.$('#themeBtn')); K.bindQuickExit(K.$('#quickExit'));
    var so = K.$('#signOut');
    if (so) so.addEventListener('click', function () { K.auth.logout(); location.href = 'index.html'; });

    if (s && opt.track) K.progress.visit(opt.page, LABEL[opt.page] || opt.page, K.file());
    return true;
  };

  /* Show the right tab/section when a hash like #claims or #r5 is in the URL */
  K.onHash = function (fn) { window.addEventListener('hashchange', fn); fn(); };
})(window.K);
