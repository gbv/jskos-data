#!/usr/bin/env python3

import re
import csv
from namedentities import unicode_entities

#Liest die top.csv aus und gibt sie als Dictionary wieder
top = {}

with open('top.csv', 'r') as csvfile:
    reader = csv.reader(csvfile, delimiter=',')
    for row in reader:
        notation = row[0]
        label = row[1]
        top[notation] = label
        

#Die Ausgangsdatei sys.txt wird mit Skript in eine CSV-Datei konvertiert
#Sonderfälle werden bestimmt
record = {}

csvfile = open('sys.csv', 'w', newline = '') 
csvwriter = csv.writer(csvfile)

def process_record():
    global record
    global csvwriter
    if bool(record) == True:
        if "hie" in record and "syt" in record and "syn" in record:
            notation = record["syt"]
            label = record["syn"]
            level = int(record["hie"]) + 1
            base = notation[0:3]
            if base in top:
                csvwriter.writerow((0, base, label))                
                top.pop(base)
                            
            row = (level, notation, label)
            csvwriter.writerow(row)
        record = {}       

with open("sys.txt", "r") as ins:
    csvwriter.writerow(("level","notation","prefLabel"))
    for line in ins:
        match = re.search("^#([^:]+): (.+)", line)
        if (match):
            key = match.group(1) 
            value = unicode_entities(match.group(2))
            record[key] = value 
        elif bool(re.findall("SET", line)):
            process_record()

process_record()

csvfile.close()
