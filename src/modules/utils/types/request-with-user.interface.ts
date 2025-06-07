import type { Request } from 'express';

// TODO: Add fields below to request during authentication
export interface IRequestWithUser extends Request {
  user?: {
    id: string;
  };
  userId?: string;
  traceId?: string;
}
