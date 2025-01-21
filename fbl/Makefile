BARTOC=http://bartoc.org/en/node/20543
include ../Makefile

# requires libspreadsheet-xlsx-perl
fbl-concepts.csv: FBL-Systematik.xlsx
	./excel2csv.pl $<

$(CONCEPTS): fbl-concepts.csv $(SCHEME)
	$(jskos-convert) concepts -l de -s $(SCHEME) -m $< > $@
