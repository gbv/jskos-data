BARTOC=http://bartoc.org/en/node/21020
include ../Makefile

$(CONCEPTS): klapp-concepts.csv $(SCHEME)
	$(jskos-convert) concepts -l en -s klapp-scheme.json -m $< > $@
