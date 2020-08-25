#!/usr/bin/env perl
use v5.14.1;
use JSON::PP;

my $msc = do { local ( @ARGV, $/ ) = "msc-scheme.json"; decode_json(<>) };
my $notationPattern = $msc->{notationPattern};

# apply preprocessing to clean up txt file
my @lines;
my $prev;

while (<>) {
    chomp;
    s/^\x0C//;    # remove encoding dirt

    # skip empty lines, page numbers and false match in the intrduction text
    if ( /^(\d+|\s*)$/ || /^68 \(Computer Science/ ) {
        $prev = undef;
    }

    # class number and text
    elsif (/^($notationPattern)\s+.+/) {
        push @lines, $_;
        $prev = $1;
    }

    # line break in text
    elsif ( defined $prev ) {
        $lines[$#lines] .= " $_";
    }
}

say "level,notation,prefLabel,scopeNote";
for (@lines) {
    /^($notationPattern)\s+.+/;

    my $class = $1;
    my $text = substr( $_, length($1) + 1 );

    my $level = 3;
    if ( $class =~ /^\d\d$/ ) {
        $level = 0;
    }
    elsif ( $class =~ /^\d\d-XX$/ ) {
        $level = 1;
    }
    elsif ( $class =~ /^\d\d(-\d\d|[A-Z]xx)$/ ) {
        $level = 2;
    }

    my $notes = join '; ', grep { $_ } ( $text =~ /\[(.+?)\]|\{(.+?)\}/g );
    $text =~ s/\[(.+?)\]|\{(.+?)\}//g;
    $text =~ s/\s+$//;
    $text =~ s/\s+/ /;

    say join ',', map { "\"$_\"" } $level, $class, $text, $notes;
}
