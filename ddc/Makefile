BARTOC=http://bartoc.org/en/node/241

lang?=de
version?=23
ZIP := ddc$(version)$(lang).zip
CONCEPTS := ddc$(version)$(lang).ndjson

default: $(CONCEPTS)

$(CONCEPTS): $(ZIP)
	unzip -p $(ZIP) | catmandu convert marcxml --fix 'add_field(language,$(lang))' --fix ddc2jskos.fix to ndjson > $@
