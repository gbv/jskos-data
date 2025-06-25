BARTOC=http://bartoc.org/en/node/20724
include ../Makefile

$(CONCEPTS): datacite-relatedidentifiertype-concepts.csv $(SCHEME)
	$(jskos-convert) concepts -l en -s datacite-relatedidentifiertype-scheme.json -m $< > $@
