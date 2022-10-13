# Regensburger Verbundklassifikation in JSKOS

Die Regensburger Verbundklassifikation (RVK) wird etwa vierteljährlich von der UB Regensburg als Gesamtabzug und als Teilabzug der Änderungen [zur Verfügung gestellt](https://rvk.uni-regensburg.de/regensburger-verbundklassifikation-online/rvk-download). Die vollständige gepackte MARCXML-Datei umfasst etwa 30MB und entpackt etwa 1.5GB.

Die RVK-Daten werden aus dem internen Verwaltungsystem in das [MARC 21 Format for Classification Data](http://www.loc.gov/marc/classification/) konvertiert. Die Teilmenge der verwendeten MARC-Felder sind [auf einer eigenen Seite](https://rvk.uni-regensburg.de/api_2.0/marcxml.html) beschrieben.

Der Datenbankdump enthält allerdings nicht die in der RVK-Druckversion angegebene Schlüssel und Informationen über die Zusammensetzung von RVK-Klassen.

## Download

Das Bash-Skript `rvkdata.sh` enthalten die vollständigen Befehle für Download und Konvertierung der RVK. Als erstes Kommandozeilenargument wird das Datum des jeweiligen Dumps in der Form `XXXX_X` angegeben (z.B. `2018_4`):

    ./rvkdata.sh 2018_4 get

Die Daten werden für jedes Datum in ein eigenes Unterverzeichnis mit geschrieben.

## Analyse der MARCXML-Dumps (optional)

Zur Kontrolle der MARCXML-Daten lässt sich mit dem Datenverarbeitungs-Werkzeug [Catmandu](http://librecat.org/) eine Statistik der tatsächlich verwendeten MARC-Felder und Unterfelder erstellen. Die dafür benötigten Perl-Module sind in `cpanfile` aufgeführt (`cpanm --installdeps .`):

    ./rvkdata.sh 2018_4 mcstats

## Konvertierung nach JSKOS

Zur Konvertierung der MARCXML-Daten nach JSKOS wird das Python-Programm [mc2skos](https://github.com/scriptotek/mc2skos) benötigt. mc2skos kann mit `pip install --user mc2skos` installiert werden. Besser ist es aber, den Quellcode von mc2skos mit `git clone https://github.com/scriptotek/mc2skos.git` herunterzuladen, da in setup.py von mc2skos zwei Zeilen vor der Installation gelöscht werden sollten, um Fehlermeldungen zu vermeiden. Die entsprechenden Zeilen sind am Ende von setup.py unter `ìnstall_requires` zu finden: `rdflib[sparql]` und `rdflib-jsonld`. mc2skos kann danach mit `pip install -e .` installiert werden. Mit `export PATH=$HOME/.local/bin:$PATH` wird sichergestellt, dass der Pfad zu Python zu $PATH hinzugefügt wird. Damit die Konvertierung funktioniert, muss in mc2skos.py noch eine Referenzierung geändert werden. In der Zeile `import rdflib_jsonld.serializer as json_ld` muss `rdflib_jsonld.serializer` durch `rdflib.plugins.serializers.jsonld` ersetzt werden ([Hintergrund](https://github.com/RDFLib/rdflib-jsonld)). 

Ggf. taucht bei der Konvertierung eine Fehlermeldung auf, dass etree nicht importiert werden kann. In diesem Fall muss das Ubuntu-Paket python3-lxml mit `sudo apt-get remove python3-lxml` deinstalliert und mit `pip install lxml` neu installiert werden.

Die Konvertierung mit mc2skos braucht mind. 12 GB RAM; erfolgreich getestet wurde sie unter Ubuntu 22.04 (LTS) mit Python 3.10 auf einer Virtuellen Maschine.

Die in mc2skos festgelegte URI-Struktur der RVK ist allerdings veraltet, so dass anschließend mit eine [jq](https://stedolan.github.io/jq/)-Skript die JSKOS-Daten bereinigt werden. Beide Konvertierungsschritte lassen sich so aufrufen:

    ./rvkdata.sh 2018_4 jskos

## RVK-Statistik

Mittels [jskos metrics](https://github.com/gbv/jskos-metrics) wird aus den JSKOS-Daten eine Statistik-Datei erstellt:

    ./rvkdata.sh 2018_4 metrics

## Reduktion auf RVK-Basisklassen

Zur Reduktion des MARCXML-Dumps auf die RVK-Basisklassen (Klassen die nicht mit Hilfe eines RVK-Schlüssels gebildet wurden) dient das Script `reduceMarcxml.py`. Dazu muss eine Liste der IDs (MARC-Feld 001) bereitgestellt werden, deren Datensätze behalten werden sollen:
	
    ./reduceMarcxml.py 2019_1/base-ids.txt < 2019_1/rvko_2019_1.xml > 2019_1/rvko_2019_1.reduced.xml

Das Python-Skript benötigt Python 3 und das Modul [pymarc](http://python.org/pypi/pymarc) (`pip install --user pymarc`).

## Englische Übersetzung

Eine Englische Übersetzung der RVK Oberklassen befindet sich in der Datei `rvk-top-en.csv`. Zur Konvertierung nach JSKOS:

    jskos-convert -l en -s <(curl -s http://bartoc.org/api/data?uri=http://bartoc.org/en/node/533) rvk-top-en.csv

Quelle: <https://rvk.uni-regensburg.de/2-uncategorised/148-uebersetzungen> und eigene Ergänzungen
