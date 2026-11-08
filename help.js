/* Kapantay | get help (public page) */
(function (K) {
  'use strict';
  if (!K.mountShell({ page: 'help', auth: 'optional', track: false })) return;
  var $ = K.$;

  $('#lines').innerHTML = K.hotlines.map(function (h) {
    return '<li><div class="who">' + h.who + '<span class="what">' + h.what + '</span></div>' +
      (h.tel ? '<a class="num" href="' + h.tel + '">' + h.num + '</a>' : '<span class="place">' + h.place + '</span>') + '</li>';
  }).join('');
  $('#bpoSteps').innerHTML = K.bpoSteps.map(function (s) { return '<li><div><b>' + s[0] + '</b><p>' + s[1] + '</p></div></li>'; }).join('');
  $('#whoList').innerHTML = K.whoCanApply.map(function (w) { return '<li>' + w + '</li>'; }).join('');
  $('#timeRows').innerHTML = K.timeLimits.map(function (t) { return '<div><dt>' + t[0] + '</dt><dd>' + t[1] + '</dd></div>'; }).join('');
})(window.K);
