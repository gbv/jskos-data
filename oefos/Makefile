BARTOC=http://bartoc.org/en/node/1094

oefos-concepts.ndjson: oefos-scheme.json
	wget -N https://raw.githubusercontent.com/openeduhub/oeh-metadata-vocabs-playground/main/oefos2skos_oefos.ttl
	skos2jskos oefos2skos_oefos.ttl
	mv concepts.ndjson oefos-concepts.ndjson
	jskos-validate oefos-scheme.json noefos-concepts.ndjson

include ../Makefile
