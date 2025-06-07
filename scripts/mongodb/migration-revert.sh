#!/bin/bash

source ./scripts/mongodb/migration-base-paths.sh

npm run mongodb -- down -f "$migrationConfigPath"
