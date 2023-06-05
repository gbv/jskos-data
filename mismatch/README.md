# Mapping Mismatch Tags

Vocabulary for tagging mapping mismatches (i.e. negative assessment annotations) in coli-conc. See also: https://github.com/gbv/jskos-server/issues/198

The vocabulary does not strictly follow previous works (see literature) because it is based on *practical* use to find and fix mismatches instead of *theoretical* reasons for mismatches. In short the tags have been reduced to three cases:

- **incompatible scope** (e.g. *apples* and *oranges* should not be mapped with each other because they just don't compare)

- **wrong mapping type** (e.g. *donkeys* > *animals* is wrong but *donkeys* < *animals* would fit)

- **redundant mapping** (e.g. *genetics* should not be mapped with *sciences* when there is more a more precise concept *biology*)

## Literature

- Reitz (2010): *A Mismatch Description Language for Conceptual Schema Mapping and Its Cartographic Representation*. https://doi.org/10.1007/978-3-642-15300-6_15

- Qadir, Fahad & Noshairwan (2007): *On Conceptualization Mismatches Between Ontologies*.  https://doi.org/10.1109/GrC.2007.150

- Klein (2001): *Combining and relating ontologies: an analysis of problems and solutions.*

- Visser et al (1997): *An analysis of ontological mismatches: Heterogeneity versus interoperability*

## Possible extensions

- wrong level / falsche Abstraktionsebene

  Wrong level of abstraction (too broad or too narrow)

  Falsche Abstraktionsebene (zu allgemein oder zu spezifisch)

