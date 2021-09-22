#!/usr/bin/env perl
use v5.14.1;
use Catmandu -all;

# Convert DDC from MARC21 Classification format in XML to JSKOS
# without table entries

# See <https://github.com/LibreCat/Catmandu/pull/382>
sub fix {
    my $self  = shift;
    my $fixer = Catmandu->fixer(@_);
    $self->map( sub { $fixer->fix(shift) } );
}

my $importer = fix( importer( 'MARC', type => 'XML' ), <<'FIX');
select marc_match(LDR/6, "w")   # record type == classification
reject marc_match(153$z, ".")   # skip tables (current file does not include hierarchy)

# TODO: reject deprecated records

marc_map(153$ac, notation, join: "-")

copy_field(notation, uri)
prepend(uri, "http://dewey.info/class/")
append(uri,"/e23/")

move_field(notation, notation.0)

marc_map(153$ef, parent, join: "-")
if exists(parent)
  prepend(parent, "http://dewey.info/class/")
  append(parent,"/e23/")
  move_field(parent, broader.0.uri)

  add_field(inScheme.0.uri, "http://dewey.info/scheme/edition/e23/")
else
  add_field(topConceptOf.0.uri, "http://dewey.info/scheme/edition/e23/")
end

marc_map(153$j, prefLabel.en)
marc_map(700$a,altLabel.en.$append)
marc_map(710$a,altLabel.en.$append)
marc_map(711$a,altLabel.en.$append)
marc_map(730$a,altLabel.en.$append)
marc_map(748$a,altLabel.en.$append)
marc_map(750$a,altLabel.en.$append)
marc_map(751$a,altLabel.en.$append)
marc_map(753$a,altLabel.en.$append)

unless exists(prefLabel)
  if exists(altLabel)
    move_field(altLabel.en.$first, prefLabel.en)
  end
end
FIX

$importer = fix( $importer, 'remove_field(record)', 'remove_field(_id)' );

exporter( 'JSON', line_delimited => 1 )->add_many($importer);
