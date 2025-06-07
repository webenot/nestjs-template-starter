#!/bin/bash

source ./scripts/mongodb/migration-base-paths.sh

npm run mongodb -- up -f "$migrationConfigPath"
