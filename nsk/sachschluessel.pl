#!/usr/bin/env perl
use v5.14.1;

# USAGE: ./sachschluessel.pl < NSK_Sachkatalogschlüssel.csv > sachschluessel.csv

say "level,notation,prefLabel";
say "0,sach,Sachkatalogschlüssel";

my $level;

while (<>) {
    next if $. < 2;
    my ( $notation, $name1, $name2 ) = split ';', ( $_ =~ s/\R//gr );
    my $label;

    if ($name2) {
        if ( $level < 2 ) {
            say "1,$notation-,\"$name1\"";
        }
        $level = 2;
        $label = $name2;
    }
    else {
        $level = 1;
        $label = $name1 || '?';
    }

    say "$level,$notation,\"$label\"";
}
