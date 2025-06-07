import type { Level } from 'pino';

import type { ILevelFormatter } from '../../../types';
import { CLOUD_LOGGING_SEVERITY_BY_LEVEL } from '../../shared/constants';

export const gcpLevelFormatter: ILevelFormatter = (level): Record<string, unknown> => {
  const severity = CLOUD_LOGGING_SEVERITY_BY_LEVEL[level as Level];
  return {
    severity,
    ...(['error', 'fatal'].includes(level) && {
      '@type': 'type.googleapis.com/google.devtools.clouderrorreporting.v1beta1.ReportedErrorEvent',
    }),
  };
};
