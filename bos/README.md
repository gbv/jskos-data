Konvertierung der Bremer Systematik nach JSKOS.

## Ausgangsdaten

Die Bremer Systematik liegt als Datenbankabzug in der Datei `sys.txt` vor. Die geordneten Datensätze haben eine eine einfache Key-Value-Struktur mit folgenden Feldern:

Feld| Anzahl Vorkommen | Beschreibung           
----| ----------------:| -------------
syo | 69426 |
syt | 69960 |
srt | 64441 |
hie | 69960 | Hierarchiestufe
syn | 69956 | Klassenbenennung
syr | 58444 | Synonyme Benennung   
dtyp| 70207 | immer `a`, kann also ignoriert werden
bes | 69955 |
sqn | 70207 |
empty| 244  |
syn_e|   1  |
syr_e|   1  |
syz  | 201  | Überschrift
hea  | 5868 | Überschrift
hea1 |   62 | Überschrift
k1  |   193 | Erklärungen 
k2  |   239 | Erklärungen 
date|    69963|
hist|    5519|
OBJ| 244    |
owner| 2843|
vww | 2870 | Verweise    

Die Notationen sollten dem regularen Ausdruck `^[a-z]{3} [0-9]{3}(\.[0-9]+)?( [a-z]+)?$` entsprechend (abgesehen von einigen zu korrigierenden Fehlern).

## Konvertierung

Berücksichtigt werden bislang nur die Datenbankfelder:

* `syt` Notation
* `syn` Klassenbenennung
* `hie` Hierarchiestufe

Die Ausgangsdatei `sys.txt` wird zunächst mit dem Python-Skript `txt2csv.py` in eine CSV-Datei folgender Form konvertiert (erfordert Python 3):

~~~
0,"all","Allgemeines"
1,"all 000","Allgemeines"
2,"all 001","Allgemeines"
2,"all 010","Allgemeine Enzyklopädien. Konversationslexika"
...
2,"all 066","Abkürzungsverzeichnisse"
3,"all 066.1","Abkürzungsverzeichnisse aus verschiedenen Sprachen"
...
~~~

Die Oberklassen sind nicht in `syt.txt` enthalten. Daher wurde per Hand die CSV-Datei `top.csv` erstellt. Das Fachgebiet "Kulturwissenschaften" ist davon ausgenommen, da es eine eigene Systematik verwendet, die aus einzelnen Klassen der gesamten Systematik zusammengesetzt ist.

Anschließend kann `sys.csv` mit `jskos-convert` nach NDJSON konvertiert werden. Der Aufruf dazu befindet sich in `Makefile`:

    make

