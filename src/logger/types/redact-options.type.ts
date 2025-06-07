export type RedactOptions =
  | string[]
  | {
      paths: string[];
      censor?: string | ((value: unknown, path: string[]) => unknown);
      remove?: boolean;
    };
