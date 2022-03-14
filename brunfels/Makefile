BARTOC=http://bartoc.org/en/node/20406

brunfels-concepts.ndjson: brunfels-concepts.csv brunfels-scheme.json
	jq ".uri=\"${BARTOC}\"" brunfels-scheme.json > tmp.json
	jskos-convert -s tmp.json -mv $< > $@ 
	rm tmp.json

include ../Makefile
