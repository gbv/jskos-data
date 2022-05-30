#!/bin/bash

# download vocabulary via breadth-first search
# Alternative: use /voc/concepts endpoint and sort afterwards

CONCEPTS=bk-concepts.ndjson

echo "root"
curl -s 'http://api.dante.gbv.de/voc/bk/top?properties=*' | jq .[] -c > $CONCEPTS
jq -r '.narrower[].uri' $CONCEPTS > queue

echo $(wc -l queue) concepts to go...
while [ -s queue ]; do
  echo > current.ndjson
  while read URI; do
    echo "$URI"
    curl -s "http://api.dante.gbv.de/data?uri=$URI&properties=*" | jq -c .[] >> current.ndjson
  done < queue
  cat current.ndjson >> $CONCEPTS
  jq -r '.narrower[]?.uri?' current.ndjson > queue
done

rm current.ndjson queue
echo $(wc -l $CONCEPTS) concept retrieved
