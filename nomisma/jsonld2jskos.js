const ndjson = require("ndjson")

// Utility functions
const asArray = data => Array.isArray(data) ? data : [data]
const withArray = (data, cb) => {
  const a = asArray(data).filter(Boolean)
  if (a.length) cb(a)
}
const languageMap = (data, lists=false) => asArray(data).reduce(
  (obj,value) => {
    if (value) {
      const lang = value["@language"]
      const str = value["@value"]
      if (lists) {
        if (lang in obj) {
          obj[lang].push(str)
        } else {
          obj[lang] = [str]
        }
      } else {
        obj[lang] = str
      }
    }
    return obj
  }, {})

// temporary store
const entities = {}
const concepts = {}

process.stdin
  .pipe(ndjson.parse())
  .on("data", item => {
    // collect concepts and other entities
    item.uri = item["@id"].replace(/^nm:/,nomismaURI)

    if (item["dcterms:isReplacedBy"]) return // TODO: add identifier?
    
    if (item.uri === item["@id"]) {
      entities[item.uri] = item
    } else {
      concepts[item.uri] = item
    }
  })
  .on("end", () => {
    // process concepts
    Object.values(concepts).map(transform).filter(Boolean).forEach(concept => console.log(JSON.stringify(concept)))
  })

const nomismaURI = "http://nomisma.org/id/"

function transform(item) {
  const prefLabel = languageMap(item["skos:prefLabel"])
  const altLabel = languageMap(item["skos:altLabel"], true)
  const definition = languageMap(item["skos:definition"], true)
  const scopeNote = languageMap(item["skos:scopeNote"], true)

  const concept = {
    uri: item.uri, 
    prefLabel, definition, scopeNote,
    //...item,
    inScheme: [{uri:"http://bartoc.org/en/node/1822"}], // TODO nomismaURI?
    type: ["http://www.w3.org/2004/02/skos/core#Concept"]      
  }

  if (Object.keys(altLabel).length) {
    concept.altLabel = altLabel
  }

  if (item["foaf:homepage"]) {
    concept.url = item["foaf:homepage"]
  }

  if (item["skos:broader"]) {
    concept.broader = asArray(item["skos:broader"]).map(item => item["@id"].replace(/^nm:/,nomismaURI))
      .filter(uri => concepts[uri])
      .map(uri => ({uri}))
  }

  const mappings = []
  const related = []
  withArray(item["skos:exactMatch"], matches => {
    matches.map(m => ({
      to: { memberSet: [ { uri: m["@id"] } ] },
      type: ["http://www.w3.org/2004/02/skos/core#exactMatch"]
    })).forEach(m => mappings.push(m))
  })
  withArray(item["skos:closeMatch"], matches => {
    matches.map(m => ({
      to: { memberSet: [ { uri: m["@id"] } ] },
      type: ["http://www.w3.org/2004/02/skos/core#closeMatch"]
    })).forEach(m => mappings.push(m))
  })
  withArray(item["skos:related"], rels => rels.forEach(
    e => {
     var uri = e["@id"]
     if (uri.match(/^https?:/)) {
       mappings.push({
         to: { memberSet: [ { uri } ] },
         type: ["http://www.w3.org/2004/02/skos/core#relatedMatch"]
       })
     } else if (uri.match(/^nm:/)) {
       uri = uri.replace(/^nm:/,nomismaURI)
       if (concepts[uri]) {
         related.push({uri})
       }
     }
    }
  ))

  if (mappings.length) {
    concept.mappings = mappings
  }
  if (related.length) {
    concept.related = related
  }

  if (item["geo:long"] && item["geo:lat"]) {
    concept.location = {
      type: "Point",
      coordinates: [ item["geo:long"]["@value"], item["geo:lat"]["@value"] ]
    }
  } else if (item["geo:location"]) {
    const loc = entities[item["geo:location"]["@id"]]
    if (loc && loc["geo:long"] && loc["geo:lat"]) {
      concept.location = {
        type: "Point",
        coordinates: [ loc["geo:long"]["@value"], loc["geo:lat"]["@value"] ]
      }
      // TODO: loc["dcterms:isPartOf"]["@id"] => broader
    }
  }

  asArray(item["@type"]).filter(t => t !== "skos:Concept").forEach(t => {
     // TODO: expand URI and add to types
  })

  //concept.type = type
  /* TODO: types
   *    3468 "foaf:Person"
   2379 "nmo:Mint"
    382 "nmo:Denomination"
    254 "foaf:Organization"
    211 "wordnet:Deity"
    199 "nmo:Region"
     96 "rdac:Family"
     73 "nmo:Collection"
     43 "nmo:ObjectType"
     42 "nmo:NumismaticTerm"
     36 "nmo:Material"
     32 "crm:E4_Period"
     31 "org:Role"
     29 "nmo:FieldOfNumismatics"
     25 "nmo:SecondaryTreatment"
     23 "nmo:TypeSeries"
     19 "http://www.w3.org/2002/07/owl#NamedIndividual"
     16 "nmo:PeculiarityOfProduction"
      8 "nmo:Manufacture"
      7 "foaf:Group"
      6 "nmo:Corrosion"
      6 "nmo:CoinWear"
      5 "nmo:ReferenceWork"
      5 "nmo:Ethnic"
      4 "nmo:Hoard"
      4 "nmo:Authenticity"
      3 "nmo:Shape"
      2 "un:Uncertainty"
      1 "org:Membership"
      1 "nmo:FindType"
*/

  if (type.indexOf("skos:ConceptScheme") >= 0) {
    return
  }

  ;[
      "@id","@type","skos:prefLabel","skos:altLabel",
      "skos:scopeNote",
      "skos:definition","skos:inScheme",
      "skos:broader",
      "skos:exactMatch", "skos:closeMatch", "skos:related",
      "geo:location", "geo:long", "geo:lat", "foaf:homepage",

  ].forEach(key => delete concept[key])


  // notation: [row.uri.replace(schemeUri, "")],

  return concept
}

/* MISSING FIELDS SO FAR:
   7392 @type
   7390 skos:changeNote
   6451 dcterms:isPartOf
   3405 org:hasMembership
   1211 dcterms:source
    353 rdfs:seeAlso
    317 org:memberOf
    160 nmo:hasStartDate
    157 nmo:hasEndDate
     92 bio:death
     69 prov:alternateOf
     62 foaf:thumbnail
     46 bio:birth
     19 http://www.w3.org/2002/07/owl#sameAs
     14 nmo:hasMaterial
      6 foaf:depiction
      5 rdfs:comment
      4 skos:note
      4 nmo:hasFindspot
      3 nmo:hasClosingDate
      2 skos:notation
      1 skos:seeAlso
      1 org:role
      1 org:organization
      1 nmo:hasMint
      1 dcterms:partOf
      1 dcterms:created
*/
