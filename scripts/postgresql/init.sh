#!/bin/bash

echo "---------------------------------------------------------------"
echo " Prepare BaseService for PostgreSQL"
echo "---------------------------------------------------------------"

cat > "./src/modules/fundamentals/base/base.service.ts" <<EOF
import type { ObjectLiteral } from 'typeorm';

import { BaseService as BasePostgreSQLService } from '../../../providers/database/postgresql/base-service/base.service';

export class BaseService<T extends ObjectLiteral> extends BasePostgreSQLService<T> {}
EOF

echo " Prepare DatabaseModule for PostgreSQL"
echo "---------------------------------------------------------------"
cat > "./src/providers/database/database.module.ts" <<EOF
import { Module } from '@nestjs/common';

import { PostgreSQLModule } from './postgresql/postgresql.module';

@Module({
  imports: [PostgreSQLModule],
})
export class DatabaseModule {}
EOF

echo " Prepare BaseSchema for PostgreSQL"
echo "---------------------------------------------------------------"
cat > "./src/modules/fundamentals/base/base.entity.ts" <<EOF
import { BaseEntity as BasePostgreSQLEntity } from '../../../providers/database/postgresql/base-service/base.entity';

export class BaseEntity extends BasePostgreSQLEntity {}
EOF
rm "./src/modules/fundamentals/base/base.schema.ts"

echo " Remove MongoDB provider files"
echo "---------------------------------------------------------------"
rm -rf "./src/providers/database/mongodb"
rm -rf "./scripts/mongodb"

echo " Remove MongoDB scripts in package.json"
echo "---------------------------------------------------------------"
packageJsonFilePath="./package.json"
lines=`sed -n '/"mongodb/=' $packageJsonFilePath`
for word in $lines
do
  sed -i ""$word"s/.*$//" $packageJsonFilePath;
done

echo " Clear all empty lines in package.json"
echo "---------------------------------------------------------------"
ex -s +'v/\S/d' -cwq $packageJsonFilePath;

echo " Remove unnecessary commas from package.json"
echo "---------------------------------------------------------------"
lines=`sed -n '/},$/=' $packageJsonFilePath`
for word in $lines
do
  prevLine=$(($word - 1));
  sed -i ""$prevLine"s/,$//" $packageJsonFilePath;
done

echo " Change docker-compose.yaml file"
echo "---------------------------------------------------------------"
dockerComposeFilePath="./docker-compose.yaml"
lines=`sed -n '/mongodb:$/=' $dockerComposeFilePath`
for word in $lines
do
for (( c=0; c<=14; c++ ))
do
   lineNumber=$(($word + $c));
   sed -i ""$lineNumber"s/.*$//" $dockerComposeFilePath;
done
done
ex -s +'v/\S/d' -cwq $dockerComposeFilePath

source ./scripts/init/edit-config.sh
