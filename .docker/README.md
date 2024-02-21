# jskos-data Docker

This container aims to offer all the tools and dependencies needed to build vocabularies in this repository. Work in progress.

## To-Dos
- [ ] Test all vocabularies
- [ ] Add script that updates repo and rebuilds vocabularies where files were changed
- [ ] Error with `nkostypes`
- [ ] Error with `ssg`
- [ ] `rvk`:
  - [ ] Make sure it works with just `make`
  - [ ] Install mc2skos from Git as described in README?

Create a `docker-compose.yml` file:

```yml
version: "3"
services:

  jskos-data:
    image: ghcr.io/gbv/jskos-data
    volumes:
      - ./data:/jskos-data
    restart: no
```

Start the container:

```sh
docker compose up
```

The latest version of jskos-data will be pulled from GitHub.

To run an interactive shell:

```sh
docker compose run -it jskos-data bash
```

## Publishing the Docker Image

Currently, only the `master` branch will be published by the GitHub workflow, and only whenever Docker-related files (`Dockerfile`, `entrypoint.sh`) are changed.
