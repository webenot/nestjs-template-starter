import type { LoggerService as LoggerServiceInterface } from '@nestjs/common';

import { EMPTY_STRING } from '~/modules/utils/constants';

import { LogLevelEnum } from './enums';
import { logger } from './logger';

export class LoggerService implements LoggerServiceInterface {
  private readonly context: string;

  constructor(context = 'System') {
    this.context = context;
  }

  private static prepareData<T>(data?: T | string, parameters?: T): { extra?: T; subMessage?: string } {
    let extra: T;
    let subMessage = EMPTY_STRING;
    if (typeof data === 'string' && parameters) {
      extra = parameters;
      subMessage = data;
    } else {
      extra = data as T;
    }

    return { extra, subMessage };
  }

  error<T>(message: unknown, trace?: unknown, data?: T, context?: string): void {
    this.logError(LogLevelEnum.ERROR, message, trace, data, context);
  }

  fatal<T>(message: unknown, trace?: unknown, data?: T, context?: string): void {
    this.logError(LogLevelEnum.FATAL, message, trace, data, context);
  }

  warn<T>(message: string, data?: T | string, parameters?: T): void {
    const { extra, subMessage } = LoggerService.prepareData(data, parameters);
    logger.warn({ context: this.context, data: extra }, `[${message}] %s`, subMessage);
  }

  log<T>(message: string, data?: T | string, parameters?: T): void {
    const { extra, subMessage } = LoggerService.prepareData(data, parameters);
    logger.info({ context: this.context, data: extra }, `[${message}] %s`, subMessage);
  }

  info<T>(message: string, data?: T | string, parameters?: T): void {
    this.log(message, data, parameters);
  }

  debug<T>(message: string, data?: T | string, parameters?: T): void {
    const { extra, subMessage } = LoggerService.prepareData(data, parameters);
    logger.debug({ context: this.context, data: extra }, `[${message}] %s`, subMessage);
  }

  trace<T>(message: string, data?: T | string, parameters?: T): void {
    const { extra, subMessage } = LoggerService.prepareData(data, parameters);
    logger.trace({ context: this.context, data: extra }, `[${message}] %s`, subMessage);
  }

  verbose<T>(message: string, data?: T | string, parameters?: T): void {
    this.trace(message, data, parameters);
  }

  private logError<T>(level: LogLevelEnum, message: unknown, trace?: unknown, data?: T, context?: string): void {
    logger[level](
      {
        context: this.context,
        err: {
          message,
          stack: trace,
          context,
        },
        data,
      },
      level,
    );
  }
}
