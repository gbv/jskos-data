BARTOC=http://bartoc.org/en/node/1665

nkostype-concepts.json:
	curl -s https://api.dante.gbv.de/voc/nkostype/top \
		| jq '[.[] | del(.["@context"], .publisher) | .inScheme = [{ uri: "http://w3id.org/nkos/nkostype" }]]' > $@

# Mappings from Wikidata to NKOS Types
wd.ids: wd2nkostype.ndjson
	jq -r 'select(.type[]|contains("http://schema.org/sameAs"))|.from.memberSet[].uri' $< | sed 's!.*/!!' > $@

wd2nkostype.ndjson:
	wdmappings 'http://w3id.org/nkos/nkostype' -o $@
