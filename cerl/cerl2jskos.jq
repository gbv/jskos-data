# Nur Inhalt von @graph verarbeiten
.["@graph"][]

| select(."@id"|startswith("http://thesaurus.cerl.org/record/"))

|

# JSON Concept
{
  uri: ."@id",
  type: ["http://www.w3.org/2004/02/skos/core#Concept", (."rdf:type"[]?."@id")] 
}
