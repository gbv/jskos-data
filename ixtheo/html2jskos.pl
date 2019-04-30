#!/usr/bin/env perl
use v5.14;
use JSON;

my @concepts;
my $base     = "https://www.ixtheo.de/classification/";
my $language = "de";

while (<>) {
    my ( $notation, $label );

    if ( $_ =~ /<a href="\/classification[^>]+>([A-Z]+) ([^<]+)</ ) {
        ( $notation, $label ) = ( $1, $2 );
    }
    elsif ( $_ =~ /<li><em>([A-Z]+) ([^<]+)/ ) {
        ( $notation, $label ) = ( $1, $2 );
    }
    else {
        next;
    }

    my $uri     = "$base$notation";
    my %concept = (
        uri       => $uri,
        notation  => [$notation],
        prefLabel => { $language => $label },
        inScheme  => [ { uri => $base } ],
        type      => ["http://www.w3.org/2004/02/skos/core#Concept"],
    );

    if ( length $notation > 1 ) {
        $concept{broader} = [ { uri => substr $uri, 0, length($uri) - 1 } ];
    }
    else {
        $concept{topConceptOf} = $concept{inScheme};
    }

    say JSON->new->encode( \%concept );
}
