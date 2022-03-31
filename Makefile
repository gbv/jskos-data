# get name of current directory
NAME := $(shell basename `pwd`)
SCHEME := $(NAME)-scheme.json
CONCEPTS := $(NAME)-concepts.ndjson

# run scripts as installed via npm to ensure stable version
jskos-convert=npm run --silent jskos-convert --
jskos-validate=npm run --silent jskos-validate --

scheme-fields=uri,type,notation,prefLabel,identifier,publisher,altLabel,namespace,notationPattern,uriPattern

# jq 1.5 does not support del(..|nulls) syntax
NULLS=recurse(.[]?;true)|select(.==null)

# download scheme file from BARTOC by default, reduce fields and validate
$(SCHEME):
	[ -z "$(BARTOC)" ] || curl --silent https://bartoc.org/api/data?uri=$(BARTOC) \
		| jq -eS '.[0]|{$(scheme-fields)}|del($(NULLS))|if length>0 then . else false end' \
		> $@ && $(jskos-validate) scheme $@
