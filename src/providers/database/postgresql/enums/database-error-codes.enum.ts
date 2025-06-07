/**
 * Values are taken from [PostgreSQL documentation](https://www.postgresql.org/docs/current/errcodes-appendix.html)
 */
export enum DatabaseErrorCodesEnum {
  FOREIGN_KEY_VIOLATION = '23503',
  UNIQUE_VIOLATION = '23505',
  LOCK_NOT_AVAILABLE = '55P03',
}
