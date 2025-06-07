import type { RabbitMQChannels, RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';

import type { ConfigurationDto } from '~/modules/configurations/dtos/configuration.dto';
import { convertStringToBoolean } from '~/modules/utils/string';

import { RmqChannelsEnum, RmqExchangesEnum, RmqExchangeTypesEnum, RmqPrefetchCountEnum } from './enums';

export class RmqConfiguration {
  protected readonly configuration: ConfigurationDto;

  protected static getRMQChannels(): RabbitMQChannels {
    return {
      [RmqChannelsEnum.CHANNEL_1]: {
        prefetchCount: RmqPrefetchCountEnum.ONE,
        default: true,
      },
      [RmqChannelsEnum.CHANNEL_2]: {
        prefetchCount: RmqPrefetchCountEnum.ONE,
      },
    };
  }

  public get<K extends keyof ConfigurationDto>(key: K): ConfigurationDto[K] {
    if (this.configuration[key] && !(this.configuration[key] === 'null')) {
      return this.configuration[key];
    }
    throw new Error(`Environment variable ${key} is null`);
  }

  public getRabbitMQConfiguration(): RabbitMQConfig {
    return {
      uri: this.get('RMQ_CONNECT_STRING'),
      channels: RmqConfiguration.getRMQChannels(),
      exchanges: [
        {
          name: RmqExchangesEnum.TEST_EXCHANGE,
          type: RmqExchangeTypesEnum.TOPIC,
        },
      ],
      enableControllerDiscovery: convertStringToBoolean(this.get('IS_RMQ_CONTROLLER_DISCOVERY') || 'true'),
      connectionInitOptions: {
        wait: convertStringToBoolean(this.get('IS_RMQ_CONNECTION_WAIT') || 'false'),
      },
    };
  }
}
