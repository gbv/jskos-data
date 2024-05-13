BARTOC=http://bartoc.org/en/node/745
include ../Makefile

nbc-concepts.ndjson: nbc-scheme.json nbc-concepts.csv
	$(jskos-convert) concepts -m -s nbc-scheme.json -l nl nbc-concepts.csv > $@
	wc -l $@


