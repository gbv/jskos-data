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
  pushd "$DATE" >/dev/null

  DUMPFILE=rvko_marcxml_$DATE.xml
  NAME=rvko_$DATE
  XMLFILE=$NAME.xml

  if [[ "$CMD" =~ ^jskos|mcstats|get$ ]]; then
    # download and extract only if newer
    wget -N https://rvk.uni-regensburg.de/downloads/$DUMPFILE.gz
    [[ $DUMPFILE.gz -nt $NAME.xml ]] && \
        gzip -vdk $DUMPFILE.gz && mv $DUMPFILE $XMLFILE
  fi

  # convert to JSKOS
  if [[ "$CMD" = "jskos" ]]; then
    RAWNDJSONFILE=$NAME.raw.ndjson
    JSKOSFILE=$NAME.ndjson
    if isnewer "$RAWNDJSONFILE" "$XMLFILE"; then
        echo "$RAWNDJSONFILE already exists"
    else
        MC2SKOS=$(command -v mc2skos; exit 0)
        MC2SKOS=${MC2SKOS:-~/.local/bin/mc2skos}
        if [[ -x "$MC2SKOS" ]]; then
            $MC2SKOS --scheme rvk "$XMLFILE" "$RAWNDJSONFILE"
        else
            echo "Please install mc2skos, try: pip install --user mc2skos"
        fi
    fi
    if isnewer "$JSKOSFILE" "$RAWNDJSONFILE"; then
        echo "$JSKOSFILE already exists"
    else
        echo "Adjusting and extending to $JSKOSFILE"
        TEMPFILE=$(mktemp)
        jq -c -f ../rvkadjust.jq "$RAWNDJSONFILE" > "$TEMPFILE"
        ../markCombinedConcepts.pl "$TEMPFILE" > "$JSKOSFILE"
        rm "$TEMPFILE"
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

  # calculate scheme metrics
  elif [[ "$CMD" = "metrics" ]]; then
    JSKOSFILE=$NAME.ndjson
    METRICSFILE=$NAME.metrics.json
    SCHEMEMETRICS=../scheme-metrics.sh
    if [[ -x "$SCHEMEMETRICS" ]]; then
        $SCHEMEMETRICS "$JSKOSFILE" | jq . > "$METRICSFILE"
    else
        echo "Please create a symlink to scheme-metrics.sh"
    fi 
  fi 

  popd >/dev/null
else
  echo 'Expecting dump version such as "2018_4" as argument'
  echo
  echo 'Second argument should be one:'
  echo '  get        download and extract MARCXML dump'
  echo '  mcstats    create MARC (sub)field statistics'
  echo '  jskos      convert MARCXML to JSKOS'
  echo '  metrics    calculate scheme metrics'
  exit 1
fi
