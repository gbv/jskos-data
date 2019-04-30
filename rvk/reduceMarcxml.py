#!/usr/bin/env python3
# Bash-Aufruf: $ python3 xx.py < rvko_2019_1.xml > rvko_reduced.xml

import pymarc
import sys
idfile = sys.argv[1]

ids = set()
# read line-by-line
with open(idfile) as f:
    lines = f.readlines()
lines = [x.strip() for x in lines]
for element in lines:
    ids.add(element)

# Standard input, for input from the terminal/console
handler = pymarc.XmlHandler()
pymarc.marcxml.parse_xml(sys.stdin, handler)

# first lines of the output-file
f = sys.stdout
f.write('<?xml version="1.0" encoding="UTF-8"?>\n')
f.write('<collection xmlns="http://www.loc.gov/MARC21/slim">\n')

# compare id with ids = set
for record in handler.records:
    id = record.get_fields('001')[0].value()
    if id in ids:
        xml = pymarc.marcxml.record_to_xml(record)
        f.write(xml.decode("utf-8"))
        f.write('\n')

# write the last line and close
f.write('</collection>')
f.close()
