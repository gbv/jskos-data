BARTOC=http://bartoc.org/en/node/20430
include ../Makefile

$(CONCEPTS): $(SCHEME) obv-concepts.csv
	$(jskos-convert) concepts -m -s $(SCHEME) -l de $(word 2,$^) > $@
	wc -l $@
