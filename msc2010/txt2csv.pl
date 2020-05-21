#!/usr/bin/env perl
use v5.14;
use feature "switch";

say "level,notation,prefLabel,scopeNote";

my $notesPattern = qr!{(For[^}]+)}|\[(See[^\]]+)\]|\[(For[^\]]+)\]!;

while (<>) {
    chomp;
    next unless /^([0-9]{2}(-XX|-[0-9]{2}|[A-Z]xx|[A-Z][0-9]{2}))\s(.+)$/;

    my ( $notation, $label, $text ) = ( $1, $3, $3 );
    $label =~ s/$notesPattern//g;
    $label =~ s/\s+$//g;
    $label =~ s/\s+/ /g;

    my $level = 3;
    $level = 0 if $notation =~ /-XX$/;
    $level = 1 if $notation =~ /-[0-9]{2}$/;
    $level = 2 if $notation =~ /[A-Z]xx$/;

    my $notes = join '; ', grep { $_ } ( $text =~ /$notesPattern/g );
    say join ',', map { "\"$_\"" } $level, $notation, $label, $notes;
}
