#!/usr/bin/env -S deno run --allow-read --allow-run --allow-env --allow-sys --ext=ts --lock=/usr/src/app/deno.lock

import { $, cd } from "npm:zx@7"
import { exists } from "https://deno.land/std@0.217.0/fs/exists.ts"

const basePath = "/jskos-data"
await cd(basePath)

const vocabs = []
for await (const entry of Deno.readDir(".")) {
  if (entry.isDirectory && !entry.name.startsWith(".") && entry.name !== "node_modules") {
    if (Deno.args.length === 0 || Deno.args.includes(entry.name)) {
      vocabs.push(entry.name)
    }
  }
}

vocabs.sort()

for (const vocab of vocabs) {
  console.log(`##### ${vocab} #####`)

  try {
    await cd(`${basePath}/${vocab}`)
    if (await exists("Makefile")) {
      await $`make -B &> ${basePath}/.log/${vocab}.log`
    }
  } catch (_error) {
    console.error(`Error building ${vocab}, see .log/${vocab}.log.`)
  }
  console.log()
  const conceptsFile = `${vocab}-concepts.ndjson`
  if (await exists(conceptsFile)) {
    const info = await Deno.stat(conceptsFile)
    if (info.size > 0) {
      console.log(`- ${conceptsFile} exists with size ${info.size}.`)
    } else {
      console.log(`- ${conceptsFile} exists, but is empty.`)
    }
  } else {
    console.log(`- ${conceptsFile} does not exist.`)
  }

  console.log()
}
