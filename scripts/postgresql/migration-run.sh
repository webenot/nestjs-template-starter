#!/bin/bash

source ./scripts/postgresql/migration-base-paths.sh

npm run build && \
npm run typeorm -- migration:run -d "$migrationConfigPath"
