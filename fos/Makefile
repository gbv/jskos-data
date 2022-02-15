BARTOC=http://bartoc.org/en/node/1042

fos-concepts.ndjson: fos-concepts.csv fos-scheme.json
	$(jskos-convert) concepts -l en -s fos-scheme.json -m $< > $@

include ../Makefile
