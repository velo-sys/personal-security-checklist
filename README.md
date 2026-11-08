# Persönliche Sicherheits-Checkliste – Offline-Version

**🇩🇪 Deutsch · 🇬🇧 English**

Eine einzige HTML-Datei mit über 260 Tipps, um Ihr digitales Leben abzusichern und Ihre Privatsphäre zu schützen –
auf Deutsch und Englisch. Läuft komplett **offline**, lädt nichts aus dem Internet und **speichert Ihren Fortschritt in sich selbst**.

## Download

👉 **[Sicherheits-Checkliste.html](../../releases/latest/download/Sicherheits-Checkliste.html)** (neueste Version, siehe [Releases](../../releases))

Herunterladen, per Doppelklick öffnen – fertig.

## Fortschritt speichern

- **Edge / Chrome:** Oben auf „In Datei speichern“ klicken und im Dialog genau diese HTML-Datei auswählen
  (Überschreiben bestätigen). Ab dann wird jede Änderung automatisch in die Datei geschrieben.
  Nach dem nächsten Öffnen einmal „Datei-Speicherung fortsetzen“ klicken und den Zugriff erlauben.
- **Firefox / andere Browser:** „Aktualisierte Datei herunterladen“ speichert eine Kopie mit Ihrem Stand –
  ersetzen Sie damit die alte Datei.
- Zusätzlich wird immer im Browser gespeichert; beim Öffnen gilt der neuere Stand.
- Unter „Mehr“: Fortschritt exportieren/importieren (Backup, Gerätewechsel) oder zurücksetzen.

## Selbst bauen

```sh
npm install
npm run build   # -> dist/Sicherheits-Checkliste.html
```

Die Inhalte stehen in `personal-security-checklist.de.yml` (Deutsch) und `personal-security-checklist.yml` (Englisch);
beide müssen dieselben Punkte mit denselben IDs enthalten (der Build prüft das).

---

## English

A single, fully offline HTML file containing the personal security checklist in German and English.
It makes no network requests and saves your progress **inside the file itself** (Chrome/Edge write in place
after you pick the file once; other browsers download an updated copy). Build with `npm install && npm run build`.

## Credits & Lizenz / License

Basiert auf [**Digital Defense / personal-security-checklist**](https://github.com/Lissy93/personal-security-checklist)
von [Alicia Sykes](https://aliciasykes.com), lizenziert unter [CC BY 4.0](LICENSE).
Änderungen: deutsche Übersetzung, zusätzliche Checklisten-Punkte, eindeutige IDs für doppelt vorkommende Punkte
und eine neu geschriebene Offline-Oberfläche. Diese Version steht ebenfalls unter CC BY 4.0.

Based on Digital Defense by Alicia Sykes (CC BY 4.0). Changes: German translation, additional items,
unique item IDs and a newly written offline interface.
