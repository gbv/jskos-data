# Converting Dewey Decimal Classification (DDC) from MARC/XML to JSKOS

The Dewey Decimal Classificatiion (DDC) is managed by OCLC with software by Pansoft. The DDC data is only made available internally in [MARC 21 Classification format](http://www.loc.gov/marc/classification/) as MARC/XML. The command line tool [mc2skos](https://pypi.org/project/mc2skos/) was created to convert this format to SKOS. Limited export to JSKOS is also supported.

## Installation

Install mc2skos

    pip3 install --upgrade --user mc2skos

Make sure the Python binary path is added to `$PATH` in `.bashrc`, `.profile`, or `.bash_profile`.

    export PATH=$HOME/.local/bin:$PATH

## Execution

An extracted DDC file in MARC/XML can be converted to almos-JSKOS via:

    mc2skos -o ndjson --uri http://dewey.info/scheme/edition/e23/  $DDCFILE

Additional command line options to consider include `--exclude_notes` and `--components`.

The resulting NDJSON file requires some post-processing to get valid JSKOS.
