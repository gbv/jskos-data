BARTOC=http://bartoc.org/en/node/1644
include ../Makefile

crm-classes.pg:
	curl -s https://raw.githubusercontent.com/nfdi4objects/n4o-graph/main/voc/crm-classes.pg > crm-classes.pg
	curl -s https://raw.githubusercontent.com/nfdi4objects/n4o-graph/main/voc/crm-extension-classes.pg >> crm-classes.pg

crm.jsonl: crm-classes.pg
	pgraph crm-classes.pg crm.jsonl

crm-concepts.ndjson: crm-scheme.json crm.jsonl
	../venv/bin/python3 jsonl2jskos.py
	$(jskos-validate) concepts $@
