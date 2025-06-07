import { QueryFailedError as TypeORMQueryFailedError } from 'typeorm';

import { type TQueryFailedError } from './types';

export function isQueryFailedError(error: unknown): error is TQueryFailedError {
  return error instanceof TypeORMQueryFailedError;
}
