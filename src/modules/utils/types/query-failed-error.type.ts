import { type DatabaseError } from 'pg-protocol';
import { type QueryFailedError as TypeORMQueryFailedError } from 'typeorm';

/**
 * Based on code [here](https://github.com/typeorm/typeorm/blob/master/src/error/QueryFailedError.ts#L27) in `QueryFailedError` constuctor,
 * all the properties of inner error `DatabaseError` from `pg-protocol` are assigned to the error.
 */
export type TQueryFailedError = TypeORMQueryFailedError & DatabaseError;
