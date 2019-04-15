aadgenres: rdf.ttl scheme.ttl
	skos2jskos --language de --scheme http://uri.gbv.de/terminology/aadgenres/ $+

rdf.ttl: aadgenres.ttl
	sed 's/dcterms:identifier/skos:notation/' $< > $@
