BARTOC=http://bartoc.org/en/node/20725
include ../Makefile

$(CONCEPTS): datacite-relationtype-concepts.csv $(SCHEME)
	$(jskos-convert) concepts -l en -s datacite-relationtype-scheme.json -m $< > $@
