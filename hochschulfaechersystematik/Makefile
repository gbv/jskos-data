default: faechersystematik.concepts.ndjson

faechersystematik.scheme.ndjson:
	curl -s http://bartoc.org/api/data?uri=http://bartoc.org/en/node/18920 \
		| jq -c '.[]|.uri="http://w3id.org/class/hochschulfaechersystematik/scheme"' > $@

faechersystematik.concepts.ndjson: faechersystematik.csv faechersystematik.scheme.ndjson
	npm run --silent jskos-convert -- -v -m -s faechersystematik.scheme.ndjson $< > $@ 
