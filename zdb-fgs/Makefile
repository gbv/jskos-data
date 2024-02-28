BARTOC=http://bartoc.org/en/node/18915
include ../Makefile
CSV := $(NAME)-concepts.csv

$(CONCEPTS): $(SCHEME) $(CSV)
	$(jskos-convert) concepts -m -s $(SCHEME) -l de $(CSV) > $@
	wc -l $@
