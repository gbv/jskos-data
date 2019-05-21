default: bos-concepts.ndjson bos-scheme.ndjson

bos-concepts.ndjson: registry.json sys.csv
	../node_modules/jskos-cli/bin/jskos-convert -m -r ./registry.json -s BOS sys.csv > $@

bos-scheme.json: registry.json
	jq '.schemes[]' $< > $@

bos-scheme.ndjson: bos-scheme.json
	jq -c '.' $< > $@

registry.json: ../kos-registry/kos.ndjson
	jq --slurp '{schemes:[.[]|select(.namespace=="http://uri.gbv.de/terminology/bos/")]}' $< > $@

sys.csv: sys.txt top.csv
	./txt2csv.py
