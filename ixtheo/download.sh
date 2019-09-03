#!/bin/bash


ERROR=0
LANGUAGES=( en de ) # FIXME: es pt fr it el ru
URL=https://www.ixtheo.de/IxTheoClassification
RESULT=ixtheo.ndjson

for LNG in "${LANGUAGES[@]}"; do
  HTML=ixtheo-$LNG.html
  NDJSON=ixtheo-$LNG.ndjson
  curl -s -H "Accept-Language: $LNG" $URL > $HTML
  ./html2jskos.pl $HTML > $NDJSON
  COUNT=$(cat $NDJSON | wc -l)
  echo "$HTML => $NDJSON ($COUNT)"

  if [ "$LNG" == "en" ]; then
    jskos-merge -o $RESULT $NDJSON
  else
    diff <(jq -S "del(.prefLabel)" ixtheo-en.ndjson) \
         <(jq -S "del(.prefLabel)" $NDJSON) > /dev/null
    if [ $? -eq 0 ]; then
      jskos-merge -o $NDJSON $NDJSON
    else
      echo "Hierarchy differs!"
    fi
  fi
done

exit $ERROR
