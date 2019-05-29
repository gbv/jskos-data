cerl-concepts.ndjson: jsonld/*.ndjson
	jq -c -f cerl2jskos.jq $? > $@

records: jsonld/*.ndjson
	@jq -f records.jq $?
