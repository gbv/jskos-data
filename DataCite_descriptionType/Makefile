BARTOC=http://bartoc.org/en/node/20726
include ../Makefile

$(CONCEPTS): DataCite_descriptionType-concepts.csv $(SCHEME)
	$(jskos-convert) concepts -l en -s DataCite_descriptionType-scheme.json -m $< > $@
