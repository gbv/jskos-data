BARTOC=http://bartoc.org/en/node/1042

SCHEME_FIELDS=uri,identifier,publisher,notation,prefLabel,altLabel,namespace

# TODO: take URIs from concordance file
dfg-fos-mappings.ndjson: dfg-fos-mappings.csv registry.json
	jskos-convert mappings -t ndjson -r registry.json \
		-s http://bartoc.org/en/node/520 -d http://bartoc.org/en/node/1042 \
		-v -p http://coli-conc.gbv.de/concordances/dfg-fos $< > $@

registry.json:
	(curl -s http://bartoc.org/api/data?uri=http://bartoc.org/en/node/1042; \
	curl -s http://bartoc.org/api/data?uri=http://bartoc.org/en/node/520) \
	| jq -s 'add|{schemes:map({$(SCHEME_FIELDS)}|del(..|nulls))}' > $@ 
