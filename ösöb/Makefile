BARTOC=http://bartoc.org/en/node/742

oesoeb-concepts.ndjson: oesoeb-scheme.json oesoeb-concepts.csv
	$(jskos-convert) concepts -m -s oesoeb-scheme.json -l de oesoeb-concepts.csv > $@
	wc -l $@

include ../Makefile
