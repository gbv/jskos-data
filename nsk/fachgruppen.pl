#!/usr/bin/env perl
use v5.14.1;

# USAGE: ./fachgruppen.pl < NSK_Fachgruppenkatalog.csv > fachgruppen.csv

binmode *STDOUT, ':encoding(UTF-8)';

say "level,notation,prefLabel";

while (<>) {
    my @row = split ';', ( $_ =~ s/\R//gr );

    my @parts = grep { $_ ne '' } splice @row, 0, 5;

    pop @row while !$row[$#row];
    my $label = $row[$#row];

    my $notation = join ' ', @parts;

    # Skips #geografische_angabe und #einzelsprache (TODO)
    next if $notation =~ '#';

    my $level = scalar(@parts) - 1;
    say "$level,$notation,\"$label\"";
}
