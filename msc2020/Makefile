BARTOC=http://bartoc.org/en/node/20396
include ../Makefile

$(CONCEPTS): msc2020.csv
	$(jskos-convert) concepts -f csv -t ndjson -s $(SCHEME) -l en -m $< > $@

msc2020.csv: msc2020.txt
	./txt2csv.pl < $< > $@

msc2020.txt:
	wget -N https://zbmath.org/static/msc2020.pdf
	pdftotext msc2020.pdf
