BARTOC=http://bartoc.org/en/node/533

version?=2023_4
XML := $(version)/rvko_$(version).xml
CONCEPTS := $(version)/rvko_$(version)-concepts.ndjson

default: $(CONCEPTS)

$(XML):
	./rvkdata.sh $(version) get

$(CONCEPTS): $(XML)
	./rvkdata.sh $(version) jskos
