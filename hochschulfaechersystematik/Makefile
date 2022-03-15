BARTOC=http://bartoc.org/en/node/18914

default: faechersystematik.concepts.ndjson

URI=http://bartoc.org/en/node/18920
ID=http://w3id.org/class/hochschulfaechersystematik/scheme

faechersystematik.scheme.ndjson:
	curl -s http://bartoc.org/api/data?uri=$(URI) \
		| jq -c '.[]|.uri="$(ID)"|.identifier=["$(URI)"]' > $@

faechersystematik.concepts.ndjson: faechersystematik.csv faechersystematik.scheme.ndjson
	npm run --silent jskos-convert -- -v -m -s $(CURDIR)/faechersystematik.scheme.ndjson $(CURDIR)/$< > $(CURDIR)/$@ 
