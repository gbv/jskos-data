BARTOC=http://bartoc.org/en/node/1042
include ../Makefile

$(CONCEPTS): $(SCHEME) fos-concepts.csv
	$(jskos-convert) concepts -l en -s fos-scheme.json -m $< > $@
