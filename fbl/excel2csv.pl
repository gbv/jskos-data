#!/usr/bin/env perl
use v5.32;
use Spreadsheet::XLSX;

my $source = shift @ARGV or die "usage: $0 <source file>\n";
my $excel  = Spreadsheet::XLSX->new->parse($source)
  or die "Failed to open $source: $!";

my $sheet = $excel->{Worksheet}[0];
