BARTOC=http://bartoc.org/en/node/730

bos-concepts.ndjson: bos-scheme.json sys.csv 
	$(jskos-convert) concepts -m -s bos-scheme.json -l de sys.csv > $@

sys.csv: sys.txt top.csv
	./txt2csv.py

include ../Makefile
