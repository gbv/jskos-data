BARTOC=http://bartoc.org/en/node/18929

fid-concepts.ndjson: fid-classes.csv fid-scheme.json
	$(jskos-convert) -l de -s fid-scheme.json -v $< -m > $@

fid-classes.csv: fid.csv
	./cleanup.pl > $@

include ../Makefile
