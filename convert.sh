#!/bin/bash

errors=0

while read line; do
  dir=$(dirname $line)
  echo
  echo -e "\033[1m## $dir\e[0m"
  make -C "$dir"
  code=$?
  if [ $? == 0 ]; then
    echo -e "\e[00;32mok\e[0m"
  else
    echo -e "\e[01;31mfailed\e[0m"
    errors=$((errors+1))
  fi
done < <(git ls-files | grep Makefile)

exit $errors
