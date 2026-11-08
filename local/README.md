# Offline-Version (eine einzige HTML-Datei)

Erzeugt `dist/Sicherheits-Checkliste.html` aus `../personal-security-checklist.yml` (EN) und
`../personal-security-checklist.de.yml` (DE). Die Datei läuft komplett offline, lädt nichts nach
und speichert den Fortschritt **in sich selbst**.

```sh
cd web && yarn install   # einmalig, liefert js-yaml und marked
cd .. && node local/build.mjs
```

## Speichern

- **Edge / Chrome:** „In Datei speichern“ klicken und im Dialog genau diese HTML-Datei auswählen
  (Überschreiben bestätigen). Danach wird jede Änderung automatisch in die Datei geschrieben.
  Nach dem erneuten Öffnen einmal „Datei-Speicherung fortsetzen“ klicken (Browser fragt die Berechtigung neu ab).
- **Firefox / andere:** „Aktualisierte Datei herunterladen“ lädt eine Kopie mit dem aktuellen Stand herunter,
  die die alte Datei ersetzt.
- Zusätzlich wird immer im Browser gespeichert; beim Öffnen gewinnt der neuere Stand.
- Über „Mehr“ lässt sich der Fortschritt als JSON exportieren/importieren (Backup, Gerätewechsel).
