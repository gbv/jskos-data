default: bos-concepts.ndjson

bos-concepts.ndjson: registry.json sys.csv
	../node_modules/jskos-cli/bin/jskos-convert -r ./registry.json -s BOS sys.csv > $@

bos-scheme.json: ../kos-registry/kos.ndjson
	jq 'select(.namespace=="http://uri.gbv.de/terminology/bos/")' $< > $@

registry.json: bos-scheme.json 
	jq '{schemes:[.]}' $< > $@

sys.csv: sys.txt top.csv
	./txt2csv.py

