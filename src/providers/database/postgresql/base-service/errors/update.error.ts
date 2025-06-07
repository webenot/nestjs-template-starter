import type { FindOptionsWhere, ObjectLiteral } from 'typeorm';
import type { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseError } from '~/shared/errors/base-error';

export class UpdateError<Entity extends ObjectLiteral> extends BaseError {
  constructor(
    public readonly id: string | string[] | FindOptionsWhere<Entity>,
    public readonly data: QueryDeepPartialEntity<Entity>,
    cause?: unknown,
  ) {
    super(undefined, cause);
  }
}
