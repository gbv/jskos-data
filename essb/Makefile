BARTOC=http://bartoc.org/en/node/743

essb-concepts.ndjson: essb-scheme.json essb-concepts.csv
	$(jskos-convert) concepts -m -s essb-scheme.json -l de essb-concepts.csv > $@
	wc -l $@

include ../Makefile
