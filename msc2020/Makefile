msc2020-concepts.ndjson: msc2020.csv
	jskos-convert -f csv -t ndjson -s msc2020-scheme.json -l en -m $< > $@

msc2020.csv: msc2020.txt
	./txt2csv.pl < $< > $@

msc2020.txt:
	wget -N https://zbmath.org/static/msc2020.pdf
	pdftotext msc2020.pdf
