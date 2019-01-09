# Regensburger Verbundklassifikation in JSKOS

Die Regensburger Verbundklassifikation (RVK) wird etwa vierteljährlich als Gesamtabzug und als Teilabzug der Änderungen [zur Verfügung gestellt](https://rvk.uni-regensburg.de/regensburger-verbundklassifikation-online/rvk-download). Die vollständige gepackte MARCXML-Datei umfasst etwa 30MB und entpackt etwa 1.5GB.

Das Bash-Skript `rvkdata.sh` (und das daraus aufgerufene `Makefile`) enthalten die vollständigen Befehle für Download und Konvertierung der RVK.

## Datenformat

Die RVK-Daten werden aus dem internen Verwaltungsystem in das [MARC 21 Format for Classification Data](http://www.loc.gov/marc/classification/) konvertiert. Die Teilmenge der verwendeten MARC-Felder sind [auf einer eigenen Seite](https://rvk.uni-regensburg.de/api_2.0/marcxml.html) beschrieben.

Zur Kontrolle lässt sich mit Catmandu eine Statistik der tatsächlich verwendeten MARC-Felder und Unterfelder erstellen. Die dafür benötigten Perl-Module sind in `cpanfile` aufgeführt:

    ./rvkdata.sh 2018_4 mcstats

## Konvertierung

Zur Konvertierung wird mc2skos verwendet:

    ./rvkdata.sh 2018_4 jskos

**ACHTUNG**: *Die in mc2skos festgelegte URI-Struktur der RVK muss noch geändert werden!*

Der Datenbankdump enthält außerdem nicht die in der RVK-Druckversion angegebene Schlüssel und Informationen über die Zusammensetzung von RVK-Klassen.

