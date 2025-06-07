import type { LoggerOptions } from 'pino';

import { LOG_LEVEL, MESSAGE_KEY, SERVICE_NAME, SERVICE_VERSION } from '../../constants';
import { logFormatter } from '../shared/formatters';
import { REDACT_OPTIONS } from '../shared/redact-options';
import { serializers } from '../shared/serializers';
import { awsLevelFormatter } from './formatters';
import { awsMixin } from './mixin';

export const awsLoggerOptions: LoggerOptions = {
  level: LOG_LEVEL,
  base: {
    serviceContext: {
      service: SERVICE_NAME,
      version: SERVICE_VERSION,
    },
  },
  messageKey: MESSAGE_KEY,
  formatters: {
    level: awsLevelFormatter,
    log: logFormatter,
  },
  serializers,
  mixin: awsMixin,
  redact: REDACT_OPTIONS,
};
