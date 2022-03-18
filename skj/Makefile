BARTOC=http://bartoc.org/en/node/1050

skj-concepts.ndjson: skj-scheme.json skj-concepts.csv
	$(jskos-convert) concepts -m -s skj-scheme.json -l de skj-concepts.csv > $@
	wc -l $@

include ../Makefile
