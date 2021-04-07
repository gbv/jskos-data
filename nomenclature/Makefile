nomenclature.concepts.ndjson: dump.jsonld
	jq -f nomenclature2jskos.jq -c $< > $@
	jskos-validate concepts $@

dump.jsonld:
	wget -O $@ https://www.nomenclature.info/api/dataset/nom?format=JSONLD
