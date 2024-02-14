BARTOC=http://bartoc.org/en/node/220
include ../Makefile

$(CONCEPTS): $(SCHEME) $(NAME)-concepts.csv
	$(jskos-convert) concepts -s $(SCHEME) -m $(NAME)-concepts.csv > $@

$(NAME)-concepts.csv: 101201-BIC2.1-Subj-only.xls 101201-BIC2.1-Quals-only.xls $(NAME)-notes.csv
	deno run --allow-read to-csv.ts > $@
$(NAME)-notes.csv:
	deno run --allow-net scrape-notes.ts > $@
101201-BIC2.1-Subj-only.xls:
	wget https://bic.org.uk/wp-content/uploads/2023/02/101201-BIC2.1-Subj-only.xls
101201-BIC2.1-Quals-only.xls:
	wget https://bic.org.uk/wp-content/uploads/2023/02/101201-BIC2.1-Quals-only.xls
