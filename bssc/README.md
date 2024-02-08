# BIC Standard Subject Categories & Qualifiers (BSSC)

In progress.

- BARTOC entry: https://bartoc.org/en/node/220
- Online browser: https://ns.editeur.org/bic_categories
- PDF data: https://bic.org.uk/wp-content/uploads/2022/11/101201-bic2.1-complete-rev.pdf
- Excel data (subjects): https://bic.org.uk/wp-content/uploads/2023/02/101201-BIC2.1-Subj-only.xls
- Excel data (qualifiers): https://bic.org.uk/wp-content/uploads/2023/02/101201-BIC2.1-Quals-only.xls
  - Note: Top level is missing

```sh
wget https://bic.org.uk/wp-content/uploads/2023/02/101201-BIC2.1-Subj-only.xls
wget https://bic.org.uk/wp-content/uploads/2023/02/101201-BIC2.1-Quals-only.xls
deno run --allow-read toCsv.ts > concepts.csv
npx -p jskos-cli jskos-convert concepts -s scheme.json -m concepts.csv > concepts.ndjson
```
