BARTOC=http://bartoc.org/en/node/1413
include ../Makefile

$(CONCEPTS): jsonld/*.ndjson
	jq -c -f cerl2jskos.jq $? > $@

records: jsonld/*.ndjson
	@jq -f records.jq $?
