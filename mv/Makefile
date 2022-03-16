BARTOC=http://bartoc.org/en/node/1986
include ../Makefile

$(CONCEPTS): $(SCHEME) mv-concepts.csv
	$(jskos-convert) concepts -m -s $(SCHEME) -l de mv-concepts.csv > $@
	wc -l $@
