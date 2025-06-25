BARTOC=http://bartoc.org/en/node/20723
include ../Makefile

$(CONCEPTS): datacite-resourcetypegeneral-concepts.csv $(SCHEME)
	$(jskos-convert) concepts -l en -s datacite-resourcetypegeneral-scheme.json -m $< > $@
