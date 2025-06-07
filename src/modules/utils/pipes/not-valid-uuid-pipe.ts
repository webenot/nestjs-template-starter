import { NotFoundException, ParseUUIDPipe } from '@nestjs/common';

export const notFoundInvalidUUIDPipeFactory = (message: string): ParseUUIDPipe =>
  new ParseUUIDPipe({
    version: '4',
    exceptionFactory: (): NotFoundException => new NotFoundException(message),
  });
