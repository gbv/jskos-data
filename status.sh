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


for dir in */; do
    [ "$dir" == "node_modules/" ] && continue

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
    else
        warn "Missing $CONCEPTS"
    fi

    # TODO: move to another repository?
    ls $dir$id-mappings.ndjson $dir$id-concordance.json 2> /dev/null

    echo
done

