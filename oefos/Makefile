BARTOC=http://bartoc.org/en/node/1094
include ../Makefile

$(CONCEPTS): $(SCHEME)
	wget -N https://raw.githubusercontent.com/openeduhub/oeh-metadata-vocabs-playground/main/oefos2skos_oefos.ttl
	skos2jskos oefos2skos_oefos.ttl
	jq -cS 'del(.narrower)' concepts.ndjson > oefos-concepts.ndjson
	rm concepts.ndjson
	$(jskos-validate) $(SCHEME) oefos-concepts.ndjson
