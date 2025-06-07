import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import IORedis, { RedisOptions } from 'ioredis';

import { RedisService } from './redis.service';

jest.mock('ioredis');

describe(RedisService.name, () => {
  const key = faker.string.alphanumeric();
  const value = faker.word.noun();
  const mathOperationResult = faker.number.int({ min: 0, max: 100 });

  let redisService: RedisService;
  let redisClient: IORedis;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RedisService,
        {
          provide: 'RedisOptions',
          useValue: {} as RedisOptions,
        },
      ],
    }).compile();

    redisService = module.get<RedisService>(RedisService);
    redisClient = redisService.getClient();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(redisService).toBeDefined();
  });

  describe('get', () => {
    it('should return result', async () => {
      const returnedValue = faker.word.noun();

      jest.spyOn(redisClient, 'get').mockResolvedValueOnce(returnedValue);
      const result = await redisService.get(key);

      expect(redisClient.get).toHaveBeenCalledTimes(1);
      expect(redisClient.get).toBeCalledWith(key);
      expect(result).toBe(returnedValue);
    });

    it('should return null', async () => {
      const returnedValue = null;

      jest.spyOn(redisClient, 'get').mockResolvedValueOnce(returnedValue);
      const result = await redisService.get(key);

      expect(redisClient.get).toHaveBeenCalledTimes(1);
      expect(redisClient.get).toBeCalledWith(key);
      expect(result).toBeNull();
    });
  });

  describe('set', () => {
    const OK = 'OK';
    const ttl = faker.number.int();

    it('should set value with default ttl', async () => {
      jest.spyOn(redisClient, 'set').mockResolvedValueOnce(OK);
      const result = await redisService.set(key, value);

      expect(redisClient.set).toHaveBeenCalledTimes(1);
      expect(redisClient.set).toBeCalledWith(key, value);
      expect(result).toBe(OK);
    });

    it('should set value with specified ttl', async () => {
      jest.spyOn(redisClient, 'set').mockResolvedValueOnce(OK);
      const result = await redisService.set(key, value, ttl);

      expect(redisClient.set).toHaveBeenCalledTimes(1);
      expect(redisClient.set).toBeCalledWith(key, value, 'EX', ttl);
      expect(result).toBe(OK);
    });
  });

  describe('delete', () => {
    it('should not delete any files', async () => {
      const numberOfDeleteKeys = 0;

      jest.spyOn(redisClient, 'del').mockResolvedValueOnce(numberOfDeleteKeys);
      const result = await redisService.delete(key);

      expect(redisClient.del).toHaveBeenCalledTimes(1);
      expect(redisClient.del).toBeCalledWith(key);
      expect(result).toBe(numberOfDeleteKeys);
    });

    it('should delete one file', async () => {
      const numberOfDeleteKeys = 1;

      jest.spyOn(redisClient, 'del').mockResolvedValueOnce(numberOfDeleteKeys);
      const result = await redisService.delete(key);

      expect(redisClient.del).toHaveBeenCalledTimes(1);
      expect(redisClient.del).toBeCalledWith(key);
      expect(result).toBe(numberOfDeleteKeys);
    });
  });

  describe('keys', () => {
    it('should return one key matching pattern', async () => {
      const searchPattern = '*';

      jest.spyOn(redisClient, 'keys').mockResolvedValueOnce([key]);
      const result = await redisService.keys('*');

      expect(redisClient.keys).toHaveBeenCalledTimes(1);
      expect(redisClient.keys).toBeCalledWith(searchPattern);
      expect(result).toEqual(expect.arrayContaining([key]));
      expect(result).not.toEqual(expect.arrayContaining([searchPattern]));
    });
  });

  describe('exists', () => {
    it('should return key if it exists', async () => {
      jest.spyOn(redisClient, 'exists').mockResolvedValueOnce(1);
      const result = await redisService.exists(key);

      expect(redisClient.exists).toHaveBeenCalledTimes(1);
      expect(redisClient.exists).toBeCalledWith(key);
      expect(result).toBeTruthy();
    });

    it('should return key if it do not exists', async () => {
      jest.spyOn(redisClient, 'exists').mockResolvedValueOnce(0);
      const result = await redisService.exists(key);

      expect(redisClient.exists).toHaveBeenCalledTimes(1);
      expect(redisClient.exists).toBeCalledWith(key);
      expect(result).toBeFalsy();
    });
  });

  describe('setAdd', () => {
    it('should return number of new keys in a set', async () => {
      jest.spyOn(redisClient, 'sadd').mockResolvedValueOnce(1);
      const result = await redisService.setAdd(key, value);

      expect(redisClient.sadd).toHaveBeenCalledTimes(1);
      expect(redisClient.sadd).toBeCalledWith(key, value);
      expect(result).toBe(1);
    });
  });

  describe('setRemove', () => {
    it('should return number of deleted keys in a set', async () => {
      jest.spyOn(redisClient, 'srem').mockResolvedValueOnce(1);
      const result = await redisService.setRemove(key, value);

      expect(redisClient.srem).toHaveBeenCalledTimes(1);
      expect(redisClient.srem).toBeCalledWith(key, value);
      expect(result).toBe(1);
    });
  });

  describe('setMembers', () => {
    it('should return number keys in a set', async () => {
      jest.spyOn(redisClient, 'smembers').mockResolvedValueOnce([value]);
      const result = await redisService.setMembers(key);

      expect(redisClient.smembers).toHaveBeenCalledTimes(1);
      expect(redisClient.smembers).toBeCalledWith(key);
      expect(result).toEqual(expect.arrayContaining([value]));
    });
  });

  describe('incrby', () => {
    it('should the value of key after the increment', async () => {
      jest.spyOn(redisClient, 'incrby').mockResolvedValueOnce(mathOperationResult);
      const result = await redisService.incrby(key, 5);

      expect(redisClient.incrby).toHaveBeenCalledTimes(1);
      expect(redisClient.incrby).toBeCalledWith(key, 5);
      expect(result).toEqual(mathOperationResult);
    });
  });

  describe('decrby', () => {
    it('should the value of key after the decrement', async () => {
      jest.spyOn(redisClient, 'decrby').mockResolvedValueOnce(mathOperationResult);
      const result = await redisService.decrby(key, 5);

      expect(redisClient.decrby).toHaveBeenCalledTimes(1);
      expect(redisClient.decrby).toBeCalledWith(key, 5);
      expect(result).toEqual(mathOperationResult);
    });
  });
});
