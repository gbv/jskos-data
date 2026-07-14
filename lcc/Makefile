BARTOC=http://bartoc.org/en/node/486
include ../Makefile

$(CONCEPTS): lcc-concepts.csv $(SCHEME)
	$(jskos-convert) concepts -l en -s lcc-scheme.json -m $< > $@
