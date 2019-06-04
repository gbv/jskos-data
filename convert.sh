#!/bin/bash

git ls-files | grep Makefile | while read line; do
  dir=$(dirname $line)
  echo
  echo "## $dir"
  make -C "$dir"
done
