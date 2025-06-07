import type { Level } from 'pino';

export const CLOUD_LOGGING_SEVERITY_BY_LEVEL: { readonly [key in Level]: string } = {
  debug: 'DEBUG',
  error: 'ERROR',
  fatal: 'CRITICAL',
  info: 'INFO',
  trace: 'DEBUG',
  warn: 'WARNING',
};
