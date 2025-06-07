#!/bin/bash

echo "---------------------------------------------------------------"
echo " Prepare BaseService for MongoDB"
echo "---------------------------------------------------------------"

cat > "./src/modules/fundamentals/base/base.service.ts" <<EOF
import type { Document } from 'mongoose';

import type { BaseSchema } from '../../../providers/database/mongodb/base-service/base.schema';
import { BaseService as BaseMongodbService } from '../../../providers/database/mongodb/base-service/base.service';

export class BaseService<T extends BaseSchema | Document> extends BaseMongodbService<T> {}
EOF

echo " Prepare DatabaseModule for MongoDB"
echo "---------------------------------------------------------------"

cat > "./src/providers/database/database.module.ts" <<EOF
import { Module } from '@nestjs/common';

import { MongodbModule } from './mongodb/mongodb.module';

@Module({
  imports: [MongodbModule],
})
export class DatabaseModule {}
EOF

echo " Prepare BaseSchema for MongoDB"
echo "---------------------------------------------------------------"
baseSchemaFilePath="./src/modules/fundamentals/base/base.schema.ts"
cat > "$baseSchemaFilePath" <<EOF
import { BaseSchema as BaseMongodbSchema } from '../../../providers/database/mongodb/base-service/base.schema';

export class BaseSchema extends BaseMongodbSchema {}
EOF
git add $baseSchemaFilePath

rm "./src/modules/fundamentals/base/base.entity.ts"

echo " Remove PostgreSQL provider files"
echo "---------------------------------------------------------------"

rm -rf "./src/providers/database/postgresql"
rm -rf "./scripts/postgresql"
rm "./src/providers/database/migrations/migrations.ts"
rm "./src/modules/fundamentals/entities.ts"
rm "./src/modules/utils/prepare-order-parameters.ts"
rm "./src/modules/utils/paginate-raw-data.ts"
rm "./src/modules/utils/paginate-data.ts"

echo " Remove typeorm packages and scripts in package.json"
echo "---------------------------------------------------------------"

packageJsonFilePath="./package.json"

lines=`sed -n '/typeorm/=' $packageJsonFilePath`
for word in $lines
do
  sed -i ""$word"s/.*$//" $packageJsonFilePath;
done

echo " Clear all empty lines in package.json"
echo "---------------------------------------------------------------"
ex -s +'v/\S/d' -cwq $packageJsonFilePath

echo " Add mongoose packages in package.json"
echo "---------------------------------------------------------------"
lines=`sed -n '/"lodash"/=' $packageJsonFilePath`
for word in $lines
do
  sed -i "$word a \ \ \ \ \"migrate-mongo\": \"^9.0.0\"," $packageJsonFilePath;
  nextLine=$(($word + 1));
  sed -i "$nextLine a \ \ \ \ \"mongodb\": \"^4.13.0\"," $packageJsonFilePath;
  nextLine=$(($nextLine + 1));
  sed -i "$nextLine a \ \ \ \ \"mongoose\": \"^6.9.2\"," $packageJsonFilePath;
done

lines=`sed -n '/@nestjs\/core/=' $packageJsonFilePath`
for word in $lines
do
  sed -i "$word a \ \ \ \ \"@nestjs\/mongoose\": \"^9.2.1\"," $packageJsonFilePath;
done

source ./scripts/init/edit-packages.sh

echo " Change README.md file"
echo "---------------------------------------------------------------"
readmeFilePath="./README.md"
sed -i "s/PostgreSQL/MongoDB/" $readmeFilePath;
sed -i "s/localhost:5432/localhost:27017/" $readmeFilePath;
lines=`sed -n '/Each Entity for typeORM you need to export in/=' $readmeFilePath`
for word in $lines
do
  nextLine=$(($word + 1));
  sed -i ""$word"s/.*$//" $readmeFilePath;
  sed -i ""$nextLine"s/.*$//" $readmeFilePath;
done
sed -i "s/TypeORM/mongoose/" $readmeFilePath;
sed -i "s/typeorm:/mongodb:/" $readmeFilePath;
sed -i "s/postgresql/mongodb/" $readmeFilePath;
sed -i "s/postgres/mongodb/" $readmeFilePath;
sed -i "s/base\.entity/base\.schema/" $readmeFilePath;
sed -i "s/entityManager: EntityManager/session: ClientSession/" $readmeFilePath;
sed -i "s/BaseEntity/BaseSchema/" $readmeFilePath;
sed -i "s/manager, provided by/session, provided by/" $readmeFilePath;
sed -i "s/EntityManager/ClientSession/" $readmeFilePath;
sed -i "s/id: uuid/id: ObjectId/" $readmeFilePath;
sed -i "s/createdAt: timestamp with tz/createdAt: Date/" $readmeFilePath;
sed -i "s/updatedAt: timestamp with tz/updatedAt: Date/" $readmeFilePath;
lines=`sed -n '/To generate a migration from entities changes/=' $readmeFilePath`
for word in $lines
do
for (( c=0; c<=4; c++ ))
do
  lineNumber=$(($word + $c));
  sed -i ""$lineNumber"s/.*$//" $readmeFilePath;
done
done

sed -i '/^$/N;/^\n$/D' $readmeFilePath

echo " Change docker-compose.yaml file"
echo "---------------------------------------------------------------"
dockerComposeFilePath="./docker-compose.yaml"
lines=`sed -n '/postgres:$/=' $dockerComposeFilePath`
for word in $lines
do
for (( c=0; c<=13; c++ ))
do
   lineNumber=$(($word + $c));
   sed -i ""$lineNumber"s/.*$//" $dockerComposeFilePath;
done
done

lines=`sed -n '/pgdata: {}$/=' $dockerComposeFilePath`
for word in $lines
do
   sed -i ""$word"s/.*$//" $dockerComposeFilePath;
   prevLine=$(($word - 1));
   sed -i ""$prevLine"s/.*$//" $dockerComposeFilePath;
done
ex -s +'v/\S/d' -cwq $dockerComposeFilePath
sed -i "s/postgres/mongodb/" $dockerComposeFilePath;

source ./scripts/init/edit-config.sh
