BARTOC=http://bartoc.org/en/node/20725
include ../Makefile

$(CONCEPTS): DataCite_relationType-concepts.csv $(SCHEME)
	$(jskos-convert) concepts -l en -s DataCite_relationType-scheme.json -m $< > $@
