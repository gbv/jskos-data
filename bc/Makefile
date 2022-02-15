BARTOC=http://bartoc.org/en/node/20400

bc-concepts.ndjson: bc-scheme.json bc-concepts.csv
	$(jskos-convert) concepts -m -s bc-scheme.json -l de bc-concepts.csv > $@
	wc -l $@

include ../Makefile
