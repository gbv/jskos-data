all: default bk-concepts.pp bk-concepts.xml

BARTOC=http://bartoc.org/en/node/18785
include ../Makefile

bk-concepts.pp:
	catmandu convert kxpnorm --query 'pica.tbs=kb and pica.mat=Tkv' to pp > "$@"

bk-concepts.xml: bk-concepts.pp
	picadata "$<" -t xml > "$@"

$(CONCEPTS): bk-concepts.xml
	node convert.js "$<" "$@"
