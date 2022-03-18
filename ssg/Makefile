BARTOC=http://bartoc.org/en/node/18928
include ../Makefile

$(CONCEPTS): $(SCHEME) ssg-concepts.csv
	jskos-convert -l de -s $(SCHEME) -m -v concepts $< > $@

ssg-concepts.csv: Fachgebiete\ Zeitschriftendatenbank.csv
	catmandu convert CSV to CSV \
		--fix 'move_field("SSG-Nr\.",notation);move_field(SSG,prefLabel)' \
		--fields notation,prefLabel < "$<" > $@
