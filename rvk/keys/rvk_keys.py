#!/usr/bin/env python3

import csv
import sys

inputfile = sys.argv[1]

csvwriter = csv.writer(sys.stdout, delimiter=',')
csvwriter.writerow(("notation", "prefLabel", "broaderNotation"))

dict = {}

with open(inputfile, newline='') as csvfile:
    reader = csv.reader(csvfile, delimiter=',')
    for row in reader:
        id = row[0]
        notation = row[1]
        parentid = row[2]
        key = row[6]        
        if parentid == "-1":
            notation = key
        else:
            notation = key + " " + notation
        dict[id] = notation

with open('rvk_schluessel_2019.csv', newline='') as csvfile:
    reader = csv.reader(csvfile, delimiter=',')
    for row in reader:
        id = row[0]
        parentid = row[2]
        label = row[3]
        addinf = row[4]
        ref = row[5]
        notation = dict[id]
        if parentid == "-1":
            row = (notation, label, "")
        else:
            row = (notation, label, dict[parentid])
        csvwriter.writerow(row)
