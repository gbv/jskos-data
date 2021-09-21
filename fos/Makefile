fos-concepts.ndjson: fos-concepts.csv fos-scheme.json
	jskos-convert concepts -l en -s fos-scheme.json -m -t ndjson $< > $@

fos-scheme.json:
	curl -s http://bartoc.org/api/data?uri=http://bartoc.org/en/node/1042 \
		| jq '.[]|{uri,identifier,publisher,notation,prefLabel,altLabel,namespace}' > $@
