import Pino, { BaseLogger, destination, Level } from 'pino';

import { getPlatformOptions } from './utils';

/**
 * @see: https://docs.relaycorp.tech/pino-cloud-js/
 * @see: https://cloud.google.com/error-reporting/docs/formatting-error-messages#@type
 * @see: https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry
 */
const options = getPlatformOptions();

const stdout = Pino(options);
const stderr = Pino(options, destination(2));

export const logger: Pick<BaseLogger, Level> = {
  trace: stdout.trace.bind(stdout),
  debug: stdout.debug.bind(stdout),
  info: stdout.info.bind(stdout),
  warn: stdout.warn.bind(stdout),
  error: stderr.error.bind(stderr),
  fatal: stderr.fatal.bind(stderr),
};
