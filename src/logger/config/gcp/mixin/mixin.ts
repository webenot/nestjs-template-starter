import { getAsyncLocalStorageContext } from '~/shared/local-storage';

import type { IMixin } from '../../../types';

export const gcpMixin: IMixin = (): Record<string, unknown> => {
  const requestContext = getAsyncLocalStorageContext();
  return {
    userId: requestContext?.userId,
    'logging.googleapis.com/trace': requestContext?.traceId,
  };
};
