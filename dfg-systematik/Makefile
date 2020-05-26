dfg.concepts.ndjson: dfg.concepts.csv dfg.scheme.ndjson
	npm run jskos-convert -- concepts \
		--scheme ${CURDIR}/dfg.scheme.ndjson ${CURDIR}/$< \
		| grep '^{' > $@

dfg.scheme.ndjson: dfg.scheme.json
	jq -c -S . $< > $@
