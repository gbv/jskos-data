#!/bin/bash

errors=0

while read line; do
  dir=$(dirname $line)
  echo
  echo "## $dir"
  make -C "$dir"
  errors=$((errors + $?))
done < <(git ls-files | grep Makefile)

exit $errors
