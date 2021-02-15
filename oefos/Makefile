default:
	wget -N https://raw.githubusercontent.com/openeduhub/oeh-metadata-vocabs-playground/main/oefos2skos_oefos.ttl
	 skos2jskos oefos2skos_oefos.ttl
	 jq -c .[] concepts.json > oefos.concepts.ndjson
	 jskos-validate concepts oefos.concepts.ndjson
	 jq -c . scheme.json > oefos.scheme.ndjson
	 jskos-validate scheme oefos.scheme.ndjson
	 rm *.json
