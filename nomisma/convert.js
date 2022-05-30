/**
 * Script to download and convert the nomisma vocabulary.
 *
 * Run with: `node convert.js`
 *
 * Output file nomisma-concepts.ndjson
 */

const csv = require("csvtojson")
const fs = require("fs")
const axios = require("axios")

let sparql = `
PREFIX bio: <http://purl.org/vocab/bio/0.1/>
PREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>
PREFIX dcterms: <http://purl.org/dc/terms/>
PREFIX dcmitype: <http://purl.org/dc/dcmitype/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>
PREFIX nm: <http://nomisma.org/id/>
PREFIX nmo: <http://nomisma.org/ontology#>
PREFIX org: <http://www.w3.org/ns/org#>
PREFIX osgeo: <http://data.ordnancesurvey.co.uk/ontology/geometry/>
PREFIX prov: <http://www.w3.org/ns/prov#>
PREFIX rdac: <http://www.rdaregistry.info/Elements/c/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX spatial: <http://jena.apache.org/spatial#>
PREFIX un: <http://www.owl-ontologies.com/Ontology1181490123.owl#>
PREFIX void: <http://rdfs.org/ns/void#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT ?uri ?label ?definition ?type WHERE {
FILTER strStarts(str(?uri), "http://nomisma.org/id/") .
?uri skos:prefLabel ?label FILTER langMatches(lang(?label), "{{language}}") .
OPTIONAL {?uri skos:definition ?definition FILTER langMatches(lang(?definition), "{{language}}")}
?uri rdf:type ?type FILTER (str(?type) != "http://www.w3.org/2004/02/skos/core#Concept")
?uri rdf:type ?type FILTER (str(?type) != "http://www.w3.org/2002/07/owl#NamedIndividual")
?uri rdf:type ?type FILTER (str(?type) != "http://www.w3.org/ns/org#Membership")

FILTER NOT EXISTS {?uri dcterms:isReplacedBy ?replaced}
} ORDER BY ASC(?label)
`
let languages = ["en", "de", "fr"]

let url = lang => `http://nomisma.org/query?query=${encodeURIComponent(sparql.split("{{language}}").join(lang))}&output=csv`

const schemeUri = "http://nomisma.org/id/"

let promises = []
for (let language of languages) {
  promises.push(
    axios.get(url(language)).then(response => csv().fromString(response.data)).then(result => ({ language, result }))
  )
}

Promise.all(promises).then(results => {
  let concepts = []

  for (let { language, result } of results) {
    console.log(`- ${result.length} results for language ${language}`)
    for (let row of result) {
      const { uri, label, definition } = row
      if (!uri) {
        console.log("Missing URI for", row)
        continue
      }
      let concept = concepts.find(concept => concept.uri == uri)
      if (concept) {
        // Integrate details with other language
        if (label) {
          concept.prefLabel[language] = label
        }
        if (definition) {
          concept.definition[language] = [definition]
        }
      } else {
        // Add as new concept
        let concept = {
          uri,
          notation: [row.uri.replace(schemeUri, "")],
          prefLabel: {},
          definition: {},
          type: [
            "http://www.w3.org/2004/02/skos/core#Concept",
            row.type
          ],
          inScheme: [ { uri: schemeUri } ],
        }
        if (label) {
          concept.prefLabel[language] = label
        }
        if (definition) {
          concept.definition[language] = [definition]
        }
        concepts.push(concept)
      }
    }
  }

  // Save as concepts.ndjson
  fs.writeFileSync("nomisma-concepts.ndjson", concepts.reduce((previous, current) => previous + JSON.stringify(current) + "\n", ""))

  console.log(`${concepts.length} concepts converted and saved.`)
})
