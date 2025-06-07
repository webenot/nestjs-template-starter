import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import mongoConfig from './database-config';

@Module({
  imports: [MongooseModule.forRoot(mongoConfig.mongodb.url)],
})
export class MongodbModule {}
