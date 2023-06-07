BARTOC=http://bartoc.org/en/node/20049
include ../Makefile

$(CONCEPTS): sdnb-concepts.csv $(SCHEME) 
	$(jskos-convert) concepts -l de -f csv -s $(SCHEME) -m $< > $@
	jq -c 'if (.uri|test("/[0-9]$$")) then (.type=["http://www.w3.org/2004/02/skos/core#Concept","http://schema.vocnet.org/NonIndexingConcept"]) else . end' $@ > tmp.ndjson && mv tmp.ndjson $@
