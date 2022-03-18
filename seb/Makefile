BARTOC=http://bartoc.org/en/node/1324

seb-concepts.ndjson: seb-scheme.json seb-concepts.csv
	$(jskos-convert) concepts -m -s seb-scheme.json -l de seb-concepts.csv > $@
	wc -l $@

include ../Makefile
