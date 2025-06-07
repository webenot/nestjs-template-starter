#!/bin/bash

source ./scripts/postgresql/migration-base-paths.sh

read -r -p 'Migration name: ' migrationName && \
npm run build && \
npm run typeorm -- migration:create "$migrationBasePath""$migrationName"
