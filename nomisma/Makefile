BARTOC=http://bartoc.org/en/node/1822
include ../Makefile

nomisma-concepts.ndjson: nomisma.jsonld
	cat $< | node jsonld2jskos.js | jq -c > $@

download: nomisma.jsonld
nomisma.jsonld:	
	curl -s http://nomisma.org/nomisma.org.jsonld | jq -c '.["@graph"][]' > $@
