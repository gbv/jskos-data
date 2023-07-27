import { readFileSync } from "node:fs"
import * as url from "node:url"

if (import.meta.url.startsWith("file:")) {
  const modulePath = url.fileURLToPath(import.meta.url)
  if (process.argv[1] === modulePath) {
    const examples = readFileSync("./verweise.txt", "utf-8").split("\n").filter(Boolean)
    for (const example of examples) {
      console.log(example)
      console.log(parseNoteIntoTokens(example))
    }
  }
}

export function parseNoteIntoTokens(note) {
  // First, split note into two halves
  const [, text, referenceText] = note.match(/^(.*) (?:(?:s\.|siehe|bei)(?: auch)?:? ?)(.*)$/) || []
  if (!text || !referenceText) {
    return [{ text: note }]
  }
  // Then, split up the reference text into individual tokens
  const references = referenceText.split(/( ?(?:und|oder|,) ?)/)
  const tokens = [
    {
      text,
    },
  ]
  const referenceTokens = references.map((reference, index) => {
    if (
      index % 2 === 1 // Filter connector tokens
      || reference.endsWith(">") // Filter those which already have labels attached
    ) {
      return { text: reference }
    }
    let [, match] = reference.match(/^(?:Hauptklasse )?(\d\d\.?\d?\d?)/) || []
    if (!match) {
      return { text: reference }
    }
    if (match.length === 2) {
      match += "."
    }
    if (match.length === 3) {
      match += "00"
    }
    return {
      text: reference,
      reference: match,
    }
  })
  tokens.push(
    {
      text: referenceTokens.find(t => t.reference) ? " siehe: " : " siehe "
    }
  )
  return tokens.concat(referenceTokens)
}
