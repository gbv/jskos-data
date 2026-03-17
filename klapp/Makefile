BARTOC=http://bartoc.org/en/node/21020
include ../Makefile

$(CONCEPTS): klapp-concepts.csv $(SCHEME)
	$(jskos-convert) concepts -s klapp-scheme.json -m $< > $@
