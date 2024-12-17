# jskos-data Docker

This container aims to offer all the tools and dependencies needed to build vocabularies in this repository. Work in progress.

## To-Dos
- [ ] Error with `nomenclature` (#48)
- [ ] Error with `nkostypes`

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

## Update Data and Rebuild Vocabularies
There is a script provided in the Docker container that updates the repository and rebuilds all vocabularies where files were changed.

```sh
docker compose run -it jskos-data /usr/src/app/update.ts
```

**Note:** Changes in the local data will be overridden if necessary. If there are new local files that would be overridden by remote changes, they will be moved to `.backup`.

To build all vocabularies, run build.ts:

```sh
docker compose run -it jskos-data /usr/src/app/build.ts
# Or to build single vocabularies (recommended):
docker compose run -it jskos-data /usr/src/app/build.ts bk rvk
```

## Publishing the Docker Image

Currently, only the `master` branch will be published by the GitHub workflow, and only whenever Docker-related files (`Dockerfile`, `entrypoint.sh`, scripts) are changed.
