import { getAsyncLocalStorageContext } from '../../../../shared/local-storage';
import type { IMixin } from '../../../types';

export const awsMixin: IMixin = (): Record<string, unknown> => {
  const requestContext = getAsyncLocalStorageContext();
  return {
    userId: requestContext?.userId,
    traceId: requestContext?.traceId,
  };
};
