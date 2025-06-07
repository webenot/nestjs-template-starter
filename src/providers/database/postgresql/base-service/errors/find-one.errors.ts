import { type FindOptionsWhere, ObjectLiteral } from 'typeorm';

import { TQueryFailedError } from '~/modules/utils/types';
import type { FindOptions } from '~/providers/database/postgresql/base-service/types';
import { BaseError } from '~/shared/errors/base-error';

export abstract class FindOneError<Entity extends ObjectLiteral> extends BaseError {
  constructor(
    public readonly criteria: FindOptionsWhere<Entity>,
    public readonly options: FindOptions<Entity>,
    cause?: unknown,
  ) {
    super(undefined, cause);
  }
}

export class CannotObtainLockError<Entity extends ObjectLiteral> extends FindOneError<Entity> {
  declare cause: TQueryFailedError;

  constructor(criteria: FindOptionsWhere<Entity>, options: FindOptions<Entity>, cause: TQueryFailedError) {
    super(criteria, options, cause);
  }
}
