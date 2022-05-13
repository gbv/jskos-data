#!/bin/bash

ok() {
    echo "📗 $@"
}

warn() {
    echo "📙 $@"
}    

error() {
    echo "📕 $@"
}    

dirstatus() {
    dir="$1"

    if [ ! -d "$dir" ]; then
        error "Not a directory: $dir"
        return
    fi

    id=${dir%/}
    echo "📘 $dir"

    if [ -f "$id/README.md" ]; then
        ok "$id/README.md"
    else
        warn "Missing $id/README.md"
    fi

    if [ -f "$id/Makefile" ]; then
        BARTOC=`grep --color=never -Po '(?<=BARTOC=)(.+)' "$id/Makefile"`
        if [ -z "$BARTOC" ]; then
            error "No BARTOC"
        else
            ok $BARTOC
            curl --silent "https://bartoc.org/api/data?uri=$BARTOC" | jq -c '.[]|.identifier?'
        fi
    else
        error "Missing $id/Makefile"
    fi

    CONCEPTS="$dir$id-concepts.ndjson"
    if [ -f "$CONCEPTS" ]; then
        ok `wc -l "$CONCEPTS"`
        if [ ! -z "$JSKOS_METRICS" ]; then
            METRICS="$dir/$id-metrics.ndjson"
            $JSKOS_METRICS concepts "$CONCEPTS" > "$METRICS" && ok "$METRICS"
        fi
    else
        IGNORED=$(git check-ignore $CONCEPTS)
        if [ -z "$IGNORED" ]; then
            warn "Missing $CONCEPTS"
        else
            ok "$CONCEPTS is not stored in jskos-data"
        fi
    fi

    # TODO: move to another repository?
    ls $dir$id-mappings.ndjson $dir$id-concordance.json 2> /dev/null

    echo
}

if [ $# -eq 0 ]; then
    for dir in */; do
        [ "$dir" == "node_modules/" ] && continue
        dirstatus "$dir"
    done
else
    for arg in "$@"; do
        dirstatus "$arg"
    done    
fi
