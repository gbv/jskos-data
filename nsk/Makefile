vocabulary.json:
	curl http://bartoc.org/en/node/20298?format=json | jq .[] -S > $@

fachgruppen.ndjson: fachgruppen.csv vocabulary.json
	jskos-convert --scheme vocabulary.json --validate --marktop fachgruppen.csv > $@

fachgruppen.csv: NSK_Fachgruppenkatalog.csv
	./fachgruppen.pl < $< > $@
