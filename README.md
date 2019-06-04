# jskos-data

[![Build Status](https://travis-ci.com/gbv/jskos-data.svg?branch=master)](https://travis-ci.com/gbv/jskos-data)
![License](https://img.shields.io/github/license/gbv/jskos-data.svg)

This repository contains a collection of **Knowledge Organization Systems (KOS)
encoded in [JSKOS data format](https://gbv.github.io/jskos/)**. The collection
is part of [project coli-conc](https://coli-conc.gbv.de/).

## Overview

Each KOS data is located in a subdirectory with either one or more of the
following files, all of them given in *canonical JSKOS*:

* `...-scheme.json`
* `...-concepts.json`
* `...-mappings.json` 

or with scripts to generate these files from other sources.

The files have partly been created with
[skos2jskos](https://metacpan.org/pod/skos2jskos) and other tools.

## Requirements

* [jq](https://stedolan.github.io/jq/)
* node and some npm modules (run `npm install`)

And for some vocabularies:

* [skos2jskos](https://metacpan.org/pod/App::skos2jskos)
* rapper (included in Debian package `raptor-utils`)

Download current [kos-registry](https://github.com/gbv/kos-registry):

    npm run kos-registry

Specific instructions are located in each directorie's `README.md` and `Makefile`.

## See also

* [cocoda-mappings](https://github.com/gbv/cocoda-mappings/) - repository with mapping data
* [kos-registry](https://github.com/gbv/kos-registry/) - information about knowledge organization schemes

## License

All data in this repository can be used freely as public domain ([Creative
Commons Zero v1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/))
