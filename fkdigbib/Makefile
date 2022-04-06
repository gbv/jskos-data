BARTOC=http://bartoc.org/en/node/20050

fkdigbib-concepts.ndjson: fkdigbib-scheme.json fkdigbib-concepts.csv
	$(jskos-convert) concepts -m -s fkdigbib-scheme.json -l de fkdigbib-concepts.csv > $@
	wc -l $@

include ../Makefile
