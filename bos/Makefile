default: bos-concepts.ndjson bos-scheme.ndjson

bos-concepts.ndjson: ../kos-registry.json sys.csv
	../node_modules/jskos-cli/bin/jskos-convert -m -r ../kos-registry.json -l de -s BOS sys.csv > $@

bos-scheme.ndjson: ../kos-registry.json
	jq -c '.schemes[]|select(.namespace=="http://uri.gbv.de/terminology/bos/")' $< > $@

registry.json: ../kos-registry/kos.ndjson

sys.csv: sys.txt top.csv
	./txt2csv.py
