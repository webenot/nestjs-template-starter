import { OnQueueActive, OnQueueCompleted, OnQueueFailed } from '@nestjs/bull';
import type { Job } from 'bull';

import { LoggerService } from '~/logger/logger.service';

export class BullBaseConsumerService {
  protected readonly logger: LoggerService;

  constructor() {
    this.logger = new LoggerService(BullBaseConsumerService.name);
  }

  @OnQueueActive()
  async onQueueActive(job: Job): Promise<void> {
    this.logger.info(this.onQueueActive.name, `Processing job ${job.id} of type ${job.name}`);
  }

  @OnQueueCompleted()
  async onQueueCompleted(job: Job): Promise<void> {
    this.logger.log(this.onQueueCompleted.name, `Job ID:${job.id} name:${job.name} has being completed`);

    await job.remove();
  }

  @OnQueueFailed()
  async onQueueFailed(job: Job, error: Error): Promise<void> {
    this.logger.error(
      this.onQueueFailed.name,
      `Failed job ${job.id} of type ${job.name}: ${error.message}`,
      error.stack,
    );

    await job.remove();
  }
}
