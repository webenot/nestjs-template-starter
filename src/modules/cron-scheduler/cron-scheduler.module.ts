import { Module } from '@nestjs/common';

import { BullModule } from '../../providers/bull/bull.module';
import { CronManagerModule } from '../managers/cron-manager/cron-manager.module';
import { CronSchedulerService } from './cron-scheduler.service';
import { TestCronConsumer } from './test-cron.consumer';

@Module({
  imports: [BullModule, CronManagerModule],
  providers: [CronSchedulerService, TestCronConsumer],
  exports: [CronSchedulerService, TestCronConsumer],
})
export class CronSchedulerModule {}
