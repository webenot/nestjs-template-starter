import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigurationModule } from '~/modules/configurations/configuration.module';
import { databaseOptions } from './database-config';

@Module({
  imports: [TypeOrmModule.forRoot(databaseOptions), ConfigurationModule],
})
export class PostgreSQLModule {}
