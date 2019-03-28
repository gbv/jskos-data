Konvertierung der Bremer Systematik nach JSKOS.

Berücksichtigt werden diese internen Datenbankfelder:

* `syt` Notation
* `syn` Klassenbenennung
* `hie` Hierarchiestufe

Weitere Felder können bei Bedarf hinzugefügt werden.

Die Ausgangsdatei `sys.txt` wird zunächst in eine CSV-Datei folgender Form konvertiert:

~~~
0,"all 000","Allgemeines"
1,"all 001","Allgemeines"
1,"all 010","Allgemeine Enzyklopädien. Konversationslexika"
...
1,"all 066","Abkürzungsverzeichnisse"
2,"all 066.1","Abkürzungsverzeichnisse aus verschiedenen Sprachen"
...
~~~

> Anmerkung: das Fachgebiet "Kulturwissenschaften" konnte nicht erfasst werden, da es anscheinend aus vielen einzelnen Systematiken besteht. Erneute Überprüfung empfohlen.