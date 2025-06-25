BARTOC=http://bartoc.org/en/node/20720
include ../Makefile

$(CONCEPTS): datacite-contributortype-concepts.csv $(SCHEME)
	$(jskos-convert) concepts -l en -s datacite-contributortype-scheme.json -m $< > $@
