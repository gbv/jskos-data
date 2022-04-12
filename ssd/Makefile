BARTOC=http://bartoc.org/en/node/1051

ssd-concepts.ndjson: ssd-scheme.json ssd-concepts.csv
	$(jskos-convert) concepts -m -s ssd-scheme.json -l de ssd-concepts.csv > $@
	wc -l $@

include ../Makefile
