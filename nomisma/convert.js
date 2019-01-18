/**
 * Script to download and convert the nomisma vocabulary.
 *
 * Before running: `npm i`
 *
 * Run with: `node convert.js`
 *
 * Output files: scheme.json, concepts.ndjson.
 */

const csv = require("csvtojson")
const fs = require("fs")
const axios = require("axios")

let url = "http://nomisma.org/query?query=PREFIX%20bio%3A%20%3Chttp%3A%2F%2Fpurl.org%2Fvocab%2Fbio%2F0.1%2F%3E%0APREFIX%20crm%3A%20%3Chttp%3A%2F%2Fwww.cidoc-crm.org%2Fcidoc-crm%2F%3E%0APREFIX%20dcterms%3A%20%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Fterms%2F%3E%0APREFIX%20dcmitype%3A%20%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Fdcmitype%2F%3E%0APREFIX%20foaf%3A%20%3Chttp%3A%2F%2Fxmlns.com%2Ffoaf%2F0.1%2F%3E%0APREFIX%20geo%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2003%2F01%2Fgeo%2Fwgs84_pos%23%3E%0APREFIX%20nm%3A%20%3Chttp%3A%2F%2Fnomisma.org%2Fid%2F%3E%0APREFIX%20nmo%3A%20%3Chttp%3A%2F%2Fnomisma.org%2Fontology%23%3E%0APREFIX%20org%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2Fns%2Forg%23%3E%0APREFIX%20osgeo%3A%20%3Chttp%3A%2F%2Fdata.ordnancesurvey.co.uk%2Fontology%2Fgeometry%2F%3E%0APREFIX%20prov%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2Fns%2Fprov%23%3E%0APREFIX%20rdac%3A%20%3Chttp%3A%2F%2Fwww.rdaregistry.info%2FElements%2Fc%2F%3E%0APREFIX%20rdf%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX%20rdfs%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0APREFIX%20skos%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2004%2F02%2Fskos%2Fcore%23%3E%0APREFIX%20spatial%3A%20%3Chttp%3A%2F%2Fjena.apache.org%2Fspatial%23%3E%0APREFIX%20un%3A%20%3Chttp%3A%2F%2Fwww.owl-ontologies.com%2FOntology1181490123.owl%23%3E%0APREFIX%20void%3A%20%3Chttp%3A%2F%2Frdfs.org%2Fns%2Fvoid%23%3E%0APREFIX%20xsd%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%0ASELECT%20%3Furi%20%3Flabel%20%3Fdefinition%20%3Ftype%20WHERE%20%7B%0AFILTER%20strStarts%28str%28%3Furi%29%2C%20%22http%3A%2F%2Fnomisma.org%2Fid%2F%22%29%20.%0A%3Furi%20skos%3AprefLabel%20%3Flabel%20FILTER%20langMatches%28lang%28%3Flabel%29%2C%20%22en%22%29%20.%0AOPTIONAL%20%7B%3Furi%20skos%3Adefinition%20%3Fdefinition%20FILTER%20langMatches%28lang%28%3Fdefinition%29%2C%20%22en%22%29%7D%0A%3Furi%20rdf%3Atype%20%3Ftype%20FILTER%20%28str%28%3Ftype%29%20%21%3D%20%22http%3A%2F%2Fwww.w3.org%2F2004%2F02%2Fskos%2Fcore%23Concept%22%29%0A%0AFILTER%20NOT%20EXISTS%20%7B%3Furi%20dcterms%3AisReplacedBy%20%3Freplaced%7D%0A%7D%20ORDER%20BY%20ASC%28%3Flabel%29&output=csv"

const uri = "http://nomisma.org/id/"
const scheme = {
  uri,
  notation: ["NOMISMA"],
  prefLabel: {
    en: "Nomisma"
  },
  languages: ["en"],
  identifier: [
    "http://bartoc.org/en/node/1822",
    "http://www.wikidata.org/entity/Q24578999"
  ],
  license: [
    {
      uri: "http://creativecommons.org/licenses/by/3.0/"
    }
  ],
  publisher: [
    {
      prefLabel: {
        en: "Nomisma.org"
      },
      altLabel: {
        en: [
          "Nomisma"
        ]
      },
      url: "http://nomisma.org"
    }
  ],
}
const schemeShort = { uri }

axios.get(url).then(response => csv().fromString(response.data)).then(json => {
  let concepts = []

  for (let row of json) {
    if (!row.uri || !row.label) {
      console.log("Missing info for", row)
    }
    let concept = {
      uri: row.uri,
      notation: [row.uri.replace(uri, "")],
      prefLabel: {
        en: row.label
      },
      definition: {
        en: row.definition
      },
      type: [
        "http://www.w3.org/2004/02/skos/core#Concept",
        row.type
      ],
      inScheme: [schemeShort],
    }
    concepts.push(concept)
  }

  // Save scheme as scheme.json
  fs.writeFileSync("nomisma-scheme.json", JSON.stringify(scheme, null, 2))
  // Save as concepts.ndjson
  fs.writeFileSync("nomisma-concepts.ndjson", concepts.reduce((previous, current) => previous + JSON.stringify(current) + "\n", ""))

  console.log(`${concepts.length} concepts converted and saved.`)

})
