import { Module } from '@nestjs/common';

import { CronManagerModule } from './cron-manager/cron-manager.module';

const modules = [CronManagerModule];
@Module({
  imports: modules,
  exports: modules,
})
export class ManagersModule {}
