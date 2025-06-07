import { Module } from '@nestjs/common';

import { LoggerModule } from './logger/logger.module';
import { AdminsApiModule } from './modules/apis/admins-api/admins-api.module';
import { ClientsApiModule } from './modules/apis/clients-api/clients-api.module';
import { CommonApiModule } from './modules/apis/common-api/common-api.module';
import { GuestsApiModule } from './modules/apis/guests-api/guests-api.module';
import { ConfigurationModule } from './modules/configurations/configuration.module';
import { CronSchedulerModule } from './modules/cron-scheduler/cron-scheduler.module';
import { FundamentalsModule } from './modules/fundamentals/fundamentals.module';
import { ManagersModule } from './modules/managers/managers.module';
import { DatabaseModule } from './providers/database/database.module';
import { RedisModule } from './providers/redis/redis.module';
import { RmqModule } from './providers/rmq/rmq.module';

@Module({
  imports: [
    ConfigurationModule,
    LoggerModule,
    FundamentalsModule,
    ManagersModule,
    CronSchedulerModule,
    DatabaseModule,
    AdminsApiModule,
    ClientsApiModule,
    CommonApiModule,
    GuestsApiModule,
    RedisModule,
    RmqModule,
  ],
  controllers: [],
})
export class AppModule {}
