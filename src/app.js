/* Offline personal security checklist – saves progress inside this very HTML file.
 * Chrome/Edge: File System Access API writes the file in place (after picking it once).
 * Other browsers: "Save" downloads an updated copy. Progress is always mirrored to localStorage too. */
(function () {
  'use strict';

  var DATA = JSON.parse(document.getElementById('psc-data').textContent);
  var STORAGE_KEY = 'psc-offline-progress';
  var canWriteFile = typeof window.showSaveFilePicker === 'function';

  var EMOJI = {
    password: '🔑', browser: '🌐', email: '✉️', messaging: '💬', social: '👥', network: '📶',
    mobile: '📱', computer: '💻', home: '🏠', finance: '💳', human: '🧠', physical: '🔒',
  };
  var COLORS = {
    yellow: '#facc15', emerald: '#34d399', teal: '#2dd4bf', cyan: '#22d3ee', blue: '#60a5fa', violet: '#a78bfa',
    fuchsia: '#e879f9', pink: '#f472b6', red: '#f87171', purple: '#c084fc', indigo: '#818cf8', lime: '#a3e635',
  };

  var T = {
    de: {
      title: 'Persönliche Sicherheits-Checkliste',
      subtitle: 'Ihr Leitfaden, um Ihr digitales Leben abzusichern und Ihre Privatsphäre zu schützen',
      overall: 'Ihr Fortschritt', of: 'von', doneItems: 'Punkten erledigt', ignoredN: 'ignoriert',
      essential: 'Grundlegend', optional: 'Optional', advanced: 'Fortgeschritten',
      back: '← Alle Bereiche', show: 'Zeige', all: 'Alle', open: 'Offen', completed: 'Erledigt', level: 'Stufe',
      ignore: 'Ignorieren', links: 'Empfohlene Software (englisch)', noneMatch: 'Keine Punkte für diesen Filter.',
      save: 'In Datei speichern', saveCopy: 'Aktualisierte Datei herunterladen', resume: 'Datei-Speicherung fortsetzen',
      savedFile: 'In Datei gespeichert', savedBrowser: 'Nur im Browser gespeichert', unsaved: 'Ungespeicherte Änderungen',
      exportP: 'Fortschritt exportieren', importP: 'Fortschritt importieren', reset: 'Fortschritt zurücksetzen',
      resetConfirm: 'Wirklich den gesamten Fortschritt löschen?', importOk: 'Fortschritt importiert.',
      importFail: 'Die Datei konnte nicht gelesen werden.', theme: 'Hell/Dunkel', lang: 'English',
      menu: 'Mehr', pickHint: 'Wählen Sie im folgenden Dialog genau diese HTML-Datei aus und bestätigen Sie das Überschreiben. Danach wird jede Änderung automatisch darin gespeichert.',
      copyHint: 'Ihr Browser kann Dateien nicht direkt überschreiben. Es wird eine aktualisierte Kopie heruntergeladen – ersetzen Sie damit die alte Datei.',
      writeFail: 'Speichern in die Datei ist fehlgeschlagen. Ihr Fortschritt ist weiterhin im Browser gespeichert.',
      footer: 'Basiert auf „Digital Defense“ von Alicia Sykes (CC BY 4.0), deutsche Übersetzung und Erweiterungen. Läuft komplett offline, es werden keine Daten übertragen.',
      items: 'Punkte',
      sources: 'Auf dem Laufenden bleiben',
      sourcesHint: 'Offizielle Stellen mit aktuellen Warnungen und Ratgebern, dazu ein Videokanal zum Nachschlagen für Selbst-Hosting und fortgeschrittene Themen. Die Seiten öffnen sich erst beim Klick im Browser – diese Datei selbst lädt nichts aus dem Internet.',
    },
    en: {
      title: 'Personal Security Checklist',
      subtitle: 'Your guide to securing your digital life and protecting your privacy',
      overall: 'Your progress', of: 'of', doneItems: 'items done', ignoredN: 'ignored',
      essential: 'Essential', optional: 'Optional', advanced: 'Advanced',
      back: '← All sections', show: 'Show', all: 'All', open: 'Remaining', completed: 'Done', level: 'Level',
      ignore: 'Ignore', links: 'Recommended software', noneMatch: 'No items match this filter.',
      save: 'Save to file', saveCopy: 'Download updated file', resume: 'Resume saving to file',
      savedFile: 'Saved to file', savedBrowser: 'Saved in browser only', unsaved: 'Unsaved changes',
      exportP: 'Export progress', importP: 'Import progress', reset: 'Reset progress',
      resetConfirm: 'Really delete all progress?', importOk: 'Progress imported.',
      importFail: 'The file could not be read.', theme: 'Light/Dark', lang: 'Deutsch',
      menu: 'More', pickHint: 'In the next dialog, select this very HTML file and confirm overwriting it. From then on every change is saved into it automatically.',
      copyHint: 'Your browser cannot overwrite files directly. An updated copy will be downloaded – use it to replace the old file.',
      writeFail: 'Saving to the file failed. Your progress is still stored in the browser.',
      footer: 'Based on “Digital Defense” by Alicia Sykes (CC BY 4.0), German translation and additions. Runs fully offline, no data is transmitted.',
      items: 'items',
      sources: 'Stay up to date',
      sourcesHint: 'Official German sources with current warnings and guides (in German), plus a video channel to look up self-hosting and advanced topics. Pages only open in your browser when you click – this file itself loads nothing from the internet.',
    },
  };

  // Official sources to stay up to date. Plain links: nothing is loaded until the user clicks.
  var SOURCES = [
    {
      name: 'BSI – Bundesamt für Sicherheit in der Informationstechnik',
      links: [
        { url: 'https://www.bsi.bund.de/DE/Themen/Verbraucherinnen-und-Verbraucher/verbraucherinnen-und-verbraucher_node.html',
          de: 'Informationen für Verbraucherinnen und Verbraucher', en: 'Information for consumers' },
        { url: 'https://wid.cert-bund.de/portal/wid/kurzinformationen',
          de: 'Aktuelle Sicherheitswarnungen (WID)', en: 'Current security warnings (WID)' },
        { url: 'https://www.bsi.bund.de/DE/Themen/Verbraucherinnen-und-Verbraucher/Informationen-und-Empfehlungen/Cyber-Sicherheitsempfehlungen/cyber-sicherheitsempfehlungen_node.html',
          de: 'Cyber-Sicherheitsempfehlungen', en: 'Cyber security recommendations' },
        { url: 'https://www.bsi.bund.de/DE/Service-Navi/Abonnements/Newsletter/Buerger-CERT-Abos/Newsletter-Einfach-Cybersicher/newsletter-einfach-cybersicher_node.html',
          de: 'Newsletter „Einfach Cybersicher“', en: 'Newsletter “Einfach Cybersicher”' },
      ],
    },
    {
      name: 'Verbraucherzentrale',
      links: [
        { url: 'https://www.verbraucherzentrale.de/wissen/digitale-welt/phishingradar',
          de: 'Phishing-Radar: aktuelle Betrugsmails', en: 'Phishing radar: current scam emails' },
        { url: 'https://www.verbraucherzentrale.de/fakeshopfinder-71560',
          de: 'Fakeshop-Finder: Online-Shop prüfen', en: 'Fake shop finder: check an online shop' },
        { url: 'https://www.verbraucherzentrale.de/wissen/digitale-welt/apps-und-software/android-und-ios-apptracking-abschalten-59791',
          de: 'Android und iOS: App-Tracking abschalten', en: 'Android and iOS: turn off app tracking' },
        { url: 'https://www.verbraucherzentrale.de/wissen/digitale-welt',
          de: 'Ratgeber Digitale Welt', en: 'Digital world guides' },
      ],
    },
    {
      // Language-specific video channels for self-hosting and advanced topics
      name: { de: 'Selbst hosten & Fortgeschrittenes', en: 'Self-hosting & advanced' },
      links: [
        { only: 'de', url: 'https://www.youtube.com/@ct3003',
          de: 'c\u2019t 3003 (YouTube): Technik, Selbst-Hosting, Datenschutz' },
        { only: 'en', url: 'https://www.youtube.com/@NetworkChuck',
          en: 'NetworkChuck (YouTube): networking, self-hosting, security' },
      ],
    },
  ];

  // ---------- state ----------
  function blank() { return { v: 1, done: {}, ignored: {}, lang: 'de', theme: 'dark', savedAt: 0 }; }
  function sane(p) {
    var s = blank();
    if (p && typeof p === 'object') {
      if (p.done && typeof p.done === 'object') s.done = p.done;
      if (p.ignored && typeof p.ignored === 'object') s.ignored = p.ignored;
      if (p.lang === 'en' || p.lang === 'de') s.lang = p.lang;
      if (p.theme === 'light' || p.theme === 'dark') s.theme = p.theme;
      if (typeof p.savedAt === 'number') s.savedAt = p.savedAt;
    }
    return s;
  }
  function readLocal() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); } catch (e) { return null; }
  }
  var embedded = sane(JSON.parse(document.getElementById('psc-progress').textContent || 'null'));
  var local = readLocal();
  // Whichever copy is newer wins (file vs. browser)
  var state = local && sane(local).savedAt > embedded.savedAt ? sane(local) : embedded;

  var ui = { filter: 'all', levels: { essential: true, optional: true, advanced: true }, menu: false, msg: '' };
  var save = { handle: null, status: state.savedAt === embedded.savedAt ? 'file' : 'browser', needsPermission: false };

  var t = function (k) { return T[state.lang][k]; };
  var sections = function () { return DATA[state.lang]; };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  function stats(items) {
    var total = 0, done = 0, ignored = 0;
    items.forEach(function (i) {
      if (state.ignored[i.id]) { ignored++; return; }
      total++;
      if (state.done[i.id]) done++;
    });
    return { total: total, done: done, ignored: ignored, pct: total ? Math.round((done / total) * 100) : 0 };
  }
  var allItems = function () { return sections().reduce(function (a, s) { return a.concat(s.items); }, []); };

  // ---------- persistence ----------
  function serialize() {
    var progress = JSON.stringify(state).replace(/</g, '\\u003c');
    var part = function (id) { return document.getElementById(id).textContent; };
    var close = '</' + 'script>';
    return '<!DOCTYPE html>\n<html lang="' + state.lang + '">\n<head>\n<meta charset="utf-8">\n' +
      '<meta name="viewport" content="width=device-width, initial-scale=1">\n<meta name="referrer" content="no-referrer">\n' +
      '<title>' + esc(t('title')) + '</title>\n<style id="psc-style">' + part('psc-style') + '</' + 'style>\n</head>\n<body>\n' +
      '<div id="app"></div>\n' +
      '<script id="psc-data" type="application/json">' + part('psc-data') + close + '\n' +
      '<script id="psc-progress" type="application/json">' + progress + close + '\n' +
      '<script id="psc-app">' + part('psc-app') + close + '\n</body>\n</html>\n';
  }

  function fileName() {
    var n = decodeURIComponent(location.pathname.split('/').pop() || '');
    return /\.html?$/i.test(n) ? n : 'Sicherheits-Checkliste.html';
  }

  // IndexedDB keeps the file handle so saving can resume after reopening the file
  function idb(mode, fn) {
    return new Promise(function (resolve, reject) {
      var req = indexedDB.open('psc-offline', 1);
      req.onupgradeneeded = function () { req.result.createObjectStore('handles'); };
      req.onerror = function () { reject(req.error); };
      req.onsuccess = function () {
        var tx = req.result.transaction('handles', mode);
        var r = fn(tx.objectStore('handles'));
        tx.oncomplete = function () { resolve(r && r.result); };
        tx.onerror = function () { reject(tx.error); };
      };
    });
  }
  var handleKey = function () { return location.pathname; };

  var writeTimer = null;
  function persist() {
    state.savedAt = Date.now();
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { /* storage disabled */ }
    if (save.handle && !save.needsPermission) {
      save.status = 'pending';
      clearTimeout(writeTimer);
      writeTimer = setTimeout(writeFile, 400);
    } else {
      save.status = 'browser';
    }
  }

  function writeFile() {
    var content = serialize();
    return save.handle.createWritable()
      .then(function (w) { return w.write(content).then(function () { return w.close(); }); })
      .then(function () { save.status = 'file'; renderStatus(); })
      .catch(function () { save.status = 'browser'; save.handle = null; ui.msg = t('writeFail'); render(); });
  }

  function connectFile() {
    if (!canWriteFile) {
      alert(t('copyHint'));
      var blob = new Blob([serialize()], { type: 'text/html' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = fileName();
      a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 5000);
      return;
    }
    if (save.handle && save.needsPermission) {
      save.handle.requestPermission({ mode: 'readwrite' }).then(function (p) {
        if (p === 'granted') { save.needsPermission = false; writeFile(); }
        render();
      });
      return;
    }
    alert(t('pickHint'));
    window.showSaveFilePicker({
      suggestedName: fileName(),
      types: [{ description: 'HTML', accept: { 'text/html': ['.html', '.htm'] } }],
    }).then(function (h) {
      save.handle = h;
      save.needsPermission = false;
      idb('readwrite', function (s) { return s.put(h, handleKey()); }).catch(function () {});
      return writeFile();
    }).catch(function () { /* dialog cancelled */ });
  }

  function restoreHandle() {
    if (!canWriteFile || !window.indexedDB) return;
    idb('readonly', function (s) { return s.get(handleKey()); }).then(function (h) {
      if (!h) return;
      save.handle = h;
      return h.queryPermission({ mode: 'readwrite' }).then(function (p) {
        save.needsPermission = p !== 'granted';
        render();
      });
    }).catch(function () {});
  }

  function exportProgress() {
    var blob = new Blob([JSON.stringify({ done: state.done, ignored: state.ignored }, null, 2)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'sicherheits-checkliste-fortschritt.json';
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 5000);
  }
  function importProgress() {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json,.json';
    input.onchange = function () {
      var f = input.files && input.files[0];
      if (!f) return;
      f.text().then(function (txt) {
        var p = sane(JSON.parse(txt));
        state.done = p.done; state.ignored = p.ignored;
        persist(); ui.msg = t('importOk'); render();
      }).catch(function () { ui.msg = t('importFail'); render(); });
    };
    input.click();
  }

  // ---------- rendering ----------
  var app = document.getElementById('app');

  function bar(pct, color) {
    return '<div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + pct +
      '"><span style="width:' + pct + '%;' + (color ? 'background:' + color : '') + '"></span></div>';
  }

  function statusHtml() {
    var label = save.status === 'file' ? '✓ ' + t('savedFile') : save.status === 'pending' ? '… ' + t('unsaved') : '⚠ ' + t('savedBrowser');
    var btn = '';
    if (save.status !== 'file' || save.needsPermission) {
      var text = save.needsPermission ? t('resume') : canWriteFile ? t('save') : t('saveCopy');
      btn = ' <button class="btn primary" data-act="save">' + esc(text) + '</button>';
    }
    return '<span class="status ' + save.status + '">' + esc(label) + '</span>' + btn;
  }
  function renderStatus() { var el = document.getElementById('save-status'); if (el) el.innerHTML = statusHtml(); }

  function header() {
    return '<header class="top"><a href="#/" class="brand">🛡️ ' + esc(t('title')) + '</a><div class="actions">' +
      '<span id="save-status">' + statusHtml() + '</span>' +
      '<button class="btn" data-act="lang">🌐 ' + esc(t('lang')) + '</button>' +
      '<button class="btn" data-act="theme" aria-label="' + esc(t('theme')) + '">◐</button>' +
      '<div class="menu"><button class="btn" data-act="menu" aria-expanded="' + ui.menu + '">⋯ ' + esc(t('menu')) + '</button>' +
      (ui.menu ? '<div class="dropdown"><button data-act="export">' + esc(t('exportP')) + '</button>' +
        '<button data-act="import">' + esc(t('importP')) + '</button>' +
        '<button data-act="reset" class="danger">' + esc(t('reset')) + '</button></div>' : '') +
      '</div></div></header>' + (ui.msg ? '<div class="msg" role="status">' + esc(ui.msg) + '</div>' : '');
  }

  function home() {
    var all = stats(allItems());
    var levels = ['essential', 'optional', 'advanced'].map(function (lv) {
      var st = stats(allItems().filter(function (i) { return i.priority === lv; }));
      return '<div class="level ' + lv + '"><div>' + esc(t(lv)) + '</div><b>' + st.pct + '%</b>' + bar(st.pct) + '</div>';
    }).join('');
    var cards = sections().map(function (s) {
      var st = stats(s.items), c = COLORS[s.color] || '#888';
      return '<a class="card" href="#/s/' + encodeURIComponent(s.slug) + '" style="--c:' + c + '">' +
        '<div class="emoji" aria-hidden="true">' + (EMOJI[s.icon] || '⭐') + '</div><div class="card-body">' +
        '<h2>' + esc(s.title) + '</h2><p>' + esc(s.description) + '</p>' +
        '<div class="meta">' + st.done + '/' + st.total + ' · ' + st.pct + '%' + (st.ignored ? ' · ' + st.ignored + ' ' + esc(t('ignoredN')) : '') + '</div>' +
        bar(st.pct, c) + '</div></a>';
    }).join('');
    return '<section class="hero"><h1>' + esc(t('title')) + '</h1><p>' + esc(t('subtitle')) + '</p></section>' +
      '<section class="overview"><div class="panel"><h2>' + esc(t('overall')) + '</h2><p class="big">' + all.done + ' ' + esc(t('of')) + ' ' +
      all.total + ' ' + esc(t('doneItems')) + (all.ignored ? ' · ' + all.ignored + ' ' + esc(t('ignoredN')) : '') + '</p>' + bar(all.pct) +
      '<div class="levels">' + levels + '</div></div></section><section class="grid">' + cards + '</section>' + sourcesPanel();
  }

  function sourcesPanel() {
    var cols = SOURCES.map(function (src) {
      var name = typeof src.name === 'string' ? src.name : src.name[state.lang];
      var links = src.links.filter(function (l) { return !l.only || l.only === state.lang; });
      return '<div class="source"><h3>' + esc(name) + '</h3><ul>' + links.map(function (l) {
        return '<li><a href="' + esc(l.url) + '" target="_blank" rel="noopener noreferrer">' + esc(l[state.lang]) + ' ↗</a></li>';
      }).join('') + '</ul></div>';
    }).join('');
    return '<section class="panel sources"><h2>' + esc(t('sources')) + '</h2><p class="hint">' + esc(t('sourcesHint')) + '</p>' +
      '<div class="source-grid">' + cols + '</div></section>';
  }

  function sectionView(slug) {
    var s = sections().filter(function (x) { return x.slug === slug; })[0];
    if (!s) return home();
    var st = stats(s.items), c = COLORS[s.color] || '#888';
    var list = s.items.filter(function (i) {
      var isDone = !state.ignored[i.id] && state.done[i.id];
      if (ui.filter === 'open' && (isDone || state.ignored[i.id])) return false;
      if (ui.filter === 'done' && !isDone) return false;
      return ui.levels[i.priority];
    });
    var rows = list.map(function (i) {
      var ign = !!state.ignored[i.id], done = !ign && !!state.done[i.id];
      var did = 'd-' + i.id.replace(/[^a-z0-9-]/gi, '_');
      return '<li class="item ' + (done ? 'is-done ' : '') + (ign ? 'is-ignored' : '') + '">' +
        '<div class="check"><input type="checkbox" id="' + did + '" data-done="' + esc(i.id) + '"' + (done ? ' checked' : '') + (ign ? ' disabled' : '') + '></div>' +
        '<div class="content"><div class="row"><label for="' + did + '">' + esc(i.point) + '</label>' +
        '<span class="badge ' + i.priority + '">' + esc(t(i.priority)) + '</span></div>' +
        '<div class="details">' + i.details + '</div>' +
        '<label class="ignore"><input type="checkbox" data-ignore="' + esc(i.id) + '"' + (ign ? ' checked' : '') + '> ' + esc(t('ignore')) + '</label>' +
        '</div></li>';
    }).join('');
    var filterBtn = function (k, label) {
      return '<button class="chip' + (ui.filter === k ? ' on' : '') + '" data-filter="' + k + '" aria-pressed="' + (ui.filter === k) + '">' + esc(label) + '</button>';
    };
    var levelBox = function (lv) {
      return '<label class="chip ' + lv + (ui.levels[lv] ? ' on' : '') + '"><input type="checkbox" data-level="' + lv + '"' + (ui.levels[lv] ? ' checked' : '') + '> ' + esc(t(lv)) + '</label>';
    };
    var links = s.links.length ? '<h3>' + esc(t('links')) + '</h3><ul class="links">' + s.links.map(function (l) {
      return '<li><a href="' + esc(l.url) + '" target="_blank" rel="noopener noreferrer">' + esc(l.title) + '</a></li>';
    }).join('') + '</ul>' : '';
    return '<a class="back" href="#/">' + esc(t('back')) + '</a><article class="section" style="--c:' + c + '">' +
      '<h1><span aria-hidden="true">' + (EMOJI[s.icon] || '⭐') + '</span> ' + esc(s.title) + '</h1><div class="intro">' + s.intro + '</div>' +
      '<div class="progress-line"><b>' + st.done + ' ' + esc(t('of')) + ' ' + st.total + '</b> ' + esc(t('items')) + ' · ' + st.pct + '%' +
      (st.ignored ? ' · ' + st.ignored + ' ' + esc(t('ignoredN')) : '') + bar(st.pct, c) + '</div>' +
      '<div class="filters"><span>' + esc(t('show')) + ':</span>' + filterBtn('all', t('all')) + filterBtn('open', t('open')) + filterBtn('done', t('completed')) +
      '<span>' + esc(t('level')) + ':</span>' + levelBox('essential') + levelBox('optional') + levelBox('advanced') + '</div>' +
      (rows ? '<ul class="items">' + rows + '</ul>' : '<p class="empty">' + esc(t('noneMatch')) + '</p>') + links + '</article>';
  }

  function render() {
    document.documentElement.lang = state.lang;
    document.documentElement.dataset.theme = state.theme;
    document.title = t('title');
    var m = location.hash.match(/^#\/s\/(.+)$/);
    var scrollY = window.scrollY;
    app.innerHTML = header() + '<main>' + (m ? sectionView(decodeURIComponent(m[1])) : home()) + '</main>' +
      '<footer>' + esc(t('footer')) + '</footer>';
    window.scrollTo(0, scrollY);
  }

  // ---------- events ----------
  app.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act],[data-filter]');
    if (!el) { if (ui.menu && !e.target.closest('.menu')) { ui.menu = false; render(); } return; }
    if (el.dataset.filter) { ui.filter = el.dataset.filter; render(); return; }
    var act = el.dataset.act;
    if (act !== 'menu') ui.menu = false;
    ui.msg = '';
    if (act === 'save') return connectFile();
    if (act === 'lang') { state.lang = state.lang === 'de' ? 'en' : 'de'; persist(); }
    if (act === 'theme') { state.theme = state.theme === 'dark' ? 'light' : 'dark'; persist(); }
    if (act === 'menu') ui.menu = !ui.menu;
    if (act === 'export') exportProgress();
    if (act === 'import') return importProgress();
    if (act === 'reset' && confirm(t('resetConfirm'))) { state.done = {}; state.ignored = {}; persist(); }
    render();
  });
  app.addEventListener('change', function (e) {
    var el = e.target, d = el.dataset;
    if (d.done) { state.done[d.done] = el.checked; if (!el.checked) delete state.done[d.done]; }
    else if (d.ignore) {
      if (el.checked) { state.ignored[d.ignore] = true; delete state.done[d.ignore]; } else delete state.ignored[d.ignore];
    } else if (d.level) { ui.levels[d.level] = el.checked; render(); return; }
    else return;
    persist();
    render();
  });
  window.addEventListener('hashchange', function () { ui.menu = false; render(); window.scrollTo(0, 0); });
  // Warn before closing while a write to the file is still pending
  window.addEventListener('beforeunload', function (e) { if (save.status === 'pending') { e.preventDefault(); e.returnValue = ''; } });

  render();
  restoreHandle();
})();
