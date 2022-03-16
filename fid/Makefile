BARTOC=http://bartoc.org/en/node/18929
include ../Makefile

$(CONCEPTS): $(SCHEME) fid-classes.csv
	$(jskos-convert) -l de -s $(SCHEME) -v $< -m > $@

fid-classes.csv: fid.csv
	./cleanup.pl > $@
