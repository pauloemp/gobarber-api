#!/bin/sh

>&2 echo "Syncing node_modules"

cp -r /cache/node_modules/. /api/node_modules/

>&2 echo "Running migrations"

yarn typeorm migration:run

yarn dev:server
