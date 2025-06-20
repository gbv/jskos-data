BARTOC=http://bartoc.org/en/node/20720
include ../Makefile

$(CONCEPTS): DataCite_contributorType-concepts.csv $(SCHEME)
	$(jskos-convert) concepts -l en -s DataCite_contributorType-scheme.json -m $< > $@
