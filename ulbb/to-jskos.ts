// @deno-types="https://cdn.sheetjs.com/xlsx-0.20.1/package/types/index.d.ts"
import * as XLSX from "https://cdn.sheetjs.com/xlsx-0.20.1/package/xlsx.mjs"
import * as csv from "https://deno.land/std@0.207.0/csv/mod.ts"
import { default as jskos } from "npm:jskos-tools"

const concepts: any[] = []
const scheme = new jskos.ConceptScheme(JSON.parse(await Deno.readTextFile("./ulbb-scheme.json")))

const workbook = XLSX.readFile("./ulbb-concepts.xlsx")
const sheet = workbook.Sheets[workbook.SheetNames[0]]

const data = XLSX.utils.sheet_to_json(sheet)

const labelColumns = [
  "Untergruppe und verbale Bezeichnung in Bonner Systematik (6. Untergruppe)",
  "Untergruppe und verbale Bezeichnung in Bonner Systematik (5. Untergruppe)",
  "Untergruppe und verbale Bezeichnung in Bonner Systematik (4. Untergruppe)",
  "Untergruppe und verbale Bezeichnung in Bonner Systematik (3. Untergruppe)",
  "Untergruppe und verbale Bezeichnung in Bonner Systematik (2. Untergruppe)",
  "Verbale Bezeichnung der Gruppe in Bonner Systematik (1. Untergruppe)",
  "Hauptklasse",
]

let broaderStack:String[] = []

for (const row of data) {
  const notation = row.Notation?.trim()
  let level = 7, prefLabel
  for (const column of labelColumns) {
    if (row[column]?.trim()) {
      prefLabel = row[column].trim()
      break
    } else {
      level -= 1
    }
  }
  if (!prefLabel || !notation) {
    console.error("Warning: No prefLabel or notation", row)
    continue
  }

  // Clean prefLabel if necessary
  const lastPartOfNotation = notation.split(" ").pop()
  const lastPartOfNotationRegex = new RegExp(`^${lastPartOfNotation}[:. ]+`)
  if (prefLabel.match(lastPartOfNotationRegex)) {
    prefLabel = prefLabel.replace(lastPartOfNotationRegex, "")
  }

  const concept:any = {
    uri: scheme.uriFromNotation(notation),
    notation: [notation],
    prefLabel: { de: prefLabel },
  }

  if (level === 1) {
    concept.topConceptOf = [{ uri: scheme.uri }]
     broaderStack = [concept.uri]
  } else {
    concept.inScheme = [{ uri: scheme.uri }]
    concept.broader = [{ uri: broaderStack[level - 2] }]
    broaderStack = broaderStack.slice(0, level - 1)
    broaderStack.push(concept.uri)
  }
  
  concepts.push(concept)
}

concepts.forEach(concept => {
  console.log(JSON.stringify(concept))
})
