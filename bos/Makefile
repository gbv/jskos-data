BARTOC=http://bartoc.org/en/node/730
include ../Makefile

$(CONCEPTS): $(SCHEME) sys.csv 
	$(jskos-convert) concepts -m -s $(SCHEME) -l de sys.csv > $@

sys.csv: sys.txt top.csv
	./txt2csv.py
