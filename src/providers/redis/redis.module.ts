import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-ioredis';
import type { RedisOptions } from 'ioredis';

import { ConfigurationService } from '~/modules/configurations/configuration.service';

import { RedisService } from './redis.service';

const configurationService = new ConfigurationService();
const redisOptions = configurationService.getRedisConfigurations();

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      ...redisOptions,
    }),
  ],
  providers: [
    RedisService,
    {
      provide: 'RedisOptions',
      useFactory: (): RedisOptions => {
        return redisOptions;
      },
    },
  ],
  exports: [RedisService],
})
export class RedisModule {}
