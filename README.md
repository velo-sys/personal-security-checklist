# Persönliche Sicherheits-Checkliste · Personal Security Checklist

<div align="center">

The checklist content is based on **[Digital Defense](https://github.com/Lissy93/personal-security-checklist)**
by **[Alicia Sykes](https://github.com/Lissy93)** ([aliciasykes.com](https://aliciasykes.com)) — thank you!<br>
Die Inhalte der Checkliste basieren auf **[Digital Defense](https://github.com/Lissy93/personal-security-checklist)**
von **[Alicia Sykes](https://github.com/Lissy93)** — vielen Dank!

## 🤖 Vibecoded with Claude Code

[![Built with Claude Code](https://img.shields.io/badge/built%20with-Claude%20Code-D97757?style=for-the-badge)](https://claude.com/claude-code)

**This entire offline version was written by [Claude Code](https://claude.com/claude-code)** — the German
translation of all checklist items, the build script and the single-file interface that saves its progress
into itself.

**Diese komplette Offline-Version wurde von [Claude Code](https://claude.com/claude-code) geschrieben** — die
deutsche Übersetzung aller Checklisten-Punkte, das Build-Skript und die Oberfläche in einer einzigen Datei,
die ihren Fortschritt in sich selbst speichert.

**[🇩🇪 Deutsch](#-deutsch) · [🇬🇧 English](#-english)**

</div>

---

## 🇩🇪 Deutsch

Eine einzige HTML-Datei mit über 260 Tipps, um Ihr digitales Leben abzusichern und Ihre Privatsphäre zu
schützen – **komplett offline**, kein Konto, kein Server, keine Verbindung ins Internet, keine Cookies.
Ihr Fortschritt wird **in der Datei selbst** gespeichert.

[Datei herunterladen](../../releases/latest/download/Sicherheits-Checkliste.html) · [Alle Releases](../../releases)

### Funktionen

**12 Bereiche mit 268 Punkten**, jeweils eingestuft als *Grundlegend*, *Optional* oder *Fortgeschritten*:

| Bereich | Bereich | Bereich |
|---|---|---|
| 🔑 Anmeldung & Passwörter | 🌐 Surfen im Web | ✉️ E-Mail |
| 💬 Messenger | 👥 Soziale Medien | 📶 Netzwerke |
| 📱 Smartphone & Tablet | 💻 Computer | 🏠 Smart Home |
| 💳 Finanzen | 🧠 Faktor Mensch | 🔒 Physische Sicherheit |

**Außerdem:**

- **Deutsch und Englisch**, jederzeit umschaltbar – der Fortschritt bleibt dabei erhalten
- **Fortschritt** gesamt, pro Stufe und pro Bereich; Punkte lassen sich abhaken oder ignorieren
- **Filter** nach offen/erledigt und nach Stufe
- **Speichern in der Datei selbst**, zusätzlich im Browser; beim Öffnen gilt der neuere Stand
- **Export/Import** des Fortschritts als JSON (Backup, Gerätewechsel)
- Hell/Dunkel, druckfreundlich, auch am Handy nutzbar
- An Deutschland angepasst: BSI, Verbraucherzentrale, Sperr-Notruf 116 116, SCHUFA-Selbstauskunft u. a.

### Installation

Keine. [`Sicherheits-Checkliste.html`](../../releases/latest/download/Sicherheits-Checkliste.html) herunterladen
und per Doppelklick öffnen.

**Fortschritt speichern:**

- **Edge / Chrome:** Oben auf „In Datei speichern“ klicken und im Dialog genau diese HTML-Datei auswählen
  (Überschreiben bestätigen). Ab dann wird jede Änderung automatisch in die Datei geschrieben.
  Nach dem nächsten Öffnen einmal „Datei-Speicherung fortsetzen“ klicken und den Zugriff erlauben.
- **Firefox / andere Browser:** „Aktualisierte Datei herunterladen“ speichert eine Kopie mit Ihrem Stand –
  ersetzen Sie damit die alte Datei.
- Unter „Mehr“: Fortschritt exportieren, importieren oder zurücksetzen.

### Selbst bauen

Voraussetzung: Node.js 20 oder neuer.

```bash
git clone https://github.com/velo-sys/personal-security-checklist
cd personal-security-checklist
npm install
npm run build            # -> dist/Sicherheits-Checkliste.html
```

### Unter der Haube

Reines HTML, CSS und JavaScript ohne Framework und ohne Laufzeit-Abhängigkeiten · File System Access API
(Edge/Chrome) mit Download-Fallback · localStorage und IndexedDB · Build mit `js-yaml` und `marked`

```
personal-security-checklist.de.yml   Inhalte Deutsch
personal-security-checklist.yml      Inhalte Englisch
src/app.js                           Oberfläche, Fortschritt, Speichern
src/app.css                          Gestaltung (hell/dunkel, mobil, Druck)
build.mjs                            packt alles in eine HTML-Datei, prüft die IDs
```

### Mitmachen

Pull Requests sind willkommen. Zwei Bitten:

- `npm run build` muss durchlaufen – der Build prüft, dass beide Sprachen dieselben Punkte mit denselben IDs haben.
- Neue oder geänderte Punkte immer in **beiden** YAML-Dateien pflegen.

### Lizenz

[CC BY 4.0](LICENSE) – wie das Original
[Digital Defense](https://github.com/Lissy93/personal-security-checklist) von
[Alicia Sykes](https://aliciasykes.com). Änderungen gegenüber dem Original: deutsche Übersetzung,
zusätzliche Checklisten-Punkte, eindeutige IDs für doppelt vorkommende Punkte und eine neu geschriebene
Offline-Oberfläche.

---

## 🇬🇧 English

A single HTML file with more than 260 tips to secure your digital life and protect your privacy –
**fully offline**, no account, no server, no internet connection, no cookies. Your progress is saved
**inside the file itself**.

[Download the file](../../releases/latest/download/Sicherheits-Checkliste.html) · [All releases](../../releases)

### Features

**12 sections with 268 items**, each rated *Essential*, *Optional* or *Advanced*:

| Section | Section | Section |
|---|---|---|
| 🔑 Authentication | 🌐 Web Browsing | ✉️ Email |
| 💬 Messaging | 👥 Social Media | 📶 Networks |
| 📱 Mobile Devices | 💻 Personal Computers | 🏠 Smart Home |
| 💳 Personal Finance | 🧠 Human Aspect | 🔒 Physical Security |

**On top of that:**

- **German and English**, switchable at any time – your progress is kept
- **Progress** overall, per level and per section; items can be ticked off or ignored
- **Filters** by remaining/done and by level
- **Saving into the file itself**, mirrored to the browser; when opening, the newer state wins
- **Export/import** your progress as JSON (backup, switching devices)
- Light/dark, print-friendly, works on phones too

### Install

None. Download [`Sicherheits-Checkliste.html`](../../releases/latest/download/Sicherheits-Checkliste.html)
and double-click it. Use the language button at the top to switch to English.

**Saving your progress:**

- **Edge / Chrome:** Click “Save to file” at the top and select this very HTML file in the dialog
  (confirm overwriting). From then on every change is written to the file automatically.
  After reopening it, click “Resume saving to file” once and allow access.
- **Firefox / other browsers:** “Download updated file” saves a copy with your progress –
  use it to replace the old file.
- Under “More”: export, import or reset your progress.

### Build

Requirements: Node.js 20 or newer.

```bash
git clone https://github.com/velo-sys/personal-security-checklist
cd personal-security-checklist
npm install
npm run build            # -> dist/Sicherheits-Checkliste.html
```

### Under the hood

Plain HTML, CSS and JavaScript, no framework and no runtime dependencies · File System Access API
(Edge/Chrome) with a download fallback · localStorage and IndexedDB · built with `js-yaml` and `marked`

```
personal-security-checklist.de.yml   content, German
personal-security-checklist.yml      content, English
src/app.js                           interface, progress, saving
src/app.css                          styling (light/dark, mobile, print)
build.mjs                            bundles everything into one HTML file, checks the IDs
```

### Contributing

Pull requests are welcome. Two requests:

- `npm run build` has to pass – it checks that both languages contain the same items with the same IDs.
- Add or change items in **both** YAML files.

### License

[CC BY 4.0](LICENSE) – like the original
[Digital Defense](https://github.com/Lissy93/personal-security-checklist) by
[Alicia Sykes](https://aliciasykes.com). Changes from the original: German translation, additional
checklist items, unique IDs for items that appear twice and a newly written offline interface.
