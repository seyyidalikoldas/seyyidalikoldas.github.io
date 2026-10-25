// Footer year & Istanbul live clock
document.getElementById('year').textContent = new Date().getFullYear();

function updateClock() {
  var el = document.getElementById('local-time');
  if (!el) return;
  try {
    var now = new Date();
    el.textContent = now.toLocaleTimeString('tr-TR', {
      timeZone: 'Europe/Istanbul',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (e) {
    el.textContent = '';
  }
}
updateClock();
setInterval(updateClock, 30000);

// Interactive Business Type Tabs
var tabs = document.querySelectorAll('.w-tab');
var panes = {
  kafe: document.getElementById('pane-kafe'),
  kurumsal: document.getElementById('pane-kurumsal'),
  ofis: document.getElementById('pane-ofis')
};

tabs.forEach(function (btn) {
  btn.addEventListener('click', function () {
    var target = btn.getAttribute('data-tab');
    tabs.forEach(function (t) {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    Object.keys(panes).forEach(function (k) {
      if (panes[k]) {
        panes[k].classList.toggle('active', k === target);
      }
    });
  });
});

// Selectable Topic Chips in Quote Form
var selectedTopic = 'Kafe QR Menü / Web Sitesi';
var chips = document.querySelectorAll('.topic-chip');
chips.forEach(function (chip) {
  chip.addEventListener('click', function () {
    chips.forEach(function (c) { c.classList.remove('active'); });
    chip.classList.add('active');
    selectedTopic = chip.getAttribute('data-val');
  });
});

// Copy Email Button
var copyBtn = document.getElementById('copy-mail-btn');
if (copyBtn) {
  copyBtn.addEventListener('click', function () {
    var email = copyBtn.getAttribute('data-email');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(function () {
        var orig = copyBtn.textContent;
        copyBtn.textContent = 'Kopyalandı ✓';
        setTimeout(function () { copyBtn.textContent = orig; }, 2000);
      });
    }
  });
}

// Quote Form -> Mailto Builder
var form = document.getElementById('quote-form');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var data = new FormData(form);
    var name = data.get('name') || '';
    var company = data.get('company') || '';
    var message = data.get('message') || '';

    var subject = encodeURIComponent(selectedTopic + ' Talebi — ' + name + ' (' + company + ')');
    var body = encodeURIComponent(
      'Merhaba Ali Bey,\n\n' +
      'Konu: ' + selectedTopic + '\n' +
      'Ad Soyad: ' + name + '\n' +
      'İşletme / İletişim: ' + company + '\n\n' +
      'Notum:\n' + message + '\n'
    );
    window.location.href = 'mailto:info@salikoldas.me?subject=' + subject + '&body=' + body;
  });
}
