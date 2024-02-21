FROM ubuntu:22.04
WORKDIR /usr/src/app

# Install dependencies
RUN apt update
RUN apt install -y curl wget bash git make jq

# Perl dependencies
RUN apt install -y perl build-essential librdf-query-perl librdf-query-client-perl libexpat1-dev libssl-dev zlib1g-dev
RUN yes | cpan App::cpanminus
# XML::Parser XML::SemanticDiff Test::XML XML::LibXML Catmandu::SRU
RUN cpanm -n App::skos2jskos Catmandu Catmandu::MARC Catmandu::Breaker Catmandu::Importer::SRU Catmandu::Importer::SRU::Parser::picaxml PICA::Data

# Python dependencies
RUN python3 python3-pip
RUN pip3 install --upgrade mc2skos namedentities

# Node.js via NodeSource (see https://github.com/nodesource/distributions/blob/master/README.md)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash
RUN apt install -y nodejs

# Deno
RUN curl -fsSL https://deno.land/install.sh | sh

# Dependencies for specific vocabularies
## nkostypes
RUN apt install -y raptor2-utils
RUN npm install -g wikibase-cli@latest

# Make Docker-related scripts available in root folder
COPY .docker/*.sh .

CMD ["bash", "entrypoint.sh"]
