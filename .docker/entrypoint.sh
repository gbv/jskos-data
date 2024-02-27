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

echo "Node.js $(node --version)"
echo "npm $(npm --version)"
deno --version

# # Pull changes
# git pull

# if [ -e _site/.git-commit ] && [ "$(git rev-parse HEAD)" == "$(cat _site/.git-commit)" ]; then
#   echo "Site rebuild skipped because there was no update."
# else
#   # Might need to update dependencies after each pull
#   npm ci
#   # Build the site
#   npm run build -- --pathprefix="$PATHPREFIX" --url="$URL"
#   # Remember the current commit
#   git rev-parse HEAD > _site/.git-commit
# fi

