BARTOC=http://bartoc.org/en/node/20400
include ../Makefile

$(CONCEPTS): $(SCHEME) bc-concepts.csv
	$(jskos-convert) concepts -m -s $(SCHEME) -l de bc-concepts.csv > $@
	wc -l $@
