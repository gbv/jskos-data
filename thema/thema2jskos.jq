"http://uri.gbv.de/terminology/thema" as $BASE |

# date of publication as found at EDItEUR website
{
  "1.0": "2013",
  "1.1": "2015",
  "1.2": "2016-05",
  "1.3": "2018-04",
  "1.4": "2020-04"
} as $VERSIONS |

# IssueNumber and Modified may contain dates or version numbers
def dateValue:
  if match("^\\d\\.\\d") then
    $VERSIONS[.[0:3]]
  elif match("^2\\d\\d\\d\\d\\d$") then
    .[0:4]+"-"+.[4:6]
  else
    null
  end
;

.CodeList.ThemaCodes.Code[] |
{
  uri: ($BASE + "/" + .CodeValue),
  notation: [.CodeValue],
  prefLabel: { de: .CodeDescription },
  inScheme: [ { uri: $BASE } ],
  issued: .IssueNumber|dateValue
}
+
if .CodeNotes | length > 0 then
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
+
if .Modified then
  { modified: .Modified|dateValue }
else
  {}
end
