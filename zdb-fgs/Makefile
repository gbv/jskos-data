BARTOC=http://bartoc.org/en/node/18915

bc-concepts.ndjson: zdb-fgs-scheme.json zdb-fgs-concepts.csv
	$(jskos-convert) concepts -m -s zdb-fgs-scheme.json -l de zdb-fgs-concepts.csv > $@
	wc -l $@

include ../Makefile
