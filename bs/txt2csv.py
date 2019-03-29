import re
import csv
record = {}

csvfile = open('sys.csv', 'w', newline = '') 
csvwriter = csv.writer(csvfile)

def process_record():
    global record
    global csvwriter
    if bool(record) == True:
        if "hie" in record and "syt" in record and "syn" in record:
            row = (record["hie"], record["syt"], record["syn"])
            csvwriter.writerow(row)
        record = {}       

with open("sys.txt", "r") as ins:
    for line in ins:
        match = re.search("^#([^:]+): (.+)", line)
        if (match):
            key = match.group(1) 
            value = match.group(2) 
            record[key] = value 
        elif bool(re.findall("SET", line)):
            process_record()

process_record()

csvfile.close()