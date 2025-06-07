import { AsyncLocalStorage } from 'async_hooks';
import { randomBytes } from 'crypto';

export interface IAsyncLocalStorageContext {
  traceId: string;
  startTime: [number, number];
  userId: string | undefined;
}

const asyncLocalStorage = new AsyncLocalStorage<IAsyncLocalStorageContext>();

export function setAsyncLocalStorageContextForHttpRequest(data: {
  traceId?: string;
  userId?: string;
}): IAsyncLocalStorageContext {
  const context = {
    traceId: data.traceId || generateTraceId(),
    startTime: process.hrtime(),
    userId: data.userId,
  };
  asyncLocalStorage.enterWith(context);
  return context;
}

export function getAsyncLocalStorageContext(): IAsyncLocalStorageContext | undefined {
  return asyncLocalStorage.getStore();
}

/**
 * return seconds
 */
export function getDurationFromStart(startTime?: [number, number]): number {
  const diff = process.hrtime(getAsyncLocalStorageContext()?.startTime || startTime);
  return +(diff[0] + diff[1] * 1e-9).toFixed(6);
}

function generateTraceId(): string {
  return randomBytes(16).toString('hex');
}
