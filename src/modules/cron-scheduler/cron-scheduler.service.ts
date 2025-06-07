import { InjectQueue } from '@nestjs/bull';
import { Injectable, OnModuleInit } from '@nestjs/common';
import type { Queue } from 'bull';

import { QueueProcessesEnum } from '~/providers/bull/enums/queue-processes.enum';
import { QueueProcessorsEnum } from '~/providers/bull/enums/queue-processors.enum';

import { CronExpressionsEnum } from './enums';

@Injectable()
export class CronSchedulerService implements OnModuleInit {
  constructor(@InjectQueue(QueueProcessorsEnum.TEST) private testServiceQueue: Queue) {}

  public async onModuleInit(): Promise<void> {
    // TODO Add your cron tasks
    await this.startTestJob();
  }

  // Test cron job
  // TODO Remove it and add your own cron job
  private async startTestJob(): Promise<void> {
    await this.testServiceQueue.add(
      QueueProcessesEnum.TEST_CRON,
      { test: 'test' },
      {
        attempts: 1,
        repeat: { cron: CronExpressionsEnum.EVERY_MINUTES },
      },
    );
  }
}
