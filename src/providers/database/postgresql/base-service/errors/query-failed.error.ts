import { FindOptionsWhere, ObjectLiteral } from 'typeorm';
import type { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { TQueryFailedError } from '~/modules/utils/types';
import { BaseError } from '~/shared/errors/base-error';

export class QueryFailedError<Entity extends ObjectLiteral> extends BaseError {
  constructor(
    public readonly criteria:
      | QueryDeepPartialEntity<Entity>
      | QueryDeepPartialEntity<Entity>[]
      | FindOptionsWhere<Entity>
      | Array<string>
      | string,
    public readonly options?: unknown,
    cause?: TQueryFailedError,
  ) {
    super(undefined, cause);
  }
}
