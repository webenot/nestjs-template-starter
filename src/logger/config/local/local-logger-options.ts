import type { LoggerOptions } from 'pino';

import { LOG_LEVEL } from '../../constants';
import { REDACT_OPTIONS } from '../shared/redact-options';
import { serializers } from '../shared/serializers';
import { localMixin } from './mixin';

export const localLoggerOptions: LoggerOptions = {
  level: LOG_LEVEL,
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      levelFirst: true,
      ignore: 'serviceContext',
      translateTime: 'SYS:HH:MM:ss.l',
    },
  },
  serializers,
  mixin: localMixin,
  redact: REDACT_OPTIONS,
};
