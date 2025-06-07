import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';

import { ConfigurationService } from '~/modules/configurations/configuration.service';

import { RmqService } from './rmq.service';

const configurationService = new ConfigurationService();
const rebbitMQOptions = configurationService.getRabbitMQConfiguration();

@Module({
  imports: [RabbitMQModule.forRoot({ ...rebbitMQOptions })],
  exports: [RmqService],
  providers: [RmqService],
})
export class RmqModule {}
