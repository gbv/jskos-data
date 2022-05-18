#!/usr/bin/perl
use v5.14.1;

say 'level,prefLabel@de,scopeNote@de';

my $notationPattern = qr{^[A-Z][A-Z]?[A-Z]?[0-9]*$};

my ( $notation, $label, @notes, $error );

while (<>) {
    chomp;
    next if $_ eq '';

    # say STDERR "$. [$notation|$label]: $_ ";

    if ( $_ =~ $notationPattern ) {
        line() if $. > 1;
        $notation = $_;
    }
    elsif ( $notation && !$label ) {
        $label = $_;
    }
    elsif ( $notation && $label && $_ =~ /^\((.+)\)$/ ) {
        push @notes, $1;
    }
    else {
        say STDERR "Zeile $. passt nicht: $_";
        $error = 1;
    }
}

line();

exit( $error || 0 );

sub line {
    if ( !$notation ) {
        say STDERR "Zeile $.: Notation fehlt vorher";
        $error = 1;
    }
    elsif ( !$label ) {
        say STDERR "Zeile $.: Label fehlt vorher";
        $error = 1;
    }
    else {
        my $level = length $notation;
        my $note  = @notes ? do { '"' . join( "; ", @notes ) . '"' } : "";

        say join ",", $level, $notation, "\"$label\"", $note;
    }

    ( $notation, $label, @notes ) = ();
}
