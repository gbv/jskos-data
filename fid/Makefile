fid-concepts.ndjson: fid-classes.csv
	jskos-convert -l de -r ../kos-registry.json -s FID -v -f csv $< -m > $@

fid-classes.csv: fid.csv
	./cleanup.pl > $@
