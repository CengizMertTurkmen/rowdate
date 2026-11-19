var ROWDATE = {
  supportEmail: 'CodEven@codeven.io'
};

(function () {
  function pickLang() {
    var q = new URLSearchParams(location.search).get('lang');
    if (q === 'tr' || q === 'en') return q;
    try { var s = localStorage.getItem('rowdate_lang'); if (s) return s; } catch (e) {}
    return (navigator.language || '').toLowerCase().indexOf('tr') === 0 ? 'tr' : 'en';
  }
  function setLang(l) {
    document.body.setAttribute('data-lang', l);
    document.documentElement.lang = l;
    document.querySelectorAll('.langs button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-set') === l));
    });
    try { localStorage.setItem('rowdate_lang', l); } catch (e) {}
  }
  setLang(pickLang());
  document.querySelectorAll('.langs button').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-set')); });
  });

  document.querySelectorAll('[data-support]').forEach(function (a) {
    a.href = 'mailto:' + ROWDATE.supportEmail; if (!a.textContent.trim()) a.textContent = ROWDATE.supportEmail;
  });

  // Hero: each row lights up, then its event lands in the week. Runs once.
  var rows = document.querySelectorAll('.demo .sheet div[data-ev]');
  if (!rows.length) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var i = 0;
  function next() {
    if (i > 0) rows[i - 1].classList.remove('go');
    if (i >= rows.length) return;
    var row = rows[i++];
    row.classList.add('go');
    setTimeout(function () {
      document.getElementById(row.getAttribute('data-ev')).classList.add('on');
      next();
    }, reduce ? 0 : 520);
  }
  setTimeout(next, reduce ? 0 : 600);
})();
