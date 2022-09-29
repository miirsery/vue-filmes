#!/bin/sh

node ./migrate.js migrate

exec "$@"
