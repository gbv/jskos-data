#!/usr/bin/env -S deno run --allow-read --allow-run --allow-env --allow-sys --ext=ts --lock=/usr/src/app/deno.lock

import { $, cd } from "npm:zx@7"

console.log("##########", new Date(), "Updating jskos-data repository...", "##########")

const basePath = "/jskos-data"
await cd(basePath)

// Determine updated files before pulling
const updatedFiles = (await $`git fetch --quiet && git diff --name-only @ @{u}`.quiet()).stdout.split("\n").filter(file => file && !file.startsWith("."))

// TODO: Building vocabularies can modify files inside the repo, so we either need to reset it or possibly stash the changes

// Update repo
await $`git pull`
console.log()

if (updatedFiles.includes("package-lock.json")) {
  console.log("### package-lock.json was updated, reinstalling Node.js dependencies... ###")
  await $`npm ci`
  console.log()
}

const builtVocabularies = new Set()
for (const file of updatedFiles) {
  const vocabulary = file.match(/^(.*)\//)?.[1]
  if (!vocabulary || builtVocabularies.has(vocabulary)) {
    continue
  }
  console.log(`##### ${vocabulary} was updated, rebuilding files... #####\n`)
  try {
    await cd(`${basePath}/${vocabulary}`)
    await $`make -B`
  } catch (error) {
    console.error(`There was an error rebuilding ${vocabulary}:`, error)
  }
  console.log()
  builtVocabularies.add(vocabulary)
}
