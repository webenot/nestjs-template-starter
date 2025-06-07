import { CallHandler, ExecutionContext, HttpException, NestInterceptor } from '@nestjs/common';
import type { Response } from 'express';
import type { Level } from 'pino';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { EMPTY_STRING } from '~/modules/utils/constants';
import { RequestTypesEnum } from '~/modules/utils/enums';
import type { IRequestWithUser } from '~/modules/utils/types';
import {
  getAsyncLocalStorageContext,
  getDurationFromStart,
  setAsyncLocalStorageContextForHttpRequest,
} from '~/shared/local-storage';

import { LogLevelEnum } from './enums';
import { logger } from './logger';
import { getIsEndpointLoggingDisabled } from './utils';

export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const startTime = process.hrtime();
    let requestType: RequestTypesEnum;

    const request = context.switchToHttp().getRequest<IRequestWithUser>();

    if (getIsEndpointLoggingDisabled(request.url)) return next.handle();

    if (request.header) {
      requestType = RequestTypesEnum.HTTPS;

      const traceId = setAsyncLocalStorageContextForHttpRequest({
        traceId: request.header('X-Cloud-Trace-Context')?.split('/')[0] || EMPTY_STRING,
        userId: request?.user?.id || EMPTY_STRING,
      }).traceId;

      context.switchToHttp().getResponse<Response>().set('X-Request-Id', traceId);
    } else {
      requestType = RequestTypesEnum.RABBIT_MQ_MESSAGE;

      setAsyncLocalStorageContextForHttpRequest({
        traceId: getAsyncLocalStorageContext()?.traceId || request?.traceId || EMPTY_STRING,
        userId: getAsyncLocalStorageContext()?.userId || request?.userId || EMPTY_STRING,
      });
    }

    const parameters = { method: request.method, url: request.url };

    logger.info(parameters, `<-- ${requestType} request started: ${JSON.stringify(parameters)}`);

    const onError = (error: unknown): Observable<never> => {
      if (error instanceof HttpException) {
        const status = error.getStatus();
        const level: Level = 500 <= status && status <= 599 ? LogLevelEnum.ERROR : LogLevelEnum.DEBUG;
        logger[level](
          { ...parameters, duration: getDurationFromStart(startTime), err: error },
          `--> ${requestType} request finished with error`,
        );
      } else {
        logger.error(
          { ...parameters, duration: getDurationFromStart(startTime), err: error },
          `--> ${requestType} request finished with error`,
        );
      }

      return throwError(() => error);
    };

    return next.handle().pipe(
      catchError(onError),
      tap(() => {
        logger.info(
          {
            ...parameters,
            duration: getDurationFromStart(startTime),
          },
          `--> ${requestType} request finished`,
        );
      }),
    );
  }
}
