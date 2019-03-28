# Adjust JSKOS export of RVK data emitted by mc2skos

.notation[] |= gsub("-"; " - ") |
.uri |= gsub("_"; "%20") | 
.uri |= gsub("(?<a>[^\/]*)-(?<b>[^\/]*)$"; (.a)+"%20-%20"+(.b)) | 
if has("inScheme") then .inScheme[].uri = "http://uri.gbv.de/terminology/rvk/" else . end |
if has("topConceptOf") then .topConceptOf[].uri = "http://uri.gbv.de/terminology/rvk/" else . end |
if has("broader") then .broader[].uri |= gsub("_"; "%20") else . end |
if has("broader") then .broader[].uri |= gsub("(?<a>[^\/]*)-(?<b>[^\/]*)$"; (.a)+"%20-%20"+(.b)) else . end |
if .broader[0].uri == .uri then del(.broader[0]) else . end |
if .broader[1].uri == .uri then del(.broader[1]) else . end |
if .prefLabel.de|type == "array" then .prefLabel.de = (.prefLabel.de|join(" / ")) else  . end
