BARTOC=http://bartoc.org/en/node/20828
include ../Makefile

$(CONCEPTS): datacite-nametype-concepts.csv $(SCHEME)
	$(jskos-convert) concepts -l en -s datacite-nametype-scheme.json -m $< > $@
