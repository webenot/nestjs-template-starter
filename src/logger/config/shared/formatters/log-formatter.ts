import type { ILogFormatter } from '../../../types';

export const logFormatter: ILogFormatter = (entry): Record<string, unknown> => {
  const error = entry['err'] instanceof Error ? entry['err'] : undefined;
  return { ...entry, stack_trace: error?.stack };
};
