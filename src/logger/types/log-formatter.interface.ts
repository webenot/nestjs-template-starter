export interface ILogFormatter {
  (object: Record<string, unknown>): Record<string, unknown>;
}
