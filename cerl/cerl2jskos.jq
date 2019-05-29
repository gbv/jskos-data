#jq -f cerl2jskos.jq jsonld/cerl_thesaurus_0.ndjson 

# Nur Inhalt von @graph verarbeiten
.["@graph"][]
| select(."@id"|startswith("http://thesaurus.cerl.org/record/"))
|

# Utility functions

def languageEntry:
  { key:(."@language"//"und"), value: ."@value" } 
;

def languageMapOfLists:
  reduce (.[]? | languageEntry) as $p (
    {}; .[$p.key] += [$p.value]
  )
;

def languageMapOfStrings:
  [ . | languageEntry ] | from_entries
;

def useId:
  select(."@id") | { uri: ."@id" }
;

def simpleField($field; $content):
  if ($content|length>0) then
    { ($field): $content }
  else 
    {}
  end 
;

def arrayField($field; elements):
  [ elements ] as $array |
  if ($array|length>0) then
    { ($field): $array }
  else 
    {}
  end 
;

# JSON Concept
{
  uri: ."@id",
  type: [
    "http://www.w3.org/2004/02/skos/core#Concept",
    ."rdf:type"[]?."@id"
  ]
}
+ simpleField("prefLabel"; (
    ."rdaGr2:nameOfTheCorporateBody"[]?, 
    ."rdaGr2:nameOfThePerson"[]?,
    ."rdaGr3:nameOfThePlace"[]?,
    ."ct:imprintName"[]?
    ) | languageMapOfStrings
)
+ simpleField("altLabel"; (
    ."rdaGr2:variantNameForTheCorporateBody"
    ) | languageMapOfLists
)
+ simpleField("note"; 
    ."skos:note" | languageMapOfLists 
)
+ arrayField("related";
    ."ct:relatedPerson"[]? 
    | useId
)
+ arrayField("ancestors";
    ."rel:ancestorOf"[]?
)
+ arrayField("previous";
    ."rdaRelGr2:predecessor"[]?,
	."ct:hasPredecessor"[]?
)
+ arrayField("next";
    ."rdaRelGr2:successor"[]?,
    ."ct:hasSuccessor"[]?
)
