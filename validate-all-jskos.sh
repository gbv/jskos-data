#!/bin/bash

validate() {
    npm run --silent jskos-validate -- "$1" "$2"
}

for name in *; do
    if [ -d "$name" ]; then
        [ -f "${name}/README.md" ] || echo "${name}/README.md missing"

        # TODO: include scheme in validation of concepts
        [ -f "${name}/${name}-scheme.json" ] && validate scheme "${name}/${name}-scheme.json"
        [ -f "${name}/${name}-concordance.json" ] && validate concordance "${name}/${name}-concordance.json"
        [ -f "${name}/${name}-mappings.ndjson" ] && validate mappings "${name}/${name}-mappings.ndjson"
        [ -f "${name}/${name}-concepts.ndjson" ] && validate concepts "${name}/${name}-concepts.ndjson"
    fi
done
