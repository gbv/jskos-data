#!/usr/bin/env python3

import re
import csv
from namedentities import unicode_entities

# Öffne sys.txt zum Schreiben
csvfile = open('sys.csv', 'w', newline = '') 
csvwriter = csv.writer(csvfile)
csvwriter.writerow(("level","notation","prefLabel"))

# Bereits verarbeitete Notationen
seen = set()

# Gibt einen Datensatz als CSV aus
record = {}
def process_record():
    global record
    global csvwriter
    if bool(record) == True:
        if "hie" in record and "syt" in record and "syn" in record:
            notation = record["syt"]            
            # Bereits verarbeitete Notationen
            if notation in seen: 
                print("Repeated Notation:", notation)
            elif not re.search('^[a-z]{3} 000$', notation): # z.B. "all 000"
                seen.add(notation) 
                label = record["syn"]
                level = int(record["hie"])
                base = notation[0:3]
                if base in top:
                    csvwriter.writerow((0, base, label))
                    top.pop(base)
                            
                row = (level, notation, label)
                csvwriter.writerow(row)
        record = {}       

# Liest top.csv in ein dictionary
top = {}
with open('top.csv', 'r') as csvfile:
    reader = csv.reader(csvfile, delimiter=',')
    for row in reader:
        notation = row[0]
        label = row[1]
        top[notation] = label

# Konvertierung
with open("sys.txt", "r") as ins:
    for line in ins:
        match = re.search("^#([^:]+): (.+)", line)
        if (match):
            key = match.group(1) 
            value = unicode_entities(match.group(2))
            record[key] = value 
        elif bool(re.findall("SET", line)):
            process_record()

# Letzten Datensatz ebenfalls ausgeben
process_record()
csvfile.close()
