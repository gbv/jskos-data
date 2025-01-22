#!/usr/bin/env perl
use v5.32;
use Spreadsheet::XLSX;
use Text::CSV;

my $source = shift @ARGV or die "usage: $0 <source file>\n";
my $excel  = Spreadsheet::XLSX->new($source)
  or die "Failed to open $source: $!";

say 'level,notation,prefLabel@de,scopeNote@de';

my $sheet = $excel->{Worksheet}[0];
$sheet->{MaxRow} ||= $sheet->{MinRow};
for my $row ( $sheet->{MinRow} .. $sheet->{MaxRow} ) {
    $row = $sheet->{Cells}[$row];
    my @c = map { $_ ? $_->{Val} : undef } map { $row->[$_] } 0 .. 6;

    my ($level)  = grep { $c[$_] } 0 .. 5;
    my $notation = $c[$level];
    my $label    = $c[6];
    my $note     = $c[7];

    say join ",",
      map { $_ =~ s/"/'/g; $_ =~ s/^\s+|\s+$//g; "\"$_\""; }
      ( $level, $notation, $label, $note );
}
