import { XMLParser } from "fast-xml-parser"
import fs from "node:fs"
import _ from "lodash"
import jskos from "jskos-tools"
import { parseNoteIntoTokens } from "./note-parser.js"

const [, , source = "./bk-concepts.xml", target = "./bk-concepts.ndjson"] = process.argv

const bk = new jskos.ConceptScheme({
  uri: "http://uri.gbv.de/terminology/bk/",
  namespace: "http://uri.gbv.de/terminology/bk/",
})

const topConcepts = [
  {
    notation: ["0"],
    prefLabel: { de: "Allgemeine Werke und Philosophie" },
  },
  {
    notation: ["1-2"],
    prefLabel: { de: "Geisteswissenschaften" },
  },
  {
    notation: ["3-4"],
    prefLabel: { de: "Naturwissenschaften" },
  },
  {
    notation: ["5"],
    prefLabel: { de: "Ingenieurwissenschaften" },
  },
  {
    notation: ["7-8"],
    prefLabel: { de: "Sozialwissenschaften" },
  },
]

// Maps Pica fields to JSKOS properties
// TODO: Add option to use "old" property mapping
const propertyMap = {
  "041R": "scopeNote",
  "044F": "altLabel",
  "045C": "note",
  "047A": "definition",
}

const uriOnly = (item) => _.pick(item, ["uri"])
const conceptSort = (a, b) => {
  if (a.notation[0] < b.notation[0]) return -1
  if (a.notation[0] > b.notation[0]) return 1
  return 0
}
const toArray = (item) => (_.isArray(item) ? item : [item]).filter(Boolean)
const fromSubfield = (field, code = "a") => toArray(field.subfield).filter(f => f.code === code).map(f => f["#text"])
const parseDate = (dateString) => {
  const [, day, month, year] = dateString.match(/\d{4}:(\d{2})-(\d{2})-(\d{2})/)
  return `${parseInt(year) < 90 ? "20" : "19"}${year}-${month}-${day}`
}

// Parse XML
const bkXml = fs.readFileSync(source, "utf-8")
const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "",
  parseTagValue: false,
})
const bkParsed = parser.parse(bkXml)

// Prepare top concepts
topConcepts.forEach(concept => {
  concept.topConceptOf = [uriOnly(bk)]
  concept.uri = bk.uriFromNotation(concept.notation[0])
  concept.type = ["http://schema.vocnet.org/NonIndexingConcept"]
})

let concepts = []

for (const record of bkParsed.collection.record) {
  const concept = {}
  for (const field of record.datafield) {
    if (field.tag === "009B") {
      // Level, will be further used later to build hierarchy
      concept.LEVEL = parseInt(field.subfield["#text"])
    }
    if (field.tag === "045A") {
      // notation in $a
      concept.notation = fromSubfield(field)
      // prefLabel in $j
      concept.prefLabel = { de: fromSubfield(field, "j").join(", ") }
    }
    // created and modified dates; need to be adjusted later
    if (field.tag === "001A") {
      concept.created = parseDate(fromSubfield(field, "0")[0])
    }
    if (field.tag === "001B") {
      concept.modified = parseDate(fromSubfield(field, "0")[0])
    }
    if (propertyMap[field.tag]) {
      if (!concept[propertyMap[field.tag]]) {
        concept[propertyMap[field.tag]] = {}
      }
      concept[propertyMap[field.tag]].de = (concept[propertyMap[field.tag]].de || []).concat(fromSubfield(field))
    }
  }
  // Add URI
  concept.uri = bk.uriFromNotation(concept.notation[0])
  concepts.push(concept)
}

// Do some consistency checks
let failed = false
const checkMissingNotation = concepts.filter(c => !c.notation[0])
if (checkMissingNotation.length) {
  failed = true
  console.error(`Consistency Check: ${checkMissingNotation.length} missing notations.`)
}
const checkMissingPrefLabel = concepts.filter(c => !c.notation[0])
if (checkMissingPrefLabel.length) {
  failed = true
  console.error(`Consistency Check: ${checkMissingPrefLabel.length} missing prefLabel.`)
}
const checkLevel0Count = concepts.filter(c => c.LEVEL === 0).length
if (checkLevel0Count !== 48) {
  failed = true
  console.error(`Consistency Check: Level 0 count is ${checkLevel0Count} instead of expected 48.`)
}
// Check dates
concepts.forEach(concept => {
  ["created", "modified"].forEach(prop => {
    const [year, month, day] = concept[prop].split("-")
    if (parseInt(year) < 1990 || parseInt(year) > 2089 || parseInt(month) > 12 || parseInt(day) > 31) {
      console.error(`Invalid ${prop} date for ${concept.uri}: ${concept[prop]}`)
      failed = true
    }
  })
})
// TODO: More checks

if (failed) {
  console.error("Some consistency checks failed, aborting...")
  process.exit(1)
}

// Sort concepts by notation so that we can build the hierarchy
concepts.sort(conceptSort)

// Build hierarchy
let parent, previous
for (const concept of concepts) {
  if (concept.LEVEL === 0) {
    // Add synthetik top concept
    const topConcept = topConcepts.find(c => c.notation[0].includes(concept.notation[0].slice(0, 1)))
    if (!topConcept) {
      console.error(`No top concept found for ${concept.notation[0]}, aborting...`)
      process.exit(1)
    }
    concept.broader = [topConcept]
  } else if (concept.LEVEL > previous.LEVEL) {
    parent = previous
    concept.broader = [parent]
  } else if (concept.LEVEL < previous.LEVEL) {
    let previousLevel = previous.LEVEL
    while (concept.LEVEL < previousLevel) {
      parent = parent?.broader?.[0]
      previousLevel -= 1
    }
    concept.broader = [parent]
  } else {
    concept.broader = [parent]
  }
  previous = concept
}

concepts = concepts.concat(topConcepts)

concepts.forEach(concept => {
  // Delete LEVEL property
  delete concept.LEVEL
  // Add inScheme
  concept.inScheme = [uriOnly(bk)]
  // Replace broader with uriOnly version
  if (concept.broader?.[0]) {
    concept.broader[0] = uriOnly(concept.broader[0])
  }
  // For `note`, add prefLabel of mentioned notation
  (concept.note?.de ?? []).forEach((note, index) => {
    const tokens = parseNoteIntoTokens(note)
    concept.note.de[index] = tokens.reduce((previous, current) => {
      let label
      if (current.reference) {
        const concept = concepts.find(c => c.notation[0] === current.reference)
        if (concept) {
          label = concept.prefLabel.de.replace(": Allgemeines", "")
        }
      }
      return previous + (label ? `${current.text} <${label}>` : current.text)
    }, "")
  })
  // In altLabel, remove those that simply repeat the prefLabel
  if (concept.altLabel?.de?.length) {
    concept.altLabel.de = concept.altLabel.de.filter(label => !label.startsWith(concept.prefLabel.de + " <"))
  }
  // For all properties, remove those with 0 values
  ; Object.values(propertyMap).forEach(prop => {
    if (concept[prop]?.de?.length === 0) {
      console.log(`Deleting ${prop} for ${concept.notation[0]}`)
      delete concept[prop]
    }
  })
  // Add type
  concept.type = jskos.objectTypes.Concept.type.concat(concept.type || [])
  // Add publisher
  concept.publisher = [
    {
      prefLabel: {
        de: "Gemeinsamer Bibliotheksverbund (GBV)"
      }
    }
  ]
})

// Sort concepts again (now with top concepts)
concepts.sort(conceptSort)

console.log(`- ${concepts.length} concepts.`)
Object.values(propertyMap).forEach(property => {
  console.log(`- ${concepts.filter(c => c?.[property]?.de?.length).length} concepts with ${property}.`)
})

fs.writeFileSync(target, concepts.map(c => JSON.stringify(c)).join("\n"))
