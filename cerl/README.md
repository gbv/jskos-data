## Konvertierung des CERL-Thesaurus

## Voraussetzungen

* Die [CERL-Thesaurus-Daten](https://data.cerl.org/thesaurus/) müssen als JSON-LD im Verzeichnis `jsonld` abgelegt sein. Einzelne Datensätze können direkt heruntergeladen werden, einen vollen Datenabzug gibt es auf Anfrage.

* Zur Konvertierung der `.ndjson` Dateien muss [jq](https://stedolan.github.io/jq/) installiert sein.

## Usage

Die Konvertierung ist im Skript `cerl2jskos.jq` implementiert:

    make

Zur Analyse kann das Skript `records.jq` verwendet werden, z.B.

    make records | jq -r keys[] 

## Mapping

Die JSONLD-Daten des [CERL-Thesaurus](https://thesaurus.cerl.org/) enthalten folgende Felder mit ihren Entsprechungen in [JSKOS](https://gbv.github.io/jskos/). Noch sind nicht alle Felder umgesetzt:

### Alle geadded (in cerl2jskos.jq)
- "@id" = `uri`
- "rdf:type" = `type`
- "skos:note" = `note`
- "rdaGr2:nameOfTheCorporateBody" = `prefLabel`
- "rdaGr2:nameOfThePerson" = `prefLabel`
- "rdaGr3:nameOfThePlace" = `prefLabel`
- "rdaGr2:variantNameForTheCorporateBody" = `altLabel`
- "ct:hasPredecessor" = `previous`
- "ct:hasSuccessor" = `next`
- "rdaRelGr2:predecessor" = `previous`
- "rdaRelGr2:successor" = `next`
- "rel:ancestorOf" = `ancestors`

### Noch nicht geadded (in cerl2jskos.jq)
- "ct:dateOfBirthOrFoundation" = `startDate`
- "ct:dateOfDeathOrDissolution" = `endDate`
- "rdaGr2:dateOfBirth" = `startDate`
- "rdaGr2:dateOfDeath" = `endDate`
- "rdaGr2:dateOfEstablishment" = `startDate`
- "rdaGr2:dateOfTermination" = `endDate`
- "foaf:isPrimaryTopicOf" = `topConceptOf`

### Related nicht so wichtig
- "rdaRelGr2:relatedPerson" = `related`
- "rdaRelGr2:relatedCorporateBody" = `related`
- "ct:relatedCorporateBody" = `related`
- "ct:relatedImprintName" = `related`
- "ct:relatedPerson" = `related`
- "rel:antagonistOf" = `related`
- "rel:childOf" = `related`
- "rel:collaboratesWith" = `related`
- "rel:descendantOf" = `related`
- "rel:employedBy" = `related`
- "rel:employerOf" = `related`
- "rel:engagedTo" = `related`
-  "rel:friendOf" = `related`
-  "rel:grandchildOf" = `related`
-  "rel:grandparentOf" = `related`
-  "rel:parentOf" = `related`
-  "rel:siblingOf" = `related`
-  "rel:spouseOf" = `related`

### (Noch) keine JSKOS-Korrespondent gefunden
- "ct:activityNote",
- "ct:biographicalInformation",
- "ct:collaborator",
- "ct:datesOfActivity",
- "ct:endingDateOfActivity",
- "ct:ficticiousImprintName",
- "ct:ficticiousNameForTheCorporateBody",
- "ct:ficticiousNameForThePerson",
- "ct:ficticiousNameForThePlace",
- "ct:geographicNote",
- "ct:imprintName",
- "ct:locationOfActivity",
- "ct:signOrDevice",
- "ct:startingDateOfActivity",
- "ct:variantImprintName",
- "gn:countryCode",
- "gnd:publicationOfThePerson",
- "owl:sameAs",
- "rdaGr2:biographicalInformation",
- "rdaGr2:corporateHistory",
- "rdaGr2:fieldOfActivityOfTheCorporateBody",
- "rdaGr2:fieldOfActivityOfThePerson",
- "rdaGr2:gender",
- "rdaGr2:periodOfActivityOfThePerson",
- "rdaGr2:variantNameForThePerson",
- "rdaGr3:variantNameForThePlace",
- "rdaRelGr2:hierarchicalSuperior",
- "rdaGr2:placeAssociatedWithTheCorporateBody",
-  "wgs84_pos:lat",
-  "wgs84_pos:long"


