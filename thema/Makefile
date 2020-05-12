VERSION=1.4
FILE=Thema_v1.4.0_de.json
URL=https://www.editeur.org/files/Thema/1.4/Thema_v1.4_de/$(FILE)
VALIDATE=../node_modules/jskos-cli/bin/jskos-validate

thema-concepts.ndjson: $(FILE)
	jq -c -f thema2jskos.jq $< > $@
	$(VALIDATE) --verbose concepts $@
	cp $@ thema-concepts-$(VERSION).ndjson

download: $(FILE)

$(FILE):
	wget -N $(URL)
