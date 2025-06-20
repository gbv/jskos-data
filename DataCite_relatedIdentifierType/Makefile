BARTOC=http://bartoc.org/en/node/20724
include ../Makefile

$(CONCEPTS): DataCite_relatedIdentifierType-concepts.csv $(SCHEME)
	$(jskos-convert) concepts -l en -s DataCite_relatedIdentifierType-scheme.json -m $< > $@
