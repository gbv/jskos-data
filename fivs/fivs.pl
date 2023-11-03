#/usr/bin/env perl
use v5.20.0;
use XML::Simple;
use JSON::PP;

my $namespace = "https://uri.gbv.de/terminology/fivs/";
my $records   = XMLin('sachklass.xml')->{record};
my %rec       = map { ( $_->{ID} => $_ ) } @$records;

for (@$records) {
    my $class = $_->{CLASS};
    next if length $class == 1;

    my $jskos = {
        uri        => $namespace . $class,
        notation   => [$class],
        identifier => [ $_->{ID} ],
        inScheme   => [ { uri => $namespace } ],
        prefLabel  => {
            de => $_->{TERM0},
            en => $_->{TERM1},
            fr => $_->{TERM2},
            es => $_->{TERM3},
        }
    };
    push @{ $jskos->{identifier} }, $_->{recono} if $_->{recono};
    if ( $_->{NOTES} ) {
        $jskos->{scopeNotes} = [ { de => $_->{NOTES} } ];
    }
    if ( length $_->{CLASS} == 2 ) {
        $jskos->{topConceptOf} = [ { uri => $namespace } ];
    }
    else {
        my $broader = substr $class, 0, ( length $class == 7 ? 4 : 2 );
        $jskos->{broader} =
          [ { uri => $namespace . $broader } ];
    }
    say encode_json($jskos);
}

