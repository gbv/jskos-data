FILE=Thema_v1.3.3_de.json
URL=https://www.editeur.org/files/Thema/1.3/$(FILE)

thema-concepts.ndjson: $(FILE)
	jq -c -f thema2jskos.jq $< > $@

download: $(FILE)

$(FILE):
	wget -N $(URL)
