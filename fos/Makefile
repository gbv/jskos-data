BARTOC=http://bartoc.org/en/node/1042
include ../Makefile

$(CONCEPTS): fos-concepts.csv $(SCHEME)
	$(jskos-convert) concepts -l en -s fos-scheme.json -m $< > $@
