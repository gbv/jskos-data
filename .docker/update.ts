#!/usr/bin/env -S deno run --allow-read --allow-run --allow-env --allow-sys --ext=ts --lock=/usr/src/app/deno.lock

import { $, cd } from "npm:zx@7"
import { exists } from "https://deno.land/std/fs/exists.ts"
import { parse as parsePath } from "https://deno.land/std/path/mod.ts"

console.log("##########", new Date(), "Updating jskos-data repository...", "##########")

const basePath = "/jskos-data"
await cd(basePath)

// Determine updated files before pulling
const updatedFiles = (await $`git fetch --quiet && git diff --name-only @ @{u}`.quiet()).stdout.split("\n").filter(file => file && !file.startsWith("."))

// TODO: Building vocabularies can modify files inside the repo, so we either need to reset it or possibly stash the changes -> still causes issues if there's a conflict!

// Get current changes and reset them if they are also in updatedFiles
const currentChanges = (await $`git status -s --no-rename`.quiet()).stdout.split("\n").filter(Boolean).map((line: string) => {
  const [, tag, file] = line.match(/(.{2}) (.*)/) || []
  if (!tag || !file) {
    console.error("Error parsing changed file in line:", line)
    return null
  }
  const change:any = { file }
  if (tag === "??") {
    change.added = true
  } else if (tag === " M") {
    change.modified = true
  } else {
    change.other = true
  }
  return change
}).filter(Boolean)

for (const change of currentChanges) {
  if (updatedFiles.includes(change.file)) {
    if (change.added) {
      console.log(`- Found added file ${change.file} that would be overridden by incoming pull. Moving to .backup...`)
      const path = parsePath(change.file)
      let file = path.base
      // Possibly also rename file
      let i = 0
      while (await exists(`.backup/${file}`)) {
        file = `${path.name}.${i}${path.ext}`
        i += 1
      }
      await $`mv ${change.file} .backup/${file}`
    } else {
      console.log(`- Found modified file ${change.file}, resetting it...`)
      await $`git checkout -- ${change.file}`
    }
  }
}

// Update repo
// Force reset to origin/master
console.log("⚠️  Local repo is divergent. Resetting to origin/master...")
await $`git fetch`
await $`git reset --hard origin/master`
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
    await $`make -B &> ${basePath}/.log/${vocabulary}-update.log`
  } catch (_error) {
    console.error(`There was an error rebuilding ${vocabulary}, see logs in .log/${vocabulary}-update.log.`)
  }
  console.log()
  builtVocabularies.add(vocabulary)
}
