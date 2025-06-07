import type { Provider } from '@nestjs/common';

import { BullBaseConsumerService } from './bull-base-consumer.service';

const bullBaseConsumerServiceMockFactory: jest.Mock<Partial<BullBaseConsumerService>> = jest.fn(() => ({
  onQueueActive: jest.fn(),
  onQueueCompleted: jest.fn(),
  onQueueFailed: jest.fn(),
}));

export const BullBaseConsumerServiceMock: Provider = {
  provide: BullBaseConsumerService,
  useFactory: bullBaseConsumerServiceMockFactory,
};
