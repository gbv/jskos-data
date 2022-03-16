BARTOC=https://bartoc.org/en/node/1986

mv-concepts.ndjson: mv-scheme.json mv-concepts.csv
	$(jskos-convert) concepts -m -s mv-scheme.json -l de mv-concepts.csv > $@
	wc -l $@

include ../Makefile
