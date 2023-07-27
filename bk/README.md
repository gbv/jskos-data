# Basisklassifikation

Die Basisklassifikation wird über die Normdaten in K10Plus gepflegt und ggf. hier aktualisiert. Die resultierenden JSKOS-Daten werden dann in DANTE neu importiert.

## Dependencies

- Perl
- [cpanminus](https://metacpan.org/pod/App::cpanminus): `cpan App::cpanminus`
- [Catmandu](https://librecat.org/Catmandu/#installation), including additional dependencies: `cpanm Catmandu Catmandu::MARC Catmandu::Importer::SRU Catmandu::Importer::SRU::Parser::picaxml`
- [picadata](https://github.com/pro4bib/pica/blob/master/picadata.md): `cpanm PICA::Data`
- Node.js 18 or later (for conversion to JSKOS)

## Dumping BK from K10Plus

```bash
make bk-concepts.xml
```

## Convert to JSKOS

```bash
make bk-concepts.ndjson
```
