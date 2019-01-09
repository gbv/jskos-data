.SUFFIXES: .xml .ndjson .breaker .stats

.xml.breaker:
	catmandu convert MARC --type XML to Breaker --handler marc < $< > $@

.breaker.stats:
	catmandu breaker $< > $@

.xml.ndjson:
	mc2kos --scheme rvk $< $@
