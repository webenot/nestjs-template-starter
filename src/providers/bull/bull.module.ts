import { BullModule as Bull } from '@nestjs/bull';
import { Module } from '@nestjs/common';

import { ConfigurationService } from '../../modules/configurations/configuration.service';
import { BullBaseConsumerService } from './bull-base-consumer.service';
import { QueueProcessorsEnum } from './enums/queue-processors.enum';

const configurationService = new ConfigurationService();

@Module({
  imports: [
    Bull.forRoot({
      redis: configurationService.getRedisConfigurations(),
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true,
      },
    }),
    Bull.registerQueue({
      name: QueueProcessorsEnum.TEST,
    }),
  ],
  providers: [BullBaseConsumerService],
  exports: [BullBaseConsumerService, Bull],
})
export class BullModule {}
