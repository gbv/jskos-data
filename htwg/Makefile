BARTOC=http://bartoc.org/en/node/1339
include ../Makefile

$(CONCEPTS): htwg-concepts.csv
	$(jskos-convert) concepts -l de -f csv -s $(SCHEME) -m $< > $@

htwg-concepts.csv: htwg.txt
	./process.pl < $< > $@ 
