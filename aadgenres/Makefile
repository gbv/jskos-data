BARTOC=http://bartoc.org/en/node/18627
	
aadgenres: rdf.ttl scheme.ttl
	skos2jskos --language de --scheme http://uri.gbv.de/terminology/aadgenres/ --name aadgenres $+

rdf.ttl: aadgenres.ttl
	sed 's/dcterms:identifier/skos:notation/' $< > $@

include ../Makefile
