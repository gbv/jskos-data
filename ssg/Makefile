ssg-concepts.ndjson: ssg-concepts.csv ssg-scheme.ndjson
	jskos-convert -l de -s ssg-scheme.ndjson -m -v concepts $< > $@ 

ssg-concepts.csv: Fachgebiete\ Zeitschriftendatenbank.csv
	catmandu convert CSV to CSV \
		--fix 'move_field("SSG-Nr\.",notation);move_field(SSG,prefLabel)' \
		--fields notation,prefLabel < "$<" > $@

ssg-scheme.ndjson: ssg-scheme.yaml
	catmandu convert YAML to JSON --line_delimited 1 < $< > $@ 
