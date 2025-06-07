import { Injectable } from '@nestjs/common';

import { LoggerService } from '~/logger/logger.service';

@Injectable()
export class TestApiService {
  private readonly logger: LoggerService;

  constructor() {
    this.logger = new LoggerService(TestApiService.name);
  }

  public testLogger(): void {
    this.logger.log(this.testLogger.name, 'Some test object log', { object: { a: 'Some test object' } });
    this.logger.log(this.testLogger.name, 'Some test array log', { array: [{ a: 'Some test object in array' }] });
    this.logger.log(this.testLogger.name, 'Some test string log', 'Some test string');
    this.logger.debug(this.testLogger.name, 'Some test object debug', { object: { a: 'Some test object' } });
    this.logger.debug(this.testLogger.name, 'Some test array debug', { array: [{ a: 'Some test object in array' }] });
    this.logger.debug(this.testLogger.name, 'Some test string debug', 'Some test string');
    this.logger.trace(this.testLogger.name, 'Some test object trace', { object: { a: 'Some test object' } });
    this.logger.trace(this.testLogger.name, 'Some test array trace', { array: [{ a: 'Some test object in array' }] });
    this.logger.trace(this.testLogger.name, 'Some test string trace', 'Some test string');
    this.logger.warn(this.testLogger.name, 'Some test object warn', { object: { a: 'Some test object' } });
    this.logger.warn(this.testLogger.name, 'Some test array warn', { array: [{ a: 'Some test object in array' }] });
    this.logger.warn(this.testLogger.name, 'Some test string warn', 'Some test string');
    this.logger.error(this.testLogger.name, 'Some test object error', { object: { a: 'Some test object' } });
    this.logger.error(this.testLogger.name, 'Some test array error', { array: [{ a: 'Some test object in array' }] });
    this.logger.error(this.testLogger.name, 'Some test string error', 'Some test string');
    this.logger.fatal(this.testLogger.name, 'Some test object fatal', { object: { a: 'Some test object' } });
    this.logger.fatal(this.testLogger.name, 'Some test array fatal', { array: [{ a: 'Some test object in array' }] });
    this.logger.fatal(this.testLogger.name, 'Some test string fatal', 'Some test string');
  }
}
