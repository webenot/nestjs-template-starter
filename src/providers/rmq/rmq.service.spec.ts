import { faker } from '@faker-js/faker';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Test, TestingModule } from '@nestjs/testing';
import type { Options } from 'amqplib';

import { RmqService } from './rmq.service';

describe(RmqService.name, () => {
  const exchange = faker.word.noun();
  const routing = faker.word.noun();
  const request = { key: faker.word.noun() };

  let amqpConnectionSpy: AmqpConnection;
  let rmqService: RmqService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RmqService,
        {
          provide: AmqpConnection,
          useFactory: () => ({
            publish: jest.fn(() => undefined),
            request: jest.fn(() => 1),
          }),
        },
      ],
    }).compile();

    amqpConnectionSpy = module.get<AmqpConnection>(AmqpConnection);
    rmqService = module.get<RmqService>(RmqService);
  });

  afterEach(() => jest.clearAllMocks);

  it('should be defined', () => {
    expect(rmqService).toBeDefined();
  });

  describe('publish', () => {
    it('should return no result without options', async () => {
      const result = await rmqService.publish(exchange, routing, request);

      expect(amqpConnectionSpy.publish).toHaveBeenCalledTimes(1);
      expect(amqpConnectionSpy.publish).toHaveBeenCalledWith(exchange, routing, request, undefined);
      expect(result).toBeUndefined();
    });

    it('should return no result with options', async () => {
      const options: Options.Publish = { userId: faker.string.uuid() };
      const result = await rmqService.publish(exchange, routing, request, options);

      expect(amqpConnectionSpy.publish).toHaveBeenCalledTimes(1);
      expect(amqpConnectionSpy.publish).toHaveBeenCalledWith(exchange, routing, request, options);
      expect(result).toBeUndefined();
    });
  });

  describe('request', () => {
    it('should return request result without timeout', async () => {
      const result = await rmqService.request(exchange, routing, request);

      expect(amqpConnectionSpy.request).toHaveBeenCalledTimes(1);
      expect(amqpConnectionSpy.request).toHaveBeenCalledWith({
        exchange,
        routingKey: routing,
        payload: {
          ...request,
        },
      });
      expect(result).toEqual(1);
    });

    it('should return request result with timeout', async () => {
      const timeout = faker.number.int({ min: 1000, max: 100_000 });
      const result = await rmqService.request(exchange, routing, request, timeout);

      expect(amqpConnectionSpy.request).toHaveBeenCalledTimes(1);
      expect(amqpConnectionSpy.request).toHaveBeenCalledWith({
        exchange,
        routingKey: routing,
        payload: {
          ...request,
        },
        timeout,
      });
      expect(result).toEqual(1);
    });
  });
});
