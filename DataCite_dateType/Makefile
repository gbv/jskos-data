BARTOC=http://bartoc.org/en/node/20722
include ../Makefile

$(CONCEPTS): DataCite_dateType-concepts.csv $(SCHEME)
	$(jskos-convert) concepts -l en -s DataCite_dateType-scheme.json -m $< > $@
