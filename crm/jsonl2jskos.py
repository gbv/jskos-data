#Erstellt die JSKOS-Datei crm-concepts.ndjson aus der JSONL-Datei, die mit https://github.com/pg-format/pgraphs aus der PG-Datei erstellt wurde.
#Unterstriche in der JSONL-Datei wurden vorher mit replace durch Leerzeichen ersetzt.
#""topConceptOf":[{"uri":"http://www.cidoc-crm.org/cidoc-crm/"}]," wurde für E1 nachgetragen.
import json

input_file = 'crm.jsonl'
output_file = 'crm-concepts.ndjson'

nodes = {}
broader_relationships = {}

with open(input_file, 'r') as infile:
    for line in infile:
        record = json.loads(line)
        #erstelle Dictionaries mit den Relationen und den Ids, die such aus Notation und dem Label zusammensetzen.
        #replacedBy und superClass wird hier als broader gesehen.
        if record.get('type') == 'edge' and 'from' in record and 'to' in record:
            from_node = record['from']
            to_node = record['to']
            if from_node not in broader_relationships:
                broader_relationships[from_node] = []
            broader_relationships[from_node].append(to_node)
        elif 'id' in record:
            nodes[record['id']] = record

#erstellt was in broader steht
def create_broader(nodes_list):
    broader_nodes = []
    for node in nodes_list:
        notation = node.split(' ', 1)[0]
        uri = f"http://www.cidoc-crm.org/cidoc-crm/{notation}"
        broader_nodes.append({
            "uri": uri,
            "notation": [notation]
        })
    return broader_nodes


with open(output_file, 'w') as outfile:
    for node_id, record in nodes.items():
        #Id wird in die Notation und das Label zerlegt
        id_parts = record['id'].split(' ', 1)
        notation = id_parts[0]
        pref_label = id_parts[1] if len(id_parts) > 1 else ''
        
        #Eine Zeile wird erstellt
        new_record = {
            'notation': [notation],
            'prefLabel': {"en": pref_label},
            'uri': f"http://www.cidoc-crm.org/cidoc-crm/{notation}",
            'inScheme': [{"uri": "http://www.cidoc-crm.org/cidoc-crm/"}]
        }
        
        if node_id in broader_relationships:
            new_record['broader'] = create_broader(broader_relationships[node_id])
        
        json.dump(new_record, outfile)
        outfile.write('\n')