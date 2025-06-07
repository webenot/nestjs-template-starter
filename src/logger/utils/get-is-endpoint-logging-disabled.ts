import { NOT_LOG_ENDPOINTS } from '../constants';

export const getIsEndpointLoggingDisabled = (url: string): boolean => {
  return NOT_LOG_ENDPOINTS.has(url);
};
