BARTOC=http://bartoc.org/en/node/742

ösöb-concepts.ndjson: ösöb-scheme.json ösöb-concepts.csv
	$(jskos-convert) concepts -m -s ösöb-scheme.json -l de ösöb-concepts.csv > $@
	wc -l $@

include ../Makefile
