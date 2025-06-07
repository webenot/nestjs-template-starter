import { Module } from '@nestjs/common';

import { CronManagerService } from './cron-manager.service';

@Module({
  imports: [],
  providers: [CronManagerService],
  exports: [CronManagerService],
})
export class CronManagerModule {}
