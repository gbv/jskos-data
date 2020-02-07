"http://uri.gbv.de/terminology/thema" as $BASE |
.CodeList.ThemaCodes.Code[] |
{
  uri: ($BASE + "/" + .CodeValue),
  notation: [.CodeValue],
  prefLabel: { de: .CodeDescription },
  inScheme: [ { uri: $BASE } ]
}
+
if .CodeNotes then 
  { scopeNote: { de: [.CodeNotes] } } 
else 
  { } 
end
+ 
if .CodeParent then 
  { broader: [ { uri: ($BASE + "/" + .CodeParent) } ] }
else
  { topConceptOf: [ { uri: $BASE } ] }
end
