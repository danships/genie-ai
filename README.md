genie-ai
=================

[![Build Status](https://travis-ci.org/matueranet/genie-ai.svg?branch=develop)](https://travis-ci.org/matueranet/genie-ai)

A module to easily use stt and tts in a project. Features stt triggering via a wake word.

**Development on this module has been temporary suspended, focus is currently on [genie-router](https://github.com/matueranet/genie-router).**

This module currently is an empty shell. I will work on it in the coming weeks. The stt part
will mostly be a wrapper around the [sonus](https://github.com/evancohen/sonus) project. Text-to-speech
should be available online (Google, Amazon Polly, etc.) and offline (espeak, mimic, etc.).

# Requirements

    sudo apt-get install libatlas-base-dev sox

# Docker

## Development

The project contains a `Dockerfile` which will install the required packages via `apt-get`, copy `package.json` and then run `npm install`. This image is meant to be used
during development, it has not been tested for production use.

To easily create the required volume mappings you can use `docker-compose` to map
the code from the host into the container. Simply execute:

    docker-compose up

This will build the Dockerfile and start running `dev.js` using `nodemon`. Nodemon will monitor file changes and restart the process. This command makes 2 assumptions:

1. There is a Google project with id _genie-ai_
2. There is a file _googlekey.json_ in the root of the folder that contains an API key to invoke the Google Speech to Text API. (Be careful not to commit  this file!)

## Test

You can create a container for runing the test by executing:

```
docker build -t matueranet/genie-ai:dev .
docker run --name=genie-ai-test -v `pwd`:/home/app -v /home/app/node_modules -w /home/app matueranet/genie-ai:dev npm test
```

After this you can simply execute:

    docker start -a genie-ai-test
