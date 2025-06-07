import { Module } from '@nestjs/common';

import { PostgreSQLModule } from './postgresql/postgresql.module';

@Module({
  imports: [PostgreSQLModule],
})
export class DatabaseModule {}
