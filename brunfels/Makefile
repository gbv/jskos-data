BARTOC=http://bartoc.org/en/node/20406
include ../Makefile

$(CONCEPTS): $(SCHEME) brunfels-concepts.csv
	jq ".uri=\"${BARTOC}\"" $(SCHEME) > tmp.json
	jskos-convert -s tmp.json -mv $< > $@ 
	rm tmp.json

include ../Makefile
