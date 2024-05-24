import json

input_file = 'crm.jsonl'
output_file = 'crm-concepts.ndjson'

nodes = {}
broader_relationships = {}

with open(input_file, 'r') as infile:
    for line in infile:
        record = json.loads(line)
        if record.get('type') == 'edge' and 'from' in record and 'to' in record:
            from_node = record['from']
            to_node = record['to']
            if from_node not in broader_relationships:
                broader_relationships[from_node] = []
            broader_relationships[from_node].append(to_node)
        elif 'id' in record:
            nodes[record['id']] = record

def create_broader(nodes_list):
    broader_nodes = []
    for node in nodes_list:
        notation = node.split('_', 1)[0]
        uri = determine_uri(notation, record.get('properties', {}))
        broader_nodes.append({
            "uri": uri,
            "notation": [notation]
        })
    return broader_nodes

def determine_uri(notation, properties):
    base_uri = f"http://www.cidoc-crm.org/cidoc-crm/{notation}"
    if 'extension' in properties:
        extensions = properties['extension']
        if "archaeo" in extensions:
            return f"http://www.cidoc-crm.org/extensions/crmarchaeo/{notation}"
        if "sci" in extensions:
            return f"http://www.cidoc-crm.org/extensions/crmsci/{notation}"
        if "LRMoo" in extensions:
            return f"www.cidoc-crm.org/extensions/lrmoo/{notation}" 
    return base_uri

with open(output_file, 'w') as outfile:
    for node_id, record in nodes.items():
        id_parts = record['id'].split('_', 1)
        notation = id_parts[0]
        pref_label = id_parts[1] if len(id_parts) > 1 else ''
            
        uri = determine_uri(notation, record.get('properties', {}))
            
        new_record = {
            'notation': [notation],
            'prefLabel': {"en": pref_label},
            'uri': uri,
            'inScheme': [{"uri": "http://bartoc.org/en/node/1644"}]
        }
            
        if notation == "E1":
            new_record["topConceptOf"] = [{"uri": "http://bartoc.org/en/node/1644"}]

        if node_id in broader_relationships:
            new_record['broader'] = create_broader(broader_relationships[node_id])
            
        json.dump(new_record, outfile)
        outfile.write('\n')
