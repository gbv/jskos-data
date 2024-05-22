BARTOC=http://bartoc.org/en/node/1644
include ../Makefile
	
crm.jsonl:
	pgraph crm-classes.pg crm.jsonl

crm-concepts.ndjson: crm-scheme.json crm.jsonl
	../venv/bin/python3 jsonl2jskos.py
	wc -l $@