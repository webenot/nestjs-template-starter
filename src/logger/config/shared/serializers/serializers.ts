import { stdSerializers } from 'pino';

export const serializers = {
  err: stdSerializers.err,
  error: stdSerializers.err,
  exception: stdSerializers.err,
};
