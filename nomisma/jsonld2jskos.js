/**
 * Convert the Nomisma vocabulary from JSON-LD to JSKOS (see Makefile).
 */
import ndjson from "ndjson"

// Utility functions
const isEmpty = x => x === null || x === undefined || x === "" || (Array.isArray(x) && !x.length) || (typeof x === "object" && !Object.keys(x).length)
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

    if (item["dcterms:isReplacedBy"]) return // TODO: add alternative identifier?
    
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

// TODO: should be part of jskos-tools
function guessScheme(conceptUri) {
  const schemes = {
    "http://d-nb.info/gnd/": "http://bartoc.org/en/node/430",
    "http://www.wikidata.org/entity/": "http://bartoc.org/en/node/1940",
    "http://viaf.org/viaf/": "http://bartoc.org/en/node/2053",
    "http://sws.geonames.org/": "http://bartoc.org/en/node/1674",
    "https://pleiades.stoa.org/places/": "http://bartoc.org/en/node/20431",
    "http://vocab.getty.edu/tgn/": "http://bartoc.org/en/node/109"
    // TODO
    // "http://collection.britishmuseum.org/id/place/"
    // "http://catalogue.bnf.fr/ark:/12148/"
    //    "https://ikmk.smb.museum/ndp/person/"
    //    "https://ikmk.smb.museum/ndp/ort/"
    //    "https://ikmk.smb.museum/ndp/sachbegriff/"
    //    ...
  }
  for (let [namespace, uri] of Object.entries(schemes)) {
    if (conceptUri.startsWith(namespace)) {
      return { uri }
    }
 }
}

const nomismaURI = "http://nomisma.org/id/"

// for type URIs
const namespaces = {
  crm: 'http://www.cidoc-crm.org/cidoc-crm/',
  nmo: 'http://nomisma.org/ontology#',
  org: 'http://www.w3.org/ns/org#',
  foaf: 'http://xmlns.com/foaf/0.1/'
}

function transform(item) {
  if (item["@type"].indexOf("skos:ConceptScheme") >= 0) {
    return
  }

  const concept = {
    uri: item.uri, 
    notation: [item.uri.substr(nomismaURI.length)],
    prefLabel: languageMap(item["skos:prefLabel"]),
    altLabel: languageMap(item["skos:altLabel"], true),
    definition: languageMap(item["skos:definition"], true),
    scopeNote: languageMap(item["skos:scopeNote"], true),
    inScheme: [{uri:"http://bartoc.org/en/node/1822"}],
    type: ["http://www.w3.org/2004/02/skos/core#Concept"], 
    startDate: item["nmo:hasStartDate"]?.["@value"]
        || entities[item["bio:birth"]?.["@id"]]?.["dcterms:date"]["@value"],
    endDate: item["nmo:hasEndDate"]?.["@value"]
        || entities[item["bio:death"]?.["@id"]]?.["dcterms:date"]["@value"],
    url: item["foaf:homepage"]?.["@id"],
  }

  asArray(item["@type"]).filter(t => t !== "skos:Concept").forEach(t => {
    // simplify types
    if (t == "rdac:Familiy") { 
        t = "foaf:Group"
    } else if (t == "wordnet:Deity") {
        t = "foaf:Person"
    }
    const prefix = t.split(":")[0]
    if (prefix in namespaces) {
      concept.type.push(t.replace(`${prefix}:`, namespaces[prefix]))
    }
  })

  concept.broader = asArray(item["skos:broader"]).filter(Boolean).map(item => item["@id"].replace(/^nm:/,nomismaURI))
    .filter(uri => concepts[uri])
    .map(uri => ({uri}))

  const mappings = []
  const related = []
  withArray(item["skos:exactMatch"], matches => {
    matches.map(m => ({
      from: { memberSet: [ { uri: item.uri } ] },
      to: { memberSet: [ { uri: m["@id"] } ] },
      type: ["http://www.w3.org/2004/02/skos/core#exactMatch"]
    })).forEach(m => mappings.push(m))
  })
  withArray(item["skos:closeMatch"], matches => {
    matches.map(m => ({
      from: { memberSet: [ { uri: item.uri } ] },
      to: { memberSet: [ { uri: m["@id"] } ] },
      type: ["http://www.w3.org/2004/02/skos/core#closeMatch"]
    })).forEach(m => mappings.push(m))
  })
  withArray(item["skos:related"], rels => rels.forEach(
    e => {
     var uri = e["@id"]
     if (uri.match(/^https?:/)) {
       mappings.push({
         from: { memberSet: [ { uri: item.uri } ] },
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
    mappings.forEach(m => {
      const scheme = guessScheme(m.to.memberSet[0].uri)
      if (scheme) {
        m.toScheme = scheme
      } else {
        // console.error(m.to.memberSet[0].uri)
      }
    })  
    concept.mappings = mappings
  }
  if (related.length) {
    concept.related = related
  }

  if (item["geo:long"] && item["geo:lat"]) {
    concept.location = {
      type: "Point",
      coordinates: [parseFloat(item["geo:long"]["@value"]), parseFloat(item["geo:lat"]["@value"])]
    }
  } else if (item["geo:location"]) {
    const loc = entities[item["geo:location"]["@id"]]
    if (loc && loc["geo:long"] && loc["geo:lat"]) {
      concept.location = {
        type: "Point",
        coordinates: [parseFloat(loc["geo:long"]["@value"]), parseFloat(loc["geo:lat"]["@value"])]
      }
      // TODO: loc["dcterms:isPartOf"]["@id"] => broader
    }
  }

  return Object.fromEntries(Object.entries(concept).filter(([_, v]) => !isEmpty(v)))
}

/* TODO: fields not converted yet:
   7390 skos:changeNote
   6451 dcterms:isPartOf
   3405 org:hasMembership
   1211 dcterms:source
    353 rdfs:seeAlso
    317 org:memberOf
     69 prov:alternateOf
     62 foaf:thumbnail
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
