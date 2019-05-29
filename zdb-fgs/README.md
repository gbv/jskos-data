Dieser Ordner enthält die "Zeitschriftendatenbank-Fachgruppensystematik" (ZDB-FGS) als CSV-Datei, eine NDJSON Datei kann mit folgendem Skript erstellt werden:

    jskos-convert concepts -m -r registry.json -s ZDB-FGS -t ndjson zdb-fgs-concepts.csv > zdb-fgs-concepts.ndjson