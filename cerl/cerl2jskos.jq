# Nur Inhalt von @graph verarbeiten
.["@graph"][]
| select(."@id"|startswith("http://thesaurus.cerl.org/record/"))
|

# Utility functions

## convert an array of strings with language to a language map
def languageMap:
  [ .[]? | { key:."@language", value: ."@value" } ] | from_entries
;

def languageMapOfLists:
  languageMap | map_values([.])
;

def prefLabel:
  { und: .[0]["@value"] }
;

def altLabel:
  { und: [.[]?["@value"]] }
;

def linkedItems:
  [ .[]? | select(."@id") | { uri: ."@id" } ]
;

# JSON Concept
{
  uri: ."@id",
  prefLabel: (
    [ 
      ."rdaGr2:nameOfTheCorporateBody"[]?, 
      ."rdaGr2:nameOfThePerson"[]?,
      ."rdaGr3:nameOfThePlace"[]?,
      ."ct:imprintName"[]?
    ] | prefLabel
  ),
  altLabel: (
    ."rdaGr2:variantNameForTheCorporateBody"
  ) | altLabel,
  note: ."skos:note" | languageMapOfLists,
  related: (
    [ 
      ."ct:relatedPerson"[]? 
    ] | linkedItems
  ),
  type: ["http://www.w3.org/2004/02/skos/core#Concept", (."rdf:type"[]?."@id")] 
}
