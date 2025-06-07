import { getAsyncLocalStorageContext } from '~/shared/local-storage';

import type { IMixin } from '../../../types';

export const localMixin: IMixin = (): Record<string, unknown> => {
  const requestContext = getAsyncLocalStorageContext();
  return {
    userId: requestContext?.userId,
    traceId: requestContext?.traceId,
  };
};
