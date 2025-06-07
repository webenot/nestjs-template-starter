import { AmqpConnection, RequestOptions } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import type { Options } from 'amqplib';

import { LoggerService } from '~/logger/logger.service';

@Injectable()
export class RmqService {
  private readonly logger: LoggerService;

  constructor(private readonly amqpConnection: AmqpConnection) {
    this.logger = new LoggerService(RmqService.name);
  }

  public async publish<TRequest>(
    exchange: string,
    routing: string,
    request: TRequest,
    options?: Options.Publish,
  ): Promise<void> {
    this.logger.debug(this.publish.name, `--> RMQ exchange: ${exchange}, routing: ${routing}`, request);
    await this.amqpConnection.publish(exchange, routing, request, options);
  }

  public async request<TRequest, TResponse>(
    exchange: string,
    routing: string,
    request: TRequest,
    timeout?: number,
  ): Promise<Record<string, TResponse>> {
    this.logger.debug(this.request.name, `--> Request >>> RMQ exchange: ${exchange}, routing: ${routing}`, request);
    const requestOptions: RequestOptions = {
      exchange,
      routingKey: routing,
      payload: {
        ...request,
      },
    };
    if (timeout) {
      requestOptions.timeout = timeout;
    }
    const result = await this.amqpConnection.request<Record<string, TResponse>>(requestOptions);
    this.logger.debug(this.request.name, `<-- Result <<< RMQ exchange: ${exchange}, routing: ${routing}`, result);
    return result;
  }
}
