#!/bin/bash

# Clone site if not yet done
if [ ! -e /jskos-data/.git ]; then
  git clone --depth 1 https://github.com/gbv/jskos-data /jskos-data
fi

cd /jskos-data
# TODO: Only when updated
if [ ! -e node_modules ]; then
  npm ci
fi

# Backup directory for created files that would be overridden
mkdir .backup
mkdir .log

echo "Node.js $(node --version)"
echo "npm $(npm --version)"
deno --version
