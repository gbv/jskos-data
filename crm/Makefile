BARTOC=http://bartoc.org/en/node/1644
include ../Makefile

crm-concepts.ndjson: crm-scheme.json crm-classes.pg
	wc -l $@
	
crm.jsonl:
	pgraph crm-classes.pg crm.jsonl