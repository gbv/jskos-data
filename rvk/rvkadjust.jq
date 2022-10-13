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
if .scopeNote.de|type == "string" then .scopeNote.de = [.scopeNote.de] else . end |
if .editorialNote.de|type == "string" then .editorialNote.de = [.editorialNote.de] else . end |

# properties not mapped to JSON-LD (WTF?)
if .["http://www.w3.org/1999/02/22-rdf-syntax-ns#type"] then .type = .["http://www.w3.org/1999/02/22-rdf-syntax-ns#type"] else . end |

if .["dct:modified"] then .modified = .["dct:modified"] else . end |
if .["dct:created"] then .modified = .["dct:created"] else . end |

if .["http://www.w3.org/2004/02/skos/core#editorialNote"] then
  .editorialNote = .["http://www.w3.org/2004/02/skos/core#editorialNote"]
else . end |

if .editorialNote.de|type == "string" then .editorialNote.de = [.editorialNote.de] else . end |

if .["http://www.w3.org/2004/02/skos/core#prefLabel"] then .prefLabel = .["http://www.w3.org/2004/02/skos/core#prefLabel"] else . end |

if .prefLabel.de|type == "array" then .prefLabel.de = (.prefLabel.de|join(" / ")) else  . end |

del(
  .["http://www.w3.org/1999/02/22-rdf-syntax-ns#type"],
  .["http://www.w3.org/2004/02/skos/core#prefLabel"],
  .["http://www.w3.org/2004/02/skos/core#editorialNote"],
  .["http://www.w3.org/2004/02/skos/core#closeMatch"],
  .["dct:modified"], .["dct:created"]
)

