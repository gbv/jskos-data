# BIC Standard Subject Categories & Qualifiers (BSSC)

In progress.

- BARTOC entry: https://bartoc.org/en/node/220
- Online browser: https://ns.editeur.org/bic_categories
- PDF data: https://bic.org.uk/wp-content/uploads/2022/11/101201-bic2.1-complete-rev.pdf
- Excel data (subjects): https://bic.org.uk/wp-content/uploads/2023/02/101201-BIC2.1-Subj-only.xls
- Excel data (qualifiers): https://bic.org.uk/wp-content/uploads/2023/02/101201-BIC2.1-Quals-only.xls
  - Note: Top level is missing

Requires [Deno](https://deno.com/).

The easiest way to (re)build the files is via the Makefile entries:
```sh
make
```

Two caveats, however:

- Due to the [Obsolescence of BIC Codes](https://bic.org.uk/resources/bic-standard-subject-categories/obsolescence-of-bic-codes-and-transition-to-themabics-operational-faqs/), the files probably won't be accessible after 29 February 2024.
- Notes are scraped from the online browser which takes some time due to an artificial delay in requests.

To manually run the steps:

```sh
# Download Excel data
wget https://bic.org.uk/wp-content/uploads/2023/02/101201-BIC2.1-Subj-only.xls
wget https://bic.org.uk/wp-content/uploads/2023/02/101201-BIC2.1-Quals-only.xls
# Scrape notes
deno run --allow-net scrape-notes.ts > bssc-notes.csv
# Build CSV concepts
deno run --allow-read to-csv.ts > bssc-concepts.csv
# Convert to JSKOS
npm run --silent jskos-convert -- concepts -s bssc-scheme.json -m bssc-concepts.csv > bssc-concepts.ndjson
```
