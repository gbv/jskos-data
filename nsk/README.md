# Systematik des neuen Sachkatalog der Staatsbibliothek zu Berlin (NSK)

Die Daten der NSK bestehen aus drei Facetten:

* Fachgruppen (`NSK_Fachgruppenkatalog.csv`)
* Sachkatalogschlüsseln (`NSK_Sachkatalogschlüssel.csv`)
* Sprachen (`sprachen.csv`)

Außerdem liegen Normdatensätzen zu einzelnen Klassen vor. Im PICA-Katalog der SBB sind die Datensätze mit Suchschlüssel XLSY auffindbar. Diese zusammengesetzten Konzepte beinhalten zusätzlich in den meisten Fällen Namen.

Für die Darstellung ins JSKOS bzw. RDF werden die Notationen bzw. Identifier von Konzepten der NSK-Facetten gebildet aus:

* Den Systemstellen der Fachgruppen (fangen immer mit einem Großbuchstaben an)
* Den Sachschlüsseln (fangen immer mit einer Ziffer an)
* Sprachkürzel (Bestehen immer aus Kleinbuchstaben)
* Namen (in um Sonderzeichen bereinigter Form)


