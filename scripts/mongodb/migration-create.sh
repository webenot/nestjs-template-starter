#!/bin/bash

source ./scripts/mongodb/migration-base-paths.sh

read -r -p 'Migration name: ' migrationName && \

npm run mongodb -- create "$migrationName" -f "$migrationConfigPath"
