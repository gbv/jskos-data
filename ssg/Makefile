BARTOC=http://bartoc.org/en/node/18928

ssg-concepts.ndjson: ssg-concepts.csv ssg-scheme.json
	jskos-convert -l de -s ssg-scheme.json -m -v concepts $< > $@

ssg-concepts.csv: Fachgebiete\ Zeitschriftendatenbank.csv
	catmandu convert CSV to CSV \
		--fix 'move_field("SSG-Nr\.",notation);move_field(SSG,prefLabel)' \
		--fields notation,prefLabel < "$<" > $@

include ../Makefile
