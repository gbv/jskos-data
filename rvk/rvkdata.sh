#!/bin/bash
set -e

DATE="$1"
CMD="$2"

function isnewer() {
    if [[ -e "$1" && "$1" -nt "$2" ]]; then
        return 0
    else
        return 1
    fi
}

if [[ "$DATE" =~ ^20[12][0-9]_[0-9]*$ ]]; then
  [[ -d "$DATE" ]] || mkdir "$DATE"
  pushd "$DATE"

  DUMPFILE=rvko_marcxml_$DATE.xml
  NAME=rvko_$DATE
  XMLFILE=$NAME.xml

  # download and extract only if newer
  wget -N https://rvk.uni-regensburg.de/downloads/$DUMPFILE.gz
  [[ $DUMPFILE.gz -nt $NAME.xml ]] && \
      gzip -vdk $DUMPFILE.gz && mv $DUMPFILE $XMLFILE

  # convert to JSKOS
  if [[ "$CMD" = "jskos" ]]; then
    RAWNDJSONFILE=$NAME.raw.ndjson
    JSKOSFILE=$NAME.ndjson
    if isnewer "$RAWNDJSONFILE" "$XMLFILE"; then
        echo "$RAWNDJSONFILE already exists"
    else
	    mc2skos --scheme rvk "$XMLFILE" "$RAWNDJSONFILE"
    fi
    if isnewer "$JSKOSFILE" "$RAWNDJSONFILE"; then
        echo "$JSKOSFILE already exists"
    else
        jq -c -f ../rvkadjust.jq "$RAWNDJSONFILE" > $JSKOSFILE
    fi

  # analyze MARCXML
  elif [[ "$CMD" = "mcstats" ]]; then
    BREAKER=$NAME.breaker
    STATS=$NAME.stats

    if isnewer "$XMLFILE" "$BREAKER"; then
	    catmandu convert MARC --type XML to Breaker --handler marc < "$XMLFILE" > "$BREAKER"
    fi
    if isnewer "$BREAKER" "$STATS"; then
        catmandu breaker $BREAKER > $NAME.mcstats
    fi
  fi 

  popd >/dev/null
else
  echo 'Expecting dump version such as "2018_4" as argument'
  echo
  echo 'Second argument can be any of:'
  echo '  jskos      convert to JSKOS'
  echo '  mcstats    create MARC (sub)field statistics'
  exit 1
fi
