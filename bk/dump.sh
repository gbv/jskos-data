#!/bin/bash

# download vocabulary via breadth-first search

echo "root"
curl -s 'http://api.dante.gbv.de/voc/bk/top?properties=*' | jq .[] -c > concepts.ndjson
jq -r '.narrower[].uri' concepts.ndjson > queue

echo $(wc -l queue) concepts to go...
while [ -s queue ]; do
  echo > current.ndjson
  while read URI; do
    echo "$URI"
    curl -s "http://api.dante.gbv.de/data?uri=$URI&properties=*" | jq -c .[] >> current.ndjson
  done < queue
  cat current.ndjson >> concepts.ndjson
  jq -r '.narrower[]?.uri?' current.ndjson > queue
done

echo $(wc -l concepts.ndjson) concept retrieved
