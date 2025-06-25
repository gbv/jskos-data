BARTOC=http://bartoc.org/en/node/20726
include ../Makefile

$(CONCEPTS): datacite-descriptiontype-concepts.csv $(SCHEME)
	$(jskos-convert) concepts -l en -s datacite-descriptiontype-scheme.json -m $< > $@
