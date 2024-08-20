BARTOC=http://bartoc.org/en/node/520

default: dfg-2016.concepts.ndjson dfg-2020.concepts.ndjson dfg-2024.concepts.ndjson

dfg-2016.concepts.ndjson: dfg-2016.concepts.csv dfg-2016.scheme.json
	npm run --silent jskos-convert -- concepts \
		-v -s ${CURDIR}/dfg-2016.scheme.json ${CURDIR}/$< > $@

dfg-2020.concepts.ndjson: dfg-2020.concepts.csv dfg-2020.scheme.json
	npm run --silent jskos-convert -- concepts \
		-v -s ${CURDIR}/dfg-2020.scheme.json ${CURDIR}/$< > $@

dfg-2024.concepts.ndjson: dfg-2024.concepts.csv dfg.scheme.json
	npm run --silent jskos-convert -- concepts \
		-v -s ${CURDIR}/dfg.scheme.json ${CURDIR}/$< > $@

dfg.scheme.ndjson: dfg.scheme.json
	jq -c -S . $< > $@
