#!/bin/bash

DIR=$(dirname $0)
VALIDATE=$DIR/node_modules/jskos-validate/bin/jskos-validate

find "$DIR" -iname "*-scheme.json" | xargs $VALIDATE scheme \
&& find "$DIR" -iname "*-concepts.json" | xargs $VALIDATE concept
