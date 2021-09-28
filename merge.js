#!/usr/bin/env node

/**
 * Script that merges one or more JSKOS files in ndjson format.
 *
 * See `./merge.js --help` for usage info.
 */

let args = process.argv.slice(2)

function printUsage() {
  console.warn("usage: ./merge.js [--help] [--append] file1 [file2 ...]")
  console.warn()
}

if (args.includes("-h") || args.includes("--help")) {
  printUsage()
  console.warn("Merges JSKOS files (ndjson) by URI.")
  console.warn("Prints resulting ndjson data to stdout, messages to stderr (see examples below).")
  console.warn()
  console.warn("Options:")
  console.warn("  --help      Prints this help document")
  console.warn("  --append    Appends concepts that are not in the first provided file (skips by default)")
  console.warn()
  console.warn("Examples:")
  console.warn("  ./merge.js file-en.ndjson file-de.ndjson > file-merged.ndjson")
  process.exit(0)
}

let append = false
if (args.includes("--append")) {
  append = true
  args = args.filter(arg => arg !== "--append")
}

let option
while (option = args.find(arg => arg.startsWith("--"))) {
  console.warn(`Unknow option: ${option}`)
  args = args.filter(arg => arg !== option)
}

if (args.length < 1) {
  console.warn("Need to provide JSKOS files in ndjson format.")
  printUsage()
  process.exit(1)
}

const fs = require("fs")
const readline = require("readline")
const jskos = require("jskos-tools")

function getReadlineInterface(file) {
  return readline.createInterface({
    input: fs.createReadStream(file),
    crlfDelay: Infinity
  })
}

const concepts = {}
function mergeIntoConcepts(concept) {
  const uri = concept.uri
  if (!concepts[uri]) {
    return false
  }
  concepts[uri] = jskos.merge(concepts[uri], concept)
  return true
}

main()
async function main() {
  const mainFile = args[0]
  args = args.slice(1)
  let mergedCount = 0
  for await (const line of getReadlineInterface(mainFile)) {
    try {
      const concept = JSON.parse(line)
      if (!mergeIntoConcepts(concept)) {
        concepts[concept.uri] = concept
      } else {
        mergedCount += 1
      }
    } catch (error) {
      // Ignore for now
    }
  }
  console.warn(`- Read ${Object.keys(concepts).length} concepts from ${mainFile} (${mergedCount} were already merged).`)
  for (const file of args) {
    console.warn(`- Merging with ${file}...`)
    let mergedCount = 0
    let skippedOrAddedCount = 0
    for await (const line of getReadlineInterface(file)) {
      const concept = JSON.parse(line)
      const merged = mergeIntoConcepts(concept)
      mergedCount += merged ? 1 : 0
      skippedOrAddedCount += merged ? 0 : 1
      if (!merged && append) {
        concepts[concept.uri] = concept
      }
    }
    console.warn(`  ... ${mergedCount} concepts merged, ${skippedOrAddedCount} concepts ${append ? "added" : "skipped"}.`)
  }
  Object.values(concepts).forEach(concept => console.log(JSON.stringify(concept)))
}
