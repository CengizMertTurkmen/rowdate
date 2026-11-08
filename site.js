// Fill these in after the Marketplace listing and Lemon Squeezy products exist (see LAUNCH.md).
var ROWDATE = {
  installUrl: 'https://workspace.google.com/marketplace',
  checkoutMonthly: 'https://codeven.lemonsqueezy.com/checkout/buy/861dad6c-44d4-4a90-b4ab-3ecbf3f1d01b',
  checkoutYearly: 'https://codeven.lemonsqueezy.com/checkout/buy/729bf3db-746f-4509-98b4-0347939a7965',
  checkoutLifetime: 'https://codeven.lemonsqueezy.com/checkout/buy/0bc185e6-8174-4d80-a806-9a5fdfaf21c0',
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

  document.querySelectorAll('[data-install]').forEach(function (a) { a.href = ROWDATE.installUrl; });
  document.querySelectorAll('[data-support]').forEach(function (a) {
    a.href = 'mailto:' + ROWDATE.supportEmail; if (!a.textContent.trim()) a.textContent = ROWDATE.supportEmail;
  });
  document.querySelectorAll('[data-checkout]').forEach(function (a) {
    var url = ROWDATE['checkout' + a.getAttribute('data-checkout')];
    a.href = url || ROWDATE.installUrl;
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
