#!/usr/bin/env node
import jsonld from 'jsonld'
import ndjson from 'ndjson'
import fs from 'fs'

import { createRequire } from "module"
const context = createRequire(import.meta.url)("./context.json")

const args = process.argv.slice(2)
const input = args.length ? fs.createReadStream(args[0]) : process.stdin

input.pipe(ndjson.parse()).on('data', async concept => {
  concept['@context'] = context
  const doc = await jsonld.toRDF(concept, {format: 'application/n-quads'});
  process.stdout.write(doc)
})
