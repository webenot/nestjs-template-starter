import { Injectable } from '@nestjs/common';
import type { Job } from 'bull';

import { LoggerService } from '~/logger/logger.service';

@Injectable()
export class CronManagerService {
  private readonly logger: LoggerService;

  constructor() {
    this.logger = new LoggerService(CronManagerService.name);
  }

  async startTestJob(job: Job<unknown>): Promise<void> {
    this.logger.info(this.startTestJob.name, 'Test cron job started', job.data);
  }
}
