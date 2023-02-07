package Catmandu::Fix::ddc;

use v5.14.1;
use Moo;

use Data::Dumper;

sub fix {
    my ( $self, $data ) = @_;
    my @fields = @{ $data->{record} };
    my ($f153) = grep { $_->[0] eq '153' } @fields;
    if ($f153) {
        my $uri;
        my @sf = splice @$f153, 3;
        while (@sf) {
            my $code  = shift @sf;
            my $value = shift @sf;
            if ( $code eq 'a' ) {
                $uri = defined $uri ? "$uri:$value" : $value;
            }
            elsif ( $code eq 'c' ) {
                $uri .= "-$value";
            }
        }
        $data->{uri} = $uri;
    }
    $data;
}

1;
