.SUFFIXES: .xml .ndjson .breaker .stats

.xml.breaker:
	catmandu convert MARC --type XML to Breaker --handler marc < $< > $@

.breaker.stats:
	catmandu breaker $< > $@

# adjust URIs and notations with jq (replace "_" with "%20" in uri, replace "-" with "%20-%20" in last part of uri, replace "-" with " - " in notation)
.xml.ndjson:
	mc2skos --scheme rvk $< - | \
	jq -c '.uri |= gsub("_"; "%20") | .uri |= gsub("(?<a>[^\/]*)-(?<b>[^\/]*)$$"; (.a)+"%20-%20"+(.b)) | .notation[] |= gsub("-"; " - ")' > $@
