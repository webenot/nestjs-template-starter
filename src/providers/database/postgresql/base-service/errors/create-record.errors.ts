import { DeepPartial, ObjectLiteral } from 'typeorm';

import { TQueryFailedError } from '~/modules/utils/types';
import { BaseError } from '~/shared/errors/base-error';

export abstract class CreateRecordError<Entity extends ObjectLiteral> extends BaseError {
  constructor(
    public readonly data: DeepPartial<Entity>,
    cause?: unknown,
  ) {
    super(undefined, cause);
  }
}

export class CreateConflictError<
  Entity extends ObjectLiteral = Record<string, unknown>,
> extends CreateRecordError<Entity> {
  declare cause: TQueryFailedError;

  constructor(data: DeepPartial<Entity>, cause: TQueryFailedError) {
    super(data, cause);
  }
}
