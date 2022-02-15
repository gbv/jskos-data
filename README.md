# jskos-data

[![Build Status](https://travis-ci.com/gbv/jskos-data.svg?branch=master)](https://travis-ci.com/gbv/jskos-data)
![License](https://img.shields.io/github/license/gbv/jskos-data.svg)

This repository contains a collection of Knowledge Organization Systems (KOS) and related data encoded in [JSKOS data format](https://gbv.github.io/jskos/). The collection is part of [project coli-conc](https://coli-conc.gbv.de/).

## Overview

Each KOS data is located in a subdirectory `$ID` (lowercase short name or acronym) with either one or more of the following JSKOS data files:

* `$ID-scheme.json`
* `$ID-concepts.ndjson`
* `$ID-mappings.ndjson` 
* `$ID-concordance.json`

The files should be generated automatically via a `Makefile`. Its sources such as CSV files should be included as well. Each directory should further contain a brief `README.md` giving a title and links to BARTOC (if applicable) and additional (re)sources such as instructions how to update the data.

## Requirements

Scripts are only testet on Linux. Specific requirements to generate JSKOS files depend on the source format. In any case, the following should be installed:

* make
* [jq](https://stedolan.github.io/jq/)
* node and some npm modules (run `npm install`)
* Perl

And for some vocabularies:

* [skos2jskos](https://metacpan.org/pod/App::skos2jskos)
* Python 3

## Usage

After having collected, cleaned and converted JSKOS data, see <https://github.com/gbv/cocoda-services#usage>.

## See also

* [cocoda-mappings](https://github.com/gbv/cocoda-mappings/) - repository with mapping data

## License

All data in this repository can be used freely as public domain ([Creative Commons Zero v1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/))
