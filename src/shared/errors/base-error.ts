/**
 * Base class for any custom error.
 * Created to capture stack trace properly.
 */
export abstract class BaseError extends Error {
  /**
   * @param message The error message. Passed to the `Error` constructor
   * @param cause Reason of the error. Passed to the `Error` constructor in options
   */
  constructor(message?: string, cause?: unknown) {
    super(message, { cause });

    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}
