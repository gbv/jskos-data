BARTOC=http://bartoc.org/en/node/20454
include ../Makefile

$(CONCEPTS): $(SCHEME) dhb-concepts.csv
	$(jskos-convert) concepts -m -s $(SCHEME) $(word 2,$^) \
		| sed -E 's/"(.)%3A/"\1:/g' > $@
	wc -l $@
