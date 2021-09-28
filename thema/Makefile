# All languages: make
# Single language: make de
# TODO: This can be made WAY more efficient if you know how to write Makefiles...
# TODO: Add script to merge language files.

VERSION=1.4

# German
FILE_DE=Thema_v1.4.2_de.json
URL_DE=https://www.editeur.org/files/Thema/1.4/Thema_v1.4_de/$(FILE_DE)
# English
FILE_EN=Thema_v1.4.2_en.json
URL_EN=https://www.editeur.org/files/Thema/1.4/Thema_1.4_en/$(FILE_EN)

VALIDATE=../node_modules/jskos-cli/bin/jskos-validate

# Make sure to do all languages by default
default: de en

de: thema-concepts-$(VERSION)-de.ndjson
thema-concepts-$(VERSION)-de.ndjson: $(FILE_DE)
	jq -c -f thema2jskos.jq $< > $@
	sed "s/\"LANGUAGE\"/\"de\"/g" $@ > $@.temp
	mv $@.temp $@
	$(VALIDATE) --verbose concepts $@

en: thema-concepts-$(VERSION)-en.ndjson
thema-concepts-$(VERSION)-en.ndjson: $(FILE_EN)
	jq -c -f thema2jskos.jq $< > $@
	sed "s/\"LANGUAGE\"/\"en\"/g" $@ > $@.temp
	mv $@.temp $@
	$(VALIDATE) --verbose concepts $@

$(FILE_DE):
	wget -N $(URL_DE)
$(FILE_EN):
	wget -N $(URL_EN)

download: $(FILE_DE) $(FILE_EN)
