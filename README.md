# jskos-data

[![Build Status](https://travis-ci.com/gbv/jskos-data.svg?branch=master)](https://travis-ci.com/gbv/jskos-data)

This repository contains a collection of **Knowledge Organization Systems (KOS)
encoded in [JSKOS data format](https://gbv.github.io/jskos/)**. The collection
is part of [project coli-conc](https://coli-conc.gbv.de/).

## Overview

Each KOS data is located in a subdirectory with one or more of the following
files, all of them given in *canonical JSKOS*:

* `...-scheme.json`
* `...-concepts.json`
* `...-mappings.json` 

The files have partly been created with
[skos2jskos](https://metacpan.org/pod/skos2jskos) and other tools.

## Contents

* **gnd** - Gemeinsame Normdatei
* **fundertype** - Funding Bodies of the German ISIL Registry (from [vocabs])
* **stocksize** - Stock Size Classification of the German ISIL Registry (from [vocabs])
* **libtype** - Bibliothekstypen gemäß dem Sigelverzeichnis (from [vocabs])
* **nwbib** - Raumsystematik der Nordrhein-Westfälischen Bibliographie (from [vocabs])
* **bartoc-types** - BARTOC KOS types (from [BARTOC])
* **ixtheo**
* ...

[vocabs]: https://github.com/lobid/vocabs
[BARTOC]: http://bartoc.org/

## Requirements

* jq
* node

Install dependencies:

    npm install

Clone and update kos-registry:

    npm run kos-registry

Specific instructions are located in each directorie's `README.md`.

## License

All data in this repository can be used freely as public domain ([Creative
Commons Zero v1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/))


