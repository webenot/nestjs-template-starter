import type { LoggerOptions } from 'pino';

import { LOG_LEVEL, MESSAGE_KEY, SERVICE_NAME, SERVICE_VERSION } from '../../constants';
import { logFormatter } from '../shared/formatters';
import { REDACT_OPTIONS } from '../shared/redact-options';
import { serializers } from '../shared/serializers';
import { gcpLevelFormatter } from './formatters';
import { gcpMixin } from './mixin';

export const gcpLoggerOptions: LoggerOptions = {
  level: LOG_LEVEL,
  base: {
    serviceContext: {
      service: SERVICE_NAME,
      version: SERVICE_VERSION,
    },
  },
  messageKey: MESSAGE_KEY,
  formatters: {
    level: gcpLevelFormatter,
    log: logFormatter,
  },
  serializers,
  mixin: gcpMixin,
  redact: REDACT_OPTIONS,
};
