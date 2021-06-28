vocabulary.ndjson:
	curl http://bartoc.org/en/node/20298?format=json | jq .[] -c -S > $@

fachgruppen.ndjson: fachgruppen.csv vocabulary.ndjson
	jskos-convert --scheme vocabulary.ndjson --validate --marktop fachgruppen.csv > $@

fachgruppen.csv: NSK_Fachgruppenkatalog.csv
	./fachgruppen.pl < $< > $@

sachschluessel.ndjson: sachschluessel.csv vocabulary.ndjson
	jskos-convert --scheme vocabulary.ndjson --validate --marktop sachschluessel.csv > $@

sachschluessel.csv: NSK_Sachkatalogschlüssel.csv
	./sachschluessel.pl < $< > $@

# Normdatensätze der lokalen Systematik
pp: fachgruppen.csv
	awk -F, '!$$1{print $$2}' $< | while read GRP; do echo $$GRP.pp; \
		catmandu convert sbb --query "pica.xlsy=$$GRP *" to pp > $$GRP.pp ; done
