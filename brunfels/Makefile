BARTOC=http://bartoc.org/en/node/20406
include ../Makefile

$(CONCEPTS): brunfels-concepts.csv $(SCHEME)
	jq ".uri=\"${BARTOC}\"" $(SCHEME) > tmp.json
	$(jskos-convert) -s tmp.json -mv $< > $@ 
	rm tmp.json
