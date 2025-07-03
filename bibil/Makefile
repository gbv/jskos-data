BARTOC=http://bartoc.org/en/node/151
include ../Makefile

$(CONCEPTS): bibil-concepts.csv $(SCHEME)
	$(jskos-convert) concepts -l en -s bibil-scheme.json -m $< > $@
