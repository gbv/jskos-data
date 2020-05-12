"http://uri.gbv.de/terminology/thema" as $BASE |

# date of publication as found at EDItEUR website
{ 
  "1.0": "2013",
  "1.1": "2015",
  "1.2": "2016-05",
  "1.3": "2018-04",
  "1.4": "2020-04"
} as $VERSIONS |

.CodeList.ThemaCodes.Code[] |
{
  uri: ($BASE + "/" + .CodeValue),
  notation: [.CodeValue],
  prefLabel: { de: .CodeDescription },
  inScheme: [ { uri: $BASE } ],
  issued: $VERSIONS[.IssueNumber|.[0:3]]
}
+
if .CodeNotes then 
  { scopeNote: { en: [.CodeNotes] } } 
else 
  { } 
end
+ 
if .CodeParent then 
  { broader: [ { uri: ($BASE + "/" + .CodeParent) } ] }
else
  { topConceptOf: [ { uri: $BASE } ] }
end
+
if .Modified then
  {
    modified: $VERSIONS[.Modified|.[0:3]]
  }
else
  {}
end
