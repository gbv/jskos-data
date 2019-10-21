#!/usr/bin/env perl
use v5.14;
use Catmandu -all;

my %seen;

#open my $fh, '<:utf8', 'fid.csv';
my $exporter = exporter( 'CSV', fields => [qw(notation prefLabel)] );

importer( 'CSV', file => 'fid.csv' )->each(
    sub {
        my $notation = $1 if $_[0]->{"FID Kennzeichen"} =~ /^(FID-[A-Z]+)/;
        my $label    = $1 if $_[0]->{"FID Kurztitel"} =~ /^FID ([^(]+)/;
        $exporter->add(
            {
                notation  => $notation,
                prefLabel => $label
            }
        ) unless $seen{$notation};
        $seen{$notation}++;
    }
  )
