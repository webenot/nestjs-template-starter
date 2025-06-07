import type { LoggerOptions } from 'pino';

import { PlatformsEnum } from '../../modules/utils/enums';
import { awsLoggerOptions } from '../config/aws/aws-logger-options';
import { gcpLoggerOptions } from '../config/gcp/gcp-logger-options';
import { localLoggerOptions } from '../config/local/local-logger-options';
import { SERVICE_PLATFORM } from '../constants';

export const getPlatformOptions = (): LoggerOptions => {
  switch (SERVICE_PLATFORM) {
    case PlatformsEnum.AWS: {
      return awsLoggerOptions;
    }
    case PlatformsEnum.GCP: {
      return gcpLoggerOptions;
    }
    case PlatformsEnum.Local: {
      return localLoggerOptions;
    }
    default: {
      return localLoggerOptions;
    }
  }
};
