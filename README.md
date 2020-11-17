# Crawler service

 * [Installation](#installation)
   * [With Docker](#with-docker)
   * [Local environment](#local-environment)
 * [Use](#use)

---

## Installation

### With Docker

#### Build and run

With Docker daemon running, run the following commands:

```sh
    make build
    make run
```

#### Other commands

 - `make enter`: Run a command shell into the running container.
 - `make stop`: Stops current container.
 - `make clean`: Purge all created images and containers.
 - `make all`: First call to `make clean`, then build the crawler (`make build`) and run it (`make run`)


### Local environment

#### Install and run

Run the following commands:

```sh
    make install
    make run_locally
```

## Use

### Get an article from url

Make a `POST` request to `http://localhost:8080` attaching a JSON body with site url:

```sh
    curl --request POST \
        --url http://localhost:8080/ \
        --header 'content-type: application/json' \
        --data '{
            "url": "http://.../"
        }'
```