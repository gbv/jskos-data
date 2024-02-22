BARTOC=http://bartoc.org/en/node/1707
include ../Makefile

$(CONCEPTS): $(SCHEME)
	deno run --allow-read to-jskos.ts > $@
