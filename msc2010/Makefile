BARTOC=http://bartoc.org/en/node/474

msc2010.ndjson: msc2010.csv
	npm run jskos-convert -- concepts \
		--scheme ${CURDIR}/msc2010.scheme.ndjson ${CURDIR}/$< \
		| grep '^{' > $@

msc2010.csv: msc2010-final.txt
	./txt2csv.pl $< > $@

msc2010-final.txt:
	wget -nc http://msc2010.org/resources/MSC/2010/info/msc2010-final.txt
