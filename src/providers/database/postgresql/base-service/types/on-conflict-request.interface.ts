import type { InsertOrUpdateOptions } from 'typeorm/query-builder/InsertOrUpdateOptions';

export interface IOnConflictRequest {
  overwrite: string[];
  conflictTarget?: string | string[];
  orUpdateOptions?: InsertOrUpdateOptions;
}
