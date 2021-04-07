# Convert JSON-LD as provided at https://www.nomenclature.info/integration.app into JSON-LD as specified by JSKOS

def elements: if type=="array" then . else [.] end;         # string or array => array
def value: if type=="object" then .["@value"] else . end;   # string or language-tagged => string

def language_map: map({key:.["@language"], value:.["@value"]});
def from_multi_entries: reduce .[] as $p ({}; .[$p.key]+=[$p.value]);

def uri: sub("nom:";"https://nomenclature.info/nom/");

# get all concepts
.["@graph"][] | select(.["@id"])|select(.title|not)|

# expand URI
.uri=(.["@id"]|uri)

# transform existing fields
| if .prefLabel then .prefLabel |= (language_map | from_entries ) else . end
| if .broader then .broader |= [{uri:(.|uri)}] else . end
| if .narrower then .narrower |= (elements|map({uri:(.|uri)})) else . end
| if .inScheme then .inScheme = [{uri:"https://nomenclature.info/nom/"}] else . end
| if .topConceptOf then .topConceptOf = [{uri:"https://nomenclature.info/nom/"}] else . end
| if .altLabel then .altLabel |= (elements|language_map|from_multi_entries) else . end
| if .definition then .definition |= (elements|language_map|from_multi_entries) else . end
| if .hiddenLabel then .hiddenLabel |= (elements|language_map|from_multi_entries) else . end
| if .scopeNote then .scopeNote |= (elements|language_map|from_multi_entries) else . end
| if .image then .depiction = [.image] else . end

|.notation = [.uri|split("/")[-1]] + if .notation then [.notation|value] else [] end
|del(.["@id"])
|del(.["@type"])
|del(.identifier)
|del(.image)

|del(.exactMatch) # TODO
