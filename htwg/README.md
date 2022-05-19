# Bibliothekssystematik der Hochschule Konstanz für Technik, Wirtschaft und Gestaltung (HTWG)

Siehe <http://bartoc.org/en/node/1339>.

Die Ausgangsdaten der Systematik wurden als PDF-Datei zur Verfügung gestellt und mit `pdftotext` in Text umgewandelt und per Hand bereinigt:

- Titel entfernen
- Steuerzeichen (`^L`) entfernen
- Seitenzahlen und Layout normalisieren (`perl -e 's/^[0-9_ ]+$//' | uniq`)
- Einige verschobenen Zeilen korrigieren, so dass sich immer Klassenbeschreibung und Notation abwechseln

Stand: 18. Ausgabe (Juni 2021)
