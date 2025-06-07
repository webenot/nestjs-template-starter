import type { Level } from 'pino';

import type { ILevelFormatter } from '../../../types';
import { CLOUD_LOGGING_SEVERITY_BY_LEVEL } from '../../shared/constants';

export const awsLevelFormatter: ILevelFormatter = (level): Record<string, unknown> => {
  const severity = CLOUD_LOGGING_SEVERITY_BY_LEVEL[level as Level];
  return {
    severity,
    // TODO: extend
  };
};
