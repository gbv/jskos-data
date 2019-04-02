#!/usr/bin/env perl
use v5.14;
use JSON;

# this URI is not official, we just hijacked the xkos: namespace!
my $combinedUri = "http://rdf-vocabulary.ddialliance.org/xkos#CombinedConcept";

my $fh;
my $file = shift @ARGV;

open( $fh, '<', $file ) or die "failed to open $file\n";

my %tree;    # broader links between URIs of classes with X:Y identifier

while (<$fh>) {
    my $rec = decode_json($_);
    my $uri = $rec->{uri};

    my ($id) = grep { $_ =~ /:./ } @{ $rec->{identifier} };
    if ($id) {
        my ($broader) = @{ $rec->{broader} // [] };
        if ($broader) {
            $tree{$uri} = $broader->{uri};
        }
    }
}

seek $fh, 0, 0;

while (<$fh>) {
    my $rec = decode_json($_);
    my $uri = $rec->{uri};

    # mark combined concepts
    my $broader = $tree{$uri};
    if ( $broader && $tree{$broader} ) {
        push @{ $rec->{type} }, $combinedUri;
    }

    say encode_json($rec);
}
