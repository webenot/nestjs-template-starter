import { Test, TestingModule } from '@nestjs/testing';
import type { Job } from 'bull';

import { BullBaseConsumerService } from './bull-base-consumer.service';
import { getValidBullJobMock } from './bull-job.mock';

jest.mock('bull');

describe(BullBaseConsumerService.name, () => {
  let job: Partial<Job>;

  let bullBaseConsumerService: BullBaseConsumerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BullBaseConsumerService],
    }).compile();

    bullBaseConsumerService = module.get<BullBaseConsumerService>(BullBaseConsumerService);
    job = getValidBullJobMock();
  });

  afterEach(() => jest.clearAllMocks);

  it('should be defined', () => {
    expect(bullBaseConsumerService).toBeDefined();
  });

  describe('onQueueActive', () => {
    it('should return no result', async () => {
      const result = await bullBaseConsumerService.onQueueActive(job as Job);
      expect(result).toBeUndefined();
    });
  });

  describe('onQueueCompleted', () => {
    it('should return no result', async () => {
      const result = await bullBaseConsumerService.onQueueCompleted(job as Job);

      expect(job.remove).toHaveBeenCalledTimes(1);
      expect(result).toBeUndefined();
    });
  });

  describe('onQueueFailed', () => {
    it('should return no result', async () => {
      const result = await bullBaseConsumerService.onQueueFailed(job as Job, new Error('Test error'));

      expect(job.remove).toHaveBeenCalledTimes(1);
      expect(result).toBeUndefined();
    });
  });
});
