BARTOC=http://bartoc.org/en/node/1232
include ../Makefile

$(CONCEPTS): dump.jsonld $(SCHEME)
	jq -f nomenclature2jskos.jq -c $< > $@
	$(jskos-validate) concepts $@

dump.jsonld:
	wget -O $@ https://www.nomenclature.info/api/dataset/nom?format=JSONLD

