# Persönliche Sicherheits-Checkliste · Personal Security Checklist

**[🇩🇪 Deutsch](#-deutsch) · [🇬🇧 English](#-english)**

---

## 🇩🇪 Deutsch

Eine einzige HTML-Datei mit über 260 Tipps, um Ihr digitales Leben abzusichern und Ihre Privatsphäre zu schützen –
auf Deutsch und Englisch. Läuft komplett **offline**, lädt nichts aus dem Internet und **speichert Ihren Fortschritt in sich selbst**.

### Download

👉 **[Sicherheits-Checkliste.html](../../releases/latest/download/Sicherheits-Checkliste.html)** (neueste Version, siehe [Releases](../../releases))

Herunterladen, per Doppelklick öffnen – fertig.

### Fortschritt speichern

- **Edge / Chrome:** Oben auf „In Datei speichern“ klicken und im Dialog genau diese HTML-Datei auswählen
  (Überschreiben bestätigen). Ab dann wird jede Änderung automatisch in die Datei geschrieben.
  Nach dem nächsten Öffnen einmal „Datei-Speicherung fortsetzen“ klicken und den Zugriff erlauben.
- **Firefox / andere Browser:** „Aktualisierte Datei herunterladen“ speichert eine Kopie mit Ihrem Stand –
  ersetzen Sie damit die alte Datei.
- Zusätzlich wird immer im Browser gespeichert; beim Öffnen gilt der neuere Stand.
- Unter „Mehr“: Fortschritt exportieren/importieren (Backup, Gerätewechsel) oder zurücksetzen.

### Selbst bauen

```sh
npm install
npm run build   # -> dist/Sicherheits-Checkliste.html
```

Die Inhalte stehen in `personal-security-checklist.de.yml` (Deutsch) und `personal-security-checklist.yml` (Englisch).
Beide müssen dieselben Punkte mit denselben IDs enthalten – der Build prüft das.

### Herkunft & Lizenz

Basiert auf [**Digital Defense / personal-security-checklist**](https://github.com/Lissy93/personal-security-checklist)
von [Alicia Sykes](https://aliciasykes.com), lizenziert unter [CC BY 4.0](LICENSE).
Änderungen: deutsche Übersetzung, zusätzliche Checklisten-Punkte, eindeutige IDs für doppelt vorkommende Punkte
und eine neu geschriebene Offline-Oberfläche. Diese Version steht ebenfalls unter CC BY 4.0.

---

## 🇬🇧 English

A single HTML file with more than 260 tips to secure your digital life and protect your privacy –
in German and English. It runs completely **offline**, loads nothing from the internet and **saves your progress inside itself**.

### Download

👉 **[Sicherheits-Checkliste.html](../../releases/latest/download/Sicherheits-Checkliste.html)** (latest version, see [Releases](../../releases))

Download it, double-click to open – done. Use the language button at the top to switch to English.

### Saving your progress

- **Edge / Chrome:** Click “Save to file” at the top and select this very HTML file in the dialog
  (confirm overwriting). From then on every change is written to the file automatically.
  After reopening it, click “Resume saving to file” once and allow access.
- **Firefox / other browsers:** “Download updated file” saves a copy with your progress –
  use it to replace the old file.
- Progress is always mirrored to the browser as well; when opening, the newer state wins.
- Under “More”: export/import your progress (backup, switching devices) or reset it.

### Building it yourself

```sh
npm install
npm run build   # -> dist/Sicherheits-Checkliste.html
```

The content lives in `personal-security-checklist.de.yml` (German) and `personal-security-checklist.yml` (English).
Both must contain the same items with the same IDs – the build checks this.

### Origin & license

Based on [**Digital Defense / personal-security-checklist**](https://github.com/Lissy93/personal-security-checklist)
by [Alicia Sykes](https://aliciasykes.com), licensed under [CC BY 4.0](LICENSE).
Changes: German translation, additional checklist items, unique IDs for items that appear twice
and a newly written offline interface. This version is also licensed under CC BY 4.0.
