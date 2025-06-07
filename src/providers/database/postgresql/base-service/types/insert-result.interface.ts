import type { InsertResult } from 'typeorm';

export interface IInsertResult<TEntity> extends InsertResult {
  raw: TEntity[];
}
