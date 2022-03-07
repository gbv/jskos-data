JSKOS_CONVERT=npm run --silent jskos-convert --

all: vocabulary.ndjson fachgruppen.ndjson sachschluessel.ndjson

vocabulary.ndjson:
	curl --silent https://bartoc.org/en/node/20298?format=json | jq .[] -c -S > $@

fachgruppen.ndjson: fachgruppen.csv vocabulary.ndjson
	${JSKOS_CONVERT} --scheme vocabulary.ndjson -l de --validate --marktop fachgruppen.csv > $@

fachgruppen.csv: NSK_Fachgruppenkatalog.csv
	./fachgruppen.pl < $< > $@

sachschluessel.ndjson: sachschluessel.csv vocabulary.ndjson
	${JSKOS_CONVERT} --scheme vocabulary.ndjson -l de --validate --marktop sachschluessel.csv > $@

sachschluessel.csv: NSK_Sachkatalogschlüssel.csv
	./sachschluessel.pl < $< > $@

# Normdatensätze der lokalen Systematik
pp: fachgruppen.csv
	awk -F, '!$$1{print $$2}' $< | while read GRP; do echo $$GRP.pp; \
		catmandu convert sbb --query "pica.xlsy=$$GRP *" to pp > $$GRP.pp ; done
