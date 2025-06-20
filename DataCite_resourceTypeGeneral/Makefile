BARTOC=http://bartoc.org/en/node/20723
include ../Makefile

$(CONCEPTS): DataCite_resourceTypeGeneral-concepts.csv $(SCHEME)
	$(jskos-convert) concepts -l en -s DataCite_resourceTypeGeneral-scheme.json -m $< > $@
