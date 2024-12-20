FROM ubuntu:22.04
WORKDIR /usr/src/app

# Install dependencies
RUN apt update
RUN apt install -y curl wget bash git make jq

# Perl dependencies
RUN apt install -y perl build-essential librdf-query-perl librdf-query-client-perl libexpat1-dev libssl-dev zlib1g-dev
RUN yes | cpan App::cpanminus
# Some Perl dependencies are downloading files with crazy high user IDs for some reason, so we're chown'ing everything...
RUN cpanm -n App::skos2jskos Catmandu Catmandu::MARC Catmandu::Breaker Catmandu::Importer::SRU Catmandu::Importer::SRU::Parser::picaxml PICA::Data XML::Simple && chown -R root:root /root/.cpanm/work/

# Python dependencies
RUN apt install -y python3 python3-pip
RUN pip3 install --upgrade namedentities

# mc2skos (distributed version has unresolved issues)
RUN git clone https://github.com/gbv/mc2skos.git
RUN cd mc2skos && pip install -e .

# Node.js via NodeSource (see https://github.com/nodesource/distributions/blob/master/README.md)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash
RUN apt install -y nodejs

# Deno
RUN apt install -y unzip
RUN curl -fsSL https://deno.land/install.sh | sh
RUN ln -s /root/.deno/bin/deno /usr/bin/deno

# Dependencies for specific vocabularies
## nkostypes
RUN apt install -y raptor2-utils
RUN npm install -g wikibase-cli@latest
## msc2020 (pdftotext)
RUN apt install -y poppler-utils

# Make Docker-related scripts available in root folder
COPY .docker/*.sh .
COPY .docker/*.ts .

# Cache Deno dependencies for update script
RUN deno cache --reload --lock=deno.lock update.ts build.ts

# Make Git work with jskos-data folder despite "dubious ownership"
RUN git config --global --add safe.directory /jskos-data

CMD ["bash", "entrypoint.sh"]
