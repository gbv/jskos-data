// @deno-types="https://cdn.sheetjs.com/xlsx-0.20.1/package/types/index.d.ts"
import * as XLSX from "https://cdn.sheetjs.com/xlsx-0.20.1/package/xlsx.mjs"
import * as csv from "https://deno.land/std@0.207.0/csv/mod.ts"

// Read notes
const notes = csv.parse(await Deno.readTextFile("./bssc-notes.csv"), {
  skipFirstRow: true,
  strip: true,
})
const notesByNotation: any = {}
for (const concept of notes) {
  notesByNotation[concept.notation] = concept.scopeNote
}

let additional = {
  1: "Geographical qualifiers",
  2: "Language qualifiers",
  3: "Time period qualifiers",
  4: "Educational purpose qualifiers",
  5: "Interest age / Special interest qualifiers",
}

const result: any[] = []

for (const file of ["./101201-BIC2.1-Subj-only.xls", "./101201-BIC2.1-Quals-only.xls"]) {
  const workbook = XLSX.readFile(file)
  const sheet = workbook.Sheets[workbook.SheetNames[0]]
  
  const data = XLSX.utils.sheet_to_json(sheet)
  
  for (const row of data) {
    // Add top concepts for qualifiers because they are missing from the Excel data
    if (additional[row.Code[0]]) {
      result.push({
        notation: row.Code[0],
        prefLabel: additional[row.Code[0]],
        scopeNote: notesByNotation[row.Code[0]],
        level: 1,
      })
      additional[row.Code[0]] = null
    }
    result.push({
      notation: row.Code,
      prefLabel: row.Heading,
      scopeNote: notesByNotation[row.Code],
      level: row.Code.length
    })
  }
}

console.log(csv.stringify(result, {
  columns: Object.keys(result[0])
}).trim())
