BARTOC=http://bartoc.org/en/node/20722
include ../Makefile

$(CONCEPTS): datacite-datetype-concepts.csv $(SCHEME)
	$(jskos-convert) concepts -l en -s datacite-datetype-scheme.json -m $< > $@
