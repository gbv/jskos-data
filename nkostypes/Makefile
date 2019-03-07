nkostype-concepts.json: nkostype.ttl
	skos2jskos -n nkostype $<

nkostype.ttl: nkostype.rdf
	rapper $< | sed -r "s!skos/core([^#])!skos/core#\1!" \
		| sed -r "s!2000/01/rdf-schema#?comment!2004/02/skos/core#scopeNote!" \
		| grep -v 'pick_list' > $@

nkostype.rdf:
	wget -N http://nkos.slis.kent.edu/nkostype/nkostype.rdf

