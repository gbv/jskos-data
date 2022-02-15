# get name of current directory
NAME := $(shell basename `pwd`)

# run scripts as installed via npm to ensure stable version
jskos-convert=npm run --silent jskos-convert --
jskos-validate=npm run --silent jskos-validate --

scheme-fields=uri,type,notation,prefLabel,identifier,publisher,altLabel,namespace,notationPattern,uriPattern

# download scheme file from BARTOC by default, reduce fields and validate
$(NAME)-scheme.json: 
	[ -z "$(BARTOC)" ] || curl --silent https://bartoc.org/api/data?uri=$(BARTOC) \
		| jq -S '.[0]|{$(scheme-fields)}|del(..|nulls)' \
		> $@ && $(jskos-validate) scheme $@
