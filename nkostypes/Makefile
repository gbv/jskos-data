BARTOC=http://bartoc.org/en/node/1665

nkostype-concepts.json: nkostype.ttl
	skos2jskos -n nkostype $<

# Cleanup RDF file
nkostype.ttl: nkostype.rdf
	rapper $< | sed -r "s!skos/core([^#])!skos/core#\1!" \
		| sed -r "s!2000/01/rdf-schema#?comment!2004/02/skos/core#scopeNote!" \
		| grep -v 'pick_list' \
	    | grep -v 'authority_file' > $@

nkostype.rdf:
	wget -N https://nkos.dublincore.org/nkostype/nkostype.rdf

# Mappings from Wikidata to NKOS Types
wd.ids: wd2nkostype.ndjson
	jq -r 'select(.type[]|contains("http://schema.org/sameAs"))|.from.memberSet[].uri' $< | sed 's!.*/!!' > $@

wd2nkostype.ndjson:
	wdmappings 'http://w3id.org/nkos/nkostype' -o $@
