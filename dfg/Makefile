dfg-2016-de.concepts.ndjson: dfg-2016-de.concepts.csv
	npm run --silent jskos-convert -- concepts \
		-v -s ${CURDIR}/dfg.scheme.ndjson ${CURDIR}/$< > $@

dfg-2020-de.concepts.ndjson: dfg-2020-de.concepts.csv
	npm run --silent jskos-convert -- concepts \
		-v -s ${CURDIR}/dfg.scheme.ndjson ${CURDIR}/$< > $@

dfg.scheme.ndjson: dfg.scheme.json
	jq -c -S . $< > $@
