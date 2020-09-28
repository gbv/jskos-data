#!/usr/bin/env perl
use v5.14;
use Catmandu -all;
use List::MoreUtils qw(any firstval natatime);

binmode *STDOUT, ':encoding(utf-8)';

my %skip = map { $_ => 1 }
  'Autoren',
  'Autoren A - Z',
  'Autoren und Anonyma',
  'Einzelne Autoren',
  'Einzelne Autoren und Anonyma',
  'Einzelne Autoren und anonyme Texte',
  'Einzelne Autoren und ausgewählte Anonyma',
  'Quellen';

importer( 'MARC', type => 'XML' )->each(
    sub {
        # get MARC field 153
        my @rec = @{ shift->{record} };
        my ( undef, undef, undef, @f ) =
          @{ firstval( sub { $_->[0] eq '153' }, @rec ) };

        # get label, notation, broader
        my ( $notation, $label, @broader );
        my $subfields = natatime 2, @f;
        while ( my ( $sf, $value ) = $subfields->() ) {
            if ( $sf eq 'a' ) {
                $notation = $value;
            }
            elsif ( $sf eq 'j' ) {
                $label = $value;
                $label =~ s/;/,/g;
            }
            elsif ( $sf eq 'h' ) {
                push @broader, $value;
            }
        }

        next if !@broader or @broader[-1] !~ /^Autoren [A-Z]+$/;
        pop @broader;
        pop @broader while $skip{ @broader[-1] };

        # normalize name
        $label = "$2 $1" if $label =~ /^([^(]+), (.+)$/;

        say join "\t", $notation, $label, @broader[-1];
    }
);
